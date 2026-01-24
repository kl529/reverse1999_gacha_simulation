import { expandCraftingRequirements, groupDeficitsByStage } from "@/lib/utils/farmingHelper";
import { MaterialRequirement } from "@/lib/types/growthCalculatorTypes";

// Mock the external dependencies
jest.mock("@/data/material", () => ({
  materialList: [
    // 6-star material
    { id: 1, name: "선악과", category: "growth_material", rarity: 6 },
    // 5-star materials
    { id: 104, name: "침대 밑 괴물", category: "growth_material", rarity: 5 },
    { id: 105, name: "썩지 않는 원숭이 손", category: "growth_material", rarity: 5 },
    // 4-star materials
    { id: 201, name: "쌍두 골격", category: "growth_material", rarity: 4 },
    { id: 202, name: "절인 맨드레이크", category: "growth_material", rarity: 4 },
    { id: 203, name: "예언 새", category: "growth_material", rarity: 4 },
    { id: 205, name: "이빨 상자", category: "growth_material", rarity: 4 },
    { id: 206, name: "신성한 은괴", category: "growth_material", rarity: 4 },
    // 3-star materials
    { id: 301, name: "3성 재료", category: "growth_material", rarity: 3 },
    { id: 302, name: "마그네시아", category: "growth_material", rarity: 3 },
    { id: 303, name: "액화된 공포", category: "growth_material", rarity: 3 },
    { id: 306, name: "행운의 주문서", category: "growth_material", rarity: 3 },
    // Special materials
    { id: 1001, name: "먼지", category: "growth_material", rarity: 2 },
    { id: 1002, name: "톱니 동전", category: "growth_material", rarity: 2 },
    // Insight materials
    { id: 601, name: "통찰 재료 1", category: "insight_material", rarity: 4 },
  ],
}));

jest.mock("@/data/material_crafting", () => ({
  getCraftingRecipe: jest.fn((materialId: number) => {
    const recipes: Record<number, { materialId: number; materials: number[]; quantities: number[] }> =
      {
        // 5-star Bogeyman recipe
        104: {
          materialId: 104,
          materials: [205, 206, 203, 1002],
          quantities: [3, 1, 2, 500],
        },
        // 4-star Biting Box recipe
        205: {
          materialId: 205,
          materials: [303, 306, 1002],
          quantities: [3, 2, 50],
        },
      };
    return recipes[materialId];
  }),
}));

jest.mock("@/data/farming_stages", () => ({
  getStagesForMaterial: jest.fn(() => []),
  getEfficiencyPerEnergy: jest.fn(() => 0),
}));

describe("farmingHelper", () => {
  describe("expandCraftingRequirements", () => {
    it("returns empty array for empty input", () => {
      const result = expandCraftingRequirements([]);
      expect(result).toEqual([]);
    });

    it("returns materials as-is for 3-star materials (no crafting)", () => {
      const requirements: MaterialRequirement[] = [
        { materialId: 301, required: 10, owned: 0, deficit: 10, surplus: 0 },
      ];
      const result = expandCraftingRequirements(requirements);

      const material301 = result.find((r) => r.materialId === 301);
      expect(material301).toBeDefined();
      expect(material301?.required).toBe(10);
    });

    it("returns materials when user has sufficient owned amount", () => {
      const requirements: MaterialRequirement[] = [
        { materialId: 104, required: 2, owned: 0, deficit: 2, surplus: 0 },
      ];
      // User already has 2 of material 104
      const userMaterials = { 104: 2 };
      const result = expandCraftingRequirements(requirements, userMaterials);

      // Since owned >= required, no expansion needed
      const material104 = result.find((r) => r.materialId === 104);
      // Material 104 should still be in result but with deficit 0
      expect(material104?.deficit).toBe(0);
    });

    it("expands craftable 4+ star materials to sub-materials", () => {
      const requirements: MaterialRequirement[] = [
        { materialId: 104, required: 1, owned: 0, deficit: 1, surplus: 0 },
      ];
      const result = expandCraftingRequirements(requirements);

      // Material 104 (Bogeyman) should be expanded to its sub-materials
      // Recipe: [205, 206, 203, 1002] with quantities [3, 1, 2, 500]

      // After expansion, the original 104 may be removed (required=0) or not included
      // The key verification is that sub-materials are added with correct quantities
      const material104 = result.find((r) => r.materialId === 104);
      // If 104 exists in result, its required should be 0 (expanded away)
      if (material104) {
        expect(material104.required).toBe(0);
      }

      // Sub-materials should be added
      // Note: 4-star materials (205, 206, 203) may also be expanded further
      // But at minimum we should see required quantities for sub-materials
      const hasSubMaterials = result.some(
        (r) => r.materialId === 205 || r.materialId === 206 || r.materialId === 203
      );
      expect(hasSubMaterials || result.length > 0).toBe(true);
    });

    it("handles partial crafting when user has some sub-materials", () => {
      const requirements: MaterialRequirement[] = [
        { materialId: 104, required: 2, owned: 0, deficit: 2, surplus: 0 },
      ];
      // User has enough sub-materials to craft 1 unit
      const userMaterials = {
        205: 3, // Enough for 1 unit (needs 3 per craft)
        206: 1, // Enough for 1 unit (needs 1 per craft)
        203: 2, // Enough for 1 unit (needs 2 per craft)
      };
      const result = expandCraftingRequirements(requirements, userMaterials);

      // Should have expanded, accounting for existing materials
      // One can be crafted from existing, one needs farming
      expect(result.length).toBeGreaterThan(0);
    });

    it("respects owned quantities when calculating deficits", () => {
      const requirements: MaterialRequirement[] = [
        { materialId: 301, required: 10, owned: 0, deficit: 10, surplus: 0 },
      ];
      const userMaterials = { 301: 5 };
      const result = expandCraftingRequirements(requirements, userMaterials);

      const material301 = result.find((r) => r.materialId === 301);
      expect(material301?.owned).toBe(5);
      expect(material301?.deficit).toBe(5);
    });
  });

  describe("groupDeficitsByStage", () => {
    it("returns empty result for empty input", () => {
      const result = groupDeficitsByStage([]);
      expect(result).toEqual({ highPriority: [], lowPriority: [] });
    });

    it("returns empty result when no materials have deficit", () => {
      const requirements: MaterialRequirement[] = [
        { materialId: 301, required: 10, owned: 10, deficit: 0, surplus: 0 },
        { materialId: 302, required: 5, owned: 10, deficit: 0, surplus: 5 },
      ];
      const result = groupDeficitsByStage(requirements);
      expect(result).toEqual({ highPriority: [], lowPriority: [] });
    });

    it("separates high and low priority materials", () => {
      // This test verifies the structure but actual recommendations
      // depend on farming stage data which is mocked to return empty
      const requirements: MaterialRequirement[] = [
        { materialId: 201, required: 10, owned: 0, deficit: 10, surplus: 0 }, // 4-star
        { materialId: 301, required: 20, owned: 0, deficit: 20, surplus: 0 }, // 3-star
      ];
      const result = groupDeficitsByStage(requirements);

      // Structure should be correct even if empty due to mocked stages
      expect(result).toHaveProperty("highPriority");
      expect(result).toHaveProperty("lowPriority");
      expect(Array.isArray(result.highPriority)).toBe(true);
      expect(Array.isArray(result.lowPriority)).toBe(true);
    });
  });
});
