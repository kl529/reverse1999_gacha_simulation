import { notFound } from "next/navigation";
import { characterSkin } from "@/data/character_skin";
import SkinDetail from "@/components/skin/CharacterSkinDetail";
import type { Metadata } from "next";

// ISR 설정 추가 - 1시간마다 재생성
export const revalidate = 3600;

export async function generateStaticParams() {
  return characterSkin.map((skin) => ({ id: skin.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const skinId = Number(id);
  const skin = characterSkin.find((s) => s.id === skinId);

  if (!skin) return {};

  const baseUrl = "https://www.reverse1999-simulator.com";
  const title = `리버스 1999 ${skin.name} 스킨`;
  const description = `${skin.name}의 스킨을 확인해보세요.`;
  const imageUrl = `${baseUrl}/infos/character_skin/list/${skin.engName}.webp`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/skin/${skin.id}`,
      siteName: "버틴의 여행가방",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${skin.name} 스킨`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SkinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skinId = Number(id);
  const skin = characterSkin.find((s) => s.id === skinId);

  if (!skin) notFound();

  return <SkinDetail skin={skin} />;
}
