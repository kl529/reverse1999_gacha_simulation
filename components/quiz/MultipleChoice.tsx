"use client";

import { MultipleChoiceQuestion } from "@/lib/types/quizTypes";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  selectedAnswer: number | null;
  onAnswer: (answer: number) => void;
  showResult?: boolean;
  disabled?: boolean;
}

export default function MultipleChoice({
  question,
  selectedAnswer,
  onAnswer,
  showResult = false,
  disabled = false,
}: MultipleChoiceProps) {
  const t = useTranslations("quiz");
  return (
    <div className="flex flex-col gap-4">
      {/* 문제 이미지 (있는 경우) */}
      {question.image && (
        <div className="flex justify-center">
          <div className="relative w-full max-w-xs overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600">
            <Image
              src={question.image}
              alt={t("questionImage")}
              width={400}
              height={400}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* 문제 텍스트 */}
      <p className="text-center text-lg font-medium text-gray-900 dark:text-white">
        {question.question}
      </p>

      {/* 선택지 */}
      <div className="flex flex-col gap-2">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.correctAnswer === index;

          let buttonClass =
            "w-full rounded-lg border-2 px-4 py-3 text-left transition-all duration-200";

          if (showResult) {
            if (isCorrect) {
              buttonClass += " border-green-500 bg-green-100 dark:bg-green-900/30";
            } else if (isSelected && !isCorrect) {
              buttonClass += " border-red-500 bg-red-100 dark:bg-red-900/30";
            } else {
              buttonClass +=
                " border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800";
            }
          } else {
            if (isSelected) {
              buttonClass +=
                " border-blue-500 bg-blue-100 dark:border-blue-400 dark:bg-blue-900/30";
            } else {
              buttonClass +=
                " border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20";
            }
          }

          return (
            <button
              key={index}
              onClick={() => !disabled && onAnswer(index)}
              disabled={disabled}
              className={cn(buttonClass, disabled && "cursor-not-allowed")}
            >
              <span className="mr-2 font-bold text-gray-500 dark:text-gray-400">
                {index + 1}.
              </span>
              <span className="text-gray-900 dark:text-white">{option}</span>
              {showResult && isCorrect && (
                <span className="ml-2 text-green-600 dark:text-green-400">
                  {t("correct")}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
