import { Character } from "./characters";

export type Banner = {
  id: string;
  name: string;
  pickup6: Character; // 6성 픽업 캐릭터 1명
  pickup5: Character[]; // 5성 픽업 캐릭터 2명
};

// 예제 배너 데이터 (추가 가능)
export const banners: Banner[] = [
  {
    id: "flutter_page_pick_up",
    name: "플러터 페이지 픽업",
    pickup6: { name: "플러터 페이지", rarity: 6, inspiration: "star", engName: "flutter-page" },
    pickup5: [
      { name: "슬라우치 햇", rarity: 5, inspiration: "mineral", engName: "brimley" }
    ],
  },
  {
    id: "isolde_pick_up",
    name: "이졸데 픽업",
    pickup6: { name: "이졸데", rarity: 6, inspiration: "spirit", engName: "isolde" },
    pickup5: [
      { name: "찰리", rarity: 5, inspiration: "star", engName: "charlie" },
      { name: "클릭", rarity: 5, inspiration: "spirit", engName: "click" },
    ],
  }, 
  {
    id: "willow_pick_up",
    name: "윌로우 픽업",
    pickup6: { name: "윌로우", rarity: 6, inspiration: "plant", engName: "willow" },
    pickup5: [
      { name: "X", rarity: 5, inspiration: "intellect", engName: "x" },
      { name: "마릴린", rarity: 5, inspiration: "beast", engName: "sweetheart" },
    ],
  },
  {
    id: "lopera_pick_up",
    name: "로페라 픽업",
    pickup6: { name: "로페라", rarity: 6, inspiration: "beast", engName: "lopera" },
    pickup5: [
      { name: "클릭", rarity: 5, inspiration: "spirit", engName: "click" },
      { name: "울루", rarity: 5, inspiration: "mineral", engName: "ulu" },
    ],
  },
];