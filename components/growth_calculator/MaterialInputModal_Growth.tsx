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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("growthCalc");
  const [materials, setMaterials] = useState<UserMaterials>(initialMaterials);

  useEffect(() => {
    setMaterials(initialMaterials);
  }, [initialMaterials]);

  const handleInputChange = (materialId: number, value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue < 0) return;

    setMaterials((prev) => ({
      ...prev,
      [materialId]: numValue,
    }));
  };

  const handleSave = () => {
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

  const sortedMaterials = materialList
    .filter((material) => material.showInInput)
    .sort((a, b) => {
      const getCategoryGroup = (category: string) => {
        if (category === "resonance_material") return 2;
        if (category === "euphoria_material") return 3;
        if (category === "base_item") return 4;
        return 1;
      };

      const groupA = getCategoryGroup(a.category);
      const groupB = getCategoryGroup(b.category);

      if (groupA !== groupB) {
        return groupA - groupB;
      }

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

        if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
          return a.sortOrder - b.sortOrder;
        }
        if (a.sortOrder !== undefined) return -1;
        if (b.sortOrder !== undefined) return 1;

        return a.id - b.id;
      }

      if (groupA === 2 || groupA === 3) {
        return b.rarity - a.rarity;
      }

      return a.id - b.id;
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[92vw] max-w-4xl overflow-y-auto p-3 sm:w-full sm:p-4">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl sm:text-2xl">{t("materialInputTitle")}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {t("materialInputDesc")}
          </DialogDescription>
        </DialogHeader>

        <div className="py-1">
          <div className="grid grid-cols-5 gap-x-1 gap-y-2 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11 xl:grid-cols-12">
            {sortedMaterials.map((material) => {
              const count = materials[material.id] || 0;
              return (
                <div
                  key={material.id}
                  className="group relative flex flex-col items-center gap-0.5 px-0 py-0.5"
                >
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
                    <Image
                      src={`/infos/effects/${material.rarity}stars.webp`}
                      alt={`${material.rarity}${t("star")}`}
                      fill
                      className="pointer-events-none z-10 object-cover opacity-60"
                    />
                  </div>
                  <Input
                    type="number"
                    min="0"
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
            {t("cancel")}
          </Button>
          <Button onClick={handleSave} size="sm">
            {t("save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
