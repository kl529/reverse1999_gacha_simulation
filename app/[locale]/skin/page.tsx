import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CharacterSkin from "@/components/skin/CharacterSkin";
import { Suspense } from "react";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "skin", {
    path: "/skin",
    imageUrl: "/infos/link_img/skin_link_img.webp",
  });
}

export default function CharacterSkinPage() {
  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Suspense fallback={<div>로딩 중...</div>}>
        <CharacterSkin />
      </Suspense>
    </div>
  );
}

