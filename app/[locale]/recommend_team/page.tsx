import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import RecommendTeam from "@/components/recommend_team/RecommendTeam";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "recommendTeam", {
    path: "/recommend_team",
    imageUrl: "/infos/link_img/recommend_team_link_img.webp",
  });
}

export default function PathQuizPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <RecommendTeam />
    </div>
  );
}

