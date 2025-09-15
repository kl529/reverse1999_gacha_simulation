export interface ShopCurrency {
  id: string;
  name: string;
  iconPath: string;
}

export interface ShopItem {
  materialId: number;
  cost: number;
  efficiency: number | null;
  description?: string;
  isEstimate?: boolean;
  isRequired?: boolean;
  isRefresh?: boolean;
}

export interface Shop {
  id: string;
  name: string;
  currency: ShopCurrency;
  items: ShopItem[];
  description?: string;
  refreshTime?: string;
}

export const shopCurrencies: ShopCurrency[] = [
  {
    id: "cassette_of_the_lost",
    name: "비밀의 소리",
    iconPath: "/infos/currencies/cassette_of_the_lost.webp",
  },
  {
    id: "track_of_the_lost",
    name: "방황의 소리",
    iconPath: "/infos/currencies/track_of_the_lost.webp",
  },
  {
    id: "album_of_the_lost",
    name: "대용량 방황의 소리",
    iconPath: "/infos/currencies/album_of_the_lost.webp",
  },
  {
    id: "thought_element",
    name: "흩어진 그림자",
    iconPath: "/infos/currencies/thought_element.webp",
  },
  {
    id: "thoughts_in_entirety",
    name: "질서의 영상",
    iconPath: "/infos/currencies/thoughts_in_entirety.webp",
  },
  {
    id: "oneiric_fluid",
    name: "꿈속 유체",
    iconPath: "/infos/currencies/oneiric_fluid.webp",
  },
  {
    id: "bundle_of_light",
    name: "한 줄기 빛",
    iconPath: "/infos/currencies/bundle_of_light.webp",
  },
  {
    id: "solidified_myth",
    name: "생각의 침전",
    iconPath: "/infos/currencies/solidified_myth.webp",
  },
  {
    id: "event_material",
    name: "이벤트 재화",
    iconPath: "/infos/currencies/event_currency.webp",
  },
];

