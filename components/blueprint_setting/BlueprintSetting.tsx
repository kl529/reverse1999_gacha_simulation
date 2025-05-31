"use client";

import { useState } from "react";
import Image from "next/image";
import { BOSSES, BossId, FILTERS, BLUEPRINTS } from "@/data/blueprint";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlueprintSetting() {
  const [selectedBoss, setSelectedBoss] = useState<BossId | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  const filters = selectedBoss ? FILTERS[selectedBoss] : [];
  const images =
    selectedBoss && BLUEPRINTS[selectedBoss]?.[selectedFilter]
      ? BLUEPRINTS[selectedBoss][selectedFilter]
      : [];

  return (
    <div className="mx-auto min-h-screen max-w-5xl p-4 dark:bg-gray-900 dark:text-white">
      <h1 className="mb-6 mt-8 text-center text-2xl font-bold text-black dark:text-white lg:text-3xl">
        청사진 모음
      </h1>

      {/* 보스 선택 */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {BOSSES.map((boss) => (
          <Button
            key={boss.id}
            variant="outline"
            onClick={() => {
              setSelectedBoss(boss.id);
              const firstFilter = FILTERS[boss.id]?.[0];
              setSelectedFilter(firstFilter);
            }}
            className={`flex h-auto w-fit flex-col items-center p-2 transition hover:scale-105 ${
              selectedBoss === boss.id ? "border-blue-500" : "border-transparent"
            }`}
          >
            <div className="relative h-[80px] w-[80px]">
              <Image
                src={boss.image}
                alt={boss.name}
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
              <div className="absolute right-0 top-0 h-4 w-4">
                <Image
                  src={`/infos/inspiration/${boss.inspiration}.webp`}
                  alt={`${boss.inspiration} 아이콘`}
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <p className="mt-1 text-center text-sm text-black dark:text-white">{boss.name}</p>
          </Button>
        ))}
      </div>

      {/* 필터 선택 */}
      {selectedBoss && (
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <Button
              key={f}
              variant={selectedFilter === f ? "default" : "outline"}
              onClick={() => setSelectedFilter(f)}
              className="whitespace-nowrap"
            >
              {f}
            </Button>
          ))}
        </div>
      )}

      {/* 이미지 리스트 */}
      <div className="flex flex-col items-center gap-6">
        {images.length > 0
          ? images.map((img, i) => (
              <Card
                key={img + i}
                className="w-full max-w-[95vw] sm:max-w-[600px] lg:max-w-[1080px]"
              >
                <CardContent className="w-full p-0">
                  <Image
                    src={img}
                    alt={`청사진 ${i + 1}`}
                    width={700}
                    height={350}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </CardContent>
              </Card>
            ))
          : selectedBoss && (
              <p className="mt-8 text-gray-500 dark:text-gray-400">
                해당 조건에 맞는 청사진이 없습니다.
              </p>
            )}
      </div>
    </div>
  );
}
