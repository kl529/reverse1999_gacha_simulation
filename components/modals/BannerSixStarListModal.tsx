import Image from "next/image";
import { charactersByRarity, Character } from "@/data/characters";
import { EnrichedBanner } from "@/components/gacha_simulator/GachaGame";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isIncludedInGachaPool } from "@/data/version";
interface ModalProps {
  banner: EnrichedBanner;
}

export function BannerSixStarListModal({ banner }: ModalProps) {
  const allSixStars: Character[] = charactersByRarity[6].filter(
    (char) => !char.exclude_gacha && isIncludedInGachaPool(char.version)
  );
  const pickupSixStars = banner.bannerType === "doublePick" ? banner.twoPickup6 : [banner.pickup6];
  const uniqueSixStars = new Set(allSixStars.map((char) => char.engName));
  const updatedSixStars = [
    ...(pickupSixStars?.filter(
      (char): char is Character =>
        char !== undefined && typeof char !== "number" && !uniqueSixStars.has(char.engName)
    ) || []),
    ...allSixStars,
  ];

  const filteredSixStars = updatedSixStars.filter((char): char is Character => char !== undefined);

  return (
    <DialogContent className="max-w-[90vw] sm:max-w-md">
      <DialogHeader>
        <DialogTitle>획득 가능 6성 목록</DialogTitle>
        <DialogDescription>현재 배너에서 등장 가능한 6성 캐릭터 목록입니다.</DialogDescription>
      </DialogHeader>
      <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto pt-2">
        {filteredSixStars.map((char) => {
          const isPickup = pickupSixStars?.some((pickup) => pickup?.engName === char?.engName);

          return (
            <div
              key={char.engName}
              className={`flex items-center justify-between gap-2 rounded border p-2 ${
                isPickup
                  ? "border-green-500 bg-green-50 dark:bg-green-900"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={`/characters/6stars_small/${char.engName}.webp`}
                  alt={char.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p
                  className={`text-sm font-semibold ${
                    isPickup
                      ? "text-green-500 dark:text-green-400"
                      : "text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {char.name} {isPickup && "(픽업!)"}
                </p>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">v{char.version}</span>
            </div>
          );
        })}
      </div>
    </DialogContent>
  );
}
