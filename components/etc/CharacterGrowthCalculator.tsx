import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { resonanceMaterialList } from "@/data/resonance_material";
import { euphoriaMaterialList } from "@/data/euphoria_material";
import { resonancePatternMaterial } from "@/data/resonance_pattern_material";
import { charactersByRarity } from "@/data/characters";
import { RESONANCE_PATTERN } from "@/data/resonance_pattern";
import { levelMaterialList } from "@/data/level_material";
import { insightMaterial } from "@/data/insight_material";
import { materialList, Material } from "@/data/material";

interface Props {
  characterId: number;
}

const MAX_LEVEL_BY_INSIGHT = [30, 40, 50, 60];
const INSIGHT_IMAGES = [
  "/infos/insight_img/insight_0.webp",
  "/infos/insight_img/insight_1.webp",
  "/infos/insight_img/insight_2.webp",
  "/infos/insight_img/insight_3.webp",
];

export default function MaterialCalculator({ characterId }: Props) {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetInsight, setTargetInsight] = useState(1);
  const [targetLevel, setTargetLevel] = useState(30);
  const [currentResonance, setCurrentResonance] = useState(1);
  const [targetResonance, setTargetResonance] = useState(1);
  const [currentZoneOn, setCurrentZoneOn] = useState(false);
  const [targetZoneOn, setTargetZoneOn] = useState(false);
  const [currentZoneLevel, setCurrentZoneLevel] = useState(0);
  const [targetZoneLevel, setTargetZoneLevel] = useState(0);
  const [showCurrentSlider, setShowCurrentSlider] = useState(false);
  const [showTargetSlider, setShowTargetSlider] = useState(false);
  const [targetResonancePatterns, setTargetResonancePatterns] = useState<number[]>([]);
  const [currentEuphoriaLevels, setCurrentEuphoriaLevels] = useState<number[]>([]);
  const [targetEuphoriaLevels, setTargetEuphoriaLevels] = useState<number[]>([]);

  const character = useMemo(() => {
    const allCharacters = Object.values(charactersByRarity).flat();
    const characterData = allCharacters.find((c) => c.id === characterId);
    return characterData || { resonanceType: "", name: "" };
  }, [characterId]);

  // 캐릭터 변경 시 상태 초기화
  useEffect(() => {
    setCurrentInsight(0);
    setCurrentLevel(1);
    setTargetInsight(0);
    setTargetLevel(1);
    setCurrentResonance(1);
    setTargetResonance(1);
    setCurrentZoneOn(false);
    setTargetZoneOn(false);
    setCurrentZoneLevel(0);
    setTargetZoneLevel(0);
    setShowCurrentSlider(false);
    setShowTargetSlider(false);
    setTargetResonancePatterns([]);
    setCurrentEuphoriaLevels([]);
    setTargetEuphoriaLevels([]);
  }, [characterId]);

  const resonancePatterns = useMemo(() => {
    const patterns =
      resonancePatternMaterial.find((pattern) => pattern.character_id === characterId)?.pattern ||
      [];
    return patterns;
  }, [characterId]);

  const getResonanceTypePatterns = (type: string) => {
    if (!type) return [];
    const patterns = RESONANCE_PATTERN[type];
    if (!patterns) return [];
    return Object.keys(patterns);
  };

  const availablePatterns = useMemo(() => {
    return getResonanceTypePatterns(character.resonanceType).map((_, index) => index + 1);
  }, [character.resonanceType]);

  const getPatternName = (type: string, pattern: string) => {
    const patterns = RESONANCE_PATTERN[type];
    if (!patterns) return "";
    return patterns[pattern] || "";
  };

  useEffect(() => {
    // 목표 통찰 레벨이 현재 통찰 레벨보다 낮으면 현재 통찰 레벨로 설정
    if (targetInsight < currentInsight) {
      setTargetInsight(currentInsight);
    }

    // 현재 통찰 레벨의 최대 레벨
    const maxCurrentLevel = MAX_LEVEL_BY_INSIGHT[currentInsight];
    if (currentLevel > maxCurrentLevel) {
      setCurrentLevel(maxCurrentLevel);
    }

    // 목표 통찰 레벨의 최대 레벨
    const maxTargetLevel = MAX_LEVEL_BY_INSIGHT[targetInsight];

    // 목표 레벨 제한 설정
    if (currentInsight === targetInsight) {
      // 같은 통찰 레벨일 경우 현재 레벨보다 같거나 높게 설정
      if (targetLevel < currentLevel) {
        setTargetLevel(currentLevel);
      } else if (targetLevel > maxTargetLevel) {
        setTargetLevel(maxTargetLevel);
      }
    } else {
      // 다른 통찰 레벨일 경우 1부터 해당 통찰 최대 레벨까지 가능
      if (targetLevel < 1) {
        setTargetLevel(1);
      } else if (targetLevel > maxTargetLevel) {
        setTargetLevel(maxTargetLevel);
      }
    }

    if (targetResonance < currentResonance) setTargetResonance(currentResonance);
    if (targetResonance > 15) setTargetResonance(15);
    if (currentResonance > 15) setCurrentResonance(15);

    if (currentZoneOn && !targetZoneOn) {
      setTargetZoneOn(true);
      if (targetZoneLevel < currentZoneLevel) {
        setTargetZoneLevel(currentZoneLevel);
      }
    }
  }, [
    currentInsight,
    currentLevel,
    targetInsight,
    targetLevel,
    currentResonance,
    targetResonance,
    currentZoneOn,
    targetZoneOn,
    currentZoneLevel,
    targetZoneLevel,
  ]);

  // 목표/현재 광상 OFF 시 zoneLevel 0으로 자동 설정
  useEffect(() => {
    if (targetEuphoriaLevels.length === 0 && targetZoneLevel !== 0) {
      setTargetZoneLevel(0);
    }
  }, [targetEuphoriaLevels, targetZoneLevel]);
  useEffect(() => {
    if (currentEuphoriaLevels.length === 0 && currentZoneLevel !== 0) {
      setCurrentZoneLevel(0);
    }
  }, [currentEuphoriaLevels, currentZoneLevel]);

  // 현재 광상 ON 시 목표 광상도 자동 ON
  useEffect(() => {
    setTargetEuphoriaLevels((prev) => {
      const merged = Array.from(new Set([...prev, ...currentEuphoriaLevels]));
      return merged;
    });
  }, [currentEuphoriaLevels]);

  const renderInsightImages = (
    selected: number,
    setter: (v: number) => void,
    isTarget: boolean = false
  ) => (
    <div className="flex gap-2">
      {INSIGHT_IMAGES.map((src, index) => {
        const isDisabled = isTarget && index < currentInsight;
        return (
          <div
            key={index}
            onClick={() => !isDisabled && setter(index)}
            className={`flex cursor-pointer items-center justify-center rounded p-1 ${
              selected === index ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
            } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <Image
              src={src}
              alt={`Insight ${index}`}
              width={40}
              height={40}
              className={`rounded ${selected === index ? "border-green-700" : "border-transparent"}`}
            />
          </div>
        );
      })}
    </div>
  );

  const renderResonanceButtons = (
    selected: number,
    setter: (v: number) => void,
    isTarget: boolean = false,
    currentLevel: number = 0
  ) => (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => {
        const isDisabled = isTarget && num < currentLevel;
        return (
          <Button
            key={num}
            size="sm"
            variant={selected === num ? "default" : "outline"}
            onClick={() => !isDisabled && setter(num)}
            className={`h-8 w-8 p-0 ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={isDisabled}
          >
            {num}
          </Button>
        );
      })}
    </div>
  );

  const renderZoneButtons = (
    selected: number,
    setter: (v: number) => void,
    isTarget: boolean = false,
    currentLevel: number = 0
  ) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => i).map((num) => {
        const isDisabled = isTarget && num < currentLevel;
        return (
          <Button
            key={num}
            size="sm"
            variant={selected === num ? "default" : "outline"}
            onClick={() => !isDisabled && setter(num)}
            className={`h-8 w-8 p-0 ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={isDisabled}
          >
            {num}
          </Button>
        );
      })}
    </div>
  );

  const renderLevelButtons = (
    selected: number,
    setter: (v: number) => void,
    max: number,
    isTarget: boolean = false,
    currentValue: number = 1
  ) => (
    <div className="flex flex-wrap gap-1">
      {[1, 10, 20, 30, 40, 50, 60]
        .filter((v) => v <= max)
        .map((num) => {
          const isDisabled = isTarget && num < currentValue;
          return (
            <Button
              key={num}
              size="sm"
              variant={selected === num ? "default" : "outline"}
              onClick={() => !isDisabled && setter(num)}
              className={`h-8 min-w-[40px] px-1 ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={isDisabled}
            >
              {num}
            </Button>
          );
        })}
    </div>
  );

  const getResonanceMaterials = () => {
    const data = resonanceMaterialList.find((c) => c.character_id === characterId);
    if (!data) return {};
    const materialsMap: Record<number, number> = {};
    for (let i = currentResonance + 1; i <= targetResonance; i++) {
      const step = data.resonance.find((r) => r.level === i);
      if (step) {
        for (const [id, count] of Object.entries(step.materials)) {
          const key = Number(id);
          materialsMap[key] = (materialsMap[key] || 0) + count;
        }
      }
    }
    return materialsMap;
  };

  const toggleResonancePattern = (patternId: number) => {
    setTargetResonancePatterns((prev) => {
      if (prev.includes(patternId)) {
        return prev.filter((id) => id !== patternId);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, patternId];
    });
  };

  const getResonancePatternMaterials = () => {
    const patternData = resonancePatternMaterial.find((c) => c.character_id === characterId);
    if (!patternData || targetResonancePatterns.length === 0) return {};
    const materialsMap: Record<number, number> = {};

    targetResonancePatterns.forEach((patternId) => {
      const pattern = patternData.pattern[patternId - 1];
      if (!pattern) return;
      for (const [id, count] of Object.entries(pattern.materials)) {
        const key = Number(id);
        materialsMap[key] = (materialsMap[key] || 0) + count;
      }
    });

    return materialsMap;
  };

  const getEuphoriaMaterials = () => {
    const data = euphoriaMaterialList.find((c) => c.character_id === characterId);
    if (!data) return {};
    const materialsMap: Record<number, number> = {};
    // 1. euphoria 재료: 목표에서 새로 ON되는 레벨만 (zoneLevel과 무관)
    targetEuphoriaLevels
      .filter((level) => !currentEuphoriaLevels.includes(level))
      .forEach((level) => {
        const euphoria = data.euphoria.find((e) => e.level === level);
        if (euphoria) {
          for (const [id, count] of Object.entries(euphoria.materials)) {
            const key = Number(id);
            materialsMap[key] = (materialsMap[key] || 0) + count;
          }
        }
      });
    // 2. upgrade 재료: zoneLevel이 1 이상일 때만
    if (targetZoneLevel > 0) {
      for (let i = currentZoneLevel + 1; i <= targetZoneLevel; i++) {
        const step = data.upgrade.find((u) => u.level === i);
        if (step) {
          for (const [id, count] of Object.entries(step.materials)) {
            const key = Number(id);
            materialsMap[key] = (materialsMap[key] || 0) + count;
          }
        }
      }
    }
    return materialsMap;
  };

  const getLevelMaterials = () => {
    const materialsMap: Record<number, number> = {};

    // 현재 레벨부터 목표 레벨까지의 재료를 계산
    if (currentInsight === targetInsight) {
      // 같은 통찰 레벨 내에서 레벨업
      for (let level = currentLevel + 1; level <= targetLevel; level++) {
        const materials = levelMaterialList[currentInsight][level];
        if (materials) {
          Object.entries(materials).forEach(([materialId, amount]) => {
            const numId = Number(materialId);
            materialsMap[numId] = (materialsMap[numId] || 0) + amount;
          });
        }
      }
    } else {
      // 현재 통찰 레벨에서 최대 레벨까지
      const currentMaxLevel = MAX_LEVEL_BY_INSIGHT[currentInsight];
      for (let level = currentLevel + 1; level <= currentMaxLevel; level++) {
        const materials = levelMaterialList[currentInsight][level];
        if (materials) {
          Object.entries(materials).forEach(([materialId, amount]) => {
            const numId = Number(materialId);
            materialsMap[numId] = (materialsMap[numId] || 0) + amount;
          });
        }
      }

      // 중간 통찰 레벨들의 1레벨부터 최대 레벨까지
      for (let insight = currentInsight + 1; insight < targetInsight; insight++) {
        const maxLevel = MAX_LEVEL_BY_INSIGHT[insight];
        for (let level = 1; level <= maxLevel; level++) {
          const materials = levelMaterialList[insight][level];
          if (materials) {
            Object.entries(materials).forEach(([materialId, amount]) => {
              const numId = Number(materialId);
              materialsMap[numId] = (materialsMap[numId] || 0) + amount;
            });
          }
        }
      }

      // 목표 통찰 레벨에서 1레벨부터 목표 레벨까지
      for (let level = 1; level <= targetLevel; level++) {
        const materials = levelMaterialList[targetInsight][level];
        if (materials) {
          Object.entries(materials).forEach(([materialId, amount]) => {
            const numId = Number(materialId);
            materialsMap[numId] = (materialsMap[numId] || 0) + amount;
          });
        }
      }
    }

    return materialsMap;
  };

  const getInsightMaterials = () => {
    const materialsMap: Record<number, number> = {};

    // 현재 통찰 레벨부터 목표 통찰 레벨까지의 재료를 계산
    const characterInsightData = insightMaterial.find((c) => c.character_id === characterId);
    if (!characterInsightData) return materialsMap;

    for (let level = currentInsight + 1; level <= targetInsight; level++) {
      const insightLevel = characterInsightData.insight.find((i) => i.level === level);
      if (insightLevel) {
        Object.entries(insightLevel.materials).forEach(([materialId, amount]) => {
          const numId = Number(materialId);
          materialsMap[numId] = (materialsMap[numId] || 0) + amount;
        });
      }
    }

    return materialsMap;
  };

  const renderResonancePatternButtons = () => {
    return (
      <div className="flex flex-wrap gap-1">
        {availablePatterns.map((patternId) => {
          const pattern = resonancePatterns.find((p) => p.pattern === patternId.toString());
          if (!pattern) return null;
          const patternName = `${character.resonanceType}_${pattern.pattern}`;
          const isSelected = targetResonancePatterns.includes(patternId);
          const koreanName = getPatternName(character.resonanceType, pattern.pattern);

          return (
            <div key={patternId} className="group relative">
              <Button
                variant={isSelected ? "default" : "outline"}
                size="icon"
                onClick={() => toggleResonancePattern(patternId)}
                className={`relative h-[48px] min-w-[48px] p-0 transition-colors ${
                  isSelected
                    ? "bg-gray-800 hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-black"
                    : "bg-gray-200 hover:bg-accent dark:bg-gray-700"
                }`}
              >
                <Image
                  src={`/infos/resonance_pattern/${patternName}.webp`}
                  alt={`공명 변조 ${koreanName}`}
                  width={48}
                  height={48}
                  className={`object-contain transition-opacity ${isSelected ? "opacity-90" : ""}`}
                />
              </Button>
              <div className="absolute left-1/2 top-full hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
                {koreanName}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMaterials = () => {
    const resonanceMaterials = getResonanceMaterials();
    const resonancePatternMaterials = getResonancePatternMaterials();
    const euphoriaMaterials = getEuphoriaMaterials();
    const levelMaterials = getLevelMaterials();
    const insightMaterials = getInsightMaterials();

    // 모든 재료를 하나의 맵으로 합치기
    const allNeededMaterials: Record<number, number> = {};
    [
      resonanceMaterials,
      resonancePatternMaterials,
      euphoriaMaterials,
      levelMaterials,
      insightMaterials,
    ].forEach((materials) => {
      Object.entries(materials).forEach(([materialId, amount]) => {
        const numId = Number(materialId);
        allNeededMaterials[numId] = (allNeededMaterials[numId] || 0) + amount;
      });
    });

    // 재료가 없으면 표시하지 않음
    if (Object.keys(allNeededMaterials).length === 0) return null;

    const groupedMaterials: Record<number, { id: number; count: number }[]> = {};
    const baseItems: { id: number; count: number }[] = [];

    Object.entries(allNeededMaterials).forEach(([id, count]) => {
      const numId = Number(id);
      const material = materialList.find((m: Material) => m.id === numId);
      if (material) {
        if (material.id === 1001 || material.id === 1002) {
          baseItems.push({ id: numId, count });
        } else {
          if (!groupedMaterials[material.rarity]) {
            groupedMaterials[material.rarity] = [];
          }
          groupedMaterials[material.rarity].push({ id: numId, count });
        }
      }
    });

    return (
      <div className="mt-8 rounded-lg border bg-gray-50 p-6 dark:bg-gray-800/50">
        <h3 className="mb-4 text-center text-xl font-bold">필요한 재료</h3>
        <div className="flex flex-col gap-3">
          {baseItems.length > 0 && (
            <div className="rounded-lg bg-white p-4 pb-2 shadow-sm dark:bg-gray-800">
              <div className="flex flex-wrap gap-1 sm:gap-3">
                {baseItems.map(({ id, count }) => {
                  const material = materialList.find((m: Material) => m.id === id);
                  return (
                    <div key={id} className="group relative flex items-center gap-1">
                      <div className="relative flex flex-col items-center transition-transform duration-200 ease-in-out group-hover:scale-110">
                        <div className="rounded-lg bg-gradient-to-br from-gray-400/20 to-gray-500/20 p-1">
                          <Image
                            src={`/infos/materials/${id}.webp`}
                            alt={material?.name || String(id)}
                            width={40}
                            height={40}
                            className="rounded sm:h-12 sm:w-12"
                          />
                        </div>
                        <div className="mt-1 text-center text-xs font-medium sm:text-sm">
                          {count.toLocaleString()}
                        </div>
                        <div className="absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-3 py-1.5 text-sm font-medium text-white group-hover:block">
                          {material?.name || String(id)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {Object.entries(groupedMaterials)
            .sort(([rarityA], [rarityB]) => Number(rarityB) - Number(rarityA))
            .map(([rarity, items]) => (
              <div key={rarity} className="rounded-lg bg-white p-4 pb-2 shadow-sm dark:bg-gray-800">
                <div className="flex flex-wrap gap-1 sm:gap-3">
                  {items.map(({ id, count }) => {
                    const material = materialList.find((m: Material) => m.id === id);
                    return (
                      <div key={id} className="group relative flex items-center gap-1">
                        <div className="relative flex flex-col items-center transition-transform duration-200 ease-in-out group-hover:scale-110">
                          <div
                            className={`rounded-lg p-1 ${(() => {
                              switch (Number(rarity)) {
                                case 6:
                                  return "bg-gradient-to-br from-rose-500/20 to-amber-500/20";
                                case 5:
                                  return "bg-gradient-to-br from-purple-500/20 to-pink-500/20";
                                case 4:
                                  return "bg-gradient-to-br from-blue-500/20 to-indigo-500/20";
                                case 3:
                                  return "bg-gradient-to-br from-emerald-500/20 to-teal-500/20";
                                default:
                                  return "bg-gradient-to-br from-gray-400/20 to-gray-500/20";
                              }
                            })()}`}
                          >
                            <Image
                              src={`/infos/materials/${id}.webp`}
                              alt={material?.name || String(id)}
                              width={40}
                              height={40}
                              className="rounded sm:h-12 sm:w-12"
                            />
                          </div>
                          <div className="mt-1 text-center text-xs font-medium sm:text-sm">
                            {count.toLocaleString()}
                          </div>
                          <div className="absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-3 py-1.5 text-sm font-medium text-white group-hover:block">
                            {material?.name || String(id)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-center text-lg font-bold text-black dark:text-white">
        육성 재화 계산기 - {character.name}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="space-y-2 p-4">
            <h3 className="text-center font-semibold">현재 상태</h3>
            <div>
              <p className="mb-2 block">통찰</p>
              {renderInsightImages(currentInsight, setCurrentInsight)}
            </div>
            <div>
              <p className="mb-2">레벨</p>
              {renderLevelButtons(
                currentLevel,
                setCurrentLevel,
                MAX_LEVEL_BY_INSIGHT[currentInsight]
              )}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  현재 레벨: {currentLevel}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowCurrentSlider((prev) => !prev)}
                  className="text-xs"
                >
                  상세 설정
                </Button>
              </div>
              {showCurrentSlider && (
                <Slider
                  min={1}
                  max={MAX_LEVEL_BY_INSIGHT[currentInsight]}
                  step={1}
                  value={[currentLevel]}
                  onValueChange={([val]) => setCurrentLevel(val)}
                />
              )}
            </div>
            {(() => {
              const euphoriaData = euphoriaMaterialList.find((c) => c.character_id === characterId);
              return (
                euphoriaData &&
                euphoriaData.euphoria &&
                euphoriaData.euphoria.length > 0 && (
                  <div>
                    <p className="mb-2">광상</p>
                    <div className="flex flex-col gap-2">
                      {euphoriaData.euphoria.map((e) => (
                        <Button
                          key={e.level}
                          size="sm"
                          variant={currentEuphoriaLevels.includes(e.level) ? "default" : "outline"}
                          onClick={() => {
                            setCurrentEuphoriaLevels((prev) =>
                              prev.includes(e.level)
                                ? prev.filter((l) => l !== e.level)
                                : [...prev, e.level]
                            );
                          }}
                        >
                          {`광상 ${e.level}차 ${currentEuphoriaLevels.includes(e.level) ? "ON" : "OFF"}`}
                        </Button>
                      ))}
                      {currentEuphoriaLevels.length > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                          {renderZoneButtons(currentZoneLevel, setCurrentZoneLevel)}
                        </div>
                      )}
                    </div>
                  </div>
                )
              );
            })()}
            <div>
              <p className="mb-2">공명</p>
              {renderResonanceButtons(currentResonance, setCurrentResonance)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 p-4">
            <h3 className="text-center font-semibold">목표 상태</h3>
            <div>
              <p className="mb-2 block">통찰</p>
              {renderInsightImages(targetInsight, setTargetInsight, true)}
            </div>
            <div>
              <p className="mb-2">레벨</p>
              {renderLevelButtons(
                targetLevel,
                setTargetLevel,
                MAX_LEVEL_BY_INSIGHT[targetInsight],
                true,
                currentLevel
              )}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  목표 레벨: {targetLevel}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowTargetSlider((prev) => !prev)}
                  className="text-xs"
                >
                  상세 설정
                </Button>
              </div>
              {showTargetSlider && (
                <Slider
                  min={1}
                  max={MAX_LEVEL_BY_INSIGHT[targetInsight]}
                  step={1}
                  value={[targetLevel]}
                  onValueChange={([val]) => setTargetLevel(val)}
                />
              )}
            </div>
            {(() => {
              const euphoriaData = euphoriaMaterialList.find((c) => c.character_id === characterId);
              return (
                euphoriaData &&
                euphoriaData.euphoria &&
                euphoriaData.euphoria.length > 0 && (
                  <div>
                    <p className="mb-2">광상</p>
                    <div className="flex flex-col gap-2">
                      {euphoriaData.euphoria.map((e) => (
                        <Button
                          key={e.level}
                          size="sm"
                          variant={targetEuphoriaLevels.includes(e.level) ? "default" : "outline"}
                          onClick={() => {
                            setTargetEuphoriaLevels((prev) =>
                              prev.includes(e.level)
                                ? prev.filter((l) => l !== e.level)
                                : [...prev, e.level]
                            );
                          }}
                        >
                          {`광상 ${e.level}차 ${targetEuphoriaLevels.includes(e.level) ? "ON" : "OFF"}`}
                        </Button>
                      ))}
                      {targetEuphoriaLevels.length > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                          {renderZoneButtons(
                            targetZoneLevel,
                            setTargetZoneLevel,
                            true,
                            currentZoneLevel
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              );
            })()}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="mb-2">공명</div>
                {renderResonanceButtons(
                  targetResonance,
                  setTargetResonance,
                  true,
                  currentResonance
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="mb-2 text-sm font-medium">공명 변조</div>
                {renderResonancePatternButtons()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {renderMaterials()}
    </div>
  );
}
