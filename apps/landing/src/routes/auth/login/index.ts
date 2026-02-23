import type { RequestHandler } from "@builder.io/qwik-city";
import { buildAuthorizeUrl, generatePKCE, getRedirectUri } from "~/lib/auth";

export const onGet: RequestHandler = async (requestEvent) => {
	const { verifier, challenge } = await generatePKCE();
	const state = crypto.randomUUID();
	const nonce = crypto.randomUUID();

	const cookieOpts = {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax" as const,
		maxAge: [600],
	};

	requestEvent.cookie.set("ma_pkce_verifier", verifier, cookieOpts);
	requestEvent.cookie.set("ma_oauth_state", state, cookieOpts);

	const returnTo = requestEvent.url.searchParams.get("returnTo") ?? "/";
	requestEvent.cookie.set("ma_return_to", returnTo, cookieOpts);

	const authorizeUrl = buildAuthorizeUrl({
		codeChallenge: challenge,
		state,
		redirectUri: getRedirectUri(requestEvent.url),
		nonce,
	});

	throw requestEvent.redirect(302, authorizeUrl);
};
