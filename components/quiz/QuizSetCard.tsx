"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QuizSetInfo } from "@/lib/types/quizTypes";

// 퀴즈 시도 횟수 제한
const QUIZ_ATTEMPTS_KEY = "quiz_attempts";
const MAX_QUIZ_ATTEMPTS = 5;

function getQuizAttempts(quizSetId: string): number {
  if (typeof window === "undefined") return 0;
  const attempts = localStorage.getItem(`${QUIZ_ATTEMPTS_KEY}_${quizSetId}`);
  return attempts ? parseInt(attempts, 10) : 0;
}

function getRemainingAttempts(quizSetId: string): number {
  return Math.max(0, MAX_QUIZ_ATTEMPTS - getQuizAttempts(quizSetId));
}

interface QuizSetCardProps {
  quizSet: QuizSetInfo;
}

export default function QuizSetCard({ quizSet }: QuizSetCardProps) {
  const [remainingAttempts, setRemainingAttempts] = useState<number>(MAX_QUIZ_ATTEMPTS);

  useEffect(() => {
    setRemainingAttempts(getRemainingAttempts(quizSet.id));
  }, [quizSet.id]);

  const isExhausted = remainingAttempts <= 0;

  if (quizSet.isLocked) {
    return (
      <div
        className="group relative flex flex-col overflow-hidden rounded-xl border-2 p-6 text-left cursor-not-allowed border-gray-300 bg-gray-100 opacity-60 grayscale dark:border-gray-800 dark:bg-gray-950"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-4xl filter drop-shadow-md">
            {quizSet.icon}
          </span>
        </div>

        <h3 className="text-xl font-bold text-muted-foreground">
          {quizSet.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {quizSet.description}
        </p>
      </div>
    );
  }

  return (
    <Link
      href={`/quiz/${quizSet.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl border-2 p-6 text-left transition-all duration-300 ${
        isExhausted
          ? "cursor-not-allowed border-gray-300 bg-gray-100 opacity-60 dark:border-gray-700 dark:bg-gray-900/40"
          : "border-gray-200 bg-white hover:border-purple-400 hover:bg-purple-50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-purple-500/50 dark:hover:bg-gray-800/60"
      }`}
      onClick={(e) => {
        if (isExhausted) {
          e.preventDefault();
        }
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className={`text-4xl filter drop-shadow-md transition-transform duration-300 ${!isExhausted && "group-hover:scale-110"}`}>
          {quizSet.icon}
        </span>
      </div>

      <h3 className={`text-xl font-bold ${
        isExhausted
          ? "text-muted-foreground"
          : "text-card-foreground group-hover:text-purple-700 dark:group-hover:text-purple-300"
      }`}>
        {quizSet.name}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {quizSet.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-purple-700 ring-1 ring-purple-300 dark:bg-purple-900/40 dark:text-purple-300 dark:ring-purple-500/30">
          🔒 {quizSet.questionCount}개 문제
        </span>
        <span className="rounded-full bg-red-100 px-2.5 py-1 text-red-700 ring-1 ring-red-300 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-500/30">
          ⏱️ {quizSet.timePerQuestion}초 제한
        </span>
        <span className={`rounded-full px-2.5 py-1 ring-1 ${
          isExhausted
            ? "bg-gray-100 text-gray-500 ring-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-600"
            : "bg-green-100 text-green-700 ring-green-300 dark:bg-green-900/40 dark:text-green-300 dark:ring-green-500/30"
        }`}>
          🎫 {remainingAttempts}/{MAX_QUIZ_ATTEMPTS}회 남음
        </span>
      </div>
    </Link>
  );
}
