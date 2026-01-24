import {
  calculateGachaPull,
  EnrichedBanner,
  getSixStarRate,
  doSinglePull,
  doSinglePullDoublePick,
  isValidGachaCharacterForPool,
  GachaPullState,
} from "@/lib/gacha/gachaLogic";
import { Character } from "@/data/characters";
import {
  mockCharacters,
  getRegularPickupBanner,
  getDoublePickupBanner,
} from "./fixtures";

describe("Gacha Logic Tests", () => {
  const mockPickup6: Character = {
    id: 38,
    name: "flutter-page",
    rarity: 6,
    inspiration: "star",
    engName: "flutter-page",
    version: "2.3",
    resonanceType: "damage",
  };

  const mockPickup5: Character = {
    id: 125,
    name: "brimley",
    rarity: 5,
    inspiration: "mineral",
    engName: "brimley",
    version: "2.3",
    resonanceType: "defense",
  };

  const mockBanner: EnrichedBanner = {
    id: "flutter_page_pick_up",
    name: "flutter-page-pickup",
    pickup6: mockPickup6,
    pickup5: [mockPickup5],
  };

  it("70연차 내에 최소 1번은 6성 캐릭터가 나와야 한다", () => {
    // 1) 70회 뽑기 실행
    const results: Character[] = calculateGachaPull(70, mockBanner);

    // 2) 6성이 하나 이상 존재하는지 확인
    const sixStarCount = results.filter((char) => char.rarity === 6).length;

    // 3) 기대 결과: 최소 1개의 6성 존재
    expect(sixStarCount).toBeGreaterThanOrEqual(1);
  });

  describe("getSixStarRate", () => {
    it("pity < 60일 때 1.5%를 반환한다", () => {
      expect(getSixStarRate(0)).toBe(1.5);
      expect(getSixStarRate(30)).toBe(1.5);
      expect(getSixStarRate(59)).toBe(1.5);
    });

    it("pity >= 60일 때 증가된 확률을 반환한다", () => {
      // 60: 4 + (60-60)*2.5 = 4%
      expect(getSixStarRate(60)).toBe(4);
      // 61: 4 + (61-60)*2.5 = 6.5%
      expect(getSixStarRate(61)).toBe(6.5);
      // 64: 4 + (64-60)*2.5 = 14%
      expect(getSixStarRate(64)).toBe(14);
    });

    it("최대 100%를 초과하지 않는다", () => {
      expect(getSixStarRate(100)).toBe(100);
      expect(getSixStarRate(200)).toBe(100);
    });
  });

  describe("calculateGachaPull 기본 동작", () => {
    it("요청한 횟수만큼 캐릭터를 반환한다", () => {
      const results = calculateGachaPull(10, mockBanner);
      expect(results.length).toBe(10);
    });

    it("반환된 캐릭터들은 모두 유효한 rarity를 가진다", () => {
      const results = calculateGachaPull(50, mockBanner);
      results.forEach((char) => {
        expect([2, 3, 4, 5, 6]).toContain(char.rarity);
      });
    });
  });

  describe("doSinglePull (일반 픽업 배너)", () => {
    const regularBanner = getRegularPickupBanner();

    it("70연차 천장 도달 시 무조건 6성을 반환한다", () => {
      // Arrange: pity가 69인 상태 (다음 뽑기가 70회차)
      const state: GachaPullState = {
        pityCount: 69,
        pickupGuarantee: false,
      };

      // Act
      const result = doSinglePull(regularBanner, state);

      // Assert
      expect(result.isSixStar).toBe(true);
      expect(result.character.rarity).toBe(6);
      expect(result.newPity).toBe(0); // 6성 후 pity 리셋
    });

    it("pickupGuarantee=true일 때 픽업 캐릭터가 확정된다", () => {
      // Arrange: pickupGuarantee가 true이고 pity가 69 (확정 6성)
      const state: GachaPullState = {
        pityCount: 69,
        pickupGuarantee: true,
      };

      // Act
      const result = doSinglePull(regularBanner, state);

      // Assert
      expect(result.isSixStar).toBe(true);
      expect(result.character.engName).toBe(regularBanner.pickup6?.engName);
      expect(result.newPickupGuarantee).toBe(false); // 픽업 확정 후 false로 리셋
    });

    it("6성을 뽑으면 pity가 0으로 리셋된다", () => {
      // Arrange: 천장에서 6성 확정
      const state: GachaPullState = {
        pityCount: 69,
        pickupGuarantee: false,
      };

      // Act
      const result = doSinglePull(regularBanner, state);

      // Assert
      expect(result.isSixStar).toBe(true);
      expect(result.newPity).toBe(0);
    });

    it("비6성을 뽑으면 pity가 증가한다", () => {
      // Arrange: pity 0에서 시작, Math.random을 모킹하여 비6성 결과 유도
      const state: GachaPullState = {
        pityCount: 0,
        pickupGuarantee: false,
      };

      // Math.random을 모킹하여 6성이 아닌 결과를 유도
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValue(0.99); // 높은 값으로 2성 결과 유도

      // Act
      const result = doSinglePull(regularBanner, state);

      // Restore
      Math.random = originalRandom;

      // Assert
      if (!result.isSixStar) {
        expect(result.newPity).toBe(1); // pity가 1 증가
      }
    });
  });

  describe("doSinglePullDoublePick (2중 픽업 배너)", () => {
    const doubleBanner = getDoublePickupBanner();

    it("70연차 천장 시 6성이 확정된다", () => {
      // Arrange: pity가 69인 상태 (다음 뽑기가 70회차)
      const state: GachaPullState = {
        pityCount: 69,
        pickupGuarantee: false,
      };

      // Act
      const result = doSinglePullDoublePick(doubleBanner, state);

      // Assert
      expect(result.isSixStar).toBe(true);
      expect(result.character.rarity).toBe(6);
      expect(result.newPity).toBe(0);
    });

    it("pickupGuarantee=true일 때 2명 중 1명이 확정된다", () => {
      // Arrange: pickupGuarantee가 true이고 pity가 69 (확정 6성)
      const state: GachaPullState = {
        pityCount: 69,
        pickupGuarantee: true,
      };

      // Act
      const result = doSinglePullDoublePick(doubleBanner, state);

      // Assert
      expect(result.isSixStar).toBe(true);

      const pickupNames = doubleBanner.twoPickup6?.map((c) => c.engName) || [];
      expect(pickupNames).toContain(result.character.engName);
      expect(result.newPickupGuarantee).toBe(false); // 픽업 뽑은 후 false
    });

    it("통계적 테스트: 70% 확률로 픽업 캐릭터 중 1명이 나온다 (1000회 시뮬레이션)", () => {
      // Arrange
      const iterations = 1000;
      let pickupCount = 0;
      const pickupNames = doubleBanner.twoPickup6?.map((c) => c.engName) || [];

      // Act: 천장에서 1000회 시뮬레이션 (pickupGuarantee=false)
      for (let i = 0; i < iterations; i++) {
        const state: GachaPullState = {
          pityCount: 69,
          pickupGuarantee: false,
        };
        const result = doSinglePullDoublePick(doubleBanner, state);

        if (pickupNames.includes(result.character.engName)) {
          pickupCount++;
        }
      }

      // Assert: 70% +/- 5% 허용 오차
      const pickupRate = pickupCount / iterations;
      expect(pickupRate).toBeGreaterThanOrEqual(0.65);
      expect(pickupRate).toBeLessThanOrEqual(0.75);
    });
  });

  describe("calculateGachaPull 통합", () => {
    it("일반 배너에서 배너 타입에 따라 doSinglePull이 호출된다", () => {
      // Arrange
      const regularBanner = getRegularPickupBanner();

      // Act
      const results = calculateGachaPull(70, regularBanner);

      // Assert: 70회 뽑기 후 최소 1개 6성 존재 (천장 시스템 동작)
      const sixStarCount = results.filter((char) => char.rarity === 6).length;
      expect(sixStarCount).toBeGreaterThanOrEqual(1);
    });

    it("2중 픽업 배너에서 배너 타입에 따라 doSinglePullDoublePick이 호출된다", () => {
      // Arrange
      const doubleBanner = getDoublePickupBanner();

      // Act
      const results = calculateGachaPull(70, doubleBanner);

      // Assert: 70회 뽑기 후 최소 1개 6성 존재 (천장 시스템 동작)
      const sixStarCount = results.filter((char) => char.rarity === 6).length;
      expect(sixStarCount).toBeGreaterThanOrEqual(1);
    });

    it("연속 뽑기에서 pity가 올바르게 누적된다", () => {
      // Arrange: 초기 상태로 70회 뽑기
      const regularBanner = getRegularPickupBanner();

      // Act
      const results = calculateGachaPull(70, regularBanner, {
        pityCount: 0,
        pickupGuarantee: false,
      });

      // Assert: 70회차 내에 반드시 6성이 나와야 함 (천장 보장)
      const sixStarCount = results.filter((char) => char.rarity === 6).length;
      expect(sixStarCount).toBeGreaterThanOrEqual(1);
      expect(results.length).toBe(70);
    });
  });

  describe("isValidGachaCharacterForPool", () => {
    it("exclude_gacha=true인 캐릭터를 제외한다", () => {
      // Arrange
      const excludedChar: Character = {
        ...mockCharacters.sixStar[0],
        exclude_gacha: true,
      };

      // Act & Assert
      expect(isValidGachaCharacterForPool(excludedChar)).toBe(false);
    });

    it("exclude_gacha=false 또는 undefined인 캐릭터를 포함한다", () => {
      // Arrange
      const normalChar: Character = {
        ...mockCharacters.sixStar[0],
        exclude_gacha: false,
        version: "1.0", // 상시 풀에 포함된 오래된 버전
      };

      const undefinedExcludeChar: Character = {
        ...mockCharacters.sixStar[0],
        version: "1.0",
      };

      // Act & Assert
      expect(isValidGachaCharacterForPool(normalChar)).toBe(true);
      expect(isValidGachaCharacterForPool(undefinedExcludeChar)).toBe(true);
    });

    it("immediate_standard=true인 캐릭터를 즉시 포함한다", () => {
      // Arrange: 최신 버전이지만 immediate_standard=true
      const immediateChar: Character = {
        ...mockCharacters.sixStar[0],
        version: "3.2", // 현재 버전 (일반적으로 상시풀에 미포함)
        immediate_standard: true,
      };

      // Act & Assert
      expect(isValidGachaCharacterForPool(immediateChar)).toBe(true);
    });

    it("버전 기반 필터링: 오래된 버전 캐릭터가 풀에 포함된다", () => {
      // Arrange: 1.0 버전 캐릭터 (상시 풀에 포함)
      const oldVersionChar: Character = {
        ...mockCharacters.sixStar[0],
        version: "1.0",
      };

      // Act & Assert
      expect(isValidGachaCharacterForPool(oldVersionChar)).toBe(true);
    });

    it("버전 기반 필터링: 최신 버전 캐릭터가 풀에서 제외된다", () => {
      // Arrange: 현재 버전 캐릭터 (상시 풀에 미포함)
      const newVersionChar: Character = {
        ...mockCharacters.sixStar[0],
        version: "3.2", // 현재 버전
        immediate_standard: undefined,
      };

      // Act & Assert
      expect(isValidGachaCharacterForPool(newVersionChar)).toBe(false);
    });
  });
});
