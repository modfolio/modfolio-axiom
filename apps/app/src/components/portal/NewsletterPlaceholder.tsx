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
			margin-bottom: var(--space-4);
		}

		.news__label {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: var(--tracking-wide);
			color: var(--color-text-tertiary);
		}

		.news__source {
			font-family: var(--font-code);
			font-size: 11px;
			color: var(--color-text-tertiary);
			opacity: 0.7;
		}

		.news__grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: var(--space-4);
		}

		.news__slot {
			display: flex;
			align-items: flex-start;
			gap: var(--space-4);
			background: var(--color-surface-1);
			border: 1px solid var(--color-border-subtle);
			border-radius: var(--radius-3);
			padding: var(--space-5);
			box-shadow: var(--shadow-1);
		}

		.news__slot-number {
			font-family: var(--font-code);
			font-size: var(--text-2xl);
			font-weight: 700;
			color: var(--color-border-default);
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
			font-size: 11px;
			color: var(--color-text-tertiary);
			opacity: 0.6;
			text-transform: uppercase;
			letter-spacing: 0.03em;
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
