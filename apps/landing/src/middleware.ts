import type { APIContext, MiddlewareHandler } from "astro";
import { auth } from "./lib/connect";

/**
 * Baseline security response headers applied to every response the landing
 * Worker emits (HTML documents, auth redirects, and any dynamic route).
 *
 * ── Why here and not `public/_headers` ──
 * The landing is server-rendered by `@astrojs/cloudflare`, so the HTML
 * document is produced by the Worker at request time. A CF `_headers` file
 * governs *static asset* responses, not the SSR document — the live site was
 * therefore serving its HTML with no security headers at all (verified: only
 * `content-type` was present). Setting them in middleware covers every
 * response the Worker returns.
 *
 * ── Scope (deliberately conservative) ──
 * These headers are render-safe: none of them depend on the page's inline
 * markup. A full `Content-Security-Policy` is intentionally NOT set here —
 * Astro emits per-component inline `<style>` blocks (and a small inline
 * hydration bootstrap), so a correct CSP needs `style-src`/`script-src`
 * hashes or a nonce verified against the live render. That is tracked as a
 * follow-up rather than shipped blind, since a wrong CSP white-screens the
 * site.
 */
const SECURITY_HEADERS: Record<string, string> = {
	// Block MIME sniffing (defends against content-type confusion attacks).
	"X-Content-Type-Options": "nosniff",
	// Send only the origin cross-site; full path same-origin. Privacy + no leak
	// of authed URLs to third parties.
	"Referrer-Policy": "strict-origin-when-cross-origin",
	// This portal is never meant to be framed — hard clickjacking guard.
	"X-Frame-Options": "DENY",
	// Belt-and-braces framing guard for browsers honouring CSP frame-ancestors
	// (safe standalone directive; does not affect script/style loading).
	"Content-Security-Policy": "frame-ancestors 'none'",
	// Drop ambient access to powerful features the site does not use.
	"Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
	// Pin HTTPS for a year incl. subdomains (site is HTTPS-only behind CF).
	"Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

function withSecurityHeaders(response: Response): Response {
	for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
		// Do not clobber a header a downstream handler set intentionally.
		if (!response.headers.has(name)) {
			response.headers.set(name, value);
		}
	}
	return response;
}

export const onRequest: MiddlewareHandler = async (context, next) => {
	const response = context.url.pathname.startsWith("/auth/")
		? await auth.middleware(context as APIContext, next)
		: await defaultRoute(context, next);

	return withSecurityHeaders(response);
};

async function defaultRoute(
	context: Parameters<MiddlewareHandler>[0],
	next: Parameters<MiddlewareHandler>[1],
): Promise<Response> {
	context.locals.user = null;
	return next();
}
