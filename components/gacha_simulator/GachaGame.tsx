"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { BannerSixStarListModal } from "@/components/modals/BannerSixStarListModal";
import { charactersByRarity, Character } from "@/data/characters";
import { banners, Banner } from "@/data/banners";
import { percentRankTable } from "@/data/percent_rank_table";
import GachaResults from "@/components/gacha_simulator/GachaResults";
import { OffCanvas } from "@/components/gacha_simulator/OffCanvas";
import MainGachaStats from "@/components/gacha_simulator/MainGachaStats";
import MainSixStarHistory from "@/components/gacha_simulator/MainSixStarHistory";
import { version } from "@/data/version";

export const isValidGachaCharacter = (char: Character): boolean => {
  if (char.exclude_gacha) return false;
  const charVersion = parseFloat(char.version);
  const maxAllowed = parseFloat(version) - 0.3;
  return charVersion <= maxAllowed;
};

interface SixStarHistoryEntry {
  char: Character;
  pullNumber: number;
}

export interface EnrichedBanner extends Banner {
  pickup6?: Character;
  pickup5?: Character[];
  twoPickup6?: Character[];
}

const findCharacterById = (id: number): Character => {
  for (const rarity in charactersByRarity) {
    const match = charactersByRarity[Number(rarity)].find((c) => c.id === id);
    if (match) return match;
  }
  throw new Error(`캐릭터 ID ${id}를 찾을 수 없습니다.`);
};

