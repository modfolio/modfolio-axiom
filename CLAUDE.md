# modfolio-axiom

## 이 레포의 역할

Modfolio Axiom 계열(기술/모빌리티) 앱의 **그룹 랜딩 포탈**. 생태계 유일의 Qwik City 앱으로, resumability PoC를 겸한다.

## Tech Stack

- **Framework**: Qwik City (resumability — hydration 없이 즉시 interactive)
- **Runtime**: Bun
- **Language**: TypeScript (strict)
- **Lint/Format**: Biome v2
- **Deploy**: CF Pages (`modfolio-axiom`)
- **Domain**: `axiom.modfolio.io`
- **SSO**: modfolio-connect (OIDC PKCE, `@modfolio/connect-sdk/qwik`)

## Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | App 개발 서버 |
| `bun run dev:landing` | Landing 개발 서버 |
| `bun run build` | 전체 빌드 (landing + app) |
| `bun run build:landing` | Landing만 빌드 |
| `bun run build:app` | App만 빌드 |
| `bun run check` | Biome lint + format 검사 |
| `bun run typecheck` | TypeScript strict mode 검사 |
| `bun run lint` | Biome lint |
| `bun run format` | Biome format |
| `bun run quality:all` | check + typecheck (양쪽 앱) |
| `bun run preview` | 프로덕션 프리뷰 |

## Monorepo Topology

```
modfolio-axiom/
├── apps/
│   ├── landing/          # Astro — 마케팅 랜딩 (axiom.modfolio.io)
│   │   └── src/
│   │       ├── layouts/  # Base.astro
│   │       ├── pages/    # index, about, domains, contact 등
│   │       └── styles/   # 3-tier 디자인 토큰 (primitives/semantic/accent)
│   └── app/              # Qwik City — SSO 포탈 앱
│       └── src/
│           ├── components/portal/  # AppCard, AppGrid, PortalHeader 등
│           ├── routes/             # index, auth/ (login/callback/logout)
│           └── styles/             # 동일 토큰 시스템 (app 전용 값만 다름)
├── knowledge/            # 프로젝트 지식 (global.md, projects/)
└── memory/               # 자가학습 데이터 (.gitignore로 내용 제외)
```

**Landing (Astro)**: zero-JS 기본, GSAP + WebGL은 island 패턴으로 로드. `--content-max-width: 1120px`.
**App (Qwik City)**: resumable SSO 포탈. `--content-max-width: 960px`. component$ wrapper 필수.

## Quality Gate (필수)

모든 작업 완료 후 반드시 실행. 통과하지 않으면 commit 불가:

```bash
bun run check && bun run typecheck
```

## Context Rot Prevention

메인 세션은 오케스트레이션 전용. 무거운 작업은 서브에이전트에서.

### 징후 감지
- 이전에 합의한 규칙/제약을 무시하는 코드 생성
- 파일명, 변수명, 함수명을 잘못 기억
- 동일 실수 반복
- 생성 코드 품질이 세션 초반 대비 저하

### 서브에이전트 활용 기준
- 파일 1-2개 수정: 메인 세션에서 직접
- 파일 3개 이상: 서브에이전트 필수
- 리서치/탐색: Explore (haiku)
- 코드 생성: 도메인별 Agent (sonnet)
- 리뷰: Agent Teams (3 reviewer)

## 불변 원칙

> 생태계 공통 원칙은 `~/.claude/CLAUDE.md`에 정의. 아래는 이 레포 전용 규칙.

- **Qwik 정체성**: Qwik의 resumability를 훼손하는 패턴 금지 (무분별한 `useVisibleTask$`, eager loading 등)
- **Landing 경량성**: 이 앱은 랜딩 포탈이므로 불필요한 런타임 의존성 최소화
- 판단의 근거와 편차는 투명하게 기록

> **안 되는 것만 명시하고, 나머지는 다 된다.**

## Skills (필요 시 호출)

