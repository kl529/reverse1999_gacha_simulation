import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import GachaGame from "@/components/gacha_simulator/GachaGame";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "gacha", {
    path: "/gacha_simulator",
    imageUrl: "/infos/link_img/gacha_simulator_link_img.webp",
  });
}

export default function GachaSimulatorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <GachaGame />
    </div>
  );
}

