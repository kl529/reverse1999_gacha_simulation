"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { banners, Banner } from "@/data/banners";
import { charactersByRarity } from "@/data/characters";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBannerUrl } from "@/lib/cdn";

// 오늘 이후이면서 종료일이 가장 가까운 배너들만 가져오기 (같은 종료일이면 모두 포함)
function getActivePickupBanners(): Banner[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activeBanners = banners
    .filter((banner) => {
      if (!banner.endDate) return false;
      const endDate = new Date(banner.endDate);
      return endDate >= today;
    })
    .sort((a, b) => {
      const dateA = new Date(a.endDate!);
      const dateB = new Date(b.endDate!);
      return dateA.getTime() - dateB.getTime();
    });

  if (activeBanners.length === 0) return [];

  // 가장 가까운 종료일
  const closestEndDate = activeBanners[0].endDate;

  // 같은 종료일을 가진 배너들만 반환
  return activeBanners.filter((banner) => banner.endDate === closestEndDate);
}

// 남은 일수 계산
function getDaysRemaining(endDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// 캐릭터 ID로 캐릭터 정보 가져오기
function getCharacterById(id: number) {
  for (const rarity of Object.keys(charactersByRarity)) {
    const character = charactersByRarity[Number(rarity)].find((c) => c.id === id);
    if (character) return character;
  }
  return null;
}

// 단일 배너 카드 컴포넌트
function BannerCard({ banner, t }: { banner: Banner; t: ReturnType<typeof useTranslations> }) {
  const daysRemaining = getDaysRemaining(banner.endDate!);

  // 픽업 캐릭터 정보 가져오기
  const pickup6Character =
    typeof banner.pickup6 === "number" ? getCharacterById(banner.pickup6) : banner.pickup6;

  // 더블픽업인 경우
  const isDoublePick = banner.bannerType === "doublePick";
  const doublePickCharacters = isDoublePick
    ? banner.twoPickup6?.map((id) => (typeof id === "number" ? getCharacterById(id) : id))
    : null;

  // 메인 캐릭터 (링크용)
  const mainCharacter = isDoublePick ? doublePickCharacters?.[0] : pickup6Character;

  // 배너 이미지 경로 (id + .webp)
  const backgroundImageSrc = getBannerUrl(`${banner.id}.webp`);

  return (
    <div className="relative flex h-full min-h-[200px] w-full flex-shrink-0 flex-col sm:min-h-[220px]">
      {/* 전체 배경 이미지 (로컬, 위쪽 정렬) */}
      <Image src={backgroundImageSrc} alt={banner.name} fill className="object-cover object-top" />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 flex flex-1 flex-col p-3 sm:p-4">
        {/* 상단: 픽업 이름 + 진행중 */}
        <div className="mb-auto flex items-start justify-between">
          <h3 className="text-base font-bold text-white sm:text-lg">
            {banner.name}
            <span className="ml-2 text-xs font-normal text-green-400 sm:text-sm">{t("active")}</span>
          </h3>

          {/* D-day 칩 + 종료일 */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold sm:px-2.5 sm:text-xs ${
                daysRemaining <= 3
                  ? "bg-red-500 text-white"
                  : daysRemaining <= 7
                    ? "bg-yellow-500 text-black"
                    : "bg-blue-500 text-white"
              }`}
            >
              D-{daysRemaining}
            </div>
            <span className="text-[10px] text-gray-300 sm:text-xs">
              ~{banner.endDate?.replace(/-/g, "/")}
            </span>
          </div>
        </div>

        {/* 하단: 액션 버튼들 */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="h-8 bg-white/90 text-xs text-black hover:bg-white sm:h-9 sm:text-sm"
          >
            <Link href="/gacha_simulator">{t("gachaSim")}</Link>
          </Button>
          {mainCharacter && (
            <Button
              asChild
              size="sm"
              className="h-8 bg-yellow-500 text-xs text-black hover:bg-yellow-400 sm:h-9 sm:text-sm"
            >
              <Link href={`/character/${mainCharacter.id}`}>{t("characterGuide")}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomeCurrentPickup() {
  const activeBanners = getActivePickupBanners();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const t = useTranslations("pickup");

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === activeBanners.length - 1 ? 0 : prev + 1));
  }, [activeBanners.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  }, [activeBanners.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null &&
      Math.abs(touchStartX.current - touchEndX.current) > 50
    ) {
      if (touchStartX.current > touchEndX.current) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // 자동 슬라이드 (10초)
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(handleNext, 10000);
    return () => clearInterval(interval);
  }, [handleNext, activeBanners.length]);

  if (activeBanners.length === 0) {
    return (
      <Card className="flex h-full flex-col items-center justify-center bg-gray-900/80 p-3 sm:p-4">
        <p className="text-sm text-gray-400 sm:text-base">{t("noActive")}</p>
      </Card>
    );
  }

  // 배너가 1개인 경우 캐러셀 없이 표시
  if (activeBanners.length === 1) {
    return (
      <Card className="relative flex h-full min-h-[200px] flex-col overflow-hidden sm:min-h-[220px]">
        <BannerCard banner={activeBanners[0]} t={t} />
      </Card>
    );
  }

  // 여러 배너가 있는 경우 캐러셀로 표시
  return (
    <Card className="relative flex h-full min-h-[200px] flex-col overflow-hidden sm:min-h-[220px]">
      <div
        className="relative h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 슬라이드 컨테이너 */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {activeBanners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} t={t} />
          ))}
        </div>

        {/* 좌우 네비게이션 버튼 */}
        <button
          onClick={handlePrev}
          className="absolute left-1 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 sm:left-2 sm:h-8 sm:w-8"
          aria-label={t("prevBanner")}
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute right-1 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 sm:right-2 sm:h-8 sm:w-8"
          aria-label={t("nextBanner")}
        >
          ▶
        </button>

        {/* 인디케이터 (도트) */}
        <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-14">
          {activeBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
              aria-label={t("goToBanner", { index: index + 1 })}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
