import QuizPage from "@/components/character_quiz/QuizPage";

export default function CharacterQuizPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <QuizPage />
    </div>
  );
}

export const metadata = {
  title: "Reverse:1999 캐릭터 퀴즈",
  description: "Reverse:1999의 모든 캐릭터 이름을 맞춰보세요!",
  openGraph: {
    title: "Reverse:1999 캐릭터 퀴즈",
    description: "Reverse:1999의 모든 캐릭터 이름을 맞춰보세요!",
    url: "https://www.reverse1999-simulator.com/character_quiz",
    siteName: "Reverse:1999 놀이터",
    images: [
      {
        url: "/infos/link_img/quiz_link_img.png",
        width: 1200,
        height: 630,
        alt: "Reverse:1999 캐릭터 퀴즈 미리보기",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverse:1999 캐릭터 퀴즈",
    description: "Reverse:1999의 모든 캐릭터 이름을 맞춰보세요!",
    images: ["/infos/link_img/quiz_link_img.png"],
  },
};