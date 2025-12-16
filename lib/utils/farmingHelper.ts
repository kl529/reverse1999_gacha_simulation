import { MaterialRequirement, UserMaterials } from "@/lib/types/growthCalculatorTypes";
import { materialList } from "@/data/material";
import { getStagesForMaterial, getEfficiencyPerEnergy } from "@/data/farming_stages";
import { getCraftingRecipe } from "@/data/material_crafting";

// 디버깅용 헬퍼 함수 (현재 미사용)
// function getMaterialName(id: number): string {
//   const material = materialList.find((m) => m.id === id);
//   return material ? `${material.name}(${id})` : `알수없음(${id})`;
// }

export interface MaterialDropInfo {
  materialId: number;
  materialName: string;
  required: number; // 총 필요 수량 (하위 재료로 분해된 경우 하위 재료 수량)
  deficit: number; // 초기 부족량 (required - 초기 보유량)
  rarity: number;
  isSubMaterial?: boolean; // 상위 재료 파밍 중 함께 얻어지는 하위 재료
  // 합성된 재료인 경우, 원본 4성 재료 정보
  parentMaterialId?: number; // 합성할 4성 재료 ID
  parentRequired?: number; // 4성 재료 필요 수량
  // 파밍 횟수 정보
  runsNeeded?: number; // 필요한 스테이지 클리어 횟수
  isGuaranteedDrop?: boolean; // 확정 드롭 여부
}

export interface StageRecommendation {
  stageId: number;
  stageName: string;
  category: "Hard" | "Story";
  cost: number;
  materials: MaterialDropInfo[];
  priority: number; // 우선순위 점수 (높을수록 좋음)
}

export interface FarmingRecommendations {
  highPriority: StageRecommendation[]; // 4,5성 재료 파밍 스테이지
  lowPriority: StageRecommendation[]; // 3성 이하 재료만 파밍하는 스테이지
}

/**
 * 조합 재료를 재귀적으로 계산하여 실제 필요한 하위 재료를 모두 합산합니다.
 * 예: 침대 밑 괴물 1개 필요 → 이빨 상자 3개, 신성한 은괴 1개, 스마트 버드 2개 필요
 *
 * 핵심 원칙:
 * 1. 보유량이 충분한 재료는 조합하지 않음 (사용자가 이미 가지고 있음)
 * 2. 조합 효율 판단은 groupDeficitsByStage에서만 수행 (중복 제거)
 * 3. 조합 가능한 모든 4성 이상 재료를 하위 재료로 펼침
 *
 * @param requirements 필요한 재료 목록
 * @param userMaterials 사용자 보유 재료 (모든 재료의 보유량)
 */
