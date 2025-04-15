import Image from "next/image";
import { Banner } from "@/data/banners";
import { useState } from "react";
import CalculatorModal from "@/components/modals/CalculatorModal";

interface GachaStatsProps {
  rarityStats: { [key: number]: number };
  totalPulls: number;
  pickupShape: string | null;
  pickupRank: number | null;
  pityCount: number;
  pickupGuarantee: boolean;
  getSixStarRate: (pity: number) => number;
  selectedBanner: Banner;
  showDoublePick: boolean;
  toggleDoublePick: () => void;
  displayedBanners: Banner[];
  handleBannerChange: (bannerId: string) => void;
  nickname: string;
  set6StarListOpen: (open: boolean) => void;
}

export default function MainGachaStats({
  rarityStats,
  totalPulls,
  pickupShape,
  pickupRank,
  pityCount,
  pickupGuarantee,
  getSixStarRate,
  selectedBanner,
  showDoublePick,
  toggleDoublePick,
  displayedBanners,
  handleBannerChange,
  nickname,
  set6StarListOpen,
}: GachaStatsProps) {

  const [isCalcOpen, setCalcOpen] = useState(false);

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
      {/* (1) 뽑기 확률 통계 박스 */}
      <div className="p-4 bg-white dark:bg-gray-700 shadow rounded-lg border border-green-300 dark:border-green-700 mb-4">
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">🔍 뽑기 통계</h2>
        <ul className="list-disc ml-4 mt-2 text-sm lg:text-base">
          {Object.entries(rarityStats).map(([rarity, count]) => (
            <li key={rarity} className="text-gray-800 dark:text-gray-200">
              {rarity}성: {count}회
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">
          🗂️ 총 뽑기 횟수: <span className="font-bold text-blue-600">{totalPulls}회 {selectedBanner.bannerType !== "doublePick" && <> ({pickupShape || "없음"})</>}</span>
        </p>
        {selectedBanner.bannerType !== "doublePick" && (
          <p className="font-bold">🍀 백분위: <span className="font-bold text-orange-500">상위 {pickupRank}%</span> </p>
        )}
        <p className="font-bold">☂️ 천장 카운트: <span className="font-bold text-red-500">{pityCount}회</span></p>
        <p className="font-bold">🧲 6성 확률: <span className="font-bold text-purple-500">{getSixStarRate(pityCount).toFixed(2)}%</span></p>
        <p className="font-bold">
          🏅 픽업 여부: <span className={`${pickupGuarantee ? "text-green-500" : "text-red-500"}`}>{pickupGuarantee ? "픽업 확정 ⭕️" : "픽업 확정 ❌"}</span>
        </p>
      </div>

      {/* (2) 배너 선택 박스 */}
      <div className="p-4 bg-gray-50 dark:bg-gray-600 shadow rounded-lg border border-blue-400 dark:border-blue-600 mb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">🌪️ 배너</h2>
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" checked={showDoublePick} onChange={toggleDoublePick} className="sr-only" />
            <div className={`relative w-12 h-6 transition rounded-full ${showDoublePick ? "bg-blue-500" : "bg-gray-400"}`}>
              <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform ${showDoublePick ? "translate-x-6" : ""}`} />
            </div>
            <span className="ml-2 text-sm text-gray-800 dark:text-gray-200">{showDoublePick ? "2중 픽업" : "일반 픽업"}</span>
          </label>
        </div>
        <Image key={selectedBanner.id} src={`/infos/banner_img/${selectedBanner.id}.png`} alt="배너 이미지" width={400} height={200} layout="intrinsic" className="w-full h-auto pb-3 pt-1 transition-opacity" />
        <select value={selectedBanner.id} onChange={(e) => handleBannerChange(e.target.value)} className="w-full h-10 text-sm border rounded-lg p-2 cursor-pointer transition-transform bg-white dark:bg-gray-700 dark:text-white">
          {displayedBanners.map((banner) => (
            <option key={banner.id} value={banner.id} className="bg-white dark:bg-gray-600 text-black dark:text-white">
              {banner.name}
            </option>
          ))}
        </select>

        {/* 획득 가능 6성 목록 버튼 */}
        <button onClick={() => set6StarListOpen(true)} className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-transform text-sm">
          획득 6성 목록
        </button>
      </div>

      {/*
      <div className="p-4 bg-white dark:bg-gray-700 shadow rounded-lg border border-gray-500 dark:border-gray-500 text-center">
        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 pb-2">
          🖥️ 개발자 : <span className="text-blue-500 font-bold">{nickname}</span>
        </h2>
        <div className="mt-3 flex justify-center gap-3">
          <button
            onClick={() => setCalcOpen(true)}
            className="bg-yellow-500 text-white px-4 text-sm rounded-lg flex items-center justify-center hover:bg-yellow-600 transition"
          >
            형상 계산기
          </button>
          <CalculatorModal isOpen={isCalcOpen} onClose={() => setCalcOpen(false)} />
        </div>
      </div>
       */}
    </div>
  );
}