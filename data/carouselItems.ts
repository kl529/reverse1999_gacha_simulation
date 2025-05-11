// /data/carouselItems.ts
export interface CarouselItem {
    id: number;
    title: string;
    image: string;
    description?: string;
    link?: string;
    type?: "event" | "update" | "pick_up"; // event : 이벤트, update : 내 사이트 업데이트, pick_up : 픽업
  }
  
  export const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: "2.5 버전, 누아르 픽업",
      image: "/infos/carousel_img/noire_pick_up.webp",
      description: "지금 가챠 시뮬레이터에서 만나보세요.",
      link: "/gacha_simulator",
      type: "pick_up"
    },
    {
      id: 2,
      title: "미래시 정리 홍보", // 고정
      image: "/infos/carousel_img/future_insight_carousel.webp",
      description: "미래시 정리 홍보",
      link: "/future_insight",
      type: "event"
    },
  ];
  