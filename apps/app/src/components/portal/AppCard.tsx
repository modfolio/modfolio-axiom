import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { SubsidiaryApp } from "~/data/apps";

interface AppCardProps {
	app: SubsidiaryApp;
}

export const AppCard = component$<AppCardProps>(({ app }) => {
	useStylesScoped$(`
		.card {
			background: var(--color-surface-1);
			border: 1px solid var(--color-border-default);
			border-radius: var(--radius-3);
			overflow: hidden;
			box-shadow: var(--shadow-1);
			transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
		}

		.card:hover {
			transform: translateY(-2px);
			box-shadow: var(--shadow-2);
			border-color: var(--color-border-hover);
		}

		.card__accent {
			height: 3px;
			width: 100%;
		}

		.card__body {
			padding: var(--space-5);
		}

		.card__header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: var(--space-3);
		}

		.card__name {
			font-family: var(--font-display);
			font-size: var(--text-xl);
			font-weight: 700;
			color: var(--color-text-primary);
			letter-spacing: var(--tracking-tight);
		}

		.card__status {
			display: inline-flex;
			align-items: center;
			gap: 6px;
			font-family: var(--font-code);
			font-size: 11px;
			text-transform: uppercase;
			letter-spacing: 0.04em;
			padding: var(--space-1) var(--space-3);
			border-radius: var(--radius-pill);
			white-space: nowrap;
		}

		.card__status-dot {
			width: 6px;
			height: 6px;
			border-radius: 50%;
			flex-shrink: 0;
		}

		.card__status--active {
			background: rgba(22, 163, 74, 0.08);
			color: var(--color-status-active);
		}

		.card__status--active .card__status-dot {
			background: var(--color-status-active);
			box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
		}

		.card__status--landing {
			background: rgba(217, 119, 6, 0.08);
			color: var(--color-status-pending);
		}

		.card__status--landing .card__status-dot {
			background: var(--color-status-pending);
			box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.2);
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
			font-size: 11px;
			color: var(--color-text-tertiary);
			letter-spacing: 0.02em;
		}

		.card__cta {
			display: inline-flex;
			align-items: center;
			gap: var(--space-2);
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--color-text-inverse);
			background: var(--color-interactive-primary);
			padding: var(--space-2) var(--space-5);
			border-radius: var(--radius-2);
			transition: background 0.15s ease;
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
			background: var(--indigo-3);
			color: var(--color-interactive-hover);
		}

		.card__arrow {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			transition: transform 0.15s ease;
		}

		.card__cta:hover .card__arrow {
			transform: translateX(3px);
		}
	`);

	const isActive = app.status === "active";
	const statusClass = isActive ? "card__status--active" : "card__status--landing";
	const statusLabel = isActive ? "Active" : "Landing";

	return (
		<article class="card">
			<div class="card__accent" style={{ background: app.accent }} />
			<div class="card__body">
				<div class="card__header">
					<h3 class="card__name">{app.name}</h3>
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
						Open App <span class="card__arrow">{"->"}</span>
					</a>
				) : (
					<a
						href={app.landingUrl}
						class="card__cta card__cta--secondary"
						target="_blank"
						rel="noopener"
					>
						View Landing <span class="card__arrow">{"->"}</span>
					</a>
				)}
			</div>
		</article>
	);
});
