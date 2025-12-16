/**
 * 재료 조합법 데이터
 * 각 재료를 조합하는데 필요한 하위 재료와 수량을 정의
 */

export interface CraftingRecipe {
  materialId: number; // 완성될 재료의 ID
  materials: number[]; // 필요한 재료들의 ID 배열
  quantities: number[]; // 각 재료의 필요 수량
}

export const craftingRecipes: CraftingRecipe[] = [
  // ===== 6성 재료 =====
  {
    materialId: 1, // 선악과 (Fruit of Good and Evil)
    materials: [104, 105, 203, 1002], // Bogeyman, Incorrupt Monkeypaw, Prophetic Bird, Sharpodonty
    quantities: [1, 1, 4, 800],
  },
  {
    materialId: 2, // 미스틸테인 (Mistilteinn)
    materials: [103, 206, 1002], // Wyrmling Skeleton, Holy Silver, Sharpodonty
    quantities: [2, 4, 800],
  },
  {
    materialId: 3, // 황금 양털 (Golden Fleece)
    materials: [102, 201, 1002], // Platinum Ouija, Bifurcated Skeleton, Sharpodonty
    quantities: [2, 2, 800],
  },
  {
    materialId: 4, // 라인의 황금 (Rhine Gold)
    materials: [110, 109, 205, 1002], // Watch Core, Golden Bell Essence Bottle, Biting Box, Sharpodonty
    quantities: [1, 1, 2, 800],
  },
  {
    materialId: 5, // 쌍두사 지팡이 (Serpent Scepter)
    materials: [111, 107, 202, 1002], // Glowing Mothwing, Golden Compass, Salted Mandrake, Sharpodonty
    quantities: [1, 1, 2, 800],
  },

  // ===== 5성 재료 =====
  {
    materialId: 104, // 침대 밑 괴물 (Bogeyman)
    materials: [205, 206, 203, 1002], // Biting Box, Holy Silver, Prophetic Bird, Sharpodonty
    quantities: [3, 1, 2, 500],
  },
  {
    materialId: 105, // 썩지 않는 원숭이 손 (Incorrupt Monkeypaw)
    materials: [202, 201, 1002], // Salted Mandrake, Bifurcated Skeleton, Sharpodonty
    quantities: [3, 2, 500],
  },
  {
    materialId: 103, // 유룡의 뼈 표본 (Wyrmling Skeleton)
    materials: [201, 205, 1002], // Bifurcated Skeleton, Biting Box, Sharpodonty
    quantities: [3, 2, 500],
  },
  {
    materialId: 106, // 은빛 탄환 (Silver Bullet)
    materials: [206, 201, 202, 1002], // Holy Silver, Bifurcated Skeleton, Salted Mandrake, Sharpodonty
    quantities: [3, 1, 1, 500],
  },
  {
    materialId: 101, // 미치광이 헛소리 (Murmur of Insanity)
    materials: [203, 202, 1002], // Prophetic Bird, Salted Mandrake, Sharpodonty
    quantities: [3, 2, 500],
  },
  {
    materialId: 102, // 백금 점괘판 (Platinum Ouija)
    materials: [204, 206, 1002], // Clawed Pendulum, Holy Silver, Sharpodonty
    quantities: [2, 4, 500],
  },
  {
    materialId: 111, // 희미한 나방 날개등 (Glowing Mothwing)
    materials: [211, 202, 1002], // Winged Key, Salted Mandrake, Sharpodonty
    quantities: [3, 2, 500],
  },
  {
    materialId: 110, // 바퀴와 축의 심 (Watch Core)
    materials: [210, 206, 205, 1002], // Goose Neck, Holy Silver, Biting Box, Sharpodonty
    quantities: [3, 1, 1, 500],
  },
  {
    materialId: 107, // 적금 나침반 (Golden Compass)
    materials: [207, 201, 1002], // Golden Beetle, Bifurcated Skeleton, Sharpodonty
    quantities: [2, 4, 500],
  },
  {
    materialId: 109, // 금종 영혼의 병 (Golden Bell Essence Bottle)
    materials: [209, 204, 201, 1002], // Golden Herb Incense, Clawed Pendulum, Bifurcated Skeleton, Sharpodonty
    quantities: [3, 1, 1, 500],
  },
  {
    materialId: 108, // 에메랄드 타블렛 (Emerald Slate / Jadeite Tablet)
    materials: [208, 211, 1002], // Red Lacquer Tablet, Winged Key, Sharpodonty
    quantities: [3, 2, 500],
  },

  // ===== 4성 재료 =====
  {
    materialId: 205, // 이빨 상자 (Biting Box)
    materials: [303, 306, 1002], // Liquefied Terror, Spell of Fortune, Sharpodonty
    quantities: [3, 1, 300],
  },
  {
    materialId: 202, // 맨드레이크 절임 (Salted Mandrake)
    materials: [302, 304, 1002], // Milled Magnesia, Esoteric Bones, Sharpodonty
    quantities: [3, 1, 300],
  },
  {
    materialId: 201, // 쌍두골 (Bifurcated Skeleton)
    materials: [304, 305, 1002], // Esoteric Bones, Rough Silver Ingot, Sharpodonty
    quantities: [3, 1, 300],
  },
  {
    materialId: 206, // 신성한 은괴 (Holy Silver)
    materials: [305, 303, 1002], // Rough Silver Ingot, Liquefied Terror, Sharpodonty
    quantities: [3, 1, 300],
  },
  {
    materialId: 203, // 스마트 버드 (Prophetic Bird)
    materials: [306, 1002], // Spell of Fortune, Sharpodonty
    quantities: [4, 300],
  },
  {
    materialId: 204, // 황금 펜듈럼 (Clawed Pendulum)
    materials: [301, 305, 1002], // Solidus, Rough Silver Ingot, Sharpodonty
    quantities: [2, 2, 400],
  },
  {
    materialId: 211, // 날개 열쇠 (Winged Key)
    materials: [310, 302, 1002], // Cicada Wings, Milled Magnesia, Sharpodonty
    quantities: [3, 1, 300],
  },
  {
    materialId: 210, // 굽은 거위 목 (Goose Neck)
    materials: [309, 306, 1002], // Perpetual Cog, Spell of Fortune, Sharpodonty
    quantities: [3, 1, 300],
  },
  {
    materialId: 207, // 사금 딱정벌레 (Golden Beetle)
    materials: [301, 304, 1002], // Solidus, Esoteric Bones, Sharpodonty
    quantities: [2, 2, 400],
  },
  {
    materialId: 209, // 풀 냄새 향 (Golden Grass Incense / Golden Herb Incense)
    materials: [308, 310, 1002], // Fox Tail (Alopecurus Pratensis), Cicada Wings, Sharpodonty
    quantities: [3, 1, 300],
  },
  {
    materialId: 208, // 붉은 점토판 (Red Lacquer Tablet)
    materials: [307, 309, 1002], // Luminite Ore (Pyroxene Ore), Perpetual Cog, Sharpodonty
    quantities: [3, 1, 300],
  },

  // ===== 3성 재료 =====
  {
    materialId: 303, // 액체 전율 (Liquefied Terror)
    materials: [405, 1002], // Trembling Tooth, Sharpodonty
    quantities: [3, 150],
  },
  {
    materialId: 302, // 고운 소금 (Milled Magnesia)
    materials: [404, 1002], // Magnesia Crystal, Sharpodonty
    quantities: [4, 150],
  },
  {
    materialId: 304, // 정체불명의 뼈 (Esoteric Bones)
    materials: [403, 1002], // Shattered Bones, Sharpodonty
    quantities: [4, 150],
  },
  {
    materialId: 305, // 투박한 은괴 (Rough Silver Ingot)
    materials: [402, 1002], // Silver Ore, Sharpodonty
    quantities: [4, 150],
  },
  {
    materialId: 306, // 행운의 주문 (Spell of Fortune)
    materials: [401, 1002], // Spell of Banishing, Sharpodonty
    quantities: [4, 150],
  },
  {
    materialId: 301, // 로마 금화 (Solidus)
    materials: [402, 401, 1002], // Silver Ore, Spell of Banishing, Sharpodonty
    quantities: [5, 5, 200],
  },

  // ===== 공명 재료 =====
  {
    materialId: 602, // 순간의 소란 (Brief Cacophony)
    materials: [601], // Moment of Dissonance
    quantities: [4],
  },
  {
    materialId: 603, // 아득한 울림 (Sonorous Knell)
    materials: [602], // Brief Cacophony
    quantities: [3],
  },
];

