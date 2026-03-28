import { CardItem, HamburgerMenuCategory } from "@/lib/types/menuTypes";

// Menu items for "놀이터" (Playground) section
export const PLAYGROUND_ITEMS: CardItem[] = [
  {
    icon: "/infos/menu/gacha_simulator_menu.webp",
    label: "가챠\n시뮬레이터",
    labelKey: "gachaSimulatorShort",
    href: "/gacha_simulator",
  },
  {
    icon: "/infos/menu/character_quiz_menu.webp",
    label: "캐릭터\n퀴즈",
    labelKey: "characterQuizShort",
    href: "/character_quiz",
  },
  {
    icon: "/infos/menu/quiz_menu.webp",
    label: "종합 퀴즈",
    labelKey: "quiz",
    href: "/quiz",
  },
  {
    icon: "/infos/menu/bingo_menu.webp",
    label: "빙고",
    labelKey: "bingo",
    href: "/bingo",
  },
  {
    icon: "/infos/menu/favorite_character_menu.webp",
    label: "최애\n캐릭터",
    labelKey: "favoriteCharacterShort",
    href: "/favorite_character",
  },
];

// Menu items for "도서관" (Library) section - 캐릭터 육성 & 실제 게임 플레이 관련
export const LIBRARY_ITEMS: CardItem[] = [
  {
    icon: "/infos/menu/character_menu.webp",
    label: "캐릭터 가이드",
    labelKey: "characterGuide",
    href: "/character",
  },
  {
    icon: "/infos/menu/recommend_team_menu.webp",
    label: "추천 조합",
    labelKey: "recommendTeam",
    href: "/recommend_team",
  },
  {
    icon: "/infos/menu/growth_calculator_menu.webp",
    label: "육성 계산기",
    labelKey: "growthCalculator",
    href: "/growth_calculator",
  },
  {
    icon: "/infos/menu/reveries_in_the_rain_menu.webp",
    label: "빗속의 공상",
    labelKey: "reveriesInTheRain",
    href: "/reveries_in_the_rain",
  },
  {
    icon: "/infos/menu/blueprint_menu.webp",
    label: "청사진 모음",
    labelKey: "blueprintSetting",
    href: "/blueprint_setting",
  },
  {
    icon: "/infos/menu/euphoria_guide_menu.webp",
    label: "광상 목록",
    labelKey: "euphoriaGuide",
    href: "/euphoria_guide",
  },
  {
    icon: "/infos/menu/psycube_guide_menu.webp",
    label: "의지 육성",
    labelKey: "psycubeGuide",
    href: "/psycube_guide",
  },
  {
    icon: "/infos/menu/path_quiz_menu.webp",
    label: "오솔길 정답",
    labelKey: "pathQuiz",
    href: "/path_quiz",
  },
  {
    icon: "/infos/menu/shop_efficiency_menu.webp",
    label: "상점 효율",
    labelKey: "shopEfficiency",
    href: "/shop_efficiency",
  },
];

// Menu items for "가이드" (Guide) section - 플레이와 직접 연관 없는 정보/참고 자료
export const GUIDE_ITEMS: CardItem[] = [
  {
    icon: "/infos/menu/material_menu.webp",
    label: "재료 파밍",
    labelKey: "materialFarming",
    modalType: "material",
  },
  {
    icon: "/infos/menu/skin_menu.webp",
    label: "스킨 갤러리",
    labelKey: "skinGallery",
    href: "/skin",
  },
  {
    icon: "/infos/menu/future_insight_menu.webp",
    label: "미래시 정리",
    labelKey: "futureInsight",
    href: "/future_insight",
  },
  {
    icon: "/infos/menu/cash_package_shop_menu.webp",
    label: "현질 패키지",
    labelKey: "cashPackageShop",
    href: "/cash_package_shop",
  },
  {
    icon: "/infos/menu/calendar_menu.webp",
    label: "캘린더",
    labelKey: "calendar",
    href: "/calendar",
  },
  {
    icon: "/infos/menu/cash_guide_menu.webp",
    label: "현질 가이드",
    labelKey: "cashGuide",
    href: "/cash_guide",
  },
  {
    icon: "/infos/menu/gacha_guide_menu.webp",
    label: "가챠 가이드",
    labelKey: "gachaGuide",
    href: "/gacha_guide",
  },
  {
    icon: "/infos/menu/newbie_guide_menu.webp",
    label: "뉴비 가이드",
    labelKey: "newbieGuide",
    href: "/newbie_guide",
  },
  {
    icon: "/infos/menu/coupon_menu.webp",
    label: "쿠폰 목록",
    labelKey: "couponList",
    href: "/coupon",
  },
  {
    icon: "/infos/menu/content_guide_menu.webp",
    label: "상시 컨텐츠",
    labelKey: "contentGuide",
    href: "/content_guide",
  },
];

