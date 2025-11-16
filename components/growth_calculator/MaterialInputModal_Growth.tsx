"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { materialList } from "@/data/material";
import { UserMaterials } from "@/lib/types/growthCalculatorTypes";

interface MaterialInputModal_GrowthProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMaterials: UserMaterials;
  onSave: (materials: UserMaterials) => void;
}

export default function MaterialInputModal_Growth({
  open,
  onOpenChange,
  initialMaterials,
  onSave,
}: MaterialInputModal_GrowthProps) {
  const [materials, setMaterials] = useState<UserMaterials>(initialMaterials);

  // initialMaterials가 변경되면 동기화
  useEffect(() => {
    setMaterials(initialMaterials);
  }, [initialMaterials]);

  const handleInputChange = (materialId: number, value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue < 0 || numValue > 999999) return;

    setMaterials((prev) => ({
      ...prev,
      [materialId]: numValue,
    }));
  };

  const handleSave = () => {
    // 0인 재료는 제거하여 저장
    const cleanedMaterials: UserMaterials = {};
    Object.entries(materials).forEach(([id, count]) => {
      if (count > 0) {
        cleanedMaterials[Number(id)] = count;
      }
    });

    onSave(cleanedMaterials);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setMaterials(initialMaterials);
    onOpenChange(false);
  };

  // showInInput flag가 있는 재료만 필터링하여 정렬
  const sortedMaterials = materialList
    .filter((material) => material.showInInput)
    .sort((a, b) => {
      // 카테고리 그룹 정의
      const getCategoryGroup = (category: string) => {
        if (category === "resonance_material") return 2;
        if (category === "euphoria_material") return 3;
        if (category === "base_item") return 4;
        return 1; // insight_material, growth_material
      };

      const groupA = getCategoryGroup(a.category);
      const groupB = getCategoryGroup(b.category);

      // 그룹이 다르면 그룹 순서대로
      if (groupA !== groupB) {
        return groupA - groupB;
      }

      // 그룹 1 (insight, growth): 희귀도 우선, 같은 희귀도면 카테고리 순서
      if (groupA === 1) {
        if (a.rarity !== b.rarity) {
          return b.rarity - a.rarity;
        }

        const categoryOrder: Record<string, number> = {
          insight_material: 1,
          growth_material: 2,
        };

        const catOrderA = categoryOrder[a.category] || 999;
        const catOrderB = categoryOrder[b.category] || 999;

        if (catOrderA !== catOrderB) {
          return catOrderA - catOrderB;
        }

        // 같은 카테고리 내에서 sortOrder가 있으면 그것을 우선 사용
        if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
          return a.sortOrder - b.sortOrder;
        }
        if (a.sortOrder !== undefined) return -1;
        if (b.sortOrder !== undefined) return 1;

        // sortOrder가 없으면 id 순서대로
        return a.id - b.id;
      }

      // 그룹 2, 3 (resonance, euphoria): 희귀도만으로 정렬
      if (groupA === 2 || groupA === 3) {
        return b.rarity - a.rarity;
      }

      // 그룹 4 (base_item): id 순서대로
      return a.id - b.id;
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[92vw] max-w-4xl overflow-y-auto p-3 sm:w-full sm:p-4">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl sm:text-2xl">보유 재료 입력</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            보유하고 있는 재료의 수량을 입력하세요. 0은 자동으로 제거됩니다.
          </DialogDescription>
        </DialogHeader>

        <div className="py-1">
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11 xl:grid-cols-12 gap-x-1 gap-y-2">
            {sortedMaterials.map((material) => {
              const count = materials[material.id] || 0;
              return (
                <div
                  key={material.id}
                  className="group relative flex flex-col items-center gap-0.5 px-0 py-0.5"
                >
                  {/* 호버 툴팁 */}
                  <div className="absolute -top-8 left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
                    {material.name}
                  </div>

                  <div className="relative h-14 w-14 overflow-hidden rounded bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    <Image
                      src={`/infos/materials/${material.id}.webp`}
                      alt={material.name}
                      fill
                      className="object-contain p-1"
                    />
                    {/* 성급 효과 오버레이 - 투명도 조정 */}
                    <Image
                      src={`/infos/effects/${material.rarity}stars.webp`}
                      alt={`${material.rarity}성`}
                      fill
                      className="pointer-events-none z-10 object-cover opacity-60"
                    />
                  </div>
                  <Input
                    type="number"
                    min="0"
                    max="999999"
                    value={count}
                    onChange={(e) => handleInputChange(material.id, e.target.value)}
                    className="h-7 w-14 bg-white px-0 text-center text-xs [appearance:textfield] dark:bg-gray-800 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="0"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-2 border-t pt-2">
          <Button variant="outline" onClick={handleCancel} size="sm">
            취소
          </Button>
          <Button onClick={handleSave} size="sm">
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
