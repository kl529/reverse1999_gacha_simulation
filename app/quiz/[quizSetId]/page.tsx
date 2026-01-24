import Quiz from "@/components/quiz/Quiz";
import { QUIZ_SETS, getQuizSetInfo } from "@/data/quiz_questions";
import { QuizSetId } from "@/lib/types/quizTypes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface QuizPageProps {
  params: Promise<{
    quizSetId: string;
  }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { quizSetId } = await params;
  const quizSet = getQuizSetInfo(quizSetId as QuizSetId);

  if (!quizSet) {
    return {
      title: "퀴즈를 찾을 수 없음 | 리버스 1999 시뮬레이터",
    };
  }

  const title = `${quizSet.name} | 리버스 1999 시뮬레이터`;
  const description = quizSet.description;

  return {
    metadataBase: new URL("https://www.reverse1999-simulator.com"),
    title,
    description,
    icons: {
      icon: "/pwa_icon.webp",
    },
    manifest: "/manifest.json",
    openGraph: {
      title,
      description,
      url: `https://www.reverse1999-simulator.com/quiz/${quizSetId}`,
      siteName: "버틴의 여행가방",
      images: [
        {
          url: `/infos/link_img/quiz_link_img.webp`,
          width: 1200,
          height: 630,
          alt: `${quizSet.name} 미리보기 이미지`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/infos/link_img/quiz_link_img.webp`],
    },
  };
}

// 정적 경로 생성 (빌드 시 미리 생성할 경로들)
export async function generateStaticParams() {
  return QUIZ_SETS.filter((set) => !set.isLocked).map((set) => ({
    quizSetId: set.id,
  }));
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { quizSetId } = await params;
  const quizSet = getQuizSetInfo(quizSetId as QuizSetId);

  // 존재하지 않는 퀴즈 세트이거나 잠긴 퀴즈 세트인 경우 404
  if (!quizSet || quizSet.isLocked) {
    notFound();
  }

  return <Quiz initialQuizSetId={quizSetId as QuizSetId} />;
}
