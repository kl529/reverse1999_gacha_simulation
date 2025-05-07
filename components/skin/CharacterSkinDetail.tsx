"use client";

import Image from "next/image";
import { CharacterSkin } from "@/data/character_skin";
import { charactersByRarity } from "@/data/characters";

export default function SkinDetail({ skin }: { skin: CharacterSkin }) {
  const character = Object.values(charactersByRarity)
    .flat()
    .find((c) => c.id === skin.character_id);

  return (
    <div className="min-h-screen w-full px-4 py-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">

        {/* 제목 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mt-8">
          {skin.name} - {character?.name || "알 수 없음"}
        </h1>

        {/* 태그들 */}
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="bg-orange-200 dark:bg-orange-700 text-sm px-3 py-1 rounded-full">
            버전: {skin.version}
          </span>
          <span className="bg-sky-200 dark:bg-sky-700 text-sm px-3 py-1 rounded-full">
            희귀도: {skin.rarity}
          </span>
          <span className="bg-green-200 dark:bg-green-700 text-sm px-3 py-1 rounded-full">
            획득처: {skin.source}
          </span>
          {skin.price && (
            <span className="bg-purple-200 dark:bg-purple-700 text-sm px-3 py-1 rounded-full">
              가격: {skin.price}
            </span>
          )}
        </div>

        {/* 일러스트 */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-3xl aspect-[9/7]">
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
            <div key={type} className="w-[300px] aspect-[3/5] relative">
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