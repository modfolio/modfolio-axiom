import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { PortalView } from "~/components/portal/PortalView";
import { useUser } from "./layout";

export default component$(() => {
	const user = useUser();

	useStylesScoped$(`
		.gate {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-height: 100dvh;
			padding: var(--space-6) var(--content-padding);
		}

		.gate__card {
			display: flex;
			flex-direction: column;
			align-items: center;
			background: var(--color-surface-1);
			border: 1px solid var(--color-border-default);
			border-radius: var(--radius-4);
			padding: var(--space-9) var(--space-8);
			box-shadow: var(--shadow-2);
			max-width: 400px;
			width: 100%;
			text-align: center;
		}

		.gate__logo {
			width: 56px;
			height: 56px;
			background: var(--accent-gradient);
			border-radius: var(--radius-3);
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--color-text-inverse);
			font-family: var(--font-display);
			font-size: var(--text-xl);
			font-weight: 700;
			margin-bottom: var(--space-5);
		}

		.gate__title {
			font-family: var(--font-display);
			font-size: var(--text-2xl);
			font-weight: 700;
			color: var(--color-text-primary);
			margin-bottom: var(--space-2);
		}

		.gate__subtitle {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			text-transform: uppercase;
			letter-spacing: var(--tracking-wide);
			margin-bottom: var(--space-8);
		}

		.gate__cta {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: var(--space-3) var(--space-7);
			background: var(--color-interactive-primary);
			border-radius: var(--radius-2);
			color: var(--color-text-inverse);
			font-family: var(--font-ui);
			font-size: var(--text-base);
			font-weight: 600;
			width: 100%;
			transition: background 0.15s ease, transform 0.15s ease;
		}

		.gate__cta:hover {
			background: var(--color-interactive-hover);
			transform: translateY(-1px);
		}

		.gate__powered {
			margin-top: var(--space-5);
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
		}
	`);

	return (
		<>
			{user.value ? (
				<PortalView user={user.value} />
			) : (
				<main class="gate">
					<div class="gate__card">
						<div class="gate__logo">A</div>
						<h1 class="gate__title">Axiom Portal</h1>
						<p class="gate__subtitle">Technology & Mobility</p>
						<a href="/auth/login" class="gate__cta">
							Modfolio Connect로 로그인
						</a>
						<span class="gate__powered">Powered by Modfolio Connect</span>
					</div>
				</main>
			)}
		</>
	);
});
