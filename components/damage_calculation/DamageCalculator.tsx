"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import BuffManager from "./BuffManager";
import DamageFormulaModal from "./DamageFormulaModal";

// 버프 타입 정의
export interface Buff {
  id: string;
  name: string;
  type: keyof Stats;
  value: number; // 퍼센트 값 (예: 10은 10%)
  isPercent: boolean;
}

// 스탯 타입 정의
export interface Stats {
  // 공격력
  attack: number; // 최종 공격력
  attackPercent: number; // 전투 진입 후 공격% 버프
  attackFlat: number; // 고정 수치 공격 버프

  // 방어력
  realityDefense: number;
  mentalDefense: number;
  defenseIgnore: number;
  defenseReduction: number;

  // 피해 관련
  damageBonus: number;
  damageDealt: number;
  enemyDamageTaken: number; // 적 받는 피해 증가 (공격자용)
  damageReduction: number;

  // 치명타
  critRate: number; // 치명타 기술
  critDamagePercent: number; // 치명타 피해%
  critDefense: number;
  enemyCritDefenseReduction: number; // 적 치명타 방어 감소 (공격자용)

  // 위력
  incantationPower: number;
  ritualPower: number;
  powerReduction: number; // 위력 감소

  // 스킬
  baseCoefficient: number; // 기본 계수
  additionalCoefficient: number; // 추가 피해 계수
  extraAttackCoefficient: number; // 추공 계수
}

