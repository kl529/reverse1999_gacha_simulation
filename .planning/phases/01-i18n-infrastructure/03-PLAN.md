# Plan 03: [locale] 레이아웃 구조 전환

---
wave: 2
depends_on: [01, 02]
files_modified:
  - app/layout.tsx
  - app/[locale]/layout.tsx
  - app/[locale]/page.tsx
  - app/page.tsx
  - app/[locale]/not-found.tsx
  - app/not-found.tsx
  - app/[locale]/error.tsx
  - app/error.tsx
autonomous: true
---

## Objective

기존 app/layout.tsx를 app/[locale]/layout.tsx로 이동하고, 루트 layout.tsx는 최소 shell로 변환한다. 홈페이지를 [locale] 하위로 이동하여 /ko, /en 라우팅이 동작하도록 한다.

## Tasks

<task id="03-01">
**Create app/[locale]/layout.tsx**

기존 app/layout.tsx의 내용을 기반으로 [locale] 레이아웃 생성.
`lang` 속성을 `params.locale`로 동적 설정.
`NextIntlClientProvider`로 클라이언트 컴포넌트에 번역 전달.

```tsx
// app/[locale]/layout.tsx
import "@/lib/polyfills";
import "@/app/globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CustomCursor from "@/components/etc/CustomCursor";
import SecurityWrapper from "@/components/etc/SecurityWrapper";
import { ModalProvider } from "@/components/etc/ModalProvider";
import GlobalLoadingManager from "@/components/etc/GlobalLoadingManager";
import Script from "next/script";
import { ReactNode } from "react";
import ThemeProvider from "@/components/etc/ThemeProvider";
import HamburgerConditional from "@/components/etc/HamburgerConditional";
import ThemeToggle from "@/components/etc/ThemeToggle";
import { InstallPrompt } from "@/components/etc/InstallPrompt";
import ErrorBoundary from "@/components/etc/ErrorBoundary";
import { NetworkStatusToast } from "@/components/etc/NetworkStatusToast";
import PushNotificationManager from "@/components/etc/PushNotificationManager";
import { PostHogProvider } from "@/components/etc/PostHogProvider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/pwa_icon.webp" />
        {isProd && (
          <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Z474CQX2JT" strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-Z474CQX2JT');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6516579814886841" crossOrigin="anonymous" strategy="afterInteractive" />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <PostHogProvider>
            <ThemeProvider>
              <ThemeToggle />
              <ErrorBoundary>
                <ModalProvider>
                  <SecurityWrapper>
                    <GlobalLoadingManager />
                    <HamburgerConditional />
                    <CustomCursor />
                    <InstallPrompt />
                    <NetworkStatusToast />
                    <PushNotificationManager />
                    {children}
                  </SecurityWrapper>
                </ModalProvider>
              </ErrorBoundary>
            </ThemeProvider>
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```
</task>

<task id="03-02">
**Simplify app/layout.tsx to minimal shell**

루트 layout.tsx는 html/body 없이 children만 반환하여 이중 렌더링 방지:

```tsx
// app/layout.tsx
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```
</task>

<task id="03-03">
**Move app/page.tsx → app/[locale]/page.tsx**

홈페이지를 [locale] 하위로 이동. 내용은 동일하되 metadata는 나중에 generateMetadata로 전환 (Phase 3).

```bash
cp app/page.tsx app/[locale]/page.tsx
```

기존 app/page.tsx는 삭제하거나, 미들웨어가 리다이렉트하므로 제거.
</task>

<task id="03-04">
**Move error.tsx and not-found.tsx**

```bash
cp app/error.tsx app/[locale]/error.tsx
cp app/not-found.tsx app/[locale]/not-found.tsx
```

app/not-found.tsx는 루트 레벨에도 유지 (locale 없는 경로에서의 404 처리).
</task>

## Verification

- [ ] `npm run dev` 실행 후 `/ko` 접속 시 홈페이지 정상 렌더링
- [ ] `/en` 접속 시 홈페이지 정상 렌더링
- [ ] `/` 접속 시 `/ko`로 리다이렉트
- [ ] HTML `<html lang="ko">` 또는 `<html lang="en">` 올바르게 설정됨
- [ ] 이중 html/body 렌더링 에러 없음

## must_haves

- app/[locale]/layout.tsx가 html lang을 동적으로 설정
- NextIntlClientProvider가 메시지를 클라이언트 컴포넌트에 전달
- 루트 layout.tsx가 children만 반환 (이중 렌더링 방지)
- 홈페이지가 /ko, /en에서 정상 동작
