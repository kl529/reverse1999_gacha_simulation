import "@/app/globals.css";
import { version } from "@/data/version";
import CustomCursor from "@/components/etc/CustomCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import SecurityWrapper from "@/components/etc/SecurityWrapper";
import DarkModeProvider from "@/components/buttons/DarkModeButton";

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
        <SecurityWrapper>
          <CustomCursor />
          <SpeedInsights />
          <Analytics />
          <DarkModeProvider>{children}</DarkModeProvider>
        </SecurityWrapper>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Reverse:1999 가챠 시뮬레이터",
  description: "Reverse:1999 가챠를 무제한으로 뽑아보세요.",
  icons: {
    icon: "/pwa_icon.png", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  themeColor: "#ffffff", // PWA 테마 색상
  openGraph: {
    title: "Reverse:1999 가챠 시뮬레이터",
    description: "Reverse:1999 가챠를 무제한으로 뽑아보세요!!",
    url: "https://reverse1999-gacha-simulation.vercel.app/",
    siteName: "Reverse:1999 가챠 시뮬레이터",
    images: [
      {
        url: `/infos/link_img/${version}_img.png`,
        width: 1200,
        height: 630,
        alt: "Reverse:1999 가챠 시뮬레이터 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverse:1999 가챠 시뮬레이터",
    description: "Reverse:1999 가챠를 무제한으로 뽑아보세요!!",
    images: [`/infos/link_img/${version}_img.png`],
  },
};