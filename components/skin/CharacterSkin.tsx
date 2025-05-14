"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { characterSkin } from "@/data/character_skin";
import { charactersByRarity } from "@/data/characters";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SkinGalleryPage() {
  const [rarityFilter, setRarityFilter] = useState<string>("전체");
  const [sourceFilter, setSourceFilter] = useState<string>("전체");
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const rarityList = Array.from(new Set(characterSkin.map((s) => s.rarity)));
  const versionList = Array.from(new Set(characterSkin.map((s) => s.version)));
  const sourceList = Array.from(new Set(characterSkin.map((s) => s.source)));

  const searchParams = useSearchParams();
  const defaultVersion = searchParams.get("version");
  const [versionFilter, setVersionFilter] = useState<string>(defaultVersion || "전체");

  useEffect(() => {
    if (defaultVersion && versionList.includes(defaultVersion)) {
      setVersionFilter(defaultVersion);
    }
  }, [defaultVersion, versionList]);

  const allCharacters = Object.values(charactersByRarity).flat();
  const characterNameMap = Object.fromEntries(allCharacters.map((c) => [c.id, c.name]));

  const allCharacterNames = allCharacters
    .map((c) => c.name)
    .sort((a, b) => a.localeCompare(b, "ko"));

  const skinCountByCharacter: Record<string, number> = {};
  characterSkin.forEach((skin) => {
    const name = characterNameMap[skin.character_id] || "알 수 없음";
    skinCountByCharacter[name] = (skinCountByCharacter[name] || 0) + 1;
  });

  const toggleCharacter = (name: string) => {
    setSelectedCharacters((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const resetFilters = () => {
    setRarityFilter("전체");
    setVersionFilter("전체");
    setSourceFilter("전체");
    setSelectedCharacters([]);
    setSearchTerm(""); // ⬅️ 검색어 초기화
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSkins = characterSkin.filter((skin) => {
    const matchRarity = rarityFilter === "전체" || skin.rarity === rarityFilter;
    const matchVersion = versionFilter === "전체" || skin.version === versionFilter;
    const matchSource = sourceFilter === "전체" || skin.source === sourceFilter;
    const matchCharacter =
      selectedCharacters.length === 0 ||
      selectedCharacters.includes(characterNameMap[skin.character_id]);
    return matchRarity && matchVersion && matchSource && matchCharacter;
  });

  return (
    <div className="p-4 w-full flex flex-col">
      <div className="sticky top-0 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white mt-8 text-black">
          스킨 갤러리
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <select
            className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white text-black border-black"
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value)}
          >
            <option value="전체">희귀도</option>
            {rarityList.map((rarity) => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select>

          <select
            className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white text-black border-black"
            value={versionFilter}
            onChange={(e) => setVersionFilter(e.target.value)}
          >
            <option value="전체">버전</option>
            {versionList.map((version) => (
              <option key={version} value={version}>{version}</option>
            ))}
          </select>

          <select
            className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white text-black border-black"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="전체">획득처</option>
            {sourceList.map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 border rounded w-52 text-left dark:bg-gray-800 dark:border-gray-700 dark:text-white text-black border-black"
            >
              {selectedCharacters.length > 0
                ? selectedCharacters.join(", ")
                : "캐릭터 필터"}
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded w-52 shadow-lg">
                <input
                  type="text"
                  placeholder="검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
                />
                {allCharacterNames
                  .filter((name) => name.includes(searchTerm))
                  .map((name) => (
                    <label
                      key={name}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between text-black"
                    >
                      <div>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedCharacters.includes(name)}
                          onChange={() => toggleCharacter(name)}
                        />
                        {name}
                      </div>
                      <span className="text-xs text-gray-500">{skinCountByCharacter[name] || 0}개</span>
                    </label>
                  ))}
              </div>
            )}
          </div>

          <button
            onClick={resetFilters}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            초기화
          </button>
        </div>
      </div>

      <div>
        {filteredSkins.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-10">
            해당 조건에 맞는 스킨이 없습니다.
          </div>
        ) : (
          <div className="grid gap-2 sm:gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
            {filteredSkins
              .sort((a, b) => b.id - a.id)
              .map((skin) => (
                <Link href={`/skin/${skin.id}`} key={skin.id}>
                  <div className="cursor-pointer rounded transition border border-gray-200 dark:border-gray-700">
                    <div>
                      <Image
                        src={`/infos/character_skin/list/${skin.engName}.webp`}
                        alt={skin.name}
                        width={300}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                      <span className="absolute bottom-2 right-2 bg-orange-300 dark:bg-orange-700 text-xs text-white px-2 py-0.5 rounded">
                        {skin.version}
                      </span>
                    </div>
                    <div className="p-2 text-center font-medium text-sm truncate bg-white dark:bg-gray-900 dark:text-white text-black">
                      {skin.name}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
