"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CharacterSkin } from "@/data/character_skin";
import { charactersByRarity } from "@/data/characters";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDisplayVersion } from "@/data/version";
import { ArrowLeft, X } from "lucide-react";
import { getSkinIllustUrl, getCdnUrl } from "@/lib/cdn";

function SkinDetailContent({ skin }: { skin: CharacterSkin }) {
  const t = useTranslations("skin");
  const searchParams = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const character = Object.values(charactersByRarity)
    .flat()
    .find((c) => c.id === skin.character_id);

  // URL에서 from 파라미터 가져오기 (필터 상태 포함된 목록 URL)
  const fromUrl = searchParams.get("from") || "/skin";

  return (
    <div className="min-h-screen w-full bg-white px-4 py-10 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        {/* 목록으로 돌아가기 버튼 */}
        <div className="flex justify-start">
          <Link href={fromUrl}>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("backToList")}
            </Button>
          </Link>
        </div>

        {/* 제목 */}
        <h1 className="text-center text-2xl font-bold sm:text-3xl">
          {skin.name} - {character?.name || t("unknown")}
        </h1>

        {/* 태그들 */}
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="bg-orange-200 dark:bg-orange-700">
            {t("versionLabel", { version: getDisplayVersion(skin.version) })}
          </Badge>
          <Badge variant="secondary" className="bg-sky-200 dark:bg-sky-700">
            {t("rarityLabel", { rarity: skin.rarity })}
          </Badge>
          <Badge variant="secondary" className="bg-green-200 dark:bg-green-700">
            {t("sourceLabel", { source: skin.source })}
          </Badge>
          {skin.price && (
            <Badge variant="secondary" className="bg-purple-200 dark:bg-purple-700">
              {t("priceLabel", { price: skin.price })}
            </Badge>
          )}
          {skin.tarot_number && (
            <Badge variant="secondary" className="bg-yellow-200 dark:bg-yellow-700">
              {t("tarotLabel", { number: skin.tarot_number })}
            </Badge>
          )}
        </div>

        {/* 일러스트 */}
        <div
          className="mx-auto w-full max-w-3xl cursor-pointer transition-transform hover:scale-[1.02]"
          onClick={() => setSelectedImage(getSkinIllustUrl(`${skin.engName}.webp`))}
        >
          <AspectRatio ratio={9 / 7}>
            <Image
              src={getSkinIllustUrl(`${skin.engName}.webp`)}
              alt={t("illustAlt", { name: skin.name })}
              fill
              className="rounded-lg object-contain"
              unoptimized
            />
          </AspectRatio>
        </div>

        {/* standing + mini */}
        <div className="flex flex-wrap justify-center gap-6">
          {["standing", "mini"].map((type) => (
            <div
              key={type}
              className="w-[300px] cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() =>
                setSelectedImage(getCdnUrl(`infos/character_skin/${type}/${skin.engName}.webp`))
              }
            >
              <AspectRatio ratio={3 / 5}>
                <Image
                  src={getCdnUrl(`infos/character_skin/${type}/${skin.engName}.webp`)}
                  alt={`${skin.name} ${type}`}
                  fill
                  className="rounded-lg object-contain"
                  unoptimized
                />
              </AspectRatio>
            </div>
          ))}
        </div>

        {/* 유튜브 쇼츠 */}
        {skin.shorts_url && (
          <div className="mx-auto w-full max-w-sm">
            <AspectRatio ratio={9 / 16}>
              <iframe
                src={skin.shorts_url}
                title={t("shortsTitle", { name: skin.name })}
                className="h-full w-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
          </div>
        )}
      </div>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white p-2 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt={t("enlargedImageAlt")}
              width={1200}
              height={1600}
              className="h-auto max-h-[90vh] w-auto max-w-full object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function SkinDetail({ skin }: { skin: CharacterSkin }) {
  const t = useTranslations("skin");
  return (
    <Suspense fallback={<div>{t("loading")}</div>}>
      <SkinDetailContent skin={skin} />
    </Suspense>
  );
}
