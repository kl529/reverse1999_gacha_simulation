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
  // "110m": {
  //   id: "110m",
  //   floor_type: "약광층",
  //   wholeEffect: [
  //     "상성 피해 계수 20% 증가. 비상성 공격을 받을 시 최종 피해 면역 10% 증가. 15턴을 넘길 시 몬스터가 광폭 상태 진입",
  //   ],
  //   teamEffect: ["3턴 시마다 열정이 5보다 낮은 캐릭터 열정 -1"],
  //   enemies: [
  //     {
  //       id: "enemy_110m_1",
  //       name: "무라비",
  //       inspiration: "beast",
  //     },
  //   ],
  //   strategy: {
  //     overview: "",
  //     details: [],
  //   },
  //   recommendedTeams: [],
  // },
  // "210m": {
  //   id: "210m",
  //   floor_type: "미광층",
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
  // "310m": {
  //   id: "310m",
  //   floor_type: "흑암층",
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
