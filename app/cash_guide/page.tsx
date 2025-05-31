import CashGuide from "@/components/cash_guide/CashGuide";

export default function CashGuidePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <CashGuide />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 현질 가이드",
  description: "리버스 1999의 가장 효율적인 과금 전략 정리",
  icons: {
    icon: "/pwa_icon.webp", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 현질 가이드",
    description: "리버스 1999의 가장 효율적인 과금 전략 정리",
    url: "https://www.reverse1999-simulator.com/cash_guide",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/cash_guide_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 현질 가이드 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 현질 가이드",
    description: "리버스 1999의 가장 효율적인 과금 전략 정리",
    images: [`/infos/link_img/cash_guide_link_img.webp`],
  },
};
