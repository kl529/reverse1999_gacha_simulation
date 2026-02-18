"use client";

import { useState, useEffect } from "react";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type RoleType = "damage" | "support" | "balance" | "defense";

const ROLE_KEYS: { type: RoleType; labelKey: string; iconImg: string }[] = [
  {
    type: "damage",
    labelKey: "damage",
    iconImg: "/infos/resonance_img/damage.webp",
  },
  {
    type: "support",
    labelKey: "support",
    iconImg: "/infos/resonance_img/support.webp",
  },
  {
    type: "balance",
    labelKey: "balance",
    iconImg: "/infos/resonance_img/balance.webp",
  },
  {
    type: "defense",
    labelKey: "defense",
    iconImg: "/infos/resonance_img/defense.webp",
  },
];

export default function CharacterSetting() {
  const t = useTranslations("characterSetting");
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

  const renderCharGroup = (rarity: number, labelKey: string, colorClass: string) => {
    const group = filteredChars.filter((ch) => ch.rarity === rarity);
    if (group.length === 0) return null;

    return (
      <div className="space-y-2">
        <h2 className={`text-xl font-bold ${colorClass} pb-2`}>{t(labelKey)}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(92px,1fr))] gap-1">
          {group.map((ch) => (
            <Link key={`${ch.id}-${ch.version}`} href={`/character_setting/${ch.id}`}>
              <div className="flex cursor-pointer flex-col items-center rounded border border-gray-400 p-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="relative h-16 w-16 overflow-hidden">
                  <Image
                    src={`/characters/${ch.rarity >= 5 ? `${ch.rarity}stars_small` : `${ch.rarity}stars`}/${ch.engName}.webp`}
                    alt={ch.name}
                    width={64}
                    height={64}
                    className={`h-full w-full rounded ${ch.rarity >= 5 ? "object-contain" : "object-cover object-top"}`}
                  />
                  {ch.version && (
                    <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white shadow">
                      {ch.version === "2.75" ? t("collab") : ch.version}
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
        {t("title")}
      </h1>

      <div className="mb-4 flex w-full max-w-md justify-center">
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {ROLE_KEYS.map((type) => (
          <Button
            key={type.type}
            variant={selectedType === type.type ? "default" : "outline"}
            onClick={() => setSelectedType((prev) => (prev === type.type ? null : type.type))}
            className="flex items-center gap-2"
          >
            <Image
              src={type.iconImg}
              alt={t(type.labelKey)}
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
            {t(type.labelKey)}
          </Button>
        ))}
      </div>

      <div className="w-full space-y-6 px-4">
        {renderCharGroup(6, "star6", "text-purple-600 dark:text-purple-400")}
        {renderCharGroup(5, "star5", "text-yellow-600 dark:text-yellow-300")}
        {renderCharGroup(4, "star4", "text-blue-600 dark:text-blue-300")}
        {renderCharGroup(3, "star3", "text-green-600 dark:text-green-300")}
        {renderCharGroup(2, "star2", "text-gray-600 dark:text-gray-300")}
      </div>
    </div>
  );
}
