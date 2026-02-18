"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { MaterialRequirement, UserMaterials } from "@/lib/types/growthCalculatorTypes";
import { groupDeficitsByStage, StageRecommendation } from "@/lib/utils/farmingHelper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface FarmingGuide_GrowthProps {
  requirements: MaterialRequirement[];
  userMaterials: UserMaterials;
  onMaterialClick: (materialId: number) => void;
}

export default function FarmingGuide_Growth({
  requirements,
  userMaterials,
  onMaterialClick,
}: FarmingGuide_GrowthProps) {
  const t = useTranslations("growthCalc");

  const recommendations = useMemo(() => {
    return groupDeficitsByStage(requirements, userMaterials);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirements]);

  const visibleHighPriority = useMemo(() => {
    return recommendations.highPriority.filter((rec) => {
      return !rec.materials.every((material) => {
        const currentDeficit = Math.max(
          0,
          material.required - (userMaterials[material.materialId] || 0)
        );
        return currentDeficit === 0;
      });
    });
  }, [recommendations.highPriority, userMaterials]);

  const visibleLowPriority = useMemo(() => {
    return recommendations.lowPriority.filter((rec) => {
      return !rec.materials.every((material) => {
        const currentDeficit = Math.max(
          0,
          material.required - (userMaterials[material.materialId] || 0)
        );
        return currentDeficit === 0;
      });
    });
  }, [recommendations.lowPriority, userMaterials]);

  const allFarmingComplete = visibleHighPriority.length === 0 && visibleLowPriority.length === 0;

  const [showLowPriority, setShowLowPriority] = useState(false);

  if (recommendations.highPriority.length === 0 && recommendations.lowPriority.length === 0) {
    return (
      <div className="rounded-lg border-2 border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center dark:from-green-950/30 dark:to-emerald-950/30">
        <div className="mb-4 text-6xl">🎉</div>
        <h3 className="mb-2 text-xl font-bold text-green-700 dark:text-green-400">
          {t("allSufficientMsg")}
        </h3>
        <p className="whitespace-pre-line text-sm text-green-600 dark:text-green-500">
          {t("allSufficientDesc")} 💎
        </p>
      </div>
    );
  }

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

  return (
    <div className="space-y-3">
      {allFarmingComplete ? (
        <div className="rounded-lg border-2 border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center dark:from-green-950/30 dark:to-emerald-950/30">
          <div className="mb-4 text-6xl">✨</div>
          <h3 className="mb-2 text-xl font-bold text-green-700 dark:text-green-400">{t("farmingComplete")}</h3>
          <p className="whitespace-pre-line text-sm text-green-600 dark:text-green-500">
            {t("farmingCompleteDesc")} 🎊
          </p>
        </div>
      ) : (
        <>
          {visibleHighPriority.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <span className="text-xl">🎅</span>
                  {t("recommendedStages")}
                </h2>
                <p className="text-xs text-muted-foreground">{t("clickToEdit")}</p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recommendations.highPriority.map((rec) => (
                  <StageRecommendationCard
                    key={rec.stageId}
                    recommendation={rec}
                    getRarityGradient={getRarityGradient}
                    onMaterialClick={onMaterialClick}
                    userMaterials={userMaterials}
                  />
                ))}
              </div>
            </div>
          )}

          {visibleLowPriority.length > 0 && (
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLowPriority(!showLowPriority)}
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">📦</span>
                  <span className="text-sm">
                    {t("lowerMaterialFarming", { count: visibleLowPriority.length })}
                  </span>
                </span>
                {showLowPriority ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {showLowPriority && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {recommendations.lowPriority.map((rec) => (
                    <StageRecommendationCard
                      key={rec.stageId}
                      recommendation={rec}
                      getRarityGradient={getRarityGradient}
                      onMaterialClick={onMaterialClick}
                      userMaterials={userMaterials}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface StageRecommendationCardProps {
  recommendation: StageRecommendation;
  getRarityGradient: (rarity: number) => string;
  onMaterialClick: (materialId: number) => void;
  userMaterials: UserMaterials;
}

function StageRecommendationCard({
  recommendation,
  getRarityGradient,
  onMaterialClick,
  userMaterials,
}: StageRecommendationCardProps) {
  const t = useTranslations("growthCalc");
  const { stageName, category, cost, materials } = recommendation;
  const maxRarity = Math.max(...materials.map((m) => m.rarity));

  const allMaterialsSufficient = materials.every((material) => {
    const currentDeficit = Math.max(
      0,
      material.required - (userMaterials[material.materialId] || 0)
    );
    return currentDeficit === 0;
  });

  if (allMaterialsSufficient) {
    return null;
  }

  return (
    <Card
      className={`border bg-card transition-all duration-200 hover:shadow-md ${
        maxRarity >= 4 ? "border-purple-300 dark:border-purple-700" : ""
      }`}
    >
      <CardHeader className="border-b px-3 pb-2 pt-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base">📍</span>
            <span className="text-sm font-bold text-primary">{stageName}</span>
            <Badge
              variant={category === "Hard" ? "destructive" : "secondary"}
              className="px-1.5 py-0 text-[10px]"
            >
              {category === "Hard" ? t("hard") : t("normal")}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span>⚱</span>
            <span className="font-bold text-primary">{cost}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-1.5 px-3 pb-2 pt-2">
        {materials.map((material) => {
          const currentDeficit = Math.max(
            0,
            material.required - (userMaterials[material.materialId] || 0)
          );

          if (currentDeficit === 0) return null;

          return (
            <button
              key={material.materialId}
              onClick={() => onMaterialClick(material.materialId)}
              className={`flex w-full items-center gap-1.5 rounded p-1.5 transition-all hover:shadow-sm active:scale-[0.98] ${
                material.isSubMaterial
                  ? "bg-blue-50/50 hover:bg-blue-100/50 dark:bg-blue-950/20 dark:hover:bg-blue-900/30"
                  : "bg-muted/50 hover:bg-muted dark:bg-muted/70 dark:hover:bg-muted"
              }`}
            >
              <div
                className={`flex-shrink-0 rounded border border-border/30 p-0.5 ${getRarityGradient(material.rarity)}`}
              >
                <Image
                  src={`/infos/materials/${material.materialId}.webp`}
                  alt={material.materialName}
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <div className="truncate text-[11px] font-semibold leading-tight text-foreground">
                  {material.materialName}
                </div>
                <div className="flex items-center gap-1 text-[9px] leading-tight">
                  <span className="text-red-600 dark:text-red-400">{t("deficitCount", { count: currentDeficit })}</span>
                  {material.runsNeeded !== undefined && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span
                        className={
                          material.isGuaranteedDrop
                            ? "font-semibold text-green-600 dark:text-green-400"
                            : "text-muted-foreground"
                        }
                        title={material.isGuaranteedDrop ? t("guaranteedDrop") : t("probabilityDrop")}
                      >
                        {material.isGuaranteedDrop ? t("guaranteed") : t("expected")}
                        {t("runsCount", { count: material.runsNeeded })}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
