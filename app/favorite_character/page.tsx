import FavoriteCharacter from "@/components/favorite_character/FavoriteCharacter";

export default function FavoriteCharacterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <FavoriteCharacter />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 최애 캐릭터",
  description: "리버스 1999에서 당신의 속성별 최애 캐릭터를 선택하고 공유해보세요!",
  icons: {
    icon: "/pwa_icon.webp",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "리버스 1999 최애 캐릭터",
    description: "리버스 1999에서 당신의 속성별 최애 캐릭터를 선택하고 공유해보세요!",
    url: "https://www.reverse1999-simulator.com/favorite_character",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/favorite_character_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 최애 캐릭터 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 최애 캐릭터",
    description: "리버스 1999에서 당신의 속성별 최애 캐릭터를 선택하고 공유해보세요!",
    images: [`/infos/link_img/favorite_character_link_img.webp`],
  },
};
