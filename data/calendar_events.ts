export type CalendarEvent = {
  date: string; // 'YYYY-MM-DD'
  title?: string; // character_id가 있으면 선택사항
  link?: string;
  type?: "version" | "pickup" | "event" | "birthday";
  end?: string; // 끝나는 날짜 (선택)
  img?: string; // 이미지 경로 (선택)
  character_id?: number; // 캐릭터 ID (생일 이벤트용)
};

export const calendarEvents: CalendarEvent[] = [
  {
    date: "2025-07-03",
    end: "2025-08-07",
    title: "2.7",
    type: "version",
  },
  {
    date: "2025-07-03",
    end: "2025-07-24",
    title: "히사베스 픽업",
    type: "pickup",
    img: "/infos/banner_img/hissabeth_pick_up.webp",
  },
  {
    date: "2025-07-24",
    end: "2025-08-07",
    title: "키페리나 픽업",
    type: "pickup",
    img: "/infos/banner_img/kiperina_pick_up.webp",
  },
  {
    date: "2025-08-01",
    end: "2025-08-14",
    title: "바람의 호수 픽업",
    type: "pickup",
    img: "/infos/banner_img/doublepick_flutter_page_barcarola.webp",
  },
  {
    date: "2025-08-07",
    end: "2025-09-19",
    title: "콜라보",
    type: "version",
  },
  {
    date: "2025-08-07",
    end: "2025-09-19",
    title: "에지오 픽업",
    type: "pickup",
    img: "/infos/banner_img/ezio_pick_up.webp",
  },
  {
    date: "2025-08-28",
    end: "2025-09-19",
    title: "카산드라 픽업",
    type: "pickup",
    img: "/infos/banner_img/kassandra_pick_up.webp",
  },
  {
    date: "2025-09-19",
    end: "2025-10-30",
    title: "노티카 픽업",
    type: "pickup",
    img: "/infos/banner_img/nautika_pick_up.webp",
  },
  {
    date: "2025-10-01",
    end: "2025-10-15",
    title: "루시 픽업",
    type: "pickup",
    img: "/infos/banner_img/lucy_pick_up.webp",
  },
  {
    date: "2025-10-09",
    end: "2025-10-30",
    title: "몰디르 픽업",
    type: "pickup",
    img: "/infos/banner_img/moldir_pick_up.webp",
  },
  {
    date: "2025-10-30",
    end: "2025-11-20",
    title: "센티널 픽업",
    type: "pickup",
    img: "/infos/banner_img/nautika_pick_up.webp",
  },
  {
    date: "2025-11-20",
    end: "2025-12-11",
    title: "카론 픽업",
    type: "pickup",
    img: "/infos/banner_img/charon_pick_up.webp",
  },
  {
    date: "2025-11-01",
    end: "2025-11-14",
    title: "파투투 & 레콜레타 이중 픽업",
    type: "pickup",
    img: "/infos/banner_img/doublepick_fatutu_recoleta.webp",
  },
  {
    date: "2025-09-19",
    end: "2025-10-30",
    title: "2.8",
    type: "version",
  },
  {
    date: "2025-10-30",
    end: "2025-12-11",
    title: "3.0",
    type: "version",
  },
  //🎂
  {
    date: "01-04",
    type: "birthday",
    character_id: 208,
  },
  {
    date: "02-29",
    type: "birthday",
    character_id: 3,
  },
  {
    date: "02-28",
    type: "birthday",
    character_id: 44,
  },
  {
    date: "07-10",
    type: "birthday",
    character_id: 303,
  },
  {
    date: "07-27",
    type: "birthday",
    character_id: 7,
  },
  {
    date: "04-05",
    type: "birthday",
    character_id: 35,
  },
  {
    date: "12-11",
    type: "birthday",
    character_id: 34,
  },
  {
    date: "08-07",
    type: "birthday",
    character_id: 121,
  },
  {
    date: "03-14",
    type: "birthday",
    character_id: 105,
  },
  {
    date: "04-14",
    type: "birthday",
    character_id: 109,
  },
  {
    date: "07-05",
    type: "birthday",
    character_id: 123,
  },
  {
    date: "11-13",
    type: "birthday",
    character_id: 39,
  },
  {
    date: "06-22",
    type: "birthday",
    character_id: 307,
  },
  {
    date: "02-09",
    type: "birthday",
    character_id: 107,
  },
  {
    date: "07-22",
    type: "birthday",
    character_id: 115,
  },
  {
    date: "10-31",
    type: "birthday",
    character_id: 125,
  },
  {
    date: "05-20",
    type: "birthday",
    character_id: 129,
  },
  {
    date: "11-06",
    type: "birthday",
    character_id: 204,
  },
  {
    date: "08-13",
    type: "birthday",
    character_id: 6,
  },
  {
    date: "04-23",
    type: "birthday",
    character_id: 106,
  },
  {
    date: "06-28",
    type: "birthday",
    character_id: 113,
  },
  {
    date: "12-30",
    type: "birthday",
    character_id: 209,
  },
  {
    date: "01-19",
    type: "birthday",
    character_id: 308,
  },
  {
    date: "09-22",
    type: "birthday",
    character_id: 118,
  },
  {
    date: "02-15",
    type: "birthday",
    character_id: 114,
  },
  {
    date: "10-10",
    type: "birthday",
    character_id: 108,
  },
  {
    date: "08-02",
    type: "birthday",
    character_id: 402,
  },
  {
    date: "10-23",
    type: "birthday",
    character_id: 1,
  },
  {
    date: "07-21",
    type: "birthday",
    character_id: 202,
  },
  {
    date: "05-14",
    type: "birthday",
    character_id: 213,
  },
  {
    date: "12-25",
    type: "birthday",
    character_id: 9,
  },
  {
    date: "09-28",
    type: "birthday",
    character_id: 40,
  },
  {
    date: "07-14",
    type: "birthday",
    character_id: 38,
  },
  {
    date: "07-22",
    type: "birthday",
    character_id: 23,
  },
  {
    date: "01-03",
    type: "birthday",
    character_id: 116,
  },
  {
    date: "11-23",
    type: "birthday",
    character_id: 24,
  },
  {
    date: "11-02",
    type: "birthday",
    character_id: 305,
  },
  {
    date: "07-15",
    type: "birthday",
    character_id: 16,
  },
  {
    date: "12-07",
    type: "birthday",
    character_id: 30,
  },
  {
    date: "04-08",
    type: "birthday",
    character_id: 117,
  },
  {
    date: "04-19",
    type: "birthday",
    character_id: 46,
  },
  {
    date: "01-29",
    type: "birthday",
    character_id: 302,
  },
  {
    date: "09-23",
    type: "birthday",
    character_id: 304,
  },
  {
    date: "11-14",
    type: "birthday",
    character_id: 2,
  },
  {
    date: "06-01",
    type: "birthday",
    character_id: 126,
  },
  {
    date: "05-06",
    type: "birthday",
    character_id: 36,
  },
  {
    date: "04-16",
    type: "birthday",
    character_id: 122,
  },
  {
    date: "12-30",
    type: "birthday",
    character_id: 29,
  },
  {
    date: "01-12",
    type: "birthday",
    character_id: 25,
  },
  {
    date: "06-22",
    type: "birthday",
    character_id: 102,
  },
  {
    date: "11-24",
    type: "birthday",
    character_id: 8,
  },
  {
    date: "03-20",
    type: "birthday",
    character_id: 12,
  },
  {
    date: "02-18",
    type: "birthday",
    character_id: 31,
  },
  {
    date: "09-20",
    type: "birthday",
    character_id: 212,
  },
  {
    date: "01-01",
    type: "birthday",
    character_id: 207,
  },
  {
    date: "06-30",
    type: "birthday",
    character_id: 124,
  },
  {
    date: "11-25",
    type: "birthday",
    character_id: 211,
  },
  {
    date: "11-16",
    type: "birthday",
    character_id: 10,
  },
  {
    date: "04-01",
    type: "birthday",
    character_id: 401,
  },
  {
    date: "01-06",
    type: "birthday",
    character_id: 127,
  },
  {
    date: "02-16",
    type: "birthday",
    character_id: 49,
  },
  {
    date: "11-02",
    type: "birthday",
    character_id: 110,
  },
  {
    date: "04-30",
    type: "birthday",
    character_id: 201,
  },
  {
    date: "02-14",
    type: "birthday",
    character_id: 42,
  },
  {
    date: "02-05",
    type: "birthday",
    character_id: 309,
  },
  {
    date: "12-26",
    type: "birthday",
    character_id: 206,
  },
  {
    date: "07-24",
    type: "birthday",
    character_id: 205,
  },
  {
    date: "10-27",
    type: "birthday",
    character_id: 13,
  },
  {
    date: "07-09",
    type: "birthday",
    character_id: 311,
  },
  {
    date: "07-12",
    type: "birthday",
    character_id: 214,
  },
  {
    date: "12-14",
    type: "birthday",
    character_id: 210,
  },
  {
    date: "07-15",
    type: "birthday",
    character_id: 43,
  },
  {
    date: "08-15",
    type: "birthday",
    character_id: 5,
  },
  {
    date: "05-01",
    type: "birthday",
    character_id: 111,
  },
  {
    date: "10-22",
    type: "birthday",
    title: "슈나이더", // characters.ts에 없는 캐릭터
  },
  {
    date: "08-19",
    type: "birthday",
    character_id: 28,
  },
  {
    date: "03-22",
    type: "birthday",
    character_id: 17,
  },
  {
    date: "01-10",
    type: "birthday",
    character_id: 101,
  },
  {
    date: "04-15",
    type: "birthday",
    character_id: 4,
  },
  {
    date: "01-10",
    type: "birthday",
    character_id: 20,
  },
  {
    date: "10-04",
    type: "birthday",
    character_id: 310,
  },
  {
    date: "06-01",
    type: "birthday",
    character_id: 104,
  },
  {
    date: "03-12",
    type: "birthday",
    character_id: 216,
  },
  {
    date: "09-08",
    type: "birthday",
    character_id: 112,
  },
  {
    date: "09-04",
    type: "birthday",
    character_id: 301,
  },
  {
    date: "11-27",
    type: "birthday",
    character_id: 14,
  },
  {
    date: "10-30",
    type: "birthday",
    character_id: 33,
  },
  {
    date: "04-27",
    type: "birthday",
    character_id: 306,
  },
  {
    date: "01-12",
    type: "birthday",
    character_id: 119,
  },
  {
    date: "04-06",
    type: "birthday",
    character_id: 26,
  },
  {
    date: "11-01",
    type: "birthday",
    character_id: 37,
  },
  {
    date: "10-13",
    type: "birthday",
    character_id: 27,
  },
  {
    date: "05-30",
    type: "birthday",
    character_id: 103,
  },
  {
    date: "03-04",
    type: "birthday",
    character_id: 120,
  },
  {
    date: "04-28",
    type: "birthday",
    character_id: 203,
  },
  {
    date: "02-13",
    type: "birthday",
    character_id: 19,
  },
  {
    date: "07-27",
    type: "birthday",
    character_id: 18,
  },
  {
    date: "06-01",
    type: "birthday",
    character_id: 21,
  },
  {
    date: "04-18",
    type: "birthday",
    character_id: 32,
  },
  {
    date: "04-11",
    type: "birthday",
    character_id: 15,
  },
  {
    date: "05-06",
    type: "birthday",
    character_id: 41,
  },
  {
    date: "09-13",
    type: "birthday",
    character_id: 51,
  },
  {
    date: "05-30",
    type: "birthday",
    character_id: 50,
  },
  {
    date: "11-12",
    type: "birthday",
    character_id: 11,
  },
  {
    date: "01-15",
    type: "birthday",
    character_id: 215,
  },
  {
    date: "06-27",
    type: "birthday",
    character_id: 53,
  },
  {
    date: "06-24",
    type: "birthday",
    character_id: 47,
  },
  {
    date: "05-29",
    type: "birthday",
    character_id: 54,
  },
  {
    date: "08-02",
    type: "birthday",
    character_id: 55,
  },
  {
    date: "12-21",
    type: "birthday",
    character_id: 56,
  },

  {
    date: "12-19",
    type: "birthday",
    character_id: 57,
  },
  // 카산드라랑 알렉 없음(Unknown임)
];