// Menu category structure (for HamburgerMenu)
export const MENU_CATEGORIES = [
  {
    title: "놀이터",
    titleKey: "playground",
    items: PLAYGROUND_ITEMS,
  },
  {
    title: "도서관",
    titleKey: "library",
    items: LIBRARY_ITEMS,
  },
  {
    title: "가이드",
    titleKey: "guide",
    items: GUIDE_ITEMS,
  },
] as const;

// HamburgerMenu specific categories (with modalType support)
export const HAMBURGER_MENU_CATEGORIES: HamburgerMenuCategory[] = [
  {
    title: "놀이터",
    titleKey: "playground",
    items: [
      {
        iconImg: "/infos/menu/gacha_simulator_menu.webp",
        label: "가챠 시뮬레이터",
        labelKey: "gachaSimulator",
        href: "/gacha_simulator",
      },
      {
        iconImg: "/infos/menu/character_quiz_menu.webp",
        label: "캐릭터 퀴즈",
        labelKey: "characterQuiz",
        href: "/character_quiz",
      },
      {
        iconImg: "/infos/menu/quiz_menu.webp",
        label: "종합 퀴즈",
        labelKey: "quiz",
        href: "/quiz",
      },
      { iconImg: "/infos/menu/bingo_menu.webp", label: "빙고", labelKey: "bingo", href: "/bingo" },
      {
        iconImg: "/infos/menu/favorite_character_menu.webp",
        label: "최애 캐릭터",
        labelKey: "favoriteCharacter",
        href: "/favorite_character",
      },
    ],
  },
  {
    title: "도서관",
    titleKey: "library",
    items: [
      {
        iconImg: "/infos/menu/character_menu.webp",
        label: "캐릭터 가이드",
        labelKey: "characterGuide",
        href: "/character",
      },
      {
        iconImg: "/infos/menu/recommend_team_menu.webp",
        label: "추천 조합",
        labelKey: "recommendTeam",
        href: "/recommend_team",
      },
      {
        iconImg: "/infos/menu/growth_calculator_menu.webp",
        label: "육성 계산기",
        labelKey: "growthCalculator",
        href: "/growth_calculator",
      },
      {
        iconImg: "/infos/menu/reveries_in_the_rain_menu.webp",
        label: "빗속의 공상",
        labelKey: "reveriesInTheRain",
        href: "/reveries_in_the_rain",
      },
      {
        iconImg: "/infos/menu/blueprint_menu.webp",
        label: "청사진 모음",
        labelKey: "blueprintSetting",
        href: "/blueprint_setting",
      },
      {
        iconImg: "/infos/menu/euphoria_guide_menu.webp",
        label: "광상 목록",
        labelKey: "euphoriaGuide",
        href: "/euphoria_guide",
      },
      {
        iconImg: "/infos/menu/psycube_guide_menu.webp",
        label: "의지 육성",
        labelKey: "psycubeGuide",
        href: "/psycube_guide",
      },
      { iconImg: "/infos/menu/path_quiz_menu.webp", label: "오솔길 정답", labelKey: "pathQuiz", href: "/path_quiz" },
      {
        iconImg: "/infos/menu/shop_efficiency_menu.webp",
        label: "상점 효율",
        labelKey: "shopEfficiency",
        href: "/shop_efficiency",
      },
    ],
  },
  {
    title: "가이드",
    titleKey: "guide",
    items: [
      {
        iconImg: "/infos/menu/material_menu.webp",
        label: "재료 파밍",
        labelKey: "materialFarming",
        modalType: "material",
      },
      { iconImg: "/infos/menu/skin_menu.webp", label: "스킨 갤러리", labelKey: "skinGallery", href: "/skin" },
      {
        iconImg: "/infos/menu/future_insight_menu.webp",
        label: "미래시 정리",
        labelKey: "futureInsight",
        href: "/future_insight",
      },
      {
        iconImg: "/infos/menu/cash_package_shop_menu.webp",
        label: "현질 패키지",
        labelKey: "cashPackageShop",
        href: "/cash_package_shop",
      },
      {
        iconImg: "/infos/menu/calendar_menu.webp",
        label: "캘린더",
        labelKey: "calendar",
        href: "/calendar",
      },
      {
        iconImg: "/infos/menu/cash_guide_menu.webp",
        label: "현질 가이드",
        labelKey: "cashGuide",
        href: "/cash_guide",
      },
      {
        iconImg: "/infos/menu/gacha_guide_menu.webp",
        label: "가챠 가이드",
        labelKey: "gachaGuide",
        href: "/gacha_guide",
      },
      {
        iconImg: "/infos/menu/newbie_guide_menu.webp",
        label: "뉴비 가이드",
        labelKey: "newbieGuide",
        href: "/newbie_guide",
      },
      {
        iconImg: "/infos/menu/coupon_menu.webp",
        label: "쿠폰 목록",
        labelKey: "couponList",
        href: "/coupon",
      },
      {
        iconImg: "/infos/menu/content_guide_menu.webp",
        label: "상시 컨텐츠",
        labelKey: "contentGuide",
        href: "/content_guide",
      },
    ],
  },
];
