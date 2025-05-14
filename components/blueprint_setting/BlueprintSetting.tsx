"use client";

import { useState } from "react";
import Image from "next/image";
import { BOSSES, BossId, FILTERS, BLUEPRINTS } from "@/data/blueprint";

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
      <div className="mb-4 flex flex-wrap justify-center gap-4">
        {BOSSES.map((boss) => (
          <button
            key={boss.id}
            onClick={() => {
              setSelectedBoss(boss.id);
              const firstFilter = FILTERS[boss.id]?.[0];
              setSelectedFilter(firstFilter);
            }}
            className={`rounded border-2 p-1 transition hover:scale-105 ${
              selectedBoss === boss.id ? "border-blue-500" : "border-transparent"
            }`}
          >
            <div className="relative">
              <Image src={boss.image} alt={boss.name} width={80} height={80} />
              <div className="absolute right-0 top-0 h-4 w-4">
                <Image
                  src={`/infos/inspiration/${boss.inspiration}.png`}
                  alt={`${boss.inspiration} 아이콘`}
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <p className="mt-1 text-center text-sm text-black dark:text-white">{boss.name}</p>
          </button>
        ))}
      </div>

      {/* 필터 선택 */}
      {selectedBoss && (
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`whitespace-nowrap rounded-full border px-3 py-1 ${
                selectedFilter === f
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* 이미지 리스트 */}
      <div className="flex flex-col items-center gap-6">
        {images.length > 0
          ? images.map((img, i) => (
              <Image
                key={img + i}
                src={img}
                alt={`청사진 ${i + 1}`}
                width={700}
                height={350}
                className="w-full max-w-[95vw] rounded-lg border border-gray-300 shadow dark:border-gray-600 sm:max-w-[600px] lg:max-w-[1080px]"
              />
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
