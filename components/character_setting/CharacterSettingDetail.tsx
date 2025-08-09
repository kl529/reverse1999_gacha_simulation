// 전체 코드

"use client";

import Image from "next/image";
import Link from "next/link";
import { Character } from "@/data/characters";
import { character_setting_data } from "@/data/character_setting_data";
import { psycube_list } from "@/data/psycube_data";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast, Toaster } from "react-hot-toast";
import { useState, useMemo } from "react";
import { RESONANCE_PATTERN } from "@/data/resonance_pattern";
import CharacterGrowthCalculator from "@/components/etc/CharacterGrowthCalculator";
import { useRouter } from "next/navigation";
import { resonanceMaterialList } from "@/data/resonance_material";
import { euphoriaMaterialList } from "@/data/euphoria_material";
import { resonancePatternMaterial } from "@/data/resonance_pattern_material";
import { insightMaterial } from "@/data/insight_material";
import { euphoriaList } from "@/data/euphoria";
import { getDisplayVersion } from "@/data/version";

export default function CharacterSettingDetail({ character }: { character: Character }) {
  const setting = character_setting_data.find((c) => c.character_id === character.id);
  const router = useRouter();

  const hasGrowthData = useMemo(() => {
    const hasResonance = resonanceMaterialList.some((c) => c.character_id === character.id);
    const hasEuphoria = euphoriaMaterialList.some((c) => c.character_id === character.id);
    const hasResonancePattern = resonancePatternMaterial.some(
      (c) => c.character_id === character.id
    );
    const hasInsight = insightMaterial.some((c) => c.character_id === character.id);

    return hasResonance || hasEuphoria || hasResonancePattern || hasInsight;
  }, [character.id]);

  const psycubeItems = (setting?.psycubes || []).map((p) => {
    const psycube = psycube_list.find((d) => d.id === p.psycube_id);
    return {
      id: psycube?.id,
      src: `/infos/psycube_img/${psycube?.engName}.webp`,
      label: psycube?.name || "",
      description: p.description,
      type: psycube?.type,
      version: psycube?.version,
    };
  });

  const getSortedCharList = (rarity: number) =>
    SETTING_CHARACTERS.filter((c) => c.rarity === rarity).sort((a, b) => b.id - a.id);

  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
        <h1 className="text-center text-2xl font-bold sm:text-3xl">{character.name}</h1>

        <div className="flex flex-wrap justify-center gap-6">
          {/* 캐릭터 초상화 + 정보 */}
          <div className="relative h-[150px] w-[150px] overflow-hidden rounded border dark:border-gray-700">
            <Image
              src={`/characters/${character.rarity}stars/${character.engName}.webp`}
              alt={character.name}
              width={150}
              height={150}
              className="h-full w-full object-cover object-top"
              priority
            />
            {/* 영감 아이콘 */}
            <Image
              src={`/infos/inspiration/${character.inspiration}.webp`}
              alt={character.inspiration}
              width={16}
              height={16}
              className="absolute left-1 top-0 z-10"
            />
            {/* 버전 뱃지 */}
            <div className="absolute bottom-1 right-1 z-10 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white">
              {getDisplayVersion(character.version)}
            </div>
            {/* 광상 여부 */}
            {euphoriaList.some((e) => e.character_id === character.id) && (
              <div className="absolute bottom-1 left-1 z-10 rounded-sm bg-rose-600 px-1 py-[1px] text-[10px] text-white shadow">
                광상
              </div>
            )}
          </div>
          {/* 캐릭터 가이드로 바로가기 버튼 */}
          <Link
            href={`/character/${character.id}`}
            className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-2"
          >
            <div className="overflow-hidden rounded border transition-opacity hover:opacity-80 dark:border-gray-700">
              <Image
                src="/infos/menu/gacha_simulator_menu.webp"
                alt="캐릭터 가이드 바로가기"
                width={150}
                height={150}
                className="object-cover object-top"
              />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">캐릭터 가이드로 이동</span>
          </Link>
        </div>

        {setting?.resonance && setting.resonance.length > 0 && (
          <div>
            <div className="mb-2 flex items-center justify-center gap-2">
              <h2 className="text-xl font-bold">공명 추천</h2>
              <Button
                variant="outline"
                size="sm"
                className="h-6 bg-green-600 px-2 text-xs text-white hover:bg-green-400"
                onClick={() => setShowDialog(true)}
              >
                설명서
              </Button>
            </div>
            <p className="mb-4 text-center text-xs text-gray-500 dark:text-gray-400">
              공명 정보는 100% 정답이 아니며, 플레이 스타일에 따라 다를 수 있습니다.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {setting.resonance.map((r, idx) => {
                const handleCopy = () => {
                  navigator.clipboard.writeText(r.code);
                  toast.success("복사 완료!");
                };

                return (
                  <Card key={idx} className="relative text-center">
                    <CardContent className="p-4">
                      {idx === 0 && (
                        <Badge className="absolute right-2 top-2 bg-green-600 text-white">
                          추천
                        </Badge>
                      )}
                      <Image
                        src={`/infos/resonance/${r.code}.webp`}
                        alt={r.code}
                        width={200}
                        height={200}
                        className="mx-auto mb-2 rounded"
                      />
                      <div className="mb-1 flex items-center justify-center gap-2 text-sm text-gray-400">
                        <span
                          onClick={handleCopy}
                          className="cursor-pointer transition hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {r.code}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCopy}
                          className="h-5 w-5 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {r.description}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 설명서 모달 */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>공명 코드 사용 방법</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                  <p>공명 코드를 사용하면, 더 빠르게 공명을 세팅할 수 있습니다.</p>
                  <div className="flex flex-col items-center gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <Image
                        key={i}
                        src={`/infos/resonance_img/guide${i}.webp`}
                        alt={`예시 ${i}`}
                        width={300}
                        height={200}
                        className="w-full rounded border dark:border-gray-600"
                        unoptimized
                      />
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {setting?.resonance_patterns && setting.resonance_patterns.length > 0 && (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {setting.resonance_patterns.map((pattern, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="relative bg-gray-500">
                    <Image
                      src={`/infos/resonance_pattern/${character.resonanceType}_${pattern}.webp`}
                      alt={pattern}
                      width={200}
                      height={200}
                      className="rounded border dark:border-gray-700"
                    />
                    <div className="absolute bottom-1 right-1 rounded-sm bg-red-600 px-1 text-[10px] text-white">
                      {idx + 1}순위
                    </div>
                  </div>
                  <span className="mt-2 text-base font-semibold text-gray-700 dark:text-gray-300">
                    {RESONANCE_PATTERN[character.resonanceType][pattern] || pattern}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="mb-2 mt-6 text-center text-xl font-bold">의지 추천</h2>
          <p className="mb-4 text-center text-xs text-gray-500 dark:text-gray-400">
            의지는 추천순이며, 순위도 100% 정답이 아닐 수도 있습니다.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {psycubeItems.map((item, idx) => (
              <Card
                key={idx}
                className="cursor-pointer text-center transition-shadow hover:shadow-lg"
                onClick={() => router.push(`/psycube_guide/${item.id}`)}
              >
                <CardContent className="space-y-1 p-2">
                  <div className="relative mx-auto h-[100px] w-[100px]">
                    <Image
                      src={item.src}
                      alt={item.label}
                      className="rounded border object-cover dark:border-gray-700"
                      width={100}
                      height={100}
                    />
                    <div className="absolute left-1 top-1 rounded-sm bg-red-600 px-1 text-[10px] text-white">
                      {idx} 순위
                    </div>
                    <div className="absolute bottom-1 left-1 rounded-sm bg-purple-600 px-1 text-[10px] text-white">
                      {item.type}
                    </div>
                    <div className="absolute bottom-1 right-1 rounded-sm bg-blue-600 px-1 text-[10px] text-white">
                      {item.version && getDisplayVersion(item.version)}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{item.label}</div>
                  <p className="px-1 text-xs text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {hasGrowthData && <CharacterGrowthCalculator characterId={character.id} />}

        <div className="space-y-6">
          {[6, 5].map((rarity) => (
            <div key={rarity}>
              <h3 className="text-center text-[15px] font-semibold">
                {rarity === 6 ? "🌟 6성" : "⭐ 5성"}
              </h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-[repeat(auto-fit,minmax(88px,1fr))] gap-3">
                {getSortedCharList(rarity).map((ch) => (
                  <Link key={ch.id} href={`/character_setting/${ch.id}`}>
                    <div className="flex flex-col items-center rounded p-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                      <div className="relative h-16 w-16">
                        <Image
                          src={`/characters/${ch.rarity}stars_small/${ch.engName}.webp`}
                          alt={ch.name}
                          fill
                          sizes="64px"
                          className="rounded object-contain"
                          priority
                        />
                        {ch.version && (
                          <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white shadow">
                            {getDisplayVersion(ch.version)}
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
          ))}
        </div>
      </div>

      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
    </div>
  );
}
