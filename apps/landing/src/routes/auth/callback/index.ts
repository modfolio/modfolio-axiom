import type { RequestHandler } from "@builder.io/qwik-city";
import {
	SESSION_COOKIE,
	exchangeCode,
	getRedirectUri,
} from "~/lib/auth";

export const onGet: RequestHandler = async (requestEvent) => {
	const code = requestEvent.url.searchParams.get("code");
	const state = requestEvent.url.searchParams.get("state");
	const savedState = requestEvent.cookie.get("ma_oauth_state")?.value;
	const verifier = requestEvent.cookie.get("ma_pkce_verifier")?.value;
	const returnTo = requestEvent.cookie.get("ma_return_to")?.value ?? "/";

	// Clean up temp cookies
	requestEvent.cookie.delete("ma_pkce_verifier", { path: "/" });
	requestEvent.cookie.delete("ma_oauth_state", { path: "/" });
	requestEvent.cookie.delete("ma_return_to", { path: "/" });

	if (!code || !state || !savedState || !verifier) {
		requestEvent.status(400);
		requestEvent.send(400, "Missing authorization parameters");
		return;
	}

	if (state !== savedState) {
		requestEvent.status(400);
		requestEvent.send(400, "Invalid state parameter");
		return;
	}

	const tokens = await exchangeCode(
		code,
		verifier,
		getRedirectUri(requestEvent.url),
	);

	requestEvent.cookie.set(SESSION_COOKIE, tokens.token, {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge: [tokens.expires_in],
	});

	throw requestEvent.redirect(302, returnTo);
};
