"use client";

import { useEffect, useState } from "react";
import { QUIZ_CHARACTERS } from "@/data/quiz_character";
import { Character } from "@/data/characters";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { toast, Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import "animate.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useMemo, useCallback } from "react";
import { version } from "@/data/version";
import { getDisplayVersion } from "@/data/version";
import { storage, STORAGE_KEYS } from "@/lib/storage";

export default function CharacterQuiz() {
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
  const [showHelpModal, setShowHelpModal] = useState(false); // 도움말 모달
  const [showFinalModal, setShowFinalModal] = useState(false); // 마지막 결과 모달

  const [giveUpMatched, setGiveUpMatched] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 버튼 상태: "normal" | "wrong" | "correct"
  const [btnState, setBtnState] = useState<"normal" | "wrong" | "correct">("normal");

  // (G) 최종 결과(포기 or 전부 맞춤) 여부
  const [isGiveUp, setIsGiveUp] = useState(false);
  const [isHardMode, setIsHardMode] = useState(false);
  const [showHardModeModal, setShowHardModeModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // rarity, inspiration, version 상수
  const [characters, setCharacters] = useState<Character[]>(
    QUIZ_CHARACTERS.filter((ch) => {
      const c_version = parseFloat(ch.version || "0");
      return c_version <= parseFloat(version);
    })
  );

  const raritySet = useMemo(() => new Set(QUIZ_CHARACTERS.map((ch) => ch.rarity)), []);
  const rarityList = useMemo(() => Array.from(raritySet).sort((a, b) => b - a), [raritySet]);
  const RARITY = useMemo(() => ["ALL", ...rarityList.map((r) => `${r}성`)], [rarityList]);

  const inspirationSet = useMemo(() => new Set(QUIZ_CHARACTERS.map((ch) => ch.inspiration)), []);
  const inspirationList = useMemo(() => Array.from(inspirationSet).sort(), [inspirationSet]);
  const INSPIRATIONS = useMemo(() => ["ALL", ...inspirationList], [inspirationList]);

  const versionList = useMemo(() => {
    const versionSet = new Set(QUIZ_CHARACTERS.map((ch) => ch.version));
    return Array.from(versionSet)
      .filter((v) => {
        const [major, minor] = v.split(".").map(Number);
        const [currentMajor, currentMinor] = version.split(".").map(Number);
        return major < currentMajor || (major === currentMajor && minor <= currentMinor);
      })
      .sort((a, b) => {
        const [aMajor, aMinor] = a.split(".").map(Number);
        const [bMajor, bMinor] = b.split(".").map(Number);
        return aMajor !== bMajor ? aMajor - bMajor : aMinor - bMinor;
      });
  }, []);
  const VERSIONS = useMemo(() => {
    const versions = versionList.map((v) => getDisplayVersion(v));
    return ["ALL", ...new Set(["콜라보", ...versions])];
  }, [versionList]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const hasVisited = storage.get<boolean>(STORAGE_KEYS.HAS_SEEN_HELP_MODAL);

    if (!hasVisited) {
      setShowHelpModal(true);
      storage.set(STORAGE_KEYS.HAS_SEEN_HELP_MODAL, true);
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
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const today = new Date();
    setFormattedDate(
      today.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    );
  }, []);

  const { theme } = useTheme();

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
      timerId = setInterval(() => {
        const now = Date.now();
        const sec = (now - startTime) / 1000;
        setElapsedTime(sec);
      }, 100);
    } else {
      if (!startTime) setElapsedTime(0);
      else if (clearTime) setElapsedTime((clearTime - startTime) / 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [startTime, clearTime]);

  // **(1) "확인" 버튼** (공백 무시 비교)
  const handleCheck = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const inputNoSpaceLower = isHardMode ? trimmed : trimmed.replace(/\s+/g, "").toLowerCase();

    const found = characters.find((ch) => {
      const charNameNormalized = isHardMode
        ? ch.name // 하드모드 → 그대로 비교
        : ch.name.replace(/\s+/g, "").toLowerCase();
      return charNameNormalized === inputNoSpaceLower;
    });

    if (
      inputNoSpaceLower === "내아내" ||
      inputNoSpaceLower === "아내" ||
      inputNoSpaceLower === "최애"
    ) {
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
    } else {
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
      confirmResetAll();
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
      default:
        return inspiration;
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
    if (versionFilter === "콜라보") {
      displayedChars = displayedChars.filter((ch) => ch.version === "2.75");
    } else {
      displayedChars = displayedChars.filter((ch) => ch.version === versionFilter);
    }
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

  const FilterSelect = useCallback(
    ({
      value,
      onChange,
      items,
    }: {
      value: string;
      onChange: (v: string) => void;
      items: string[];
    }) => (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="필터">{transformInspiration(value)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {transformInspiration(item)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    [] // 빈 배열로 한 번만 생성됨
  );

  const filterUI = useMemo(
    () => (
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <FilterSelect value={rarityFilter} onChange={setRarityFilter} items={RARITY} />
        <FilterSelect
          value={inspirationFilter}
          onChange={setInspirationFilter}
          items={INSPIRATIONS}
        />
        <FilterSelect value={versionFilter} onChange={setVersionFilter} items={VERSIONS} />
        <Button variant="secondary" onClick={handleFilterReset}>
          필터 리셋
        </Button>
        <Button variant="destructive" onClick={() => setShowHint(true)}>
          힌트
        </Button>
      </div>
    ),
    [rarityFilter, inspirationFilter, versionFilter, FilterSelect, INSPIRATIONS, RARITY, VERSIONS]
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white p-4 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="sticky top-0 z-20 mb-4 mt-8 p-3 text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
        리버스 1999 캐릭터 퀴즈
      </h1>

      <div className="mb-4 flex flex-row items-center justify-center gap-4 text-center">
        <p className="mb-1 text-lg font-bold text-green-500">
          점수 : {openedCount} / {totalCount} ( {remainCount} left )
        </p>
        <span className="text-lg font-bold text-blue-500">타이머 : {timerString}s</span>
      </div>

      <div className="fixed bottom-0 left-0 z-30 flex w-full justify-center border-t border-gray-300 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex w-full gap-2 lg:w-1/2">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="캐릭터 이름 입력"
            className="flex-1"
          />
          <Button onClick={handleCheck} className={checkBtnClass}>
            확인
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 sm:flex-nowrap">
        <Button
          onClick={handleShuffle}
          disabled={isHardMode}
          className="bg-purple-500 hover:bg-purple-600"
        >
          셔플
        </Button>
        <Button
          onClick={handleGiveUp}
          disabled={isHardMode}
          className="bg-red-500 hover:bg-red-600"
        >
          포기
        </Button>
        <Button onClick={handleResetAllModal} className="bg-gray-400 hover:bg-gray-500">
          리셋
        </Button>
        <Button
          onClick={() => setShowFilters((prev) => !prev)}
          disabled={isHardMode}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          필터
        </Button>
        <Button onClick={() => setShowHelpModal(true)} className="bg-green-500 hover:bg-green-600">
          도움말
        </Button>
        <Button
          onClick={() => setShowHardModeModal(true)}
          disabled={isHardMode}
          className={isHardMode ? "bg-red-600" : "bg-blue-500"}
        >
          {isHardMode ? "하드모드 🔥" : "하드모드"}
        </Button>
      </div>

      {showFilters && filterUI}

      {/* ========== 캐릭터 목록 ========== */}
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(48px,1fr))] gap-2 px-4">
        {displayedChars.map((ch) => {
          const isOpened = openedSet.has(ch.id);
          return (
            <div
              key={ch.id}
              className="relative flex flex-col items-center rounded border border-gray-400 p-1"
            >
              {showHint && (
                <Image
                  src={`/infos/inspiration/${ch.inspiration}.webp`}
                  alt={ch.inspiration}
                  width={8}
                  height={16}
                  className="absolute left-1 top-1 z-20 h-4 w-2 opacity-90"
                />
              )}
              {isOpened ? (
                <Image
                  src={`/characters/${ch.rarity}stars/${ch.engName}.webp`}
                  alt={ch.name}
                  width={40}
                  height={80}
                  className="h-20 w-10 object-contain"
                />
              ) : (
                <Image
                  src={
                    mounted && theme === "dark"
                      ? "/quiz/question/question_img_dark.webp"
                      : "/quiz/question/question_img.webp"
                  }
                  alt="?"
                  width={40}
                  height={80}
                  className="h-20 w-10 object-contain"
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
        <h2 className="text-lg font-semibold">초기화</h2>
        <p>
          정말로 초기화하시겠습니까? <br />
          초기화 시 모든 정답과, 현재 퀴즈 기록은 사라집니다.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeAllModals}
            className="rounded bg-gray-300 px-4 py-1 dark:bg-gray-600"
          >
            취소
          </button>
          <button onClick={confirmResetAll} className="rounded bg-red-500 px-4 py-1 text-white">
            확인
          </button>
        </div>
      </ConfirmModal>

      {/* (2) 도움말 모달 */}
      <ConfirmModal
        isOpen={showHelpModal}
        onClose={closeAllModals}
        modalClassName="
          w-[95vw] max-w-3xl px-4 py-4
          max-h-[90vh] overflow-y-auto
          bg-white dark:bg-gray-800
          text-black dark:text-white
          rounded-lg shadow-lg
        "
      >
        <h2 className="text-lg font-semibold">플레이 가이드</h2>
        <p className="font-bold">기본 규칙</p>
        <p>
          - 리버스 1999의 캐릭터들의 이름을 아무 정보 없이 맞추는 퀴즈입니다.
          <br />- {version} 버젼 기준 2성부터 6성까지 모두 존재합니다. <br />
          - 이름은 모두 인게임 닉네임 기준이고, 띄워쓰기는 신경 안쓰셔도 됩니다. <br />
          - 최대한 빠른 시간내에, 모든 캐릭터들의 이름을 맞춰보세요.
          <br />
          - 캐릭터 이름을 입력해서 맞춘다면, 맞춘 캐릭터가 열립니다.
          <br />
          - 캐릭터 이름을 입력해서 틀리다면, 아무 일도 일어나지 않습니다.
          <br />- 첫번째 정답부터, 마지막 정답을 입력할때까지 시간이 기록됩니다.
        </p>
        <p className="mt-3 font-bold">버튼 설명</p>
        <p>
          - 셔플 버튼을 누르면 캐릭터들의 순서가 랜덤으로 섞입니다.
          <br />
          - 포기 버튼을 누르면 즉시 포기되며, 소요시간과 결과가 공개됩니다.
          <br />
          - 초기화 버튼을 누르면 현재 퀴즈 기록은 사라집니다.
          <br />
          - 필터 버튼을 누르면, 문제 풀이에 유용한 힌트를 얻을 수 있습니다.
          <br />- 하드모드 버튼을 누르면 하드모드로 전환됩니다.
        </p>
        <p className="mt-3 font-bold">추신</p>
        <p>
          - 리버스 고수라면, 하드 모드 추천드립니다. <br />
          - 모바일 유저라면, 데스크탑 모드로 해주세요!! <br />
          - 가능하면 데스크탑에서 플레이한다면 좀 더 원할합니다. <br />- 아이디어는 언제나
          환영입니다.
        </p>
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
        {isGiveUp ? (
          <>
            <Image
              src="/quiz/results/fail.webp"
              alt="fail"
              width={80}
              height={80}
              className="mx-auto mb-2 h-20 w-20"
            />
            <h2 className="text-center text-2xl font-bold text-red-600 dark:text-red-300">
              포기하셨습니다
            </h2>
            <p className="text-center font-semibold">
              그래도 잘 하셨어요!
              <br /> 조금만 더 노력하면 훌륭한 타임키퍼가 될거에요
            </p>
          </>
        ) : (
          <>
            <Image
              src="/quiz/results/success.webp"
              alt="success"
              width={80}
              height={80}
              className="mx-auto mb-2 h-20 w-20"
            />
            <h2 className="mb-2 text-center text-2xl font-bold text-green-600 dark:text-green-300">
              🎉 축하합니다!
            </h2>
            <p className="text-center font-semibold">
              모든 캐릭터를 맞추셨습니다! <br />
              당신은 훌륭한 타임키퍼군요
            </p>
          </>
        )}

        <div className="space-y-2">
          <p className="text-center font-bold">🗓 {formattedDate}</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-center font-bold">
              점수 : {giveUpMatched} / {totalCount}
            </p>
            <div
              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${difficultyStyle}`}
            >
              {difficulty}
            </div>
          </div>
          {totalCount - giveUpMatched !== 0 && (
            <p className="text-center font-bold">못맞춘 캐릭터 : {totalCount - giveUpMatched} 명</p>
          )}
          {finalTimeSec != null ? (
            <p className="text-center font-bold">걸린 시간: {timerString}초</p>
          ) : (
            <p className="text-center font-bold">시간 측정 없음</p>
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
          <h2 className="mb-2 text-center text-xl font-bold text-red-600">🔥 하드모드 설명 🔥</h2>
          <p>
            - 띄어쓰기와 영어 대소문자를 정확히 입력해야 정답으로 인정됩니다. <br />
            - 하드모드를 활성화하면, 새로 게임을 시작합니다. <br />
            - 셔플이 자동으로 적용되며, 필터와 포기 기능은 사용할 수 없습니다. <br />- 초기화나
            새로고침하기 전에 하드모드는 종료가 불가능합니다.
          </p>
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => setShowHardModeModal(false)}
              className="rounded bg-gray-300 px-4 py-1 dark:bg-gray-600"
            >
              취소
            </button>
            <button
              onClick={() => {
                confirmResetAll(); // 진행상황 초기화
                setIsHardMode(true);
                handleShuffle(); // 자동 셔플
                toast.success("하드 모드 시작!");
                setShowHardModeModal(false);
              }}
              className="rounded bg-red-600 px-4 py-1 text-white"
            >
              게임 시작
            </button>
          </div>
        </ConfirmModal>
      )}
    </div>
  );
}
