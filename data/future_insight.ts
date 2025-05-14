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
    star6: number[]; // 광상 캐릭터 id 목록 (복수 선택)
    star5: number[]; // 광상 캐릭터 id 목록 (복수 선택)
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
      star6: [11, 15],
      star5: [102, 112],
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
      star6: [7, 13],
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
      star6: [8, 12],
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
      star6: [21, 22],
      star5: [],
    },
  },
];
