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
			margin-bottom: var(--section-gap);
		}

		.feed__label {
			font-family: var(--font-ui);
			font-size: var(--section-label-size);
			font-weight: var(--section-label-weight);
			text-transform: uppercase;
			letter-spacing: var(--section-label-tracking);
			color: var(--section-label-color);
		}

		.feed__badge {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			height: var(--size-badge);
			padding: 0 var(--space-2);
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-interactive-primary);
			background: var(--color-interactive-muted);
			border-radius: var(--radius-1);
			letter-spacing: var(--tracking-label);
			text-transform: uppercase;
		}

		.feed__panel {
			display: flex;
			align-items: flex-start;
			gap: var(--space-5);
			background: var(--card-bg);
			border: var(--card-border);
			border-radius: var(--card-radius);
			padding: var(--card-padding);
		}

		.feed__icon {
			flex-shrink: 0;
			width: var(--size-icon-box);
			height: var(--size-icon-box);
			background: var(--color-interactive-muted);
			border-radius: var(--radius-2);
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
			max-width: var(--measure);
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
					<svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
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
