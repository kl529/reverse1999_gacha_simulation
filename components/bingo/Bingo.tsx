"use client";

import { useState, useRef, useEffect } from "react";
import { bingoData, BingoDifficulty } from "@/data/bingo_text";
import { toast, Toaster } from "react-hot-toast";
import { analytics } from "@/lib/posthog";

// 빙고판 크기별 전체 빙고 줄 개수 (가로 + 세로 + 대각선 2)
const getTotalBingoLines = (size: number) => size + size + 2;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      eventParams?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: unknown;
      }
    ) => void;
  }
}

function getBingoLines(board: boolean[][], size: number) {
  const lines: number[][][] = [];
  // 가로
  for (let i = 0; i < size; i++) {
    if (board[i].every((v) => v)) lines.push(Array.from({ length: size }, (_, j) => [i, j]));
  }
  // 세로
  for (let j = 0; j < size; j++) {
    if (board.every((row) => row[j]))
      lines.push(Array.from({ length: size }, (_, i) => [i, j]));
  }
  // 대각선
  if (board.every((row, idx) => row[idx]))
    lines.push(Array.from({ length: size }, (v, idx) => [idx, idx]));
  if (board.every((row, idx) => row[size - 1 - idx]))
    lines.push(Array.from({ length: size }, (v, idx) => [idx, size - 1 - idx]));
  return lines;
}

export default function Bingo() {
  const [difficulty, setDifficulty] = useState<BingoDifficulty>("veteran");
  const currentBingoData = bingoData[difficulty];
  const bingoSize = currentBingoData.size;

  const [board, setBoard] = useState(
    Array.from({ length: bingoSize }, () => Array(bingoSize).fill(false))
  );
  const [result, setResult] = useState<{
    bingoCount: number;
    checkedCount: number;
    bingoCells: Set<string>;
    bingoLines: number[][][];
  } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const bingoTexts = currentBingoData.texts;

  useEffect(() => {
    // 빙고 게임 시작 추적
    analytics.bingo.gameStarted();
  }, []);

  // 셀 클릭 핸들러
  const handleCellClick = (row: number, col: number) => {
    if (result) {
      toast("리셋을 해야 다시 체크할 수 있습니다.", {
        duration: 1500,
        position: "bottom-center",
      });
      return;
    }

    const text = bingoTexts[row * bingoSize + col];

    // PostHog 이벤트 추적: 빙고 셀 클릭
    analytics.bingo.cellClicked(row, col, text);

    // 🔹 GA 이벤트 전송 (기존 코드 유지)
    window.gtag?.("event", "bingo_cell_click", {
      event_category: "Bingo",
      bingo_text: text,
    });

    setBoard((prev) => {
      const copy = prev.map((r) => [...r]);
      copy[row][col] = !copy[row][col];
      return copy;
    });
  };

  // 리셋
  const handleReset = () => {
    setBoard(Array.from({ length: bingoSize }, () => Array(bingoSize).fill(false)));
    setResult(null);

    // 빙고 리셋 추적
    analytics.bingo.gameReset();

    toast.success("리셋되었습니다.", {
      duration: 1500,
      position: "bottom-center",
    });
  };

  // 난이도 변경 핸들러
  const handleDifficultyChange = (newDifficulty: BingoDifficulty) => {
    setDifficulty(newDifficulty);
    const newSize = bingoData[newDifficulty].size;
    setBoard(Array.from({ length: newSize }, () => Array(newSize).fill(false)));
    setResult(null);
  };

  // 빙고 체크 (가로, 세로, 대각선)
  const getBingoResult = () => {
    const lines = getBingoLines(board, bingoSize);
    const bingoCells = new Set<string>();
    lines.forEach((line) => {
      line.forEach(([i, j]) => bingoCells.add(`${i},${j}`));
    });
    const checkedCount = board.flat().filter(Boolean).length;
    return {
      bingoCount: lines.length,
      checkedCount,
      bingoCells,
      bingoLines: lines,
    };
  };

  // 완성 버튼
  const handleComplete = () => {
    const result = getBingoResult();
    setResult(result);

    // 빙고 완성 추적
    analytics.bingo.bingoCompleted(result.bingoCount);
  };

  // 빙고 줄 셀 표시
  const bingoCells = result?.bingoCells ?? new Set<string>();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-lg flex-col items-center bg-gray-100 px-2 py-8 dark:bg-gray-900">
      <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
      <h1 className="mb-2 mt-8 text-center text-3xl font-bold">리버스 1999 빙고</h1>
      <p className="mb-4 text-center text-gray-500 dark:text-gray-300">재미로만 즐겨주세요!</p>

      {/* 난이도 탭 */}
      <div className="mb-4 flex gap-2 rounded-lg bg-white p-1 shadow-sm dark:bg-gray-800">
        <button
          onClick={() => handleDifficultyChange("veteran")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            difficulty === "veteran"
              ? "bg-blue-500 text-white dark:bg-blue-600"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          고인물
        </button>
        <button
          onClick={() => handleDifficultyChange("whale")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            difficulty === "whale"
              ? "bg-blue-500 text-white dark:bg-blue-600"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          돈통
        </button>
        {/* <button
          onClick={() => handleDifficultyChange("lightSpender")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            difficulty === "lightSpender"
              ? "bg-blue-500 text-white dark:bg-blue-600"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          릾청년
        </button> */}
      </div>

      <div className="mb-4 flex items-center gap-3">
        <button
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          onClick={handleReset}
        >
          리셋
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={handleComplete}
          disabled={!!result}
        >
          완성
        </button>
      </div>
      {result && (
        <div className="w-full max-w-md rounded bg-white p-3 text-center text-sm shadow dark:bg-gray-800 dark:text-gray-100">
          <p>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              빙고 줄 : {result.bingoCount}
            </span>{" "}
            / {getTotalBingoLines(bingoSize)}
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <span className="font-bold text-green-600 dark:text-green-400">
              체크 : {result.checkedCount}
            </span>{" "}
            / {bingoSize * bingoSize}
            <span className="ml-2 font-bold text-black dark:text-gray-100">
              {" "}
              난이도 : {currentBingoData.title}{" "}
            </span>
          </p>
        </div>
      )}
      <div
        ref={boardRef}
        className="mb-6 grid w-full max-w-full gap-1 rounded bg-white p-2 shadow-md dark:bg-gray-800 sm:gap-2 lg:w-[600px]"
        style={{ gridTemplateColumns: `repeat(${bingoSize}, minmax(0, 1fr))` }}
      >
        {board.map((row, i) =>
          row.map((checked, j) => {
            const idx = i * bingoSize + j;
            const text = bingoTexts[idx];
            const isBingo = bingoCells.has(`${i},${j}`);

            return (
              <div key={`${i}-${j}`} className="aspect-square w-full">
                <button
                  className={`relative flex h-full w-full items-center justify-center rounded border border-gray-300 p-2 text-center text-[11px] font-semibold leading-snug sm:text-xs md:text-sm lg:text-base ${checked ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"} ${isBingo ? "z-10 ring-4 ring-green-400 dark:ring-green-500" : ""} `}
                  onClick={() => handleCellClick(i, j)}
                >
                  <span
                    className="w-full text-center leading-tight"
                    style={{ fontSize: "clamp(9px, 2vw, 14px)" }}
                  >
                    {text}
                  </span>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
