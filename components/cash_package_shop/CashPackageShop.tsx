"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cashPackages, type CashPackage } from "@/data/cash_packages";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const formatQuantity = (quantity: number) => {
  if (quantity >= 1000) {
    return `${(quantity / 1000).toFixed(1)}K`.replace(".0K", "K");
  }
  return quantity.toString();
};

export default function CashPackageShop() {
  const t = useTranslations("cashPackage");
  const [cart, setCart] = useState<{ package: CashPackage; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortStates, setSortStates] = useState<Record<string, { key: string; ascending: boolean }>>(
    {
      refill: { key: "", ascending: true },
      oneTime: { key: "", ascending: true },
      version: { key: "", ascending: true },
      raindrop: { key: "", ascending: true },
      skin: { key: "", ascending: true },
    }
  );

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    refill: true,
    oneTime: false,
    version: false,
    raindrop: false,
  });

  const sortPackages = (packages: CashPackage[], sortKey: string, ascending: boolean) => {
    return [...packages].sort((a, b) => {
      let compareValue = 0;
      switch (sortKey) {
        case "efficiency":
          compareValue = a.efficiency - b.efficiency;
          break;
        case "price":
          compareValue = a.price - b.price;
          break;
        case "unilog":
          compareValue = a.unilog - b.unilog;
          break;
        default:
          return 0;
      }
      return ascending ? compareValue : -compareValue;
    });
  };

  const updateSort = (section: string, newSortKey: string) => {
    setSortStates((prev) => {
      const currentState = prev[section];
      const ascending = currentState.key === newSortKey ? !currentState.ascending : true;
      return {
        ...prev,
        [section]: { key: newSortKey, ascending },
      };
    });
  };

  const updateSectionOpen = (sectionKey: string, isOpen: boolean) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: isOpen,
    }));
  };

  const addToCart = (pkg: CashPackage) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.package.id === pkg.id);
      if (existingItem) {
        return prev.map((item) =>
          item.package.id === pkg.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { package: pkg, quantity: 1 }];
    });
  };

  const removeFromCart = (packageId: number) => {
    setCart((prev) => prev.filter((item) => item.package.id !== packageId));
  };

  const updateQuantity = (packageId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.package.id === packageId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.package.price * item.quantity, 0);
  };

  const getGroupedPackages = () => {
    const grouped = {
      refill: cashPackages.filter((pkg) => pkg.type === "refill"),
      oneTime: cashPackages.filter((pkg) => pkg.type === "one-time"),
      version: cashPackages.filter((pkg) => pkg.type === "version"),
      raindrop: cashPackages.filter((pkg) => pkg.type === "raindrop"),
      skin: cashPackages.filter((pkg) => pkg.type === "skin"),
    };
    return grouped;
  };

  const groupedPackages = getGroupedPackages();

  const PackageSection = ({
    title,
    packages,
    sectionKey,
  }: {
    title: string;
    packages: CashPackage[];
    sectionKey: string;
    defaultOpen?: boolean;
  }) => {
    const sortState = sortStates[sectionKey];
    const sortedPackages = sortPackages(packages, sortState.key, sortState.ascending);
    const isOpen = openSections[sectionKey];

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={(open) => updateSectionOpen(sectionKey, open)}
        className="mb-4 rounded-lg border border-black p-4 dark:border-white"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <h2 className="text-xl font-semibold text-black dark:text-white">{title}</h2>
          <ChevronDown
            className={`h-6 w-6 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="mb-4 flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateSort(sectionKey, "efficiency")}
              className={`text-xs ${sortState.key === "efficiency" ? "border-blue-500" : ""}`}
            >
              {t("efficiencySort")} {sortState.key === "efficiency" && (sortState.ascending ? "↑" : "↓")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateSort(sectionKey, "price")}
              className={`text-xs ${sortState.key === "price" ? "border-blue-500" : ""}`}
            >
              {t("priceSort")} {sortState.key === "price" && (sortState.ascending ? "↑" : "↓")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateSort(sectionKey, "unilog")}
              className={`text-xs ${sortState.key === "unilog" ? "border-blue-500" : ""}`}
            >
              {t("pullSort")} {sortState.key === "unilog" && (sortState.ascending ? "↑" : "↓")}
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {sortedPackages.map((pkg) => (
              <Card key={pkg.id} className="flex flex-col p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{pkg.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{pkg.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{pkg.price.toLocaleString()}{t("won")}</p>
                    <p
                      className={`text-sm ${
                        pkg.efficiency >= 90
                          ? "text-green-600"
                          : pkg.efficiency >= 60
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    >
                      {t("efficiency", { value: pkg.efficiency })}
                    </p>
                    <p className="text-sm text-blue-500">{t("pulls", { value: pkg.unilog })}</p>
                  </div>
                </div>
                <div className="mt-2 flex-1">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {pkg.items.map((item, idx) => (
                      <div key={idx} className="group relative flex items-center gap-1">
                        <div className="relative">
                          <Image
                            src={`/infos/materials/${item.id}.webp`}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="rounded-md"
                          />
                          <div className="absolute -bottom-2 left-1/2 flex h-4 min-w-4 -translate-x-1/2 items-center justify-center rounded-full bg-black/70 px-1 text-center text-[10px] leading-none text-white">
                            {formatQuantity(item.quantity)}
                          </div>
                          <div className="absolute left-1/2 top-full z-10 mt-2 hidden w-max -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-2 py-1 text-xs text-white group-hover:block">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => {
                    addToCart(pkg);
                    if (window.innerWidth < 1024) {
                      setIsCartOpen(true);
                    }
                  }}
                  className="mt-3 w-full"
                  variant="outline"
                >
                  {t("addToCart")}
                </Button>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const CartContent = () => (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">{t("cartEmpty")}</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.package.id} className="border p-3">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{item.package.name}</h3>
                    <p className="text-sm text-black dark:text-white">
                      {item.package.price.toLocaleString()}{t("won")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.package.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.package.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.package.id)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between">
          <span className="font-semibold">{t("totalPrice")}</span>
          <span className="font-semibold">{getTotalPrice().toLocaleString()}{t("won")}</span>
        </div>
        {cart.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">{t("totalItems")}</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(
                cart.reduce(
                  (acc, item) => {
                    item.package.items.forEach((packageItem) => {
                      const key = `${packageItem.id}:${packageItem.name}`;
                      acc[key] = {
                        id: packageItem.id,
                        name: packageItem.name,
                        quantity: (acc[key]?.quantity || 0) + packageItem.quantity * item.quantity,
                      };
                    });
                    return acc;
                  },
                  {} as Record<string, { id: number; name: string; quantity: number }>
                )
              ).map(([key, item]) => (
                <div key={key} className="group relative flex items-center gap-1">
                  <div className="relative">
                    <Image
                      src={`/infos/materials/${item.id}.webp`}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <div className="absolute -bottom-2 left-1/2 flex h-4 min-w-4 -translate-x-1/2 items-center justify-center rounded-full bg-black/70 px-1 text-center text-[10px] leading-none text-white">
                      {formatQuantity(item.quantity)}
                    </div>
                    <div className="absolute left-1/2 top-full z-10 mt-2 hidden w-max -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-2 py-1 text-xs text-white group-hover:block">
                      {item.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="sticky top-0 z-10 bg-gray-100 p-4 dark:bg-gray-900 lg:static">
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <h1 className="mt-8 text-center text-xl font-bold text-black dark:text-white lg:text-2xl">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 lg:hidden">
        <div className="rounded-lg bg-black/10 px-3 py-2 backdrop-blur-sm dark:bg-white/10">
          <span className="font-semibold text-black dark:text-white">
            {getTotalPrice().toLocaleString()}{t("won")}
          </span>
        </div>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="relative h-12 w-12 rounded-full shadow-lg"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <Badge
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0"
                  variant="destructive"
                >
                  {cart.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] w-full lg:hidden">
            <SheetTitle>{t("cart")}</SheetTitle>
            <div className="flex h-full flex-col pb-20">
              <CartContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mx-auto max-w-7xl p-4">
        <Collapsible
          defaultOpen={true}
          className="mb-6 rounded-lg border border-black p-4 dark:border-white"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h2 className="text-lg font-semibold text-black dark:text-white">{t("guideTitle")}</h2>
            <ChevronDown className="h-5 w-5 transform transition-transform" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
              <div className="mt-4 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-red-500 dark:text-red-400">
                  {t("guideEfficiency")}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("guideNotCurrent")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("guideCashLink")}{" "}
                  <Link href="/cash_guide" className="text-blue-500 dark:text-blue-400">
                    {t("link")}
                  </Link>
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-black dark:text-white">
                  {t("recommendGuide")}
                </h3>
                <p className="mb-2 text-red-500 dark:text-red-400">
                  {t("recommendOrder")}
                </p>
                <p className="mb-2 text-green-500 dark:text-green-400">
                  {t("recommendNote1")}
                  <br />
                  {t("recommendNote2")}
                  <br />
                  {t("recommendNote3")}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-black dark:text-white">
                  {t("buffetGuide")}
                </h3>
                <p className="mb-2 text-blue-600 dark:text-blue-400">
                  {t("buffetRecommend")}
                </p>
                <p className="mb-1">
                  {t("buffetOrder")}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-black dark:text-white">
                  {t("partyGuide")}
                </h3>
                <p className="mb-2 text-blue-600 dark:text-blue-400">
                  {t("partyRecommend")}
                </p>
                <p className="mb-1">
                  {t("partyOrder")}
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Link href="/skin" className="mb-6 block">
          <div className="flex items-center justify-between rounded-lg border border-black p-4 transition-colors hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-black dark:text-white">
                {t("skinGallery")}
              </h2>
              <Badge variant="outline" className="ml-2 border-black dark:border-white">
                NEW
              </Badge>
            </div>
            <ChevronRight className="h-5 w-5" />
          </div>
        </Link>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PackageSection
              title={t("refill")}
              packages={groupedPackages.refill}
              sectionKey="refill"
              defaultOpen={true}
            />
            <PackageSection
              title={t("oneTime")}
              packages={groupedPackages.oneTime}
              sectionKey="oneTime"
              defaultOpen={false}
            />
            <PackageSection
              title={t("versionPkg")}
              packages={groupedPackages.version}
              sectionKey="version"
              defaultOpen={false}
            />
            <PackageSection
              title={t("raindrop")}
              packages={groupedPackages.raindrop}
              sectionKey="raindrop"
              defaultOpen={false}
            />
            <PackageSection
              title={t("skinPkg")}
              packages={groupedPackages.skin}
              sectionKey="skin"
              defaultOpen={false}
            />
          </div>

          <div className="hidden lg:col-span-1 lg:block">
            <Card className="sticky top-4 p-4">
              <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">{t("cart")}</h2>
              <CartContent />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
