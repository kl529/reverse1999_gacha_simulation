"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { charactersByRarity } from "@/data/characters";
import { CharacterPlan, GrowthState } from "@/lib/types/growthCalculatorTypes";
import { RESONANCE_PATTERN } from "@/data/resonance_pattern";
import { resonancePatternMaterial } from "@/data/resonance_pattern_material";
import { euphoriaMaterialList } from "@/data/euphoria_material";
import { euphoriaList } from "@/data/euphoria";
import { useTranslations } from "next-intl";

interface GrowthPlanModal_GrowthProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  characterId: number;
  existingPlan?: CharacterPlan;
  onSave: (plan: Omit<CharacterPlan, "id" | "createdAt" | "updatedAt">) => void;
  currentIndex?: number;
  totalCount?: number;
  onNavigate?: (direction: 'prev' | 'next', currentPlanData: Omit<CharacterPlan, "id" | "createdAt" | "updatedAt">) => void;
  tempPlan?: Omit<CharacterPlan, "id" | "createdAt" | "updatedAt">;
}

const MAX_LEVEL_BY_INSIGHT = [30, 40, 50, 60];
const INSIGHT_IMAGES = [
  "/infos/insight_img/insight_0.webp",
  "/infos/insight_img/insight_1.webp",
  "/infos/insight_img/insight_2.webp",
  "/infos/insight_img/insight_3.webp",
];

