---
paths:
  - "apps/landing/**/*.astro"
  - "apps/landing/astro.config.*"
  - "apps/landing/**/*.ts"
---

# Astro Landing Rules — Zero-JS First

> Landing은 마케팅 사이트. zero-JS가 기본이며, 인터랙션은 island으로만 로드한다.

## 1. 성능 원칙

- **Zero JS 타겟**: 가능한 한 모든 페이지가 JS 0KB로 동작
- 서버에서 처리 가능한 로직은 절대 클라이언트로 내리지 않음
- 정적 콘텐츠는 Astro 컴포넌트(`.astro`)로, 인터랙티브 요소만 island

## 2. Island 디렉티브

| 디렉티브 | 용도 | 우선순위 |
|----------|------|----------|
| (없음) | SSR only, JS 0 | 1순위 (기본) |
| `client:visible` | viewport 진입 시 로드 | 2순위 |
| `client:idle` | 메인 스레드 idle 시 로드 | 3순위 |
| `client:load` | 즉시 로드 | 최후 수단 |
| `client:media` | 미디어 쿼리 매치 시 | 반응형 전용 |

- `client:load` 사용 시 **반드시 주석으로 사유 기재**
- 페이지당 `client:load` island 2개 이하 권장
- GSAP/WebGL 등 무거운 라이브러리는 `client:visible` 필수

## 3. Cloudflare 어댑터

- `@astrojs/cloudflare` adapter 사용 필수
- `astro.config.ts`에 `output: 'static'` 또는 `'hybrid'` 명시
- `pages_build_output_dir` 설정 확인

## 4. 컴포넌트 구조

```
apps/landing/src/
├── layouts/Base.astro      # 공통 레이아웃 (head, fonts, footer)
├── pages/*.astro           # 페이지 (파일 기반 라우팅)
├── components/landing/     # 랜딩 전용 컴포넌트
├── scripts/                # GSAP, WebGL 등 클라이언트 스크립트
└── styles/                 # 3-tier 디자인 토큰
```

- Layout에서 `<head>` 관리 (Adobe Fonts, meta, OG)
- 페이지 파일은 Layout 래핑 + 섹션 컴포넌트 조합
- 컴포넌트는 `landing/` 하위에 도메인별 정리

## 5. 스타일링

- `<style>` 블록 사용 (Astro scoped CSS)
- 전역 스타일은 `styles/` 디렉토리에서 `@import`
- CSS 변수 필수 (하드코딩 금지)
- `--content-max-width: 1120px` (landing 전용, app은 960px)

## 6. SEO / Meta

- 모든 페이지에 `<title>`, `<meta name="description">` 필수
- OG 태그: `og:title`, `og:description`, `og:image` 포함
- `<link rel="canonical">` 설정

## 7. 금지 패턴

| 패턴 | 이유 | 대안 |
|------|------|------|
| `client:load` 남용 | JS 번들 증가, zero-JS 위반 | `client:visible` / `client:idle` |
| `.astro`에서 React/Qwik import | 프레임워크 혼동 | Astro 네이티브 |
| `<script is:inline>` (사유 미기재) | Astro 번들링 우회, 최적화 불가 | `<script>` (Astro 자동 모듈 번들링) 또는 island. 불가피 시 주석으로 사유 기재 |
| `fetch()` in frontmatter (외부 API) | 빌드/SSR 시점 의존 | `Astro.glob`, 정적 데이터 |
| `Astro.redirect()` 남용 | edge 비용 | `<meta http-equiv="refresh">` 또는 CF redirect rules |
| Biome으로 `.astro` 직접 lint | 파싱 불가 | `biome.json` overrides |

> **참고**: Astro의 `<script>` 태그는 자동으로 ES 모듈로 번들링된다. `type="module"` 불필요.
> `<script is:inline>`만 번들링을 우회하며, 이는 정당한 사유가 있을 때만 사용한다.

## 8. 도메인 페이지 패턴

각 기술 도메인 페이지 (`cybersecurity.astro`, `defense.astro` 등)는 동일한 구조:
- `DomainPage.astro` 컴포넌트 재사용
- 도메인별 accent 컬러 토큰 적용
- Hero + 설명 + CTA 구성
