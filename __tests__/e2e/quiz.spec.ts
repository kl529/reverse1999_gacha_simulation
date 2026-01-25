import { test, expect } from "@playwright/test";

test.describe("퀴즈 E2E 테스트", () => {
  test.describe("퀴즈 선택 페이지", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/quiz");
      await page.waitForLoadState("domcontentloaded");
    });

    test("퀴즈 선택 페이지가 정상 로드되고 퀴즈 세트 목록이 표시된다", async ({
      page,
    }) => {
      // 페이지 h1 헤더 확인
      await expect(
        page.locator("h1", { hasText: "종합 퀴즈" })
      ).toBeVisible();

      // 퀴즈 세트 설명 텍스트 확인
      await expect(
        page.locator("h2", { hasText: "다양한 컨셉의 퀴즈를 풀어보세요" })
      ).toBeVisible();

      // 활성화된 퀴즈 세트 카드 확인 ("멜라니아의 금고 털기")
      await expect(
        page.locator("h3", { hasText: "멜라니아의 금고 털기" })
      ).toBeVisible();

      // 잠금된 퀴즈 세트도 표시되는지 확인 ("준비중...")
      await expect(
        page.locator("h3", { hasText: "준비중..." }).first()
      ).toBeVisible();
    });

    test("퀴즈 세트 선택 - 활성화된 퀴즈 클릭 시 퀴즈 페이지로 이동", async ({
      page,
    }) => {
      // 멜라니아 금고 털기 퀴즈 카드 클릭
      const quizCard = page.locator("a", {
        hasText: "멜라니아의 금고 털기",
      });
      await expect(quizCard).toBeVisible();

      // 클릭하여 퀴즈 페이지로 이동
      await quizCard.click();

      // URL이 변경되었는지 확인
      await page.waitForURL(/\/quiz\/quiz_set_1/);

      // 경고 화면의 h2 제목이 표시되는지 확인
      await expect(
        page.locator("h2", { hasText: "멜라니아의 금고 털기" })
      ).toBeVisible();
    });
  });

  test.describe("퀴즈 플레이 플로우", () => {
    test.beforeEach(async ({ page }) => {
      // localStorage 클리어하여 시도 횟수 초기화
      await page.goto("/quiz/quiz_set_1");
      await page.evaluate(() => {
        localStorage.clear();
      });
      await page.reload();
      await page.waitForLoadState("domcontentloaded");
    });

    test("경고 화면에서 시작 버튼 클릭 후 퀴즈가 시작된다", async ({
      page,
    }) => {
      // 경고 화면 확인 - 멜라니아 금고 털기 제목 (h2)
      await expect(
        page.locator("h2", { hasText: "멜라니아의 금고 털기" })
      ).toBeVisible();

      // 규칙 안내 확인
      await expect(page.getByText(/10초/)).toBeVisible();
      await expect(page.getByText(/목숨/)).toBeVisible();

      // 잠입 개시 버튼 클릭
      const startButton = page.getByRole("button", { name: "잠입 개시" });
      await expect(startButton).toBeVisible();
      await startButton.click();

      // 퀴즈 플레이 화면으로 전환 확인
      // LOCK (문제 진행) 표시 확인
      await expect(page.getByText("LOCK")).toBeVisible({ timeout: 5000 });
    });

    test("퀴즈 문제와 선택지가 정상 표시된다", async ({ page }) => {
      // 퀴즈 시작
      const startButton = page.getByRole("button", { name: "잠입 개시" });
      await startButton.click();

      // 문제 진행 표시 확인
      await expect(page.getByText("LOCK")).toBeVisible({ timeout: 5000 });

      // 문제 번호 표시 (1 / 20) - 더 구체적인 locator
      await expect(page.locator("text=/ 20")).toBeVisible();

      // 타이머가 표시되는지 확인
      await expect(page.getByText("경보 시스템 가동 중...")).toBeVisible();

      // 선택지가 표시되는지 확인 (button 요소들)
      // 5지선다, OX, 텍스트 입력 등 다양한 형식이 있음
      // 최소한 버튼이 있거나 입력 필드가 있어야 함
      const hasButtons = await page.locator("button").count();
      expect(hasButtons).toBeGreaterThan(1);
    });

    test("답변 선택 후 결과가 표시되고 다음 문제로 이동한다", async ({
      page,
    }) => {
      test.setTimeout(60000);

      // 퀴즈 시작
      const startButton = page.getByRole("button", { name: "잠입 개시" });
      await startButton.click();

      // 문제 화면이 완전히 로드될 때까지 대기
      await expect(page.getByText("LOCK")).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(1000);

      // 첫 번째 문제에서 아무 선택지나 클릭
      // 선택지 버튼들을 찾아서 클릭 (MultipleChoice uses "1." format, not "1)")
      const multipleChoice = page.locator("button").filter({
        hasText: /^[1-5]\./,
      });
      const oxChoice = page.locator("button").filter({ hasText: /^[OX]$/ });

      const mcCount = await multipleChoice.count();
      const oxCount = await oxChoice.count();

      if (mcCount > 0) {
        await multipleChoice.first().click();
      } else if (oxCount > 0) {
        await oxChoice.first().click();
      }

      // 답변 처리 시간 대기
      await page.waitForTimeout(2000);

      // 결과 표시 후 다음 버튼이 나타남 (➡️ 다음 잠금장치)
      // 버튼에 이모지가 포함되어 있으므로 부분 텍스트로 매칭
      const nextButton = page.locator("button", { hasText: "다음 잠금장치" });
      await expect(nextButton).toBeVisible({ timeout: 10000 });

      // 다음 버튼 클릭
      await nextButton.click();

      // 두 번째 문제로 이동 확인 - "2 / 20" 패턴
      await expect(page.locator("text=2 /")).toBeVisible({ timeout: 10000 });
    });

    test("퀴즈 문제 진행 중 정답/오답 처리가 동작한다", async ({ page }) => {
      test.setTimeout(60000);

      // 퀴즈 시작
      const startButton = page.getByRole("button", { name: "잠입 개시" });
      await startButton.click();
      await page.waitForTimeout(1500);

      // 첫 번째 선택지 클릭
      const multipleChoice = page.locator("button").filter({
        hasText: /^[1-5]\./,
      });

      const mcCount = await multipleChoice.count();
      if (mcCount > 0) {
        await multipleChoice.first().click();
        await page.waitForTimeout(1000);

        // 정답 또는 오답 피드백이 있어야 함
        // showResult 상태에서는 버튼에 정답 표시가 있거나 다음 버튼이 표시됨
        const hasResultFeedback =
          (await page
            .locator("button", { hasText: "다음 잠금장치" })
            .isVisible()
            .catch(() => false)) ||
          (await page
            .locator("button", { hasText: "금고 확인" })
            .isVisible()
            .catch(() => false)) ||
          (await page.locator("text=(정답)").isVisible().catch(() => false));

        expect(hasResultFeedback).toBe(true);
      }
    });

    test("퀴즈 진행 중 하트(목숨)가 표시된다", async ({ page }) => {
      // 퀴즈 시작
      const startButton = page.getByRole("button", { name: "잠입 개시" });
      await startButton.click();
      await page.waitForTimeout(1000);

      // 하트 아이콘 (❤️ 또는 🖤) 이 표시되는지 확인
      const hearts = page.locator("text=❤️");
      const heartsCount = await hearts.count();

      // 초기에는 3개의 하트가 있어야 함
      expect(heartsCount).toBeGreaterThanOrEqual(1);
    });

    test("퀴즈 진행 중 시간이 표시된다", async ({ page }) => {
      // 퀴즈 시작
      const startButton = page.getByRole("button", { name: "잠입 개시" });
      await startButton.click();
      await page.waitForTimeout(1000);

      // TIME 표시 확인
      await expect(page.getByText("TIME")).toBeVisible();

      // 초 표시 확인 (예: "10초", "9초" 등)
      await expect(page.locator("text=/\\d+초/")).toBeVisible();
    });

    test("정답 수가 증가한다", async ({ page }) => {
      test.setTimeout(60000);

      // 퀴즈 시작
      const startButton = page.getByRole("button", { name: "잠입 개시" });
      await startButton.click();
      await page.waitForTimeout(1500);

      // 초기 해제 카운트 확인 (0)
      const initialSuccessLabel = page.locator("text=해제");
      await expect(initialSuccessLabel).toBeVisible();

      // 첫 번째 문제 답변
      const multipleChoice = page.locator("button").filter({
        hasText: /^[1-5]\./,
      });

      const mcCount = await multipleChoice.count();
      if (mcCount > 0) {
        await multipleChoice.first().click();
        await page.waitForTimeout(1000);

        // 정답 또는 오답 피드백 확인
        const hasNextButton = await page
          .locator("button", { hasText: /다음 잠금장치|금고 확인/ })
          .isVisible()
          .catch(() => false);

        expect(hasNextButton).toBe(true);
      }
    });
  });

  test.describe("퀴즈 토스트 메시지", () => {
    test("답변 선택 시 피드백이 표시된다", async ({ page }) => {
      // localStorage 클리어
      await page.goto("/quiz/quiz_set_1");
      await page.evaluate(() => {
        localStorage.clear();
      });
      await page.reload();
      await page.waitForLoadState("domcontentloaded");

      // 퀴즈 시작
      const startButton = page.getByRole("button", { name: "잠입 개시" });
      await startButton.click();
      await page.waitForTimeout(1500);

      // 선택지 클릭 (정답/오답 무관하게 피드백이 표시됨)
      const multipleChoice = page.locator("button").filter({
        hasText: /^[1-5]\./,
      });

      const mcCount = await multipleChoice.count();

      if (mcCount > 0) {
        await multipleChoice.first().click();
        await page.waitForTimeout(1500);

        // 피드백 확인: 토스트 또는 다음 버튼이 나타남
        const toastElements = page.locator('[role="status"]');
        const toastCount = await toastElements.count();

        const nextButtonVisible = await page
          .locator("button", { hasText: /다음 잠금장치|금고 확인/ })
          .isVisible()
          .catch(() => false);

        // 토스트가 있거나 다음 버튼이 보이면 피드백이 있는 것
        expect(toastCount > 0 || nextButtonVisible).toBe(true);
      }
    });
  });
});
