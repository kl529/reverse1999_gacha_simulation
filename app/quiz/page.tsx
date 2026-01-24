import type { Metadata } from "next";
import Link from "next/link";
import { QUIZ_SETS } from "@/data/quiz_questions";
import QuizHeader from "@/components/quiz/QuizHeader";

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
        url: `/infos/link_img/quiz_link_img.webp`,
        width: 1200,
        height: 630,
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
    images: [`/infos/link_img/quiz_link_img.webp`],
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
          {QUIZ_SETS.map((quizSet) => {
            const isLocked = quizSet.isLocked;

            if (isLocked) {
              return (
                <div
                  key={quizSet.id}
                  className="group relative flex flex-col overflow-hidden rounded-xl border-2 p-6 text-left cursor-not-allowed border-gray-300 bg-gray-100 opacity-60 grayscale dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-4xl filter drop-shadow-md">
                      {quizSet.icon}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-muted-foreground">
                    {quizSet.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {quizSet.description}
                  </p>
                </div>
              );
            }

            return (
              <Link
                key={quizSet.id}
                href={`/quiz/${quizSet.id}`}
                className="group relative flex flex-col overflow-hidden rounded-xl border-2 p-6 text-left transition-all duration-300 border-gray-200 bg-white hover:border-purple-400 hover:bg-purple-50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-purple-500/50 dark:hover:bg-gray-800/60"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl filter drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                    {quizSet.icon}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-card-foreground group-hover:text-purple-700 dark:group-hover:text-purple-300">
                  {quizSet.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {quizSet.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-purple-100 px-2.5 py-1 text-purple-700 ring-1 ring-purple-300 dark:bg-purple-900/40 dark:text-purple-300 dark:ring-purple-500/30">
                    🔒 {quizSet.questionCount}개 문제
                  </span>
                  <span className="rounded-full bg-red-100 px-2.5 py-1 text-red-700 ring-1 ring-red-300 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-500/30">
                    ⏱️ {quizSet.timePerQuestion}초 제한
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
