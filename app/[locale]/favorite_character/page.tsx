import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import FavoriteCharacter from "@/components/favorite_character/FavoriteCharacter";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "favoriteCharacter", {
    path: "/favorite_character",
    imageUrl: "/infos/link_img/favorite_character_link_img.webp",
  });
}

export default function FavoriteCharacterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <FavoriteCharacter />
    </div>
  );
}

