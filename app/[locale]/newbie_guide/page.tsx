import NewbieGuide from "@/components/newbie_guide/NewbieGuide";

export default function NewbieGuidePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <NewbieGuide />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 뉴비 가이드",
  description: "리버스 1999 뉴비를 위한 단계별 게임 가이드입니다.",
  icons: {
    icon: "/pwa_icon.webp",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "리버스 1999 뉴비 가이드",
    description: "리버스 1999 뉴비를 위한 단계별 게임 가이드입니다.",
    url: "https://www.reverse1999-simulator.com/newbie_guide",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/newbie_guide_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 뉴비 가이드 페이지 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 뉴비 가이드",
    description: "리버스 1999 뉴비를 위한 단계별 게임 가이드입니다.",
    images: [`/infos/link_img/newbie_guide_link_img.webp`],
  },
};
