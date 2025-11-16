/**
 * Growth Calculator localStorage Utility Functions
 * 육성 계산기의 데이터를 localStorage에 저장/불러오기하는 유틸리티 함수
 */

import { UserMaterials, CharacterPlan, STORAGE_KEYS } from "../types/growthCalculatorTypes";

/**
 * 보유 재료 데이터를 localStorage에 저장
 */
export function saveUserMaterials(materials: UserMaterials): void {
  try {
    const json = JSON.stringify(materials);
    localStorage.setItem(STORAGE_KEYS.MATERIALS, json);
  } catch (error) {
    console.error("Failed to save user materials:", error);
    // localStorage quota exceeded 등의 에러 처리
    if (error instanceof Error && error.name === "QuotaExceededError") {
      alert("저장 공간이 부족합니다. 일부 데이터를 삭제해주세요.");
    }
  }
}

/**
 * localStorage에서 보유 재료 데이터를 불러오기
 */
export function loadUserMaterials(): UserMaterials {
  try {
    const json = localStorage.getItem(STORAGE_KEYS.MATERIALS);
    if (!json) return {};
    return JSON.parse(json) as UserMaterials;
  } catch (error) {
    console.error("Failed to load user materials:", error);
    return {};
  }
}

/**
 * 캐릭터 육성 계획 목록을 localStorage에 저장
 */
export function saveCharacterPlans(plans: CharacterPlan[]): void {
  try {
    const json = JSON.stringify(plans);
    localStorage.setItem(STORAGE_KEYS.PLANS, json);
  } catch (error) {
    console.error("Failed to save character plans:", error);
    if (error instanceof Error && error.name === "QuotaExceededError") {
      alert("저장 공간이 부족합니다. 일부 계획을 삭제해주세요.");
    }
  }
}

/**
 * localStorage에서 캐릭터 육성 계획 목록을 불러오기
 */
export function loadCharacterPlans(): CharacterPlan[] {
  try {
    const json = localStorage.getItem(STORAGE_KEYS.PLANS);
    if (!json) return [];
    return JSON.parse(json) as CharacterPlan[];
  } catch (error) {
    console.error("Failed to load character plans:", error);
    return [];
  }
}

/**
 * 모든 육성 계산기 데이터를 localStorage에서 삭제
 */
export function clearAllGrowthCalculatorData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.MATERIALS);
    localStorage.removeItem(STORAGE_KEYS.PLANS);
  } catch (error) {
    console.error("Failed to clear growth calculator data:", error);
  }
}
