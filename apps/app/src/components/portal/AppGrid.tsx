import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { apps } from "~/data/apps";
import { AppCard } from "./AppCard";

export const AppGrid = component$(() => {
	useStylesScoped$(`
		.apps {
			margin-bottom: var(--space-8);
		}

		.apps__header {
			display: flex;
			align-items: center;
			gap: var(--space-3);
			margin-bottom: var(--space-5);
		}

		.apps__label {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: var(--tracking-wide);
			color: var(--color-text-tertiary);
		}

		.apps__count {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-interactive-primary);
			background: var(--indigo-3);
			padding: 2px var(--space-2);
			border-radius: var(--radius-1);
			font-weight: 600;
		}

		.apps__grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: var(--space-5);
		}
	`);

	return (
		<section class="apps">
			<div class="apps__header">
				<span class="apps__label">Applications</span>
				<span class="apps__count">{apps.length}</span>
			</div>
			<div class="apps__grid">
				{apps.map((app) => (
					<AppCard key={app.id} app={app} />
				))}
			</div>
		</section>
	);
});