### 참조형 (패턴/규칙 가이드)

| Skill | 용도 |
|-------|------|
| `/plan` | 기획 품질 기준 + Product Lens + Scope 결정 (Plan Mode 참조) |
| `/sso-integrate` | SSO 연동 |
| `/deploy` | CF Pages 배포 |
| `/new-app` | 새 앱 스캐폴딩 |
| `/journal` | 개발 저널 기록 |
| `/contracts` | 이벤트 계약 (Zod) |
| `/ecosystem` | 도메인 맵 + 현황 |
| `/ops` | 시크릿, 계정, 이메일 |
| `/audit` | 생태계 상태 검증 |
| `/typography` | Adobe Fonts + Pretendard + CLS 방지 |
| `/drizzle-patterns` | Drizzle ORM 규칙 (prefix, helpers, migrations) |
| `/design-tokens` | 3-tier 디자인 토큰 (구조 규칙 + 탐색 프로토콜) |
| `/motion-patterns` | 스프링 물리 모션 + 접근성 |
| `/ui-quality-gate` | UI 자가 검증 체크리스트 |
| `/ai-patterns` | AI 모델 라우터 + fallback + 프롬프트 캐싱 |
| `/email-patterns` | Resend 이메일 (fire-and-forget, 템플릿) |
| `/collect-updates` | 생태계 업데이트 수집 |
| `/observability` | CF 트레이싱 + OTLP + SigNoz (wrangler.jsonc, Neon 브랜칭) |
| `/layout-patterns` | 헤더/푸터/섹션 레이아웃 규격 (참조용) |
| `/harness-check` | 하네스 전체 점검 (MCP, skills, agents, rules, hooks, knowledge) |
| `/preflight` | 세션 시작 전 종합 점검 (MCP, deps, lint, git, env) |

### 생성형 (Agent 오케스트레이션)

| Skill | 용도 |
|-------|------|
| `/component` | 토큰 제약 내 UI 컴포넌트 생성 |
| `/page` | 페이지 레이아웃 생성 (opus) |
| `/api` | API 엔드포인트 + 테스트 생성 |
| `/test` | 테스트 스위트 생성 |
| `/schema` | Drizzle 스키마 생성 |
| `/migration` | DB 마이그레이션 생성 |
| `/security-scan` | OWASP Top 10 보안 감사 |
| `/fix` | 품질 위반 자동수정 |
| `/generate-review` | 생성→리뷰 통합 파이프라인 |
| `/design` | Figma 양방향 디자인 파이프라인 |
| `/innovation-check` | 기술 스택 최신성 감사 |
| `/ralph-loop` | 자율 반복 개선 루프 |
| `/release` | 릴리즈 파이프라인 (테스트→triage→분할커밋→PR) |
| `/retro` | 스프린트 회고 (Git 분석 + 자가학습 입력) |
| `/map-codebase` | 기존 코드베이스 분석 (스택/아키텍처/컨벤션/부채) |
| `/optimize` | Autoresearch 패턴 — 메트릭 기반 자율 반복 최적화 |
| `/optimize-skill` | Skill 프롬프트 자율 최적화 (eval pass rate 기반) |

## Self-Learning: Active Optimization

### 수동 관찰 루프 (기존)
위반 발견 → pattern-history 기록 → 2회 경고 → 3회 Rule 강화

### 능동 최적화 루프 (Autoresearch)
1. skill-effectiveness에서 fix_needed_after 비율 높은 Skill 식별
2. eval 케이스 생성/업데이트 (`memory/evals/`)
3. /optimize-skill로 프롬프트 자율 최적화
4. 결과를 skill-effectiveness에 기록

### 코드 최적화 루프
1. 성능 병목 식별 (slow API, large bundle, low coverage)
2. /optimize로 대상 파일 + 메트릭 지정
3. 자율 반복 후 결과 리뷰

## Sub Agents

### 리뷰형 (읽기 전용)

