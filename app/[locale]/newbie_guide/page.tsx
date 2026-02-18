import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import NewbieGuide from "@/components/newbie_guide/NewbieGuide";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "newbieGuide", {
    path: "/newbie_guide",
    imageUrl: "/infos/link_img/newbie_guide_link_img.webp",
  });
}

export default function NewbieGuidePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <NewbieGuide />
    </div>
  );
}