export const shops: Shop[] = [
  {
    id: "secret_shop",
    name: "비밀 상점",
    currency: shopCurrencies[0], // 비밀의 소리
    description:
      "한정 버전에만 나오는 상점 + 200 재화로 살 수 있는 한정 캐릭터 정가가 가장 우선됨.",
    refreshTime: "한정버전에만 오픈",
    items: [
      {
        materialId: 205, // 이빨 상자
        cost: 0,
        efficiency: 3.85,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 202, // 맨드레이크 절임
        cost: 0,
        efficiency: 3.46,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 201, // 쌍두골
        cost: 0,
        efficiency: 3.14,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 206, // 신성한 은괴
        cost: 0,
        efficiency: 3.73,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 203, // 스마트 버드
        cost: 0,
        efficiency: 3.04,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 204, // 황금 펜듈럼
        cost: 0,
        efficiency: 3.53,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 211, // 날개 열쇠
        cost: 0,
        efficiency: 3.17,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 210, // 굽은 거위 목
        cost: 0,
        efficiency: 3.36,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 207, // 사금 딱정벌레
        cost: 0,
        efficiency: 3.87,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 209, // 풀 냄새 향
        cost: 0,
        efficiency: 3.68,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 208, // 붉은 점토판
        cost: 0,
        efficiency: 3.79,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 303, //액체 전율
        cost: 0,
        efficiency: 2.65,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 302, // 고운 소금
        cost: 0,
        efficiency: 2.84,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 304, // 정체불명의 뼈
        cost: 0,
        efficiency: 2.72,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 305, // 투박한 은괴
        cost: 0,
        efficiency: 3.07,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 306, // 행운의 주문
        cost: 0,
        efficiency: 2.93,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 301, // 로마 금화
        cost: 0,
        efficiency: 2.9,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 310, // 마른 매미 날개
        cost: 0,
        efficiency: 3.18,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 309, // 멈추지 않는 바퀴
        cost: 0,
        efficiency: 2.81,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 308, // 여우 꼬리
        cost: 0,
        efficiency: 2.82,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 307, // 휘석 광석
        cost: 0,
        efficiency: 2.87,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 405, // 덜덜이빨
        cost: 0,
        efficiency: 1.7,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 404, // 암염
        cost: 0,
        efficiency: 1.02,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 403, // 부서진 뼛조각
        cost: 0,
        efficiency: 0.97,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 402, // 은광석
        cost: 0,
        efficiency: 1.43,
        description: "재화가 남고, 필요하면 구매",
      },
      {
        materialId: 401, // 청소 주문
        cost: 0,
        efficiency: 1.36,
        description: "재화가 남고, 필요하면 구매",
      },
    ],
  },
  {
    id: "bass_counter_shop",
    name: "저음 카운터 상점",
    currency: shopCurrencies[1], // 저음 카운터
    description: "방황의 소리로 구매하는 상점",
    refreshTime: "매달 1일",
    items: [
      {
        materialId: 3000, //모노로그
        cost: 60,
        efficiency: 5.0,
        description: "필수 구매 추천",
        isEstimate: true,
        isRequired: true,
      },
      {
        materialId: 2003, // 저주파 편광
        cost: 30,
        efficiency: 2.41,
        description: "필수 구매 추천",
        isEstimate: true,
        isRequired: true,
      },
      {
        materialId: 2002, // 마이크로 편광
        cost: 15,
        efficiency: 1.6,
        description: "필수 구매 추천",
        isEstimate: true,
        isRequired: true,
      },
      {
        materialId: 703, // 영감의 씨앗
        cost: 10,
        efficiency: null,
        description: "필수까진 아니지만, 미리미리 사두면 좋음 (추천)",
        isRequired: true,
      },
      {
        materialId: 4002, // 계몽 ll
        cost: 25,
        efficiency: 0.31,
        description: "구매 비추",
        isEstimate: true,
      },
      {
        materialId: 1002, // 톱니 동전
        cost: 20,
        efficiency: 0.69,
        description: "구매 비추하지만, 필요하면 낫배드",
      },
      {
        materialId: 1001, // 미세입자
        cost: 15,
        efficiency: 0.52,
        description: "구매 비추",
      },
      {
        materialId: 301, // 로마 금화
        cost: 20,
        efficiency: 0.73,
        description: "구매 비추",
      },
      {
        materialId: 303, // 액체 전율
        cost: 15,
        efficiency: 0.71,
        description: "구매 비추",
      },
      {
        materialId: 302, // 고운 소금
        cost: 15,
        efficiency: 0.57,
        description: "구매 비추",
      },
      {
        materialId: 304, // 정체불명의 뼈
        cost: 15,
        efficiency: 0.54,
        description: "구매 비추",
      },
      {
        materialId: 305, // 투박한 은괴
        cost: 15,
        efficiency: 0.41,
        description: "구매 비추",
      },
      {
        materialId: 306, // 행운의 주문
        cost: 15,
        efficiency: 0.39,
        description: "구매 비추",
      },
      {
        materialId: 310, // 마른 매미 날개
        cost: 15,
        efficiency: 0.64,
        description: "구매 비추",
      },
      {
        materialId: 309, // 멊추지 않는 바퀴
        cost: 15,
        efficiency: 0.75,
        description: "구매 비추",
      },
      {
        materialId: 308, // 여우 꼬리
        cost: 15,
        efficiency: 0.75,
        description: "구매 비추",
      },
      {
        materialId: 307, // 휘석 원석
        cost: 15,
        efficiency: 0.57,
        description: "구매 비추",
      },
      {
        materialId: 405, // 덜덜이빨
        cost: 8,
        efficiency: 0.85,
        description: "구매 비추",
      },
      {
        materialId: 404, // 암염
        cost: 8,
        efficiency: 0.51,
        description: "구매 비추",
      },
      {
        materialId: 403, // 부서진 뼛조각
        cost: 8,
        efficiency: 0.48,
        description: "구매 비추",
      },
      {
        materialId: 402, // 은광석
        cost: 8,
        efficiency: 0.36,
        description: "구매 비추",
      },
      {
        materialId: 401, // 청소 주문
        cost: 8,
        efficiency: 0.34,
        description: "구매 비추",
      },
    ],
  },
  {
    id: "treble_counter_shop",
    name: "고음 카운터 상점",
    currency: shopCurrencies[2], // 고음 카운터
    description: "대용량 방황의 소리로 구매하는 상점",
    refreshTime: "X",
    items: [
      {
        materialId: 3000, //모노로그
        cost: 10,
        efficiency: 30,
        description: "6성 정가를 하지 않을거면 구매 추천",
        isEstimate: true,
      },
      {
        materialId: 2004, //고주파 편광
        cost: 5,
        efficiency: 43.48,
        description: "나쁘지 않은 효율이라 구매 추천",
        isEstimate: true,
        isRequired: true,
      },
      {
        materialId: 602, // 순간의 소란
        cost: 4,
        efficiency: 23.44,
        description: "공명시 부족하면 구매 추천",
        isEstimate: true,
      },
      {
        materialId: 603, // 아득한 울림
        cost: 12,
        efficiency: 23.51,
        description: "공명시 부족하면 구매 추천",
      },
      {
        materialId: 604, // 포효의 포위
        cost: 30,
        efficiency: 56.42,
        description: "공명시 필요하면 살만하지만, 추천하진 않음.",
      },
      {
        materialId: 605, // 뒤섞인 전율
        cost: 30,
        efficiency: 56.42,
        description: "공명시 필요하면 살만하지만, 추천하진 않음.",
      },
      {
        materialId: 606, // 거짓 잠꼬대
        cost: 30,
        efficiency: 56.42,
        description: "공명시 필요하면 살만하지만, 추천하진 않음.",
      },
      {
        materialId: 607, // 갈라진 메아리
        cost: 30,
        efficiency: 56.42,
        description: "공명시 필요하면 살만하지만, 추천하진 않음.",
      },
      {
        materialId: 104, // 침대 밑 괴물
        cost: 30,
        efficiency: 6.51,
        description: "필요하면 구매",
      },
      {
        materialId: 105, // 썩지 않는 원숭이 손
        cost: 30,
        efficiency: 5.6,
        description: "필요하면 구매",
      },
      {
        materialId: 103, // 유룡의 뼈 표본
        cost: 30,
        efficiency: 5.75,
        description: "필요하면 구매",
      },
      {
        materialId: 106, // 은빛 탄환
        cost: 30,
        efficiency: 5.23,
        description: "필요하면 구매",
      },
      {
        materialId: 101, // 미치광이 헛소리
        cost: 30,
        efficiency: 4.78,
        description: "필요하면 구매",
      },
      {
        materialId: 102, // 백금 점괘판
        cost: 30,
        efficiency: 6.85,
        description: "필요하면 구매",
      },
      {
        materialId: 111, // 희미한 나방 날개등
        cost: 30,
        efficiency: 6.15,
        description: "필요하면 구매",
      },
      {
        materialId: 110, // 바퀴와 축의 심
        cost: 30,
        efficiency: 6.36,
        description: "필요하면 구매",
      },
      {
        materialId: 107, // 적금 나침반
        cost: 40,
        efficiency: 5.5,
        description: "필요하면 구매",
      },
      {
        materialId: 109, // 금종 영혼의 병
        cost: 30,
        efficiency: 6.92,
        description: "필요하면 구매",
      },
      {
        materialId: 108, // 비취 석판
        cost: 30,
        efficiency: 6.37,
        description: "필요하면 구매",
      },
      {
        materialId: 202, // 맨드레이크 절임
        cost: 8,
        efficiency: 5.76,
        description: "필요하면 구매",
      },
      {
        materialId: 201, // 쌍두골
        cost: 6,
        efficiency: 5.24,
        description: "필요하면 구매",
      },
      {
        materialId: 206, // 신성한 은괴
        cost: 6,
        efficiency: 4.97,
        description: "필요하면 구매",
      },
      {
        materialId: 203, // 스마트 버드
        cost: 6,
        efficiency: 4.05,
        description: "필요하면 구매",
      },
      {
        materialId: 204, // 황금 펜듈럼
        cost: 8,
        efficiency: 5.3,
        description: "필요하면 구매",
      },
      {
        materialId: 211, // 날개 열쇠
        cost: 6,
        efficiency: 6.33,
        description: "필요하면 구매",
      },
      {
        materialId: 210, // 굽은 거위 목
        cost: 8,
        efficiency: 5.05,
        description: "필요하면 구매",
      },
      {
        materialId: 207, // 사금 딱정벌레
        cost: 8,
        efficiency: 5.8,
        description: "필요하면 구매",
      },
      {
        materialId: 209, // 풀 냄새 향
        cost: 6,
        efficiency: 7.36,
        description: "필요하면 구매",
      },
      {
        materialId: 208, // 붉은 점토판
        cost: 6,
        efficiency: 6.32,
        description: "필요하면 구매",
      },
    ],
  },
  {
    id: "psycube_shop",
    name: "의지 관측 상점",
    currency: shopCurrencies[3], // 의지 관측
    description: "흩어진 그림자로 구매하는 상점",
    refreshTime: "매달 1일",
    items: [
      {
        materialId: 2002, // 마이크로 편광
        cost: 8,
        efficiency: 3.0,
        isEstimate: true,
        isRequired: true,
        description: "필수 구매 추천",
      },
      {
        materialId: 4002, // 계몽 ll
        cost: 8,
        efficiency: 0.49,
        isEstimate: true,
        description: "5성 의지 필요한 것들을 모두 구매 후 구매 추천",
      },
      {
        materialId: 4003, // 계몽 l
        cost: 4,
        efficiency: 0.39,
        isEstimate: true,
        description: "5성 의지 필요한 것들을 모두 구매 후 구매 추천",
      },
    ],
  },
  {
    id: "oneiric_shop",
    name: "꿈의 기록 상점",
    currency: shopCurrencies[5], // 꿈의 기록
    description: "꿈속 유체으로 구매하는 상점",
    refreshTime: "매달 1일",
    items: [
      {
        materialId: 608, //공명의 상자
        cost: 1500,
        efficiency: 1.13,
        description: "필요시 구매",
        isEstimate: true,
      },
      {
        materialId: 602, //순간의 소란
        cost: 60,
        efficiency: 1.56,
        description: "40% 할인 제품 무조건 구매",
        isEstimate: true,
        isRequired: true,
      },
      {
        materialId: 602, //순간의 소란
        cost: 100,
        efficiency: 0.94,
        description: "공명시 자주 쓰이니 구매 추천",
        isEstimate: true,
        isRequired: true,
      },
      {
        materialId: 601, //순간의 움직임
        cost: 24,
        efficiency: 0.97,
        description: "공명 재료인데, 40% 할인이라 구매추천",
        isEstimate: true,
        isRequired: true,
      },
      {
        materialId: 601, //순간의 움직임
        cost: 40,
        efficiency: 0.58,
        description: "필요시 구매",
        isEstimate: true,
      },
      {
        materialId: 603, // 아득한 울림
        cost: 150,
        efficiency: 1.88,
        description: "15공명 지향하면, 우선 구매 추천",
        isEstimate: true,
        isRequired: true,
      },
      {
        materialId: 603, // 아득한 울림
        cost: 250,
        efficiency: 1.13,
        description: "15공명 지향하면, 우선 구매 추천",
        isEstimate: true,
      },
      {
        materialId: 303, // 액체 전율
        cost: 100,
        efficiency: 0.11,
        description: "필요시 구매",
      },
      {
        materialId: 302, // 고운 소금
        cost: 100,
        efficiency: 0.09,
        description: "필요시 구매",
      },
      {
        materialId: 304, // 정체불명의 뼈
        cost: 100,
        efficiency: 0.08,
        description: "필요시 구매",
      },
      {
        materialId: 305, // 투박한 은괴
        cost: 100,
        efficiency: 0.06,
        description: "필요시 구매",
      },
      {
        materialId: 306, // 행운의 주문
        cost: 100,
        efficiency: 0.06,
        description: "필요시 구매",
      },
      {
        materialId: 308, // 여우 꼬리
        cost: 100,
        efficiency: 0.11,
        description: "필요시 구매",
      },
    ],
  },
  {
    id: "nostalgia_shop",
    name: "보관 영상 상점",
    currency: shopCurrencies[6], // 보관 영상
    description: "'한 줄기 빛'으로 구매하는 상점",
    refreshTime: "X",
    items: [
      {
        materialId: 104, // 침대 밑 괴물
        cost: 300,
        efficiency: 0.65,
        description: "필요하면 구매",
      },
      {
        materialId: 105, // 썩지 않는 원숭이 손
        cost: 300,
        efficiency: 0.56,
        description: "필요하면 구매",
      },
      {
        materialId: 103, // 유룡의 뼈 표본
        cost: 100,
        efficiency: 0.58,
        description: "필요하면 구매",
      },
      {
        materialId: 106, // 은빛 탄환
        cost: 300,
        efficiency: 0.63,
        description: "필요하면 구매",
      },
      {
        materialId: 101, // 미치광이 헛소리
        cost: 300,
        efficiency: 0.57,
        description: "필요하면 구매",
      },
      {
        materialId: 102, // 백금 점괘판
        cost: 300,
        efficiency: 0.59,
        description: "필요하면 구매",
      },
      {
        materialId: 111, // 희미한 나방 날개등
        cost: 300,
        efficiency: 0.62,
        description: "필요하면 구매",
      },
      {
        materialId: 110, // 바퀴와 축의 심
        cost: 350,
        efficiency: 0.55,
        description: "필요하면 구매",
      },
      {
        materialId: 107, // 적금 나침반
        cost: 400,
        efficiency: 0.55,
        description: "필요하면 구매",
      },
      {
        materialId: 109, // 금종 영혼의 병
        cost: 350,
        efficiency: 0.59,
        description: "필요하면 구매",
      },
      {
        materialId: 108, // 비취 석판
        cost: 300,
        efficiency: 0.55,
        description: "필요하면 구매",
      },
      {
        materialId: 205, // 이빨 상자
        cost: 70,
        efficiency: 0.55,
        description: "필요하면 구매",
      },
      {
        materialId: 202, // 맨드레이크 절임
        cost: 70,
        efficiency: 0.49,
        description: "필요하면 구매",
      },
      {
        materialId: 201, // 쌍두골
        cost: 70,
        efficiency: 0.45,
        description: "필요하면 구매",
      },
      {
        materialId: 206, // 신성한 은괴
        cost: 50,
        efficiency: 0.6,
        description: "필요하면 구매",
      },
      {
        materialId: 203, // 스마트 버드
        cost: 50,
        efficiency: 0.49,
        description: "필요하면 구매",
      },
      {
        materialId: 204, // 황금 펜듈럼
        cost: 100,
        efficiency: 0.42,
        description: "필요하면 구매",
      },
      {
        materialId: 211, // 날개 열쇠
        cost: 70,
        efficiency: 0.54,
        description: "필요하면 구매",
      },
      {
        materialId: 210, // 굽은 거위 목
        cost: 100,
        efficiency: 0.4,
        description: "필요하면 구매",
      },
      {
        materialId: 207, // 사금 딱정벌레
        cost: 110,
        efficiency: 0.42,
        description: "필요하면 구매",
      },
      {
        materialId: 209, //풀 냄새 향
        cost: 100,
        efficiency: 0.44,
        description: "필요하면 구매",
      },
      {
        materialId: 208, //붉은 점토판
        cost: 70,
        efficiency: 0.38,
        description: "필요하면 구매",
      },
      {
        materialId: 1002, // 톱니 동전
        cost: 60,
        efficiency: 0.28,
        description: "필요하면 구매",
      },
      {
        materialId: 1001, // 미세입자
        cost: 40,
        efficiency: 0.29,
        description: "필요하면 구매",
      },
      {
        materialId: 2003, // 저주파 편광
        cost: 120,
        efficiency: 0.6,
        isEstimate: true,
        isRequired: true,
        description: "구매 추천",
      },
      {
        materialId: 2002, // 마이크로 편광
        cost: 80,
        efficiency: 0.3,
        isEstimate: true,
        isRequired: true,
        description: "구매 추천",
      },
      {
        materialId: 602, // 순간의 소란
        cost: 350,
        efficiency: 0.27,
        isEstimate: true,
        description: "공명하는데 부족하면 구매해도 좋음",
      },
      {
        materialId: 601, // 순간의 움직임
        cost: 100,
        efficiency: 0.23,
        isEstimate: true,
        description: "필요하면 구매",
      },
    ],
  },
  {
    id: "harbor_of_echoes",
    name: "메아리 항구",
    currency: shopCurrencies[7], // 꿈의 기록
    description: "한 줄기 빛으로 구매하는 상점",
    refreshTime: "4주마다 1회",
    items: [
      {
        materialId: 701, // 생각의 열쇠
        cost: 400,
        efficiency: null,
        description: "부족하면 구매 추천",
        isRefresh: true,
        isRequired: true,
      },
      {
        materialId: 702, // 구상의 새싹
        cost: 40,
        efficiency: null,
        description: "부족하면 구매 추천",
        isRefresh: true,
      },
      {
        materialId: 703, // 영감의 씨앗
        cost: 30,
        efficiency: null,
        description: "꾸준히 구매 추천. 광상시 제일 부족함",
        isRefresh: true,
        isRequired: true,
      },
      {
        materialId: 1002, // 톱니 동전
        cost: 20,
        efficiency: null,
        description: "꾸준히 구매 추천. 그냥 무난한 효율.",
        isRefresh: true,
        isRequired: true,
      },
      {
        materialId: 1001, // 미세입자
        cost: 20,
        efficiency: null,
        description: "꾸준히 구매 추천. 그냥 무난한 효율.",
        isRefresh: true,
        isRequired: true,
      },
      //
      {
        materialId: 205, // 이빨 상자
        cost: 300,
        efficiency: 0.13,
        description: "필요하면 구매",
      },
      {
        materialId: 202, // 맨드레이크 절임
        cost: 300,
        efficiency: 0.12,
        description: "필요하면 구매",
      },
      {
        materialId: 201, // 쌍두골
        cost: 300,
        efficiency: 0.1,
        description: "필요하면 구매",
      },
      {
        materialId: 206, // 신성한 은괴
        cost: 300,
        efficiency: 0.1,
        description: "필요하면 구매",
      },
      {
        materialId: 203, // 스마트 버드
        cost: 300,
        efficiency: 0.08,
        description: "필요하면 구매",
      },
      {
        materialId: 204, // 황금 펜듈럼
        cost: 300,
        efficiency: 0.14,
        description: "필요하면 구매",
      },
      {
        materialId: 211, // 날개 열쇠
        cost: 300,
        efficiency: 0.13,
        description: "필요하면 구매",
      },
      {
        materialId: 210, // 굽은 거위 목
        cost: 300,
        efficiency: 0.13,
        description: "필요하면 구매",
      },
      {
        materialId: 207, // 사금 딱정벌레
        cost: 400,
        efficiency: 0.12,
        description: "필요하면 구매",
      },
      {
        materialId: 209, // 풀 냄새 향
        cost: 300,
        efficiency: 0.135,
        description: "필요하면 구매",
      },
      {
        materialId: 208, // 붉은 점토판
        cost: 300,
        efficiency: 0.13,
        description: "필요하면 구매",
      },
      {
        materialId: 303, //액체 전율
        cost: 100,
        efficiency: 0.11,
        description: "필요하면 구매",
      },
      {
        materialId: 302, // 고운 소금
        cost: 150,
        efficiency: 0.09,
        description: "필요하면 구매",
      },
      {
        materialId: 304, // 정체불명의 뼈
        cost: 100,
        efficiency: 0.08,
        description: "필요하면 구매",
      },
      {
        materialId: 305, // 투박한 은괴
        cost: 100,
        efficiency: 0.06,
        description: "필요하면 구매",
      },
      {
        materialId: 306, // 행운의 주문
        cost: 100,
        efficiency: 0.06,
        description: "필요하면 구매",
      },
      {
        materialId: 301, // 로마 금화
        cost: 150,
        efficiency: 0.1,
        description: "필요하면 구매",
      },
      {
        materialId: 310, // 마른 매미 날개
        cost: 100,
        efficiency: 0.1,
        description: "필요하면 구매",
      },
      {
        materialId: 309, // 멈추지 않는 바퀴
        cost: 100,
        efficiency: 0.11,
        description: "필요하면 구매",
      },
      {
        materialId: 308, // 여우 꼬리
        cost: 100,
        efficiency: 0.11,
        description: "필요하면 구매",
      },
      {
        materialId: 307, // 휘석 광석
        cost: 100,
        efficiency: 0.09,
        description: "필요하면 구매",
      },
      {
        materialId: 1002, //톱니 동전
        cost: 100,
        efficiency: 0.14,
        description: "필요하면 구매",
      },
      {
        materialId: 1001, // 미세입자
        cost: 80,
        efficiency: 0.12,
        description: "필요하면 구매",
      },
    ],
  },
  {
    id: "event_shop",
    name: "이벤트 상점",
    currency: shopCurrencies[8], // 이벤트 재화
    description: "버젼마다 바뀌는 이벤트 상점. 비싼 상품들부터 사는 것을 추천함.",
    refreshTime: "버전별 1회",
    items: [
      {
        materialId: 1, // 6성재화
        cost: 0,
        efficiency: null,
        description: "1 순위로 구매 추천. 그냥 전반적인 6성 재료를 뜻함",
        isRequired: true,
      },
      {
        materialId: 102, // 5성 재화
        cost: 0,
        efficiency: null,
        description: "2 순위로 구매 추천. 그냥 전반적인 5성 재료를 뜻함",
        isRequired: true,
      },
      {
        materialId: 201, // 4성 재화
        cost: 0,
        efficiency: null,
        description: "3 순위로 구매 추천. 그냥 전반적인 4성 재료를 뜻함",
      },
      {
        materialId: 301, // 3성 재화
        cost: 0,
        efficiency: null,
        description: "4 순위로 구매 추천. 그냥 전반적인 3성 재료를 뜻함",
      },
      {
        materialId: 401, // 2성 재화
        cost: 0,
        efficiency: null,
        description: "5 순위로 구매 추천. 그냥 전반적인 2성 재료를 뜻함",
      },
    ],
  },
];
