"use client";

import { useState, useEffect } from "react";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import Image from "next/image";
import Link from "next/link";
import { CharacterSettingModal } from "@/components/modals/CharacterSettingModal";

type RoleType = "damage" | "support" | "balance" | "defense";
type Mode = "의지" | "공명";

const TYPES: { type: RoleType; label: string; iconImg: string }[] = [
  { type: "damage", label: "공격", iconImg: "/infos/resonance_img/damage.webp" },
  { type: "support", label: "보조", iconImg: "/infos/resonance_img/support.webp" },
  { type: "balance", label: "밸런스", iconImg: "/infos/resonance_img/balance.webp" },
  { type: "defense", label: "방어", iconImg: "/infos/resonance_img/defense.webp" },
];

export default function CharacterSetting() {
  const [selectedType, setSelectedType] = useState<RoleType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharId, setSelectedCharId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("characterMode");
      if (saved === "공명" || saved === "의지") return saved as Mode;
    }
    return "의지";
  });

  const selectedChar = selectedCharId
    ? SETTING_CHARACTERS.find((ch) => ch.id === selectedCharId)
    : null;

  useEffect(() => {
    const storedMode = localStorage.getItem("characterMode");
    if (storedMode === "공명" || storedMode === "의지") {
      setMode(storedMode as Mode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("characterMode", mode);
    if (mode === "의지") {
      setSelectedType(null);
      setSearchQuery("");
    }
  }, [mode]);

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
          {group.map((ch) => {
            const charElement = (
              <div
                key={ch.id}
                className={`border border-gray-400 rounded p-1 flex flex-col items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer ${
                  ch.is_future ? "bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800" : ""
                }`}
                onClick={() => {
                  if (mode === "의지") {
                    setSelectedCharId(ch.id);
                    setIsModalOpen(true);
                  }
                }}
              >
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
            );

            return mode === "공명" ? (
              <Link
                key={ch.id}
                href={`https://sites.google.com/view/reverse1999resonance/%EC%BA%90%EB%A6%AD%ED%84%B0-%EA%B3%B5%EB%AA%85/${ch.rarity}성/${encodeURIComponent(
                  ch.name.toLowerCase().replace(/ /g, "-")
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {charElement}
              </Link>
            ) : (
              <div key={ch.id}>{charElement}</div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 dark:text-gray-200 p-4 flex flex-col items-center">
      <h1 className="text-2xl lg:text-3xl font-bold mt-8 mb-4 text-black text-center sticky top-0 z-20 p-3 dark:text-gray-100">
        공명 & 의지 찾기
      </h1>

      <div className="flex gap-2 mb-4">
        {([
          { mode: "의지", img: "/infos/menu/psycube_menu.png" },
          { mode: "공명", img: "/infos/menu/resonance_menu.png" },
        ] as { mode: Mode; img: string }[]).map(({ mode: m, img }) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded border font-semibold flex items-center gap-2 ${
              mode === m
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white"
            }`}
          >
            <Image src={img} alt={m} width={20} height={20} />
            {m}
          </button>
        ))}
      </div>

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

      {/* 캐릭터 그룹 */}
      <div className="w-full px-4 space-y-6">
        {renderCharGroup(6, "🌟 6성", "text-purple-600 dark:text-purple-400")}
        {renderCharGroup(5, "⭐ 5성", "text-yellow-600 dark:text-yellow-300")}
      </div>

      {/* 내부 모달 */}
      {selectedChar && mode === "의지" && (
        <CharacterSettingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          character={selectedChar}
        />
      )}

      {mode === "공명" && (
        <div className="flex gap-2 mt-4 flex-wrap justify-center">
          {TYPES.map((type) => (
            <button
              key={type.type}
              onClick={() =>
                setSelectedType((prev) => (prev === type.type ? null : type.type))
              }
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
      )}
    </div>
  );
}