export default function GrowthPlanModal_Growth({
  open,
  onOpenChange,
  characterId,
  existingPlan,
  onSave,
  currentIndex,
  totalCount,
  onNavigate,
  tempPlan,
}: GrowthPlanModal_GrowthProps) {
  const t = useTranslations("growthCalc");
  const [isActive, setIsActive] = useState(true);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentResonance, setCurrentResonance] = useState(1);
  const [currentEuphoriaLevels, setCurrentEuphoriaLevels] = useState<number[]>([]);
  const [currentZoneLevel, setCurrentZoneLevel] = useState(0);
  const [targetInsight, setTargetInsight] = useState(0);
  const [targetLevel, setTargetLevel] = useState(1);
  const [targetResonance, setTargetResonance] = useState(1);
  const [targetEuphoriaLevels, setTargetEuphoriaLevels] = useState<number[]>([]);
  const [targetZoneLevel, setTargetZoneLevel] = useState(0);
  const [targetResonancePatterns, setTargetResonancePatterns] = useState<number[]>([]);

  const character = useMemo(() => {
    const allCharacters = Object.values(charactersByRarity).flat();
    return allCharacters.find((c) => c.id === characterId);
  }, [characterId]);

  const resonancePatterns = useMemo(() => {
    const patterns =
      resonancePatternMaterial.find((pattern) => pattern.character_id === characterId)?.pattern || [];
    return patterns;
  }, [characterId]);

  const availablePatterns = useMemo(() => {
    if (!character?.resonanceType) return [];
    const patterns = RESONANCE_PATTERN[character.resonanceType];
    if (!patterns) return [];
    return Object.keys(patterns);
  }, [character]);

  const characterEuphorias = useMemo(() => {
    return euphoriaList.filter(e => e.character_id === characterId);
  }, [characterId]);

  const hasEuphoriaMaterial = useMemo(() => {
    return euphoriaMaterialList.some(e => e.character_id === characterId);
  }, [characterId]);

  const getPatternName = (type: string, pattern: string) => {
    const patterns = RESONANCE_PATTERN[type];
    if (!patterns) return "";
    return patterns[pattern] || "";
  };

  useEffect(() => {
    if (existingPlan) {
      setIsActive(existingPlan.isActive);
      setCurrentInsight(existingPlan.current.insight);
      setCurrentLevel(existingPlan.current.level);
      setCurrentResonance(existingPlan.current.resonance);
      setCurrentEuphoriaLevels(existingPlan.current.euphoriaLevels);
      setCurrentZoneLevel(existingPlan.current.zoneLevel);
      setTargetInsight(existingPlan.target.insight);
      setTargetLevel(existingPlan.target.level);
      setTargetResonance(existingPlan.target.resonance);
      setTargetEuphoriaLevels(existingPlan.target.euphoriaLevels);
      setTargetZoneLevel(existingPlan.target.zoneLevel);
      setTargetResonancePatterns(existingPlan.target.resonancePatterns);
    } else if (tempPlan) {
      setIsActive(tempPlan.isActive);
      setCurrentInsight(tempPlan.current.insight);
      setCurrentLevel(tempPlan.current.level);
      setCurrentResonance(tempPlan.current.resonance);
      setCurrentEuphoriaLevels(tempPlan.current.euphoriaLevels);
      setCurrentZoneLevel(tempPlan.current.zoneLevel);
      setTargetInsight(tempPlan.target.insight);
      setTargetLevel(tempPlan.target.level);
      setTargetResonance(tempPlan.target.resonance);
      setTargetEuphoriaLevels(tempPlan.target.euphoriaLevels);
      setTargetZoneLevel(tempPlan.target.zoneLevel);
      setTargetResonancePatterns(tempPlan.target.resonancePatterns);
    } else {
      setIsActive(true);
      setCurrentInsight(0);
      setCurrentLevel(1);
      setCurrentResonance(1);
      setCurrentEuphoriaLevels([]);
      setCurrentZoneLevel(0);
      setTargetInsight(0);
      setTargetLevel(1);
      setTargetResonance(1);
      setTargetEuphoriaLevels([]);
      setTargetZoneLevel(0);
      setTargetResonancePatterns([]);
    }
  }, [existingPlan, tempPlan, open, characterId]);

  useEffect(() => {
    if (targetInsight < currentInsight) setTargetInsight(currentInsight);
    const maxCurrentLevel = MAX_LEVEL_BY_INSIGHT[currentInsight];
    if (currentLevel > maxCurrentLevel) setCurrentLevel(maxCurrentLevel);
    const maxTargetLevel = MAX_LEVEL_BY_INSIGHT[targetInsight];
    if (targetLevel > maxTargetLevel) setTargetLevel(maxTargetLevel);
    if (currentInsight === targetInsight && targetLevel < currentLevel) setTargetLevel(currentLevel);
    if (targetResonance < currentResonance) setTargetResonance(currentResonance);
  }, [currentInsight, currentLevel, targetInsight, targetLevel, currentResonance, targetResonance]);

  const toggleEuphoriaLevel = (level: number, isCurrent: boolean) => {
    if (isCurrent) {
      setCurrentEuphoriaLevels((prev) =>
        prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
      );
    } else {
      setTargetEuphoriaLevels((prev) =>
        prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
      );
    }
  };

  const toggleResonancePattern = (patternId: number) => {
    setTargetResonancePatterns((prev) => {
      if (prev.includes(patternId)) return prev.filter((id) => id !== patternId);
      if (prev.length >= 5) return prev;
      return [...prev, patternId];
    });
  };

  const getCurrentPlanData = (): Omit<CharacterPlan, "id" | "createdAt" | "updatedAt"> => {
    const current: GrowthState = {
      insight: currentInsight,
      level: currentLevel,
      resonance: currentResonance,
      euphoriaLevels: currentEuphoriaLevels,
      zoneLevel: currentZoneLevel,
    };
    const target: GrowthState & { resonancePatterns: number[] } = {
      insight: targetInsight,
      level: targetLevel,
      resonance: targetResonance,
      euphoriaLevels: targetEuphoriaLevels,
      zoneLevel: targetZoneLevel,
      resonancePatterns: targetResonancePatterns,
    };
    return { characterId, isActive, current, target };
  };

  const handleSave = () => onSave(getCurrentPlanData());

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (onNavigate) onNavigate(direction, getCurrentPlanData());
  };

  const renderInsightButtons = (selected: number, setter: (v: number) => void, isTarget: boolean = false) => (
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
              alt={t("insightAlt", { level: index })}
              width={40}
              height={40}
              className={`rounded ${selected === index ? "border-green-700" : "border-transparent"}`}
            />
          </div>
        );
      })}
    </div>
  );

  const renderResonanceButtons = (selected: number, setter: (v: number) => void, isTarget: boolean = false) => (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => {
        const isDisabled = isTarget && num < currentResonance;
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

  const renderEuphoriaLevelButtons = (selected: number, setter: (v: number) => void) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => i).map((num) => (
        <Button
          key={num}
          size="sm"
          variant={selected === num ? "default" : "outline"}
          onClick={() => setter(num)}
          className="h-8 w-10 p-0"
        >
          {num}
        </Button>
      ))}
    </div>
  );

  const renderLevelButtons = (selected: number, setter: (v: number) => void, max: number, isTarget: boolean = false) => (
    <div className="flex flex-wrap gap-1">
      {[1, 10, 20, 30, 40, 50, 60]
        .filter((v) => v <= max)
        .map((num) => {
          const isDisabled = isTarget && currentInsight === targetInsight && num < currentLevel;
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

  if (!character) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2 sm:gap-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-md flex-shrink-0">
                <Image
                  src={`/characters/${character.rarity}stars/${character.engName}.webp`}
                  alt={character.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <span className="truncate">{character.name} {t("growthPlan")}</span>
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Checkbox checked={isActive} onCheckedChange={(checked) => setIsActive(!!checked)} />
              <label className="text-sm font-medium">{t("activate")}</label>
            </div>
          </div>
          <DialogDescription className="text-xs sm:text-sm">
            {t("growthPlanDesc")}
            {currentIndex !== undefined && totalCount !== undefined && totalCount > 1 && (
              <span className="ml-2 font-semibold text-primary">
                ({currentIndex + 1}/{totalCount})
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h3 className="text-lg font-bold">{t("currentState")}</h3>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("insightLevel")}</label>
              {renderInsightButtons(currentInsight, setCurrentInsight)}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t("charLevel", { max: MAX_LEVEL_BY_INSIGHT[currentInsight] })}
              </label>
              {renderLevelButtons(currentLevel, setCurrentLevel, MAX_LEVEL_BY_INSIGHT[currentInsight])}
              <div className="space-y-1 mt-2 max-w-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("currentLevel")}</span>
                  <span className="text-sm font-semibold">{currentLevel}</span>
                </div>
                <Slider value={[currentLevel]} onValueChange={([v]) => setCurrentLevel(v)} min={1} max={MAX_LEVEL_BY_INSIGHT[currentInsight]} step={1} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("resonanceLevel")}</label>
              {renderResonanceButtons(currentResonance, setCurrentResonance)}
            </div>
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-primary/5">
            <h3 className="text-lg font-bold">{t("targetState")}</h3>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("insightLevel")}</label>
              {renderInsightButtons(targetInsight, setTargetInsight, true)}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t("charLevel", { max: MAX_LEVEL_BY_INSIGHT[targetInsight] })}
              </label>
              {renderLevelButtons(targetLevel, setTargetLevel, MAX_LEVEL_BY_INSIGHT[targetInsight], true)}
              <div className="space-y-1 mt-2 max-w-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("targetLevel")}</span>
                  <span className="text-sm font-semibold">{targetLevel}</span>
                </div>
                <Slider value={[targetLevel]} onValueChange={([v]) => setTargetLevel(v)} min={currentInsight === targetInsight ? currentLevel : 1} max={MAX_LEVEL_BY_INSIGHT[targetInsight]} step={1} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("resonanceLevel")}</label>
              {renderResonanceButtons(targetResonance, setTargetResonance, true)}
            </div>

            {hasEuphoriaMaterial && characterEuphorias.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">{t("euphoriaSelect")}</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {characterEuphorias.map((euphoria) => (
                    <Button
                      key={euphoria.number}
                      size="sm"
                      variant={targetEuphoriaLevels.includes(euphoria.number) ? "default" : "outline"}
                      onClick={() => toggleEuphoriaLevel(euphoria.number, false)}
                      className="h-auto px-3 py-2"
                    >
                      {t("euphoriaNum", { num: euphoria.number })}
                    </Button>
                  ))}
                </div>
                {targetEuphoriaLevels.length > 0 && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("euphoriaLevel")}</label>
                    {renderEuphoriaLevelButtons(targetZoneLevel, setTargetZoneLevel)}
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">
                {t("resonancePattern", { count: targetResonancePatterns.length })}
              </label>
              <div className="flex flex-wrap gap-1">
                {availablePatterns.map((patternName, index) => {
                  const pattern = resonancePatterns.find((p) => p.pattern === patternName);
                  if (!pattern) return null;
                  const koreanName = getPatternName(character.resonanceType, patternName);
                  const isSelected = targetResonancePatterns.includes(index + 1);
                  const patternName2 = `${character.resonanceType}_${pattern.pattern}`;

                  return (
                    <div key={patternName} className="group relative">
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        size="icon"
                        onClick={() => toggleResonancePattern(index + 1)}
                        className="relative h-12 w-12 p-0"
                      >
                        <Image
                          src={`/infos/resonance_pattern/${patternName2}.webp`}
                          alt={koreanName}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </Button>
                      <div className="absolute left-1/2 top-full hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white group-hover:block z-50">
                        {koreanName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>

          <div className="flex gap-2">
            {totalCount !== undefined && totalCount > 1 && currentIndex !== undefined ? (
              <>
                {currentIndex > 0 && (
                  <Button variant="outline" onClick={() => handleNavigate('prev')}>
                    {t("prev")}
                  </Button>
                )}
                {currentIndex < totalCount - 1 ? (
                  <Button onClick={() => handleNavigate('next')}>
                    {t("next")}
                  </Button>
                ) : (
                  <Button onClick={handleSave}>
                    {t("save")}
                  </Button>
                )}
              </>
            ) : (
              <Button onClick={handleSave}>{t("save")}</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
