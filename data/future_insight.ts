export interface FutureInsightItem {
  version: string;
  title: string;
  period: {
    start: string; // 예: '2025-04-24'
    end: string; // 예: '2025-05-29'
    week: number; // 예: 5
  };
  album_shop: {
    rare6: number; // 6성 캐릭터 id
    rare5: number; // 5성 캐릭터 id
  };
  banners: string[];
  euphoria: {
    star6: { characterId: number; euphoriaId?: number }[];
    star5: { characterId: number; euphoriaId?: number }[];
  };
}

export const futureInsightData: FutureInsightItem[] = [
  {
    version: "2.4",
    title: "지구에서의 마지막 밤",
    period: {
      start: "2025-03-27",
      end: "2025-04-24",
      week: 4,
    },
    album_shop: {
      rare6: 15,
      rare5: 117,
    },
    banners: ["barcarola_pick_up", "fatutu_pick_up"],
    euphoria: {
      star6: [
        { characterId: 11, euphoriaId: 10 },
        { characterId: 15, euphoriaId: 9 },
      ],
      star5: [
        { characterId: 102, euphoriaId: 11 },
        { characterId: 112, euphoriaId: 12 },
      ],
    },
  },
  {
    version: "2.5",
    title: "차이나타운 무비",
    period: {
      start: "2025-04-24",
      end: "2025-05-29",
      week: 5,
    },
    album_shop: {
      rare6: 17,
      rare5: 106,
    },
    banners: ["liang_pick_up", "noire_pick_up"],
    euphoria: {
      star6: [
        { characterId: 7, euphoriaId: 13 },
        { characterId: 13, euphoriaId: 14 },
      ],
      star5: [],
    },
  },
  {
    version: "2.6",
    title: "광기의 역사",
    period: {
      start: "2025-05-29",
      end: "2025-07-03",
      week: 5,
    },
    album_shop: {
      rare6: 16,
      rare5: 103,
    },
    banners: ["recoleta_pick_up", "aleph_pick_up"],
    euphoria: {
      star6: [
        { characterId: 8, euphoriaId: 15 },
        { characterId: 12, euphoriaId: 16 },
      ],
      star5: [],
    },
  },
  {
    version: "2.7",
    title: "1987 코스믹 오버추어",
    period: {
      start: "2025-07-03",
      end: "2025-08-07",
      week: 5,
    },
    album_shop: {
      rare6: 19,
      rare5: 104,
    },
    banners: ["hissabeth_pick_up", "kiperina_pick_up"],
    euphoria: {
      star6: [
        { characterId: 22, euphoriaId: 17 },
        { characterId: 21, euphoriaId: 18 },
        { characterId: 21, euphoriaId: 19 },
      ],
      star5: [],
    },
  },
];
