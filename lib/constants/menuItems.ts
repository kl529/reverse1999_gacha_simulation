import { CardItem, HamburgerMenuCategory } from "@/lib/types/menuTypes";

// Menu items for "놀이터" (Playground) section
export const PLAYGROUND_ITEMS: CardItem[] = [
  {
    icon: "/infos/menu/gacha_simulator_menu.webp",
    label: "가챠\n시뮬레이터",
    href: "/gacha_simulator",
  },
  {
    icon: "/infos/menu/character_quiz_menu.webp",
    label: "캐릭터\n퀴즈",
    href: "/character_quiz",
  },
  {
    icon: "/infos/menu/bingo_menu.webp",
    label: "빙고",
    href: "/bingo",
  },
];

// Menu items for "도서관" (Library) section
export const LIBRARY_ITEMS: CardItem[] = [
  {
    icon: "/infos/menu/material_menu.webp",
    label: "재료 파밍",
    title: "재료 파밍표",
    href: "#",
    image: "/infos/modal_img/material_sheet.webp",
    source: "https://bbs.nga.cn/read.php?tid=41840172&rand=968",
  },
  {
    icon: "/infos/menu/resonance_menu.webp",
    label: "공명 & 의지",
    href: "/character_setting",
  },
  {
    icon: "/infos/menu/skin_menu.webp",
    label: "스킨 갤러리",
    href: "/skin",
  },
  {
    icon: "/infos/menu/future_insight_menu.webp",
    label: "미래시 정리",
    href: "/future_insight",
  },
  {
    icon: "/infos/menu/recommend_team_menu.webp",
    label: "추천 조합",
    href: "/recommend_team",
  },
  {
    icon: "/infos/menu/blueprint_menu.webp",
    label: "청사진 모음",
    href: "/blueprint_setting",
  },
  {
    icon: "/infos/menu/calendar_menu.webp",
    label: "캘린더",
    href: "/calendar",
  },
  {
    icon: "/infos/menu/reveries_in_the_rain_menu.webp",
    label: "빗속의 공상",
    href: "/reveries_in_the_rain",
  },
  {
    icon: "/infos/menu/cash_package_shop_menu.webp",
    label: "현질 패키지",
    href: "/cash_package_shop",
  },
  {
    icon: "/infos/menu/shop_efficiency_menu.webp",
    label: "상점 효율",
    href: "/shop_efficiency",
  },
];

// Menu items for "가이드" (Guide) section
export const GUIDE_ITEMS: CardItem[] = [
  {
    icon: "/infos/menu/character_menu.webp",
    label: "캐릭터 가이드",
    href: "/character",
  },
  {
    icon: "/infos/menu/path_quiz_menu.webp",
    label: "오솔길 정답",
    href: "/path_quiz",
  },
  {
    icon: "/infos/menu/euphoria_guide_menu.webp",
    label: "광상 가이드",
    href: "/euphoria_guide",
  },
  {
    icon: "/infos/menu/psycube_guide_menu.webp",
    label: "의지 육성",
    href: "/psycube_guide",
  },
  {
    icon: "/infos/menu/cash_guide_menu.webp",
    label: "현질 가이드",
    href: "/cash_guide",
  },
  {
    icon: "/infos/menu/gacha_guide_menu.webp",
    label: "가챠 가이드",
    href: "/gacha_guide",
  },
  {
    icon: "/infos/menu/newbie_guide_menu.webp",
    label: "뉴비 가이드",
    href: "/newbie_guide",
  },
];

// Menu category structure (for HamburgerMenu)
export const MENU_CATEGORIES = [
  {
    title: "놀이터",
    items: PLAYGROUND_ITEMS,
  },
  {
    title: "도서관",
    items: LIBRARY_ITEMS,
  },
  {
    title: "가이드",
    items: GUIDE_ITEMS,
  },
] as const;

// HamburgerMenu specific categories (with modalType support)
export const HAMBURGER_MENU_CATEGORIES: HamburgerMenuCategory[] = [
  {
    title: "놀이터",
    items: [
      {
        iconImg: "/infos/menu/gacha_simulator_menu.webp",
        label: "가챠 시뮬레이터",
        href: "/gacha_simulator",
      },
      {
        iconImg: "/infos/menu/character_quiz_menu.webp",
        label: "캐릭터 퀴즈",
        href: "/character_quiz",
      },
      { iconImg: "/infos/menu/bingo_menu.webp", label: "빙고", href: "/bingo" },
    ],
  },
  {
    title: "도서관",
    items: [
      { iconImg: "/infos/menu/material_menu.webp", label: "재료 파밍", modalType: "material" },
      {
        iconImg: "/infos/menu/resonance_menu.webp",
        label: "공명 & 의지",
        href: "/character_setting",
      },
      { iconImg: "/infos/menu/skin_menu.webp", label: "스킨 갤러리", href: "/skin" },
      {
        iconImg: "/infos/menu/future_insight_menu.webp",
        label: "미래시 정리",
        href: "/future_insight",
      },
      {
        iconImg: "/infos/menu/recommend_team_menu.webp",
        label: "추천 조합",
        href: "/recommend_team",
      },
      {
        iconImg: "/infos/menu/blueprint_menu.webp",
        label: "청사진 모음",
        href: "/blueprint_setting",
      },
      {
        iconImg: "/infos/menu/calendar_menu.webp",
        label: "캘린더",
        href: "/calendar",
      },
      {
        iconImg: "/infos/menu/reveries_in_the_rain_menu.webp",
        label: "빗속의 공상",
        href: "/reveries_in_the_rain",
      },
      {
        iconImg: "/infos/menu/cash_package_shop_menu.webp",
        label: "현질 패키지",
        href: "/cash_package_shop",
      },
      {
        iconImg: "/infos/menu/shop_efficiency_menu.webp",
        label: "상점 효율",
        href: "/shop_efficiency",
      },
    ],
  },
  {
    title: "가이드",
    items: [
      {
        iconImg: "/infos/menu/character_menu.webp",
        label: "캐릭터 가이드",
        href: "/character",
      },
      { iconImg: "/infos/menu/path_quiz_menu.webp", label: "오솔길 정답", href: "/path_quiz" },
      {
        iconImg: "/infos/menu/euphoria_guide_menu.webp",
        label: "광상 가이드",
        href: "/euphoria_guide",
      },
      {
        iconImg: "/infos/menu/psycube_guide_menu.webp",
        label: "의지 육성",
        href: "/psycube_guide",
      },
      {
        iconImg: "/infos/menu/cash_guide_menu.webp",
        label: "현질 가이드",
        href: "/cash_guide",
      },
      {
        iconImg: "/infos/menu/gacha_guide_menu.webp",
        label: "가챠 가이드",
        href: "/gacha_guide",
      },
      {
        iconImg: "/infos/menu/newbie_guide_menu.webp",
        label: "뉴비 가이드",
        href: "/newbie_guide",
      },
    ],
  },
];