export function expandCraftingRequirements(
  requirements: MaterialRequirement[],
  userMaterials: UserMaterials = {}
): MaterialRequirement[] {
  const requiredMap = new Map<number, number>(); // materialId -> 필요 수량

  // 1. 필요량 저장
  requirements.forEach((req) => {
    requiredMap.set(req.materialId, (requiredMap.get(req.materialId) || 0) + req.required);
  });

  // 2. 조합이 필요한 재료 찾기 (4성 이상, 보유량 부족)
  const materialsToExpand: Array<{ id: number; quantity: number; rarity: number }> = [];
  requiredMap.forEach((quantity, materialId) => {
    if (quantity === 0) return;

    // 보유량이 충분하면 조합하지 않음
    const owned = userMaterials[materialId] || 0;
    if (owned >= quantity) return; // ✅ 핵심 개선: 보유량 우선

    const material = materialList.find((m) => m.id === materialId);
    if (!material || material.rarity < 4) return;

    const recipe = getCraftingRecipe(materialId);
    if (!recipe) return;

    // 조합 가능하면 펼치기 (효율 판단 제거)
    materialsToExpand.push({ id: materialId, quantity, rarity: material.rarity });
  });

  // ✅ 중요: 희귀도 역순으로 정렬 (6성 → 5성 → 4성)
  // 상위 재료를 먼저 처리해야 하위 재료 요구량이 정확해짐
  materialsToExpand.sort((a, b) => b.rarity - a.rarity);

  // 3. 조합 재료를 하위 재료로 펼치기 (보유량 + 조합 가능량 고려)
  materialsToExpand.forEach(({ id }) => {
    const recipe = getCraftingRecipe(id);
    if (!recipe) return;

    // ✅ 중요: 현재 requiredMap의 값을 사용 (이전 처리에서 변경되었을 수 있음)
    const currentRequired = requiredMap.get(id) || 0;
    if (currentRequired === 0) {
      // 이미 다른 재료 처리에서 해결됨
      return;
    }

    // 직접 보유량 확인
    const owned = userMaterials[id] || 0;
    let actualDeficit = Math.max(0, currentRequired - owned);

    // 보유량이 충분하면 하위 재료 추가 안 함
    if (actualDeficit === 0) {
      return;
    }

    // 하위 재료로 조합 가능한지 확인
    let maxCraftable = Infinity;
    recipe.materials.forEach((subMatId, index) => {
      if (subMatId === 1002) return; // 톱니 동전 제외

      const subOwned = userMaterials[subMatId] || 0;
      const neededPerCraft = recipe.quantities[index];
      const craftableFromThis = Math.floor(subOwned / neededPerCraft);

      maxCraftable = Math.min(maxCraftable, craftableFromThis);
    });

    if (maxCraftable === Infinity) maxCraftable = 0;

    // 조합 가능한 개수가 부족량보다 많거나 같으면
    if (maxCraftable >= actualDeficit) {
      // 하위 재료로 전부 조합 가능! 파밍 불필요
      requiredMap.set(id, 0); // 상위 재료 제거

      // 조합에 사용되는 하위 재료 양을 필요량에서 차감
      recipe.materials.forEach((subMatId, index) => {
        if (subMatId === 1002) return; // 톱니 동전 제외

        const neededPerCraft = recipe.quantities[index];
        const totalConsumed = neededPerCraft * actualDeficit;

        const currentRequired = requiredMap.get(subMatId) || 0;
        const newRequired = Math.max(0, currentRequired - totalConsumed);
        // 조합에 사용되는 만큼 필요량에서 차감 (음수 방지)
        requiredMap.set(subMatId, newRequired);
      });

      return;
    }

    // 일부만 조합 가능하면:

    // 1. 조합 가능한 만큼은 기존 필요량에서 차감
    recipe.materials.forEach((subMatId, index) => {
      if (subMatId === 1002) return;

      const neededPerCraft = recipe.quantities[index];
      const consumedByCrafting = neededPerCraft * maxCraftable;

      const currentRequired = requiredMap.get(subMatId) || 0;
      const newRequired = Math.max(0, currentRequired - consumedByCrafting);
      requiredMap.set(subMatId, newRequired);
    });

    // 2. 나머지만 하위 재료로 추가
    actualDeficit = actualDeficit - maxCraftable;

    // 실제 부족분만큼만 하위 재료 추가
    recipe.materials.forEach((subMatId, index) => {
      if (subMatId === 1002) return; // 톱니 동전 제외

      const neededPerCraft = recipe.quantities[index];
      const totalNeeded = neededPerCraft * actualDeficit;

      const current = requiredMap.get(subMatId) || 0;
      const newRequired = current + totalNeeded;
      requiredMap.set(subMatId, newRequired);
    });

    // 상위 재료는 필요량에서 제거 (하위 재료로 대체됨)
    requiredMap.set(id, 0);
  });

  // 4. 새로 추가된 4성 이상 재료를 다시 조합 대상으로 추가

  const processedMaterials = new Set(materialsToExpand.map((m) => m.id));
  const newMaterialsToExpand: Array<{ id: number; quantity: number; rarity: number }> = [];

  requiredMap.forEach((quantity, materialId) => {
    if (quantity === 0) return;
    if (processedMaterials.has(materialId)) return; // 이미 처리됨

    const owned = userMaterials[materialId] || 0;
    if (owned >= quantity) return;

    const material = materialList.find((m) => m.id === materialId);
    if (!material || material.rarity < 4) return;

    const recipe = getCraftingRecipe(materialId);
    if (!recipe) return;

    newMaterialsToExpand.push({ id: materialId, quantity, rarity: material.rarity });
  });

  // 희귀도 역순 정렬
  newMaterialsToExpand.sort((a, b) => b.rarity - a.rarity);

  // 새로운 재료들을 다시 처리
  newMaterialsToExpand.forEach(({ id }) => {
    const recipe = getCraftingRecipe(id);
    if (!recipe) return;

    const currentRequired = requiredMap.get(id) || 0;
    if (currentRequired === 0) {
      return;
    }

    const owned = userMaterials[id] || 0;
    let actualDeficit = Math.max(0, currentRequired - owned);

    if (actualDeficit === 0) {
      return;
    }

    // 하위 재료로 조합 가능한지 확인
    let maxCraftable = Infinity;
    recipe.materials.forEach((subMatId, index) => {
      if (subMatId === 1002) return;

      const subOwned = userMaterials[subMatId] || 0;
      const neededPerCraft = recipe.quantities[index];
      const craftableFromThis = Math.floor(subOwned / neededPerCraft);

      maxCraftable = Math.min(maxCraftable, craftableFromThis);
    });

    if (maxCraftable === Infinity) maxCraftable = 0;

    if (maxCraftable >= actualDeficit) {
      // 완전 조합 가능
      requiredMap.set(id, 0);

      recipe.materials.forEach((subMatId, index) => {
        if (subMatId === 1002) return;

        const neededPerCraft = recipe.quantities[index];
        const totalConsumed = neededPerCraft * actualDeficit;

        const currentReq = requiredMap.get(subMatId) || 0;
        const newReq = Math.max(0, currentReq - totalConsumed);
        requiredMap.set(subMatId, newReq);
      });
    } else {
      // 일부만 조합 가능

      recipe.materials.forEach((subMatId, index) => {
        if (subMatId === 1002) return;

        const neededPerCraft = recipe.quantities[index];
        const consumedByCrafting = neededPerCraft * maxCraftable;

        const currentReq = requiredMap.get(subMatId) || 0;
        const newReq = Math.max(0, currentReq - consumedByCrafting);
        requiredMap.set(subMatId, newReq);
      });

      actualDeficit = actualDeficit - maxCraftable;

      recipe.materials.forEach((subMatId, index) => {
        if (subMatId === 1002) return;

        const neededPerCraft = recipe.quantities[index];
        const totalNeeded = neededPerCraft * actualDeficit;

        const currentReq = requiredMap.get(subMatId) || 0;
        const newReq = currentReq + totalNeeded;
        requiredMap.set(subMatId, newReq);
      });

      requiredMap.set(id, 0);
    }
  });

  // 5. 결과 생성 (userMaterials에서 보유량 가져오기)
  const result: MaterialRequirement[] = [];

  requiredMap.forEach((required, materialId) => {
    const owned = userMaterials[materialId] || 0;
    const deficit = Math.max(0, required - owned);
    const surplus = Math.max(0, owned - required);

    // 필요하거나 보유한 재료만 포함
    if (required > 0 || owned > 0) {
      result.push({
        materialId,
        required,
        owned,
        deficit,
        surplus,
      });
    }
  });

  return result;
}

