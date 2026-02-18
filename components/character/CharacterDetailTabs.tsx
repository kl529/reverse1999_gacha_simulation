"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Character } from "@/data/characters";
import CharacterDetail from "@/components/character/CharacterDetail";
import CharacterSettingDetail from "@/components/character_setting/CharacterSettingDetail";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import Link from "next/link";
import Image from "next/image";
import { euphoriaList } from "@/data/euphoria";
import { getDisplayVersion } from "@/data/version";
import { Separator } from "@/components/ui/separator";
import { analytics } from "@/lib/posthog";
import { getCharacterUrl } from "@/lib/cdn";

export default function CharacterDetailTabs({ character }: { character: Character }) {
  const t = useTranslations("character");
  const [activeTab, setActiveTab] = useState<string>("setting");
  const is6Star = character.rarity === 6;

  useEffect(() => {
    // 컨텐츠 인기도: 캐릭터 조회 추적
    analytics.content.characterViewed(character.name, character.rarity);
  }, [character.name, character.rarity]);

  const getSortedCharList = (rarity: number) =>
    SETTING_CHARACTERS.filter((c) => c.rarity === rarity).sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
      {/* 캐릭터 헤더 + 탭 버튼 */}
      <div className="mx-auto max-w-4xl px-4 py-2">
        <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">{character.name}</h1>

        <div className="mb-6 flex flex-wrap justify-center gap-6">
          {/* 캐릭터 초상화 */}
          <div className="relative h-[150px] w-[150px] overflow-hidden rounded border dark:border-gray-700">
            <Image
              src={getCharacterUrl(`${character.rarity}stars`, `${character.engName}.webp`)}
              alt={character.name}
              width={150}
              height={150}
              className="h-full w-full object-cover object-top"
              priority
            />
            <Image
              src={`/infos/inspiration/${character.inspiration}.webp`}
              alt={character.inspiration}
              width={16}
              height={16}
              className="absolute left-1 top-0 z-10"
            />
            <div className="absolute bottom-1 right-1 z-10 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white">
              {getDisplayVersion(character.version)}
            </div>
            {euphoriaList.some((e) => e.character_id === character.id) && (
              <div className="absolute bottom-1 left-1 z-10 rounded-sm bg-rose-600 px-1 py-[1px] text-[10px] text-white shadow">
                {t("euphoria")}
              </div>
            )}
          </div>
        </div>

        {/* 탭 버튼 */}
        <div className="mb-4 overflow-hidden rounded-lg border-2 border-gray-300 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-900">
          <div className="flex">
            <button
              onClick={() => setActiveTab("guide")}
              disabled={!is6Star}
              className={`flex-1 px-4 py-4 text-base font-semibold transition ${
                activeTab === "guide"
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              } ${!is6Star ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              {t("guide")}
            </button>
            <button
              onClick={() => setActiveTab("setting")}
              className={`flex-1 px-4 py-4 text-base font-semibold transition ${
                activeTab === "setting"
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              } cursor-pointer`}
            >
              {t("resonanceSetting")}
            </button>
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div>
        {activeTab === "guide" && (
          <>
            {is6Star ? (
              <CharacterDetail character={character} />
            ) : (
              <div className="mx-auto max-w-4xl p-8">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {t("guideOnly6Star")}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </>
        )}

        {activeTab === "setting" && <CharacterSettingDetail character={character} />}
      </div>

      {/* 다른 캐릭터 네비게이션 - 공용 영역 */}
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
        {[6, 5, 4, 3, 2].map((rarity) => {
          const chars = getSortedCharList(rarity);
          if (chars.length === 0) return null;
          const labels: Record<number, string> = {
            6: t("rarity6"),
            5: t("rarity5"),
            4: t("rarity4"),
            3: t("rarity3"),
            2: t("rarity2"),
          };
          return (
          <div
            key={rarity}
            className="rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <h3 className="text-center text-[15px] font-semibold text-gray-800 dark:text-gray-200">
              {labels[rarity]}
            </h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(88px,1fr))] gap-3">
              {getSortedCharList(rarity).map((ch) => (
                <Link key={ch.id} href={`/character/${ch.id}`}>
                  <div className="flex flex-col items-center rounded border border-transparent p-1 transition hover:border-blue-500 hover:bg-blue-50 dark:hover:border-blue-400 dark:hover:bg-blue-950">
                    <div className="relative h-16 w-16 overflow-hidden">
                      <Image
                        src={getCharacterUrl(`${ch.rarity}stars`, `${ch.engName}.webp`, ch.rarity >= 5)}
                        alt={ch.name}
                        fill
                        sizes="64px"
                        className={`rounded ${ch.rarity >= 5 ? "object-contain" : "object-cover object-top"}`}
                        priority
                      />
                      {ch.version && (
                        <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white shadow">
                          {getDisplayVersion(ch.version)}
                        </div>
                      )}
                      {euphoriaList.some((e) => e.character_id === ch.id) && (
                        <div className="absolute bottom-0 left-0 rounded-sm bg-rose-600 px-1 py-[1px] text-[10px] text-white shadow">
                          {t("euphoria")}
                        </div>
                      )}
                    </div>
                    <div className="w-full truncate text-center text-sm font-semibold text-black dark:text-white">
                      {ch.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
