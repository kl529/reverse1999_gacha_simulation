"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus } from "lucide-react";
import { Buff, Stats } from "./DamageCalculator";

interface BuffManagerProps {
  title: string;
  buffs: Buff[];
  onBuffsChange: (buffs: Buff[]) => void;
  type: "attacker" | "defender";
}

type BuffTypeValue = keyof Stats;

const BUFF_TYPES: { value: BuffTypeValue; label: string }[] = [
  { value: "attack", label: "공격력" },
  { value: "attackPercent", label: "공격력%" },
  { value: "attackFlat", label: "공격력 고정수치" },
  { value: "realityDefense", label: "현실 방어력" },
  { value: "mentalDefense", label: "정신 방어력" },
  { value: "defenseIgnore", label: "방어 무시율" },
  { value: "defenseReduction", label: "방어력 감소율" },
  { value: "damageBonus", label: "피해 보너스" },
  { value: "damageReduction", label: "피해 감면" },
  { value: "damageDealt", label: "주는 피해 증가량" },
  { value: "enemyDamageTaken", label: "적 받는 피해 증가" },
  { value: "incantationPower", label: "주문 위력" },
  { value: "ritualPower", label: "술식 위력" },
  { value: "powerReduction", label: "위력 감소" },
  { value: "baseCoefficient", label: "기본 계수" },
  { value: "additionalCoefficient", label: "추가 피해 계수" },
  { value: "extraAttackCoefficient", label: "추공 계수" },
  { value: "critRate", label: "치명타 기술" },
  { value: "critDamagePercent", label: "치명타 피해%" },
  { value: "critDefense", label: "치명타 방어력" },
  { value: "enemyCritDefenseReduction", label: "적 치명타 방어 감소" },
];

// 공격자용 프리셋 버프
const ATTACKER_PRESET_BUFFS: {
  name: string;
  type: BuffTypeValue;
  value: number;
  isPercent: boolean;
}[] = [
  { name: "공격력 +10%", type: "attack", value: 10, isPercent: true },
  { name: "공격력 +20%", type: "attack", value: 20, isPercent: true },
  { name: "방어 무시 +15%", type: "defenseIgnore", value: 15, isPercent: false },
  { name: "방어 무시 +25%", type: "defenseIgnore", value: 25, isPercent: false },
  { name: "피해 보너스 +15%", type: "damageBonus", value: 15, isPercent: false },
  { name: "피해 보너스 +30%", type: "damageBonus", value: 30, isPercent: false },
  { name: "주는 피해 +20%", type: "damageDealt", value: 20, isPercent: false },
  { name: "주는 피해 +35%", type: "damageDealt", value: 35, isPercent: false },
  { name: "적 받는 피해 +20%", type: "enemyDamageTaken", value: 20, isPercent: false },
  { name: "적 받는 피해 +35%", type: "enemyDamageTaken", value: 35, isPercent: false },
  { name: "치명타 피해% +30%", type: "critDamagePercent", value: 30, isPercent: false },
  { name: "치명타 피해% +50%", type: "critDamagePercent", value: 50, isPercent: false },
  { name: "적 치명타 방어 -20%", type: "enemyCritDefenseReduction", value: 20, isPercent: false },
  { name: "적 치명타 방어 -40%", type: "enemyCritDefenseReduction", value: 40, isPercent: false },
  { name: "주문 위력 +25%", type: "incantationPower", value: 25, isPercent: false },
  { name: "술식 위력 +25%", type: "ritualPower", value: 25, isPercent: false },
];

// 방어자용 프리셋 디버프
const DEFENDER_PRESET_BUFFS: {
  name: string;
  type: BuffTypeValue;
  value: number;
  isPercent: boolean;
}[] = [
  { name: "현실 방어력 +10%", type: "realityDefense", value: 10, isPercent: true },
  { name: "현실 방어력 +20%", type: "realityDefense", value: 20, isPercent: true },
  { name: "정신 방어력 +10%", type: "mentalDefense", value: 10, isPercent: true },
  { name: "정신 방어력 +20%", type: "mentalDefense", value: 20, isPercent: true },
  { name: "피해 감면 +15%", type: "damageReduction", value: 15, isPercent: false },
  { name: "피해 감면 +30%", type: "damageReduction", value: 30, isPercent: false },
  { name: "치명타 방어력 +20%", type: "critDefense", value: 20, isPercent: false },
  { name: "치명타 방어력 +40%", type: "critDefense", value: 40, isPercent: false },
];

