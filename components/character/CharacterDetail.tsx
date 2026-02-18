// 전체 코드

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Character } from "@/data/characters";
import { useEffect, useMemo, useState } from "react";
import CharacterGrowthCalculator from "@/components/etc/CharacterGrowthCalculator";
import { resonanceMaterialList } from "@/data/resonance_material";
import { euphoriaMaterialList } from "@/data/euphoria_material";
import { resonancePatternMaterial } from "@/data/resonance_pattern_material";
import { insightMaterial } from "@/data/insight_material";
import { characterGuideList } from "@/data/character_guide";
import { recommendTeams } from "@/data/recommend_team";
import type { RecommendTeamCharacter } from "@/data/recommend_team";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GUIDE_CHARACTERS } from "@/data/setting_character";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { euphoriaList } from "@/data/euphoria";
import { getDisplayVersion } from "@/data/version";
import { getCharacterUrl, getCdnUrl } from "@/lib/cdn";

export default function CharacterDetail({ character }: { character: Character }) {
  const t = useTranslations("character");
  const guide = characterGuideList.find((g) => g.character_id === character.id);
  const allCharacters = [...GUIDE_CHARACTERS].reverse();
  const [selectedCharacters, setSelectedCharacters] = useState<
    Record<string, { id: string; euphoria?: boolean; role?: string }>
  >({});

  useEffect(() => {
    setSelectedCharacters({});
  }, [character.id]);

  const recommendedTeams = useMemo(() => {
    return recommendTeams
      .filter((team) =>
        team.characters.some(
          (c) => c.id === character.id || c.alternatives?.some((alt) => alt.id === character.id)
        )
      )
      .map((team) => {
        // 현재 캐릭터가 대체 캐릭터인 경우, 해당 캐릭터를 메인 캐릭터 위치로 이동
        const modifiedCharacters = team.characters.map((ch) => {
          const matchedAlternative = ch.alternatives?.find((alt) => alt.id === character.id);

          if (matchedAlternative) {
            return {
              ...ch,
              id: character.id,
              euphoria:
                matchedAlternative.euphoria !== undefined
                  ? matchedAlternative.euphoria
                  : ch.euphoria,
              role: matchedAlternative.role ?? ch.role,
              isAlternative: true,
              originalCharacter: ch,
            };
          }

          return ch;
        });

        return {
          ...team,
          characters: modifiedCharacters,
        };
      });
  }, [character.id]);

  const hasGrowthData = useMemo(() => {
    const hasResonance = resonanceMaterialList.some((c) => c.character_id === character.id);
    const hasEuphoria = euphoriaMaterialList.some((c) => c.character_id === character.id);
    const hasResonancePattern = resonancePatternMaterial.some(
      (c) => c.character_id === character.id
    );
    const hasInsight = insightMaterial.some((c) => c.character_id === character.id);

    return hasResonance || hasEuphoria || hasResonancePattern || hasInsight;
  }, [character.id]);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-4xl space-y-8 px-4 pb-8">
        {guide && (
          <div className="space-y-6">
            <Alert variant="destructive" className="dark:bg-gray-600 dark:text-gray-100">
              <AlertTitle>{t("alertTitle")}</AlertTitle>
              <AlertDescription>
                {t("alertDescription")}
                <br />
                {t("alertSubmitPrefix")}{" "}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSemyl74xUyRW4ucW_2eJDnDx1jRf-tJOT6hlQFhrJjehqKVlg/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 underline hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("alertSubmitLink")}
                </a>
                {t("alertSubmitSuffix")}
              </AlertDescription>
            </Alert>

            <div className="flex flex-wrap justify-center gap-2">
              {guide.portrait_info && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document
                      .getElementById("resonance-info")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t("portraitEfficiency")}
                </Button>
              )}
              {guide.youtube_links && guide.youtube_links.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("guide-videos")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t("guideVideos")}
                </Button>
              )}
              {guide.guide_images && guide.guide_images.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("guide-images")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t("guideImages")}
                </Button>
              )}
              {hasGrowthData && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document
                      .getElementById("growth-calculator")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t("growthCalculator")}
                </Button>
              )}
              {recommendedTeams.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document
                      .getElementById("recommended-teams")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t("teamComps")}
                </Button>
              )}
            </div>

            {guide.keywords && guide.keywords.length > 0 && (
              <div className="mb-8 rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-center text-xl font-bold">{t("briefIntro")}</h2>
                <div className="flex flex-wrap justify-center gap-2">
                  {guide.keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm font-medium hover:bg-accent dark:bg-gray-700 dark:text-gray-100"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {guide.portrait_info && guide.portrait_info.headers && guide.portrait_info.rows && (
              <div
                id="resonance-info"
                className="space-y-4 rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
              >
                <h2 className="text-center text-xl font-bold">{t("portraitEfficiency")}</h2>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {t("portraitEfficiencyNote")}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full rounded-lg border dark:border-gray-700">
                    <thead>
                      <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                        {guide.portrait_info?.headers?.map((header, index) => (
                          <th
                            key={index}
                            className={`p-2 text-xs font-semibold sm:p-3 sm:text-sm ${index === 0 ? "text-left" : "text-center"}`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {guide?.portrait_info?.rows?.map(
                        (
                          row: {
                            name: string;
                            efficiencies: [string, string?, string?, string?, string?, string?];
                          },
                          index: number
                        ) => (
                          <tr key={index} className="border-b last:border-0 dark:border-gray-700">
                            <td className="p-2 text-xs font-medium sm:p-3 sm:text-sm">
                              {row.name}
                            </td>
                            {row.efficiencies
                              .slice(0, (guide?.portrait_info?.headers?.length ?? 1) - 1)
                              .map((efficiency: string | undefined, effIndex: number) => (
                                <td key={effIndex} className="p-2 text-center sm:p-3">
                                  <Badge
                                    variant="secondary"
                                    className={cn(
                                      "whitespace-nowrap text-xs sm:text-sm",
                                      effIndex === 0 &&
                                        "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-900",
                                      effIndex === 1 &&
                                        "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-900",
                                      effIndex === 2 &&
                                        "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-900"
                                    )}
                                  >
                                    {efficiency ?? "-"}
                                  </Badge>
                                </td>
                              ))}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  {guide.portrait_info?.summary && (
                    <div className="mt-4 rounded-lg border p-4 dark:border-gray-700">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-black dark:text-white">
                        <span className="text-red-500">{t("portraitSummaryLabel")}</span>
                        {guide.portrait_info.summary}
                      </p>
                      {guide.portrait_info.source && (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-black dark:text-white">
                          <span className="text-red-500">{t("sourceLabel")}</span>
                          {guide.portrait_info.source}
                        </p>
                      )}
                      {guide.portrait_info?.note && (
                        <div className="mt-4 rounded-lg border p-4 dark:border-gray-700">
                          <p className="whitespace-pre-wrap text-sm leading-relaxed text-black dark:text-white">
                            <span className="text-red-500">Comment : </span>
                            {guide.portrait_info.note}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {guide.youtube_links && guide.youtube_links.length > 0 && (
              <div
                id="guide-videos"
                className="space-y-4 rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
              >
                <h2 className="mb-4 text-center text-xl font-bold">{t("guideVideos")}</h2>
                <div className="grid gap-4">
                  {guide.youtube_links.map((link, idx) => {
                    const videoId = link.split("v=")[1]?.split("&")[0];
                    return (
                      <div key={idx} className="aspect-video w-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={t("guideVideoTitle", { index: idx + 1 })}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full rounded-lg"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {guide.guide_images && guide.guide_images.length > 0 && (
              <div
                id="guide-images"
                className="space-y-4 rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
              >
                <h2 className="mb-4 text-center text-xl font-bold">{t("guideImages")}</h2>
                <div className="grid gap-4">
                  {guide.guide_images.map((image, idx) => (
                    <div key={idx} className="relative mx-auto h-auto w-full">
                      <Image
                        src={getCdnUrl(
                          `characters/guide/${character.engName.replace(/-/g, "_")}_guide_${image}.webp`
                        )}
                        alt={t("guideImageAlt", { index: idx + 1 })}
                        width={1200}
                        height={1600}
                        className="h-auto w-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {hasGrowthData && (
          <div id="growth-calculator">
            <CharacterGrowthCalculator characterId={character.id} />
          </div>
        )}

        {euphoriaList.some((e) => e.character_id === character.id) && (
          <div className="space-y-4 rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-center text-xl font-bold">{t("euphoriaInfo")}</h2>
            <div
              className={cn(
                "grid gap-6",
                euphoriaList.filter((e) => e.character_id === character.id).length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2"
              )}
            >
              {euphoriaList
                .filter((e) => e.character_id === character.id)
                .map((euphoria, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col items-center gap-2",
                      euphoriaList.filter((e) => e.character_id === character.id).length === 1 &&
                        "mx-auto max-w-md"
                    )}
                  >
                    <Link href={`/euphoria_guide/${euphoria.id}`}>
                      <Image
                        src={`/infos/euphoria/${character.engName.toLowerCase().replace(/-/g, "_")}_${index + 1}.webp`}
                        alt={t("euphoriaImageAlt", { name: character.name })}
                        width={400}
                        height={225}
                        className="rounded-lg transition-opacity hover:opacity-80"
                      />
                    </Link>
                    <span className="text-lg font-medium">{euphoria.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {t("euphoriaClickHint")}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {recommendedTeams.length > 0 && (
            <div
              id="recommended-teams"
              className="rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-6 flex flex-col items-center gap-4">
                <h2 className="text-center text-xl font-bold">{t("teamComps")}</h2>
                <Link href="/recommend_team">
                  <Button variant="outline" size="sm">
                    {t("viewAllTeams")}
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {recommendedTeams.map((team) => {
                  return (
                    <div key={team.name} className="rounded-lg border p-4 dark:border-gray-700">
                      <h3 className="mb-2 text-center text-lg font-semibold">{team.name}</h3>
                      <div className="mb-4 flex flex-wrap justify-center gap-2">
                        {team.concepts.map((concept, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-gray-200 px-2 py-1 text-sm dark:bg-gray-800"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>

                      <div className="mb-4 flex justify-center gap-2 rounded-sm border p-2">
                        {team.characters.map((ch) => {
                          const teamChar = allCharacters.find((c) => c.id === ch.id);
                          if (!teamChar) return null;

                          const alternatives = ch.alternatives?.filter(
                            (alt) => alt.id !== character.id
                          );
                          const isCurrentCharacterAlternative = "isAlternative" in ch;
                          const originalCharacterData =
                            isCurrentCharacterAlternative && "originalCharacter" in ch
                              ? (ch as typeof ch & { originalCharacter: RecommendTeamCharacter })
                                  .originalCharacter
                              : null;
                          const originalCharacterOption = originalCharacterData
                            ? {
                                id: originalCharacterData.id,
                                euphoria: originalCharacterData.euphoria,
                                role: originalCharacterData.role,
                              }
                            : null;
                          const dropdownOptions = [
                            ...(originalCharacterOption ? [originalCharacterOption] : []),
                            { id: ch.id, euphoria: ch.euphoria, role: ch.role },
                            ...(alternatives || []),
                          ].filter(
                            (option, index, array) =>
                              array.findIndex((opt) => opt.id === option.id) === index
                          );

                          const selectedCharInfo =
                            selectedCharacters[`team_${team.name}_char_${ch.id}`];
                          const currentDisplayedCharId = selectedCharInfo?.id || ch.id.toString();
                          const displayedChar = allCharacters.find(
                            (c) => c.id.toString() === currentDisplayedCharId
                          );
                          if (!displayedChar) return null;

                          // 선택된 캐릭터의 euphoria와 role 정보 가져오기
                          const displayEuphoria = euphoriaList.some(
                            (e) => e.character_id === Number(currentDisplayedCharId)
                          );
                          const displayRole =
                            selectedCharInfo !== undefined ? selectedCharInfo.role : ch.role;

                          return (
                            <div key={ch.id} className="flex flex-col items-center">
                              <Link
                                href={`/character/${currentDisplayedCharId}`}
                                className="relative"
                              >
                                <div className="relative">
                                  <Image
                                    src={getCharacterUrl(
                                      `${displayedChar?.rarity || teamChar?.rarity}stars`,
                                      `${displayedChar?.engName || teamChar?.engName}.webp`
                                    )}
                                    alt={displayedChar?.name || teamChar?.name || ""}
                                    width={72}
                                    height={72}
                                    className={cn("rounded-lg", ch.isMain && "ring-2 ring-red-500")}
                                  />
                                  <Image
                                    src={`/infos/effects/${displayedChar?.rarity || teamChar?.rarity}stars.webp`}
                                    alt={`${displayedChar?.rarity || teamChar?.rarity}성`}
                                    width={72}
                                    height={16}
                                    className="absolute bottom-0 left-0 z-10"
                                  />
                                  <Image
                                    src={`/infos/inspiration/${displayedChar?.inspiration || teamChar?.inspiration}.webp`}
                                    alt={displayedChar?.inspiration || teamChar?.inspiration || ""}
                                    width={12}
                                    height={12}
                                    className="absolute right-1 top-0 z-10"
                                  />
                                  <div className="absolute bottom-1 right-1 z-10 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white">
                                    {getDisplayVersion(displayedChar?.version || teamChar?.version)}
                                  </div>
                                  {displayEuphoria && (
                                    <div className="absolute bottom-6 right-1 z-10 rounded-sm bg-purple-600 px-1 py-[1px] text-[10px] text-white">
                                      {t("euphoria")}
                                    </div>
                                  )}
                                  {ch.isMain && (
                                    <div className="absolute left-1 top-1 z-10 rounded-sm bg-red-600 px-1 py-[1px] text-[10px] text-white">
                                      {t("main")}
                                    </div>
                                  )}
                                  {displayRole && (
                                    <div className="absolute bottom-1 left-1 z-10 rounded-sm bg-green-600 px-1 py-[1px] text-[10px] text-white">
                                      {displayRole}
                                    </div>
                                  )}
                                </div>
                              </Link>
                              <div className="mt-1 flex flex-col items-center gap-1">
                                <span className="text-center text-xs">{displayedChar?.name}</span>
                                {((alternatives && alternatives.length > 0) ||
                                  isCurrentCharacterAlternative) && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger className="text-xs text-blue-600 underline">
                                      {t("alternativeChar")}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center">
                                      {dropdownOptions.map((alt) => {
                                        const altChar = allCharacters.find((c) => c.id === alt.id);
                                        if (!altChar) return null;
                                        return (
                                          <DropdownMenuItem
                                            key={alt.id}
                                            className="flex items-center gap-2 px-2 py-1 text-xs"
                                            onClick={() => {
                                              setSelectedCharacters((prev) => ({
                                                ...prev,
                                                [`team_${team.name}_char_${ch.id}`]: {
                                                  id: alt.id.toString(),
                                                  euphoria: alt.euphoria,
                                                  role: alt.role,
                                                },
                                              }));
                                            }}
                                          >
                                            <div className="flex items-center gap-2">
                                              <Image
                                                src={getCharacterUrl(
                                                  `${altChar.rarity}stars`,
                                                  `${altChar.engName}.webp`,
                                                  true
                                                )}
                                                alt={altChar.name}
                                                width={24}
                                                height={24}
                                                className="rounded"
                                              />
                                              {altChar.name}
                                            </div>
                                          </DropdownMenuItem>
                                        );
                                      })}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
