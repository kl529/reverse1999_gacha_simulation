"use client";

import { useState, useEffect, useCallback } from "react";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { euphoriaList } from "@/data/euphoria";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCharacterUrl } from "@/lib/cdn";

type RoleType = "damage" | "support" | "balance" | "defense";

const TYPES: { type: RoleType | null; label: string; iconImg?: string }[] = [
  {
    type: null,
    label: "전체",
  },
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

const attrMap: { label: string; value: string; icon?: string }[] = [
  { label: "전체", value: "all" },
  { label: "야수", value: "beast", icon: "/infos/inspiration/beast.webp" },
  { label: "천체", value: "star", icon: "/infos/inspiration/star.webp" },
  { label: "암석", value: "mineral", icon: "/infos/inspiration/mineral.webp" },
  { label: "나무", value: "plant", icon: "/infos/inspiration/plant.webp" },
  { label: "영혼", value: "spirit", icon: "/infos/inspiration/spirit.webp" },
  { label: "지능", value: "intellect", icon: "/infos/inspiration/intellect.webp" },
];

export default function CharacterList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<RoleType | null>(
    (searchParams.get("type") as RoleType) || null
  );
  const [selectedAttr, setSelectedAttr] = useState<string>(searchParams.get("attr") || "all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // URL 업데이트 함수
  const updateURL = useCallback(
    (type: RoleType | null, attr: string, query: string) => {
      const params = new URLSearchParams();
      if (type) params.set("type", type);
      if (attr !== "all") params.set("attr", attr);
      if (query) params.set("q", query);

      const newURL = params.toString() ? `/character?${params.toString()}` : "/character";
      router.replace(newURL, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    updateURL(selectedType, selectedAttr, debouncedQuery);
  }, [selectedType, selectedAttr, debouncedQuery, updateURL]);

  const reversedChars = [...SETTING_CHARACTERS].reverse();

  const filteredChars = reversedChars.filter((ch) => {
    const matchesType = selectedType ? ch.resonanceType === selectedType : true;
    const matchesSearch =
      ch.name.includes(debouncedQuery) ||
      ch.engName.toLowerCase().includes(debouncedQuery.toLowerCase());
    const matchesAttr = selectedAttr === "all" || ch.inspiration === selectedAttr;
    return matchesType && matchesSearch && matchesAttr;
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
                    src={getCharacterUrl(`${ch.rarity}stars`, `${ch.engName}.webp`, true)}
                    alt={ch.name}
                    width={64}
                    height={64}
                    className="h-full w-full rounded object-contain"
                  />
                  {ch.version && (
                    <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white shadow">
                      {ch.version === "2.75" ? "콜라보" : ch.version}
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

      {/* 검색 바 */}
      <div className="mb-4 flex w-full max-w-md justify-center">
        <Input
          type="text"
          placeholder="캐릭터 이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 필터 드롭다운 */}
      <div className="mb-4 flex flex-wrap justify-center gap-3">
        {/* 필터 초기화 버튼 */}
        {(selectedType !== null || selectedAttr !== "all" || searchQuery !== "") && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedType(null);
              setSelectedAttr("all");
              setSearchQuery("");
            }}
            className="flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            초기화
          </Button>
        )}

        {/* 공명 타입 드롭다운 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {TYPES.find((t) => t.type === selectedType)?.iconImg && (
                <Image
                  src={TYPES.find((t) => t.type === selectedType)!.iconImg!}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              )}
              <span>{TYPES.find((t) => t.type === selectedType)?.label || "공명 타입"}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            {TYPES.map((type) => (
              <DropdownMenuItem
                key={type.label}
                onClick={() => setSelectedType(type.type)}
                className="flex cursor-pointer items-center gap-2"
              >
                {type.iconImg && (
                  <Image
                    src={type.iconImg}
                    alt={type.label}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                )}
                <span>{type.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 속성 드롭다운 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {attrMap.find((a) => a.value === selectedAttr)?.icon && (
                <Image
                  src={attrMap.find((a) => a.value === selectedAttr)!.icon!}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              )}
              <span>{attrMap.find((a) => a.value === selectedAttr)?.label || "속성"}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            {attrMap.map((attr) => (
              <DropdownMenuItem
                key={attr.value}
                onClick={() => setSelectedAttr(attr.value)}
                className="flex cursor-pointer items-center gap-2"
              >
                {attr.icon && (
                  <Image
                    src={attr.icon}
                    alt={attr.label}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                )}
                <span>{attr.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 캐릭터 리스트 */}
      <div className="w-full space-y-6 px-4">
        {renderCharGroup(6, "🌟 6성", "text-purple-600 dark:text-purple-400")}
        {renderCharGroup(5, "⭐ 5성", "text-yellow-600 dark:text-yellow-300")}
      </div>
    </div>
  );
}
