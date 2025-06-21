"use client";

import { useState, useEffect } from "react";
import { GUIDE_CHARACTERS } from "@/data/setting_character";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { euphoriaList } from "@/data/euphoria";

export default function Character() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const reversedChars = [...GUIDE_CHARACTERS].reverse();

  const filteredChars = reversedChars.filter((ch) => {
    const matchesSearch =
      ch.name.includes(debouncedQuery) ||
      ch.engName.toLowerCase().includes(debouncedQuery.toLowerCase());
    return matchesSearch;
  });

  // 캐릭터별 광상 데이터 매핑
  const hasEuphoria = (characterId: number) => {
    return euphoriaList.some((euphoria) => euphoria.character_id === characterId);
  };

  const renderCharGroup = (rarity: number, label: string, colorClass: string) => {
    const group = filteredChars.filter((ch) => ch.rarity === rarity);
    if (group.length === 0) return null;

    return (
      <div className="space-y-2">
        <h2 className={`text-xl font-bold ${colorClass} pb-2`}>{label}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(92px,1fr))] gap-1">
          {group.map((ch) => (
            <Link key={`${ch.id}-${ch.version}`} href={`/character/${ch.id}`}>
              <div className="flex cursor-pointer flex-col items-center rounded border border-gray-400 p-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="relative h-16 w-16">
                  <Image
                    src={`/characters/${ch.rarity}stars_small/${ch.engName}.webp`}
                    alt={ch.name}
                    width={64}
                    height={64}
                    className="h-full w-full rounded object-contain"
                  />
                  {ch.version && (
                    <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white shadow">
                      {ch.version}
                    </div>
                  )}
                  {hasEuphoria(ch.id) && (
                    <div className="absolute bottom-0 left-0 rounded-sm bg-rose-600 px-1 py-[1px] text-[10px] text-white shadow">
                      광상
                    </div>
                  )}
                </div>
                <div className="w-full truncate text-center text-sm font-bold text-black dark:text-gray-100">
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
        캐릭터 가이드
      </h1>

      <div className="mb-4 flex w-full max-w-md justify-center">
        <Input
          type="text"
          placeholder="캐릭터 이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-full space-y-6 px-4">
        {renderCharGroup(6, "🌟 6성", "text-purple-600 dark:text-purple-400")}
        {renderCharGroup(5, "⭐ 5성", "text-yellow-600 dark:text-yellow-300")}
      </div>
    </div>
  );
}
