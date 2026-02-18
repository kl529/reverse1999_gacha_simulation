import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ReveriesInTheRain from "@/components/reveries_in_the_rain/ReveriesInTheRain";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "reveriesInTheRain", {
    path: "/reveries_in_the_rain",
    imageUrl: "/infos/link_img/reveries_in_the_rain_link_img.webp",
  });
}

export default function ReveriesInTheRainPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <ReveriesInTheRain />
    </div>
  );
}

