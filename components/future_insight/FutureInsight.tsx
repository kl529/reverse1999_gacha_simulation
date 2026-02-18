"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { futureInsightData } from "@/data/future_insight";
import { charactersByRarity, Character } from "@/data/characters";
import { banners } from "@/data/banners";
import { version } from "@/data/version";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { getDisplayVersion, versionList } from "@/data/version";
import { getBannerUrl } from "@/lib/cdn";

function getCharNameById(id: number | Character | undefined): string {
  if (typeof id === "object" && id !== null && "name" in id) {
    return id.name;
  }
  if (typeof id === "number") {
    for (const rarity of [6, 5, 4, 3, 2]) {
      const char = charactersByRarity[rarity]?.find((c) => c.id === id);
      if (char) return char.name;
    }
    return `ID ${id}`;
  }
  return "-";
}

function getVersionStatus(
  startDateStr: string,
  endDateStr: string
): { key: string; days: number } {
  const today = new Date();
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (today < startDate) {
    const days = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return { key: "upcoming", days };
  } else if (today >= startDate && today <= endDate) {
    const days = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return { key: "ongoing", days };
  } else {
    return { key: "ended", days: 0 };
  }
}

function getUpcomingStandardPoolChars(versionStr: string): Character[] {
  const currentIdx = versionList.indexOf(versionStr);
  const targetVersion = versionList[currentIdx - 3];

  const allChars = Object.values(charactersByRarity).flat();
  return allChars.filter((char) => {
    if (char.immediate_standard) {
      return false;
    }

    return (
      char.version === targetVersion &&
      !char.exclude_gacha &&
      (char.rarity === 5 || char.rarity === 6)
    );
  });
}

