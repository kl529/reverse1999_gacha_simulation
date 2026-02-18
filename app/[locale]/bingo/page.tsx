import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Bingo from "@/components/bingo/Bingo";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "bingo", {
    path: "/bingo",
    imageUrl: "/infos/link_img/bingo_link_img.webp",
  });
}

export default function BingoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Bingo />
    </div>
  );
}

