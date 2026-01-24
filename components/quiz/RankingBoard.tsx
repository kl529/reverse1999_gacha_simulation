"use client";

import { useState, useEffect, useCallback } from "react";
import { QuizResult, RankingEntry } from "@/lib/types/quizTypes";
import { saveRanking, getRankingsByQuizSet } from "@/lib/firebase/firestore";
import { getQuizSetInfo } from "@/data/quiz_questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

interface RankingBoardProps {
  result: QuizResult;
  onClose: () => void;
}

type ViewMode = "rankings" | "register";

// localStorage 키
const REGISTERED_RESULTS_KEY = "quiz_registered_results";

// 결과 고유 ID 생성 (quizSetId + completedAt timestamp)
function getResultId(result: QuizResult): string {
  const timestamp = result.completedAt instanceof Date
    ? result.completedAt.getTime()
    : new Date(result.completedAt).getTime();
  return `${result.quizSetId}_${timestamp}`;
}

// 이미 등록된 결과인지 확인
function isResultRegistered(resultId: string): boolean {
  if (typeof window === "undefined") return false;
  const registered = localStorage.getItem(REGISTERED_RESULTS_KEY);
  if (!registered) return false;
  const registeredIds: string[] = JSON.parse(registered);
  return registeredIds.includes(resultId);
}

// 등록된 결과 ID 저장
function markResultAsRegistered(resultId: string): void {
  if (typeof window === "undefined") return;
  const registered = localStorage.getItem(REGISTERED_RESULTS_KEY);
  const registeredIds: string[] = registered ? JSON.parse(registered) : [];
  if (!registeredIds.includes(resultId)) {
    registeredIds.push(resultId);
    // 최대 100개만 유지 (오래된 것 자동 삭제)
    if (registeredIds.length > 100) {
      registeredIds.shift();
    }
    localStorage.setItem(REGISTERED_RESULTS_KEY, JSON.stringify(registeredIds));
  }
}

