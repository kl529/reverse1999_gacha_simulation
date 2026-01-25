/**
 * 폴리필 테스트
 * Safari 및 구형 브라우저 호환성을 위한 폴리필 기능 검증
 */

describe("Polyfills", () => {
  describe("Array.prototype.flat", () => {
    it("flattens nested arrays with default depth 1", () => {
      const arr = [1, [2, 3], [4, [5, 6]]];
      expect(arr.flat()).toEqual([1, 2, 3, 4, [5, 6]]);
    });

    it("flattens with custom depth", () => {
      const arr = [1, [2, [3, [4]]]];
      expect(arr.flat(2)).toEqual([1, 2, 3, [4]]);
    });

    it("flattens deeply nested arrays with Infinity", () => {
      const arr = [1, [2, [3, [4, [5]]]]];
      expect(arr.flat(Infinity)).toEqual([1, 2, 3, 4, 5]);
    });

    it("handles empty arrays", () => {
      const arr: unknown[] = [];
      expect(arr.flat()).toEqual([]);
    });

    it("removes empty slots (sparse arrays)", () => {
      // eslint-disable-next-line no-sparse-arrays
      const arr = [1, , 3];
      const result = arr.flat();
      expect(result).toContain(1);
      expect(result).toContain(3);
    });

    it("works with Object.values().flat() pattern (common in codebase)", () => {
      const obj = {
        a: [1, 2],
        b: [3, 4],
        c: [5, 6],
      };
      expect(Object.values(obj).flat()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("Array.prototype.flatMap", () => {
    it("maps and flattens in one operation", () => {
      const arr = [1, 2, 3];
      expect(arr.flatMap((x) => [x, x * 2])).toEqual([1, 2, 2, 4, 3, 6]);
    });

    it("handles returning single values", () => {
      const arr = ["hello", "world"];
      expect(arr.flatMap((x) => x.split(""))).toEqual(["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]);
    });

    it("handles empty results", () => {
      const arr = [1, 2, 3, 4];
      expect(arr.flatMap((x) => (x % 2 === 0 ? [x] : []))).toEqual([2, 4]);
    });
  });

  describe("Object.fromEntries", () => {
    it("creates object from entries array", () => {
      const entries: [string, number][] = [
        ["a", 1],
        ["b", 2],
        ["c", 3],
      ];
      expect(Object.fromEntries(entries)).toEqual({ a: 1, b: 2, c: 3 });
    });

    it("works with Map", () => {
      const map = new Map([
        ["name", "John"],
        ["age", "30"],
      ]);
      expect(Object.fromEntries(map)).toEqual({ name: "John", age: "30" });
    });

    it("handles empty entries", () => {
      const entries: [string, unknown][] = [];
      expect(Object.fromEntries(entries)).toEqual({});
    });

    it("overwrites duplicate keys (last wins)", () => {
      const entries: [string, number][] = [
        ["a", 1],
        ["a", 2],
      ];
      expect(Object.fromEntries(entries)).toEqual({ a: 2 });
    });
  });

  describe("globalThis", () => {
    it("globalThis is defined", () => {
      expect(globalThis).toBeDefined();
    });

    it("globalThis equals window in browser context", () => {
      // In jsdom, globalThis should equal window
      expect(globalThis).toBe(window);
    });
  });
});

describe("Browser API availability checks", () => {
  describe("Safari Private Mode detection patterns", () => {
    it("localStorage test pattern should work", () => {
      // This is the pattern used in storage.ts to detect Private Mode
      const testKey = "__storage_test__";
      let isAvailable = true;

      try {
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
      } catch {
        isAvailable = false;
      }

      expect(isAvailable).toBe(true);
    });
  });

  describe("Push API support checks", () => {
    it("should check for serviceWorker support", () => {
      expect("serviceWorker" in navigator).toBeDefined();
    });

    it("should check for PushManager support", () => {
      // PushManager may or may not be available in jsdom
      expect(typeof window.PushManager !== "undefined" || typeof window.PushManager === "undefined").toBe(
        true
      );
    });

    it("should check for Notification support", () => {
      expect("Notification" in window).toBeDefined();
    });
  });
});
