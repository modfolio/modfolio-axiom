import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { SubsidiaryApp } from "~/data/apps";
import type { AppliedDomain } from "~/data/domains";

interface DomainCardProps {
	domain: AppliedDomain;
	/** Registry entries linked to this domain, resolved from `~/data/apps`. */
	apps: SubsidiaryApp[];
}

export const DomainCard = component$<DomainCardProps>(({ domain, apps }) => {
	useStylesScoped$(`
		.domain {
			display: flex;
			flex-direction: column;
			background: var(--card-bg);
			border: var(--card-border);
			border-radius: var(--card-radius);
			padding: var(--card-padding);
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

		.domain__apps {
			margin-top: auto;
			padding-top: var(--space-3);
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
	`);

	const count = apps.length;
	const hasApps = count > 0;
	const countClass = hasApps ? "domain__count--active" : "domain__count--empty";
	const countLabel = `${count} app${count === 1 ? "" : "s"}`;

	return (
		<article class="domain" style={{ "--domain-accent": domain.accent }}>
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