export default function RankingBoard({ result, onClose }: RankingBoardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("rankings");
  const [nickname, setNickname] = useState("");
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [myRankId, setMyRankId] = useState<string | null>(null);

  // 결과 고유 ID
  const resultId = getResultId(result);

  // 테마 정보
  const quizSetInfo = getQuizSetInfo(result.quizSetId);
  const isMelaniaTheme = result.quizSetId === "quiz_set_1";

  // 이미 등록했는지 확인
  useEffect(() => {
    if (isResultRegistered(resultId)) {
      setHasSubmitted(true);
    }
  }, [resultId]);

  // 랭킹 불러오기 (퀴즈 세트별)
  const loadRankings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getRankingsByQuizSet(result.quizSetId, 10);
      setRankings(data);
    } catch (error) {
      console.error("Failed to load rankings:", error);
      toast.error("랭킹을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [result.quizSetId]);

  useEffect(() => {
    loadRankings();
  }, [loadRankings]);

  // 랭킹 등록
  const handleSubmitRanking = async () => {
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해주세요!");
      return;
    }

    if (nickname.length > 20) {
      toast.error("닉네임은 20자 이내로 입력해주세요!");
      return;
    }

    setIsSubmitting(true);
    try {
      const percentage = Math.round(
        (result.correctCount / result.totalQuestions) * 100
      );
      const timeInSeconds = Math.floor(result.totalTime / 1000);

      const id = await saveRanking({
        nickname: nickname.trim(),
        score: result.correctCount,
        totalQuestions: result.totalQuestions,
        timeInSeconds,
        percentage,
        quizSetId: result.quizSetId,
      });

      setMyRankId(id);
      setHasSubmitted(true);
      setViewMode("rankings");
      markResultAsRegistered(resultId);
      toast.success("랭킹이 등록되었습니다!");

      // 랭킹 새로고침
      await loadRankings();
    } catch (error) {
      console.error("Failed to submit ranking:", error);
      toast.error("랭킹 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 시간 포맷
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 내 예상 순위 계산 (상위 10위 안에 드는지만 판단)
  const getMyEstimatedRank = (): string => {
    const myPercentage = Math.round(
      (result.correctCount / result.totalQuestions) * 100
    );
    const myTime = Math.floor(result.totalTime / 1000);

    let rank = 1;
    for (const entry of rankings) {
      if (
        entry.percentage > myPercentage ||
        (entry.percentage === myPercentage && entry.timeInSeconds < myTime)
      ) {
        rank++;
      }
    }
    // 10위 이내면 정확한 순위, 아니면 "10위 이상"
    return rank <= 10 ? `${rank}위` : "10위권 밖";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 dark:bg-black/70">
      <div className={`max-h-[90vh] w-full max-w-lg overflow-hidden rounded-xl border-2 shadow-xl ${
        isMelaniaTheme
          ? "border-purple-300 bg-white dark:border-purple-500/50 dark:bg-gray-900"
          : "border-blue-300 bg-white dark:border-blue-500/50 dark:bg-gray-900"
      }`}>
        {/* 헤더 */}
        <div className={`border-b px-4 py-3 ${
          isMelaniaTheme
            ? "border-purple-200 bg-purple-50 dark:border-purple-500/30 dark:bg-purple-900/30"
            : "border-blue-200 bg-blue-50 dark:border-blue-500/30 dark:bg-blue-900/30"
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold ${
              isMelaniaTheme
                ? "text-purple-700 dark:text-purple-200"
                : "text-blue-700 dark:text-blue-200"
            }`}>
              🏆 {quizSetInfo?.name || "퀴즈"} 랭킹
            </h2>
            <button
              onClick={onClose}
              className="text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              &times;
            </button>
          </div>
        </div>

        {/* 내 기록 요약 */}
        <div className={`border-b px-4 py-3 ${
          isMelaniaTheme
            ? "border-purple-200 bg-purple-100/50 dark:border-purple-500/30 dark:bg-gray-800/50"
            : "border-blue-200 bg-blue-100/50 dark:border-blue-500/30 dark:bg-gray-800/50"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">내 기록</span>
            <span className={`text-lg font-bold ${
              isMelaniaTheme
                ? "text-purple-700 dark:text-purple-300"
                : "text-blue-700 dark:text-blue-300"
            }`}>
              {result.correctCount}/{result.totalQuestions} (
              {Math.round(
                (result.correctCount / result.totalQuestions) * 100
              )}
              %) | {formatTime(Math.floor(result.totalTime / 1000))}
            </span>
          </div>
          {!hasSubmitted && rankings.length > 0 && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              예상 순위: <span className="font-bold">{getMyEstimatedRank()}</span>
            </p>
          )}
        </div>

        {/* 랭킹 목록 뷰 */}
        {viewMode === "rankings" && (
          <>
            {/* 랭킹 목록 */}
            <div className="max-h-[55vh] overflow-y-auto px-4 py-3">
              {isLoading ? (
                <div className="py-8 text-center text-gray-500">로딩 중...</div>
              ) : rankings.length === 0 ? (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  아직 등록된 기록이 없습니다.
                  <br />
                  첫 번째로 기록을 등록해보세요!
                </div>
              ) : (
                <div className="space-y-2">
                  {rankings.map((entry, index) => {
                    const isMyRank = entry.id === myRankId;
                    return (
                      <div
                        key={entry.id}
                        className={`flex items-center rounded-lg border px-3 py-2 ${
                          isMyRank
                            ? isMelaniaTheme
                              ? "border-purple-400 bg-purple-100 dark:border-purple-500 dark:bg-purple-900/30"
                              : "border-blue-400 bg-blue-100 dark:border-blue-500 dark:bg-blue-900/30"
                            : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
                        }`}
                      >
                        {/* 순위 */}
                        <div className="mr-3 flex h-8 w-8 items-center justify-center">
                          {index === 0 && <span className="text-2xl">🥇</span>}
                          {index === 1 && <span className="text-2xl">🥈</span>}
                          {index === 2 && <span className="text-2xl">🥉</span>}
                          {index > 2 && (
                            <span className="font-bold text-gray-500">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        {/* 정보 */}
                        <div className="flex-1">
                          <p
                            className={`font-semibold ${
                              isMyRank
                                ? isMelaniaTheme
                                  ? "text-purple-700 dark:text-purple-300"
                                  : "text-blue-700 dark:text-blue-300"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {entry.nickname}
                            {isMyRank && (
                              <span className={`ml-2 text-xs ${
                                isMelaniaTheme
                                  ? "text-purple-500 dark:text-purple-400"
                                  : "text-blue-500 dark:text-blue-400"
                              }`}>
                                (나)
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {entry.score}/{entry.totalQuestions} |{" "}
                            {formatTime(entry.timeInSeconds)}
                          </p>
                        </div>

                        {/* 점수 */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {entry.percentage}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 내 기록 등록 버튼 */}
            {!hasSubmitted && (
              <div className={`border-t px-4 py-3 ${
                isMelaniaTheme
                  ? "border-purple-200 dark:border-purple-500/30"
                  : "border-blue-200 dark:border-blue-500/30"
              }`}>
                <Button
                  onClick={() => setViewMode("register")}
                  className={`w-full text-white ${
                    isMelaniaTheme
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  🏆 내 기록 등록하기
                </Button>
              </div>
            )}
          </>
        )}

        {/* 닉네임 입력 뷰 */}
        {viewMode === "register" && (
          <div className="px-4 py-6">
            <h3 className="mb-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
              닉네임을 입력하세요
            </h3>
            <div className="space-y-4">
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임 (최대 20자)"
                maxLength={20}
                disabled={isSubmitting}
                className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing && nickname.trim()) {
                    handleSubmitRanking();
                  }
                }}
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => setViewMode("rankings")}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  disabled={isSubmitting}
                >
                  취소
                </Button>
                <Button
                  onClick={handleSubmitRanking}
                  disabled={isSubmitting || !nickname.trim()}
                  className={`flex-1 text-white ${
                    isMelaniaTheme
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "등록 중..." : "등록하기"}
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
