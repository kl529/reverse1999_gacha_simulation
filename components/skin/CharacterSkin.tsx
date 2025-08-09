"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { characterSkin } from "@/data/character_skin";
import { charactersByRarity } from "@/data/characters";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";

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
    setSearchTerm("");
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
    <div className="flex h-full w-full flex-col overflow-hidden p-4">
      <div className="flex-none">
        <h1 className="mb-6 mt-8 text-center text-2xl font-bold text-black dark:text-white lg:text-3xl">
          스킨 갤러리
        </h1>

        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <Select value={rarityFilter} onValueChange={setRarityFilter}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="희귀도" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전체">전체</SelectItem>
              {rarityList.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={versionFilter} onValueChange={setVersionFilter}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="버전" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전체">전체</SelectItem>
              {versionList.map((v) => (
                <SelectItem key={v} value={v}>
                  {v === "2.75" ? "콜라보" : v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="획득처" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전체">전체</SelectItem>
              {sourceList.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <PopoverTrigger asChild>
              <button className="h-9 w-40 rounded border border-black px-3 py-2 text-left text-sm text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                {selectedCharacters.length > 0 ? selectedCharacters.join(", ") : "캐릭터 필터"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-46 p-0" ref={dropdownRef}>
              <Command>
                <CommandInput
                  placeholder="캐릭터 검색..."
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                />
                <CommandList className="max-h-60 overflow-y-auto">
                  {allCharacterNames
                    .filter((name) => name.includes(searchTerm))
                    .map((name) => (
                      <CommandItem
                        key={name}
                        onSelect={() => toggleCharacter(name)}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={selectedCharacters.includes(name)} />
                          <span>{name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {skinCountByCharacter[name] || 0}개
                        </span>
                      </CommandItem>
                    ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button variant="destructive" onClick={resetFilters}>
            초기화
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredSkins.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            해당 조건에 맞는 스킨이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
            {filteredSkins
              .sort((a, b) => b.id - a.id)
              .map((skin) => (
                <Link href={`/skin/${skin.id}`} key={skin.id}>
                  <div className="cursor-pointer overflow-hidden rounded border border-gray-200 transition dark:border-gray-700">
                    <div className="relative">
                      <Image
                        src={`/infos/character_skin/list/${skin.engName}.webp`}
                        alt={skin.name}
                        width={300}
                        height={400}
                        className="h-auto w-full object-cover"
                      />
                      <span className="absolute bottom-2 right-2 rounded bg-orange-300 px-2 py-0.5 text-xs text-white dark:bg-orange-700">
                        {skin.version === "2.75" ? "콜라보" : skin.version}
                      </span>
                      {skin.tarot_number && (
                        <span className="absolute bottom-2 left-2 rounded bg-purple-500 px-2 py-0.5 text-xs text-white">
                          타로 {skin.tarot_number}번
                        </span>
                      )}
                    </div>
                    <div className="truncate bg-white p-2 text-center text-sm font-medium text-black dark:bg-gray-900 dark:text-white">
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
