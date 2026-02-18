import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import GachaGuide from "@/components/gacha_guide/GachaGuide";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "gachaGuide", {
    path: "/gacha_guide",
    imageUrl: "/infos/link_img/gacha_guide_link_img.webp",
  });
}

export default function GachaGuidePage() {
  return <GachaGuide />;
}

