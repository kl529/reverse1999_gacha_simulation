import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import EuphoriaGuide from "@/components/euphoria_guide/EuphoriaGuide";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "euphoriaGuide", {
    path: "/euphoria_guide",
    imageUrl: "/infos/link_img/euphoria_guide_link_img.webp",
  });
}

export default function EuphoriaGuidePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <EuphoriaGuide />
    </div>
  );
}

