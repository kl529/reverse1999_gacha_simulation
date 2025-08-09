"use client";

import Image from "next/image";
import { CharacterSkin } from "@/data/character_skin";
import { charactersByRarity } from "@/data/characters";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { getDisplayVersion } from "@/data/version";

export default function SkinDetail({ skin }: { skin: CharacterSkin }) {
  const character = Object.values(charactersByRarity)
    .flat()
    .find((c) => c.id === skin.character_id);

  return (
    <div className="min-h-screen w-full bg-white px-4 py-10 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        {/* 제목 */}
        <h1 className="mt-8 text-center text-2xl font-bold sm:text-3xl">
          {skin.name} - {character?.name || "알 수 없음"}
        </h1>

        {/* 태그들 */}
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="bg-orange-200 dark:bg-orange-700">
            버전: {getDisplayVersion(skin.version)}
          </Badge>
          <Badge variant="secondary" className="bg-sky-200 dark:bg-sky-700">
            희귀도: {skin.rarity}
          </Badge>
          <Badge variant="secondary" className="bg-green-200 dark:bg-green-700">
            획득처: {skin.source}
          </Badge>
          {skin.price && (
            <Badge variant="secondary" className="bg-purple-200 dark:bg-purple-700">
              가격: {skin.price}
            </Badge>
          )}
          {skin.tarot_number && (
            <Badge variant="secondary" className="bg-yellow-200 dark:bg-yellow-700">
              타로 번호: {skin.tarot_number}
            </Badge>
          )}
        </div>

        {/* 일러스트 */}
        <div className="mx-auto w-full max-w-3xl">
          <AspectRatio ratio={9 / 7}>
            <Image
              src={`/infos/character_skin/illust/${skin.engName}.webp`}
              alt={`${skin.name} 일러스트`}
              fill
              className="rounded-lg object-contain"
              unoptimized
            />
          </AspectRatio>
        </div>

        {/* standing + mini */}
        <div className="flex flex-wrap justify-center gap-6">
          {["standing", "mini"].map((type) => (
            <div key={type} className="w-[300px]">
              <AspectRatio ratio={3 / 5}>
                <Image
                  src={`/infos/character_skin/${type}/${skin.engName}.webp`}
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
                title={`${skin.name} 스킨 쇼츠`}
                className="h-full w-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
          </div>
        )}
      </div>
    </div>
  );
}
