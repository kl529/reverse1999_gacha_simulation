"use client";

import { useState } from "react";
import { cashPackages, type CashPackage } from "@/data/cash_packages";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";

const formatQuantity = (quantity: number) => {
  if (quantity >= 1000) {
    return `${(quantity / 1000).toFixed(1)}K`.replace(".0K", "K");
  }
  return quantity.toString();
};

export default function CashPackageShop() {
  const [cart, setCart] = useState<{ package: CashPackage; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // 각 섹션별 정렬 상태 추가
  const [sortStates, setSortStates] = useState<Record<string, { key: string; ascending: boolean }>>(
    {
      refill: { key: "", ascending: true },
      oneTime: { key: "", ascending: true },
      version: { key: "", ascending: true },
      raindrop: { key: "", ascending: true },
    }
  );

  // 섹션별 열림/닫힘 상태 추가
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    refill: true,
    oneTime: false,
    version: false,
    raindrop: false,
  });

  // 정렬 함수
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

  // 정렬 상태 업데이트 함수
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

  // 섹션 열림/닫힘 상태 업데이트 함수
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
    };
    return grouped;
  };

  const groupedPackages = getGroupedPackages();

  // PackageSection 컴포넌트 수정
  const PackageSection = ({
    title,
    packages,
    badgeText,
    badgeVariant,
    sectionKey,
    defaultOpen = true,
  }: {
    title: string;
    packages: CashPackage[];
    badgeText: string;
    badgeVariant: "secondary" | "destructive" | "default" | "outline";
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
        className="mb-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
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
              효율순 {sortState.key === "efficiency" && (sortState.ascending ? "↑" : "↓")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateSort(sectionKey, "price")}
              className={`text-xs ${sortState.key === "price" ? "border-blue-500" : ""}`}
            >
              가격순 {sortState.key === "price" && (sortState.ascending ? "↑" : "↓")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateSort(sectionKey, "unilog")}
              className={`text-xs ${sortState.key === "unilog" ? "border-blue-500" : ""}`}
            >
              뽑기순 {sortState.key === "unilog" && (sortState.ascending ? "↑" : "↓")}
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {sortedPackages.map((pkg) => (
              <Card key={pkg.id} className="flex flex-col p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{pkg.name}</h3>
                    {/* <Badge variant={badgeVariant} className="mt-1">
                      {badgeText}
                    </Badge> */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">{pkg.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{pkg.price.toLocaleString()}원</p>
                    <p
                      className={`text-sm ${
                        pkg.efficiency >= 90
                          ? "text-green-600"
                          : pkg.efficiency >= 60
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    >
                      효율: {pkg.efficiency}%
                    </p>
                    <p className="text-sm text-blue-500">뽑기: {pkg.unilog}회</p>
                  </div>
                </div>
                <div className="mt-2 flex-1">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {pkg.items.map((item, idx) => (
                      <div key={idx} className="group relative flex items-center gap-1">
                        <div className="relative">
                          <img
                            src={`/infos/materials/${item.id}.webp`}
                            alt={item.name}
                            className="h-8 w-8 rounded-md"
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
                  장바구니 담기
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
          <p className="text-center text-gray-500">장바구니가 비어있습니다</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.package.id} className="p-3">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{item.package.name}</h3>
                    <p className="text-sm text-gray-600">{item.package.price.toLocaleString()}원</p>
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
          <span className="font-semibold">총 금액:</span>
          <span className="font-semibold">{getTotalPrice().toLocaleString()}원</span>
        </div>
        {cart.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">총 구성품:</h3>
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
                    <img
                      src={`/infos/materials/${item.id}.webp`}
                      alt={item.name}
                      className="h-8s w-8 rounded-md"
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
      {/* 상단 고정 헤더 */}
      <div className="sticky top-0 z-10 bg-gray-100 p-4 dark:bg-gray-900 lg:static">
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <h1 className="mt-8 text-center text-xl font-bold text-black dark:text-white lg:text-2xl">
            현질 패키지 정리
          </h1>
        </div>
      </div>

      {/* 모바일 장바구니 버튼 */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 lg:hidden">
        <div className="rounded-lg bg-black/10 px-3 py-2 backdrop-blur-sm dark:bg-white/10">
          <span className="font-semibold text-black dark:text-white">
            {getTotalPrice().toLocaleString()}원
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
            <SheetTitle>장바구니</SheetTitle>
            <div className="flex h-full flex-col pb-20">
              <CartContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mx-auto max-w-7xl p-4">
        {/* 설명 섹션 */}
        <Collapsible className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h2 className="text-lg font-semibold text-black dark:text-white">패키지 선택 가이드</h2>
            <ChevronDown className="h-5 w-5 transform transition-transform" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
              <div className="mt-4 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-red-500 dark:text-red-400">
                  ※ 모든 패키지의 효율은 가격 대비 모노로그만 계산되었습니다
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  * 현재 판매하지 않는 패키지도 포함되어 있습니다.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  * 🔥 어떤 방식으로 현질을 하면 좋을지 공략 ＞{" "}
                  <Link href="/cash_guide" className="text-blue-500 dark:text-blue-400">
                    링크
                  </Link>
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-black dark:text-white">
                  추천 패키지 선택 가이드 ⭐️
                </h3>
                <p className="mb-2 text-red-500 dark:text-red-400">
                  월정액 &gt; 패스 &gt; 1회성 패키지 &gt; 버전 패키지 중 10,000원 이하 패키지 2개
                  &gt; 골든 클래식 &gt; 월간 모집 세일 &gt; 고효율 초회 할인 빗방울 &gt; 그외 패키지
                  &gt; 깡빗방울
                </p>
                <p className="mb-2 text-green-500 dark:text-green-400">
                  - 효율 좋은 기준, 월간 모집세일까지 사면, 버전당 6성 2명은 무난히 획득 가능 🎰
                  <br />
                  - 패스는 뽑기보다, 주는 성장 재화가 넘사벽이라서 추천 + 1회성 패키지는 각자 사정에
                  맞춰서 선택 🔑
                  <br />- 순수의 빗방울로 살 수 있는 레벨별 물자 패키지는, 무조건 구매하는 것을 추천
                  (초회 or 월정액으로 얻어서 구매해도 무방) 💡
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-black dark:text-white">
                  ※ 재료 뷔페 음료 선택 가이드
                </h3>
                <p className="mb-2 text-blue-600 dark:text-blue-400">
                  추천 : (🚦 순간의 소란이 가장 추천됨 ) (재료 풍작 파티보다 효율이 좋음)
                </p>
                <p className="mb-1">
                  순간의 소란 &gt; 마이크로 편광 &gt; 미세 입자 &gt; 톱니동전 &gt; 고급 비밀 궤짝
                  &gt; 황무지 블록 케이스
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-black dark:text-white">
                  ※ 재료 풍작 파티 선택 가이드
                </h3>
                <p className="mb-2 text-blue-600 dark:text-blue-400">
                  추천:(🚦 아득한 울림이 추천됨 + 도철 / 공명의 상자 중 필요한 것 선택 )
                </p>
                <p className="mb-1">
                  아득한 울림 &gt; 특급 비밀 궤짝 &gt; 미세 입자 &gt; 톱니동전 &gt; 고주파 편광 &gt;
                  황무지 블록 케이스
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* 스킨 갤러리 링크 */}
        <Link href="/skin" className="mb-6 block">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-black dark:text-white">
                스킨 갤러리 보러가기 🎨
              </h2>
              <Badge variant="outline" className="ml-2">
                NEW
              </Badge>
            </div>
            <ChevronRight className="h-5 w-5" />
          </div>
        </Link>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 패키지 섹션 */}
          <div className="lg:col-span-2">
            <PackageSection
              title="리필 패키지"
              packages={groupedPackages.refill}
              badgeText="리필형"
              badgeVariant="secondary"
              sectionKey="refill"
              defaultOpen={true}
            />
            <PackageSection
              title="1회성 패키지"
              packages={groupedPackages.oneTime}
              badgeText="1회성"
              badgeVariant="destructive"
              sectionKey="oneTime"
              defaultOpen={false}
            />
            <PackageSection
              title="버전 패키지"
              packages={groupedPackages.version}
              badgeText="버전"
              badgeVariant="default"
              sectionKey="version"
              defaultOpen={false}
            />
            <PackageSection
              title="빗방울 패키지"
              packages={groupedPackages.raindrop}
              badgeText="빗방울"
              badgeVariant="outline"
              sectionKey="raindrop"
              defaultOpen={false}
            />
          </div>

          {/* 데스크톱 장바구니 섹션 */}
          <div className="hidden lg:col-span-1 lg:block">
            <Card className="sticky top-4 p-4">
              <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">장바구니</h2>
              <CartContent />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
