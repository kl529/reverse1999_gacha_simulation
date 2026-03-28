# Plan 02: next.config.ts 연동 및 middleware.ts 생성

---
wave: 1
depends_on: [01]
files_modified:
  - next.config.ts
  - middleware.ts
autonomous: true
---

## Objective

next.config.ts에 next-intl 플러그인을 연동하고, locale 감지/리다이렉트를 처리하는 middleware.ts를 생성한다.

## Tasks

<task id="02-01">
**Update next.config.ts — next-intl 플러그인 연동**

기존 withPWA, withBundleAnalyzer 체이닝에 createNextIntlPlugin 추가.

기존:
```ts
module.exports = withBundleAnalyzer(
  withPWA({
    ...nextConfig,
    reactStrictMode: true,
  })
);
export default nextConfig;
```

변경 후:
```ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// 기존 withPWA, withBundleAnalyzer 체이닝에 withNextIntl 추가
module.exports = withBundleAnalyzer(
  withPWA(
    withNextIntl({
      ...nextConfig,
      reactStrictMode: true,
    })
  )
);
```

**주의**: `export default nextConfig;` 라인은 제거하거나 module.exports와 충돌하지 않도록 처리.
</task>

<task id="02-02">
**Create middleware.ts**

프로젝트 루트에 middleware.ts 생성:

```ts
// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // locale 리다이렉트가 필요한 경로만 매칭
  // 정적 파일, API, Next.js 내부 경로 제외
  matcher: [
    "/((?!api|_next|_vercel|infos|sw\\.js|workbox-.*\\.js|manifest\\.json|pwa_icon\\.webp|favicon\\.ico|robots\\.txt|sitemap.*\\.xml|.*\\..*).*)",
  ],
};
```

**핵심**: `infos/` (이미지 디렉토리), `sw.js`, `manifest.json`, `pwa_icon.webp` 등 정적 파일을 명시적으로 제외하여 PWA 동작을 보장.
</task>

## Verification

- [ ] `npm run build` 시 next-intl 플러그인 관련 에러 없음
- [ ] middleware.ts가 프로젝트 루트에 존재
- [ ] 정적 파일 (이미지, sw.js, manifest.json)이 미들웨어에 의해 차단되지 않음

## must_haves

- next.config.ts에 next-intl 플러그인이 체이닝됨
- middleware.ts가 locale 감지 및 리다이렉트를 수행함
- 정적 파일이 미들웨어 matcher에서 제외됨
