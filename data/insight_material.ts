export interface InsightMaterial {
  character_id: number;
  insight: {
    level: number;
    materials: Record<number, number>;
  }[];
}

export const insightMaterial: InsightMaterial[] = [
  {
    character_id: 1, // "Druvis III",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          405: 5,
          302: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          304: 5,
          206: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          101: 6,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 2, // "Lilya",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          403: 6,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          306: 6,
          204: 3,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          104: 5,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 3, // "A Knight",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 3,
          501: 3,
          402: 6,
          306: 6,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 5,
          502: 5,
          301: 3,
          205: 4,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 8,
          503: 8,
          105: 6,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 4, // "Sotheby",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          404: 6,
          304: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          305: 4,
          203: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          102: 5,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 5, // "Regulus",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          404: 6,
          304: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          305: 4,
          203: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          102: 5,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 6, // "Centurion",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          501: 6,
          401: 6,
          301: 4,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          502: 10,
          303: 5,
          202: 4,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          503: 16,
          103: 6,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 7, // "An-an Lee",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          401: 6,
          301: 4,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          303: 5,
          202: 4,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          103: 6,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 8, // "Medicine Pocket",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          501: 6,
          403: 6,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          502: 10,
          306: 6,
          204: 3,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          503: 16,
          104: 5,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 9, // "Eternity",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          402: 6,
          303: 4,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          302: 5,
          201: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          106: 6,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 10, // "Ms. NewBabel",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          402: 6,
          303: 4,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          302: 5,
          201: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          106: 6,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 11, // "Voyager",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          403: 6,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          306: 6,
          204: 3,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          104: 5,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 12, // "Melania",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          501: 6,
          405: 5,
          304: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          502: 10,
          302: 5,
          206: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          503: 16,
          101: 8,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 13, // "Pickles",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          402: 6,
          306: 6,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          301: 3,
          205: 4,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          105: 6,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 14, // "Tooth Fairy",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          401: 6,
          301: 4,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          303: 5,
          202: 4,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          103: 6,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 15, // "Changeling",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          405: 5,
          302: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          304: 5,
          206: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          101: 6,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 16, // "Black Dwarf",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          404: 6,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          304: 5,
          203: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          102: 5,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 17, // "Shamane",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          501: 6,
          403: 6,
          302: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          502: 10,
          306: 6,
          204: 3,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          503: 16,
          106: 6,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 18, // "37",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          404: 6,
          303: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          304: 6,
          211: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          104: 5,
          5: 3,
        },
      },
    ],
  },
  {
    character_id: 19, // "6",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 3,
          507: 3,
          403: 6,
          309: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 5,
          508: 5,
          302: 5,
          205: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 8,
          509: 8,
          110: 6,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 20, // "Spathodea",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          501: 6,
          405: 5,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          502: 10,
          310: 6,
          201: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          503: 16,
          105: 7,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 21, // "Ezra Theodore",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          402: 6,
          304: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          301: 3,
          202: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          106: 6,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 22, // "Jiu Niangzi",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          401: 6,
          302: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          309: 5,
          205: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          103: 6,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 23, // "Getian",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          501: 6,
          404: 6,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          502: 10,
          304: 5,
          210: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          503: 16,
          102: 5,
          5: 3,
        },
      },
    ],
  },
  {
    character_id: 24, // "Isolde",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 3,
          501: 3,
          402: 6,
          302: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 5,
          502: 5,
          304: 6,
          207: 3,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 8,
          503: 8,
          101: 6,
          5: 3,
        },
      },
    ],
  },
  {
    character_id: 25, // "Marcus",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          405: 5,
          310: 6,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          301: 3,
          203: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          107: 5,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 26, // "Vila",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          403: 6,
          306: 6,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          302: 5,
          211: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          104: 5,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 27, // "Windsong",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          401: 6,
          309: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          303: 5,
          206: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          106: 6,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 28, // "Semmelweis",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          405: 5,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          310: 6,
          201: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          101: 6,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 29, // "Lucy",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 3,
          507: 3,
          402: 6,
          304: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 5,
          508: 5,
          301: 3,
          202: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 8,
          509: 8,
          111: 6,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 30, // "Kakania",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          401: 6,
          309: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          305: 4,
          205: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          111: 6,
          4: 3,
        },
      },
    ],
  },
  {
    character_id: 31, // "Mercuria",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 3,
          501: 3,
          402: 6,
          310: 6,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 5,
          502: 5,
          303: 5,
          209: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 8,
          503: 8,
          103: 6,
          5: 3,
        },
      },
    ],
  },
  {
    character_id: 32, // "J",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          501: 6,
          404: 6,
          304: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          502: 10,
          308: 5,
          210: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          503: 16,
          102: 5,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 33, // "Tuesday",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 3,
          501: 3,
          405: 5,
          309: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 5,
          502: 5,
          304: 6,
          203: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 8,
          503: 8,
          106: 6,
          5: 3,
        },
      },
    ],
  },
  {
    character_id: 34, // "Argus",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          403: 6,
          303: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          309: 5,
          211: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          109: 6,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 35, // "Anjo Nala",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          501: 6,
          401: 6,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          502: 10,
          303: 5,
          209: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          503: 16,
          110: 6,
          4: 3,
        },
      },
    ],
  },
  {
    character_id: 36, // "Lopera",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          501: 6,
          404: 6,
          301: 4,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          502: 10,
          308: 5,
          211: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          503: 16,
          104: 5,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 37, // "Willow",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          403: 6,
          308: 6,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          305: 4,
          205: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          101: 6,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 38, // "Flutterpage",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          405: 5,
          306: 6,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          304: 6,
          210: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          106: 6,
          5: 3,
        },
      },
    ],
  },

  {
    character_id: 39, // "Barcarola",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          402: 6,
          303: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          309: 5,
          203: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          103: 6,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 40, // "Fatutu",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          401: 6,
          310: 6,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          308: 5,
          201: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          106: 6,
          4: 3,
        },
      },
    ],
  },
  {
    character_id: 41, // "Liang",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          405: 5,
          304: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          310: 6,
          206: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          101: 6,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 42, // "Noire",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          404: 6,
          306: 6,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          305: 4,
          211: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          109: 6,
          5: 3,
        },
      },
    ],
  },
  {
    character_id: 43, // "Recoleta",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          403: 6,
          309: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          303: 5,
          203: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          106: 6,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 44, // "Aleph",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 3,
          507: 3,
          401: 6,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 5,
          508: 5,
          310: 6,
          209: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 8,
          509: 8,
          103: 6,
          4: 3,
        },
      },
    ],
  },
  {
    character_id: 45, // "Hissabeth",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 6,
          404: 6,
          303: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 10,
          304: 6,
          210: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 16,
          109: 6,
          5: 3,
        },
      },
    ],
  },
  {
    character_id: 46, // "Kiperina",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          405: 5,
          301: 4,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          306: 6,
          208: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          106: 6,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 47, // "ezio",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          507: 6,
          405: 6,
          304: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          508: 10,
          310: 6,
          203: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          509: 16,
          106: 6,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 48, // "kassandra",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          402: 6,
          306: 6,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          303: 5,
          209: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          103: 6,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 49, // "Nautika",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 3,
          501: 3,
          402: 6,
          304: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 5,
          502: 5,
          306: 6,
          211: 6,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 8,
          503: 8,
          104: 5,
          1: 3,
        },
      },
    ],
  },
  {
    character_id: 50, // "Ulrich",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 3,
          507: 3,
          401: 6,
          303: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 5,
          508: 5,
          309: 5,
          207: 3,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 8,
          509: 8,
          106: 6,
          3: 3,
        },
      },
    ],
  },
  {
    character_id: 51, // "Moldir",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          501: 6,
          403: 5,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          502: 10,
          307: 5,
          205: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          503: 16,
          110: 6,
          4: 3,
        },
      },
    ],
  },
  {
    character_id: 52, // "Sentinel",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          403: 6,
          307: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          306: 6,
          205: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          109: 6,
          2: 3,
        },
      },
    ],
  },
  {
    character_id: 53, // "Charon",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          504: 3,
          501: 3,
          404: 6,
          305: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          505: 5,
          502: 5,
          308: 5,
          210: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          506: 8,
          503: 8,
          108: 6,
          5: 3,
        },
      },
    ],
  },
  {
    character_id: 54, // "Rhais",
    insight: [
      {
        level: 1,
        materials: {
          1002: 18000,
          510: 6,
          405: 5,
          309: 5,
        },
      },
      {
        level: 2,
        materials: {
          1002: 40000,
          511: 10,
          306: 6,
          201: 5,
        },
      },
      {
        level: 3,
        materials: {
          1002: 200000,
          512: 16,
          111: 6,
          1: 3,
        },
      },
    ],
  },
];
