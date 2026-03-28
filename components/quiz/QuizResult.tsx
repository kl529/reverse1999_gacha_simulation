"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  QuizResult,
  Question,
  isMultipleChoiceQuestion,
  isImageTextInputQuestion,
  isTextInputQuestion,
  isTrueFalseQuestion,
} from "@/lib/types/quizTypes";
import { QUIZ_SETS, getThemeTexts } from "@/data/quiz_questions";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { toast } from "react-hot-toast";
import Image from "next/image";
import RankingBoard from "./RankingBoard";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface QuizResultProps {
  result: QuizResult;
  questions: Question[];
  onRestart: () => void;
}

export default function QuizResultComponent({
  result,
  questions,
  onRestart,
}: QuizResultProps) {
  const t = useTranslations("quiz");
  const resultRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const today = new Date();
    setFormattedDate(
      today.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
  }, []);

  // 점수 계산
  const percentage = Math.round(
    (result.correctCount / result.totalQuestions) * 100
  );
  const totalTimeInSeconds = Math.floor(result.totalTime / 1000);
  const minutes = Math.floor(totalTimeInSeconds / 60);
  const seconds = totalTimeInSeconds % 60;

  // 테마 텍스트 가져오기
  const themeTexts = getThemeTexts(result.quizSetId);
  const isMelaniaTheme = result.quizSetId === "quiz_set_1";

  // 등급 계산 - 테마별 결과
  const getQuizResult = () => {
    if (isMelaniaTheme) {
      if (percentage >= 90)
        return {
          title: t("resultPerfect"),
          icon: "💎",
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          borderColor: "border-yellow-400 dark:border-yellow-500/50",
          message: t("resultPerfectMsg"),
        };
      if (percentage >= 70)
        return {
          title: t("resultGood"),
          icon: "🏆",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          borderColor: "border-green-400 dark:border-green-500/50",
          message: t("resultGoodMsg"),
        };
      if (percentage >= 50)
        return {
          title: t("resultAverage"),
          icon: "🎭",
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-100 dark:bg-purple-900/30",
          borderColor: "border-purple-400 dark:border-purple-500/50",
          message: t("resultAverageMsg"),
        };
      return {
        title: t("resultFail"),
        icon: "🚨",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        borderColor: "border-red-400 dark:border-red-500/50",
        message: t("resultFailMsg"),
      };
    } else {
      if (percentage >= 90)
        return {
          title: t("resultPerfectGeneral"),
          icon: "🌟",
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          borderColor: "border-yellow-400 dark:border-yellow-500/50",
          message: t("resultPerfectGeneralMsg"),
        };
      if (percentage >= 70)
        return {
          title: t("resultGoodGeneral"),
          icon: "👏",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          borderColor: "border-green-400 dark:border-green-500/50",
          message: t("resultGoodGeneralMsg"),
        };
      if (percentage >= 50)
        return {
          title: t("resultAverageGeneral"),
          icon: "📚",
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
          borderColor: "border-blue-400 dark:border-blue-500/50",
          message: t("resultAverageGeneralMsg"),
        };
      return {
        title: t("resultFailGeneral"),
        icon: "💪",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        borderColor: "border-red-400 dark:border-red-500/50",
        message: t("resultFailGeneralMsg"),
      };
    }
  };

  const quizResult = getQuizResult();

  // 오답 문제 추출
  const wrongAnswers = result.answers.filter((a) => !a.isCorrect);
  const wrongQuestions = wrongAnswers.map((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    return { question, answer };
  });

  // 이미지 다운로드
  const handleDownload = useCallback(async () => {
    if (!resultRef.current) return;

    setIsDownloading(true);
    try {
      // 현재 테마에 따른 배경색 설정
      const isDarkMode = resolvedTheme === "dark";
      const backgroundColor = isDarkMode ? "#1f2937" : "#ffffff";

      const currentWidth = resultRef.current.offsetWidth;
      const maxWidth = 500;
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
      link.download = `quiz-result-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      toast.success(t("imageSaved"));
    } catch (error) {
      console.error("Image generation failed:", error);
      toast.error(t("imageError"));
    } finally {
      setIsDownloading(false);
    }
  }, [resolvedTheme]);

  // 정답 표시 헬퍼
  const getCorrectAnswerText = (question: Question): string => {
    if (isMultipleChoiceQuestion(question)) {
      return question.options[question.correctAnswer];
    } else if (isImageTextInputQuestion(question)) {
      return question.correctAnswers[0];
    } else if (isTextInputQuestion(question)) {
      return question.correctAnswers[0];
    } else if (isTrueFalseQuestion(question)) {
      return question.correctAnswer ? "O" : "X";
    }
    return "";
  };

  // 퀴즈 세트 이름 가져오기
  const getQuizSetName = () => {
    const quizSet = QUIZ_SETS.find((v) => v.id === result.quizSetId);
    return quizSet ? `${quizSet.icon} ${quizSet.name}` : t("vault");
  };

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-6">
      {/* 닉네임 입력 */}
      <div className="w-full max-w-md">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("nicknameLabelOptional")}
        </label>
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={t("nicknamePlaceholder")}
          maxLength={20}
          className="w-full"
        />
      </div>

      {/* 결과 카드 (다운로드용) */}
      <div
        ref={resultRef}
        className={`w-full max-w-md rounded-lg border-2 ${quizResult.borderColor} ${quizResult.bgColor} p-6 shadow-lg`}
      >
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {themeTexts.resultTitle}
        </h2>
        <p className="mb-1 text-center text-sm text-gray-600 dark:text-gray-400">
          {getQuizSetName()}
        </p>
        {nickname.trim() && (
          <p className="mb-4 text-center text-sm font-medium text-purple-600 dark:text-purple-400">
            by {nickname.trim()}
          </p>
        )}
        {!nickname.trim() && <div className="mb-4" />}

        {/* 결과 아이콘 */}
        <div className="mb-4 flex justify-center">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full border-4 ${quizResult.color} border-current bg-white/50 dark:bg-gray-800/50`}
          >
            <span className="text-5xl">{quizResult.icon}</span>
          </div>
        </div>

        {/* 결과 타이틀 */}
        <div className="mb-4 text-center">
          <p className={`text-2xl font-bold ${quizResult.color}`}>
            {quizResult.title}
          </p>
        </div>

        {/* 점수 */}
        <div className="mb-4 text-center">
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {result.correctCount}{" "}
            <span className="text-xl text-gray-500 dark:text-gray-400">
              / {result.totalQuestions}
            </span>
          </p>
        </div>

        {/* 시간 */}
        <div className="mb-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {t("elapsedTime")}{" "}
            <span className="font-bold text-purple-600 dark:text-purple-400">
              {t("minutesSeconds", { minutes, seconds })}
            </span>
          </p>
        </div>

        {/* 코멘트 */}
        <div className="mb-4 rounded-lg bg-white/50 p-3 text-center dark:bg-gray-800/50">
          <p className={`${quizResult.color} text-sm`}>
            {quizResult.message}
          </p>
        </div>

        {/* 날짜 & 사이트 정보 */}
        <div className="border-t border-gray-300 pt-3 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs">
            <p className="text-gray-500">{formattedDate}</p>
            <div className="text-right">
              <p className="text-gray-500">{t("siteName")}</p>
              <p className="text-purple-600 dark:text-purple-400">reverse1999-simulator.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          {isDownloading ? t("saving") : t("saveResult")}
        </Button>
        <Button
          onClick={() => setShowRankingModal(true)}
          className="bg-yellow-500 text-white hover:bg-yellow-600"
        >
          {t("registerRanking")}
        </Button>
        <Button
          onClick={onRestart}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          🔄 {themeTexts.retryButton}
        </Button>
      </div>

      {/* 오답 노트 토글 */}
      {wrongQuestions.length > 0 && (
        <div className="w-full max-w-2xl">
          <button
            onClick={() => setShowWrongAnswers(!showWrongAnswers)}
            className="flex w-full items-center justify-between rounded-lg bg-red-100 px-4 py-3 text-red-700 dark:bg-red-900/30 dark:text-red-300"
          >
            <span className="font-semibold">
              {isMelaniaTheme ? t("failedLocks") : t("wrongNotes")} {t("wrongCount", { count: wrongQuestions.length })}
            </span>
            <span>{showWrongAnswers ? "▲" : "▼"}</span>
          </button>

          {showWrongAnswers && (
            <div className="mt-2 space-y-4 rounded-lg border-2 border-red-300 bg-white p-4 dark:border-red-900/50 dark:bg-gray-900/80">
              {wrongQuestions.map(({ question, answer }, index) => {
                if (!question) return null;
                return (
                  <div
                    key={question.id}
                    className="border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700"
                  >
                    <div className="mb-2 flex items-start gap-2">
                      <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="text-gray-900 dark:text-white">{question.question}</p>
                    </div>

                    {/* 이미지가 있는 경우 */}
                    {(isImageTextInputQuestion(question) ||
                      (isMultipleChoiceQuestion(question) && question.image) ||
                      (isTrueFalseQuestion(question) && question.image)) && (
                      <div className="mb-2 flex justify-center">
                        <div className="relative w-full max-w-xs overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
                          <Image
                            src={
                              isImageTextInputQuestion(question)
                                ? question.image
                                : isMultipleChoiceQuestion(question)
                                  ? question.image || ""
                                  : isTrueFalseQuestion(question)
                                    ? question.image || ""
                                    : ""
                            }
                            alt={t("questionImage")}
                            width={400}
                            height={400}
                            className="h-auto w-full object-contain"
                          />
                        </div>
                      </div>
                    )}

                    <div className="ml-8 text-sm">
                      <p className="text-red-600 dark:text-red-400">
                        {t("yourAnswer", { answer: answer.userAnswer === null ? t("timeExpired") : String(answer.userAnswer) })}
                      </p>
                      <p className="text-green-600 dark:text-green-400">
                        {t("correctAnswerIs", { answer: getCorrectAnswerText(question) })}
                      </p>
                      {question.explanation && (
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          💡 {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 랭킹 모달 */}
      {showRankingModal && (
        <RankingBoard
          result={result}
          onClose={() => setShowRankingModal(false)}
        />
      )}
    </div>
  );
}
