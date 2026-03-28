# Pitfalls Research: Next.js i18n Migration

## 1. [locale] 레이아웃 이중 html/body 렌더링

**문제**: app/layout.tsx와 app/[locale]/layout.tsx 모두에 `<html>`, `<body>` 태그가 있으면 이중 렌더링 에러 발생

**경고 신호**: "You are attempting to render <html> inside <html>" 에러

**방지 전략**:
- app/layout.tsx는 `children`만 반환 (html/body 없이)
- 또는 app/layout.tsx에 html/body를 두고 app/[locale]/layout.tsx는 div wrapper만 사용
- next-intl 공식 패턴: app/[locale]/layout.tsx에 html/body, app/layout.tsx는 없음

**해당 Phase**: Phase 1 (인프라 구축)

## 2. 미들웨어 matcher가 정적 파일 차단

**문제**: 미들웨어 matcher가 너무 광범위하면 이미지, manifest.json, SW.js 등 정적 파일 요청도 리다이렉트

**경고 신호**: 이미지 깨짐, PWA 설치 실패, service worker 404

**방지 전략**:
```ts
export const config = {
  matcher: '/((?!api|_next|_vercel|infos|sw.js|manifest.json|.*\\..*).*)'
};
```
- `infos/` (이미지 디렉토리), `sw.js`, `manifest.json` 명시적 제외

**해당 Phase**: Phase 1 (인프라 구축)

## 3. 서버/클라이언트 컴포넌트 경계에서 번역 누락

**문제**: 서버 컴포넌트에서 `useTranslations()` 사용 시 에러, 클라이언트 컴포넌트에서 `getTranslations()` 사용 시 에러

**경고 신호**: "useTranslations is not a function" 또는 "getTranslations must be called in a server context"

**방지 전략**:
- 서버 컴포넌트 → `getTranslations()` (async)
- 클라이언트 컴포넌트 → `useTranslations()` (hook)
- 기존 'use client' 지시문 확인 후 적절한 API 사용

**해당 Phase**: Phase 2-6 (컴포넌트 번역 시)

## 4. 기존 테스트 대량 실패

**문제**: 하드코딩된 한국어 텍스트를 기준으로 작성된 테스트가 i18n 적용 후 실패

**경고 신호**: `getByText('가챠 시뮬레이터')` 류의 assertion 실패

**방지 전략**:
- 테스트에 `NextIntlClientProvider` wrapper 추가
- mock messages 파일 생성하여 기존 한국어 텍스트 유지
- 단계적으로 `getByRole`, `getByTestId`로 전환
- Playwright baseURL에 `/ko` prefix 추가

**해당 Phase**: Phase 1에서 테스트 인프라 먼저 준비

## 5. 대용량 게임 사전 번들 크기 폭발

**문제**: 100K줄 JSON 사전을 클라이언트 번들에 포함하면 초기 로딩 심각하게 느려짐

**경고 신호**: 빌드 시 "Large page data" 경고, 초기 로딩 3초 이상

**방지 전략**:
- 게임 사전은 서버 컴포넌트에서만 조회
- 클라이언트에 필요한 경우 해당 페이지의 데이터만 props로 전달
- i18n 메시지 파일(messages/*.json)은 UI 텍스트만 (수백 줄 수준)

**해당 Phase**: Phase 5 (데이터 레이어 통합)

## 6. next-sitemap locale 미반영

**문제**: 기존 next-sitemap 설정이 locale prefix를 고려하지 않아 /ko/*, /en/* URL이 sitemap에 누락

**경고 신호**: Google Search Console에서 인덱싱 안 됨

**방지 전략**:
- next-sitemap의 `alternateRefs` 설정 추가
- 또는 next-intl의 sitemap 가이드 참고
- hreflang alternate 링크 포함

**해당 Phase**: Phase 8 (최종 통합)

## 7. PWA Service Worker가 locale URL 미캐싱

**문제**: SW가 `/gacha_simulator`를 캐싱하지만 실제 URL은 `/ko/gacha_simulator`로 변경되어 오프라인 접근 실패

**경고 신호**: 오프라인에서 "이 사이트에 연결할 수 없음"

**방지 전략**:
- next-pwa의 runtimeCaching 패턴을 locale prefix 포함하도록 업데이트
- SW precache 목록에 locale URL 포함
- manifest.json의 start_url 업데이트

**해당 Phase**: Phase 8 (최종 통합)

## 8. not-found.tsx locale 접근 불가

**문제**: app/not-found.tsx가 [locale] 바깥에 있으면 번역 컨텍스트 없음

**경고 신호**: 404 페이지가 항상 한국어 또는 번역 키 그대로 표시

**방지 전략**:
- app/[locale]/not-found.tsx에 locale-aware 404 페이지 생성
- app/not-found.tsx는 기본 언어로 폴백
- next-intl의 `notFound()` 가이드 참고

**해당 Phase**: Phase 2 (공통 UI)

## 9. Link 컴포넌트 locale prefix 누락

**문제**: 기존 `<Link href="/character">` 가 locale 없이 이동하여 404 또는 잘못된 리다이렉트

**경고 신호**: 페이지 이동 시 언어가 초기화되거나 404

**방지 전략**:
- next-intl의 `createNavigation`에서 export한 `Link` 사용
- 기존 `next/link` import를 `@/i18n/navigation`의 `Link`로 교체
- 점진적 교체 가능 (미들웨어가 리다이렉트하므로 당장 깨지진 않음)

**해당 Phase**: Phase 2-6 (페이지별 마이그레이션 시)

## 10. generateMetadata에서 locale 파라미터 누락

**문제**: 기존 정적 metadata export가 locale을 받지 못함

**경고 신호**: 모든 언어에서 동일한 메타데이터 표시

**방지 전략**:
- `export const metadata` → `export async function generateMetadata()` 로 변경
- params에서 locale 추출하여 번역 적용
- Open Graph, Twitter Card도 locale별 설정

**해당 Phase**: Phase 3-6 (페이지별 메타데이터 작업 시)

---
*Researched: 2026-02-18*
