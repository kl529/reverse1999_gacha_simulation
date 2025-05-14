import Image from "next/image";
import { DialogContent } from "@/components/ui/dialog";
import { charactersByRarity, Character } from "@/data/characters";
import { EnrichedBanner } from "@/components/gacha_simulator/GachaGame";
import { isValidGachaCharacterForPool } from "@/components/gacha_simulator/GachaGame";

interface BannerSixStarListModalProps {
  banner: EnrichedBanner;
}

export function BannerSixStarListModal({ banner }: BannerSixStarListModalProps) {
  const allSixStars: Character[] = charactersByRarity[6].filter(isValidGachaCharacterForPool);
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
    <DialogContent className="max-w-[400px] sm:max-w-[500px]">
      <h3 className="mb-4 text-center text-lg font-bold text-gray-900 dark:text-gray-100">
        획득 가능 6성 목록
      </h3>

      <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto">
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
                  src={`/characters/6stars_small/${char.engName}.png`}
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
                  {char.name} {isPickup && " (픽업!)"}
                </p>
              </div>
              <span className="pr-2 text-xs text-gray-500 dark:text-gray-400">v{char.version}</span>
            </div>
          );
        })}
      </div>
    </DialogContent>
  );
}
