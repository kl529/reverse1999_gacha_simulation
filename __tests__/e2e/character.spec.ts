import { test, expect } from "@playwright/test";

test.describe("캐릭터 조회 플로우", () => {
  test.beforeEach(async ({ page }) => {
    // 캐릭터 목록 페이지로 이동
    await page.goto("/character");
    await page.waitForLoadState("domcontentloaded");
  });

  test("캐릭터 목록 페이지가 로드되고 캐릭터 그리드가 표시된다", async ({
    page,
  }) => {
    // 페이지 제목 확인
    const heading = page.locator("h1");
    await expect(heading).toContainText("캐릭터 가이드");

    // 캐릭터 카드들이 표시되는지 확인 (Link 요소들)
    const characterCards = page.locator('a[href^="/character/"]');
    await expect(characterCards.first()).toBeVisible({ timeout: 10000 });

    // 최소한 여러 캐릭터가 있는지 확인
    const cardCount = await characterCards.count();
    expect(cardCount).toBeGreaterThan(10);
  });

  test("검색창에 캐릭터 이름을 입력하면 필터링된다", async ({ page }) => {
    // 검색창 확인
    const searchInput = page.locator('input[type="text"]');
    await expect(searchInput).toBeVisible();

    // 초기 캐릭터 수 확인
    const initialCards = page.locator('a[href^="/character/"]');
    await expect(initialCards.first()).toBeVisible({ timeout: 10000 });
    const initialCount = await initialCards.count();

    // 캐릭터 이름으로 검색 (예: "드루비스")
    await searchInput.fill("드루비스");

    // 디바운스 대기 (300ms + 여유)
    await page.waitForTimeout(500);

    // 필터링 후 캐릭터 수가 줄어들었는지 확인
    const filteredCards = page.locator('a[href^="/character/"]');
    const filteredCount = await filteredCards.count();
    expect(filteredCount).toBeLessThan(initialCount);
    expect(filteredCount).toBeGreaterThan(0);

    // URL에 검색어 파라미터가 반영되었는지 확인
    await expect(page).toHaveURL(/q=%EB%93%9C%EB%A3%A8%EB%B9%84%EC%8A%A4|q=드루비스/);
  });

  test("공명 타입 필터를 선택하면 해당 타입 캐릭터만 표시된다", async ({
    page,
  }) => {
    // 초기 캐릭터 수 확인
    const initialCards = page.locator('a[href^="/character/"]');
    await expect(initialCards.first()).toBeVisible({ timeout: 10000 });
    const initialCount = await initialCards.count();

    // 공명 타입 드롭다운 찾기 (필터 영역에서 첫 번째 "전체" 버튼이 공명 타입)
    // 두 드롭다운 모두 기본값이 "전체"이므로 첫 번째 것을 선택
    const typeDropdown = page.locator("button", { hasText: "전체" }).first();
    await expect(typeDropdown).toBeVisible();
    await typeDropdown.click();

    // 드롭다운 메뉴에서 "공격" 선택
    const attackOption = page.locator('[role="menuitem"]', { hasText: "공격" });
    await expect(attackOption).toBeVisible();
    await attackOption.click();

    // 필터링 후 캐릭터 수가 변경되었는지 확인
    await page.waitForTimeout(300);
    const filteredCards = page.locator('a[href^="/character/"]');
    const filteredCount = await filteredCards.count();
    expect(filteredCount).toBeLessThan(initialCount);
    expect(filteredCount).toBeGreaterThan(0);

    // URL에 type 파라미터가 반영되었는지 확인
    await expect(page).toHaveURL(/type=damage/);
  });

  test("속성 필터를 선택하면 해당 속성 캐릭터만 표시된다", async ({
    page,
  }) => {
    // 초기 캐릭터 수 확인
    const initialCards = page.locator('a[href^="/character/"]');
    await expect(initialCards.first()).toBeVisible({ timeout: 10000 });
    const initialCount = await initialCards.count();

    // 속성 드롭다운 찾기 (야수/천체/암석/나무/영혼/지능)
    const attrDropdown = page.locator("button", { hasText: "전체" }).last();
    await expect(attrDropdown).toBeVisible();
    await attrDropdown.click();

    // 드롭다운 메뉴에서 "야수" 선택
    const beastOption = page.locator('[role="menuitem"]', { hasText: "야수" });
    await expect(beastOption).toBeVisible();
    await beastOption.click();

    // 필터링 후 캐릭터 수가 변경되었는지 확인
    await page.waitForTimeout(300);
    const filteredCards = page.locator('a[href^="/character/"]');
    const filteredCount = await filteredCards.count();
    expect(filteredCount).toBeLessThan(initialCount);
    expect(filteredCount).toBeGreaterThan(0);

    // URL에 attr 파라미터가 반영되었는지 확인
    await expect(page).toHaveURL(/attr=beast/);
  });

  test("캐릭터 카드를 클릭하면 상세 페이지로 이동한다", async ({ page }) => {
    // 캐릭터 카드 확인
    const firstCharacterCard = page.locator('a[href^="/character/"]').first();
    await expect(firstCharacterCard).toBeVisible({ timeout: 10000 });

    // 캐릭터 이름 가져오기 (나중에 상세 페이지에서 확인용)
    const characterName = await firstCharacterCard
      .locator(".truncate")
      .textContent();

    // 카드 클릭
    await firstCharacterCard.click();

    // 상세 페이지로 이동했는지 확인
    await expect(page).toHaveURL(/\/character\/\d+/);

    // 캐릭터 이름이 상세 페이지에 표시되는지 확인
    const detailHeading = page.locator("h1");
    await expect(detailHeading).toContainText(characterName || "");
  });

  test("캐릭터 상세 페이지에서 정보가 표시된다", async ({ page }) => {
    // 특정 캐릭터 상세 페이지로 직접 이동 (드루비스, id=1)
    await page.goto("/character/1");
    await page.waitForLoadState("domcontentloaded");

    // 캐릭터 이름 확인
    const heading = page.locator("h1");
    await expect(heading).toContainText("드루비스");

    // 캐릭터 이미지 확인
    const characterImage = page.locator("img[alt='드루비스']").first();
    await expect(characterImage).toBeVisible({ timeout: 10000 });

    // 탭 버튼들이 표시되는지 확인
    const guideTab = page.locator("button", { hasText: "캐릭터 가이드" });
    const settingTab = page.locator("button", { hasText: "공명 & 의지" });
    await expect(guideTab).toBeVisible();
    await expect(settingTab).toBeVisible();
  });

  test("캐릭터 상세 페이지에서 탭 전환이 동작한다", async ({ page }) => {
    // 6성 캐릭터 상세 페이지로 이동 (드루비스, id=1)
    await page.goto("/character/1");
    await page.waitForLoadState("domcontentloaded");

    // 탭 버튼 확인
    const guideTab = page.locator("button", { hasText: "캐릭터 가이드" });
    const settingTab = page.locator("button", { hasText: "공명 & 의지" });
    await expect(guideTab).toBeVisible();
    await expect(settingTab).toBeVisible();

    // 기본적으로 "공명 & 의지" 탭이 활성화되어 있음
    await expect(settingTab).toHaveClass(/bg-blue-500/);

    // "캐릭터 가이드" 탭 클릭
    await guideTab.click();

    // 탭이 전환되었는지 확인
    await expect(guideTab).toHaveClass(/bg-blue-500/);
    await expect(settingTab).not.toHaveClass(/bg-blue-500/);
  });

  test("필터 초기화 버튼이 동작한다", async ({ page }) => {
    // 검색어 입력
    const searchInput = page.locator('input[type="text"]');
    await searchInput.fill("드루비스");
    await page.waitForTimeout(500);

    // 초기화 버튼이 표시되는지 확인
    const resetButton = page.locator("button", { hasText: "초기화" });
    await expect(resetButton).toBeVisible();

    // 초기화 버튼 클릭
    await resetButton.click();

    // 검색어가 비워졌는지 확인
    await expect(searchInput).toHaveValue("");

    // URL 파라미터가 제거되었는지 확인
    await expect(page).toHaveURL("/character");
  });

  test("다른 캐릭터 네비게이션 섹션이 상세 페이지에 표시된다", async ({
    page,
  }) => {
    // 캐릭터 상세 페이지로 이동
    await page.goto("/character/1");
    await page.waitForLoadState("domcontentloaded");

    // 6성 캐릭터 섹션 확인
    const sixStarSection = page.locator("h3", { hasText: "6성" });
    await expect(sixStarSection).toBeVisible({ timeout: 10000 });

    // 5성 캐릭터 섹션 확인
    const fiveStarSection = page.locator("h3", { hasText: "5성" });
    await expect(fiveStarSection).toBeVisible();

    // 다른 캐릭터 링크가 표시되는지 확인
    const otherCharacterLinks = page.locator('a[href^="/character/"]');
    const linkCount = await otherCharacterLinks.count();
    expect(linkCount).toBeGreaterThan(5);
  });
});
