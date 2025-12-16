"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { materialList } from "@/data/material";
import { getCraftingRecipe } from "@/data/material_crafting";

interface SingleMaterialEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  materialId: number | null;
  currentQuantity: number;
  onSave: (materialId: number, newQuantity: number) => void;
}

export default function SingleMaterialEditModal_Growth({
  open,
  onOpenChange,
  materialId,
  currentQuantity,
  onSave,
}: SingleMaterialEditModalProps) {
  const [quantity, setQuantity] = useState(currentQuantity);

  // materialId나 currentQuantity가 변경되면 quantity 업데이트
  useEffect(() => {
    setQuantity(currentQuantity);
  }, [currentQuantity, materialId]);

  const material = materialId ? materialList.find((m) => m.id === materialId) : null;
  const recipe = materialId ? getCraftingRecipe(materialId) : null;

  if (!material) {
    return null;
  }

  const handleSave = () => {
    onSave(materialId!, quantity);
    onOpenChange(false);
  };

  const handleIncrement = (amount: number) => {
    setQuantity((prev) => Math.max(0, prev + amount));
  };

  const getRarityGradient = (rarity: number): string => {
    const gradients: Record<number, string> = {
      6: "bg-gradient-to-br from-[#D78324]/20 to-[#D78324]/40",
      5: "bg-gradient-to-br from-[#EED483]/20 to-[#EED483]/40",
      4: "bg-gradient-to-br from-[#825D8C]/20 to-[#825D8C]/40",
      3: "bg-gradient-to-br from-[#5C6487]/20 to-[#5C6487]/40",
      2: "bg-gradient-to-br from-[#4F6E48]/20 to-[#4F6E48]/40",
    };
    return gradients[rarity] || "bg-gradient-to-br from-gray-400/20 to-gray-500/20";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>재료 수량 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 재료 정보 */}
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <div className={`rounded-md p-2 ${getRarityGradient(material.rarity)}`}>
              <Image
                src={`/infos/materials/${material.id}.webp`}
                alt={material.name}
                width={48}
                height={48}
                className="h-12 w-12"
              />
            </div>
            <div>
              <div className="font-semibold">{material.name}</div>
              <div className="text-sm text-muted-foreground">{material.engName}</div>
            </div>
          </div>

          {/* 수량 입력 */}
          <div className="space-y-2">
            <Label htmlFor="quantity">보유 수량</Label>
            <div className="flex items-center gap-2">
              <Input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex-1"
              />
            </div>
          </div>

          {/* 빠른 증감 버튼 */}
          <div className="space-y-2">
            <Label>빠른 조정</Label>
            <div className="grid grid-cols-4 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleIncrement(-10)}
              >
                -10
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => handleIncrement(-1)}>
                -1
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => handleIncrement(1)}>
                +1
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => handleIncrement(10)}>
                +10
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleIncrement(100)}
              >
                +100
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setQuantity(0)}>
                초기화
              </Button>
            </div>
          </div>

          {/* 조합법 */}
          {recipe && (
            <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
              <Label className="text-sm font-semibold">🔨 조합법</Label>
              <div className="space-y-2">
                {recipe.materials.map((subMatId, index) => {
                  const subMaterial = materialList.find((m) => m.id === subMatId);
                  if (!subMaterial) return null;

                  const quantity = recipe.quantities[index];

                  return (
                    <div
                      key={subMatId}
                      className="flex items-center gap-2 rounded-md bg-background/50 p-2"
                    >
                      <div className={`rounded p-1 ${getRarityGradient(subMaterial.rarity)}`}>
                        <Image
                          src={`/infos/materials/${subMatId}.webp`}
                          alt={subMaterial.name}
                          width={32}
                          height={32}
                          className="h-8 w-8"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{subMaterial.name}</div>
                        <div className="text-xs text-muted-foreground">{subMaterial.engName}</div>
                      </div>
                      <div className="text-sm font-semibold">×{quantity.toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                💡 위 재료들을 모아서 1개를 조합할 수 있습니다
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button type="button" onClick={handleSave}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