/**
 * 재료를 직접 파밍하는 것과 조합하는 것의 효율을 비교 (현재 미사용)
 * @returns true면 조합이 더 효율적, false면 직접 파밍이 더 효율적
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isCraftingMoreEfficient(materialId: number): boolean {
  const recipe = getCraftingRecipe(materialId);
  if (!recipe) return false; // 조합 불가능하면 직접 파밍

  // 직접 드롭 스테이지 찾기
  const directStages = getStagesForMaterial(materialId);
  if (directStages.length === 0) return true; // 드롭 스테이지가 없으면 무조건 조합

  // 직접 파밍 효율 계산 (체력 1당 기대 드롭 수)
  let bestDirectEfficiency = 0;
  directStages.forEach((stage) => {
    const efficiency = getEfficiencyPerEnergy(stage.id, materialId);
    if (efficiency > bestDirectEfficiency) {
      bestDirectEfficiency = efficiency;
    }
  });

  // 조합 효율 계산
  let totalCraftingEfficiency = 0;
  let canCraft = true;

  recipe.materials.forEach((subMatId, index) => {
    // 톱니 동전(1002)은 계산에서 제외 (무한)
    if (subMatId === 1002) return;

    const subStages = getStagesForMaterial(subMatId);
    if (subStages.length === 0) {
      canCraft = false;
      return;
    }

    // 하위 재료의 최고 효율 스테이지
    let bestSubEfficiency = 0;
    subStages.forEach((stage) => {
      const efficiency = getEfficiencyPerEnergy(stage.id, subMatId);
      if (efficiency > bestSubEfficiency) {
        bestSubEfficiency = efficiency;
      }
    });

    // 필요한 수량만큼 효율 계산
    const neededQuantity = recipe.quantities[index];
    totalCraftingEfficiency += bestSubEfficiency / neededQuantity;
  });

  if (!canCraft) return false;

  // 조합 효율이 직접 파밍보다 1.2배 이상 좋으면 조합 추천
  // (조합에는 시간과 노력이 더 들어가므로 여유를 둠)
  return totalCraftingEfficiency > bestDirectEfficiency * 1.2;
}

/**
 * 부족한 재료를 기반으로 파밍 스테이지를 추천합니다.
 * 조합법을 고려하여, 조합이 더 효율적이면 하위 재료 파밍을 추천합니다.
 */
