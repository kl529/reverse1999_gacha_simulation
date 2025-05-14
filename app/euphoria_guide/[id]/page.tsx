import { notFound } from "next/navigation";
import { euphoriaList } from "@/data/euphoria";
import { charactersByRarity } from "@/data/characters";
import EuphoriaGuideDetail from "@/components/euphoria_guide/EuphoriaGuideDetail";
import type { Metadata } from "next";

function getCharacterById(id: number) {
  for (const rarity in charactersByRarity) {
    const found = charactersByRarity[Number(rarity)].find((c) => c.id === id);
    if (found) return found;
  }
  return null;
}

export async function generateStaticParams() {
  return euphoriaList.map((item) => ({ id: item.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const itemId = Number(id);
  const entry = euphoriaList.find((e) => e.id === itemId);

  if (!entry) return {};

  const character = getCharacterById(entry.character_id);
  if (!character) return {};

  const baseUrl = "https://www.reverse1999-simulator.com";
  const title = `리버스 1999 ${character.name} 광상 가이드`;
  const description = `${character.name}의 광상 특징과 출시 정보를 확인해보세요.`;
  const imageUrl = `${baseUrl}/infos/euphoria/${character.engName.replace(/-/g, "_")}_${entry.number}.png`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/euphoria_guide/${entry.id}`,
      siteName: "버틴의 여행가방",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${character.name} 광상 이미지`,
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

export default async function EuphoriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const itemId = Number(id);
  const item = euphoriaList.find((e) => e.id === itemId);
  if (!item) notFound();

  const character = getCharacterById(item.character_id);
  if (!character) notFound();

  return <EuphoriaGuideDetail item={item} character={character} />;
}
