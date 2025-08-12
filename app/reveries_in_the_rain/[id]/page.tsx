import ReveriesInTheRainDetail from "@/components/reveries_in_the_rain/ReveriesInTheRainDetail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { reveriesInTheRain } from "@/data/reveries_in_the_rain";

// ISR 설정 추가 - 1시간마다 재생성
export const revalidate = 86400;

export async function generateStaticParams() {
  return Object.keys(reveriesInTheRain).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const entry = reveriesInTheRain[id];

  if (!entry) return {};

  const baseUrl = "https://www.reverse1999-simulator.com";
  const title = `리버스 1999 빗속의 공상 ${entry.id} 공략`;
  const description = `빗속의 공상 ${entry.id}의 공략을 확인해보세요.`;
  const imageUrl = `${baseUrl}/infos/link_img/reveries_in_the_rain_link_img.webp`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/reveries_in_the_rain/${entry.id}`,
      siteName: "버틴의 여행가방",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${entry.id} 빗속의 공상 이미지`,
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

export default async function EuphoriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = reveriesInTheRain[id];
  if (!entry) notFound();

  return <ReveriesInTheRainDetail floorId={id} />;
}