const enrichBanner = (banner: Banner): EnrichedBanner => {
  return {
    ...banner,
    pickup6: typeof banner.pickup6 === "number" ? findCharacterById(banner.pickup6) : banner.pickup6,
    pickup5: banner.pickup5?.map((c) => (typeof c === "number" ? findCharacterById(c) : c)),
    twoPickup6: banner.twoPickup6?.map((c) => (typeof c === "number" ? findCharacterById(c) : c)),
  };
};
export default function GachaGame() {
  const [selectedBanner, setSelectedBanner] = useState<EnrichedBanner>(
    enrichBanner(
      banners.find((b) => 
        b.bannerType !== "doublePick" && 
        (!b.version || parseFloat(b.version) <= parseFloat(version))
      ) || banners[0]
    )
  );

  // 1) React 상태
  const [results, setResults] = useState<Character[]>([]);
  const [totalPulls, setTotalPulls] = useState<number>(0);
  const [rarityStats, setRarityStats] = useState<{ [key: number]: number }>({2: 0, 3: 0, 4: 0, 5: 0, 6: 0});
  const [pityCount, setPityCount] = useState<number>(0);
  const [pickupGuarantee, setPickupGuarantee] = useState<boolean>(false);
  const [sixStarHistory, setSixStarHistory] = useState<SixStarHistoryEntry[]>([]);
  const nickname = "Lyva";
  const [isLeftOpen, setIsLeftOpen] = useState(false); // 모바일에서 왼쪽 사이드바 펼침 여부
  const [isRightOpen, setIsRightOpen] = useState(false); // 모바일에서 오른쪽 사이드바 펼침 여부
  const [isFirstPull, setIsFirstPull] = useState(true); // 첫 뽑기인지 확인하는 상태
  const [is6StarListOpen, set6StarListOpen] = useState(false); // 6성 목록 팝업 상태
  const [showDoublePick, setShowDoublePick] = useState(false);
  const [pickupShape, setPickupShape] = useState<string | null>(null); // 이번에 뽑은 픽업캐릭 형상
  const [pickupRank, setPickupRank] = useState<number | null>(null); // 픽업 상위 몇 %인지
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results.length < 1) return;

    // 🔹 가장 최근에 뽑힌 6성을 찾음 (배열을 역순으로 탐색)
    const lastSixStar = [...results].reverse().find(c => c.rarity === 6);
    if (!lastSixStar) {
      if (!pickupShape) {
        // 아직 픽업 6성을 한 번도 못 뽑았음 => 항상 100% 표시
        setPickupRank(100);
      } 
      // pickupShape가 이미 있으면 => 이전 픽업 유지
      // (ex. 일전에 픽업 뽑았는데 지금은 6성 없는 상태)
      else {
        // totalPulls가 늘었을 경우, rank 재계산
        const rp = getShapeRankPercent(totalPulls, pickupShape);
        setPickupRank(rp ?? 100);
      }
      return;
    }

    // 🔹 이번 6성이 '픽업'인지 확인
    let isPickup = false;
    if (selectedBanner.bannerType === "doublePick" && selectedBanner.twoPickup6) {
      isPickup = selectedBanner.twoPickup6.some(pc => pc.engName === lastSixStar.engName);
    } else {
      isPickup = selectedBanner.pickup6?.engName === lastSixStar.engName;
    }

    if (!isPickup) {
      // 6성 있는데 픽뚫 => 이전 pickupShape가 있으면 rank만 재계산
      if (pickupShape) {
        const rp = getShapeRankPercent(totalPulls, pickupShape);
        setPickupRank(rp ?? 100);
      } else {
        // 여전히 한 번도 픽업 6성 못 뽑은 상태 => 상위 100%
        setPickupRank(100);
      }
      return;
    }

    // 🔹 형상 계산 => sixStarHistory 중 해당 engName 몇번 나왔는지
    const sameCount = sixStarHistory.filter(h => h.char.engName === lastSixStar.engName).length;
    const shapeStr = getShapeString(sameCount - 1);

    // 🔹 상위 % 계산
    const rp = getShapeRankPercent(totalPulls, shapeStr);
    
    // 🔹 상태 업데이트 (즉시 UI 반영)
    setPickupShape(shapeStr);
    setPickupRank(rp ?? null);
  }, [results, sixStarHistory, totalPulls, selectedBanner, pickupShape]);

  useEffect(() => {
    historyRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [sixStarHistory]);

  const displayedBanners = useMemo(() => {
    return banners.filter(b => 
      (showDoublePick ? b.bannerType === "doublePick" : b.bannerType !== "doublePick") &&
      (!b.version || parseFloat(b.version) <= parseFloat(version))
    );
  }, [showDoublePick]);

  // 🔸 픽업 vs 일반 6성 횟수 계산
  const { pickupCount, nonPickupCount } = useMemo(() => {
    let pickup = 0;
    let nonPickup = 0;
  
    sixStarHistory.forEach((entry) => {
      if (selectedBanner.bannerType === "doublePick" && selectedBanner.twoPickup6) {
        if (selectedBanner.twoPickup6.some(c => c.engName === entry.char.engName)) {
          pickup++;
        } else {
          nonPickup++;
        }
      }
      else {
        if (selectedBanner.pickup6 && entry.char.engName === selectedBanner.pickup6.engName) {
          pickup++;
        } 
        else {
          nonPickup++;
        }
      }
    });
  
    return { pickupCount: pickup, nonPickupCount: nonPickup };
  }, [sixStarHistory, selectedBanner]);

  // 2) 6성 확률 계산
  const getSixStarRate = (localPity: number) => {
    if (localPity < 60) return 1.5;
    return Math.min(4 + (localPity - 60) * 2.5, 100);
  };

  // 3) 유틸: 배열 랜덤
  const getRandomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // 4) 6성 기록
  const recordSixStar = (char: Character, pullIndex: number) => {
    setSixStarHistory(prev => [
      { char, pullNumber: totalPulls + pullIndex + 1 },
      ...prev,
    ]);
  };

  /**
   * 5) 단일 뽑기 (로컬 pity & pickup)
   * @param pullIndex 10연 중 몇 번째인지 (0~9)
   * @param localPity 현재 local pity
   * @param localPickupPickup 현재 local pickupGuarantee
   * @returns [뽑힌 캐릭터, 새 localPity, 새 localPickupGuarantee]
   */
  const doSinglePull = (
    pullIndex: number,
    localPity: number,
    localPickup: boolean
  ): [Character, number, boolean] => {

    // 🔹 2중 픽업 배너 로직
    if (selectedBanner.bannerType === "doublePick" && selectedBanner.twoPickup6) {
      return doSinglePullDoublePick(pullIndex, localPity, localPickup);
    }

    // 🔹 일반 픽업 배너 로직 => 70뽑 초과 -> 즉시 6성 + 픽업 50%
    if (localPity + 1 >= 70) {
      let forcedSix: Character;
      if (localPickup) {
        forcedSix = selectedBanner.pickup6!;
        localPickup = false;
      } else {
        const isPickup = Math.random() < 0.5;
        if (isPickup) {
          forcedSix = selectedBanner.pickup6!;
        } else {
          forcedSix = getRandomFrom(charactersByRarity[6].filter(isValidGachaCharacter));
          localPickup = true;
        }
      }
      recordSixStar(forcedSix, pullIndex);
      return [forcedSix, 0, localPickup];
    }

    // 천장 확률
    const sixStarRate = getSixStarRate(localPity);
    const rand = Math.random() * 100;
    let cumulative = 0;

    for (const rarity of [6, 5, 4, 3, 2]) {
      const prob = {
        6: sixStarRate,
        5: 8.5,
        4: 40,
        3: 45,
        2: 5
      }[rarity];

      cumulative += prob ?? 0;
      if (rand < cumulative) {
        // 6성
        if (rarity === 6) {
          let picked: Character;
          if (localPickup) {
            picked = selectedBanner.pickup6!;
            localPickup = false;
          } else {
            const isPickup = Math.random() < 0.5;
            if (isPickup) {
              picked = selectedBanner.pickup6!;
            } else {
              picked = getRandomFrom(charactersByRarity[6].filter(isValidGachaCharacter));
              localPickup = true;
            }
          }
          recordSixStar(picked, pullIndex);
          return [picked, 0, localPickup];
        }

        // 5성
        if (rarity === 5) {
          let c;
          if (selectedBanner.pickup5 && selectedBanner.pickup5.length > 0) {
            const isPickup = Math.random() < 0.5;
            c = isPickup
              ? getRandomFrom(selectedBanner.pickup5)
              : getRandomFrom(charactersByRarity[5].filter(isValidGachaCharacter));
          } else {
            // 픽업 5성이 없으면 일반 5성에서만 가져옴
            c = getRandomFrom(charactersByRarity[5].filter(isValidGachaCharacter));
          }
          return [c, localPity + 1, localPickup];
        }

        // 4성 이하
        const c = getRandomFrom(charactersByRarity[rarity].filter(isValidGachaCharacter));
        return [c, localPity + 1, localPickup];
      }
    }

    // 혹시 확률 못찾으면 2성
    return [charactersByRarity[2][0], localPity + 1, localPickup];
  };

  /**
   * 6) n회 뽑기
   * - localPity, localPickup 사용
   * - 반복이 끝난 후, React 상태에 최종 반영
   */
  const handleGacha = (times: number) => {
    let localPity = pityCount;
    let localPickup = pickupGuarantee;
  
    const newResults: Character[] = [];
    const newStats = { ...rarityStats };
  
    for (let i = 0; i < times; i++) {
      let char: Character | null = null;
  
      // ───────────── 첫 뽑기 로직 ─────────────
      // (만약 첫 뽑기를 5성 확정 등으로 처리하고 싶다면 이 부분에서 로직 구현)
      if (isFirstPull && i === 0) {
        // 예: 첫 뽑기는 5성 확정 (픽업 5성 or 일반 5성)
        char = getRandomFrom([
          ...(selectedBanner.pickup5 ?? []),
          ...charactersByRarity[5].filter(isValidGachaCharacter),
        ]);
        // 6성 아니므로 pity 1 증가
        localPity += 1;
        setIsFirstPull(false);
      }
      // ───────────────────────────────
      else {
        // ────── 2중 픽업 배너일 경우 ──────
        if (selectedBanner.bannerType === "doublePick") {
          // 2중 픽업용 doSinglePullDoublePick은
          // [획득캐릭터, 새 localPity, 새 localPickup]을 반환
          const [pickedChar, newPity, newPickup] = doSinglePullDoublePick(
            i,             // pullIndex
            localPity,     // 현재 pity
            localPickup    // 픽업 보장 여부
          );
          char = pickedChar;
          localPity = newPity;
          localPickup = newPickup;
        }
        // ────── 일반 픽업 배너일 경우 ──────
        else {
          const [pulledChar, newPity, newPickup] = doSinglePull(
            i,
            localPity,
            localPickup
          );
          char = pulledChar;
          localPity = newPity;
          localPickup = newPickup;
        }
      }
  
      // 획득한 캐릭터 rarityStats 반영
      newResults.push(char);
      newStats[char.rarity] += 1;
    }
  
    // 뽑기 후 상태 업데이트
    setResults(newResults);
    setTotalPulls((prev) => prev + times);
    setRarityStats(newStats);
    setPityCount(localPity);
    setPickupGuarantee(localPickup);
  };

  /**
   * 7) 전체 리셋
   */
  const resetAll = () => {
    setResults([]);
    setTotalPulls(0);
    setRarityStats({ 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    setPityCount(0);
    setPickupGuarantee(false);
    setSixStarHistory([]);
    setIsFirstPull(true); // 초기화 후 첫 뽑기에서도 5성 확정
    setPickupShape(null);
    setPickupRank(null);
  };

  /**
   * 8) 배너 변경 시 전체 초기화
   */
  const handleBannerChange = (bannerId: string) => {
    resetAll(); // ✅ 배너 변경 시 모든 상태 초기화
    setIsFirstPull(true);
  
    const newBanner = banners.find((b) => b.id === bannerId) || banners[0];
  
    setSelectedBanner(enrichBanner({
      ...newBanner,
      pickup5: newBanner.pickup5 ?? [],
    }));
  };

  function doSinglePullDoublePick(
    pullIndex: number,
    localPity: number,
    localPickup: boolean
  ): [Character, number, boolean] {
  
    // 1) 70회 초과 → 확정 6성
    if (localPity + 1 >= 70) {
      const pick = getDoublePickSix(localPickup, pullIndex);
      if (!isInDoublePickup(pick)) {
        return [pick, 0, true];
      } else {
        return [pick, 0, false];
      }
    }
  
    // ... 이하 동일
    const sixRate = getSixStarRateWithPity(localPity);
    // 예: < 60 → 1.5%, >=60 → 4% + (pity - 60)*2.5 (최대 100%)
    
    // 확률 추첨
    const rand = Math.random() * 100;
    let cumulative = 0;
  
    // 6,5,4,3,2 순으로 비교
    for (const rarity of [6, 5, 4, 3, 2]) {
      const prob = {
        6: sixRate,
        5: 8.5,
        4: 40,
        3: 45,
        2: 5,
      }[rarity] ?? 0;
  
      cumulative += prob;
      if (rand < cumulative) {
        // 6성
        if (rarity === 6) {
          const pick = getDoublePickSix(localPickup, pullIndex);
          if (!isInDoublePickup(pick)) {
            // 비픽업
            return [pick, 0, true];
          } else {
            // 픽업
            return [pick, 0, false];
          }
        }
  
        // 5성 (균등 분배)
        if (rarity === 5) {
          // 원하는 5성 로직 (여기선 모든 5성 균등)
          const c = getRandomFrom(charactersByRarity[5].filter(isValidGachaCharacter));
          return [c, localPity + 1, localPickup];
        }
  
        // 4성 이하
        const c = getRandomFrom(charactersByRarity[rarity].filter(isValidGachaCharacter));
        return [c, localPity + 1, localPickup];
      }
    }
  
    // 여기 오면 2성
    return [charactersByRarity[2][0], localPity + 1, localPickup];
  }

  function getDoublePickSix(localPickup: boolean, pullIndex: number): Character {
    if (!selectedBanner.twoPickup6) {
      // fallback (데이터 없으면 그냥 전체 6성 중 랜덤)
      const fallback = getRandomFrom(charactersByRarity[6].filter(isValidGachaCharacter));
      recordSixStar(fallback, pullIndex);
      return fallback;
    }
  
    const [pickupA, pickupB] = selectedBanner.twoPickup6;
    // 나머지 6성
    const other6stars = charactersByRarity[6].filter(
      (c) => c.engName !== pickupA.engName && c.engName !== pickupB.engName && !c.exclude_gacha && isValidGachaCharacter(c)
    );
  
    // localPickup=true => 무조건 2명 중 1명
    if (localPickup) {
      const guar = getRandomFrom([pickupA, pickupB]);
      recordSixStar(guar, pullIndex);
      // 다음 뽑기에서 localPickup=false로 돌아가도록
      // => 이 값은 doSinglePullDoublePick에서 반환
      return guar;
    }
  
    // localPickup=false => 70% 확률로 (pickupA or pickupB), 30%로 other
    const chance = Math.random() * 100; // 0~100
    if (chance < 70) {
      // 2픽업 중 균등
      const pickUp = getRandomFrom([pickupA, pickupB]);
      recordSixStar(pickUp, pullIndex);
      // 다음엔 pickupGuarantee=false 그대로
      return pickUp;
    } else {
      // 픽업 외 6성
      const out = getRandomFrom(other6stars);
      recordSixStar(out, pullIndex);
      // 이 경우 다음 6성은 localPickup=true
      // => doSinglePullDoublePick에서 (picked6, 0, true) 형태로 반환해주면 됨
      return out;
    }
  }

  function isInDoublePickup(char: Character): boolean {
    if (!selectedBanner.twoPickup6) return false;
    return selectedBanner.twoPickup6.some(p => p.engName === char.engName);
  }
  
  function getSixStarRateWithPity(pityCount: number): number {
    // 60회 이전 => 1.5%
    if (pityCount < 60) return 1.5;
  
    // 60회 이후 => 4% + (pityCount-60)*2.5, 최대 100
    const rate = 4 + (pityCount - 60) * 2.5;
    return Math.min(rate, 100);
  }

  const toggleDoublePick = () => {
    setShowDoublePick((prev) => {
      const newShowDoublePick = !prev;
  
      // ✅ 배너 목록 필터링
      const newBanners = newShowDoublePick
        ? banners.filter((b) => b.bannerType === "doublePick")
        : banners.filter((b) => b.bannerType !== "doublePick");
  
      // ✅ 선택된 배너 변경
      setSelectedBanner(enrichBanner(newBanners.length > 0 ? newBanners[0] : banners[0]));
  
      resetAll(); // ✅ 상태 리셋
      return newShowDoublePick;
    });
  };

  function getShapeString(duplicateCount: number) {
    if (duplicateCount === 0) return "명함";
    return `${Math.min(duplicateCount, 5)}형`; // 중복=1 -> "1형", 중복=5이상 -> "5형"
  }

  function getShapeRankPercent(N: number, shape: string): number | null {
    if (!percentRankTable[N]) return null;
    if (percentRankTable[N][shape] == null) return null;
    return percentRankTable[N][shape];
  }

  // -------------------------
  // UI (모바일 최적화)
  // -------------------------
  return (
    <div
      className={`
        w-full 
        max-w-screen-2xl 
        mx-auto 
        h-screen 
        bg-gray-100 
        p-2 lg:p-6 
        flex 
        flex-col lg:flex-row 
        items-start 
        gap-2 lg:gap-4 
        relative
        bg-gray-100 text-black
        dark:bg-gray-900 dark:text-gray-100 /* 다크 모드 시 배경/글자색 */
      `}
    >
      {/* 🌟 왼쪽 패널 (통계) */}
      <OffCanvas isOpen={isLeftOpen} onClose={() => setIsLeftOpen(false)} position="left">
        <MainGachaStats
          rarityStats={rarityStats}
          totalPulls={totalPulls}
          pickupShape={pickupShape}
          pickupRank={pickupRank}
          pityCount={pityCount}
          pickupGuarantee={pickupGuarantee}
          getSixStarRate={getSixStarRate}
          selectedBanner={selectedBanner}
          showDoublePick={showDoublePick}
          toggleDoublePick={toggleDoublePick}
          displayedBanners={displayedBanners}
          handleBannerChange={handleBannerChange}
          nickname={nickname}
          set6StarListOpen={set6StarListOpen}
        />
      </OffCanvas>

      {/* 🌟 오른쪽 패널 (6성 히스토리) */}
      <OffCanvas isOpen={isRightOpen} onClose={() => setIsRightOpen(false)} position="right">
        <MainSixStarHistory
          sixStarHistory={sixStarHistory}
          selectedBanner={selectedBanner}
          pickupCount={pickupCount}
          nonPickupCount={nonPickupCount}
          historyRef={historyRef}
        />
      </OffCanvas>

      {/* ===================================== */}
      {/* 왼쪽 패널: 통계 + 배너 선택 + 닉네임 */}
      {/* ===================================== */}
      <aside className="hidden lg:flex lg:w-[22%] lg:max-w-xs flex-shrink-0 h-full overflow-y-auto">
          <MainGachaStats
            rarityStats={rarityStats}
            totalPulls={totalPulls}
            pickupShape={pickupShape}
            pickupRank={pickupRank}
            pityCount={pityCount}
            pickupGuarantee={pickupGuarantee}
            getSixStarRate={getSixStarRate}
            selectedBanner={selectedBanner}
            showDoublePick={showDoublePick}
            toggleDoublePick={toggleDoublePick}
            displayedBanners={displayedBanners}
            handleBannerChange={handleBannerChange}
            nickname={nickname}
            set6StarListOpen={set6StarListOpen}
          />
      </aside>


      {/* ===================================== */}
      {/* 중앙: 뽑기 UI + 뽑기 결과 */}
      {/* ===================================== */}
      <main 
        className={`
          bg-white p-4 rounded-lg shadow flex-grow
          w-full lg:w-3/5 relative
          flex flex-col h-full
          overflow-hidden // 전체 스크롤 방지
          dark:bg-gray-900
          border dark:border-gray-700
        `}
      >
        {/* 🎯 헤더 (항상 고정) */}
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-black text-center sticky top-0 z-20 p-3 dark:text-gray-100">
          가챠 시뮬레이터
        </h1>

        {/* 🎯 뽑기 버튼 & 결과 (스크롤 가능 영역) */}
        <div className="flex flex-col items-center gap-5 overflow-y-auto flex-grow">
          {/* 뽑기 버튼 */}
          <div className="flex gap-4 lg:gap-6 items-center">
            <button onClick={() => handleGacha(1)} className="relative w-[140px] lg:w-[180px] h-[50px] lg:h-[60px]">
              <Image
                src="/infos/button/single_pull.png"
                alt="1회 뽑기"
                width={180}
                height={60}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              />
            </button>
            <button onClick={() => handleGacha(10)} className="relative w-[140px] lg:w-[180px] h-[50px] lg:h-[60px]">
              <Image
                src="/infos/button/ten_pull.png"
                alt="10회 뽑기"
                width={180}
                height={60}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              />
            </button>
            <button
              className="bg-red-500 text-white px-3 lg:px-6 h-[30px] lg:h-[40px] rounded-lg transition-transform hover:scale-105 active:scale-95 text-sm lg:text-md"
              onClick={resetAll}
            >
              리셋
            </button>
          </div>

          {/* 뽑기 결과 (스크롤 가능) */}
          <div className="overflow-y-auto flex-grow w-full">
            <GachaResults results={results} />
          </div>
        </div>
      </main>

      {/* ===================================== */}
      {/* 오른쪽: 6성 이력 */}
      {/* ===================================== */}
      <aside className="hidden lg:flex lg:w-[22%] lg:max-w-xs flex-shrink-0 h-full overflow-y-auto">
        <MainSixStarHistory
          sixStarHistory={sixStarHistory}
          selectedBanner={selectedBanner}
          pickupCount={pickupCount}
          nonPickupCount={nonPickupCount}
          historyRef={historyRef}
        />
      </aside>

      {/* 🟢 모바일 전용 Floating 버튼 (사이드바 열기) */}
      <button
        onClick={() => setIsLeftOpen(prev => !prev)}
        className="lg:hidden fixed left-4 bottom-4 w-16 h-16 bg-green-500 text-white text-4xl font-bold rounded-full shadow-xl flex items-center justify-center hover:bg-green-600 transition z-[9999]"
      >
        📊
      </button>

      <button
        onClick={() => setIsRightOpen(prev => !prev)}
        className="lg:hidden fixed right-4 bottom-4 w-16 h-16 bg-red-500 text-white text-4xl font-bold rounded-full shadow-xl flex items-center justify-center hover:bg-red-600 transition z-[9999]"
      >
        📒
      </button>

      {is6StarListOpen && (
        <BannerSixStarListModal
          isOpen={is6StarListOpen}
          onClose={() => set6StarListOpen(false)}
          banner={selectedBanner}
        />
      )}
    </div>
  );
}