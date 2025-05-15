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
    <div className="h-full w-full overflow-y-auto rounded-lg border bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
      <h2 className="sticky top-0 z-10 mb-2 border-b bg-white p-2 text-lg font-semibold text-black dark:bg-gray-800 dark:text-gray-100 lg:text-xl">
        💡 획득한 6성
      </h2>

      {/* 픽업 vs 일반 6성 횟수 */}
      <div className="sticky top-[48px] z-10 mb-2 flex justify-between rounded-lg bg-gray-100 p-2 text-xs font-semibold text-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 lg:text-sm">
        <p className="text-green-600 dark:text-green-400">픽업: {pickupCount}회</p>
        <p className="text-red-500 dark:text-red-400">픽뚫: {nonPickupCount}회</p>
      </div>

      <div ref={historyRef} className="flex flex-grow flex-col-reverse gap-2 overflow-y-auto">
        {sixStarHistory.map((entry, idx) => {
          const isPickup =
            (selectedBanner.bannerType === "doublePick" &&
              selectedBanner.twoPickup6?.some(
                (c) => typeof c !== "number" && c.engName === entry.char.engName
              )) ||
            (selectedBanner.bannerType !== "doublePick" &&
              typeof selectedBanner.pickup6 !== "number" &&
              selectedBanner.pickup6 &&
              entry.char.engName === selectedBanner.pickup6.engName);
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
              className={`relative flex items-center gap-2 rounded border-2 p-2 ${borderColor}`}
            >
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 transform rounded border bg-white px-2 py-0.5 text-[10px] font-bold text-black shadow dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 lg:text-xs">
                {labelText} ({suffix})
              </span>
              <Image
                src={`/characters/6stars_small/${entry.char.engName}.png`}
                alt={entry.char.name}
                width={56}
                height={56}
                className="h-14 w-14 object-cover"
              />
              <p className="whitespace-nowrap text-xs font-semibold text-black dark:text-gray-100 lg:text-base">
                {entry.char.name} (#{entry.pullNumber})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
