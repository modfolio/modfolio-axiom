# 2026-07-01 — Completeness / Robustness Round (scored-enhancement pass)

> Category: decision + discovery
> Scope: perfect ALREADY-implemented tech (not net-new). Owner directive:
> completeness/robustness of what exists, scored-enhancement method, 정공법.
> Repo: modfolio-axiom (landing = Astro `axiom.modfolio.io`, app = Qwik City
> portal live at `nexus.modfolio.io`).

## TL;DR

The app + landing are genuinely well-built (4-state UI, WCAG-conscious
disclosure, complete 3-tier token system with 0 used-but-undefined vars,
CLS-preventing font metrics, reduced-motion honoured, clean data-driven empty
states). The completeness pass found and **fixed** real defects in existing
tech and closed verification/SEO/config-reproducibility gaps. It also surfaced
one **production SSO break** whose root fix lives in a sibling repo
(modfolio-connect) and is therefore **documented, not edited** (Hub-not-enforcer).

## Evidence-based gaps found (cite)

1. **🔴 Production SSO redirect_uri mismatch (portal login structurally broken).**
   - The portal is live at `nexus.modfolio.io` (curl → 200, serves the Qwik
     `gate__` shell). Login emits
     `redirect_uri=https://nexus.modfolio.io/auth/callback` — the SDK derives it
     from request origin (`@modfolio/connect-sdk/dist/utils.js:36`,
     `${url.origin}/auth/callback`).
   - modfolio-connect's client `axiom` only has `arc.modfolio.io/auth/callback`
     + `axiom.modfolio.io/auth/callback` registered
     (`sql/migrations/0060_app-domain-callbacks.sql`, `migrations.generated.ts`).
     `nexus.modfolio.io` appears **nowhere** in modfolio-connect (gh code search
     = 0 hits). `arc.modfolio.io` does **not resolve** (curl → 000).
   - So the OIDC provider has no registration for the origin the live portal
     actually sends → a strict provider rejects the callback; the landing's
     "Enter Portal" buttons feed users into this flow.
   - Root cause = a Pages→Workers migration (commit 1bc61cb) renamed the portal
     domain to `nexus` (journal `20260627` GOTCHA #11 confirms `nexus.modfolio.io`
     is the bound custom domain) but the connect seed + ecosystem.json still
     carry the older `arc` name. **Two diverging intended states never
     reconciled.**
   - **Ownership**: the fix (register `nexus.modfolio.io/auth/callback` for
     client `axiom`, and/or settle arc-vs-nexus) is in **modfolio-connect** (the
     authoritative redirect registry — ecosystem.json `_note` confirms it is the
     mirror) + **ecosystem.json** `appDomain`. Both are sibling files. Per the
     absolute Hub-not-enforcer invariant this round **documents** them and does
     not edit them. → see "Deferred (sibling-owned)".

2. **🟠 App `wrangler.jsonc` did not declare its custom domain.** The
   `nexus.modfolio.io` binding existed only in CF dashboard state (added during
   1bc61cb); `wrangler.jsonc` had no `routes`. The config was therefore not a
   reproducible source of truth — a fresh `wrangler deploy` would not re-attach
   the domain. (modfolio-axiom-owned → fixed.)

3. **🟠 WebGL mesh animation was frozen after one frame (real loop bug).**
   `apps/landing/src/scripts/webgl-mesh.ts`: `requestAnimationFrame(render)` was
   called only in the throttle-skip branch (line 167) and the initial kickoff
   (line 186); the **render branch never rescheduled**. So after the first
   non-skipped frame the loop stopped — the "animated" gradient was effectively
   static in production. Plus the `gl.uniform*`/`drawArrays` calls had no guard,
   so a lost-context fault would throw and silently halt. (Fixed.)

4. **🟡 No tests anywhere** (0 `*.test.*` files repo-wide). The data-driven
   components depend on invariants in `domains.ts`/`apps.ts`/`dispatch.ts`
   (appId↔app resolution, unique render keys, token-only accents, valid external
   URLs) with nothing guarding them. (Fixed — `bun test` suite added.)

