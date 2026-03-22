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
			border-radius: var(--radius-4);
			padding: var(--space-5);
			transition: transform 0.2s, border-color 0.2s;
		}

		.card:hover {
			transform: translateY(-2px);
			border-color: var(--color-border-hover);
		}

		.card__top {
			display: flex;
			align-items: center;
			gap: var(--space-3);
			margin-bottom: var(--space-4);
		}

		.card__dot {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			flex-shrink: 0;
		}

		.card__name {
			font-family: var(--font-display);
			font-size: var(--text-xl);
			font-weight: 700;
		}

		.card__desc {
			font-family: var(--font-body);
			font-size: var(--text-sm);
			color: var(--color-text-secondary);
			line-height: var(--leading-normal);
			margin-bottom: var(--space-5);
		}

		.card__footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.card__domain {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
		}

		.card__status {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			padding: var(--space-1) var(--space-3);
			border-radius: var(--radius-pill);
		}

		.card__status--active {
			background: rgba(74, 222, 128, 0.12);
			color: var(--color-status-active);
		}

		.card__status--landing {
			background: rgba(255, 217, 122, 0.12);
			color: var(--color-status-pending);
		}

		.card__link {
			display: inline-flex;
			align-items: center;
			gap: var(--space-2);
			font-family: var(--font-marketing);
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--color-text-primary);
			margin-top: var(--space-4);
			transition: color 0.2s;
		}

		.card__link:hover {
			color: var(--color-interactive-primary);
		}

		.card__link--disabled {
			color: var(--color-text-tertiary);
			cursor: default;
		}

		.card__link--disabled:hover {
			color: var(--color-text-tertiary);
		}
	`);

	const isActive = app.status === "active";
	const statusClass = isActive ? "card__status--active" : "card__status--landing";

	return (
		<article class="card">
			<div class="card__top">
				<div class="card__dot" style={{ background: app.accent }} />
				<span class="card__name">{app.name}</span>
			</div>
			<p class="card__desc">{app.desc}</p>
			<div class="card__footer">
				<span class="card__domain">{app.domain}</span>
				<span class={`card__status ${statusClass}`}>{isActive ? "Active" : "준비 중"}</span>
			</div>
			{isActive ? (
				<a href={app.appUrl} class="card__link" target="_blank" rel="noopener">
					앱 열기 &rarr;
				</a>
			) : (
				<span class="card__link card__link--disabled">준비 중</span>
			)}
		</article>
	);
});
