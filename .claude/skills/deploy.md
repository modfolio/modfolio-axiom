# Skill: /deploy — CF Pages 배포 가이드

Cloudflare Pages/Workers 배포 전략과 설정 가이드.

## 배포 방식

**GitHub 연동 자동 배포** (push-to-deploy). GitHub Actions 배포 금지.

## CF Pages 핵심 규칙

1. **Direct Upload은 GitHub 연동 불가** — 반드시 생성 시점에 GitHub 연결
2. 이미 Direct Upload으로 만든 프로젝트는 삭제 후 재생성 필요
3. 커스텀 도메인은 CF Pages 프로젝트 설정 + DNS CNAME 레코드 모두 필요

## 프로젝트 구조

모든 앱은 Landing + App 두 개의 CF Pages 프로젝트:

| 용도 | CF Pages 프로젝트 | 빌드 설정 |
|------|-------------------|----------|
| Landing | `{app-name}` | CLAUDE.md Commands 참조 |
| App | `{app-name}-app` | CLAUDE.md Commands 참조 |

## 빌드 설정

이 레포의 빌드 명령어와 출력 디렉토리는 **CLAUDE.md의 Commands 섹션**을 참조한다.

## 환경변수

CF Pages 환경변수는 CF Dashboard 또는 Wrangler로 설정:

```bash
# 환경변수 확인
wrangler pages deployment list --project-name={project}

# 환경변수 설정 (CF Dashboard 권장)
# Settings → Environment variables → Production / Preview
```

## CF API

```bash
# Account ID
CF_ACCOUNT_ID=1b371ab22db7b19da66380e525fb1cc1

# Pages 프로젝트 목록
curl -s "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer $CF_API_TOKEN" | jq '.result[].name'
```

## 커스텀 도메인

```bash
# CF Dashboard에서 수동 추가:
# 1. Pages 프로젝트 → Custom domains → Add domain
# 2. DNS 존에서 CNAME 레코드 추가
#    {subdomain} → {project}.pages.dev
```
