export interface FutureInsightItem {
  version: string;
  title: string;
  period: {
    start: string; // 예: '2025-04-24'
    end: string; // 예: '2025-05-29'
    week: number; // 예: 5
  };
  album_shop?: {
    rare6: number; // 6성 캐릭터 id
    rare5: number; // 5성 캐릭터 id
  };
  banners: string[];
  euphoria: {
    star6: { characterId: number; euphoriaId?: number }[];
    star5: { characterId: number; euphoriaId?: number }[];
  };
  note?: string;
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
    title: "1987 우주의 서곡",
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
    note: "무료 광상 캐릭터 선택권 지급 (2.6 기준 광상 캐릭터까지)",
  },
  {
    version: "2.75",
    title: "어쌔신 크리드 콜라보",
    period: {
      start: "2025-08-07",
      end: "2025-09-19",
      week: 6,
    },
    album_shop: {
      rare6: 20,
      rare5: 119,
    },
    banners: ["ezio_auditore_pick_up", "kassandra_pick_up"],
    euphoria: {
      star6: [
        { characterId: 9, euphoriaId: 29 }, //이터니티
        { characterId: 25, euphoriaId: 27 }, //마커스
        { characterId: 26, euphoriaId: 28 }, //빌라
      ],
      star5: [],
    },
    note: "어쌔신 크리드 콜라보",
  },
  {
    version: "2.8",
    title: "복낙원",
    period: {
      start: "2025-09-19",
      end: "2025-10-30",
      week: 6,
    },
    album_shop: {
      rare6: 18,
      rare5: 110,
    },
    banners: ["nautika_pick_up", "moldir_pick_up"],
    euphoria: {
      star6: [
        { characterId: 29, euphoriaId: 20 },
        { characterId: 28, euphoriaId: 23 },
        { characterId: 15, euphoriaId: 22 },
        { characterId: 5, euphoriaId: 21 },
      ],
      star5: [],
    },
    note: "39,000원 6성 선택권 판매 (상시 캐릭만 가능 ~2.6), 무료 형상권 지급 (상시 캐릭만 가능 ~2.6), 32,500원 광상권 판매",
  },
  {
    version: "3.0",
    title: "머나먼 길",
    period: {
      start: "2025-10-30",
      end: "2025-12-11",
      week: 5,
    },
    album_shop: {
      rare6: 21,
      rare5: 118,
    },
    banners: ["sentinel_pick_up", "charon_pick_up"],
    euphoria: {
      star6: [
        { characterId: 23, euphoriaId: 25 },
        { characterId: 6, euphoriaId: 26 },
        { characterId: 1, euphoriaId: 24 },
      ],
      star5: [],
    },
  },
];
