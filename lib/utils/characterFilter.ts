/**
 * Character Filter Utility
 * 캐릭터 목록을 검색어와 속성으로 필터링하는 순수 함수
 */

import { Character } from "@/data/characters";

/**
 * 캐릭터 목록을 검색어와 속성으로 필터링
 * @param characters 캐릭터 배열
 * @param searchQuery 검색어 (한국어 이름 또는 영어 이름)
 * @param selectedAttr 선택된 속성 ("all" 또는 영감 타입)
 * @returns 필터링된 캐릭터 배열
 */
export function filterCharacters(
  characters: Character[],
  searchQuery: string,
  selectedAttr: string
): Character[] {
  return characters.filter((ch) => {
    const matchesSearch =
      ch.name.includes(searchQuery) ||
      ch.engName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAttr = selectedAttr === "all" || ch.inspiration === selectedAttr;
    return matchesSearch && matchesAttr;
  });
}
