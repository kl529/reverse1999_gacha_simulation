"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import UpdatePopup from "@/components/UpdatePopup";
import { BannerSixStarModal } from "@/components/BannerSixStarModal";
import { charactersByRarity, Character } from "@/data/characters";
import { banners, Banner } from "@/data/banners";
import GachaResults from "@/components/GachaResults";
import { motion } from "framer-motion";

interface SixStarHistoryEntry {
  char: Character;
  pullNumber: number;
}

export default function GachaGame() {
  // 1) React 상태
  const [results, setResults] = useState<Character[]>([]);
  const [totalPulls, setTotalPulls] = useState<number>(0);
  const [rarityStats, setRarityStats] = useState<{ [key: number]: number }>({2: 0, 3: 0, 4: 0, 5: 0, 6: 0});
  const [selectedBanner, setSelectedBanner] = useState<Banner>(banners[0]);
  const [pityCount, setPityCount] = useState<number>(0);
  const [pickupGuarantee, setPickupGuarantee] = useState<boolean>(false);
  const [sixStarHistory, setSixStarHistory] = useState<SixStarHistoryEntry[]>([]);
  // 🎯 닉네임
  const nickname = "Lyva (#706668372)";
  // 🎯 팝업 상태
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [isFirstPull, setIsFirstPull] = useState(true); // 첫 뽑기인지 확인하는 상태
  const [is6StarListOpen, set6StarListOpen] = useState(false); // 6성 목록 팝업 상태
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 한 번만 화면폭 체크
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      // 기준: 768px(= md). 필요하면 원하는 px로 수정
      if (w > 768) {
        setLeftOpen(true);
        setRightOpen(true);
      } else {
        setLeftOpen(false);
        setRightOpen(false);
      }
    }
  }, []);

  useEffect(() => {
    historyRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [sixStarHistory]);

  const leftAsideVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };
  
  const rightAsideVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: "0%", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };
  

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

    // 70뽑 초과 -> 즉시 6성 + 픽업 50%
    if (localPity + 1 >= 70) {
      let forcedSix: Character;
      if (localPickup) {
        forcedSix = selectedBanner.pickup6;
        localPickup = false;
      } else {
        const isPickup = Math.random() < 0.5;
        if (isPickup) {
          forcedSix = selectedBanner.pickup6;
        } else {
          forcedSix = getRandomFrom(charactersByRarity[6]);
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
            picked = selectedBanner.pickup6;
            localPickup = false;
          } else {
            const isPickup = Math.random() < 0.5;
            if (isPickup) {
              picked = selectedBanner.pickup6;
            } else {
              picked = getRandomFrom(charactersByRarity[6]);
              localPickup = true;
            }
          }
          recordSixStar(picked, pullIndex);
          return [picked, 0, localPickup];
        }

        // 5성
        if (rarity === 5) {
          let c;
          if (selectedBanner.pickup5.length > 0) {
            const isPickup = Math.random() < 0.5;
            c = isPickup
              ? getRandomFrom(selectedBanner.pickup5)
              : getRandomFrom(charactersByRarity[5]);
          } else {
            // 픽업 5성이 없으면 일반 5성에서만 가져옴
            c = getRandomFrom(charactersByRarity[5]);
          }
          return [c, localPity + 1, localPickup];
        }

        // 4성 이하
        const c = getRandomFrom(charactersByRarity[rarity]);
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

    let newResults: Character[] = [];
    let newStats = { ...rarityStats };

    for (let i = 0; i < times; i++) {
      let char: Character | null = null;
  
      if (isFirstPull && i === 0) {
        char = getRandomFrom([...selectedBanner.pickup5, ...charactersByRarity[5]]);
  
        setIsFirstPull(false);
      } else {
        const [pulledChar, newPity, newPickup] = doSinglePull(i, localPity, localPickup);
        char = pulledChar;
        localPity = newPity;
        localPickup = newPickup;
      }

      newResults.push(char);
      newStats[char.rarity] += 1;
    }

    setResults(newResults);
    setTotalPulls(prev => prev + times);
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
  };

  /**
   * 8) 배너 변경 시 전체 초기화
   */
  const handleBannerChange = (bannerId: string) => {
    resetAll();
    setIsFirstPull(true); // 배너 변경 후 첫 뽑기에서도 5성 확정
    const newBanner = banners.find((b) => b.id === bannerId);
    setSelectedBanner(newBanner ?? banners[0]);
  };

  // 🔸 픽업 vs 일반 6성 횟수 계산
  const { pickupCount, nonPickupCount } = useMemo(() => {
    let pickup = 0;
    let nonPickup = 0;
  
    sixStarHistory.forEach((entry) => {
      if (entry.char.engName === selectedBanner.pickup6.engName) {
        pickup++;
      } else {
        nonPickup++;
      }
    });
  
    return { pickupCount: pickup, nonPickupCount: nonPickup };
  }, [sixStarHistory, selectedBanner]);

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
        p-2 md:p-6 
        flex 
        flex-col md:flex-row 
        items-start 
        gap-2 md:gap-4 
        relative
      `}
    >
      <div className="md:hidden flex justify-between w-full mb-2">
        <button
          onClick={() => setLeftOpen(prev => !prev)}
          className="bg-green-500 text-white px-3 py-2 rounded"
        >
          {leftOpen ? "통계 접기" : "통계 펼치기"}
        </button>
        <button
          onClick={() => setRightOpen(prev => !prev)}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          {rightOpen ? "6성목록 접기" : "6성목록 펼치기"}
        </button>
      </div>

      {/* ===================================== */}
      {/* 왼쪽 패널: 통계 + 배너 선택 + 닉네임 */}
      {/* ===================================== */}
      <motion.aside 
        variants={leftAsideVariants}
        initial="hidden"
        animate={leftOpen ? "visible" : "hidden"}
        exit="exit"
        className={`
          bg-white shadow rounded-lg p-4 border
          md:w-1/5 md:block
          variants={leftAsideVariants}
          initial="hidden"
          animate={leftOpen ? "visible" : "hidden"}
          exit="exit"
          ${leftOpen ? "block" : "hidden"}
          md:static
          fixed md:static 
          top-0 left-0 w-[80%] md:w-1/5 h-full z-40 
          overflow-y-auto max-h-screen
          absolute top-12 right-0
        `}
      >
        {/* (1) 뽑기 확률 통계 박스 */}
        <div className="p-4 bg-white shadow rounded-lg border border-green-300 outline outline-2 outline-green-400 mb-5">
          <h2 className="text-xl font-semibold mb-2 text-black-700">
            🔍 뽑기 통계
          </h2>
          <ul className="list-disc ml-4 mt-2 text-sm md:text-base">
            {Object.entries(rarityStats).map(([rarity, count]) => (
              <li key={rarity} className="text-gray-800">
                {rarity}성: {count}회
              </li>
            ))}
          </ul>
          <p className="mt-3 text-gray-700">
            총 뽑기 횟수: <span className="font-bold text-blue-600">{totalPulls}회</span>
          </p>
          <p className="mt-1 text-red-500">현재 천장 카운트: {pityCount}회</p>
          <p className="text-blue-600">6성 확률: {getSixStarRate(pityCount).toFixed(2)}%</p>
          <p className={`text-sm md:text-lg font-bold mt-2 ${pickupGuarantee ? "text-green-500" : "text-gray-500"}`}>
            {pickupGuarantee ? "다음 6성은 픽업 확정!" : "픽업 보장 없음"}
          </p>
        </div>

        {/* (2) 배너 선택 박스 */}
        <div className="p-4 bg-gray-50 shadow rounded-lg border border-blue-400 outline outline-2 outline-blue-600 mb-5">
          <h2 className="block text-base text-xl font-semibold text-black-700 mb-2">
            🌪️ 배너 선택
          </h2>
          <Image
            src={`/infos/banner_img/${selectedBanner.id}.png`}
            alt="배너 이미지"
            width={400}
            height={200}
            layout="intrinsic"
            className="w-full h-auto object-contain pb-3"
          />
          <select
            value={selectedBanner.id}
            onChange={(e) => handleBannerChange(e.target.value)}
            className="w-full h-10 md:h-12 text-sm md:text-lg border border-gray-400 rounded-lg p-2 shadow-md cursor-pointer transition-transform hover:scale-105"
          >
            {banners.map((banner) => (
              <option key={banner.id} value={banner.id} className="text-black">
                {banner.name}
              </option>
            ))}
          </select>

          {/* 획득 가능 6성 목록 버튼 추가 */}
          <button
            onClick={() => set6StarListOpen(true)}
            className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 active:scale-95 text-sm md:text-base"
          >
            획득 가능 6성 목록
          </button>
        </div>

        {/* (3) 닉네임 + 업데이트 내역 */}
        <div className="p-4 bg-white shadow rounded-lg border border-gray-300 text-center outline outline-2 outline-gray-600">
          <div className="flex flex-col items-center pb-2">
            <h2 className="text-base md:text-l font-semibold text-gray-700">
              🖥️ 개발자 : <span className="text-blue-500 font-bold">{nickname}</span>
            </h2>
          </div>
          <button
            onClick={() => setPopupOpen(true)}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm md:text-base"
          >
            업데이트 내역 보기
          </button>
          <button
            onClick={() => window.open("https://github.com/kl529/reverse1999_gacha_simulation", "_blank")}
            className="pt-2"
          >
            <Image
              src="/infos/button/github.png"
              alt="github"
              width={30}
              height={10}
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            />
          </button>
        </div>
      </motion.aside>

      {/* ===================================== */}
      {/* 중앙: 뽑기 UI + 뽑기 결과 */}
      {/* ===================================== */}
      <main 
        className={`
          bg-white p-4 rounded-lg shadow flex-grow
          w-full md:w-3/5 relative
          flex flex-col h-full
          overflow-hidden // 전체 스크롤 방지
        `}
      >
        {/* 🎯 헤더 (항상 고정) */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-black text-center sticky top-0 bg-white z-20 p-3 shadow-md">
          Reverse:1999 가챠 시뮬레이터
        </h1>

        {/* 🎯 뽑기 버튼 & 결과 (스크롤 가능 영역) */}
        <div className="flex flex-col items-center gap-5 overflow-y-auto flex-grow">
          {/* 뽑기 버튼 */}
          <div className="flex gap-4 md:gap-6 items-center">
            <button onClick={() => handleGacha(1)} className="relative w-[140px] md:w-[180px] h-[50px] md:h-[60px]">
              <Image
                src="/infos/button/single_pull.png"
                alt="1회 뽑기"
                width={180}
                height={60}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              />
            </button>
            <button onClick={() => handleGacha(10)} className="relative w-[140px] md:w-[180px] h-[50px] md:h-[60px]">
              <Image
                src="/infos/button/ten_pull.png"
                alt="10회 뽑기"
                width={180}
                height={60}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              />
            </button>
            <button
              className="bg-red-500 text-white px-3 md:px-6 h-[30px] md:h-[40px] rounded-lg transition-transform hover:scale-105 active:scale-95 text-sm md:text-md"
              onClick={resetAll}
            >
              초기화
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
      <motion.aside 
        variants={rightAsideVariants}
        initial="hidden"
        animate={rightOpen ? "visible" : "hidden"}
        className={`
          bg-white shadow rounded-lg p-4 border
          md:w-1/5 md:block
          variants={rightAsideVariants}
          initial="hidden"
          animate={rightOpen ? "visible" : "hidden"}
          exit="exit"
          ${rightOpen ? "block" : "hidden"}
          md:static
          fixed md:static 
          top-0 right-0 w-[80%] md:w-1/5 h-full z-40 
          overflow-y-auto max-h-screen
          absolute top-12 right-0
        `}
      >
        <h2 className="text-lg md:text-xl font-semibold mb-2 sticky top-0 bg-white z-10 p-2 border-b text-black">
          💡 획득한 6성
        </h2>

        {/* 픽업 vs 일반 6성 횟수 */}
        <div className="sticky top-[48px] bg-gray-100 z-10 p-2 border-b text-gray-700 flex justify-between text-xs md:text-sm font-semibold rounded-lg mb-2">
          <p className="text-green-600">픽업: {pickupCount}회</p>
          <p className="text-red-500">픽뚫: {nonPickupCount}회</p>
        </div>

        <div 
          ref={historyRef} 
          className="flex flex-col-reverse gap-2 overflow-y-auto flex-grow"
        >
          {sixStarHistory.map((entry, idx) => {
            const isPickup = entry.char.name === selectedBanner.pickup6.name;
            const borderColor = isPickup ? "border-green-500" : "border-red-500";
            const labelText = isPickup ? "픽업!" : "픽뚫";

            // 현재까지 등장한 같은 캐릭터 개수 확인
            const sameCharCount = sixStarHistory
              .slice(idx + 1) // 현재 entry 이후의 요소들만 확인
              .filter(e => e.char.name === entry.char.name).length;

            // 등장 순서에 따라 suffix 부여 (처음 나온 캐릭터는 "명함", 이후 "1형", "2형" ...)
            const suffix = sameCharCount === 0 ? '명함' : `${Math.min(sameCharCount, 5)}형`;

            return (
              <div key={`${entry.char.engName}-${entry.pullNumber}`} className={`relative flex items-center gap-2 p-2 border-2 rounded ${borderColor}`}>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded shadow text-black">
                  {labelText} ({suffix})
                </span>
                <Image
                  src={`/characters/6stars_small/${entry.char.engName}.png`}
                  alt={entry.char.name}
                  width={56}
                  height={56}
                  layout="intrinsic"
                  className="w-14 h-14 object-cover"
                />
                <p className="text-xs md:text-base font-semibold whitespace-nowrap text-black">
                  {entry.char.name} (#{entry.pullNumber})
                </p>
              </div>
            );
          })}
        </div>
      </motion.aside>

      {/* 업데이트 팝업 */}
      <UpdatePopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
      {is6StarListOpen && (
        <BannerSixStarModal
          isOpen={is6StarListOpen}
          onClose={() => set6StarListOpen(false)}
          banner={selectedBanner}
        />
      )}
    </div>
  );
}