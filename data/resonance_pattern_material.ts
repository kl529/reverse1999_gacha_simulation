export interface ResonancePatternMaterial {
  character_id: number;
  pattern: {
    pattern: string;
    materials: Record<number, number>;
  }[];
}

export const resonancePatternMaterial: ResonancePatternMaterial[] = [
  // 3.1
  {
    character_id: 55, // "Corvus",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          104: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          103: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          5: 1,
          107: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          5: 1,
          102: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          3: 1,
          104: 2,
          205: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 54, // "Rubuska",
    pattern: [
      {
        pattern: "Hyper",
        materials: {
          5: 1,
          106: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Overindulgence",
        materials: {
          5: 1,
          111: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Quiescence",
        materials: {
          4: 1,
          107: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Prudentiality",
        materials: {
          2: 1,
          110: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          1: 1,
          110: 2,
          209: 3,
          1002: 120000,
        },
      },
    ],
  },
  // 3.0
  {
    character_id: 53, // "Charon",
    pattern: [
      {
        pattern: "Hyper",
        materials: {
          1: 1,
          101: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Overindulgence",
        materials: {
          5: 1,
          105: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Quiescence",
        materials: {
          4: 1,
          103: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Prudentiality",
        materials: {
          5: 1,
          101: 2,
          208: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          1: 1,
          101: 2,
          204: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 52, // "Sentinel",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          4: 1,
          103: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          5: 1,
          101: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          2: 1,
          104: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          1: 1,
          106: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          5: 1,
          110: 2,
          210: 3,
          1002: 120000,
        },
      },
    ],
  },
  // 2.8
  {
    character_id: 51, // "Moldir",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          1: 1,
          106: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          107: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          1: 1,
          109: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          3: 1,
          111: 2,
          208: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          2: 1,
          104: 2,
          206: 4,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 50, // "Ulrich",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          4: 1,
          110: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          109: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          5: 1,
          111: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          2: 1,
          108: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          2: 1,
          106: 2,
          211: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 49, // "Nautika",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          106: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          104: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          2: 1,
          108: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          2: 1,
          107: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          3: 1,
          107: 2,
          206: 4,
          1002: 120000,
        },
      },
    ],
  },
  // 2.75
  {
    character_id: 48, // "kassandra",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          1: 1,
          111: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          2: 1,
          107: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          2: 1,
          107: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          1: 1,
          102: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          2: 1,
          110: 2,
          211: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 47, // "ezio",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          4: 1,
          101: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          3: 1,
          101: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          1: 1,
          108: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          2: 1,
          101: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          3: 1,
          106: 2,
          211: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 46, // "Kiperina",
    pattern: [
      {
        pattern: "Hyper",
        materials: {
          1: 1,
          103: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Overindulgence",
        materials: {
          1: 1,
          110: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Quiescence",
        materials: {
          4: 1,
          101: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Prudentiality",
        materials: {
          1: 1,
          109: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          1: 1,
          104: 2,
          206: 4,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 45, // "Hissabeth",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          106: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          5: 1,
          111: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          4: 1,
          111: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          1: 1,
          103: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          2: 1,
          101: 2,
          209: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 44, // "Aleph",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          1: 1,
          109: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          110: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          5: 1,
          104: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          3: 1,
          103: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          4: 1,
          110: 2,
          211: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 43, // "Recoleta",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          111: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          1: 1,
          109: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          3: 1,
          102: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          2: 1,
          110: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          5: 1,
          107: 2,
          204: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 42, // "Noire",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          4: 1,
          109: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          2: 1,
          105: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          2: 1,
          110: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          3: 1,
          106: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          1: 1,
          109: 2,
          210: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 40, // "Fatutu",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          109: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          102: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          2: 1,
          107: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          5: 1,
          105: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          2: 1,
          102: 2,
          207: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 39, // "Barcarola",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          111: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          1: 1,
          107: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          1: 1,
          102: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          3: 1,
          110: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          5: 1,
          109: 2,
          207: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 38, // "Flutterpage",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          2: 1,
          101: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          5: 1,
          106: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          4: 1,
          111: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          5: 1,
          109: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          4: 1,
          111: 2,
          202: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 37, // "Willow",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          102: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          2: 1,
          111: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          2: 1,
          103: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          5: 1,
          111: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          1: 1,
          111: 2,
          203: 5,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 35, // "Anjo Nala",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          2: 1,
          103: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          102: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          1: 1,
          107: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          1: 1,
          110: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          5: 1,
          109: 2,
          209: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 33, // "Tuesday",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          4: 1,
          104: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          5: 1,
          109: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          4: 1,
          102: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          1: 1,
          104: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          3: 1,
          109: 2,
          203: 5,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 34, // "Argus",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          2: 1,
          103: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          102: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          1: 1,
          107: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          1: 1,
          110: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          5: 1,
          109: 2,
          209: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 31, // "Mercuria",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          106: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          3: 1,
          110: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          4: 1,
          103: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          2: 1,
          103: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          1: 1,
          103: 2,
          210: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 32, // "J",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          104: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          5: 1,
          105: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          1: 1,
          102: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          4: 1,
          106: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          3: 1,
          109: 2,
          207: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 28, // "Semmelweis",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          1: 1,
          102: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          102: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          2: 1,
          103: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          5: 1,
          104: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          4: 1,
          106: 2,
          201: 4,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 29, // "Lucy",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          4: 1,
          101: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          2: 1,
          102: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          1: 1,
          105: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          5: 1,
          111: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          1: 1,
          110: 2,
          207: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 23, // "Getian",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          2: 1,
          111: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          3: 1,
          110: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          3: 1,
          103: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          3: 1,
          107: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          3: 1,
          109: 2,
          204: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 22, // "Jiu Niangzi",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          103: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          2: 1,
          106: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          3: 1,
          102: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          4: 1,
          111: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          1: 1,
          106: 2,
          210: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 24, // "Isolde",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          109: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          103: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          5: 1,
          104: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          1: 1,
          109: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          2: 1,
          104: 2,
          211: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 30, // "Kakania",
    pattern: [
      {
        pattern: "Hyper",
        materials: {
          2: 1,
          106: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Overindulgence",
        materials: {
          1: 1,
          105: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Quiescence",
        materials: {
          5: 1,
          101: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Prudentiality",
        materials: {
          2: 1,
          106: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          5: 1,
          103: 2,
          207: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 19, // "6",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          1: 1,
          107: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          3: 1,
          103: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          1: 1,
          109: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          1: 1,
          110: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          2: 1,
          105: 2,
          206: 4,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 21, // "Ezra Theodore",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          111: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          3: 1,
          111: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          4: 1,
          103: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          2: 1,
          101: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          3: 1,
          102: 2,
          205: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 20, // "Spathodea",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          103: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          2: 1,
          103: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          4: 1,
          106: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          4: 1,
          101: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          5: 1,
          111: 2,
          206: 4,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 17, // "Shamane",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          2: 1,
          105: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          3: 1,
          110: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          5: 1,
          111: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          4: 1,
          111: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          1: 1,
          109: 2,
          211: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 16, // "Kaalaa Baunaa",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          103: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          5: 1,
          104: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          4: 1,
          102: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          4: 1,
          106: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          3: 1,
          101: 2,
          209: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 18, // "37",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          104: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          101: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          5: 1,
          107: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          4: 1,
          106: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          1: 1,
          110: 2,
          202: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 25, // "Marcus",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          4: 1,
          109: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          1: 1,
          103: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          1: 1,
          111: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          3: 1,
          109: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          1: 1,
          106: 2,
          211: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 12, // "Melania",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          109: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          1: 1,
          104: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          1: 1,
          103: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          5: 1,
          109: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          1: 1,
          106: 2,
          205: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 15, // "Jessica",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          1: 1,
          103: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          2: 1,
          111: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          4: 1,
          110: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          4: 1,
          102: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          1: 1,
          106: 2,
          204: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 14, // "Tooth Fairy",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          2: 1,
          107: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          5: 1,
          105: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          2: 1,
          103: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          5: 1,
          104: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          4: 1,
          107: 2,
          209: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 10, // "Ms. NewBabel",
    pattern: [
      {
        pattern: "Hyper",
        materials: {
          2: 1,
          109: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Overindulgence",
        materials: {
          4: 1,
          101: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Quiescence",
        materials: {
          4: 1,
          110: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Prudentiality",
        materials: {
          2: 1,
          103: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          5: 1,
          105: 2,
          203: 5,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 9, // "Eternity",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          1: 1,
          104: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          107: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          4: 1,
          105: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          5: 1,
          101: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          3: 1,
          110: 2,
          203: 5,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 11, // "Voyager",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          2: 1,
          105: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          2: 1,
          102: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          4: 1,
          107: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          4: 1,
          101: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          3: 1,
          111: 2,
          202: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 7, // "An-an Lee",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          111: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          5: 1,
          110: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          5: 1,
          102: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          1: 1,
          103: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          2: 1,
          110: 2,
          201: 4,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 6, // "Centurion",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          4: 1,
          107: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          3: 1,
          105: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          2: 1,
          106: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          4: 1,
          111: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          4: 1,
          105: 2,
          204: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 5, // "Regulus",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          1: 1,
          106: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          5: 1,
          111: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Hyper",
        materials: {
          5: 1,
          106: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Inspire",
        materials: {
          2: 1,
          107: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Delirament",
        materials: {
          3: 1,
          110: 2,
          205: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 4, // "Sotheby",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          101: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          5: 1,
          106: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          2: 1,
          107: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          3: 1,
          106: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          4: 1,
          102: 2,
          206: 4,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 3, // "A Knight",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          2: 1,
          103: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          3: 1,
          105: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          3: 1,
          101: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          2: 1,
          109: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          1: 1,
          107: 2,
          206: 4,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 2, // "Lilya",
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          106: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          1: 1,
          107: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          2: 1,
          103: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          4: 1,
          104: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          4: 1,
          110: 2,
          203: 5,
          1002: 120000,
        },
      },
    ],
  },

  {
    character_id: 1, // Druvis III
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          5: 1,
          107: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          1: 1,
          104: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          1: 1,
          101: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          3: 1,
          102: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          3: 1,
          107: 2,
          206: 4,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 8, // Medicine Pocket
    pattern: [
      {
        pattern: "Hyper",
        materials: {
          2: 1,
          109: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Overindulgence",
        materials: {
          2: 1,
          104: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Quiescence",
        materials: {
          2: 1,
          105: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Prudentiality",
        materials: {
          3: 1,
          109: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          4: 1,
          106: 2,
          210: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 13, // Pickles
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          4: 1,
          104: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          3: 1,
          106: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          1: 1,
          106: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          3: 1,
          102: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          1: 1,
          109: 2,
          203: 5,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 26, // Vila
    pattern: [
      {
        pattern: "Hyper",
        materials: {
          3: 1,
          105: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Overindulgence",
        materials: {
          4: 1,
          104: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Quiescence",
        materials: {
          1: 1,
          110: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Prudentiality",
        materials: {
          4: 1,
          103: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          3: 1,
          106: 2,
          210: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 27, // Windsong
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          1: 1,
          107: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          4: 1,
          105: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Mercy",
        materials: {
          5: 1,
          106: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equanimity",
        materials: {
          1: 1,
          101: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Equibalance",
        materials: {
          3: 1,
          101: 2,
          202: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 36, // Lopera
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          107: 2,
          211: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          1: 1,
          104: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          5: 1,
          110: 2,
          207: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          3: 1,
          104: 2,
          206: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          2: 1,
          101: 2,
          207: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 41, // Liang
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          104: 2,
          204: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          3: 1,
          109: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          1: 1,
          103: 2,
          202: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          1: 1,
          111: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Hyperphrenia",
        materials: {
          3: 1,
          110: 2,
          206: 4,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 57, // "Brume"
    pattern: [
      {
        pattern: "Elucidation",
        materials: {
          3: 1,
          102: 2,
          201: 4,
          1002: 120000,
        },
      },
      {
        pattern: "Genuinity",
        materials: {
          1: 1,
          108: 2,
          203: 5,
          1002: 120000,
        },
      },
      {
        pattern: "Stupefaction",
        materials: {
          2: 1,
          101: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Aspirational",
        materials: {
          4: 1,
          109: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Inspirational",
        materials: {
          4: 1,
          106: 2,
          209: 3,
          1002: 120000,
        },
      },
    ],
  },
  {
    character_id: 56, // "Beryl"
    pattern: [
      {
        pattern: "Pattern5",
        materials: {
          2: 1,
          106: 2,
          208: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Pattern4",
        materials: {
          4: 1,
          102: 2,
          209: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Pattern14",
        materials: {
          5: 1,
          109: 2,
          205: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Pattern2",
        materials: {
          5: 1,
          106: 2,
          210: 3,
          1002: 120000,
        },
      },
      {
        pattern: "Pattern6",
        materials: {
          3: 1,
          107: 2,
          209: 3,
          1002: 120000,
        },
      },
    ],
  },
];
