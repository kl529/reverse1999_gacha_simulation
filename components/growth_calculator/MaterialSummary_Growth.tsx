"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { MaterialRequirement } from "@/lib/types/growthCalculatorTypes";
import { materialList } from "@/data/material";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MaterialSummary_GrowthProps {
  requirements: MaterialRequirement[];
}

export default function MaterialSummary_Growth({ requirements }: MaterialSummary_GrowthProps) {
  const [allMaterialsModalOpen, setAllMaterialsModalOpen] = useState(false);

  // 희귀도별로 재료 그룹화 (부족한 재료만)
  const groupedRequirements = useMemo(() => {
    const grouped: Record<number, MaterialRequirement[]> = {};
    const baseItems: MaterialRequirement[] = [];

    requirements.forEach((req) => {
      // 부족한 재료만 필터링
      if (req.deficit === 0) return;

      const material = materialList.find((m) => m.id === req.materialId);
      if (!material) return;

      // 기본 재료 (골드, 더스트 등)
      if (material.id === 1001 || material.id === 1002) {
        baseItems.push(req);
      } else {
        if (!grouped[material.rarity]) {
          grouped[material.rarity] = [];
        }
        grouped[material.rarity].push(req);
      }
    });

    return { grouped, baseItems };
  }, [requirements]);

  // 전체 재료 그룹화 (모달용)
  const allGroupedRequirements = useMemo(() => {
    const grouped: Record<number, MaterialRequirement[]> = {};
    const baseItems: MaterialRequirement[] = [];

    requirements.forEach((req) => {
      const material = materialList.find((m) => m.id === req.materialId);
      if (!material) return;

      // 기본 재료 (골드, 더스트 등)
      if (material.id === 1001 || material.id === 1002) {
        baseItems.push(req);
      } else {
        if (!grouped[material.rarity]) {
          grouped[material.rarity] = [];
        }
        grouped[material.rarity].push(req);
      }
    });

    return { grouped, baseItems };
  }, [requirements]);

  const getRarityGradient = (rarity: number): string => {
    const gradients: Record<number, string> = {
      6: "bg-gradient-to-br from-[#D78324]/20 to-[#D78324]/40",
      5: "bg-gradient-to-br from-[#EED483]/20 to-[#EED483]/40",
      4: "bg-gradient-to-br from-[#825D8C]/20 to-[#825D8C]/40",
      3: "bg-gradient-to-br from-[#5C6487]/20 to-[#5C6487]/40",
      2: "bg-gradient-to-br from-[#4F6E48]/20 to-[#4F6E48]/40",
    };
    return gradients[rarity] || "bg-gradient-to-br from-gray-400/20 to-gray-500/20";
  };

  const renderMaterialItem = (req: MaterialRequirement) => {
    const material = materialList.find((m) => m.id === req.materialId);
    if (!material) return null;

    const hasDeficit = req.deficit > 0;

    return (
      <div key={req.materialId} className="group relative flex items-center gap-1">
        <div className="relative flex flex-col items-center transition-transform duration-200 ease-in-out group-hover:scale-110">
          <div
            className={`rounded-lg p-1 ${
              hasDeficit
                ? "ring-2 ring-red-500 dark:ring-red-400"
                : "ring-2 ring-green-500 dark:ring-green-400"
            } ${getRarityGradient(material.rarity)}`}
          >
            <Image
              src={`/infos/materials/${req.materialId}.webp`}
              alt={material.name}
              width={40}
              height={40}
              className="rounded sm:h-12 sm:w-12"
            />
          </div>

          {/* 필요 수량 */}
          <div className="mt-1 text-center">
            <div
              className={`text-xs sm:text-sm font-bold ${
                hasDeficit ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
              }`}
            >
              {req.required.toLocaleString()}
            </div>
            {/* 보유 수량 */}
            <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
              보유: {req.owned.toLocaleString()}
            </div>
            {/* 부족 수량 - 항상 공간 차지 */}
            <div className="text-[10px] sm:text-xs text-red-600 dark:text-red-400 font-medium min-h-[14px] sm:min-h-[16px]">
              {hasDeficit && `부족: ${req.deficit.toLocaleString()}`}
            </div>
          </div>

          {/* 툴팁 */}
          <div className="absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-3 py-1.5 text-sm font-medium text-white group-hover:block">
            <div>{material.name}</div>
            <div className="text-xs text-gray-300">
              필요: {req.required.toLocaleString()} / 보유: {req.owned.toLocaleString()}
            </div>
            {hasDeficit && (
              <div className="text-xs text-red-300">부족: {req.deficit.toLocaleString()}</div>
            )}
            {material.farmingStage && (
              <div className="text-xs text-blue-300 mt-1">파밍: {material.farmingStage}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (requirements.length === 0) {
    return (
      <div className="rounded-lg border bg-gray-50 dark:bg-gray-800/50 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          활성화된 캐릭터 계획이 없습니다. 캐릭터를 추가하고 육성 계획을 세워보세요!
        </p>
      </div>
    );
  }

  const hasDeficitMaterials =
    groupedRequirements.baseItems.length > 0 ||
    Object.keys(groupedRequirements.grouped).length > 0;

  return (
    <>
      <div className="rounded-lg border bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-center text-xl font-bold flex-1">부족한 재료</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAllMaterialsModalOpen(true)}
          >
            전체 재료
          </Button>
        </div>

        {!hasDeficitMaterials ? (
          <div className="rounded-lg border bg-white dark:bg-gray-800 p-8 text-center">
            <p className="text-green-600 dark:text-green-400 font-medium">
              모든 재료가 충분합니다! 🎉
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {/* 기본 재료 (골드, 더스트 등) */}
              {groupedRequirements.baseItems.length > 0 && (
                <div className="rounded-lg bg-white dark:bg-gray-800 p-4 pb-2 shadow-sm">
                  <div className="flex flex-wrap gap-1 sm:gap-3">
                    {groupedRequirements.baseItems.map((req) => renderMaterialItem(req))}
                  </div>
                </div>
              )}

              {/* 희귀도별 재료 (6→5→4→3→2) */}
              {Object.entries(groupedRequirements.grouped)
                .sort(([rarityA], [rarityB]) => Number(rarityB) - Number(rarityA))
                .map(([rarity, items]) => (
                  <div key={rarity} className="rounded-lg bg-white dark:bg-gray-800 p-4 pb-2 shadow-sm">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      {rarity}성 재료
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-3">
                      {items.map((req) => renderMaterialItem(req))}
                    </div>
                  </div>
                ))}
            </div>

            {/* 요약 정보 */}
            <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-red-500" />
                <span>부족한 재료</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 전체 재료 모달 */}
      <Dialog open={allMaterialsModalOpen} onOpenChange={setAllMaterialsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">전체 재료 목록</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-2">
            {/* 기본 재료 (골드, 더스트 등) */}
            {allGroupedRequirements.baseItems.length > 0 && (
              <div className="rounded-lg bg-white dark:bg-gray-800 p-4 pb-2 shadow-sm">
                <div className="flex flex-wrap gap-1 sm:gap-3">
                  {allGroupedRequirements.baseItems.map((req) => renderMaterialItem(req))}
                </div>
              </div>
            )}

            {/* 희귀도별 재료 (6→5→4→3→2) */}
            {Object.entries(allGroupedRequirements.grouped)
              .sort(([rarityA], [rarityB]) => Number(rarityB) - Number(rarityA))
              .map(([rarity, items]) => (
                <div key={rarity} className="rounded-lg bg-white dark:bg-gray-800 p-4 pb-2 shadow-sm">
                  <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    {rarity}성 재료
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-3">
                    {items.map((req) => renderMaterialItem(req))}
                  </div>
                </div>
              ))}

            {/* 요약 정보 */}
            <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-red-500" />
                <span>부족한 재료</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-green-500" />
                <span>충분한 재료</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
