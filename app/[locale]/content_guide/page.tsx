import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ContentGuide from "@/components/content_guide/ContentGuide";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "contentGuide", {
    path: "/content_guide",
    imageUrl: "/infos/link_img/content_guide_link_img.webp",
  });
}

export default function ContentGuidePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <ContentGuide />
    </div>
  );
}

