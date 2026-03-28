import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import GrowthCalculatorPage from "@/components/growth_calculator/GrowthCalculatorPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "growthCalculator", {
    path: "/growth_calculator",
    imageUrl: "/infos/link_img/growth_calculator_link_img.webp",
  });
}

export default function Page() {
  return <GrowthCalculatorPage />;
}
