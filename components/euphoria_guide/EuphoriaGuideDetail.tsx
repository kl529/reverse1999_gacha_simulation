"use client";

import { Character } from "@/data/characters";
import { Euphoria } from "@/data/euphoria";
import Image from "next/image";
import { charactersByRarity } from "@/data/characters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Props {
  item: Euphoria;
  character: Character;
}

function getCharacterById(id: number) {
  for (const rarity in charactersByRarity) {
    const found = charactersByRarity[Number(rarity)].find((c: Character) => c.id === id);
    if (found) return found;
  }
  return null;
}

export default function EuphoriaGuideDetail({ item, character }: Props) {
  const romanNumerals = ["I", "II", "III", "IV"];

  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-3xl px-4 py-10 dark:bg-gray-900 sm:px-6 lg:px-8">
        <h1 className="mb-2 mt-8 text-center text-2xl font-bold text-black dark:text-white">
          {item.name}
        </h1>
        <h2 className="mb-6 text-center text-xl text-black dark:text-gray-300">{character.name}</h2>

        <div className="mb-6 flex flex-row items-center justify-center gap-4">
          <Card className="w-40">
            <AspectRatio ratio={2 / 3}>
              <Image
                src={`/characters/${character.rarity}stars/${character.engName}.png`}
                alt={character.name}
                width={100}
                height={100}
                className="h-full w-full object-contain"
              />
            </AspectRatio>
          </Card>
          <Card className="relative w-60">
            <AspectRatio ratio={1}>
              <Image
                src={`/infos/euphoria/${character.engName.replace(/-/g, "_")}_${item.number}.png`}
                alt={`${character.name} 광상`}
                width={100}
                height={100}
                className="h-full w-full object-contain"
              />
            </AspectRatio>
            <div className="absolute bottom-1 right-1 z-10 rounded bg-gray-200 px-1 py-0.5 text-[10px] text-gray-800 shadow dark:bg-gray-700 dark:text-gray-100">
              v{item.version}
            </div>
          </Card>
        </div>

        <div className="mb-6 text-center text-sm text-black dark:text-gray-200">
          <p className="whitespace-pre-line">{item.note}</p>
          <p className="mt-1 whitespace-pre-line">출시 : v{item.version}</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>💉 효과</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-none space-y-3 text-black dark:text-gray-300">
              {[item.desc1, item.desc2, item.desc3, item.desc4].filter(Boolean).map((desc, idx) => (
                <li key={idx} className="whitespace-pre-line">
                  <span className="mr-2 font-bold">{romanNumerals[idx]}.</span>
                  {desc}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {item.recommendParty && Object.keys(item.recommendParty).length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>🍳 추천 파티</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(item.recommendParty).map(([key, comment], idx) => {
                const ids = key.split(",").map((id) => Number(id.trim()));
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-center gap-4">
                      {ids.map((id) => {
                        const partyChar = getCharacterById(id);
                        if (!partyChar) return null;
                        return (
                          <div key={id} className="w-18 flex flex-col items-center">
                            <div className="relative h-16 w-16">
                              <Image
                                src={`/characters/${partyChar.rarity}stars_small/${partyChar.engName}.png`}
                                alt={partyChar.name}
                                width={100}
                                height={100}
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <span className="mt-1 text-center text-xs text-black dark:text-white">
                              {partyChar.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="mt-1 text-center text-xs text-gray-600 dark:text-gray-300">
                      {comment}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
