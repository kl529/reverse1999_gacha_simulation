export interface ResonanceMaterial {
  character_id: number;
  resonance: {
    level: number;
    materials: Record<number, number>;
  }[];
}

export const resonanceMaterialList: ResonanceMaterial[] = [
  {
    character_id: 1, // "Druvis III"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          405: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          402: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          302: 3,
          304: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          202: 4,
          305: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          201: 5,
          302: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          206: 6,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          104: 4,
          203: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          105: 5,
          206: 5,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          1: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          2: 3,
          105: 4,
        },
      },
    ],
  },
  {
    character_id: 2, // "Lilya"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          303: 3,
          305: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          202: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          201: 4,
          305: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          203: 6,
          205: 8,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          103: 4,
          202: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          106: 5,
          205: 6,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          2: 2,
          106: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          3: 3,
          101: 4,
        },
      },
    ],
  },
  {
    character_id: 3, // "A Knight"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          306: 4,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          206: 4,
          302: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          203: 5,
          304: 8,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          205: 6,
          206: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          101: 4,
          205: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          104: 5,
          201: 6,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          3: 2,
          105: 3,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          1: 3,
          106: 4,
        },
      },
    ],
  },
  {
    character_id: 4, // "Sotheby"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          404: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          304: 3,
          302: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          206: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          203: 4,
          304: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          205: 4,
          303: 5,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          202: 6,
          203: 8,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          105: 4,
          206: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          103: 5,
          202: 7,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          1: 2,
          104: 3,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          2: 3,
          103: 4,
        },
      },
    ],
  },
  {
    character_id: 5, // "Regulus"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          405: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          402: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          302: 3,
          304: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          202: 4,
          305: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          201: 5,
          302: 6,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 5,
          206: 6,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          104: 4,
          203: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          105: 5,
          206: 5,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          1: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          2: 3,
          105: 4,
        },
      },
    ],
  },
  {
    character_id: 6, // "Centurion"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          303: 3,
          305: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          202: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          201: 4,
          305: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          203: 6,
          205: 8,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          103: 4,
          202: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          106: 5,
          205: 6,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          2: 2,
          106: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          3: 3,
          101: 4,
        },
      },
    ],
  },
  {
    character_id: 7, // "An-an Lee"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          306: 4,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          206: 4,
          302: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          203: 5,
          304: 8,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 5,
          205: 6,
          206: 6,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          101: 4,
          205: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          104: 5,
          201: 6,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          3: 2,
          105: 3,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          1: 3,
          106: 4,
        },
      },
    ],
  },
  {
    character_id: 8, // "Medicine Pocket"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          306: 4,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          206: 3,
          302: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          203: 5,
          304: 8,
        },
      },
      {
        level: 10,
        materials: {
          607: 1,
          603: 5,
          205: 6,
          206: 6,
        },
      },
      {
        level: 11,
        materials: {
          607: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          607: 1,
          603: 6,
          101: 4,
          205: 5,
        },
      },
      {
        level: 13,
        materials: {
          607: 1,
          603: 6,
          104: 5,
          201: 6,
        },
      },
      {
        level: 14,
        materials: {
          607: 1,
          603: 8,
          3: 2,
          105: 3,
        },
      },
      {
        level: 15,
        materials: {
          607: 1,
          603: 8,
          1: 3,
          106: 4,
        },
      },
    ],
  },
  {
    character_id: 9, // "Eternity"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          404: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          304: 3,
          302: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          206: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          203: 4,
          304: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          205: 4,
          303: 5,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          202: 6,
          203: 8,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          105: 4,
          206: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          103: 5,
          202: 7,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          1: 2,
          104: 3,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          2: 3,
          103: 4,
        },
      },
    ],
  },
  {
    character_id: 10, // "Ms. NewBabel"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          404: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          304: 3,
          302: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          206: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          203: 4,
          304: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          205: 4,
          303: 5,
        },
      },
      {
        level: 10,
        materials: {
          607: 1,
          603: 5,
          202: 6,
          203: 8,
        },
      },
      {
        level: 11,
        materials: {
          607: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          607: 1,
          603: 6,
          105: 4,
          206: 5,
        },
      },
      {
        level: 13,
        materials: {
          607: 1,
          603: 6,
          103: 5,
          202: 7,
        },
      },
      {
        level: 14,
        materials: {
          607: 1,
          603: 8,
          1: 2,
          104: 3,
        },
      },
      {
        level: 15,
        materials: {
          607: 1,
          603: 8,
          2: 3,
          103: 4,
        },
      },
    ],
  },
  {
    character_id: 11, // "Voyager"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          303: 3,
          305: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          202: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          201: 4,
          305: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          203: 6,
          205: 8,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          103: 4,
          202: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          106: 5,
          205: 6,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          2: 2,
          106: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          3: 3,
          101: 4,
        },
      },
    ],
  },
  {
    character_id: 12, // "Melania"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          306: 4,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          206: 4,
          302: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          203: 5,
          304: 8,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          205: 6,
          206: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          101: 4,
          205: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          104: 5,
          201: 6,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          3: 2,
          105: 3,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          1: 3,
          106: 4,
        },
      },
    ],
  },
  {
    character_id: 13, // "Pickles"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          405: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          402: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          302: 3,
          304: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          202: 4,
          305: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          201: 5,
          302: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          206: 6,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          104: 4,
          203: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          105: 5,
          206: 5,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          1: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          2: 3,
          105: 4,
        },
      },
    ],
  },
  {
    character_id: 14, // "Tooth Fairy"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          404: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          304: 3,
          302: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          206: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          203: 4,
          304: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          205: 4,
          303: 5,
        },
      },
      {
        level: 10,
        materials: {
          607: 1,
          603: 5,
          202: 6,
          203: 8,
        },
      },
      {
        level: 11,
        materials: {
          607: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          607: 1,
          603: 6,
          105: 4,
          206: 5,
        },
      },
      {
        level: 13,
        materials: {
          607: 1,
          603: 6,
          103: 5,
          202: 7,
        },
      },
      {
        level: 14,
        materials: {
          607: 1,
          603: 8,
          1: 2,
          104: 3,
        },
      },
      {
        level: 15,
        materials: {
          607: 1,
          603: 8,
          2: 3,
          103: 4,
        },
      },
    ],
  },
  {
    character_id: 15, // "Jessica"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          303: 3,
          305: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          202: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          201: 4,
          305: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 5,
          203: 6,
          205: 8,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          103: 4,
          202: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          106: 5,
          205: 6,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          2: 2,
          106: 4,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          3: 3,
          101: 4,
        },
      },
    ],
  },
  {
    character_id: 16, // "Kaalaa Baunaa"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          303: 3,
          305: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          202: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          201: 4,
          305: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          203: 6,
          205: 8,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          103: 4,
          202: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          106: 5,
          205: 6,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          2: 2,
          106: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          3: 3,
          101: 4,
        },
      },
    ],
  },
  {
    character_id: 17, // "Shamane"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          405: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          402: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          302: 3,
          304: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          202: 4,
          305: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          201: 5,
          302: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 6,
          206: 6,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          104: 4,
          203: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          105: 5,
          206: 5,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          1: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          2: 3,
          105: 4,
        },
      },
    ],
  },
  {
    character_id: 18, // "37"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          405: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          305: 4,
          302: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          203: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          205: 4,
          306: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          202: 5,
          310: 6,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 6,
          206: 6,
          201: 8,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          106: 4,
          201: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          101: 5,
          202: 6,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          3: 2,
          110: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          5: 3,
          104: 4,
        },
      },
    ],
  },
  {
    character_id: 19, // "6"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          403: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          401: 6,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          303: 3,
          309: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          202: 4,
          303: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          210: 6,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          111: 4,
          203: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          103: 5,
          206: 5,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          5: 2,
          101: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          1: 3,
          105: 4,
        },
      },
    ],
  },
  {
    character_id: 20, // "Spathodea"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          401: 6,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          304: 3,
          310: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          202: 4,
          306: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          210: 5,
          305: 8,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 6,
          201: 8,
          203: 8,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          106: 4,
          205: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          105: 5,
          201: 6,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          2: 2,
          111: 4,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          3: 3,
          110: 4,
        },
      },
    ],
  },
  {
    character_id: 21, // "Ezra Theodore"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          402: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          309: 3,
          306: 6,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          205: 4,
          302: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          211: 4,
          305: 8,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          203: 5,
          210: 6,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          105: 4,
          206: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          110: 5,
          203: 8,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          3: 2,
          104: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          5: 3,
          103: 4,
        },
      },
    ],
  },
  {
    character_id: 22, // "Jiu Niangzi"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          306: 4,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          211: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          206: 4,
          302: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          201: 5,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          205: 5,
          210: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          103: 4,
          206: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          101: 5,
          211: 6,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          5: 2,
          110: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          1: 3,
          104: 4,
        },
      },
    ],
  },
  {
    character_id: 23, // "Getian"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          405: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          404: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          310: 4,
          306: 6,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          206: 4,
          303: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          203: 5,
          309: 6,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 5,
          211: 6,
          202: 6,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          103: 4,
          205: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          111: 5,
          210: 5,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          1: 2,
          106: 4,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          2: 3,
          101: 4,
        },
      },
    ],
  },
  {
    character_id: 24, // "Isolde"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          403: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          401: 6,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          303: 3,
          305: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          211: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          206: 4,
          310: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          201: 5,
          302: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          203: 6,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          104: 4,
          211: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          101: 5,
          206: 5,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          2: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          3: 3,
          110: 4,
        },
      },
    ],
  },
  {
    character_id: 25, // "Marcus"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          404: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          306: 4,
          304: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          210: 4,
          305: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          201: 5,
          310: 6,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 5,
          206: 6,
          203: 8,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          101: 4,
          211: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          110: 5,
          205: 6,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          1: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          5: 3,
          106: 4,
        },
      },
    ],
  },
  {
    character_id: 26, // "Vila"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          405: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          304: 3,
          309: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          206: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          203: 4,
          310: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          210: 5,
          303: 5,
        },
      },
      {
        level: 10,
        materials: {
          607: 1,
          603: 5,
          201: 8,
          211: 6,
        },
      },
      {
        level: 11,
        materials: {
          607: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          607: 1,
          603: 6,
          111: 4,
          205: 5,
        },
      },
      {
        level: 13,
        materials: {
          607: 1,
          603: 6,
          106: 5,
          203: 8,
        },
      },
      {
        level: 14,
        materials: {
          607: 1,
          603: 8,
          5: 2,
          110: 4,
        },
      },
      {
        level: 15,
        materials: {
          607: 1,
          603: 8,
          2: 3,
          104: 4,
        },
      },
    ],
  },
  {
    character_id: 27, // "Windsong"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          402: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          302: 3,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          211: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          210: 4,
          304: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          205: 4,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          206: 6,
          201: 8,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          110: 4,
          203: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          101: 5,
          206: 5,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          1: 2,
          104: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          3: 3,
          103: 4,
        },
      },
    ],
  },
  {
    character_id: 28, // "Semmelweis"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          405: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          305: 4,
          302: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          203: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          205: 4,
          306: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          202: 5,
          310: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 6,
          206: 6,
          201: 8,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          106: 4,
          201: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          101: 5,
          202: 6,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          3: 2,
          110: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          5: 3,
          104: 4,
        },
      },
    ],
  },
  {
    character_id: 29, // "Lucy"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          401: 6,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          304: 3,
          310: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          202: 4,
          306: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          210: 5,
          305: 8,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          201: 8,
          203: 8,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          106: 4,
          205: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          105: 5,
          201: 6,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          2: 2,
          111: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          3: 3,
          110: 4,
        },
      },
    ],
  },
  {
    character_id: 30, // "Kakania"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          403: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          405: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          306: 4,
          308: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          206: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          211: 4,
          303: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          209: 4,
          309: 4,
        },
      },
      {
        level: 10,
        materials: {
          607: 1,
          603: 5,
          203: 6,
          201: 8,
        },
      },
      {
        level: 11,
        materials: {
          607: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          607: 1,
          603: 6,
          110: 4,
          205: 5,
        },
      },
      {
        level: 13,
        materials: {
          607: 1,
          603: 6,
          103: 4,
          210: 5,
        },
      },
      {
        level: 14,
        materials: {
          607: 1,
          603: 8,
          3: 2,
          101: 4,
        },
      },
      {
        level: 15,
        materials: {
          607: 1,
          603: 8,
          4: 3,
          111: 4,
        },
      },
    ],
  },
  {
    character_id: 31, // "Mercuria"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          404: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          308: 3,
          310: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          201: 5,
          309: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          211: 6,
          203: 8,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          110: 4,
          209: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          104: 5,
          210: 5,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          2: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          5: 3,
          109: 4,
        },
      },
    ],
  },
  {
    character_id: 32, // "J"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          405: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          402: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          309: 3,
          304: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          209: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          203: 4,
          310: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          201: 5,
          308: 4,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          205: 6,
          206: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          106: 4,
          210: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          101: 5,
          211: 6,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          4: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          1: 3,
          104: 4,
        },
      },
    ],
  },
  {
    character_id: 33, // "Tuesday"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          403: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          405: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          303: 3,
          306: 6,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          203: 4,
          310: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          210: 5,
          304: 8,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 5,
          209: 6,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          103: 4,
          211: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          106: 5,
          209: 5,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          3: 2,
          104: 4,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          4: 3,
          111: 4,
        },
      },
    ],
  },
  {
    character_id: 34, // "Argus"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          404: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          304: 3,
          308: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          209: 4,
          309: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          310: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          203: 6,
          201: 8,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          111: 4,
          210: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          106: 5,
          201: 6,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          1: 2,
          109: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          5: 3,
          104: 4,
        },
      },
    ],
  },
  {
    character_id: 35, // "Anjo Nala"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          401: 6,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          310: 4,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          210: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          201: 5,
          309: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          205: 4,
          305: 8,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          203: 6,
          211: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          103: 4,
          209: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          110: 5,
          206: 5,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          5: 2,
          111: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          2: 3,
          104: 4,
        },
      },
    ],
  },
  {
    character_id: 36, // "Lopera"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          402: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          308: 3,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          203: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          211: 4,
          304: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          210: 5,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          205: 6,
          206: 6,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          110: 4,
          201: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          101: 5,
          209: 5,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          4: 2,
          106: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          3: 3,
          109: 4,
        },
      },
    ],
  },
  {
    character_id: 38, // "Flutterpage"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          405: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          309: 3,
          305: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          211: 4,
          308: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          303: 5,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          203: 6,
          210: 5,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          103: 4,
          209: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          110: 5,
          205: 6,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          2: 2,
          111: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          4: 3,
          101: 4,
        },
      },
    ],
  },
  {
    character_id: 37, // "Willow"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          405: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          305: 4,
          310: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          209: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          210: 4,
          303: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          203: 5,
          304: 8,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          211: 6,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          101: 4,
          206: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          111: 5,
          201: 6,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          1: 2,
          109: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          4: 3,
          110: 4,
        },
      },
    ],
  },
  {
    character_id: 39, // "Barcarola"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          403: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          404: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          303: 3,
          308: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          211: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          206: 4,
          306: 6,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          210: 5,
          304: 8,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 5,
          209: 6,
          203: 8,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          110: 4,
          205: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          101: 5,
          201: 6,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          3: 2,
          106: 4,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          5: 3,
          111: 4,
        },
      },
    ],
  },
  {
    character_id: 40, // "Fatutu"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          401: 6,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          310: 4,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          209: 4,
          309: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          205: 4,
          305: 8,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 5,
          203: 6,
          211: 6,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          101: 4,
          206: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          109: 5,
          210: 5,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          4: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          2: 3,
          104: 4,
        },
      },
    ],
  },
  {
    character_id: 41, // "Liang"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          405: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          305: 4,
          304: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          203: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          201: 5,
          303: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          309: 4,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          211: 6,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          106: 4,
          209: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          104: 5,
          210: 5,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          2: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          1: 3,
          111: 4,
        },
      },
    ],
  },
  {
    character_id: 42, // "Noire"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          405: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          305: 4,
          304: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          203: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          201: 5,
          303: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          309: 4,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 5,
          211: 6,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          106: 4,
          209: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          104: 5,
          210: 5,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          2: 2,
          103: 4,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          1: 3,
          111: 4,
        },
      },
    ],
  },
  {
    character_id: 44, // "Aleph"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          402: 5,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          404: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          304: 3,
          310: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          210: 4,
          305: 4,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          209: 4,
          306: 6,
        },
      },
      {
        level: 10,
        materials: {
          606: 1,
          603: 5,
          203: 6,
          201: 8,
        },
      },
      {
        level: 11,
        materials: {
          606: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          606: 1,
          603: 6,
          106: 4,
          211: 5,
        },
      },
      {
        level: 13,
        materials: {
          606: 1,
          603: 6,
          109: 5,
          206: 5,
        },
      },
      {
        level: 14,
        materials: {
          606: 1,
          603: 8,
          4: 2,
          101: 4,
        },
      },
      {
        level: 15,
        materials: {
          606: 1,
          603: 8,
          1: 3,
          110: 4,
        },
      },
    ],
  },
  {
    character_id: 43, // "Recoleta"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          308: 3,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          203: 4,
          310: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          205: 4,
          309: 4,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          201: 8,
          211: 6,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          101: 4,
          209: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          106: 5,
          210: 5,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          5: 2,
          104: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          2: 3,
          103: 4,
        },
      },
    ],
  },
  {
    character_id: 45, // "Hissabeth"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          403: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          405: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          310: 4,
          305: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          203: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          210: 4,
          307: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 6,
          308: 4,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          201: 8,
          205: 6,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          107: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          103: 4,
          211: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          110: 5,
          208: 6,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          4: 2,
          104: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          3: 3,
          101: 4,
        },
      },
    ],
  },
  {
    character_id: 46, // "Kiperina"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          404: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          401: 6,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          307: 3,
          303: 3,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          201: 5,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          205: 4,
          310: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          209: 4,
          305: 8,
        },
      },
      {
        level: 10,
        materials: {
          607: 1,
          603: 5,
          210: 6,
          203: 8,
        },
      },
      {
        level: 11,
        materials: {
          607: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          607: 1,
          603: 6,
          106: 4,
          208: 5,
        },
      },
      {
        level: 13,
        materials: {
          607: 1,
          603: 6,
          101: 5,
          211: 6,
        },
      },
      {
        level: 14,
        materials: {
          607: 1,
          603: 8,
          1: 2,
          104: 4,
        },
      },
      {
        level: 15,
        materials: {
          607: 1,
          603: 8,
          5: 3,
          108: 4,
        },
      },
    ],
  },
  {
    character_id: 47, // "Nautika"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          401: 6,
          301: 3,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          403: 4,
          305: 4,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          306: 4,
          308: 4,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          207: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          202: 4,
          305: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          201: 5,
          302: 6,
        },
      },
      {
        level: 10,
        materials: {
          604: 1,
          603: 5,
          206: 6,
          205: 8,
        },
      },
      {
        level: 11,
        materials: {
          604: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          604: 1,
          603: 6,
          103: 4,
          202: 5,
        },
      },
      {
        level: 13,
        materials: {
          604: 1,
          603: 6,
          106: 5,
          205: 6,
        },
      },
      {
        level: 14,
        materials: {
          604: 1,
          603: 8,
          2: 2,
          106: 4,
        },
      },
      {
        level: 15,
        materials: {
          604: 1,
          603: 8,
          3: 3,
          101: 4,
        },
      },
    ],
  },
  {
    character_id: 48, // "Ulrich"
    resonance: [
      {
        level: 2,
        materials: {
          601: 5,
        },
      },
      {
        level: 3,
        materials: {
          601: 5,
          405: 4,
        },
      },
      {
        level: 4,
        materials: {
          601: 5,
          402: 4,
          301: 3,
        },
      },
      {
        level: 5,
        materials: {
          602: 5,
          304: 3,
          306: 6,
        },
      },
      {
        level: 6,
        materials: {
          1002: 30000,
          602: 5,
          204: 3,
        },
      },
      {
        level: 7,
        materials: {
          602: 6,
          205: 4,
        },
      },
      {
        level: 8,
        materials: {
          602: 6,
          203: 4,
          310: 5,
        },
      },
      {
        level: 9,
        materials: {
          602: 8,
          206: 4,
          309: 6,
        },
      },
      {
        level: 10,
        materials: {
          605: 1,
          603: 5,
          201: 8,
          209: 6,
        },
      },
      {
        level: 11,
        materials: {
          605: 1,
          1002: 120000,
          603: 5,
          102: 4,
        },
      },
      {
        level: 12,
        materials: {
          605: 1,
          603: 6,
          106: 4,
          210: 5,
        },
      },
      {
        level: 13,
        materials: {
          605: 1,
          603: 6,
          103: 5,
          211: 6,
        },
      },
      {
        level: 14,
        materials: {
          605: 1,
          603: 8,
          5: 2,
          101: 4,
        },
      },
      {
        level: 15,
        materials: {
          605: 1,
          603: 8,
          4: 3,
          104: 4,
        },
      },
    ],
  },
  {
    character_id: 49, // "Moldir"
    resonance: [
      {
        level: 2,
        materials: { 601: 5 },
      },
      {
        level: 3,
        materials: { 601: 5, 402: 5 },
      },
      {
        level: 4,
        materials: { 601: 5, 404: 4, 301: 3 },
      },
      {
        level: 5,
        materials: { 602: 5, 310: 4, 303: 4 },
      },
      {
        level: 6,
        materials: { 1002: 30000, 602: 5, 207: 3 },
      },
      {
        level: 7,
        materials: { 602: 6, 209: 5 },
      },
      {
        level: 8,
        materials: { 602: 6, 201: 5, 307: 5 },
      },
      {
        level: 9,
        materials: { 602: 8, 203: 5, 309: 4 },
      },
      {
        level: 10,
        materials: { 604: 1, 603: 5, 205: 6, 106: 6 },
      },
      {
        level: 11,
        materials: { 604: 1, 1002: 120000, 603: 5, 107: 4 },
      },
      {
        level: 12,
        materials: { 604: 1, 603: 6, 106: 4, 210: 5 },
      },
      {
        level: 13,
        materials: { 604: 1, 603: 6, 101: 5, 211: 6 },
      },
      {
        level: 14,
        materials: { 604: 1, 603: 8, 4: 2, 109: 4 },
      },
      {
        level: 15,
        materials: { 604: 1, 603: 8, 1: 3, 101: 4 },
      },
    ],
  },
  {
    character_id: 50, // "Sentinel"
    resonance: [
      {
        level: 2,
        materials: { 601: 5 },
      },
      {
        level: 3,
        materials: { 601: 5, 404: 4 },
      },
      {
        level: 4,
        materials: { 601: 5, 401: 6, 301: 3 },
      },
      {
        level: 5,
        materials: { 602: 5, 308: 3, 310: 4 },
      },
      {
        level: 6,
        materials: { 1002: 30000, 602: 5, 207: 3 },
      },
      {
        level: 7,
        materials: { 602: 6, 201: 5 },
      },
      {
        level: 8,
        materials: { 602: 6, 205: 4, 305: 4 },
      },
      {
        level: 9,
        materials: { 602: 8, 210: 4, 306: 6 },
      },
      {
        level: 10,
        materials: { 604: 1, 603: 5, 208: 6, 211: 6 },
      },
      {
        level: 11,
        materials: { 604: 1, 1002: 120000, 603: 5, 107: 4 },
      },
      {
        level: 12,
        materials: { 604: 1, 603: 6, 101: 4, 209: 5 },
      },
      {
        level: 13,
        materials: { 604: 1, 603: 6, 104: 5, 106: 5 },
      },
      {
        level: 14,
        materials: { 604: 1, 603: 8, 4: 2, 110: 4 },
      },
      {
        level: 15,
        materials: { 604: 1, 603: 8, 3: 3, 103: 4 },
      },
    ],
  },
];
