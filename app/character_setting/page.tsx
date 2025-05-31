import CharacterSetting from "@/components/character_setting/CharacterSetting";

export default function CharacterSettingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <CharacterSetting />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 공명 & 의지 세팅",
  description: "리버스 1999 모든 캐릭터의 공명 & 의지 세팅을 찾아보세요!",
  icons: {
    icon: "/pwa_icon.webp", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 공명 & 의지 세팅",
    description: "리버스 1999 모든 캐릭터의 공명 & 의지 세팅을 찾아보세요!",
    url: "https://www.reverse1999-simulator.com/character_setting",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/character_setting_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 공명 & 의지 세팅 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 공명 & 의지 세팅",
    description: "리버스 1999 모든 캐릭터의 공명 & 의지 세팅을 찾아보세요!",
    images: [`/infos/link_img/character_setting_link_img.webp`],
  },
};
