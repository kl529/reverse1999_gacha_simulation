import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CouponsPage from "@/components/coupon/CouponsPage";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "coupon", {
    path: "/coupon",
    imageUrl: "/infos/link_img/coupon_link_img.webp",
  });
}

export default function Coupons() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <CouponsPage />
    </div>
  );
}

