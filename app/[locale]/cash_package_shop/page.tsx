import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CashPackageShop from "@/components/cash_package_shop/CashPackageShop";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "cashPackageShop", {
    path: "/cash_package_shop",
    imageUrl: "/infos/link_img/cash_package_shop_link_img.webp",
  });
}

export default function CashPackageShopPage() {
  return <CashPackageShop />;
}

