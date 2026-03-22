import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const AppShowcase = component$(() => {
	useStylesScoped$(`
		.showcase {
			padding: var(--space-11) var(--content-padding);
			max-width: var(--content-max-width);
			margin: 0 auto;
			position: relative;
			z-index: 1;
		}

		.showcase__label {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: var(--color-text-tertiary);
			margin-bottom: var(--space-3);
		}

		.showcase__heading {
			font-family: var(--font-display);
			font-size: var(--text-2xl);
			font-weight: 700;
			line-height: var(--leading-snug);
			color: var(--color-text-primary);
			margin-bottom: var(--space-8);
		}

		.showcase__card {
			background: var(--color-surface-1);
			border: 1px solid var(--color-border-default);
			border-radius: var(--radius-4);
			padding: var(--space-7);
			max-width: 480px;
			transition: transform 0.2s, border-color 0.2s;
		}

		.showcase__card:hover {
			transform: translateY(-2px);
			border-color: var(--color-border-hover);
		}

		.showcase__card-top {
			display: flex;
			align-items: center;
			gap: var(--space-3);
			margin-bottom: var(--space-4);
		}

		.showcase__dot {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: var(--color-interactive-secondary);
			flex-shrink: 0;
		}

		.showcase__card-name {
			font-family: var(--font-display);
			font-size: var(--text-xl);
			font-weight: 700;
		}

		.showcase__card-desc {
			font-family: var(--font-body);
			font-size: var(--text-base);
			color: var(--color-text-secondary);
			line-height: var(--leading-normal);
			margin-bottom: var(--space-4);
		}

		.showcase__card-outcome {
			font-family: var(--font-marketing);
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--color-interactive-secondary);
		}

		.showcase__card-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: var(--space-5);
			padding-top: var(--space-4);
			border-top: 1px solid var(--color-border-subtle);
		}

		.showcase__domain {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
		}

		.showcase__status {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			padding: var(--space-1) var(--space-3);
			border-radius: var(--radius-pill);
			background: rgba(255, 217, 122, 0.12);
			color: var(--color-status-pending);
		}
	`);

	return (
		<section class="showcase">
			<span class="showcase__label">Axiom 앱</span>
			<h2 class="showcase__heading">기다리는 시간을 되찾으세요</h2>
			<div class="showcase__card">
				<div class="showcase__card-top">
					<div class="showcase__dot" />
					<span class="showcase__card-name">Amberstella</span>
				</div>
				<p class="showcase__card-desc">
					실시간 셔틀 위치 추적과 탑승 관리. Durable Objects 기반의 실시간 데이터로 정확한 도착
					시간을 알려드립니다.
				</p>
				<span class="showcase__card-outcome">
					셔틀을 기다리는 불확실한 시간, 더 이상 낭비하지 마세요
				</span>
				<div class="showcase__card-footer">
					<span class="showcase__domain">amberstella.com</span>
					<span class="showcase__status">준비 중</span>
				</div>
			</div>
		</section>
	);
});
