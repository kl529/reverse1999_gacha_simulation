export interface Enemy {
  id: string;
  name: string;
  type?: "boss";
  stage?: number;
  inspiration?: string;
  skills?: {
    name: string;
    description: string;
  }[];
  stats?: {
    hp: number;
    atk: number;
    def: number;
    res: number;
  };
}

interface ClearedCharacter {
  character_id: number;
  euphoria?: boolean;
  psycube_id: number;
}

interface RecommendedTeam {
  characters: ClearedCharacter[];
  description: string;
  blueprint?: string;
  player_name?: string;
}

export interface FloorData {
  id: string;
  floor_type: string;
  description?: string;
  wholeEffect?: string[];
  enemyEffect?: string[];
  teamEffect?: string[];
  enemies: Enemy[];
  strategy: {
    overview: string;
    details: string[];
  };
  recommendedTeams?: RecommendedTeam[];
}

export const reveriesInTheRain: { [key: string]: FloorData } = {
  "10m": {
    id: "10m",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["현실 방어 및 정신 방어 +5%"],
    enemies: [
      {
        id: "enemy_10m_1",
        name: "카벙클",
        inspiration: "spirit",
      },
      {
        id: "enemy_10m_2",
        name: "카벙클",
        inspiration: "spirit",
      },
      {
        id: "enemy_10m_3",
        name: "카벙클",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "매우 쉬운 스테이지",
      details: [
        "3통찰한 딜러만 넣어줘도 문제없이 클리어 가능",
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능",
        "본인 조합에 맞는 보스의 청사진 들고가기",
      ],
    },
    recommendedTeams: [],
  },
  "20m": {
    id: "20m",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["현실 방어 및 정신 방어 +10%"],
    enemies: [
      {
        id: "enemy_20m_1",
        name: "오렌지 크리터 무리",
        inspiration: "beast",
      },
      {
        id: "enemy_20m_2",
        name: "오렌지 크리터",
        inspiration: "star",
      },
      {
        id: "enemy_20m_3",
        name: "오렌지 크리터",
        inspiration: "star",
      },
    ],
    strategy: {
      overview: "매우 쉬운 스테이지",
      details: [
        "3통찰한 딜러만 넣어줘도 문제없이 클리어 가능",
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능",
        "본인 조합에 맞는 보스의 청사진 들고가기",
      ],
    },
    recommendedTeams: [],
  },
  "30m": {
    id: "30m",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["피해 회복 +5%"],
    enemies: [
      {
        id: "enemy_30m_1",
        name: "선인장 크리터 무리",
        inspiration: "plant",
      },
      {
        id: "enemy_30m_2",
        name: "선인장 크리터",
        inspiration: "plant",
      },
      {
        id: "enemy_30m_3",
        name: "선인장 크리터",
        inspiration: "plant",
      },
    ],
    strategy: {
      overview: "매우 쉬운 스테이지",
      details: [
        "3통찰한 딜러만 넣어줘도 문제없이 클리어 가능",
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능",
        "본인 조합에 맞는 보스의 청사진 들고가기",
      ],
    },
    recommendedTeams: [],
  },
  "40m": {
    id: "40m",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["전투 진입 시 및 3턴 시작 시마다 자신의 열정 +1"],
    enemies: [
      {
        id: "enemy_40m_1",
        type: "boss",
        name: "카벙클의 왕",
        inspiration: "spirit",
      },
      {
        id: "enemy_40m_2",
        name: "오렌지 크리터 무리",
        inspiration: "beast",
      },
      {
        id: "enemy_40m_3",
        name: "선인장 크리터 무리",
        inspiration: "plant",
      },
    ],
    strategy: {
      overview: "매우 쉬운 스테이지",
      details: [
        "3통찰한 딜러만 넣어줘도 문제없이 클리어 가능",
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능",
        "본인 조합에 맞는 보스의 청사진 들고가기",
      ],
    },
    recommendedTeams: [],
  },
  "50m": {
    id: "50m",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    teamEffect: [
      "은행 자본가가 공격받을 시 참새 금화 5개를 강탈당합니다. 충분한 수량의 참새 금화를 빼앗아도 승리할 수 있습니다.",
    ],
    enemies: [
      {
        id: "enemy_50m_1",
        name: "교대 경비병",
        inspiration: "plant",
      },
      {
        id: "enemy_50m_2",
        name: "진압 경찰",
        inspiration: "plant",
      },
      {
        id: "enemy_50m_3",
        type: "boss",
        name: "은행자본가",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "매우 쉬운 스테이지",
      details: [
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능",
        "꼭 보스를 죽이지 않아도, 참새금화를 140이하로 맞추면, 클리어 가능",
        "보스를 계속해서 공격헤 참새금화를 강탈해서 클리어 하는게 쉬움",
      ],
    },
    recommendedTeams: [],
  },
  "60m": {
    id: "60m",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["마법 위력 +20%"],
    enemies: [
      {
        id: "enemy_60m_1",
        name: "탐욕스러운 굶주린 늑대",
        inspiration: "spirit",
      },
      {
        id: "enemy_60m_2",
        name: "교활한 굶주린 늑대",
        inspiration: "star",
      },
      {
        id: "enemy_60m_3",
        name: "포악한 굶주린 늑대",
        inspiration: "plant",
      },
    ],
    strategy: {
      overview: "매우 쉬운 스테이지",
      details: [
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능",
        "체력이 일정 이하떨어지면, 자가버프를 걸어 더 강해지므로, 유의",
      ],
    },
    recommendedTeams: [],
  },
  "70m": {
    id: "70m",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["공격 +10%"],
    enemies: [
      {
        id: "enemy_70m_1",
        name: "쥐 떼",
        inspiration: "mineral",
      },
      {
        id: "enemy_70m_2",
        name: "변이 쥐 떼",
        inspiration: "beast",
      },
      {
        id: "enemy_70m_3",
        name: "쥐 떼",
        inspiration: "mineral",
      },
      {
        id: "enemy_70m_4",
        name: "변이 쥐 떼",
        inspiration: "beast",
      },
      {
        id: "enemy_70m_5",
        name: "쥐 떼",
        inspiration: "mineral",
      },
      {
        id: "enemy_70m_6",
        name: "변이 쥐 떼",
        inspiration: "beast",
      },
    ],
    strategy: {
      overview: "중독을 조심",
      details: [
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능",
        "적에게 맞으면, 중독이 걸리고 꽤나 딜이 아프게 들어오니, 정화 캐릭터 있다면 추천",
        "중독만 조심하면서 플레이하면 무난함",
      ],
    },
    recommendedTeams: [],
  },
  "80m": {
    id: "80m",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    teamEffect: ["받는 치료 효과-15%"],
    enemies: [
      {
        id: "enemy_80m_1",
        name: "샤미르 애벌레",
        inspiration: "mineral",
      },
      {
        id: "enemy_80m_2",
        name: "샤미르 유충",
        inspiration: "mineral",
      },
      {
        id: "enemy_80m_3",
        name: "샤미르 애벌레",
        inspiration: "mineral",
      },
      {
        id: "enemy_80m_4",
        name: "샤미르 애벌레",
        inspiration: "mineral",
      },
      {
        id: "enemy_80m_5",
        name: "샤미르 유충",
        inspiration: "mineral",
      },
      {
        id: "enemy_80m_6",
        name: "샤미르 애벌레",
        inspiration: "mineral",
      },
      {
        id: "enemy_80m_7",
        name: "샤미르 애벌레",
        inspiration: "mineral",
      },
      {
        id: "enemy_80m_8",
        name: "샤미르 유충",
        inspiration: "mineral",
      },
      {
        id: "enemy_80m_9",
        name: "샤미르 애벌레",
        inspiration: "mineral",
      },
    ],
    strategy: {
      overview: "매우 쉬운 스테이지",
      details: [
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능",
        "특별한 기믹없이, 무난하게 클리어 가능",
      ],
    },
    recommendedTeams: [],
  },
  "90m": {
    id: "90m",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["단일 공격으로 받는 피해는 자신의 최대 HP의 30%보다 높지 않음"],
    enemies: [
      {
        id: "enemy_90m_1",
        type: "boss",
        name: "동굴 수호자",
        inspiration: "beast",
      },
      {
        id: "enemy_90m_2",
        type: "boss",
        name: "동굴 수호자",
        inspiration: "beast",
      },
    ],
    strategy: {
      overview: "악몽상태일때는 조심하며, 연소 스택 관리",
      details: [
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능",
        "보스가 악몽상태일때는 공격하지 않도록 조심 (보스가 번갈아가며 악몽상태로 진입함)",
        "아군에게 연소 스택이 많으면, 적이 회복을 많이 하므로 정화 캐릭터가 있으면 추천",
        "연소는 매턴 끝날때마다 절반이 되는 것을 참고",
      ],
    },
    recommendedTeams: [],
  },
  "100m-1": {
    id: "100m-1",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: [
      "퇴장 시 다른 아군 열정 +1, 최대 HP +5% 회복",
      "현실 방어 +20%",
      "3턴 시작 시마다 모든 아군의 [속성 감소] [제어 상태] 정화",
    ],
    enemies: [
      {
        id: "enemy_100m_1_1",
        name: "오리티우",
        inspiration: "mineral",
      },
      {
        id: "enemy_100m_1_2",
        name: "오리티우",
        inspiration: "mineral",
      },
      {
        id: "enemy_100m_1_3",
        name: "오리티우",
        inspiration: "mineral",
      },
    ],
    strategy: {
      overview: "단일 피해 증가, 광역 피해 감소",
      details: [
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능하지만, 유리한 속성으로 맞춰가면 더 좋음",
        "단일 피해 증가 효과를 잘 활용해야하며, 광역 공격시 빙결에 걸릴 수 있으니 주의 (정화 캐릭터 추천)",
        "최종술식 이후 진화하니까 조심해야함",
      ],
    },
    recommendedTeams: [],
  },
  "100m-2": {
    id: "100m-2",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: [
      "퇴장 시 랜덤 아군이 [필사의 몸부림] 획득, 1턴간 지속.",
      "현실 방어 및 정신 방어 +10%",
      "단일 공격으로 인한 받는 피해는 자신의 최대 HP의 30%보다 높지 않음.",
    ],
    enemies: [
      {
        id: "enemy_100m_2_1",
        name: "아브락사스",
        inspiration: "plant",
      },
      {
        id: "enemy_100m_2_2",
        name: "아브락사스",
        inspiration: "plant",
      },
      {
        id: "enemy_100m_2_3",
        name: "아브락사스",
        inspiration: "plant",
      },
    ],
    strategy: {
      overview: "광역 피해 증가, 단일 피해 감소",
      details: [
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능하지만, 유리한 속성으로 맞춰가면 더 좋음",
        "100-1과 반대로 단일 공격이 아닌 광역 공격으로 공격해야함 (단일 공격시 중독에 걸릴 수 있으니 주의)",
        "최종술식 이후 진화하니까 조심해야함",
      ],
    },
    recommendedTeams: [],
  },
  "100m-3": {
    id: "100m-3",
    floor_type: "유광층",
    wholeEffect: [
      "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["퇴장 시 모든 아군이 잃은 HP의 +25% 회복.", "정신 방어 +20%"],
    teamEffect: ["첫 턴 및 3턴 시작 시마다 모든 주문이 [동요] 효과로 변경."],
    enemies: [
      {
        id: "enemy_100m_3_1",
        name: "촉야",
        inspiration: "star",
      },
      {
        id: "enemy_100m_3_2",
        name: "촉야",
        inspiration: "star",
      },
      {
        id: "enemy_100m_3_3",
        name: "촉야",
        inspiration: "star",
      },
    ],
    strategy: {
      overview: "1단계 주문으로 피격시 적군이 버프 획득",
      details: [
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능하지만, 유리한 속성으로 맞춰가면 더 좋음",
        "최대한 2/3단계 주문을 사용하는게 좋음. 주문강화 캐릭터가 있으면 좋지만, 없어도 괜찮음",
        "최종술식 이후 진화하니까 조심해야함",
      ],
    },
    recommendedTeams: [],
  },
  "110m": {
    id: "110m",
    floor_type: "약광층",
    wholeEffect: [
      "상성 피해 계수 20% 증가. 비상성 공격을 받을 시 최종 피해 면역 10% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    teamEffect: ["3턴 시마다 열정이 5보다 낮은 캐릭터 열정 -1"],
    enemies: [
      {
        id: "enemy_110m_1",
        name: "남성 신도",
        inspiration: "mineral",
      },
      {
        id: "enemy_110m_2",
        name: "여성 신도",
        inspiration: "star",
      },
      {
        id: "enemy_110m_3",
        name: "여성 신도",
        inspiration: "star",
      },
    ],
    strategy: {
      overview: "별다른 기믹 없이 쉬운 스테이지",
      details: [
        "어떤 조합이던지, 적당히 육성만 되어 있으면 클리어 가능",
        "적 특성으로, 4턴에 최종술식을 모두 시전하니 조심하면 됨",
      ],
    },
    recommendedTeams: [],
  },
  "120m": {
    id: "120m",
    floor_type: "약광층",
    wholeEffect: [
      "상성 피해 계수 20% 증가. 비상성 공격을 받을 시 최종 피해 면역 10% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["전투 진입 시 [버티기] 1스택 획득."],
    enemies: [
      {
        id: "enemy_120m_1",
        name: "모색의 수",
        inspiration: "star",
      },
      {
        id: "enemy_120m_2",
        name: "유지의 수",
        inspiration: "intellect",
      },
      {
        id: "enemy_120m_3",
        name: "아래로 가는 길",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "일점사로 한명 먼저 정리하기",
      details: [
        "37, 6 둘 중 한명만 일점사해서 정리하는 것을 추천.",
        "표지판은 37, 6이 있으면 계속 생성되니 무시할 것",
        "37, 6의 스킬이 특별한게 없어서, 별다른 기믹은 없음",
      ],
    },
    recommendedTeams: [],
  },
  "130m": {
    id: "130m",
    floor_type: "약광층",
    wholeEffect: [
      "상성 피해 계수 20% 증가. 비상성 공격을 받을 시 최종 피해 면역 10% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    teamEffect: ["첫 턴 및 3턴 시작 시마다 랜덤 캐릭터 1명에게 1턴간 [무장 해제] 상태 부여."],
    enemies: [
      {
        id: "enemy_130m_1",
        type: "boss",
        name: "집회의 여황",
        inspiration: "plant",
      },
      {
        id: "enemy_130m_2",
        name: "사인 사진·미소",
        inspiration: "spirit",
      },
      {
        id: "enemy_130m_3",
        name: "사인 사진·손 키스",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "보스만 일점사하고, 어렵지 않은 스테이지",
      details: [
        "무장 해제 상태가 거슬린다면, 정화캐 사용 추천",
        "마릴린을 공격할 수록 아군이 가하는 피해가 점점 감소하는 것을 참고",
        "팀이 딜을 못버티지 않는 이상, 보스(마릴린)만 일점사하는 것을 추천",
      ],
    },
    recommendedTeams: [],
  },
  "140m": {
    id: "140m",
    floor_type: "약광층",
    wholeEffect: [
      "상성 피해 계수 20% 증가. 비상성 공격을 받을 시 최종 피해 면역 10% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["퇴장 시 모든 적군 열정 -2, 1턴간 [심란] 상태 부여"],
    enemies: [
      {
        id: "enemy_140m_1",
        name: "야수파 예술품",
        inspiration: "spirit",
      },
      {
        id: "enemy_140m_2",
        name: "추상파 예술품",
        inspiration: "spirit",
      },
      {
        id: "enemy_140m_3",
        name: "인상파 예술품",
        inspiration: "spirit",
      },
      {
        id: "enemy_140m_4",
        type: "boss",
        name: "예술품 수집가",
        inspiration: "plant",
      },
    ],
    strategy: {
      overview: "크게 어렵지 않고, 무난하게 클리어 가능",
      details: [
        "디거스의 딜이 높지 않아서, 디거스를 일점사하는 것을 추천",
        "잘 키운 캐릭터들을 조합하면 클리어 가능",
      ],
    },
    recommendedTeams: [],
  },
  "150m": {
    id: "150m",
    floor_type: "약광층",
    wholeEffect: [],
    enemyEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
      "공격, 현실 방어 및 정신 방어 +5%",
    ],
    teamEffect: [
      "최종 술식 시전 후 2턴간 [심란] 상태 부여",
      "턴 시작 시 모든 아군이 [느릿느릿] 획득",
    ],
    enemies: [
      {
        id: "enemy_150m_1",
        name: "쉴드 컨시어지",
        inspiration: "mineral",
      },
      {
        id: "enemy_150m_2",
        name: "컨시어지",
        inspiration: "beast",
      },
      {
        id: "enemy_150m_3",
        name: "에티켓",
        inspiration: "star",
      },
      {
        id: "enemy_150m_4",
        type: "boss",
        name: "포겟미낫",
        inspiration: "spirit",
      },
      {
        id: "enemy_150m_5",
        name: "스태프 에티켓",
        inspiration: "plant",
      },
      {
        id: "enemy_150m_6",
        name: "트윈 재블린 에티켓",
        inspiration: "intellect",
      },
      {
        id: "enemy_150m_7",
        name: "애도하는 컨시어지",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "포겟미낫의 최종술식만 안 맞으면 할만함",
      details: [
        "단일 딜이 충분하다면 포겟미낫을 일점사하는 것을 추천",
        "단일 딜이 부족하다면 쫄몹들을 먼저 잡으면서, 포겟미낫이 술식을 사용하려고 할 때마다 남은 쫄을 잡아 술식을 차단하는 것을 추천",
      ],
    },
    recommendedTeams: [],
  },
  "160m": {
    id: "160m",
    floor_type: "약광층",
    wholeEffect: [
      "상성 피해 계수 20% 증가. 비상성 공격을 받을 시 최종 피해 면역 10% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: [
      "턴 시작 시 새끼손가락 피터와 돼지머리 잭이 번갈아가면서 상태 강화. 자신이 받는 피해 1로 고정 및 모든 디버프 상태 면역.",
    ],
    enemies: [
      {
        id: "enemy_160m_1",
        type: "boss",
        name: "새끼손가락 피터",
        inspiration: "beast",
      },
      {
        id: "enemy_160m_2",
        type: "boss",
        name: "돼지머리 잭",
        inspiration: "beast",
      },
    ],
    strategy: {
      overview: "최대한 보스의 피통을 비슷하게 맞추자.",
      details: [
        "턴마다 보스끼리 번갈아가면서 무적이 되는 것을 반복하는 것이 특징인 스테이지.",
        "딜이 충분하다면, 쉽지만, 딜이 부족하면 보스 둘의 체력을 비슷하게 맞추면서 처리",
      ],
    },
    recommendedTeams: [],
  },
  "170m": {
    id: "170m",
    floor_type: "약광층",
    wholeEffect: [
      "상성 피해 계수 20% 증가. 비상성 공격을 받을 시 최종 피해 면역 10% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["퇴장 시 모든 아군이 잃은 HP의 +50% 회복."],
    enemies: [
      {
        id: "enemy_170m_1",
        type: "boss",
        name: "포악함의 머리",
        inspiration: "beast",
      },
      {
        id: "enemy_170m_2",
        name: "포악함의 머리 하수인",
        inspiration: "beast",
      },
      {
        id: "enemy_170m_3",
        name: "포악함의 머리 하수인",
        inspiration: "beast",
      },
    ],
    strategy: {
      overview: "최대한 광역딜 위주로, 한번에 모두 잡기",
      details: [
        "적군이 죽을수록 보스가 버프를 얻기에 한꺼번에 광역딜로 처리하는 것을 추천",
        "회복하는 기믹이 있어서, 연소를 활용하면 더 좋음 (보스도 포함)",
      ],
    },
    recommendedTeams: [],
  },
  "180m": {
    id: "180m",
    floor_type: "약광층",
    wholeEffect: [
      "상성 피해 계수 20% 증가. 비상성 공격을 받을 시 최종 피해 면역 10% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    teamEffect: ["턴 시작 시 아군 랜덤 주문 2장이 [동결] 효과 덮어쓰기, 1턴간 지속."],
    enemies: [
      {
        id: "enemy_180m_1",
        type: "boss",
        name: "슬라임 퍼커셔니스트",
        inspiration: "mineral",
      },
      {
        id: "enemy_180m_2",
        name: "퍼커셔니스트",
        inspiration: "mineral",
      },
      {
        id: "enemy_180m_3",
        name: "퍼커셔니스트",
        inspiration: "mineral",
      },
      {
        id: "enemy_180m_4",
        name: "퍼커셔니스트",
        inspiration: "mineral",
      },
    ],
    strategy: {
      overview: "무난하게, 재생스택을 깎고 딜 넣기",
      details: [
        "적이 공격을 받을 수록 재생이 깎이기 때문에, 추공덱으로 하는 것을 추천",
        "크게 어렵지 않고 잘키운덱으로 밀면 충분",
      ],
    },
    recommendedTeams: [],
  },
  "190m": {
    id: "190m",
    floor_type: "약광층",
    wholeEffect: [
      "상성 피해 계수 20% 증가. 비상성 공격을 받을 시 최종 피해 면역 10% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    teamEffect: ["3첫 턴 및 2턴 시작 시마다 랜덤 캐릭터 1명에게 1턴간 [무장 해제] 상태 부여."],
    enemies: [
      {
        id: "enemy_190m_1",
        type: "boss",
        name: "칼을 든 자",
        inspiration: "beast",
      },
    ],
    strategy: {
      overview: "정신딜로 최대한 한턴에 많은 딜을 넣으면서 끝내기",
      details: [
        "제어 면역이 있고, 현실 공격 회피 버프가 있으므로, 정신 딜러를 가져가는 것을 추천",
        "보스의 체력이 낮아질수록 행동 횟수가 많아져서, 한번에 딜을 많이 넣어 끝내는게 좋음",
        "보스가 술진을 설치하여 버프를 얻기에, 아군도 술진 캐릭터를 채용하여 술진을 덮어씌우는 것을 추천",
        "보호막은 흡혈을 못하니 참고",
      ],
    },
    recommendedTeams: [],
  },
  "200m-1": {
    id: "200m-1",
    floor_type: "약광층",
    wholeEffect: [],
    enemyEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
      "전투 진입 시 열정 +3. 턴 종료 시 열정 +1",
      "공격, 현실 방어 및 정신 방어 + 10%",
      "퇴장 시 다른 아군 열정 +5 [회피] 상태 1턴 획득",
    ],
    enemies: [
      {
        id: "enemy_200m_1_1",
        name: "제노 호위병",
        inspiration: "plant",
      },
      {
        id: "enemy_200m_1_2",
        type: "boss",
        name: "장군 부관·몰디르",
        inspiration: "plant",
      },
      {
        id: "enemy_200m_1_3",
        name: "제노 침투자",
        inspiration: "plant",
      },
      {
        id: "enemy_200m_1_4",
        name: "제노 반군",
        inspiration: "plant",
      },
      {
        id: "enemy_200m_1_5",
        name: "제노 포병",
        inspiration: "plant",
      },
      {
        id: "enemy_200m_1_6",
        name: "제노 호위병",
        inspiration: "plant",
      },
      {
        id: "enemy_200m_1_7",
        name: "제노 반군",
        inspiration: "plant",
      },
      {
        id: "enemy_200m_1_8",
        name: "제노 포병",
        inspiration: "plant",
      },
      {
        id: "enemy_200m_1_9",
        name: "제노 침투자",
        inspiration: "plant",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "몰디르에게 반격당하거나, 매턴 공격력이 가장 높은 아군에게 무장해제 부여하는 것을 참고",
        "카운터 해제 캐릭터가 있으면, 카운터 해제후, 쫄몹을 먼저 처리해도 됨 + 침묵도 좋음",
        "쫄몹들이 생각보다 귀찮고, 최대한 최종술식을 못쓰게 만들어줘야 함",
      ],
    },
    recommendedTeams: [
      {
        characters: [
          {
            character_id: 10, // 뉴바벨
            euphoria: true,
            psycube_id: 38,
          },
          {
            character_id: 29, // 루시
            psycube_id: 51,
          },
          {
            character_id: 32, // J
            psycube_id: 62,
          },
          {
            character_id: 36, // 로페라
            psycube_id: 61,
          },
        ],
        description: "루시 강화 & 반격으로 처리",
        blueprint: "operatic_reflection",
        player_name: "Lyva",
      },
    ],
  },
  "200m-2": {
    id: "200m-2",
    floor_type: "약광층",
    wholeEffect: [],
    enemyEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
      "턴 시작 시 최대 HP*5%의 보호막 획득, 해당 보호막이 존재할 시 받는 피해 50% 감소, 1턴간 지속",
      "퇴장 시 다른 아군 열정 +2, 최대 HP 10% 회복",
      "빈사 시 자신의 최대 HP 50% 회복, 열정+5 (최대 1회 발동)",
    ],
    enemies: [
      {
        id: "enemy_200m_2_1",
        name: "특종 글라와커스",
        inspiration: "mineral",
      },
      {
        id: "enemy_200m_2_2",
        name: "특종 글라와커스",
        inspiration: "mineral",
      },
      {
        id: "enemy_200m_2_3",
        type: "boss",
        name: "레거스",
        inspiration: "mineral",
      },
      {
        id: "enemy_200m_2_4",
        name: "특종 글라와커스",
        inspiration: "mineral",
      },
      {
        id: "enemy_200m_2_5",
        name: "특종 글라와커스",
        inspiration: "mineral",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "매혹 저항률이 매우 낮아서, 안조를 활용하면 쉽게 클리어 가능",
        "모든 적군이 한번 부활하는 것을 조심해야 함",
        "보스가 최종술식을 못쓰게 제어를 잘 걸어주는 것을 추천 & 안된다면 면역으로 해결",
        "딜이 충분하다면, 보스를 일점사 먼저하는 것을 추천",
        "보스만 잡는다면, 클리어되니 참고",
      ],
    },
    recommendedTeams: [
      {
        characters: [
          {
            character_id: 35, // 안조날라
            psycube_id: 67,
          },
          {
            character_id: 18, // 37
            psycube_id: 18,
          },
          {
            character_id: 31, // 머큐리아
            psycube_id: 50,
          },
          {
            character_id: 14, // 투스페어리
            psycube_id: 55,
          },
        ],
        description: "안조 & 37 계약 매혹으로 처리",
        blueprint: "star_of_misfortune",
        player_name: "Lyva",
      },
    ],
  },
  "200m-3": {
    id: "200m-3",
    floor_type: "약광층",
    wholeEffect: [],
    enemyEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    teamEffect: [
      "턴 시작 시 랜덤 3장의 주문이 [동요] 효과로 변경",
      "턴 시작 시 50% 확률로 아군의 모든 주문이 [예비 주문]으로 변경",
      "턴 종료 시 HP가 50%보다 낮을 경우, [심란]에 빠짐, 1턴간 지속",
    ],
    enemies: [
      {
        id: "enemy_200m_3_1",
        type: "boss",
        name: "분노에 찬 추방자",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "버프, 카운터 유형 행동을 하면, 보스가 주는 피해가 증가 / 디버프나 치료 행동을 하면, 받는 피해 감소 버프를 얻음",
        "보스는 침묵을 제외한 모든 제어에 면역이므로, 침묵을 잘 활용하는 것을 추천",
        "침묵이나 열정 강탈을 활용해서, 최대한 궁을 못쓰게 하는 것을 추천",
        "보스가 일정 체력이하로 떨어지면, 최종술식을 쓰니 주의",
        "보스가 스킬을 쓰면, 정신/현실 피해 면역이 생기니 참고",
        "장기전으로 갈 수록 힘들어짐",
        "튜닝은 맵 효과로 인해, 끝없는 튜닝을 추천",
      ],
    },
    recommendedTeams: [
      {
        characters: [
          {
            character_id: 37, // 윌로우
            psycube_id: 39,
          },
          {
            character_id: 33, // 튜즈데이
            psycube_id: 6,
          },
          {
            character_id: 4, // 소더비
            euphoria: true,
            psycube_id: 23,
          },
          {
            character_id: 30, // 카카니아
            psycube_id: 57,
          },
        ],
        description: "중독덱 버스트 딜",
        blueprint: "mountain_ghost",
        player_name: "Lyva",
      },
      {
        characters: [
          {
            character_id: 4, // 소더비
            euphoria: true,
            psycube_id: 12,
          },
          {
            character_id: 30, // 카카니아
            psycube_id: 57,
          },
        ],
        description: "소더비로 버티고, 카카니아로 딜링",
        blueprint: "mountain_ghost",
        player_name: "Lyva",
      },
      {
        characters: [
          {
            character_id: 39, // 바르카롤라
            psycube_id: 4,
          },
          {
            character_id: 44, // 알레프
            psycube_id: 35,
          },
          {
            character_id: 11, // 보이저
            euphoria: true,
            psycube_id: 32,
          },
          {
            character_id: 21, // 에즈라
            euphoria: true,
            psycube_id: 57,
          },
        ],
        description: "계시덱 (에즈라 대신 적당한 탱커 가능)",
        blueprint: "ashen_beast",
        player_name: "Lyva",
      },
      {
        characters: [
          {
            character_id: 43, // 레콜레타
            psycube_id: 58,
          },
          {
            character_id: 13, // 피클즈
            euphoria: true,
            psycube_id: 33,
          },
          {
            character_id: 12, // 멜라니아
            euphoria: true,
            psycube_id: 43,
          },
          {
            character_id: 40, // 파투투
            psycube_id: 15,
          },
        ],
        description:
          "카카니아, 중독덱, 보이저가 없어서 쓴 덱(원형 청사진 없이도 가능) 레콜레타의 깡딜과 파투투의 생존 서포팅, 멜라의 열정 강탈로 깰 수 있음",
        player_name: "대굴레오",
      },
    ],
  },
  "210m": {
    id: "210m",
    floor_type: "미광층",
    wholeEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["전투 진입 및 2턴 시작 시마다 자신 최대 HP * 20%의 보호막 획득, 2턴간 지속"],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_210m_1",
        name: "이빨요정 여제",
        inspiration: "mineral",
        type: "boss",
      },
      {
        id: "enemy_210m_2",
        name: "이빨요정 아이",
        inspiration: "mineral",
      },

      {
        id: "enemy_210m_3",
        name: "이빨요정 아이",
        inspiration: "mineral",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "보스는 계속해서 잡몹들에게, 버프를 부여하고 체력이 낮아질때마다 잡몹을 소환함",
        "잡몹들은 매턴 부활버프를 얻는데, 상성피해나 치명타피해 3번을 주면 해당 버프가 해제됨",
        "별다른 어려운 기믹은 없고, 보스만 열심히 일점사하면 무난하게 클리어가능",
        "200m를 깼다면 천체딜러를 들고가면 쉽게 클리어 가능",
      ],
    },
    recommendedTeams: [],
  },
  "220m": {
    id: "220m",
    floor_type: "미광층",
    wholeEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["퇴장 시 모든 적군에게 공격자 공격 * 200%의 고정 피해를 줌"],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_220m_1",
        name: "좀비",
        inspiration: "spirit",
      },
      {
        id: "enemy_220m_2",
        name: "그린 레이크 키로구아나",
        inspiration: "spirit",
      },
      {
        id: "enemy_220m_3",
        type: "boss",
        name: "그린 레이크 엔젤캣",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "잡몹들은 부활을하고, 계속해서 기믹으로 오염을 부여함",
        "오염이 쌓이면 꽤나 데미지가 많이 들어오니 주의할 것",
        "무조건 보스를 일점사하는 것을 추천. 잡몹이 죽으면 보스가 잡몹을 소환함",
        "특정덱이 강제되진 않고, 가장 강한 덱으로 밀어버리면 됨",
      ],
    },
    recommendedTeams: [],
  },
  "230m": {
    id: "230m",
    floor_type: "미광층",
    wholeEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["2턴 시작 시마다 모든 아군의 [속성 감소][상태 이상][제어] 상태 정화"],
    enemies: [
      {
        id: "enemy_230m_1",
        name: "도살자",
        inspiration: "mineral",
      },
      {
        id: "enemy_230m_2",
        name: "도살자의 비눗방울",
        type: "boss",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "도살자는 절대 죽지 않고, 비눗방울만 죽이면 되지만 꽤나 난이도가 높은 스테이지",
        "비눗방울을 공격하면, 도살자에게 버프가 들어가고, 체력이 낮아지면 행동횟수도 늘어남",
        "도살자는 죽이면, 1턴 기절하고 버프를 얻으면서 부활하니, 최대한 안죽이는 것을 추천함",
        "최대한 비눗방울만 일점사해서 죽이면 되고, 버프해제 캐릭터를 사용해서 도살자의 버프들을 지워주는게 좋음 (도발도 있음)",
        "도살자가 술식을 자주 사용하니, 열정깎는 캐릭터도 기용할만하고, 적들은 2턴마다 모든 상태 이상 정화가 되는 것도 참고.",
      ],
    },
    recommendedTeams: [],
  },
  "240m": {
    id: "240m",
    floor_type: "미광층",
    wholeEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    teamEffect: [
      "광역 일반 주문을 사용하여 공격 시 피해 100% 감소. 광역 일반 주문 사용 후 랜덤으로 자신에게 [상태 이상 집합] 중 2가지 부여, 1턴간 지속",
    ],
    enemies: [
      {
        id: "enemy_240m_1",
        name: "봉합물",
        inspiration: "beast",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "광역공격보다는, 단일공격으로 공략해야하는 스테이지",
        "보스는 공격을 하면 목표가 추가피해를 입고, 보스는 HP 비례 회복을 함.",
        "제어의 영향을 받지 않고, 단일 공격으로는 한번에 최대 HP의 5%까지만 데미지를 받음",
        "단일 공격의 타수가 많은 조합을 추천하고, 보스의 최종술식을 막는게 핵심임",
        "딜로 찍어누르던가, 아니면 추공 + 콘블룸으로 공략하면 무난함.",
      ],
    },
    recommendedTeams: [],
  },
  "250m-1": {
    id: "250m-1",
    floor_type: "미광층",
    wholeEffect: [],
    enemyEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
      "공격 시 자신이 보유한 디버프 상태 종류가 2가지 이하일 경우, 목표가 [두려움] 1스택 획득",
    ],
    teamEffect: [
      "턴 종료 시 HP 비율이 90%보다 높을 경우, [산만][기린혈] 1스택 획득",
      "받는 치료 효과 -30%",
    ],
    enemies: [
      {
        id: "enemy_250m_1_1",
        name: "핥은 손",
        inspiration: "spirit",
        stage: 1,
      },
      {
        id: "enemy_250m_1_2",
        name: "핥은 손",
        inspiration: "spirit",
        stage: 1,
      },
      {
        id: "enemy_250m_1_3",
        name: "고난의 왕",
        inspiration: "spirit",
        stage: 1,
      },
      {
        id: "enemy_250m_1_4",
        name: "공포의 모자지간",
        type: "boss",
        inspiration: "spirit",
        stage: 2,
      },
    ],
    strategy: {
      overview: "",
      details: [
        "2개의 스테이지로 이루어져있고, 동행하는 빨간 망토의 술식은 대상의 모든 '버티기 스택'을 제거하기 때문에 꼭 사용해야함.",
        "1스테이지에서는, 제멜바이스와 잡몹 2마리가 소환되는데, 제멜바이스의 술진이 꽤나 위협적이기 때문에, 술진 캐릭터나 안조 보스를 동행하는 것을 추천 (술진은 1개만 존재가능)",
        "적군들은 매턴 부활스택을 얻으므로, 빨간 망토의 술식으로 부활스택(버티기)를 모두 제거한 후 해당 턴에 죽이는 것이 핵심",
        "2스테이지는 꽤나 보스의 체급이 높고, 맵기믹으로 치유율도 떨어지니 빠르게 공략하는게 좋음",
        "보스에게 최대한 디버프를 많이 걸고 보스의 술식을 맞으면 혼란, 공포, 악몽 상태를 부여하기 때문에, 주의할 것",
        "2스테이지 보스 또한 빨간망토의 술식으로 부활스택을 모두 없애고 죽이기",
      ],
    },
    recommendedTeams: [],
  },
  "250m-2": {
    id: "250m-2",
    floor_type: "미광층",
    wholeEffect: [],
    enemyEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
      "피해 회복 + 20%",
    ],
    teamEffect: [
      "턴 시작 시 [제어] 상태인 경우, 열정 -1",
      "최종 술식 시전 후 2턴간 [심란] 상태부여",
    ],
    enemies: [
      {
        id: "enemy_250m_2_1",
        name: "견고한 돌기사",
        inspiration: "mineral",
      },
      {
        id: "enemy_250m_2_2",
        name: "견고한 돌기사",
        inspiration: "mineral",
      },
      {
        id: "enemy_250m_2_3",
        name: "견고한 돌기사",
        inspiration: "mineral",
      },
      {
        id: "enemy_250m_2_4",
        name: "신비한 의료 상자",
        type: "boss",
        inspiration: "mineral",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "다 적지 못했지만 견고한 돌기사는 28마리가 있음",
        "무조건 보스인 상자만 일점사해야함. 보스만 잡으면 클리어. 돌기사들은 최대한 건들이지 말자.",
        "보스는 3턴마다 변신을 하는데, 해당 상태에서는 공격받을수록 데미지를 더 많이 받으니 잘 활용해야함",
        "가장 좋은 방법은 천체 추공덱으로 무난하게 미는 것이 좋음.",
        "딜만 충분하다면 엄청나게 쉬운 스테이지",
      ],
    },
    recommendedTeams: [],
  },
  "260m": {
    id: "260m",
    floor_type: "미광층",
    wholeEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    teamEffect: ["턴 시작 시 모든 아군이 [느릿느릿] 2스택 획득"],
    enemies: [
      {
        id: "enemy_260m_1",
        name: "동굴거미",
        inspiration: "star",
      },
      {
        id: "enemy_260m_2",
        name: "동굴거미",
        inspiration: "star",
      },
      {
        id: "enemy_260m_3",
        name: "동굴거미",
        inspiration: "star",
      },
      {
        id: "enemy_260m_4",
        name: "동굴거미",
        inspiration: "star",
      },
      {
        id: "enemy_260m_5",
        name: "대문의 눈",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "천장에 달려있는 거미를 잡는것이 중요함. 모든 피해를 1로 받음.",
        "땅거미들이 살아있으면, 천장거미는 매턴회복하니, 쫄몹처리가 정말 중요함",
        "쫄몹을 잡으면 아군 피해보너스 감면과, 천장거미에게 딜을 줌",
        "타수기믹으로 하는게 최선. 추공이나 계시덱으로 데미지를 넣으면 쉬움",
      ],
    },
    recommendedTeams: [],
  },
  "270m": {
    id: "270m",
    floor_type: "미광층",
    wholeEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["현실 피해를 받을 시 치명타 저항률 +100%"],
    enemies: [
      {
        id: "enemy_270m_1",
        type: "boss",
        name: "시끄러운 유령",
        inspiration: "spirit",
      },
      {
        id: "enemy_270m_2",
        type: "boss",
        name: "파파라치 유령",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "현실 딜러를 사용하면, 거의 딜이 들어가지 않는 기믹이므로, 무조건 정신딜러를 추천함.",
        "클릭을 먼저 일점사해서 죽이는게 좋음. 폴터는 단단하고 도발만 있지 위협적이지 않음",
        "적군이 디버프를 가지고 있으면, 주는 피해증가 + 받는 피해 감소가 있으므로 조심",
        "버프 해제 캐릭터가 있으면 폴터의 도발 및 버프를 지울 수 있어서 유용함",
      ],
    },
    recommendedTeams: [],
  },
  "280m": {
    id: "280m",
    floor_type: "미광층",
    wholeEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["공격받은 후 공격자에게 [오염] 3스택 부여, 2턴간 지속"],
    enemies: [
      {
        id: "enemy_280m_1",
        name: "새",
        inspiration: "spirit",
      },
      {
        id: "enemy_280m_2",
        name: "새",
        inspiration: "spirit",
      },
      {
        id: "enemy_280m_3",
        name: "새",
        inspiration: "spirit",
      },
      {
        id: "enemy_280m_4",
        name: "새",
        inspiration: "spirit",
      },
      {
        id: "enemy_280m_5",
        name: "새",
        inspiration: "spirit",
      },
      {
        id: "enemy_280m_6",
        name: "새",
        inspiration: "spirit",
      },
      {
        id: "enemy_280m_7",
        name: "새",
        inspiration: "spirit",
      },
      {
        id: "enemy_280m_8",
        name: "새",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "모든 몬스터는 받는 광역피해 감소, 받는 단일 피해 증가가 있음",
        "모든 몹들은 턴 종료 시 HP가 40%보다 낮으면 새로운 몹을 자동 소환함 (무한 증식)",
        "맵 기믹과 더불어, [오염]을 많이 걸기때문에 면역이 있으면 좋음",
        "무조건 마지막 남은 4명의 적을 한턴에 죽여야함. 안그러면 증식함",
        "딜 조절을 하면서 체력 비율을 맞춰둔 후, 한번에 광역 궁으로 쓸어담는 것을 추천",
      ],
    },
    recommendedTeams: [],
  },
  "290m": {
    id: "290m",
    floor_type: "미광층",
    wholeEffect: [
      "상성 피해 계수 30% 증가. 비상성 공격을 받을 시 최종 피해 면역 15% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    teamEffect: ["첫 턴 및 2턴 시작 시마다 모든 아군에게 1턴간 [침묵] 상태 부여"],
    enemies: [
      {
        id: "enemy_290m_1",
        type: "boss",
        name: "소리의 경청자",
        inspiration: "mineral",
      },
      {
        id: "enemy_290m_2",
        name: "떠들썩한 소리",
        inspiration: "spirit",
      },
      {
        id: "enemy_290m_3",
        name: "술렁이는 소리",
        inspiration: "spirit",
      },
      {
        id: "enemy_290m_4",
        name: "떠들썩한 소리",
        inspiration: "spirit",
      },
      {
        id: "enemy_290m_5",
        name: "술렁이는 소리",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "추공, 딜찍누, 계시 등이 없으면 매우까다로운 기믹을 가짐",
        "2턴마다 침묵을 걸고, 매턴 적군은 무흔을 걸고, 무흔히 사라지면 보스는 버티기(부활스택)을 얻음",
        "최대한 단일 공격으로 보스만 일점사하고, 쫄몹들은 무시하는 것을 추천",
        "보스의 버티기를 최대한 빠르게 제거하고 죽이는 것이 관건이고, 침묵을 유의해야함.",
      ],
    },
    recommendedTeams: [],
  },
  "300m-1": {
    id: "300m-1",
    floor_type: "미광층",
    wholeEffect: [],
    enemyEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
      "턴 종료 시마다 공격 5% 증가 (중첩 가능)",
    ],
    teamEffect: [
      "최종 술식 시전 후 1턴간 [꿈의 방문] 상태 진입",
      "1단계 공격, 디버프 유형 주문 사용 후 [산만] 1스택 획득",
    ],
    enemies: [
      {
        id: "enemy_300m_1_1",
        name: "꿈속의 왕 (모체)",
        type: "boss",
        inspiration: "intellect",
      },
      {
        id: "enemy_300m_1_2",
        name: "꿈속의 왕 (오른팔)",
        inspiration: "intellect",
      },
      {
        id: "enemy_300m_1_3",
        name: "꿈속의 왕 (왼팔)",
        inspiration: "intellect",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "특별한 기믹도 없고, 300m 중에서는 가장 무난한 스테이지",
        "아군이 술식을 사용 한 후, 카드를 쓰면 안됨. ",
        "바바라가 5번째 멤버로 참여하고, 주문강화를 해주는 카드 및 도움을 줌",
        "고단계 주문으로 공격하면 딜이 잘 들어가고, 팔부터 뗀 후 모체를 죽이는 것을 추천",
        "특별한 기믹 없이, 아무 체급 좋은 덱을 들고가면 무난함.",
      ],
    },
    recommendedTeams: [],
  },
  "300m-2": {
    id: "300m-2",
    floor_type: "미광층",
    wholeEffect: [],
    enemyEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
      "전투 진입 시 최대 HP x 50%의 [보호막] 획득, 2턴간 지속",
      "단일 공격을 받은 후 [견고] 1스택 획득",
    ],
    teamEffect: ["최종 술식 시전 후마다 술식 위력 10% 영구 감소 (효과 중첩 가능)"],
    enemies: [
      {
        id: "enemy_300m_2_1",
        name: "야수 카벙클",
        inspiration: "beast",
      },
      {
        id: "enemy_300m_2_2",
        name: "그린 레이크 카벙클",
        inspiration: "spirit",
      },
      {
        id: "enemy_300m_2_3",
        name: "선인장 크리터 무리",
        inspiration: "plant",
      },
      {
        id: "enemy_300m_2_4",
        type: "boss",
        name: "실망한 방랑자",
        inspiration: "plant",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "매턴 아군 1명에게 석화를 걸기때문에, 정화나 면역이 필수",
        "쫄몹은 부활하기에, 무시하고, 무조건 보스만 일점사하는 것을 추천함.",
        "보스가 자힐이 있고, 딜이 꽤나 아프기때문에 빠르게 공략하는 것을 추천",
        "술식 딜러나, 단일공격 딜러는 딜이 잘 안들어가니 참고.",
        "정화, 면역 캐릭터가 없으면 5성도 충분히 쓸만함.",
      ],
    },
    recommendedTeams: [],
  },
  "300m-3": {
    id: "300m-3",
    floor_type: "미광층",
    wholeEffect: [],
    enemyEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
      "공격받을 시 비상성 피해 50% 감소",
    ],
    teamEffect: [
      "턴 종료 시 해당 턴에 행동하지 않은 캐릭터 [장애] 1스택, [위축] 3스택 획득",
      "최종 술식 시전 후 모든 적군 열정 +1",
    ],
    enemies: [
      {
        id: "enemy_300m_3_1",
        type: "boss",
        name: "안조 날라",
        inspiration: "beast",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "상성 딜이 아니면 반감되니까, 상성 딜러를 추천하고, 단일딜러면 더 좋음.",
        "보스가 아닌, 뒤에 있는 몬스터 안조날라부터 잡는 것을 추천.",
        "안조 날라의 술식이 정말 아프기 때문에 조심",
        "내성이 많기때문에, 열정 감소 캐릭터를 넣어서 안조날라가 궁을 못쓰게 하는 것을 추천",
        "딜러 및 서브 딜러는 매턴 행동하는게 중요하고, 열정감소 없이 트라이할 경우, 탱커가 꼭 필요함.",
      ],
    },
    recommendedTeams: [],
  },
  "310m": {
    id: "310m",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["정신 방어 +40%"],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_310m_1",
        name: "여자아이",
        inspiration: "plant",
      },
      {
        id: "enemy_310m_2",
        name: "방직공",
        inspiration: "beast",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "기믹은 별거 없고, 정신피해만 안주면 되는 간단한 스테이지",
        "제어 내성이 없어서 제어를 활용할 수도 있고, 쉬움",
      ],
    },
    recommendedTeams: [],
  },
  "320m": {
    id: "320m",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["퇴장 시 모든 적군에게 공격자 공격 * 100%의 고정 피해를 줌"],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_320m_1",
        name: "봉투?",
        inspiration: "star",
      },
      {
        id: "enemy_320m_2",
        name: "봉투?",
        inspiration: "star",
      },
      {
        id: "enemy_320m_3",
        name: "봉투?",
        inspiration: "star",
      },
      {
        id: "enemy_320m_4",
        name: "봉투?",
        inspiration: "star",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "4명의 봉투중, 진짜 쓰레기 봉투 보스를 찾아 잡으면 종료되는 스테이지",
        "홀수 턴마다 적들은 서로 위치를 바꿈. 그 후에 적 3명은 공격하고, 1명은 공격을 안할텐데, 공격을 안한 봉투가 진짜",
        "처음에 순서 바뀌고, 타겟팅(클릭)을 해두면 자리가 바뀌어도 타게팅이 지속되서 외울 필요가 없음",
        "스테이지 체급은 높지 않아 힘들지는 않지만, 귀찮은 정도",
        "한번에 모두 죽이는 전략도 가능함.",
      ],
    },
    recommendedTeams: [],
  },
  "330m": {
    id: "330m",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["공격, 현실 방어 및 정신 방어 + 15%"],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_330m_1",
        name: "양전하",
        inspiration: "spirit",
      },
      {
        id: "enemy_330m_2",
        name: "음전하",
        inspiration: "intellect",
      },
      {
        id: "enemy_330m_3",
        name: "양전하",
        inspiration: "spirit",
      },
      {
        id: "enemy_330m_4",
        name: "음전하",
        inspiration: "intellect",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "단일 공격을 가진 딜러를 가져가는 것을 추천",
        "적은 양전하와 음전하가 있는데, 각각 때릴때마다 디버프를 주는데, 해당 디버프가 쌓이면 딜이랑 마비가 걸려서 힘듦",
        "정화 요원이 있으면 그냥 마비, 기절을 지우면서 해도 됨",
        "적들이 서로 현실딜 감소, 정신딜 감소를 가지고 있어서 정신딜러, 현실딜러를 각각 들고가는게 좋지만, 1명만 들고가도 문제는 없음",
        "계시는 치트키급이고, 적당히 딜러와 힐러, 탱커 조합으로 하면 무난하게 클리어 가능",
      ],
    },
    recommendedTeams: [],
  },
  "340m": {
    id: "340m",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["전투 진입 시 및 2턴 시작 시마다 모든 아군이 [재생] 1스택 획득"],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_340m_1",
        name: "포식하는 조각상",
        inspiration: "plant",
      },
      {
        id: "enemy_340m_2",
        name: "사냥하는 조각상",
        inspiration: "plant",
      },
      {
        id: "enemy_340m_3",
        name: "포식하는 조각상",
        inspiration: "plant",
      },
      {
        id: "enemy_340m_4",
        name: "식인 나무",
        inspiration: "plant",
        type: "boss",
      },
      {
        id: "enemy_340m_5",
        name: "사냥하는 조각상",
        inspiration: "plant",
      },
      {
        id: "enemy_340m_6",
        name: "포식하는 조각상",
        inspiration: "plant",
      },
      {
        id: "enemy_340m_7",
        name: "사냥하는 조각상",
        inspiration: "plant",
      },
      {
        id: "enemy_340m_8",
        name: "포식하는 조각상",
        inspiration: "plant",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "적들은 피해를 받을때마다 피해 감면이 깎이는 기믹",
        "별다른 기믹은 없고, 제어나 딜로 찍어누르면 되는 스테이지",
        "가장 강한 덱으로 치면 큰 어려움 없이 클리어 가능",
      ],
    },
    recommendedTeams: [],
  },
  "350m-1": {
    id: "350m-1",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: [
      "단일 공격으로 인한 받는 피해는 자신의 최대 HP의 10%를 초과하지 않음",
      "턴 시작 시 모든 아군이 랜덤으로 [버프 집합] 중 4가지 효과 획득",
    ],
    teamEffect: [
      "턴 시작 시 아군 캐릭터가 보유한 [간파]가 4스택 이상일 경우 1턴간 [기절] 진입. [간파] 2스택 차감",
    ],
    enemies: [
      {
        id: "enemy_350m_1_1",
        name: "정체불명의 깃털족",
        inspiration: "beast",
        type: "boss",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "광상 피클즈, 네크롤로지스트를 키우지 않았다면 350m 중 제일 까다로운 스테이지",
        "피가 70% 이하가 되면 1턴 무적을 걸고, 행동횟수 +1 과 디버프 면역을 얻음",
        "기믹으로 계속해서 본인에게 버프를 거는데, 버프가 있으면 주는피해 증가 & 받는 피해 감소",
        "버프 제거 요원 (광상 피클즈, 네크롤로지스트)가 필수적으로 필요함",
        "체력이 많아서, 암석딜러로 깨는 것을 추천함.",
        "[간파] 스택이 쌓이면 기절이 걸리는데, 같은 턴에 다른 유형의 주문을 직접 사용하면 1스택 차감시킬 수 있고, 빠르게 줄여주는 것을 추천",
        "꽤나 아프고, 체력도 많고, 버프제거까지 해줘야 할만함. 세 박자가 모두 맞아야 클리어 가능",
      ],
    },
    recommendedTeams: [],
  },
  "350m-2": {
    id: "350m-2",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["모든 아군이 공격 시 현재 HP 비율이 30%보다 낮을 경우 주는 피해 50% 증가"],
    teamEffect: [
      "턴 시작 시 모든 아군에게 [오염] 1스택 부여, 2턴간 지속",
      "모든 아군이 디버프 유형 주문을 1회 시전 할 때마다 자신은 [무언] 1스택 획득",
    ],
    enemies: [
      {
        id: "enemy_350m_2_1",
        name: "과거의 움직이는 시체",
        inspiration: "star",
      },
      {
        id: "enemy_350m_2_2",
        name: "그린레이크의 악몽",
        inspiration: "star",
        type: "boss",
      },
      {
        id: "enemy_350m_2_3",
        name: "과거의 움직이는 시체",
        inspiration: "star",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "350m 중 가장 할만한 스테이지이며 보스는 총 2페이즈로 구성되어 있음",
        "아군을 상태이상 떡칠시키는 기믹만 있는데, 보스에게 상태이상을 걸면, 아군의 상태 이상이 풀림. 따라서 정화 요원은 필수가 아님",
        "1페이즈는 잡몹들만 잘 공략하면 문제가 없고 조금 아플 수는 있지만, 어렵진 않음",
        "2페이즈는 보스가 공격력이 가장 높은 아군에게 [원혼] & [기절]을 2턴동안 부여함. 원혼이 걸리면 최대 HP의 50%를 깎고, 해제불가",
        "유령 신부를 먼저 잡으면 원혼이 풀리고, 도살자 잡고, 제시카 순서대로 잡아주는게 좋음.",
        "유령신부와 도살자를 잡으면 제시카가 강해지니 참고",
        "잡몹을 죽이면 제시카 체력이 20% 깎이니 참고하면서 골고루 잡으면 쉽게 클리어 가능",
      ],
    },
    recommendedTeams: [],
  },
  "350m-3": {
    id: "350m-3",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: [
      "모든 아군이 받는 고정 피해 100% 감소",
      "아군이 정신 피해를 받을 때마다 모든 아군의 현실 방어 10% 증가, 3턴간 지속, 중첩 가능. 아군이 현실 피해를 받을 때마다 모든 아군의 정신 방어 10% 증가, 3턴가 지속, 중첩가능",
      "자신 퇴장 시 모든 아군이 [총력] 3스택 획득",
    ],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_350m_3_1",
        name: "소품 갑옷",
        inspiration: "star",
      },
      {
        id: "enemy_350m_3_2",
        name: "대마술사",
        inspiration: "spirit",
        type: "boss",
      },

      {
        id: "enemy_350m_3_4",
        name: "소품 완드",
        inspiration: "mineral",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "고정피해를 안받고, 정신피해를 받으면 모든 적의 현실방어가 증가하고, 현실피해를 받으면 모든 적의 정신방어가 증가함",
        "보스만 잡으면 되지만, 갑옷이나 완드의 현실/정신 방어만큼 방어가 증가해서 쫄몹을 잡고 보스를 잡는 것이 추천됨",
        "쫄몹은 3턴 시작시마다 모두 다시 재소환함. 그렇기에 쫄몹을 잡고 재소환하기 전까지가 극딜타임",
        "정신/현실 방어를 올리는 버프는 해제가 가능하고, 보스 술식에는 [심란]과 열정감소가 있어서 정화요원이 있으면 좋음",
        "쫄몹 둘을 같이 처리하면 좋지만, 한쪽만 처리하게 된다면 특정 주문 피해감소 80%가 들어오는 것을 참고",
        "정신딜러 / 현실딜러 둘중 한명만 데리고 가서 쫄몹 1명과 보스만 공략하는 것도 꽤나 좋은 방법임.",
        "위에 서술했던 대로, 꽤나 피감이나 딜타임 조건이 많아서 스펙을 조금 요구하는 편이고 힘들수도 있음.",
      ],
    },
    recommendedTeams: [],
  },
  "360m": {
    id: "360m",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["전투 진입 시 [버티기] 3스택 획득"],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_360m_1",
        name: "시바상",
        inspiration: "mineral",
      },
      {
        id: "enemy_360m_2",
        name: "라바나상",
        inspiration: "star",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "별다른 기믹없이, 체급이 높은 딜러 조합을 들고가면 쉽게 깨지는 스테이지",
        "두명의 적의 체력을 비슷비슷하게 맞추면서 공격하면 조금 더 수월",
        "큰 어려움 없이 클리어 가능",
      ],
    },
    recommendedTeams: [],
  },
  "370m": {
    id: "370m",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["퇴장 시 다른 아군 열정 +1, 최대 HP 5% 회복"],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_370m_1",
        name: "'혈한보마'",
        inspiration: "mineral",
      },
      {
        id: "enemy_370m_2",
        name: "용맹한 기사",
        inspiration: "mineral",
      },
      {
        id: "enemy_370m_3",
        name: "기사의 '완드'",
        inspiration: "mineral",
      },
      {
        id: "enemy_370m_4",
        name: "기사의 '칼'",
        inspiration: "mineral",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "슬라우치 햇이 메인 딜러여서, 제일 유의해야함. 절대 술식을  사용하지 못하게 해야함",
        "광역딜러로 다같이 골고루 공격하는게 좋은데, 안되면 슬라우치 햇이라도 먼저 잡아야함",
        "적들이 열정수급이 빨라서, 빠르게 클리어하는 것을 추천",
      ],
    },
    recommendedTeams: [],
  },
  "380m": {
    id: "380m",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["전투 진입 시 및 2턴 시작 시마다 자신의 열정 +1"],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_380m_1",
        name: "밀수 대포",
        inspiration: "star",
      },
      {
        id: "enemy_380m_2",
        name: "밀수 대포",
        inspiration: "star",
      },
      {
        id: "enemy_380m_3",
        name: "밀수 대포",
        inspiration: "star",
      },
      {
        id: "enemy_380m_4",
        name: "암흑가의 꽃",
        inspiration: "beast",
        type: "boss",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "보스인 테넌트를 먼저 잡는것보다, 대포들을 먼저 죽이는 것을 추천",
        "대포들이 생각보다 딜이 강력하고, 테넌트가 계속해서 무흔을 주는 것을 참고",
        "기믹만 알고, 누구를 먼저 때릴지만 알면 크게 어렵진 않은 스테이지",
      ],
    },
    recommendedTeams: [],
  },
  "390m": {
    id: "390m",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["피해 회복 +10%"],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_390m_1",
        name: "떠돌이 약제사",
        inspiration: "plant",
      },
      {
        id: "enemy_390m_2",
        name: "객지의 허수아비",
        inspiration: "plant",
      },
      {
        id: "enemy_390m_3",
        name: "객지의 허수아비",
        inspiration: "plant",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "그냥 중독덱을 상대한다고 생각하면 편함",
        "체급 높은 덱으로 밀어붙이면 쉽게 밀수 있고, 크게 어려울 것도 없는 스테이지",
        "조심해야할 것은 중독이 쌓이지 않도록 하기",
      ],
    },
    recommendedTeams: [],
  },
  "400m-1": {
    id: "400m-1",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: [
      "턴 시작 시 비호의 정령이 없을 경우 비호의 정령을 소환해 아군 전장을 가득 채움 (필드의 몬스터 최대 수량: 3)",
    ],
    teamEffect: ["받는 치료 효과 -60%", "3턴 시작 시마다 모든 아군에게 1턴간 [기절] 부여"],
    enemies: [
      {
        id: "enemy_400m_1_1",
        name: "마도 장치 0623Y번",
        inspiration: "mineral",
        type: "boss",
      },
      {
        id: "enemy_400m_1_2",
        name: "마도 장치 0987X번",
        inspiration: "mineral",
        type: "boss",
      },

      {
        id: "enemy_400m_1_3",
        name: "비호의 정령",
        inspiration: "mineral",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "목표는 벽 보스 2개를 잡는 것이고, 비호의 정령이 매턴 전체 리필됨",
        "비호의 정령은 체력이 5이고, 모든 데미지를 1로 받으며, 매턴 체력을 모두 회복하고, 살아있으면 나머지 적들이 모두 공격을 회피하고, 퇴장시 아군 신기한 빛 + 1",
        "벽 보스는 3회 공격할때마다 강력한 공격을히고, 신기한 빛을 3 달성하면 강력한 공격을 함. 또한 퇴장시 전체 기절을 부여",
        "보통 오른쪽 벽을 먼저 잡는게 좋고, 최대한 한턴에 보스 둘을 같이 잡는게 좋음. 한개만 잡으면 다음턴부터 비호의 정령이 2마리씩 리필됨.",
        "3턴마다 전체 기적을 걸고, 힐량도 감소되어서 정화/면역 및 힐량이 높은 캐릭들이 필수로 요구됨",
        "비호의 정령을 쉽게 잡기 위해, 타수가 많으면 좋기에, 추가공격 & 계시 조합들이 추천됨. (상성상으로도 유리)",
        "37이나 플러터 페이지는 타수가 많아서 비호의 정령을 잡기 좋음.",
      ],
    },
    recommendedTeams: [],
  },
  "400m-2": {
    id: "400m-2",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: [
      "턴 시작 시 자신의 열정 +1",
      "모든 아군이 비상성 공격을 1회 받을 때마다 자신이 [반석] 1스택 획득, 3턴간 지속",
      "턴 종료 시 모든 아군의 랜덤 [상태 이상] 정화",
    ],
    teamEffect: [],
    enemies: [
      {
        id: "enemy_400m_2_1",
        name: "면도날의 '환영'",
        inspiration: "beast",
      },
      {
        id: "enemy_400m_2_2",
        name: "'면도날'",
        inspiration: "beast",
        type: "boss",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "비상성 공격을 받으면, 정신/현실 방어가 증가하니, 최대한 암석파티 위주로 데려가는 것을 추천",
        "보스는 매턴 분신을 소환하는데, 체력이 50% 이하가 되면 소환되자마자 궁을 쓰는 강력한 분신을 소환함",
        "버프가 있을때마다 주는 피해 증가, 받는 피해 감소가 생기기 때문에, 광상 피클즈 처럼 버프 해제 요원이 있으면 난이도가 내려감",
        "보스는 단일 공격을 받으면 반격을 진행하는데, 분신들도 반격을 따라하기때문에 한번에 4번 맞을 수도 있음",
        "분신들은 모든 보스의 행동을 따라하고, 아군이 체력을 잃으면(자해를 하면) 분신들의 피가 깎임.",
        "면도날을 무선적으로 공략할수도 있고, 분신들만 때려잡으면서 광격공격으로 공략하는 방법도 있음",
        "분신들이 많이 쌓였을때, 술식 4연타는 꽤나 아프므로 틈틈히 분신들을 잡거나 대비책을 세워야함.",
        "암석덱을 잘 맞췄다면 무난하게 클리어가능하고, 스푸트니크 같은 열정감소 기믹을 사용할 수도 있음",
      ],
    },
    recommendedTeams: [],
  },
  "400m-3": {
    id: "400m-3",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: [
      "아군이 자연 영감 유닛에게 주는 피해 50% 증가",
      "전투 진입 시 적군 필드에 존재하는 자연 영감 캐릭터 1명당 전쟁 노역자의 최대 HP 25% 증가",
    ],
    teamEffect: [
      "턴 시작 시 랜덤으로 아군 캐릭터 1명이 [폭로] 획득, 1턴간 지속. 랜덤으로 아군 캐릭터 1명이 [코일] 획득, 1턴간 지속. 랜덤으로 캐릭터 1명이 [수액관] 획득, 1턴간 지속.",
    ],
    enemies: [
      {
        id: "enemy_400m_3_1",
        name: "전쟁의 부역자",
        inspiration: "spirit",
        type: "boss",
      },
      {
        id: "enemy_400m_3_2",
        name: "의료 상자",
        inspiration: "intellect",
      },
      {
        id: "enemy_400m_3_3",
        name: "전기 에너지 로봇",
        inspiration: "spirit",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "최대한 자연영감을 제외한, 영혼/지능 영감 캐릭터만 사용하는것이 좋음",
        "쫄몹들은 매턴 리필되는데, 잡으면 회복을 해주거나, 전력을 올려줌. (로봇은 못잡으면 보스에게 전력을 주입함)",
        "보스의 술식이 엄청나게 아픈데, 전투 진입시, 체력이 70/50/30%보다 낮아질 때, 전력이 30스택인 경우, 열정을 모두 채운 경우 발동함",
        "연속으로 술식을 맞으면 대부분 즉사이기때문에, 기절을 걸거나 침묵, 제어(석화)로 술식을 회피해야함",
        "루시, 울리히 등의 전력덱 / 보이저 계시 완전체덱 등으로 공략 가능함. (울리히 명함 1인클도 가능)",
        "의료 상자를 잡으면 체력회복이 잘되서 힐러는 필요없고, 최대한 보스의 술식을 막고 딜 조절하는 것이 중요함.",
      ],
    },
    recommendedTeams: [],
  },
  "400m-4": {
    id: "400m-4",
    floor_type: "흑암층",
    wholeEffect: [
      "상성 피해 계수 40% 증가. 비상성 공격을 받을 시 최종 피해 면역 20% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
    ],
    enemyEffect: ["전투 진입 및 3턴 시작 시마다 행동 횟수 +1"],
    teamEffect: [
      "턴마다 1번째 최중 실식을 시전한 캐릭터가 이후 3턴간 주는 피해 50% 감소",
      "턴 시작 시 아군 캐릭터가 보유한 [산만]이 6스택 이상일 경우 1턴간 [석화] 진입, [산만] 2스택 차감",
    ],
    enemies: [
      {
        id: "enemy_400m_4_1",
        name: "고난 의지체",
        inspiration: "star",
        type: "boss",
      },
    ],
    strategy: {
      overview: "",
      details: [
        "보스에게 [속성감소][상태이상]이 많이 걸려있을 수록 살살 때림. 최대한 많이 걸면서 진행하는 것이 기믹의 핵심",
        "보스는 전투 진입 및 3턴마다 행동을 2번함. 또한 술식이 아닌 공격을 받으면 공격자에게 [산만] 1스택 부여 (산만 스택 관리 안하면 석화 걸림)",
        "거의 매턴, 2턴후에 터지는 폭탄쫄몹 / 3턴후에 터지는 폭탄 쫄몹을 랜덤으로 1개 소환하고, 체력이 50%보다 낮으면 2마리씩 소환함.",
        "폭탄은 턴수가 지나고 폭팔하는데, 체력이 50%이하이면 덜 아프게 때리니 참고",
        "보스는 술식 데미지를 더 받고, 고정피해 감소와 일반 주문 공격 피해 감면버프가 상시 유지인데, 최종술식을 누적 3회 받으면 해제됨",
        "석화 / 봉인 / 유혹 / 열정감소 내성이 부실해서, 제어를 잘 활용하는 것도 중요함",
        "기믹상 주로 술식덱이나, 상태이상 덱으로 깨는 것이 유리하고 청사진은 영혼보스나 야수보스가 유리함",
        "보스가 꽤나 단단해서, 턴수가 늘어져도 딜만 누적시키면 클리어가능",
      ],
    },
    recommendedTeams: [],
  },
  // "410m": {
  //   id: "410m",
  //   floor_type: "무광층",
  //   description: "고급 난이도의 구역으로, 정교한 전략과 팀 구성이 요구됩니다.",
  //   wholeEffect: [
  //     "상성 피해 계수 10% 증가. 비상성 공격을 받을 시 최종 피해 면역 5% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
  //   ],
  //   enemyEffect: ["현실 방어 및 정신 방어 +10%"],
  //   enemies: [
  //     {
  //       id: "enemy_200m_1",
  //       name: "심연의 지배자",
  //       inspiration: "수",
  //       skills: [
  //         {
  //           name: "심연의 물결",
  //           description: "전체 대상에게 150% 피해를 입히고 2턴간 행동 속도를 감소시킵니다.",
  //         },
  //       ],
  //       stats: {
  //         hp: 30000,
  //         atk: 2000,
  //         def: 800,
  //         res: 800,
  //       },
  //     },
  //   ],
  //   strategy: {
  //     overview: "속도 감소 대응과 높은 생존력이 필요한 구역입니다.",
  //     details: [
  //       "속도 감소 해제 능력을 가진 캐릭터가 필수적입니다.",
  //       "지속적인 힐링이 가능한 캐릭터를 포함시키세요.",
  //     ],
  //   },
  //   recommendedTeams: [
  //     {
  //       name: "생존 특화팀",
  //       characters: ["A-나이트", "메이플", "릴리야"],
  //       description: "높은 생존력과 디버프 해제가 가능한 팀 구성입니다.",
  //     },
  //   ],
  // },
};
