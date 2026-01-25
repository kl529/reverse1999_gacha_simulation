/**
 * LocalStorage 관리 유틸리티
 * 타입 안전하고 일관된 방식으로 localStorage를 사용하기 위한 헬퍼
 * Safari Private 모드 및 구형 브라우저 호환성 지원
 */

// 메모리 폴백 저장소 (localStorage 사용 불가 시)
const memoryStorage: Map<string, string> = new Map();

// localStorage 사용 가능 여부 캐시
let storageAvailable: boolean | null = null;

/**
 * localStorage 사용 가능 여부 확인
 * Safari Private 모드에서는 localStorage 접근 시 에러 발생
 */
function isLocalStorageAvailable(): boolean {
  if (storageAvailable !== null) return storageAvailable;

  if (typeof window === "undefined") {
    storageAvailable = false;
    return false;
  }

  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    storageAvailable = true;
    return true;
  } catch {
    // Safari Private 모드 또는 localStorage 비활성화
    storageAvailable = false;
    console.warn(
      "localStorage를 사용할 수 없습니다. (Private 브라우징 모드일 수 있음) 메모리 저장소를 사용합니다."
    );
    return false;
  }
}

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
      let item: string | null = null;

      if (isLocalStorageAvailable()) {
        item = localStorage.getItem(key);
      } else {
        item = memoryStorage.get(key) ?? null;
      }

      if (item === null) return null;

      // JSON 파싱 시도
      try {
        return JSON.parse(item) as T;
      } catch {
        // JSON이 아니면 문자열 그대로 반환
        return item as T;
      }
    } catch (error) {
      console.error(`Error getting item from storage (${key}):`, error);
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

      if (isLocalStorageAvailable()) {
        localStorage.setItem(key, valueToStore);
      } else {
        memoryStorage.set(key, valueToStore);
      }
    } catch (error) {
      // 할당량 초과 등의 에러 시 메모리 저장소로 폴백
      console.error(`Error setting item in storage (${key}):`, error);
      try {
        const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
        memoryStorage.set(key, valueToStore);
      } catch {
        // 메모리 저장도 실패 시 무시
      }
    }
  },

  /**
   * 값 제거하기
   * @param key - 저장소 키
   */
  remove(key: StorageKey): void {
    if (typeof window === "undefined") return;

    try {
      if (isLocalStorageAvailable()) {
        localStorage.removeItem(key);
      }
      memoryStorage.delete(key);
    } catch (error) {
      console.error(`Error removing item from storage (${key}):`, error);
    }
  },

  /**
   * 모든 값 제거하기
   */
  clear(): void {
    if (typeof window === "undefined") return;

    try {
      if (isLocalStorageAvailable()) {
        localStorage.clear();
      }
      memoryStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
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

  /**
   * localStorage 사용 가능 여부 확인
   * @returns localStorage 사용 가능 여부
   */
  isAvailable(): boolean {
    return isLocalStorageAvailable();
  },
};
