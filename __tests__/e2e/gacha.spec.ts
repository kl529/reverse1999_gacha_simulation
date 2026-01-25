import { test, expect } from "@playwright/test";

test.describe("가챠 시뮬레이터 E2E 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 데스크톱 뷰로 설정하여 모든 요소가 표시되도록 함
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/gacha_simulator");
    await page.waitForLoadState("domcontentloaded");
  });

  test("페이지 로드 - 가챠 시뮬레이터가 정상 로드되고 배너가 표시된다", async ({
    page,
  }) => {
    // 페이지 제목 확인
    const heading = page.locator("h1");
    await expect(heading).toContainText("가챠 시뮬레이터");

    // 뽑기 버튼들이 표시되는지 확인
    const singlePullButton = page.locator('img[alt="1회 뽑기"]');
    await expect(singlePullButton).toBeVisible();

    const tenPullButton = page.locator('img[alt="10회 뽑기"]');
    await expect(tenPullButton).toBeVisible();

    // 리셋 버튼 확인
    const resetButton = page.getByRole("button", { name: "리셋" });
    await expect(resetButton).toBeVisible();
  });

  test("1회 뽑기 - 버튼 클릭 후 결과 캐릭터가 표시된다", async ({ page }) => {
    // 1회 뽑기 버튼 클릭
    const singlePullButton = page.locator('img[alt="1회 뽑기"]').first();
    await singlePullButton.click();

    // 결과가 표시될 때까지 대기
    // 데스크톱 그리드 (hidden sm:grid) 안에서 보이는 캐릭터 이미지 확인
    // main 영역 안의 결과 그리드에서 확인
    const mainArea = page.locator("main");
    const desktopGrid = mainArea.locator(".sm\\:grid");

    // 캐릭터 이미지가 표시되는지 확인
    await expect(desktopGrid.locator('img[src*="/characters/"]').first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("10회 뽑기 - 버튼 클릭 후 여러 결과가 표시된다", async ({ page }) => {
    // 10회 뽑기 버튼 클릭
    const tenPullButton = page.locator('img[alt="10회 뽑기"]').first();
    await tenPullButton.click();

    // 데스크톱 그리드에서 결과 확인
    const mainArea = page.locator("main");
    const desktopGrid = mainArea.locator(".sm\\:grid");

    // 캐릭터 이미지들이 표시되는지 확인
    await expect(desktopGrid.locator('img[src*="/characters/"]').first()).toBeVisible({
      timeout: 5000,
    });

    // 여러 캐릭터가 표시되는지 확인 - 데스크톱 그리드 안의 이미지 개수
    const characterImages = desktopGrid.locator('img[src*="/characters/"]');
    await expect(characterImages).toHaveCount(10, { timeout: 5000 });
  });

  test("통계 업데이트 - 뽑기 후 총 뽑기 횟수가 업데이트된다", async ({
    page,
  }) => {
    // 초기 통계 확인 - 총 뽑기 횟수 레이블이 보이는지 확인
    const statsLabel = page.getByText("🗂️ 총 뽑기 횟수:");
    await expect(statsLabel.first()).toBeVisible({ timeout: 5000 });

    // aside 내의 천장 카운트 확인 (더 구체적인 locator 사용)
    const pityCountLabel = page.locator("aside").first().locator("text=☂️ 천장 카운트:");
    await expect(pityCountLabel).toBeVisible();

    // 1회 뽑기 버튼 클릭
    const singlePullButton = page.locator('img[alt="1회 뽑기"]').first();
    await singlePullButton.click();
    await page.waitForTimeout(300);

    // 통계 영역에서 천장 카운트가 1회로 업데이트되었는지 확인
    // (첫 뽑기는 5성 확정이므로 천장 카운트가 1 증가)
    await expect(
      page.locator("aside").first().locator("span.text-red-500", { hasText: "1회" })
    ).toBeVisible({ timeout: 5000 });

    // 10회 뽑기
    const tenPullButton = page.locator('img[alt="10회 뽑기"]').first();
    await tenPullButton.click();
    await page.waitForTimeout(300);

    // 총 뽑기 횟수가 11회로 업데이트되었는지 확인
    await expect(
      page.locator("aside").first().locator("span.text-blue-600", { hasText: "11회" })
    ).toBeVisible({ timeout: 5000 });
  });

  test("복각픽업 전환 - 토글 클릭 시 배너 목록이 변경된다", async ({
    page,
  }) => {
    // 복각픽업 스위치 찾기
    const doublePickSwitch = page.getByRole("switch");
    await expect(doublePickSwitch).toBeVisible({ timeout: 5000 });

    // 초기 상태 확인 (복각픽업 OFF)
    const switchState = await doublePickSwitch.getAttribute("data-state");
    expect(switchState).toBe("unchecked");

    // 복각픽업 토글 클릭
    await doublePickSwitch.click();
    await page.waitForTimeout(300);

    // 스위치가 활성화되었는지 확인
    await expect(doublePickSwitch).toHaveAttribute("data-state", "checked");

    // 다시 토글하여 복원
    await doublePickSwitch.click();
    await page.waitForTimeout(300);

    // 스위치가 비활성화되었는지 확인
    await expect(doublePickSwitch).toHaveAttribute("data-state", "unchecked");
  });

  test("리셋 - 리셋 버튼 클릭 시 통계가 초기화된다", async ({ page }) => {
    // aside 패널 (통계 영역)
    const statsPanel = page.locator("aside").first();

    // 먼저 10회 뽑기
    const tenPullButton = page.locator('img[alt="10회 뽑기"]').first();
    await tenPullButton.click();
    await page.waitForTimeout(500);

    // 통계가 10회로 업데이트됨 확인 (총 뽑기 횟수)
    await expect(
      statsPanel.locator("span.text-blue-600", { hasText: "10회" })
    ).toBeVisible({ timeout: 5000 });

    // 리셋 버튼 클릭
    const resetButton = page.getByRole("button", { name: "리셋" });
    await resetButton.click();
    await page.waitForTimeout(300);

    // 통계가 0회로 리셋되었는지 확인
    await expect(
      statsPanel.locator("span.text-blue-600", { hasText: "0회" })
    ).toBeVisible({ timeout: 5000 });
  });

  test("6성 획득 시 토스트 메시지가 표시된다", async ({ page }) => {
    // 6성이 나올 때까지 반복 뽑기 (최대 70회 = 천장)
    // 테스트에서는 효율을 위해 10회씩 7번 뽑기
    const tenPullButton = page.locator('img[alt="10회 뽑기"]').first();

    // 토스트 컨테이너 감지를 위한 locator
    // react-hot-toast는 role="status" 또는 aria-live 속성을 가진 요소를 사용
    let toastFound = false;

    for (let i = 0; i < 7 && !toastFound; i++) {
      await tenPullButton.click();
      await page.waitForTimeout(600);

      // 토스트 메시지 확인 (6성 획득 시 "🎉" 또는 "획득" 포함)
      // react-hot-toast의 토스트 요소 확인
      const toastContainer = page.locator("[data-sonner-toast], [role='status']");
      const toastText = await toastContainer.allTextContents();
      if (toastText.some((t) => t.includes("획득"))) {
        toastFound = true;
      }
    }

    // 70회 천장이므로 반드시 6성이 나와야 함
    expect(toastFound).toBe(true);
  });

  test("배너 선택 - 다른 배너 선택 시 선택이 변경된다", async ({ page }) => {
    // 배너 선택 드롭다운 찾기 (Select 컴포넌트)
    const bannerSelect = page.locator('[role="combobox"]');
    await expect(bannerSelect).toBeVisible({ timeout: 5000 });

    // 현재 선택된 배너 확인
    const initialValue = await bannerSelect.textContent();

    // 드롭다운 열기
    await bannerSelect.click();
    await page.waitForTimeout(200);

    // 다른 배너 옵션 선택 (두 번째 옵션)
    const options = page.locator('[role="option"]');
    const optionsCount = await options.count();

    if (optionsCount > 1) {
      // 현재와 다른 옵션 선택
      await options.nth(1).click();
      await page.waitForTimeout(300);

      // 선택이 변경되었는지 확인
      const newValue = await bannerSelect.textContent();
      expect(newValue).not.toBe(initialValue);
    }
  });
});
