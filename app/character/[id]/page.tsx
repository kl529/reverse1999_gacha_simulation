import { notFound } from "next/navigation";
import { GUIDE_CHARACTERS } from "@/data/setting_character";
import CharacterDetail from "@/components/character/CharacterDetail";
import type { Metadata } from "next";

// ISR 설정 추가 - 1시간마다 재생성
export const revalidate = 86400;

export async function generateStaticParams() {
  return GUIDE_CHARACTERS.map((ch) => ({ id: ch.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const charId = Number(id);
  const character = GUIDE_CHARACTERS.find((ch) => ch.id === charId);

  if (!character) return {};

  const baseUrl = "https://www.reverse1999-simulator.com";
  const title = `리버스 1999 ${character.name} 가이드`;
  const description = `${character.name}의 사용법과 정보를 알아보세요.`;
  const imageUrl = `${baseUrl}/characters/${character.rarity}stars_small/${character.engName}.webp`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/character_setting/${character.id}`,
      siteName: "버틴의 여행가방",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${character.name} 아이콘`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CharacterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const charId = Number(id);
  const character = GUIDE_CHARACTERS.find((ch) => ch.id === charId);

  if (!character) notFound();

  return <CharacterDetail character={character} />;
}
