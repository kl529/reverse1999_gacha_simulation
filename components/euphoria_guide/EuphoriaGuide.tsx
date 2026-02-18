"use client";

import { euphoriaList } from "@/data/euphoria";
import { charactersByRarity } from "@/data/characters";
import Image from "next/image";
import Link from "next/link";
import { version } from "@/data/version";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Character } from "@/data/characters";
import { useTranslations } from "next-intl";

const PRIORITY_KEYS: { [key: number]: string } = {
  1: "priority1",
  2: "priority2",
  3: "priority3",
  4: "priority4",
};

function getCharacterById(id: number) {
  for (const rarity in charactersByRarity) {
    const found = charactersByRarity[Number(rarity)].find((c: Character) => c.id === id);
    if (found) return found;
  }
  return null;
}

const groupedByPriority = euphoriaList
  .sort((a, b) => b.priority - a.priority)
  .reduce((acc: { [priority: number]: typeof euphoriaList }, item) => {
    acc[item.priority] = acc[item.priority] || [];
    acc[item.priority].push(item);
    return acc;
  }, {});

export default function EuphoriaGuide() {
  const t = useTranslations("euphoriaGuide");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 mt-8 text-center text-2xl font-bold text-black dark:text-white lg:text-3xl">
        {t("title")}
      </h1>
      <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
        {t("disclaimer")} <br />
        {t("translationNote", { version })} <br />
        {t("orderNote")}
      </p>

      {Object.entries(groupedByPriority).map(([priority, list]) => (
        <div key={priority} className="mb-10">
          <h2 className="mb-1 text-left text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {t("rank", { n: priority })}
          </h2>
          {PRIORITY_KEYS[Number(priority)] && (
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {t(PRIORITY_KEYS[Number(priority)])}
            </p>
          )}
          <Separator className="mb-4" />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item) => {
              const char = getCharacterById(item.character_id);
              if (!char) return null;

              return (
                <Link
                  href={`/euphoria_guide/${item.id}`}
                  key={item.id}
                  className="transition hover:shadow-lg"
                >
                  <Card className="flex flex-col items-center gap-1 p-4">
                    <CardContent className="w-full p-0">
                      <div className="flex w-full flex-col items-center gap-1 sm:flex-row">
                        <div className="flex h-[120px] w-full items-stretch gap-1 overflow-hidden sm:h-[140px]">
                          <div className="relative aspect-[2/3] h-full w-[30%] overflow-hidden rounded-lg">
                            <Image
                              src={`/characters/${char.rarity}stars/${char.engName}.webp`}
                              alt={char.name}
                              width={100}
                              height={100}
                              className="object-contain object-left"
                            />
                          </div>
                          <div className="relative aspect-square h-full flex-1 overflow-hidden rounded-lg">
                            <Image
                              src={`/infos/euphoria/${char.engName.replace(/-/g, "_")}_${item.number}.webp`}
                              alt={t("euphoriaAlt", { name: char.name })}
                              width={100}
                              height={100}
                              className="h-full w-full object-contain object-right"
                            />
                            <div className="absolute bottom-1 right-1 z-10 rounded bg-gray-200 px-1 py-0.5 text-[10px] text-gray-800 shadow dark:bg-gray-700 dark:text-gray-100">
                              v{item.version === "2.75" ? t("collab") : item.version}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full text-center">
                        <h3 className="mb-1 text-xl font-semibold text-black dark:text-white">
                          {char.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {t("trait", { note: item.note })}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
