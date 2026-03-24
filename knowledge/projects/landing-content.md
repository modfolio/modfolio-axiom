# Modfolio Axiom — Landing Content Map (Final)

> 랜딩 사이트의 모든 텍스트 콘텐츠 원본. 수정 시 이 문서를 먼저 업데이트하고 코드에 반영.
> 마지막 갱신: 2026-03-24

---

## Content Strategy

### 페이지 구성

- **Home** (`/`) — Hero, Domains, Product, CTA
- **Contact** (`/contact`) — 연락처, 사업자 정보

About 페이지, 도메인 개별 페이지(6개) 없음.
Axiom은 개발 중인 자회사이므로 최소한의 정보만 노출.
"이런 영역도 보고 있구나" 수준의 인상만 전달.

### 언어 규칙 (Hybrid)

| 영어로 유지 | 한글로 작성 |
|------------|-----------|
| 브랜드명 (Modfolio Axiom) | Hero 카피 |
| 태그라인 (Applied Science & Engineering) | 도메인 Subtitle (키워드) |
| 도메인 타이틀 6개 | 제품 설명 문장 |
| 제품명 (Amberstella) | CTA 안내 문장 |
| CTA 버튼 텍스트 (Enter Portal) | 섹션 Heading |
| 네비게이션 항목 (Domains, Contact) | Contact/사업자 정보 |
| 도메인 라벨 (Mobility & Logistics 등) | SEO Description |

원칙: 구조와 명명은 영어, 의미 전달은 한글.

### 카피라이팅 원칙

- 문장의 80%는 13단어(한국어 기준 약 20자) 이하
- 전문 용어 단독 사용 금지 — 반드시 맥락 제공
- 역량 주장/약속 금지 — 영역 암시만
- 가치 동사 사용 (설계합니다, 탐색하세요, 개선합니다)
- 문의 유도 문구 금지 (협업, 기술 문의, 알고 싶은 것 등)

---

## Global

- **Brand**: Modfolio Axiom
- **Tagline**: Applied Science & Engineering
- **Domain**: axiom.modfolio.io
- **Locale**: ko_KR

### Navigation

| 항목 | 링크 | 비고 |
|------|------|------|
| Domains | `/#domains` | 앵커 스크롤 |
| Contact | `/contact` | 페이지 이동 |
| Enter Portal | `/app` | CTA 버튼 |

### Skip Link

`본문으로 건너뛰기`

---

## Home

### SEO

- **Title**: `Modfolio Axiom — Applied Science & Engineering`
- **Description**: `기술이 산업과 만나는 지점을 설계합니다. Modfolio의 응용 기술 그룹.`

### Hero

```
Eyebrow:  Modfolio Axiom
H1:       기술이 산업과 만나는 지점을 설계합니다.
CTA:      Enter Portal
```

> 3초 이해 테스트 — "기술을 산업에 적용하는 그룹이구나."
> "설계합니다"는 가치 동사이면서 구체적 약속이 아닌 방향성.

### Domains

```
Eyebrow:  Domains
Heading:  여섯 개의 기술 영역
```

| # | Title | Subtitle |
|---|-------|----------|
| 01 | Defense & Aerospace | 방위 시스템 · 위성 통신 · 항공우주 |
| 02 | Cybersecurity | 위협 탐지 · 암호화 · 보안 인프라 |
| 03 | Medical Technology | 의료 기기 · 바이오센서 · 임상 데이터 |
| 04 | Mobility & Logistics | 실시간 추적 · 경로 최적화 · 탑승 관리 |
| 05 | Energy & Materials | 신재생 에너지 · 배터리 · 신소재 |
| 06 | Quantum & AI | 양자 컴퓨팅 · AI 연산 · 차세대 알고리즘 |

> 카드 형태. 클릭/탭 동작 없음 (개별 페이지 없음).
> 호버 시 미세한 시각 피드백만.
> Subtitle은 키워드 나열로 영역을 암시하되 역량을 주장하지 않음.
> 중간점(·) 구분자.

### Product

```
Eyebrow:  First Product
Name:     Amberstella
Label:    Mobility & Logistics
Body:     셔틀의 실시간 위치를 추적하고, 탑승 경험을 개선합니다.
Link:     amberstella.com
```

> FBO 적용 — Feature(위치 추적) → Outcome(탑승 경험 개선).
> "First Product" eyebrow로 시작점임을 암시.
> 터미널 쇼케이스 없음. 한 문장으로 절제.

### CTA

```
Body:     기술의 다음 접점을 탐색하세요.
Button:   Enter Portal
```

> "탐색하세요"는 낮은 마찰의 가치 동사.
> 구매/문의 유도 아닌 둘러보기 수준.

---

## Contact

### SEO

- **Title**: `Contact — Modfolio Axiom`
- **Description**: `Modfolio Axiom 연락처 및 사업자 정보.`

### Hero

```
Label:  Contact
H1:     Contact
```

> 유도 문구 없음. 연락할 사람은 이메일 주소만 있으면 연락함.

### Contact Information

| 항목 | 값 |
|------|-----|
| Email | contact@modfolio.io |
| Address | 경기도 수원시 팔달구 효원로 278, 6층 602호 |

> Social 링크(Instagram, LinkedIn, YouTube) 삭제.

### Business Information

| 항목 | 값 |
|------|-----|
| 상호 | 모드폴리오 |
| 대표 | 김동헌 |
| 사업자등록번호 | 104-95-65636 |
| 통신판매업 | 제2025-수원팔달-0953호 |
| 출판사 등록 | 제2024-000037호 |
| 소재지 | 경기도 수원시 팔달구 효원로 278, 6층 602호 |

---

## Footer

### Link Columns

| Column | Links |
|--------|-------|
| Products | Amberstella, GistCore, Naviaca, Sincheong, Worthee, Munseo, Press |
| Platform | Connect, Pay, Admin, On, Docs |
| Ecosystem | Works, LS, Axiom, Studio |

### Legal

```
모드폴리오 · 대표 김동헌 · 사업자등록번호 104-95-65636 · 통신판매업 제2025-수원팔달-0953호 · 출판사 제2024-000037호 · 경기도 수원시 팔달구 효원로 278, 6층 602호 · contact@modfolio.io
```

```
© 2026 Modfolio. All rights reserved.
```

---

## 삭제 항목 (원본 대비)

| 항목 | 삭제 사유 |
|------|----------|
| About 페이지 전체 | Home에 통합 불필요 — 정보량 자체가 최소화됨 |
| Manifesto 블록 | 6개 도메인 나열이 역량 선언으로 읽힘 |
| 6개 도메인 개별 페이지 | Overview 3단락 + Capabilities 4항목이 문의 유발 원인 |
| Architecture 섹션 (3단계) | 독립 운영/통합 인증/글로벌 인프라 — 과도한 약속 |
| Amberstella 터미널 쇼케이스 | 기술력 과시 구성 — 개발 중 자회사에 부적절 |
| Ecosystem 소개 | 다른 자회사 설명까지 하면 범위 초과 |
| Contact subtitle | "프로젝트 협업, 기술 문의" — 문의 유도 문구 |
| Social 링크 | Instagram/LinkedIn/YouTube — 불필요한 접점 확대 |
