import { charactersByRarity, Character } from "@/data/characters";

export const SETTING_CHARACTERS: Character[] = Object.values(charactersByRarity).flat();

export const GUIDE_CHARACTERS: Character[] = Object.values(charactersByRarity)
  .flat()
  .filter((c) => c.rarity === 6);
