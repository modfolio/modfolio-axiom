import type { RequestHandler } from "@builder.io/qwik-city";
import { SESSION_COOKIE } from "~/lib/auth";
import { verifySession } from "~/lib/session";

export const onRequest: RequestHandler = async (requestEvent) => {
	const token = requestEvent.cookie.get(SESSION_COOKIE)?.value;
	const user = await verifySession(token);
	requestEvent.sharedMap.set("user", user);
};
