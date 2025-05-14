import Image from "next/image";
import { Banner } from "@/data/banners";

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
  return (
    <div className="h-full w-full overflow-y-auto rounded-lg border bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
      {/* (1) 뽑기 확률 통계 박스 */}
      <div className="mb-4 rounded-lg border border-green-300 bg-white p-4 shadow dark:border-green-700 dark:bg-gray-700">
        <h2 className="mb-2 text-xl font-semibold text-black dark:text-gray-100">🔍 뽑기 통계</h2>
        <ul className="ml-4 mt-2 list-disc text-sm lg:text-base">
          {Object.entries(rarityStats).map(([rarity, count]) => (
            <li key={rarity} className="text-gray-800 dark:text-gray-200">
              {rarity}성: {count}회
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">
          🗂️ 총 뽑기 횟수:{" "}
          <span className="font-bold text-blue-600">
            {totalPulls}회{" "}
            {selectedBanner.bannerType !== "doublePick" && <> ({pickupShape || "없음"})</>}
          </span>
        </p>
        {selectedBanner.bannerType !== "doublePick" && (
          <p className="font-bold">
            🍀 백분위: <span className="font-bold text-orange-500">상위 {pickupRank}%</span>{" "}
          </p>
        )}
        <p className="font-bold">
          ☂️ 천장 카운트: <span className="font-bold text-red-500">{pityCount}회</span>
        </p>
        <p className="font-bold">
          🧲 6성 확률:{" "}
          <span className="font-bold text-purple-500">{getSixStarRate(pityCount).toFixed(2)}%</span>
        </p>
        <p className="font-bold">
          🏅 픽업 여부:{" "}
          <span className={`${pickupGuarantee ? "text-green-500" : "text-red-500"}`}>
            {pickupGuarantee ? "픽업 확정 ⭕️" : "픽업 확정 ❌"}
          </span>
        </p>
      </div>

      {/* (2) 배너 선택 박스 */}
      <div className="mb-5 rounded-lg border border-blue-400 bg-gray-50 p-4 shadow dark:border-blue-600 dark:bg-gray-600">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">🌪️ 배너</h2>
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={showDoublePick}
              onChange={toggleDoublePick}
              className="sr-only"
            />
            <div
              className={`relative h-6 w-12 rounded-full transition ${showDoublePick ? "bg-blue-500" : "bg-gray-400"}`}
            >
              <div
                className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition ${showDoublePick ? "translate-x-6" : ""}`}
              />
            </div>
            <span className="ml-2 text-sm text-gray-800 dark:text-gray-200">
              {showDoublePick ? "2중 픽업" : "일반 픽업"}
            </span>
          </label>
        </div>
        <Image
          key={selectedBanner.id}
          src={`/infos/banner_img/${selectedBanner.id}.png`}
          alt="배너 이미지"
          width={400}
          height={200}
          layout="intrinsic"
          className="h-auto w-full pb-3 pt-1 transition-opacity"
        />
        <select
          value={selectedBanner.id}
          onChange={(e) => handleBannerChange(e.target.value)}
          className="h-10 w-full cursor-pointer rounded-lg border bg-white p-2 text-sm transition-transform dark:bg-gray-700 dark:text-white"
        >
          {displayedBanners.map((banner) => (
            <option
              key={banner.id}
              value={banner.id}
              className="bg-white text-black dark:bg-gray-600 dark:text-white"
            >
              {banner.name}
            </option>
          ))}
        </select>

        {/* 획득 가능 6성 목록 버튼 */}
        <button
          onClick={() => set6StarListOpen(true)}
          className="mt-3 w-full rounded-lg bg-green-500 py-2 text-sm text-white transition-transform hover:bg-green-600"
        >
          획득 6성 목록
        </button>
      </div>

      <div className="rounded-lg border border-gray-500 bg-white p-4 text-center shadow dark:border-gray-500 dark:bg-gray-700">
        <h2 className="pb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
          🖥️ 개발자 : <span className="font-bold text-blue-500">{nickname}</span>
        </h2>
      </div>
    </div>
  );
}
