// 폴리필 - 가장 먼저 import (Safari 호환성)
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
import LanguageSwitcher from "@/components/etc/LanguageSwitcher";

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
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-Z474CQX2JT"
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-Z474CQX2JT');
              `}
            </Script>
            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6516579814886841"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <PostHogProvider>
            <ThemeProvider>
              <ThemeToggle />
              <LanguageSwitcher />
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
