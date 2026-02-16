export type RecommendTeamCharacterAlternative = {
  id: number;
  euphoria?: boolean;
  role?: string;
  psycubeId?: number;
};

export type RecommendTeamCharacter = {
  id: number;
  euphoria?: boolean;
  isMain?: boolean;
  role?: string;
  psycubeId?: number;
  alternatives?: RecommendTeamCharacterAlternative[];
};

export type RecommendTeam = {
  name: string;
  description: string[];
  concepts: string[]; // 예: "서포트", "딜러 중심"
  characters: RecommendTeamCharacter[];
};

export const recommendTeams: RecommendTeam[] = [
  {
    name: "모든 덱의 기초",
    description: [
      "조합의 기본 : 딜러 1~2명 + 서폿 1~2명 + 힐러/탱커 1명",
      "특정 컨텐츠를 제외하면, 아래의 컨셉덱이 필수는 아님.",
      "초반에는 1딜+1서폿+1힐로도 충분히 스토리 및 컨텐츠를 즐길 수 있음.",
      "자신만의 덱으로 리버스를 즐겨보기 위한 덱",
      "대체 캐릭터들은 해당 역할에서 범용적으로 쓰이는 캐릭터들임",
      "해당 역할의 캐릭터 아무나 대체 가능",
    ],
    concepts: ["스토리", "커스텀 가능", "뉴비전용"],
    characters: [
      {
        id: 22,
        psycubeId: 42,
        role: "딜러",
        alternatives: [
          { id: 27, role: "딜러", psycubeId: 42 },
          { id: 29, role: "딜러", psycubeId: 40 },
          { id: 35, role: "딜러", psycubeId: 67 },
          { id: 42, role: "딜러", psycubeId: 44 },
          { id: 43, role: "딜러", psycubeId: 58 },
          { id: 45, role: "딜러", psycubeId: 36 },
          { id: 49, role: "딜러", psycubeId: 72 },
        ],
      },
      {
        id: 31,
        psycubeId: 41,
        role: "서폿",
        euphoria: true,
        alternatives: [
          { id: 13, euphoria: true, role: "서폿", psycubeId: 29 },
          { id: 18, role: "서폿", psycubeId: 40 },
          { id: 19, role: "서폿", psycubeId: 9 },
          { id: 24, role: "서폿", psycubeId: 87 },
          { id: 34, role: "서폿", psycubeId: 52 },
          { id: 38, role: "서폿", psycubeId: 4 },
        ],
      },
      {
        id: 30,
        psycubeId: 57,
        alternatives: [
          { id: 46, role: "탱커", psycubeId: 71 },
          { id: 10, role: "탱커", euphoria: true, psycubeId: 38 },
        ],
        role: "탱커",
      },
      {
        id: 26,
        psycubeId: 15,
        alternatives: [
          { id: 4, euphoria: true, role: "힐러", psycubeId: 23 },
          { id: 8, euphoria: true, role: "힐러", psycubeId: 15 },
          { id: 14, euphoria: true, role: "힐러", psycubeId: 55 },
          { id: 36, role: "힐러", psycubeId: 61 },
          { id: 40, role: "힐러", psycubeId: 15 },
        ],
        role: "힐러",
      },
    ],
  },
  {
    name: "머큐리아 승급덱 (단일)",
    description: [
      "3.3 광상을 받은 머큐리아를 메인딜러로 세우는 단일 승급 조합",
      "머큐리아/아르고스/드루비스/빌라 조합으로, 서로의 시너지가 완벽해서 대체제가 딱히 없음",
      "마커스 승급덱이 광역에 강하다면, 머큐리아 승급덱은 단일 스테이지에서 우위",
      "승급 상태에서의 안정적인 딜 사이클과 높은 단일 딜링이 특징",
    ],
    concepts: ["나무", "주문강화", "단일"],
    characters: [
      { id: 31, isMain: true, euphoria: true, role: "딜러", psycubeId: 41 },
      { id: 1, euphoria: true, role: "서폿", psycubeId: 27 },
      { id: 26, euphoria: true, isMain: true, role: "힐러", psycubeId: 15 },
      { id: 34, isMain: true, euphoria: true, role: "서폿", psycubeId: 52 },
    ],
  },
  {
    name: "나무 계시덱",
    description: [
      "노사전을 메인딜러로, 나무 속성 계시 기믹을 활용하는 조합. 종합적으로 현재 가장 좋은 덱",
      "기존 계시덱의 문제점(타게팅, 운영 난이도 등)이 전부 해결된 조합",
      "쉬운 운영 난이도에 비해 성능이 굉장히 좋고, 특히 오토 편의성이 높음",
      "편하고 강력한 조합을 원한다면 강력 추천하는 덱",
      "안안리가 부담스러운 경우 머큐리아로 대체 가능, 둘 다 없다면 알레프나 레굴루스도 무방",
    ],
    concepts: ["즉흥주문", "나무", "계시"],
    characters: [
      { id: 60, isMain: true, role: "딜러" },
      {
        id: 7,
        psycubeId: 32,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
          { id: 44, role: "서폿", psycubeId: 35 },
          { id: 5, euphoria: true, role: "서폿", psycubeId: 71 },
        ],
      },
      { id: 14, role: "서폿", psycubeId: 55, euphoria: true },
      {
        id: 46,
        psycubeId: 71,
        role: "탱커",
        alternatives: [
          { id: 40, role: "힐러", psycubeId: 15 },
          { id: 26, euphoria: true, role: "힐러", psycubeId: 15 },
        ],
      },
    ],
  },
  {
    name: "이고르 술식덱",
    description: [
      "이고르를 메인으로, 로페라와 몰디르의 서포팅으로 술식 딜을 하는 조합",
      "이고르의 포탄 파편 기믹과, 로페라의 연소/총알 부여 시너지가 핵심",
      "몰디르의 열정 보존 및 파편 추가 효과로 이고르의 딜 사이클을 보조",
      "로페라와 몰디르가 고점을 위한 필수 파츠이며, 힐러는 마샤가 가장 적합",
      "짐승 속성 아군 편성 시 궁극기 데미지가 증가하는 시너지를 활용",
    ],
    concepts: ["최종 술식", "야수"],
    characters: [
      { id: 36, isMain: true, role: "서폿", psycubeId: 61 },
      { id: 59, isMain: true, role: "딜러", psycubeId: 91 },
      {
        id: 51,
        psycubeId: 73,
        role: "서폿",
        alternatives: [
          { id: 38, role: "서폿", psycubeId: 4 },
          { id: 12, euphoria: true, role: "서폿", psycubeId: 33 },
        ],
      },
      {
        id: 58,
        psycubeId: 89,
        role: "힐러",
        alternatives: [
          { id: 40, role: "힐러", psycubeId: 15 },
          { id: 8, euphoria: true, role: "힐러", psycubeId: 15 },
        ],
      },
    ],
  },
  {
    name: "브룸 메인딜 전력덱",
    description: [
      "브룸을 메인딜러로 채용하는 전력덱. 현시점 수동 조작 기준 가장 센 조합 중 하나",
      "울리히 조합은 사용 난이도와 피로도가 낮아 일반 컨텐츠에 추천",
      "안조 계약자 조합(브룸/안조/파투투/카론)은 고점이 훨씬 높지만 레이드 같은 컨텐츠에 적합",
      "빗속의 공상이든 레이드든 가리지 않고 잘 쓰이며, 오토/딸깍 편의성은 전력덱 특성상 낮은 편",
      "파투투 자리는 키페리나/마샤/빌라 등으로 대체 가능",
    ],
    concepts: ["전력", "술진", "연소"],
    characters: [
      {
        id: 40,
        psycubeId: 15,
        role: "힐러",
        alternatives: [
          { id: 21, euphoria: true, role: "서폿", psycubeId: 57 },
          { id: 8, euphoria: true, role: "힐러", psycubeId: 15 },
          { id: 26, euphoria: true, role: "힐러", psycubeId: 15 },
          { id: 54, role: "힐러", psycubeId: 82 },
        ],
      },
      {
        id: 53,
        psycubeId: 77,
        role: "서폿",
        isMain: true,
      },
      { id: 57, isMain: true, euphoria: true, role: "딜러", psycubeId: 40 },
      {
        id: 35,
        psycubeId: 67,
        euphoria: true,
        isMain: true,
        role: "딜러",
      },
    ],
  },
  {
    name: "브룸-코르부스 전력덱",
    description: [
      "코르부스를 메인딜로 사용하고, 브룸을 서포터로 사용하는 조합",
      "앞서 소개한 브룸 메인딜보다는 체급이 낮고, 빠른 코르수브 사이클을 굴리려면 운도 필요한 조합",
      "튜닝은 끝없는 튜닝을 추천히고 일반적인 전력덱처럼 술진을 1-1-3-3으로 유지되게 사용",
      "많은 분석가들이, 코르부스 메인딜보다는 브룸을 메인딜러로 채용하는 것을 추천해, 추천은 개인차가 있음",
    ],
    concepts: ["전력", "술진", "연소"],
    characters: [
      { id: 55, isMain: true, euphoria: true, role: "딜러", psycubeId: 40 },
      { id: 57, isMain: true, role: "서폿", psycubeId: 40 },
      {
        id: 53,
        psycubeId: 77,
        role: "서폿",
        alternatives: [
          { id: 38, role: "서폿", psycubeId: 4 },
          { id: 12, euphoria: true, role: "서폿", psycubeId: 33 },
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
        ],
      },
      {
        id: 26,
        psycubeId: 15,
        euphoria: true,
        role: "힐러",
        alternatives: [
          { id: 21, euphoria: true, role: "서폿", psycubeId: 57 },
          { id: 8, euphoria: true, role: "힐러", psycubeId: 15 },
          { id: 40, role: "힐러", psycubeId: 15 },
          { id: 54, role: "힐러", psycubeId: 82 },
        ],
      },
    ],
  },
  {
    name: "베릴 여광덱",
    description: [
      "베릴을 메인으로 하는 여광(잔광) 조합. 현딜러 3대장(브룸, 베릴, 노사전) 중 하나",
      "상대에게 부여된 연소와 빗무리에 비례한 여광 스택을 쌓아 딜을 하는 구조",
      "마샤 합류 이후 고점과 턴 속도가 크게 향상되어 빗속의 공상, 레이드 전부 잘 사용 중",
      "마샤 유무에 따른 성능 차이가 매우 크므로 웬만하면 마샤 사용 추천",
      "유일한 단점이었던 안정성 문제도 마샤가 어느 정도 보완해주어 어떤 상황이든 무난하게 사용 가능",
    ],
    concepts: ["여광", "연소", "추가공격"],
    characters: [
      { id: 56, isMain: true, euphoria: true, role: "딜러", psycubeId: 85 },
      { id: 24, isMain: true, euphoria: true, role: "서폿", psycubeId: 87 },
      {
        id: 38,
        psycubeId: 4,
        role: "서폿",
        alternatives: [{ id: 31, role: "서폿", euphoria: true, psycubeId: 41 }],
      },
      {
        id: 58,
        psycubeId: 89,
        role: "힐러",
        alternatives: [
          { id: 46, role: "탱커", psycubeId: 71 },
          { id: 40, role: "힐러", psycubeId: 15 },
        ],
      },
    ],
  },
  {
    name: "코르부스 전력덱",
    description: [
      "코르부스와, 카론 전력 키워드를 메인으로 하는 조합",
      "[요동치는 전기장]이라는 술진을 강화시키며, 전기장 3레벨에 폭딜을 넣는 구조",
      "레이드 추가 이후 코르부스의 장점이 굉장히 뚜렷해짐. 코르부스 접대 레이드 한정 명함 기준 3천만 점이 가능한 유일한 캐릭터",
      "울리히 자리는 플러터 페이지로 대체 가능하며, 고점 자체는 플러터 페이지가 더 높음",
      "파투투 자리에는 키페리나, 마샤, 빌라 등으로 대체 가능",
    ],
    concepts: ["전력", "술진", "단일"],
    characters: [
      {
        id: 40,
        psycubeId: 15,
        role: "힐러",
        alternatives: [
          { id: 8, euphoria: true, role: "힐러", psycubeId: 15 },
          { id: 21, role: "서폿", psycubeId: 57, euphoria: true },
          { id: 54, role: "힐러", psycubeId: 82 },
        ],
      },
      { id: 55, isMain: true, euphoria: true, role: "딜러", psycubeId: 40 },
      {
        id: 53,
        psycubeId: 77,
        role: "서폿",
        isMain: true,
      },
      {
        id: 50,
        role: "서폿",
        psycubeId: 40,
        alternatives: [
          { id: 38, role: "서폿", psycubeId: 4 },
          { id: 12, euphoria: true, role: "서폿", psycubeId: 33 },
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
        ],
      },
    ],
  },
  {
    name: "노티카 신혈덱",
    description: [
      "노티카를 메인으로 한 [신혈]기믹을 사용하는 자해조합",
      "노티카와 광상 제멜바이스 & 센티널을 채용하여 자해를 쌓아 딜을 하는 조합",
      "힐러는 루부스카가 압도적으로 좋고, 파투투나 광상 메디슨 포켓도 사용가능",
      "3.1 기준 루부스카의 합류로 압도적인 체급으로 부동의 0티어 조합",
      "제멜바이스의 술진으로 로페라 등의 술진 서포터와는 쓰기 힘듦",
    ],
    concepts: ["신혈", "자해"],
    characters: [
      { id: 49, isMain: true, role: "딜러", psycubeId: 72 },
      {
        id: 52,
        psycubeId: 76,
        role: "서폿",
        alternatives: [
          { id: 38, role: "서폿", psycubeId: 4 },
          { id: 9, euphoria: true, role: "서폿", psycubeId: 57 },
        ],
      },
      { id: 28, euphoria: true, isMain: true, role: "서폿", psycubeId: 61 },
      {
        id: 54,
        psycubeId: 82,
        role: "힐러",
        alternatives: [
          { id: 21, euphoria: true, role: "서폿", psycubeId: 57 },
          { id: 8, euphoria: true, role: "힐러", psycubeId: 15 },
          { id: 40, role: "힐러", psycubeId: 15 },
        ],
      },
    ],
  },
  {
    name: "루시 전력덱",
    description: [
      "광상 루시와, 울리히의 전력 키워드를 메인으로 하는 조합",
      "[요동치는 전기장]이라는 술진을 강화시키며, 전기장 3레벨을 활용하여 극딜하는 조합",
      "레이드가 주 컨텐츠로 변경되면서 루시가 어느 정도 타격을 입었으나, 기본 상성 피해 계수가 높은 빗속의 공상에서는 여전히 현역",
      "코르부스, 브룸이 단일 딜러이다 보니 광역 스테이지에서는 여전히 루시를 잘 사용함",
      "울리히 자리는 플러터 페이지, 멜라니아, 머큐리아로 대체 가능",
    ],
    concepts: ["전력", "술진", "광역"],
    characters: [
      {
        id: 21,
        psycubeId: 57,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 8, euphoria: true, role: "힐러", psycubeId: 15 },
          { id: 40, role: "힐러", psycubeId: 15 },
          { id: 54, role: "힐러", psycubeId: 82 },
        ],
      },
      { id: 29, isMain: true, euphoria: true, role: "딜러", psycubeId: 40 },
      { id: 50, isMain: true, role: "서폿", psycubeId: 40 },
      {
        id: 53,
        psycubeId: 77,
        role: "서폿",
        alternatives: [
          { id: 38, role: "서폿", psycubeId: 4 },
          { id: 12, euphoria: true, role: "서폿", psycubeId: 33 },
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
        ],
      },
    ],
  },
  {
    name: "천체 계시덱",
    description: [
      "계시로 즉흥주문을 강화시키며, 딜을 하는 조합",
      "계시는 신기한 빛 소모로 증가시키며, 주로 신빛 캐릭터들 위주로 구성",
      "투스 페어리를 받은 천체 계시덱도 단일 기준 굉장히 강력해짐",
      "적 상성에 따라서 충분히 선택 가능한 수준이나, 즉흥주문 타게팅 편의성 문제가 발목을 잡음",
      "즉흥주문 타게팅이 필요한 경우 투스 페어리 대신 레굴루스나 보이저를 사용",
    ],
    concepts: ["즉흥주문"],
    characters: [
      { id: 39, isMain: true, role: "딜러", psycubeId: 4 },
      { id: 44, isMain: true, role: "서폿", psycubeId: 35 },
      {
        id: 14,
        psycubeId: 55,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 5, euphoria: true, role: "서폿", psycubeId: 71 },
          { id: 11, euphoria: true, role: "서폿", psycubeId: 71 },
        ],
      },
      {
        id: 46,
        psycubeId: 71,
        role: "탱커",
        alternatives: [{ id: 40, role: "힐러", psycubeId: 15 }],
      },
    ],
  },
  {
    name: "중독덱",
    description: [
      "중독을 중첩시키고, 독성저주로 변환하며 결산하여 딜을 하는 조합",
      "중독결산 방지와, 안정적인 유지력을 바탕으로 순간폭딜이 가능",
      "튜즈데이 술진으로 다른 술진 캐릭터와 쓰기 힘들고, 특정 캐릭터들의 조합이 강제됨",
      "운영하기는 힘들지만, 그만큼 엄청난 버스트 딜과, 유지력을 가짐",
      "상태이상 면역 상대에게는 사용하기 힘듦",
    ],
    concepts: ["중독", "고정딜"],
    characters: [
      { id: 37, isMain: true, euphoria: true, role: "딜러", psycubeId: 23 },
      { id: 33, isMain: true, role: "딜러", psycubeId: 6 },
      {
        id: 4,
        euphoria: true,
        role: "힐러",
        alternatives: [{ id: 30, role: "탱커", psycubeId: 57 }],
        psycubeId: 23,
      },
      {
        id: 15,
        psycubeId: 18,
        euphoria: true,
        role: "서폿",
      },
    ],
  },
  {
    name: "이터니티 신혈덱",
    description: [
      "이터니티를 메인으로 한 [신혈]기믹을 사용하는 자해조합",
      "노티카 신혈덱에서, 노티카만 이터니티로 변경.",
      "이터니티 2번째 광상이 필수적으로 필요하지만, 덱파워는 노티카의 하위호환",
      "제멜바이스의 술진으로 로페라 등의 술진 서포터와는 쓰기 힘듦",
    ],
    concepts: ["신혈", "자해"],
    characters: [
      { id: 9, euphoria: true, isMain: true, role: "딜러", psycubeId: 57 },
      {
        id: 52,
        psycubeId: 76,
        role: "서폿",
        alternatives: [{ id: 38, role: "서폿", psycubeId: 4 }],
      },
      { id: 28, euphoria: true, role: "서폿", psycubeId: 61 },
      {
        id: 54,
        psycubeId: 82,
        role: "힐러",
        alternatives: [
          { id: 21, euphoria: true, role: "서폿", psycubeId: 57 },
          { id: 8, euphoria: true, role: "힐러", psycubeId: 15 },
          { id: 40, role: "힐러", psycubeId: 15 },
        ],
      },
    ],
  },
  {
    name: "추공 에지오덱",
    description: [
      "에지오의 추가공격 관련 무기(베네치아 파르지온 + 채널드 친퀘데아)를 사용하여 활용하는 덱",
      "주력딜은 에지오의 2스킬 반격 추공을 최대한 많이 하는 것",
      "에지오 위주로 스킬을 굴리고, 카산드라는 사이클에 맞춰 카드를 쓰면 됨.",
      "플러터 페이지의 버프와 파투투의 유지력과 버프와 꽤나 궁합이 잘맞음.",
      "카산드라 특성은 302를 사용함.",
    ],
    concepts: ["추가 공격", "암살"],
    characters: [
      { id: 47, isMain: true, role: "딜러", psycubeId: 79 },
      { id: 48, isMain: true, role: "서폿", psycubeId: 80 },
      {
        id: 40,
        psycubeId: 15,
        role: "힐러",
        alternatives: [
          { id: 46, role: "탱커", psycubeId: 71 },
          { id: 26, euphoria: true, role: "힐러", psycubeId: 15 },
        ],
      },
      {
        id: 38,
        psycubeId: 4,
        role: "서폿",
        alternatives: [
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
          { id: 18, role: "서폿", psycubeId: 40 },
        ],
      },
    ],
  },
  {
    name: "술식 에지오덱",
    description: [
      "에지오의 술식 관련 무기(콘도티에로 전쟁 망치 + 채널드 친퀘데아)를 사용하여 활용하는 덱",
      "덱의 핵심은 광상 갈천과 에지오 + 카산드라 술식의 현실 피해",
      "카산드라의 술식을 최대한 많이 굴리면서 사이클을 굴려야함. (광상 갈천이 있어야 완전체)",
      "카산드라 특성은 203를 사용함.",
    ],
    concepts: ["술식", "암살"],
    characters: [
      { id: 47, isMain: true, role: "딜러", psycubeId: 79 },
      { id: 48, isMain: true, role: "서폿", psycubeId: 80 },
      {
        id: 23,
        psycubeId: 40,
        role: "서폿",
        euphoria: true,
        alternatives: [
          { id: 12, euphoria: true, role: "서폿", psycubeId: 33 },
          { id: 45, role: "딜러", psycubeId: 36 },
        ],
      },
      {
        id: 8,
        psycubeId: 15,
        euphoria: true,
        role: "서폿",
        alternatives: [{ id: 26, euphoria: true, role: "힐러", psycubeId: 15 }],
      },
    ],
  },
  {
    name: "중독 에지오덱",
    description: [
      "에지오의 중독 관련 무기(선장의 검)를 사용하여 활용하는 덱",
      "중독 유지를 위해, 튜즈데이는 필수로 기용해야함.",
      "에지오의 중독 관련 능력이 엄청 뛰어나서 높은 포텐셜이 있고, 주로 단일 적에게 사용됨 (ex. 레이드)",
      "나머지 2자리는 힐러나 탱커, 미행동 중독 캐릭터로 구성하면됨",
      "양월이나 플러터페이지를 활용해서 서포팅하는 덱도 가능",
    ],
    concepts: ["중독", "고정딜"],
    characters: [
      { id: 47, isMain: true, role: "딜러", psycubeId: 79 },
      { id: 33, isMain: true, role: "서폿", psycubeId: 6 },
      {
        id: 4,
        psycubeId: 23,
        euphoria: true,
        role: "힐러",
        alternatives: [{ id: 26, euphoria: true, role: "힐러", psycubeId: 15 }],
      },
      {
        id: 38,
        psycubeId: 4,
        role: "서폿",
        alternatives: [
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
          { id: 37, role: "서폿", euphoria: true, psycubeId: 23 },
          { id: 41, role: "서폿", psycubeId: 43 },
          { id: 15, euphoria: true, role: "서폿", psycubeId: 18 },
        ],
      },
    ],
  },
  {
    name: "마커스 승급덱 (광역)",
    description: [
      "광상 마커스를 메인으로, 주문 강화를 통해 높은 성급 주문으로 딜을 하는 조합",
      "광역 스테이지의 경우 마커스/아르고스/머큐리아/빌라 조합을 사용 (머큐리아 대신 드루비스도 가능)",
      "단일 기준으로는 머큐리아에게 밀리지만, 나무 상성 접대나 광역 스테이지에서는 마커스가 훨씬 유리",
      "레이드는 접대 구간이 없어서 쓰기 힘들지만 빗속의 공상에서는 여전히 현역",
    ],
    concepts: ["나무", "주문강화", "광역"],
    characters: [
      { id: 25, isMain: true, euphoria: true, role: "딜러", psycubeId: 7 },
      {
        id: 1,
        psycubeId: 27,
        role: "서폿",
        euphoria: true,
        alternatives: [
          { id: 30, role: "탱커", psycubeId: 57 },
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
          { id: 7, euphoria: true, role: "서폿", psycubeId: 32 },
          { id: 45, role: "딜러", psycubeId: 36 },
        ],
      },
      {
        id: 26,
        psycubeId: 15,
        isMain: true,
        euphoria: true,
        role: "힐러",
      },
      {
        id: 34,
        psycubeId: 52,
        role: "서폿",
        euphoria: true,
        alternatives: [{ id: 36, role: "서폿", psycubeId: 61 }],
      },
    ],
  },
  {
    name: "센츄리온 덱",
    description: [
      "광상 센츄리온과 광상 갈천을 메인으로 하는 현실 공격 조합",
      "적은 행동으로 술진과 현실피해 버프를 주는 갈천과, 센츄리온의 깡딜의 조합이 좋음",
      "멜라니아의 열정 저장 및 술식 딜증 버프가 좋아서 궁합이 좋음",
      "특별히 복잡한 기믹은 없지만, 센츄리온의 좋은 계수와 갈천의 서포팅으로 준수한 성능",
    ],
    concepts: ["현실피해", "야수"],
    characters: [
      { id: 6, euphoria: true, isMain: true, role: "딜러", psycubeId: 27 },
      { id: 23, euphoria: true, isMain: true, role: "서폿", psycubeId: 40 },
      {
        id: 12,
        psycubeId: 33,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
          { id: 34, role: "서폿", psycubeId: 52 },
          { id: 50, role: "서폿", psycubeId: 40 },
          { id: 51, role: "서폿", psycubeId: 73 },
        ],
      },
      {
        id: 8,
        psycubeId: 15,
        euphoria: true,
        role: "힐러",
        alternatives: [
          { id: 30, role: "탱커", psycubeId: 57 },
          { id: 46, role: "탱커", psycubeId: 71 },
          { id: 36, role: "서폿", psycubeId: 61 },
        ],
      },
    ],
  },
  {
    name: "히사베스 술식덱",
    description: [
      "히사베스를 메인으로, 고정 피해와 지속 피해 위주로 딜링하는 조합",
      "히사베스의 특수주문 '쉿!'을 활용하여, 열정수급과 지속 딜링을 가능하게 해줌 (최종술식 판정)",
      "적은 행동으로 매턴 최종술식 난사가 쉬우며, 난이도에 비해 덱파워가 높음",
      "석화기믹을 가지고 있어 나무덱과 조합도 가능하고, 유연하게 서폿을 바꿔가며 운용 가능",
      "빌라의 버프를 잘받아서, 자주 채용하는 모습을 보여줌.",
    ],
    concepts: ["최종 술식", "나무"],
    characters: [
      { id: 45, isMain: true, role: "딜러", psycubeId: 36 },
      {
        id: 127,
        psycubeId: 38,
        role: "서폿",
        alternatives: [
          { id: 1, euphoria: true, role: "서폿", psycubeId: 27 },
          { id: 34, role: "서폿", psycubeId: 52 },
        ],
      },
      { id: 12, euphoria: true, role: "서폿", psycubeId: 33 },
      {
        id: 26,
        euphoria: true,
        role: "힐러",
        alternatives: [{ id: 30, role: "탱커", psycubeId: 57 }],
        psycubeId: 15,
      },
    ],
  },
  {
    name: "레콜레타 술식덱",
    description: [
      "레콜레타를 메인으로, 광상멜라니아와 함께 술식 위주로 딜링하는 조합",
      "여러번의 최종술식을 사용할 수 있는 능력과 레콜레타의 체급으로 엄청난 체급을 가짐",
      "최종술식을 사용하기 힘든 스테이지에서는 사용이 힘듦",
      "광상피클즈의 버프로 인해 한층 더 강력해지며, 2.6 기준 말이 안되는 덱파워를 가짐",
    ],
    concepts: ["암석", "최종 술식"],
    characters: [
      {
        id: 36,
        role: "서폿",
        alternatives: [{ id: 8, euphoria: true, role: "힐러", psycubeId: 15 }],
        psycubeId: 61,
      },
      { id: 43, isMain: true, role: "딜러", psycubeId: 58 },
      {
        id: 51,
        psycubeId: 73,
        role: "서폿",
        isMain: true,
        alternatives: [
          { id: 127, role: "서폿", psycubeId: 38 },
          { id: 13, euphoria: true, role: "서폿", psycubeId: 29 },
        ],
      },
      { id: 12, euphoria: true, role: "서폿", psycubeId: 33 },
    ],
  },
  {
    name: "누아르 술식덱",
    description: [
      "누아르를 메인으로 상태이상을 곁들인 술식 조합",
      "상태이상에 따라 덱파워가 달라지고, 면역을 가진 상대에겐 취약",
      "아직 제대로된 상태이상 서포터가 없어서 미완성된 덱",
      "누아르 술식의 연속발동에 따라 딜의 편차가 심한편",
      "상태이상 관련 기믹이 필요한 스테이지에서 미친 활용도를 보여줌 (400m-4)",
    ],
    concepts: ["나무", "최종 술식", "상태이상"],
    characters: [
      {
        id: 36,
        role: "힐러",
        alternatives: [{ id: 26, euphoria: true, role: "힐러", psycubeId: 15 }],
        psycubeId: 61,
      },
      { id: 42, isMain: true, role: "딜러", psycubeId: 44 },
      { id: 12, euphoria: true, role: "서폿", psycubeId: 33 },
      {
        id: 7,
        psycubeId: 32,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 1, euphoria: true, psycubeId: 27 },
          { id: 127, role: "서폿", psycubeId: 38 },
        ],
      },
    ],
  },
  {
    name: "양월 추공덱",
    description: [
      "양월을 메인으로 사용하는 추공조합. 광상 이후 체급이 크게 향상됨",
      "양월/6/플러터 페이지/파투투 조합을 보편적으로 사용",
      "3.4 후반 정화광 합류 시 플러터 페이지 대신 채용 예정으로, 티어덱 반열 가능성 있음",
      "초반 예열 문제와 기존 불편한 점이 완전히 해결된 건 아니라서 정화광의 보완 정도가 관건",
      "6 대신 머큐리아를 넣어도 좋고, 파투투로 생존이 어려우면 키페리나/마샤로 대체 가능",
    ],
    concepts: ["추공"],
    characters: [
      { id: 41, isMain: true, role: "딜러", euphoria: true, psycubeId: 43 },
      {
        id: 61,
        psycubeId: 9,
        role: "서폿",
        alternatives: [
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
          { id: 19, role: "서폿", euphoria: true, psycubeId: 9 },
        ],
      },
      {
        id: 38,
        psycubeId: 4,
        role: "서폿",
      },
      {
        id: 40,
        psycubeId: 15,
        role: "힐러",
        alternatives: [
          { id: 46, role: "탱커", psycubeId: 71 },
          { id: 58, role: "힐러", psycubeId: 89 },
        ],
      },
    ],
  },
  {
    name: "안조 추공덱",
    description: [
      "안조를 메인으로, 키페리나/플러터 페이지/파투투와 함께하는 추공 조합",
      "범용성 좋은 캐릭터들을 싹 다 가져다 쓰는 조합이라 빗공보다는 레이드처럼 한 파티에 집중하는 곳에서 빛을 발함",
      "안조 접대 레이드에서 천만 점이 가능할 정도로 강력",
      "갈라보나 투딜러 체제(안조/갈라보나/플러터 페이지/빌라)도 가능하나, 안조 메인으로도 충분",
      "특정 캐릭터를 요구하지 않고 자유로운 조합이 가능",
    ],
    concepts: ["추공", "안조 계약"],
    characters: [
      { id: 35, isMain: true, role: "딜러", psycubeId: 67 },
      {
        id: 46,
        psycubeId: 71,
        role: "서폿",
        alternatives: [{ id: 31, role: "서폿", euphoria: true, psycubeId: 41 }],
      },
      { id: 38, role: "서폿", psycubeId: 4 },
      {
        id: 40,
        psycubeId: 15,
        role: "힐러",
        alternatives: [
          { id: 26, euphoria: true, role: "힐러", psycubeId: 15 },
          { id: 58, role: "힐러", psycubeId: 89 },
        ],
      },
    ],
  },
  {
    name: "안조 술식덱",
    description: [
      "안조를 메인으로, 야수/나무 계약을 하는 술식 조합",
      "안조 추공덱보다는 파워가 떨어지지만, 그래도 강한 파워를 가짐",
      "주로 특정 스테이지에서만 사용됨",
    ],
    concepts: ["최종 술식", "안조 계약", "비주류"],
    characters: [
      {
        id: 36,
        role: "힐러",
        alternatives: [{ id: 40, role: "힐러", psycubeId: 15 }],
        psycubeId: 61,
      },
      { id: 35, isMain: true, role: "딜러", psycubeId: 67 },
      {
        id: 51,
        psycubeId: 73,
        role: "서폿",
        alternatives: [
          { id: 17, euphoria: true, role: "서폿", psycubeId: 56 },
          { id: 42, euphoria: true, role: "서폿", psycubeId: 44 },
          { id: 107, euphoria: true, role: "서폿", psycubeId: 33 },
        ],
      },
      {
        id: 12,
        isMain: true,
        role: "서폿",
        alternatives: [{ id: 127, role: "서폿", psycubeId: 38 }],
        psycubeId: 33,
      },
    ],
  },
  {
    name: "곡랑 추공덱",
    description: [
      "곡랑을 메인으로, 피클즈와 함께하는 추공 조합",
      "피클즈의 의존도가 높으며, 양월 추공덱과 서포터가 겹침",
      "피클즈의 디스펠과, 곡랑의 폭딜로 암석 조합의 한축을 담당",
      "어렵지 않은 난이도와 행동력이 여유로워서 운용이 편함",
    ],
    concepts: ["추공", "암석"],
    characters: [
      { id: 22, isMain: true, euphoria: true, role: "딜러", psycubeId: 42 },
      { id: 13, isMain: true, euphoria: true, role: "서폿", psycubeId: 29 },
      {
        id: 38,
        role: "서폿",
        alternatives: [{ id: 18, role: "서폿", psycubeId: 40 }],
        psycubeId: 4,
      },
      {
        id: 40,
        role: "힐러",
        alternatives: [{ id: 36, role: "힐러", psycubeId: 61 }],
        psycubeId: 15,
      },
    ],
  },
  {
    name: "37 추공덱",
    description: [
      "37을 메인으로, 다양한 추공 캐릭터들을 채운 조합",
      "단순히 추가공격을 많이 하며, 37의 추가산식으로 딜링을 함",
      "다른 추공딜러에 비해 엄청 좋은건 아니지만, 아쉽지도 않은 덱파워",
    ],
    concepts: ["추공", "고정딜", "비주류"],
    characters: [
      { id: 18, isMain: true, role: "딜러", psycubeId: 40 },
      { id: 38, role: "서폿", psycubeId: 4 },
      {
        id: 46,
        role: "탱커",
        alternatives: [{ id: 40, role: "힐러", psycubeId: 15 }],
        psycubeId: 71,
      },
      {
        id: 36,
        role: "힐러",
        alternatives: [{ id: 31, role: "서폿", euphoria: true, psycubeId: 41 }],
        psycubeId: 61,
      },
    ],
  },
  {
    name: "제시카 석화덱",
    description: [
      "제시카 석화광상과, 광상 드루비스를 필두로 석화 제어 위주 조합",
      "면역인 스테이지에서는 사용하기가 힘듦",
      "상태이상 서포터나, 좀 더 지원을 받아야 메타에 맞을 수 있음",
    ],
    concepts: ["석화", "상태이상", "나무", "비주류"],
    characters: [
      { id: 15, euphoria: true, isMain: true, role: "딜러", psycubeId: 18 },
      { id: 1, euphoria: true, isMain: true, role: "서폿", psycubeId: 27 },
      {
        id: 4,
        euphoria: true,
        role: "힐러",
        alternatives: [{ id: 30, role: "탱커", psycubeId: 57 }],
        psycubeId: 23,
      },
      {
        id: 7,
        psycubeId: 32,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 34, role: "서폿", psycubeId: 52 },
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
        ],
      },
    ],
  },
  {
    name: "윈드송덱",
    description: [
      "윈드송을 메인으로, 머신건으로 폭딜을 넣는 조합",
      "윈드송의 최종술식 머신건과, 여러 좋은 서포터를 넣어 리버스 최고의 고점이 가능",
      "머신건의 운영난이도가 힘들지만, 그만큼 리턴이 확실한 편",
      "레이드 점수 최고점 이외에는, 무난한 천체 딜러로 운영 가능",
    ],
    concepts: ["추공"],
    characters: [
      { id: 27, isMain: true, role: "딜러", psycubeId: 42 },
      { id: 38, role: "서폿", psycubeId: 4 },
      {
        id: 26,
        euphoria: true,
        role: "힐러",
        alternatives: [{ id: 30, role: "탱커", psycubeId: 57 }],
        psycubeId: 15,
      },
      { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
    ],
  },
  {
    name: "릴리아 추공덱",
    description: [
      "광상 릴리아를 메인으로 하는 추공 조합",
      "광상 릴리아의 추공을 계속 넣으면서, 릴리아의 최종술식으로 서브딜을 하는 조합",
      "릴리아는 탄환광상이 아닌 추공광상이 필요함",
      "다른 추공덱에 비해 딱히 이점은 없어서 메타덱에는 밀려남",
    ],
    concepts: ["추공", "비주류"],
    characters: [
      { id: 2, euphoria: true, isMain: true, role: "딜러", psycubeId: 42 },
      { id: 38, role: "서폿", psycubeId: 4 },
      {
        id: 40,
        role: "힐러",
        alternatives: [{ id: 46, role: "탱커", psycubeId: 71 }],
        psycubeId: 15,
      },
      {
        id: 18,
        psycubeId: 40,
        role: "서폿",
        alternatives: [
          { id: 31, role: "서폿", euphoria: true, psycubeId: 41 },
          { id: 36, role: "힐러", psycubeId: 61 },
        ],
      },
    ],
  },
  {
    name: "제멜 자해덱",
    description: [
      "제멜을 메인으로, 광상 이터니티, 피클즈의 서포팅으로 좋은 체급을 보여주는 조합",
      "제멜은 광상이 필수가 아니며, 준수한 솔로딜을 보여줌",
      "준수한 체급과, 생존력을 바탕으로 특정 스테이지에서 유용하게 사용됨",
    ],
    concepts: ["자해", "암석", "비주류"],
    characters: [
      { id: 28, isMain: true, role: "딜러", psycubeId: 61 },
      {
        id: 13,
        psycubeId: 29,
        euphoria: true,
        alternatives: [{ id: 10, euphoria: true, role: "서폿", psycubeId: 38 }],
        role: "서폿",
      },
      { id: 9, euphoria: true, isMain: true, role: "서폿", psycubeId: 57 },
      {
        id: 21,
        psycubeId: 57,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 8, euphoria: true, role: "힐러", psycubeId: 15 },
          { id: 40, role: "힐러", psycubeId: 15 },
        ],
      },
    ],
  },
  {
    name: "J 반격덱",
    description: [
      "J와 뉴바벨의 반격을 통해 딜을 하는 조합",
      "J와 뉴바벨의 보호막으로 높은 안정성으로 반격딜 위주로 딜을 함",
      "정화가 있는 파투투 등의 힐러는 기용이 힘든 모습을 보여줌",
      "고점이 높은편은 아니기에 특정 스테이지에서 채용됨.",
      "반격에 의존된 덱파워로, 상대의 공격이 많은 곳에서 좋은 덱파워를 보여줌",
    ],
    concepts: ["추공", "반격", "연소", "비주류"],
    characters: [
      { id: 32, isMain: true, role: "딜러", psycubeId: 62 },
      { id: 10, euphoria: true, isMain: true, role: "탱커", psycubeId: 38 },
      {
        id: 38,
        psycubeId: 4,
        role: "서폿",
        alternatives: [
          { id: 18, role: "서폿", psycubeId: 40 },
          { id: 24, role: "서폿", psycubeId: 87 },
        ],
      },
      {
        id: 36,
        role: "힐러",
        alternatives: [{ id: 8, euphoria: true, role: "힐러", psycubeId: 15 }],
        psycubeId: 61,
      },
    ],
  },
  {
    name: "연소 술식덱",
    description: [
      "스파토데아와 이졸데의 연소를 메인으로, 연소를 쌓아 술식딜을 하는 조합",
      "이미 잊혀져버린 연소 시너지와, 현 메타에 너무 밀리는 스파토데아의 체급",
      "추가 지원 및 광상이 없다면, 예능용으로 주로 사용",
    ],
    concepts: ["연소", "최종 술식", "비주류"],
    characters: [
      {
        id: 36,
        role: "힐러",
        alternatives: [{ id: 8, euphoria: true, role: "힐러", psycubeId: 15 }],
        psycubeId: 61,
      },
      { id: 20, isMain: true, role: "딜러", psycubeId: 33 },
      { id: 24, isMain: true, role: "서폿", psycubeId: 87 },
      {
        id: 12,
        euphoria: true,
        role: "서폿",
        alternatives: [{ id: 127, role: "서폿", psycubeId: 38 }],
        psycubeId: 33,
      },
    ],
  },
];
