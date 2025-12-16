/**
 * 파밍 스테이지 데이터
 * 실제 플레이 통계를 기반으로 한 드롭률 정보 포함
 */

export interface MaterialDrop {
  materialId: number;
  count: number; // 총 드롭 수
}

export interface StageData {
  id: number;
  name: string; // 스테이지 이름 (예: "2-6H")
  category: "Hard" | "Story"; // 난이도
  cost: number; // 체력 소모량
  totalAttempts: number; // 총 시도 횟수
  drops: MaterialDrop[]; // 드롭된 재료들
}

export const farmingStages: StageData[] = [
  // ===== Chapter 2 Hard =====
  {
    id: 9003,
    name: "2-3H",
    category: "Hard",
    cost: 16,
    totalAttempts: 167,
    drops: [
      { materialId: 303, count: 2 }, // Liquefied Terror
      { materialId: 302, count: 2 }, // Milled Magnesia
      { materialId: 304, count: 4 }, // Esoteric Bones
      { materialId: 402, count: 270 }, // Silver Ore
      { materialId: 305, count: 3 }, // Rough Silver Ingot
      { materialId: 206, count: 58 }, // Holy Silver
      { materialId: 306, count: 4 }, // Spell of Fortune
      { materialId: 310, count: 5 }, // Cicada Wings
      { materialId: 309, count: 1 }, // Perpetual Cog
      { materialId: 308, count: 6 }, // Fox Tail
      { materialId: 307, count: 14 }, // Luminite Ore
    ],
  },
  {
    id: 9004,
    name: "2-6H",
    category: "Hard",
    cost: 16,
    totalAttempts: 1190,
    drops: [
      { materialId: 303, count: 20 }, // Liquefied Terror
      { materialId: 302, count: 18 }, // Milled Magnesia
      { materialId: 304, count: 30 }, // Esoteric Bones
      { materialId: 305, count: 35 }, // Rough Silver Ingot
      { materialId: 401, count: 2372 }, // Spell of Banishing
      { materialId: 306, count: 38 }, // Spell of Fortune
      { materialId: 203, count: 551 }, // Prophetic Bird
      { materialId: 310, count: 26 }, // Cicada Wings
      { materialId: 309, count: 18 }, // Perpetual Cog
      { materialId: 308, count: 22 }, // Fox Tail
      { materialId: 307, count: 29 }, // Luminite Ore
    ],
  },
  {
    id: 9005,
    name: "2-8H",
    category: "Hard",
    cost: 16,
    totalAttempts: 312,
    drops: [
      { materialId: 303, count: 6 }, // Liquefied Terror
      { materialId: 302, count: 7 }, // Milled Magnesia
      { materialId: 403, count: 502 }, // Shattered Bones
      { materialId: 304, count: 9 }, // Esoteric Bones
      { materialId: 201, count: 97 }, // Bifurcated Skeleton
      { materialId: 305, count: 8 }, // Rough Silver Ingot
      { materialId: 306, count: 12 }, // Spell of Fortune
      { materialId: 310, count: 11 }, // Cicada Wings
      { materialId: 309, count: 2 }, // Perpetual Cog
      { materialId: 308, count: 2 }, // Fox Tail
      { materialId: 307, count: 2 }, // Luminite Ore
    ],
  },
  {
    id: 9006,
    name: "2-9H",
    category: "Hard",
    cost: 16,
    totalAttempts: 217,
    drops: [
      { materialId: 404, count: 217 }, // Magnesia Crystal
      { materialId: 202, count: 55 }, // Salted Mandrake
      { materialId: 401, count: 146 }, // Spell of Banishing
      { materialId: 306, count: 32 }, // Spell of Fortune
    ],
  },
  {
    id: 9007,
    name: "2-12H",
    category: "Hard",
    cost: 18,
    totalAttempts: 167,
    drops: [
      { materialId: 405, count: 160 }, // Trembling Tooth
      { materialId: 303, count: 2 }, // Liquefied Terror
      { materialId: 205, count: 48 }, // Biting Box
      { materialId: 302, count: 2 }, // Milled Magnesia
      { materialId: 304, count: 3 }, // Esoteric Bones
      { materialId: 305, count: 4 }, // Rough Silver Ingot
      { materialId: 306, count: 4 }, // Spell of Fortune
      { materialId: 310, count: 3 }, // Cicada Wings
      { materialId: 309, count: 3 }, // Perpetual Cog
      { materialId: 308, count: 2 }, // Fox Tail
      { materialId: 307, count: 2 }, // Luminite Ore
    ],
  },

  // ===== Chapter 3 =====
  {
    id: 9016,
    name: "3-13H",
    category: "Hard",
    cost: 18,
    totalAttempts: 6120,
    drops: [
      { materialId: 404, count: 4156 }, // Magnesia Crystal
      { materialId: 302, count: 842 }, // Milled Magnesia
      { materialId: 202, count: 2088 }, // Salted Mandrake
      { materialId: 101, count: 139 }, // Murmur of Insanity
    ],
  },
  {
    id: 9017,
    name: "3-15",
    category: "Story",
    cost: 14,
    totalAttempts: 2424,
    drops: [
      { materialId: 405, count: 27 }, // Trembling Tooth
      { materialId: 303, count: 46 }, // Liquefied Terror
      { materialId: 302, count: 52 }, // Milled Magnesia
      { materialId: 403, count: 1897 }, // Shattered Bones
      { materialId: 304, count: 70 }, // Esoteric Bones
      { materialId: 305, count: 83 }, // Rough Silver Ingot
      { materialId: 401, count: 3 }, // Spell of Banishing
      { materialId: 306, count: 93 }, // Spell of Fortune
      { materialId: 310, count: 46 }, // Cicada Wings
      { materialId: 309, count: 48 }, // Perpetual Cog
      { materialId: 308, count: 52 }, // Fox Tail
      { materialId: 307, count: 47 }, // Luminite Ore
      { materialId: 207, count: 487 }, // Golden Beetle
    ],
  },

  // ===== Chapter 4 =====
  {
    id: 9019,
    name: "4-4",
    category: "Story",
    cost: 16,
    totalAttempts: 1811,
    drops: [
      { materialId: 405, count: 11 }, // Trembling Tooth
      { materialId: 303, count: 37 }, // Liquefied Terror
      { materialId: 302, count: 39 }, // Milled Magnesia
      { materialId: 403, count: 1258 }, // Shattered Bones
      { materialId: 304, count: 53 }, // Esoteric Bones
      { materialId: 305, count: 67 }, // Rough Silver Ingot
      { materialId: 401, count: 20 }, // Spell of Banishing
      { materialId: 306, count: 67 }, // Spell of Fortune
      { materialId: 310, count: 30 }, // Cicada Wings
      { materialId: 309, count: 31 }, // Perpetual Cog
      { materialId: 308, count: 29 }, // Fox Tail
      { materialId: 209, count: 507 }, // Golden Herb Incense
      { materialId: 307, count: 38 }, // Luminite Ore
    ],
  },
  {
    id: 9027,
    name: "4-20H",
    category: "Hard",
    cost: 18,
    totalAttempts: 8574,
    drops: [
      { materialId: 403, count: 5633 }, // Shattered Bones
      { materialId: 201, count: 2919 }, // Bifurcated Skeleton
      { materialId: 401, count: 17884 }, // Spell of Banishing
      { materialId: 306, count: 3733 }, // Spell of Fortune
    ],
  },

  // ===== Chapter 5 =====
  {
    id: 9029,
    name: "5-3H",
    category: "Hard",
    cost: 18,
    totalAttempts: 2368,
    drops: [
      { materialId: 403, count: 2817 }, // Shattered Bones
      { materialId: 304, count: 725 }, // Esoteric Bones
      { materialId: 402, count: 1678 }, // Silver Ore
      { materialId: 211, count: 694 }, // Winged Key
    ],
  },
  {
    id: 9031,
    name: "5-4H",
    category: "Hard",
    cost: 18,
    totalAttempts: 2222,
    drops: [
      { materialId: 303, count: 44 }, // Liquefied Terror
      { materialId: 302, count: 44 }, // Milled Magnesia
      { materialId: 304, count: 52 }, // Esoteric Bones
      { materialId: 305, count: 1124 }, // Rough Silver Ingot
      { materialId: 401, count: 1556 }, // Spell of Banishing
      { materialId: 306, count: 94 }, // Spell of Fortune
      { materialId: 310, count: 36 }, // Cicada Wings
      { materialId: 309, count: 29 }, // Perpetual Cog
      { materialId: 210, count: 657 }, // Goose Neck
      { materialId: 308, count: 47 }, // Fox Tail
      { materialId: 307, count: 42 }, // Luminite Ore
    ],
  },
  {
    id: 9033,
    name: "5-7H",
    category: "Hard",
    cost: 18,
    totalAttempts: 1310,
    drops: [
      { materialId: 403, count: 1658 }, // Shattered Bones
      { materialId: 304, count: 386 }, // Esoteric Bones
      { materialId: 201, count: 495 }, // Bifurcated Skeleton
    ],
  },
  {
    id: 9034,
    name: "5-8H",
    category: "Hard",
    cost: 18,
    totalAttempts: 367,
    drops: [
      { materialId: 404, count: 278 }, // Magnesia Crystal
      { materialId: 302, count: 102 }, // Milled Magnesia
      { materialId: 401, count: 205 }, // Spell of Banishing
      { materialId: 203, count: 167 }, // Prophetic Bird
    ],
  },
  {
    id: 9036,
    name: "5-14H",
    category: "Hard",
    cost: 18,
    totalAttempts: 2270,
    drops: [
      { materialId: 402, count: 1547 }, // Silver Ore
      { materialId: 401, count: 1626 }, // Spell of Banishing
      { materialId: 306, count: 313 }, // Spell of Fortune
      { materialId: 204, count: 714 }, // Clawed Pendulum
    ],
  },
  {
    id: 9037,
    name: "5-19H",
    category: "Hard",
    cost: 18,
    totalAttempts: 5464,
    drops: [
      { materialId: 303, count: 531 }, // Liquefied Terror
      { materialId: 205, count: 1718 }, // Biting Box
      { materialId: 402, count: 3886 }, // Silver Ore
      { materialId: 106, count: 112 }, // Silver Bullet
    ],
  },

  // ===== Chapter 6 =====
  {
    id: 9042,
    name: "6-10H",
    category: "Hard",
    cost: 18,
    totalAttempts: 844,
    drops: [
      { materialId: 404, count: 604 }, // Magnesia Crystal
      { materialId: 302, count: 235 }, // Milled Magnesia
      { materialId: 403, count: 571 }, // Shattered Bones
      { materialId: 304, count: 7 }, // Esoteric Bones
      { materialId: 201, count: 277 }, // Bifurcated Skeleton
    ],
  },
  {
    id: 9043,
    name: "6-14H",
    category: "Hard",
    cost: 18,
    totalAttempts: 8612,
    drops: [
      { materialId: 103, count: 172 }, // Wyrmling Skeleton
      { materialId: 402, count: 12051 }, // Silver Ore
      { materialId: 305, count: 1675 }, // Rough Silver Ingot
      { materialId: 206, count: 3042 }, // Holy Silver
    ],
  },

  // ===== Chapter 7 =====
  {
    id: 9051,
    name: "7-16H",
    category: "Hard",
    cost: 20,
    totalAttempts: 1241,
    drops: [
      { materialId: 303, count: 26 }, // Liquefied Terror
      { materialId: 302, count: 29 }, // Milled Magnesia
      { materialId: 304, count: 30 }, // Esoteric Bones
      { materialId: 305, count: 48 }, // Rough Silver Ingot
      { materialId: 401, count: 853 }, // Spell of Banishing
      { materialId: 306, count: 41 }, // Spell of Fortune
      { materialId: 310, count: 28 }, // Cicada Wings
      { materialId: 309, count: 337 }, // Perpetual Cog
      { materialId: 210, count: 381 }, // Goose Neck
      { materialId: 308, count: 26 }, // Fox Tail
    ],
  },
  {
    id: 9052,
    name: "7-19H",
    category: "Hard",
    cost: 20,
    totalAttempts: 228,
    drops: [
      { materialId: 303, count: 4 }, // Liquefied Terror
      { materialId: 302, count: 4 }, // Milled Magnesia
      { materialId: 304, count: 3 }, // Esoteric Bones
      { materialId: 402, count: 370 }, // Silver Ore
      { materialId: 305, count: 80 }, // Rough Silver Ingot
      { materialId: 206, count: 94 }, // Holy Silver
      { materialId: 306, count: 8 }, // Spell of Fortune
      { materialId: 310, count: 6 }, // Cicada Wings
      { materialId: 309, count: 3 }, // Perpetual Cog
      { materialId: 308, count: 5 }, // Fox Tail
      { materialId: 307, count: 8 }, // Luminite Ore
    ],
  },
  {
    id: 9054,
    name: "7-26H",
    category: "Hard",
    cost: 20,
    totalAttempts: 4344,
    drops: [
      { materialId: 405, count: 2981 }, // Trembling Tooth
      { materialId: 303, count: 66 }, // Liquefied Terror
      { materialId: 205, count: 1345 }, // Biting Box
      { materialId: 104, count: 73 }, // Bogeyman
      { materialId: 302, count: 86 }, // Milled Magnesia
      { materialId: 304, count: 101 }, // Esoteric Bones
      { materialId: 305, count: 124 }, // Rough Silver Ingot
      { materialId: 306, count: 162 }, // Spell of Fortune
      { materialId: 310, count: 95 }, // Cicada Wings
      { materialId: 309, count: 61 }, // Perpetual Cog
      { materialId: 308, count: 73 }, // Fox Tail
      { materialId: 307, count: 96 }, // Luminite Ore
    ],
  },

  // ===== Chapter 8 =====
  {
    id: 9063,
    name: "8-18H",
    category: "Hard",
    cost: 20,
    totalAttempts: 1011,
    drops: [
      { materialId: 303, count: 22 }, // Liquefied Terror
      { materialId: 404, count: 696 }, // Magnesia Crystal
      { materialId: 302, count: 18 }, // Milled Magnesia
      { materialId: 304, count: 28 }, // Esoteric Bones
      { materialId: 305, count: 49 }, // Rough Silver Ingot
      { materialId: 401, count: 3 }, // Spell of Banishing
      { materialId: 306, count: 34 }, // Spell of Fortune
      { materialId: 310, count: 12 }, // Cicada Wings
      { materialId: 309, count: 15 }, // Perpetual Cog
      { materialId: 308, count: 255 }, // Fox Tail
      { materialId: 209, count: 306 }, // Golden Herb Incense
      { materialId: 307, count: 17 }, // Luminite Ore
    ],
  },

  // ===== Chapter 9 =====
  {
    id: 9067,
    name: "9-1H",
    category: "Hard",
    cost: 20,
    totalAttempts: 2342,
    drops: [
      { materialId: 303, count: 77 }, // Liquefied Terror
      { materialId: 302, count: 95 }, // Milled Magnesia
      { materialId: 403, count: 1518 }, // Shattered Bones
      { materialId: 304, count: 152 }, // Esoteric Bones
      { materialId: 305, count: 142 }, // Rough Silver Ingot
      { materialId: 306, count: 176 }, // Spell of Fortune
      { materialId: 310, count: 104 }, // Cicada Wings
      { materialId: 309, count: 64 }, // Perpetual Cog
      { materialId: 308, count: 71 }, // Fox Tail
      { materialId: 307, count: 717 }, // Luminite Ore
      { materialId: 208, count: 771 }, // Red Lacquer Tablet
    ],
  },
  {
    id: 9068,
    name: "9-3H",
    category: "Hard",
    cost: 20,
    totalAttempts: 965,
    drops: [
      { materialId: 405, count: 652 }, // Trembling Tooth
      { materialId: 303, count: 198 }, // Liquefied Terror
      { materialId: 205, count: 299 }, // Biting Box
      { materialId: 302, count: 24 }, // Milled Magnesia
      { materialId: 304, count: 31 }, // Esoteric Bones
      { materialId: 305, count: 24 }, // Rough Silver Ingot
      { materialId: 306, count: 33 }, // Spell of Fortune
      { materialId: 310, count: 20 }, // Cicada Wings
      { materialId: 309, count: 17 }, // Perpetual Cog
      { materialId: 308, count: 21 }, // Fox Tail
      { materialId: 307, count: 32 }, // Luminite Ore
    ],
  },
  {
    id: 9069,
    name: "9-6H",
    category: "Hard",
    cost: 20,
    totalAttempts: 1144,
    drops: [
      { materialId: 303, count: 17 }, // Liquefied Terror
      { materialId: 302, count: 29 }, // Milled Magnesia
      { materialId: 304, count: 25 }, // Esoteric Bones
      { materialId: 402, count: 1571 }, // Silver Ore
      { materialId: 305, count: 674 }, // Rough Silver Ingot
      { materialId: 206, count: 438 }, // Holy Silver
      { materialId: 306, count: 45 }, // Spell of Fortune
      { materialId: 310, count: 23 }, // Cicada Wings
      { materialId: 309, count: 23 }, // Perpetual Cog
      { materialId: 308, count: 25 }, // Fox Tail
      { materialId: 307, count: 38 }, // Luminite Ore
    ],
  },
  {
    id: 9073,
    name: "9-15H",
    category: "Hard",
    cost: 20,
    totalAttempts: 2311,
    drops: [
      { materialId: 303, count: 44 }, // Liquefied Terror
      { materialId: 404, count: 1555 }, // Magnesia Crystal
      { materialId: 302, count: 62 }, // Milled Magnesia
      { materialId: 304, count: 51 }, // Esoteric Bones
      { materialId: 305, count: 78 }, // Rough Silver Ingot
      { materialId: 306, count: 72 }, // Spell of Fortune
      { materialId: 310, count: 30 }, // Cicada Wings
      { materialId: 211, count: 754 }, // Winged Key
      { materialId: 111, count: 46 }, // Glowing Mothwing
      { materialId: 309, count: 35 }, // Perpetual Cog
      { materialId: 308, count: 44 }, // Fox Tail
      { materialId: 307, count: 49 }, // Luminite Ore
    ],
  },

  // ===== Chapter 10 =====
  {
    id: 9075,
    name: "10-2H",
    category: "Hard",
    cost: 20,
    totalAttempts: 1812,
    drops: [
      { materialId: 403, count: 1235 }, // Shattered Bones
      { materialId: 304, count: 553 }, // Esoteric Bones
      { materialId: 207, count: 568 }, // Golden Beetle
    ],
  },
  {
    id: 9076,
    name: "10-4H",
    category: "Hard",
    cost: 20,
    totalAttempts: 430,
    drops: [
      { materialId: 303, count: 7 }, // Liquefied Terror
      { materialId: 404, count: 268 }, // Magnesia Crystal
      { materialId: 302, count: 19 }, // Milled Magnesia
      { materialId: 304, count: 14 }, // Esoteric Bones
      { materialId: 305, count: 16 }, // Rough Silver Ingot
      { materialId: 306, count: 9 }, // Spell of Fortune
      { materialId: 310, count: 134 }, // Cicada Wings
      { materialId: 211, count: 134 }, // Winged Key
      { materialId: 309, count: 10 }, // Perpetual Cog
      { materialId: 308, count: 8 }, // Fox Tail
      { materialId: 307, count: 9 }, // Luminite Ore
    ],
  },
  {
    id: 9078,
    name: "10-9H",
    category: "Hard",
    cost: 20,
    totalAttempts: 1583,
    drops: [
      { materialId: 303, count: 29 }, // Liquefied Terror
      { materialId: 302, count: 26 }, // Milled Magnesia
      { materialId: 304, count: 54 }, // Esoteric Bones
      { materialId: 402, count: 767 }, // Silver Ore
      { materialId: 305, count: 636 }, // Rough Silver Ingot
      { materialId: 206, count: 763 }, // Holy Silver
      { materialId: 306, count: 65 }, // Spell of Fortune
      { materialId: 310, count: 29 }, // Cicada Wings
      { materialId: 309, count: 29 }, // Perpetual Cog
      { materialId: 308, count: 35 }, // Fox Tail
      { materialId: 307, count: 85 }, // Luminite Ore
    ],
  },
  {
    id: 9079,
    name: "10-13H",
    category: "Hard",
    cost: 20,
    totalAttempts: 2313,
    drops: [
      { materialId: 303, count: 33 }, // Liquefied Terror
      { materialId: 404, count: 41 }, // Magnesia Crystal
      { materialId: 302, count: 40 }, // Milled Magnesia
      { materialId: 403, count: 1239 }, // Shattered Bones
      { materialId: 304, count: 782 }, // Esoteric Bones
      { materialId: 201, count: 1038 }, // Bifurcated Skeleton
      { materialId: 402, count: 4 }, // Silver Ore
      { materialId: 305, count: 64 }, // Rough Silver Ingot
      { materialId: 306, count: 86 }, // Spell of Fortune
      { materialId: 310, count: 55 }, // Cicada Wings
      { materialId: 309, count: 26 }, // Perpetual Cog
      { materialId: 308, count: 39 }, // Fox Tail
      { materialId: 307, count: 50 }, // Luminite Ore
    ],
  },
  {
    id: 9080,
    name: "10-17H",
    category: "Hard",
    cost: 20,
    totalAttempts: 965,
    drops: [
      { materialId: 405, count: 660 }, // Trembling Tooth
      { materialId: 303, count: 206 }, // Liquefied Terror
      { materialId: 205, count: 298 }, // Biting Box
      { materialId: 302, count: 19 }, // Milled Magnesia
      { materialId: 304, count: 22 }, // Esoteric Bones
      { materialId: 305, count: 26 }, // Rough Silver Ingot
      { materialId: 306, count: 31 }, // Spell of Fortune
      { materialId: 310, count: 13 }, // Cicada Wings
      { materialId: 309, count: 14 }, // Perpetual Cog
      { materialId: 308, count: 20 }, // Fox Tail
      { materialId: 307, count: 19 }, // Luminite Ore
    ],
  },
  {
    id: 9082,
    name: "10-22H",
    category: "Hard",
    cost: 20,
    totalAttempts: 3388,
    drops: [
      { materialId: 402, count: 2541 }, // Silver Ore
      { materialId: 305, count: 639 }, // Rough Silver Ingot
      { materialId: 401, count: 2340 }, // Spell of Banishing
      { materialId: 210, count: 1036 }, // Goose Neck
      { materialId: 110, count: 60 }, // Watch Core
    ],
  },

  // ===== Chapter 11 =====
  {
    id: 9084,
    name: "11-5H",
    category: "Hard",
    cost: 25,
    totalAttempts: 1278,
    drops: [
      { materialId: 303, count: 23 }, // Liquefied Terror
      { materialId: 302, count: 20 }, // Milled Magnesia
      { materialId: 304, count: 29 }, // Esoteric Bones
      { materialId: 402, count: 686 }, // Silver Ore
      { materialId: 305, count: 532 }, // Rough Silver Ingot
      { materialId: 306, count: 57 }, // Spell of Fortune
      { materialId: 310, count: 20 }, // Cicada Wings
      { materialId: 309, count: 18 }, // Perpetual Cog
      { materialId: 308, count: 16 }, // Fox Tail
      { materialId: 307, count: 54 }, // Luminite Ore
      { materialId: 204, count: 575 }, // Clawed Pendulum
    ],
  },

  // ===== 먼지/동전 Resource 스테이지 =====
  {
    id: 115,
    name: "먼지 소탕 VI",
    category: "Story",
    cost: 25,
    totalAttempts: 1,
    drops: [
      { materialId: 1001, count: 12500 }, // Dust (샤프더스트)
      { materialId: 1002, count: 250 }, // Sharpodonty (톱니 동전)
    ],
  },
  {
    id: 116,
    name: "동전의 미학 VI",
    category: "Story",
    cost: 25,
    totalAttempts: 1,
    drops: [
      { materialId: 1002, count: 9000 }, // Sharpodonty (톱니 동전)
    ],
  },

  // ===== 통찰 스테이지 - 암석의 서 (Mineral Wealth) =====
  {
    id: 117,
    name: "산울림 II",
    category: "Story",
    cost: 18,
    totalAttempts: 1,
    drops: [
      { materialId: 510, count: 2 }, // Page of Mineral Wealth (암석의 서 낱장)
    ],
  },
  {
    id: 118,
    name: "산울림 IV",
    category: "Story",
    cost: 24,
    totalAttempts: 1,
    drops: [
      { materialId: 511, count: 2 }, // Scroll of Mineral Wealth (암석의 서 두루마리)
    ],
  },
  {
    id: 119,
    name: "산울림 VI",
    category: "Story",
    cost: 30,
    totalAttempts: 1,
    drops: [
      { materialId: 512, count: 2 }, // Tome of Mineral Wealth (암석의 서 전권)
    ],
  },

  // ===== 통찰 스테이지 - 천체의 서 (Starlit Ascent) =====
  {
    id: 120,
    name: "별들의 거처 II",
    category: "Story",
    cost: 18,
    totalAttempts: 1,
    drops: [
      { materialId: 507, count: 2 }, // Page of Starlit Ascent (천체의 서 낱장)
    ],
  },
  {
    id: 121,
    name: "별들의 거처 IV",
    category: "Story",
    cost: 24,
    totalAttempts: 1,
    drops: [
      { materialId: 508, count: 2 }, // Scroll of Starlit Ascent (천체의 서 두루마리)
    ],
  },
  {
    id: 122,
    name: "별들의 거처 VI",
    category: "Story",
    cost: 30,
    totalAttempts: 1,
    drops: [
      { materialId: 509, count: 2 }, // Tome of Starlit Ascent (천체의 서 전권)
    ],
  },

  // ===== 통찰 스테이지 - 숲의 서 (Plantal Vimen) =====
  {
    id: 123,
    name: "숲의 모양 II",
    category: "Story",
    cost: 18,
    totalAttempts: 1,
    drops: [
      { materialId: 504, count: 2 }, // Page of Plantal Vimen (숲의 서 낱장)
    ],
  },
  {
    id: 124,
    name: "숲의 모양 IV",
    category: "Story",
    cost: 24,
    totalAttempts: 1,
    drops: [
      { materialId: 505, count: 2 }, // Scroll of Plantal Vimen (숲의 서 두루마리)
    ],
  },
  {
    id: 125,
    name: "숲의 모양 VI",
    category: "Story",
    cost: 30,
    totalAttempts: 1,
    drops: [
      { materialId: 506, count: 2 }, // Tome of Plantal Vimen (숲의 서 전권)
    ],
  },

  // ===== 통찰 스테이지 - 야수의 서 (Beastly Thirst) =====
  {
    id: 126,
    name: "짐승의 야성 II",
    category: "Story",
    cost: 18,
    totalAttempts: 1,
    drops: [
      { materialId: 501, count: 2 }, // Page of Beastly Thirst (야수의 서 낱장)
    ],
  },
  {
    id: 127,
    name: "짐승의 야성 IV",
    category: "Story",
    cost: 24,
    totalAttempts: 1,
    drops: [
      { materialId: 502, count: 2 }, // Scroll of Beastly Thirst (야수의 서 두루마리)
    ],
  },
  {
    id: 128,
    name: "짐승의 야성 VI",
    category: "Story",
    cost: 30,
    totalAttempts: 1,
    drops: [
      { materialId: 503, count: 2 }, // Tome of Beastly Thirst (야수의 서 전권)
    ],
  },
];

