/**
 * Growth Calculator Calculation Utilities
 * 캐릭터 육성에 필요한 재료를 계산하는 유틸리티 함수들
 * CharacterGrowthCalculator의 로직을 재사용
 */

import { CharacterPlan, MaterialsMap, MaterialRequirement, UserMaterials } from "../types/growthCalculatorTypes";
import { resonanceMaterialList } from "@/data/resonance_material";
import { euphoriaMaterialList } from "@/data/euphoria_material";
import { resonancePatternMaterial } from "@/data/resonance_pattern_material";
import { levelMaterialList } from "@/data/level_material";
import { insightMaterial } from "@/data/insight_material";
import { RESONANCE_PATTERN } from "@/data/resonance_pattern";

const MAX_LEVEL_BY_INSIGHT = [30, 40, 50, 60];

/**
 * 공명 재료 계산
 */
function calculateResonanceMaterials(
  characterId: number,
  currentResonance: number,
  targetResonance: number
): MaterialsMap {
  const data = resonanceMaterialList.find((c) => c.character_id === characterId);
  if (!data) return {};

  const materialsMap: MaterialsMap = {};
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
}

/**
 * 공명 변조 재료 계산
 */
function calculateResonancePatternMaterials(
  characterId: number,
  resonanceType: string,
  targetPatterns: number[]
): MaterialsMap {
  const patternData = resonancePatternMaterial.find((c) => c.character_id === characterId);
  if (!patternData || targetPatterns.length === 0) return {};

  const materialsMap: MaterialsMap = {};
  const patterns = RESONANCE_PATTERN[resonanceType];
  if (!patterns) return {};

  const availablePatterns = Object.keys(patterns);

  targetPatterns.forEach((patternId) => {
    const patternName = availablePatterns[patternId - 1];
    const pattern = patternData.pattern.find((p) => p.pattern === patternName);
    if (!pattern) return;

    for (const [id, count] of Object.entries(pattern.materials)) {
      const key = Number(id);
      materialsMap[key] = (materialsMap[key] || 0) + count;
    }
  });

  return materialsMap;
}

/**
 * 광상 재료 계산
 */
function calculateEuphoriaMaterials(
  characterId: number,
  currentEuphoriaLevels: number[],
  targetEuphoriaLevels: number[],
  currentZoneLevel: number,
  targetZoneLevel: number
): MaterialsMap {
  const data = euphoriaMaterialList.find((c) => c.character_id === characterId);
  if (!data) return {};

  const materialsMap: MaterialsMap = {};

  // 1. euphoria 재료: 목표에서 새로 ON되는 레벨만
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
}

/**
 * 레벨업 재료 계산
 */
function calculateLevelMaterials(
  currentInsight: number,
  currentLevel: number,
  targetInsight: number,
  targetLevel: number
): MaterialsMap {
  const materialsMap: MaterialsMap = {};

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
}

/**
 * 통찰 재료 계산
 */
function calculateInsightMaterials(
  characterId: number,
  currentInsight: number,
  targetInsight: number
): MaterialsMap {
  const materialsMap: MaterialsMap = {};
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
}

/**
 * 두 개의 MaterialsMap을 합산
 */
function mergeMaterialsMaps(...maps: MaterialsMap[]): MaterialsMap {
  const result: MaterialsMap = {};
  maps.forEach((map) => {
    Object.entries(map).forEach(([id, count]) => {
      const key = Number(id);
      result[key] = (result[key] || 0) + count;
    });
  });
  return result;
}

/**
 * 단일 캐릭터 육성 계획에 필요한 모든 재료 계산
 */
export function calculateRequiredMaterials(
  plan: CharacterPlan,
  characterResonanceType: string
): MaterialsMap {
  const { characterId, current, target } = plan;

  const resonanceMats = calculateResonanceMaterials(
    characterId,
    current.resonance,
    target.resonance
  );

  const patternMats = calculateResonancePatternMaterials(
    characterId,
    characterResonanceType,
    target.resonancePatterns
  );

  const euphoriaMats = calculateEuphoriaMaterials(
    characterId,
    current.euphoriaLevels,
    target.euphoriaLevels,
    current.zoneLevel,
    target.zoneLevel
  );

  const levelMats = calculateLevelMaterials(
    current.insight,
    current.level,
    target.insight,
    target.level
  );

  const insightMats = calculateInsightMaterials(
    characterId,
    current.insight,
    target.insight
  );

  return mergeMaterialsMaps(
    resonanceMats,
    patternMats,
    euphoriaMats,
    levelMats,
    insightMats
  );
}

/**
 * 여러 캐릭터 계획의 재료를 합산
 */
export function aggregateMaterials(
  plans: CharacterPlan[],
  characterResonanceTypes: Record<number, string>
): MaterialsMap {
  const activePlans = plans.filter((plan) => plan.isActive);
  const materialsMaps = activePlans.map((plan) => {
    const resonanceType = characterResonanceTypes[plan.characterId] || "";
    return calculateRequiredMaterials(plan, resonanceType);
  });
  return mergeMaterialsMaps(...materialsMaps);
}

/**
 * 부족분 계산: 보유 재료와 필요 재료를 비교
 */
export function calculateDeficit(
  owned: UserMaterials,
  required: MaterialsMap
): MaterialRequirement[] {
  const requirements: MaterialRequirement[] = [];

  // 필요한 재료 목록을 순회
  Object.entries(required).forEach(([id, requiredCount]) => {
    const materialId = Number(id);
    const ownedCount = owned[materialId] || 0;
    const deficit = Math.max(0, requiredCount - ownedCount);
    const surplus = Math.max(0, ownedCount - requiredCount);

    requirements.push({
      materialId,
      required: requiredCount,
      owned: ownedCount,
      deficit,
      surplus,
    });
  });

  // 부족한 재료를 먼저 정렬
  requirements.sort((a, b) => {
    if (a.deficit > 0 && b.deficit === 0) return -1;
    if (a.deficit === 0 && b.deficit > 0) return 1;
    return b.deficit - a.deficit;
  });

  return requirements;
}