export function groupDeficitsByStage(
  deficitMaterials: MaterialRequirement[],
  userMaterials: UserMaterials = {} // eslint-disable-line @typescript-eslint/no-unused-vars
): FarmingRecommendations {
  // 1. 부족한 재료만 필터링
  const farmableMaterials = deficitMaterials.filter((req) => {
    if (req.deficit <= 0) return false;

    const material = materialList.find((m) => m.id === req.materialId);
    if (!material) return false;

    return (
      // 육성 재료 + 통찰 재료 포함, 기본 재료(먼지, 동전) 포함
      (material.category === "growth_material" ||
        material.category === "insight_material" ||
        material.id === 1001 ||
        material.id === 1002) &&
      [2, 3, 4, 5].includes(material.rarity) &&
      material.id !== 301
    );
  });

  if (farmableMaterials.length === 0) {
    return { highPriority: [], lowPriority: [] };
  }

  // 2. 5성 이상 재료는 하위 재료로 분해, 4성 이하는 그대로 파밍
  const materialsToFarm: MaterialRequirement[] = [];

  farmableMaterials.forEach((req) => {
    const material = materialList.find((m) => m.id === req.materialId);
    if (!material) return;

    // 예외: 통찰 재료(insight_material)와 먼지(1001)는 성급과 상관없이 직접 파밍
    const isInsightMaterial = material.category === "insight_material";
    const isDust = material.id === 1001;

    if (isInsightMaterial || isDust) {
      // 통찰 재료와 먼지는 항상 직접 파밍
      materialsToFarm.push({ ...req });
      return;
    }

    // 5성 이상 육성 재료는 합성 권장 → 하위 재료로 분해
    if (material.rarity >= 5 && material.category === "growth_material") {
      const recipe = getCraftingRecipe(req.materialId);
      if (recipe) {
        // 하위 재료를 파밍 대상에 추가
        recipe.materials.forEach((subMatId, index) => {
          if (subMatId === 1002) return; // 톱니 동전 제외

          const subMat = materialList.find((m) => m.id === subMatId);
          if (!subMat) return;

          // 필요한 수량 계산
          const neededQuantity = recipe.quantities[index] * req.deficit;

          // 이미 목록에 있으면 수량 더하기
          const existingReq = materialsToFarm.find((r) => r.materialId === subMatId);
          if (existingReq) {
            existingReq.deficit += neededQuantity;
            existingReq.required += neededQuantity;
          } else {
            // 새로운 파밍 대상 추가
            materialsToFarm.push({
              materialId: subMatId,
              required: neededQuantity,
              owned: 0,
              deficit: neededQuantity,
              surplus: 0,
            });
          }
        });
      } else {
        // 조합법이 없으면 그대로 추가 (fallback)
        materialsToFarm.push({ ...req });
      }
    } else {
      // 4성 이하 또는 기타 재료는 직접 파밍
      materialsToFarm.push({ ...req });
    }
  });

  // 3. 우선순위별로 분류
  // 우선 파밍: 4성 이상 + 통찰 재료(전체) + 먼지/동전
  const highRarityMaterials = materialsToFarm.filter((req) => {
    const m = materialList.find((mat) => mat.id === req.materialId);
    if (!m) return false;

    // 통찰 재료는 성급 무관하게 우선 파밍
    if (m.category === "insight_material") return true;

    // 먼지/동전도 우선 파밍
    if (m.id === 1001 || m.id === 1002) return true;

    // 육성 재료는 4성 이상만
    return m.rarity >= 4;
  });

  // 하위 재료 파밍: 3성 이하 육성 재료만 (통찰/먼지/동전 제외)
  const lowRarityMaterials = materialsToFarm.filter((req) => {
    const m = materialList.find((mat) => mat.id === req.materialId);
    if (!m) return false;

    // 통찰 재료는 제외 (이미 우선 파밍에 포함)
    if (m.category === "insight_material") return false;

    // 먼지/동전 제외 (이미 우선 파밍에 포함)
    if (m.id === 1001 || m.id === 1002) return false;

    // 3성 이하 육성 재료만
    return m.rarity <= 3;
  });

  // 4. 4,5성 재료 파밍 스테이지 생성
  const highPriorityStages = createStageRecommendations(highRarityMaterials, materialsToFarm);

  // 5. 3성 이하 재료 중 아직 할당되지 않은 재료만 파밍 스테이지 생성
  const assignedMaterials = new Set<number>();
  highPriorityStages.forEach((stage) => {
    stage.materials.forEach((mat) => assignedMaterials.add(mat.materialId));
  });

  const remainingLowRarity = lowRarityMaterials.filter(
    (req) => !assignedMaterials.has(req.materialId)
  );

  const lowPriorityStages = createStageRecommendations(remainingLowRarity, remainingLowRarity);

  return {
    highPriority: highPriorityStages,
    lowPriority: lowPriorityStages,
  };
}

