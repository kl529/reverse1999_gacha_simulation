/**
 * Growth Calculator Type Definitions
 * 다중 캐릭터 육성 계산기 시스템의 타입 정의
 */

/**
 * 사용자가 보유한 재료 정보
 * Key: material ID, Value: count
 */
export type UserMaterials = Record<number, number>;

/**
 * 캐릭터의 육성 상태 (현재 또는 목표)
 */
export interface GrowthState {
  insight: number; // 통찰 레벨 [0-3]
  level: number; // 캐릭터 레벨 [1-60]
  resonance: number; // 공명 레벨 [1-15]
  euphoriaLevels: number[]; // 활성화된 광상 레벨 배열
  zoneLevel: number; // 존 레벨 [0-4]
}

/**
 * 캐릭터 육성 계획
 */
export interface CharacterPlan {
  id: string; // 고유 식별자 (UUID)
  characterId: number; // 캐릭터 ID
  isActive: boolean; // 활성화 여부 (비활성화 시 계산에서 제외)
  current: GrowthState; // 현재 상태
  target: GrowthState & {
    resonancePatterns: number[]; // 목표 공명 변조 패턴 (최대 5개)
  }; // 목표 상태
  createdAt: number; // 생성 시간 (timestamp)
  updatedAt: number; // 수정 시간 (timestamp)
}

/**
 * 재료 필요량 정보
 */
export interface MaterialRequirement {
  materialId: number;
  required: number; // 필요한 수량
  owned: number; // 보유한 수량
  deficit: number; // 부족한 수량 (max(0, required - owned))
  surplus: number; // 남는 수량 (max(0, owned - required))
}

/**
 * 재료 계산 결과
 * Key: material ID, Value: required count
 */
export type MaterialsMap = Record<number, number>;

/**
 * localStorage 저장 키
 */
export const STORAGE_KEYS = {
  MATERIALS: "growth_calculator_materials",
  PLANS: "growth_calculator_plans",
} as const;
