export interface CharacterGuide {
  character_id: number;
  portrait_info?: {
    headers?: string[];
    rows?: {
      name: string;
      efficiencies: [string, string?, string?, string?, string?, string?];
    }[];
    summary?: string;
    source?: string;
    note?: string; // ※로 시작하는 주석이 있는 경우
  };
  youtube_links: string[];
  keywords?: string[];
  guide_images: number[];
}

export const characterGuideList: CharacterGuide[] = [
  {
    character_id: 1, // 드루비스
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["0%(실전 약 11.39%)", "0%(실전 약 6.42%)", "0%(실전 약 5.11%)"],
        },
        {
          name: "2형상",
          efficiencies: ["3.62%", "4.57%", "5.8%"],
        },
        {
          name: "3형상",
          efficiencies: ["7.29%", "9.21%", "9.72%"],
        },
        {
          name: "4형상",
          efficiencies: ["10.92%", "13.79%", "15.52%"],
        },
        {
          name: "5형상",
          efficiencies: ["12.56%", "15.87%", "17.28%"],
        },
      ],
      summary: "1형상 > 2형상 > 3형상 > 4형상 > 5형상 (1인기준)",
      source: "米嘉·风焰",
      note: "1형상의 효율이 0%인것은 작성자분께서 사이클을 다르게 운용하셨기 때문이니 참고 바람. 실전 효율은 다른 형상보다 1형상이 압도적 우세.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=C9zX9KC02HE"],
    keywords: ["서포터", "석화", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 2, // 릴리아
    portrait_info: {
      headers: ["형상", "1인 기준", "다인전 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["4.7%", "3.94%"],
        },
        {
          name: "2형상",
          efficiencies: ["6.62%", "3.11%"],
        },
        {
          name: "3형상",
          efficiencies: ["2.91%", "2.42%"],
        },
        {
          name: "4형상",
          efficiencies: ["0%", "0%"],
        },
        {
          name: "5형상",
          efficiencies: ["4.28%", "3.59%"],
        },
      ],
      summary: "1형상 > 5형상 > 3형상 > 2형상 > 4형상 (1인 기준)",
      source: "米嘉·风焰",
      note: "1형상이 가장 효율이 높으며, 형상 효율이 대체적 낮음. 4형상 효율이 0%인 이유는 최종술식 흡혈률 증가가 효과이기 때문",
    },
    youtube_links: ["https://www.youtube.com/watch?v=7CCtUuXgupQ"],
    keywords: ["딜러", "추가공격", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 3, // A 나이트
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["9.1%", "11.01%", "13.53%"],
        },
        {
          name: "2형상",
          efficiencies: ["12.95%", "13.34%", "15.44%"],
        },
        {
          name: "3형상",
          efficiencies: ["17.5%", "18.84%", "22.21%"],
        },
        {
          name: "4형상",
          efficiencies: ["20.39%", "22.34%", "25.08%"],
        },
        {
          name: "5형상",
          efficiencies: ["20.39%", "22.34%", "25.08%"],
        },
      ],
      summary: "1형상 > 3형상 > 2형상 > 4형상 > 5형상 (1인기준)",
      source: "米嘉·风焰",
      // note: "가장 효율이 높은 형상은 1형상.",
    },
    youtube_links: [],
    keywords: ["딜러", "처치시효과", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 4, // 소더비
    portrait_info: {
      headers: ["형상", "1/2인 기준", "3인 기준", "HPM"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["12.29%", "15.18%", "0%"],
        },
        {
          name: "2형상",
          efficiencies: ["23.09%", "24.06%", "0%"],
        },
        {
          name: "3형상",
          efficiencies: ["23.09%", "24.06%", "17.24%"],
        },
        {
          name: "4형상",
          efficiencies: ["29.24%", "31.65%", "17.24%"],
        },
        {
          name: "5형상",
          efficiencies: ["40.03%", "40.53%", "17.24%"],
        },
      ],
      summary: "1형상 > 2형상 > 5형상 > 4형상 > 3형상 (1/2인 딜량 기준 )",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 DPM기준 1형상, HPM기준 3형상.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=M0YvicWAlO4"],
    keywords: ["힐러", "중독", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 5, // 레굴루스
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["13.42%", "16.18%", "19.53%"],
        },
        {
          name: "2형상",
          efficiencies: ["16.83%", "18.24%", "21.18%"],
        },
        {
          name: "3형상",
          efficiencies: ["19.39%", "21.32%", "23.67%"],
        },
        {
          name: "4형상",
          efficiencies: ["26.10%", "29.41%", "33.43%"],
        },
        {
          name: "5형상",
          efficiencies: ["26.10%", "29.41%", "33.43%"],
        },
      ],
      summary: "1형상 > 4형상 > 2형상 > 3형상 > 5형상 (1인기준)",
      source: "米嘉·风焰",
      note: "5형상 효과는 [신나는 로큰롤] 지속시간 연장이기에 효율 0%",
    },
    youtube_links: [],
    keywords: ["딜러", "계시", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 6, // 센츄리온
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["5.57%", "3.64%", "3.15%"],
        },
        {
          name: "2형상",
          efficiencies: ["9.53%", "8.82%", "9.87%"],
        },
        {
          name: "3형상",
          efficiencies: ["12.46%", "12.64%", "13.18%"],
        },
        {
          name: "4형상",
          efficiencies: ["16.42%", "17.82%", "19.9%"],
        },
        {
          name: "5형상",
          efficiencies: ["20.13%", "20.24%", "22%"],
        },
      ],
      summary: "1형상 > 2형상 > 4형상 > 5형상 > 3형상 (1인기준)",
      source: "米嘉·风焰",
      // note: "가장 효율이 높은 형상은 1형상.",
    },
    youtube_links: [],
    keywords: ["딜러", "열정", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 7, // 안안 리
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["3.29%", "5.21%", "6.46%"],
        },
        {
          name: "2형상",
          efficiencies: ["11.82%", "11.96%", "12.06%"],
        },
        {
          name: "3형상",
          efficiencies: ["15.11%", "17.17%", "18.52%"],
        },
        {
          name: "4형상",
          efficiencies: ["23.64%", "23.93%", "24.11%"],
        },
        {
          name: "5형상",
          efficiencies: ["26.93%", "29.13%", "30.57%"],
        },
      ],
      summary: "2형상 > 4형상 > 1형상 > 3형상 > 5형상",
      source: "米嘉·风焰",
      // note: "가장 효율이 높은 형상은 1형상.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=ZSmhKhkhzmg"],
    keywords: ["서포터", "상태이상", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 8, // 메디슨 포켓
    portrait_info: {
      headers: ["형상", "힐량", "딜량"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["0%", "14.81%"],
        },

        {
          name: "2형상",
          efficiencies: ["0%", "22.21%"],
        },
        {
          name: "3형상",
          efficiencies: ["5.3%", "22.21%"],
        },
        {
          name: "4형상",
          efficiencies: ["12%", "22.21%"],
        },
        {
          name: "5형상",
          efficiencies: ["12%", "22.21%"],
        },
      ],
      summary: "1형상 > 2형상 > 3형상 = 4형상 = 5형상 (힐량기준)",
      source: "米嘉·风焰",
      note: "힐러로서의 역할로는 1형상의 효율이 가장 높으며, 3-4형상이 효율 폭은 좋음, 하지만 효과는 미미함.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=fjJzzYF-1YM"],
    keywords: ["힐러", "자해", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 9, // 이터니티
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["3.75%", "4.77%", "6.26%"],
        },
        {
          name: "2형상",
          efficiencies: ["8.05%", "7.52%", "8.66%"],
        },
        {
          name: "3형상",
          efficiencies: ["12.36%", "13.01%", "13.47%"],
        },
        {
          name: "4형상",
          efficiencies: ["12.36%", "13.01%", "13.47%"],
        },
        {
          name: "5형상",
          efficiencies: ["16.1%", "17.78%", "19.73%"],
        },
      ],
      summary: "2형상 > 3형상 > 1형상 > 5형상 > 4형상 (1인기준)",
      source: "米嘉·风焰",
      note: "1형상의 효율이 0%인것은 작성자가 사이클을 다르게 운용하셨기 때문이니 참고 바람. 실전 효율은 다른 형상보다 1형상이 압도적 우세.",
    },
    youtube_links: [],
    keywords: ["서포터", "자해", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 10, // 뉴바벨
    portrait_info: {
      headers: ["형상", "스킬 합성 사이클 기준", "카드 사이클 비유지 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["8.7%", "7.51%"],
        },
        {
          name: "2형상",
          efficiencies: ["9.8%", "9.62%"],
        },
        {
          name: "3형상",
          efficiencies: ["18.51%", "17.14%"],
        },
        {
          name: "4형상",
          efficiencies: ["27.21%", "24.65%"],
        },
        {
          name: "5형상",
          efficiencies: ["27.21%", "24.65%"],
        },
      ],
      summary: "1형상 > 3형상 > 4형상 > 2형상 > 5형상 (스킬 합성 사이클 기준)",
      source: "米嘉·风焰",
      note: "5형상 효율이 0인 이유는 2스킬 보호막 부여량 증가가 효과이기 때문.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=OaS3DqsKkyc"],
    keywords: ["탱커", "보호막", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 11, // 보이저
    portrait_info: {
      headers: ["형상", "1인 기준", "다인전 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["5.15%", "4.27%"],
        },
        {
          name: "2형상",
          efficiencies: ["7.20%", "7.68%"],
        },
        {
          name: "3형상",
          efficiencies: ["12.35%", "11.95%"],
        },
        {
          name: "4형상",
          efficiencies: ["17.50%", "16.22%"],
        },
        {
          name: "5형상",
          efficiencies: ["22.65%", "20.50%"],
        },
      ],
      summary: "1형상 > 3형상 > 4형상 > 5형상 > 2형상 (1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 1형상, 하지만 실전성으로는 2형상이 더 높음.",
    },
    youtube_links: [],
    keywords: ["서포터", "계시", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 12, // 멜라니아
    portrait_info: {
      headers: ["형상", "1인 기준", "다인전 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["7.04%", "6.14%"],
        },
        {
          name: "2형상",
          efficiencies: ["13.61%", "11.23%"],
        },
        {
          name: "3형상",
          efficiencies: ["1.88%", "1.69%"],
        },
        {
          name: "4형상",
          efficiencies: ["1.38%", "2.49%"],
        },
        {
          name: "5형상",
          efficiencies: ["7%", "6.24%"],
        },
      ],
      summary: "2형상 > 1형상 > 5형상 > 3형상 > 4형상 (1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 2형상",
    },
    youtube_links: ["https://www.youtube.com/watch?v=fjJzzYF-1YM"],
    keywords: ["서포터", "술식위주", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 13, // 피클즈
    portrait_info: {
      headers: ["형상", "1인 기준", "다인전 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["6.84%", "5.57%"],
        },
        {
          name: "2형상",
          efficiencies: ["10.54%", "9.85%"],
        },
        {
          name: "3형상",
          efficiencies: ["12.21%", "11.11%"],
        },
        {
          name: "4형상",
          efficiencies: ["14.53%", "15.08%"],
        },
        {
          name: "5형상",
          efficiencies: ["21.38%", "20.65%"],
        },
      ],
      summary: "1형상 > 5형상 > 2형상 > 4형상 > 3형상 (1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 1형상, 하지만 실전 효율로 따지면 최종 술식 계수 증가인 2형상도 높음.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=ZSmhKhkhzmg"],
    keywords: ["서포터", "버프제거", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 14, // 투스 페어리
    portrait_info: {
      headers: ["형상", "DPM", "HPM"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["12.65%", "0%"],
        },
        {
          name: "2형상",
          efficiencies: ["12.65%", "0%"],
        },
        {
          name: "3형상",
          efficiencies: ["17.55%", "0%"],
        },
        {
          name: "4형상",
          efficiencies: ["17.55%", "10.27%"],
        },
        {
          name: "5형상",
          efficiencies: ["22.81%", "0%"],
        },
      ],
      summary: "1형상 > 5형상 > 3형상 > 2형상 = 4형상 (DPM기준)",
      source: "米嘉·风焰",
      note: "단순 자체 성능으론 DPM에선 1형상, HPM에선 4형상이 효율이 높지만, 패시브인 [유치] 관련 옵션을 건드리는 2형상과 5형상 옵션이 자체 성능보단 다른 팀원의 DPM 효율을 상승시켜주므로 실제론 2,5형상이 고효율임.",
    },
    youtube_links: [],
    keywords: ["힐러", "치명타", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 15, // 제시카
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["4.76%", "6.02%", "7.66%"],
        },
        {
          name: "2형상",
          efficiencies: ["7.73%", "8.84%", "10.86%"],
        },
        {
          name: "3형상",
          efficiencies: ["11.38%", "11.14%", "12.81%"],
        },
        {
          name: "4형상",
          efficiencies: ["15.03%", "15.75%", "16.73%"],
        },
        {
          name: "5형상",
          efficiencies: ["19.79%", "21.77%", "24.39%"],
        },
      ],
      summary: "1형상 > 5형상 > 3형상 > 4형상 > 2형상 (1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 1형상, 하지만 실전 효율은 2형상임. 물론 제시카는 명함 완성형 딜러인지라 최고 효율은 명함",
    },
    youtube_links: [],
    keywords: ["딜러", "중독", "상태이상", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 16, // 갈라보나
    portrait_info: {
      headers: ["형상", "1인 기준", "다인전 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["6%", "7%"],
        },
        {
          name: "2형상",
          efficiencies: ["6.84%", "1.94%"],
        },
        {
          name: "3형상",
          efficiencies: ["11.42%", "5.9%"],
        },
        {
          name: "4형상",
          efficiencies: ["13%", "8.43%"],
        },
        {
          name: "5형상",
          efficiencies: ["19.94%", "15.42%"],
        },
      ],
      summary: "5형상 > 1형상 > 2형상 > 3형상 > 4형상 (1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 5형상, 실전 기준으론 1형상의 효율도 좋음.",
    },
    youtube_links: [],
    keywords: ["딜러", "???", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 17, // 갈기 모래
    portrait_info: {
      headers: [
        "형상",
        "단기전 1인 기준",
        "단기전 2인 기준",
        "단기전 3인 기준",
        "장기전 1인 기준",
        "장기전 2인 기준",
        "장기전 3인 기준",
      ],
      rows: [
        {
          name: "1형상",
          efficiencies: ["6%", "4.62%", "3.75%", "0%", "0%", "0%"],
        },
        {
          name: "2형상",
          efficiencies: ["11.45%", "8.93%", "7.31%", "13.49%", "10.12%", "8.09%"],
        },
        {
          name: "3형상",
          efficiencies: ["3.39%", "2.7%", "2.25%", "2.35%", "1.82%", "1.48%"],
        },
        {
          name: "4형상",
          efficiencies: ["6.4%", "9.08%", "26.22%", "24.84%", "23.63%", "22.9%"],
        },
        {
          name: "5형상",
          efficiencies: ["50.96%", "43.81%", "39.35%", "48.18%", "41.13%", "36.9%"],
        },
      ],
      summary: "5형상 > 2형상 > 4형상 > 1형상 > 3형상 (단기전 1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 5형상이지만, 다인전 기준으론 4형상이 최고효율.",
    },
    youtube_links: [],
    keywords: ["서포터", "술식위주", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 18, // 37
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["8.56%", "8.56%", "8.56%"],
        },
        {
          name: "2형상",
          efficiencies: ["24.17%", "28.43%", "33.75%"],
        },
        {
          name: "3형상",
          efficiencies: ["35.42%", "42.25%", "50.71%"],
        },
        {
          name: "4형상",
          efficiencies: ["54.3%", "66.27%", "81.17%"],
        },
        {
          name: "5형상",
          efficiencies: ["68.77%", "84.06%", "102.98%"],
        },
      ],
      summary: "2형상 > 4형상 > 5형상 > 3형상 > 1형상 (1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 2형상",
    },
    youtube_links: ["https://www.youtube.com/watch?v=7x_liG9kr9E"],
    keywords: ["딜러", "추가공격", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 19, // 6
    portrait_info: {
      headers: ["형상", "1인 기준", "다인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["8.21%", "6.96%"],
        },
        {
          name: "2형상",
          efficiencies: ["14.22%", "12.9%"],
        },
        {
          name: "3형상",
          efficiencies: ["14.22%", "12.9%"],
        },
        {
          name: "4형상",
          efficiencies: ["22.88%", "20.25%"],
        },
        {
          name: "5형상",
          efficiencies: ["44.54%", "38.62%"],
        },
      ],
      summary: "5형상 > 1형상 > 4형상 > 2형상 > 3형상 (1인기준)",
      source: "米嘉·风焰",
      note: "DPM 면에서는 5형상이 가장 효율이 높지만, 주 역할인 서포터로서 활용하려면 2형상의 효율이 정말 높음",
    },
    youtube_links: ["https://www.youtube.com/watch?v=eUR6VslupCc"],
    keywords: ["서포터", "버프", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 20, // 스파토데아
    portrait_info: {
      headers: ["형상", "최종 술식 치명타 옵션 X 1인 기준", "최종 술식 치명타 옵션 O 1인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["2.87%", "2.58%"],
        },
        {
          name: "2형상",
          efficiencies: ["9.59%", "10.08%"],
        },
        {
          name: "3형상",
          efficiencies: ["19.33%", "27.57%"],
        },
        {
          name: "4형상",
          efficiencies: ["24.28%", "31.92%"],
        },
        {
          name: "5형상",
          efficiencies: ["39.29%", "56.32%"],
        },
      ],
      summary: "5형상 > 3형상 > 2형상 > 4형상 > 1형상 (1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 5형상이며, 5형상을 제외하곤 3형상이 핵심임.",
    },
    youtube_links: [],
    keywords: ["딜러", "연소", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 21, // 에즈라
    portrait_info: {
      headers: ["형상", "1인 기준 DPM", "다인전 기준  DPM", "실드 HPM"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["0%", "0%", "0%"],
        },
        {
          name: "2형상",
          efficiencies: ["0%", "0%", "0%"],
        },
        {
          name: "3형상",
          efficiencies: ["0%", "0%", "33.33%"],
        },
        {
          name: "4형상",
          efficiencies: ["29.35%", "20.35%", "0%"],
        },
        {
          name: "5형상",
          efficiencies: ["0%", "0%", "0%"],
        },
      ],
      summary: "4형상 > 1형상 = 2형상 = 3형상 = 5형상 (1인기준 DPM)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 3형상 또는 4형상, 하지만 에즈라는 버프 위주의 서포터이고, 실전에선 큰 도움이 되지 않으므로, 최고 효율은 사실상 명함임",
    },
    youtube_links: [],
    keywords: ["서포터", "전력", "자해", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 22, // 곡랑
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["6.58%", "7.6%", "5.4%"],
        },
        {
          name: "2형상",
          efficiencies: ["26.97%", "25.29%", "22.12%"],
        },
        {
          name: "3형상",
          efficiencies: ["38.52%", "36.67%", "33.22%"],
        },
        {
          name: "4형상",
          efficiencies: ["72.82%", "40.41", "36.76%"],
        },
        {
          name: "5형상",
          efficiencies: ["57.75%", "54.04%", "49.81%"],
        },
      ],
      summary: "2형상 > 5형상 > 3형상 > 1형상 > 4형상 (1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 2형상과 5형상임",
    },
    youtube_links: ["https://www.youtube.com/watch?v=w7XNEWOqvTA"],
    keywords: ["딜러", "추가공격", "현실피해", "한정"],
    guide_images: [],
  },
  {
    character_id: 23, // 갈천
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["15.55%", "11.14%", "11.81%"],
        },
        {
          name: "2형상",
          efficiencies: ["20.61%", "16.67%", "17.65%"],
        },
        {
          name: "3형상",
          efficiencies: ["41.63%", "39.67%", "42.07%"],
        },
        {
          name: "4형상",
          efficiencies: ["54.79%", "46.77%", "47%"],
        },
        {
          name: "5형상",
          efficiencies: ["71.08%", "64.59%", "65.8%"],
        },
      ],
      summary: "3형상 > 1형상 > 5형상 > 4형상 > 2형상 (1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 3형상.",
    },
    youtube_links: [],
    keywords: ["서포터", "술진", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 24, // 이졸데
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["18.22%", "16.56%", "16.7%"],
        },
        {
          name: "2형상",
          efficiencies: ["18.22%", "16.56%", "16.7%"],
        },
        {
          name: "3형상",
          efficiencies: ["36.44%", "33.12%", "33.4%"],
        },
        {
          name: "4형상",
          efficiencies: ["3.55%", "4.48%", "3.56%"],
        },
        {
          name: "5형상",
          efficiencies: ["17.2%", "15.87%", "16.12%"],
        },
      ],
      summary: "1형상 > 5형상 > 3형상 > 4형상 > 2형상 (1인기준)",
      source: "米嘉·风焰",
      note: "2형상은 예열이 1턴에서 2턴 빨라지는 효과가 있으므로 단기전 실전에서 효율이 있음.",
    },
    youtube_links: [],
    keywords: ["서포터", "연소", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 25, // 마커스
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["0%", "0%", "0%"],
        },
        {
          name: "2형상",
          efficiencies: ["3.64%", "3.59%", "3.18%"],
        },
        {
          name: "3형상",
          efficiencies: ["10.16%", "13.39%", "11.86%"],
        },
        {
          name: "4형상",
          efficiencies: ["29.06%", "31.45%", "27.86%"],
        },
        {
          name: "5형상",
          efficiencies: ["39%", "38.9%", "34.46%"],
        },
      ],
      summary: "4형상 > 5형상 > 3형상 > 2형상 > 1형상 (1인기준)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 4형상이며, 형상 효율이 대체적으로 낮음.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=PZ12Oi3NRQw"],
    keywords: ["딜러", "성급강화", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 26, // 빌라
    portrait_info: {
      headers: ["형상", "자가 성능 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["28~31%"],
        },
        {
          name: "2형상",
          efficiencies: ["40~49%"],
        },
        {
          name: "3형상",
          efficiencies: ["56~74%"],
        },
        {
          name: "4형상",
          efficiencies: ["65~88%"],
        },
        {
          name: "5형상",
          efficiencies: ["70~99%"],
        },
      ],
      summary: "1형상 > 3형상 > 2형상 > 4형상 > 5형상 (자가 성능 효율)",
      source: "米嘉·风焰",
      note: "빌라는 공격기가 없어 딜러마다 형상 효율이 다 다르므로 자가 성능 효율만 기술.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=klG_OXFknB8"],
    keywords: ["힐러", "단일힐위주", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 27, // 윈드송
    portrait_info: {
      headers: ["형상", "1인 기준", "다인전 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["13.84%", "11.36%"],
        },
        {
          name: "2형상",
          efficiencies: ["27.98%", "24.62%"],
        },
        {
          name: "3형상",
          efficiencies: ["35.38%", "31.47%"],
        },
        {
          name: "4형상",
          efficiencies: ["51.15%", "57.36%"],
        },
        {
          name: "5형상",
          efficiencies: ["66.81%", "70.21%"],
        },
      ],
      summary: "1형상 > 2형상 > 4형상 > 5형상 > 3형상 (1인기준)",
      source: "米嘉·风焰",
      note: "DPM 측정 사이클 기준은 2턴 합성 사이클이며, 매 최종 술식 당 최소 4번의 추공이 보장되어야 함.",
    },
    youtube_links: [],
    keywords: ["딜러", "추가공격", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 28, // 제멜바이스
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["9.4%"],
        },
        {
          name: "2형상",
          efficiencies: ["23.4%"],
        },
        {
          name: "3형상",
          efficiencies: ["34.6%"],
        },
        {
          name: "4형상",
          efficiencies: ["37.1%"],
        },
        {
          name: "5형상",
          efficiencies: ["47.9%"],
        },
      ],
      summary: "2형상 > 3형상 > 5형상 > 1형상 > 2형상 (전반적 효율)",
      source: "icehood",
      note: "가장 효율이 높은 형상은 2형상",
    },
    youtube_links: ["https://www.youtube.com/watch?v=erHEvLdiV9A"],
    keywords: ["딜러", "자해", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 29, // 루시
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["10.48%", "11.56%", "14.75%"],
        },
        {
          name: "2형상",
          efficiencies: ["17.55%", "18.9%", "22.26%"],
        },
        {
          name: "3형상",
          efficiencies: ["31.38%", "32.54%", "35.95%"],
        },
        {
          name: "4형상",
          efficiencies: ["37.55%", "39.34%", "44.63%"],
        },
        {
          name: "5형상",
          efficiencies: ["62.84%", "64.83%", "70.68%"],
        },
      ],
      summary: "2형상 > 1형상 > 5형상 >3형상 > 4형상 (1인기준)",
      source: "米嘉·风焰",
      note: "해당 형상 효율은 예열 뒤 추가타가 없는 기준인 것 참고 바람, 가장 효율이 높은 형상은 1형상임. 추가타를 포함하면, 형상효율이 더 높아짐.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=yjt0jZfHVpw"],
    keywords: ["딜러", "추가공격", "전력", "현실피해", "한정"],
    guide_images: [],
  },
  {
    character_id: 30, // 카카니아
    portrait_info: {
      headers: ["형상", "1인 기준", "2인 기준", "3인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["0%", "0%", "0%"],
        },
        {
          name: "2형상",
          efficiencies: ["14.83%", "23.83%", "29.87%"],
        },
        {
          name: "3형상",
          efficiencies: ["88.1%", "116.43%", "135.43%"],
        },
        {
          name: "4형상",
          efficiencies: ["95.26%", "122.17%", "140.23%"],
        },
        {
          name: "5형상",
          efficiencies: ["119.1%", "141.32%", "156.23%"],
        },
      ],
      summary: "3형상 > 2형상 > 5형상 > 4형상 > 1형상 (1인기준 DPM)",
      source: "米嘉·风焰",
      note: "가장 효율이 높은 형상은 3형상이며, 1형상이 0%인 이유는 자신의 DPM(행동 당 피해) 수치이기 때문에 자기에게 버프를 줄 수 없기 때문(실제로는 성능 6.8% ~ 7.9% 증가). 형상 효율이 매우 높은 편",
    },
    youtube_links: ["https://www.youtube.com/watch?v=7TSeuUcjjzI"],
    keywords: ["탱커", "만능", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 31, // 머큐리아
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["4.6%"],
        },
        {
          name: "2형상",
          efficiencies: ["22.1%"],
        },
        {
          name: "3형상",
          efficiencies: ["30.6%"],
        },
        {
          name: "4형상",
          efficiencies: ["51.8%"],
        },
        {
          name: "5형상",
          efficiencies: ["123.8%"],
        },
      ],
      summary: "5형상 > 4형상 > 2형상 > 3형상 > 1형상 (전반적 효율)",
      source: "icehood",
      note: "가장 효율이 높은 형상은 5형상이며, 풀형상 효율이 정말 높음. 단순 계산으론 90.3%이지만 머큐리아의 서포트 기여도, 형상별 시너지로 인해 123.8%가 되었으며 실전 개선 체감은 그 이상이라는 말도 있음. 형상 효율 또한 전체적으로 높음.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=GsKVMZBnY9o"],
    keywords: ["서포터", "진급", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 32, // J
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["17.94%"],
        },
        {
          name: "2형상",
          efficiencies: ["24.62%"],
        },
        {
          name: "3형상",
          efficiencies: ["24.62%"],
        },
        {
          name: "4형상",
          efficiencies: ["29.7%"],
        },
        {
          name: "5형상",
          efficiencies: ["40.78%"],
        },
      ],
      summary: "1형상 > 2형상 > 5형상 > 4형상 > 3형상 (전반적 효율)",
      source: "icehood",
      note: "가장 효율이 높은 형상은 1형상, 형상 효율이 상당히 낮은 편이며, 연소 캐릭터와 함께 할 경우 2,3,5형상의 효율이 증가함. 3형상의 형상 효율이 0%인 이유는 보유 가능한 [연소] 스택 수만 올라가서임.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=L5kO-7YsSEQ"],
    keywords: ["딜러", "반격", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 33, // 튜즈데이
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["22.2%"],
        },
        {
          name: "2형상",
          efficiencies: ["34%"],
        },
        {
          name: "3형상",
          efficiencies: ["53.9%"],
        },
        {
          name: "4형상",
          efficiencies: ["66.8%"],
        },
        {
          name: "5형상",
          efficiencies: ["78.1%"],
        },
      ],
      summary: "1형상 > 3형상 > 2형상 > 4형상 > 5형상 (전반적 효율)",
      source: "icehood",
      note: "가장 효율이 높은 형상은 1형상, 이어서 3형상임.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=yo29EictM9c"],
    keywords: ["서포터", "중독", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 34, // 아르고스
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["13.84%"],
        },
        {
          name: "2형상",
          efficiencies: ["27.98%"],
        },
        {
          name: "3형상",
          efficiencies: ["35.38%"],
        },
        {
          name: "4형상",
          efficiencies: ["51.15%"],
        },
        {
          name: "5형상",
          efficiencies: ["66.81%"],
        },
      ],
      summary: "1형상 > 2형상 > 4형상 > 5형상 > 3형상 (전반적 효율)",
      source: "米嘉·风焰",
      note: "단순 DPM 피해 수치 계산으론 가장 효율이 높은 형상은 1형상, 하지만 서포터 능력의 개선율과 RDPM의 개선을 감안하면 2/4형상의 중요도가 더욱 높음.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=GSU-rQZwuLQ"],
    keywords: ["서포터", "단일약화", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 35, // 안조 날라
    portrait_info: {
      headers: ["형상", "영혼 지능 계약", "야수 나무 계약", "천체 암석 계약"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["6.7%", "6.9%", "27.1%"],
        },
        {
          name: "2형상",
          efficiencies: ["14.2%", "12.1%", "10.5%"],
        },
        {
          name: "3형상",
          efficiencies: ["8.7%", "14.9%", "6.9%"],
        },
        {
          name: "4형상",
          efficiencies: ["9.8%", "8.8%", "14.4%"],
        },
        {
          name: "5형상",
          efficiencies: ["20.6%", "32.2%", "19.1%"],
        },
      ],
      summary: "5형상 > 2형상 > 5형상 > 4형상 > 3형상 (영혼 지능 계약)",
      source: "icehood (표는 이전 형상대비 상승량 수치임)",
      note: "애정 등이 아니라면 사실상 명함으로 사용해도 무리가 아닌 명함 완성형 캐릭터. 형상 효율이 그닥 높지는 않으며, 효율이 가장 높은 형상은 영혼 지능은 2,5형상이 효율이 좋고, 천체 암석은 1형상, 5형상이 좋음. 그리고 야수 나무는 2형상, 5형상이 좋음.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=IZvMbLu3Apc"],
    keywords: ["딜러", "추가공격", "술식위주", "정신피해", "한정"],
    guide_images: [],
  },
  {
    character_id: 36, // 로페라
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["9.4%"],
        },
        {
          name: "2형상",
          efficiencies: ["9.7%"],
        },
        {
          name: "3형상",
          efficiencies: ["0~30%"],
        },
        {
          name: "4형상",
          efficiencies: ["10.4%"],
        },
        {
          name: "5형상",
          efficiencies: ["7.5%"],
        },
      ],
      summary: "4형상 > 2형상 > 1형상 > 5형상 > 3형상 (전반적 효율)",
      source: "icehood",
      note: "전반적으로 로페라는 기형적인 3형상을 제외하면 형상 효율이 대체적으로 낮은 편이며, 해당 자료에서 효율이 가장 높은 형상은 4형상임. 상황에 따라 3형상이 30%라는 폭발적인 효과를 보임. 이 이유는 3형상의 효과가 [도가니 화약고] 술진 지속시간 +1턴이기 때문임.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=TPgyXKKRlVI"],
    keywords: ["힐러", "서포터", "치명타", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 37, // 윌로우
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["17%"],
        },
        {
          name: "2형상",
          efficiencies: ["17%"],
        },
        {
          name: "3형상",
          efficiencies: ["4%"],
        },
        {
          name: "4형상",
          efficiencies: ["4%"],
        },
        {
          name: "5형상",
          efficiencies: ["10%"],
        },
      ],
      summary: "1형상 = 2형상 > 5형상 > 3형상 = 4형상 (전반적 효율)",
      source: "YuuYuiko",
      note: "2형상의 효율이 가장 높다고 볼 수 있지만, 전반적으로 형상 효율 정보에 대해선 가볍게 보길 바람.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=gdA-6aCnQyU"],
    keywords: ["딜러", "중독", "정신피해"],
    guide_images: [1],
  },
  {
    character_id: 38, // 플러터 페이지
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["15~20%"],
        },
        {
          name: "2형상",
          efficiencies: ["6.5~8.3%"],
        },
        {
          name: "3형상",
          efficiencies: ["20~22.2%"],
        },
        {
          name: "4형상",
          efficiencies: ["10~12%"],
        },
        {
          name: "5형상",
          efficiencies: ["16~25%"],
        },
      ],
      summary: "3형상 > 1형상 > 5형상 > 4형상 > 2형상 (전반적 효율)",
      source: "icehood",
      note: "행동 횟수 추가 턴을 원래 1턴에서 2턴으로 늘려주는 1형상이 효율과 관계없이 가장 추천됨.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=fbyCbPicNOY"],
    keywords: ["서포터", "추가공격", "현실피해"],
    guide_images: [1],
  },
  {
    character_id: 39, // 바르카롤라
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["10.7%"],
        },
        {
          name: "2형상",
          efficiencies: ["12.7%"],
        },
        {
          name: "3형상",
          efficiencies: ["3.2%"],
        },
        {
          name: "4형상",
          efficiencies: ["3.9%"],
        },
        {
          name: "5형상",
          efficiencies: ["12.2%"],
        },
      ],
      summary: "2형상 > 5형상 > 1형상 > 4형상 > 3형상 (전반적 효율)",
      source: "icehood",
      note: "형상 효율이 평균적이며 2형상이 가장 효율 형상이라 볼수 있겠음. 물론 즉흥 주문의 폭발적인 딜로 인해 명함으로도 충분함.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=J__x5Ne676g"],
    keywords: ["딜러", "계시", "정신피해"],
    guide_images: [1],
  },
  {
    character_id: 40, // 파투투
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["??"],
        },
        {
          name: "2형상",
          efficiencies: ["??"],
        },
        {
          name: "3형상",
          efficiencies: ["??"],
        },
        {
          name: "4형상",
          efficiencies: ["??"],
        },
        {
          name: "5형상",
          efficiencies: ["??"],
        },
      ],
      summary: "1형상 > 4형상 ? 5형상 ? 2형상 ? 3형상 (전반적 효율)",
      source: "X",
      note: "형상 효율이 계산되지 않을 정도로, 형상이 의미가 없을 정도이며, 굳이 따지면, 1형상이 파투투의 효율 형상이라 볼 수 있음.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=MFYzAmYsgqc"],
    keywords: ["힐러", "추가공격", "정신피해"],
    guide_images: [1],
  },
  {
    character_id: 41, // 양월
    portrait_info: {
      headers: ["형상", "보수적 사이클", "행동력 몰아주기 사이클"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["39%", "20%"],
        },
        {
          name: "2형상",
          efficiencies: ["23%", "14%"],
        },
        {
          name: "3형상",
          efficiencies: ["0%", "0%"],
        },
        {
          name: "4형상",
          efficiencies: ["4%", "4%"],
        },
        {
          name: "5형상",
          efficiencies: ["45%", "50%"],
        },
      ],
      summary: "5형상 > 1형상 > 2형상 > 4형상 > 3형상 (보수적 사이클)",
      source: "安可_彩色歌谣",
      note: "1형상의 경우 최종술식을 사용하면 나오는 강량의 지속시간은 1턴 연장하고, 녹색 구역과 홍색 구역의 길이가 1칸씩 늘어남. 실제 사용해보면 1형상 체감이 가장 크게 되는편",
    },
    youtube_links: ["https://www.youtube.com/watch?v=6lH6WorFwwM"],
    keywords: ["딜러", "추가공격", "현실피해", "한정"],
    guide_images: [1],
  },
  {
    character_id: 42, // 누아르
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["5~10%"],
        },
        {
          name: "2형상",
          efficiencies: ["0~5%"],
        },
        {
          name: "3형상",
          efficiencies: ["20~30%"],
        },
        {
          name: "4형상",
          efficiencies: ["5~10%"],
        },
        {
          name: "5형상",
          efficiencies: ["10~20%"],
        },
      ],
      summary: "3형상 > 5형상 > 1형상 > 4형상 > 2형상 (전반적 효율)",
      source: "icehood",
      note: "형상을 고려하는 중이라면 그나마 3형상을 추천함.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=YA3q6w9ZOxc"],
    keywords: ["딜러", "술식위주", "상태이상", "정신피해"],
    guide_images: [1],
  },
  {
    character_id: 43, // 레콜레타
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["30%"],
        },
        {
          name: "2형상",
          efficiencies: ["9%"],
        },
        {
          name: "3형상",
          efficiencies: ["6%"],
        },
        {
          name: "4형상",
          efficiencies: ["1%"],
        },
        {
          name: "5형상",
          efficiencies: ["6%"],
        },
      ],
      summary: "1형상 > 2형상 > 5형상 = 3형상 > 4형상 (전반적 효율)",
      source: "icehood (광상 멜라니아가 포함되어있을 때)",
      note: "1형상을 하게 되면 최종술식 사용으로 얻는 [사전 준비-레콜레타]의 최대 상한이 2로 늘어 이론상 1턴 멜라니아 3 최종 술식으로 [정해진 계획] 3스택을 빠르게 얻을 수 있어 정말 좋음.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=HK1jEmvzJSw"],
    keywords: ["메인딜러", "술식위주", "현실피해"],
    guide_images: [1],
  },
  {
    character_id: 44, // 알레프
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["20%"],
        },
        {
          name: "2형상",
          efficiencies: ["12%"],
        },
        {
          name: "3형상",
          efficiencies: ["11%"],
        },
        {
          name: "4형상",
          efficiencies: ["7%"],
        },
        {
          name: "5형상",
          efficiencies: ["16%"],
        },
      ],
      summary: "1형상 > 5형상 > 2형상 > 3형상 > 4형상 (전반적 효율)",
      source: "icehood",
      note: "알레프의 1형상은 3통찰의 효과중 [신기한 빛]사용시 1 회수 확률을 25%에서 50%로 올려주므로 알레프의 단점을 정말 줄여줄 수 있음. 그래서 가장 효율이 좋은 형상은 1형상, 그 뒤로 5형상, 2형상이 따라간다고 볼 수 있을것 같음.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=l1WbgHg3iM4"],
    keywords: ["서포터", "계시", "정신피해"],
    guide_images: [1],
  },
  {
    character_id: 45, // 히사베스
    portrait_info: {
      headers: ["형상", "단일 기준", "다인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["22%", "17%"],
        },
        {
          name: "2형상",
          efficiencies: ["0%", "0%"],
        },
        {
          name: "3형상",
          efficiencies: ["13%", "10%"],
        },
        {
          name: "4형상",
          efficiencies: ["10%", "18%"],
        },
        {
          name: "5형상",
          efficiencies: ["10%", "8%"],
        },
      ],
      summary: "1형상 > 3형상 > 4형상 = 5형상 > 2형상 (단일 기준)",
      source: "icehood",
      note: "2형상은 의미가 없을정도. (추가예정)",
    },
    youtube_links: ["https://www.youtube.com/watch?v=eR9gbWg0PyQ"],
    keywords: ["딜러", "술식위주", "정신피해"],
    guide_images: [1, 2, 3],
  },
  {
    character_id: 46, // 키페리나
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["2.5~5%"],
        },
        {
          name: "2형상",
          efficiencies: ["2.5~5%"],
        },
        {
          name: "3형상",
          efficiencies: ["2.5~5%"],
        },
        {
          name: "4형상",
          efficiencies: ["2.5~5%"],
        },
        {
          name: "5형상",
          efficiencies: ["2.5~5%"],
        },
      ],
      summary: "1형상 = 2형상 = 3형상 = 4형상 = 5형상 (전반적 효율)",
      source: "icehood",
      note: "형상효율을 정확하게 계산하는 분석가가 없을 정도로, 명함으로 사용해도 무리가 없는 캐릭터임. (5형상이 명함대비 효율 : 15% 미만) (추가예정)",
    },
    youtube_links: ["https://www.youtube.com/watch?v=w3CTWcolZE4"],
    keywords: ["탱커", "계시", "정신피해"],
    guide_images: [],
  },
  {
    character_id: 47, // 노티카
    portrait_info: {
      headers: ["형상", "1인 기준", "다인 기준"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["27%", "28%"],
        },
        {
          name: "2형상",
          efficiencies: ["20%", "15%"],
        },
        {
          name: "3형상",
          efficiencies: ["16%", "24%"],
        },
        {
          name: "4형상",
          efficiencies: ["2%", "1%"],
        },
        {
          name: "5형상",
          efficiencies: ["33%", "23%"],
        },
      ],
      summary: "5형상 > 1형상 > 2형상 > 3형상 > 4형상 (1인 기준)",
      source: "icehood",
      note: "(추가예정)",
    },
    youtube_links: ["https://www.youtube.com/watch?v=VwOA8_YT21Y"],
    keywords: ["딜러", "자해", "현실피해", "한정"],
    guide_images: [],
  },
  {
    character_id: 48, // 울리히
    portrait_info: {
      headers: ["형상", "전반적 효율"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["26%"],
        },
        {
          name: "2형상",
          efficiencies: ["10%"],
        },
        {
          name: "3형상",
          efficiencies: ["21%"],
        },
        {
          name: "4형상",
          efficiencies: ["6%"],
        },
        {
          name: "5형상",
          efficiencies: ["20%"],
        },
      ],
      summary: "1형상 > 3형상 > 5형상 > 2형상 > 4형상 (전반적 효율)",
      source: "icehood",
      note: "1형상이 가장 효율이 좋은 형상 (추가예정)",
    },
    youtube_links: ["https://www.youtube.com/watch?v=yjt0jZfHVpw"],
    keywords: ["딜러", "전력", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 49, // 몰디르
    portrait_info: {
      headers: ["형상", "본인", "팀 전체"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["20%", "13%"],
        },
        {
          name: "2형상",
          efficiencies: ["21%", "15%"],
        },
        {
          name: "3형상",
          efficiencies: ["0%", "0%"],
        },
        {
          name: "4형상",
          efficiencies: ["7%", "5%"],
        },
        {
          name: "5형상",
          efficiencies: ["9%", "7%"],
        },
      ],
      summary: "2형상 > 1형상 > 5형상 > 4형상 > 3형상 (팀 전체)",
      source: "icehood",
      note: "3형상의 효율이 0%인 이유는 효과가 반격시 얻는 열정 2로 증가이기 때문. (추가예정)",
    },
    youtube_links: ["https://www.youtube.com/watch?v=Kej4pd1-zDM"],
    keywords: ["서포터", "술식위주", "현실피해"],
    guide_images: [],
  },
  {
    character_id: 50, // 센티넬
    portrait_info: {
      headers: ["형상", "본인", "팀 전체"],
      rows: [
        {
          name: "1형상",
          efficiencies: ["28%", "12%"],
        },
        {
          name: "2형상",
          efficiencies: ["18%", "9%"],
        },
        {
          name: "3형상",
          efficiencies: ["7%", "4%"],
        },
        {
          name: "4형상",
          efficiencies: ["2%", "1%"],
        },
        {
          name: "5형상",
          efficiencies: ["39%", "21%"],
        },
      ],
      summary: "5형상 > 1형상 > 2형상 > 3형상 > 4형상 (팀 전체)",
      source: "icehood",
      note: "본인 형상 효율은 오차가 존재할 수 있음. 팀 효율 위주로 참고해주세요.",
    },
    youtube_links: ["https://www.youtube.com/watch?v=F7i1EI35ovI"],
    keywords: ["서포터", "신혈", "총알", "현실피해"],
    guide_images: [],
  },
];
