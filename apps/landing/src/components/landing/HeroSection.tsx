import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const HeroSection = component$(() => {
	useStylesScoped$(`
		.hero {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-height: 100dvh;
			text-align: center;
			padding: var(--space-6) var(--content-padding);
			position: relative;
			z-index: 1;
		}

		.hero__label {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 0.12em;
			color: var(--color-text-tertiary);
			margin-bottom: var(--space-5);
		}

		.hero__heading {
			font-family: var(--font-display);
			font-size: var(--text-4xl);
			font-weight: 700;
			line-height: var(--leading-tight);
			letter-spacing: -0.02em;
			background: var(--accent-gradient);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			margin-bottom: var(--space-4);
			max-width: 14ch;
		}

		.hero__tagline {
			font-family: var(--font-body);
			font-size: var(--text-xl);
			font-style: italic;
			color: var(--color-text-secondary);
			margin-bottom: var(--space-3);
		}

		.hero__desc {
			font-family: var(--font-ui);
			font-size: var(--text-base);
			color: var(--color-text-tertiary);
			max-width: 36ch;
			line-height: var(--leading-normal);
			margin-bottom: var(--space-8);
		}

		.hero__cta {
			display: inline-flex;
			align-items: center;
			gap: var(--space-2);
			padding: var(--space-3) var(--space-6);
			background: var(--accent-gradient);
			border: none;
			border-radius: var(--radius-2);
			color: var(--color-text-inverse);
			font-family: var(--font-marketing);
			font-size: var(--text-base);
			font-weight: 600;
			cursor: pointer;
			transition: opacity 0.2s, transform 0.2s;
		}

		.hero__cta:hover {
			opacity: 0.92;
			transform: translateY(-1px);
		}

		.hero__sub-cta {
			display: inline-block;
			margin-top: var(--space-4);
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			color: var(--color-text-tertiary);
			border-bottom: 1px solid var(--color-border-subtle);
			padding-bottom: 2px;
			transition: color 0.2s, border-color 0.2s;
		}

		.hero__sub-cta:hover {
			color: var(--color-text-secondary);
			border-color: var(--color-border-hover);
		}
	`);

	return (
		<section class="hero">
			<span class="hero__label">Modfolio Axiom</span>
			<h1 class="hero__heading">기술은 어디에나 있지만, 삶의 이동에는 닿지 않는다</h1>
			<p class="hero__tagline">Technology & Mobility</p>
			<p class="hero__desc">
				수많은 디지털 도구 사이에서 정작 우리의 움직임은 단절되어 있습니다. Axiom은 기술이 사람과
				함께 이동하는 세계를 만듭니다.
			</p>
			<a href="/auth/login" class="hero__cta">
				Modfolio Connect로 시작하기
			</a>
			<a href="#narrative" class="hero__sub-cta">
				더 알아보기
			</a>
		</section>
	);
});
