"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

import {
  Question,
  QuizPhase,
  QuizResult,
  UserAnswer,
  QuizSetId,
  isMultipleChoiceQuestion,
  isImageTextInputQuestion,
  isTextInputQuestion,
  isTrueFalseQuestion,
} from "@/lib/types/quizTypes";
import {
  getRandomQuestionsByQuizSet,
  getQuizSetInfo,
  getThemeTexts,
  QUIZ_SETS,
} from "@/data/quiz_questions";

import QuestionCard from "./QuestionCard";
import QuizResultComponent from "./QuizResult";
import QuizHeader from "./QuizHeader";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import { analytics } from "@/lib/posthog";

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

// 퀴즈 시도 횟수 제한
const QUIZ_ATTEMPTS_KEY = "quiz_attempts";
const MAX_QUIZ_ATTEMPTS = 5;

function getQuizAttempts(quizSetId: string): number {
  if (typeof window === "undefined") return 0;
  const attempts = localStorage.getItem(`${QUIZ_ATTEMPTS_KEY}_${quizSetId}`);
  return attempts ? parseInt(attempts, 10) : 0;
}

function incrementQuizAttempts(quizSetId: string): number {
  if (typeof window === "undefined") return 0;
  const current = getQuizAttempts(quizSetId);
  const newCount = current + 1;
  localStorage.setItem(`${QUIZ_ATTEMPTS_KEY}_${quizSetId}`, newCount.toString());
  return newCount;
}

function getRemainingAttempts(quizSetId: string): number {
  return Math.max(0, MAX_QUIZ_ATTEMPTS - getQuizAttempts(quizSetId));
}

interface QuizProps {
  initialQuizSetId?: QuizSetId;
}

