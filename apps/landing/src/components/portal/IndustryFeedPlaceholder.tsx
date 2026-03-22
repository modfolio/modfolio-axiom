import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const IndustryFeedPlaceholder = component$(() => {
	useStylesScoped$(`
		.feed {
			margin-top: var(--space-8);
		}

		.feed__label {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: var(--color-text-tertiary);
			margin-bottom: var(--space-4);
		}

		.feed__container {
			background: var(--color-surface-1);
			border: 1px dashed var(--color-border-subtle);
			border-radius: var(--radius-3);
			padding: var(--space-6);
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--space-3);
			opacity: 0.6;
		}

		.feed__icon {
			width: 32px;
			height: 32px;
			border-radius: 50%;
			background: var(--color-surface-3);
		}

		.feed__text {
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			color: var(--color-text-tertiary);
			text-align: center;
			max-width: 36ch;
		}
	`);

	return (
		<section class="feed">
			<span class="feed__label">산업 동향</span>
			<div class="feed__container">
				<div class="feed__icon" />
				<p class="feed__text">외부 소스에서 기술·모빌리티 트렌드를 수집 중입니다</p>
			</div>
		</section>
	);
});
