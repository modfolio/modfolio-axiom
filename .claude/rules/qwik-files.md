---
paths:
  - "**/*.tsx"
---

# Qwik Files Rules

## Qwik City 패턴 필수
- `component$()` for all components
- `routeLoader$()` / `routeAction$()` for server data
- `useSignal()` / `useStore()` for state
- `$()` for lazy-loaded functions

## 성능
- `useVisibleTask$` 최소화 (진정한 클라이언트 전용 작업만)
- `useTask$` 선호 (서버에서도 실행 가능)

## 금지 패턴
- React import (`import React`, `import { useState }`)
- `useClientEffect$` (deprecated → `useVisibleTask$`)
- 직접 DOM 접근 (`document.querySelector`, `window.` 직접 참조)
- `useEffect` / `useState` (React 패턴)