| Agent | 역할 | 모델 |
|-------|------|------|
| `knowledge-searcher` | 지식베이스 검색/요약 | haiku |
| `ecosystem-auditor` | ecosystem.json vs 실제 상태 검증 | haiku |
| `code-reviewer` | 생태계 규칙 기반 코드 리뷰 | sonnet |
| `design-critic` | 디자인 토큰/레이아웃/모션 검증 | sonnet |
| `accessibility-auditor` | WCAG AA 접근성 검증 | sonnet |
| `architecture-sentinel` | 불변 원칙 + 생태계 규칙 검증 | sonnet |
| `visual-qa` | Playwright 기반 시각 검증 | sonnet |

### 생성형 (코드 생성/수정)

| Agent | 역할 | 모델 |
|-------|------|------|
| `component-builder` | UI 컴포넌트 생성 (Figma 연동) | sonnet |
| `page-builder` | 페이지 레이아웃 생성 | sonnet |
| `schema-builder` | Drizzle 스키마/마이그레이션 생성 | sonnet |
| `api-builder` | API 엔드포인트 생성 | sonnet |
| `test-builder` | 테스트 스위트 생성 | sonnet |
| `contract-builder` | 이벤트 계약 생성 | sonnet |
| `security-hardener` | 보안 감사 + 자동수정 | sonnet |
| `quality-fixer` | 품질 위반 자동수정 (P0-P3 triage + 정공법) | sonnet |
| `innovation-scout` | 기술 스택 혁신성 감사 (Stability Filter) | sonnet |
| `design-engineer` | Figma 양방향 디자인 파이프라인 | opus |

## Model Routing

| 모델 | 용도 |
|------|------|
| **Opus** | 오케스트레이션, 디자인 판단, 복잡한 리팩토링 |
| **Sonnet** | 코드 생성, 수정, 테스트, 리뷰 (기본) |
| **Haiku** | Explore (탐색/검색) |

에스컬레이션: Sonnet 2회 실패 → Opus 전환

## Paper.design 워크플로우

이 프로젝트는 Paper.design MCP를 통해 비주얼 디자인 이터레이션을 수행한다.

### 코드 → Paper (푸시)
1. 컴포넌트를 구현한 후, `write_html`로 Paper 캔버스에 푸시
2. 전체 페이지가 아닌 개별 컴포넌트/섹션 단위로 푸시할 것
3. 아트보드 이름은 컴포넌트 이름과 일치시킬 것

### Paper → 코드 (풀)
1. 사용자가 Paper에서 비주얼 수정 후 "반영해줘"라고 요청하면:
2. `get_jsx`로 수정된 구조 확인
3. `get_computed_styles`로 변경된 스타일 값 확인
4. 변경사항을 코드에 반영

### 주의사항
- Paper 캔버스의 HTML/CSS는 참조용이며, 프로젝트 소스코드가 정본(source of truth)
- Paper에서의 수정은 "의도 전달"이지 코드 직접 반영이 아님
- 스타일 변경 시 디자인 토큰/변수 체계가 있다면 토큰 값을 우선 적용

## 참조

- PRD: `README.md` | 생태계: `ecosystem.json` (universe)
- 지식: CLAUDE.md 하단 생태계 동기화 블록
- Skills: `.claude/skills/` | Agents: `.claude/agents/`
- 규칙: `.claude/rules/` (파일 패턴별 자동 로드)
- 비주얼 아이덴티티: `knowledge/projects/axiom-visual-identity.md`
- MCP: context7, github, cloudflare, playwright, neon, svelte, figma (CLI 등록), canva (CLI 등록), paper (로컬 Desktop), filesystem

---

<!-- ECOSYSTEM_START: auto-synced from modfolio-universe, do not edit -->

# Modfolio 생태계 컨텍스트

> 이 섹션은 modfolio-universe에서 자동 동기화됩니다. 직접 편집하지 마세요.
> 수정: `modfolio-universe/knowledge/` 디렉토리에서 하세요.

