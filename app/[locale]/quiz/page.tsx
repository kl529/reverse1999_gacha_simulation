import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { QUIZ_SETS } from "@/data/quiz_questions";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizSetCard from "@/components/quiz/QuizSetCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "quiz", {
    path: "/quiz",
    imageUrl: "/infos/link_img/general_quiz_link_img.webp",
  });
}

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
