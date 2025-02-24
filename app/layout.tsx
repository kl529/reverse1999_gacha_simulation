import "@/app/globals.css";
import { version } from "@/data/version";
import CustomCursor from "@/components/CustomCursor";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <CustomCursor />
        <SpeedInsights />
        <Analytics />
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "Reverse:1999 가챠 시뮬레이터",
  description: "Reverse:1999 가챠를 무제한으로 뽑아보세요.",
  openGraph: {
    title: "Reverse:1999 가챠 시뮬레이터",
    description: "Reverse:1999 가챠를 무제한으로 뽑아보세요!!",
    url: "https://reverse1999-gacha-simulation.vercel.app/",
    siteName: "Reverse:1999 가챠 시뮬레이터",
    images: [
      {
        url: `/infos/link_img/${version}_img.png`, // 공개할 미리보기 이미지
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
    images: [`/infos/link_img/${version}_img.png`], // 트위터 미리보기 이미지
  },
};