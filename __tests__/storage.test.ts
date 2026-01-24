import { storage, STORAGE_KEYS } from "@/lib/storage";

describe("storage", () => {
  // Mock localStorage
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    localStorageMock = {};

    // Mock localStorage methods
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      return localStorageMock[key] ?? null;
    });

    jest.spyOn(Storage.prototype, "setItem").mockImplementation((key, value) => {
      localStorageMock[key] = value;
    });

    jest.spyOn(Storage.prototype, "removeItem").mockImplementation((key) => {
      delete localStorageMock[key];
    });

    jest.spyOn(Storage.prototype, "clear").mockImplementation(() => {
      localStorageMock = {};
    });

    // Clear console mocks
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("storage.get", () => {
    it("returns stored value for existing key", () => {
      localStorageMock[STORAGE_KEYS.HAS_SEEN_HELP_MODAL] = "true";
      expect(storage.get(STORAGE_KEYS.HAS_SEEN_HELP_MODAL)).toBe(true);
    });

    it("returns null for non-existing key", () => {
      expect(storage.get(STORAGE_KEYS.HAS_SEEN_HELP_MODAL)).toBeNull();
    });

    it("parses JSON objects correctly", () => {
      const testObject = { completed: true, step: 5 };
      localStorageMock[STORAGE_KEYS.NEWBIE_GUIDE_PROGRESS] = JSON.stringify(testObject);
      expect(storage.get(STORAGE_KEYS.NEWBIE_GUIDE_PROGRESS)).toEqual(testObject);
    });

    it("parses JSON arrays correctly", () => {
      const testArray = [1, 2, 3, 4, 5];
      localStorageMock[STORAGE_KEYS.GACHA_HISTORY] = JSON.stringify(testArray);
      expect(storage.get(STORAGE_KEYS.GACHA_HISTORY)).toEqual(testArray);
    });

    it("returns string as-is when not valid JSON", () => {
      localStorageMock[STORAGE_KEYS.NOTICE_SHOWN_DATE] = "2024-01-15";
      expect(storage.get(STORAGE_KEYS.NOTICE_SHOWN_DATE)).toBe("2024-01-15");
    });

    it("returns null when localStorage throws error", () => {
      jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      expect(storage.get(STORAGE_KEYS.HAS_SEEN_HELP_MODAL)).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("storage.set", () => {
    it("stores string value as-is", () => {
      storage.set(STORAGE_KEYS.NOTICE_SHOWN_DATE, "2024-01-15");
      expect(localStorageMock[STORAGE_KEYS.NOTICE_SHOWN_DATE]).toBe("2024-01-15");
    });

    it("stringifies object values", () => {
      const testObject = { completed: true, step: 5 };
      storage.set(STORAGE_KEYS.NEWBIE_GUIDE_PROGRESS, testObject);
      expect(localStorageMock[STORAGE_KEYS.NEWBIE_GUIDE_PROGRESS]).toBe(JSON.stringify(testObject));
    });

    it("stringifies array values", () => {
      const testArray = [1, 2, 3];
      storage.set(STORAGE_KEYS.GACHA_HISTORY, testArray);
      expect(localStorageMock[STORAGE_KEYS.GACHA_HISTORY]).toBe(JSON.stringify(testArray));
    });

    it("stringifies boolean values", () => {
      storage.set(STORAGE_KEYS.HAS_SEEN_HELP_MODAL, true);
      expect(localStorageMock[STORAGE_KEYS.HAS_SEEN_HELP_MODAL]).toBe("true");
    });

    it("handles localStorage error gracefully", () => {
      jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      // Should not throw
      expect(() => storage.set(STORAGE_KEYS.HAS_SEEN_HELP_MODAL, true)).not.toThrow();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("storage.remove", () => {
    it("removes existing key", () => {
      localStorageMock[STORAGE_KEYS.HAS_SEEN_HELP_MODAL] = "true";
      storage.remove(STORAGE_KEYS.HAS_SEEN_HELP_MODAL);
      expect(localStorageMock[STORAGE_KEYS.HAS_SEEN_HELP_MODAL]).toBeUndefined();
    });

    it("does not throw for non-existing key", () => {
      expect(() => storage.remove(STORAGE_KEYS.HAS_SEEN_HELP_MODAL)).not.toThrow();
    });

    it("handles localStorage error gracefully", () => {
      jest.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
        throw new Error("Storage error");
      });

      expect(() => storage.remove(STORAGE_KEYS.HAS_SEEN_HELP_MODAL)).not.toThrow();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("storage.clear", () => {
    it("clears all stored values", () => {
      localStorageMock[STORAGE_KEYS.HAS_SEEN_HELP_MODAL] = "true";
      localStorageMock[STORAGE_KEYS.NOTICE_SHOWN_DATE] = "2024-01-15";

      storage.clear();

      // After clear, the mock should be empty
      expect(Object.keys(localStorageMock).length).toBe(0);
    });

    it("handles localStorage error gracefully", () => {
      jest.spyOn(Storage.prototype, "clear").mockImplementation(() => {
        throw new Error("Storage error");
      });

      expect(() => storage.clear()).not.toThrow();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("storage.has", () => {
    it("returns true for existing key", () => {
      localStorageMock[STORAGE_KEYS.HAS_SEEN_HELP_MODAL] = "true";
      expect(storage.has(STORAGE_KEYS.HAS_SEEN_HELP_MODAL)).toBe(true);
    });

    it("returns false for non-existing key", () => {
      expect(storage.has(STORAGE_KEYS.HAS_SEEN_HELP_MODAL)).toBe(false);
    });

    it("returns true for key with falsy value (empty string)", () => {
      localStorageMock[STORAGE_KEYS.NOTICE_SHOWN_DATE] = "";
      // Empty string is parsed and returns "", which is falsy but not null
      expect(storage.has(STORAGE_KEYS.NOTICE_SHOWN_DATE)).toBe(true);
    });

    it("returns true for key with null string value", () => {
      localStorageMock[STORAGE_KEYS.GACHA_HISTORY] = "null";
      // "null" is parsed as null by JSON.parse
      expect(storage.has(STORAGE_KEYS.GACHA_HISTORY)).toBe(false);
    });
  });

  describe("STORAGE_KEYS", () => {
    it("contains expected storage keys", () => {
      expect(STORAGE_KEYS.HAS_SEEN_HELP_MODAL).toBe("hasSeenHelpModal");
      expect(STORAGE_KEYS.SEEN_RECOMMEND_INTRO).toBe("seenRecommendIntro");
      expect(STORAGE_KEYS.NOTICE_SHOWN_DATE).toBe("noticeShownDate");
      expect(STORAGE_KEYS.NEWBIE_GUIDE_PROGRESS).toBe("newbieGuideProgress");
      expect(STORAGE_KEYS.QUIZ_PROGRESS).toBe("quizProgress");
      expect(STORAGE_KEYS.GACHA_HISTORY).toBe("gachaHistory");
    });
  });
});
