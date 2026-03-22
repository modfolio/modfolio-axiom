import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { SessionUser } from "~/lib/session";

interface PortalHeaderProps {
	user: SessionUser;
}

export const PortalHeader = component$<PortalHeaderProps>(({ user }) => {
	useStylesScoped$(`
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: var(--space-8);
		}

		.header__title {
			font-family: var(--font-display);
			font-size: var(--text-2xl);
			font-weight: 700;
		}

		.header__user {
			display: flex;
			align-items: center;
			gap: var(--space-4);
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			color: var(--color-text-secondary);
		}

		.header__logout {
			padding: var(--space-2) var(--space-4);
			border: 1px solid var(--color-border-default);
			border-radius: var(--radius-2);
			background: transparent;
			color: var(--color-text-secondary);
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			cursor: pointer;
			transition: border-color 0.2s, color 0.2s;
		}

		.header__logout:hover {
			border-color: var(--color-border-hover);
			color: var(--color-text-primary);
		}
	`);

	return (
		<header class="header">
			<h1 class="header__title">Axiom Portal</h1>
			<div class="header__user">
				<span>{user.email}</span>
				<a href="/auth/logout" class="header__logout">
					로그아웃
				</a>
			</div>
		</header>
	);
});
