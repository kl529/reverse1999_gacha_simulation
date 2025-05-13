"use client";

import { Character } from "@/data/characters";
import { Euphoria } from "@/data/euphoria";
import Image from "next/image";
import { charactersByRarity } from "@/data/characters";

interface Props {
  item: Euphoria;
  character: Character;
}

function getCharacterById(id: number) {
  // 캐릭터 정보를 ID로 가져오기
  for (const rarity in charactersByRarity) {
    const found = charactersByRarity[Number(rarity)].find((c: Character) => c.id === id);
    if (found) return found;
  }
  return null;
}

export default function EuphoriaGuideDetail({ item, character }: Props) {
  const romanNumerals = ["I", "II", "III", "IV"];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-3xl px-4 sm:px-6 lg:px-8 py-10 dark:bg-gray-900 mx-auto">
        {/* 광상 이름 */}
        <h1 className="text-2xl font-bold text-center mb-2 dark:text-white text-black mt-8">
          {item.name}
        </h1>

        {/* 캐릭터 이름 */}
        <h2 className="text-xl text-center mb-6 text-black dark:text-gray-300">
          {character.name}
        </h2>

        {/* 캐릭터 이미지와 광상 이미지 */}
        <div className="flex flex-row items-center justify-center gap-4 mb-6">
          <div className="relative w-40 h-60">
            <Image
              src={`/characters/${character.rarity}stars/${character.engName}.png`}
              alt={character.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-60 h-60">
            <Image
              src={`/infos/euphoria/${character.engName.replace(/-/g, "_")}_${item.number}.png`}
              alt={`${character.name} 광상`}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-1 right-1 bg-gray-200 dark:bg-gray-700 text-[10px] px-1 py-0.5 rounded shadow text-gray-800 dark:text-gray-100 z-10">
              v{item.version}
            </div>
          </div>
        </div>

        {/* note 내용 */}
        <div className="text-center text-black dark:text-gray-200 text-sm mb-6">
          <p className="whitespace-pre-line">{item.note}</p>
          <p className="whitespace-pre-line mt-1">출시 : v{item.version}</p>
        </div>

        {/* 효과들 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-200">💉 효과</h3>
          <ul className="list-none  text-black dark:text-gray-300 space-y-3">
            {[item.desc1, item.desc2, item.desc3, item.desc4]
              .filter(Boolean)
              .map((desc, idx) => (
                <li key={idx}>
                  <span className="font-bold mr-2">{romanNumerals[idx]}.</span>
                  {desc}
                </li>
              ))}
          </ul>
        </div>

        {/* 추천 파티 */}
        {item.recommendParty && Object.keys(item.recommendParty).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-gray-200 mt-4">🍳 추천 파티</h3>
            <div className="space-y-6">
              {Object.entries(item.recommendParty).map(([key, comment], idx) => {
                const ids = key.split(',').map((id) => Number(id.trim()));
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex gap-4 justify-center">
                      {ids.map((id) => {
                        const partyChar = getCharacterById(id);
                        if (!partyChar) return null;
                        return (
                          <div key={id} className="flex flex-col items-center w-18">
                            <div className="relative w-16 h-16">
                              <Image
                                src={`/characters/${partyChar.rarity}stars_small/${partyChar.engName}.png`}
                                alt={partyChar.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="text-xs mt-1 text-center dark:text-white text-black">{partyChar.name}</span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-center text-xs text-gray-600 dark:text-gray-300 mt-1">{comment}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}