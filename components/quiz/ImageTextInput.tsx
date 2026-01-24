"use client";

import { useState } from "react";
import { ImageTextInputQuestion } from "@/lib/types/quizTypes";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ImageTextInputProps {
  question: ImageTextInputQuestion;
  userAnswer: string;
  onAnswer: (answer: string) => void;
  onSubmit: () => void;
  showResult?: boolean;
  isCorrect?: boolean;
  disabled?: boolean;
}

export default function ImageTextInput({
  question,
  userAnswer,
  onAnswer,
  onSubmit,
  showResult = false,
  isCorrect = false,
  disabled = false,
}: ImageTextInputProps) {
  const [inputValue, setInputValue] = useState(userAnswer);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onAnswer(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing && inputValue.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 문제 텍스트 */}
      <p className="text-center text-lg font-medium text-gray-900 dark:text-white">
        {question.question}
      </p>

      {/* 이미지 */}
      <div className="relative w-full max-w-xs overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600">
        <Image
          src={question.image}
          alt="문제 이미지"
          width={400}
          height={400}
          className="h-auto w-full object-contain"
        />
      </div>

      {/* 입력 필드 */}
      <div className="flex w-full max-w-sm gap-2">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="캐릭터 이름을 입력하세요"
          disabled={disabled}
          className={
            showResult
              ? isCorrect
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-red-500 bg-red-50 dark:bg-red-900/20"
              : ""
          }
        />
        {!showResult && (
          <Button
            onClick={onSubmit}
            disabled={disabled || !inputValue.trim()}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            제출
          </Button>
        )}
      </div>

      {/* 결과 표시 */}
      {showResult && (
        <div className="text-center">
          {isCorrect ? (
            <p className="font-bold text-green-600 dark:text-green-400">
              정답입니다!
            </p>
          ) : (
            <div>
              <p className="font-bold text-red-600 dark:text-red-400">
                오답입니다
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                정답: {question.correctAnswers[0]}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
