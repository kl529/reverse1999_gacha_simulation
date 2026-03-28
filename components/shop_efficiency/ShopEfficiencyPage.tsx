"use client";

import { useState } from "react";
import { shops } from "@/data/shop_efficiency";
import { materialList } from "@/data/material";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function ShopEfficiencyPage() {
  const t = useTranslations("shopEfficiency");
  const [activeShop, setActiveShop] = useState<string>(shops[0].id);
  const [sortBy, setSortBy] = useState<"efficiency" | "cost">("efficiency");

  const getMaterialById = (id: number) => {
    return materialList.find((material) => material.id === id);
  };

  const getRarityColor = (rarity: number) => {
    switch (rarity) {
      case 1:
        return "bg-gray-500";
      case 2:
        return "bg-green-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-purple-500";
      case 5:
        return "bg-orange-500";
      case 6:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 2.0) return "text-red-500 font-bold";
    if (efficiency >= 1.5) return "text-orange-500 font-semibold";
    if (efficiency >= 1.2) return "text-yellow-500 font-medium";
    return "text-gray-500";
  };

  const currentShop = shops.find((shop) => shop.id === activeShop);
  const sortedItems = currentShop?.items.slice().sort((a, b) => {
    if (sortBy === "efficiency") {
      if (a.isRequired && !b.isRequired) return -1;
      if (!a.isRequired && b.isRequired) return 1;
      if (a.efficiency === null && b.efficiency === null) return 0;
      if (a.efficiency === null) return -1;
      if (b.efficiency === null) return 1;
      return b.efficiency - a.efficiency;
    }
    return b.cost - a.cost;
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">
          {t("subtitle")} <br /> {t("subtitleNote")}
        </p>
      </div>

      {/* 상점별 탭 */}
      <div className="mb-8 w-full">
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center">
          {shops.map((shop) => (
            <Button
              key={shop.id}
              variant={activeShop === shop.id ? "default" : "outline"}
              onClick={() => setActiveShop(shop.id)}
              className="flex h-auto items-center justify-center gap-1 p-2 text-xs sm:gap-2 sm:p-3 sm:text-sm"
            >
              <div className="relative h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6">
                <Image
                  src={shop.currency.iconPath}
                  alt={shop.currency.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="truncate">{shop.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* 현재 선택된 상점 정보 */}
      {currentShop && (
        <div className="mb-8">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative h-12 w-12 flex-shrink-0 sm:h-16 sm:w-16">
                    <Image
                      src={currentShop.currency.iconPath}
                      alt={currentShop.currency.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="truncate text-xl sm:text-2xl">
                      {currentShop.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground sm:text-base">
                      {currentShop.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2 sm:mt-2">
                      <span className="text-xs font-medium sm:text-sm">{t("currency")}</span>
                      <div className="flex items-center gap-1">
                        <div className="relative h-4 w-4 sm:h-5 sm:w-5">
                          <Image
                            src={currentShop.currency.iconPath}
                            alt={currentShop.currency.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium sm:text-base">
                          {currentShop.currency.name}
                        </span>
                      </div>
                    </div>
                    {currentShop.refreshTime && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {t("refreshPrefix")}{currentShop.refreshTime}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 self-start sm:self-center">
                  <Button
                    variant={sortBy === "efficiency" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("efficiency")}
                    className="text-xs sm:text-sm"
                  >
                    {t("sortEfficiency")}
                  </Button>
                  <Button
                    variant={sortBy === "cost" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("cost")}
                    className="text-xs sm:text-sm"
                  >
                    {t("sortCost")}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      )}

      {/* 상품 목록 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {sortedItems?.map((item, index) => {
          const material = getMaterialById(item.materialId);
          return (
            <Card
              key={`${item.materialId}-${index}`}
              className={`transition-shadow hover:shadow-lg ${
                item.isRequired
                  ? "border-red-300 bg-red-50/70 shadow-md ring-1 ring-red-200 dark:border-red-700 dark:bg-red-950/30 dark:ring-red-800"
                  : item.isEstimate
                    ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20"
                    : ""
              }`}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                  <div className="relative h-12 w-12 flex-shrink-0 sm:h-16 sm:w-16">
                    <Image
                      src={`/infos/materials/${item.materialId}.webp`}
                      alt={material?.name || t("materialDefault")}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="truncate text-base font-semibold sm:text-lg">
                        {material?.name}
                      </h3>
                      <Badge
                        className={`${getRarityColor(material?.rarity || 1)} text-xs text-white`}
                      >
                        ★{material?.rarity}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium sm:text-sm">{t("price")}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold sm:text-base">{item.cost}</span>
                      <div className="relative h-4 w-4 sm:h-5 sm:w-5">
                        <Image
                          src={currentShop?.currency.iconPath || ""}
                          alt={currentShop?.currency.name || ""}
                          fill
                          className="object-contain"
                        />
                      </div>
                      {item.isRefresh && (
                        <Badge className="ml-1 h-5 bg-green-500 px-1 py-0 text-xs text-white">
                          {t("refresh")}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium sm:text-sm">{t("efficiency")}</span>
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-base font-bold sm:text-lg ${
                          item.efficiency !== null
                            ? getEfficiencyColor(item.efficiency)
                            : "font-medium text-gray-400"
                        }`}
                      >
                        {item.efficiency !== null ? `${item.efficiency.toFixed(2)}x` : t("unmeasurable")}
                      </span>
                      {item.isRequired && (
                        <Badge className="h-5 bg-red-500 px-1 py-0 text-xs text-white">{t("recommended")}</Badge>
                      )}
                      {item.isEstimate && (
                        <Badge
                          variant="secondary"
                          className="h-5 bg-blue-100 px-1 py-0 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {t("estimated")}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {item.description && (
                    <div className="border-t pt-2">
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {(!sortedItems || sortedItems.length === 0) && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">{t("noItems")}</p>
        </div>
      )}
    </div>
  );
}
