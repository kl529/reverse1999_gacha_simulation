"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { charactersByRarity, Character } from "@/data/characters";
import { toPng } from "html-to-image";
import { toast, Toaster } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

// 6개 속성 정의 (다크모드 색상 / 라이트모드 색상)
const INSPIRATIONS = [
  { id: "beast", name: "야수", darkBg: "#813838", lightBg: "#a85454" },
  { id: "plant", name: "나무", darkBg: "#276638", lightBg: "#3d8a52" },
  { id: "star", name: "천체", darkBg: "#29405B", lightBg: "#3d5a7a" },
  { id: "mineral", name: "암석", darkBg: "#5E4524", lightBg: "#7a5c34" },
  { id: "intellect", name: "지능", darkBg: "#86783D", lightBg: "#a89856" },
  { id: "spirit", name: "영혼", darkBg: "#6C3B71", lightBg: "#8a5490" },
] as const;

// 모든 캐릭터를 id 순서로 정렬
const allCharacters = Object.values(charactersByRarity)
  .flat()
  .sort((a, b) => a.id - b.id);

// 속성별로 캐릭터 필터링
const getCharactersByInspiration = (inspiration: string): Character[] => {
  return allCharacters.filter((c) => c.inspiration === inspiration);
};

export default function FavoriteCharacter() {
  // 각 속성별 선택된 캐릭터 ID 저장
  const [selectedCharacters, setSelectedCharacters] = useState<Record<string, number | null>>({
    beast: null,
    plant: null,
    star: null,
    mineral: null,
    intellect: null,
    spirit: null,
  });

  const [nickname, setNickname] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 다크모드 감지
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();

    // MutationObserver로 클래스 변경 감지
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // 오늘 날짜 포맷
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 캐릭터 선택 핸들러
  const handleSelectCharacter = (inspiration: string, characterId: number | null) => {
    setSelectedCharacters((prev) => ({
      ...prev,
      [inspiration]: characterId,
    }));
  };

  // 선택된 캐릭터 객체 가져오기
  const getSelectedCharacter = (inspiration: string): Character | null => {
    const charId = selectedCharacters[inspiration];
    if (!charId) return null;
    return allCharacters.find((c) => c.id === charId) || null;
  };

  // 이미지 다운로드
  const handleDownload = useCallback(async () => {
    if (!resultRef.current) return;

    // 최소 1개 이상 선택했는지 확인
    const hasSelection = Object.values(selectedCharacters).some((id) => id !== null);
    if (!hasSelection) {
      toast.error("최소 1개 이상의 캐릭터를 선택해주세요!");
      return;
    }

    setIsDownloading(true);
    try {
      // 다크모드 감지
      const isDarkMode = document.documentElement.classList.contains("dark");
      const backgroundColor = isDarkMode ? "#1f2937" : "#ffffff";

      // 모바일에서는 실제 요소 너비, 데스크탑에서는 최대 672px로 캡처
      const currentWidth = resultRef.current.offsetWidth;
      const maxWidth = 672; // max-w-2xl과 동일
      const captureWidth = Math.min(currentWidth, maxWidth);

      const dataUrl = await toPng(resultRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor,
        width: captureWidth,
        style: {
          width: `${captureWidth}px`,
        },
      });

      const link = document.createElement("a");
      link.download = "my-favorite-characters.png";
      link.href = dataUrl;
      link.click();

      toast.success("이미지가 다운로드되었습니다!");
    } catch (error) {
      console.error("이미지 생성 실패:", error);
      toast.error("이미지 다운로드에 실패했습니다.");
    } finally {
      setIsDownloading(false);
    }
  }, [selectedCharacters]);

  // 초기화
  const handleReset = () => {
    setSelectedCharacters({
      beast: null,
      plant: null,
      star: null,
      mineral: null,
      intellect: null,
      spirit: null,
    });
    toast.success("초기화되었습니다!");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-lg flex-col items-center bg-gray-100 px-4 py-8 dark:bg-gray-900">
      <Toaster position="top-center" toastOptions={{ duration: 1500 }} />

      <h1 className="mb-2 mt-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        나의 최애 캐릭터
      </h1>
      <p className="mb-4 text-center text-gray-500 dark:text-gray-300">
        속성별로 최애 캐릭터를 선택하고 공유해보세요!
      </p>

      {/* 닉네임 입력 */}
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="nickname" className="text-sm text-gray-700 dark:text-gray-300">
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
          maxLength={20}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* 버튼 영역 */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={handleReset}
          className="rounded bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          초기화
        </button>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {isDownloading ? "생성 중..." : "이미지 저장"}
        </button>
      </div>

      {/* 드롭다운 선택 영역 */}
      <div className="mb-8 grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
        {INSPIRATIONS.map((inspiration) => {
          const selectedChar = getSelectedCharacter(inspiration.id);
          const characters = getCharactersByInspiration(inspiration.id);

          return (
            <div
              key={inspiration.id}
              className="flex flex-col items-center overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600"
              style={{
                backgroundColor: isDarkMode ? inspiration.darkBg : inspiration.lightBg,
              }}
            >
              {/* 속성 라벨 (띠 형태) */}
              <div className="flex w-full items-center justify-center gap-2 bg-white py-1 text-sm font-medium text-black dark:bg-gray-200">
                <Image
                  src={`/infos/inspiration/${inspiration.id}.webp`}
                  alt={inspiration.name}
                  width={16}
                  height={16}
                />
                {inspiration.name}
              </div>

              {/* 커스텀 드롭다운 */}
              <div className="w-full px-2 py-1.5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between gap-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    {selectedChar ? (
                      <div className="flex items-center gap-1">
                        <Image
                          src={`/characters/${selectedChar.rarity}stars/${selectedChar.engName}.webp`}
                          alt={selectedChar.name}
                          width={12}
                          height={24}
                          className="h-6 w-3 rounded object-cover"
                        />
                        <span className="truncate text-[10px]">{selectedChar.name}</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-gray-400">선택</span>
                    )}
                    <ChevronDown className="h-3 w-3 shrink-0 opacity-50" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-60 overflow-y-auto">
                    <DropdownMenuItem
                      onSelect={() => handleSelectCharacter(inspiration.id, null)}
                      className="cursor-pointer"
                    >
                      <span className="text-gray-400">선택 해제</span>
                    </DropdownMenuItem>
                    {characters.map((char) => (
                      <DropdownMenuItem
                        key={char.id}
                        onSelect={() => handleSelectCharacter(inspiration.id, char.id)}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <Image
                          src={`/characters/${char.rarity}stars/${char.engName}.webp`}
                          alt={char.name}
                          width={24}
                          height={48}
                          className="h-12 w-6 rounded object-cover"
                        />
                        <span>{char.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* 선택된 캐릭터 초상화 */}
              <div className="relative mx-2 mb-2 flex h-44 w-[76px] items-center justify-center overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-700">
                {selectedChar ? (
                  <>
                    <Image
                      src={`/characters/${selectedChar.rarity}stars/${selectedChar.engName}.webp`}
                      alt={selectedChar.name}
                      fill
                      className="object-cover"
                    />
                    {/* 속성 아이콘 (왼쪽 상단) */}
                    <div className="absolute left-1 top-1">
                      <Image
                        src={`/infos/inspiration/${inspiration.id}.webp`}
                        alt={inspiration.name}
                        width={16}
                        height={16}
                      />
                    </div>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">미선택</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 결과 이미지 영역 (다운로드용) */}
      <div
        ref={resultRef}
        className="w-full max-w-2xl rounded-lg border-2 border-gray-300 bg-white p-6 shadow-lg dark:border-gray-600 dark:bg-gray-800"
      >
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">
          나의 최애 캐릭터
        </h2>
        {nickname && (
          <p className="-mt-2 mb-4 text-center text-sm text-gray-600 dark:text-gray-300">
            by <span className="font-semibold">{nickname}</span>
          </p>
        )}

        {/* 캐릭터 그리드 */}
        <div className="mb-4 flex justify-center gap-2">
          {INSPIRATIONS.map((inspiration) => {
            const character = getSelectedCharacter(inspiration.id);
            return (
              <div
                key={inspiration.id}
                className="flex w-16 flex-col items-center overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600"
                style={{
                  backgroundColor: isDarkMode ? inspiration.darkBg : inspiration.lightBg,
                }}
              >
                {/* 속성 이름 띠 */}
                <div className="flex w-full items-center justify-center gap-1 bg-white/90 py-0.5 text-[10px] font-medium text-black dark:bg-gray-200/90">
                  <Image
                    src={`/infos/inspiration/${inspiration.id}.webp`}
                    alt={inspiration.name}
                    width={12}
                    height={12}
                  />
                  {inspiration.name}
                </div>

                {/* 캐릭터 이미지 */}
                <div className="relative mx-1 my-1 h-32 w-14 overflow-hidden rounded bg-gray-200/50 dark:bg-gray-700/50">
                  {character ? (
                    <>
                      <Image
                        src={`/characters/${character.rarity}stars/${character.engName}.webp`}
                        alt={character.name}
                        fill
                        className="object-cover"
                      />
                      <Image
                        src={`/infos/effects/${character.rarity}stars.webp`}
                        alt={`${character.rarity}성`}
                        width={56}
                        height={10}
                        className="absolute bottom-0 left-0 z-10"
                      />
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-xs text-gray-500">?</span>
                    </div>
                  )}
                </div>

                {/* 캐릭터 이름 */}
                <span className="mb-1 line-clamp-2 w-14 text-center text-[9px] font-medium leading-tight text-white drop-shadow-sm">
                  {character?.name || "-"}
                </span>
              </div>
            );
          })}
        </div>

        {/* 사이트 정보 & 날짜 */}
        <div className="mt-4 border-t border-gray-300 pt-3 dark:border-gray-600">
          <div className="flex items-center justify-between text-xs">
            <p className="text-gray-500 dark:text-gray-400">{today}</p>
            <div className="text-right">
              <p className="text-gray-500 dark:text-gray-400">버틴의 여행가방</p>
              <p className="text-blue-600 dark:text-blue-400">reverse1999-simulator.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
