import EuphoriaGuide from "@/components/euphoria_guide/EuphoriaGuide";

export default function EuphoriaGuidePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <EuphoriaGuide />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 광상 가이드",
  description: "리버스 1999 모든 캐릭터의 광상과 추천 순위를 확인하세요!",
  icons: {
    icon: "/pwa_icon.png", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 광상 가이드",
    description: "리버스 1999 모든 캐릭터의 광상과 추천 순위를 확인하세요!",
    url: "https://www.reverse1999-simulator.com/euphoria_guide",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/euphoria_guide_link_img.png`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 광상 가이드 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 광상 가이드",
    description: "리버스 1999 모든 캐릭터의 광상과 추천 순위를 확인하세요!",
    images: [`/infos/link_img/euphoria_guide_link_img.png`],
  },
};