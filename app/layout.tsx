import "@/app/globals.css";
import CustomCursor from "@/components/etc/CustomCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import SecurityWrapper from "@/components/etc/SecurityWrapper";
import { DarkModeProvider } from "@/components/etc/DarkModeContext";
import HamburgerMenu from "@/components/buttons/HamburgerMenu";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* ✅ PWA 지원을 위한 설정 */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/pwa_icon.png" />
      </head>
      <body>
        <DarkModeProvider>
          <SecurityWrapper>
            <HamburgerMenu />
            <CustomCursor />
            <SpeedInsights />
            <Analytics />
            {children}
          </SecurityWrapper>
        </DarkModeProvider>
      </body>
    </html>
  );
}