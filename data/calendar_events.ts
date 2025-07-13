export type CalendarEvent = {
  date: string; // 'YYYY-MM-DD'
  title: string;
  link?: string;
  type?: "version" | "pickup" | "event" | "birthday";
  end?: string; // 끝나는 날짜 (선택)
  img?: string; // 이미지 경로 (선택)
};

export const calendarEvents: CalendarEvent[] = [
  {
    date: "2025-07-03",
    end: "2025-08-07",
    title: "2.7",
    type: "version",
  },
  {
    date: "2025-07-03",
    end: "2025-07-24",
    title: "히사베스 픽업",
    type: "pickup",
    img: "/infos/banner_img/hissabeth_pick_up.webp",
  },
  {
    date: "2025-07-24",
    end: "2025-08-07",
    title: "키페리나 픽업",
    type: "pickup",
    img: "/infos/banner_img/kiperina_pick_up.webp",
  },
  // {
  //   date: "2025-07-12",
  //   end: "2025-07-31",
  //   title: "호수의 물결 픽업",
  //   type: "pickup",
  //   img: "/infos/banner_img/kiperina_pick_up.webp",
  // },
  {
    date: "2025-08-01",
    end: "2025-08-14",
    title: "바람의 호수 픽업",
    type: "pickup",
    img: "/infos/banner_img/doublepick_flutter_page_barcarola.webp",
  },
  {
    date: "2025-08-07",
    end: "2025-09-18",
    title: "콜라보",
    type: "version",
  },
  {
    date: "2025-09-18",
    end: "2025-10-30",
    title: "2.8",
    type: "version",
  },
  //🎂
  {
    date: "01-04",
    type: "birthday",
    title: "APPLe",
  },
  {
    date: "02-29",
    type: "birthday",
    title: "A 나이트",
  },
  {
    date: "02-28",
    type: "birthday",
    title: "알레프",
  },
  {
    date: "07-10",
    type: "birthday",
    title: "에일리언 T",
  },
  {
    date: "07-27",
    type: "birthday",
    title: "안안리",
  },
  {
    date: "04-05",
    type: "birthday",
    title: "안조날라",
  },
  {
    date: "12-11",
    type: "birthday",
    title: "아르고스",
  },
  {
    date: "08-07",
    type: "birthday",
    title: "아브구스트",
  },
  {
    date: "03-14",
    type: "birthday",
    title: "베이비블루",
  },
  {
    date: "04-14",
    type: "birthday",
    title: "벌룬파티",
  },
  {
    date: "07-05",
    type: "birthday",
    title: "바바라",
  },
  {
    date: "11-13",
    type: "birthday",
    title: "바르카롤라",
  },
  {
    date: "06-22",
    type: "birthday",
    title: "베티",
  },
  {
    date: "02-09",
    type: "birthday",
    title: "콘블룸",
  },
  {
    date: "07-22",
    type: "birthday",
    title: "블로니",
  },
  {
    date: "10-31",
    type: "birthday",
    title: "슬라우치 햇",
  },
  {
    date: "05-20",
    type: "birthday",
    title: "버디 페어차일드",
  },
  {
    date: "11-06",
    type: "birthday",
    title: "바니바니",
  },
  {
    date: "08-13",
    type: "birthday",
    title: "센츄리온",
  },
  {
    date: "04-23",
    type: "birthday",
    title: "찰리",
  },
  {
    date: "06-28",
    type: "birthday",
    title: "클릭",
  },
  {
    date: "12-30",
    type: "birthday",
    title: "크리스탈로",
  },
  {
    date: "01-19",
    type: "birthday",
    title: "다그닥 달리",
  },
  {
    date: "09-22",
    type: "birthday",
    title: "데저트 플란넬",
  },
  {
    date: "02-15",
    type: "birthday",
    title: "디거스",
  },
  {
    date: "10-10",
    type: "birthday",
    title: "디케",
  },
  {
    date: "08-02",
    type: "birthday",
    title: "문",
  },
  {
    date: "10-23",
    type: "birthday",
    title: "드루비스",
  },
  {
    date: "07-21",
    type: "birthday",
    title: "이글",
  },
  {
    date: "05-14",
    type: "birthday",
    title: "에릭",
  },
  {
    date: "12-25",
    type: "birthday",
    title: "이터니티",
  },
  {
    date: "09-28",
    type: "birthday",
    title: "파투투",
  },
  {
    date: "07-14",
    type: "birthday",
    title: "플러터페이지",
  },
  {
    date: "07-22",
    type: "birthday",
    title: "갈천",
  },
  {
    date: "01-03",
    type: "birthday",
    title: "호러피디아",
  },
  {
    date: "11-23",
    type: "birthday",
    title: "이졸데",
  },
  {
    date: "11-02",
    type: "birthday",
    title: "존 티토",
  },
  {
    date: "07-15",
    type: "birthday",
    title: "갈라보나",
  },
  {
    date: "12-07",
    type: "birthday",
    title: "카나니아",
  },
  {
    date: "04-08",
    type: "birthday",
    title: "칸지라",
  },
  {
    date: "04-19",
    type: "birthday",
    title: "키페리나",
  },
  {
    date: "01-29",
    type: "birthday",
    title: "라 수르스",
  },
  {
    date: "09-23",
    type: "birthday",
    title: "레일라니",
  },
  {
    date: "11-14",
    type: "birthday",
    title: "릴리야",
  },
  {
    date: "06-01",
    type: "birthday",
    title: "로거헤드",
  },
  {
    date: "05-06",
    type: "birthday",
    title: "로페라",
  },
  {
    date: "04-16",
    type: "birthday",
    title: "로렐라이",
  },
  {
    date: "12-30",
    type: "birthday",
    title: "루시",
  },
  {
    date: "01-12",
    type: "birthday",
    title: "마커스",
  },
  {
    date: "06-22",
    type: "birthday",
    title: "마틸다",
  },
  {
    date: "11-24",
    type: "birthday",
    title: "메디슨 포켓",
  },
  {
    date: "03-20",
    type: "birthday",
    title: "멜라니아",
  },
  {
    date: "02-18",
    type: "birthday",
    title: "머큐리아",
  },
  {
    date: "09-20",
    type: "birthday",
    title: "메스머 주니어",
  },
  {
    date: "01-01",
    type: "birthday",
    title: "빨간 망토",
  },
  {
    date: "06-30",
    type: "birthday",
    title: "던컨",
  },
  {
    date: "11-25",
    type: "birthday",
    title: "무아상",
  },
  {
    date: "11-16",
    type: "birthday",
    title: "뉴바벨",
  },
  {
    date: "04-01",
    type: "birthday",
    title: "미스라디오",
  },
  {
    date: "01-06",
    type: "birthday",
    title: "네임데이",
  },
  {
    date: "02-16",
    type: "birthday",
    title: "노티카",
  },
  {
    date: "11-02",
    type: "birthday",
    title: "네크롤로스트",
  },
  {
    date: "04-30",
    type: "birthday",
    title: "닉 보텀",
  },
  {
    date: "02-14",
    type: "birthday",
    title: "누아르",
  },
  {
    date: "02-05",
    type: "birthday",
    title: "어니언",
  },
  {
    date: "12-26",
    type: "birthday",
    title: "올리버 포그",
  },
  {
    date: "07-24",
    type: "birthday",
    title: "파비아",
  },
  {
    date: "10-27",
    type: "birthday",
    title: "피클즈",
  },
  {
    date: "07-09",
    type: "birthday",
    title: "파이오니어",
  },
  {
    date: "07-12",
    type: "birthday",
    title: "폴터가이스트",
  },
  {
    date: "12-14",
    type: "birthday",
    title: "레이비스",
  },
  {
    date: "07-15",
    type: "birthday",
    title: "레콜레타",
  },
  {
    date: "08-15",
    type: "birthday",
    title: "레굴루스",
  },
  {
    date: "05-01",
    type: "birthday",
    title: "사츠키",
  },
  {
    date: "10-22",
    type: "birthday",
    title: "슈나이더",
  },
  {
    date: "08-19",
    type: "birthday",
    title: "제멜바이스",
  },
  {
    date: "03-22",
    type: "birthday",
    title: "갈기모래",
  },
  {
    date: "01-10",
    type: "birthday",
    title: "소네트",
  },
  {
    date: "04-15",
    type: "birthday",
    title: "소더비",
  },
  {
    date: "01-10",
    type: "birthday",
    title: "스파스토데아",
  },
  {
    date: "10-04",
    type: "birthday",
    title: "스푸트니크",
  },
  {
    date: "06-01",
    type: "birthday",
    title: "마릴린",
  },
  {
    date: "03-12",
    type: "birthday",
    title: "TTT",
  },
  {
    date: "09-08",
    type: "birthday",
    title: "테넌트",
  },
  {
    date: "09-04",
    type: "birthday",
    title: "광대",
  },
  {
    date: "11-27",
    type: "birthday",
    title: "투스 페어리",
  },
  {
    date: "10-30",
    type: "birthday",
    title: "튜즈데이",
  },
  {
    date: "04-27",
    type: "birthday",
    title: "리사&루이스",
  },
  {
    date: "01-12",
    type: "birthday",
    title: "울루",
  },
  {
    date: "04-06",
    type: "birthday",
    title: "빌라",
  },
  {
    date: "11-01",
    type: "birthday",
    title: "윌로우",
  },
  {
    date: "10-13",
    type: "birthday",
    title: "윈드송",
  },
  {
    date: "05-30",
    type: "birthday",
    title: "X",
  },
  {
    date: "03-04",
    type: "birthday",
    title: "예니세이",
  },
  {
    date: "04-28",
    type: "birthday",
    title: "겨울",
  },
  {
    date: "02-13",
    type: "birthday",
    title: "6",
  },
  {
    date: "07-27",
    type: "birthday",
    title: "37",
  },
  {
    date: "06-01",
    type: "birthday",
    title: "에즈라",
  },
  {
    date: "04-18",
    type: "birthday",
    title: "J",
  },
  {
    date: "04-11",
    type: "birthday",
    title: "제시카",
  },
  {
    date: "05-06",
    type: "birthday",
    title: "양월",
  },
  {
    date: "09-13",
    type: "birthday",
    title: "몰디르",
  },
  {
    date: "05-30",
    type: "birthday",
    title: "울리히",
  },
  {
    date: "11-12",
    type: "birthday",
    title: "보이저",
  },
  {
    date: "01-15",
    type: "birthday",
    title: "화이트럼",
  },
];
