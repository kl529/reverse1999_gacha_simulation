export type ContentCategory = "third_door" | "outer_performance" | "episode";

export interface YoutubeVideo {
  id: string;
  title: string;
}

export interface ContentGuideItem {
  id: string;
  name: string;
  category: ContentCategory;
  versionAdded: string;
  unlockCondition: string;
  description: string;
  contentType: string;
  youtubeVideos?: YoutubeVideo[];
  hiddenEndings?: {
    name: string;
    description: string;
    youtubeVideo?: YoutubeVideo;
  }[];
  subContent?: {
    name: string;
    versionAdded: string;
    description: string;
    mechanic?: string;
    youtubeVideos?: YoutubeVideo[];
  }[];
}

export interface ContentCategoryInfo {
  id: ContentCategory;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export const CONTENT_CATEGORIES: ContentCategoryInfo[] = [
  {
    id: "third_door",
    name: "세 번째 문",
    description: "스토리 기반 퍼즐 컨텐츠",
    color: "purple",
    icon: "🚪",
  },
  {
    id: "outer_performance",
    name: "로그라이크",
    description: "로그라이크 컨텐츠",
    color: "orange",
    icon: "🎭",
  },
  {
    id: "episode",
    name: "영상",
    description: "버전별 미니게임 공략",
    color: "blue",
    icon: "🎬",
  },
];

export const contentGuideData: { [key: string]: ContentGuideItem } = {
  // ===== 세 번째 문 =====
  alephchem_testament: {
    id: "alephchem_testament",
    name: "알레프켐의 유언",
    category: "third_door",
    versionAdded: "1.4",
    unlockCondition: "메인 스토리 5장 3화 클리어",
    description: "세 번째 문의 첫 번째 퍼즐. 초기화 가능",
    contentType: "퍼즐",
    youtubeVideos: [
      { id: "LXPK8HgkS7w", title: "알레프켐의 유언 1스테이지 공략" },
      { id: "CxwyhIcq6OI", title: "알레프켐의 유언 2스테이지 공략" },
      { id: "nWK8zXglCMk", title: "알레프켐의 유언 3스테이지 공략" },
    ],
  },
  cogwheel_history: {
    id: "cogwheel_history",
    name: "톱니바퀴 역사",
    category: "third_door",
    versionAdded: "1.6",
    unlockCondition: "메인 스토리 5장 3화 클리어 + 알레프켐의 유언 클리어",
    description: "세 번째 문의 두 번째 퍼즐. 초기화 가능",
    contentType: "퍼즐",
    youtubeVideos: [
      { id: "yttcMhkm1uU", title: "톱니바퀴 역사 1스테이지 공략" },
      { id: "T97Y__KnhPQ", title: "톱니바퀴 역사 2스테이지 공략" },
      { id: "73dSNbRXJAs", title: "톱니바퀴 역사 3스테이지 공략" },
    ],
  },
  beneath_the_dust: {
    id: "beneath_the_dust",
    name: "먼지 아래",
    category: "third_door",
    versionAdded: "1.9",
    unlockCondition: "메인 스토리 5장 3화 클리어 + 톱니바퀴 역사 클리어",
    description: "세 번째 문의 세 번째 퍼즐. 초기화 가능",
    contentType: "퍼즐",
    youtubeVideos: [
      { id: "2K9oNQ6adKM", title: "먼지 아래 1스테이지 공략" },
      { id: "ZzQ6nwVaiuw", title: "먼지 아래 2스테이지 공략" },
      { id: "hJiwNcQELNY", title: "먼지 아래 3스테이지 공략" },
    ],
  },

  // ===== 외부 연기 =====
  twilight_sound: {
    id: "twilight_sound",
    name: "황혼의 소리",
    category: "outer_performance",
    versionAdded: "1.9",
    unlockCondition: "메인 스토리 3장 16화 클리어",
    description:
      "상시 로그라이크 컨텐츠. 로렐라이는 이 컨텐츠에서만 획득 가능하며, 증표를 모아 황금항에서 성장 재화와 의지를 교환합니다.",
    contentType: "외부연기",
    youtubeVideos: [
      { id: "T1VvAPmzwv8", title: "황혼의 소리 모든 것 총정리 (월상의 시 확장팩 기준, 참고용)" },
      { id: "H2IU4HjcROI", title: "황혼의 소리 초고속 파밍 방법" },
      { id: "REi7VLTIoOM", title: "황혼의 소리 촉매별 20단계 총정리" },
    ],
    hiddenEndings: [
      {
        name: "첫 번째 히든 엔딩 - 황혼의 노래",
        description:
          "① 3층 끝에서 [오래된 그릇] 아이템을 주는 NPC를 선택 (확률성 NPC, 없을 경우 초기화 후 재시작)\n② 4층 '여정의 가운데'에서 [오래된 그릇] 획득\n③ 4층 끝에서 로렐라이 선택 후 '황혼의 노래' 엔딩 진입 - 보스 처치",
      },
      {
        name: "두 번째 히든 엔딩 - 허상 포옹하기",
        description:
          "① 히든 아이템 '그루스 안 아헨' 얻기\n② 4층 엔딩 선택 시, 발렌티나 선택 후 '허상 포옹하기' 선택",
        youtubeVideo: {
          id: "H6VrKI_6GzA",
          title: "허상 포옹하기 / 거울 푸가 히든 엔딩 해금 조건",
        },
      },
      {
        name: "세 번째 히든 엔딩 - 환희의 공간",
        description:
          "① 히든 아이템 '소리나팔' 얻기\n② 4층 엔딩 선택 시, 발렌티나 선택 후 '환희의 공간' 선택",
        youtubeVideo: {
          id: "ykEwIc_cMx8",
          title: "환희의 공간 엔딩 해금 조건 및 스토리",
        },
      },
    ],
    subContent: [
      {
        name: "월상의 시",
        versionAdded: "2.1",
        description: "첫 번째 확장팩. 스트레스 기믹이 추가되어 난이도가 상승합니다.",
        mechanic: "스트레스 시스템",
        youtubeVideos: [
          { id: "clrk2h7UleU", title: "확장팩 기본 가이드" },
          { id: "D0VKKHYqNrg", title: "허상 포옹하기 보스 공략" },
        ],
      },
      {
        name: "거울 푸가",
        versionAdded: "2.4",
        description: "두 번째 확장팩. 캐릭터 전용 아이템인 '음상 피조물'이 추가됩니다.",
        mechanic: "음상 피조물 (캐릭터 전용 아이템)",
        youtubeVideos: [{ id: "JPwqNdcNqE8", title: "확장팩 공략 / 음상피조물 리뷰" }],
      },
      {
        name: "물거품 쉼표",
        versionAdded: "2.6",
        description: "세 번째 확장팩. 새로운 엔딩 '환희의 공간'이 추가됩니다.",
        youtubeVideos: [{ id: "j9j85490_00", title: "물거품쉼표 확장팩 공략" }],
      },
    ],
  },

  silence_syndrome: {
    id: "silence_syndrome",
    name: "침묵 증후군",
    category: "outer_performance",
    versionAdded: "3.2",
    unlockCondition: "메인 스토리 3장 16화 클리어",
    description: "두 번째 상시 로그라이크 컨텐츠. 황혼의 소리와는 별개의 독립된 로그라이크입니다.",
    contentType: "2차 로그라이크",
    youtubeVideos: [{ id: "WrRL58_cjyY", title: "침묵 증후군(3.2 로그라이크) 가이드" }],
  },

  // ===== 영상 (버전별 미니게임) =====
  // v1.1
  ijay: {
    id: "ijay",
    name: "이이제이",
    category: "episode",
    versionAdded: "1.1",
    unlockCondition: "1.1 이벤트",
    description:
      "멜라니아 캐릭터 스토리. 튜링 디스크, 메인투스, 크리스탈 해골 등 다양한 미니게임 포함.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [
    //   { id: "18iSvOmrYyY", title: "이이제이 평가A 모든 선택지 완벽 공략" },
    //   { id: "W-3G7JOeZwY", title: "이이제이 A : 100점 공략" },
    // ],
  },
  puppy_and_hippie: {
    id: "puppy_and_hippie",
    name: "강아지와 히피",
    category: "episode",
    versionAdded: "1.1",
    unlockCondition: "1.1 이벤트",
    description: "피클즈 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [
    //   { id: "LqUOlCVOQ2E", title: "강아지와 히피 모든 스테이지 공략" },
    //   { id: "9Wgm0l_95kQ", title: "강아지와 히피 2성 올 클리어 완벽 공략" },
    // ],
  },

  // v1.2
  beyond_old_house: {
    id: "beyond_old_house",
    name: "옛 집을 뛰어넘어",
    category: "episode",
    versionAdded: "1.2",
    unlockCondition: "1.2 이벤트",
    description: "제시카 캐릭터 스토리. 육성 시뮬레이션 미니게임으로, 다수의 엔딩 루트 존재.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [
    //   { id: "VTuv9Kn5reA", title: "옛 집을 뛰어넘어 공략" },
    //   { id: "M6d3RW6D7Ts", title: "이건 제발 공략보고 하세요 (옛 집을 뛰어넘어)" },
    //   { id: "hCgesc6IOHA", title: "옛 집을 뛰어넘어 시험 정답, 엔딩 루트 공략" },
    //   { id: "QxCxPO-l5Iw", title: "엔딩 7개 뚝딱 (옛 집을 뛰어넘어 공략, 시험 정답)" },
    // ],
  },
  old_tooth_and_trace: {
    id: "old_tooth_and_trace",
    name: "낡은 이빨과 흔적",
    category: "episode",
    versionAdded: "1.2",
    unlockCondition: "1.2 이벤트",
    description: "투스 페어리 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "hF0HruoJEcc", title: "낡은 이빨과 흔적 공략" }],
  },

  // v1.3
  valley_bell: {
    id: "valley_bell",
    name: "계곡을 울리는 방울소리",
    category: "episode",
    versionAdded: "1.3",
    unlockCondition: "1.3 이벤트",
    description: "갈기 모래 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "qyPSXi_IxNI", title: "계곡을 울리는 방울 소리 진행 방법 공략" }],
  },
  dust_and_stars: {
    id: "dust_and_stars",
    name: "먼지와 별의 경계",
    category: "episode",
    versionAdded: "1.3",
    unlockCondition: "1.3 이벤트",
    description: "갈라보나 캐릭터 스토리. 길찾기/미로 퍼즐 미니게임.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [
    //   { id: "vV1GHSMtk80", title: "먼지와 별의 경계 공략" },
    //   { id: "RuLtDBEFz7A", title: "먼지와 별의 경계 모든 스테이지 공략" },
    //   { id: "7dLVDX-201U", title: "먼지와 별의 경계 올 미션 클리어 공략" },
    // ],
  },

  // v1.4
  endless_night: {
    id: "endless_night",
    name: "끝없는 밤의 행적",
    category: "episode",
    versionAdded: "1.4",
    unlockCondition: "1.4 이벤트",
    description: "6 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [
    //   { id: "yXU0t7LkvMs", title: "Trudge in the Long Night - All Stages" },
    //   { id: "XgFLQR-t-s4", title: "Trudge in the Long Night - Full Story" },
    // ],
  },
  sand_memory: {
    id: "sand_memory",
    name: "모래알의 기억",
    category: "episode",
    versionAdded: "1.4",
    unlockCondition: "1.4 이벤트",
    description: "37 캐릭터 스토리. 수학/로직 퍼즐 미니게임.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "ZNrzyGeAzOM", title: "모래알의 기억 모든 스테이지 공략" }],
  },

  // v1.5
  reunion_of_fire: {
    id: "reunion_of_fire",
    name: "불의 재회",
    category: "episode",
    versionAdded: "1.5",
    unlockCondition: "1.5 이벤트",
    description: "스파토데아 캐릭터 스토리. 퍼즐 미니게임 포함.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [
    //   { id: "vOm8n-PqpSA", title: "불의 재회 퍼즐 모든 공략" },
    //   { id: "O74TApC5iws", title: "불의 재회 퍼즐 공략" },
    // ],
  },
  when_snow_falls: {
    id: "when_snow_falls",
    name: "눈밭 위에 녹아",
    category: "episode",
    versionAdded: "1.5",
    unlockCondition: "1.5 이벤트",
    description: "에즈라 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "TMuD2_sb6Ow", title: "눈이 떨어지면 선택지 정답 공략" }],
  },

  // v1.6
  tavern_light: {
    id: "tavern_light",
    name: "주막의 불빛",
    category: "episode",
    versionAdded: "1.6",
    unlockCondition: "1.6 이벤트",
    description: "곡랑 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "YX79qrj-qWo", title: "주막의 불빛 곡랑 캐릭터 스토리" }],
  },
  ride_the_wind: {
    id: "ride_the_wind",
    name: "바람을 타고",
    category: "episode",
    versionAdded: "1.6",
    unlockCondition: "1.6 이벤트",
    description: "갈천 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    youtubeVideos: [{ id: "4YO7ilLCeTY", title: "바람을 타고 스토리 모음" }],
  },

  // v1.7
  small_room: {
    id: "small_room",
    name: "작은 방",
    category: "episode",
    versionAdded: "1.7",
    unlockCondition: "1.7 이벤트",
    description: "이졸데 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    youtubeVideos: [{ id: "GDoYtGW0dss", title: "이졸데 개인 스토리 '작은 방' 해설" }],
  },
  lighthouse_story: {
    id: "lighthouse_story",
    name: "등대 이야기",
    category: "episode",
    versionAdded: "1.7",
    unlockCondition: "1.7 이벤트",
    description: "마커스 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "6syj0vzQt1s", title: "등대 이야기 (마커스) 스토리 풀영상" }],
  },

  // v1.8
  dawn_breaks: {
    id: "dawn_breaks",
    name: "그래도 여명은 밝는다",
    category: "episode",
    versionAdded: "1.8",
    unlockCondition: "1.8 이벤트",
    description: "빌라 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "_cu7hgCaD6w", title: "그래도 여명은 밝는다 (빌라) 캐릭터 스토리" }],
  },
  silver_knot: {
    id: "silver_knot",
    name: "은색 매듭",
    category: "episode",
    versionAdded: "1.8",
    unlockCondition: "1.8 이벤트",
    description: "윈드송 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    youtubeVideos: [{ id: "6zpAehNXgmA", title: "은색 매듭 IV 공략" }],
  },

  // v1.9
  journey_to_past: {
    id: "journey_to_past",
    name: "과거로의 여행",
    category: "episode",
    versionAdded: "1.9",
    unlockCondition: "1.9 이벤트",
    description: "루시 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "XG4S97x23-E", title: "과거로의 여행 (루시) 스토리 풀영상" }],
  },
  beyond_mirror: {
    id: "beyond_mirror",
    name: "거울 너머",
    category: "episode",
    versionAdded: "1.9",
    unlockCondition: "1.9 이벤트",
    description: "카카니아 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "jbWr9S1Y7zI", title: "거울 너머 (카카니아) 스토리 풀영상" }],
  },

  // v2.0
  sf_kids: {
    id: "sf_kids",
    name: "샌프란시스코 키즈",
    category: "episode",
    versionAdded: "2.0",
    unlockCondition: "2.0 이벤트",
    description: "J 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [
    //   { id: "T30vqKLu2XM", title: "The San Francisco Kids - Full Story" },
    //   { id: "tbWANwzSkAc", title: "The San Francisco Kids - Complete Storyline" },
    // ],
  },
  thousandth_night: {
    id: "thousandth_night",
    name: "천 번째 밤에",
    category: "episode",
    versionAdded: "2.0",
    unlockCondition: "2.0 이벤트",
    description: "머큐리아 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [
    //   { id: "9bycdsaHCrY", title: "On the Thousandth Night - Full Story" },
    //   { id: "mAGCT9iI5Mk", title: "On the Thousandth Night - Mercuria Story" },
    // ],
  },

  // v2.1
  bedtime_story: {
    id: "bedtime_story",
    name: "자기 전 이야기",
    category: "episode",
    versionAdded: "2.1",
    unlockCondition: "2.1 이벤트",
    description: "튜즈데이 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "6yD8JkCpu2g", title: "자기 전 이야기 (튜즈데이) 스토리" }],
  },
  red_wall: {
    id: "red_wall",
    name: "붉은 벽",
    category: "episode",
    versionAdded: "2.1",
    unlockCondition: "2.1 이벤트",
    description: "아르고스 캐릭터 스토리. 추리/단서 퍼즐 미니게임.",
    contentType: "캐릭터 스토리",
    youtubeVideos: [
      { id: "TgHKkRPRVss", title: "붉은 벽 퍼즐 정답" },
    ],
  },

  // v2.4
  deep_space_wave: {
    id: "deep_space_wave",
    name: "심우주파",
    category: "episode",
    versionAdded: "2.4",
    unlockCondition: "2.4 이벤트",
    description: "울리히 캐릭터 스토리. 퀴즈/퍼즐 미니게임.",
    contentType: "캐릭터 스토리",
    youtubeVideos: [
      { id: "-jxrm-6m5pw", title: "울리히 심우주파 퀴즈 정답" },
    ],
  },
  between_river_sea: {
    id: "between_river_sea",
    name: "강과 바다 사이",
    category: "episode",
    versionAdded: "2.4",
    unlockCondition: "2.4 이벤트",
    description: "바르카롤라 캐릭터 스토리.",
    contentType: "캐릭터 스토리",
    // youtubeVideos: [{ id: "9j8rqSVb1wY", title: "강과 바다 사이 (바르카롤라) 캐릭터 스토리" }],
  },
  nukutaio_paradise: {
    id: "nukutaio_paradise",
    name: "누쿠타이오의 낙원 짓기!",
    category: "episode",
    versionAdded: "2.4",
    unlockCondition: "2.4 이벤트",
    description: "파투투 캐릭터 스토리. 낙원 건설 미니게임.",
    contentType: "캐릭터 스토리",
    youtubeVideos: [{ id: "Xi9b9t_871U", title: "누쿠타이오의 낙원짓기 공략" }],
  },
};
