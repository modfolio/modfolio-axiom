import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const CTASection = component$(() => {
	useStylesScoped$(`
		.cta {
			padding: var(--space-12) var(--content-padding);
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			position: relative;
			z-index: 1;
		}

		.cta__heading {
			font-family: var(--font-display);
			font-size: var(--text-3xl);
			font-weight: 700;
			line-height: var(--leading-tight);
			color: var(--color-text-primary);
			margin-bottom: var(--space-4);
		}

		.cta__desc {
			font-family: var(--font-ui);
			font-size: var(--text-base);
			color: var(--color-text-secondary);
			max-width: 40ch;
			line-height: var(--leading-normal);
			margin-bottom: var(--space-8);
		}

		.cta__primary {
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

		.cta__primary:hover {
			opacity: 0.92;
			transform: translateY(-1px);
		}

		.cta__badge {
			margin-top: var(--space-8);
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			letter-spacing: 0.02em;
		}

		.cta__footer {
			margin-top: var(--space-12);
			padding-top: var(--space-6);
			border-top: 1px solid var(--color-border-subtle);
			width: 100%;
			max-width: var(--content-max-width);
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.cta__copyright {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
		}

		.cta__links {
			display: flex;
			gap: var(--space-4);
		}

		.cta__link {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			transition: color 0.2s;
		}

		.cta__link:hover {
			color: var(--color-text-secondary);
		}
	`);

	return (
		<section class="cta">
			<h2 class="cta__heading">함께 움직이는 기술</h2>
			<p class="cta__desc">Modfolio Connect 계정 하나로 Axiom의 모든 서비스에 접근하세요.</p>
			<a href="/auth/login" class="cta__primary">
				지금 시작하기
			</a>
			<span class="cta__badge">axiom.modfolio.io</span>

			<footer class="cta__footer">
				<span class="cta__copyright">&copy; 2026 Modfolio. All rights reserved.</span>
				<nav class="cta__links">
					<a href="https://modfolio.io" class="cta__link" target="_blank" rel="noopener">
						Modfolio
					</a>
					<a href="https://connect.modfolio.io" class="cta__link" target="_blank" rel="noopener">
						Connect
					</a>
				</nav>
			</footer>
		</section>
	);
});
