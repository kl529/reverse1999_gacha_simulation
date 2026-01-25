/**
 * Safari 및 구형 브라우저 호환성을 위한 폴리필
 * 이 파일은 app/layout.tsx에서 가장 먼저 import되어야 합니다.
 */

// Array.prototype.flat 폴리필 (Safari 11 이전 버전 지원)
if (!Array.prototype.flat) {
  Object.defineProperty(Array.prototype, "flat", {
    value: function <T>(this: T[], depth = 1): T[] {
      const flatten = (arr: unknown[], d: number): unknown[] => {
        return d > 0
          ? arr.reduce<unknown[]>((acc, val) => {
              if (Array.isArray(val)) {
                acc.push(...flatten(val, d - 1));
              } else {
                acc.push(val);
              }
              return acc;
            }, [])
          : arr.slice();
      };
      return flatten(this, depth) as T[];
    },
    writable: true,
    configurable: true,
  });
}

// Array.prototype.flatMap 폴리필 (Safari 11 이전 버전 지원)
if (!Array.prototype.flatMap) {
  Object.defineProperty(Array.prototype, "flatMap", {
    value: function <T, U>(
      this: T[],
      callback: (value: T, index: number, array: T[]) => U | U[],
      thisArg?: unknown
    ): U[] {
      return this.map(callback, thisArg).flat(1) as U[];
    },
    writable: true,
    configurable: true,
  });
}

// Object.fromEntries 폴리필 (Safari 12.0 이전 버전 지원)
if (!Object.fromEntries) {
  Object.fromEntries = function <T>(entries: Iterable<readonly [PropertyKey, T]>): { [k: string]: T } {
    const obj: { [k: string]: T } = {};
    for (const [key, value] of entries) {
      obj[key as string] = value;
    }
    return obj;
  };
}

// globalThis 폴리필 (Safari 12.0 이전 버전 지원)
if (typeof globalThis === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).globalThis = window;
}

export {};
