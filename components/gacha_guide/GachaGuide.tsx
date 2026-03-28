"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { version, isIncludedInGachaPool } from "@/data/version";
import { charactersByRarity } from "@/data/characters";
import { getBannerUrl, getCharacterUrl } from "@/lib/cdn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { percentRankTable } from "@/data/percent_rank_table";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function GachaGuide() {
  const t = useTranslations("gachaGuide");
  const [pullCount, setPullCount] = useState<string>("");
  const [sixStarCount, setSixStarCount] = useState<string>("");
  const [calculatedRate, setCalculatedRate] = useState<number | null>(null);

  const calculateRate = () => {
    const pulls = parseInt(pullCount);
    const shape = sixStarCount === "0" ? "명함" : `${sixStarCount}형`;

    if (!isNaN(pulls) && shape) {
      if (percentRankTable[pulls] && percentRankTable[pulls][shape] !== undefined) {
        setCalculatedRate(percentRankTable[pulls][shape]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 mt-8 text-center text-2xl font-bold text-black dark:text-white lg:text-3xl">
          {t("title")}
        </h1>

        <p className="mb-4 whitespace-pre-line text-center text-black dark:text-gray-300">
          {t("subtitle")}
        </p>

        <Accordion type="single" collapsible className="mb-4 space-y-4">
          <AccordionItem value={`system`} className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <AccordionTrigger className="text-left text-lg font-semibold text-black dark:text-white">
              {t("ceilingSystem")}
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 flex flex-col items-center gap-4">
                <p className="whitespace-pre-line text-center text-black dark:text-gray-300">
                  {t("ceilingIntro")}
                </p>
                <p className="whitespace-pre-line text-center text-black dark:text-gray-300">
                  {t("soloPickup")}
                </p>
                <Image
                  src={getBannerUrl("hissabeth_pick_up.webp")}
                  alt={t("soloPickup")}
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <Image
                  src="/infos/gacha_system/single_pick_up_info.webp"
                  alt={t("soloPickup")}
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <p className="whitespace-pre-line text-black dark:text-gray-300">
                  {t("soloPickupDesc")}
                </p>
                <Separator className="my-4 bg-gray-300 dark:bg-gray-700" />
                <p className="whitespace-pre-line text-center text-black dark:text-gray-300">
                  {t("doublePickup")}
                </p>
                <Image
                  src={getBannerUrl("doublepick_flutter_page_barcarola.webp")}
                  alt={t("doublePickup")}
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <Image
                  src="/infos/gacha_system/double_pick_up_info.webp"
                  alt={t("doublePickup")}
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <p className="whitespace-pre-line text-center text-black dark:text-gray-300">
                  {t("doublePickupDesc")}
                </p>
                <Separator className="my-4 bg-gray-300 dark:bg-gray-700" />
                <p className="whitespace-pre-line text-center text-black dark:text-gray-300">
                  {t("limitedPickup")}
                </p>
                <Image
                  src={getBannerUrl("lucy_pick_up.webp")}
                  alt={t("limitedPickup")}
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <Image
                  src="/infos/gacha_system/limit_pick_up_info.webp"
                  alt={t("limitedPickup")}
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <p className="whitespace-pre-line text-black dark:text-gray-300">
                  {t("limitedPickupDesc")}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="mb-4 space-y-4">
          <AccordionItem value={`system`} className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <AccordionTrigger className="text-left text-lg font-semibold text-black dark:text-white">
              {t("standardCharList", { version })}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex max-h-[400px] flex-col overflow-y-auto pt-2">
                <p className="mb-2 whitespace-pre-line text-center text-black dark:text-gray-300">
                  {t("clickForSetting")}
                </p>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {charactersByRarity[6]
                    .filter(
                      (char) =>
                        !char.exclude_gacha &&
                        isIncludedInGachaPool(char.version, char.immediate_standard)
                    )
                    .map((char) => (
                      <Link
                        key={char.engName}
                        href={`/character_setting/${char.id}`}
                        className="flex items-center justify-between gap-2 rounded border border-gray-300 p-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={getCharacterUrl("6stars", `${char.engName}.webp`, true)}
                            alt={char.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />

                          <p className="text-sm text-gray-800 dark:text-gray-300">{char.name}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="mb-4 space-y-4">
          <AccordionItem value={`system`} className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <AccordionTrigger className="text-left text-lg font-semibold text-black dark:text-white">
              {t("expectedValue")}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div>
                    <p className="font-semibold text-black dark:text-white">{t("oneChar")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("singlePickupBasis")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 dark:text-blue-400">{t("expectedPulls", { value: "42.4" })}</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{t("ceilingPulls", { value: "70" })}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div>
                    <p className="font-semibold text-black dark:text-white">{t("pickupCard")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("singlePickupBasis")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 dark:text-blue-400">{t("expectedPulls", { value: "63.6" })}</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{t("ceilingPulls", { value: "140" })}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div>
                    <p className="font-semibold text-black dark:text-white">{t("pickupFull")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("singlePickupBasis")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      {t("expectedPulls", { value: "444.9" })}
                    </p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{t("ceilingPulls", { value: "980" })}</p>
                  </div>
                </div>
                <p className="text-sm text-black dark:text-white">
                  {t.rich("expectedSummary", {
                    one: (chunks) => <span className="font-bold text-blue-600">{chunks}</span>,
                    card: (chunks) => <span className="font-bold text-blue-600">{chunks}</span>,
                    full: (chunks) => <span className="font-bold text-blue-600">{chunks}</span>,
                  })}
                </p>
                <Image
                  src="/infos/gacha_system/gacha_percent_info.webp"
                  alt={t("expectedValue")}
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {t("singlePickupRate")}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className="mb-4 p-6">
          <h2 className="mb-2 text-xl font-bold text-black dark:text-white">{t("percentCalcTitle")}</h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {t("percentCalcDesc")}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Input
                type="number"
                min="1"
                placeholder={t("pullCount")}
                value={pullCount}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  setPullCount(value.toString());
                }}
                className="flex-1"
              />
              <Select value={sixStarCount} onValueChange={setSixStarCount}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t("shape")} />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 6 }, (_, i) => i).map((number) => (
                    <SelectItem key={number} value={number.toString()}>
                      {number === 0 ? t("cardShape") : t("nShape", { n: number })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={calculateRate}>{t("calculate")}</Button>
            </div>
            {calculatedRate !== null && (
              <p className="text-center text-lg font-semibold text-black dark:text-white">
                {t.rich("percentResult", {
                  rate: calculatedRate.toFixed(2),
                })}
              </p>
            )}
          </div>
        </Card>

        <Card className="mb-4 p-6">
          <h2 className="mb-2 text-center text-xl font-bold text-black dark:text-white">
            {t("simulatorTitle")}
          </h2>
          <Link href="/gacha_simulator">
            <Button variant="outline" className="w-full">
              {t("goToSimulator")}
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
