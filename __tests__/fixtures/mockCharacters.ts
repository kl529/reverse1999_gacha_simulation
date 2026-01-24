import { Character } from "@/data/characters";

/**
 * Mock characters for testing
 * Includes characters of each rarity level
 */

export const mockCharacters: {
  sixStar: Character[];
  fiveStar: Character[];
  fourStar: Character[];
  threeStar: Character[];
  twoStar: Character[];
} = {
  sixStar: [
    {
      id: 1,
      name: "test-character",
      rarity: 6,
      inspiration: "plant",
      engName: "druvis-iii",
      version: "1.0",
      resonanceType: "balance",
    },
    {
      id: 2,
      name: "test-character",
      rarity: 6,
      inspiration: "star",
      engName: "lilya",
      version: "1.0",
      resonanceType: "damage",
    },
    {
      id: 38,
      name: "flutter-page",
      rarity: 6,
      inspiration: "star",
      engName: "flutter-page",
      version: "2.3",
      resonanceType: "damage",
    },
  ],
  fiveStar: [
    {
      id: 103,
      name: "X",
      rarity: 5,
      inspiration: "intellect",
      engName: "x",
      version: "1.0",
      resonanceType: "balance",
    },
    {
      id: 125,
      name: "brimley",
      rarity: 5,
      inspiration: "mineral",
      engName: "brimley",
      version: "2.3",
      resonanceType: "defense",
    },
  ],
  fourStar: [
    {
      id: 201,
      name: "nick-bottom",
      rarity: 4,
      inspiration: "beast",
      engName: "nick-bottom",
      version: "1.0",
      resonanceType: "defense",
    },
    {
      id: 202,
      name: "eagle",
      rarity: 4,
      inspiration: "plant",
      engName: "eagle",
      version: "1.0",
      resonanceType: "damage",
    },
  ],
  threeStar: [
    {
      id: 301,
      name: "the-fool",
      rarity: 3,
      inspiration: "star",
      engName: "the-fool",
      version: "1.0",
      resonanceType: "supdefenseport",
    },
    {
      id: 302,
      name: "la-source",
      rarity: 3,
      inspiration: "plant",
      engName: "la-source",
      version: "1.0",
      resonanceType: "support",
    },
  ],
  twoStar: [
    {
      id: 401,
      name: "ms-radio",
      rarity: 2,
      inspiration: "spirit",
      engName: "ms-radio",
      version: "1.0",
      resonanceType: "defense",
    },
    {
      id: 402,
      name: "door",
      rarity: 2,
      inspiration: "intellect",
      engName: "door",
      version: "1.0",
      resonanceType: "balance",
    },
  ],
};

/**
 * Helper function to get all mock characters as flat array
 */
export const getAllMockCharacters = (): Character[] => {
  return [
    ...mockCharacters.sixStar,
    ...mockCharacters.fiveStar,
    ...mockCharacters.fourStar,
    ...mockCharacters.threeStar,
    ...mockCharacters.twoStar,
  ];
};
