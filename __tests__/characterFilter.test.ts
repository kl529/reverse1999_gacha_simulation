import { filterCharacters } from "@/lib/utils/characterFilter";
import { Character } from "@/data/characters";

describe("characterFilter", () => {
  // Mock characters for testing
  const mockCharacters: Character[] = [
    {
      id: 1,
      name: "드루비스",
      rarity: 6,
      inspiration: "plant",
      engName: "druvis-iii",
      version: "1.0",
      resonanceType: "balance",
    },
    {
      id: 2,
      name: "릴리아",
      rarity: 6,
      inspiration: "star",
      engName: "lilya",
      version: "1.0",
      resonanceType: "damage",
    },
    {
      id: 3,
      name: "A 나이트",
      rarity: 6,
      inspiration: "spirit",
      engName: "a-knight",
      version: "1.0",
      resonanceType: "balance",
    },
    {
      id: 4,
      name: "소더비",
      rarity: 6,
      inspiration: "plant",
      engName: "sotheby",
      version: "1.0",
      resonanceType: "balance",
    },
    {
      id: 5,
      name: "레굴루스",
      rarity: 6,
      inspiration: "star",
      engName: "regulus",
      version: "1.0",
      resonanceType: "support",
    },
    {
      id: 6,
      name: "센츄리온",
      rarity: 6,
      inspiration: "beast",
      engName: "centurion",
      version: "1.0",
      resonanceType: "damage",
    },
  ];

  describe("search by Korean name", () => {
    it("filters by exact Korean name match", () => {
      const result = filterCharacters(mockCharacters, "드루비스", "all");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("드루비스");
    });

    it("filters by partial Korean name match", () => {
      const result = filterCharacters(mockCharacters, "드루", "all");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("드루비스");
    });

    it("returns empty array for non-matching Korean name", () => {
      const result = filterCharacters(mockCharacters, "존재하지않는", "all");
      expect(result).toHaveLength(0);
    });
  });

  describe("search by English name", () => {
    it("filters by English name (lowercase)", () => {
      const result = filterCharacters(mockCharacters, "druvis", "all");
      expect(result).toHaveLength(1);
      expect(result[0].engName).toBe("druvis-iii");
    });

    it("filters by English name (uppercase) - case insensitive", () => {
      const result = filterCharacters(mockCharacters, "DRUVIS", "all");
      expect(result).toHaveLength(1);
      expect(result[0].engName).toBe("druvis-iii");
    });

    it("filters by English name (mixed case) - case insensitive", () => {
      const result = filterCharacters(mockCharacters, "DrUvIs", "all");
      expect(result).toHaveLength(1);
      expect(result[0].engName).toBe("druvis-iii");
    });

    it("filters by partial English name", () => {
      const result = filterCharacters(mockCharacters, "lily", "all");
      expect(result).toHaveLength(1);
      expect(result[0].engName).toBe("lilya");
    });
  });

  describe("filter by attribute (inspiration)", () => {
    it("returns all characters when attribute is 'all'", () => {
      const result = filterCharacters(mockCharacters, "", "all");
      expect(result).toHaveLength(6);
    });

    it("filters by plant inspiration", () => {
      const result = filterCharacters(mockCharacters, "", "plant");
      expect(result).toHaveLength(2);
      expect(result.every((ch) => ch.inspiration === "plant")).toBe(true);
    });

    it("filters by star inspiration", () => {
      const result = filterCharacters(mockCharacters, "", "star");
      expect(result).toHaveLength(2);
      expect(result.every((ch) => ch.inspiration === "star")).toBe(true);
    });

    it("filters by spirit inspiration", () => {
      const result = filterCharacters(mockCharacters, "", "spirit");
      expect(result).toHaveLength(1);
      expect(result[0].inspiration).toBe("spirit");
    });

    it("filters by beast inspiration", () => {
      const result = filterCharacters(mockCharacters, "", "beast");
      expect(result).toHaveLength(1);
      expect(result[0].inspiration).toBe("beast");
    });

    it("returns empty array for non-existent inspiration", () => {
      const result = filterCharacters(mockCharacters, "", "mineral");
      expect(result).toHaveLength(0);
    });
  });

  describe("combined search and filter", () => {
    it("filters by both search query and attribute", () => {
      // Search for "드루" with plant attribute - should find druvis
      const result = filterCharacters(mockCharacters, "드루", "plant");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("드루비스");
    });

    it("returns empty when search matches but attribute does not", () => {
      // Search for "드루" with star attribute - druvis is plant, not star
      const result = filterCharacters(mockCharacters, "드루", "star");
      expect(result).toHaveLength(0);
    });

    it("returns empty when attribute matches but search does not", () => {
      // Search for non-existent name with valid attribute
      const result = filterCharacters(mockCharacters, "없는캐릭터", "plant");
      expect(result).toHaveLength(0);
    });

    it("filters multiple characters matching both criteria", () => {
      // "l" in English name + star attribute
      const result = filterCharacters(mockCharacters, "l", "star");
      // lilya and regulus both have 'l' and are star
      expect(result).toHaveLength(2);
    });
  });

  describe("edge cases", () => {
    it("handles empty character list", () => {
      const result = filterCharacters([], "드루", "all");
      expect(result).toHaveLength(0);
    });

    it("handles empty search query with 'all' attribute", () => {
      const result = filterCharacters(mockCharacters, "", "all");
      expect(result).toHaveLength(6);
    });

    it("handles whitespace in search query", () => {
      // "A 나이트" has a space in the name
      const result = filterCharacters(mockCharacters, "A 나이트", "all");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("A 나이트");
    });

    it("handles hyphen in English name search", () => {
      // "druvis-iii" has hyphens
      const result = filterCharacters(mockCharacters, "druvis-iii", "all");
      expect(result).toHaveLength(1);
      expect(result[0].engName).toBe("druvis-iii");
    });
  });
});
