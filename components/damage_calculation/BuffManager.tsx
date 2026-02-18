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
import { useTranslations } from "next-intl";

interface BuffManagerProps {
  title: string;
  buffs: Buff[];
  onBuffsChange: (buffs: Buff[]) => void;
  type: "attacker" | "defender";
}

type BuffTypeValue = keyof Stats;

const BUFF_TYPE_KEYS: { value: BuffTypeValue; labelKey: string }[] = [
  { value: "attack", labelKey: "buffAttack" },
  { value: "attackPercent", labelKey: "buffAttackPercent" },
  { value: "attackFlat", labelKey: "buffAttackFlat" },
  { value: "realityDefense", labelKey: "buffRealityDefense" },
  { value: "mentalDefense", labelKey: "buffMentalDefense" },
  { value: "defenseIgnore", labelKey: "buffDefenseIgnore" },
  { value: "defenseReduction", labelKey: "buffDefenseReduction" },
  { value: "damageBonus", labelKey: "buffDamageBonus" },
  { value: "damageReduction", labelKey: "buffDamageReduction" },
  { value: "damageDealt", labelKey: "buffDamageDealt" },
  { value: "enemyDamageTaken", labelKey: "buffEnemyDamageTaken" },
  { value: "incantationPower", labelKey: "buffIncantationPower" },
  { value: "ritualPower", labelKey: "buffRitualPower" },
  { value: "powerReduction", labelKey: "buffPowerReduction" },
  { value: "baseCoefficient", labelKey: "buffBaseCoeff" },
  { value: "additionalCoefficient", labelKey: "buffAdditionalCoeff" },
  { value: "extraAttackCoefficient", labelKey: "buffExtraAttackCoeff" },
  { value: "critRate", labelKey: "buffCritRate" },
  { value: "critDamagePercent", labelKey: "buffCritDamagePercent" },
  { value: "critDefense", labelKey: "buffCritDefense" },
  { value: "enemyCritDefenseReduction", labelKey: "buffEnemyCritDefReduction" },
];

// 공격자용 프리셋 버프
const ATTACKER_PRESET_BUFFS: {
  nameKey: string;
  type: BuffTypeValue;
  value: number;
  isPercent: boolean;
}[] = [
  { nameKey: "presetAtkPercent10", type: "attack", value: 10, isPercent: true },
  { nameKey: "presetAtkPercent20", type: "attack", value: 20, isPercent: true },
  { nameKey: "presetDefIgnore15", type: "defenseIgnore", value: 15, isPercent: false },
  { nameKey: "presetDefIgnore25", type: "defenseIgnore", value: 25, isPercent: false },
  { nameKey: "presetDmgBonus15", type: "damageBonus", value: 15, isPercent: false },
  { nameKey: "presetDmgBonus30", type: "damageBonus", value: 30, isPercent: false },
  { nameKey: "presetDmgDealt20", type: "damageDealt", value: 20, isPercent: false },
  { nameKey: "presetDmgDealt35", type: "damageDealt", value: 35, isPercent: false },
  { nameKey: "presetEnemyDmgTaken20", type: "enemyDamageTaken", value: 20, isPercent: false },
  { nameKey: "presetEnemyDmgTaken35", type: "enemyDamageTaken", value: 35, isPercent: false },
  { nameKey: "presetCritDmg30", type: "critDamagePercent", value: 30, isPercent: false },
  { nameKey: "presetCritDmg50", type: "critDamagePercent", value: 50, isPercent: false },
  { nameKey: "presetEnemyCritDef20", type: "enemyCritDefenseReduction", value: 20, isPercent: false },
  { nameKey: "presetEnemyCritDef40", type: "enemyCritDefenseReduction", value: 40, isPercent: false },
  { nameKey: "presetIncantation25", type: "incantationPower", value: 25, isPercent: false },
  { nameKey: "presetRitual25", type: "ritualPower", value: 25, isPercent: false },
];

// 방어자용 프리셋 디버프
const DEFENDER_PRESET_BUFFS: {
  nameKey: string;
  type: BuffTypeValue;
  value: number;
  isPercent: boolean;
}[] = [
  { nameKey: "presetRealDef10", type: "realityDefense", value: 10, isPercent: true },
  { nameKey: "presetRealDef20", type: "realityDefense", value: 20, isPercent: true },
  { nameKey: "presetMentalDef10", type: "mentalDefense", value: 10, isPercent: true },
  { nameKey: "presetMentalDef20", type: "mentalDefense", value: 20, isPercent: true },
  { nameKey: "presetDmgReduction15", type: "damageReduction", value: 15, isPercent: false },
  { nameKey: "presetDmgReduction30", type: "damageReduction", value: 30, isPercent: false },
  { nameKey: "presetCritDef20", type: "critDefense", value: 20, isPercent: false },
  { nameKey: "presetCritDef40", type: "critDefense", value: 40, isPercent: false },
];

export default function BuffManager({ title, buffs, onBuffsChange, type }: BuffManagerProps) {
  const t = useTranslations("damageCalc");
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
      name: t(preset.nameKey),
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
        <Label className="text-sm text-muted-foreground">{t("quickAdd")}</Label>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_BUFFS.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => addPresetBuff(preset)}
              className="h-auto whitespace-normal py-2 text-xs"
            >
              {t(preset.nameKey)}
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
          {showCustomForm ? t("hideCustomBuff") : t("addCustomBuff")}
        </Button>

        {showCustomForm && (
          <div className="space-y-3 rounded-lg border p-4">
            <div>
              <Label htmlFor={`buff-name-${title}`}>{t("buffName")}</Label>
              <Input
                id={`buff-name-${title}`}
                value={newBuffName}
                onChange={(e) => setNewBuffName(e.target.value)}
                placeholder={t("buffNamePlaceholder")}
              />
            </div>

            <div>
              <Label htmlFor={`buff-type-${title}`}>{t("buffType")}</Label>
              <Select value={newBuffType} onValueChange={(value) => setNewBuffType(value as BuffTypeValue)}>
                <SelectTrigger id={`buff-type-${title}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BUFF_TYPE_KEYS.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {t(type.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor={`buff-value-${title}`}>{t("increaseAmount")}</Label>
              <Input
                id={`buff-value-${title}`}
                type="number"
                value={newBuffValue}
                onChange={(e) => setNewBuffValue(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor={`buff-percent-${title}`}>{t("percentApply")}</Label>
              <Switch
                id={`buff-percent-${title}`}
                checked={newBuffIsPercent}
                onCheckedChange={setNewBuffIsPercent}
              />
            </div>

            <Button onClick={addBuff} className="w-full">
              {t("add")}
            </Button>
          </div>
        )}
      </div>

      {/* 적용된 버프 목록 */}
      {buffs.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">{t("appliedBuffs")}</Label>
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
            {t("removeAll")}
          </Button>
        </div>
      )}
    </div>
  );
}
