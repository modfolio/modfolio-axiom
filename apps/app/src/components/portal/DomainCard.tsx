import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import type { SubsidiaryApp } from "~/data/apps";
import type { AppliedDomain } from "~/data/domains";

interface DomainCardProps {
	domain: AppliedDomain;
	/** Registry entries linked to this domain, resolved from `~/data/apps`. */
	apps: SubsidiaryApp[];
}

/**
 * A domain card with an in-card disclosure. The header acts as a button that
 * reveals the domain's full Overview (three paragraphs) and Capabilities
 * (four items) — content that otherwise lives only in the content map.
 *
 * The reveal is driven by a Qwik `useSignal<boolean>` toggled by `onClick$`,
 * the first genuinely interactive surface in this app: resumable, no
 * hydration, no `useVisibleTask$`. The disclosure follows the WAI-ARIA
 * pattern — the trigger carries `aria-expanded` + `aria-controls`, the detail
 * region is `id`-linked and hidden via the native `hidden` attribute when
 * collapsed (so collapsed content is out of the a11y tree and tab order).
 */
export const DomainCard = component$<DomainCardProps>(({ domain, apps }) => {
	useStylesScoped$(`
		.domain {
			display: flex;
			flex-direction: column;
			background: var(--card-bg);
			border: var(--card-border);
			border-radius: var(--card-radius);
			border-top: 2px solid var(--domain-accent);
			transition: transform var(--dur-fast) var(--ease-out),
				box-shadow var(--dur-fast) var(--ease-out),
				border-color var(--dur-fast) var(--ease-out);
		}

		.domain:hover {
			transform: translateY(calc(var(--space-1) * -1));
			box-shadow: var(--shadow-2);
			border-color: var(--color-border-hover);
			border-top-color: var(--domain-accent);
		}

		.domain:focus-within {
			border-color: var(--color-border-hover);
			border-top-color: var(--domain-accent);
		}

		/* ── Trigger: the whole header is the disclosure button ── */
		.domain__trigger {
			display: block;
			width: 100%;
			text-align: left;
			background: transparent;
			border: none;
			padding: var(--card-padding);
			cursor: pointer;
			color: inherit;
			border-radius: var(--card-radius) var(--card-radius) 0 0;
		}

		.domain__trigger:focus-visible {
			outline: 2px solid var(--color-interactive-primary);
			outline-offset: -2px;
		}

		.domain__header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: var(--space-3);
			margin-bottom: var(--space-3);
		}

		.domain__number {
			font-family: var(--font-code);
			font-size: var(--text-2xl);
			font-weight: 700;
			line-height: 1;
			color: var(--domain-accent);
			user-select: none;
		}

		.domain__count {
			display: inline-flex;
			align-items: center;
			gap: var(--space-1);
			height: var(--size-badge);
			padding: 0 var(--space-2);
			font-family: var(--font-code);
			font-size: var(--text-xs);
			letter-spacing: var(--tracking-label);
			border-radius: var(--radius-1);
			white-space: nowrap;
			flex-shrink: 0;
		}

		.domain__count-dot {
			width: var(--size-status-dot);
			height: var(--size-status-dot);
			border-radius: 50%;
			flex-shrink: 0;
		}

		.domain__count--active {
			background: var(--color-status-active-muted);
			color: var(--color-status-active);
		}

		.domain__count--active .domain__count-dot {
			background: var(--color-status-active);
		}

		.domain__count--empty {
			background: var(--color-border-subtle);
			color: var(--color-text-tertiary);
		}

		.domain__count--empty .domain__count-dot {
			background: var(--color-text-tertiary);
		}

		.domain__title {
			font-family: var(--font-display);
			font-size: var(--text-lg);
			font-weight: 700;
			color: var(--color-text-primary);
			letter-spacing: var(--tracking-tight);
			margin-bottom: var(--space-1);
		}

		.domain__subtitle {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			letter-spacing: var(--tracking-label);
			margin-bottom: var(--space-3);
		}

		.domain__blurb {
			font-family: var(--font-body);
			font-size: var(--text-sm);
			color: var(--color-text-secondary);
			line-height: var(--leading-normal);
			margin-bottom: var(--space-4);
		}

		/* ── Disclosure affordance ── */
		.domain__disclosure {
			display: flex;
			align-items: center;
			gap: var(--space-2);
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 600;
			letter-spacing: var(--tracking-label);
			text-transform: uppercase;
			color: var(--color-interactive-primary);
		}

		.domain__chevron {
			display: inline-flex;
			font-family: var(--font-code);
			font-size: var(--text-xs);
			line-height: 1;
			transition: transform var(--dur-base) var(--ease-out);
		}

		.domain__chevron--open {
			transform: rotate(90deg);
		}

		/* ── Disclosed detail ── */
		.domain__detail {
			padding: 0 var(--card-padding) var(--card-padding);
			border-top: 1px solid var(--color-border-subtle);
		}

		.domain__overview {
			display: flex;
			flex-direction: column;
			gap: var(--space-3);
			margin: var(--space-4) 0 var(--space-5);
		}

		.domain__overview-p {
			font-family: var(--font-body);
			font-size: var(--text-sm);
			color: var(--color-text-secondary);
			line-height: var(--leading-relaxed);
		}

		.domain__caps-label {
			font-family: var(--font-ui);
			font-size: var(--section-label-size);
			font-weight: var(--section-label-weight);
			text-transform: uppercase;
			letter-spacing: var(--section-label-tracking);
			color: var(--section-label-color);
			margin-bottom: var(--space-3);
		}

		.domain__caps {
			display: flex;
			flex-direction: column;
			gap: var(--space-3);
		}

		.domain__cap {
			display: grid;
			grid-template-columns: var(--size-status-dot) 1fr;
			column-gap: var(--space-3);
			row-gap: var(--space-1);
			align-items: baseline;
		}

		.domain__cap-dot {
			width: var(--size-status-dot);
			height: var(--size-status-dot);
			border-radius: 50%;
			background: var(--domain-accent);
			transform: translateY(0.3em);
		}

		.domain__cap-title {
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--color-text-primary);
			letter-spacing: var(--tracking-tight);
		}

		.domain__cap-desc {
			grid-column: 2;
			font-family: var(--font-body);
			font-size: var(--text-sm);
			color: var(--color-text-secondary);
			line-height: var(--leading-normal);
		}

		/* ── Linked apps (always visible) ── */
		.domain__apps {
			margin-top: auto;
			padding: var(--space-3) var(--card-padding) var(--card-padding);
			border-top: 1px solid var(--color-border-subtle);
		}

		.domain__app-list {
			display: flex;
			flex-direction: column;
			gap: var(--space-2);
		}

		.domain__app {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-2);
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			color: var(--color-text-secondary);
			transition: color var(--dur-fast) var(--ease-out);
		}

		.domain__app:hover {
			color: var(--color-interactive-primary);
		}

		.domain__app:focus-visible {
			outline: 2px solid var(--color-interactive-primary);
			outline-offset: 2px;
			border-radius: var(--radius-1);
			color: var(--color-interactive-primary);
		}

		.domain__app-name {
			display: inline-flex;
			align-items: center;
			gap: var(--space-2);
		}

		.domain__app-dot {
			width: var(--size-status-dot);
			height: var(--size-status-dot);
			border-radius: 50%;
			flex-shrink: 0;
		}

		.domain__app-arrow {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			transition: transform var(--dur-fast) var(--ease-out),
				color var(--dur-fast) var(--ease-out);
		}

		.domain__app:hover .domain__app-arrow {
			transform: translateX(var(--space-1));
			color: var(--color-interactive-primary);
		}

		.domain__empty {
			display: flex;
			align-items: center;
			gap: var(--space-2);
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			letter-spacing: var(--tracking-label);
		}

		.domain__empty-mark {
			color: var(--color-text-tertiary);
			opacity: 0.6;
		}

		@media (prefers-reduced-motion: reduce) {
			.domain,
			.domain__chevron,
			.domain__app,
			.domain__app-arrow {
				transition: none;
			}
		}
	`);

	const expanded = useSignal(false);

	const count = apps.length;
	const hasApps = count > 0;
	const countClass = hasApps ? "domain__count--active" : "domain__count--empty";
	const countLabel = `${count} app${count === 1 ? "" : "s"}`;
	const detailId = `domain-detail-${domain.id}`;

	return (
		<article class="domain" style={{ "--domain-accent": domain.accent }}>
			<button
				type="button"
				class="domain__trigger"
				aria-expanded={expanded.value}
				aria-controls={detailId}
				onClick$={() => {
					expanded.value = !expanded.value;
				}}
			>
				<div class="domain__header">
					<span class="domain__number">{domain.number}</span>
					<span class={`domain__count ${countClass}`}>
						<span class="domain__count-dot" />
						{countLabel}
					</span>
				</div>
				<h3 class="domain__title">{domain.title}</h3>
				<p class="domain__subtitle">{domain.subtitle}</p>
				<p class="domain__blurb">{domain.blurb}</p>
				<span class="domain__disclosure">
					<span
						class={`domain__chevron${expanded.value ? " domain__chevron--open" : ""}`}
						aria-hidden="true"
					>
						{"›"}
					</span>
					{expanded.value ? "간략히" : "자세히 보기"}
				</span>
			</button>

			<div id={detailId} class="domain__detail" hidden={!expanded.value}>
				<div class="domain__overview">
					{domain.overview.map((paragraph, i) => (
						<p key={`${domain.id}-ov-${i}`} class="domain__overview-p">
							{paragraph}
						</p>
					))}
				</div>
				<p class="domain__caps-label">Capabilities</p>
				<div class="domain__caps">
					{domain.capabilities.map((cap) => (
						<div key={`${domain.id}-${cap.title}`} class="domain__cap">
							<span class="domain__cap-dot" aria-hidden="true" />
							<span class="domain__cap-title">{cap.title}</span>
							<p class="domain__cap-desc">{cap.description}</p>
						</div>
					))}
				</div>
			</div>

			<div class="domain__apps">
				{hasApps ? (
					<div class="domain__app-list">
						{apps.map((app) => {
							const isActive = app.status === "active";
							const href = isActive ? app.appUrl : app.landingUrl;
							return (
								<a key={app.id} href={href} class="domain__app" target="_blank" rel="noopener">
									<span class="domain__app-name">
										<span class="domain__app-dot" style={{ background: app.accent }} />
										{app.name}
									</span>
									<span class="domain__app-arrow">{"→"}</span>
								</a>
							);
						})}
					</div>
				) : (
					<p class="domain__empty">
						<span class="domain__empty-mark">{"—"}</span>
						등록된 앱 없음
					</p>
				)}
			</div>
		</article>
	);
});