---

# Modfolio Universe — Global Knowledge (Essential)

> 이 파일은 모든 modfolio 프로젝트의 CLAUDE.md에 자동 동기화된다.
> 수정은 modfolio-universe/knowledge/global-essential.md에서만 할 것.
> 상세 정보는 각 skill을 호출할 것.

## 생태계 개요

**Modfolio Universe**는 15개 이상의 앱으로 구성된 SaaS 생태계다. 각 앱은 독립 브랜드로 운영되며, 공통 인프라(SSO, 이벤트, 결제)를 공유한다.

- **조직**: github.com/modfolio
- **플랫폼**: 100% Cloudflare Edge Native (Workers + Pages + D1 + R2)
- **런타임**: Bun | **언어**: TypeScript (strict) | **린터**: Biome v2

## 3대 불변 원칙

1. **House of Brands** — 앱 간 UI 라이브러리 공유 금지. 각 앱은 독립 디자인 시스템 + 독립 기술 스택.
2. **Zero Physical Sharing** — 코드 공유는 SSO 토큰 / 데이터 스키마(`@modfolio/contracts`) / Webhook API로만.
3. **100% Cloudflare Edge Native** — Vercel, AWS, GCP 배제. CF Pages + Workers만.

## 도메인 아키텍처 (2-프로젝트 모델)

각 브랜드는 두 개의 독립 프로젝트로 분리:
- `domain.com` = 앱 (SvelteKit / SolidStart 등)
- `www.domain.com` = 랜딩 (Astro)

**entryMode** (`app.domain.com` 폐기, naked 도메인 = 항상 앱):
- `app-first` — `domain.com/` → 앱 홈 직접 표시
- `landing-first` — `domain.com/` → `www.domain.com/home` 302 redirect

**인프라 앱**: 서브도메인 모델 유지 (`*.modfolio.io`). 2-프로젝트 분리 적용 안 함.
**그룹 포털**: Works, LS, Axiom, Studio 각 그룹은 독립 포털 도메인 보유.

## 기술 스택 요약

**프레임워크 (6종)**: SvelteKit 5(9) | SolidStart(4) | Astro(3+랜딩) | Hono(1) | Qwik(2) | Nuxt 3(1)
**DB (6종)**: Neon Postgres(9) | D1(6) | Turso(1) | R2(2) | Durable Objects(1) | Upstash Redis(1)

앱별 상세 스택: `/ecosystem` skill 참조.

## 유니버설 서비스

| 서비스 | 역할 | 프레임워크 |
|--------|------|-----------|
| modfolio-connect | SSO/OIDC (login.modfolio.io) | SvelteKit 5 + Better Auth |
| modfolio-pay | 결제 게이트웨이 | SvelteKit 5 |

SSO 연동 상세: `/sso-integrate` skill 참조.

## Doppler 시크릿 관리

| 프로젝트 타입 | Doppler 프로젝트 | 예시 |
|-------------|-----------------|------|
| 고유 도메인 앱 | 앱 이름 | naviaca, gistcore, modfolio-pay |
| 인프라 앱 (*.modfolio.io) | **modfolio-universe** (공동) | modfolio-admin, modfolio-dev |

## 디자인 엔진

Anti-Slop 제약 + GAN-Inspired Generator-Evaluator + Recursive Meta-Prompting + Design Constitution.
- AI Slop(통계적 안전지대 회귀) 방지를 위한 5-Layer 하네스
- 금지: 중앙 정렬 히어로, 3-column 카드 그리드, 보라-파랑 그라데이션, 범용 폰트 단독
- 필수: 시각적 메타포 명시, 비선형 레이아웃, 앱 고유 디자인 토큰

상세: `/design` skill + `design-critic` / `design-engineer` / `visual-qa` agents.

## UI 컴포넌트 전략

