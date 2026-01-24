"use client";

import { TrueFalseQuestion } from "@/lib/types/quizTypes";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TrueFalseProps {
  question: TrueFalseQuestion;
  selectedAnswer: boolean | null;
  onAnswer: (answer: boolean) => void;
  showResult?: boolean;
  disabled?: boolean;
}

export default function TrueFalse({
  question,
  selectedAnswer,
  onAnswer,
  showResult = false,
  disabled = false,
}: TrueFalseProps) {
  const getButtonClass = (value: boolean) => {
    const isSelected = selectedAnswer === value;
    const isCorrect = question.correctAnswer === value;

    let baseClass =
      "flex-1 rounded-lg border-2 px-6 py-4 text-xl font-bold transition-all duration-200";

    if (showResult) {
      if (isCorrect) {
        baseClass += " border-green-500 bg-green-100 dark:bg-green-900/30";
      } else if (isSelected && !isCorrect) {
        baseClass += " border-red-500 bg-red-100 dark:bg-red-900/30";
      } else {
        baseClass += " border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800";
      }
    } else {
      if (isSelected) {
        baseClass += value
          ? " border-blue-500 bg-blue-100 dark:border-blue-400 dark:bg-blue-900/30"
          : " border-red-400 bg-red-100 dark:border-red-500 dark:bg-red-900/30";
      } else {
        baseClass += value
          ? " border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
          : " border-gray-300 bg-white hover:border-red-300 hover:bg-red-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-red-400 dark:hover:bg-red-900/20";
      }
    }

    return baseClass;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 문제 이미지 (있는 경우) */}
      {question.image && (
        <div className="flex justify-center">
          <div className="relative h-48 w-48 overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600">
            <Image
              src={question.image}
              alt="문제 이미지"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* 문제 텍스트 */}
      <p className="text-center text-lg font-medium text-gray-900 dark:text-white">
        {question.question}
      </p>

      {/* OX 버튼 */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => !disabled && onAnswer(true)}
          disabled={disabled}
          className={cn(getButtonClass(true), disabled && "cursor-not-allowed")}
        >
          <span className="text-blue-600 dark:text-blue-400">O</span>
          {showResult && question.correctAnswer === true && (
            <span className="ml-2 text-sm text-green-600 dark:text-green-400">
              (정답)
            </span>
          )}
        </button>
        <button
          onClick={() => !disabled && onAnswer(false)}
          disabled={disabled}
          className={cn(getButtonClass(false), disabled && "cursor-not-allowed")}
        >
          <span className="text-red-600 dark:text-red-400">X</span>
          {showResult && question.correctAnswer === false && (
            <span className="ml-2 text-sm text-green-600 dark:text-green-400">
              (정답)
            </span>
          )}
        </button>
      </div>

      {/* 결과 해설 */}
      {showResult && question.explanation && (
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {question.explanation}
        </p>
      )}
    </div>
  );
}