export default function BuffManager({ title, buffs, onBuffsChange, type }: BuffManagerProps) {
  const [newBuffName, setNewBuffName] = useState("");
  const [newBuffType, setNewBuffType] = useState<BuffTypeValue>("attack");
  const [newBuffValue, setNewBuffValue] = useState(10);
  const [newBuffIsPercent, setNewBuffIsPercent] = useState(true);
  const [showCustomForm, setShowCustomForm] = useState(false);

  // 타입에 따라 적절한 프리셋 선택
  const PRESET_BUFFS = type === "attacker" ? ATTACKER_PRESET_BUFFS : DEFENDER_PRESET_BUFFS;

  const addBuff = () => {
    if (!newBuffName.trim()) return;

    const newBuff: Buff = {
      id: Date.now().toString(),
      name: newBuffName,
      type: newBuffType,
      value: newBuffValue,
      isPercent: newBuffIsPercent,
    };

    onBuffsChange([...buffs, newBuff]);
    setNewBuffName("");
    setNewBuffValue(10);
    setShowCustomForm(false);
  };

  const addPresetBuff = (preset: (typeof PRESET_BUFFS)[0]) => {
    const newBuff: Buff = {
      id: Date.now().toString(),
      name: preset.name,
      type: preset.type,
      value: preset.value,
      isPercent: preset.isPercent,
    };

    onBuffsChange([...buffs, newBuff]);
  };

  const removeBuff = (id: string) => {
    onBuffsChange(buffs.filter((buff) => buff.id !== id));
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">{title}</h4>

      {/* 프리셋 버프 버튼들 */}
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">빠른 추가</Label>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_BUFFS.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => addPresetBuff(preset)}
              className="h-auto whitespace-normal py-2 text-xs"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* 커스텀 버프 추가 폼 */}
      <div className="space-y-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          {showCustomForm ? "커스텀 버프 숨기기" : "커스텀 버프 추가"}
        </Button>

        {showCustomForm && (
          <div className="space-y-3 rounded-lg border p-4">
            <div>
              <Label htmlFor={`buff-name-${title}`}>버프 이름</Label>
              <Input
                id={`buff-name-${title}`}
                value={newBuffName}
                onChange={(e) => setNewBuffName(e.target.value)}
                placeholder="예: 공격력 버프"
              />
            </div>

            <div>
              <Label htmlFor={`buff-type-${title}`}>버프 타입</Label>
              <Select value={newBuffType} onValueChange={(value) => setNewBuffType(value as BuffTypeValue)}>
                <SelectTrigger id={`buff-type-${title}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BUFF_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor={`buff-value-${title}`}>증가량</Label>
              <Input
                id={`buff-value-${title}`}
                type="number"
                value={newBuffValue}
                onChange={(e) => setNewBuffValue(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor={`buff-percent-${title}`}>퍼센트 적용</Label>
              <Switch
                id={`buff-percent-${title}`}
                checked={newBuffIsPercent}
                onCheckedChange={setNewBuffIsPercent}
              />
            </div>

            <Button onClick={addBuff} className="w-full">
              추가
            </Button>
          </div>
        )}
      </div>

      {/* 적용된 버프 목록 */}
      {buffs.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">적용된 버프</Label>
          <div className="grid grid-cols-2 gap-2">
            {buffs.map((buff) => (
              <div
                key={buff.id}
                className="flex items-center justify-between rounded-lg border bg-secondary/30 p-2"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{buff.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {buff.isPercent ? "+" : ""}
                    {buff.value}
                    {buff.isPercent ? "%" : ""}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBuff(buff.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBuffsChange([])}
            className="w-full"
          >
            모두 제거
          </Button>
        </div>
      )}
    </div>
  );
}
