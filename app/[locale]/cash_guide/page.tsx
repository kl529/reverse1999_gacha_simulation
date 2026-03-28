import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CashGuide from "@/components/cash_guide/CashGuide";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "cashGuide", {
    path: "/cash_guide",
    imageUrl: "/infos/link_img/cash_guide_link_img.webp",
  });
}

export default function CashGuidePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <CashGuide />
    </div>
  );
}

