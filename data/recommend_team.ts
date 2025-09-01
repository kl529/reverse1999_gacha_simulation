export type RecommendTeamCharacterAlternative = {
  id: number;
  euphoria?: boolean;
  role?: string;
};

export type RecommendTeamCharacter = {
  id: number;
  euphoria?: boolean;
  isMain?: boolean;
  role?: string;
  alternatives?: RecommendTeamCharacterAlternative[];
};

export type RecommendTeam = {
  name: string;
  description: string[];
  concepts: string[]; // 예: "서포트", "딜러 중심"
  characters: RecommendTeamCharacter[];
};

// 나중에 몰디르 추가하기
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
        role: "딜러",
        alternatives: [
          { id: 27, role: "딜러" },
          { id: 29, role: "딜러" },
          { id: 35, role: "딜러" },
          { id: 42, role: "딜러" },
          { id: 43, role: "딜러" },
          { id: 45, role: "딜러" },
          { id: 49, role: "딜러" },
        ],
      },
      {
        id: 31,
        role: "서폿",
        alternatives: [
          { id: 13, euphoria: true, role: "서폿" },
          { id: 18, role: "서폿" },
          { id: 19, role: "서폿" },
          { id: 24, role: "서폿" },
          { id: 34, role: "서폿" },
          { id: 38, role: "서폿" },
        ],
      },
      {
        id: 30,
        alternatives: [
          { id: 46, role: "탱커" },
          { id: 10, role: "탱커", euphoria: true },
        ],
        role: "탱커",
      },
      {
        id: 26,
        alternatives: [
          { id: 4, euphoria: true, role: "힐러" },
          { id: 8, euphoria: true, role: "힐러" },
          { id: 14, role: "힐러" },
          { id: 36, role: "힐러" },
          { id: 40, role: "힐러" },
        ],
        role: "힐러",
      },
    ],
  },
  {
    name: "계시덱",
    description: [
      "계시로 즉흥주문을 강화시키며, 딜을 하는 조합",
      "계시는 신기한 빛 소모로 증가시키며, 주로 신빛 캐릭터들 위주로 구성",
      "리롤 튜닝의 의존도와 계시 카드 운빨이 존재",
      "모든 단점을 상쇄할만한 높은 저점과 고점",
      "특정 캐릭터들의 조합이 강제됨",
    ],
    concepts: ["즉흥주문"],
    characters: [
      { id: 39, isMain: true, role: "딜러" },
      { id: 44, isMain: true, role: "서폿" },
      { id: 46, alternatives: [{ id: 40, role: "힐러" }], role: "탱커" },
      {
        id: 11,
        euphoria: true,
        alternatives: [
          { id: 5, euphoria: true, role: "서폿" },
          { id: 38, role: "서폿" },
        ],
        role: "서폿",
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
      { id: 37, isMain: true, role: "딜러" },
      { id: 33, isMain: true, role: "딜러" },
      { id: 4, euphoria: true, role: "힐러", alternatives: [{ id: 30, role: "탱커" }] },
      {
        id: 15,
        euphoria: true,
        role: "서폿",
      },
    ],
  },
  {
    name: "노티카 자해덱",
    description: [
      "노티카를 메인으로 한 [신혈]기믹을 사용하는 자해조합",
      "노티카와 광상 제멜바이스 & 센티넬을 채용하여 자해를 쌓아 딜을 하는 조합",
      "힐러는 파투투, 광상 에즈라를 주로 채용",
      "3.0 기준 센티넬의 합류로 압도적인 체급과 덱파워를 보여주는 0티어 조합",
      "제멜바이스의 술진으로 로페라 등의 술진 서포터와는 쓰기 힘듦",
    ],
    concepts: ["신혈", "자해"],
    characters: [
      { id: 49, isMain: true, role: "딜러" },
      { id: 28, euphoria: true, isMain: true, role: "서폿" },
      {
        id: 21,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 8, euphoria: true, role: "힐러" },
          { id: 40, role: "힐러" },
        ],
      },
      {
        id: 52,
        role: "서폿",
        alternatives: [
          { id: 38, role: "서폿" },
          { id: 9, euphoria: true, role: "서폿" },
        ],
      },
    ],
  },
  {
    name: "전력덱",
    description: [
      "광상 루시와, 울리히의 전력 키워드를 메인으로 하는 조합",
      "[요동치는 전기장]이라는 술진을 강화시키며, 압도적인 화력으로 찍어누름.",
      "광상루시와 울리히의 엄청난 체급과 버프들로 고점이 높음",
      "전력 광상 에즈라와도 궁합이 좋으며, 루시가 '술식위력증가'효과도 받게 되어 광상 멜라니아와 궁합이 좋음",
      "특정 캐릭터들이 강제되고, 술진 서폿은 사용하기 힘듦",
      "3.0 기준 카론의 합류로 뛰어난 덱파워를 보여주는 0티어 조합",
    ],
    concepts: ["전력", "술진"],
    characters: [
      { id: 21, euphoria: true, role: "서폿" },
      { id: 29, isMain: true, euphoria: true, role: "딜러" },
      { id: 50, isMain: true, role: "서폿" },
      {
        id: 53,
        role: "서폿",
        alternatives: [
          { id: 38, role: "서폿" },
          { id: 12, euphoria: true, role: "서폿" },
          { id: 31, role: "서폿" },
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
      { id: 47, isMain: true, role: "딜러" },
      { id: 48, isMain: true, role: "서폿" },
      {
        id: 40,
        role: "힐러",
        alternatives: [
          { id: 46, role: "탱커" },
          { id: 26, euphoria: true, role: "힐러" },
        ],
      },
      {
        id: 38,
        role: "서폿",
        alternatives: [
          { id: 31, role: "서폿" },
          { id: 18, role: "서폿" },
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
      { id: 47, isMain: true, role: "딜러" },
      { id: 48, isMain: true, role: "서폿" },
      {
        id: 23,
        role: "서폿",
        euphoria: true,
        alternatives: [
          { id: 12, euphoria: true, role: "서폿" },
          { id: 45, role: "딜러" },
        ],
      },
      {
        id: 8,
        euphoria: true,
        role: "서폿",
        alternatives: [{ id: 26, euphoria: true, role: "힐러" }],
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
      { id: 47, isMain: true, role: "딜러" },
      { id: 33, isMain: true, role: "서폿" },
      {
        id: 4,
        euphoria: true,
        role: "힐러",
        alternatives: [{ id: 26, euphoria: true, role: "힐러" }],
      },
      {
        id: 38,
        role: "서폿",
        alternatives: [
          { id: 31, role: "서폿" },
          { id: 37, role: "서폿" },
          { id: 41, role: "서폿" },
          { id: 15, euphoria: true, role: "서폿" },
        ],
      },
    ],
  },
  {
    name: "광상 마커스 성급덱",
    description: [
      "광상 마커스를 메인으로, 주문 강화를 통해 높은 성급 주문으로 딜을 하는 조합",
      "콜라보 버젼 기준 광상 마커스의 체급이 엄청나고, 광상 빌라와의 궁합도 압도적",
      "머큐리아의 진급과, 아르고스의 추가공격 등 좋은 서포터도 많고 덱이 유연함",
      "체급 자체는 0티어까진 아니고 1~2티어 정도의 덱파워를 보여줌",
    ],
    concepts: ["나무", "주문강화", "비주류"],
    characters: [
      { id: 25, isMain: true, euphoria: true, role: "딜러" },
      {
        id: 26,
        isMain: true,
        euphoria: true,
        role: "힐러",
      },
      {
        id: 31,
        role: "서폿",
        alternatives: [{ id: 36, role: "서폿" }],
      },
      {
        id: 34,
        role: "서폿",
        alternatives: [
          { id: 30, role: "탱커" },
          { id: 1, euphoria: true, role: "서폿" },
          { id: 7, euphoria: true, role: "서폿" },
          { id: 45, role: "딜러" },
        ],
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
      { id: 6, euphoria: true, isMain: true, role: "딜러" },
      { id: 23, euphoria: true, isMain: true, role: "서폿" },
      {
        id: 12,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 31, role: "서폿" },
          { id: 34, role: "서폿" },
          { id: 50, role: "서폿" },
          { id: 51, role: "서폿" },
        ],
      },
      {
        id: 8,
        euphoria: true,
        role: "힐러",
        alternatives: [
          { id: 30, role: "탱커" },
          { id: 46, role: "탱커" },
          { id: 36, role: "서폿" },
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
      { id: 45, isMain: true, role: "딜러" },
      {
        id: 127,
        role: "서폿",
        alternatives: [
          { id: 1, euphoria: true, role: "서폿" },
          { id: 34, role: "서폿" },
        ],
      },
      { id: 12, euphoria: true, role: "서폿" },
      { id: 26, euphoria: true, role: "힐러", alternatives: [{ id: 30, role: "탱커" }] },
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
      { id: 36, role: "서폿", alternatives: [{ id: 8, euphoria: true, role: "힐러" }] },
      { id: 43, isMain: true, role: "딜러" },
      { id: 13, euphoria: true, role: "서폿", alternatives: [{ id: 127, role: "서폿" }] },
      { id: 12, euphoria: true, role: "서폿" },
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
      { id: 36, role: "힐러", alternatives: [{ id: 26, euphoria: true, role: "힐러" }] },
      { id: 42, isMain: true, role: "딜러" },
      { id: 12, euphoria: true, role: "서폿" },
      {
        id: 7,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 1, euphoria: true },
          { id: 127, role: "서폿" },
        ],
      },
    ],
  },
  {
    name: "양월 추공덱",
    description: [
      "양월을 메인으로 사용하는 추공조합 (추공조합은 거의 딜러들만 바뀌는 경우가 많음)",
      "양월의 유틸성으로 주문강화, 버프/디버프 연장, 받피감 등 유연하게 사용가능",
      "양월을 제외하면, 범용적인 서포터들을 넣어도 좋은 화력과 유연한 캐릭터 조합이 가능",
      "여러 추공덱 중 가장 운용하기 쉽고, 덱 파워도 준수한 편",
    ],
    concepts: ["추공"],
    characters: [
      { id: 41, isMain: true, role: "딜러" },
      { id: 38, role: "서폿" },
      { id: 46, role: "탱커", alternatives: [{ id: 40, role: "힐러" }] },
      {
        id: 36,
        role: "힐러",
        alternatives: [
          { id: 31, role: "서폿" },
          { id: 18, role: "서폿" },
        ],
      },
    ],
  },
  {
    name: "안조 추공덱",
    description: [
      "안조를 메인으로, 천체/암석/영혼/지능 계약을 하는 조합",
      "단일 적은 영혼/지능, 다수의 적은 천체/암석 계약하며, 안조와 계약자에게 행동을 몰아줌",
      "안조와 계약자 이외에는 미행동 서폿이나 힐러를 채용",
      "매혹의 제어와, 안조의 폭딜로 난이도에 비해 쉬운 덱파워",
      "특정 캐릭터를 요구하지 않고 자유로운 조합이 가능",
    ],
    concepts: ["추공", "안조 계약"],
    characters: [
      { id: 35, isMain: true, role: "딜러" },
      {
        id: 31,
        role: "서폿",
        alternatives: [
          { id: 29, role: "서폿" },
          { id: 2, euphoria: true, role: "서폿" },
          { id: 18, role: "서폿" },
          { id: 19, role: "서폿" },
        ],
      },
      { id: 38, role: "서폿", alternatives: [{ id: 30, role: "탱커" }] },
      { id: 36, role: "힐러", alternatives: [{ id: 40, role: "힐러" }] },
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
      { id: 36, role: "힐러", alternatives: [{ id: 40, role: "힐러" }] },
      { id: 35, isMain: true, role: "딜러" },
      {
        id: 107,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 17, euphoria: true, role: "서폿" },
          { id: 42, euphoria: true, role: "서폿" },
        ],
      },
      { id: 12, isMain: true, role: "서폿", alternatives: [{ id: 127, role: "서폿" }] },
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
      { id: 22, isMain: true, euphoria: true, role: "딜러" },
      { id: 13, isMain: true, euphoria: true, role: "서폿" },
      { id: 38, role: "서폿", alternatives: [{ id: 18, role: "서폿" }] },
      { id: 40, role: "힐러", alternatives: [{ id: 36, role: "힐러" }] },
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
      { id: 18, isMain: true, role: "딜러" },
      { id: 38, role: "서폿" },
      { id: 46, role: "탱커", alternatives: [{ id: 40, role: "힐러" }] },
      { id: 36, role: "힐러", alternatives: [{ id: 31, role: "서폿" }] },
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
      { id: 15, euphoria: true, isMain: true, role: "딜러" },
      { id: 1, euphoria: true, isMain: true, role: "서폿" },
      { id: 4, euphoria: true, role: "힐러", alternatives: [{ id: 30, role: "탱커" }] },
      {
        id: 7,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 34, role: "서폿" },
          { id: 31, role: "서폿" },
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
      { id: 27, isMain: true, role: "딜러" },
      { id: 38, role: "서폿" },
      { id: 26, euphoria: true, role: "힐러", alternatives: [{ id: 30, role: "탱커" }] },
      { id: 31, role: "서폿" },
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
      { id: 2, euphoria: true, isMain: true, role: "딜러" },
      { id: 38, role: "서폿" },
      { id: 40, role: "힐러", alternatives: [{ id: 46, role: "탱커" }] },
      {
        id: 18,
        role: "서폿",
        alternatives: [
          { id: 31, role: "서폿" },
          { id: 36, role: "힐러" },
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
      { id: 28, isMain: true, role: "딜러" },
      {
        id: 13,
        euphoria: true,
        alternatives: [{ id: 10, euphoria: true, role: "서폿" }],
        role: "서폿",
      },
      { id: 9, euphoria: true, isMain: true, role: "서폿" },
      {
        id: 21,
        euphoria: true,
        role: "서폿",
        alternatives: [
          { id: 8, euphoria: true, role: "힐러" },
          { id: 40, role: "힐러" },
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
      { id: 32, isMain: true, role: "딜러" },
      { id: 10, euphoria: true, isMain: true, role: "탱커" },
      {
        id: 38,
        role: "서폿",
        alternatives: [
          { id: 18, role: "서폿" },
          { id: 24, role: "서폿" },
        ],
      },
      { id: 36, role: "힐러", alternatives: [{ id: 8, euphoria: true, role: "힐러" }] },
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
      { id: 36, role: "힐러", alternatives: [{ id: 8, euphoria: true, role: "힐러" }] },
      { id: 20, isMain: true, role: "딜러" },
      { id: 24, isMain: true, role: "서폿" },
      { id: 12, euphoria: true, role: "서폿", alternatives: [{ id: 127, role: "서폿" }] },
    ],
  },
];
