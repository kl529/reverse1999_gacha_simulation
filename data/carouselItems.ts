// /data/carouselItems.ts
export interface CarouselItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  link?: string;
  type?: "event" | "update" | "pick_up"; // event : 이벤트, update : 내 사이트 업데이트, pick_up : 픽업
  open?: boolean;
}

export const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "2.5v, 누아르 픽업",
    image: "/infos/carousel_img/noire_pick_up.webp",
    description: "지금 가챠 시뮬레이터에서 만나보세요.",
    link: "/gacha_simulator",
    type: "pick_up",
    open: false,
  },
  {
    id: 2,
    title: "미래시 정리 홍보", // 고정
    image: "/infos/carousel_img/future_insight_carousel.webp",
    description: "미래시 정리 홍보",
    link: "/future_insight",
    type: "event",
  },
  {
    id: 3,
    title: "후원 링크",
    image: "/infos/carousel_img/donate_carousel.webp",
    link: "https://buymeacoffee.com/vertin_suitcase",
    type: "event",
  },
  {
    id: 4,
    title: "청사진 모음",
    image: "/infos/carousel_img/blueprint_setting.webp",
    link: "/blueprint_setting",
    type: "event",
    open: false,
  },
  {
    id: 5,
    title: "광상 목록",
    image: "/infos/carousel_img/euphoria_guide.webp",
    link: "/euphoria_guide",
    type: "event",
    open: false,
  },
  {
    id: 6,
    title: "추천조합의 모든 것",
    image: "/infos/carousel_img/recommend_team.webp",
    link: "/recommend_team",
    type: "event",
  },
  {
    id: 8,
    title: "현질 가이드",
    image: "/infos/carousel_img/cash_guide_carousel.webp",
    link: "/cash_guide",
    type: "event",
    open: false,
  },
  {
    id: 9,
    title: "의지 증폭 가이드",
    image: "/infos/carousel_img/psycube_guide_carousel.webp",
    link: "/psycube_guide",
    type: "event",
    open: false,
  },
  {
    id: 10,
    title: "캐릭터 가이드",
    image: "/infos/carousel_img/character_guide_carousel.webp",
    link: "/character",
    type: "event",
  },
  {
    id: 11,
    title: "빗속의 공상",
    image: "/infos/carousel_img/reveries_in_the_rain_carousel.webp",
    link: "/reveries_in_the_rain",
    type: "event",
  },
];
