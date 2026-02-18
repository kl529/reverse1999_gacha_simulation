import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import FutureInsight from "@/components/future_insight/FutureInsight";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "futureInsight", {
    path: "/future_insight",
    imageUrl: "/infos/link_img/future_insight_link_img.webp",
  });
}

export default function PathQuizPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <FutureInsight />
    </div>
  );
}

