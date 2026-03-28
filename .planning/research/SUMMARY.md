# Research Summary: i18n Implementation

## Stack Decision
- **next-intl ^4.x** — App Router 네이티브, 서버/클라이언트 모두 지원
- 추가 라이브러리 불필요 (next-intl이 라우팅, 미들웨어, 네비게이션 모두 처리)
- next.config.ts에 `createNextIntlPlugin` 플러그인 연동

## Table Stakes (반드시 구현)
1. 완전한 UI 언어 전환 (145+ 파일)
2. 게임 용어 번역 (기존 100K줄 사전 활용)
3. SEO 다국어 (hreflang, locale별 메타데이터)
4. 언어 전환 UI (헤더 우측)
5. 브라우저 언어 자동 감지 (미들웨어)
6. 기존 URL 호환성 (리다이렉트)

## Architecture Key Points
- `app/` → `app/[locale]/` 구조 전환
- `messages/ko.json`, `messages/en.json` UI 번역 파일
- 게임 사전은 별도 헬퍼 (번들 크기 관리)
- 서버 컴포넌트: `getTranslations()` / 클라이언트: `useTranslations()`
- `createNavigation()`으로 Link, redirect 래핑

## Critical Pitfalls (주의)
1. **이중 html/body** — layout.tsx 구조 주의
2. **미들웨어 matcher** — 정적 파일(이미지, SW, manifest) 제외 필수
3. **대용량 사전 번들링** — 서버에서만 조회, 클라이언트에 전체 포함 금지
4. **기존 테스트 깨짐** — Provider wrapper + mock messages 선제 준비
5. **PWA/SW URL 변경** — locale prefix 고려한 캐싱 전략

## Build Order Recommendation
1. 인프라 (next-intl 설치, middleware, [locale] layout)
2. 공통 UI + 메뉴 + 언어 전환 UI
3. 홈페이지 + SEO 메타데이터
4. 가챠 시뮬레이터 (핵심 기능)
5. 캐릭터 정보 + 게임 사전 통합
6. 나머지 페이지 (패턴 반복)
7. 가이드 콘텐츠
8. PWA + sitemap + 테스트 + 최종 통합

---
*Synthesized: 2026-02-18*
