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
    <div className="max-w-5xl mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6 mt-8 text-black dark:text-white">청사진 모음</h1>

      {/* 보스 선택 */}
      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        {BOSSES.map((boss) => (
          <button
            key={boss.id}
            onClick={() => {
              setSelectedBoss(boss.id);
              const firstFilter = FILTERS[boss.id]?.[0];
              setSelectedFilter(firstFilter);
            }}
            className={`border-2 rounded p-1 transition hover:scale-105 ${
              selectedBoss === boss.id ? "border-blue-500" : "border-transparent"
            }`}
          >
            <div className="relative">
              <Image src={boss.image} alt={boss.name} width={80} height={80} />
              <div className="absolute top-0 right-0 w-4 h-4">
                <Image
                  src={`/infos/inspiration/${boss.inspiration}.png`}
                  alt={`${boss.inspiration} 아이콘`}
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <p className="text-center text-sm mt-1 text-black dark:text-white">{boss.name}</p>
          </button>
        ))}
      </div>

      {/* 필터 선택 */}
      {selectedBoss && (
        <div className="flex overflow-x-auto gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1 rounded-full border whitespace-nowrap ${
                selectedFilter === f
                  ? "bg-blue-500 text-black dark:text-white"
                  : "bg-gray-200 text-black dark:bg-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* 이미지 리스트 */}
      <div className="flex flex-col items-center gap-6">
        {images.length > 0 ? (
          images.map((img, i) => (
            <Image
              key={img + i}
              src={img}
              alt={`청사진 ${i + 1}`}
              width={700}
              height={350}
              className="rounded-lg border border-gray-300 dark:border-gray-600 shadow w-full max-w-[95vw] sm:max-w-[600px] lg:max-w-[1080px]"
            />
          ))
        ) : (
          selectedBoss && (
            <p className="text-gray-500 dark:text-gray-400 mt-8">
              해당 조건에 맞는 청사진이 없습니다.
            </p>
          )
        )}
      </div>
    </div>
  );
}