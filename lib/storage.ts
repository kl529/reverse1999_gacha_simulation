/**
 * LocalStorage 관리 유틸리티
 * 타입 안전하고 일관된 방식으로 localStorage를 사용하기 위한 헬퍼
 */

// 저장소 키 상수 (타입 안전)
export const STORAGE_KEYS = {
  // 모달/다이얼로그 표시 여부
  HAS_SEEN_HELP_MODAL: "hasSeenHelpModal",
  SEEN_RECOMMEND_INTRO: "seenRecommendIntro",
  NOTICE_SHOWN_DATE: "noticeShownDate",

  // 진행 상황
  NEWBIE_GUIDE_PROGRESS: "newbieGuideProgress",
  QUIZ_PROGRESS: "quizProgress",

  // 게임 데이터
  GACHA_HISTORY: "gachaHistory",
} as const;

// STORAGE_KEYS의 값 타입 추출
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * LocalStorage 유틸리티 객체
 */
export const storage = {
  /**
   * 값 가져오기
   * @param key - 저장소 키
   * @returns 저장된 값 또는 null
   */
  get<T = string>(key: StorageKey): T | null {
    if (typeof window === "undefined") return null;

    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;

      // JSON 파싱 시도
      try {
        return JSON.parse(item) as T;
      } catch {
        // JSON이 아니면 문자열 그대로 반환
        return item as T;
      }
    } catch (error) {
      console.error(`Error getting item from localStorage (${key}):`, error);
      return null;
    }
  },

  /**
   * 값 저장하기
   * @param key - 저장소 키
   * @param value - 저장할 값
   */
  set<T>(key: StorageKey, value: T): void {
    if (typeof window === "undefined") return;

    try {
      const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(`Error setting item in localStorage (${key}):`, error);
    }
  },

  /**
   * 값 제거하기
   * @param key - 저장소 키
   */
  remove(key: StorageKey): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage (${key}):`, error);
    }
  },

  /**
   * 모든 값 제거하기
   */
  clear(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },

  /**
   * 키가 존재하는지 확인
   * @param key - 저장소 키
   * @returns 존재 여부
   */
  has(key: StorageKey): boolean {
    return this.get(key) !== null;
  },
};
