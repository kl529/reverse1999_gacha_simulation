"use client";

import { useState } from "react";
import Image from "next/image";
import UpdatePopup from "@/components/UpdatePopup";
import { charactersByRarity, Character } from "@/data/characters";
import { banners, Banner } from "@/data/banners";
import GachaResults from "@/components/GachaResults";

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
    if (localPity >= 70) {
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
          const isPickup = Math.random() < 0.5;
          const c = isPickup
            ? getRandomFrom(selectedBanner.pickup5)
            : getRandomFrom(charactersByRarity[5]);
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

    const newResults: Character[] = [];
    const newStats = { ...rarityStats };

    for (let i = 0; i < times; i++) {
      const [char, newPity, newPickup] = doSinglePull(i, localPity, localPickup);
      newResults.push(char);
      newStats[char.rarity] += 1;

      localPity = newPity;
      localPickup = newPickup;
    }

    // 반복이 모두 끝난 후, React 상태로 세팅
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
  };

  /**
   * 8) 배너 변경 시 전체 초기화
   */
  const handleBannerChange = (bannerId: string) => {
    resetAll();
    const newBanner = banners.find((b) => b.id === bannerId);
    setSelectedBanner(newBanner ?? banners[0]);
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="w-full max-w-screen-2xl mx-auto flex flex-row items-start p-6 bg-gray-100 h-screen overflow-hidden">
      
      {/* 🎯 왼쪽 패널: 통계 + 배너 선택 */}
      <aside className="w-1/5 flex flex-col gap-6 mr-6">
        {/* 🎯 (1) 뽑기 확률 통계 박스 */}
        <div className="p-4 bg-white shadow rounded-lg border border-green-300 outline outline-2 outline-green-400">
          <h2 className="text-xl font-semibold mb-2">뽑기 확률 통계</h2>
          <ul className="list-disc ml-4 mt-2">
            {Object.entries(rarityStats).map(([rarity, count]) => (
              <li key={rarity} className="text-gray-800">{rarity}성: {count}회</li>
            ))}
          </ul>
          <p className="text-lg text-gray-600 mt-4">총 뽑기 횟수: <span className="font-bold text-blue-600">{totalPulls}회</span></p>
          <p className="mt-4 text-red-500">현재 천장 카운트: {pityCount}회</p>
          <p className="text-blue-600">6성 확률: {getSixStarRate(pityCount).toFixed(2)}%</p>
          <p className={`text-lg font-bold mt-2 ${pickupGuarantee ? "text-green-500" : "text-gray-500"}`}>
            {pickupGuarantee ? "다음 6성은 픽업 확정!" : "픽업 보장 없음"}
          </p>
        </div>

        {/* 🎯 (2) 배너 선택 박스 */}
        <div className="p-4 bg-gray-50 shadow rounded-lg border border-blue-400 outline outline-2 outline-blue-600">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            배너 선택 🎴
          </label>

          <img
            src={`/infos/banner_img/${selectedBanner.id}.png`}
            alt="배너 이미지"
            className="w-full h-auto object-contain pb-3"
          />
          <select
            value={selectedBanner.id}
            onChange={(e) => handleBannerChange(e.target.value)}
            className="w-full h-12 text-lg border border-gray-400 rounded-lg p-2 shadow-md cursor-pointer transition-transform hover:scale-105"
          >
            {banners.map((banner) => (
              <option key={banner.id} value={banner.id}>
                {banner.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🎯 (3) 닉네임 표시 */}
        <div className="p-4 bg-white shadow rounded-lg border border-gray-300 text-center flex-row outline outline-2 outline-gray-600">
          <div className="flex items-center pb-2">
            <h3 className="text-lg font-semibold text-gray-700">개발자 : </h3>
            <p className="text-xl font-bold text-blue-600 pl-1"> {nickname}</p>
          </div>
          <button
            onClick={() => setPopupOpen(true)}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            업데이트 내역 보기
          </button>
          <button onClick={() => window.open("https://github.com/kl529/reverse1999_gacha_simulation", "_blank")} className="pt-2">
            <Image
              src="/infos/button/github.png" 
              alt="github"
              width={30} 
              height={10} 
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95" 
            />
          </button>
        </div>
      </aside>

      {/* 🎯 중앙: 뽑기 UI */}
      <main className="w-3/5 flex flex-col items-center bg-white p-6 rounded-lg shadow-lg min-h-[700px] h-full flex-grow">
        <h1 className="text-3xl font-bold mb-4">Reverse:1999 가챠 시뮬레이터</h1>

        {/* 🎯 뽑기 버튼 (크기 키우기) */}
        <div className="flex gap-6 mb-5">
          <button onClick={() => handleGacha(1)} className="relative w-[180px] h-[60px]">
            <Image
              src="/infos/button/single_pull.png" 
              alt="1회 뽑기"
              width={180} 
              height={60} 
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95" 
            />
          </button>
          <button onClick={() => handleGacha(10)} className="relative w-[180px] h-[60px]">
            <Image
              src="/infos/button/ten_pull.png" 
              alt="10회 뽑기"
              width={180} 
              height={60} 
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95" 
            />
          </button>
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-lg transition-transform hover:scale-105 active:scale-95 text-m"
            onClick={resetAll}
          >
            초기화 🌧️
          </button>
        </div>

        {/* 뽑기 결과 */}
        <GachaResults results={results} />
      </main>

      {/* 🎯 오른쪽: 6성 이력 (스크롤 가능) */}
      <aside className="w-1/5 p-4 bg-white shadow ml-6 max-h-[500px] h-full flex flex-col rounded-lg border-red-300 outline outline-2 outline-red-400">
        <h2 className="text-xl font-semibold mb-2 sticky top-0 bg-white z-10 p-2 border-b">
          획득한 6성
        </h2>
        <div className="flex flex-col-reverse gap-2 overflow-y-auto">
          {sixStarHistory.reduce((acc: { [key: string]: number }, entry) => {
            acc[entry.char.name] = (acc[entry.char.name] || 0) + 1;
            return acc;
          }, {} as { [key: string]: number }) && sixStarHistory.map((entry, idx) => {
            const count = sixStarHistory.filter(e => e.char.name === entry.char.name).length;
            const suffix = count === 1 ? '명함' : `${Math.min(count - 1, 5)}형`;
            return (
              <div key={idx} className="flex items-center gap-2 p-2 border rounded">
                <img
                  src={`/characters/6stars_small/${entry.char.engName}.png`}
                  alt={entry.char.name}
                  className="w-14 h-14 object-cover"
                />
                <p className="text-base font-semibold">
                  {entry.char.name} (#{entry.pullNumber}) ({suffix})
                </p>
              </div>
            );
          })}
        </div>
      </aside>

      <UpdatePopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}