export default function Quiz({ initialQuizSetId }: QuizProps) {
  // 퀴즈 상태 - initialQuizSetId가 있으면 바로 warning 페이지로
  const [phase, setPhase] = useState<QuizPhase>(initialQuizSetId ? "warning" : "setup");
  const [selectedQuizSet, setSelectedQuizSet] = useState<QuizSetId>(initialQuizSetId || "quiz_set_1");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, UserAnswer>>(new Map());
  const [startTime, setStartTime] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  // 현재 문제의 임시 답변 (제출 전)
  const [currentAnswer, setCurrentAnswer] = useState<
    number | string | boolean | null
  >(null);
  const [showQuestionResult, setShowQuestionResult] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // 타이머
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(10);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 남은 시도 횟수
  const [remainingAttempts, setRemainingAttempts] = useState<number>(MAX_QUIZ_ATTEMPTS);

  // 초기 남은 횟수 로드
  useEffect(() => {
    setRemainingAttempts(getRemainingAttempts(selectedQuizSet));
  }, [selectedQuizSet]);


  // 전체 타이머 업데이트
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (phase === "playing" && startTime) {
      timerId = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [phase, startTime]);

  // 문제별 10초 타이머
  useEffect(() => {
    if (phase === "playing" && !showQuestionResult) {
      const quizSetInfo = getQuizSetInfo(selectedQuizSet);
      const timeLimit = quizSetInfo?.timePerQuestion || 10;
      setQuestionTimeLeft(timeLimit);

      questionTimerRef.current = setInterval(() => {
        setQuestionTimeLeft((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (questionTimerRef.current) {
          clearInterval(questionTimerRef.current);
        }
      };
    }
  }, [phase, currentIndex, showQuestionResult, selectedQuizSet]);

  // 시간 초과 감지 및 처리
  useEffect(() => {
    if (questionTimeLeft === 0 && phase === "playing" && !showQuestionResult) {
      // 타이머 정지
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
      }

      const currentQuestion = questions[currentIndex];
      if (!currentQuestion) return;

      const timeSpent = Date.now() - questionStartTime;

      // 오답으로 처리
      const userAnswer: UserAnswer = {
        questionId: currentQuestion.id,
        userAnswer: null,
        isCorrect: false,
        timeSpent,
      };

      setAnswers((prev) => {
        const newAnswers = new Map(prev);
        newAnswers.set(currentQuestion.id, userAnswer);
        return newAnswers;
      });

      setShowQuestionResult(true);
      const themeTexts = getThemeTexts(selectedQuizSet);
      toast.error(themeTexts.timeoutToast);
    }
  }, [questionTimeLeft, phase, showQuestionResult, questions, currentIndex, questionStartTime, selectedQuizSet]);

  // 경고 확인 후 시험 시작
  const handleConfirmWarning = useCallback(() => {
    // 시도 횟수 체크
    const currentRemaining = getRemainingAttempts(selectedQuizSet);
    if (currentRemaining <= 0) {
      toast.error("오늘의 시도 횟수를 모두 사용했습니다!");
      return;
    }

    // 시도 횟수 증가
    incrementQuizAttempts(selectedQuizSet);
    setRemainingAttempts(currentRemaining - 1);

    const quizSetInfo = getQuizSetInfo(selectedQuizSet);

    // Analytics 트래킹
    analytics.generalQuiz.started(selectedQuizSet, quizSetInfo?.name || selectedQuizSet);
    window.gtag?.("event", "general_quiz_started", {
      event_category: "GeneralQuiz",
      quiz_set_id: selectedQuizSet,
      quiz_set_name: quizSetInfo?.name || selectedQuizSet,
    });

    const selectedQuestions = getRandomQuestionsByQuizSet(selectedQuizSet);

    // 5지선다 문제의 선택지 랜덤 섞기
    const shuffledQuestions = selectedQuestions.map((q) => {
      if (isMultipleChoiceQuestion(q)) {
        // 선택지와 원래 인덱스를 함께 저장
        const optionsWithIndex = q.options.map((opt, idx) => ({ opt, idx }));
        // Fisher-Yates 셔플
        for (let i = optionsWithIndex.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
        }
        // 섞인 후 정답의 새 인덱스 찾기
        const newCorrectAnswer = optionsWithIndex.findIndex(
          (item) => item.idx === q.correctAnswer
        );
        // 새로운 옵션 배열 생성
        const newOptions = optionsWithIndex.map((item) => item.opt);

        return {
          ...q,
          options: newOptions,
          correctAnswer: newCorrectAnswer,
        };
      }
      return q;
    });

    setQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setAnswers(new Map());
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setCurrentAnswer(null);
    setShowQuestionResult(false);
    setResult(null);
    setPhase("playing");
  }, [selectedQuizSet]);

  // 금고 선택 후 경고 화면으로
  const handleStartExam = useCallback(() => {
    setPhase("warning");
  }, []);

  // 답변 선택
  const handleAnswer = (answer: number | string | boolean) => {
    if (showQuestionResult) return;
    setCurrentAnswer(answer);

    // 5지선다나 OX는 바로 제출
    const currentQuestion = questions[currentIndex];
    if (
      isMultipleChoiceQuestion(currentQuestion) ||
      isTrueFalseQuestion(currentQuestion)
    ) {
      submitAnswer(answer);
    }
  };

  // 답변 제출
  const submitAnswer = useCallback(
    (answer: number | string | boolean | null = currentAnswer) => {
      if (answer === null || showQuestionResult) return;

      // 타이머 정지
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
      }

      const currentQuestion = questions[currentIndex];
      const timeSpent = Date.now() - questionStartTime;

      // 정답 체크
      let isCorrect = false;
      if (isMultipleChoiceQuestion(currentQuestion)) {
        isCorrect = currentQuestion.correctAnswer === answer;
      } else if (isImageTextInputQuestion(currentQuestion)) {
        const userAnswerNormalized = String(answer)
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "");
        isCorrect = currentQuestion.correctAnswers.some(
          (correct) =>
            correct.toLowerCase().replace(/\s+/g, "") === userAnswerNormalized
        );
      } else if (isTextInputQuestion(currentQuestion)) {
        const userAnswerNormalized = String(answer)
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "");
        isCorrect = currentQuestion.correctAnswers.some(
          (correct) =>
            correct.toLowerCase().replace(/\s+/g, "") === userAnswerNormalized
        );
      } else if (isTrueFalseQuestion(currentQuestion)) {
        isCorrect = currentQuestion.correctAnswer === answer;
      }

      // 답변 저장
      const userAnswer: UserAnswer = {
        questionId: currentQuestion.id,
        userAnswer: answer,
        isCorrect,
        timeSpent,
      };

      setAnswers((prev) => {
        const newAnswers = new Map(prev);
        newAnswers.set(currentQuestion.id, userAnswer);
        return newAnswers;
      });

      // 결과 표시
      setShowQuestionResult(true);

      const themeTexts = getThemeTexts(selectedQuizSet);
      if (isCorrect) {
        toast.success(themeTexts.correctToast);
      } else {
        toast.error(themeTexts.wrongToast);
      }
    },
    [currentAnswer, questions, currentIndex, questionStartTime, showQuestionResult, selectedQuizSet]
  );

  // 오답 개수 계산
  const wrongCount = Array.from(answers.values()).filter((a) => !a.isCorrect).length;
  const MAX_WRONG_ANSWERS = 3;

  // 시험 종료
  const finishExam = useCallback((forcedByStrikes = false) => {
    const totalTime = startTime ? Date.now() - startTime : 0;
    const answersArray = Array.from(answers.values());
    const correctCount = answersArray.filter((a) => a.isCorrect).length;

    const quizResult: QuizResult = {
      totalQuestions: questions.length,
      correctCount,
      totalTime,
      answers: answersArray,
      completedAt: new Date(),
      quizSetId: selectedQuizSet,
    };

    setResult(quizResult);
    setPhase("result");

    // Analytics 트래킹
    const timeInSeconds = Math.floor(totalTime / 1000);
    analytics.generalQuiz.completed(selectedQuizSet, correctCount, questions.length, timeInSeconds);
    window.gtag?.("event", "general_quiz_completed", {
      event_category: "GeneralQuiz",
      quiz_set_id: selectedQuizSet,
      score: correctCount,
      total_questions: questions.length,
      accuracy: Math.round((correctCount / questions.length) * 100),
      time_in_seconds: timeInSeconds,
    });

    if (forcedByStrikes) {
      const themeTexts = getThemeTexts(selectedQuizSet);
      toast.error(themeTexts.failToast);
    }
  }, [startTime, answers, questions.length, selectedQuizSet]);

  // 다음 문제로 이동
  const handleNextQuestion = useCallback(() => {
    // 오답이 3개면 강제 종료
    const currentWrongCount = Array.from(answers.values()).filter((a) => !a.isCorrect).length;
    if (currentWrongCount >= MAX_WRONG_ANSWERS) {
      finishExam(true);
      return;
    }

    if (currentIndex + 1 >= questions.length) {
      // 시험 종료
      finishExam(false);
    } else {
      // 타이머를 먼저 리셋하여 시간 초과 감지 useEffect가 잘못 트리거되지 않도록 함
      const quizSetInfo = getQuizSetInfo(selectedQuizSet);
      const timeLimit = quizSetInfo?.timePerQuestion || 10;
      setQuestionTimeLeft(timeLimit);

      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer(null);
      setShowQuestionResult(false);
      setQuestionStartTime(Date.now());
    }
  }, [currentIndex, questions.length, finishExam, answers, selectedQuizSet]);

  // 다시 시작
  const handleRestart = () => {
    // initialQuizSetId가 있으면 warning으로, 없으면 setup으로
    setPhase(initialQuizSetId ? "warning" : "setup");
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers(new Map());
    setStartTime(null);
    setElapsedTime(0);
    setResult(null);
    setCurrentAnswer(null);
    setShowQuestionResult(false);
  };

  // 시간 포맷
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 현재 문제
  const currentQuestion = questions[currentIndex];
  const currentUserAnswer = currentQuestion
    ? answers.get(currentQuestion.id)
    : null;

  return (
    <div className="flex w-full flex-col items-center bg-transparent px-4 py-8 text-gray-900 selection:bg-purple-500/30 dark:text-white">
      <Toaster position="top-center" toastOptions={{ duration: 1500 }} />

      {/* 헤더 - 멜라니아 테마 */}
      <QuizHeader />


      {/* 설정 화면 - 금고 선택 */}
      {phase === "setup" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex w-full max-w-4xl flex-col items-center gap-6 rounded-2xl border border-border bg-card p-4 shadow-2xl backdrop-blur-xl sm:gap-8 sm:p-6 md:p-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-card-foreground">
              다양한 컨셉의 퀴즈를 풀어보세요.
            </h2>
          </div>

          {/* 퀴즈 선택 */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {QUIZ_SETS.map((quizSet) => {
              const isSelected = selectedQuizSet === quizSet.id;
              const isLocked = quizSet.isLocked;
              return (
                <button
                  key={quizSet.id}
                  onClick={() => !isLocked && setSelectedQuizSet(quizSet.id)}
                  disabled={isLocked}
                  className={`group relative flex flex-col overflow-hidden rounded-xl border-2 p-6 text-left transition-all duration-300 ${
                    isLocked
                      ? "cursor-not-allowed border-gray-300 bg-gray-100 opacity-60 grayscale dark:border-gray-800 dark:bg-gray-950"
                      : isSelected
                        ? "border-purple-500 bg-purple-100 shadow-[0_0_30px_rgba(168,85,247,0.2)] dark:bg-purple-900/20"
                        : "border-gray-200 bg-white hover:border-purple-400 hover:bg-purple-50 dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-purple-500/50 dark:hover:bg-gray-800/60"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-4xl filter drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                      {quizSet.icon}
                    </span>
                    {isSelected && !isLocked && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs text-white">
                        ✓
                      </span>
                    )}
                  </div>

                  <h3 className={`text-xl font-bold ${isLocked ? "text-muted-foreground" : isSelected ? "text-purple-700 dark:text-purple-300" : "text-card-foreground"}`}>
                    {quizSet.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {quizSet.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                    {!isLocked && (
                      <>
                        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-purple-700 ring-1 ring-purple-300 dark:bg-purple-900/40 dark:text-purple-300 dark:ring-purple-500/30">
                          🔒 {quizSet.questionCount}개 문제
                        </span>
                        <span className="rounded-full bg-red-100 px-2.5 py-1 text-red-700 ring-1 ring-red-300 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-500/30">
                          ⏱️ {quizSet.timePerQuestion}초 제한
                        </span>
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 퀴즈 시작 버튼 */}
          <Button
            onClick={handleStartExam}
            disabled={!selectedQuizSet}
            className="w-full max-w-sm transform bg-gradient-to-r from-purple-600 to-indigo-600 py-6 text-lg font-bold shadow-lg transition-all hover:scale-105 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {getThemeTexts(selectedQuizSet).startButton}
          </Button>
        </motion.div>
      )}

      {/* 경고 화면 */}
      {phase === "warning" && (() => {
        const themeTexts = getThemeTexts(selectedQuizSet);
        const quizSetInfo = getQuizSetInfo(selectedQuizSet);
        const isMelaniaTheme = selectedQuizSet === "quiz_set_1";

        return (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`mt-4 flex w-full max-w-lg flex-col items-center gap-4 rounded-xl border p-4 backdrop-blur-md sm:gap-6 sm:p-6 md:p-8 ${
              isMelaniaTheme
                ? "border-purple-300 bg-purple-50 shadow-[0_0_50px_rgba(168,85,247,0.1)] dark:border-purple-500/30 dark:bg-gray-900/90 dark:shadow-[0_0_50px_rgba(168,85,247,0.15)]"
                : "border-blue-300 bg-blue-50 shadow-[0_0_50px_rgba(59,130,246,0.1)] dark:border-blue-500/30 dark:bg-gray-900/90 dark:shadow-[0_0_50px_rgba(59,130,246,0.15)]"
            }`}
          >
            {/* 아이콘 */}
            <div className={`rounded-full p-4 ring-1 ${
              isMelaniaTheme
                ? "bg-purple-100 ring-purple-300 dark:bg-purple-500/10 dark:ring-purple-500/50"
                : "bg-blue-100 ring-blue-300 dark:bg-blue-500/10 dark:ring-blue-500/50"
            }`}>
              <span className="text-5xl">{quizSetInfo?.icon || "📝"}</span>
            </div>

            {/* 제목 */}
            <div className="text-center">
              <h2 className={`text-2xl font-bold ${
                isMelaniaTheme ? "text-purple-700 dark:text-purple-400" : "text-blue-700 dark:text-blue-400"
              }`}>
                {quizSetInfo?.name}
              </h2>
            </div>

            {/* 캐릭터 메시지 (멜라니아 테마) */}
            {isMelaniaTheme && themeTexts.warningCharacterImage && (
              <div className="flex w-full items-start gap-4 rounded-lg bg-purple-100 p-4 dark:bg-gray-800/50">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-purple-400 dark:border-purple-500/50">
                  <Image
                    src={themeTexts.warningCharacterImage}
                    alt={themeTexts.warningCharacterName || "Character"}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-purple-700 dark:text-purple-400">{themeTexts.warningCharacterName}</p>
                  <p className="text-sm italic text-gray-700 dark:text-gray-300">&quot;{themeTexts.warningMessage}&quot;</p>
                </div>
              </div>
            )}

            {/* 퀴즈 규칙 */}
            <div className="w-full space-y-3 rounded-lg bg-white/80 p-4 text-sm dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <span className={`flex h-6 w-6 items-center justify-center rounded-sm ${
                  isMelaniaTheme ? "bg-purple-200 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400" : "bg-blue-200 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                }`}>⏱️</span>
                <span className="text-gray-700 dark:text-gray-300">
                  {isMelaniaTheme ? "각 잠금장치" : "각 문제"} 제한 시간{" "}
                  <span className={`font-bold ${isMelaniaTheme ? "text-purple-700 dark:text-purple-400" : "text-blue-700 dark:text-blue-400"}`}>
                    {quizSetInfo?.timePerQuestion || 10}초
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-yellow-200 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">⚡</span>
                <span className="text-gray-700 dark:text-gray-300">시간 초과 시 오답 처리</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-red-200 text-red-700 dark:bg-red-500/20 dark:text-red-400">❤️</span>
                <span className="text-gray-700 dark:text-gray-300">
                  목숨 <span className="font-bold text-red-600 dark:text-red-400">3개</span> (3회 실패 시 종료)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`flex h-6 w-6 items-center justify-center rounded-sm ${
                  isMelaniaTheme ? "bg-purple-200 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400" : "bg-blue-200 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                }`}>📝</span>
                <span className="text-gray-700 dark:text-gray-300">
                  총 <span className={`font-bold ${isMelaniaTheme ? "text-purple-700 dark:text-purple-400" : "text-blue-700 dark:text-blue-400"}`}>
                    {quizSetInfo?.questionCount || 20}개
                  </span> 문제
                </span>
              </div>
            </div>

            {/* 남은 시도 횟수 */}
            <div className={`w-full rounded-lg p-3 text-center ${
              remainingAttempts > 0
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            }`}>
              <span className={`text-sm font-medium ${
                remainingAttempts > 0
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }`}>
                🎫 남은 시도 횟수: <span className="font-bold">{remainingAttempts}</span> / {MAX_QUIZ_ATTEMPTS}
              </span>
            </div>

            {/* 버튼 */}
            <div className="flex w-full gap-4">
              <Button
                onClick={() => setPhase("setup")}
                variant="outline"
                className="flex-1 border-gray-300 bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {themeTexts.cancelButton}
              </Button>
              <Button
                onClick={handleConfirmWarning}
                disabled={remainingAttempts <= 0}
                className={`flex-1 text-white shadow-lg ${
                  remainingAttempts <= 0
                    ? "cursor-not-allowed bg-gray-400 opacity-50"
                    : isMelaniaTheme
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 hover:shadow-purple-500/25"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 hover:shadow-blue-500/25"
                }`}
              >
                {remainingAttempts <= 0 ? "시도 횟수 소진" : themeTexts.confirmButton}
              </Button>
            </div>
          </motion.div>
        );
      })()}

      {/* 퀴즈 진행 화면 */}
      {phase === "playing" && currentQuestion && (() => {
        const themeTexts = getThemeTexts(selectedQuizSet);
        const quizSetInfo = getQuizSetInfo(selectedQuizSet);
        const isMelaniaTheme = selectedQuizSet === "quiz_set_1";
        const timeLimit = quizSetInfo?.timePerQuestion || 10;

        return (
        <div className="mt-4 flex w-full flex-col items-center gap-4">
          {/* 상단 정보 */}
          <div className={`flex w-full max-w-2xl items-center justify-between rounded-xl border px-6 py-3 shadow-lg backdrop-blur-md ${
            isMelaniaTheme
              ? "border-purple-200 bg-purple-50/80 dark:border-purple-500/20 dark:bg-gray-900/60"
              : "border-blue-200 bg-blue-50/80 dark:border-blue-500/20 dark:bg-gray-900/60"
          }`}>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400">{themeTexts.progressLabel}</span>
                <span className={`text-lg font-bold ${isMelaniaTheme ? "text-purple-700 dark:text-purple-300" : "text-blue-700 dark:text-blue-300"}`}>
                   {currentIndex + 1} <span className="text-gray-400 dark:text-gray-600">/</span> {questions.length}
                </span>
              </div>
              <div className="h-8 w-px bg-gray-300 dark:bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400">TIME</span>
                <span className={`font-mono text-lg font-bold ${isMelaniaTheme ? "text-purple-700 dark:text-purple-400" : "text-blue-700 dark:text-blue-400"}`}>
                  {formatTime(elapsedTime)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 dark:text-gray-400">{themeTexts.successLabel}</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {Array.from(answers.values()).filter((a) => a.isCorrect).length}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: MAX_WRONG_ANSWERS }).map((_, i) => (
                  <div key={i} className="relative">
                     {i < MAX_WRONG_ANSWERS - wrongCount ? (
                        <span className="text-xl text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">❤️</span>
                     ) : (
                        <span className="text-xl text-gray-400 dark:text-gray-700">🖤</span>
                     )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 문제별 타이머 */}
          {!showQuestionResult && (
            <div className="relative w-full max-w-2xl px-1">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-gray-600 dark:text-gray-400">{themeTexts.timerWarning}</span>
                <span
                  className={`${
                    questionTimeLeft <= 3
                      ? "animate-pulse text-red-600 dark:text-red-500"
                      : questionTimeLeft <= 5
                        ? "text-yellow-600 dark:text-yellow-500"
                        : "text-green-600 dark:text-green-500"
                  }`}
                >
                  {questionTimeLeft}초
                </span>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-200 ring-1 ring-gray-300 dark:bg-gray-800 dark:ring-white/10">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: `${(questionTimeLeft / timeLimit) * 100}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                  className={`h-full bg-gradient-to-r ${
                    questionTimeLeft <= 3
                      ? "from-red-600 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                      : questionTimeLeft <= 5
                        ? "from-yellow-600 to-yellow-500"
                        : isMelaniaTheme
                          ? "from-purple-600 to-purple-500"
                          : "from-blue-600 to-blue-500"
                  }`}
                />
              </div>
            </div>
          )}

          {/* 문제 카드 */}
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            userAnswer={currentAnswer}
            onAnswer={handleAnswer}
            onSubmit={() => submitAnswer()}
            showResult={showQuestionResult}
            isCorrect={currentUserAnswer?.isCorrect || false}
            disabled={showQuestionResult}
          />

          {/* 다음 버튼 */}
          {showQuestionResult && (
            <Button
              onClick={handleNextQuestion}
              className={`mt-2 px-8 py-3 text-lg font-bold ${
                isMelaniaTheme
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {currentIndex + 1 >= questions.length
                ? `🏆 ${themeTexts.finishButton}`
                : `➡️ ${themeTexts.nextButton}`}
            </Button>
          )}
        </div>
        );
      })()}

      {/* 결과 화면 */}
      {phase === "result" && result && (
        <QuizResultComponent
          result={result}
          questions={questions}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
