"use client";

import { useState } from "react";
import Image from "next/image";
import { characterSkin, CharacterSkin } from "@/data/character_skin";
import SkinInfoModal from "@/components/modals/SkinInfoModal";

export default function SkinGalleryPage() {
  const [selectedSkin, setSelectedSkin] = useState<CharacterSkin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rarityFilter, setRarityFilter] = useState<string>("전체");
  const [versionFilter, setVersionFilter] = useState<string>("전체");
  const [sourceFilter, setSourceFilter] = useState<string>("전체");

  const handleOpenModal = (skin: CharacterSkin) => {
    setSelectedSkin(skin);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkin(null);
  };

  const filteredSkins = characterSkin.filter((skin) => {
    const matchRarity = rarityFilter === "전체" || skin.rarity === rarityFilter;
    const matchVersion = versionFilter === "전체" || skin.version === versionFilter;
    const matchSource = sourceFilter === "전체" || skin.source === sourceFilter;
    return matchRarity && matchVersion && matchSource;
  });

  const rarityList = Array.from(new Set(characterSkin.map((s) => s.rarity)));
  const versionList = Array.from(new Set(characterSkin.map((s) => s.version)));
  const sourceList = Array.from(new Set(characterSkin.map((s) => s.source)));

  return (
    <div className="p-4 w-full h-full flex flex-col overflow-hidden">
      <div className="flex-none">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white mt-8">스킨 갤러리</h1>

        {/* 🔥 필터 박스 */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {/* 희귀도 필터 */}
          <select
            className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value)}
          >
            <option value="전체">전체 희귀도</option>
            {rarityList.map((rarity) => (
              <option key={rarity} value={rarity}>
                {rarity}
              </option>
            ))}
          </select>

          {/* 버전 필터 */}
          <select
            className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={versionFilter}
            onChange={(e) => setVersionFilter(e.target.value)}
          >
            <option value="전체">전체 버전</option>
            {versionList.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>

          {/* 획득처 필터 */}
          <select
            className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="전체">전체 획득처</option>
            {sourceList.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-2 sm:gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
          {filteredSkins
            .sort((a, b) => b.id - a.id)
            .map((skin) => (
              <div
                key={skin.id}
                className="cursor-pointer rounded transition border border-gray-200 dark:border-gray-700 overflow-hidden"
                onClick={() => handleOpenModal(skin)}
              >
                <div className="relative">
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
                <div className="p-2 text-center font-medium text-sm truncate bg-white dark:bg-gray-900 dark:text-white">
                  {skin.name}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 🔥 모달 */}
      {selectedSkin && (
        <SkinInfoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          characterSkin={selectedSkin}
        />
      )}
    </div>
  );
}