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
			padding: var(--space-4) 0;
			margin-bottom: var(--space-6);
			border-bottom: 1px solid var(--color-border-subtle);
		}

		.header__brand {
			display: flex;
			align-items: center;
			gap: var(--space-3);
		}

		.header__logo {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 36px;
			height: 36px;
			background: var(--accent-gradient);
			border-radius: var(--radius-2);
			color: var(--color-text-inverse);
			font-family: var(--font-display);
			font-size: var(--text-lg);
			font-weight: 700;
		}

		.header__wordmark {
			font-family: var(--font-display);
			font-size: var(--text-xl);
			font-weight: 700;
			color: var(--color-text-primary);
			letter-spacing: var(--tracking-tight);
		}

		.header__tag {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			letter-spacing: var(--tracking-wide);
			padding: var(--space-1) var(--space-3);
			background: var(--color-surface-2);
			border-radius: var(--radius-pill);
		}

		.header__actions {
			display: flex;
			align-items: center;
			gap: var(--space-4);
		}

		.header__user {
			display: flex;
			align-items: center;
			gap: var(--space-2);
		}

		.header__avatar {
			width: 32px;
			height: 32px;
			border-radius: 50%;
			background: var(--indigo-3);
			color: var(--indigo-9);
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
			text-transform: uppercase;
		}

		.header__name {
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			color: var(--color-text-secondary);
		}

		.header__logout {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			padding: var(--space-2) var(--space-4);
			border: 1px solid var(--color-border-default);
			border-radius: var(--radius-2);
			background: transparent;
			cursor: pointer;
			transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
		}

		.header__logout:hover {
			color: var(--color-text-primary);
			border-color: var(--color-border-hover);
			background: var(--color-surface-2);
		}

		@media (max-width: 640px) {
			.header__tag {
				display: none;
			}

			.header__name {
				display: none;
			}
		}
	`);

	const initials = user.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.slice(0, 2)
		: user.email[0];

	return (
		<header class="header">
			<div class="header__brand">
				<span class="header__logo">A</span>
				<span class="header__wordmark">Axiom</span>
				<span class="header__tag">Technology & Mobility</span>
			</div>
			<div class="header__actions">
				<div class="header__user">
					<div class="header__avatar">{initials}</div>
					<span class="header__name">{user.name || user.email}</span>
				</div>
				<a href="/auth/logout" class="header__logout">
					Sign out
				</a>
			</div>
		</header>
	);
});
