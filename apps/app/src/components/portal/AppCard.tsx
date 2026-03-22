import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { SubsidiaryApp } from "~/data/apps";

interface AppCardProps {
	app: SubsidiaryApp;
}

export const AppCard = component$<AppCardProps>(({ app }) => {
	useStylesScoped$(`
		.card {
			background: var(--card-bg);
			border: var(--card-border);
			border-radius: var(--card-radius);
			overflow: hidden;
			transition: transform var(--dur-fast) var(--ease-out),
				box-shadow var(--dur-fast) var(--ease-out),
				border-color var(--dur-fast) var(--ease-out);
		}

		.card:hover {
			transform: translateY(calc(var(--space-1) * -1));
			box-shadow: var(--shadow-2);
			border-color: var(--color-border-hover);
		}

		.card__body {
			padding: var(--card-padding);
		}

		.card__header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: var(--space-3);
		}

		.card__title-group {
			display: flex;
			flex-direction: column;
			gap: var(--space-2);
		}

		.card__name {
			font-family: var(--font-display);
			font-size: var(--text-xl);
			font-weight: 700;
			color: var(--color-text-primary);
			letter-spacing: var(--tracking-tight);
		}

		.card__app-badge {
			display: inline-flex;
			align-items: center;
			gap: var(--space-1);
			height: var(--size-badge);
			padding: 0 var(--space-2);
			background: var(--color-border-subtle);
			border-radius: var(--radius-1);
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-secondary);
			letter-spacing: var(--tracking-label);
			white-space: nowrap;
		}

		.card__app-dot {
			width: var(--size-status-dot);
			height: var(--size-status-dot);
			border-radius: 50%;
			flex-shrink: 0;
		}

		.card__status {
			display: inline-flex;
			align-items: center;
			gap: var(--space-1);
			height: var(--size-badge);
			padding: 0 var(--space-2);
			font-family: var(--font-code);
			font-size: var(--text-xs);
			text-transform: uppercase;
			letter-spacing: var(--tracking-label);
			border-radius: var(--radius-1);
			white-space: nowrap;
			flex-shrink: 0;
		}

		.card__status-dot {
			width: var(--size-status-dot);
			height: var(--size-status-dot);
			border-radius: 50%;
			flex-shrink: 0;
		}

		.card__status--active {
			background: var(--color-status-active-muted);
			color: var(--color-status-active);
		}

		.card__status--active .card__status-dot {
			background: var(--color-status-active);
		}

		.card__status--landing {
			background: var(--color-status-pending-muted);
			color: var(--color-status-pending);
		}

		.card__status--landing .card__status-dot {
			background: var(--color-status-pending);
		}

		.card__desc {
			font-family: var(--font-body);
			font-size: var(--text-sm);
			color: var(--color-text-secondary);
			line-height: var(--leading-normal);
			margin-bottom: var(--space-4);
		}

		.card__meta {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: var(--space-3);
			background: var(--color-surface-2);
			border-radius: var(--radius-2);
			margin-bottom: var(--space-4);
		}

		.card__domain {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-secondary);
		}

		.card__id {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			letter-spacing: var(--tracking-label);
		}

		.card__cta {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: var(--space-2);
			height: var(--size-btn-sm);
			padding: 0 var(--space-3);
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 600;
			color: var(--color-text-inverse);
			background: var(--color-interactive-primary);
			border-radius: var(--radius-2);
			transition: background var(--dur-fast) var(--ease-out);
		}

		.card__cta:hover {
			background: var(--color-interactive-hover);
		}

		.card__cta--secondary {
			background: transparent;
			color: var(--color-interactive-primary);
			border: 1px solid var(--color-interactive-primary);
		}

		.card__cta--secondary:hover {
			background: var(--color-interactive-muted);
			color: var(--color-interactive-hover);
		}

		.card__arrow {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			transition: transform var(--dur-fast) var(--ease-out);
		}

		.card__cta:hover .card__arrow {
			transform: translateX(var(--space-1));
		}
	`);

	const isActive = app.status === "active";
	const statusClass = isActive ? "card__status--active" : "card__status--landing";
	const statusLabel = isActive ? "Active" : "Landing";

	return (
		<article class="card">
			<div class="card__body">
				<div class="card__header">
					<div class="card__title-group">
						<h3 class="card__name">{app.name}</h3>
						<span class="card__app-badge">
							<span class="card__app-dot" style={{ background: app.accent }} />
							{app.domain}
						</span>
					</div>
					<span class={`card__status ${statusClass}`}>
						<span class="card__status-dot" />
						{statusLabel}
					</span>
				</div>
				<p class="card__desc">{app.desc}</p>
				<div class="card__meta">
					<code class="card__domain">{app.domain}</code>
					<span class="card__id">ID: {app.id}</span>
				</div>
				{isActive ? (
					<a href={app.appUrl} class="card__cta" target="_blank" rel="noopener">
						Open App <span class="card__arrow">{"\u2192"}</span>
					</a>
				) : (
					<a
						href={app.landingUrl}
						class="card__cta card__cta--secondary"
						target="_blank"
						rel="noopener"
					>
						View Landing <span class="card__arrow">{"\u2192"}</span>
					</a>
				)}
			</div>
		</article>
	);
});
