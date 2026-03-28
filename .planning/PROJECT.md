# Reverse 1999 가이드 - i18n 다국어 지원

## What This Is

리버스 1999 게임 정보 웹앱(버틴의 여행가방)에 영어 지원을 추가하는 프로젝트. next-intl 기반으로 `/ko/*`, `/en/*` URL 경로 분리를 통해 한국어와 영어 두 언어를 지원하며, 기존 게임 용어 사전 파일을 활용하여 캐릭터명 등 게임 데이터의 다국어 표시를 구현한다.

## Core Value

**영어 사용자가 사이트의 모든 기능(가챠 시뮬레이터, 캐릭터 정보, 가이드 등)을 영어로 완전하게 이용할 수 있어야 한다.**

## Requirements

### Validated

기존 코드베이스에서 검증된 기능:

- ✓ 가챠 시뮬레이션 (확률 계산, 천장 시스템, 배너 선택) — existing
- ✓ 캐릭터 정보 조회 및 필터링 — existing
- ✓ 각종 가이드 (뉴비, 가챠, 현질, 컨텐츠) — existing
- ✓ 유틸리티 (빙고, 퀴즈, 캘린더, 육성 계산기) — existing
- ✓ PWA 지원 (오프라인, 앱 설치) — existing
- ✓ 반응형 디자인 (모바일/데스크톱) — existing
- ✓ 다크/라이트 테마 — existing
- ✓ SEO 메타데이터 (한국어) — existing
- ✓ 테스트 인프라 (Jest + Playwright, 253개 테스트) — existing

### Active

- [ ] next-intl 기반 i18n 인프라 구축
- [ ] /ko, /en URL 경로 분리 라우팅
- [ ] 미들웨어 기반 locale 감지 및 리다이렉트
- [ ] 공통 UI 텍스트 번역 (버튼, 로딩, 에러 등)
- [ ] 메뉴/네비게이션 라벨 번역
- [ ] 언어 전환 UI (헤더 우측, 테마 토글 옆)
- [ ] 전체 페이지 SEO 메타데이터 다국어 지원
- [ ] 가챠 시뮬레이터 UI 영어 번역
- [ ] 캐릭터 정보 페이지 영어 번역
- [ ] 게임 용어(캐릭터명, 아이템명 등) 기존 사전 파일 활용한 다국어 표시
- [ ] 가이드 페이지들 UI 텍스트 영어 번역
- [ ] 유틸리티 페이지들(빙고, 퀴즈, 캘린더 등) 영어 번역
- [ ] PWA manifest 다국어 대응
- [ ] i18n 관련 테스트 코드 추가 (유닛 + E2E)
- [ ] 기존 URL 호환성 (301 리다이렉트)

### Out of Scope

- 한국어/영어 이외 언어 추가 — v1에서는 2개 언어에 집중
- 가이드 콘텐츠 전문 번역 (긴 본문) — UI 텍스트와 게임 용어에 먼저 집중
- 서브도메인 방식 (en.reverse1999-simulator.com) — 경로 분리 방식으로 결정
- 사용자가 직접 번역 기여하는 시스템 — 별도 프로젝트

## Context

**기존 코드베이스:**
- Next.js 15.5.4 + React 19 + App Router
- 39개 페이지, 106개 컴포넌트에 한국어 하드코딩
- `data/language/`에 한영 사전 파일 존재 (각 ~10만줄, language_XXXXXXXX 키 기반) — 현재 미사용
- `data/characters.ts`에 캐릭터 `name`(한국어) + `engName`(영어 slug) 필드 존재
- `lib/constants/menuItems.ts`에 메뉴 라벨 하드코딩
- `layout.tsx`에 `lang="ko"` 하드코딩
- 미들웨어 없음
- 기존 테스트: Jest 253개 (유닛 137 + 컴포넌트 75 + E2E 41)

**기술적 참고:**
- next-intl은 App Router 네이티브 지원, 서버/클라이언트 컴포넌트 모두 번역 가능
- `[locale]` 동적 세그먼트로 기존 `app/` 페이지를 감싸는 구조
- 기존 사전 파일의 키가 `language_10000001` 형식이라 직접 i18n 메시지로 쓰기엔 부적합 → 게임 용어 조회용 헬퍼로 활용
- 계획 문서: `docs/i18n-plan.md` 참고

## Constraints

- **Tech Stack**: next-intl (App Router 전용 i18n 라이브러리)
- **URL 구조**: `/ko/*`, `/en/*` 경로 분리 (localePrefix: "always")
- **기본 언어**: 한국어 (ko)
- **기존 테스트**: Jest + Playwright 기존 테스트가 깨지지 않아야 함
- **배포**: Cloudtype 자동 배포 호환
- **브랜치**: feature/i18n-support (worktree: reverse1999_gacha_simulation_i18n)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| next-intl 선택 | App Router 네이티브 지원, 서버 컴포넌트 번역, 미들웨어 라우팅 내장 | — Pending |
| /ko, /en 경로 분리 | SEO 유리, 검색엔진 독립 인덱싱, next-intl 미들웨어 자동 처리 | — Pending |
| 기존 language dict 활용 | 10만줄+ 한영 사전 재활용, 게임 용어 번역 비용 절감 | — Pending |
| 단계적 적용 | 인프라 → UI → 페이지 → 데이터 순으로 안정적 적용 | — Pending |
| 언어 전환 UI 헤더 배치 | 테마 토글 옆에 KO/EN 버튼, 항상 접근 가능 | — Pending |

---
*Last updated: 2026-02-18 after initialization*
