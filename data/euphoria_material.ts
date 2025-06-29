export interface EuphoriaMaterial {
  character_id: number;
  euphoria: {
    level: number;
    materials: Record<number, number>;
  }[];
  upgrade: {
    level: number;
    materials: Record<number, number>;
  }[];
}

export const euphoriaMaterialList: EuphoriaMaterial[] = [
  {
    character_id: 1, // "Druvis III",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          4: 3,
        },
      },
      {
        level: 2,
        materials: {
          801: 1,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          1: 1,
          110: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          2: 1,
          109: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          3: 2,
          104: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          5: 2,
          105: 2,
        },
      },
    ],
  },
  {
    character_id: 2, // "Lilya",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          2: 3,
        },
      },
      {
        level: 2,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          3: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          4: 1,
          101: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          1: 1,
          111: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          2: 2,
          110: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          3: 2,
          109: 2,
        },
      },
    ],
  },
  {
    character_id: 3, // "A Knight",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 4, // "Sotheby",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          1: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          4: 1,
          103: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          1: 1,
          106: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          2: 2,
          101: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          3: 2,
          111: 2,
        },
      },
    ],
  },
  {
    character_id: 5, // "Regulus",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          1: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          4: 1,
          108: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          1: 1,
          107: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          2: 2,
          104: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          3: 2,
          103: 2,
        },
      },
    ],
  },
  {
    character_id: 6, // "Centurion",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          4: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          3: 1,
          110: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          5: 1,
          109: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          4: 2,
          108: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          1: 2,
          107: 2,
        },
      },
    ],
  },
  {
    character_id: 7, // "An-an Lee",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          2: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          5: 1,
          105: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          4: 1,
          103: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          1: 2,
          106: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          2: 2,
          101: 2,
        },
      },
    ],
  },
  {
    character_id: 8, // "Medicine Pocket",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          5: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          2: 1,
          105: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          3: 1,
          103: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          5: 2,
          106: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          4: 2,
          101: 2,
        },
      },
    ],
  },
  {
    character_id: 9, // "Eternity",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          2: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          5: 1,
          110: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          4: 1,
          109: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          1: 2,
          104: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          2: 2,
          105: 2,
        },
      },
    ],
  },
  {
    character_id: 10, // "Ms. NewBabel",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          1: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          1: 1,
          104: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          2: 1,
          105: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          3: 2,
          103: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          5: 2,
          106: 2,
        },
      },
    ],
  },
  {
    character_id: 11, // "Voyager",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          4: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          1: 1,
          105: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          2: 1,
          103: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          3: 2,
          106: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          5: 2,
          101: 2,
        },
      },
    ],
  },
  {
    character_id: 12, // "Melania",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          3: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          3: 1,
          111: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          5: 1,
          110: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          4: 2,
          109: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          1: 2,
          104: 2,
        },
      },
    ],
  },
  {
    character_id: 13, // "Pickles",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          1: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          4: 1,
          111: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          1: 1,
          110: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          2: 2,
          109: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          3: 2,
          104: 2,
        },
      },
    ],
  },
  {
    character_id: 14, // "Tooth Fairy",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 15, // "Changeling",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          3: 3,
        },
      },
      {
        level: 2,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          2: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          2: 1,
          111: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          3: 1,
          110: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          5: 2,
          109: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          4: 2,
          104: 2,
        },
      },
    ],
  },
  {
    character_id: 16, // "Black Dwarf",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 17, // "Shamane",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          5: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          5: 1,
          104: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          4: 1,
          105: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          1: 2,
          103: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          2: 2,
          106: 2,
        },
      },
    ],
  },
  {
    character_id: 18, // "37",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 19, // "6",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 20, // "Spathodea",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 21, // "Ezra Theodore",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          4: 3,
        },
      },
      {
        level: 2,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          1: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          1: 1,
          111: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          2: 1,
          110: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          3: 2,
          109: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          5: 2,
          102: 2,
        },
      },
    ],
  },
  {
    character_id: 22, // "Jiu Niangzi",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          2: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          4: 1,
          108: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          1: 1,
          104: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          2: 2,
          105: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          3: 2,
          103: 2,
        },
      },
    ],
  },
  {
    character_id: 23, // "Getian",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          1: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          2: 1,
          14: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          3: 1,
          15: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          5: 2,
          103: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          4: 2,
          106: 2,
        },
      },
    ],
  },
  {
    character_id: 24, // "Isolde",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 25, // "Marcus",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 26, // "Vila",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 27, // "Windsong",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 28, // "Semmelweis",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          3: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          5: 1,
          106: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          4: 1,
          101: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          1: 2,
          102: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          2: 2,
          111: 2,
        },
      },
    ],
  },
  {
    character_id: 29, // "Lucy",
    euphoria: [
      {
        level: 1,
        materials: {
          701: 12,
          702: 40,
          703: 200,
          4: 3,
        },
      },
    ],
    upgrade: [
      {
        level: 1,
        materials: {
          702: 20,
          703: 275,
          1: 1,
          102: 1,
        },
      },
      {
        level: 2,
        materials: {
          702: 30,
          703: 371,
          2: 1,
          111: 2,
        },
      },
      {
        level: 3,
        materials: {
          702: 35,
          703: 470,
          3: 2,
          110: 2,
        },
      },
      {
        level: 4,
        materials: {
          702: 40,
          703: 1195,
          5: 2,
          109: 2,
        },
      },
    ],
  },
  {
    character_id: 30, // "Kakania",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 31, // "J",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 32, // "Mercuria",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 33, // "Argus",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 34, // "Tuesday",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 35, // "Anjo Nala",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 36, // "Lopera",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 37, // "Willow",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 38, // "Flutterpage",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 39, // "Barcarola",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 40, // "Fatutu",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 41, // "Liang Yue",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 42, // "Noire",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 43, // "Recoleta",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 44, // "Aleph",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 45, // "Hissabeth",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 46, // "Kiperina",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 47, // "Ulrich",
    euphoria: [],
    upgrade: [],
  },
  {
    character_id: 48, // "Nautika",
    euphoria: [],
    upgrade: [],
  },
];
