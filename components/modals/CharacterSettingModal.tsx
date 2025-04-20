"use client";

import Image from "next/image";
import { Character } from "@/data/characters";
import { CHARACTER_SETTING_DATA } from "@/data/character_setting_data";
import { PSYCUBE_DATA } from "@/data/psycube_data";

interface CharacterSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
}

export function CharacterSettingModal({
  isOpen,
  onClose,
  character,
}: CharacterSettingModalProps) {
  if (!isOpen) return null;

  const setting = CHARACTER_SETTING_DATA.find((c) => c.character_id === character.id);

  const psycube_list = (setting?.psycubes || []).map((p) => {
    const psycube = PSYCUBE_DATA.find((d) => d.id === p.psycube_id);
    return {
      src: `/infos/psycube_img/${psycube?.engName}.png`,
      label: psycube?.name || "",
      description: p.description,
      type: psycube?.type,
      version: psycube?.version,
    };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl sm:max-w-sm lg:max-w-2xl p-4 sm:p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white text-2xl font-bold"
        >
          ×
        </button>

        {/* 제목 */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-white">
          {character.name}
        </h2>

        {/* 상단 이미지 + 공명 정보 */}
        <div className="flex flex-row sm:flex-row justify-center items-center gap-4 mb-6">
          <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] overflow-hidden rounded border dark:border-gray-700">
            <Image
              src={`/characters/${character.rarity}stars/${character.engName}.png`}
              alt={character.name}
              width={150}
              height={300}
              className="object-cover object-top w-full h-auto"
            />
          </div>

          <div className="flex flex-col items-center text-center bg-gray-500 dark:bg-gray-800 p-2 rounded">
            <a
              href={`https://sites.google.com/view/reverse1999resonance/%EC%BA%90%EB%A6%AD%ED%84%B0-%EA%B3%B5%EB%AA%85/${character.rarity}성/${encodeURIComponent(
                character.name.toLowerCase().replace(/ /g, "-")
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`/infos/resonance_img/${character.resonanceType}.webp`}
                alt="공명 정보"
                width={100}
                height={100}
                className="rounded border hover:opacity-90 transition"
              />
              <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                공명정보
              </span>
            </a>
          </div>
        </div>

        {/* 사이큐브 목록 */}
        <div className="grid grid-cols-4 gap-3">
          {psycube_list.map((item, idx) => (
            <div key={idx} className="text-center space-y-1 sm:space-y-2">
              <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] mx-auto">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover rounded border dark:border-gray-700"
                />
                <div className="absolute bottom-1 left-1 bg-purple-600 text-white text-[9px] px-1 py-[1px] rounded-sm shadow">
                  {item.type}
                </div>
                <div className="absolute bottom-1 right-1 bg-blue-600 text-white text-[9px] px-1 py-[1px] rounded-sm shadow">
                  v{item.version}
                </div>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-white">{item.label}</div>
              <p className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-300 px-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}