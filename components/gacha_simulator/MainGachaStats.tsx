import Image from "next/image";
import { Banner } from "@/data/banners";
import { EnrichedBanner } from "@/components/gacha_simulator/GachaGame";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { BannerSixStarListModal } from "@/components/modals/BannerSixStarListModal";
import Link from "next/link";

interface GachaStatsProps {
  rarityStats: { [key: number]: number };
  totalPulls: number;
  pickupShape: string | null;
  pickupRank: number | null;
  pityCount: number;
  pickupGuarantee: boolean;
  getSixStarRate: (pity: number) => number;
  selectedBanner: EnrichedBanner;
  showDoublePick: boolean;
  toggleDoublePick: () => void;
  displayedBanners: Banner[];
  handleBannerChange: (bannerId: string) => void;
  nickname: string;
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
          <div className="flex items-center gap-2">
            <Switch
              checked={showDoublePick}
              onCheckedChange={toggleDoublePick}
              id="double-pick-switch"
              className="data-[state=unchecked]:bg-gray-500 dark:data-[state=unchecked]:bg-gray-400"
            />
            <label
              htmlFor="double-pick-switch"
              className="text-sm text-gray-800 dark:text-gray-200"
            >
              {showDoublePick ? "2중 픽업" : "일반 픽업"}
            </label>
          </div>
        </div>
        <Image
          key={selectedBanner.id}
          src={`/infos/banner_img/${selectedBanner.id}.webp`}
          alt="배너 이미지"
          width={400}
          height={200}
          className="h-auto w-full pb-3 pt-1 transition-opacity"
          priority
        />
        <Select value={selectedBanner.id} onValueChange={(value) => handleBannerChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="배너를 선택하세요" />
          </SelectTrigger>
          <SelectContent side="bottom" className="max-h-[240px] overflow-auto">
            {displayedBanners.map((banner) => (
              <SelectItem key={banner.id} value={banner.id}>
                {banner.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 획득 가능 6성 목록 버튼 */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="mt-3 w-full rounded-lg bg-green-500 py-2 text-sm text-white transition-transform hover:bg-green-600">
              획득 6성 목록
            </button>
          </DialogTrigger>
          <BannerSixStarListModal banner={selectedBanner} />
        </Dialog>
      </div>

      <div className="rounded-lg border border-gray-500 bg-white p-4 text-center shadow dark:border-gray-500 dark:bg-gray-700">
        <h2 className="pb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
          🖥️ 개발자 : <span className="font-bold text-blue-500">{nickname}</span>
        </h2>
        <p className="border-t border-gray-300 pt-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/gacha_guide" className="text-green-500 hover:underline">
            🔥 가챠 가이드 & 기댓값 보러가기 🔥
          </Link>
        </p>
      </div>
    </div>
  );
}
