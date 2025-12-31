"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { reveriesInTheRain } from "@/data/reveries_in_the_rain";
import { charactersByRarity } from "@/data/characters";
import { psycube_list } from "@/data/psycube_data";
import Link from "next/link";
import { BOSSES } from "@/data/blueprint";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { getCharacterUrl } from "@/lib/cdn";

interface ReveriesInTheRainDetailProps {
  floorId: string;
}

export default function ReveriesInTheRainDetail({ floorId }: ReveriesInTheRainDetailProps) {
  const router = useRouter();
  const floorData = reveriesInTheRain[floorId];

  if (!floorData) {
    return <div>층 정보를 찾을 수 없습니다.</div>;
  }

  // 이전/다음 방 ID 찾기
  function compareFloors(a: string, b: string): number {
    // 층수 추출 (예: "100m-1" -> [100, 1], "90m" -> [90, 0])
    const parseFloor = (floor: string) => {
      const match = floor.match(/(\d+)m(?:-(\d+))?/);
      if (!match) return [0, 0];
      return [parseInt(match[1], 10), match[2] ? parseInt(match[2], 10) : 0];
    };

    const [aFloor, aSubFloor] = parseFloor(a);
    const [bFloor, bSubFloor] = parseFloor(b);

    // 먼저 층수로 비교
    if (aFloor !== bFloor) {
      return aFloor - bFloor;
    }
    // 층수가 같으면 서브층수로 비교
    return aSubFloor - bSubFloor;
  }

  const allFloors = Object.keys(reveriesInTheRain).sort(compareFloors);
  const currentIndex = allFloors.indexOf(floorId);
  const prevFloor = currentIndex > 0 ? allFloors[currentIndex - 1] : null;
  const nextFloor = currentIndex < allFloors.length - 1 ? allFloors[currentIndex + 1] : null;

  const handleFloorChange = (value: string) => {
    router.push(`/reveries_in_the_rain/${value}`);
  };

  return (
    <div className="mt-10 flex min-h-screen w-full flex-col items-center bg-white p-4 dark:bg-gray-900 dark:text-gray-200">
      {/* 헤더 섹션 */}
      <div className="mb-8 w-full max-w-4xl">
        <div className="flex flex-col gap-4">
          {/* 제목 */}
          <h1 className="text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
            빗속의 공상 {floorData.id} 공략
          </h1>

          {/* 네비게이션 컨트롤 */}
          <div className="grid grid-cols-1 gap-2">
            <Select value={floorId} onValueChange={handleFloorChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="층수 선택" />
              </SelectTrigger>
              <SelectContent>
                {allFloors.map((floor) => (
                  <SelectItem key={floor} value={floor}>
                    {floor === floorData.id ? (
                      <span className="font-bold">{floor}</span>
                    ) : (
                      `${floor}`
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 네비게이션 버튼들 */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                onClick={() => prevFloor && router.push(`/reveries_in_the_rain/${prevFloor}`)}
                disabled={!prevFloor}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                이전 방
              </Button>
              <Link href="/reveries_in_the_rain">
                <Button variant="outline" className="w-full">
                  <List className="mr-2 h-4 w-4" />
                  목록
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => nextFloor && router.push(`/reveries_in_the_rain/${nextFloor}`)}
                disabled={!nextFloor}
              >
                다음 방
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl space-y-8">
        {/* 적 정보와 스테이지 효과 섹션 */}
        <Card className="border border-gray-300 p-6">
          <h2 className="mb-4 text-2xl font-bold">스테이지 정보</h2>
          <div className="mb-4">
            <h3 className="mb-2 text-xl font-semibold">스테이지 효과</h3>
            {floorData.wholeEffect && floorData.wholeEffect.length > 0 && (
              <div className="space-y-0 whitespace-pre-line text-base">
                {floorData.wholeEffect.map((effect, index) => (
                  <p key={index}>
                    <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                      [전체]
                    </span>{" "}
                    {effect}
                  </p>
                ))}
              </div>
            )}
            {floorData.enemyEffect && floorData.enemyEffect.length > 0 && (
              <div className="space-y-0 whitespace-pre-line text-base">
                {floorData.enemyEffect.map((effect, index) => (
                  <p key={index}>
                    <span className="font-semibold text-red-600 dark:text-red-400">[적군]</span>{" "}
                    {effect}
                  </p>
                ))}
              </div>
            )}
            {floorData.teamEffect && floorData.teamEffect.length > 0 && (
              <div className="space-y-0 whitespace-pre-line text-base">
                {floorData.teamEffect.map((effect, index) => (
                  <p key={index}>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">[아군]</span>{" "}
                    {effect}
                  </p>
                ))}
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <h3 className="mb-4 text-xl font-semibold">적 정보</h3>
          <div className="space-y-6">
            {(() => {
              const enemiesByStage = floorData.enemies.reduce(
                (acc, enemy) => {
                  const stage = enemy.stage || 1;
                  if (!acc[stage]) {
                    acc[stage] = [];
                  }
                  acc[stage].push(enemy);
                  return acc;
                },
                {} as Record<number, typeof floorData.enemies>
              );

              return Object.entries(enemiesByStage)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([stage, enemies]) => (
                  <div key={stage}>
                    <h4 className="mb-3 text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {stage}스테이지
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {enemies.map((enemy) => (
                        <div
                          key={enemy.id}
                          className="flex flex-grow basis-[150px] items-center justify-center"
                        >
                          <div className="flex flex-col items-center gap-1">
                            {enemy.type === "boss" && <span className="h-6">👑</span>}
                            {enemy.type !== "boss" && <span className="h-6" />}
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-semibold">{enemy.name}</h5>
                              {enemy.inspiration && (
                                <Image
                                  src={`/infos/inspiration/${enemy.inspiration}.webp`}
                                  alt={enemy.inspiration}
                                  width={20}
                                  height={20}
                                  className="inline-block"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
            })()}
          </div>
        </Card>

        {/* 공략 방식 */}
        <Card className="border border-gray-300 p-6">
          <h2 className="mb-4 text-2xl font-bold">기믹 정리</h2>
          <div className="space-y-4">
            <p className="text-lg font-medium">{floorData.strategy.overview}</p>
            <ul className="list-inside list-disc space-y-2">
              {floorData.strategy.details.map((detail, index) => (
                <li key={index} className="text-base">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* 추천 조합 */}
        {floorData.recommendedTeams && floorData.recommendedTeams.length > 0 && (
          <Card className="border border-gray-300 p-6">
            <h2 className="mb-4 text-center text-2xl font-bold">추천 조합</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {floorData.recommendedTeams.map((team, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-lg border border-gray-300 bg-muted p-4"
                >
                  <div className="mb-4 w-full overflow-hidden">
                    <div className="grid w-full grid-cols-4 gap-1 md:gap-2">
                      {team.characters.map((char) => {
                        // 모든 등급에서 캐릭터 찾기
                        const character = Object.values(charactersByRarity)
                          .flat()
                          .find((c) => c.id === char.character_id);
                        const psycube = char.psycube_id
                          ? psycube_list.find((p) => p.id === char.psycube_id)
                          : null;

                        return (
                          <div key={char.character_id} className="flex flex-col items-center">
                            <Link
                              href={`/character_setting/${character?.id}`}
                              className="cursor-pointer"
                            >
                              <div className="relative w-[60px] md:w-[84px]">
                                <Image
                                  src={getCharacterUrl(
                                    `${character?.rarity}stars`,
                                    `${character?.engName}.webp`
                                  )}
                                  alt={character?.name ?? "character"}
                                  width={84}
                                  height={84}
                                  className="rounded object-cover"
                                />
                                <Image
                                  src={`/infos/effects/${character?.rarity}stars.webp`}
                                  alt={`${character?.rarity}성`}
                                  width={72}
                                  height={16}
                                  className="absolute bottom-0 left-0 z-10 w-full"
                                />
                                <Image
                                  src={`/infos/inspiration/${character?.inspiration}.webp`}
                                  alt={character?.inspiration ?? ""}
                                  width={12}
                                  height={12}
                                  className="absolute right-1 top-0 z-10"
                                />
                                {char.euphoria && (
                                  <div className="absolute bottom-1 left-1 z-10 rounded-sm bg-purple-600 px-1 py-[1px] text-[8px] text-white md:text-[10px]">
                                    광상
                                  </div>
                                )}
                                <div className="absolute bottom-1 right-1 z-10 rounded-sm bg-blue-600 px-1 py-[1px] text-[8px] text-white md:text-[10px]">
                                  v{character?.version === "2.75" ? "콜라보" : character?.version}
                                </div>
                              </div>
                            </Link>
                            <span className="text-xs font-medium md:text-sm">
                              {character?.name}
                            </span>
                            {psycube && (
                              <Link
                                href={`/psycube_guide/${psycube.id}`}
                                className="cursor-pointer"
                              >
                                <div className="w-[40px] md:w-[60px]">
                                  <Image
                                    src={`/infos/psycube_img/${psycube.engName}.webp`}
                                    alt={psycube.name}
                                    width={60}
                                    height={60}
                                    className="h-auto w-full rounded-lg"
                                  />
                                </div>
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {team.blueprint && (
                    <Link href="/blueprint_setting" className="mb-4 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Image
                          src={`/infos/blueprint/boss/${team.blueprint}.webp`}
                          alt={team.blueprint}
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        <span className="text-sm font-medium">
                          {BOSSES.find((boss) => boss.id === team.blueprint)?.name}
                        </span>
                      </div>
                    </Link>
                  )}
                  <p className="text-center text-base text-black dark:text-gray-200">
                    {team.description}
                  </p>
                  <p className="text-center text-base text-muted-foreground dark:text-gray-400">
                    &ldquo;{team.player_name}&rdquo; 님의 클리어 기록입니다.
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
