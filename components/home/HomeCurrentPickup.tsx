"use client";

import Image from "next/image";
import Link from "next/link";
import { banners } from "@/data/banners";
import { charactersByRarity } from "@/data/characters";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 오늘 이후이면서 종료일이 가장 가까운 배너 1개 가져오기
function getCurrentPickupBanner() {
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

  return activeBanners[0] || null;
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

// 배너 이미지 경로 생성 (로컬)
function getBannerImagePath(filename: string): string {
  return `/infos/banner_img/${filename}`;
}

export default function HomeCurrentPickup() {
  const currentBanner = getCurrentPickupBanner();

  if (!currentBanner) {
    return (
      <Card className="flex h-full flex-col items-center justify-center bg-gray-900/80 p-3 sm:p-4">
        <p className="text-sm text-gray-400 sm:text-base">현재 진행 중인 픽업이 없습니다</p>
      </Card>
    );
  }

  const daysRemaining = getDaysRemaining(currentBanner.endDate!);

  // 픽업 캐릭터 정보 가져오기
  const pickup6Character =
    typeof currentBanner.pickup6 === "number"
      ? getCharacterById(currentBanner.pickup6)
      : currentBanner.pickup6;

  // 더블픽업인 경우
  const isDoublePick = currentBanner.bannerType === "doublePick";
  const doublePickCharacters = isDoublePick
    ? currentBanner.twoPickup6?.map((id) => (typeof id === "number" ? getCharacterById(id) : id))
    : null;

  // 메인 캐릭터 (링크용)
  const mainCharacter = isDoublePick ? doublePickCharacters?.[0] : pickup6Character;

  // 배너 이미지 경로 (id + .webp)
  const backgroundImageSrc = getBannerImagePath(`${currentBanner.id}.webp`);

  return (
    <Card className="relative flex h-full min-h-[200px] flex-col overflow-hidden sm:min-h-[220px]">
      {/* 전체 배경 이미지 (로컬, 위쪽 정렬) */}
      <Image
        src={backgroundImageSrc}
        alt={currentBanner.name}
        fill
        className="object-cover object-top"
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 flex flex-1 flex-col p-3 sm:p-4">
        {/* 상단: 픽업 이름 + 진행중 */}
        <div className="mb-auto flex items-start justify-between">
          <h3 className="text-base font-bold text-white sm:text-lg">
            {currentBanner.name}
            <span className="ml-2 text-xs font-normal text-green-400 sm:text-sm">진행중</span>
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
              ~{currentBanner.endDate?.replace(/-/g, "/")}
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
            <Link href="/gacha_simulator">🎰 뽑기 시뮬</Link>
          </Button>
          {mainCharacter && (
            <Button
              asChild
              size="sm"
              className="h-8 bg-yellow-500 text-xs text-black hover:bg-yellow-400 sm:h-9 sm:text-sm"
            >
              <Link href={`/character/${mainCharacter.id}`}>📖 캐릭터 가이드</Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
