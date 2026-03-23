---
paths:
  - "**/*.tsx"
---

# Qwik Files Rules

## component$() wrapper mandatory
- All Qwik components MUST be wrapped with `component$()`
- Pass Props interface as generic: `component$<Props>((props) => ...)`
- Functions exported from component internals use `$()` suffix

## Signal patterns
- `useSignal` for single reactive values
- `useStore` for reactive objects/arrays (deep reactive)
- `useComputed$` for derived values
- `useResource$` for async data loading

## Routing
- `routeLoader$` for server-side data loading (SSR)
- `routeAction$` for server-side mutations (form actions)
- `useLocation()` for current URL info
- Route plugin: `plugin@name.ts` pattern (middleware)

## Resumability protection (core)
- Minimize `useVisibleTask$` usage. It triggers client-side hydration. MUST include comment justifying eager execution when used.
- Prefer `useTask$` which runs on server and is resumable.
- No direct DOM access. `document.querySelector`, `window.` require `isServer` guard.

## Forbidden patterns
- `import React` or `from 'react'` (wrong framework)
- `useEffect`, `useState`, `useRef` (React patterns)
- `useClientEffect$` (deprecated Qwik API, replaced by `useVisibleTask$`)
- Unbounded eager loading: `useVisibleTask$({ strategy: 'document-ready' })` abuse
- `addEventListener` in component body without cleanup via `useOnDocument` / `useOnWindow`
