export interface CharacterSkin {
  id: number;
  character_id: number;
  name: string;
  engName: string;
  rarity: "Unique" | "Advanced" | "Garment";
  source: "판매" | "주크박스" | "컨텐츠" | "무료" | "콜라보 판매";
  is_future?: boolean;
  price?: string;
  resell: string;
  version: string;
}

export const characterSkin: CharacterSkin[] = [
  {
      id: 1,
      character_id: 101,
      name: "순례의 노래",
      engName: "parade_anthem",
      rarity: "Garment",
      source: "무료",
      resell: "X",
      version: "1.0"
  },
  {
    id: 2,
    character_id: 106,
    name: "거울속 인터루드",
    engName: "through_mirrors_and_curtains",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "1.1"
  },
  {
    id: 3,
    character_id: 6,
    name: "유니버셜 스타",
    engName: "the_universal_star",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.1"
  },
  {
    id: 4,
    character_id: 5,
    name: "광팬",
    engName: "the_fierce_fan",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.1"
  },
  {
    id: 5,
    character_id: 4,
    name: "커튼 속 깊은 곳",
    engName: "suspiriorum",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.2"
  },
  {
    id: 6,
    character_id: 107,
    name: "진홍색 뒤에 숨겨진 진실",
    engName: "truth_of_the_dark_red",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "1.2"
  },
  {
    id: 7,
    character_id: 103,
    name: "침묵 속 숨결",
    engName: "silent_breath",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.2"
  },
  {
    id: 8,
    character_id: 202,
    name: "식스센스",
    engName: "redrum",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "1.2"
  },
  {
    id: 9,
    character_id: 13,
    name: "강아지와 바다",
    engName: "the_young_dog_and_the_sea",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.3"
  }, //
  {
    id: 10,
    character_id: 112,
    name: "델리에서의 배회",
    engName: "roaming_in_delhi",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.3"
  },
  {
    id: 11,
    character_id: 102,
    name: "천재의 휴일",
    engName: "the_genius's_holiday",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "1.3"
  },
  {
    id: 12,
    character_id: 5,
    name: "산에서의 모험",
    engName: "the_adventure_on_the_mountains",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "1.3"
  },
  {
    id: 13,
    character_id: 2,
    name: "기하학의 예술",
    engName: "the_art_of_destreza",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.4"
  },
  {
    id: 14,
    character_id: 114,
    name: "또 다른 가설",
    engName: "another_assumption",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.4"
  },
  {
    id: 15,
    character_id: 104,
    name: "비너스의 설교",
    engName: "the_preaching_of_venus",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "1.4"
  },
  {
    id: 16,
    character_id: 302,
    name: "이율배반",
    engName: "antinomies",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "1.4"
  },
  {
    id: 17,
    character_id: 14,
    name: "베이글 코어",
    engName: "bagel",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.5"
  },
  {
    id: 18,
    character_id: 108,
    name: "위로 향한 총끝",
    engName: "the_pointy_end_up",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "1.5"
  },
  {
    id: 19,
    character_id: 205,
    name: "늑대의 도약",
    engName: "the_wolf's_leap",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.5"
  },
  {
    id: 20,
    character_id: 308,
    name: "마장마술",
    engName: "elegant_dance_steps",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "1.5"
  },
  { // 이 위론 가격 없음!!!
    id: 21,
    character_id: 7,
    name: "송운지간",
    engName: "between_clouds_and_pine_trees",
    rarity: "Garment",
    source: "무료",
    resell: "X",
    version: "1.6"
  },
  {
    id: 22,
    character_id: 3,
    name: "세상을 가로질러",
    engName: "galloping_across_the_times",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "1.6",
    price: "14,000₩ / 1080빗방울"
  },
  {
    id: 23,
    character_id: 1,
    name: "요아",
    engName: "lady_with_nao'e",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "1.6",
    price: "14,000₩ / 1080빗방울"
  },
  {
    id: 24,
    character_id: 109,
    name: "은빛 나비",
    engName: "the_folk_song_of_silver_butterfly",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "1.6"
  },
  {
    id: 25,
    character_id: 203,
    name: "산에서의 하루",
    engName: "a_day_in_the_mountain",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "1.6"
  },
  {
    id: 26,
    character_id: 18,
    name: "행복한 새 사냥꾼",
    engName: "happy_bird_catcher",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.7"
  },
  {
    id: 27,
    character_id: 12,
    name: "이토록 상서로운 밤",
    engName: "a_peaceful_night",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.7"
  },
  {
    id: 28,
    character_id: 111,
    name: "실버 로즈",
    engName: "silver_rose",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "1.7"
  },
  {
    id: 29,
    character_id: 302,
    name: "예배당 밖에서",
    engName: "outside_the_church",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "1.7"
  },
  {
    id: 30,
    character_id: 16,
    name: "준비, 도약, 착지",
    engName: "swing,_rise,_suspend",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "1.7"
  },
  {
    id: 31,
    character_id: 9,
    name: "극지 조망",
    engName: "a_visit_to_the_arctic",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.8"
  },
  {
    id: 32,
    character_id: 8,
    name: "우주를 찍는 자",
    engName: "the_cosmos_photographer",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.8"
  },
  {
    id: 33,
    character_id: 102,
    name: "위대한 맛의 조사관 (중섭)",
    engName: "the_great_taste_investigator",
    rarity: "Garment",
    source: "콜라보 판매",
    resell: "X",
    version: "1.8"
  },
  {
    id: 34,
    character_id: 105,
    name: "산 위의 참새",
    engName: "on_the_sparrow_hills",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "1.8"
  },
  {
    id: 35,
    character_id: 206,
    name: "클럽에서 만나",
    engName: "see_you_at_the_workers'_club",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "1.8"
  },
  { 
    id: 36,
    character_id: 15,
    name: "오후의 예항",
    engName: "voyage_from_your_bed",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "1.9"
  },
  {
    id: 37,
    character_id: 11,
    name: "다시 길 위로",
    engName: "new_journey",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "1.9"
  },
  {
    id: 38,
    character_id: 5,
    name: "출발! 내일로",
    engName: "take_off!_to_the_future",
    rarity: "Unique",
    source: "판매",
    resell: "X",
    version: "1.9"
  },
  {
    id: 39,
    character_id: 118,
    name: "야생의 부름",
    engName: "call_of_the_wild",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "1.9"
  },
  {
    id: 40,
    character_id: 101,
    name: "중첩된 어구",
    engName: "emotion_in_tranquility",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "1.9"
  },
  {
    id: 41,
    character_id: 212,
    name: "휴일",
    engName: "a_day_to_rest",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "1.9"
  },
  {
    id: 42,
    character_id: 202,
    name: "주말 외출",
    engName: "weekend_excursion",
    rarity: "Garment",
    source: "콜라보 판매",
    resell: "X",
    version: "1.9"
  },
  {
    id: 43,
    character_id: 19,
    name: "언제 어디서나",
    engName: "time_and_location",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "2.0"
  },
  {
    id: 44,
    character_id: 20,
    name: "승리를 위하여!",
    engName: "onwards,_to_victory!",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "2.0"
  },
  {
    id: 45,
    character_id: 117,
    name: "한밤의 손님",
    engName: "the_night_visitor",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "2.0"
  },
  {
    id: 46,
    character_id: 310,
    name: "끽, 끼긱?!",
    engName: "eek,_eek!",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "2.0"
  },
  {
    id: 47,
    character_id: 23,
    name: "시간의 예언자",
    engName: "herald_of_horus",
    rarity: "Garment",
    source: "콜라보 판매",
    resell: "X",
    version: "2.0"
  },
  {
    id: 48,
    character_id: 14,
    name: "새벽 무도회의 요정",
    engName: "fairies_dancing_at_dawn",
    rarity: "Advanced",
    source: "콜라보 판매",
    resell: "X",
    version: "2.0"
  },
  {
    id: 49,
    character_id: 24,
    name: "올 댓 재즈",
    engName: "and_all_that_jazz",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "2.1"
  },
  {
    id: 50,
    character_id: 21,
    name: "Yee-Haw!",
    engName: "yee-haw!",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "2.1"
  },
  {
    id: 51,
    character_id: 115,
    name: "엉성한 지알로 영화",
    engName: "the_giallo_grind",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "2.1"
  },
  {
    id: 52,
    character_id: 216,
    name: "토요일 스페셜",
    engName: "saturday_special",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "2.1"
  },
  {
    id: 53,
    character_id: 26,
    name: "멀리서 본 색채",
    engName: "by_the_painted_city",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "2.2"
  },
  {
    id: 54,
    character_id: 17,
    name: "마나우스의 흔적",
    engName: "beneath_the_jungle_canopy",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "2.2"
  },
  {
    id: 55,
    character_id: 18,
    name: "동굴 깊은 곳",
    engName: "down_in_the_grotto",
    rarity: "Unique",
    source: "판매",
    resell: "X",
    version: "2.2"
  },
  {
    id: 56,
    character_id: 25,
    name: "흰 모래와 바람",
    engName: "on_the_white_sand",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "2.2"
  },
  {
    id: 57,
    character_id: 120,
    name: "강가 산책",
    engName: "around_the_riverbend",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "2.2"
  },
  {
    id: 58,
    character_id: 214,
    name: "색다른 바닷속에서",
    engName: "under_a_different_sea",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "2.2"
  },
  {
    id: 59,
    character_id: 28,
    name: "노크 에티켓",
    engName: "a_knock_on_the_door",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "2.3"
  },
  {
    id: 60,
    character_id: 2,
    name: "지연되지 않는 공정",
    engName: "justice_cannot_be_delayed",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "2.3"
  },
  {
    id: 61,
    character_id: 112,
    name: "감정사의 전쟁",
    engName: "dueling_connoisseurs",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "2.3"
  },
  {
    id: 62,
    character_id: 305,
    name: "빠른 전진",
    engName: "race_to_the_finish_line",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "2.3"
  },
  {
    id: 63,
    character_id: 31,
    name: "한밤의 맘보",
    engName: "midnight_mistmancer",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "2.4"
  },
  {
    id: 64,
    character_id: 30,
    name: "심금의 살롱",
    engName: "seminars_on_serenity",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "2.4"
  },
  {
    id: 65,
    character_id: 10,
    name: "선의의 입찰",
    engName: "raise_the_bid",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "2.4"
  },
  {
    id: 66,
    character_id: 110,
    name: "끝없는 항해",
    engName: "a_voyage_with_no_return",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "2.4"
  },
  {
    id: 67,
    character_id: 207,
    name: "은빛 총신",
    engName: "silver_schirm",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "2.4"
  },
  {
    id: 68,
    character_id: 19,
    name: "불타버린 폐허에서",
    engName: "by_the_razed_polis",
    rarity: "Advanced",
    source: "콜라보 판매",
    resell: "X",
    version: "2.4"
  },
  {
    id: 69,
    character_id: 40,
    name: "곡선의 집",
    engName: "casa_of_the_curved_lines",
    rarity: "Garment",
    source: "콜라보 판매",
    resell: "X",
    version: "2.4"
  },
  {
    id: 70,
    character_id: 33,
    name: "옥병보감",
    engName: "story_of_the_jade_vase",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "2.5"
  },
  {
    id: 71,
    character_id: 22,
    name: "담 위의 별천지",
    engName: "blossom_spring_fairy",
    rarity: "Unique",
    source: "판매",
    resell: "X",
    version: "2.5"
  },
  {
    id: 72,
    character_id: 27,
    name: "착옥기",
    engName: "records_from_the_jade_hunt",
    rarity: "Garment",
    source: "무료",
    resell: "X",
    version: "2.5"
  },
  {
    id: 73,
    character_id: 4,
    name: "붉은 실의 인연",
    engName: "the_red_thread_of_fate",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "2.5"
  },
  {
    id: 74,
    character_id: 1,
    name: "가시덤불이 감싸인 곳",
    engName: "shrouded_in_thorns",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "2.5"
  },
  {
    id: 75,
    character_id: 301,
    name: "그림자 놀이꾼",
    engName: "the_shadow_play_master",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "2.5"
  },
  {
    id: 76,
    character_id: 37,
    name: "마지막 전조 (미래시)",
    engName: "the_last_portent",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "2.6"
  },
  {
    id: 77,
    character_id: 36,
    name: "친구의 스필린터캣 (미래시)",
    engName: "friend_of_the_splintercat",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "2.6"
  },
  {
    id: 78,
    character_id: 12,
    name: "적과 백 (미래시)",
    engName: "red_and_white",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "2.6"
  },
  {
    id: 79,
    character_id: 213,
    name: "맹세와 보너스 (미래시)",
    engName: "oaths_and_bonuses",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "2.6"
  },
  {
    id: 80,
    character_id: 39,
    name: "별자리 알레그로 (미래시)",
    engName: "asteroid_allegro",
    rarity: "Advanced",
    source: "판매",
    resell: "X",
    version: "2.7"
  },
  {
    id: 81,
    character_id: 34,
    name: "스타 바운드 현상금 사냥꾼 (미래시)",
    engName: "starbound_bounty_hunter",
    rarity: "Garment",
    source: "판매",
    resell: "X",
    version: "2.7"
  },
  {
    id: 82,
    character_id: 11,
    name: "별들의 합창단 (미래시)",
    engName: "choir_of_the_stars",
    rarity: "Garment",
    source: "주크박스",
    resell: "X",
    version: "2.7"
  },
  {
    id: 83,
    character_id: 210,
    name: "우주 여행자 (미래시)",
    engName: "space_traveler",
    rarity: "Garment",
    source: "컨텐츠",
    resell: "X",
    version: "2.7"
  },
];