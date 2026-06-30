/**
 * "Axiom Dispatch" — the portal's editorial feed, syndicated from
 * Modfolio Press (a separate service, `press.modfolio.io`).
 *
 * ── Why this is a typed data source, not a live fetch ──
 * Press publishes a magazine + newsletter feed (it exposes RSS at
 * `press.modfolio.io/rss.xml` and renders articles from an `articles`
 * content collection). The Axiom portal, however, may only consume another
 * service's data through a *published contract* — `@modfolio/contracts`,
 * SSO, or a webhook — never by scraping a sibling's RSS/HTML at runtime
 * (Zero-Physical-Sharing; `import-boundaries.md`). The current Press
 * contract (`@modfolio/contracts` → `press.ts`) defines only
 * `ebook.purchased` and `newsletter.subscribed` events; there is **no
 * article-feed contract** yet, so there is nothing typed for the portal to
 * pull. Fetching Press's RSS directly would also pair private session data
 * with unsanitised third-party strings — the kind of untrusted-input +
 * private-data coupling `lethal-trifecta.md` exists to prevent.
 *
 * So, mirroring `~/data/domains.ts` (where a domain with no registered app
 * renders a real empty state rather than fabricated "coming soon" copy),
 * this source is the single typed place the Dispatch feed lives. It is
 * currently empty: `articles` holds zero entries, so the portal renders a
 * real, typed empty state — not fabricated "Article placeholder / Awaiting
 * publication" rows. The moment a Press article-feed contract ships, this
 * array is populated from it (or a `routeLoader$` is added here against the
 * contract) and `AxiomDispatch` renders the entries with no further work.
 *
 * @see knowledge/canon (ecosystem) — contracts/events/press.ts
 * @see ~/data/domains.ts — the data-driven pattern this mirrors
 */

/** Editorial categories used to tint a Dispatch entry's accent. */
export type DispatchCategory = "magazine" | "newsletter" | "briefing";

export interface DispatchArticle {
	/** Stable slug, used as the React/Qwik key and the deep-link segment. */
	id: string;
	title: string;
	/** One-line summary shown beneath the title. */
	summary: string;
	category: DispatchCategory;
	/** ISO-8601 date (`YYYY-MM-DD`) the entry was published. */
	publishedAt: string;
	/** Canonical Press URL for the full piece. */
	url: string;
}

/**
 * Provenance shown in the section header. Kept verbatim from the prior
 * placeholder so the portal's labelling is unchanged: "Axiom Dispatch"
 * sourced "via Modfolio Press".
 */
export const dispatchSource = {
	label: "Axiom Dispatch",
	via: "via Modfolio Press",
	/** Where the full feed lives once a consumable contract exists. */
	feedUrl: "https://press.modfolio.io",
} as const;

/** Per-category accent token (Dark Precision palette, semantic only). */
export const dispatchAccent: Record<DispatchCategory, string> = {
	magazine: "var(--indigo-5)",
	newsletter: "var(--amber-5)",
	briefing: "var(--green-7)",
};

/**
 * The Dispatch feed.
 *
 * Empty until a Press article-feed contract is published (see file header).
 * An empty array is the source of truth for the empty state — do not add
 * placeholder entries here; real entries arrive from the contract.
 */
export const dispatchArticles: DispatchArticle[] = [];
