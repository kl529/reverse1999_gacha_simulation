import ContentGuideDetail from "@/components/content_guide/ContentGuideDetail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contentGuideData } from "@/data/content_guide";

export const revalidate = false;

export async function generateStaticParams() {
  return Object.keys(contentGuideData).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const entry = contentGuideData[id];

  if (!entry) return {};

  const baseUrl = "https://www.reverse1999-simulator.com";
  const title = `리버스 1999 ${entry.name} 가이드`;
  const description = `${entry.name} 상시 컨텐츠 가이드를 확인해보세요.`;
  const imageUrl = `${baseUrl}/infos/link_img/content_guide_link_img.webp`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/content_guide/${entry.id}`,
      siteName: "버틴의 여행가방",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${entry.name} 가이드 이미지`,
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

export default async function ContentGuideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = contentGuideData[id];
  if (!entry) notFound();

  return <ContentGuideDetail contentId={id} />;
}
