"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CharacterSkin } from "@/data/character_skin";
import { charactersByRarity } from "@/data/characters";

export default function SkinInfoModal({
  isOpen,
  onClose,
  characterSkin,
}: {
  isOpen: boolean;
  onClose: () => void;
  characterSkin: CharacterSkin;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const findCharacterNameById = (id: number): string => {
    for (const rarity in charactersByRarity) {
      const found = charactersByRarity[Number(rarity)].find((c) => c.id === id);
      if (found) return found.name;
    }
    return "알 수 없음";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg w-full max-w-3xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-black hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
        >
          ✕
        </button>

        <div className="flex flex-col gap-6 mt-8">
          <h2 className="text-2xl font-bold text-center">
            {characterSkin.name} - {findCharacterNameById(characterSkin.character_id)}
          </h2>

          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-orange-200 dark:bg-orange-700 text-sm px-3 py-1 rounded-full">
              버전: {characterSkin.version}
            </span>
            <span className="bg-sky-200 dark:bg-sky-700 text-sm px-3 py-1 rounded-full">
              희귀도: {characterSkin.rarity}
            </span>
            <span className="bg-green-200 dark:bg-green-700 text-sm px-3 py-1 rounded-full">
              획득처: {characterSkin.source}
            </span>
          </div>

          {/* ✨ 일러스트 단독 */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-3xl aspect-[9/7]">
              <Image
                src={`/infos/character_skin/illust/${characterSkin.engName}.webp`}
                alt={`${characterSkin.name} 일러스트`}
                fill
                style={{
                  objectFit: "contain",
                }}
                className="rounded-lg"
                unoptimized
              />
            </div>
          </div>

          {/* ✨ standing + mini (가로로 2개) */}
          <div className="flex flex-wrap justify-center gap-6">
            {["standing", "mini"].map((type) => (
              <div key={type} className="w-[300px] aspect-[3/5] relative">
                <Image
                  src={`/infos/character_skin/${type}/${characterSkin.engName}.webp`}
                  alt={`${characterSkin.name} ${type}`}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  className="rounded-lg"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}