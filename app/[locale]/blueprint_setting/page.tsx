import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import BlueprintSetting from "@/components/blueprint_setting/BlueprintSetting";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "blueprintSetting", {
    path: "/blueprint_setting",
    imageUrl: "/infos/link_img/blueprint_link_img.webp",
  });
}

export default function CharacterQuizPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <BlueprintSetting />
    </div>
  );
}

