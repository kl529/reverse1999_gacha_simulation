import { notFound } from "next/navigation";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import CharacterSettingDetail from "@/components/character_setting/CharacterSettingDetail";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return SETTING_CHARACTERS.map((ch) => ({ id: ch.id.toString() }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const charId = Number(id);
  const character = SETTING_CHARACTERS.find((ch) => ch.id === charId);

  if (!character) return {};

  const baseUrl = "https://www.reverse1999-simulator.com";
  const title = `리버스 1999 ${character.name} 공명 & 의지 세팅`;
  const description = `${character.name}의 공명과 의지 추천 세팅을 확인해보세요.`;
  const imageUrl = `${baseUrl}/characters/${character.rarity}stars_small/${character.engName}.png`;

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

export default async function CharacterSettingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const charId = Number(id);
  const character = SETTING_CHARACTERS.find((ch) => ch.id === charId);

  if (!character) notFound();

  return <CharacterSettingDetail character={character} />;
}