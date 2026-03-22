import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { SessionUser } from "~/lib/session";
import { AppGrid } from "./AppGrid";
import { IndustryFeedPlaceholder } from "./IndustryFeedPlaceholder";
import { NewsletterPlaceholder } from "./NewsletterPlaceholder";
import { PortalHeader } from "./PortalHeader";

interface PortalViewProps {
	user: SessionUser;
}

export const PortalView = component$<PortalViewProps>(({ user }) => {
	useStylesScoped$(`
		.portal {
			max-width: var(--content-max-width);
			margin: 0 auto;
			padding: var(--space-8) var(--content-padding);
			position: relative;
			z-index: 1;
		}
	`);

	return (
		<main class="portal">
			<PortalHeader user={user} />
			<AppGrid />
			<NewsletterPlaceholder />
			<IndustryFeedPlaceholder />
		</main>
	);
});
