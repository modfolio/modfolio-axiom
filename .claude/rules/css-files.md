---
paths:
  - "**/*.css"
---

# CSS Files Rules — Dual-App Token System

> 이 프로젝트는 Landing(Astro)과 App(Qwik)이 별도 토큰 값을 갖는다.
> 구조(3-tier)는 동일하되, 값이 다를 수 있다.

## 1. 3-Tier 토큰 구조

```
primitives.css  → 원시값 (색상 팔레트, 타입 스케일, 스페이싱 단위)
semantic.css    → 의미 매핑 (--color-bg, --color-text, --space-section)
accent.css      → 브랜드/테마 오버라이드 (도메인별 accent)
```

- **하드코딩 금지**: `#fff`, `rgb()`, `hsl()`, `oklch()` 등 직접 사용 금지
- **항상 CSS 변수**: `var(--color-*)`, `var(--space-*)`, `var(--radius-*)` 등 사용
- 예외: `transparent`, `currentColor`, `inherit` 등 CSS 키워드는 허용

## 2. 앱별 차이

| 토큰 | Landing (Astro) | App (Qwik) |
|------|-----------------|------------|
| `--content-max-width` | `1120px` | `960px` |
| accent 체계 | 도메인별 다름 | 포탈 통일 |
| font stack | Adobe Fonts 우선 | 동일 |

- Landing CSS 수정 시 `apps/landing/src/styles/` 확인
- App CSS 수정 시 `apps/app/src/styles/` 확인
- 토큰 이름은 동일, 값만 다름 — 이름 불일치는 금지

## 3. Layer 순서

```css
@layer reset, base, tokens, components, utilities;
```

- 모든 CSS 파일은 적절한 layer 내에서 작성
- `!important` 금지 — layer 순서로 우선순위 해결
- layer 외부 스타일 작성 금지 (cascade 충돌)

## 4. 반응형

- `clamp()` 선호 (fluid typography, fluid spacing)
- 브레이크포인트: `sm:640`, `md:768`, `lg:1024`, `xl:1280`
- Mobile-first: `min-width` 미디어 쿼리 사용

## 5. 접근성

- 애니메이션 포함 시 `prefers-reduced-motion` fallback 필수
- `prefers-color-scheme` 지원 (다크 모드 토큰)
- `font-family`는 반드시 `var(--font-*)` 사용
- 최소 contrast ratio: WCAG AA (4.5:1 본문, 3:1 대형 텍스트)

## 6. 모션

- `transition` 대상: `transform`, `opacity` 만 권장 (layout 속성 금지)
- `will-change` 남발 금지 — 실측 후 필요 시만
- `animation`은 `@keyframes` 정의 + `prefers-reduced-motion` 쌍으로

## 7. 금지 패턴

| 패턴 | 이유 | 대안 |
|------|------|------|
| `#hex`, `rgb()`, `hsl()` 직접 | 토큰 위반 | `var(--color-*)` |
| `!important` | cascade 파괴 | layer 순서 |
| 하드코딩 `font-family` | 토큰 위반 | `var(--font-*)` |
| `text-align: justify` | 가독성 저하 | `left` / `start` |
| `px` 고정 font-size | 접근성 위반 | `clamp()` 또는 `rem` |
| `width`/`height` transition | 레이아웃 thrashing | `transform: scale()` |
| `z-index` 매직넘버 | 충돌 위험 | `var(--z-*)` 토큰 |
