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
			background: var(--card-bg);
			border: var(--card-border);
			border-radius: var(--card-radius);
			padding: var(--space-9) var(--space-8);
			box-shadow: var(--shadow-2);
			max-width: 400px;
			width: 100%;
			text-align: center;
		}

		.gate__logo {
			width: var(--size-icon-box);
			height: var(--size-icon-box);
			background: transparent;
			border: 1px solid var(--color-interactive-primary);
			border-radius: var(--radius-2);
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--color-text-accent);
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
			letter-spacing: var(--tracking-tight);
			margin-bottom: var(--space-2);
		}

		.gate__subtitle {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			text-transform: uppercase;
			letter-spacing: var(--tracking-label);
			margin-bottom: var(--space-8);
		}

		.gate__cta {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			height: var(--size-btn-lg);
			width: 100%;
			background: var(--color-interactive-primary);
			border-radius: var(--radius-2);
			color: var(--color-text-inverse);
			font-family: var(--font-ui);
			font-size: var(--text-base);
			font-weight: 600;
			transition: background var(--dur-fast) var(--ease-out),
				transform var(--dur-fast) var(--ease-out);
		}

		.gate__cta:hover {
			background: var(--color-interactive-hover);
			transform: translateY(calc(var(--space-1) * -0.5));
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
						<p class="gate__subtitle">Applied Science & Engineering</p>
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
