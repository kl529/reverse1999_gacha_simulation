"use client";

import { Character } from "@/data/characters";
import { Banner } from "@/data/banners";
import Image from "next/image";

interface SixStarHistoryProps {
  sixStarHistory: {
    char: Character;
    pullNumber: number;
  }[];
  selectedBanner: Banner;
  pickupCount: number;
  nonPickupCount: number;
  historyRef: React.RefObject<HTMLDivElement | null>;
}

export default function MainSixStarHistory({
  sixStarHistory,
  selectedBanner,
  pickupCount,
  nonPickupCount,
  historyRef,
}: SixStarHistoryProps) {
  return (
    <div
      className="
        w-full h-full
        p-4 
        bg-white dark:bg-gray-800
        shadow rounded-lg
        border dark:border-gray-700
        overflow-y-auto
      "
    >
      <h2 className="text-lg lg:text-xl font-semibold mb-2 sticky top-0 bg-white z-10 p-2 border-b text-black dark:text-gray-100 dark:bg-gray-800">
        💡 획득한 6성
      </h2>

      {/* 픽업 vs 일반 6성 횟수 */}
      <div className="sticky top-[48px] bg-gray-100 z-10 p-2 border-b text-gray-700 dark:text-gray-300 dark:bg-gray-800 flex justify-between text-xs lg:text-sm font-semibold rounded-lg mb-2 dark:border dark:border-gray-700">
        <p className="text-green-600 dark:text-green-400">픽업: {pickupCount}회</p>
        <p className="text-red-500 dark:text-red-400">픽뚫: {nonPickupCount}회</p>
      </div>

      <div ref={historyRef} className="flex flex-col-reverse gap-2 overflow-y-auto flex-grow">
        {sixStarHistory.map((entry, idx) => {
          const isPickup =
            (selectedBanner.bannerType === "doublePick" &&
              selectedBanner.twoPickup6 &&
              selectedBanner.twoPickup6.some((c: Character) => c.engName === entry.char.engName)) ||
            (selectedBanner.bannerType !== "doublePick" &&
              selectedBanner.pickup6 &&
              entry.char.name === selectedBanner.pickup6.name);
          const borderColor = isPickup ? "border-green-500" : "border-red-500";
          const labelText = isPickup ? "픽업!" : "픽뚫";

          // 현재까지 등장한 같은 캐릭터 개수 확인
          const sameCharCount = sixStarHistory
            .slice(idx + 1) // 현재 entry 이후의 요소들만 확인
            .filter((e) => e.char.name === entry.char.name).length;

          // 등장 순서에 따라 suffix 부여 (처음 나온 캐릭터는 "명함", 이후 "1형", "2형" ...)
          const suffix = sameCharCount === 0 ? "명함" : `${Math.min(sameCharCount, 5)}형`;

          return (
            <div
              key={`${entry.char.engName}-${entry.pullNumber}`}
              className={`relative flex items-center gap-2 p-2 border-2 rounded ${borderColor}`}
            >
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white text-[10px] lg:text-xs font-bold px-2 py-0.5 rounded shadow text-black dark:text-gray-100 dark:bg-gray-800 border dark:border-gray-700">
                {labelText} ({suffix})
              </span>
              <Image
                src={`/characters/6stars_small/${entry.char.engName}.png`}
                alt={entry.char.name}
                width={56}
                height={56}
                layout="intrinsic"
                className="w-14 h-14 object-cover"
              />
              <p className="text-xs lg:text-base font-semibold whitespace-nowrap text-black dark:text-gray-100">
                {entry.char.name} (#{entry.pullNumber})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}