5. **🟡 Head/SEO completeness.** App `root.tsx` had no `color-scheme: dark`
   (light native controls/scroll + FOUC on a dark UI), no canonical, no favicon,
   no OG/Twitter. Landing `Base.astro` had OG but no `color-scheme`, no favicon,
   no Twitter card, and a homepage-hardcoded canonical/og:url (wrong on
   `/contact`). No favicon/robots/sitemap assets existed in either `public/`.
   (Fixed.)

6. **🟡 2 hardcoded RGBA badge fills** bypassing the token system
   (`apps/landing/src/styles/utilities.css:147,152`). (Fixed — tokenized.)

7. **🟢 Minor, NOT fixed (documented, avoid gold-plating):** Qwik app's built-in
   404 (`dist/404.html`) is the generic unbranded Qwik fallback (blue, EN). A
   branded Qwik 404 route would complete it but the app is behind SSO so raw
   404s are rare (score 19 — below the adopted cutoff). Landing 404 *was* added.

## Scored candidates (owner rubric, 0–5 each → /25)

①completeness ②정공법 ③longevity ④works-now+migration ⑤risk-inverse

| # | Candidate | ① | ② | ③ | ④ | ⑤ | /25 | Rank | Owner | Decision |
|---|-----------|---|---|---|---|---|-----|------|-------|----------|
| C1 | App `wrangler.jsonc`: declare `nexus.modfolio.io` custom-domain route (config-as-SoT) | 5 | 5 | 5 | 5 | 5 | **25** | 1 | axiom | ADOPTED |
| C2 | App `root.tsx` head: `color-scheme:dark` + favicon + canonical + OG + Twitter | 4 | 5 | 4 | 5 | 5 | **23** | 2 | axiom | ADOPTED |
| C4 | Landing head/SEO: favicon, color-scheme, Twitter, path-aware canonical, 404, robots, sitemap | 4 | 5 | 4 | 5 | 5 | **23** | 2 | axiom | ADOPTED |
| C5 | Tokenize 2 hardcoded badge RGBAs | 3 | 5 | 4 | 5 | 5 | **22** | 4 | axiom | ADOPTED |
| C6 | `bun test` data-integrity suite (19 tests) — closes 0-test gap | 5 | 5 | 4 | 4 | 4 | **22** | 4 | axiom | ADOPTED |
| C7 | WebGL render-loop fix (frozen-anim bug) + GL-fault hardening | 4 | 5 | 4 | 5 | 5 | **23** | (re-scored up after finding it was a real bug) | axiom | ADOPTED |
| C8 | Branded Qwik app 404 route | 2 | 4 | 3 | 5 | 5 | **19** | 8 | axiom | DEFERRED (below cutoff; SSO-gated, rare) |
| C9 | SSO: register `nexus.modfolio.io/auth/callback` for client `axiom` (production auth-down ROOT) | 5 | 5 | 5 | 5 | 1 | **21** | — | **modfolio-connect** | DEFERRED (sibling — Hub-not-enforcer) |
| C10 | ecosystem.json `appDomain` arc→nexus (stale SoT) | 4 | 5 | 4 | 5 | 1 | **19** | — | **modfolio-ecosystem** | DEFERRED (sibling — Hub-not-enforcer) |
| C3 | PortalView footer "Axiom" link | — | — | — | — | — | dropped | — | axiom | DROPPED (not a bug — portal→landing cross-link is intentional) |

⑤=1 on C9/C10 reflects "cannot land safely from this repo" (sibling-owned),
not technical risk. The *content* of C9 is the single highest-impact fix; it is
deferred purely on ownership.

## Adopted + implemented (all in modfolio-axiom)

- **C1** `apps/app/wrangler.jsonc`: `routes: [{ pattern: "nexus.modfolio.io",
  custom_domain: true }]` + rationale comment. CF docs confirm `custom_domain`
  is idempotent on redeploy (unlike KV create-only / API 10014).
- **C2** `apps/app/src/root.tsx`: added `color-scheme:dark`, `theme-color`,
  SVG favicon link, canonical (`nexus.modfolio.io`), OG (title/desc/type/url/
  locale), Twitter `summary` card. `og:image` intentionally omitted (raster card
  = owner asset; not fabricated).
- **C2/C4 assets** `apps/app/public/favicon.svg` + `apps/landing/public/favicon.svg`:
  real authored SVG (Axiom "A" mark, indigo `#818cf8` on `#0a0a14`) — no binary,
  scales, dark-consistent.
