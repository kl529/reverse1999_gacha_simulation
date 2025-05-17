export interface PsycubeInfo {
  psycube_id: number;
  description: string;
}

export interface CharacterSettingData {
  character_id: number;
  psycubes: PsycubeInfo[];
}

export const character_setting_data: CharacterSettingData[] = [
  {
    character_id: 1, // "드루비스"
    psycubes: [
      {
        psycube_id: 27,
        description: " S (2스택 이상) (풀)",
      },
      {
        psycube_id: 68,
        description: "S (디버퍼 필요) (풀)",
      },
      {
        psycube_id: 24,
        description: "A+ (생존 보조)",
      },
      {
        psycube_id: 70,
        description: "A+ (나무팟)",
      },
    ],
  },
  {
    character_id: 2, // "릴리아"
    psycubes: [
      {
        psycube_id: 42,
        description: "S (풀)",
      },
      {
        psycube_id: 19,
        description: "S",
      },
      {
        psycube_id: 42,
        description: "A",
      },
      {
        psycube_id: 19,
        description: "A",
      },
    ],
  },
  {
    character_id: 3, // "A 나이트"
    psycubes: [
      {
        psycube_id: 9,
        description: "S (비상성)",
      },
      {
        psycube_id: 27,
        description: "A",
      },
      {
        psycube_id: 44,
        description: "A (디버퍼 필요)",
      },
      {
        psycube_id: 36,
        description: "A",
      },
    ],
  },
  {
    character_id: 4, // "소더비"
    psycubes: [
      {
        psycube_id: 23,
        description: "S (중독)",
      },
      {
        psycube_id: 55,
        description: "S (힐러)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 53,
        description: "A",
      },
    ],
  },
  {
    character_id: 5, // "레굴루스"
    psycubes: [
      {
        psycube_id: 31,
        description: "S (디버퍼 필요) (풀) ",
      },
      {
        psycube_id: 49,
        description: "S (최대 스택) (풀)",
      },
      {
        psycube_id: 36,
        description: "S-",
      },
      {
        psycube_id: 14,
        description: "A",
      },
    ],
  },
  {
    character_id: 6, // "센츄리온"
    psycubes: [
      {
        psycube_id: 68,
        description: "S (디버퍼 필요) (풀)",
      },
      {
        psycube_id: 31,
        description: "S (디버퍼 필요) (풀)",
      },
      {
        psycube_id: 27,
        description: "S (2스택 이상) (풀)",
      },
      {
        psycube_id: 27,
        description: "A",
      },
    ],
  },
  {
    character_id: 7, // "안안 리"
    psycubes: [
      {
        psycube_id: 32,
        description: "S (풀)",
      },
      {
        psycube_id: 70,
        description: "A+ (나무팟)",
      },
      {
        psycube_id: 41,
        description: "A (딜보조)",
      },
      {
        psycube_id: 38,
        description: "A (딜 보조)",
      },
    ],
  },
  {
    character_id: 8, // "메디슨 포켓"
    psycubes: [
      {
        psycube_id: 15,
        description: "S (광상)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 55,
        description: "S",
      },
      {
        psycube_id: 30,
        description: "A",
      },
    ],
  },
  {
    character_id: 9, // "이터니티"
    psycubes: [
      {
        psycube_id: 37,
        description: "S (풀)",
      },
      {
        psycube_id: 20,
        description: "S (풀)",
      },
      {
        psycube_id: 27,
        description: "A",
      },
      {
        psycube_id: 25,
        description: "A",
      },
    ],
  },
  {
    character_id: 10, // "뉴바벨"
    psycubes: [
      {
        psycube_id: 38,
        description: "S (보호막)",
      },
      {
        psycube_id: 42,
        description: "S (데미지)",
      },
      {
        psycube_id: 32,
        description: "S (데미지)",
      },
      {
        psycube_id: 8,
        description: "S-",
      },
    ],
  },
  {
    character_id: 11, // "보이저"
    psycubes: [
      {
        psycube_id: 4,
        description: "S",
      },
      {
        psycube_id: 32,
        description: "A",
      },
      {
        psycube_id: 33,
        description: "A",
      },
      {
        psycube_id: 10,
        description: "A (천체팟)",
      },
    ],
  },
  {
    character_id: 12, // "멜라니아"
    psycubes: [
      {
        psycube_id: 33,
        description: "S",
      },
      {
        psycube_id: 36,
        description: "A+",
      },
      {
        psycube_id: 44,
        description: "A+ (디버퍼 필요)",
      },
      {
        psycube_id: 9,
        description: "A+ (비상성)",
      },
    ],
  },
  {
    character_id: 13, // "피클즈"
    psycubes: [
      {
        psycube_id: 29,
        description: "S (광상, 단기전)",
      },
      {
        psycube_id: 33,
        description: "S (장기전)",
      },
      {
        psycube_id: 7,
        description: "S- (광상, 장기전)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
    ],
  },
  {
    character_id: 14, // "투스 페어리"
    psycubes: [
      {
        psycube_id: 55,
        description: "S (힐)",
      },
      {
        psycube_id: 12,
        description: "S (탱킹)",
      },
      {
        psycube_id: 10,
        description: "S (천체팟)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
    ],
  },
  {
    character_id: 15, // "제시카"
    psycubes: [
      {
        psycube_id: 13,
        description: "S",
      },
      {
        psycube_id: 27,
        description: "A (2스택 이상) (풀)",
      },
      {
        psycube_id: 68,
        description: "A (풀)",
      },
      {
        psycube_id: 27,
        description: "B",
      },
    ],
  },
  {
    character_id: 16, // "갈라보나"
    psycubes: [
      {
        psycube_id: 33,
        description: "S (술식 위주) (풀)",
      },
      {
        psycube_id: 14,
        description: "S (풀)",
      },
      {
        psycube_id: 68,
        description: "S (디버퍼 필요) (풀)",
      },
      {
        psycube_id: 27,
        description: "A (2스택 이상)",
      },
    ],
  },
  {
    character_id: 17, // "갈기 모래"
    psycubes: [
      {
        psycube_id: 56,
        description: "S (2형 이상)",
      },
      {
        psycube_id: 36,
        description: "S-",
      },
      {
        psycube_id: 44,
        description: "S- (디버퍼 필요)",
      },
      {
        psycube_id: 14,
        description: "S",
      },
    ],
  },
  {
    character_id: 18, // "37"
    psycubes: [
      {
        psycube_id: 18,
        description: "S (풀)",
      },
      {
        psycube_id: 47,
        description: "A (2형 이상) (풀)",
      },
      {
        psycube_id: 29,
        description: "A (명함, 추가행동) (풀)",
      },
      {
        psycube_id: 32,
        description: "A (솔로) (풀)",
      },
    ],
  },
  {
    character_id: 19, // "6"
    psycubes: [
      {
        psycube_id: 9,
        description: "S (비상성)",
      },
      {
        psycube_id: 33,
        description: "S (상성)",
      },
      {
        psycube_id: 44,
        description: "A+ (상태이상)",
      },
      {
        psycube_id: 36,
        description: "A+",
      },
    ],
  },
  {
    character_id: 20, // "스파토데아"
    psycubes: [
      {
        psycube_id: 33,
        description: "S (술식 위주)",
      },
      {
        psycube_id: 36,
        description: "S (술식 위주)",
      },
      {
        psycube_id: 52,
        description: "S-",
      },
      {
        psycube_id: 32,
        description: "A",
      },
    ],
  },
  {
    character_id: 21, // "에즈라"
    psycubes: [
      {
        psycube_id: 57,
        description: "S",
      },
      {
        psycube_id: 65,
        description: "S (보호막 위주)",
      },
      {
        psycube_id: 61,
        description: "S (전력 광상)",
      },
      {
        psycube_id: 12,
        description: "S (힐 광상)",
      },
    ],
  },
  {
    character_id: 22, // "곡랑"
    psycubes: [
      {
        psycube_id: 42,
        description: "S (풀)",
      },
      {
        psycube_id: 40,
        description: "A+ (풀)",
      },
      {
        psycube_id: 68,
        description: "A (디버퍼 필요) (풀)",
      },
      {
        psycube_id: 31,
        description: "A (디버퍼 필요) (풀)",
      },
    ],
  },
  {
    character_id: 23, // "갈천"
    psycubes: [
      {
        psycube_id: 46,
        description: "S (데미지) (풀)",
      },
      {
        psycube_id: 61,
        description: "S (보조) (풀)",
      },
      {
        psycube_id: 39,
        description: "A (2형이상, 빠른 술식)",
      },
      {
        psycube_id: 68,
        description: "A (데미지) (풀)",
      },
    ],
  },
  {
    character_id: 24, // "이졸데"
    psycubes: [
      {
        psycube_id: 29,
        description: "S (풀)",
      },
      {
        psycube_id: 68,
        description: "A+ (풀)",
      },
      {
        psycube_id: 32,
        description: "A",
      },
      {
        psycube_id: 25,
        description: "A",
      },
    ],
  },
  {
    character_id: 25, // "마커스"
    psycubes: [
      {
        psycube_id: 7,
        description: "S",
      },
      {
        psycube_id: 68,
        description: "A+ (풀)",
      },
      {
        psycube_id: 27,
        description: "A+ (풀)",
      },
      {
        psycube_id: 25,
        description: "A",
      },
    ],
  },
  {
    character_id: 26, // "빌라"
    psycubes: [
      {
        psycube_id: 16,
        description: "S",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S (딜 증가 보조)",
      },
      {
        psycube_id: 39,
        description: "A (빠른 술식)",
      },
    ],
  },
  {
    character_id: 27, // "윈드송"
    psycubes: [
      {
        psycube_id: 42,
        description: "S (장기전)",
      },
      {
        psycube_id: 40,
        description: "S (단기전) (풀)",
      },
      {
        psycube_id: 19,
        description: "S (풀)",
      },
      {
        psycube_id: 32,
        description: "A",
      },
    ],
  },
  {
    character_id: 28, // "제멜바이스"
    psycubes: [
      {
        psycube_id: 43,
        description: "S (풀)",
      },
      {
        psycube_id: 20,
        description: "S (생존 증가) (풀)",
      },
      {
        psycube_id: 32,
        description: "S (풀)",
      },
      {
        psycube_id: 28,
        description: "A+ (풀)",
      },
    ],
  },
  {
    character_id: 29, // "루시"
    psycubes: [
      {
        psycube_id: 51,
        description: "S (풀)",
      },
      {
        psycube_id: 32,
        description: "A+ (풀)",
      },
      {
        psycube_id: 68,
        description: "A (디버퍼 필요) (풀)",
      },
      {
        psycube_id: 25,
        description: "A",
      },
    ],
  },
  {
    character_id: 30, // "카카니아"
    psycubes: [
      {
        psycube_id: 57,
        description: "S (탱킹)",
      },
      {
        psycube_id: 65,
        description: "S (공감 중심)",
      },
      {
        psycube_id: 61,
        description: "A",
      },
      {
        psycube_id: 12,
        description: "A-",
      },
    ],
  },
  {
    character_id: 31, // "머큐리아"
    psycubes: [
      {
        psycube_id: 41,
        description: "S (딜보조)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S (딜 증가 보조)",
      },
      {
        psycube_id: 39,
        description: "A (빠른 술식)",
      },
    ],
  },
  {
    character_id: 32, // "J"
    psycubes: [
      {
        psycube_id: 62,
        description: "S (풀)",
      },
      {
        psycube_id: 40,
        description: "S (플러터페이지) (풀)",
      },
      {
        psycube_id: 29,
        description: "A+ (풀)",
      },
      {
        psycube_id: 37,
        description: "A+ (풀)",
      },
    ],
  },
  {
    character_id: 33, // "튜즈데이"
    psycubes: [
      {
        psycube_id: 6,
        description: "S",
      },
      {
        psycube_id: 39,
        description: "A+",
      },
      {
        psycube_id: 24,
        description: "A",
      },
      {
        psycube_id: 23,
        description: "A-",
      },
    ],
  },
  {
    character_id: 34, // "아르고스"
    psycubes: [
      {
        psycube_id: 52,
        description: "S (풀)",
      },
      {
        psycube_id: 13,
        description: "A+ (마커스) (풀)",
      },
      {
        psycube_id: 42,
        description: "A+ (장기전) (풀)",
      },
      {
        psycube_id: 33,
        description: "A (풀)",
      },
    ],
  },
  {
    character_id: 35, // "안조 날라"
    psycubes: [
      {
        psycube_id: 67,
        description: "S (풀)",
      },
      {
        psycube_id: 40,
        description: "S (풀)",
      },
      {
        psycube_id: 46,
        description: "A+ (천체암석 계약) (풀)",
      },
      {
        psycube_id: 42,
        description: "A (영혼지능 계약) (풀)",
      },
    ],
  },
  {
    character_id: 36, // "로페라"
    psycubes: [
      {
        psycube_id: 61,
        description: "S (풀)",
      },
      {
        psycube_id: 42,
        description: "A (장기전)",
      },
      {
        psycube_id: 52,
        description: "A (단기전)",
      },
      {
        psycube_id: 13,
        description: "A- (디버퍼 필요)",
      },
    ],
  },
  {
    character_id: 37, // "윌로우"
    psycubes: [
      {
        psycube_id: 23,
        description: "S (풀)",
      },
      {
        psycube_id: 39,
        description: "A+",
      },
      {
        psycube_id: 67,
        description: "A (풀)",
      },
      {
        psycube_id: 36,
        description: "A-",
      },
    ],
  },
  {
    character_id: 38, // "플러터 페이지"
    psycubes: [
      {
        psycube_id: 40,
        description: "S",
      },
      {
        psycube_id: 4,
        description: "S (계시 추가)",
      },
      {
        psycube_id: 41,
        description: "S (딜보조)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
    ],
  },
  {
    character_id: 39, // "바르카롤라"
    psycubes: [
      {
        psycube_id: 4,
        description: "S (풀)",
      },
      {
        psycube_id: 52,
        description: "A+ (풀)",
      },
      {
        psycube_id: 19,
        description: "A+ (풀)",
      },
      {
        psycube_id: 39,
        description: "A (빠른 술식)",
      },
    ],
  },
  {
    character_id: 40, // "파투투"
    psycubes: [
      {
        psycube_id: 15,
        description: "S (딜 증가 보조)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S- (딜 증가 보조)",
      },
      {
        psycube_id: 42,
        description: "A+ (장기전) (풀)",
      },
    ],
  },
  {
    character_id: 41, // "양월"
    psycubes: [
      {
        psycube_id: 43,
        description: "S (풀)",
      },
      {
        psycube_id: 42,
        description: "A+ (장기전) (풀)",
      },
      {
        psycube_id: 40,
        description: "A+ (풀)",
      },
      {
        psycube_id: 29,
        description: "A (풀)",
      },
    ],
  },
  {
    character_id: 42, // "누아르"
    psycubes: [
      {
        psycube_id: 44,
        description: "S",
      },
      {
        psycube_id: 36,
        description: "A",
      },
      {
        psycube_id: 14,
        description: "A",
      },
      {
        psycube_id: 56,
        description: "A",
      },
    ],
  },
  {
    character_id: 43, // "레콜레타"
    psycubes: [
      {
        psycube_id: 58,
        description: "S",
      },
      {
        psycube_id: 44,
        description: "A (디버퍼 필요)",
      },
      {
        psycube_id: 36,
        description: "A",
      },
      {
        psycube_id: 9,
        description: "A (비상성)",
      },
    ],
  },
  {
    character_id: 44, // "알레프"
    psycubes: [
      {
        psycube_id: 35,
        description: "S",
      },
      {
        psycube_id: 32,
        description: "A+",
      },
      {
        psycube_id: 27,
        description: "A",
      },
      {
        psycube_id: 39,
        description: "A (빠른 술식)",
      },
    ],
  },
  {
    character_id: 45, // "하사베스"
    psycubes: [
      {
        psycube_id: 36,
        description: "S",
      },
      {
        psycube_id: 33,
        description: "A",
      },
      {
        psycube_id: 44,
        description: "A-",
      },
      {
        psycube_id: 14,
        description: "A-",
      },
    ],
  },
  {
    character_id: 46, // "키페리나"
    psycubes: [
      {
        psycube_id: 71,
        description: "",
      },
    ],
  },
  {
    character_id: 47, // "노티카"
    psycubes: [
      {
        psycube_id: 72,
        description: "",
      },
    ],
  },
  {
    character_id: 48, // "울리히"
    psycubes: [
      {
        psycube_id: 74,
        description: "",
      },
    ],
  },
  {
    character_id: 101, // "소네트"
    psycubes: [
      {
        psycube_id: 58,
        description: "S (데미지)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 24,
        description: "A (생존 보조)",
      },
    ],
  },
  {
    character_id: 102, // "마틸다"
    psycubes: [
      {
        psycube_id: 19,
        description: "S (풀)",
      },
      {
        psycube_id: 33,
        description: "S (술식 위주) (풀)",
      },
      {
        psycube_id: 10,
        description: "S- (천체팟)",
      },
      {
        psycube_id: 4,
        description: "S-",
      },
    ],
  },
  {
    character_id: 103, // "X"
    psycubes: [
      {
        psycube_id: 9,
        description: "S (비상성)",
      },
      {
        psycube_id: 27,
        description: "A",
      },
      {
        psycube_id: 44,
        description: "A (디버퍼 필요)",
      },
      {
        psycube_id: 36,
        description: "A",
      },
    ],
  },
  {
    character_id: 104, // "마릴린"
    psycubes: [
      {
        psycube_id: 13,
        description: "S (풀)",
      },
      {
        psycube_id: 33,
        description: "S (술식 위주) (풀)",
      },
      {
        psycube_id: 13,
        description: "A",
      },
      {
        psycube_id: 33,
        description: "A (술식 위주)",
      },
    ],
  },
  {
    character_id: 105, // "베이비 블루"
    psycubes: [
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 24,
        description: "A",
      },
      {
        psycube_id: 25,
        description: "A",
      },
      {
        psycube_id: 27,
        description: "B",
      },
    ],
  },
  {
    character_id: 106, // "찰리"
    psycubes: [
      {
        psycube_id: 19,
        description: "S (풀)",
      },
      {
        psycube_id: 27,
        description: "S (2스택 이상) (풀)",
      },
      {
        psycube_id: 68,
        description: "A (디버퍼 필요) (풀)",
      },
      {
        psycube_id: 27,
        description: "A",
      },
    ],
  },
  {
    character_id: 107, // "콘블룸"
    psycubes: [
      {
        psycube_id: 33,
        description: "S (술식 위주) (풀)",
      },
      {
        psycube_id: 44,
        description: "S (광상 안안리) (풀)",
      },
      {
        psycube_id: 33,
        description: "A",
      },
      {
        psycube_id: 36,
        description: "A",
      },
    ],
  },
  {
    character_id: 108, // "디케"
    psycubes: [
      {
        psycube_id: 33,
        description: "S (딜량)",
      },
      {
        psycube_id: 44,
        description: "S (힐러)",
      },
      {
        psycube_id: 53,
        description: "S (힐러)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
    ],
  },
  {
    character_id: 109, // "벌룬 파티"
    psycubes: [
      {
        psycube_id: 53,
        description: "S",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 30,
        description: "A (장기전)",
      },
      {
        psycube_id: 55,
        description: "A",
      },
    ],
  },
  {
    character_id: 110, // "네크롤로지스트"
    psycubes: [
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 24,
        description: "A",
      },
      {
        psycube_id: 32,
        description: "A (데미지)",
      },
    ],
  },
  {
    character_id: 111, // "사츠키"
    psycubes: [
      {
        psycube_id: 33,
        description: "S (술식 위주) (풀)",
      },
      {
        psycube_id: 44,
        description: "S (광상 안안리) (풀)",
      },
      {
        psycube_id: 33,
        description: "A",
      },
      {
        psycube_id: 36,
        description: "A",
      },
    ],
  },
  {
    character_id: 112, // "테넌트"
    psycubes: [
      {
        psycube_id: 33,
        description: "S (술식 위주) (풀)",
      },
      {
        psycube_id: 32,
        description: "S (보호막) (풀)",
      },
      {
        psycube_id: 42,
        description: "S (장기전) (풀)",
      },
      {
        psycube_id: 38,
        description: "S (딜 보조) (풀)",
      },
    ],
  },
  {
    character_id: 113, // "클릭"
    psycubes: [
      {
        psycube_id: 9,
        description: "S (비상성)",
      },
      {
        psycube_id: 27,
        description: "A",
      },
      {
        psycube_id: 44,
        description: "A (디버퍼 필요)",
      },
      {
        psycube_id: 36,
        description: "A",
      },
    ],
  },
  {
    character_id: 114, // "디거스"
    psycubes: [
      {
        psycube_id: 33,
        description: "S (술식 위주) (풀)",
      },
      {
        psycube_id: 53,
        description: "S (보호막)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 25,
        description: "A",
      },
    ],
  },
  {
    character_id: 115, // "블로니"
    psycubes: [
      {
        psycube_id: 19,
        description: "S (풀)",
      },
      {
        psycube_id: 49,
        description: "S (최대 스택) (풀)",
      },
      {
        psycube_id: 68,
        description: "S (디버퍼 필요) (풀)",
      },
      {
        psycube_id: 25,
        description: "A",
      },
    ],
  },
  {
    character_id: 116, // "호러피디아"
    psycubes: [
      {
        psycube_id: 27,
        description: "S (2스택 이상) (풀)",
      },
      {
        psycube_id: 68,
        description: "S (디버퍼 필요) (풀)",
      },
      {
        psycube_id: 11,
        description: "S (풀)",
      },
      {
        psycube_id: 25,
        description: "A",
      },
    ],
  },
  {
    character_id: 117, // "칸지라"
    psycubes: [
      {
        psycube_id: 13,
        description: "S (최우선)",
      },
      {
        psycube_id: 68,
        description: "S (디버퍼 필요) (풀)",
      },
      {
        psycube_id: 25,
        description: "A",
      },
      {
        psycube_id: 27,
        description: "A",
      },
    ],
  },
  {
    character_id: 118, // "데저트 플란넬"
    psycubes: [
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 24,
        description: "S",
      },
      {
        psycube_id: 42,
        description: "S (장기전)",
      },
      {
        psycube_id: 32,
        description: "A (데미지)",
      },
    ],
  },
  {
    character_id: 119, // "울루"
    psycubes: [
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 24,
        description: "A",
      },
      {
        psycube_id: 32,
        description: "A (데미지)",
      },
    ],
  },
  {
    character_id: 120, // "예니세이"
    psycubes: [
      {
        psycube_id: 12,
        description: "S",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 65,
        description: "A+",
      },
      {
        psycube_id: 41,
        description: "A+ (딜보조)",
      },
    ],
  },
  {
    character_id: 121, // "아브구스트"
    psycubes: [
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 70,
        description: "S (나무팟)",
      },
      {
        psycube_id: 24,
        description: "A",
      },
    ],
  },
  {
    character_id: 122, // "로렐라이"
    psycubes: [
      {
        psycube_id: 49,
        description: "S (데미지) (풀)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 44,
        description: "A (디버퍼 필요)",
      },
    ],
  },
  {
    character_id: 123, // "바바라"
    psycubes: [
      {
        psycube_id: 12,
        description: "S (힐)",
      },
      {
        psycube_id: 57,
        description: "S (생존)",
      },
      {
        psycube_id: 39,
        description: "S (보호막)",
      },
      {
        psycube_id: 41,
        description: "S (딜보조)",
      },
    ],
  },
  {
    character_id: 124, // "던컨"
    psycubes: [
      {
        psycube_id: 42,
        description: "S (풀)",
      },
      {
        psycube_id: 33,
        description: "S- (풀)",
      },
      {
        psycube_id: 42,
        description: "A",
      },
      {
        psycube_id: 33,
        description: "A- (풀)",
      },
    ],
  },
  {
    character_id: 125, // "슬라우치 햇"
    psycubes: [
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 32,
        description: "A (데미지)",
      },
      {
        psycube_id: 67,
        description: "A",
      },
    ],
  },
  {
    character_id: 126, // "로거헤드"
    psycubes: [
      {
        psycube_id: 55,
        description: "S",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 70,
        description: "S (나무팟)",
      },
      {
        psycube_id: 24,
        description: "A",
      },
    ],
  },
  {
    character_id: 127, // "네임데이"
    psycubes: [
      {
        psycube_id: 38,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 24,
        description: "A",
      },
      {
        psycube_id: 15,
        description: "A- (딜 보조)",
      },
    ],
  },
  {
    character_id: 128, // "버디 페어차일드"
    psycubes: [],
  },
];
