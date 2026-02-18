// RecommendTeamPage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { psycube_list } from "@/data/psycube_data";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import { useTranslations } from "next-intl";

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
  const router = useRouter();
  const t = useTranslations("recommendTeam");
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
    const hasSeen = storage.get<boolean>(STORAGE_KEYS.SEEN_RECOMMEND_INTRO);
    if (!hasSeen) {
      setShowIntroDialog(true);
    }
  }, []);

  // 다이얼로그를 닫을 때 로컬 스토리지에 저장
  const handleCloseIntroDialog = (open: boolean) => {
    setShowIntroDialog(open);
    if (!open) {
      storage.set(STORAGE_KEYS.SEEN_RECOMMEND_INTRO, true);
    }
  };

  // Toast 표시 함수
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  // 서버 필터 변경 핸들러
  const handleServerFilterChange = (newFilter: "kr" | "cn") => {
    setServerFilter(newFilter);
    const message =
      newFilter === "kr" ? t("krFilterApplied") : t("cnFilterApplied");
    showToastMessage(message);
  };

  // 캐릭터 필터 변경 핸들러
  const handleCharacterFilterChange = (characterId: number | null) => {
    setSelectedCharacterId(characterId);
    if (characterId) {
      const character = allCharacters.find((c) => c.id === characterId);
      showToastMessage(t("charFilterApplied", { name: character?.name || t("charFilterDefault") }));
    } else {
      showToastMessage(t("charFilterRemoved"));
    }
  };

  // 컨셉 필터 변경 핸들러
  const handleConceptFilterChange = (concept: string | null) => {
    setSelectedConcept(concept);
    if (concept) {
      showToastMessage(t("conceptFilterApplied", { concept }));
    } else {
      showToastMessage(t("conceptFilterRemoved"));
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
      <h1 className="my-8 text-center text-3xl font-bold">{t("title")}</h1>

      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        {/* 서버 필터 */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border">
            <button
              onClick={() => handleServerFilterChange("cn")}
              className={`px-3 py-1 text-sm transition ${
                serverFilter === "cn"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {t("cnServer")}
            </button>
            <button
              onClick={() => handleServerFilterChange("kr")}
              className={`px-3 py-1 text-sm transition ${
                serverFilter === "kr"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {t("krServer")}
            </button>
          </div>
        </div>

        <Button onClick={() => setShowCharacterFilter(!showCharacterFilter)}>
          {t("charFilter")}
        </Button>
        <Button onClick={() => setShowConceptFilter(!showConceptFilter)}>
          {t("conceptFilter")}
        </Button>
        <Button onClick={() => setShowIntroDialog(true)}>{t("manual")}</Button>
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
                className={`flex flex-col items-center rounded border p-1 transition ${
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

      <div
        className="grid gap-4 pb-8"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}
      >
        {filteredTeams.map((team) => (
          <Card key={team.name} className="p-4">
            <CardContent className="flex flex-col gap-4 p-0">
              <div className="flex justify-center gap-2 rounded-sm border p-2">
                {team.characters.map((ch, idx) => {
                  const overrideKey = `${team.name}-${idx}`;
                  const selectedId = overrideMap[overrideKey] || ch.id;
                  const character = allCharacters.find((c) => c.id === selectedId);
                  if (!character) return null;

                  const selectedAlt =
                    selectedId === ch.id ? null : ch.alternatives?.find((a) => a.id === selectedId);
                  const isEuphoria = selectedAlt ? selectedAlt.euphoria : ch.euphoria;
                  const role = selectedAlt?.role || ch.role;
                  const psycubeId = selectedAlt?.psycubeId ?? ch.psycubeId;
                  const psycube = psycubeId
                    ? psycube_list.find((p) => p.id === psycubeId)
                    : undefined;

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
                            alt={`${character.rarity}${t("star")}`}
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
                              {t("euphoria")}
                            </div>
                          )}
                          {ch.isMain && (
                            <div className="absolute left-1 top-1 z-10 rounded-sm bg-red-600 px-1 py-[1px] text-[10px] text-white">
                              {t("main")}
                            </div>
                          )}
                          {role && (
                            <div className="absolute bottom-1 left-1 z-10 rounded-sm bg-green-600 px-1 py-[1px] text-[10px] text-white">
                              {role}
                            </div>
                          )}
                          {/* TODO: 의지 UI 임시 숨김 - 추후 복원 예정
                          {psycube && (
                            <div
                              title={psycube.name}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                router.push(`/psycube_guide/${psycube.id}`);
                              }}
                              className="absolute bottom-[38px] left-1/2 z-20 h-[48px] w-[48px] -translate-x-1/2 cursor-pointer overflow-hidden rounded-full bg-black/60 p-[3px] transition hover:scale-110 hover:bg-black/75"
                            >
                              <Image
                                src={`/infos/psycube_img/${psycube.engName}.webp`}
                                alt={psycube.name}
                                width={42}
                                height={42}
                                className="h-full w-full rounded-full object-cover"
                              />
                            </div>
                          )}
                          */}
                        </div>
                      </Link>
                      <span className="mt-1 w-full truncate text-center text-xs">
                        {character.name}
                      </span>

                      {ch.alternatives && ch.alternatives.length > 0 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-xs text-blue-600 underline">
                            {t("altCharacter")}
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
              <div>
                <h2 className="text-center text-lg font-semibold">{team.name}</h2>
                <div className="mb-2 mt-1 flex flex-wrap justify-center gap-1">
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

      <Dialog open={showIntroDialog} onOpenChange={handleCloseIntroDialog}>
        <DialogContent className="max-h-[90vh] w-[90vw] max-w-xl overflow-y-auto sm:max-w-2xl lg:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-center font-bold">{t("manualTitle")}</DialogTitle>
            <DialogDescription asChild className="text-left">
              <div className="text-sm text-muted-foreground">
                <p className="text-sm">{t("manualDesc")}</p>
                <p className="mb-3 text-sm">{t("manualDesc2")}</p>
                <Image
                  src="/infos/modal_img/recommend_team_guide.webp"
                  alt={t("manualAlt")}
                  width={800}
                  height={400}
                  className="h-auto w-full rounded"
                />
                <br />

                <ul className="list-disc pl-5 text-sm">
                  <li className="font-bold text-red-500">{t("section1Title")}</li>
                  <ul className="list-disc pb-3 pl-5">
                    <li>{t("section1Desc1")}</li>
                    <li>{t("section1Desc2")}</li>
                    <li>{t("section1Desc3")}</li>
                  </ul>
                  <li className="font-bold text-red-500">{t("section2Title")}</li>
                  <ul className="list-disc pb-3 pl-5">
                    <li>{t("section2Desc1")}</li>
                    <li>{t("section2Desc2")}</li>
                    <li>{t("section2Desc3")}</li>
                    <li>{t("section2Desc4")}</li>
                  </ul>
                  <li className="font-bold text-red-500">{t("section3Title")}</li>
                  <ul className="list-disc pb-3 pl-5">
                    <li>{t("section3Desc1")}</li>
                    <li>{t("section3Desc2")}</li>
                  </ul>
                  <li className="font-bold text-red-500">{t("cautionTitle")}</li>
                  <ul className="list-disc pb-3 pl-5">
                    <li>{t("caution1")}</li>
                    <li>{t("caution2")}</li>
                    <li>{t("caution3")}</li>
                    <li>{t("caution4")}</li>
                    <li>{t("caution5")}</li>
                    <li>{t("caution6")}</li>
                    <li>{t("caution7")}</li>
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
