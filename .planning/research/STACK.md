# Stack Research: Next.js i18n with next-intl

## Core Library

### next-intl (latest stable)
- **Version**: `^4.x` (latest stable for Next.js 15 App Router)
- **Why**: App Router 네이티브 지원, 서버/클라이언트 컴포넌트 모두 번역 가능, 미들웨어 기반 라우팅 내장
- **Confidence**: HIGH

### Configuration Pattern (App Router)

```
i18n/
├── routing.ts      # defineRouting({ locales, defaultLocale })
├── request.ts      # getRequestConfig — 서버 컴포넌트용 메시지 로드
└── navigation.ts   # createNavigation — Link, redirect, usePathname 래퍼
```

**next.config.ts 통합:**
```ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(existingConfig);
```

**middleware.ts:**
```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
export default createMiddleware(routing);
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
```

## Complementary Tools

| Tool | Version | Purpose | Confidence |
|------|---------|---------|------------|
| next-intl | ^4.x | Core i18n | HIGH |
| next-sitemap | (existing) | locale별 sitemap 생성 | HIGH |
| @testing-library/react | 16.2.0 (existing) | i18n 컴포넌트 테스트 | HIGH |
| Playwright | 1.49.1 (existing) | i18n E2E 테스트 | HIGH |

**추가 설치 불필요**: next-intl 하나로 라우팅, 미들웨어, 번역 메시지 로딩, 네비게이션 모두 처리.

## Testing Approach

### Jest 조정
- `NextIntlClientProvider` 래퍼를 테스트 유틸리티에 추가
- mock messages로 번역 키 대신 실제 텍스트 렌더링 검증
- `useTranslations` 훅을 Provider로 감싸서 테스트

### Playwright 조정
- 기본 URL에 `/ko` prefix 추가
- 언어 전환 테스트 시나리오 추가
- `/en` 경로에서 영어 텍스트 표시 검증

## What NOT to Use

| 라이브러리 | 이유 |
|-----------|------|
| next-i18next | Pages Router 전용, App Router 미지원 |
| react-intl | Next.js 특화 기능 없음 (미들웨어, 서버 컴포넌트 등) |
| i18next + react-i18next | 범용적이지만 Next.js App Router 통합이 next-intl 대비 복잡 |
| 직접 구현 (Context + JSON) | 서버 컴포넌트, 미들웨어, 메타데이터 등 모두 직접 구현해야 함 |

## Message Loading Pattern

**네임스페이스 분리** (권장):
```
messages/
├── ko.json     # 모든 네임스페이스 통합 또는
├── en.json
```

또는 네임스페이스별 분리 후 request.ts에서 병합:
```ts
messages: {
  ...(await import(`../messages/${locale}/common.json`)).default,
  ...(await import(`../messages/${locale}/menu.json`)).default,
}
```

**대용량 게임 사전 (100K+줄)은 i18n 메시지에 포함하지 않음** — 별도 헬퍼 함수로 필요한 키만 조회.

---
*Researched: 2026-02-18*
