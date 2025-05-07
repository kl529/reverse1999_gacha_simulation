"use client";

import { useState, useEffect } from "react";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import Image from "next/image";
import Link from "next/link";

type RoleType = "damage" | "support" | "balance" | "defense";

const TYPES: { type: RoleType; label: string; iconImg: string }[] = [
  { type: "damage", label: "공격", iconImg: "/infos/resonance_img/damage.webp" },
  { type: "support", label: "보조", iconImg: "/infos/resonance_img/support.webp" },
  { type: "balance", label: "밸런스", iconImg: "/infos/resonance_img/balance.webp" },
  { type: "defense", label: "방어", iconImg: "/infos/resonance_img/defense.webp" },
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
        <h2 className={`text-xl font-bold ${colorClass}`}>{label}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(76px,1fr))] gap-2">
          {group.map((ch) => (
            <Link key={ch.id} href={`/character_setting/${ch.id}`}>
              <div className="border border-gray-400 rounded p-1 flex flex-col items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
                <div className="relative w-10 h-10">
                  <Image
                    src={`/characters/${ch.rarity}stars_small/${ch.engName}.png`}
                    alt={ch.name}
                    fill
                    className="object-contain rounded"
                  />
                  {ch.version && (
                    <div className="absolute bottom-0 right-0 bg-blue-600 text-white text-[8px] px-1 py-[1px] rounded-sm shadow">
                      {ch.version}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500 truncate w-full text-center font-bold dark:text-gray-100">
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
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 dark:text-gray-200 p-4 flex flex-col items-center">
      <h1 className="text-2xl lg:text-3xl font-bold mt-8 mb-4 text-black text-center sticky top-0 z-20 p-3 dark:text-gray-100">
        공명 & 의지 찾기
      </h1>

      {/* 검색창 */}
      <div className="mb-4 w-full max-w-md flex justify-center">
        <input
          type="text"
          placeholder="캐릭터 이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* 공명 역할 필터 */}
      <div className="flex gap-2 mb-4 flex-wrap justify-center">
        {TYPES.map((type) => (
          <button
            key={type.type}
            onClick={() => setSelectedType((prev) => (prev === type.type ? null : type.type))}
            className={`px-4 py-2 rounded border font-semibold text-sm flex items-center gap-2 ${
              selectedType === type.type
                ? "bg-blue-600 text-white"
                : "bg-gray-400 text-gray-800 dark:bg-gray-700 dark:text-white"
            }`}
          >
            <Image src={type.iconImg} alt={type.label} width={20} height={20} />
            {type.label}
          </button>
        ))}
      </div>

      {/* 캐릭터 그룹 */}
      <div className="w-full px-4 space-y-6">
        {renderCharGroup(6, "🌟 6성", "text-purple-600 dark:text-purple-400")}
        {renderCharGroup(5, "⭐ 5성", "text-yellow-600 dark:text-yellow-300")}
      </div>
    </div>
  );
}