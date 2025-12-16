"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { MaterialRequirement, UserMaterials } from "@/lib/types/growthCalculatorTypes";
import { groupDeficitsByStage, StageRecommendation } from "@/lib/utils/farmingHelper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  // 파밍 가이드 스테이지 목록은 requirements가 변경될 때만 재계산
  // userMaterials 변경 시에는 재계산하지 않음 (UI에서 실시간 계산)
  const recommendations = useMemo(() => {
    return groupDeficitsByStage(requirements, userMaterials);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirements]); // userMaterials를 의존성에서 제거

  // 실시간으로 표시될 스테이지 개수 계산 (모든 재료가 충분한 스테이지는 제외)
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

  // 모든 파밍이 완료되었는지 확인
  const allFarmingComplete = visibleHighPriority.length === 0 && visibleLowPriority.length === 0;

  const [showLowPriority, setShowLowPriority] = useState(false);

  // 파밍할 재료가 없으면 축하 메시지 표시
  if (recommendations.highPriority.length === 0 && recommendations.lowPriority.length === 0) {
    return (
      <div className="rounded-lg border-2 border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center dark:from-green-950/30 dark:to-emerald-950/30">
        <div className="mb-4 text-6xl">🎉</div>
        <h3 className="mb-2 text-xl font-bold text-green-700 dark:text-green-400">
          모든 재료가 충분합니다!
        </h3>
        <p className="text-sm text-green-600 dark:text-green-500">
          보유한 재료만으로 모든 육성이 가능합니다.
          <br />
          합성을 통해 필요한 고급 재료를 제작하세요! 💎
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
        // 모든 파밍 완료 축하 메시지
        <div className="rounded-lg border-2 border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center dark:from-green-950/30 dark:to-emerald-950/30">
          <div className="mb-4 text-6xl">✨</div>
          <h3 className="mb-2 text-xl font-bold text-green-700 dark:text-green-400">파밍 완료!</h3>
          <p className="text-sm text-green-600 dark:text-green-500">
            모든 재료 파밍이 완료되었습니다!
            <br />
            이제 캐릭터를 육성할 준비가 되었습니다! 🎊
          </p>
        </div>
      ) : (
        <>
          {/* 4,5성 재료 파밍 스테이지 (우선) */}
          {visibleHighPriority.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <span className="text-xl">🎯</span>
                  추천 파밍 스테이지
                </h2>
                <p className="text-xs text-muted-foreground">재료 클릭 시 보유량 수정</p>
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

          {/* 3성 이하 재료 파밍 스테이지 (나중에) */}
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
                    하위 재료 파밍 ({visibleLowPriority.length}개 스테이지)
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
  const { stageName, category, cost, materials } = recommendation;
  const maxRarity = Math.max(...materials.map((m) => m.rarity));

  // 모든 재료가 충분한지 확인 (실시간 계산)
  const allMaterialsSufficient = materials.every((material) => {
    const currentDeficit = Math.max(
      0,
      material.required - (userMaterials[material.materialId] || 0)
    );
    return currentDeficit === 0;
  });

  // 모든 재료가 충분하면 스테이지 카드를 숨김
  if (allMaterialsSufficient) {
    return null;
  }

  return (
    <Card
      className={`border bg-card transition-all duration-200 hover:shadow-md ${
        maxRarity >= 4 ? "border-purple-300 dark:border-purple-700" : ""
      }`}
    >
      {/* 컴팩트한 헤더 - 제목과 활성을 한줄로 */}
      <CardHeader className="border-b px-3 pb-2 pt-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base">📍</span>
            <span className="text-sm font-bold text-primary">{stageName}</span>
            <Badge
              variant={category === "Hard" ? "destructive" : "secondary"}
              className="px-1.5 py-0 text-[10px]"
            >
              {category === "Hard" ? "하드" : "노말"}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span>⚡</span>
            <span className="font-bold text-primary">{cost}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-1.5 px-3 pb-2 pt-2">
        {/* 재료 목록 */}
        {materials.map((material) => {
          // 실시간 부족량 계산
          const currentDeficit = Math.max(
            0,
            material.required - (userMaterials[material.materialId] || 0)
          );

          // 이미 충분한 재료는 표시하지 않음
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
                  <span className="text-red-600 dark:text-red-400">부족 {currentDeficit}개</span>
                  {material.runsNeeded !== undefined && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span
                        className={
                          material.isGuaranteedDrop
                            ? "font-semibold text-green-600 dark:text-green-400"
                            : "text-muted-foreground"
                        }
                        title={material.isGuaranteedDrop ? "확정 드롭" : "확률 드롭 (예상치)"}
                      >
                        {material.isGuaranteedDrop ? "확정 " : "예상 "}
                        {material.runsNeeded}회
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
