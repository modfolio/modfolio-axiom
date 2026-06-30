/**
 * Data-integrity tests for the portal's typed data sources.
 *
 * These are pure-data invariant checks — no DOM, no network — run with Bun's
 * built-in test runner (`bun test`, Vitest-compatible API; no extra dependency,
 * consistent with the repo's "minimise runtime deps" rule). They guard the
 * source-of-truth registries (`domains`, `apps`, `dispatch`) against the
 * regressions that the data-driven components silently depend on: a domain
 * referencing a non-existent app id, a duplicate slug used as a render key, a
 * hardcoded colour that bypasses the token system, or a malformed external URL
 * opened with `target="_blank"`.
 */
import { describe, expect, test } from "bun:test";
import { apps } from "./apps";
import {
	type DispatchCategory,
	dispatchAccent,
	dispatchArticles,
	dispatchSource,
} from "./dispatch";
import { domains } from "./domains";

/** A value every accent/colour field must satisfy: a CSS custom-property ref. */
const isCssVar = (v: string): boolean => /^var\(--[a-z0-9-]+\)$/.test(v);

describe("apps registry", () => {
	test("has at least one app", () => {
		expect(apps.length).toBeGreaterThan(0);
	});

	test("ids are unique (used as render keys)", () => {
		const ids = apps.map((a) => a.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	test("status is a known enum value", () => {
		const allowed = new Set(["active", "landing", "development"]);
		for (const a of apps) {
			expect(allowed.has(a.status)).toBe(true);
		}
	});

	test("appUrl and landingUrl are absolute https URLs", () => {
		for (const a of apps) {
			for (const url of [a.appUrl, a.landingUrl]) {
				expect(() => new URL(url)).not.toThrow();
				expect(new URL(url).protocol).toBe("https:");
			}
		}
	});

	test("accent is a design token, not a hardcoded colour", () => {
		for (const a of apps) {
			expect(isCssVar(a.accent)).toBe(true);
		}
	});

	test("domain has no scheme or path (host only)", () => {
		for (const a of apps) {
			expect(a.domain).not.toContain("/");
			expect(a.domain).toMatch(/^[a-z0-9.-]+\.[a-z]{2,}$/);
		}
	});
});

describe("applied domains", () => {
	test("there are exactly six domains", () => {
		expect(domains.length).toBe(6);
	});

	test("ids are unique", () => {
		const ids = domains.map((d) => d.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	test("numbers are unique and sequential 01..06", () => {
		const numbers = domains.map((d) => d.number).sort();
		expect(numbers).toEqual(["01", "02", "03", "04", "05", "06"]);
	});

	test("each overview has three paragraphs (the content-map contract)", () => {
		for (const d of domains) {
			expect(d.overview.length).toBe(3);
			for (const p of d.overview) {
				expect(p.trim().length).toBeGreaterThan(0);
			}
		}
	});

	test("each domain lists exactly four capabilities", () => {
		for (const d of domains) {
			expect(d.capabilities.length).toBe(4);
			for (const cap of d.capabilities) {
				expect(cap.title.trim().length).toBeGreaterThan(0);
				expect(cap.description.trim().length).toBeGreaterThan(0);
			}
		}
	});

	test("accent is a design token, not a hardcoded colour", () => {
		for (const d of domains) {
			expect(isCssVar(d.accent)).toBe(true);
		}
	});

	test("every appId resolves to a real entry in the apps registry", () => {
		const appIds = new Set(apps.map((a) => a.id));
		for (const d of domains) {
			for (const id of d.appIds) {
				expect(appIds.has(id)).toBe(true);
			}
		}
	});

	test("appIds within a domain are unique", () => {
		for (const d of domains) {
			expect(new Set(d.appIds).size).toBe(d.appIds.length);
		}
	});
});

describe("apps ↔ domains linkage", () => {
	test("every registered app is referenced by exactly one domain", () => {
		// The portal's AppGrid shows all apps; DomainGrid attributes each to a
		// domain. An app referenced by zero domains would be unreachable from the
		// taxonomy; one referenced by several would render duplicated.
		for (const a of apps) {
			const owners = domains.filter((d) => d.appIds.includes(a.id));
			expect(owners.length).toBe(1);
		}
	});

	test("the DomainGrid derivation matches the appIds declaration", () => {
		// Mirrors DomainGrid.tsx: linkedApps = apps.filter(a => domain.appIds.includes(a.id)).
		for (const d of domains) {
			const linked = apps.filter((a) => d.appIds.includes(a.id)).map((a) => a.id);
			expect(linked.sort()).toEqual([...d.appIds].sort());
		}
	});
});

describe("axiom dispatch feed", () => {
	test("accent map covers every category exactly", () => {
		const categories: DispatchCategory[] = ["magazine", "newsletter", "briefing"];
		expect(Object.keys(dispatchAccent).sort()).toEqual([...categories].sort());
		for (const c of categories) {
			expect(isCssVar(dispatchAccent[c])).toBe(true);
		}
	});

	test("source feed URL is absolute https", () => {
		expect(() => new URL(dispatchSource.feedUrl)).not.toThrow();
		expect(new URL(dispatchSource.feedUrl).protocol).toBe("https:");
	});

	test("any present article is structurally valid (empty feed is also valid)", () => {
		// The feed is intentionally empty until a Press article-feed contract
		// ships (see dispatch.ts). This test does not require entries — it only
		// enforces shape *if* entries exist, so populating the array later is
		// guarded automatically.
		const ids = dispatchArticles.map((x) => x.id);
		expect(new Set(ids).size).toBe(ids.length);
		const categories = new Set(Object.keys(dispatchAccent));
		for (const article of dispatchArticles) {
			expect(article.id.trim().length).toBeGreaterThan(0);
			expect(article.title.trim().length).toBeGreaterThan(0);
			expect(categories.has(article.category)).toBe(true);
			expect(new URL(article.url).protocol).toBe("https:");
			// publishedAt is ISO-8601 YYYY-MM-DD and a real calendar date.
			expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(Number.isNaN(Date.parse(article.publishedAt))).toBe(false);
		}
	});
});
