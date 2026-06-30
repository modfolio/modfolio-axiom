import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { apps } from "~/data/apps";
import type { SessionUser } from "~/lib/session";
import { AppGrid } from "./AppGrid";
import { AxiomDispatch } from "./AxiomDispatch";
import { DomainGrid } from "./DomainGrid";
import { PortalHeader } from "./PortalHeader";

interface PortalViewProps {
	user: SessionUser;
}

export const PortalView = component$<PortalViewProps>(({ user }) => {
	useStylesScoped$(`
		.portal {
			max-width: var(--content-max-width);
			margin: 0 auto;
			padding: var(--space-6) var(--content-padding);
			min-height: 100dvh;
			display: flex;
			flex-direction: column;
		}

		.portal__welcome {
			margin-bottom: var(--space-8);
			padding: var(--card-padding);
			background: var(--card-bg);
			border: var(--card-border);
			border-radius: var(--card-radius);
		}

		.portal__greeting {
			font-family: var(--font-display);
			font-size: var(--text-2xl);
			font-weight: 700;
			color: var(--color-text-primary);
			letter-spacing: var(--tracking-tight);
			margin-bottom: var(--space-2);
		}

		.portal__summary {
			font-family: var(--font-code);
			font-size: var(--text-sm);
			color: var(--color-text-tertiary);
			letter-spacing: var(--tracking-label);
		}

		.portal__footer {
			margin-top: auto;
			padding-top: var(--space-8);
			padding-bottom: var(--space-4);
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			border-top: 1px solid var(--color-border-default);
		}

		.portal__footer-links {
			display: flex;
			gap: var(--space-4);
		}

		.portal__footer-link {
			color: var(--color-text-tertiary);
			transition: color var(--dur-fast) var(--ease-out);
		}

		.portal__footer-link:hover {
			color: var(--color-interactive-primary);
		}
	`);

	const displayName = user.name || user.email.split("@")[0];
	const activeCount = apps.filter((a) => a.status === "active").length;

	return (
		<main class="portal">
			<PortalHeader user={user} />

			<section class="portal__welcome">
				<h2 class="portal__greeting">Welcome, {displayName}</h2>
				<p class="portal__summary">
					{"AXIOM CONTROL CENTER // "}
					{apps.length}
					{" app(s) registered // "}
					{activeCount}
					{" active"}
				</p>
			</section>

			<AppGrid />
			<DomainGrid />
			<AxiomDispatch />

			<footer class="portal__footer">
				<span>&copy; 2026 Modfolio. All rights reserved.</span>
				<nav class="portal__footer-links">
					<a href="https://modfolio.io" class="portal__footer-link" target="_blank" rel="noopener">
						Modfolio
					</a>
					<a
						href="https://axiom.modfolio.io"
						class="portal__footer-link"
						target="_blank"
						rel="noopener"
					>
						Axiom
					</a>
				</nav>
			</footer>
		</main>
	);
});
