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
      // 멜라니아 금고털기 테마
      if (percentage >= 90)
        return {
          title: "완벽한 털이",
          icon: "💎",
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          borderColor: "border-yellow-400 dark:border-yellow-500/50",
          message: "멜라니아: \"완벽해. 흔적 하나 남기지 않았어.\"",
        };
      if (percentage >= 70)
        return {
          title: "성공적인 잠입",
          icon: "🏆",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          borderColor: "border-green-400 dark:border-green-500/50",
          message: "멜라니아: \"나쁘지 않아. 대부분 가져왔어.\"",
        };
      if (percentage >= 50)
        return {
          title: "아슬아슬한 탈출",
          icon: "🎭",
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-100 dark:bg-purple-900/30",
          borderColor: "border-purple-400 dark:border-purple-500/50",
          message: "멜라니아: \"겨우 빠져나왔네. 다음엔 더 조심해야겠어.\"",
        };
      return {
        title: "발각됨",
        icon: "🚨",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        borderColor: "border-red-400 dark:border-red-500/50",
        message: "멜라니아: \"...철수야. 다음 기회를 노리자.\"",
      };
    } else {
      // 일반 퀴즈 테마
      if (percentage >= 90)
        return {
          title: "완벽!",
          icon: "🌟",
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          borderColor: "border-yellow-400 dark:border-yellow-500/50",
          message: "훌륭합니다! 거의 완벽한 점수예요!",
        };
      if (percentage >= 70)
        return {
          title: "우수",
          icon: "👏",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          borderColor: "border-green-400 dark:border-green-500/50",
          message: "잘하셨어요! 조금만 더 공부하면 완벽해요!",
        };
      if (percentage >= 50)
        return {
          title: "보통",
          icon: "📚",
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
          borderColor: "border-blue-400 dark:border-blue-500/50",
          message: "괜찮아요! 더 연습하면 좋아질 거예요!",
        };
      return {
        title: "아쉬움",
        icon: "💪",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        borderColor: "border-red-400 dark:border-red-500/50",
        message: "다음에는 더 잘할 수 있을 거예요!",
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

      toast.success("결과 이미지가 저장되었습니다!");
    } catch (error) {
      console.error("이미지 생성 실패:", error);
      toast.error("이미지 다운로드에 실패했습니다.");
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
    return quizSet ? `${quizSet.icon} ${quizSet.name}` : "금고";
  };

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-6">
      {/* 닉네임 입력 */}
      <div className="w-full max-w-md">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          닉네임 (선택사항)
        </label>
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
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
            소요 시간:{" "}
            <span className="font-bold text-purple-600 dark:text-purple-400">
              {minutes}분 {seconds}초
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
              <p className="text-gray-500">버틴의 여행가방</p>
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
          {isDownloading ? "저장 중..." : "📷 결과 저장"}
        </Button>
        <Button
          onClick={() => setShowRankingModal(true)}
          className="bg-yellow-500 text-white hover:bg-yellow-600"
        >
          🏆 랭킹 등록
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
              {isMelaniaTheme ? "🚨 실패한 잠금장치" : "❌ 오답 노트"} ({wrongQuestions.length}개)
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
                            alt="문제 이미지"
                            width={400}
                            height={400}
                            className="h-auto w-full object-contain"
                          />
                        </div>
                      </div>
                    )}

                    <div className="ml-8 text-sm">
                      <p className="text-red-600 dark:text-red-400">
                        입력한 답: {answer.userAnswer === null ? "(시간 초과)" : String(answer.userAnswer)}
                      </p>
                      <p className="text-green-600 dark:text-green-400">
                        정답: {getCorrectAnswerText(question)}
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