export default function DamageCalculator() {
  // 공격자 스탯
  const [attackerStats, setAttackerStats] = useState<Stats>({
    attack: 1000,
    attackPercent: 0,
    attackFlat: 0,
    realityDefense: 0,
    mentalDefense: 0,
    defenseIgnore: 0,
    defenseReduction: 0,
    damageBonus: 0,
    damageDealt: 0,
    enemyDamageTaken: 0,
    damageReduction: 0,
    critRate: 1000,
    critDamagePercent: 0,
    critDefense: 0,
    enemyCritDefenseReduction: 0,
    incantationPower: 0,
    ritualPower: 0,
    powerReduction: 0,
    baseCoefficient: 100,
    additionalCoefficient: 0,
    extraAttackCoefficient: 0,
  });

  // 방어자 스탯
  const [defenderStats, setDefenderStats] = useState<Stats>({
    attack: 0,
    attackPercent: 0,
    attackFlat: 0,
    realityDefense: 500,
    mentalDefense: 500,
    defenseIgnore: 0,
    defenseReduction: 0,
    damageBonus: 0,
    damageDealt: 0,
    enemyDamageTaken: 0,
    damageReduction: 0,
    critRate: 0,
    critDamagePercent: 0,
    critDefense: 0,
    enemyCritDefenseReduction: 0,
    incantationPower: 0,
    ritualPower: 0,
    powerReduction: 0,
    baseCoefficient: 0,
    additionalCoefficient: 0,
    extraAttackCoefficient: 0,
  });

  // 공격자 버프
  const [attackerBuffs, setAttackerBuffs] = useState<Buff[]>([]);

  // 방어자 디버프
  const [defenderBuffs, setDefenderBuffs] = useState<Buff[]>([]);

  // 옵션
  const [attackType, setAttackType] = useState<"reality" | "mental">("reality"); // 현실/정신 공격
  const [powerType, setPowerType] = useState<"incantation" | "ritual">("incantation"); // 주문/술식
  const [useElementAdvantage, setUseElementAdvantage] = useState(false);
  const [useCritical, setUseCritical] = useState(false);

  // 모달 상태
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);

  // 버프 적용 함수
  const applyBuffs = (baseStats: Stats, buffs: Buff[]): Stats => {
    const result = { ...baseStats };

    buffs.forEach((buff) => {
      if (buff.isPercent) {
        result[buff.type] += baseStats[buff.type] * (buff.value / 100);
      } else {
        result[buff.type] += buff.value;
      }
    });

    return result;
  };

  // 데미지 계산 함수 (상세 공식 적용)
  const calculateDamage = () => {
    // 버프가 적용된 스탯 계산
    const finalAttackerStats = applyBuffs(attackerStats, attackerBuffs);
    const finalDefenderStats = applyBuffs(defenderStats, defenderBuffs);

    // === 1. 최종 공격력 계산 ===
    const finalAttack =
      finalAttackerStats.attack +
      Math.floor(finalAttackerStats.attack * (finalAttackerStats.attackPercent / 100)) +
      Math.floor(finalAttackerStats.attackFlat);

    // === 2. 최종 방어력 계산 ===
    const defense =
      attackType === "reality"
        ? finalDefenderStats.realityDefense
        : finalDefenderStats.mentalDefense;
    const defenseReduction = finalAttackerStats.defenseReduction / 100;
    const defenseIgnore = Math.min(finalAttackerStats.defenseIgnore / 100, 1.0); // 최대 100%
    const finalDefense = Math.ceil(defense * (1 - defenseReduction)) * (1 - defenseIgnore);

    // === 3. A항: 기본 데미지 (최소값 보장) ===
    const A1 = finalAttack - finalDefense;
    const A0 = finalAttack * 0.1;
    const A = Math.max(A1, A0);
    const isMinDamage = A1 < A0; // 최소 데미지인 경우 추가 피해 계수 무시

    // === 4. B항: 최종 피해 배율 (최소 30%) ===
    const damageBonus = finalAttackerStats.damageBonus / 100;
    const damageDealt = finalAttackerStats.damageDealt / 100;
    const attackerEnemyDamageTaken = finalAttackerStats.enemyDamageTaken / 100; // 공격자의 적 받는 피해 증가
    const damageReduction = finalDefenderStats.damageReduction / 100;
    const B = Math.max(
      1 + damageBonus + damageDealt + attackerEnemyDamageTaken - damageReduction,
      0.3
    );

    // === 5. C항: 최종 치명타 피해 (최소 110%) ===
    let C = 1.0;
    let critFromRate = 0;
    if (useCritical) {
      critFromRate = Math.floor((finalAttackerStats.critRate / 2000) * 10000) / 10000; // 넷째자리 내림
      const critDamagePercent = finalAttackerStats.critDamagePercent / 100;
      const defenderCritDefense = finalDefenderStats.critDefense / 100;
      const attackerCritDefenseReduction = finalAttackerStats.enemyCritDefenseReduction / 100; // 공격자의 적 치명타 방어 감소
      C = Math.max(
        1.3 + critFromRate + critDamagePercent - defenderCritDefense + attackerCritDefenseReduction,
        1.1
      );
    }

    // === 6. D항: 위력 계수 ===
    const powerIncrease =
      powerType === "incantation"
        ? finalAttackerStats.incantationPower / 100
        : finalAttackerStats.ritualPower / 100;
    const powerDecrease = finalDefenderStats.powerReduction / 100;
    const D = 1 + powerIncrease - powerDecrease;

    // === 7. E항: 스킬 계수 ===
    const baseCoeff = finalAttackerStats.baseCoefficient / 100;
    const additionalCoeff = isMinDamage ? 0 : finalAttackerStats.additionalCoefficient / 100; // 최소 데미지시 추가피해 무시
    const extraAttackCoeff = finalAttackerStats.extraAttackCoefficient / 100;
    const E = baseCoeff + additionalCoeff + extraAttackCoeff;

    // === 8. F항: 상성 계수 ===
    const F = useElementAdvantage ? 1.3 : 1.0;

    // === 9. 최종 데미지 계산 ===
    const finalDamage = Math.floor(A * B * C * D * E * F);

    return {
      final: Math.max(0, finalDamage),
      steps: {
        finalAttack,
        defense,
        finalDefense,
        defenseReduction,
        defenseIgnore,
        A,
        A1,
        A0,
        isMinDamage,
        B,
        damageBonus,
        damageDealt,
        attackerEnemyDamageTaken,
        damageReduction,
        C,
        critFromRate,
        defenderCritDefense: useCritical ? finalDefenderStats.critDefense / 100 : 0,
        attackerCritDefenseReduction: useCritical
          ? finalAttackerStats.enemyCritDefenseReduction / 100
          : 0,
        D,
        powerIncrease,
        powerDecrease,
        E,
        baseCoeff,
        additionalCoeff,
        extraAttackCoeff,
        F,
      },
    };
  };

  const damageResult = calculateDamage();

  return (
    <div className="container mx-auto max-w-7xl p-4 pb-20">
      {/* 페이지 제목 */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">데미지 계산기</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFormulaModalOpen(true)}
          className="gap-2"
        >
          <Info className="h-4 w-4" />
          계산 공식 보기
        </Button>
      </div>

      {/* Sticky 최종 데미지 표시 */}
      <div className="sticky top-0 z-50 mb-6">
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center text-white shadow-lg">
          <h3 className="mb-2 text-lg font-semibold">최종 데미지</h3>
          <p className="text-5xl font-bold">{damageResult.final.toLocaleString()}</p>
        </div>
      </div>

      {/* 계산 과정 표시 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">계산 과정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {/* 최종 공격력 */}
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="mb-1 font-medium">1. 최종 공격력</div>
              <div className="font-mono text-xs text-muted-foreground">
                = 공격력 + floor(공격력 × 공격%) + floor(고정 공격력)
              </div>
              <div className="mt-1 font-mono text-xs font-bold">
                = {Math.round(damageResult.steps.finalAttack).toLocaleString()}
              </div>
            </div>

            {/* 최종 방어력 */}
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="mb-1 font-medium">
                2. 최종 방어력 ({attackType === "reality" ? "현실" : "정신"})
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                = ceil(방어력 × (1 - 방어감소%)) × (1 - 방어무시%)
              </div>
              <div className="mt-1 font-mono text-xs">
                = ceil({Math.round(damageResult.steps.defense).toLocaleString()} × (1 -{" "}
                {(damageResult.steps.defenseReduction * 100).toFixed(1)}%)) × (1 -{" "}
                {(damageResult.steps.defenseIgnore * 100).toFixed(1)}%)
              </div>
              <div className="mt-1 font-mono text-xs font-bold">
                = {Math.round(damageResult.steps.finalDefense).toLocaleString()}
              </div>
            </div>

            {/* A항: 기본 데미지 */}
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-500/10 p-3">
              <div className="mb-1 font-medium text-blue-700 dark:text-blue-300">
                A항: 기본 데미지
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                A = max(최종공격력 - 최종방어력, 최종공격력 × 10%)
              </div>
              <div className="mt-1 font-mono text-xs">
                <span className="text-blue-600 dark:text-blue-400">A1</span> ={" "}
                {Math.round(damageResult.steps.finalAttack).toLocaleString()} -{" "}
                {Math.round(damageResult.steps.finalDefense).toLocaleString()} ={" "}
                {Math.round(damageResult.steps.A1).toLocaleString()}
              </div>
              <div className="font-mono text-xs">
                <span className="text-blue-600 dark:text-blue-400">A0</span> ={" "}
                {Math.round(damageResult.steps.finalAttack).toLocaleString()} × 10% ={" "}
                {Math.round(damageResult.steps.A0).toLocaleString()}
              </div>
              <div className="mt-1 font-mono text-xs font-bold text-blue-700 dark:text-blue-300">
                A = max(A1, A0) = {Math.round(damageResult.steps.A).toLocaleString()}
                {damageResult.steps.isMinDamage && (
                  <span className="ml-2 text-yellow-600 dark:text-yellow-400">(최소 데미지)</span>
                )}
              </div>
            </div>

            {/* B항: 피해 배율 */}
            <div className="rounded-lg border-l-4 border-purple-500 bg-purple-500/10 p-3">
              <div className="mb-1 font-medium text-purple-700 dark:text-purple-300">
                B항: 피해 배율
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                B = max(1 + 피해보너스 + 주는피해 + 적받는피해 - 피해감면, 30%)
              </div>
              <div className="mt-1 font-mono text-xs">
                = max(1 + <span className="text-purple-600 dark:text-purple-400">{(damageResult.steps.damageBonus * 100).toFixed(1)}%</span> +{" "}
                <span className="text-purple-600 dark:text-purple-400">{(damageResult.steps.damageDealt * 100).toFixed(1)}%</span> +{" "}
                <span className="text-purple-600 dark:text-purple-400">{(damageResult.steps.attackerEnemyDamageTaken * 100).toFixed(1)}%</span> -{" "}
                <span className="text-purple-600 dark:text-purple-400">{(damageResult.steps.damageReduction * 100).toFixed(1)}%</span>, 30%)
              </div>
              <div className="mt-1 font-mono text-xs font-bold text-purple-700 dark:text-purple-300">
                B = {damageResult.steps.B.toFixed(2)}
              </div>
            </div>

            {/* C항: 치명타 피해 */}
            <div className="rounded-lg border-l-4 border-red-500 bg-red-500/10 p-3">
              <div className="mb-1 font-medium text-red-700 dark:text-red-300">
                C항: 치명타 피해
              </div>
              {useCritical ? (
                <>
                  <div className="font-mono text-xs text-muted-foreground">
                    C = max(130% + 치명타변환 + 치명타피해% - 치명타방어 + 치명타방어감소, 110%)
                  </div>
                  <div className="mt-1 font-mono text-xs">
                    <span className="text-red-600 dark:text-red-400">치명타 변환</span> = floor({attackerStats.critRate} / 2000 × 10000) / 10000 ={" "}
                    <span className="text-red-600 dark:text-red-400">{damageResult.steps.critFromRate.toFixed(4)}</span>
                  </div>
                  <div className="font-mono text-xs">
                    = max(130% + <span className="text-red-600 dark:text-red-400">{(damageResult.steps.critFromRate * 100).toFixed(2)}%</span> +{" "}
                    <span className="text-red-600 dark:text-red-400">{attackerStats.critDamagePercent}%</span> -{" "}
                    <span className="text-red-600 dark:text-red-400">{defenderStats.critDefense}%</span> +{" "}
                    <span className="text-red-600 dark:text-red-400">{attackerStats.enemyCritDefenseReduction}%</span>, 110%)
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-red-700 dark:text-red-300">
                    C = {(damageResult.steps.C * 100).toFixed(2)}%
                  </div>
                </>
              ) : (
                <>
                  <div className="font-mono text-xs text-muted-foreground">
                    C = 100% (치명타 미적용)
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-red-700 dark:text-red-300">
                    C = 100%
                  </div>
                </>
              )}
            </div>

            {/* D항: 위력 계수 */}
            <div className="rounded-lg border-l-4 border-green-500 bg-green-500/10 p-3">
              <div className="mb-1 font-medium text-green-700 dark:text-green-300">
                D항: 위력 계수
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                D = 1 + {powerType === "incantation" ? "주문" : "술식"}위력 - 위력감소
              </div>
              <div className="mt-1 font-mono text-xs">
                = 1 + <span className="text-green-600 dark:text-green-400">{(damageResult.steps.powerIncrease * 100).toFixed(1)}%</span> -{" "}
                <span className="text-green-600 dark:text-green-400">{(damageResult.steps.powerDecrease * 100).toFixed(1)}%</span>
              </div>
              <div className="mt-1 font-mono text-xs font-bold text-green-700 dark:text-green-300">
                D = {damageResult.steps.D.toFixed(2)}
              </div>
            </div>

            {/* E항: 스킬 계수 */}
            <div className="rounded-lg border-l-4 border-orange-500 bg-orange-500/10 p-3">
              <div className="mb-1 font-medium text-orange-700 dark:text-orange-300">
                E항: 스킬 계수
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                E = 기본계수 + 추가피해계수 + 추공계수
              </div>
              <div className="mt-1 font-mono text-xs">
                = <span className="text-orange-600 dark:text-orange-400">{(damageResult.steps.baseCoeff * 100).toFixed(0)}%</span> +{" "}
                <span className="text-orange-600 dark:text-orange-400">{(damageResult.steps.additionalCoeff * 100).toFixed(0)}%</span>
                {damageResult.steps.isMinDamage && <span className="text-yellow-600 dark:text-yellow-400"> (무시됨)</span>} +{" "}
                <span className="text-orange-600 dark:text-orange-400">{(damageResult.steps.extraAttackCoeff * 100).toFixed(0)}%</span>
              </div>
              <div className="mt-1 font-mono text-xs font-bold text-orange-700 dark:text-orange-300">
                E = {damageResult.steps.E.toFixed(2)}
              </div>
            </div>

            {/* F항: 상성 계수 */}
            <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10 p-3">
              <div className="mb-1 font-medium text-yellow-700 dark:text-yellow-300">
                F항: 상성 계수
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                F = {useElementAdvantage ? "1.3 (상성 유리)" : "1.0 (상성 무관)"}
              </div>
              <div className="mt-1 font-mono text-xs font-bold text-yellow-700 dark:text-yellow-300">
                F = {damageResult.steps.F.toFixed(1)}
              </div>
            </div>

            {/* 최종 계산 */}
            <div className="rounded-lg border-2 border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4">
              <div className="mb-2 text-lg font-medium">최종 데미지 계산</div>
              <div className="font-mono text-xs text-muted-foreground">
                = floor(A × B × C × D × E × F)
              </div>
              <div className="mt-1 font-mono text-xs">
                = floor(
                <span className="text-blue-600 dark:text-blue-400">{Math.round(damageResult.steps.A).toLocaleString()}</span> ×{" "}
                <span className="text-purple-600 dark:text-purple-400">{damageResult.steps.B.toFixed(2)}</span> ×{" "}
                <span className="text-red-600 dark:text-red-400">{damageResult.steps.C.toFixed(2)}</span> ×{" "}
                <span className="text-green-600 dark:text-green-400">{damageResult.steps.D.toFixed(2)}</span> ×{" "}
                <span className="text-orange-600 dark:text-orange-400">{damageResult.steps.E.toFixed(2)}</span> ×{" "}
                <span className="text-yellow-600 dark:text-yellow-400">{damageResult.steps.F.toFixed(1)}</span>)
              </div>
              <div className="mt-2 font-mono text-xl font-bold text-blue-600 dark:text-blue-400">
                = {damageResult.final.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">스탯 입력</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 공격자 섹션 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">공격자</h3>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="attacker-attack">공격력</Label>
                  <Input
                    id="attacker-attack"
                    type="number"
                    value={attackerStats.attack}
                    onChange={(e) =>
                      setAttackerStats({ ...attackerStats, attack: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-defense-ignore">방어 무시율 (%)</Label>
                  <Input
                    id="attacker-defense-ignore"
                    type="number"
                    value={attackerStats.defenseIgnore}
                    onChange={(e) =>
                      setAttackerStats({ ...attackerStats, defenseIgnore: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-defense-reduction">방어력 감소율 (%)</Label>
                  <Input
                    id="attacker-defense-reduction"
                    type="number"
                    value={attackerStats.defenseReduction}
                    onChange={(e) =>
                      setAttackerStats({
                        ...attackerStats,
                        defenseReduction: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-damage-bonus">피해 보너스 (%)</Label>
                  <Input
                    id="attacker-damage-bonus"
                    type="number"
                    value={attackerStats.damageBonus}
                    onChange={(e) =>
                      setAttackerStats({ ...attackerStats, damageBonus: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-damage-dealt">주는 피해 증가량 (%)</Label>
                  <Input
                    id="attacker-damage-dealt"
                    type="number"
                    value={attackerStats.damageDealt}
                    onChange={(e) =>
                      setAttackerStats({ ...attackerStats, damageDealt: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-enemy-damage-taken">적 받는 피해 증가 (%)</Label>
                  <Input
                    id="attacker-enemy-damage-taken"
                    type="number"
                    value={attackerStats.enemyDamageTaken}
                    onChange={(e) =>
                      setAttackerStats({
                        ...attackerStats,
                        enemyDamageTaken: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-incantation">주문 위력 증가량 (%)</Label>
                  <Input
                    id="attacker-incantation"
                    type="number"
                    value={attackerStats.incantationPower}
                    onChange={(e) =>
                      setAttackerStats({
                        ...attackerStats,
                        incantationPower: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-ritual">술식 위력 증가량 (%)</Label>
                  <Input
                    id="attacker-ritual"
                    type="number"
                    value={attackerStats.ritualPower}
                    onChange={(e) =>
                      setAttackerStats({ ...attackerStats, ritualPower: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-base-coeff">기본 계수 (%)</Label>
                  <Input
                    id="attacker-base-coeff"
                    type="number"
                    value={attackerStats.baseCoefficient}
                    onChange={(e) =>
                      setAttackerStats({
                        ...attackerStats,
                        baseCoefficient: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-additional-coeff">추가 피해 계수 (%)</Label>
                  <Input
                    id="attacker-additional-coeff"
                    type="number"
                    value={attackerStats.additionalCoefficient}
                    onChange={(e) =>
                      setAttackerStats({
                        ...attackerStats,
                        additionalCoefficient: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-extra-attack-coeff">추공 계수 (%)</Label>
                  <Input
                    id="attacker-extra-attack-coeff"
                    type="number"
                    value={attackerStats.extraAttackCoefficient}
                    onChange={(e) =>
                      setAttackerStats({
                        ...attackerStats,
                        extraAttackCoefficient: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-crit-rate">치명타 기술</Label>
                  <Input
                    id="attacker-crit-rate"
                    type="number"
                    value={attackerStats.critRate}
                    onChange={(e) =>
                      setAttackerStats({ ...attackerStats, critRate: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-crit-damage">치명타 피해 증가 (%)</Label>
                  <Input
                    id="attacker-crit-damage"
                    type="number"
                    value={attackerStats.critDamagePercent}
                    onChange={(e) =>
                      setAttackerStats({
                        ...attackerStats,
                        critDamagePercent: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="attacker-enemy-crit-defense-reduction">
                    적 치명타 방어 감소 (%)
                  </Label>
                  <Input
                    id="attacker-enemy-crit-defense-reduction"
                    type="number"
                    value={attackerStats.enemyCritDefenseReduction}
                    onChange={(e) =>
                      setAttackerStats({
                        ...attackerStats,
                        enemyCritDefenseReduction: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* 방어자 섹션 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">방어자</h3>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="defender-reality-defense">현실 방어력</Label>
                  <Input
                    id="defender-reality-defense"
                    type="number"
                    value={defenderStats.realityDefense}
                    onChange={(e) =>
                      setDefenderStats({ ...defenderStats, realityDefense: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="defender-mental-defense">정신 방어력</Label>
                  <Input
                    id="defender-mental-defense"
                    type="number"
                    value={defenderStats.mentalDefense}
                    onChange={(e) =>
                      setDefenderStats({ ...defenderStats, mentalDefense: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="defender-damage-reduction">피해 감면 (%)</Label>
                  <Input
                    id="defender-damage-reduction"
                    type="number"
                    value={defenderStats.damageReduction}
                    onChange={(e) =>
                      setDefenderStats({
                        ...defenderStats,
                        damageReduction: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="defender-power-reduction">위력 감소 (%)</Label>
                  <Input
                    id="defender-power-reduction"
                    type="number"
                    value={defenderStats.powerReduction}
                    onChange={(e) =>
                      setDefenderStats({ ...defenderStats, powerReduction: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="defender-crit-defense">치명타 방어력 (%)</Label>
                  <Input
                    id="defender-crit-defense"
                    type="number"
                    value={defenderStats.critDefense}
                    onChange={(e) =>
                      setDefenderStats({ ...defenderStats, critDefense: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 버프/디버프 섹션 */}
          <Separator className="my-6" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BuffManager
              title="공격자 버프"
              buffs={attackerBuffs}
              onBuffsChange={setAttackerBuffs}
              type="attacker"
            />
            <BuffManager
              title="방어자 버프"
              buffs={defenderBuffs}
              onBuffsChange={setDefenderBuffs}
              type="defender"
            />
          </div>

          {/* 옵션 섹션 */}
          <Separator className="my-6" />
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">계산 옵션</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="attack-type">
                  {attackType === "reality" ? "현실 공격" : "정신 공격"}
                </Label>
                <Switch
                  id="attack-type"
                  checked={attackType === "mental"}
                  onCheckedChange={(checked) => setAttackType(checked ? "mental" : "reality")}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="power-type">
                  {powerType === "incantation" ? "주문 위력" : "술식 위력"}
                </Label>
                <Switch
                  id="power-type"
                  checked={powerType === "ritual"}
                  onCheckedChange={(checked) => setPowerType(checked ? "ritual" : "incantation")}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="use-element-advantage">상성 적용 (1.3배)</Label>
                <Switch
                  id="use-element-advantage"
                  checked={useElementAdvantage}
                  onCheckedChange={setUseElementAdvantage}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="use-critical">치명타 적용</Label>
                <Switch id="use-critical" checked={useCritical} onCheckedChange={setUseCritical} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 데미지 공식 모달 */}
      <DamageFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
      />
    </div>
  );
}
