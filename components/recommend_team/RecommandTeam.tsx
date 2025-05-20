// RecommendTeamPage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { recommendTeams } from "@/data/recommend_team";
import { charactersByRarity } from "@/data/characters";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const filteredCharacters = Object.values(charactersByRarity)
  .flat()
  .reverse()
  .filter((c) => c.rarity === 6);

const allCharacters = Object.values(charactersByRarity).flat();

export default function RecommendTeamPage() {
  const [showCharacterFilter, setShowCharacterFilter] = useState(false);
  const [showConceptFilter, setShowConceptFilter] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [overrideMap, setOverrideMap] = useState<Record<string, number>>({});

  const filteredTeams = recommendTeams.filter((team) => {
    const matchCharacter = selectedCharacterId
      ? team.characters.some((c) =>
          [c.id, ...(c.alternatives?.map((a) => a.id) || [])].includes(selectedCharacterId)
        )
      : true;
    const matchConcept = selectedConcept ? team.concepts.includes(selectedConcept) : true;
    return matchCharacter && matchConcept;
  });

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <h1 className="my-8 text-center text-3xl font-bold">추천 조합 모음</h1>

      <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => setShowCharacterFilter(!showCharacterFilter)}>
          {showCharacterFilter ? "캐릭터 필터" : "캐릭터 필터"}
        </Button>
        <Button onClick={() => setShowConceptFilter(!showConceptFilter)}>
          {showConceptFilter ? "덱 컨셉 필터" : "덱 컨셉 필터"}
        </Button>
      </div>

      {showCharacterFilter && (
        <div className="mb-6 w-full border-b pb-4">
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-2">
            {filteredCharacters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedCharacterId((prev) => (prev === ch.id ? null : ch.id))}
                className={`flex flex-col items-center rounded border p-1 transition hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedCharacterId === ch.id
                    ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                    : "border-gray-400"
                }`}
                title={ch.name}
              >
                <div className="w-full">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={`/characters/${ch.rarity}stars_small/${ch.engName}.png`}
                      alt={ch.name}
                      fill
                      className="rounded object-contain"
                      sizes="100%"
                    />
                    {ch.version && (
                      <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[8px] text-white">
                        {ch.version}
                      </div>
                    )}
                  </div>
                  <div className="w-full overflow-hidden truncate text-center text-xs">
                    {ch.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {showConceptFilter && (
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 border-b pb-4">
          {Array.from(new Set(recommendTeams.flatMap((team) => team.concepts))).map((concept) => (
            <Badge
              key={concept}
              variant={selectedConcept === concept ? "default" : "secondary"}
              onClick={() => setSelectedConcept((prev) => (prev === concept ? null : concept))}
              className="cursor-pointer"
            >
              {concept}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="p-4">
            <CardContent className="flex flex-col items-start gap-4 p-0 sm:flex-row sm:items-center">
              <div className="flex gap-2 rounded-sm border p-0">
                {team.characters.map((ch, idx) => {
                  const overrideKey = `${team.id}-${idx}`;
                  const selectedId = overrideMap[overrideKey] || ch.id;
                  const character = allCharacters.find((c) => c.id === selectedId);
                  if (!character) return null;

                  const selectedAlt =
                    selectedId === ch.id ? null : ch.alternatives?.find((a) => a.id === selectedId);
                  const isEuphoria = selectedAlt ? selectedAlt.euphoria : ch.euphoria;
                  const role = selectedAlt?.role || ch.role;

                  return (
                    <div key={overrideKey} className="flex w-[72px] flex-col items-center">
                      <div
                        className={`relative w-[72px] rounded border object-contain ${
                          ch.isMain ? "border-2 border-red-500" : "border-gray-400"
                        }`}
                      >
                        <Image
                          src={`/characters/${character.rarity}stars/${character.engName}.png`}
                          alt={character.name}
                          width={72}
                          height={72}
                          className="rounded object-contain"
                        />
                        <Image
                          src={`/infos/effects/${character.rarity}stars.png`}
                          alt={`${character.rarity}성`}
                          width={72}
                          height={16}
                          className="absolute bottom-0 left-0 z-10"
                        />
                        <Image
                          src={`/infos/inspiration/${character.inspiration}.png`}
                          alt={character.inspiration}
                          width={12}
                          height={12}
                          className="absolute right-1 top-0 z-10"
                        />
                        <div className="absolute bottom-1 right-1 z-10 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white">
                          v{character.version}
                        </div>
                        {isEuphoria && (
                          <div className="absolute bottom-6 right-1 z-10 rounded-sm bg-purple-600 px-1 py-[1px] text-[10px] text-white">
                            광상
                          </div>
                        )}
                        {ch.isMain && (
                          <div className="absolute left-1 top-1 z-10 rounded-sm bg-red-600 px-1 py-[1px] text-[10px] text-white">
                            메인
                          </div>
                        )}
                        {role && (
                          <div className="absolute bottom-1 left-1 z-10 rounded-sm bg-green-600 px-1 py-[1px] text-[10px] text-white">
                            {role}
                          </div>
                        )}
                      </div>
                      <span className="mt-1 w-full truncate text-center text-xs">
                        {character.name}
                      </span>

                      {ch.alternatives && ch.alternatives.length > 0 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-xs text-blue-600 underline">
                            대체 캐릭터
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="center">
                            {[
                              { id: ch.id, euphoria: ch.euphoria, role: ch.role },
                              ...ch.alternatives,
                            ].map((alt) => {
                              const altChar = allCharacters.find((c) => c.id === alt.id);
                              return altChar ? (
                                <DropdownMenuItem
                                  key={alt.id}
                                  onSelect={() => {
                                    setOverrideMap((prev) => {
                                      const updated = { ...prev };
                                      if (alt.id === ch.id) delete updated[overrideKey];
                                      else updated[overrideKey] = alt.id;
                                      return updated;
                                    });
                                  }}
                                  className="flex items-center gap-2 px-2 py-1 text-xs"
                                >
                                  <Image
                                    src={`/characters/${altChar.rarity}stars_small/${altChar.engName}.png`}
                                    alt={altChar.name}
                                    width={24}
                                    height={24}
                                    className="rounded"
                                  />
                                  {altChar.name}
                                </DropdownMenuItem>
                              ) : null;
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {team.id}. {team.name}
                </h2>
                <div className="mb-2 mt-1 flex flex-wrap gap-1">
                  {team.concepts.map((c, idx) => (
                    <Badge key={idx} className="bg-purple-600 text-white">
                      {c}
                    </Badge>
                  ))}
                </div>
                <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                  {team.description.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
