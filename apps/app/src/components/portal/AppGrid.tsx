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
			margin-bottom: var(--section-gap);
		}

		.apps__label {
			font-family: var(--font-ui);
			font-size: var(--section-label-size);
			font-weight: var(--section-label-weight);
			text-transform: uppercase;
			letter-spacing: var(--section-label-tracking);
			color: var(--section-label-color);
		}

		.apps__count {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			height: var(--size-badge);
			padding: 0 var(--space-2);
			font-family: var(--font-code);
			font-size: var(--text-xs);
			font-weight: 600;
			letter-spacing: var(--tracking-label);
			color: var(--color-interactive-primary);
			background: var(--color-interactive-muted);
			border-radius: var(--radius-1);
		}

		.apps__grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
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
