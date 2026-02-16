// 전체 코드

"use client";

import Image from "next/image";
import { Character } from "@/data/characters";
import { character_setting_data } from "@/data/character_setting_data";
import { psycube_list } from "@/data/psycube_data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast, Toaster } from "react-hot-toast";
import { useState, useMemo } from "react";
import { RESONANCE_PATTERN } from "@/data/resonance_pattern";
import { useRouter } from "next/navigation";
import { getDisplayVersion } from "@/data/version";
import { characterSkin } from "@/data/character_skin";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getSkinIllustUrl } from "@/lib/cdn";

export default function CharacterSettingDetail({ character }: { character: Character }) {
  const setting = character_setting_data.find((c) => c.character_id === character.id);
  const router = useRouter();

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

  const characterSkins = useMemo(() => {
    return characterSkin.filter((skin) => skin.character_id === character.id);
  }, [character.id]);

  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-4xl space-y-8 px-4 pb-0">
        {setting?.resonance && setting.resonance.length > 0 && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
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
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-center text-xl font-bold">공명 변조</h2>
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

        {psycubeItems.length > 0 && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-2 text-center text-xl font-bold">의지 추천</h2>
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
        )}

        {characterSkins.length > 0 && (
          <div className="space-y-4 rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-center text-xl font-bold">스킨 정보</h2>
            <div
              className={cn(
                "grid gap-8",
                characterSkins.length === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
              )}
            >
              {characterSkins.map((skin) => (
                <Link
                  key={skin.id}
                  href={`/skin/${skin.id}`}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="group relative aspect-[3/4] w-full max-w-md cursor-pointer overflow-hidden rounded-lg transition-all hover:shadow-xl">
                    <Image
                      src={getSkinIllustUrl(`${skin.engName}.webp`)}
                      alt={skin.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {/* 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                    {/* 텍스트 정보 */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="mb-3 text-xl font-bold">{skin.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                          {skin.rarity}
                        </span>
                        <span className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                          {skin.source}
                        </span>
                        {skin.version && (
                          <span className="rounded-full bg-blue-500/80 px-3 py-1 text-sm backdrop-blur-sm">
                            v{skin.version}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-center text-xl font-semibold">{skin.name}</span>
                </Link>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              이미지 클릭 시 스킨 상세 페이지로 이동
            </p>
          </div>
        )}
      </div>

      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
    </div>
  );
}
