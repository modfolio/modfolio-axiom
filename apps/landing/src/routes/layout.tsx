import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { SessionUser } from "~/lib/session";

export const useUser = routeLoader$<SessionUser | null>(
	async (requestEvent) => {
		return (
			(requestEvent.sharedMap.get("user") as SessionUser | null) ?? null
		);
	},
);

export default component$(() => {
	return <Slot />;
});
