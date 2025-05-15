"use client";

import Image from "next/image";
import Link from "next/link";
import { Character } from "@/data/characters";
import { character_setting_data } from "@/data/character_setting_data";
import { PSYCUBE_DATA } from "@/data/psycube_data";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CharacterSettingDetail({ character }: { character: Character }) {
  const setting = character_setting_data.find((c) => c.character_id === character.id);

  const psycube_list = (setting?.psycubes || []).map((p) => {
    const psycube = PSYCUBE_DATA.find((d) => d.id === p.psycube_id);
    return {
      src: `/infos/psycube_img/${psycube?.engName}.png`,
      label: psycube?.name || "",
      description: p.description,
      type: psycube?.type,
      version: psycube?.version,
    };
  });

  const getSortedCharList = (rarity: number) =>
    SETTING_CHARACTERS.filter((c) => c.rarity === rarity).sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
        <h1 className="text-center text-2xl font-bold sm:text-3xl">{character.name}</h1>

        <div className="flex flex-wrap justify-center gap-6">
          <div className="h-[150px] w-[150px] overflow-hidden rounded border dark:border-gray-700">
            <Image
              src={`/characters/${character.rarity}stars/${character.engName}.png`}
              alt={character.name}
              width={150}
              height={150}
              className="object-cover object-top"
              priority
            />
          </div>
          <a
            href={`https://sites.google.com/view/reverse1999resonance/%EC%BA%90%EB%A6%AD%ED%84%B0-%EA%B3%B5%EB%AA%85/${character.rarity}성/${encodeURIComponent(
              character.name.toLowerCase().replace(/ /g, "-")
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center rounded bg-gray-500 p-3 text-white dark:bg-gray-800"
          >
            <Image
              src={`/infos/resonance_img/${character.resonanceType}.webp`}
              alt="공명 정보"
              width={100}
              height={100}
              className="rounded border"
            />
            <span className="mt-2 text-sm font-medium">공명정보</span>
          </a>
        </div>

        <div>
          <h2 className="mb-2 text-center text-xl font-bold">의지 추천</h2>
          <p className="mb-4 text-center text-xs text-gray-500 dark:text-gray-400">
            의지는 추천순이며, 순위도 100% 정답이 아닐 수도 있습니다.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {psycube_list.map((item, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="space-y-1 p-2">
                  <div className="relative mx-auto h-[100px] w-[100px]">
                    <Image
                      src={item.src}
                      alt={item.label}
                      className="rounded border object-cover dark:border-gray-700"
                      width={100}
                      height={100}
                    />
                    <div className="absolute left-1 top-1 rounded-sm bg-red-600 px-1 text-[10px] text-white">
                      {idx} 순위
                    </div>
                    <div className="absolute bottom-1 left-1 rounded-sm bg-purple-600 px-1 text-[10px] text-white">
                      {item.type}
                    </div>
                    <div className="absolute bottom-1 right-1 rounded-sm bg-blue-600 px-1 text-[10px] text-white">
                      v{item.version}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{item.label}</div>
                  <p className="px-1 text-xs text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {[6, 5].map((rarity) => (
            <div key={rarity}>
              <h3 className="text-center text-[15px] font-semibold">
                {rarity === 6 ? "🌟 6성" : "⭐ 5성"}
              </h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-[repeat(auto-fit,minmax(64px,1fr))] gap-2">
                {getSortedCharList(rarity).map((ch) => (
                  <Link key={ch.id} href={`/character_setting/${ch.id}`}>
                    <div className="flex flex-col items-center rounded p-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                      <div className="relative h-10 w-10">
                        <Image
                          src={`/characters/${ch.rarity}stars_small/${ch.engName}.png`}
                          alt={ch.name}
                          fill
                          sizes="40px"
                          className="rounded object-contain"
                          priority
                        />
                        {ch.version && (
                          <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[8px] text-white shadow">
                            {ch.version}
                          </div>
                        )}
                      </div>
                      <div className="w-full truncate text-center text-[11px] font-semibold text-gray-600 dark:text-gray-200">
                        {ch.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
