import Image from "next/image";
import { charactersByRarity, Character } from "@/data/characters";
import { EnrichedBanner } from "@/components/gacha_simulator/GachaGame";
import { isValidGachaCharacterForPool } from "@/components/gacha_simulator/GachaGame";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner: EnrichedBanner;
}

export function BannerSixStarListModal({ isOpen, onClose, banner }: ModalProps) {
  if (!isOpen) return null; // 모달이 닫혀있으면 렌더링 X

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
    // 모달 배경에 onClick => 바깥 부분 클릭시 닫힘
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-[300px] rounded bg-white p-4 shadow-lg dark:bg-gray-800 sm:w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-xl font-bold text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
        >
          ✕
        </button>

        <h3 className="mb-4 text-center text-lg font-bold text-gray-900 dark:text-gray-100">
          획득 가능 6성 목록
        </h3>

        <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto">
          {filteredSixStars.map((char) => {
            const isPickup = pickupSixStars?.some((pickup) => pickup?.engName === char?.engName);

            return (
              <div
                key={char.engName}
                className={`flex items-center gap-2 rounded border p-2 ${
                  isPickup
                    ? "border-green-500 bg-green-50 dark:bg-green-900"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                <Image
                  src={`/characters/6stars_small/${char.engName}.png`}
                  alt={char.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p
                  className={`text-sm font-semibold ${isPickup ? "text-green-500 dark:text-green-400" : "text-gray-800 dark:text-gray-300"}`}
                >
                  {char.name} {isPickup && " (픽업!)"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
