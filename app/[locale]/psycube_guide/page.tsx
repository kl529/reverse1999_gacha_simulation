import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import PsycubeGuide from "@/components/psycube_guide/PsycubeGuide";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "psycubeGuide", {
    path: "/psycube_guide",
    imageUrl: "/infos/link_img/psycube_guide_link_img.webp",
  });
}

export default function PsycubeGuidePage() {
  return <PsycubeGuide />;
}