/**
 * 특정 재료의 조합법을 찾는 헬퍼 함수
 */
export function getCraftingRecipe(materialId: number): CraftingRecipe | undefined {
  return craftingRecipes.find((recipe) => recipe.materialId === materialId);
}

/**
 * 재료가 조합 가능한지 확인
 */
export function isCraftable(materialId: number): boolean {
  return craftingRecipes.some((recipe) => recipe.materialId === materialId);
}

/**
 * 특정 재료를 만드는데 필요한 모든 하위 재료를 재귀적으로 계산
 * @param materialId 목표 재료 ID
 * @param quantity 필요한 수량
 * @returns 재료 ID를 키로, 필요 수량을 값으로 하는 객체
 */
export function calculateRequiredMaterials(
  materialId: number,
  quantity: number = 1
): Record<number, number> {
  const result: Record<number, number> = {};
  const recipe = getCraftingRecipe(materialId);

  if (!recipe) {
    // 조합 불가능한 재료 (기본 재료)
    result[materialId] = quantity;
    return result;
  }

  // 재귀적으로 하위 재료 계산
  for (let i = 0; i < recipe.materials.length; i++) {
    const subMaterialId = recipe.materials[i];
    const subQuantity = recipe.quantities[i] * quantity;

    const subMaterials = calculateRequiredMaterials(subMaterialId, subQuantity);
    for (const [id, qty] of Object.entries(subMaterials)) {
      const numId = parseInt(id);
      result[numId] = (result[numId] || 0) + qty;
    }
  }

  return result;
}
