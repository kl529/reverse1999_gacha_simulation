import { charactersByRarity, Character } from "@/data/characters";

export const QUIZ_CHARACTERS: Character[] = Object.values(charactersByRarity)
  .flat()
  .reverse();
