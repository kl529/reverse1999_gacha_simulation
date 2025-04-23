"use client";

import { useEffect, useState } from "react";
import { QUIZ_CHARACTERS } from "@/data/quiz_character";
import { Character } from "@/data/characters";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { toast, Toaster } from "react-hot-toast";
import { useDarkMode } from "@/components/etc/DarkModeContext";
import "animate.css";
import Image from "next/image";

// rarity, inspiration, version 상수
const RARITY = ["ALL", "6성", "5성", "4성", "3성", "2성"];
const INSPIRATIONS = ["ALL", "plant", "star", "spirit", "beast", "mineral", "intellect"];
const VERSIONS = [
  "ALL", "1.0", "1.1", "1.2", "1.3", "1.4", "1.5",
  "1.6", "1.7", "1.8", "1.9", "2.0", "2.1", "2.2",
  "2.3", "2.4",
];

export default function CharacterQuiz() {
  // (A) 캐릭터 목록 (셔플 가능)
  const [characters, setCharacters] = useState<Character[]>(QUIZ_CHARACTERS.filter((ch) => ch.is_future !== true));

  // (B) 열림 상태 (Set)
  const [openedSet, setOpenedSet] = useState<Set<number>>(new Set());

  // (C) 사용자 입력
  const [inputValue, setInputValue] = useState("");

  // (D) 필터 상태
  const [rarityFilter, setRarityFilter] = useState<string>("ALL");
  const [inspirationFilter, setInspirationFilter] = useState<string>("ALL");
  const [versionFilter, setVersionFilter] = useState<string>("ALL");

  // (E) 시간 측정
  const [startTime, setStartTime] = useState<number | null>(null);
  const [clearTime, setClearTime] = useState<number | null>(null);

  // (F) 모달 상태
  const [showResetModal, setShowResetModal] = useState(false); // 초기화 확인 모달
  const [showHelpModal, setShowHelpModal] = useState(false);   // 도움말 모달
  const [showFinalModal, setShowFinalModal] = useState(false); // 마지막 결과 모달

	const [giveUpMatched, setGiveUpMatched] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showHint, setShowHint] = useState(false);

	// 버튼 상태: "normal" | "wrong" | "correct"
	const [btnState, setBtnState] = useState<"normal"|"wrong"|"correct">("normal");

  // (G) 최종 결과(포기 or 전부 맞춤) 여부
  const [isGiveUp, setIsGiveUp] = useState(false);
  const [isHardMode, setIsHardMode] = useState(false);
  const [showHardModeModal, setShowHardModeModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasSeenHelpModal");
    if (!hasVisited) {
      setShowHelpModal(true);
      localStorage.setItem("hasSeenHelpModal", "true");
    }
  }, []);

  // 입력 onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 엔터키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.nativeEvent.isComposing) {
			handleCheck();
		}
  };

	const [elapsedTime, setElapsedTime] = useState<number>(0);
  const { darkMode } = useDarkMode();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  let difficulty = "Normal";
  let difficultyStyle = "bg-blue-100 text-blue-800";

  if (isHardMode) {
    difficulty = "Hard";
    difficultyStyle = "bg-red-100 text-red-800";
  } else if (showHint) {
    difficulty = "Easy";
    difficultyStyle = "bg-yellow-100 text-yellow-800";
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (startTime && !clearTime) {
      // 진행 중 (시작은 했는데 클리어 안됨)
      timerId = setInterval(() => {
        const now = Date.now();
        const sec = (now - startTime) / 1000;
        setElapsedTime(sec);
      }, 100); // 0.1초 간격으로 업데이트
    } else {
      // startTime이 없거나 이미 끝났으면 0
      if (!startTime) {
        setElapsedTime(0);
      } else if (clearTime) {
        // 클리어된 시점으로 고정
        const finalSec = (clearTime - startTime) / 1000;
        setElapsedTime(finalSec);
      }
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [startTime, clearTime]);

  // **(1) "확인" 버튼** (공백 무시 비교)
  const handleCheck = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const inputNoSpaceLower = isHardMode
      ? trimmed
      : trimmed.replace(/\s+/g, "").toLowerCase();

    const found = characters.find((ch) => {
      const charNameNormalized = isHardMode
        ? ch.name // 하드모드 → 그대로 비교
        : ch.name.replace(/\s+/g, "").toLowerCase();
      return charNameNormalized === inputNoSpaceLower;
    });

    if (inputNoSpaceLower === "내아내") {
      toast(`제 아내는 멜라니아입니다.`, { icon: "❤️" });
      setInputValue("");
      return;
    }
		
    if (found && openedSet.has(found.id)) {
      toast(`"${inputValue}" 이미 맞춘 캐릭터입니다!`, { icon: "⚠️" });
      setBtnState("wrong");
      setTimeout(() => setBtnState("normal"), 500);
    } else if (found) {
			const newSet = new Set(openedSet);
      newSet.add(found.id);
      setOpenedSet(newSet);

      // 첫 정답 시점
      if (!startTime && newSet.size === 1) {
        setStartTime(Date.now());
      }

      // 버튼 초록색
      setBtnState("correct");
      setTimeout(() => setBtnState("normal"), 500);

      toast.success(`${found.name} 정답!`);
    }else {
      toast.error(`"${inputValue}" 틀렸습니다!`);
			setBtnState("wrong");
      setTimeout(() => setBtnState("normal"), 500);
    }
    setInputValue("");
  };

  // **(2) 셔플 버튼**
  const handleShuffle = () => {
    const shuffled = [...characters];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[rand]] = [shuffled[rand], shuffled[i]];
    }
		toast.success("셔플 완료!");
    setCharacters(shuffled);
  };

  // **(3) 포기 버튼** -> 모든 정답 열기
  const handleGiveUp = () => {
    if (isGiveUp) {
      toast.error("힘들어도 두번 포기 하진 마세요.");
      confirmResetAll()
      return;
    }
    setGiveUpMatched(openedSet.size);

    // 남은 UI는 전체 열림
    const allIds = characters.map((ch) => ch.id);
    setOpenedSet(new Set(allIds));

    setIsGiveUp(true);
    setShowFinalModal(true);
  };

  // **(4) 초기화 버튼**(모달 열기)
  const handleResetAllModal = () => {
    setShowResetModal(true);
  };
  // 모달 안의 "확인" => 실제 초기화
  const confirmResetAll = () => {
    setShowResetModal(false);

    // ★ 초기화
    setOpenedSet(new Set());
    setStartTime(null);
    setClearTime(null);
    setInputValue("");
    setRarityFilter("ALL");
    setInspirationFilter("ALL");
    setVersionFilter("ALL");
    setShowHint(false);
    setShowFilters(false);
    // 만약 포기 상태였으면 해제
    setIsGiveUp(false);
    setShowFinalModal(false);
    setIsHardMode(false);
  };

  // 필터만 초기화
  const handleFilterReset = () => {
    setRarityFilter("ALL");
    setInspirationFilter("ALL");
    setVersionFilter("ALL");
		toast.success("필터 초기화 완료!");
  };

  // rarity onChange
  const handleRarityFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRarityFilter(e.target.value);
  };
  // inspiration onChange
  const handleInspirationFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInspirationFilter(e.target.value);
  };
  // version onChange
  const handleVersionFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVersionFilter(e.target.value);
  };

  // (H) 모달 닫기 핸들러 (공통)
  const closeAllModals = () => {
    setShowResetModal(false);
    setShowHelpModal(false);
    setShowFinalModal(false);
  };

  // **모두 맞춤** 감지 -> clearTime 설정 + 축하 모달
  useEffect(() => {
    if (startTime !== null && openedSet.size === characters.length) {
      // 모두 맞춤
      if (!clearTime) {
        setClearTime(Date.now());
      }
      // 포기 상태가 아닐 때 -> 축하 모달
      if (!isGiveUp) {
				setGiveUpMatched(openedSet.size);
        setShowFinalModal(true);
      }
    }
  }, [openedSet, startTime, characters.length, clearTime, isGiveUp]);

	const transformInspiration = (inspiration: string) => {
		switch (inspiration) {
			case "plant":
				return "나무";
			case "star":
				return "천체";
			case "spirit":
				return "영혼";
			case "beast":
				return "야수";
			case "mineral":
				return "암석";
			case "intellect":
				return "지능";
			case "ALL":
				return "ALL";
		}
	};

  // 필터 적용
  let displayedChars = characters;
  // rarity
  if (rarityFilter !== "ALL") {
    const numeric = parseInt(rarityFilter) || 0;
    displayedChars = displayedChars.filter((ch) => ch.rarity === numeric);
  }
  // inspiration
  if (inspirationFilter !== "ALL") {
    displayedChars = displayedChars.filter((ch) => ch.inspiration === inspirationFilter);
  }
  // version
  if (versionFilter !== "ALL") {
    displayedChars = displayedChars.filter((ch) => ch.version === versionFilter);
  }

  // 현황
  const totalCount = characters.length;
  const openedCount = openedSet.size;
  const remainCount = totalCount - openedCount;

  // ★ 최종 모달 내용: 남은 캐릭터, 걸린 시간
  let finalTimeSec: number | null = null;
  if (startTime) {
    // 포기했을 때도 endTime = Date.now()로 계산 가능
    const end = clearTime || Date.now();
    finalTimeSec = Math.floor((end - startTime) / 1000);
  }

	const timerString = elapsedTime.toFixed(1);

  let checkBtnClass = "px-4 py-1 rounded transition text-white";
  if (btnState === "normal") {
    checkBtnClass += " bg-blue-500 hover:bg-blue-600";
  } else if (btnState === "wrong") {
    checkBtnClass += " bg-red-500 animate-shake"; // 빨강 + 진동
  } else if (btnState === "correct") {
    checkBtnClass += " bg-green-500"; // 초록 (shake X)
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 dark:text-gray-200 p-4 flex flex-col items-center">
      {/* ========== 제목 ========== */}
      <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-black text-center sticky top-0 bg-white z-20 p-3 dark:text-gray-100 dark:bg-gray-800">
        Reverse:1999 캐릭터 퀴즈
      </h1>

      {/* ========== 현황판 ========== */}
      <div className="mb-4 text-center flex flex-row items-center justify-center gap-4">
        <p className="text-lg mb-1 font-bold text-green-500">
          점수 : {openedCount} / {totalCount} ( {remainCount} left )
        </p>
				<span className="text-blue-500 font-bold text-lg">
            타이머 : {timerString}s
          </span>
      </div>

      {/* ========== 입력창 & 버튼들 ========== */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 z-30 py-2 px-4 flex justify-center">
        <div className="w-full lg:w-1/2 flex gap-2">
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="캐릭터 이름 입력"
            className="flex-1 border border-gray-300 px-3 py-2 rounded text-black dark:text-white dark:bg-gray-800"
          />
          <button
            onClick={handleCheck}
            className={checkBtnClass}
          >
            확인
          </button>
        </div>  
      </div>

      <div className="flex gap-2 mb-4 items-center flex-wrap sm:flex-nowrap">
        <button
          onClick={handleShuffle}
          disabled={isHardMode}
          className="min-w-[64px] whitespace-nowrap bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 transition"
        >
          셔플
        </button>
        <button
          onClick={handleGiveUp}
          disabled={isHardMode}
          className="min-w-[64px] whitespace-nowrap bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          포기
        </button>
        <button
          onClick={handleResetAllModal}
          className="min-w-[64px] whitespace-nowrap bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500 transition"
        >
          리셋
        </button>
        <button
          disabled={isHardMode}
          onClick={() => setShowFilters(prev => !prev)}
          className="min-w-[64px] whitespace-nowrap px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          필터
        </button>
        <button
          onClick={() => setShowHelpModal(true)}
          className="min-w-[64px] whitespace-nowrap bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
        >
          도움말
        </button>
        <button
          onClick={() => setShowHardModeModal(true)}
          disabled={isHardMode}
          className={`min-w-[80px] whitespace-nowrap px-3 py-1 rounded ${isHardMode ? "bg-red-600 text-white" : "bg-blue-500 text-white"}`}
        >
          {isHardMode ? "하드모드 🔥" : "하드모드"}
        </button>
      </div>

      {/* ========== 필터 섹션 ========== */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6 transition-all duration-300">
          <div className="flex items-center gap-3 pr-2">
            <span className="font-semibold text-black">희귀도:</span>
            <select
              value={rarityFilter}
              onChange={handleRarityFilter}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {RARITY.map((rar) => (
                <option key={rar} value={rar}>
                  {rar}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 pr-2">
            <span className="font-semibold text-black">영감:</span>
            <select
              value={inspirationFilter}
              onChange={handleInspirationFilter}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {INSPIRATIONS.map((insp) => (
                <option key={insp} value={insp}>
                  {transformInspiration(insp)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 pr-2">
            <span className="font-semibold text-black">버전:</span>
            <select
              value={versionFilter}
              onChange={handleVersionFilter}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {VERSIONS.map((ver) => (
                <option key={ver} value={ver}>
                  {ver}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleFilterReset}
            className="bg-gray-300 hover:bg-gray-400 transition px-3 py-1 rounded text-black"
          >
            필터 리셋
          </button>

          <button
            onClick={() => setShowHint(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded"
          >
            힌트
          </button>
        </div>
      )}

      {/* ========== 캐릭터 목록 ========== */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(48px,1fr))] gap-2 w-full px-4">
        {displayedChars.map((ch) => {
          const isOpened = openedSet.has(ch.id);
          return (
            <div
              key={ch.id}
              className="border border-gray-400 rounded p-1 flex flex-col items-center relative"
            >
              {showHint && (
                <Image
                  src={`/infos/inspiration/${ch.inspiration}.png`}
                  alt={ch.inspiration}
                  width={8}
                  height={16}
                  className="absolute top-1 left-1 w-2 h-4 opacity-90 z-20"
                />
              )}
              {isOpened ? (
                <Image
                  src={`/characters/${ch.rarity}stars/${ch.engName}.png`}
                  alt={ch.name}
                  width={40}
                  height={80}
                  className="w-10 h-20 object-contain"
                />
              ) : (
                <Image
                  src={
                    darkMode
                      ? "/quiz/question/question_img_dark.png"
                      : "/quiz/question/question_img.png"
                  }
                  alt="?"
                  width={40}
                  height={80}
                  className="w-10 h-20 object-contain"
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="h-20" />

			<Toaster position="bottom-center" />

      {/* ========== 모달들 ========== */}

      {/* (1) 초기화 확인 모달 */}
      <ConfirmModal 
        isOpen={showResetModal} 
        onClose={closeAllModals}
        modalClassName="
          bg-white dark:bg-gray-800
          text-black dark:text-white
          w-full max-w-md p-4
          rounded-lg shadow-lg
        "
      >
        <button
          className="absolute top-2 right-4 text-xl text-black dark:text-gray-200"
          onClick={closeAllModals}
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">초기화</h2>
        <p>정말로 초기화하시겠습니까?</p>
        <p>초기화 시 모든 정답과, 현재 퀴즈 기록은 사라집니다.</p>
        <div className="flex gap-4 mt-4 justify-end">
          <button onClick={closeAllModals} className="px-4 py-1 bg-gray-300 dark:bg-gray-600 rounded">
            취소
          </button>
          <button onClick={confirmResetAll} className="px-4 py-1 bg-red-500 text-white rounded">
            확인
          </button>
        </div>
      </ConfirmModal>

      {/* (2) 도움말 모달 */}
      <ConfirmModal
        isOpen={showHelpModal}
        onClose={closeAllModals}
        modalClassName="
          w-full sm:max-w-3xl sm:min-w-[600px] min-h-[500px] px-4
          bg-white dark:bg-gray-800
          text-black dark:text-white
          rounded-lg shadow-lg
        "
      >
        <button
          className="absolute top-2 right-4 text-xl text-black dark:text-gray-200"
          onClick={closeAllModals}
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">플레이 가이드</h2>
				<p className="font-bold">기본 규칙</p>
        <p>- 현재 리버스 1999에 있는 캐릭터들의 이름을 아무 정보 없이 맞추는 퀴즈입니다.</p>
        <p>- 2.4버젼 기준 2성부터 6성까지 모두 존재합니다. 총 94명 </p>
				<p>- 이름은 모두 인게임 닉네임 기준이고, 띄워쓰기는 신경 안쓰셔도 됩니다. </p>
        <p>- 최대한 빠른 시간내에, 모든 캐릭터들의 이름을 맞춰보세요.</p>
				<p>- 캐릭터 이름을 입력해서 맞춘다면, 맞춘 캐릭터가 열립니다.</p>
				<p>- 캐릭터 이름을 입력해서 틀리다면, 아무 일도 일어나지 않습니다.</p>
        <p>- 첫번째 정답부터, 마지막 정답을 입력할때까지 시간이 기록됩니다.</p>
				<p className="font-bold mt-3">버튼 설명</p>
				<p>- 셔플 버튼을 누르면 캐릭터들의 순서가 랜덤으로 섞입니다.</p>
				<p>- 포기 버튼을 누르면 즉시 포기되며, 소요시간과 결과가 공개됩니다.</p>
				<p>- 초기화 버튼을 누르면 모든 캐릭터가 닫히고, 현재 퀴즈 기록은 사라집니다.</p>
				<p>- 필터 버튼을 누르면, 문제 풀이에 유용한 힌트를 얻을 수 있습니다.</p>
				<p>- 하드모드 버튼을 누르면 하드모드로 전환됩니다.</p>
				<p className="font-bold mt-3">추신</p>
				<p className="font-bold">- 리버스 고수라면, 하드 모드 추천드립니다. </p>
				<p>- 모바일 유저라면, 데스크탑 모드로 해주세요!! + 주로 데스크탑에서 해주세요</p>
				<p>- 앞으로도 다양한 컨텐츠 추가가 많이 될 예정입니다. 아이디어는 언제나 환영입니다.</p>
      </ConfirmModal>

      {/* (3) 최종 결과 모달 */}
      <ConfirmModal 
        isOpen={showFinalModal} 
        onClose={closeAllModals}
        modalClassName={`
          animate__animated
          rounded-lg shadow-lg px-6 py-4 max-w-md w-full text-center
          text-black dark:text-white
          ${
            isGiveUp
              ? "animate__shakeX bg-red-100 dark:bg-gray-900"
              : "animate__bounceIn bg-green-100 dark:bg-gray-900"
          }
        `}
      >
        <button
          className="absolute top-2 right-4 text-xl text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
          onClick={closeAllModals}
        >
          ✕
        </button>

        {isGiveUp ? (
          <>
            <Image
              src="/quiz/results/fail.png"
              alt="fail"
              width={80}
              height={80}
              className="w-20 h-20 mx-auto mb-2"
            />
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-300 mb-2">포기하셨습니다</h2>
            <p className="font-semibold">그래도 잘 하셨어요!</p>
            <p className="font-semibold">조금만 더 노력하면 훌륭한 타임키퍼가 될거에요</p>
          </>
        ) : (
          <>
            <Image
              src="/quiz/results/success.png"
              alt="success"
              width={80}
              height={80}
              className="w-20 h-20 mx-auto mb-2"
            />
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-300 mb-2">🎉 축하합니다!</h2>
            <p className="font-semibold">모든 캐릭터를 맞추셨습니다!</p>
            <p className="font-semibold">당신은 훌륭한 타임키퍼군요</p>
          </>
        )}

        <div className="mt-4 space-y-2">

          <p className="font-bold">🗓 {formattedDate}</p>
          <div className="flex items-center gap-2 justify-center">
            <p className="font-bold">점수 : {giveUpMatched} / {totalCount}</p>
            <div className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${difficultyStyle}`}>
              {difficulty}
            </div>
          </div>
          {(totalCount - giveUpMatched) !== 0 && (
            <p className="font-bold">못맞춘 캐릭터 : {totalCount - giveUpMatched} 명</p>
          )}
          {finalTimeSec != null ? (
            <p className="font-bold">걸린 시간: {timerString}초</p>
          ) : (
            <p className="font-bold">시간 측정 없음</p>
          )}
        </div>
      </ConfirmModal>
			

      {showHardModeModal && (
        <ConfirmModal
        isOpen={showHardModeModal}
        onClose={() => setShowHardModeModal(false)}
        modalClassName="
          w-full max-w-lg sm:min-w-[500px] min-w-[90vw] sm:min-h-[200px] p-4
          bg-white dark:bg-gray-800
          text-black dark:text-white
          rounded-lg shadow-lg
        "
      >
        <h2 className="text-xl font-bold text-red-600 mb-2">🔥 하드 모드 설명 🔥</h2>
        <p className="mb-2">- 띄어쓰기와 영어 대소문자를 정확히 입력해야 정답으로 인정됩니다.</p>
        <p className="mb-2">- 하드모드를 활성화하면, 새로 게임을 시작합니다.</p>
        <p className="mb-2">- 셔플이 자동으로 적용되며, 필터와 포기 기능은 사용할 수 없습니다.</p>
        <p>- 초기화나 새로고침하기 전에 하드모드는 종료가 불가능합니다.</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setShowHardModeModal(false)}
            className="bg-gray-300 dark:bg-gray-600 px-4 py-1 rounded"
        >
            취소
          </button>
          <button
            onClick={() => {
              setShowHardModeModal(false);
              setIsHardMode(true);
              handleShuffle();
              handleFilterReset();
              setShowFilters(false);
              setShowHint(false);
            }}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            게임 시작
          </button>
        </div>
      </ConfirmModal>
      )}
    </div>
  );
}