import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ShopEfficiencyPage from "@/components/shop_efficiency/ShopEfficiencyPage";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "shopEfficiency", {
    path: "/shop_efficiency",
    imageUrl: "/infos/link_img/shop_efficiency_link_img.webp",
  });
}

export default function ShopEfficiency() {
  return <ShopEfficiencyPage />;
}

