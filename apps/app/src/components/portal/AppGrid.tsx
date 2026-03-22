import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { apps } from "~/data/apps";
import { AppCard } from "./AppCard";

export const AppGrid = component$(() => {
	useStylesScoped$(`
		.grid__label {
			font-family: var(--font-ui);
			font-size: var(--text-xs);
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: var(--color-text-tertiary);
			margin-bottom: var(--space-4);
		}

		.grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: var(--space-5);
		}
	`);

	return (
		<section>
			<span class="grid__label">앱</span>
			<div class="grid">
				{apps.map((app) => (
					<AppCard key={app.id} app={app} />
				))}
			</div>
		</section>
	);
});
