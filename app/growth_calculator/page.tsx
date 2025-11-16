import { Metadata } from "next";
import GrowthCalculatorPage from "@/components/growth_calculator/GrowthCalculatorPage";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 육성 계산기",
  description: "보유 재료를 입력하고 여러 캐릭터의 육성 계획을 세워 필요한 재료를 확인하세요.",
  keywords: ["리버스1999", "육성계산기", "육성계획", "재료계산", "캐릭터육성"],
  icons: {
    icon: "/pwa_icon.webp", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 육성 계산기",
    description: "보유 재료를 입력하고 여러 캐릭터의 육성 계획을 세워 필요한 재료를 확인하세요.",
    url: "https://www.reverse1999-simulator.com/growth_calculator",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/growth_calculator_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 육성 계산기 페이지 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 육성 계산기",
    description: "보유 재료를 입력하고 여러 캐릭터의 육성 계획을 세워 필요한 재료를 확인하세요.",
    images: [`/infos/link_img/growth_calculator_link_img.webp`],
  },
};

export default function Page() {
  return <GrowthCalculatorPage />;
}
