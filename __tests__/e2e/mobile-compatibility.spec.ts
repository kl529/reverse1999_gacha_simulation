import { test, expect, devices } from "@playwright/test";

/**
 * 모바일 호환성 테스트
 * iOS Safari 및 Android Chrome에서의 기본 동작 검증
 *
 * 이 테스트는 playwright.config.ts에서 설정된 모바일 프로젝트로 실행됩니다:
 * - Mobile Safari (iPhone 13)
 * - Mobile Chrome (Pixel 5)
 */

test.describe("Core page loading", () => {
  test("homepage loads without critical errors", async ({ page }) => {
    // 콘솔 에러 수집
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");

    // 페이지가 정상 로드되었는지 확인 (버틴의 여행가방 또는 리버스)
    await expect(page).toHaveTitle(/(버틴|리버스|Reverse)/);

    // 심각한 JS 에러가 없어야 함 (TypeError, ReferenceError 등)
    const criticalErrors = errors.filter(
      (e) => e.includes("TypeError") || e.includes("ReferenceError") || e.includes("SyntaxError")
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("gacha simulator page loads without flat() errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/gacha_simulator");

    // 페이지가 정상 로드되었는지 확인
    await expect(page.locator("body")).toBeVisible();

    // Array.flat() 관련 에러가 없어야 함
    const flatErrors = errors.filter((e) => e.includes("flat is not a function"));
    expect(flatErrors).toHaveLength(0);
  });

  test("character page loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/character");

    // 캐릭터 목록이 로드되었는지 확인
    await expect(page.locator("body")).toBeVisible();

    // flat() 관련 에러 확인
    const flatErrors = errors.filter((e) => e.includes("flat is not a function"));
    expect(flatErrors).toHaveLength(0);
  });

  test("skin page loads (uses Object.values().flat())", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    // 스킨 페이지가 있다면 테스트
    const response = await page.goto("/skin");

    if (response?.ok()) {
      await expect(page.locator("body")).toBeVisible();
      // flat() 관련 에러 확인
      const flatErrors = errors.filter((e) => e.includes("flat is not a function"));
      expect(flatErrors).toHaveLength(0);
    }
  });
});

test.describe("localStorage compatibility", () => {
  test("page works when localStorage throws errors", async ({ page, context }) => {
    // localStorage 쓰기 실패 시뮬레이션 (Safari Private Mode)
    await context.addInitScript(() => {
      const originalSetItem = Storage.prototype.setItem;
      let callCount = 0;

      Storage.prototype.setItem = function (key: string, value: string) {
        // 테스트용 키는 정상 동작 (storage 가용성 체크용)
        if (key === "__storage_test__") {
          originalSetItem.call(this, key, value);
          return;
        }

        // 그 외 키는 처음 몇 번은 에러 발생
        if (callCount < 5) {
          callCount++;
          const error = new Error("QuotaExceededError");
          error.name = "QuotaExceededError";
          throw error;
        }
        originalSetItem.call(this, key, value);
      };
    });

    const pageErrors: string[] = [];
    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    await page.goto("/");

    // 페이지가 크래시 없이 로드되어야 함
    await expect(page.locator("body")).toBeVisible();

    // Unhandled 에러가 없어야 함
    const unhandledErrors = pageErrors.filter((e) => e.includes("Unhandled"));
    expect(unhandledErrors).toHaveLength(0);
  });

  test("gacha simulator works with restricted localStorage", async ({ page, context }) => {
    // localStorage 완전 비활성화 시뮬레이션
    await context.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: () => null,
          setItem: () => {
            throw new Error("QuotaExceededError");
          },
          removeItem: () => {},
          clear: () => {},
          length: 0,
          key: () => null,
        },
        writable: false,
      });
    });

    const pageErrors: string[] = [];
    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    await page.goto("/gacha_simulator");

    // 페이지가 로드되어야 함
    await expect(page.locator("body")).toBeVisible();

    // 치명적 에러가 없어야 함
    expect(pageErrors.filter((e) => e.includes("Cannot read"))).toHaveLength(0);
  });
});

test.describe("Mobile UI interactions", () => {
  test("navigation elements are present", async ({ page }) => {
    await page.goto("/");

    // 페이지에 인터랙티브 요소가 있는지 확인 (버튼, 링크 등)
    const interactiveElements = page.locator("button, a[href], [role='button']");
    const count = await interactiveElements.count();

    // 최소 하나의 인터랙티브 요소가 있어야 함
    expect(count).toBeGreaterThan(0);
  });

  test("touch targets are properly sized", async ({ page }) => {
    await page.goto("/");

    // 버튼들의 크기가 터치하기 적절한지 확인 (최소 44x44px 권장)
    const buttons = page.locator("button").first();

    if (await buttons.isVisible()) {
      const box = await buttons.boundingBox();
      if (box) {
        // 최소 터치 타겟 크기 확인 (32px 이상이면 OK)
        expect(box.width).toBeGreaterThanOrEqual(32);
        expect(box.height).toBeGreaterThanOrEqual(32);
      }
    }
  });

  test("page does not have horizontal overflow", async ({ page }) => {
    await page.goto("/");

    // 가로 스크롤이 없어야 함 (반응형 디자인 확인)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth + 10; // 10px 여유
    });

    expect(hasHorizontalScroll).toBe(false);
  });
});

test.describe("PWA features", () => {
  test("manifest.json is accessible", async ({ page }) => {
    await page.goto("/");

    // manifest.json 링크 확인 (첫 번째 요소만)
    const manifestLink = page.locator('link[rel="manifest"]').first();
    await expect(manifestLink).toHaveAttribute("href", "/manifest.json");
  });

  test("apple-touch-icon is set", async ({ page }) => {
    await page.goto("/");

    // Apple 터치 아이콘 확인 (iOS 홈화면 추가용)
    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]');

    if ((await appleTouchIcon.count()) > 0) {
      const href = await appleTouchIcon.getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("theme-color meta tag exists", async ({ page }) => {
    await page.goto("/");

    const themeColor = page.locator('meta[name="theme-color"]');
    await expect(themeColor).toHaveCount(1);
  });
});

test.describe("Error handling", () => {
  test("error page displays user-friendly message", async ({ page }) => {
    // 존재하지 않는 페이지 접근
    await page.goto("/this-page-does-not-exist-12345");

    // 404 페이지 또는 에러 메시지가 표시되어야 함
    const body = page.locator("body");
    await expect(body).toBeVisible();

    // 완전히 빈 페이지가 아니어야 함
    const content = await body.textContent();
    expect(content?.length).toBeGreaterThan(0);
  });

  test("error boundary catches render errors", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    // 에러 테스트 페이지가 있다면 테스트
    const response = await page.goto("/error-test");

    if (response?.ok()) {
      // 에러 바운더리가 동작하면 페이지는 여전히 표시되어야 함
      await expect(page.locator("body")).toBeVisible();
    }
  });
});