- **C4** `apps/landing/src/layouts/Base.astro`: `color-scheme:dark`, favicon,
  Twitter card, and **path-aware canonical/og:url** via `new URL(Astro.url.pathname, SITE)`
  (fixes `/contact` previously canonicalising to homepage).
  `apps/landing/src/pages/404.astro`: branded, token-only, reduced-motion-safe.
  `apps/landing/public/robots.txt` + `sitemap.xml`: static (no fragile build-time
  enumeration under `output:"server"`).
- **C5** `apps/landing/src/styles/tokens/semantic.css`: added
  `--color-status-active-muted` + `--color-status-warning-muted` (same RGBA →
  zero visual change). `utilities.css:146-153`: badges now reference the tokens.
- **C6** `apps/app/src/data/data.test.ts`: 19 `bun test` tests, 118 assertions.
  Wired into `quality:all` (root `test` → app `bun test src/`). `@types/bun`
  devDep added so `bun:test` typechecks. `biome.jsonc` override disables the
  auto-enabled qwik-domain `useQwikValidLexicalScope` for `**/*.test.ts` (test
  modules are never QRLs — scope correction, not suppression).
- **C7** `apps/landing/src/scripts/webgl-mesh.ts`: render loop now reschedules
  every frame (the actual frozen-animation fix); `drawFrame()` is try/caught and
  falls back to the CSS gradient + stops the loop on GL fault; reduced-motion
  path renders one static frame through the same path.

## Gate evidence (genuine, not false-green)

- App `biome check src/`: **Checked 29 files, 0 errors** (exit 0).
- App typecheck (`tsc --noEmit`): exit 0. **Verified genuine** — injected
  `const x: number = "s"` → `TS2322` caught; reverted.
- App `bun test src/`: **19 pass / 0 fail / 118 expect() calls** (exit 0).
  **Verified genuine** — injected a dangling `appId` → exactly the
  appId-resolution + DomainGrid-derivation tests FAILED; reverted (count 0).
- Landing `biome check src/`: **Checked 27 files, 0 errors** (exit 0).
- Landing typecheck (`tsc --noEmit`): exit 0. **Verified genuine** — injected
  type error → `TS2322` caught; reverted.
- Landing `astro check`: **0 errors / 0 warnings / 0 hints** (20 files, incl. new
  404.astro + edited Base.astro).
- Landing `bun run build`: exit 0 (404 → server chunk; favicon/robots/sitemap →
  `dist/client/`). App `bun run build`: exit 0 (109 modules; `dist/favicon.svg`
  present; Qwik SSG also emits `dist/404.html` + `dist/sitemap.xml`).
- Gate ran on **`biome check`** (format+lint+assist), not `biome lint`, per this
  session's gate-integrity rule. `turbo` not used here (npm scripts, no cache).

## Deferred (sibling-owned — Hub-not-enforcer; owner action required)

- **C9 → modfolio-connect**: register `https://nexus.modfolio.io/auth/callback`
  for client `axiom` (add to migration `0060_app-domain-callbacks.sql` +
  `migrations.generated.ts` seed, run setup/migrate). This unblocks portal SSO
  login in production. **OR** decide `arc.modfolio.io` is canonical and rebind
  the live worker custom domain arc←nexus (then the landing "Enter Portal" links
  + app wrangler route + this journal must follow). Recommended: adopt `nexus`
  (it is what is live and what all axiom code already points to) and add the
  callback.
- **C10 → modfolio-ecosystem**: `ecosystem.json` `axiom.appDomain`
  `arc.modfolio.io` → `nexus.modfolio.io` (stale; arc does not resolve).
- These were intentionally NOT edited: the absolute invariant is that this repo
  gives siblings opinions, not commits. Surfaced here as the owner-facing record.

## Notes for next session

- The portal SSO is the headline item — verify with the owner whether to register
  `nexus` callback (fast) or rename to `arc` (heavier: rebind domain + update all
  axiom links). Until then, portal login may fail at the OIDC redirect step.
- App branded 404 (C8) is the only remaining in-repo completeness nit; deferred
  as below-cutoff, not blocked.
