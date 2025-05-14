import CharacterSkin from "@/components/skin/CharacterSkin";
import { Suspense } from "react";

export default function CharacterSkinPage() {
  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Suspense fallback={<div>로딩 중...</div>}>
        <CharacterSkin />
      </Suspense>
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 스킨",
  description: "리버스 1999 모든 캐릭터의 스킨을 찾아보세요!",
  icons: {
    icon: "/pwa_icon.png", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 스킨",
    description: "리버스 1999 모든 캐릭터의 스킨을 찾아보세요!",
    url: "https://www.reverse1999-simulator.com/skin",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/skin_link_img.png`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 스킨 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 스킨",
    description: "리버스 1999 모든 캐릭터의 스킨을 찾아보세요!",
    images: [`/infos/link_img/skin_link_img.png`],
  },
};
