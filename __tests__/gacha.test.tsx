import { calculateGachaPull, EnrichedBanner, getSixStarRate } from "@/lib/gacha/gachaLogic";
import { Character } from "@/data/characters";

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
});
