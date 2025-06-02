import "@/app/globals.css";
import CustomCursor from "@/components/etc/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import SecurityWrapper from "@/components/etc/SecurityWrapper";
import { ModalProvider } from "@/components/etc/ModalProvider";
import GlobalLoadingManager from "@/components/etc/GlobalLoadingManager";
import Script from "next/script";
import { ReactNode } from "react";
import ThemeProvider from "@/components/etc/ThemeProvider";
import HamburgerConditional from "@/components/etc/HamburgerConditional";
import ThemeToggle from "@/components/etc/ThemeToggle";

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
              <Analytics />
              {children}
            </SecurityWrapper>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
