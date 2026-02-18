import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import DamageCalculator from "@/components/damage_calculation/DamageCalculator";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "damageCalculation", {
    path: "/damage_calculation",
    imageUrl: "/infos/link_img/home_link_img.webp",
  });
}

export default function DamageCalculationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <DamageCalculator />
    </div>
  );
}

