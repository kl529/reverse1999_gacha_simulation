import Image from "next/image";
import { charactersByRarity, Character } from "@/data/characters";
import { Banner } from "@/data/banners";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner: Banner;
}

export function BannerSixStarListModal({ isOpen, onClose, banner }: ModalProps) {
  if (!isOpen) return null; // 모달이 닫혀있으면 렌더링 X

  // ✅ 모든 기본 6성 캐릭터
  const allSixStars: Character[] = charactersByRarity[6];

  // ✅ 배너 타입에 따라 픽업 6성을 가져오기
  const pickupSixStars = banner.bannerType === "doublePick" ? banner.twoPickup6 : [banner.pickup6];

  // ✅ 기존 목록에서 중복되지 않게 정리하고 픽업 6성을 우선 배치
  const uniqueSixStars = new Set(allSixStars.map(char => char.engName));
  const updatedSixStars = [
    ...pickupSixStars?.filter(char => char && !uniqueSixStars.has(char.engName)) || [], 
    ...allSixStars,
  ];

  const filteredSixStars = updatedSixStars.filter((char): char is Character => char !== undefined);

  return (
    // 모달 배경에 onClick => 바깥 부분 클릭시 닫힘
    <div 
      className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* 모달 컨테이너 내부 클릭 시 e.stopPropagation()으로 배경 클릭 이벤트 막기 */}
      <div 
        className="bg-white dark:bg-gray-800 p-4 w-[300px] sm:w-[400px] shadow-lg rounded relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          획득 가능 6성 목록
        </h3>

        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {filteredSixStars.map((char) => {
            const isPickup = pickupSixStars?.some(pickup => pickup?.engName === char?.engName);

            return (
              <div
                key={char.engName}
                className={`flex items-center gap-2 p-2 border rounded ${
                  isPickup ? "border-green-500 bg-green-50 dark:bg-green-900" : "border-gray-300 dark:border-gray-700"
                }`}
              >
                <Image
                  src={`/characters/6stars_small/${char.engName}.png`}
                  alt={char.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p className={`text-sm font-semibold ${isPickup ? "text-green-500 dark:text-green-400" : "text-gray-800 dark:text-gray-300"}`}>
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