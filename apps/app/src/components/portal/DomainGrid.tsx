import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { apps } from "~/data/apps";
import { domains } from "~/data/domains";
import { DomainCard } from "./DomainCard";

export const DomainGrid = component$(() => {
	useStylesScoped$(`
		.domains {
			margin-bottom: var(--space-8);
		}

		.domains__header {
			display: flex;
			align-items: center;
			gap: var(--space-3);
			margin-bottom: var(--section-gap);
		}

		.domains__label {
			font-family: var(--font-ui);
			font-size: var(--section-label-size);
			font-weight: var(--section-label-weight);
			text-transform: uppercase;
			letter-spacing: var(--section-label-tracking);
			color: var(--section-label-color);
		}

		.domains__count {
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

		.domains__grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
			gap: var(--space-5);
		}
	`);

	return (
		<section class="domains" aria-labelledby="domains-heading">
			<div class="domains__header">
				<h2 id="domains-heading" class="domains__label">
					Applied Domains
				</h2>
				<span class="domains__count">{domains.length}</span>
			</div>
			<div class="domains__grid">
				{domains.map((domain) => {
					// Derive the linked apps from the registry (apps.ts is the
					// source of truth for the per-domain count) rather than trusting
					// the static appIds length.
					const linkedApps = apps.filter((app) => domain.appIds.includes(app.id));
					return <DomainCard key={domain.id} domain={domain} apps={linkedApps} />;
				})}
			</div>
		</section>
	);
});
