import CharacterQuiz from "@/components/character_quiz/CharacterQuiz";

export default function CharacterQuizPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <CharacterQuiz />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 캐릭터 퀴즈",
  description: "리버스 1999의 모든 캐릭터 이름을 맞춰보세요!",
  icons: {
    icon: "/pwa_icon.webp", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 캐릭터 퀴즈",
    description: "리버스 1999의 모든 캐릭터 이름을 맞춰보세요!",
    url: "https://www.reverse1999-simulator.com/character_quiz",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/quiz_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 캐릭터 퀴즈 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 캐릭터 퀴즈",
    description: "리버스 1999의 모든 캐릭터 이름을 맞춰보세요!",
    images: [`/infos/link_img/quiz_link_img.webp`],
  },
};
