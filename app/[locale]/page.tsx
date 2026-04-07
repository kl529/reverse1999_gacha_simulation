import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { WebsiteStructuredData, VideoGameStructuredData } from "@/components/etc/StructuredData";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "home");
}

export default function Home() {
  return (
    <>
      <WebsiteStructuredData />
      <VideoGameStructuredData />
      <HomePage />
    </>
  );
}