/**
 * 특정 재료를 드롭하는 스테이지 목록 조회
 */
export function getStagesForMaterial(materialId: number): StageData[] {
  return farmingStages.filter((stage) =>
    stage.drops.some((drop) => drop.materialId === materialId)
  );
}

/**
 * 특정 스테이지에서 재료의 드롭률 계산
 */
export function getDropRate(stageId: number, materialId: number): number {
  const stage = farmingStages.find((s) => s.id === stageId);
  if (!stage) return 0;

  const drop = stage.drops.find((d) => d.materialId === materialId);
  if (!drop) return 0;

  return (drop.count / stage.totalAttempts) * 100;
}

/**
 * 특정 재료의 최적 파밍 스테이지 찾기 (드롭률 기준)
 */
export function getBestStageForMaterial(materialId: number): StageData | null {
  const stages = getStagesForMaterial(materialId);
  if (stages.length === 0) return null;

  return stages.reduce((best, current) => {
    const bestRate = getDropRate(best.id, materialId);
    const currentRate = getDropRate(current.id, materialId);
    return currentRate > bestRate ? current : best;
  });
}

/**
 * 특정 재료의 체력당 드롭 효율 계산
 */
export function getEfficiencyPerEnergy(stageId: number, materialId: number): number {
  const stage = farmingStages.find((s) => s.id === stageId);
  if (!stage) return 0;

  const drop = stage.drops.find((d) => d.materialId === materialId);
  if (!drop) return 0;

  const dropRate = drop.count / stage.totalAttempts;
  return dropRate / stage.cost; // 체력 1당 기대 드롭 수
}
