"use client";

import { useState, useMemo, useEffect, useRef, useReducer } from "react";
import { gachaReducer, initialGachaState, SixStarHistoryEntry as ReducerSixStarHistoryEntry } from "@/lib/reducers/gachaReducer";
import Image from "next/image";
import { charactersByRarity, Character } from "@/data/characters";
import { banners, Banner } from "@/data/banners";
import { percentRankTable } from "@/data/percent_rank_table";
import GachaResults from "@/components/gacha_simulator/GachaResults";
import { OffCanvas } from "@/components/gacha_simulator/OffCanvas";
import MainGachaStats from "@/components/gacha_simulator/MainGachaStats";
import MainSixStarHistory from "@/components/gacha_simulator/MainSixStarHistory";
import { version, isIncludedInGachaPool } from "@/data/version";
import { toast, Toaster } from "react-hot-toast";

export const isValidGachaCharacterForPool = (char: Character): boolean => {
  if (char.exclude_gacha) return false;
  return isIncludedInGachaPool(char.version, char.immediate_standard);
};

// Export SixStarHistoryEntry type for external use
export type SixStarHistoryEntry = ReducerSixStarHistoryEntry;

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
  const currentVer = parseFloat(version);

  const resolveChar = (c: number | Character): Character =>
    typeof c === "number" ? findCharacterById(c) : c;

  const allPickup6 =
    banner.bannerType === "doublePick"
      ? (banner.twoPickup6 ?? [])
          .map(resolveChar)
          .filter((c) => !c.exclude_gacha && parseFloat(c.version) <= currentVer)
      : banner.pickup6
        ? [resolveChar(banner.pickup6)].filter((c) => parseFloat(c.version) <= currentVer)
        : [];

  const latestPickup6 = allPickup6.sort((a, b) => parseFloat(b.version) - parseFloat(a.version))[0];

  const resolvedPickup5 = (banner.pickup5 ?? [])
    .map(resolveChar)
    .filter((c) => !c.exclude_gacha && parseFloat(c.version) <= currentVer);

  const resolvedTwoPickup6 = (banner.twoPickup6 ?? [])
    .map(resolveChar)
    .filter((c) => !c.exclude_gacha && parseFloat(c.version) <= currentVer);

  return {
    ...banner,
    pickup6: latestPickup6,
    pickup5: resolvedPickup5,
    twoPickup6: resolvedTwoPickup6,
  };
};

