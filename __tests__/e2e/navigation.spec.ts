import { test, expect } from "@playwright/test";

test.describe("네비게이션 및 테마 전환", () => {
  test.beforeEach(async ({ page }) => {
    // 홈페이지로 이동
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // 배경 이미지 로딩 대기 (HomePageSkeleton -> HomePage 전환)
    const mainTitle = page.locator("h2", { hasText: "버틴의 여행가방" });
    await expect(mainTitle).toBeVisible({ timeout: 15000 });

    // 팝업/배너가 있다면 닫기 (나중에 버튼이 테마 토글을 가릴 수 있음)
    const dismissButton = page.locator('button:has-text("나중에")');
    if (await dismissButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await dismissButton.click();
    }
  });

  test("홈페이지가 로드되고 3개 섹션이 표시된다", async ({ page }) => {
    // 놀이터 섹션 확인 (h3 사용)
    const playgroundSection = page.locator("h3", { hasText: "놀이터" });
    await expect(playgroundSection).toBeVisible();

    // 도서관 섹션 확인
    const librarySection = page.locator("h3", { hasText: "도서관" });
    await expect(librarySection).toBeVisible();

    // 가이드 섹션 확인
    const guideSection = page.locator("h3", { hasText: "가이드" });
    await expect(guideSection).toBeVisible();
  });

  test("놀이터 섹션의 가챠 시뮬레이터 링크를 클릭하면 해당 페이지로 이동한다", async ({
    page,
  }) => {
    // 가챠 시뮬레이터 링크 클릭 (여러 개 있으므로 첫 번째 선택)
    const gachaLink = page.locator('a[href="/gacha_simulator"]').first();
    await expect(gachaLink).toBeVisible();

    // 클릭 후 네비게이션 대기
    await Promise.all([
      page.waitForURL("**/gacha_simulator", { timeout: 10000 }),
      gachaLink.click(),
    ]);

    // 가챠 시뮬레이터 페이지 컨텐츠 확인
    const heading = page.locator("h1");
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test("도서관 섹션의 캐릭터 가이드 링크를 클릭하면 해당 페이지로 이동한다", async ({
    page,
  }) => {
    // 캐릭터 가이드 링크 클릭
    const characterLink = page.locator('a[href="/character"]').first();
    await expect(characterLink).toBeVisible();
    await characterLink.click();

    // 페이지 이동 확인
    await expect(page).toHaveURL("/character");

    // 캐릭터 가이드 페이지 컨텐츠 확인
    const heading = page.locator("h1", { hasText: "캐릭터 가이드" });
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test("가이드 섹션의 뉴비 가이드 링크를 클릭하면 해당 페이지로 이동한다", async ({
    page,
  }) => {
    // 뉴비 가이드 링크 클릭
    const newbieGuideLink = page.locator('a[href="/newbie_guide"]').first();
    await expect(newbieGuideLink).toBeVisible();
    await newbieGuideLink.click();

    // 페이지 이동 확인
    await expect(page).toHaveURL("/newbie_guide");
  });

  test("테마 토글 버튼을 클릭하면 다크/라이트 모드가 전환된다", async ({
    page,
  }) => {
    // 테마 토글 버튼 찾기
    const themeToggle = page.locator(
      'button[aria-label="다크 모드로 전환"], button[aria-label="라이트 모드로 전환"]'
    );
    await expect(themeToggle).toBeVisible({ timeout: 5000 });

    // 현재 테마 확인 (html 요소의 class)
    const initialTheme = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );

    // 테마 토글 클릭 (force: true로 가려진 요소 문제 해결)
    await themeToggle.click({ force: true });

    // 테마가 전환되었는지 확인
    const newTheme = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(newTheme).toBe(!initialTheme);
  });

  test("테마 변경 후 페이지 새로고침해도 테마가 유지된다", async ({ page }) => {
    // 테마 토글 버튼 찾기
    const themeToggle = page.locator(
      'button[aria-label="다크 모드로 전환"], button[aria-label="라이트 모드로 전환"]'
    );
    await expect(themeToggle).toBeVisible({ timeout: 5000 });

    // 테마 토글 클릭하여 전환
    await themeToggle.click({ force: true });

    // 전환 후 테마 확인
    const themeAfterToggle = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );

    // 페이지 새로고침
    await page.reload();
    await page.waitForLoadState("domcontentloaded");

    // 배경 이미지 다시 로딩 대기
    const mainTitle = page.locator("h2", { hasText: "버틴의 여행가방" });
    await expect(mainTitle).toBeVisible({ timeout: 15000 });

    // 테마가 유지되었는지 확인
    const themeAfterReload = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(themeAfterReload).toBe(themeAfterToggle);
  });

  test("테마 토글 버튼의 아이콘이 테마에 따라 변경된다", async ({ page }) => {
    // 테마 토글 버튼 찾기
    const themeToggle = page.locator(
      'button[aria-label="다크 모드로 전환"], button[aria-label="라이트 모드로 전환"]'
    );
    await expect(themeToggle).toBeVisible({ timeout: 5000 });

    // 초기 상태의 버튼 텍스트/아이콘 확인
    const initialText = await themeToggle.textContent();

    // 테마 토글 클릭
    await themeToggle.click({ force: true });

    // 버튼 텍스트/아이콘이 변경되었는지 확인 (sun emoji vs moon emoji)
    const newText = await themeToggle.textContent();
    expect(newText).not.toBe(initialText);
  });

  test("스킨 갤러리 링크를 클릭하면 해당 페이지로 이동한다", async ({
    page,
  }) => {
    // 스킨 갤러리 링크 클릭
    const skinLink = page.locator('a[href="/skin"]').first();
    await expect(skinLink).toBeVisible();

    // 클릭 후 네비게이션 대기
    await Promise.all([
      page.waitForURL("**/skin", { timeout: 10000 }),
      skinLink.click(),
    ]);
  });

  test("퀴즈 링크를 클릭하면 해당 페이지로 이동한다", async ({ page }) => {
    // 종합 퀴즈 링크 클릭
    const quizLink = page.locator('a[href="/quiz"]').first();
    await expect(quizLink).toBeVisible();

    // 클릭 후 네비게이션 대기
    await Promise.all([
      page.waitForURL("**/quiz", { timeout: 10000 }),
      quizLink.click(),
    ]);
  });

  test("홈페이지 하단 푸터가 표시된다", async ({ page }) => {
    // 푸터 영역 스크롤
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // 푸터 내용 확인 (Policy 버튼)
    const policyButton = page.locator("button", { hasText: "Policy" });
    await expect(policyButton).toBeVisible({ timeout: 5000 });

    // 출처 버튼 확인
    const sourceButton = page.locator("button", { hasText: "출처" });
    await expect(sourceButton).toBeVisible();
  });
});

test.describe("모바일 네비게이션", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("모바일 뷰포트에서 홈페이지가 정상적으로 표시된다", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // 배경 이미지 로딩 대기
    const mainTitle = page.locator("h2", { hasText: "버틴의 여행가방" });
    await expect(mainTitle).toBeVisible({ timeout: 15000 });

    // 3개 섹션이 모바일에서도 표시되는지 확인 (h3 사용)
    const playgroundSection = page.locator("h3", { hasText: "놀이터" });
    await expect(playgroundSection).toBeVisible();

    const librarySection = page.locator("h3", { hasText: "도서관" });
    await expect(librarySection).toBeVisible();

    const guideSection = page.locator("h3", { hasText: "가이드" });
    await expect(guideSection).toBeVisible();
  });

  test("모바일에서 테마 토글이 동작한다", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // 배경 이미지 로딩 대기
    const mainTitle = page.locator("h2", { hasText: "버틴의 여행가방" });
    await expect(mainTitle).toBeVisible({ timeout: 15000 });

    // 팝업/배너가 있다면 닫기
    const dismissButton = page.locator('button:has-text("나중에")');
    if (await dismissButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await dismissButton.click();
    }

    // 테마 토글 버튼 찾기
    const themeToggle = page.locator(
      'button[aria-label="다크 모드로 전환"], button[aria-label="라이트 모드로 전환"]'
    );
    await expect(themeToggle).toBeVisible({ timeout: 5000 });

    // 현재 테마 확인
    const initialTheme = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );

    // 테마 토글 클릭
    await themeToggle.click({ force: true });

    // 테마가 전환되었는지 확인
    const newTheme = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(newTheme).toBe(!initialTheme);
  });
});
