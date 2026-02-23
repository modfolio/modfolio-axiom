import type { RequestHandler } from "@builder.io/qwik-city";
import { SESSION_COOKIE } from "~/lib/auth";

export const onGet: RequestHandler = async (requestEvent) => {
	requestEvent.cookie.delete(SESSION_COOKIE, { path: "/" });
	throw requestEvent.redirect(302, "/");
};
