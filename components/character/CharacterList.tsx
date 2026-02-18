"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
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

const TYPES: { type: RoleType | null; labelKey: string; iconImg?: string }[] = [
  { type: null, labelKey: "all" },
  { type: "damage", labelKey: "damage", iconImg: "/infos/resonance_img/damage.webp" },
  { type: "support", labelKey: "support", iconImg: "/infos/resonance_img/support.webp" },
  { type: "balance", labelKey: "balance", iconImg: "/infos/resonance_img/balance.webp" },
  { type: "defense", labelKey: "defense", iconImg: "/infos/resonance_img/defense.webp" },
];

const attrMap: { labelKey: string; value: string; icon?: string }[] = [
  { labelKey: "all", value: "all" },
  { labelKey: "beast", value: "beast", icon: "/infos/inspiration/beast.webp" },
  { labelKey: "star", value: "star", icon: "/infos/inspiration/star.webp" },
  { labelKey: "mineral", value: "mineral", icon: "/infos/inspiration/mineral.webp" },
  { labelKey: "plant", value: "plant", icon: "/infos/inspiration/plant.webp" },
  { labelKey: "spirit", value: "spirit", icon: "/infos/inspiration/spirit.webp" },
  { labelKey: "intellect", value: "intellect", icon: "/infos/inspiration/intellect.webp" },
];

export default function CharacterList() {
  const t = useTranslations("character");
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

  const hasSmallImage = (rarity: number) => rarity >= 5;

  const renderCharGroup = (rarity: number, labelKey: string, colorClass: string) => {
    const group = filteredChars.filter((ch) => ch.rarity === rarity);
    if (group.length === 0) return null;

    return (
      <div className="space-y-2">
        <h2 className={`text-xl font-bold ${colorClass} pb-2`}>{t(labelKey)}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(92px,1fr))] gap-1">
          {group.map((ch) => (
            <Link key={`${ch.id}-${ch.version}`} href={`/character/${ch.id}`}>
              <div className="flex cursor-pointer flex-col items-center rounded border border-gray-400 p-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="relative h-16 w-16 overflow-hidden">
                  <Image
                    src={getCharacterUrl(`${ch.rarity}stars`, `${ch.engName}.webp`, hasSmallImage(ch.rarity))}
                    alt={ch.name}
                    width={64}
                    height={64}
                    className={`h-full w-full rounded ${hasSmallImage(ch.rarity) ? "object-contain" : "object-cover object-top"}`}
                  />
                  {ch.version && (
                    <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white shadow">
                      {ch.version === "2.75" ? t("collab") : ch.version}
                    </div>
                  )}
                  {hasEuphoria(ch.id) && (
                    <div className="absolute bottom-0 left-0 rounded-sm bg-rose-600 px-1 py-[1px] text-[10px] text-white shadow">
                      {t("euphoria")}
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
        {t("guide")}
      </h1>

      {/* 검색 바 */}
      <div className="mb-4 flex w-full max-w-md justify-center">
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
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
            {t("resetFilter")}
          </Button>
        )}

        {/* 공명 타입 드롭다운 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {TYPES.find((tp) => tp.type === selectedType)?.iconImg && (
                <Image
                  src={TYPES.find((tp) => tp.type === selectedType)!.iconImg!}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              )}
              <span>{t(TYPES.find((tp) => tp.type === selectedType)?.labelKey || "resonanceType")}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            {TYPES.map((type) => (
              <DropdownMenuItem
                key={type.labelKey}
                onClick={() => setSelectedType(type.type)}
                className="flex cursor-pointer items-center gap-2"
              >
                {type.iconImg && (
                  <Image
                    src={type.iconImg}
                    alt={t(type.labelKey)}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                )}
                <span>{t(type.labelKey)}</span>
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
              <span>{t(attrMap.find((a) => a.value === selectedAttr)?.labelKey || "attribute")}</span>
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
                    alt={t(attr.labelKey)}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                )}
                <span>{t(attr.labelKey)}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 캐릭터 리스트 */}
      <div className="w-full space-y-6 px-4">
        {renderCharGroup(6, "rarity6", "text-purple-600 dark:text-purple-400")}
        {renderCharGroup(5, "rarity5", "text-yellow-600 dark:text-yellow-300")}
        {renderCharGroup(4, "rarity4", "text-blue-600 dark:text-blue-300")}
        {renderCharGroup(3, "rarity3", "text-green-600 dark:text-green-300")}
        {renderCharGroup(2, "rarity2", "text-gray-600 dark:text-gray-300")}
      </div>
    </div>
  );
}
