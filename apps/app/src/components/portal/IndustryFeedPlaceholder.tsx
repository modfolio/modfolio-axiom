import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const IndustryFeedPlaceholder = component$(() => {
	useStylesScoped$(`
		.feed {
			margin-bottom: var(--space-8);
		}

		.feed__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: var(--space-4);
		}

		.feed__label {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: var(--tracking-wide);
			color: var(--color-text-tertiary);
		}

		.feed__badge {
			font-family: var(--font-code);
			font-size: 11px;
			color: var(--color-interactive-primary);
			background: var(--indigo-3);
			padding: var(--space-1) var(--space-3);
			border-radius: var(--radius-pill);
			letter-spacing: 0.03em;
			text-transform: uppercase;
		}

		.feed__panel {
			display: flex;
			align-items: flex-start;
			gap: var(--space-5);
			background: var(--color-surface-1);
			border: 1px solid var(--color-border-default);
			border-radius: var(--radius-3);
			padding: var(--space-6);
			box-shadow: var(--shadow-1);
		}

		.feed__icon {
			flex-shrink: 0;
			width: 56px;
			height: 56px;
			background: var(--indigo-3);
			border-radius: var(--radius-3);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.feed__title {
			font-family: var(--font-ui);
			font-size: var(--text-base);
			font-weight: 600;
			color: var(--color-text-primary);
			margin-bottom: var(--space-2);
		}

		.feed__desc {
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			color: var(--color-text-tertiary);
			line-height: var(--leading-normal);
			max-width: 55ch;
		}
	`);

	return (
		<section class="feed">
			<div class="feed__header">
				<span class="feed__label">Industry Intelligence</span>
				<span class="feed__badge">Coming Soon</span>
			</div>
			<div class="feed__panel">
				<div class="feed__icon">
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
						<path
							d="M4 24 L12 16 L18 20 L28 8"
							stroke="var(--color-interactive-primary)"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<circle cx="28" cy="8" r="3" fill="var(--color-interactive-primary)" opacity="0.3" />
					</svg>
				</div>
				<div>
					<h3 class="feed__title">Technology & Mobility Trends</h3>
					<p class="feed__desc">
						Real-time industry signals from curated sources will appear here. Tracking EV,
						autonomous, connectivity, and logistics verticals.
					</p>
				</div>
			</div>
		</section>
	);
});
