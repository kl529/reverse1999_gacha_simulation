"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function CashGuide() {
  const t = useTranslations("cashGuide");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="mb-4 mt-8 text-center text-3xl font-bold">{t("title")}</h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        {t("dateNote")} <br /> {t("disclaimer")}
      </p>

      <Card className="mb-4 p-4">
        <p className="mb-5 leading-relaxed">
          {t("noAds")}
          <br />
          {t("moderatePay")}
        </p>
        <Separator />
        <h2 className="mt-3 text-xl font-semibold">{t("targetAudience")}</h2>
        <ul className="list-disc pl-5">
          <li>{t("target1")}</li>
          <li>{t("target2")}</li>
          <li>{t("target3")}</li>
        </ul>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">{t("smartPay")}</h2>
        <p className="mb-4 leading-relaxed">
          {t("twoMethods")} <br />
          {t("storeAndHao")}
        </p>
        <p className="text-red-500 underline">
          {t("recentNote")} <br />
          {t("recentNote2")}
        </p>
        <p className="mb-4 leading-relaxed">
          {t("krServerNote")} <br />
          {t("googlePointNote")} <br />
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">
          {t("haoplayTitle")}{" "}
        </h2>
        <p className="mb-4 leading-relaxed">
          {t("haoplayDesc")}
          <br />
          {t("haoplayAnnounce")}
        </p>

        <Image
          src="/infos/cash_guide/cash_guide1.webp"
          alt="HAOPLAY"
          width={800}
          height={400}
          className="mb-4 rounded"
        />
        <p className="mb-2 text-blue-500 underline">
          <Link href="https://i2.haoplay.com/new/index.html?appid=2072023&l=ko" target="_blank">
            {t("chargeLink")}
          </Link>
        </p>
        <Image
          src="/infos/cash_guide/cash_guide2.webp"
          alt="HAOPLAY"
          width={800}
          height={400}
          className="mb-2 rounded"
        />
        <p className="mb-2 text-center text-sm text-muted-foreground">{t("checkDiscount")}</p>
        <p className="mb-4 leading-relaxed">
          {t("discountAvail")}
          <br />
          {t("eggmoneyNote")}
        </p>
        <Image
          src="/infos/cash_guide/cash_guide4.webp"
          alt="Eggmoney"
          width={800}
          height={400}
          className="mb-2 rounded"
        />
        <p className="mb-2 text-center text-sm text-muted-foreground">
          {t("balanceNote")}
        </p>
        <p className="mb-4 leading-relaxed">
          {t("haoplayDownside")} <br />
          <b className="text-red-500">
            {t("noRefund")}{" "}
          </b>
          <br />
          {t("leftover")}
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">{t("giftCardTitle")}</h2>
        <p className="mb-4 leading-relaxed">
          {t("giftCardDesc")} <br />
          <b className="text-red-500">{t("giftCardIrregular")}</b>
          <br />
          {t("giftCardSchedule")}
          <br />
          {t("giftCardRange")}
          <br />
          {t("giftCardTiming")}
        </p>
        <Image
          src="/infos/cash_guide/cash_guide7.webp"
          alt="Google Play Store"
          width={800}
          height={400}
          className="mb-2 rounded"
        />
        <p className="mb-2 text-center text-sm text-muted-foreground">
          {t("storePaymentNote")}
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">{t("comparisonTitle")}</h2>
        <p className="mb-4 leading-relaxed">{t("comparisonIntro")}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="px-3 py-2 text-left font-semibold"></th>
                <th className="px-3 py-2 text-left font-semibold text-green-600 dark:text-green-400">
                  {t("pros")}
                </th>
                <th className="px-3 py-2 text-left font-semibold text-red-500">{t("cons")}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2 font-semibold">{t("haoplayPay")}</td>
                <td className="px-3 py-2">{t("haoplayPro")}</td>
                <td className="px-3 py-2">{t("haoplayCon")}</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-semibold">{t("storePay")}</td>
                <td className="px-3 py-2">
                  {t("storePro")}
                </td>
                <td className="px-3 py-2">{t("storeCon")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">{t("packageTitle")}</h2>
        <ul className="mb-4 list-disc pl-5">
          <li className="font-bold">{t("rank1")}</li>
          <li className="font-bold">
            {t("rank2")}
          </li>
          <li className="font-bold">
            {t("rank3")}
          </li>
        </ul>
        <p className="mb-4 text-center">
          <b className="text-red-500">
            {t("skinTip")}
          </b>
        </p>
        <div className="flex w-full flex-row items-center gap-2">
          <Image
            src="/infos/cash_guide/cash_guide5.webp"
            alt="Package"
            width={400}
            height={200}
            className="mb-2 w-1/2 rounded object-contain"
          />
          <Image
            src="/infos/cash_guide/cash_guide6.webp"
            alt="Package"
            width={400}
            height={200}
            className="mb-2 w-1/2 rounded object-contain"
          />
        </div>
        <p className="mb-2 text-center text-sm text-muted-foreground">
          {t("packageImgNote")}
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">{t("shopLinkTitle")}</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          {t("shopLinkDesc")}
        </p>
        <Button asChild className="w-full">
          <Link href="/cash_package_shop">{t("shopLinkBtn")}</Link>
        </Button>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">{t("closingTitle")}</h2>
        <p className="mb-4 leading-relaxed">
          {t("closingText")}
        </p>
        <p className="mb-4 text-sm italic text-muted-foreground">
          {t("legalNote")}
        </p>
      </Card>
    </div>
  );
}
