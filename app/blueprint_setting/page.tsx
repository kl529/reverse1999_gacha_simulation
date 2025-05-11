import BlueprintSetting from "@/components/blueprint_setting/BlueprintSetting";

export default function CharacterQuizPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <BlueprintSetting />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 청사진 모음",
  description: "리버스 1999의 모든 빗속의 공상 청사진을 한눈에 보세요!",
  icons: {
    icon: "/pwa_icon.png", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 청사진 모음",
    description: "리버스 1999의 모든 빗속의 공상 청사진을 한눈에 보세요!",
    url: "https://www.reverse1999-simulator.com/blueprint_setting",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/blueprint_link_img.png`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 청사진 모음 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 청사진 모음",
    description: "리버스 1999의 모든 빗속의 공상 청사진을 한눈에 보세요!",
    images: [`/infos/link_img/blueprint_link_img.png`],
  },
};