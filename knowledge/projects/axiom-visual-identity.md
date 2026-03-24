# Axiom Visual Identity — "Dark Precision"

> 이 문서는 axiom.modfolio.io의 비주얼 아이덴티티 시스템을 정의한다.
> 디자인 토큰의 실제 값은 코드(apps/landing/src/styles/, apps/app/src/styles/)가 정본.

## Design Direction

**Dark Navy-Black** 기반 + **Indigo Electric** 액센트. 기술/정밀/공학의 시각적 표현.
"Cinematic Contrast" — 어두운 배경 위에 빛나는 인디고 포인트로 시네마틱 대비 효과.

## Color System

### Foundation
- **Surface**: #0a0a14 → #16161f → #1f1f2e → #2a2a3e (4단계 깊이)
- **Text**: #f4f4f9 (primary), 80%/60% opacity variants
- **Border**: rgba(255,255,255, 0.04/0.06/0.12) 3단계

### Accent
- **Indigo (Primary)**: #818cf8 (bright) → #6366f1 (interactive) → #4f46e5 (hover) → #3730a3 (deep)
- **Amber (Secondary, sparingly)**: #f59e0b
- **Shadow tint**: 모든 그림자에 indigo-5 (#818cf8) 기반 rgba 사용

### Gradients
- `--accent-gradient`: 135deg indigo-9→indigo-5 (방향성 primary)
- `--accent-gradient-text`: gray-12→indigo-5 (텍스트 강조)
- `--accent-glow`: radial indigo-5 center→transparent (히어로 하이라이트)

## Typography

### Font Stacks (4종)
| Role | Primary | Korean Fallback |
|------|---------|-----------------|
| Display | GoldenBook (serif) | Sandoll Jebi2, Noto Serif KR |
| Body | Freight Text Pro (serif) | Sandoll Myeongjo Neo1 |
| UI | Neue Haas Unica (geometric sans) | Pretendard Variable |
| Marketing | Brandon Grotesque (display sans, bold) | Pretendard |

### Adobe Fonts
- **Typekit ID**: `fmh4fod`
- 모든 @font-face에 CLS metric override 적용 (ascent/descent/line-gap)

### Scale
Fluid typography: `clamp(min, preferred, max)` — text-xs(0.625rem) ~ text-5xl(4.5rem)

## Spacing

8pt grid 기반 12단계: --space-1(4px) ~ --space-12(128px)

## Motion

- GSAP: stagger reveal (domain cards, manifesto lines, CTA)
- CSS scroll-driven: `@supports (animation-timeline: view())`
- `prefers-reduced-motion: reduce`에서 모든 애니메이션 비활성화
- Duration tokens: fast(150ms), base(300ms), slow(600ms)

## Brand Elements

- **Wordmark**: "Modfolio Axiom" (GoldenBook 700, --text-xl)
- **Descriptor**: "Applied Science & Engineering"
- **Section labels**: `"// {label}"` code-comment 모티프 (monospace, indigo-5)

## Landing vs App 차이

| Aspect | Landing (Astro) | App (Qwik City) |
|--------|-----------------|-----------------|
| content-max-width | 1120px | 960px |
| accent-glow | Defined | Omitted |
| WebGL hero | Yes | No |
| 나머지 토큰 | 동일 | 동일 |
