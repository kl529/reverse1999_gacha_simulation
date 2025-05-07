"use client";

import Image from "next/image";
import Link from "next/link";
import { Character } from "@/data/characters";
import { character_setting_data } from "@/data/character_setting_data";
import { PSYCUBE_DATA } from "@/data/psycube_data";
import { SETTING_CHARACTERS } from "@/data/setting_character";

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
    SETTING_CHARACTERS
      .filter((c) => c.rarity === rarity)
      .sort((a, b) => b.id - a.id); // ID 내림차순

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 제목 + 목록버튼 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center flex-1">
            {character.name}
          </h1>
        </div>

        {/* 캐릭터 이미지 + 공명 정보 */}
        <div className="flex flex-row sm:flex-row justify-center items-center gap-8 mb-8">
          <div className="w-[150px] h-[150px] rounded overflow-hidden border dark:border-gray-700">
            <Image
              src={`/characters/${character.rarity}stars/${character.engName}.png`}
              alt={character.name}
              width={150}
              height={300}
              className="object-cover object-top w-full h-auto"
            />
          </div>

          <div className="flex flex-col items-center bg-gray-500 dark:bg-gray-800 p-3 rounded">
            <a
              href={`https://sites.google.com/view/reverse1999resonance/%EC%BA%90%EB%A6%AD%ED%84%B0-%EA%B3%B5%EB%AA%85/${character.rarity}성/${encodeURIComponent(
                character.name.toLowerCase().replace(/ /g, "-")
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`/infos/resonance_img/${character.resonanceType}.webp`}
                alt="공명 정보"
                width={100}
                height={100}
                className="rounded border hover:opacity-90 transition"
              />
              <span className="mt-2 block text-sm font-medium text-white text-center">공명정보</span>
            </a>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-2 text-center">의지 추천</h2>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-4">
            의지는 추천순이며, 순위도 100% 정답이 아닐 수도 있습니다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {psycube_list.map((item, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="relative w-[100px] h-[100px] mx-auto">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover rounded border dark:border-gray-700"
                  />
                  <div className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-1 rounded-sm">
                    {idx} 순위
                  </div>
                  <div className="absolute bottom-1 left-1 bg-purple-600 text-white text-[10px] px-1 rounded-sm">
                    {item.type}
                  </div>
                  <div className="absolute bottom-1 right-1 bg-blue-600 text-white text-[10px] px-1 rounded-sm">
                    v{item.version}
                  </div>
                </div>
                <div className="font-semibold text-sm">{item.label}</div>
                <p className="text-xs text-gray-600 dark:text-gray-300 px-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 다른 캐릭터 보기 */}
        <div className="mb-16">
          {[6, 5].map((rarity) => (
            <div key={rarity} className="mb-6">
              <h3 className="font-semibold mb-2 text-[15px] text-center">
                {rarity === 6 ? "🌟 6성" : "⭐ 5성"}
              </h3>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(64px,1fr))] gap-2">
                {getSortedCharList(rarity).map((ch) => (
                  <Link key={ch.id} href={`/character_setting/${ch.id}`}>
                    <div className="flex flex-col items-center p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <div className="relative w-10 h-10">
                        <Image
                          src={`/characters/${ch.rarity}stars_small/${ch.engName}.png`}
                          alt={ch.name}
                          fill
                          className="object-contain rounded"
                        />
                        {ch.version && (
                          <div className="absolute bottom-0 right-0 bg-blue-600 text-white text-[8px] px-1 py-[1px] rounded-sm shadow">
                            {ch.version}
                          </div>
                        )}
                      </div>
                      <div className="text-[11px] text-center text-gray-600 dark:text-gray-200 truncate w-full font-semibold">
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