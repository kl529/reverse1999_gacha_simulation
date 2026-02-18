import { notFound } from "next/navigation";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import CharacterDetailTabs from "@/components/character/CharacterDetailTabs";
import type { Metadata } from "next";

// 완전 정적 생성 - 재검증 없음
export const revalidate = false;

export async function generateStaticParams() {
  return SETTING_CHARACTERS.map((ch) => ({ id: ch.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const charId = Number(id);
  const character = SETTING_CHARACTERS.find((ch) => ch.id === charId);

  if (!character) return {};

  const baseUrl = "https://www.reverse1999-simulator.com";
  const title = `리버스 1999 ${character.name} 가이드`;
  const description = `${character.name}의 사용법, 공명 & 의지 세팅을 알아보세요.`;
  const imageUrl = `${baseUrl}/characters/${character.rarity}stars_small/${character.engName}.webp`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/character/${character.id}`,
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
  const character = SETTING_CHARACTERS.find((ch) => ch.id === charId);

  if (!character) notFound();

  return <CharacterDetailTabs character={character} />;
}
