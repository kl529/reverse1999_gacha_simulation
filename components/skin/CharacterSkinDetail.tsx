"use client";

import Image from "next/image";
import { CharacterSkin } from "@/data/character_skin";
import { charactersByRarity } from "@/data/characters";

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
          <span className="rounded-full bg-orange-200 px-3 py-1 text-sm dark:bg-orange-700">
            버전: {skin.version}
          </span>
          <span className="rounded-full bg-sky-200 px-3 py-1 text-sm dark:bg-sky-700">
            희귀도: {skin.rarity}
          </span>
          <span className="rounded-full bg-green-200 px-3 py-1 text-sm dark:bg-green-700">
            획득처: {skin.source}
          </span>
          {skin.price && (
            <span className="rounded-full bg-purple-200 px-3 py-1 text-sm dark:bg-purple-700">
              가격: {skin.price}
            </span>
          )}
        </div>

        {/* 일러스트 */}
        <div className="flex justify-center">
          <div className="relative aspect-[9/7] w-full max-w-3xl">
            <Image
              src={`/infos/character_skin/illust/${skin.engName}.webp`}
              alt={`${skin.name} 일러스트`}
              fill
              className="rounded-lg object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* standing + mini */}
        <div className="flex flex-wrap justify-center gap-6">
          {["standing", "mini"].map((type) => (
            <div key={type} className="relative aspect-[3/5] w-[300px]">
              <Image
                src={`/infos/character_skin/${type}/${skin.engName}.webp`}
                alt={`${skin.name} ${type}`}
                fill
                className="rounded-lg object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
