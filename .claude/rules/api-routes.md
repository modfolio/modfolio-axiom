---
paths:
  - "apps/app/**/+server.ts"
  - "apps/app/**/plugin@*.ts"
  - "apps/app/**/routes/**/*.ts"
---

# API Routes Rules — Qwik City

> Qwik City는 `routeLoader$` / `routeAction$` / `server$` 패턴을 사용한다.
> 일반 REST endpoint는 `+server.ts`로 정의한다.

## 1. 데이터 로딩 패턴

```typescript
// SSR 데이터: routeLoader$ (GET 시맨틱)
export const useData = routeLoader$(async (requestEvent) => {
  // requestEvent.env, requestEvent.cookie, requestEvent.params 사용
  return data;
});

// Mutation: routeAction$ (POST 시맨틱)
export const useAction = routeAction$(async (formData, requestEvent) => {
  // Zod 검증 포함
}, zod$({ name: z.string() }));

// RPC: server$ (임의 서버 함수)
const getData = server$(async function() {
  // this.env, this.cookie 등 사용
  return result;
});
```

## 2. 입력 검증

- `routeAction$` 두 번째 인자로 `zod$()` 검증 스키마 필수
- `+server.ts` endpoint: 수동 `z.safeParse()` + 실패 시 400 응답
- Path params: `requestEvent.params` → Zod 검증

## 3. 인증 (Plugin 패턴)

- `plugin@auth.ts`에서 SSO JWT 검증 미들웨어
- Protected route → `requestEvent.sharedMap.get('user')` 확인
- 미인증 시 `throw requestEvent.redirect(302, '/auth/login')`

```typescript
// plugin@auth.ts
export const onRequest: RequestHandler = async (requestEvent) => {
  const user = await verifySession(requestEvent);
  requestEvent.sharedMap.set('user', user);
};
```

## 4. 에러 처리

- try/catch 필수 + HTTP 상태코드 적절히 반환
- 내부 에러 노출 금지 — 사용자에게는 generic message
- `requestEvent.json(statusCode, body)` 패턴 사용

## 5. 금지 패턴

| 패턴 | 이유 | 대안 |
|------|------|------|
| `as any` 타입 캐스팅 | 타입 안전성 파괴 | 정확한 타입 |
| 하드코딩 시크릿/API 키 | 보안 위반 | `requestEvent.env.get()` |
| `process.env` | CF Workers 미지원 | `requestEvent.env.get()` |
| uncaught promise rejection | 서버 크래시 | try/catch |
| `fetch()` without timeout | 무한 대기 | `AbortSignal.timeout()` |
| 직접 `Response` 생성 (routeLoader 내) | Qwik 패턴 위반 | 값 반환 |
