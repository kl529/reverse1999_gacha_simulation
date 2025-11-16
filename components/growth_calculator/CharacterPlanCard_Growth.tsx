"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { CharacterPlan } from "@/lib/types/growthCalculatorTypes";
import { Character } from "@/data/characters";
import { Pencil, Trash2 } from "lucide-react";

interface CharacterPlanCard_GrowthProps {
  plan: CharacterPlan;
  character: Character;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
}

export default function CharacterPlanCard_Growth({
  plan,
  character,
  onEdit,
  onDelete,
  onToggleActive,
}: CharacterPlanCard_GrowthProps) {
  const getRarityColor = (rarity: number): string => {
    const colors: Record<number, string> = {
      6: "border-amber-400 dark:border-amber-500",
      5: "border-purple-400 dark:border-purple-500",
      4: "border-blue-400 dark:border-blue-500",
      3: "border-green-400 dark:border-green-500",
      2: "border-gray-400 dark:border-gray-500",
    };
    return colors[rarity] || colors[2];
  };

  return (
    <Card
      className={`relative transition-all ${
        plan.isActive ? "" : "opacity-50 grayscale"
      } ${getRarityColor(character.rarity)} border-2`}
    >
      <CardContent className="space-y-1.5 p-2">
        {/* 캐릭터 정보 */}
        <div className="flex flex-col items-center gap-1.5">
          {/* 활성화 토글 */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-600 dark:text-gray-400">활성</span>
            <Switch checked={plan.isActive} onCheckedChange={onToggleActive} />
          </div>

          {/* 캐릭터 이미지 + 성급 이미지 오버레이 (정사각형) */}
          <a
            href={`/character/${character.id}`}
            className="relative h-20 w-20 cursor-pointer overflow-hidden rounded-md transition-all hover:ring-2 hover:ring-primary"
            title={`${character.name} 가이드 보기`}
          >
            <Image
              src={`/characters/${character.rarity}stars/${character.engName}.webp`}
              alt={character.name}
              fill
              className="object-cover object-top"
            />
            <Image
              src={`/infos/effects/${character.rarity}stars.webp`}
              alt={`${character.rarity}성`}
              fill
              className="pointer-events-none z-10 object-cover object-top"
            />
          </a>

          {/* 캐릭터 이름 */}
          <div className="w-full text-center">
            <h4 className="truncate text-sm font-semibold">{character.name}</h4>
          </div>
        </div>

        {/* 하단: 액션 버튼 */}
        <div className="flex justify-center gap-1.5">
          <Button variant="outline" size="icon" onClick={onEdit} className="h-7 w-7" title="수정">
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={onDelete}
            className="h-7 w-7"
            title="삭제"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