/**
 * 특정 재료에 대한 최적 파밍 스테이지를 찾습니다
 */
function findBestStage(materialId: number) {
  const stages = getStagesForMaterial(materialId);
  if (stages.length === 0) return null;

  let bestStage = stages[0];
  let bestEfficiency = getEfficiencyPerEnergy(bestStage.id, materialId);

  stages.forEach((stage) => {
    const efficiency = getEfficiencyPerEnergy(stage.id, materialId);
    if (efficiency > bestEfficiency) {
      bestEfficiency = efficiency;
      bestStage = stage;
    }
  });

  return bestStage;
}

/**
 * 재료 목록에서 파밍 스테이지 추천 생성
 */
function createStageRecommendations(
  targetMaterials: MaterialRequirement[],
  allDeficitMaterials: MaterialRequirement[]
): StageRecommendation[] {
  if (targetMaterials.length === 0) return [];

  const sortedMaterials = [...targetMaterials].sort((a, b) => {
    const matA = materialList.find((m) => m.id === a.materialId);
    const matB = materialList.find((m) => m.id === b.materialId);
    return (matB?.rarity || 0) - (matA?.rarity || 0);
  });

  const assignedMaterials = new Set<number>();
  const stageMap = new Map<number, StageRecommendation>();

  sortedMaterials.forEach((req) => {
    if (assignedMaterials.has(req.materialId)) return;

    const material = materialList.find((m) => m.id === req.materialId);
    if (!material) return;

    const bestStage = findBestStage(req.materialId);
    if (!bestStage) return;

    // 필요한 스테이지 클리어 횟수 계산
    const drop = bestStage.drops.find((d) => d.materialId === req.materialId);
    let runsNeeded = 0;
    let isGuaranteedDrop = false;

    if (drop) {
      // 확정 드롭 판단: totalAttempts가 1이면 확정 드롭 (통찰 재료, 먼지/동전 등)
      isGuaranteedDrop = bestStage.totalAttempts === 1;

      if (isGuaranteedDrop) {
        // 확정 드롭: 정확한 횟수 계산
        const dropsPerRun = drop.count; // 1회당 드롭 개수
        runsNeeded = Math.ceil(req.deficit / dropsPerRun);
      } else {
        // 확률 드롭: 기대값으로 횟수 추정
        const dropRate = drop.count / bestStage.totalAttempts;
        runsNeeded = Math.ceil(req.deficit / dropRate);
      }
    }

    const mainMaterial: MaterialDropInfo = {
      materialId: req.materialId,
      materialName: material.name,
      required: req.required,
      deficit: req.deficit,
      rarity: material.rarity,
      isSubMaterial: false,
      runsNeeded,
      isGuaranteedDrop,
    };

    // 이 스테이지에서 함께 드롭되는 다른 부족한 재료 찾기
    const subMaterials: MaterialDropInfo[] = [];
    const lowRarityMaterials: Array<{ material: MaterialDropInfo; dropRate: number }> = [];

    bestStage.drops.forEach((drop) => {
      if (drop.materialId === req.materialId) return;
      if (assignedMaterials.has(drop.materialId)) return;

      const otherReq = allDeficitMaterials.find((r) => r.materialId === drop.materialId);
      if (!otherReq) return;

      // 실제로 부족한 재료만 표시 (surplus가 있거나 deficit이 0이면 제외)
      if (otherReq.deficit <= 0) return;

      const otherMat = materialList.find((m) => m.id === drop.materialId);
      if (!otherMat) return;

      // 서브 재료의 필요 횟수 계산
      const subIsGuaranteedDrop = bestStage.totalAttempts === 1;
      const subDropRate = drop.count / bestStage.totalAttempts;
      const subRunsNeeded = subIsGuaranteedDrop
        ? Math.ceil(otherReq.deficit / drop.count)
        : Math.ceil(otherReq.deficit / subDropRate);

      const materialInfo: MaterialDropInfo = {
        materialId: drop.materialId,
        materialName: otherMat.name,
        required: otherReq.required,
        deficit: otherReq.deficit,
        rarity: otherMat.rarity,
        isSubMaterial: true,
        runsNeeded: subRunsNeeded,
        isGuaranteedDrop: subIsGuaranteedDrop,
      };

      // 4성 이상은 모두 표시
      if (otherMat.rarity >= 4) {
        subMaterials.push(materialInfo);
        assignedMaterials.add(drop.materialId);
      } else {
        // 3성 이하는 드롭률 계산해서 나중에 정렬
        const dropRate = (drop.count / bestStage.totalAttempts) * 100;
        lowRarityMaterials.push({ material: materialInfo, dropRate });
      }
    });

    // 3성 이하 재료는 드롭률 높은 순으로 최대 2개만 추가
    lowRarityMaterials
      .sort((a, b) => b.dropRate - a.dropRate)
      .slice(0, 2)
      .forEach(({ material }) => {
        subMaterials.push(material);
        assignedMaterials.add(material.materialId);
      });

    assignedMaterials.add(req.materialId);

    const allMaterials = [mainMaterial, ...subMaterials];

    if (stageMap.has(bestStage.id)) {
      const existing = stageMap.get(bestStage.id)!;
      existing.materials.push(...allMaterials);
    } else {
      stageMap.set(bestStage.id, {
        stageId: bestStage.id,
        stageName: bestStage.name,
        category: bestStage.category,
        cost: bestStage.cost,
        materials: allMaterials,
        priority: 0,
      });
    }
  });

  // 아직 할당되지 않은 재료들 처리 (fallback)
  sortedMaterials.forEach((req) => {
    if (assignedMaterials.has(req.materialId)) return;

    const material = materialList.find((m) => m.id === req.materialId);
    if (!material) return;

    const bestStage = findBestStage(req.materialId);
    if (!bestStage) return;

    const materialInfo: MaterialDropInfo = {
      materialId: req.materialId,
      materialName: material.name,
      required: req.required,
      deficit: req.deficit,
      rarity: material.rarity,
      isSubMaterial: false,
    };

    assignedMaterials.add(req.materialId);

    if (stageMap.has(bestStage.id)) {
      stageMap.get(bestStage.id)!.materials.push(materialInfo);
    } else {
      stageMap.set(bestStage.id, {
        stageId: bestStage.id,
        stageName: bestStage.name,
        category: bestStage.category,
        cost: bestStage.cost,
        materials: [materialInfo],
        priority: 0,
      });
    }
  });

  const recommendations = Array.from(stageMap.values()).map((rec) => {
    rec.materials.sort((a, b) => {
      if (a.isSubMaterial !== b.isSubMaterial) {
        return a.isSubMaterial ? 1 : -1;
      }
      return b.rarity - a.rarity;
    });

    rec.priority = calculateStagePriority(rec.materials, rec.cost);

    return rec;
  });

  return recommendations.sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    if (b.materials.length !== a.materials.length) {
      return b.materials.length - a.materials.length;
    }
    return a.cost - b.cost;
  });
}

/**
 * 스테이지 우선순위 점수 계산
 */
function calculateStagePriority(materials: MaterialDropInfo[], cost: number): number {
  let score = 0;

  score += materials.length * 100;

  materials.forEach((m) => {
    const weight = m.isSubMaterial ? 0.5 : 1;
    if (m.rarity === 5) score += 500 * weight;
    else if (m.rarity === 4) score += 200 * weight;
    else if (m.rarity === 3) score += 50 * weight;
    else if (m.rarity === 2) score += 10 * weight;
  });

  score -= cost * 2;

  return Math.round(score);
}
