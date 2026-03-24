---
paths:
  - "apps/app/**/*.tsx"
  - "apps/app/**/*.ts"
---

# Qwik Files Rules — Resumability-First

> 이 프로젝트는 생태계 유일의 Qwik City 앱이며, resumability PoC를 겸한다.
> 모든 규칙은 resumability를 훼손하지 않는 방향으로 설계되었다.

## 1. Serialization Boundary (최우선)

Qwik optimizer는 `$` 접미사 경계에서 코드를 분할한다. 이 경계를 넘는 값은 **직렬화 가능해야** 한다.

- `component$`, `routeLoader$`, `routeAction$`, `$()` 내부에서 참조하는 외부 변수는 직렬화 가능 타입만 허용
- 직렬화 불가 타입: `class` 인스턴스, `function` (비-QRL), `Map`, `Set`, `WeakRef`, DOM 노드
- `noSerialize()` 래퍼 필요 시 명시적으로 사용하고 주석으로 사유 기재

```typescript
// GOOD: 직렬화 가능 값만 캡처
const count = useSignal(0);
const increment = $(() => { count.value++; });

// BAD: 직렬화 불가 클래스 인스턴스 캡처
const parser = new DOMParser();
const parse = $(() => parser.parseFromString(...)); // ❌ 직렬화 실패
```

## 2. Component 패턴

- **모든 컴포넌트**는 `component$()` 래퍼 필수 — 없으면 optimizer가 분할 불가
- 컴포넌트 이름은 PascalCase, 파일명은 PascalCase 일치
- Props 타입은 `component$` 외부에서 선언 + `export` (다른 컴포넌트에서 import 가능하도록)

```typescript
// GOOD
export interface CardProps { title: string; href: string; }
export const Card = component$<CardProps>((props) => { ... });

// BAD: component$ 없는 일반 함수 컴포넌트
export function Card(props: CardProps) { return <div>...</div>; } // ❌
```

## 3. State 관리

- `useSignal()` — 원시값/단일 참조 (권장)
- `useStore()` — 깊은 객체 트리 (자동 deep proxy)
- `useComputed$()` — 파생 값 (lazy 평가)
- `useResource$()` — 비동기 데이터 (SSR 호환)

금지:
- `useState`, `useEffect`, `useRef`, `useReducer`, `useContext` (React 패턴)
- 전역 변수로 상태 공유 (직렬화 불가)

## 4. Task 계층 (성능 영향 순)

| API | 실행 시점 | 성능 영향 | 사용 조건 |
|-----|-----------|-----------|-----------|
| `useTask$()` | SSR + CSR | 없음 | 기본 선택 |
| `useVisibleTask$()` | CSR only (visible 시) | **높음** — eager download 유발 | 진정한 브라우저 API 필요 시만 |
| `useVisibleTask$({ strategy: 'intersection-observer' })` | CSR (viewport 진입 시) | 중간 | 스크롤 기반 로드 |

- `useVisibleTask$` 사용 시 **반드시 주석으로 사유 기재**
- 3개 이상 `useVisibleTask$`가 한 컴포넌트에 있으면 설계 재검토

## 5. Qwik City 라우팅

- `routeLoader$()` — 페이지 진입 시 서버 데이터 로드 (SSR에서 실행)
- `routeAction$()` — 폼 제출 / mutation (POST)
- `server$()` — RPC 스타일 서버 함수 호출
- `plugin@*.ts` — 미들웨어 (auth 등)

```typescript
// GOOD: routeLoader$로 SSR 데이터
export const useAppList = routeLoader$(async () => {
  return await fetchApps();
});

// BAD: useVisibleTask$에서 fetch (CSR 전용, SEO 불가)
useVisibleTask$(async () => {
  const apps = await fetch('/api/apps'); // ❌
});
```

## 6. Event Handler 패턴

- 이벤트 핸들러는 `$()` 래퍼 또는 인라인 `$` 사용
- JSX 이벤트 속성: `onClick$`, `onInput$`, `onKeyDown$` 등 (`$` 접미사 필수)

```typescript
// GOOD
<button onClick$={() => count.value++}>+</button>
<button onClick$={handleClick}>+</button> // handleClick은 $()로 정의

// BAD
<button onClick={() => count.value++}>+</button> // ❌ $ 접미사 누락
```

## 7. isServer / isBrowser 가드

- `document`, `window`, `navigator`, `localStorage`, `sessionStorage` 접근 시 반드시 가드
- `import { isServer, isBrowser } from '@builder.io/qwik/build'` 사용

```typescript
// GOOD
import { isBrowser } from '@builder.io/qwik/build';
if (isBrowser) { window.scrollTo(0, 0); }

// BAD
window.scrollTo(0, 0); // ❌ SSR에서 크래시
```

## 8. 금지 패턴 (완전 목록)

| 패턴 | 이유 | 대안 |
|------|------|------|
| `import React` / `from 'react'` | 프레임워크 혼동 | Qwik 네이티브 |
| `useState` / `useEffect` / `useRef` | React API | `useSignal` / `useTask$` / `useSignal<HTMLElement>()` + `ref` prop |
| `useClientEffect$` | deprecated | `useVisibleTask$` |
| `document.querySelector` | SSR 크래시 + resumability 파괴 | `useSignal<Element>` + `ref` |
| `window.*` (가드 없이) | SSR 크래시 | `isBrowser` 가드 |
| `addEventListener` | 직접 DOM 이벤트 바인딩 | `onClick$` 등 Qwik 이벤트 |
| `dangerouslySetInnerHTML` | XSS 위험 | 구조화된 데이터 렌더링 |
| `React.createElement` | React 런타임 | Qwik JSX |
| `export default` (비라우트 컴포넌트) | Qwik optimizer 호환성 문제 | `export const Name = component$(...)` |
| `useStore()` + 함수 값 | 직렬화 불가 | `noSerialize()` 또는 구조 변경 |

> **예외**: Qwik City 라우트 파일(`routes/**/*.tsx`), `root.tsx`, `entry.*.tsx`는
> 프레임워크가 `export default`를 요구한다. 이 파일들은 예외.

## 9. Import 규칙

- `@builder.io/qwik` — 컴포넌트, 훅, 유틸
- `@builder.io/qwik-city` — 라우팅, loader, action
- `@builder.io/qwik/build` — `isServer`, `isBrowser`
- 절대 경로 import 사용 (`~/components/...` 패턴)
