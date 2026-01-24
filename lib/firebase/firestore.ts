import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";
import { app } from "./config";
import { RankingEntry } from "@/lib/types/quizTypes";

// Firestore 인스턴스
const db = getFirestore(app);

// 컬렉션 이름
const QUIZ_RANKINGS = "quiz_rankings";

// 랭킹 저장
export async function saveRanking(entry: Omit<RankingEntry, "id" | "createdAt">): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, QUIZ_RANKINGS), {
      ...entry,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving ranking:", error);
    throw error;
  }
}

// 랭킹 조회 (상위 N개)
export async function getRankings(limitCount: number = 20): Promise<RankingEntry[]> {
  try {
    const q = query(
      collection(db, QUIZ_RANKINGS),
      orderBy("percentage", "desc"),
      orderBy("timeInSeconds", "asc"),
      orderBy("createdAt", "asc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const rankings: RankingEntry[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      rankings.push({
        id: doc.id,
        nickname: data.nickname,
        score: data.score,
        totalQuestions: data.totalQuestions,
        timeInSeconds: data.timeInSeconds,
        percentage: data.percentage,
        quizSetId: data.quizSetId || data.vaultId || "quiz_set_1",
        createdAt: data.createdAt.toDate(),
      });
    });

    return rankings;
  } catch (error) {
    console.error("Error getting rankings:", error);
    throw error;
  }
}

// 특정 문제 개수별 랭킹 조회
export async function getRankingsByQuestionCount(
  questionCount: number,
  limitCount: number = 20
): Promise<RankingEntry[]> {
  try {
    // Firestore에서는 복합 쿼리에 제한이 있어서 클라이언트에서 필터링
    const allRankings = await getRankings(100);
    return allRankings
      .filter((r) => r.totalQuestions === questionCount)
      .slice(0, limitCount);
  } catch (error) {
    console.error("Error getting rankings by question count:", error);
    throw error;
  }
}

// 퀴즈 세트별 랭킹 조회
export async function getRankingsByQuizSet(
  quizSetId: string,
  limitCount: number = 20
): Promise<RankingEntry[]> {
  try {
    const q = query(
      collection(db, QUIZ_RANKINGS),
      where("quizSetId", "==", quizSetId),
      orderBy("percentage", "desc"),
      orderBy("timeInSeconds", "asc"),
      orderBy("createdAt", "asc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const rankings: RankingEntry[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      rankings.push({
        id: doc.id,
        nickname: data.nickname,
        score: data.score,
        totalQuestions: data.totalQuestions,
        timeInSeconds: data.timeInSeconds,
        percentage: data.percentage,
        quizSetId: data.quizSetId || data.vaultId || "quiz_set_1",
        createdAt: data.createdAt.toDate(),
      });
    });

    return rankings;
  } catch (error) {
    console.error("Error getting rankings by quiz set:", error);
    throw error;
  }
}
