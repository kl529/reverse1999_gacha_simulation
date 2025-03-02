import Image from "next/image";
import { charactersByRarity, Character } from "@/data/characters";
import { Banner } from "@/data/banners";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner: Banner;
}

export function BannerSixStarModal({ isOpen, onClose, banner }: ModalProps) {
  if (!isOpen) return null; // 모달이 닫혀있으면 렌더링 X

  // 모든 기본 6성 캐릭터 목록
  const allSixStars: Character[] = charactersByRarity[6];

  // 현재 배너의 픽업 6성
  const pickupSixStar = banner.pickup6;

  // 픽업 6성을 목록 맨 위로 정렬
  const updatedSixStars = [
    pickupSixStar, // 🚀 픽업 6성을 제일 먼저 추가
    ...allSixStars.filter(char => char.engName !== pickupSixStar.engName), // 기존 목록에서 중복 제거
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* 모달 컨테이너 */}
      <div className="bg-white p-4 w-[300px] sm:w-[400px] shadow-lg rounded relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4 text-center">획득 가능 6성 목록</h3>

        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {updatedSixStars.map((char) => {
            const isPickup = (banner.pickup6.engName === char.engName);
            return (
              <div
                key={char.engName}
                className={`flex items-center gap-2 p-2 border rounded ${
                  isPickup ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
              >
                <Image
                  src={`/characters/6stars_small/${char.engName}.png`}
                  alt={char.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p className={`text-sm font-semibold ${isPickup ? "text-green-500" : "text-gray-800"}`}>
                  {char.name}{isPickup && " (픽업!)"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}