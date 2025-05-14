// deprecated
"use client";

import Image from "next/image";
import { Character } from "@/data/characters";
import { character_setting_data } from "@/data/character_setting_data";
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

  const setting = character_setting_data.find(
    (c) => c.character_id === character.id,
  );

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
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-4 shadow-xl dark:bg-gray-900 sm:max-w-sm sm:p-6 lg:max-w-2xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-5 top-3 text-2xl font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          ×
        </button>

        {/* 제목 */}
        <h2 className="mb-4 text-center text-xl font-bold text-gray-800 dark:text-white sm:mb-6 sm:text-2xl">
          {character.name}
        </h2>

        {/* 상단 이미지 + 공명 정보 */}
        <div className="mb-6 flex flex-row items-center justify-center gap-4 sm:flex-row">
          <div className="h-[120px] w-[120px] overflow-hidden rounded border dark:border-gray-700 sm:h-[150px] sm:w-[150px]">
            <Image
              src={`/characters/${character.rarity}stars/${character.engName}.png`}
              alt={character.name}
              width={150}
              height={300}
              className="h-auto w-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col items-center rounded bg-gray-500 p-2 text-center dark:bg-gray-800">
            <a
              href={`https://sites.google.com/view/reverse1999resonance/%EC%BA%90%EB%A6%AD%ED%84%B0-%EA%B3%B5%EB%AA%85/${character.rarity}성/${encodeURIComponent(
                character.name.toLowerCase().replace(/ /g, "-"),
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`/infos/resonance_img/${character.resonanceType}.webp`}
                alt="공명 정보"
                width={100}
                height={100}
                className="rounded border transition hover:opacity-90"
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
            <div key={idx} className="space-y-1 text-center sm:space-y-2">
              <div className="relative mx-auto h-[80px] w-[80px] sm:h-[100px] sm:w-[100px]">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="rounded border object-cover dark:border-gray-700"
                />
                <div className="absolute bottom-1 left-1 rounded-sm bg-purple-600 px-1 py-[1px] text-[9px] text-white shadow">
                  {item.type}
                </div>
                <div className="absolute bottom-1 right-1 rounded-sm bg-blue-600 px-1 py-[1px] text-[9px] text-white shadow">
                  v{item.version}
                </div>
              </div>
              <div className="text-xs font-semibold text-gray-800 dark:text-white sm:text-sm">
                {item.label}
              </div>
              <p className="px-1 text-[11px] text-gray-600 dark:text-gray-300 sm:text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
