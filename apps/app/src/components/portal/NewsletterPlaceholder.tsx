import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const NewsletterPlaceholder = component$(() => {
	useStylesScoped$(`
		.news {
			margin-bottom: var(--space-8);
		}

		.news__header {
			display: flex;
			align-items: baseline;
			gap: var(--space-3);
			margin-bottom: var(--section-gap);
		}

		.news__label {
			font-family: var(--font-ui);
			font-size: var(--section-label-size);
			font-weight: var(--section-label-weight);
			text-transform: uppercase;
			letter-spacing: var(--section-label-tracking);
			color: var(--section-label-color);
		}

		.news__source {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			letter-spacing: var(--tracking-label);
		}

		.news__grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
			gap: var(--space-4);
		}

		.news__slot {
			display: flex;
			align-items: flex-start;
			gap: var(--space-4);
			background: var(--card-bg);
			border: var(--card-border);
			border-radius: var(--card-radius);
			padding: var(--card-padding);
		}

		.news__slot-number {
			font-family: var(--font-code);
			font-size: var(--text-2xl);
			font-weight: 700;
			color: var(--color-border-hover);
			line-height: 1;
			flex-shrink: 0;
			user-select: none;
		}

		.news__slot-content {
			display: flex;
			flex-direction: column;
			gap: var(--space-1);
		}

		.news__slot-title {
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			font-weight: 500;
			color: var(--color-text-tertiary);
		}

		.news__slot-meta {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			text-transform: uppercase;
			letter-spacing: var(--tracking-label);
		}
	`);

	return (
		<section class="news">
			<div class="news__header">
				<span class="news__label">Axiom Dispatch</span>
				<span class="news__source">via Modfolio Press</span>
			</div>
			<div class="news__grid">
				{[1, 2, 3].map((i) => (
					<div class="news__slot" key={i}>
						<span class="news__slot-number">{String(i).padStart(2, "0")}</span>
						<div class="news__slot-content">
							<span class="news__slot-title">Article placeholder</span>
							<span class="news__slot-meta">Awaiting publication</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
});
