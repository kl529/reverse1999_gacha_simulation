"use client";

import { useState, useRef } from "react";
import bingoTexts from "@/data/bingo_text";
import { toast, Toaster } from "react-hot-toast";

const BINGO_SIZE = 5;
const TOTAL_BINGO_LINES = 12; // 5x5 빙고판의 전체 빙고 줄 개수

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

function getBingoLines(board: boolean[][]) {
  const lines: number[][][] = [];
  // 가로
  for (let i = 0; i < BINGO_SIZE; i++) {
    if (board[i].every((v) => v)) lines.push(Array.from({ length: BINGO_SIZE }, (_, j) => [i, j]));
  }
  // 세로
  for (let j = 0; j < BINGO_SIZE; j++) {
    if (board.every((row) => row[j]))
      lines.push(Array.from({ length: BINGO_SIZE }, (_, i) => [i, j]));
  }
  // 대각선
  if (board.every((row, idx) => row[idx]))
    lines.push(Array.from({ length: BINGO_SIZE }, (v, idx) => [idx, idx]));
  if (board.every((row, idx) => row[BINGO_SIZE - 1 - idx]))
    lines.push(Array.from({ length: BINGO_SIZE }, (v, idx) => [idx, BINGO_SIZE - 1 - idx]));
  return lines;
}

export default function Bingo() {
  const [board, setBoard] = useState(
    Array.from({ length: BINGO_SIZE }, () => Array(BINGO_SIZE).fill(false))
  );
  const [result, setResult] = useState<{
    bingoCount: number;
    checkedCount: number;
    bingoCells: Set<string>;
    bingoLines: number[][][];
  } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // 셀 클릭 핸들러
  const handleCellClick = (row: number, col: number) => {
    if (result) {
      toast("리셋을 해야 다시 체크할 수 있습니다.", {
        duration: 1500,
        position: "bottom-center",
      });
      return;
    }

    const text = bingoTexts[row * BINGO_SIZE + col];

    // 🔹 GA 이벤트 전송
    window.gtag?.("event", "bingo_cell_click", {
      event_category: "Bingo",
      event_label: text,
    });

    setBoard((prev) => {
      const copy = prev.map((r) => [...r]);
      copy[row][col] = !copy[row][col];
      return copy;
    });
  };

  // 리셋
  const handleReset = () => {
    setBoard(Array.from({ length: BINGO_SIZE }, () => Array(BINGO_SIZE).fill(false)));
    setResult(null);
    toast.success("리셋되었습니다.", {
      duration: 1500,
      position: "bottom-center",
    });
  };

  // 빙고 체크 (가로, 세로, 대각선)
  const getBingoResult = () => {
    const lines = getBingoLines(board);
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
    setResult(getBingoResult());
  };

  // 빙고 줄 셀 표시
  const bingoCells = result?.bingoCells ?? new Set<string>();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-lg flex-col items-center bg-gray-100 px-2 py-8 dark:bg-gray-900">
      <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
      <h1 className="mb-2 mt-8 text-center text-3xl font-bold">리버스 1999 빙고</h1>
      <p className="mb-3 text-center text-gray-500 dark:text-gray-300">
        추후 여러 빙고판이 추가될 예정입니다. + 재미로만 즐겨주세요.
      </p>
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
        <span className="flex h-full items-center text-black dark:text-gray-100">
          난이도 : 고인물
        </span>
      </div>
      {result && (
        <div className="w-full max-w-md rounded bg-white p-3 text-center text-sm shadow dark:bg-gray-800 dark:text-gray-100">
          <p>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              빙고 줄 : {result.bingoCount}
            </span>{" "}
            / {TOTAL_BINGO_LINES}
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <span className="font-bold text-green-600 dark:text-green-400">
              체크 : {result.checkedCount}
            </span>{" "}
            / {BINGO_SIZE * BINGO_SIZE}
            <span className="ml-2 font-bold text-black dark:text-gray-100"> 난이도 : 고인물 </span>
          </p>
        </div>
      )}
      <div
        ref={boardRef}
        className="mb-6 grid w-full max-w-full grid-cols-5 gap-1 rounded bg-white p-2 shadow-md dark:bg-gray-800 sm:gap-2 lg:w-[600px]"
      >
        {board.map((row, i) =>
          row.map((checked, j) => {
            const idx = i * BINGO_SIZE + j;
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
