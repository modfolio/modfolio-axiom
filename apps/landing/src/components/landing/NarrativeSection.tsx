import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const NarrativeSection = component$(() => {
	useStylesScoped$(`
		.narrative {
			padding: var(--space-12) var(--content-padding);
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			position: relative;
			z-index: 1;
			max-width: var(--content-max-width);
			margin: 0 auto;
		}

		.narrative__divider {
			width: 64px;
			height: 2px;
			background: var(--accent-gradient-subtle);
			margin-bottom: var(--space-8);
			border: none;
		}

		.narrative__heading {
			font-family: var(--font-display);
			font-size: var(--text-2xl);
			font-weight: 700;
			line-height: var(--leading-snug);
			color: var(--color-text-primary);
			margin-bottom: var(--space-5);
			max-width: var(--measure);
		}

		.narrative__body {
			font-family: var(--font-body);
			font-size: var(--text-lg);
			line-height: var(--leading-relaxed);
			color: var(--color-text-secondary);
			max-width: var(--measure);
			margin-bottom: var(--space-5);
		}

		.narrative__aside {
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			color: var(--color-text-tertiary);
			border-left: 2px solid var(--color-border-default);
			padding-left: var(--space-4);
			max-width: 50ch;
			line-height: var(--leading-normal);
		}
	`);

	return (
		<section class="narrative" id="narrative">
			<hr class="narrative__divider" />
			<h2 class="narrative__heading">Technology & Mobility는 기기의 문제가 아닙니다</h2>
			<p class="narrative__body">
				사람이 공간과 시간을 관통하는 방식, 그 이동의 경험을 재설계하는 것. Axiom은 기술이 삶의 흐름
				속에 자연스럽게 녹아드는 순간을 만듭니다. 스마트 디바이스의 나열이 아니라, 움직임 그 자체를
				이해하는 기술.
			</p>
			<aside class="narrative__aside">
				Axiom 계열의 각 앱은 독립된 브랜드와 기술 스택으로 운영되며, Modfolio 생태계의 SSO와 데이터
				계약을 통해서만 연결됩니다.
			</aside>
		</section>
	);
});
