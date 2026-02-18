import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CharacterQuiz from "@/components/character_quiz/CharacterQuiz";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "characterQuiz", {
    path: "/character_quiz",
    imageUrl: "/infos/link_img/quiz_link_img.webp",
  });
}

export default function CharacterQuizPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <CharacterQuiz />
    </div>
  );
}

