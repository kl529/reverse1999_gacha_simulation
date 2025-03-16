import { Character } from "./characters";

export type Banner = {
  id: string;
  name: string;
  bannerType?: "normal" | "doublePick";
  pickup6?: Character; // 일반 배너용 6성
  pickup5?: Character[]; // 일반 배너용 5성
  twoPickup6?: Character[]; // 2중 픽업 배너에서만 사용
};

// 예제 배너 데이터 (추가 가능)
export const banners: Banner[] = [
  {
    id: "doublepick_j_tuesday",
    name: "J & 튜즈데이",
    bannerType: "doublePick",
    twoPickup6: [
      { name: "J", rarity: 6, inspiration: "beast", engName: "joe" },
      { name: "튜즈데이", rarity: 6, inspiration: "spirit", engName: "tuesday" },
    ],
  },
  {
    id: "doublepick_mercuria_kakania",
    name: "머큐리아 & 카카니아",
    bannerType: "doublePick",
    twoPickup6: [
      { name: "머큐리아", rarity: 6, inspiration: "spirit", engName: "mercuria" },
      { name: "카카니아", rarity: 6, inspiration: "plant", engName: "kakania" },
    ],
  },
  {
    id: "flutter_page_pick_up",
    name: "[2.3] 플러터 페이지 픽업",
    pickup6: { name: "플러터 페이지", rarity: 6, inspiration: "star", engName: "flutter-page" },
    pickup5: [
      { name: "슬라우치 햇", rarity: 5, inspiration: "mineral", engName: "brimley" }
    ],
  },
  {
    id: "willow_pick_up",
    name: "[2.3] 윌로우 픽업",
    pickup6: { name: "윌로우", rarity: 6, inspiration: "plant", engName: "willow" },
    pickup5: [
      { name: "X", rarity: 5, inspiration: "intellect", engName: "x" },
      { name: "마릴린", rarity: 5, inspiration: "beast", engName: "sweetheart" },
    ],
  },
  {
    id: "lopera_pick_up",
    name: "[2.2] 로페라 픽업",
    pickup6: { name: "로페라", rarity: 6, inspiration: "beast", engName: "lopera" },
    pickup5: [
      { name: "클릭", rarity: 5, inspiration: "spirit", engName: "click" },
      { name: "울루", rarity: 5, inspiration: "mineral", engName: "ulu" },
    ],
  },
  {
    id: "anjo_nala_pick_up",
    name: "[2.2] 안조 날라 픽업",
    pickup6: { name: "안조 날라", rarity: 6, inspiration: "beast", engName: "anjo-nala" },
    pickup5: [
    ],
  },
  {
    id: "argus_pick_up",
    name: "[2.1] 아르고스 픽업",
    pickup6: { name: "아르고스", rarity: 6, inspiration: "plant", engName: "argus" },
    pickup5: [
      { name: "사츠키", rarity: 5, inspiration: "plant", engName: "satsuki" },
      { name: "테넌트", rarity: 5, inspiration: "beast", engName: "tennant" },
    ],
  },
  {
    id: "tuesday_pick_up",
    name: "[2.1] 튜즈데이 픽업",
    pickup6: { name: "튜즈데이", rarity: 6, inspiration: "spirit", engName: "tuesday" },
    pickup5: [
      { name: "바바라", rarity: 5, inspiration: "spirit", engName: "barbara" },
    ],
  },
  {
    id: "joe_pick_up",
    name: "[2.0] J 픽업",
    pickup6: { name: "J", rarity: 6, inspiration: "beast", engName: "joe" },
    pickup5: [
      { name: "데저트 플란넬", rarity: 5, inspiration: "beast", engName: "desert-flannel" },
      { name: "테넌트", rarity: 5, inspiration: "beast", engName: "tennant" },
    ],
  },
  {
    id: "mercuria_pick_up",
    name: "[2.0] 머큐리아 픽업",
    pickup6: { name: "머큐리아", rarity: 6, inspiration: "spirit", engName: "mercuria" },
    pickup5: [
      { name: "찰리", rarity: 5, inspiration: "star", engName: "charlie" },
      { name: "클릭", rarity: 5, inspiration: "spirit", engName: "click" },
    ],
  },
  {
    id: "kakania_pick_up",
    name: "[1.9] 카카니아 픽업",
    pickup6: { name: "카카니아", rarity: 6, inspiration: "plant", engName: "kakania" },
    pickup5: [
      { name: "사츠키", rarity: 5, inspiration: "plant", engName: "satsuki" },
      { name: "디거스", rarity: 5, inspiration: "plant", engName: "diggers" },
    ],
  },
  {
    id: "lucy_pick_up",
    name: "[1.9] 루시 픽업",
    pickup6: { name: "루시", rarity: 6, inspiration: "intellect", engName: "lucy" },
    pickup5: [
    ],
  },
  {
    id: "windsong_pick_up",
    name: "[1.8] 윈드송 픽업",
    pickup6: { name: "윈드송", rarity: 6, inspiration: "star", engName: "windsong" },
    pickup5: [
      { name: "블로니", rarity: 5, inspiration: "star", engName: "blonney" },
      { name: "마릴린", rarity: 5, inspiration: "beast", engName: "sweetheart" },
    ],
  },
  {
    id: "vila_pick_up",
    name: "[1.8] 빌라 픽업",
    pickup6: { name: "빌라", rarity: 6, inspiration: "plant", engName: "vila" },
    pickup5: [
      { name: "아브구스트", rarity: 5, inspiration: "plant", engName: "avgust" },
    ],
  },
  {
    id: "marcus_pick_up",
    name: "[1.7] 마커스 픽업",
    pickup6: { name: "마커스", rarity: 6, inspiration: "plant", engName: "marcus" },
    pickup5: [
      { name: "찰리", rarity: 5, inspiration: "star", engName: "charlie" },
      { name: "디케", rarity: 5, inspiration: "beast", engName: "dikke" },
    ],
  },
  {
    id: "isolde_pick_up",
    name: "[1.7] 이졸데 픽업",
    pickup6: { name: "이졸데", rarity: 6, inspiration: "spirit", engName: "isolde" },
    pickup5: [
      { name: "테넌트", rarity: 5, inspiration: "beast", engName: "tennant" },
      { name: "네크롤로지스트", rarity: 5, inspiration: "mineral", engName: "necrologist" },
    ],
  },
  {
    id: "getian_pick_up",
    name: "[1.6] 갈천 픽업",
    pickup6: { name: "갈천", rarity: 6, inspiration: "beast", engName: "getian" },
    pickup5: [
      { name: "X", rarity: 5, inspiration: "intellect", engName: "x" },
      { name: "콘블룸", rarity: 5, inspiration: "plant", engName: "bkornblume" },
    ],
  },
  {
    id: "jiu_niangzi_pick_up",
    name: "[1.6] 곡랑 픽업",
    pickup6: { name: "곡랑", rarity: 6, inspiration: "mineral", engName: "jiu-niangzi" },
    pickup5: [
    ],
  },
  {
    id: "ezra_theodore_pick_up",
    name: "[1.5] 에즈라 픽업",
    pickup6: { name: "에즈라", rarity: 6, inspiration: "star", engName: "ezra-theodore" },
    pickup5: [
      { name: "데저트 플란넬", rarity: 5, inspiration: "beast", engName: "desert-flannel" },
      { name: "사츠키", rarity: 5, inspiration: "plant", engName: "satsuki" },
    ],
  },
  {
    id: "spathodea_pick_up",
    name: "[1.5] 스파토데아 픽업",
    pickup6: { name: "스파토데아", rarity: 6, inspiration: "beast", engName: "spathodea" },
    pickup5: [
      { name: "울루", rarity: 5, inspiration: "mineral", engName: "ulu" },
      { name: "디케", rarity: 5, inspiration: "beast", engName: "dikke" },
    ],
  },
  {
    id: "6_pick_up",
    name: "[1.4] 6 픽업",
    pickup6: { name: "6", rarity: 6, inspiration: "intellect", engName: "6" },
    pickup5: [
      { name: "베이비 블루", rarity: 5, inspiration: "star", engName: "baby-blue" },
      { name: "클릭", rarity: 5, inspiration: "spirit", engName: "click" },
    ],
  },
  {
    id: "37_pick_up",
    name: "[1.4] 37 픽업",
    pickup6: { name: "37", rarity: 6, inspiration: "star", engName: "37" },
    pickup5: [
      { name: "테넌트", rarity: 5, inspiration: "beast", engName: "tennant" },
      { name: "마릴린", rarity: 5, inspiration: "beast", engName: "sweetheart" },
    ],
  },
  {
    id: "shamane_pick_up",
    name: "[1.3] 갈기 모래 픽업",
    pickup6: { name: "갈기 모래", rarity: 6, inspiration: "beast", engName: "shamane" },
    pickup5: [
      { name: "사츠키", rarity: 5, inspiration: "plant", engName: "satsuki" },
      { name: "벌룬파티", rarity: 5, inspiration: "mineral", engName: "balloon-party" },
    ],
  },
  {
    id: "black_dwarf_pick_up",
    name: "[1.3] 갈라보나 픽업",
    pickup6: { name: "갈라보나", rarity: 6, inspiration: "mineral", engName: "black-dwarf" },
    pickup5: [
      { name: "칸지라", rarity: 5, inspiration: "plant", engName: "kanjira" },
      { name: "테넌트", rarity: 5, inspiration: "beast", engName: "tennant" },
    ],
  },
  {
    id: "changeling_pick_up",
    name: "[1.2] 제시카 픽업",
    pickup6: { name: "제시카", rarity: 6, inspiration: "plant", engName: "changeling" },
    pickup5: [
      { name: "호러피디아", rarity: 5, inspiration: "mineral", engName: "horropedia" },
      { name: "네크롤로지스트", rarity: 5, inspiration: "mineral", engName: "necrologist" },
    ],
  },
  {
    id: "tooth_fairy_pick_up",
    name: "[1.2] 투스 페어리 픽업",
    pickup6: { name: "투스 페어리", rarity: 6, inspiration: "star", engName: "tooth-fairy" },
    pickup5: [
      { name: "콘블룸", rarity: 5, inspiration: "plant", engName: "bkornblume" },
      { name: "블로니", rarity: 5, inspiration: "star", engName: "blonney" },
    ],
  },
  {
    id: "pickles_pick_up",
    name: "[1.1] 피클즈 픽업",
    pickup6: { name: "피클즈", rarity: 6, inspiration: "mineral", engName: "pickles" },
    pickup5: [
      { name: "베이비 블루", rarity: 5, inspiration: "star", engName: "baby-blue" },
      { name: "디거스", rarity: 5, inspiration: "plant", engName: "diggers" },
    ],
  },
  {
    id: "melania_pick_up",
    name: "[1.1] 멜라니아 픽업",
    pickup6: { name: "멜라니아", rarity: 6, inspiration: "beast", engName: "melania" },
    pickup5: [
      { name: "마릴린", rarity: 5, inspiration: "beast", engName: "sweetheart" },
      { name: "벌룬파티", rarity: 5, inspiration: "mineral", engName: "balloon-party" },
    ],
  },
  {
    id: "lilya_pick_up",
    name: "[상시] 릴리아 픽업",
    pickup6: { name: "릴리아", rarity: 6, inspiration: "star", engName: "lilya" },
    pickup5: [
      { name: "X", rarity: 5, inspiration: "intellect", engName: "x" },
      { name: "디케", rarity: 5, inspiration: "beast", engName: "dikke" },
    ],
  },
  {
    id: "ms_newbabel_pick_up",
    name: "[상시] 뉴바벨 픽업",
    pickup6: { name: "뉴바벨", rarity: 6, inspiration: "mineral", engName: "ms-newbabel" },
    pickup5: [
      { name: "찰리", rarity: 5, inspiration: "star", engName: "charlie" },
      { name: "클릭", rarity: 5, inspiration: "spirit", engName: "click" },
    ],
  },
  {
    id: "medicine_pocket_pick_up",
    name: "[상시] 메디슨 포켓 픽업",
    pickup6: { name: "메디슨 포켓", rarity: 6, inspiration: "beast", engName: "medicine-pocket" },
    pickup5: [
      { name: "베이비 블루", rarity: 5, inspiration: "star", engName: "baby-blue" },
      { name: "콘블룸", rarity: 5, inspiration: "plant", engName: "bkornblume" },
    ],
  },
  {
    id: "centurion_pick_up",
    name: "[상시] 센츄리온 픽업",
    pickup6: { name: "센츄리온", rarity: 6, inspiration: "beast", engName: "centurion" },
    pickup5: [
      { name: "X", rarity: 5, inspiration: "intellect", engName: "x" },
      { name: "디케", rarity: 5, inspiration: "beast", engName: "dikke" },
    ],
  },
  {
    id: "an_an_lee_pick_up",
    name: "[상시] 안안 리 픽업",
    pickup6: { name: "안안 리", rarity: 6, inspiration: "plant", engName: "an-an-lee" },
    pickup5: [
      { name: "베이비 블루", rarity: 5, inspiration: "star", engName: "baby-blue" },
      { name: "마릴린", rarity: 5, inspiration: "beast", engName: "sweetheart" },
    ],
  },
  {
    id: "eternity_pick_up",
    name: "[상시] 이터니티 픽업",
    pickup6: { name: "이터니티", rarity: 6, inspiration: "mineral", engName: "eternity" },
    pickup5: [
      { name: "찰리", rarity: 5, inspiration: "star", engName: "charlie" },
      { name: "클릭", rarity: 5, inspiration: "spirit", engName: "click" },
    ],
  },
  {
    id: "voyager_pick_up",
    name: "[상시] 보이저 픽업",
    pickup6: { name: "보이저", rarity: 6, inspiration: "star", engName: "voyager" },
    pickup5: [
      { name: "X", rarity: 5, inspiration: "intellect", engName: "x" },
      { name: "벌룬 파티", rarity: 5, inspiration: "mineral", engName: "balloon-party" },
    ],
  },
  {
    id: "regulus_pick_up",
    name: "[상시] 레굴루스 픽업",
    pickup6: { name: "레굴루스", rarity: 6, inspiration: "star", engName: "regulus" },
    pickup5: [
      { name: "디케", rarity: 5, inspiration: "beast", engName: "dikke" },
      { name: "사츠키", rarity: 5, inspiration: "plant", engName: "satsuki" },
    ],
  },
  {
    id: "druvis_iii_pick_up",
    name: "[상시] 드루비스 픽업",
    pickup6: { name: "드루비스", rarity: 6, inspiration: "plant", engName: "druvis-iii" },
    pickup5: [
      { name: "네크롤로지스트", rarity: 5, inspiration: "mineral", engName: "necrologist" },
      { name: "클릭", rarity: 5, inspiration: "spirit", engName: "click" },
    ],
  },
  {
    id: "sotheby_pick_up",
    name: "[상시] 소더비 픽업",
    pickup6: { name: "소더비", rarity: 6, inspiration: "plant", engName: "sotheby" },
    pickup5: [
      { name: "찰리", rarity: 5, inspiration: "star", engName: "charlie" },
      { name: "X", rarity: 5, inspiration: "intellect", engName: "x" },
    ],
  },
  {
    id: "a_knight_pick_up",
    name: "[상시] A 나이트 픽업",
    pickup6: { name: "A 나이트", rarity: 6, inspiration: "spirit", engName: "a-knight" },
    pickup5: [
      { name: "테넌트", rarity: 5, inspiration: "beast", engName: "tennant" },
      { name: "콘블룸", rarity: 5, inspiration: "plant", engName: "bkornblume" },
    ],
  },
];