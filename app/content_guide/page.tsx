import ContentGuide from "@/components/content_guide/ContentGuide";

export default function ContentGuidePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <ContentGuide />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 상시 컨텐츠 가이드",
  description:
    "리버스 1999의 상시 컨텐츠를 한눈에 확인하세요. 세 번째 문, 로그라이크, 영상 공략 가이드.",
  icons: {
    icon: "/pwa_icon.webp",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "리버스 1999 상시 컨텐츠 가이드",
    description:
      "리버스 1999의 상시 컨텐츠를 한눈에 확인하세요. 세 번째 문, 로그라이크, 영상 공략 가이드.",
    url: "https://www.reverse1999-simulator.com/content_guide",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/content_guide_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 상시 컨텐츠 가이드 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 상시 컨텐츠 가이드",
    description:
      "리버스 1999의 상시 컨텐츠를 한눈에 확인하세요. 세 번째 문, 로그라이크, 영상 공략 가이드.",
    images: [`/infos/link_img/content_guide_link_img.webp`],
  },
};
