import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import PathQuiz from "@/components/path_quiz/PathQuiz";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "pathQuiz", {
    path: "/path_quiz",
    imageUrl: "/infos/link_img/path_quiz_link_img.webp",
  });
}

export default function PathQuizPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <PathQuiz />
    </div>
  );
}

