"use client";

import { useState, useEffect } from "react";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type RoleType = "damage" | "support" | "balance" | "defense";

const TYPES: { type: RoleType; label: string; iconImg: string }[] = [
  {
    type: "damage",
    label: "공격",
    iconImg: "/infos/resonance_img/damage.webp",
  },
  {
    type: "support",
    label: "보조",
    iconImg: "/infos/resonance_img/support.webp",
  },
  {
    type: "balance",
    label: "밸런스",
    iconImg: "/infos/resonance_img/balance.webp",
  },
  {
    type: "defense",
    label: "방어",
    iconImg: "/infos/resonance_img/defense.webp",
  },
];

export default function CharacterSetting() {
  const [selectedType, setSelectedType] = useState<RoleType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const reversedChars = SETTING_CHARACTERS.slice().reverse();

  const filteredChars = reversedChars.filter((ch) => {
    const matchesType = selectedType ? ch.resonanceType === selectedType : true;
    const matchesSearch =
      ch.name.includes(debouncedQuery) ||
      ch.engName.toLowerCase().includes(debouncedQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const renderCharGroup = (rarity: number, label: string, colorClass: string) => {
    const group = filteredChars.filter((ch) => ch.rarity === rarity);
    if (group.length === 0) return null;

    return (
      <div className="space-y-2">
        <h2 className={`text-xl font-bold ${colorClass} pb-2`}>{label}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(76px,1fr))] gap-2">
          {group.map((ch) => (
            <Link key={`${ch.id}-${ch.version}`} href={`/character_setting/${ch.id}`}>
              <div className="flex cursor-pointer flex-col items-center rounded border border-gray-400 p-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="relative h-10 w-10">
                  <Image
                    src={`/characters/${ch.rarity}stars_small/${ch.engName}.png`}
                    alt={ch.name}
                    width={40}
                    height={40}
                    className="h-full w-full rounded object-contain"
                  />
                  {ch.version && (
                    <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[8px] text-white shadow">
                      {ch.version}
                    </div>
                  )}
                </div>
                <div className="w-full truncate text-center text-xs font-bold text-black dark:text-gray-100">
                  {ch.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white p-4 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="sticky top-0 z-20 mb-4 mt-8 p-3 text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
        공명 & 의지 찾기
      </h1>

      <div className="mb-4 flex w-full max-w-md justify-center">
        <Input
          type="text"
          placeholder="캐릭터 이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {TYPES.map((type) => (
          <Button
            key={type.type}
            variant={selectedType === type.type ? "default" : "outline"}
            onClick={() => setSelectedType((prev) => (prev === type.type ? null : type.type))}
            className="flex items-center gap-2"
          >
            <Image
              src={type.iconImg}
              alt={type.label}
              width={20}
              height={20}
              style={{ height: "auto", width: "auto" }}
            />
            {type.label}
          </Button>
        ))}
      </div>

      <div className="w-full space-y-6 px-4">
        {renderCharGroup(6, "🌟 6성", "text-purple-600 dark:text-purple-400")}
        {renderCharGroup(5, "⭐ 5성", "text-yellow-600 dark:text-yellow-300")}
      </div>
    </div>
  );
}