**스타일링**: UnoCSS v66+ Wind4 프리셋 (전 프로젝트 표준, Tailwind 미사용).
**헤드리스 UI**: SvelteKit→shadcn-svelte(Bits UI) | SolidStart→Kobalte | Nuxt→Nuxt UI | Qwik/Astro→커스텀.
상세: `/component` skill 참조.

## Workflow

- **Quality Gate** (필수): `bun run check && bun run typecheck` (커밋 전)
- **Git 안전**: `--force`, `--no-verify` 금지. 민감정보 커밋 금지
- CF Pages 규칙: `pages_build_output_dir` + `nodejs_compat` + wrangler.jsonc. 상세: `/deploy`
- Observability: CF Automatic Tracing + OTLP → SigNoz. 벤더 SDK 금지. 상세: `/observability`

## 상세 정보 (Skills)

| Skill | 용도 |
|-------|------|
| `/sso-integrate` | SSO 연동 (OIDC, JWT, SDK 설치) |
| `/deploy` | CF Pages 배포 |
| `/ecosystem` | 도메인 맵 + 앱별 스택 |
| `/contracts` | 이벤트 계약 (Zod) |
| `/ops` | 시크릿, 계정, 이메일 |
| `/typography` | Adobe Fonts + Pretendard |
| `/drizzle-patterns` | Drizzle ORM 규칙 |
| `/design-tokens` | 3-tier 디자인 토큰 |
| `/design` | 디자인 파이프라인 (Anti-Slop) |
| `/ai-patterns` | AI 모델 라우터 + fallback |
| `/email-patterns` | Resend 이메일 |
| `/observability` | CF 트레이싱 + OTLP |

---

## 관련 앱 현황 (유니버설 + axiom 그룹)

- **Modfolio Connect** (`modfolio-connect`, v1.0.0, active): Universal SSO/Identity Platform
- **Modfolio Pay** (`modfolio-pay`, v0.5.0-payment-platform, active): **Universal Payment Gateway**. 생태계 전체의 결제 처리 플랫폼.
- **Amberstella** (`amberstella`, v0.2.0-sso, landing): **셔틀/모빌리티 실시간 앱**. 셔틀 위치 추적, 탑승 관리.

---

## 이 프로젝트의 생태계 지식

# modfolio-axiom — 프로젝트 지식

## 역할

**Technology/Mobility Group Portal**. Modfolio Axiom 계열 기술/모빌리티 앱의 통합 랜딩 포탈.

## 기술 스택

- **Framework**: **Astro** (landing) + **Qwik City** (app) — 생태계 유일 Qwik City 포탈, resumability PoC
- **DB**: 없음 (하위 앱이 각자 DB 보유)
- **인증**: modfolio-connect SSO (OIDC PKCE)
- **도메인**: `axiom.modfolio.io`
- **배포**: CF Pages (`modfolio-axiom`)
- **버전**: `0.1.0`

## 하위 앱

| 앱 | 도메인 | 역할 |
|----|--------|------|
| Amberstella | amberstella.com | 실시간 셔틀/모빌리티 |

## 주의사항

- **Qwik Framework**: 다른 그룹 랜딩(Astro)과 빌드 출력/설정이 다름
- Qwik City auth route: `src/routes/auth/` (Astro의 `src/pages/auth/`와 다른 구조)
- CF Pages adapter: `@builder.io/qwik-city/adapters/cloudflare-pages`
- Entry file: `src/entry.cloudflare-pages.tsx`
- Resumability: 서버에서 렌더링된 HTML이 클라이언트에서 하이드레이션 없이 즉시 interactive

## 구현된 기능

- SSO 로그인 포탈 (Qwik auth route plugins)
- 하위 앱 카드 그리드
- Adobe Fonts 타이포그래피

## 현재 상태

- **status**: `landing` — Portal shell (Qwik resumability PoC)
- **다음**: 디자인 고도화, Qwik 성능 벤치마킹

<!-- ECOSYSTEM_END -->
