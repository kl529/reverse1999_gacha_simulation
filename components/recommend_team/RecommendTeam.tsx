// RecommendTeamPage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getDisplayVersion, isNewerVersion } from "@/data/version";
import { euphoriaList } from "@/data/euphoria";
import { RecommendTeam } from "@/data/recommend_team";

const filteredCharacters = Object.values(charactersByRarity)
  .flat()
  .reverse()
  .filter((c) => c.rarity === 6);

const allCharacters = Object.values(charactersByRarity).flat();

// Toast 컴포넌트
const Toast = ({
  message,
  isVisible,
  onClose,
}: {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 top-4 z-50 rounded-md bg-blue-600 px-4 py-2 text-white shadow-lg">
      {message}
    </div>
  );
};

export default function RecommendTeamPage() {
  const [showCharacterFilter, setShowCharacterFilter] = useState(false);
  const [showConceptFilter, setShowConceptFilter] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [overrideMap, setOverrideMap] = useState<Record<string, number>>({});
  const [showIntroDialog, setShowIntroDialog] = useState(false);
  const [serverFilter, setServerFilter] = useState<"kr" | "cn">("cn");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("seenRecommendIntro");
      if (!hasSeen) {
        setShowIntroDialog(true);
        localStorage.setItem("seenRecommendIntro", "true");
      }
    }
  }, []);

  // Toast 표시 함수
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  // 서버 필터 변경 핸들러
  const handleServerFilterChange = (newFilter: "kr" | "cn") => {
    setServerFilter(newFilter);
    const message =
      newFilter === "kr" ? "한섭 필터가 적용되었습니다" : "중섭 필터가 적용되었습니다";
    showToastMessage(message);
  };

  // 캐릭터 필터 변경 핸들러
  const handleCharacterFilterChange = (characterId: number | null) => {
    setSelectedCharacterId(characterId);
    if (characterId) {
      const character = allCharacters.find((c) => c.id === characterId);
      showToastMessage(`${character?.name || "캐릭터"} 필터가 적용되었습니다`);
    } else {
      showToastMessage("캐릭터 필터가 해제되었습니다");
    }
  };

  // 컨셉 필터 변경 핸들러
  const handleConceptFilterChange = (concept: string | null) => {
    setSelectedConcept(concept);
    if (concept) {
      showToastMessage(`"${concept}" 컨셉 필터가 적용되었습니다`);
    } else {
      showToastMessage("컨셉 필터가 해제되었습니다");
    }
  };

  // 광상 캐릭터의 최신 버전 확인 함수
  const getLatestEuphoriaVersion = (characterId: number): string | null => {
    const characterEuphorias = euphoriaList.filter((e) => e.character_id === characterId);
    if (characterEuphorias.length === 0) return null;

    // 버전별로 정렬하여 최신 버전 반환
    return characterEuphorias.reduce((latest, current) => {
      if (isNewerVersion(latest)) {
        return current.version;
      }
      return latest;
    }, characterEuphorias[0].version);
  };

  // 한섭 필터링 함수: 현재 버전보다 높은 버전의 캐릭터가 포함된 덱 제외
  const isTeamAvailableInKorea = (team: RecommendTeam) => {
    for (const ch of team.characters) {
      const character = allCharacters.find((c) => c.id === ch.id);

      // 기본 캐릭터 버전 확인
      if (character && isNewerVersion(character.version)) {
        return false;
      }

      // 광상 캐릭터인 경우 광상의 최신 버전 기준으로 확인
      if (ch.euphoria && character) {
        const latestEuphoriaVersion = getLatestEuphoriaVersion(character.id);
        if (latestEuphoriaVersion && isNewerVersion(latestEuphoriaVersion)) {
          return false;
        }
      }

      // 대체 캐릭터도 확인
      if (ch.alternatives) {
        for (const alt of ch.alternatives) {
          const altCharacter = allCharacters.find((c) => c.id === alt.id);
          if (altCharacter && isNewerVersion(altCharacter.version)) {
            return false;
          }

          // 대체 캐릭터도 광상인 경우 광상 버전 확인
          if (alt.euphoria && altCharacter) {
            const latestAltEuphoriaVersion = getLatestEuphoriaVersion(altCharacter.id);
            if (latestAltEuphoriaVersion && isNewerVersion(latestAltEuphoriaVersion)) {
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  const filteredTeams = recommendTeams.filter((team) => {
    // 서버 필터 적용
    if (serverFilter === "kr" && !isTeamAvailableInKorea(team)) {
      return false;
    }

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

      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        {/* 서버 필터 */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border">
            <button
              onClick={() => handleServerFilterChange("cn")}
              className={`px-3 py-1 text-sm transition ${
                serverFilter === "cn"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              중섭
            </button>
            <button
              onClick={() => handleServerFilterChange("kr")}
              className={`px-3 py-1 text-sm transition ${
                serverFilter === "kr"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              한섭
            </button>
          </div>
        </div>

        <Button onClick={() => setShowCharacterFilter(!showCharacterFilter)}>
          {showCharacterFilter ? "캐릭터 필터" : "캐릭터 필터"}
        </Button>
        <Button onClick={() => setShowConceptFilter(!showConceptFilter)}>
          {showConceptFilter ? "덱 컨셉 필터" : "덱 컨셉 필터"}
        </Button>
        <Button onClick={() => setShowIntroDialog(true)}>설명서</Button>
      </div>

      {showCharacterFilter && (
        <div className="mb-6 w-full border-b pb-4">
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-2">
            {filteredCharacters.map((ch) => (
              <button
                key={ch.id}
                onClick={() =>
                  handleCharacterFilterChange(selectedCharacterId === ch.id ? null : ch.id)
                }
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
                      src={`/characters/${ch.rarity}stars_small/${ch.engName}.webp`}
                      alt={ch.name}
                      fill
                      className="rounded object-contain"
                      sizes="100%"
                    />
                    {ch.version && (
                      <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[8px] text-white">
                        {getDisplayVersion(ch.version)}
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
              onClick={() =>
                handleConceptFilterChange(selectedConcept === concept ? null : concept)
              }
              className="cursor-pointer"
            >
              {concept}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2">
        {filteredTeams.map((team) => (
          <Card key={team.name} className="p-4">
            <CardContent className="flex flex-col items-start gap-4 p-0 sm:flex-row sm:items-center">
              <div className="flex gap-2 rounded-sm border p-0">
                {team.characters.map((ch, idx) => {
                  const overrideKey = `${team.name}-${idx}`;
                  const selectedId = overrideMap[overrideKey] || ch.id;
                  const character = allCharacters.find((c) => c.id === selectedId);
                  if (!character) return null;

                  const selectedAlt =
                    selectedId === ch.id ? null : ch.alternatives?.find((a) => a.id === selectedId);
                  const isEuphoria = selectedAlt ? selectedAlt.euphoria : ch.euphoria;
                  const role = selectedAlt?.role || ch.role;

                  return (
                    <div key={overrideKey} className="flex w-[72px] flex-col items-center">
                      <Link href={`/character_setting/${character.id}`}>
                        <div
                          className={`relative w-[72px] cursor-pointer rounded border object-contain ${
                            ch.isMain ? "border-2 border-red-500" : "border-gray-400"
                          }`}
                        >
                          <Image
                            src={`/characters/${character.rarity}stars/${character.engName}.webp`}
                            alt={character.name}
                            width={72}
                            height={72}
                            className="rounded object-contain"
                          />
                          <Image
                            src={`/infos/effects/${character.rarity}stars.webp`}
                            alt={`${character.rarity}성`}
                            width={72}
                            height={16}
                            className="absolute bottom-0 left-0 z-10"
                          />
                          <Image
                            src={`/infos/inspiration/${character.inspiration}.webp`}
                            alt={character.inspiration}
                            width={12}
                            height={12}
                            className="absolute right-1 top-0 z-10"
                          />
                          <div className="absolute bottom-1 right-1 z-10 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white">
                            v{getDisplayVersion(character.version)}
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
                      </Link>
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
                                    src={`/characters/${altChar.rarity}stars_small/${altChar.engName}.webp`}
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
                <h2 className="text-lg font-semibold">{team.name}</h2>
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

      {/* Toast 알림 */}
      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />

      <Dialog open={showIntroDialog} onOpenChange={setShowIntroDialog}>
        <DialogContent className="max-h-[90vh] w-[90vw] max-w-xl overflow-y-auto sm:max-w-2xl lg:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-center font-bold">추천 조합 사용법</DialogTitle>
            <DialogDescription asChild className="text-left">
              <div className="text-sm text-muted-foreground">
                <p className="text-sm">리버스에 존재하는 추천 조합 정보를 보여주는 페이지입니다.</p>
                <p className="mb-3 text-sm">설명을 읽고 즐거운 리버스 생활되시길 바랍니다.</p>
                <Image
                  src="/infos/modal_img/recommend_team_guide.webp"
                  alt="추천 조합"
                  width={800}
                  height={400}
                  className="h-auto w-full rounded"
                />
                <br />

                <ul className="list-disc pl-5 text-sm">
                  <li className="font-bold text-red-500">1번 설명</li>
                  <ul className="list-disc pb-3 pl-5">
                    <li>해당 조합의 범용적으로 사용되는 이름이 있습니다. (ex. 계시덱)</li>
                    <li>
                      해당 조합의 컨셉에 맞는 키워드가 있고, 해당 키워드는 필터링해서 모아볼 수
                      있습니다. (ex. 즉흥주문, 술식)
                    </li>
                    <li>해당 조합의 전반적인 설명과, 특징, 한계점 등을 확인 할 수 있습니다.</li>
                  </ul>
                  <li className="font-bold text-red-500">2번 설명</li>
                  <ul className="list-disc pb-3 pl-5">
                    <li>해당 조합에서 사용되는 주요 캐릭터들을 확인 할 수 있습니다.</li>
                    <li>
                      각 캐릭터는 어떤 역할을 하는지, 어느 버젼에서 나오는지, 광상여부까지 확인
                      가능합니다.
                    </li>
                    <li>
                      빨간색으로 &quot;메인&quot;을 가진 캐릭터는 해당 조합의 필수 캐릭터입니다.
                    </li>
                    <li>
                      각 캐릭터 이름을 확인 할 수 있고, 이름 아래의 &quot;대체 캐릭터&quot;를 누르면
                      해당 캐릭터의 대체 캐릭터를 알 수 있습니다.
                    </li>
                  </ul>
                  <li className="font-bold text-red-500">3번 설명</li>
                  <ul className="list-disc pb-3 pl-5">
                    <li>
                      대체 캐릭터 목록에서, 대체 캐릭터를 선택하면, 해당 캐릭터를 사용한 조합으로
                      이미지가 바뀝니다.
                    </li>
                    <li>자유롭게 대체 캐릭터를 확인하고, 유연하게 조합을 맞춰볼 수 있습니다.</li>
                  </ul>
                  <li className="font-bold text-red-500">주의 사항</li>
                  <ul className="list-disc pb-3 pl-5">
                    <li>
                      현재 한국 버젼 이후의 모든 캐릭터 이름 밑 정보는 번역된 상태입니다. 오역이
                      있을 수 있으니 맹신하지 말아주세요.
                    </li>
                    <li>
                      모든 조합은 100% 정답이 아닙니다. 자주 쓰이는 조합을 소개하는 것뿐이고, 더
                      나은 조합이 있을 수 있습니다. 또한, 조합 추천은 캐릭터 버전에 따라 달라질 수
                      있습니다.
                    </li>
                    <li>
                      주관적인 생각과, 여러 사이트들을 참고로 작성되었습니다. 그렇기에 잘못된 정보가
                      있을 수 있습니다. 출처는 홈페이지에서 확인가능합니다.
                    </li>
                    <li>조합 설명은 편의상 &rsquo;음/슴&rsquo;체를 사용하였습니다.</li>
                    <li>
                      해당 데이터는 직접 수기로 업데이트 하고 있으며, 업데이트가 늦어질 수 있습니다.
                    </li>
                    <li>다양한 조합 및 추가되었으면 하는 기능이 있으면 알려주세요.</li>
                    <li>문의는 홈페이지 제일 아래의 &rsquo;문의&rsquo;버튼을 이용바랍니다.</li>
                  </ul>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
