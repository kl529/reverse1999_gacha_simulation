export interface PsycubeInfo {
  psycube_id: number;
  description: string;
}

export interface ResonanceInfo {
  code: string;
  description: string;
}

export interface CharacterSettingData {
  character_id: number;
  psycubes: PsycubeInfo[];
  resonance?: ResonanceInfo[];
  resonance_patterns?: string[];
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
    resonance: [
      {
        code: "APAkLUQtFEMFQANBVEhmPGA8UDQyNDA6ADsRRQE",
        description: "유틸",
      },
      {
        code: "ACQELxQvRCpQKFEmVPAkPQA0ESQBOCI7MA",
        description: "크리티컬/데미지",
      },
    ],
    resonance_patterns: ["Equibalance", "Genuinity"],
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
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "크리티컬",
      },
      {
        code: "APQkJQQ4BThFK0QoUSpQJAEtEUMyQTFEMEYARSA",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Elucidation", "Aspirational"],
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
    resonance: [
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUA0UkBQSGE",
        description: "범용",
      },
    ],
    resonance_patterns: ["Elucidation", "Equibalance"],
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
    resonance: [
      {
        code: "APAkMEU7UzQVPAM6M0ATJAA9IjQQQDBCQExhSGBIYg==",
        description: "힐러",
      },
    ],
    resonance_patterns: ["Equibalance"],
  },
  {
    character_id: 5, // "레굴루스"
    psycubes: [
      {
        psycube_id: 71,
        description: "S (계시 4인팟) ",
      },
      {
        psycube_id: 88,
        description: "S (계시덱)",
      },
      {
        psycube_id: 10,
        description: "S- (계시덱)",
      },
      {
        psycube_id: 36,
        description: "S-",
      },
    ],
    resonance: [
      {
        code: "APgkJQQsBSwyJlQtRChRSGBBQDkwOxBAAEACRBM",
        description: "크리티컬",
      },
      {
        code: "ADQRJQA5AjsTNAX4JC9EL0IvQCZQPDA8Yw",
        description: "섭딜",
      },
    ],
    resonance_patterns: ["Genuinity", "Hyper"],
  },
  {
    character_id: 6, // "센츄리온"
    psycubes: [
      {
        psycube_id: 27,
        description: "S (다인전)",
      },
      {
        psycube_id: 58,
        description: "S",
      },
      {
        psycube_id: 13,
        description: "A+ (상태이상 필요)",
      },
      {
        psycube_id: 9,
        description: "A (비상성)",
      },
    ],
    resonance: [
      {
        code: "APQkK0Q4RTgFJQQkAS8RKFEqUDQyRABDIEEw",
        description: "범용",
      },
    ],
    resonance_patterns: ["Genuinity", "Hyperphrenia"],
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
    resonance: [
      {
        code: "ADQRJQA5AjsTNAX4JC9EL0IvQCZQPDA8Yw",
        description: "범용",
      },
      {
        code: "APgkJQQsBSwyJlQtRChRSGBBQDkwOxBAAEACRBM",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Genuinity", "Delirament"],
  },
  {
    character_id: 8, // "메디슨 포켓"
    psycubes: [
      {
        psycube_id: 15,
        description: "S (광상)",
      },
      {
        psycube_id: 73,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 82,
        description: "S (술식 보조)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
    ],
    resonance: [
      {
        code: "APwlNAU0VTxhPAE4IjokKhJBQkhUQFBBACsgRCE",
        description: "힐러",
      },
    ],
    resonance_patterns: ["Hyper", "Equanimity"],
  },
  {
    character_id: 9, // "이터니티"
    psycubes: [
      {
        psycube_id: 57,
        description: "S (신혈덱 보조)",
      },
      {
        psycube_id: 81,
        description: "S (신혈덱 메인딜러)",
      },
      {
        psycube_id: 76,
        description: "S- (신혈덱 메인딜러)",
      },
      {
        psycube_id: 20,
        description: "A",
      },
    ],
    resonance: [
      {
        code: "ACZQ8CQmVCQELxQtRDlAOEI8ADwQNCI0IA",
        description: "범용",
      },
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUA0UkBQSGE",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Genuinity", "Equibalance"],
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
    resonance: [
      {
        code: "ADQEPwY8ADkROhAxMCZQMUEwNDRTJ0X9Iw",
        description: "생존",
      },
    ],
    resonance_patterns: ["Quiescence"],
  },
  {
    character_id: 11, // "보이저"
    psycubes: [
      {
        psycube_id: 71,
        description: "S (계시 4인팟) ",
      },
      {
        psycube_id: 10,
        description: "S- (계시덱)",
      },
      {
        psycube_id: 7,
        description: "A",
      },
      {
        psycube_id: 33,
        description: "A ",
      },
    ],
    resonance: [
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUA0UkBQSGE",
        description: "크리티컬",
      },
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUBEUUZQNFI=",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Genuinity", "Equibalance"],
  },
  {
    character_id: 12, // "멜라니아"
    psycubes: [
      {
        psycube_id: 33,
        description: "S",
      },
      {
        psycube_id: 73,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 36,
        description: "A+",
      },
      {
        psycube_id: 9,
        description: "A (비상성)",
      },
    ],
    resonance: [
      {
        code: "ACZQ8CQmVCQELxQtRDlAOEI8ADwQNCI0IA",
        description: "데미지",
      },
      {
        code: "AEAASBE0AiQELRTwJC1EJlRFYEFSJEFBQCghKiA",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Elucidation", "Equibalance"],
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
        psycube_id: 83,
        description: "S (암석팟)",
      },
      {
        psycube_id: 82,
        description: "S (술식 보조)",
      },
    ],
    resonance: [
      {
        code: "ACZQ8CQmVCQELxQtRDlAOEI8ADwQNCI0IA",
        description: "범용",
      },
      {
        code: "AEAASBE0AiQELRTwJC1EJlRFYEFSJEFBQCghKiA",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Elucidation", "Genuinity"],
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
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "범용",
      },
    ],
    resonance_patterns: ["Stupefaction", "Hyperphrenia"],
  },
  {
    character_id: 15, // "제시카"
    psycubes: [
      {
        psycube_id: 18,
        description: "S (중독 광상) ",
      },
      {
        psycube_id: 42,
        description: "S (중독 광상) ",
      },
      {
        psycube_id: 13,
        description: "S (석화 광상)",
      },
      {
        psycube_id: 68,
        description: "A (노 광상)",
      },
    ],
    resonance: [
      {
        code: "ADQRJQA5AjsTNAX4JC9EL0IvQCZQPDA8Yw",
        description: "딜러",
      },
      {
        code: "AC1CLUAmUDxjNAU5AjsTNBE8MCUARVVFRPgk",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Genuinity", "Delirament"],
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
    resonance: [
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUA0UkBQSGE",
        description: "범용",
      },
    ],
    resonance_patterns: ["Elucidation", "Genuinity"],
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
    resonance: [
      {
        code: "AEAASBE0AiQELRTwJC1EJlRFYEFSJEFBQCghKiA",
        description: "범용",
      },
      {
        code: "ACpQKFEkBC0ULUQmVPAkRDBFIEYAJjFAAUEiQgJIIw",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Elucidation", "Equibalance"],
  },
  {
    character_id: 18, // "37"
    psycubes: [
      {
        psycube_id: 40,
        description: "S (플페와 함께)",
      },
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
    ],
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "명함",
      },
      {
        code: "APQjSDY0FTRFJlQqBDxgPAA5EDogLBJCQERCRkM",
        description: "1형상 이상",
      },
    ],
    resonance_patterns: ["Aspirational", "Hyperphrenia"],
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
    resonance: [
      {
        code: "ACQELxQvRCpQKFEmVPAkPQA0ESQBOCI7MA",
        description: "범용",
      },
      {
        code: "AEAASBE0AiQELRTwJC1EJlRFYEFSJEFBQCghKiA",
        description: "딜러",
      },
    ],
    resonance_patterns: ["Elucidation", "Equibalance"],
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
    resonance: [
      {
        code: "APgkJQQsBSwyJlQtRChRSGBBQDkwOxBAAEACRBM",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Elucidation", "Hyper"],
  },
  {
    character_id: 21, // "에즈라"
    psycubes: [
      {
        psycube_id: 57,
        description: "S (탱킹)",
      },
      {
        psycube_id: 72,
        description: "S (보호막)",
      },
      {
        psycube_id: 61,
        description: "S (전력 광상)",
      },
      {
        psycube_id: 71,
        description: "S (신혈 광상)",
      },
    ],
    resonance: [
      {
        code: "APQkOEU4BSUEK0QoUSpQPAA8ECYwRDNFMUgjTCJIIUwg",
        description: "서폿",
      },
    ],
    resonance_patterns: ["Stupefaction"],
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
    resonance: [
      {
        code: "AEAASBE0AiQELRTwJC1EJlRFYEFSJEFBQCghKiA",
        description: "크리티컬",
      },
      {
        code: "ACpQKFEkBC0ULUQmVPAkRDBFIEYAJjFAAUEiQgJIIw",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Genuinity", "Equibalance"],
  },
  {
    character_id: 23, // "갈천"
    psycubes: [
      {
        psycube_id: 40,
        description: "S (광상)",
      },
      {
        psycube_id: 36,
        description: "S- (광상)",
      },
      {
        psycube_id: 39,
        description: "A+ (광상)",
      },
      {
        psycube_id: 68,
        description: "A (광상)",
      },
    ],
    resonance: [
      {
        code: "ADQANAI8IDkwOkAoUSwyJQQsBfgkL0QmVA",
        description: "범용",
      },
    ],
    resonance_patterns: ["Genuinity", "Delirament"],
  },
  {
    character_id: 24, // "이졸데"
    psycubes: [
      {
        psycube_id: 87,
        description: "S (광상, 보조)",
      },
      {
        psycube_id: 29,
        description: "S (딜증)",
      },
      {
        psycube_id: 40,
        description: "A+",
      },
      {
        psycube_id: 32,
        description: "A",
      },
    ],
    resonance: [
      {
        code: "AEAASBE0AiQELRTwJC1EJlRFYEFSJEFBQCghKiA",
        description: "범용",
      },
    ],
    resonance_patterns: ["Genuinity", "Equibalance"],
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
    resonance: [
      {
        code: "ADQRJQA5AjsTNAX4JC9EL0IvQCZQPDA8Yw",
        description: "범용",
      },
      {
        code: "APgkJQQsBSwyJlQtRChRSGBBQDkwOxBAAEACRBM",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Genuinity", "Delirament"],
  },
  {
    character_id: 26, // "빌라"
    psycubes: [
      {
        psycube_id: 15,
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
        psycube_id: 82,
        description: "S (술식 보조)",
      },
    ],
    resonance: [
      {
        code: "AD0GPQX8RTFTMUIxMTtQNANDIzQgOAFAAExATFA",
        description: "힐러",
      },
    ],
    resonance_patterns: ["Equanimity", "Hyper"],
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
    resonance: [
      {
        code: "AEAASBE0AiQELRTwJC1EJlRFYEFSJEFBQCghKiA",
        description: "범용",
      },
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUBEUUZQNFI=",
        description: "2형상 이상",
      },
    ],
    resonance_patterns: ["Genuinity", "Equibalance"],
  },
  {
    character_id: 28, // "제멜바이스"
    psycubes: [
      {
        psycube_id: 61,
        description: "S (광상, 보조)",
      },
      {
        psycube_id: 43,
        description: "S",
      },
      {
        psycube_id: 72,
        description: "S (광상, 데미지)",
      },
      {
        psycube_id: 38,
        description: "S (광상, 보조)",
      },
    ],
    resonance: [
      {
        code: "ACQELxQvRCpQKFEmVPAkPQA0ESQBOCI7MA",
        description: "범용",
      },
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUA0UkBQSGE",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Genuinity", "Equibalance"],
  },
  {
    character_id: 29, // "루시"
    psycubes: [
      {
        psycube_id: 40,
        description: "S (플페와 함께)",
      },
      {
        psycube_id: 74,
        description: "S (광상)",
      },
      {
        psycube_id: 27,
        description: "S (광상)",
      },
      {
        psycube_id: 51,
        description: "S (풀)",
      },
    ],
    resonance: [
      {
        code: "ADQwNDIqUChRJAEtEUQARSD0JDhFOAUlBCtE",
        description: "크리티컬",
      },
      {
        code: "ADQwNDIkAS0RRABFIEhQSGBFUShR9CQlBCtEOEU4BQ",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Genuinity", "Hyperphrenia"],
  },
  {
    character_id: 30, // "카카니아"
    psycubes: [
      {
        psycube_id: 57,
        description: "S (탱킹)",
      },
      {
        psycube_id: 72,
        description: "S (공감 중심)",
      },
      {
        psycube_id: 61,
        description: "A",
      },
      {
        psycube_id: 71,
        description: "A",
      },
    ],
    resonance: [
      {
        code: "ACUAJxA5AjgTMzEzQjNTPQU9BkQSREBIUUhiTGFMYPxF",
        description: "범용 (생존)",
      },
    ],
    resonance_patterns: ["Overindulgence"],
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
    resonance: [
      {
        code: "APQkOEU4BTwCPGI0QzQTKxIrECkAJUAsQQ",
        description: "범용",
      },
      {
        code: "APQkK0Q4RTgFJQQkAS8RKFEqUDQyRABDIEEw",
        description: "딜러",
      },
    ],
    resonance_patterns: ["Stupefaction", "Hyperphrenia"],
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
    resonance: [
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUA0UkBQSGE",
        description: "범용",
      },
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUBEUUZQNFI=",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Genuinity", "Equibalance"],
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
    resonance: [
      {
        code: "APgkNBQ0RChUQwVIBDwAPGA5ETtBQRBAQEcwRTJII0xD",
        description: "범용",
      },
      {
        code: "APgkNBQ0RChUQwVIBDwAPGA5EDgSQSBBMkVSR1BHQA",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Hyper", "Delirament"],
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
    resonance: [
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUA0UkBQSGE",
        description: "범용",
      },
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUBEUUZQNFI=",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Genuinity", "Equibalance"],
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
    resonance: [
      {
        code: "AEAASBE0AiQELRTwJC1EJlRFYEFSJEFBQCghKiA",
        description: "범용",
      },
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUBEUUZQNFI=",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Genuinity", "Elucidation"],
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
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "범용",
      },
      {
        code: "APQkJQQ4BThFK0QoUSpQJAEtEUMyQTFEMEYARSA",
        description: "범용 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Aspirational", "Hyperphrenia"],
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
    resonance: [
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUA0UkBQSGE",
        description: "튜즈데이와 함께",
      },
      {
        code: "ADRENBUoVCoEQAFCAkQA8CQ8YDxQOCI5IEEwSEI",
        description: "튜즈데이 없이",
      },
    ],
    resonance_patterns: ["Equibalance"],
  },
  {
    character_id: 38, // "플러터 페이지"
    psycubes: [
      {
        psycube_id: 4,
        description: "S (계시 추가)",
      },
      {
        psycube_id: 71,
        description: "S (치피 보조)",
      },
      {
        psycube_id: 88,
        description: "S (마법 위력 보조)",
      },
      {
        psycube_id: 41,
        description: "S (빠른 술식)",
      },
    ],
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "크리티컬",
      },
      {
        code: "APQkJQQ4BThFK0QoUSpQJAEtEUMyQTFEMEYARSA",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Genuinity", "Hyperphrenia"],
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
    resonance: [
      {
        code: "APgkJQQsBSwyJlQtRChRSGBBQDkwOxBAAEACRBM",
        description: "범용",
      },
    ],
    resonance_patterns: ["Genuinity", "Delirament"],
  },
  {
    character_id: 40, // "파투투"
    psycubes: [
      {
        psycube_id: 15,
        description: "S (딜 증가 보조)",
      },
      {
        psycube_id: 82,
        description: "S (술식 보조)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S- (딜 증가 보조)",
      },
    ],
    resonance: [
      {
        code: "APgkPAM8Y0ETQEM7RDkUJ0EpAUUyQQA0IDRATGA",
        description: "힐러",
      },
    ],
    resonance_patterns: ["Hyper", "Delirament"],
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
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "범용",
      },
      {
        code: "APQkJQQ4BThFK0QoUSpQJAEtEUMyQTFEMEYARSA",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Genuinity", "Hyperphrenia"],
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
    resonance: [
      {
        code: "APgkJQQmVCwFLUQ5AToAKBE8MC1AQVBCUkVC",
        description: "크리티컬 (추천)",
      },
      {
        code: "ADQRJQA5AjsTNAX4JC9EL0IvQCZQPDA8Yw",
        description: "딜링",
      },
    ],
    resonance_patterns: ["Elucidation", "Delirament"],
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
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "크리티컬",
      },
      {
        code: "APQkJQQ4BThFK0QoUSpQJAEtEUMyQTFEMEYARSA",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Elucidation", "Hyperphrenia"],
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
    resonance: [
      {
        code: "APgkJQQmVCwFLUQ5AToAKBE8MC1AQVBCUkVC",
        description: "바르카롤라와 함께",
      },
      {
        code: "APgkJQQsBSwyJlQtRChRSGBBQDkwOxBAAEACRBM",
        description: "바르카롤라 없이",
      },
    ],
    resonance_patterns: ["Genuinity", "Delirament"],
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
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "크리티컬",
      },
      {
        code: "APQkJQQ4BThFK0QoUSpQJAEtEUMyQTFEMEYARSA",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Elucidation", "Hyperphrenia"],
  },
  {
    character_id: 46, // "키페리나"
    psycubes: [
      {
        psycube_id: 71,
        description: "S",
      },
      {
        psycube_id: 32,
        description: "S (계시 4인팟)",
      },
      {
        psycube_id: 4,
        description: "A",
      },
      {
        psycube_id: 28,
        description: "A",
      },
    ],
    resonance: [
      {
        code: "APwlNAU0VTxhPAE4IjokKhJBQkhUQFBBACsgRCE",
        description: "쉴드 & 크리티컬",
      },
    ],
    resonance_patterns: ["Hyper", "Equanimity"],
  },
  {
    character_id: 47, // "에지오 아디토레"
    psycubes: [
      {
        psycube_id: 79,
        description: "S (술식)",
      },
      {
        psycube_id: 18,
        description: "S (중독)",
      },
      {
        psycube_id: 52,
        description: "S (추공, 단기전)",
      },
      {
        psycube_id: 42,
        description: "S (추공, 장기전)",
      },
    ],
    resonance: [
      {
        code: "ADQwNDIqUChRJAEtEUQARSD0JDhFOAUlBCtE",
        description: "크리티컬",
      },
      {
        code: "ADQwNDIkAS0RRABFIEhQSGBFUShR9CQlBCtEOEU4BQ",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Aspirational", "Genuinity"],
  },
  {
    character_id: 48, // "카산드라"
    psycubes: [
      {
        psycube_id: 80,
        description: "S",
      },
      {
        psycube_id: 79,
        description: "S (에지오 없을때)",
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
    resonance: [
      {
        code: "APQkOAUoRDxjOUItQCZQJQQ0IjQgKAEqAA",
        description: "추공 조합",
      },
      {
        code: "APQkOAU4RSUEK0Q8ADwQNCA0IitAR0FGQy1R",
        description: "술식 조합",
      },
    ],
    resonance_patterns: ["Elucidation"],
  },
  {
    character_id: 49, // "노티카"
    psycubes: [
      {
        psycube_id: 72,
        description: "S",
      },
      {
        psycube_id: 40,
        description: "S",
      },
      {
        psycube_id: 29,
        description: "A-",
      },
      {
        psycube_id: 46,
        description: "A-",
      },
    ],
    resonance: [
      {
        code: "APQkOEU4BSUEK0QkAS0RKFEqUDxAPDBMAEwgSBBIIQ",
        description: "데미지",
      },
      {
        code: "APQkOEU4BSUEK0QoUSpQJAEtET0AR0BHMUdCSDNIIQ",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Stupefaction", "Elucidation"],
  },
  {
    character_id: 50, // "울리히"
    psycubes: [
      {
        psycube_id: 40,
        description: "S",
      },
      {
        psycube_id: 74,
        description: "S",
      },
      {
        psycube_id: 61,
        description: "A (맨 앞 배치)",
      },
      {
        psycube_id: 77,
        description: "A (카론 없을시)",
      },
    ],
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "범용",
      },
      {
        code: "APQkJQQ4BThFK0QoUSpQJAEtEUMyQTFEMEYARSA",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Elucidation", "Aspirational"],
  },
  {
    character_id: 51, // "몰디르"
    psycubes: [
      {
        psycube_id: 73,
        description: "S",
      },
      {
        psycube_id: 36,
        description: "A",
      },
      {
        psycube_id: 9,
        description: "A(비상성)",
      },
      {
        psycube_id: 24,
        description: "A-",
      },
    ],
    resonance: [
      {
        code: "ADRENBUoVCoEQAFCAkQA8CQ8YDxQOCI5IEEwSEI",
        description: "범용",
      },
      {
        code: "ACZQ8CQmVCQELxQtRDlAOEI8ADwQNCI0IA",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Elucidation", "Mercy"],
  },
  {
    character_id: 52, // "센티널"
    psycubes: [
      {
        psycube_id: 76,
        description: "S",
      },
      {
        psycube_id: 81,
        description: "S (술식)",
      },
      {
        psycube_id: 72,
        description: "A+",
      },
      {
        psycube_id: 61,
        description: "A+",
      },
    ],
    resonance: [
      {
        code: "APAkJAMmVCcFLUQoUSpQPEA8MDkSOxBIAkgATAFMEA",
        description: "크리티컬",
      },
      {
        code: "APAkLUQtFCQEJlQoUSpQPEA8MDgCOxBIAkgATBBMAQ",
        description: "데미지",
      },
    ],
    resonance_patterns: ["Equanimity", "Equibalance"],
  },
  {
    character_id: 53, // "카론"
    psycubes: [
      {
        psycube_id: 77,
        description: "S",
      },
      {
        psycube_id: 50,
        description: "A+",
      },
      {
        psycube_id: 46,
        description: "A-",
      },
      {
        psycube_id: 38,
        description: "A-",
      },
    ],
    resonance: [
      {
        code: "APwlJAQmAyhUKlMtIzxBPTA0UTQBQSJDIEQA",
        description: "범용",
      },
      {
        code: "APwlPGM8UzQFNAM6JDgiJwEpQUMAQlBAMEQQSFA",
        description: "생존",
      },
    ],
    resonance_patterns: ["Hyper"],
  },
  {
    character_id: 54, // "루부스카"
    psycubes: [
      {
        psycube_id: 82,
        description: "S",
      },
      {
        psycube_id: 83,
        description: "A+ (암석팟)",
      },
      {
        psycube_id: 15,
        description: "A",
      },
      {
        psycube_id: 34,
        description: "A",
      },
    ],
    resonance: [
      {
        code: "APxFMVMxUTAjOzE6QCkFKxU9AD0BNANIJEwCTBJIIg==",
        description: "범용",
      },
    ],
    resonance_patterns: ["Overindulgence"],
  },
  {
    character_id: 55, // "코르부스"
    psycubes: [
      {
        psycube_id: 40,
        description: "S",
      },
      {
        psycube_id: 42,
        description: "S (장기전)",
      },
      {
        psycube_id: 52,
        description: "A+",
      },
      {
        psycube_id: 84,
        description: "A",
      },
    ],
    resonance: [
      {
        code: "ADQANAI8IDwwKkD0NDtQOEJCVUAkKgQpFURU",
        description: "범용",
      },
    ],
    resonance_patterns: ["Elucidation"],
  },
  {
    character_id: 56, // "베릴"
    psycubes: [
      {
        psycube_id: 85,
        description: "S",
      },
      {
        psycube_id: 32,
        description: "S-",
      },
      {
        psycube_id: 40,
        description: "A+",
      },
      {
        psycube_id: 29,
        description: "A",
      },
    ],
    resonance: [],
    resonance_patterns: [],
  },
  {
    character_id: 57, // "브륌"
    psycubes: [
      // {
      //   psycube_id: 40,
      //   description: "S",
      // },
      // {
      //   psycube_id: 42,
      //   description: "S (장기전)",
      // },
      // {
      //   psycube_id: 52,
      //   description: "A+",
      // },
      // {
      //   psycube_id: 84,
      //   description: "A",
      // },
    ],
    resonance: [],
    resonance_patterns: [],
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
    resonance: [
      {
        code: "APwlNFU0BTxhPFElQCQCOiQ4Ei0AQTJCIEggSBA",
        description: "데미지",
      },
      {
        code: "ADQEPwY8ADkROhAxMCZQMUEwNDRTJ0X9Iw",
        description: "생존",
      },
    ],
    resonance_patterns: ["Hyper"],
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
        psycube_id: 88,
        description: "S (계시덱)",
      },
      {
        psycube_id: 10,
        description: "S- (천체덱)",
      },
    ],
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "범용",
      },
    ],
    resonance_patterns: ["Aspirational", "Hyperphrenia"],
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
    resonance: [
      {
        code: "ACZQ8CQmVCQELxQtRDlAOEI8ADwQNCI0IA",
        description: "범용",
      },
    ],
    resonance_patterns: ["Genuinity", "Equibalance"],
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
    resonance: [
      {
        code: "APQkK0Q4RTgFJQQkAS8RKFEqUDQyRABDIEEw",
        description: "크리티컬",
      },
      {
        code: "APQkOEU4BTxiPDA0QzQRJQQlACkCKkAxUA",
        description: "생존",
      },
    ],
    resonance_patterns: ["Aspirational", "Hyperphrenia"],
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
    resonance: [
      {
        code: "ADQEPwY8ADkROhAxMCZQMUEwNDRTJ0X9Iw",
        description: "범용",
      },
    ],
    resonance_patterns: ["Prudentiality"],
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
    resonance: [
      {
        code: "ADQRJQA5AjsTNAX4JC9EL0IvQCZQPDA8Yw",
        description: "데미지",
      },
    ],
    resonance_patterns: ["Genuinity", "Delirament"],
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
    resonance: [
      {
        code: "AEAASBE0AiQELRTwJC1EJlRFYEFSJEFBQCghKiA",
        description: "데미지",
      },
      {
        code: "APAkJAQmVC1ELRQoASoAJCFBIEEyRUBEUUZQNFI=",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Elucidation", "Equibalance"],
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
    resonance: [
      {
        code: "APAkLRQtREAQQVRDBUhmOQI7ETxgPFA0MjQwSAFMAA",
        description: "힐러",
      },
      {
        code: "APAkNBU0VSVEPAM5EjkARhBFMERAQyFAQUJCPGBMMw",
        description: "딜러",
      },
    ],
    resonance_patterns: ["Equibalance"],
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
        psycube_id: 82,
        description: "S (술식 보조)",
      },
      {
        psycube_id: 30,
        description: "A (장기전)",
      },
    ],
    resonance: [
      {
        code: "APwVMSMxEiUALAE8AzxDNFU0UzhBOTBIYExhTFBIQA",
        description: "힐러",
      },
    ],
    resonance_patterns: ["Quiescence"],
  },
  {
    character_id: 110, // "네크롤로지스트"
    psycubes: [
      {
        psycube_id: 83,
        description: "S (암석팟)",
      },
      {
        psycube_id: 82,
        description: "S (술식 보조)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 38,
        description: "S (딜 보조)",
      },
    ],
    resonance: [
      {
        code: "APgkLAUtREFUSGY5AzsSNDI0MDxgPFBCAUEQTAFIAA",
        description: "힐러",
      },
      {
        code: "APgkMRQqBDtEOjM8YzwgJAEmADRRNDFEQExgTDA",
        description: "생존",
      },
    ],
    resonance_patterns: ["Hyper", "Delirament"],
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
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "크리티컬",
      },
      {
        code: "APQkOEU4BSUEK0QkAS0RKwA0MjQwPFA8YA",
        description: "데미지",
      },
    ],
    resonance_patterns: ["Aspirational", "Hyperphrenia"],
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
    resonance: [
      {
        code: "APQkOEU4BTwCPGI0QzQTKxIrECkAJUAsQQ",
        description: "범용",
      },
    ],
    resonance_patterns: ["Stupefaction", "Hyperphrenia"],
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
    resonance: [
      {
        code: "APAkJwU0BDwAPBAwRTozO1MlIiZQNCBMQExSSFFIQQ",
        description: "데미지",
      },
    ],
    resonance_patterns: ["Equibalance"],
  },
  {
    character_id: 114, // "디거스"
    psycubes: [
      {
        psycube_id: 33,
        description: "S (술식 위주) (풀)",
      },
      {
        psycube_id: 72,
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
    resonance: [
      {
        code: "APAkJwU0BDwAPBAwRTozO1MlIiZQNCBMQExSSFFIQQ",
        description: "데미지",
      },
    ],
    resonance_patterns: ["Equanimity"],
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
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Aspirational"],
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
    resonance: [
      {
        code: "ACZQ8CQmVCQELxQtRDlAOEI8ADwQNCI0IA",
        description: "데미지",
      },
    ],
    resonance_patterns: ["Genuinity", "Equibalance"],
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
    resonance: [
      {
        code: "APAkJwUoVCogNEQ0BDxgPFA7MDgiQgJAAEgCSBE",
        description: "중독덱",
      },
      {
        code: "ACZQ8CQmVCQELxQtRDlAOEI8ADwQNCI0IA",
        description: "데미지",
      },
    ],
    resonance_patterns: ["Equibalance"],
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
    resonance: [
      {
        code: "APAkJwUkAyZULURAE0AQQhFIAkUAPDA8QCpQKFE",
        description: "크리티컬",
      },
      {
        code: "APAkLRQkBCQBJgA8IDwwRWJHYEBAKEEwRStETEI",
        description: "생존",
      },
    ],
    resonance_patterns: ["Equibalance"],
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
    resonance: [
      {
        code: "APgkMRQqBDtEOjM8YzwgJAEmADRRNDFEQExgTDA",
        description: "생존",
      },
      {
        code: "ADQRJQA5AjsTNAX4JC9EL0IvQCZQPDA8Yw",
        description: "데미지",
      },
    ],
    resonance_patterns: ["Hyper", "Delirament"],
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
    resonance: [
      {
        code: "APwlMTMxIjEgPBM8AzRVNFM6ADhBK0BMQUgSTAJIAQ",
        description: "힐러",
      },
      {
        code: "ADQEPwY8ADkROhAxMCZQMUEwNDRTJ0X9Iw",
        description: "생존",
      },
    ],
    resonance_patterns: ["Overindulgence"],
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
    resonance: [
      {
        code: "APAkJAQlQC0UMEU5QjtTRFFMUkxiPAA8EDQiNCA",
        description: "생존",
      },
      {
        code: "APAkLRQkBDwAPBA0IjQgOkA7UUFFQVRAQ0hmTEJMQQ",
        description: "힐러/생존",
      },
    ],
    resonance_patterns: ["Equibalance"],
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
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "크리티컬",
      },
      {
        code: "APQkJQQ4BThFK0QoUSpQJAEtEUMyQTFEMEYARSA",
        description: "크리티컬 (12공명 이상)",
      },
    ],
    resonance_patterns: ["Stupefaction", "Hyperphrenia"],
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
    resonance: [
      {
        code: "APwlMTMxIjEgPBM8AzRVNFM6ADhBK0BMQUgSTAJIAQ",
        description: "HP",
      },
      {
        code: "ADQEPwY8ADkROhAxMCZQMUEwNDRTJ0X9Iw",
        description: "생존",
      },
    ],
    resonance_patterns: ["Overindulgence", "Equanimity"],
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
    resonance: [
      {
        code: "ACUALAFAMEIxKlAoUUQzQhJIAzgFOEUrRCUE9CQ",
        description: "데미지",
      },
    ],
    resonance_patterns: ["Elucidation"],
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
    resonance: [
      {
        code: "AD0GPQX8RTFTMUIxMTtQNANDIzQgOAFAAExATFA",
        description: "데미지",
      },
    ],
    resonance_patterns: ["Hyper"],
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
    resonance: [
      {
        code: "APgkJAQwRTQUPAA8EDQgJSI6MztTRFFGUEhSSEFMYkxA",
        description: "범용",
      },
    ],
    resonance_patterns: ["Delirament"],
  },
  {
    character_id: 127, // "네임데이"
    psycubes: [
      {
        psycube_id: 38,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 83,
        description: "S (암석팟)",
      },
      {
        psycube_id: 82,
        description: "S (술식 보조)",
      },
      {
        psycube_id: 34,
        description: "S (딜 보조)",
      },
    ],
    resonance: [
      {
        code: "ADQEPwY8ADkROhAxMCZQMUEwNDRTJ0X9Iw",
        description: "생존",
      },
    ],
    resonance_patterns: ["Equanimity"],
  },
  {
    character_id: 128, // "알렉시오스"
    psycubes: [
      {
        psycube_id: 79,
        description: "S (에지오 없을때)",
      },
      {
        psycube_id: 36,
        description: "S (딜 보조)",
      },
      {
        psycube_id: 9,
        description: "A- (비상성)",
      },
      {
        psycube_id: 7,
        description: "B",
      },
    ],
    resonance: [
      {
        code: "APQkK0Q4RTgFJQQkAS8RKFEqUDQyRABDIEEw",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Elucidation"],
  },
  {
    character_id: 129, // "버디 페어차일드"
    psycubes: [
      {
        psycube_id: 36,
        description: "S",
      },
      {
        psycube_id: 49,
        description: "A+",
      },
      {
        psycube_id: 9,
        description: "A (비상성)",
      },
      {
        psycube_id: 75,
        description: "A",
      },
    ],
    resonance: [
      {
        code: "ACZQ8CQmVCQELxQtRDlAOEI8ADwQNCI0IA",
        description: "딜러",
      },
      {
        code: "APAkJAQtFC1EJlQ8ADwQNCA0IjhCOUBFYURQ",
        description: "크리티컬",
      },
    ],
    resonance_patterns: ["Elucidation"],
  },
];
