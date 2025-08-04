"use client";

import { Character } from "@/data/characters";
import { Euphoria } from "@/data/euphoria";
import Image from "next/image";
import { charactersByRarity } from "@/data/characters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { recommendTeams } from "@/data/recommend_team";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { euphoriaMaterialList } from "@/data/euphoria_material";
import { materialList } from "@/data/material";

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

function getMaterialById(id: number) {
  return materialList.find((material) => material.id === id);
}

function getEuphoriaMaterialByCharacterId(characterId: number) {
  return euphoriaMaterialList.find((material) => material.character_id === characterId);
}

export default function EuphoriaGuideDetail({ item, character }: Props) {
  const romanNumerals = ["I", "II", "III", "IV"];

  const recommendedTeams = useMemo(() => {
    return recommendTeams.filter((team) =>
      team.characters.some(
        (c) => c.id === character.id || c.alternatives?.some((alt) => alt.id === character.id)
      )
    );
  }, [character.id]);

  const allCharacters = useMemo(() => {
    let arr: Character[] = [];
    for (const rarity in charactersByRarity) {
      arr = arr.concat(charactersByRarity[Number(rarity)]);
    }
    return arr;
  }, []);

  const [selectedCharacters, setSelectedCharacters] = useState<Record<string, string>>({});

  const euphoriaMaterial = useMemo(() => {
    return getEuphoriaMaterialByCharacterId(character.id);
  }, [character.id]);

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
                src={`/characters/${character.rarity}stars/${character.engName}.webp`}
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
                src={`/infos/euphoria/${character.engName.replace(/-/g, "_")}_${item.number}.webp`}
                alt={`${character.name} 광상`}
                width={100}
                height={100}
                className="h-full w-full object-contain"
                unoptimized
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
          <Link
            href={`/character_setting/${character.id}`}
            className="mt-2 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {character.name} 세팅 보기 →
          </Link>
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

        {euphoriaMaterial &&
          (euphoriaMaterial.euphoria.length > 0 || euphoriaMaterial.upgrade.length > 0) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>🔧 재료 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {euphoriaMaterial.euphoria.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                      광상 해금
                    </h3>
                    <div className="space-y-3">
                      {euphoriaMaterial.euphoria
                        .filter((euphoria) => euphoria.level === item.number)
                        .map((euphoria, idx) => (
                          <div key={idx} className="rounded-lg border p-3 dark:border-gray-700">
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(euphoria.materials).map(([materialId, quantity]) => {
                                const material = getMaterialById(Number(materialId));
                                if (!material) return null;
                                return (
                                  <div
                                    key={materialId}
                                    className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800"
                                  >
                                    <div className="relative h-8 w-8">
                                      <Image
                                        src={`/infos/materials/${material.id}.webp`}
                                        alt={material.name}
                                        width={32}
                                        height={32}
                                        className="h-full w-full object-contain"
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-medium text-black dark:text-white">
                                        {material.name}
                                      </span>
                                      <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {quantity}개
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {euphoriaMaterial.upgrade.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                      광상 업그레이드
                    </h3>
                    <div className="space-y-3">
                      {euphoriaMaterial.upgrade.map((upgrade, idx) => (
                        <div key={idx} className="rounded-lg border p-3 dark:border-gray-700">
                          <h4 className="mb-2 font-medium text-black dark:text-white">
                            레벨 {upgrade.level}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(upgrade.materials).map(([materialId, quantity]) => {
                              const material = getMaterialById(Number(materialId));
                              if (!material) return null;
                              return (
                                <div
                                  key={materialId}
                                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800"
                                >
                                  <div className="relative h-8 w-8">
                                    <Image
                                      src={`/infos/materials/${material.id}.webp`}
                                      alt={material.name}
                                      width={32}
                                      height={32}
                                      className="h-full w-full object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-black dark:text-white">
                                      {material.name}
                                    </span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                      {quantity}개
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
                                src={`/characters/${partyChar.rarity}stars_small/${partyChar.engName}.webp`}
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

        {recommendedTeams.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex justify-end">
              <Link href="/recommend_team">
                <Button variant="outline" size="sm">
                  전체 추천조합 보기
                </Button>
              </Link>
            </div>
            <h2 className="mb-4 text-center text-xl font-bold">이 캐릭터가 포함된 추천 조합</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {recommendedTeams.map((team) => (
                <div key={team.id} className="rounded-lg border p-4 dark:border-gray-700">
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
                      const key = `team_${team.id}_char_${ch.id}`;
                      const currentDisplayedCharId = selectedCharacters[key] || ch.id.toString();
                      const displayedChar = allCharacters.find(
                        (c) => c.id.toString() === currentDisplayedCharId
                      );
                      if (!displayedChar) return null;

                      const alternatives = ch.alternatives || [];

                      return (
                        <div key={ch.id} className="flex flex-col items-center">
                          <Link href={`/character/${currentDisplayedCharId}`}>
                            <div className="relative">
                              <Image
                                src={`/characters/${displayedChar.rarity}stars/${displayedChar.engName}.webp`}
                                alt={displayedChar.name}
                                width={48}
                                height={48}
                                className="rounded-lg"
                              />
                            </div>
                          </Link>
                          <span className="mt-1 text-xs">{displayedChar.name}</span>
                          {alternatives.length > 0 && (
                            <DropdownMenu>
                              <DropdownMenuTrigger className="text-xs text-blue-600 underline">
                                대체 캐릭터
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="center">
                                {[{ id: ch.id }, ...alternatives].map((alt) => {
                                  const altChar = allCharacters.find((c) => c.id === alt.id);
                                  if (!altChar) return null;
                                  return (
                                    <DropdownMenuItem
                                      key={alt.id}
                                      className="flex items-center gap-2 px-2 py-1 text-xs"
                                      onClick={() => {
                                        setSelectedCharacters((prev) => ({
                                          ...prev,
                                          [key]: alt.id.toString(),
                                        }));
                                      }}
                                    >
                                      <Image
                                        src={`/characters/${altChar.rarity}stars_small/${altChar.engName}.webp`}
                                        alt={altChar.name}
                                        width={24}
                                        height={24}
                                        className="rounded"
                                      />
                                      {altChar.name}
                                    </DropdownMenuItem>
                                  );
                                })}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