export default function FutureInsightPage() {
  const t = useTranslations("futureInsight");
  const [showOldVersions, setShowOldVersions] = useState(false);
  const current = parseFloat(version);
  const currentAndFuture = futureInsightData.filter((item) => parseFloat(item.version) >= current);
  const pastVersions = futureInsightData.filter((item) => parseFloat(item.version) < current);

  const statusLabelMap: Record<string, string> = {
    upcoming: t("statusUpcoming"),
    ongoing: t("statusOngoing"),
    ended: t("statusEnded"),
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-4 text-zinc-900 dark:text-zinc-100">
      <h1 className="mt-8 text-center text-2xl font-bold lg:text-3xl">{t("title")}</h1>
      <p className="mb-1 text-center text-sm text-gray-500 dark:text-gray-400">
        {t("subtitle")}
      </p>

      {[...currentAndFuture, ...(showOldVersions ? pastVersions : [])].map((item) => {
        const status = getVersionStatus(item.period.start, item.period.end);
        const upcomingStandardChars = getUpcomingStandardPoolChars(item.version);

        return (
          <Card key={item.version} className="space-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="text-2xl font-semibold">
                {item.title} (v
                {item.version === "2.75" ? t("collab") : getDisplayVersion(item.version)})
              </div>
              <span
                className={`rounded px-2 py-1 text-xs font-medium ${
                  status.key === "ongoing"
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                    : status.key === "upcoming"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                }`}
              >
                {statusLabelMap[status.key]}
                {status.key !== "ended" &&
                  ` (${status.key === "upcoming" ? t("daysUntil", { days: status.days }) : t("daysLeft", { days: status.days })})`}
              </span>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {item.period.start} ~ {item.period.end}
              </p>

              <Separator />
              <div>
                <h2 className="mb-1 font-bold">{t("albumShop")}</h2>
                {item.album_shop && (
                  <>
                    <p>{t("star6")}: {getCharNameById(item.album_shop.rare6)}</p>
                    <p>{t("star5")}: {getCharNameById(item.album_shop.rare5)}</p>
                  </>
                )}
              </div>

              <Separator />
              <div>
                <h2 className="mb-2 font-bold">{t("pickupBanners")}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {item.banners.map((bannerId, idx) => {
                    const banner = banners.find((b) => b.id === bannerId);
                    if (!banner) return null;
                    const pickup6 =
                      banner.bannerType === "doublePick"
                        ? (banner.twoPickup6 ?? []).map(getCharNameById).join(" / ")
                        : getCharNameById(banner.pickup6 as number);
                    const pickup5 = (banner.pickup5 ?? [])
                      .map((id) => getCharNameById(id as number))
                      .join(", ");
                    const halfLabel = idx === 0 ? t("firstHalf") : t("secondHalf");

                    return (
                      <div
                        key={banner.id}
                        className="rounded-xl border border-zinc-300 bg-zinc-100 p-3 dark:border-zinc-600 dark:bg-zinc-700"
                      >
                        <Link href={`/character_setting/${banner.pickup6}`}>
                          <Image
                            src={getBannerUrl(`${banner.id}.webp`)}
                            alt={banner.name}
                            className="mb-2 w-full rounded-md border border-zinc-300 dark:border-zinc-600"
                            width={1200}
                            height={600}
                          />
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                            {halfLabel}
                          </span>
                          <p className="font-semibold">{banner.name}</p>
                        </div>
                        <p>
                          <strong>{t("star6")}:</strong> {pickup6 || "-"}
                        </p>
                        <p>
                          <strong>{t("star5")}:</strong> {pickup5 || "-"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />
              <div>
                <h2 className="mb-1 font-bold">{t("euphoriaList")}</h2>
                <p>
                  <strong>{t("star6")}:</strong>{" "}
                  {item.euphoria.star6
                    .map(({ characterId, euphoriaId }) => (
                      <a
                        key={euphoriaId}
                        href={`/euphoria_guide/${euphoriaId}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {getCharNameById(characterId)}
                      </a>
                    ))
                    .reduce<React.ReactNode[]>((acc, curr, idx) => {
                      if (idx === 0) return [curr];
                      return [...acc, <span key={`comma6-${idx}`}>, </span>, curr];
                    }, [])}
                </p>
                <p>
                  <strong>{t("star5")}:</strong>{" "}
                  {item.euphoria.star5
                    .map(({ characterId, euphoriaId }) => (
                      <a
                        key={euphoriaId}
                        href={`/euphoria_guide/${euphoriaId}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {getCharNameById(characterId)}
                      </a>
                    ))
                    .reduce<React.ReactNode[]>((acc, curr, idx) => {
                      if (idx === 0) return [curr];
                      return [...acc, <span key={`comma5-${idx}`}>, </span>, curr];
                    }, [])}
                </p>
                {item.euphoria_pick_up && item.euphoria_pick_up.length > 0 && (
                  <p>
                    <strong>{t("pickup")} :</strong>{" "}
                    {item.euphoria_pick_up
                      .map((characterId) => (
                        <a
                          key={characterId}
                          href={`/character/${characterId}`}
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {getCharNameById(characterId)}
                        </a>
                      ))
                      .reduce<React.ReactNode[]>((acc, curr, idx) => {
                        if (idx === 0) return [curr];
                        return [...acc, <span key={`comma-pickup-${idx}`}>, </span>, curr];
                      }, [])}
                  </p>
                )}
              </div>

              <Separator />
              <div>
                <h2 className="mb-1 font-bold">{t("standardPool")}</h2>
                {upcomingStandardChars.length === 0 ? (
                  <p className="text-sm text-gray-400">{t("noStandardChar")}</p>
                ) : (
                  <ul className="list-disc pl-5">
                    {upcomingStandardChars.map((char) => (
                      <li key={char.id}>
                        {t("starDash", { rarity: char.rarity, name: char.name })}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {item.note && (
                <>
                  <Separator />
                  <div>
                    <h2 className="mb-1 font-bold">{t("note")}</h2>
                    <p className="text-sm text-red-600 dark:text-red-400">{item.note}</p>
                  </div>
                </>
              )}

              <Separator />
              <div>
                <a
                  href={`/skin?version=${item.version}`}
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  {t("viewSkin", { version: item.version === "2.75" ? t("collab") : getDisplayVersion(item.version) })}
                </a>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {pastVersions.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowOldVersions(!showOldVersions)}
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            {showOldVersions ? t("hideOld") : t("showOld")}
          </button>
        </div>
      )}
    </div>
  );
}
