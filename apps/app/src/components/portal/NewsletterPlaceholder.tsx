import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const NewsletterPlaceholder = component$(() => {
	useStylesScoped$(`
		.newsletter {
			margin-top: var(--space-10);
		}

		.newsletter__label {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: var(--color-text-tertiary);
			margin-bottom: var(--space-4);
		}

		.newsletter__grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
			gap: var(--space-4);
			margin-bottom: var(--space-4);
		}

		.newsletter__ghost {
			background: var(--color-surface-1);
			border: 1px dashed var(--color-border-subtle);
			border-radius: var(--radius-3);
			padding: var(--space-5);
			opacity: 0.5;
		}

		.newsletter__ghost-bar {
			height: 12px;
			background: var(--color-surface-3);
			border-radius: var(--radius-1);
			margin-bottom: var(--space-3);
		}

		.newsletter__ghost-bar--short {
			width: 60%;
		}

		.newsletter__ghost-bar--long {
			width: 90%;
		}

		.newsletter__ghost-bar--medium {
			width: 75%;
			margin-bottom: 0;
		}

		.newsletter__hint {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			font-style: italic;
		}
	`);

	return (
		<section class="newsletter">
			<span class="newsletter__label">Modfolio Press 뉴스레터</span>
			<div class="newsletter__grid">
				{[1, 2, 3].map((i) => (
					<div class="newsletter__ghost" key={i}>
						<div class="newsletter__ghost-bar newsletter__ghost-bar--short" />
						<div class="newsletter__ghost-bar newsletter__ghost-bar--long" />
						<div class="newsletter__ghost-bar newsletter__ghost-bar--medium" />
					</div>
				))}
			</div>
			<span class="newsletter__hint">곧 Press 매거진에서 최신 기사가 여기에 표시됩니다</span>
		</section>
	);
});
