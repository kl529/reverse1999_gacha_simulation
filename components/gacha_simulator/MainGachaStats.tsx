"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
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
import { getBannerUrl } from "@/lib/cdn";

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
  const t = useTranslations("gacha");

  return (
    <div className="h-full w-full overflow-y-auto rounded-lg border bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
      {/* (1) 뽑기 확률 통계 박스 */}
      <div className="mb-4 rounded-lg border border-green-300 bg-white p-4 shadow dark:border-green-700 dark:bg-gray-700">
        <h2 className="mb-2 text-xl font-semibold text-black dark:text-gray-100">{t("pullStats")}</h2>
        <ul className="ml-4 mt-2 list-disc text-sm lg:text-base">
          {Object.entries(rarityStats).map(([rarity, count]) => (
            <li key={rarity} className="text-gray-800 dark:text-gray-200">
              {t("rarityCount", { rarity, count })}
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">
          {t("totalPulls")}{" "}
          <span className="font-bold text-blue-600">
            {t("pullCount", { count: totalPulls })}{" "}
            {selectedBanner.bannerType !== "doublePick" && <> ({pickupShape || t("none")})</>}
          </span>
        </p>
        {selectedBanner.bannerType !== "doublePick" && (
          <p className="font-bold">
            {t("percentile")} <span className="font-bold text-orange-500">{t("percentileTop")} {pickupRank}%</span>{" "}
          </p>
        )}
        <p className="font-bold">
          {t("pityCount")} <span className="font-bold text-red-500">{t("pullCount", { count: pityCount })}</span>
        </p>
        <p className="font-bold">
          {t("sixStarRate")}{" "}
          <span className="font-bold text-purple-500">{getSixStarRate(pityCount).toFixed(2)}%</span>
        </p>
        <p className="font-bold">
          {t("pickupStatus")}{" "}
          <span className={`${pickupGuarantee ? "text-green-500" : "text-red-500"}`}>
            {pickupGuarantee ? t("pickupConfirmed") : t("pickupNotConfirmed")}
          </span>
        </p>
      </div>

      {/* (2) 배너 선택 박스 */}
      <div className="mb-5 rounded-lg border border-blue-400 bg-gray-50 p-4 shadow dark:border-blue-600 dark:bg-gray-600">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t("bannerSection")}</h2>
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
              {showDoublePick ? t("doublePick") : t("regularPick")}
            </label>
          </div>
        </div>
        <Image
          key={selectedBanner.id}
          src={getBannerUrl(`${selectedBanner.id}.webp`)}
          alt={t("bannerImageAlt")}
          width={400}
          height={200}
          className="h-auto w-full pb-3 pt-1 transition-opacity"
          priority
        />
        <Select value={selectedBanner.id} onValueChange={(value) => handleBannerChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("selectBanner")} />
          </SelectTrigger>
          <SelectContent side="bottom" className="max-h-[240px] overflow-auto">
            {displayedBanners.map((banner) => (
              <SelectItem key={banner.id} value={banner.id}>
                {banner.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog>
          <DialogTrigger asChild>
            <button className="mt-3 w-full rounded-lg bg-green-500 py-2 text-sm text-white transition-transform hover:bg-green-600">
              {t("sixStarList")}
            </button>
          </DialogTrigger>
          <BannerSixStarListModal banner={selectedBanner} />
        </Dialog>
      </div>

      <div className="rounded-lg border border-gray-500 bg-white p-4 text-center shadow dark:border-gray-500 dark:bg-gray-700">
        <h2 className="pb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
          {t("developerLabel")} <span className="font-bold text-blue-500">{nickname}</span>
        </h2>
        <p className="border-t border-gray-300 pt-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/gacha_guide" className="text-green-500 hover:underline">
            {t("gachaGuideLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
