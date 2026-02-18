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
import { insightMaterial } from "@/data/insight_material";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface CharacterSelectionModal_GrowthProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (characterIds: number[]) => void;
  excludeCharacterIds?: number[];
}

type SortOption = "version-desc" | "version-asc";

export default function CharacterSelectionModal_Growth({
  open,
  onOpenChange,
  onConfirm,
  excludeCharacterIds = [],
}: CharacterSelectionModal_GrowthProps) {
  const t = useTranslations("growthCalc");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [rarityFilter, setRarityFilter] = useState<string>("all");
  const [inspirationFilter, setInspirationFilter] = useState<string>("all");
  const [nameSearch, setNameSearch] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("version-desc");

  const allCharacters = useMemo(() => {
    const availableCharacterIds = new Set(insightMaterial.map((item) => item.character_id));
    return [...(charactersByRarity[6] || []), ...(charactersByRarity[5] || [])].filter((char) =>
      availableCharacterIds.has(char.id)
    );
  }, []);

  const filteredAndSortedCharacters = useMemo(() => {
    const filtered = allCharacters.filter((char) => {
      if (excludeCharacterIds.includes(char.id)) return false;
      if (rarityFilter !== "all" && char.rarity !== Number(rarityFilter)) return false;
      if (inspirationFilter !== "all" && char.inspiration !== inspirationFilter) return false;
      if (nameSearch && !char.name.toLowerCase().includes(nameSearch.toLowerCase())) {
        return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      if (a.rarity !== b.rarity) {
        return b.rarity - a.rarity;
      }
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
          <DialogTitle className="text-xl sm:text-2xl">{t("charSelect")}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {t("charSelectDesc", { count: selectedIds.size })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 sm:space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t("rarity")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allRarity")}</SelectItem>
                <SelectItem value="6">{t("rarity6")}</SelectItem>
                <SelectItem value="5">{t("rarity5")}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={inspirationFilter} onValueChange={setInspirationFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t("inspiration")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allInspiration")}</SelectItem>
                {uniqueInspirations.map((insp) => (
                  <SelectItem key={insp} value={insp}>
                    {insp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOption(sortOption === "version-desc" ? "version-asc" : "version-desc")}
              className="w-full"
            >
              {t("versionSort", { dir: sortOption === "version-desc" ? "\u2193" : "\u2191" })}
            </Button>

            <Input
              placeholder={t("searchName")}
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
          </div>
        </div>

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
                  <div className="absolute top-1 left-1 z-20">
                    <Checkbox checked={isSelected} />
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="relative w-full aspect-square">
                      <Image
                        src={`/characters/${character.rarity}stars/${character.engName}.webp`}
                        alt={character.name}
                        fill
                        className="object-cover object-top rounded-md"
                      />
                      <Image
                        src={`/infos/effects/${character.rarity}stars.webp`}
                        alt={`${character.rarity}${t("star")}`}
                        fill
                        className="object-cover object-top pointer-events-none z-10"
                      />
                      <div className="absolute bottom-1 right-1 z-20">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-lg ${
                          character.version === "2.75"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-black/80 text-white"
                        }`}>
                          {character.version === "2.75" ? t("collab") : character.version}
                        </span>
                      </div>
                    </div>

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
              {t("noMatch")}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("selectedCount", { count: selectedIds.size })}
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCancel}>
              {t("cancel")}
            </Button>
            <Button onClick={handleConfirm} disabled={selectedIds.size === 0}>
              {t("confirm", { count: selectedIds.size })}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
