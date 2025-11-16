"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { charactersByRarity } from "@/data/characters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CharacterSelectionModal_GrowthProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (characterIds: number[]) => void;
  excludeCharacterIds?: number[]; // 이미 선택된 캐릭터 제외
}

type SortOption = "version-desc" | "version-asc";

export default function CharacterSelectionModal_Growth({
  open,
  onOpenChange,
  onConfirm,
  excludeCharacterIds = [],
}: CharacterSelectionModal_GrowthProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [rarityFilter, setRarityFilter] = useState<string>("all");
  const [inspirationFilter, setInspirationFilter] = useState<string>("all");
  const [nameSearch, setNameSearch] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("version-desc");

  const allCharacters = useMemo(() => {
    // 5성과 6성만 선택 가능
    return [...(charactersByRarity[6] || []), ...(charactersByRarity[5] || [])];
  }, []);

  // 필터링 및 정렬
  const filteredAndSortedCharacters = useMemo(() => {
    const filtered = allCharacters.filter((char) => {
      // 제외된 캐릭터 필터링
      if (excludeCharacterIds.includes(char.id)) return false;

      // 희귀도 필터
      if (rarityFilter !== "all" && char.rarity !== Number(rarityFilter)) return false;

      // 영감 필터
      if (inspirationFilter !== "all" && char.inspiration !== inspirationFilter) return false;

      // 이름 검색
      if (nameSearch && !char.name.toLowerCase().includes(nameSearch.toLowerCase())) {
        return false;
      }

      return true;
    });

    // 정렬: 희귀도 우선, 그 다음 버전, 마지막으로 ID
    filtered.sort((a, b) => {
      // 희귀도가 다르면 희귀도 기준 내림차순 (6성 먼저)
      if (a.rarity !== b.rarity) {
        return b.rarity - a.rarity;
      }

      // 희귀도가 같으면 버전 기준 정렬
      const versionA = parseFloat(a.version);
      const versionB = parseFloat(b.version);

      if (versionA !== versionB) {
        switch (sortOption) {
          case "version-desc":
            return versionB - versionA;
          case "version-asc":
            return versionA - versionB;
          default:
            return 0;
        }
      }

      // 버전도 같으면 ID 기준 내림차순 (높은 ID 먼저)
      return b.id - a.id;
    });

    return filtered;
  }, [allCharacters, rarityFilter, inspirationFilter, nameSearch, sortOption, excludeCharacterIds]);

  const uniqueInspirations = useMemo(() => {
    return Array.from(new Set(allCharacters.map((c) => c.inspiration)));
  }, [allCharacters]);

  const toggleCharacter = (id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selectedIds));
    setSelectedIds(new Set());
    setNameSearch("");
    setRarityFilter("all");
    setInspirationFilter("all");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedIds(new Set());
    setNameSearch("");
    setRarityFilter("all");
    setInspirationFilter("all");
    onOpenChange(false);
  };

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">캐릭터 선택</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            육성 계획에 추가할 캐릭터를 선택하세요. (선택: {selectedIds.size}개)
          </DialogDescription>
        </DialogHeader>

        {/* 필터 & 정렬 컨트롤 */}
        <div className="space-y-2 sm:space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {/* 희귀도 필터 */}
            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="희귀도" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 희귀도</SelectItem>
                <SelectItem value="6">6성</SelectItem>
                <SelectItem value="5">5성</SelectItem>
              </SelectContent>
            </Select>

            {/* 영감 필터 */}
            <Select value={inspirationFilter} onValueChange={setInspirationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="영감" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 영감</SelectItem>
                {uniqueInspirations.map((insp) => (
                  <SelectItem key={insp} value={insp}>
                    {insp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 정렬 버튼 */}
            <Button
              variant="outline"
              onClick={() => setSortOption(sortOption === "version-desc" ? "version-asc" : "version-desc")}
              className="w-full"
            >
              버전: {sortOption === "version-desc" ? "↓" : "↑"}
            </Button>

            {/* 이름 검색 */}
            <Input
              placeholder="이름 검색..."
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 캐릭터 그리드 - 스크롤 가능 영역 */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1.5 sm:gap-2 py-2 sm:py-4">
            {filteredAndSortedCharacters.map((character) => {
              const isSelected = selectedIds.has(character.id);
              return (
                <div
                  key={character.id}
                  onClick={() => toggleCharacter(character.id)}
                  className={`relative cursor-pointer rounded-lg border-2 p-1 transition-all hover:shadow-lg ${
                    isSelected
                      ? `${getRarityColor(character.rarity)} bg-primary/10 dark:bg-primary/20`
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  {/* 체크박스 */}
                  <div className="absolute top-1 left-1 z-20">
                    <Checkbox checked={isSelected} />
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    {/* 캐릭터 이미지 + 성급 이미지 오버레이 */}
                    <div className="relative w-full aspect-square">
                      {/* 캐릭터 이미지 */}
                      <Image
                        src={`/characters/${character.rarity}stars/${character.engName}.webp`}
                        alt={character.name}
                        fill
                        className="object-cover object-top rounded-md"
                      />
                      {/* 성급 이미지 오버레이 */}
                      <Image
                        src={`/infos/effects/${character.rarity}stars.webp`}
                        alt={`${character.rarity}성`}
                        fill
                        className="object-cover object-top pointer-events-none z-10"
                      />
                      {/* 버전 칩 - 우측 하단 */}
                      <div className="absolute bottom-1 right-1 z-20">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-lg ${
                          character.version === "2.75"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-black/80 text-white"
                        }`}>
                          {character.version === "2.75" ? "콜라보" : character.version}
                        </span>
                      </div>
                    </div>

                    {/* 캐릭터 이름 */}
                    <p className="text-xs font-semibold text-center line-clamp-2 w-full px-1">
                      {character.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredAndSortedCharacters.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              조건에 맞는 캐릭터가 없습니다.
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedIds.size}개 캐릭터 선택됨
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button onClick={handleConfirm} disabled={selectedIds.size === 0}>
              확인 ({selectedIds.size})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
