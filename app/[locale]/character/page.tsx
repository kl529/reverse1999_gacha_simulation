import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import CharacterList from "@/components/character/CharacterList";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "character", {
    path: "/character",
    imageUrl: "/infos/link_img/character_link_img.webp",
  });
}

export default function CharacterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Suspense fallback={<div>로딩 중...</div>}>
        <CharacterList />
      </Suspense>
    </div>
  );
}

