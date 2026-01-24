import type { Metadata } from "next";
import { QUIZ_SETS } from "@/data/quiz_questions";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizSetCard from "@/components/quiz/QuizSetCard";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "종합 퀴즈 | 리버스 1999 시뮬레이터",
  description:
    "리버스 1999 종합 퀴즈! 다양한 테마의 퀴즈로 게임 지식을 테스트해보세요.",
  icons: {
    icon: "/pwa_icon.webp",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "종합 퀴즈 | 리버스 1999 시뮬레이터",
    description:
      "리버스 1999 종합 퀴즈! 다양한 테마의 퀴즈로 게임 지식을 테스트해보세요.",
    url: "https://www.reverse1999-simulator.com/quiz",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/general_quiz_link_img.webp`,
        width: 1280,
        height: 720,
        alt: "리버스 1999 종합 퀴즈 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "종합 퀴즈 | 리버스 1999 시뮬레이터",
    description:
      "리버스 1999 종합 퀴즈! 다양한 테마의 퀴즈로 게임 지식을 테스트해보세요.",
    images: [`/infos/link_img/general_quiz_link_img.webp`],
  },
};

export default function QuizSelectPage() {
  return (
    <div className="flex w-full flex-col items-center bg-transparent px-4 py-8 text-gray-900 selection:bg-purple-500/30 dark:text-white">
      {/* 헤더 */}
      <QuizHeader />

      {/* 선택 화면 */}
      <div className="mt-4 flex w-full max-w-4xl flex-col items-center gap-6 rounded-2xl border border-border bg-card p-4 shadow-2xl backdrop-blur-xl sm:gap-8 sm:p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-card-foreground">
            다양한 컨셉의 퀴즈를 풀어보세요.
          </h2>
        </div>

        {/* 퀴즈 선택 */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {QUIZ_SETS.map((quizSet) => (
            <QuizSetCard key={quizSet.id} quizSet={quizSet} />
          ))}
        </div>
      </div>
    </div>
  );
}
