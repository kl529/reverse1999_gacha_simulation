// deprecated
"use client";

import { useState } from "react";
import { percentRankTable } from "@/data/percent_rank_table"; // 상위 확률표 사용

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shapes = ["명함", "1형", "2형", "3형", "4형", "5형"];

function getShapeRankPercent(N: number, shape: string): number | null {
  if (!percentRankTable[N]) return null;
  if (percentRankTable[N][shape] == null) return null;
  return percentRankTable[N][shape];
}

export default function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
  const [pullsInput, setPullsInput] = useState<number>(0); // 몇 뽑 했는지
  const [selectedShape, setSelectedShape] = useState<string>("명함"); // 형상 드롭다운
  const [calcResult, setCalcResult] = useState<number | null>(null); // 계산 결과(상위 %)
  const [errorMessage, setErrorMessage] = useState<string>(""); // 에러 메시지 상태

  // 입력값 변경 시
  const handlePullsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);

    // 최소 0, 최대 840
    if (val < 0) {
      setPullsInput(0);
      setErrorMessage("0 이상만 입력 가능합니다.");
    } else if (val > 840) {
      setPullsInput(840);
      setErrorMessage("최대 840뽑까지만 입력 가능합니다.");
    } else {
      setPullsInput(val);
      setErrorMessage("");
    }
    // 기존 결과 삭제 (재입력 시 결과를 초기화해도 되고, 원하면 유지해도 됨)
    setCalcResult(null);
  };

  // 계산 버튼 클릭 시
  const handleCalculate = () => {
    // 혹시 pullsInput이 0보다 작거나 840보다 큰 경우가 있을 수도 있음
    // => 이미 위에서 제한했으므로 여기서도 한번 더 체크 가능
    if (pullsInput < 0 || pullsInput > 840) {
      setCalcResult(null);
      setErrorMessage("0 ~ 840 범위 내 숫자를 입력하세요.");
      return;
    }

    const rank = getShapeRankPercent(pullsInput, selectedShape);
    setCalcResult(rank);
  };

  if (!isOpen) return null; // 모달이 닫혀 있으면 아무 것도 렌더링 안 함

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 막기
        className="relative w-full max-w-sm rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-2xl font-bold text-gray-700 dark:text-gray-200"
        >
          ✕
        </button>

        <h2 className="mb-4 text-center text-xl font-semibold dark:text-gray-100">
          나는 상위 몇 %일까?
        </h2>

        {/* (1) 뽑기 횟수 입력 */}
        <label className="mb-2 block text-sm dark:text-gray-200">
          몇 뽑 하셨나요? (최대 840뽑)
        </label>
        <input
          type="number"
          value={pullsInput}
          onChange={handlePullsChange}
          className="mb-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="예) 100"
        />
        {/* 에러 메시지 표시 */}
        {errorMessage && <p className="mb-4 text-sm text-red-500">{errorMessage}</p>}

        {/* (2) 형상 드롭다운 */}
        <label className="mb-2 block text-sm dark:text-gray-200">
          픽업 캐릭터 형상을 선택하세요
        </label>
        <select
          value={selectedShape}
          onChange={(e) => setSelectedShape(e.target.value)}
          className="mb-4 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          {shapes.map((shape) => (
            <option key={shape} value={shape}>
              {shape}
            </option>
          ))}
        </select>

        {/* 계산 버튼 */}
        <button
          onClick={handleCalculate}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          계산
        </button>

        {/* 결과 표시 */}
        {calcResult !== null && (
          <p className="mt-4 text-center dark:text-gray-100">
            당신은 상위 <span className="font-bold">{calcResult}%</span> 입니다!
          </p>
        )}
      </div>
    </div>
  );
}
