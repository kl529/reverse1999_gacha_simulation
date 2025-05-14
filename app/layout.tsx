import "@/app/globals.css";
import CustomCursor from "@/components/etc/CustomCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import SecurityWrapper from "@/components/etc/SecurityWrapper";
import { DarkModeProvider } from "@/components/etc/DarkModeContext";
import HamburgerConditional from "@/components/etc/HamburgerConditional";
import { ModalProvider } from "@/components/etc/ModalProvider";
import GlobalLoadingManager from "@/components/etc/GlobalLoadingManager";
import Script from "next/script";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/pwa_icon.png" />
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
          </>
        )}
      </head>
      <body>
        <DarkModeProvider>
          <ModalProvider>
            {" "}
            {/* ✅ 모달 상태를 관리 */}
            <SecurityWrapper>
              <GlobalLoadingManager />
              <HamburgerConditional />
              <CustomCursor />
              <SpeedInsights />
              <Analytics />
              {children}
            </SecurityWrapper>
          </ModalProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
