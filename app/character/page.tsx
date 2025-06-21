import Character from "@/components/character/Character";

export default function CharacterSettingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Character />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 캐릭터 가이드",
  description: "리버스 1999 모든 캐릭터의 사용법과 정보를 알아보세요.",
  icons: {
    icon: "/pwa_icon.webp", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 캐릭터 가이드",
    description: "리버스 1999 모든 캐릭터의 사용법과 정보를 알아보세요.",
    url: "https://www.reverse1999-simulator.com/character",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/character_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 캐릭터 가이드 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 캐릭터 가이드",
    description: "리버스 1999 모든 캐릭터의 사용법과 정보를 알아보세요.",
    images: [`/infos/link_img/character_link_img.webp`],
  },
};