export default function GachaGame() {
  const [selectedBanner, setSelectedBanner] = useState<EnrichedBanner>(
    enrichBanner(
      banners.find(
        (b) =>
          b.bannerType !== "doublePick" &&
          (!b.version || parseFloat(b.version) <= parseFloat(version))
      ) || banners[0]
    )
  );

  // 1) React 상태 - useReducer로 통합
  const [state, dispatch] = useReducer(gachaReducer, initialGachaState);
  const nickname = "Lyva";
  const [showDoublePick, setShowDoublePick] = useState(false); // 배너 타입 전환용 (별도 관리)
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.results.length < 1) return;

    // 🔹 가장 최근에 뽑힌 6성을 찾음 (배열을 역순으로 탐색)
    const lastSixStar = [...state.results].reverse().find((c) => c.rarity === 6);
    if (!lastSixStar) {
      if (!state.pickupShape) {
        // 아직 픽업 6성을 한 번도 못 뽑았음 => 항상 100% 표시
        dispatch({ type: "UPDATE_PICKUP_INFO", payload: { shape: null, rank: 100 } });
      }
      // pickupShape가 이미 있으면 => 이전 픽업 유지
      // (ex. 일전에 픽업 뽑았는데 지금은 6성 없는 상태)
      else {
        // totalPulls가 늘었을 경우, rank 재계산
        const rp = getShapeRankPercent(state.totalPulls, state.pickupShape);
        dispatch({ type: "UPDATE_PICKUP_INFO", payload: { shape: state.pickupShape, rank: rp ?? 100 } });
      }
      return;
    }

    // 🔹 이번 6성이 '픽업'인지 확인
    let isPickup = false;
    if (selectedBanner.bannerType === "doublePick" && selectedBanner.twoPickup6) {
      isPickup = selectedBanner.twoPickup6.some((pc) => pc.engName === lastSixStar.engName);
    } else {
      isPickup = selectedBanner.pickup6?.engName === lastSixStar.engName;
    }

    if (!isPickup) {
      // 6성 있는데 픽뚫 => 이전 pickupShape가 있으면 rank만 재계산
      if (state.pickupShape) {
        const rp = getShapeRankPercent(state.totalPulls, state.pickupShape);
        dispatch({ type: "UPDATE_PICKUP_INFO", payload: { shape: state.pickupShape, rank: rp ?? 100 } });
      } else {
        // 여전히 한 번도 픽업 6성 못 뽑은 상태 => 상위 100%
        dispatch({ type: "UPDATE_PICKUP_INFO", payload: { shape: null, rank: 100 } });
      }
      return;
    }

    // 🔹 형상 계산 => sixStarHistory 중 해당 engName 몇번 나왔는지
    const sameCount = state.sixStarHistory.filter((h) => h.char.engName === lastSixStar.engName).length;
    const shapeStr = getShapeString(sameCount - 1);

    // 🔹 상위 % 계산
    const rp = getShapeRankPercent(state.totalPulls, shapeStr);

    // 🔹 상태 업데이트 (즉시 UI 반영)
    dispatch({ type: "UPDATE_PICKUP_INFO", payload: { shape: shapeStr, rank: rp ?? null } });
  }, [state.results, state.sixStarHistory, state.totalPulls, selectedBanner, state.pickupShape]);

  useEffect(() => {
    historyRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [state.sixStarHistory]);

  const displayedBanners = useMemo(() => {
    return banners.filter(
      (b) =>
        (showDoublePick ? b.bannerType === "doublePick" : b.bannerType !== "doublePick") &&
        (!b.version || parseFloat(b.version) <= parseFloat(version))
    );
  }, [showDoublePick]);

  // 🔸 픽업 vs 일반 6성 횟수 계산
  const { pickupCount, nonPickupCount } = useMemo(() => {
    let pickup = 0;
    let nonPickup = 0;

    state.sixStarHistory.forEach((entry) => {
      if (selectedBanner.bannerType === "doublePick" && selectedBanner.twoPickup6) {
        if (selectedBanner.twoPickup6.some((c) => c.engName === entry.char.engName)) {
          pickup++;
        } else {
          nonPickup++;
        }
      } else {
        if (selectedBanner.pickup6 && entry.char.engName === selectedBanner.pickup6.engName) {
          pickup++;
        } else {
          nonPickup++;
        }
      }
    });

    return { pickupCount: pickup, nonPickupCount: nonPickup };
  }, [state.sixStarHistory, selectedBanner]);

  // 2) 6성 확률 계산
  const getSixStarRate = (localPity: number) => {
    if (localPity < 60) return 1.5;
    return Math.min(4 + (localPity - 60) * 2.5, 100);
  };

  // 3) 유틸: 배열 랜덤
  const getRandomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // 4) 6성 기록
  const recordSixStar = (char: Character, pullIndex: number) => {
    dispatch({ type: "ADD_SIX_STAR_HISTORY", payload: { char, pullNumber: state.totalPulls + pullIndex + 1 } });
    toast.success(`🎉 ${state.totalPulls + pullIndex + 1}번째 토끼로 🏆${char.name}🏆 획득!`);
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
          forcedSix = getRandomFrom(charactersByRarity[6].filter(isValidGachaCharacterForPool));
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
        2: 5,
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
              picked = getRandomFrom(charactersByRarity[6].filter(isValidGachaCharacterForPool));
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
              : getRandomFrom(charactersByRarity[5].filter(isValidGachaCharacterForPool));
          } else {
            // 픽업 5성이 없으면 일반 5성에서만 가져옴
            c = getRandomFrom(charactersByRarity[5].filter(isValidGachaCharacterForPool));
          }
          return [c, localPity + 1, localPickup];
        }

        // 4성 이하
        const c = getRandomFrom(charactersByRarity[rarity].filter(isValidGachaCharacterForPool));
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
    const isAprilFools = state.totalPulls < 401 && state.totalPulls + times >= 401;
    let localPity = state.pityCount;
    let localPickup = state.pickupGuarantee;

    const newResults: Character[] = [];
    const newStats = { ...state.rarityStats };

    for (let i = 0; i < times; i++) {
      let char: Character | null = null;

      // ───────────── 첫 뽑기 로직 ─────────────
      // (만약 첫 뽑기를 5성 확정 등으로 처리하고 싶다면 이 부분에서 로직 구현)
      if (state.isFirstPull && i === 0) {
        // 예: 첫 뽑기는 5성 확정 (픽업 5성 or 일반 5성)
        char = getRandomFrom([
          ...(selectedBanner.pickup5 ?? []),
          ...charactersByRarity[5].filter(isValidGachaCharacterForPool),
        ]);
        // 6성 아니므로 pity 1 증가
        localPity += 1;
        dispatch({ type: "SET_FIRST_PULL", payload: false });
      }
      // ───────────────────────────────
      else {
        // ────── 2중 픽업 배너일 경우 ──────
        if (selectedBanner.bannerType === "doublePick") {
          // 2중 픽업용 doSinglePullDoublePick은
          // [획득캐릭터, 새 localPity, 새 localPickup]을 반환
          const [pickedChar, newPity, newPickup] = doSinglePullDoublePick(
            i, // pullIndex
            localPity, // 현재 pity
            localPickup // 픽업 보장 여부
          );
          char = pickedChar;
          localPity = newPity;
          localPickup = newPickup;
        }
        // ────── 일반 픽업 배너일 경우 ──────
        else {
          const [pulledChar, newPity, newPickup] = doSinglePull(i, localPity, localPickup);
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
    dispatch({
      type: "GACHA_PULL",
      payload: {
        newResults,
        times,
        newPity: localPity,
        newPickupGuarantee: localPickup,
        newStats,
      },
    });

    // 401번째 뽑기 이스터에그
    if (isAprilFools) {
      setTimeout(() => {
        toast(
          (t) => (
            <div
              onClick={() => toast.dismiss(t.id)}
              className="cursor-pointer space-y-1"
            >
              <p className="font-semibold">401번째... 뭔가 이상한 느낌이 든다.</p>
              <p className="text-sm">거울하면 떠오르는 마도학자의 첫번째 글자는?</p>
              <p className="text-xs opacity-60">탭하면 닫힙니다</p>
            </div>
          ),
          { duration: 8000 }
        );
      }, 400);
    }
  };

  /**
   * 7) 전체 리셋
   */
  const resetAll = () => {
    dispatch({ type: "RESET_ALL" });
  };

  /**
   * 8) 배너 변경 시 전체 초기화
   */
  const handleBannerChange = (bannerId: string) => {
    resetAll(); // ✅ 배너 변경 시 모든 상태 초기화

    const newBanner = banners.find((b) => b.id === bannerId) || banners[0];

    setSelectedBanner(
      enrichBanner({
        ...newBanner,
        pickup5: newBanner.pickup5 ?? [],
      })
    );
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
      const prob =
        {
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
          const c = getRandomFrom(charactersByRarity[5].filter(isValidGachaCharacterForPool));
          return [c, localPity + 1, localPickup];
        }

        // 4성 이하
        const c = getRandomFrom(charactersByRarity[rarity].filter(isValidGachaCharacterForPool));
        return [c, localPity + 1, localPickup];
      }
    }

    // 여기 오면 2성
    return [charactersByRarity[2][0], localPity + 1, localPickup];
  }

  function getDoublePickSix(localPickup: boolean, pullIndex: number): Character {
    if (!selectedBanner.twoPickup6) {
      // fallback (데이터 없으면 그냥 전체 6성 중 랜덤)
      const fallback = getRandomFrom(charactersByRarity[6].filter(isValidGachaCharacterForPool));
      recordSixStar(fallback, pullIndex);
      return fallback;
    }

    const [pickupA, pickupB] = selectedBanner.twoPickup6;
    // 나머지 6성
    const other6stars = charactersByRarity[6].filter(
      (c) =>
        c.engName !== pickupA.engName &&
        c.engName !== pickupB.engName &&
        isValidGachaCharacterForPool(c)
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
    return selectedBanner.twoPickup6.some((p) => p.engName === char.engName);
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

      const validBanners = banners
        .filter((b) =>
          newShowDoublePick ? b.bannerType === "doublePick" : b.bannerType !== "doublePick"
        )
        .map(enrichBanner)
        .filter((b) => b.pickup6 || (b.twoPickup6 && b.twoPickup6.length > 0));

      const nextBanner = validBanners[0] || enrichBanner(banners[0]);

      setSelectedBanner(nextBanner);
      resetAll();
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
      className={`/* 다크 모드 시 배경/글자색 */ relative mx-auto flex h-screen w-full max-w-screen-2xl flex-col items-start gap-2 bg-gray-100 p-2 text-black dark:bg-gray-900 dark:text-gray-100 lg:flex-row lg:gap-4 lg:p-6`}
    >
      {/* 🌟 왼쪽 패널 (통계) */}
      <OffCanvas isOpen={state.isLeftOpen} onClose={() => dispatch({ type: "TOGGLE_LEFT_SIDEBAR" })} position="left">
        <MainGachaStats
          rarityStats={state.rarityStats}
          totalPulls={state.totalPulls}
          pickupShape={state.pickupShape}
          pickupRank={state.pickupRank}
          pityCount={state.pityCount}
          pickupGuarantee={state.pickupGuarantee}
          getSixStarRate={getSixStarRate}
          selectedBanner={selectedBanner}
          showDoublePick={showDoublePick}
          toggleDoublePick={toggleDoublePick}
          displayedBanners={displayedBanners}
          handleBannerChange={handleBannerChange}
          nickname={nickname}
        />
      </OffCanvas>

      {/* 🌟 오른쪽 패널 (6성 히스토리) */}
      <OffCanvas isOpen={state.isRightOpen} onClose={() => dispatch({ type: "TOGGLE_RIGHT_SIDEBAR" })} position="right">
        <MainSixStarHistory
          sixStarHistory={state.sixStarHistory}
          selectedBanner={selectedBanner}
          pickupCount={pickupCount}
          nonPickupCount={nonPickupCount}
          historyRef={historyRef}
        />
      </OffCanvas>

      {/* ===================================== */}
      {/* 왼쪽 패널: 통계 + 배너 선택 + 닉네임 */}
      {/* ===================================== */}
      <aside className="hidden h-full flex-shrink-0 overflow-y-auto lg:flex lg:w-[22%] lg:max-w-xs">
        <MainGachaStats
          rarityStats={state.rarityStats}
          totalPulls={state.totalPulls}
          pickupShape={state.pickupShape}
          pickupRank={state.pickupRank}
          pityCount={state.pityCount}
          pickupGuarantee={state.pickupGuarantee}
          getSixStarRate={getSixStarRate}
          selectedBanner={selectedBanner}
          showDoublePick={showDoublePick}
          toggleDoublePick={toggleDoublePick}
          displayedBanners={displayedBanners}
          handleBannerChange={handleBannerChange}
          nickname={nickname}
        />
      </aside>

      {/* ===================================== */}
      {/* 중앙: 뽑기 UI + 뽑기 결과 */}
      {/* ===================================== */}
      <main
        className={`// 전체 스크롤 방지 relative flex h-full w-full flex-grow flex-col overflow-hidden rounded-lg border bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-900 lg:w-3/5`}
      >
        {/* 🎯 헤더 (항상 고정) */}
        <h1 className="sticky top-0 z-20 mb-4 p-3 text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
          가챠 시뮬레이터
        </h1>

        {/* 🎯 뽑기 버튼 & 결과 (스크롤 가능 영역) */}
        <div className="flex flex-grow flex-col items-center gap-5 overflow-y-auto">
          {/* 뽑기 버튼 */}
          <div className="flex items-center gap-2 lg:gap-6">
            <button
              onClick={() => handleGacha(1)}
              className="relative h-[50px] w-[140px] lg:h-[60px] lg:w-[180px]"
            >
              <Image
                src="/infos/button/single_pull.webp"
                alt="1회 뽑기"
                width={180}
                height={60}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              />
            </button>
            <button
              onClick={() => handleGacha(10)}
              className="relative h-[50px] w-[140px] lg:h-[60px] lg:w-[180px]"
            >
              <Image
                src="/infos/button/ten_pull.webp"
                alt="10회 뽑기"
                width={180}
                height={60}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              />
            </button>
            <button
              className="h-[30px] rounded-lg bg-red-500 px-1 text-xs text-white transition-transform hover:scale-105 active:scale-95 lg:h-[40px] lg:px-6 lg:text-sm"
              onClick={resetAll}
            >
              리셋
            </button>
          </div>

          {/* 뽑기 결과 (스크롤 가능) */}
          <div className="w-full flex-grow overflow-y-auto">
            <GachaResults results={state.results} />
          </div>
        </div>
      </main>

      {/* ===================================== */}
      {/* 오른쪽: 6성 이력 */}
      {/* ===================================== */}
      <aside className="hidden h-full flex-shrink-0 overflow-y-auto lg:flex lg:w-[22%] lg:max-w-xs">
        <MainSixStarHistory
          sixStarHistory={state.sixStarHistory}
          selectedBanner={selectedBanner}
          pickupCount={pickupCount}
          nonPickupCount={nonPickupCount}
          historyRef={historyRef}
        />
      </aside>

      {/* 🟢 모바일 전용 Floating 버튼 (사이드바 열기) */}
      <button
        onClick={() => dispatch({ type: "TOGGLE_LEFT_SIDEBAR" })}
        className="fixed bottom-4 left-4 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-4xl font-bold text-white shadow-xl transition hover:bg-green-600 lg:hidden"
      >
        📊
      </button>

      <button
        onClick={() => dispatch({ type: "TOGGLE_RIGHT_SIDEBAR" })}
        className="fixed bottom-4 right-4 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-4xl font-bold text-white shadow-xl transition hover:bg-red-600 lg:hidden"
      >
        📒
      </button>
      <Toaster position="bottom-center" />
    </div>
  );
}
