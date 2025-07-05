import "@/app/globals.css";
import CustomCursor from "@/components/etc/CustomCursor";
import SecurityWrapper from "@/components/etc/SecurityWrapper";
import { ModalProvider } from "@/components/etc/ModalProvider";
import GlobalLoadingManager from "@/components/etc/GlobalLoadingManager";
import Script from "next/script";
import { ReactNode } from "react";
import ThemeProvider from "@/components/etc/ThemeProvider";
import HamburgerConditional from "@/components/etc/HamburgerConditional";
import ThemeToggle from "@/components/etc/ThemeToggle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "버틴의 여행가방",
  description: "리버스1999 종합정보 사이트입니다.",
  icons: {
    icon: "/pwa_icon.webp",
    apple: "/pwa_icon.webp",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="ko" suppressHydrationWarning>
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
      <body>
        <ThemeProvider>
          <ThemeToggle />
          <ModalProvider>
            <SecurityWrapper>
              <GlobalLoadingManager />
              <HamburgerConditional />
              <CustomCursor />
              {children}
            </SecurityWrapper>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
