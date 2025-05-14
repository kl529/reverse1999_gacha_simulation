// /data/blueprint.ts
export const BOSSES = [
  {
    id: "mountain_ghost",
    name: "산귀",
    image: "/infos/blueprint/boss/mountain_ghost.png",
    inspiration: "plant",
  },
  {
    id: "star_of_misfortune",
    name: "천체의 흉조",
    image: "/infos/blueprint/boss/star_of_misfortune.png",
    inspiration: "star",
  },
  {
    id: "operatic_reflection",
    name: "연극의 굴절",
    image: "/infos/blueprint/boss/operatic_reflection.png",
    inspiration: "beast",
  },
  {
    id: "ashen_beast",
    name: "뼈의 늑대",
    image: "/infos/blueprint/boss/ashen_beast.png",
    inspiration: "mineral",
  },
  {
    id: "primitive_urge",
    name: "원시적 충동",
    image: "/infos/blueprint/boss/primitive_urge.png",
    inspiration: "spirit",
  },
] as const;

export type BossId = (typeof BOSSES)[number]["id"];

export const FILTERS: Record<BossId, string[]> = {
  mountain_ghost: ["중독덱", "마커스덱"],
  star_of_misfortune: ["릴리아덱", "윈드송덱", "계시덱", "양월덱"],
  operatic_reflection: ["안조덱", "연소추공덱", "연소덱"],
  ashen_beast: ["제멜덱", "곡랑피클즈덱"],
  primitive_urge: [],
};

export const BLUEPRINTS: Record<BossId, Record<string, string[]>> = {
  mountain_ghost: {
    중독덱: ["/infos/blueprint/mountain_ghost/poison.webp"],
    마커스덱: ["/infos/blueprint/mountain_ghost/marcus.webp"],
  },
  star_of_misfortune: {
    릴리아덱: ["/infos/blueprint/star_of_misfortune/lilya.webp"],
    윈드송덱: ["/infos/blueprint/star_of_misfortune/windsong.webp"],
    계시덱: ["/infos/blueprint/star_of_misfortune/barcarola.webp"],
    양월덱: ["/infos/blueprint/star_of_misfortune/liang.webp"],
  },
  operatic_reflection: {
    안조덱: ["/infos/blueprint/operatic_reflection/anjo_nala.webp"],
    연소추공덱: ["/infos/blueprint/operatic_reflection/burn_extra_attack.webp"],
    연소덱: ["/infos/blueprint/operatic_reflection/burn.webp"],
  },
  ashen_beast: {
    제멜덱: ["/infos/blueprint/ashen_beast/semmelweis.webp"],
    곡랑피클즈덱: ["/infos/blueprint/ashen_beast/jiu_niangzi.webp"],
  },
  primitive_urge: {},
};
