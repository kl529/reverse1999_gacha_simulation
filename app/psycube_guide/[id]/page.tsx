import { notFound } from "next/navigation";
import { psycube_list } from "@/data/psycube_data";
import PsycubeGuideDetail from "@/components/psycube_guide/PsycubeGuideDetail";
import type { Metadata } from "next";

// ISR 설정 추가 - 1시간마다 재생성
export const revalidate = 7200;

export async function generateStaticParams() {
  return psycube_list.map((item) => ({ id: item.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const psycubeId = Number(id);
  const psycube = psycube_list.find((item) => item.id === psycubeId);

  if (!psycube) return {};

  const baseUrl = "https://www.reverse1999-simulator.com";
  const title = `리버스 1999 ${psycube.name} 의지 육성 상세 정보`;
  const description = `${psycube.name}의 의지 육성 상세 정보를 확인해보세요.`;
  const imageUrl = `${baseUrl}/infos/psycube_img/${psycube.engName}.webp`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/psycube_guide/${psycube.id}`,
      siteName: "버틴의 여행가방",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${psycube.name} 의지 육성`,
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

export default async function PsycubeGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const psycubeId = Number(id);
  const psycube = psycube_list.find((item) => item.id === psycubeId);

  if (!psycube) notFound();

  return <PsycubeGuideDetail item={psycube} />;
}
