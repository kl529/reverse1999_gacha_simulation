"use client";

import { useEffect } from "react";
import { Psycube } from "@/data/psycube_data";
import { character_setting_data } from "@/data/character_setting_data";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { analytics } from "@/lib/posthog";
import { useTranslations } from "next-intl";

interface Props {
  item: Psycube;
}

function renderDescription(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) => {
    if (part.startsWith("[") && part.endsWith("]")) {
      return (
        <span
          key={i}
          className="inline rounded bg-purple-100 px-1 py-0.5 text-sm font-semibold text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function PsycubeGuideSetting({ item }: Props) {
  const t = useTranslations("psycubeGuide");

  useEffect(() => {
    analytics.content.guideViewed("사이큐브", item.name);
  }, [item.name]);

  const usingCharacters = character_setting_data
    .filter((char) => char.psycubes.some((p) => p.psycube_id === item.id))
    .map((char) => {
      const characterInfo = SETTING_CHARACTERS.find((c) => c.id === char.character_id);
      return {
        ...char,
        characterInfo,
      };
    })
    .filter((char) => char.characterInfo);

  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-3xl px-4 py-10 dark:bg-gray-900 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-center gap-4">
          <h1 className="text-center text-2xl font-bold text-black dark:text-white">{item.name}</h1>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              {item.type}
            </span>
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
              {t("star", { n: item.rarity })}
            </span>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-100">
              v{item.version === "2.75" ? t("collab") : item.version}
            </span>
            {item.priority && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-100">
                {item.priority === 99
                  ? t("dataLack")
                  : item.priority === 6
                    ? t("star5Recommend")
                    : t("rank", { n: item.priority })}
              </span>
            )}
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="mb-4 flex justify-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-lg">
                <Image
                  src={`/infos/psycube_img/${item.engName}.webp`}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-4">
              {item.stats && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">{t("stats")}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(item.stats).map(([key, value]) => (
                      <div key={key} className="rounded bg-gray-100 p-2 text-sm dark:bg-gray-800">
                        <div className="text-gray-500 dark:text-gray-400">{key}</div>
                        <div className="font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {item.option && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">{t("option")}</div>
                  <div className="rounded bg-gray-100 p-3 text-sm leading-relaxed dark:bg-gray-800">
                    {renderDescription(item.option)}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {usingCharacters.length > 0 && (
          <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">{t("usingCharacters")}</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {usingCharacters.map((char) => (
                <Link
                  key={char.character_id}
                  href={`/character_setting/${char.character_id}`}
                  className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-2 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      src={`/characters/${char.characterInfo?.rarity}stars_small/${char.characterInfo?.engName}.webp`}
                      alt={char.characterInfo?.name || ""}
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{char.characterInfo?.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
