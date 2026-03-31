export interface PortraitLevel {
  level: number;
  description: string;
}

export interface Portrait {
  character_id: number;
  name: string;
  passive: string | null;
  skill1: string | null;
  skill2: string | null;
  ultimate: string | null;
  portraits: PortraitLevel[];
}

export const portraitData: Portrait[] = [
  {
    character_id: 3003, // 드루비스
    name: "드루비스",
    passive: "아름다운 나무",
    skill1: "숲의 바람",
    skill2: "새하얀 이슬",
    ultimate: "숲에 내려앉은 침묵",
    portraits: [
      { level: 1, description: "[숲의 바람] 주문 2/3단계 시 주는 정신 피해가 300/400%까지 증가" },
      { level: 2, description: "[숲에 내려앉은 침묵] 주는 정신 피해가 450%까지 증가" },
      { level: 3, description: "[새하얀 이슬] 주문 1/2/3단계 시 주는 정신 피해가 135/200/325%까지 증가" },
      { level: 4, description: "[숲에 내려앉은 침묵] 주는 정신 피해가 500%까지 증가" },
      { level: 5, description: "[새하얀 이슬] 방어 무시율 증가 효과가 40%로 변경" },
    ],
  },
  {
    character_id: 3004, // 릴리아
    name: "릴리아",
    passive: "차량 통제",
    skill1: "바람을 타고",
    skill2: "흔들리는 벨",
    ultimate: "소소한 잔재주",
    portraits: [
      { level: 1, description: "[소소한 잔재주] 주는 현실 피해가 775%까지 증가" },
      { level: 2, description: "[흔들리는 벨] 주문 1/2/3단계 시 주는 현실 피해가 165/245/400%까지 증가" },
      { level: 3, description: "[바람을 타고] 주문 1/2/3단계 시 주는 현실 피해가 180/270/450%까지 증가" },
      { level: 4, description: "[소소한 잔재주] 치명타 시 흡혈률 증가 효과가 25%로 변경" },
      { level: 5, description: "[소소한 잔재주] 주는 현실 피해가 850%까지 증가" },
    ],
  },
  {
    character_id: 3005, // 닉 보텀
    name: "닉 보텀",
    passive: "먼지 속",
    skill1: "들장미",
    skill2: "여름 덩굴",
    ultimate: "숲의 애도사",
    portraits: [
      { level: 1, description: "[숲의 애도사] 아군에 주는 [보호막] 효과가 사용자의 잃은 HP×125%까지 증가" },
      { level: 2, description: "[들장미] 주문 1/2/3단계 시 주는 정신 피해가 220/280/450%까지 증가" },
      { level: 3, description: "[여름 덩굴] 주문 1/2/3단계 시 현실 방어, 정신 방어, 피해 감면 증가 효과가 30/35/40%로 변경" },
      { level: 4, description: "[숲의 애도사] 아군에 주는 [보호막] 효과가 사용자의 잃은 HP×150%까지 증가" },
      { level: 5, description: "[숲의 애도사] 아군에 주는 [보호막] 효과가 사용자의 잃은 HP×175%까지 증가" },
    ],
  },
  {
    character_id: 3006, // 이글
    name: "이글",
    passive: "수련인",
    skill1: "추억의 시계",
    skill2: "손가락 렌즈",
    ultimate: "표상과 현실 사이",
    portraits: [
      { level: 1, description: "[표상과 현실 사이] 치명타율 증가 효과가 70%로 변경" },
      { level: 2, description: "[추억의 시계] 주문 1/2/3단계 시 목표가 [속성 감소] [상태 이상] [제어]일 시, 이번 공격의 추가 현실 피해가 40/60/100%까지 증가" },
      { level: 3, description: "[손가락 렌즈] 방어 무시율 증가 효과가 40%로 변경" },
      { level: 4, description: "[표상과 현실 사이] 치명타율 증가 효과가 100%로 변경" },
      { level: 5, description: "[추억의 시계] 목표가 [속성 감소] [상태 이상] [제어]일 시, 이번 공격의 흡혈률 증가 효과가 20%로 변경" },
    ],
  },
  {
    character_id: 3007, // A 나이트
    name: "A 나이트",
    passive: "연민",
    skill1: "정의",
    skill2: "영광",
    ultimate: "서기 778년 후",
    portraits: [
      { level: 1, description: "[서기 778년 후] 주는 현실 피해가 500%까지 증가" },
      { level: 2, description: "[정의] 주문 1/2/3단계 시 주는 현실 피해가 200/275/480%까지 증가" },
      { level: 3, description: "[서기 778년 후] 주는 현실 피해가 550%까지 증가" },
      { level: 4, description: "[영광] 주문 1/2/3단계 시 주는 현실 피해가 165/170/250%까지 증가" },
      { level: 5, description: "[서기 778년 후] 시전 후 적 처치 시 자신에게 [격앙] 1스택 부여" },
    ],
  },
  {
    character_id: 3009, // 소더비
    name: "소더비",
    passive: "천재 숙녀~",
    skill1: "용량 3배!",
    skill2: "농축된 정수!",
    ultimate: "모두 섞어버려!",
    portraits: [
      { level: 1, description: "[모두 섞어버려!] 주는 현실 피해가 450%까지 증가" },
      { level: 2, description: "[용량 3배!] 추가되는 [중독] 고정 피해가 사용자 공격×40%까지 증가" },
      { level: 3, description: "[농축된 정수!] [유합] 회복량이 사용자 공격×60/90/150%까지 증가" },
      { level: 4, description: "[모두 섞어버려!] 주는 현실 피해가 500%까지 증가" },
      { level: 5, description: "[용량 3배!] 추가되는 [중독] 고정 피해가 사용자 공격×50%까지 증가" },
    ],
  },
  {
    character_id: 3010, // X
    name: "X",
    passive: "부작용의 쓸모",
    skill1: "양극과 음극",
    skill2: "커피와 차",
    ultimate: "간단과 복잡 사이",
    portraits: [
      { level: 1, description: "[간단과 복잡 사이] 주는 현실 피해가 300%까지 증가" },
      { level: 2, description: "[양극과 음극] 주문 1/2/3단계 시 주는 현실 피해가 220/280/500%까지 증가" },
      { level: 3, description: "[간단과 복잡 사이] 주는 현실 피해가 350%까지 증가" },
      { level: 4, description: "[커피와 차] 주문 1/2/3단계 시 주는 현실 피해가 220/280/500%까지 증가" },
      { level: 5, description: "[간단과 복잡 사이] 주는 현실 피해가 400%까지 증가" },
    ],
  },
  {
    character_id: 3011, // 마릴린
    name: "마릴린",
    passive: "저음 한 소절",
    skill1: "불발탄 하나",
    skill2: "바람 한 줄기",
    ultimate: "오늘 밤, 좋은 꿈 하나",
    portraits: [
      { level: 1, description: "[오늘 밤, 좋은 꿈 하나] 주는 현실 피해가 450%까지 증가, 현실 방어와 정신 방어 감소 효과가 30%로 변경" },
      { level: 2, description: "[불발탄 하나] 주문 1/2/3단계 시 주는 현실 피해가 220/330/550%까지 증가" },
      { level: 3, description: "[바람 한 줄기] 주문 1/2/3단계 시 [속성 감소] [상태 이상] [제어] 목표에게 추가 현실 피해가 50/75/125%까지 추가 증가" },
      { level: 4, description: "[오늘 밤, 좋은 꿈 하나] 주는 현실 피해가 500%까지 증가" },
      { level: 5, description: "[오늘 밤, 좋은 꿈 하나] 주는 현실 피해가 600%까지 증가" },
    ],
  },
  {
    character_id: 3012, // 광대
    name: "광대",
    passive: "무대인사 전",
    skill1: "현명한 자",
    skill2: "우둔한 자",
    ultimate: "예고 없던 즉흥 공연",
    portraits: [
      { level: 1, description: "[예고 없던 즉흥 공연] 주는 정신 피해가 280%까지 증가" },
      { level: 2, description: "[현명한 자] 주문 1/2/3단계 시 주는 정신 피해가 220/280/450%까지 증가" },
      { level: 3, description: "[우둔한 자] 주문 1/2단계 시 [부식] 고정 피해가 현재 HP의 20/30%까지 증가" },
      { level: 4, description: "[예고 없던 즉흥 공연] 주는 정신 피해가 310%까지 증가" },
      { level: 5, description: "[예고 없던 즉흥 공연] 주는 정신 피해가 350%까지 증가" },
    ],
  },
  {
    character_id: 3013, // 겨울
    name: "겨울",
    passive: "섬",
    skill1: "참새",
    skill2: "종이",
    ultimate: "시, 섬, 바람",
    portraits: [
      { level: 1, description: "[시, 섬, 바람] 주는 정신 피해가 280%까지 증가" },
      { level: 2, description: "[참새] 주문 1/2/3단계 시 주는 정신 피해가 220/230/350%까지 증가" },
      { level: 3, description: "[종이] 주문 1/2/3단계 시 추가로 부여되는 피해 회복 증가 효과가 20/25/30%로 변경" },
      { level: 4, description: "[시, 섬, 바람] 주는 정신 피해가 310%까지 증가" },
      { level: 5, description: "[시, 섬, 바람] 주는 정신 피해가 350%까지 증가" },
    ],
  },
  {
    character_id: 3014, // 바니바니
    name: "바니바니",
    passive: "최고 사원",
    skill1: "주문 제작 술병",
    skill2: "스윗 글러브",
    ultimate: "바니걸 훈장 증서",
    portraits: [
      { level: 1, description: "[바니걸 훈장 증서] 모든 아군 회복량이 사용자 공격×220%의 HP 정도까지 증가" },
      { level: 2, description: "[주문 제작 술병] 이번 공격의 치명타율, 치명타 피해 증가 효과가 30%로 변경" },
      { level: 3, description: "[스윗 글러브] 주는 현실 피해가 220/280/450%까지 증가" },
      { level: 4, description: "[바니걸 훈장 증서] 모든 아군 회복량이 사용자 공격×240%의 HP 정도까지 증가" },
      { level: 5, description: "[바니걸 훈장 증서] 모든 아군 회복량이 사용자 공격×260%의 HP 정도까지 증가" },
    ],
  },
  {
    character_id: 3015, // 파비아
    name: "파비아",
    passive: "아주 좋은 일",
    skill1: "더러운 물건",
    skill2: "불쌍한 사람",
    ultimate: "나보다 시끄러운 녀석들",
    portraits: [
      { level: 1, description: "[나보다 시끄러운 녀석들] 주는 정신 피해가 475%까지 증가" },
      { level: 2, description: "[더러운 물건] 주문 1/2/3단계 시 추가 정신 피해가 65/95/155%까지 증가" },
      { level: 3, description: "[불쌍한 사람] 주문 1/2/3단계 시 추가 정신 피해가 55/80/130%까지 증가" },
      { level: 4, description: "[나보다 시끄러운 녀석들] 주는 정신 피해가 550%까지 증가" },
      { level: 5, description: "[나보다 시끄러운 녀석들] 주는 정신 피해가 600%까지 증가, [자가 치유] 상태의 회복량이 사용자가 잃은 HP의 35%까지 증가" },
    ],
  },
  {
    character_id: 3016, // 베이비 블루
    name: "베이비 블루",
    passive: "건드리지 마",
    skill1: "소꿉놀이",
    skill2: "기침약",
    ultimate: "친구와 다과회",
    portraits: [
      { level: 1, description: "[친구와 다과회] 주는 정신 피해가 350%까지 증가" },
      { level: 2, description: "[소꿉놀이] 주문 1/2/3단계 시 주는 정신 피해가 220/230/400%까지 증가" },
      { level: 3, description: "[친구와 다과회] 주는 정신 피해가 400%까지 증가" },
      { level: 4, description: "[친구와 다과회] 주는 정신 피해가 450%까지 증가" },
      { level: 5, description: "[기침약] 주문 2/3단계 시 받는 피해 증가 효과가 25/30%로 변경" },
    ],
  },
  {
    character_id: 3017, // 찰리
    name: "찰리",
    passive: "극단장",
    skill1: "전기를 내리노라!",
    skill2: "바람을 하사하노라!",
    ultimate: "나 홀로 극장 위에",
    portraits: [
      { level: 1, description: "[나 홀로 극장 위에] 주는 정신 피해가 350%까지 증가" },
      { level: 2, description: "[전기를 내리노라!] 주문 1/2/3단계 시 추가 정신 피해가 60/90/150%까지 증가" },
      { level: 3, description: "[바람을 하사하노라!] 추가 정신 피해를 주는 조건이 현재 자신의 HP가 80%보다 낮을 경우로 변경" },
      { level: 4, description: "[나 홀로 극장 위에] 주는 정신 피해가 425%까지 증가" },
      { level: 5, description: "[나 홀로 극장 위에] 주는 정신 피해가 500%까지 증가" },
    ],
  },
  {
    character_id: 3018, // 올리버 포그
    name: "올리버 포그",
    passive: "안개가 가는 곳",
    skill1: "우산 펼 무렵",
    skill2: null,
    ultimate: "예상했던 헛수고",
    portraits: [
      { level: 1, description: "[예상했던 헛수고] 주는 현실 피해가 500%까지 증가" },
      { level: 2, description: "[우산 펼 무렵] 이번 공격의 흡혈률 증가 효과가 50%로 변경" },
      { level: 3, description: "[예상했던 헛수고] 방어 무시율 증가 효과가 40%로 변경" },
      { level: 4, description: "[안개가 가는 곳] 추가하는 [보호막] 효과가 포그의 잃은 HP×200%까지 증가" },
      { level: 5, description: "[예상했던 헛수고] 방어 무시율 증가 효과가 50%로 변경" },
    ],
  },
  {
    character_id: 3020, // 콘블룸
    name: "콘블룸",
    passive: "역류",
    skill1: "소매 조심",
    skill2: null,
    ultimate: "초대받지 않은 평론가",
    portraits: [
      { level: 1, description: "[초대받지 않은 평론가] 주는 현실 피해가 625%까지 증가" },
      { level: 2, description: "[소매 조심]주문 1/2/3단계 시 목표가 [속성 감소] [상태 이상] [제어] 중인 경우, 추가로 주는 현실 피해가 45/65/100%까지 증가." },
      { level: 3, description: "[초대받지 않은 평론가] 주는 현실 피해가 675%까지 증가" },
      { level: 4, description: "[초대받지 않은 평론가] 주는 현실 피해가 750%까지 증가" },
      { level: 5, description: "[초대받지 않은 평론가] 주는 현실 피해가 800%까지 증가" },
    ],
  },
  {
    character_id: 3022, // 디케
    name: "디케",
    passive: "정당",
    skill1: "강권",
    skill2: "정의",
    ultimate: "남다른 심판관",
    portraits: [
      { level: 1, description: "[남다른 심판관] 고정 피해가 사용자 공격×130%까지 증가" },
      { level: 2, description: "[강권] 주문 1/2/3단계 시 주는 정신 피해가 220/230/350%까지 증가" },
      { level: 3, description: "[남다른 심판관] 고정 피해가 사용자 공격×170%까지 증가" },
      { level: 4, description: "[정의] 주문 1/2/3단계 시 회복량이 사용자 공격×70/105/175%의 HP까지 증가" },
      { level: 5, description: "[남다른 심판관] 고정 피해가 사용자 공격×210%까지 증가" },
    ],
  },
  {
    character_id: 3023, // 소네트
    name: "소네트",
    passive: "시 속에서 찾기",
    skill1: "계율·다섯째",
    skill2: "장려·아홉째",
    ultimate: "규칙 밖의 노래",
    portraits: [
      { level: 1, description: "[규칙 밖의 노래] 자신이 [속성 증가] [버프 상태]일 시 방어 무시율 16% 추가 증가" },
      { level: 2, description: "[계율·다섯째] 주문 1/2/3단계 시 주는 현실 피해가 220/230/350%까지 증가" },
      { level: 3, description: "[장려·아홉째] 추가로 부여되는 자신의 방어 무시율 증가 효과가 15%로 변경" },
      { level: 4, description: "[규칙 밖의 노래] 자신이 [속성 증가] [버프 상태]일 시 방어 무시율 증가 효과가 24%로 변경" },
      { level: 5, description: "[규칙 밖의 노래] 자신이 [속성 증가] [버프 상태]일 시 방어 무시율 증가 효과가 32%로 변경" },
    ],
  },
  {
    character_id: 3024, // 벌룬 파티
    name: "벌룬 파티",
    passive: "둥둥 풍선",
    skill1: "피냐타타",
    skill2: "기침 괴물",
    ultimate: "착한 아이, 나쁜 어른",
    portraits: [
      { level: 1, description: "[착한 아이, 나쁜 어른] 시전 후 HP 비율이 가장 낮은 아군 캐릭터의 회복이 잃은 HP의 20%까지 증가" },
      { level: 2, description: "[피냐타타] 자신이 [파티 풍선] 또는 [순진 풍선]을 보유하고 있는 경우, 방어 무시율 증가 효과가 70%로 변경" },
      { level: 3, description: "[기침 괴물] 주문 1/2/3단계 시 모든 아군 회복량이 잃은 HP×30/35/45%까지 증가" },
      { level: 4, description: "[착한 아이, 나쁜 어른] 주는 현실 피해가 300%까지 증가" },
      { level: 5, description: "[착한 아이, 나쁜 어른] 시전 후 HP 비율이 가장 낮은 아군 캐릭터의 회복이 잃은 HP의 30%까지 증가" },
    ],
  },
  {
    character_id: 3025, // 레굴루스
    name: "레굴루스",
    passive: "새로운 것 듣기",
    skill1: "귀를 즐겁게",
    skill2: "눈을 밝게",
    ultimate: "기쁨과 잠 못 드는 밤",
    portraits: [
      { level: 1, description: "[기쁨과 잠 못 드는 밤] 주는 정신 피해가 400%까지 증가" },
      { level: 2, description: "[귀를 즐겁게] 주문 1/2/3단계 시 주는 정신 피해가 220/330/550%까지 증가" },
      { level: 3, description: "[눈을 밝게] 주문 1/2/3단계 시 주는 정신 피해가 165/195/300%까지 증가" },
      { level: 4, description: "[기쁨과 잠 못 드는 밤] 주는 정신 피해가 450%까지 증가" },
      { level: 5, description: "[기쁨과 잠 못 드는 밤]모든 아군이 획득한 [신나는 로큰롤]의 지속 시간 1턴 연장." },
    ],
  },
  {
    character_id: 3026, // 빨간 망토
    name: "빨간 망토",
    passive: "사냥 본능",
    skill1: "은 탄환 발사",
    skill2: "크게 휘두르기",
    ultimate: "늑대보다 무서운",
    portraits: [
      { level: 1, description: "[늑대보다 무서운] 주는 현실 피해가 500%까지 증가" },
      { level: 2, description: "[은 탄환 발사] 추가 현실 피해를 주는 조건이 목표의 HP가 40%보다 높을 경우로 변경" },
      { level: 3, description: "[크게 휘두르기] 추가 현실 피해를 주는 조건이 목표의 HP가 60%보다 낮을 경우로 변경" },
      { level: 4, description: "[늑대보다 무서운] 주는 현실 피해가 550%까지 증가" },
      { level: 5, description: "[늑대보다 무서운] 주는 현실 피해가 600%까지 증가" },
    ],
  },
  {
    character_id: 3027, // 미스 라디오
    name: "미스 라디오",
    passive: "어둠이 다가올 때",
    skill1: "BupD 언어",
    skill2: "LeEe 주파수",
    ultimate: "진실 드러내기",
    portraits: [
      { level: 1, description: "[진실 드러내기] 주는 정신 피해가 120%까지 증가" },
      { level: 2, description: "[BupD 언어] 주문 1/2/3단계 시 주는 정신 피해가 220/330/550%까지 증가" },
      { level: 3, description: "[진실 드러내기] 주는 정신 피해가 140%까지 증가" },
      { level: 4, description: "[LeEe 주파수] 주문 1/2/3단계 시 주는 정신 피해가 165/245/400%까지 증가" },
      { level: 5, description: "[진실 드러내기] 주는 정신 피해가 160%까지 증가" },
    ],
  },
  {
    character_id: 3028, // APPLe
    name: "APPLe",
    passive: "포도주",
    skill1: "화려한 백색",
    skill2: "같은 양의 빛",
    ultimate: "아주 작은 업적",
    portraits: [
      { level: 1, description: "[아주 작은 업적] HP 비율이 가장 낮은 아군 캐릭터의 회복량이 사용자 공격×150%까지 증가" },
      { level: 2, description: "[화려한 백색] 주문 1/2/3단계 시 주는 정신 피해가 220/330/550%까지 증가" },
      { level: 3, description: "[같은 양의 빛] 주문 1/2/3단계 시 HP 회복이 사용자 공격×56/84/140%까지 증가" },
      { level: 4, description: "[아주 작은 업적] HP 비율이 가장 낮은 아군 캐릭터의 회복량이 사용자 공격×200%까지 증가" },
      { level: 5, description: "[아주 작은 업적] HP 비율이 가장 낮은 아군 캐릭터의 회복량이 사용자 공격×250%까지 증가" },
    ],
  },
  {
    character_id: 3029, // 슈나이더
    name: "슈나이더",
    passive: "생존이란 이름으로",
    skill1: null,
    skill2: null,
    ultimate: null,
    portraits: [
      { level: 1, description: "" },
      { level: 2, description: "" },
      { level: 3, description: "" },
      { level: 4, description: "" },
      { level: 5, description: "" },
    ],
  },
  {
    character_id: 3030, // 라 수르스
    name: "라 수르스",
    passive: "후회약",
    skill1: "'봄의 정령'",
    skill2: "봄의 정령",
    ultimate: "또 다른 책의 전설",
    portraits: [
      { level: 1, description: "[또 다른 책의 전설] 열정 1포인트 추가 감소" },
      { level: 2, description: "['봄의 정령'] 주문 1/2/3단계 시 주는 정신 피해가 165/245/400%까지 증가" },
      { level: 3, description: "[또 다른 책의 전설] 열정 1포인트 추가 감소" },
      { level: 4, description: "[봄의 정령] 주문 1/2/3단계 시 모든 아군의 회복 HP가 사용자 공격×90/135/220%까지 증가" },
      { level: 5, description: "[또 다른 책의 전설] 열정 1포인트 추가 감소" },
    ],
  },
  {
    character_id: 3031, // 크리스탈로
    name: "크리스탈로",
    passive: "기원 페이지",
    skill1: "새장 속 새",
    skill2: null,
    ultimate: "방사선 치료 주의",
    portraits: [
      { level: 1, description: "[방사선 치료 주의] 고정 피해가 공격×110%까지 증가" },
      { level: 2, description: "[새장 속 새] 주문 2/3단계 시 현실 방어 감소 효과가 30/40%로 변경" },
      { level: 3, description: "[방사선 치료 주의] 고정 피해가 공격×120%까지 증가" },
      { level: 4, description: "[방사선 치료 주의] 고정 피해가 공격×130%까지 증가" },
      { level: 5, description: "[방사선 치료 주의] 고정 피해가 공격×140%까지 증가" },
    ],
  },
  {
    character_id: 3032, // 센츄리온
    name: "센츄리온",
    passive: "핫소스 전문가",
    skill1: "백전백승 장군",
    skill2: "아웃도어 스타",
    ultimate: "리얼리티 쇼",
    portraits: [
      { level: 1, description: "[백전백승 장군] 추가 현실 피해가 사용자 열정×14/21/35%까지 증가" },
      { level: 2, description: "[리얼리티 쇼] 주는 현실 피해가 350%까지 증가" },
      { level: 3, description: "[아웃도어 스타] 주문 1/2/3단계 시 주는 현실 피해가 165/170/250%까지 증가" },
      { level: 4, description: "[리얼리티 쇼] 주는 현실 피해가 400%까지 증가" },
      { level: 5, description: "[백전백승 장군] 추가 현실 피해가 사용자 열정×18/27/45%까지 증가" },
    ],
  },
  {
    character_id: 3033, // TTT
    name: "TTT",
    passive: "사생활 보호",
    skill1: "네트워크 방화벽",
    skill2: "전력 안전 공급",
    ultimate: "전원 차단",
    portraits: [
      { level: 1, description: "[전원 차단] 주는 정신 피해가 225%까지 증가" },
      { level: 2, description: "[네트워크 방화벽] 주문 1/2/3단계 시 주는 정신 피해가 220/280/500%까지 증가" },
      { level: 3, description: "[전원 차단] 주는 정신 피해가 275%까지 증가" },
      { level: 4, description: "[전력 안전 공급] 이번 공격의 방어 무시율 증가 효과가 40%로 변경" },
      { level: 5, description: "[전원 차단] 주는 정신 피해가 300%까지 증가" },
    ],
  },
  {
    character_id: 3034, // 에일리언 T
    name: "에일리언 T",
    passive: "신경 쓰지 마!",
    skill1: "붙잡힌 사람",
    skill2: null,
    ultimate: "스타 퓨처 워즈·프롤로그",
    portraits: [
      { level: 1, description: "[스타 퓨처 워즈·프롤로그] 주는 현실 피해가 230%까지 증가" },
      { level: 2, description: "[붙잡힌 사람] 추가 현실 피해를 주는 조건이 목표의 HP가 40%보다 높을 경우로 변경" },
      { level: 3, description: "[스타 퓨처 워즈·프롤로그] 주는 현실 피해가 270%까지 증가" },
      { level: 4, description: "[붙잡힌 사람] 추가 현실 피해를 주는 조건이 목표의 HP가 30%보다 높을 경우로 변경" },
      { level: 5, description: "[스타 퓨처 워즈·프롤로그] 주는 현실 피해가 300%까지 증가" },
    ],
  },
  {
    character_id: 3035, // 레일라니
    name: "레일라니",
    passive: "극강의 사교성",
    skill1: "인사 한마디",
    skill2: "자세히 훑어보기",
    ultimate: "하와이의 궁도",
    portraits: [
      { level: 1, description: "[하와이의 궁도] 열정 1포인트 추가 증가" },
      { level: 2, description: "[인사 한마디] 목표가 [속성 감소] [상태 이상] [제어] 중인 경우, 추가 현실 피해가 65/95/160%까지 증가" },
      { level: 3, description: "[하와이의 궁도] 주는 현실 피해가 350%까지 증가" },
      { level: 4, description: "[자세히 훑어보기] 목표의 현재 HP가 50%보다 낮을 경우, 추가 현실 피해가 85/125/210%까지 증가" },
      { level: 5, description: "[하와이의 궁도] 주는 현실 피해가 400%까지 증가" },
    ],
  },
  {
    character_id: 3036, // 존 티토
    name: "존 티토",
    passive: "깨진 글자 노트",
    skill1: "장식품이 아냐!",
    skill2: "진짜 천재!",
    ultimate: "65536바이트",
    portraits: [
      { level: 1, description: "[65536바이트] 아군에 주는 [보호막] 효과가 사용자 공격×130%까지 증가" },
      { level: 2, description: "[장식품이 아냐!] 주문 1/2/3단계 시 주는 현실 피해가 220/330/550%까지 증가" },
      { level: 3, description: "[65536바이트] 아군에 주는 [보호막] 효과가 사용자 공격×160%까지 증가" },
      { level: 4, description: "[진짜 천재!] 주문 1/2/3단계 시 자신이 주는 피해가 25/30/40%까지 증가" },
      { level: 5, description: "[65536바이트] 아군에 주는 [보호막] 효과가 사용자 공격×200%까지 증가" },
    ],
  },
  {
    character_id: 3037, // 네크롤로지스트
    name: "네크롤로지스트",
    passive: "솔개 꼬리",
    skill1: "적절한 작별",
    skill2: "관과의 동행",
    ultimate: "사자의 속삭임",
    portraits: [
      { level: 1, description: "[사자의 속삭임] 다른 아군이 주는 피해 증가 효과가 40%로 변경" },
      { level: 2, description: "[적절한 작별] 방어 무시율 증가 효과가 40%로 변경" },
      { level: 3, description: "[사자의 속삭임] 시전 후 목표가 이미 [기도의 말]을 보유한 경우, 회복량이 사용자 공격×150%의 HP까지 증가" },
      { level: 4, description: "[관과의 동행] 주문 1/2/3단계 시 주는 정신 피해가 220/280/500%까지 증가" },
      { level: 5, description: "[사자의 속삭임] 다른 아군이 주는 피해 증가 효과가 50%로 변경" },
    ],
  },
  {
    character_id: 3038, // 사츠키
    name: "사츠키",
    passive: "다이쇼 시녀",
    skill1: "묶인 도둑",
    skill2: "이즈의 무희",
    ultimate: "걸어가는 사이 지는 벚꽃",
    portraits: [
      { level: 1, description: "[걸어가는 사이 지는 벚꽃] 주는 정신 피해가 600%까지 증가" },
      { level: 2, description: "[묶인 도둑] 주문 1/2/3단계 시 주는 정신 피해가 220/250/380%까지 증가" },
      { level: 3, description: "[걸어가는 사이 지는 벚꽃] 주는 정신 피해가 650%까지 증가" },
      { level: 4, description: "[이즈의 무희] 방어 무시율 증가 효과가 40%로 변경" },
      { level: 5, description: "[걸어가는 사이 지는 벚꽃] 주는 정신 피해가 750%까지 증가" },
    ],
  },
  {
    character_id: 3039, // 안안 리
    name: "안안 리",
    passive: "출근시간",
    skill1: "상청도부",
    skill2: "백합영수",
    ultimate: "신 과학 전문 퇴마사",
    portraits: [
      { level: 1, description: "[신 과학 전문 퇴마사] 주는 현실 피해가 450%까지 증가" },
      { level: 2, description: "[상청도부] 주문 1/2/3단계 시 주는 현실 피해가 220/330/400%까지 증가" },
      { level: 3, description: "[신 과학 전문 퇴마사] 주는 현실 피해가 500%까지 증가" },
      { level: 4, description: "[상청도부] 주문 1/2/3단계 시 주는 현실 피해가 240/360/450%까지 증가" },
      { level: 5, description: "[신 과학 전문 퇴마사] 주는 현실 피해가 550%까지 증가" },
    ],
  },
  {
    character_id: 3040, // 리사&루이스
    name: "리사&루이스",
    passive: "쌍둥이 최면",
    skill1: "전후 협공",
    skill2: "술래잡기",
    ultimate: "착한 아이는 꿈나라로",
    portraits: [
      { level: 1, description: "[착한 아이는 꿈나라로] 주는 정신 피해가 500%까지 증가" },
      { level: 2, description: "[전후 협공] 주문 1/2/3단계 시 주는 정신 피해가 220/230/400%까지 증가" },
      { level: 3, description: "[착한 아이는 꿈나라로] 주는 정신 피해가 550%까지 증가" },
      { level: 4, description: "[술래잡기] 주문 1/2/3단계 시 치명타 방어 감소 효과가 30/40/50%로 변경" },
      { level: 5, description: "[착한 아이는 꿈나라로] 주는 정신 피해가 600%까지 증가" },
    ],
  },
  {
    character_id: 3041, // 마틸다
    name: "마틸다",
    passive: "자부심의 별",
    skill1: "천재의 습작",
    skill2: "모두 주목",
    ultimate: "눈 깜짝할 사이의 예시",
    portraits: [
      { level: 1, description: "[눈 깜짝할 사이의 예시] 이번 공격의 치명타율 증가 효과가 23%로 변경" },
      { level: 2, description: "[천재의 습작] 주문 1/2/3단계 시 주는 정신 피해가 220/280/500%까지 증가" },
      { level: 3, description: "[눈 깜짝할 사이의 예시] 이번 공격의 치명타율 증가 효과가 31%로 변경" },
      { level: 4, description: "[모두 주목] 이번 공격의 방어 무시율 증가 효과가 40%로 변경" },
      { level: 5, description: "[눈 깜짝할 사이의 예시] 이번 공격의 치명타율 증가 효과가 39%로 변경" },
    ],
  },
  {
    character_id: 3042, // 레이비스
    name: "레이비스",
    passive: "후유증",
    skill1: "유행성 광견병",
    skill2: "소란스러운 들판",
    ultimate: "헌신적인 볏짚 의사",
    portraits: [
      { level: 1, description: "[헌신적인 볏짚 의사] 주는 현실 피해가 300%까지 증가" },
      { level: 2, description: "[유행성 광견병] 주문 1/2/3단계 시 목표가 [속성 감소] [상태 이상] [제어] 중인 경우, 주는 현실 피해가 65/95/160%까지 증가" },
      { level: 3, description: "[헌신적인 볏짚 의사] 이번 공격의 방어 무시율 증가 효과가 40%로 변경" },
      { level: 4, description: "[소란스러운 들판] 추가 현실 피해를 주는 조건이 목표의 HP가 40%보다 높을 경우로 변경" },
      { level: 5, description: "[헌신적인 볏짚 의사] 이번 공격의 방어 무시율 증가 효과가 50%로 변경" },
    ],
  },
  {
    character_id: 3043, // 테넌트
    name: "테넌트",
    passive: "아름다운 속임수",
    skill1: "반짝이는 다이아",
    skill2: "은하수 한 다발",
    ultimate: "진정한 마음 하나",
    portraits: [
      { level: 1, description: "[진정한 마음 하나] 주는 현실 피해가 600%까지 증가" },
      { level: 2, description: "[반짝이는 다이아] 주문 1/2/3단계 시 주는 현실 피해가 220/330/550%까지 증가" },
      { level: 3, description: "[진정한 마음 하나] 주는 현실 피해가 650%까지 증가" },
      { level: 4, description: "[은하수 한 다발] 주문 1/2/3단계 시 아군에 주는 [보호막] 효과가 사용자 공격×90/135/225%까지 증가" },
      { level: 5, description: "[진정한 마음 하나] 주는 현실 피해가 700%까지 증가" },
    ],
  },
  {
    character_id: 3044, // 무아상
    name: "무아상",
    passive: "책임의 출처",
    skill1: "도예가",
    skill2: "교육자",
    ultimate: "특별한 도구들",
    portraits: [
      { level: 1, description: "[특별한 도구들] 주는 현실 피해가 450%까지 증가" },
      { level: 2, description: "[도예가] 주문 1/2/3단계 시 주는 현실 피해가 220/280/500%까지 증가" },
      { level: 3, description: "[특별한 도구들] 주는 현실 피해가 500%까지 증가" },
      { level: 4, description: "[교육자] 주문 1/2/3단계 시 아군에 주는 [보호막] 효과가 사용자 공격×90/135/225%까지 증가" },
      { level: 5, description: "[특별한 도구들] 주는 현실 피해가 550%까지 증가" },
    ],
  },
  {
    character_id: 3045, // 베티
    name: "베티",
    passive: "동기부여",
    skill1: "클래식 장면",
    skill2: null,
    ultimate: "캐스팅 때마다",
    portraits: [
      { level: 1, description: "[캐스팅 때마다] 단일 아군에 주는 [보호막] 효과가 사용자 공격×130%까지 증가" },
      { level: 2, description: "[클래식 장면] 방어 무시율 증가 효과가 40%로 변경" },
      { level: 3, description: "[캐스팅 때마다] 단일 아군에 주는 [보호막] 효과가 사용자 공격×160%까지 증가" },
      { level: 4, description: "[캐스팅 때마다] 단일 아군에 주는 [보호막] 효과가 사용자 공격×200%까지 증가" },
      { level: 5, description: "[캐스팅 때마다] 단일 아군에 주는 [보호막] 효과가 사용자 공격×250%까지 증가" },
    ],
  },
  {
    character_id: 3046, // 폴터가이스트
    name: "폴터가이스트",
    passive: "착한 아이",
    skill1: "나쁜 장난",
    skill2: "귓속말",
    ultimate: "햇빛은 따뜻하지 않아",
    portraits: [
      { level: 1, description: "[햇빛은 따뜻하지 않아] 시전 후 피해 회복 증가 효과가 35%로 변경" },
      { level: 2, description: "[나쁜 장난] 방어 무시율 증가 효과가 40%로 변경" },
      { level: 3, description: "[햇빛은 따뜻하지 않아] 시전 후 받는 피해 감소 효과가 30%로 변경" },
      { level: 4, description: "[귓속말] 주문 1/2/3단계 시 주는 정신 피해가 220/230/400%까지 증가" },
      { level: 5, description: "[햇빛은 따뜻하지 않아] 시전 후 피해 회복 증가 효과가 50%로 변경" },
    ],
  },
  {
    character_id: 3047, // 메디슨 포켓
    name: "메디슨 포켓",
    passive: "숲의 방울",
    skill1: "본래 습관",
    skill2: "연금 용기",
    ultimate: "26개의 2차 반응",
    portraits: [
      { level: 1, description: "[숲의 방울]회복량이 메디슨 포켓 공격×120%의 HP까지 증가." },
      { level: 2, description: "[연금 용기] 주문 1/2/3단계 시 모든 아군 회복량이 공격×90/135/220%의 HP까지 증가" },
      { level: 3, description: "[본래 습관] 주문 1/2/3단계 시 주는 정신 피해가 170/280/500%까지 증가" },
      { level: 4, description: "[26개의 2차 반응] 주는 정신 피해가 500%까지 증가" },
      { level: 5, description: "[본래 습관] 추가로 부여되는 받는 피해 증가 효과가 30%로 변경" },
    ],
  },
  {
    character_id: 3048, // 보이저
    name: "보이저",
    passive: "코러스 앙상블",
    skill1: "별들의 연주",
    skill2: null,
    ultimate: "현 위의 은하",
    portraits: [
      { level: 1, description: "[현 위의 은하] 목표가 [의식 혼란] 상태인 경우, 추가 정신 피해가 175%까지 증가" },
      { level: 2, description: "[별들의 연주] 주문 1/2/3단계 시 주는 정신 피해가 165/170/250%까지 증가" },
      { level: 3, description: "[현 위의 은하] 목표가 [의식 혼란] 상태인 경우, 추가 정신 피해가 250%까지 증가" },
      { level: 4, description: "[현 위의 은하] 목표가 [의식 혼란] 상태인 경우, 추가 정신 피해가 325%까지 증가" },
      { level: 5, description: "[현 위의 은하] 목표가 [의식 혼란] 상태인 경우, 추가 정신 피해가 400%까지 증가" },
    ],
  },
  {
    character_id: 3049, // 클릭
    name: "클릭",
    passive: "새로운 촬영",
    skill1: "방관자",
    skill2: "목격자",
    ultimate: "값비싼 사진",
    portraits: [
      { level: 1, description: "[값비싼 사진] 주는 정신 피해가 350%까지 증가" },
      { level: 2, description: "[방관자] 주문 1/2/3단계 시 주는 정신 피해가 220/280/450%까지 증가" },
      { level: 3, description: "[값비싼 사진] 주는 정신 피해가 400%까지 증가" },
      { level: 4, description: "[목격자] 주문 1/2/3단계 시 주는 정신 피해가 220/280/450%까지 증가" },
      { level: 5, description: "[값비싼 사진] 주는 정신 피해가 450%까지 증가" },
    ],
  },
  {
    character_id: 3050, // 다그닥 달리
    name: "다그닥 달리",
    passive: "다시 찾은 영광",
    skill1: "말발굽 소리",
    skill2: "늠름한 자태",
    ultimate: "선조의 격려",
    portraits: [
      { level: 1, description: "[선조의 격려] 시전 후 다른 아군 열정 증가 효과가 2포인트까지 증가" },
      { level: 2, description: "[말발굽 소리] 방어 무시율 증가 효과가 40%로 변경" },
      { level: 3, description: "[선조의 격려] 시전 후 모든 아군의 주는 피해 증가 효과가 35%로 변경" },
      { level: 4, description: "[늠름한 자태] 주문 1/2/3단계 시 HP 비율이 가장 낮은 단일 아군의 HP 증가가 사용자 공격×56/84/140%까지 증가" },
      { level: 5, description: "[선조의 격려] 시전 후 자신의 HP 회복량이 잃은 HP의 25%까지 증가" },
    ],
  },
  {
    character_id: 3051, // 이터니티
    name: "이터니티",
    passive: "백 년의 고독함",
    skill1: "생기 있는 가방",
    skill2: "골동품 부채",
    ultimate: "엑서터의 놀라운 소문",
    portraits: [
      { level: 1, description: "[엑서터의 놀라운 소문] 주는 현실 피해가 350%까지 증가" },
      { level: 2, description: "[생기 있는 가방] 주문 1/2/3단계 시 주는 현실 피해가 220/330/550%까지 증가" },
      { level: 3, description: "[골동품 부채] 주문 1/2/3단계 시 주는 현실 피해가 180/270/450%까지 증가" },
      { level: 4, description: "[엑서터의 놀라운 소문] 흡혈률 증가 효과가 60%로 변경" },
      { level: 5, description: "[엑서터의 놀라운 소문] 주는 현실 피해가 400%까지 증가" },
    ],
  },
  {
    character_id: 3052, // 뉴바벨
    name: "뉴바벨",
    passive: "뛰어난 안목과 견해",
    skill1: "오랜 관념",
    skill2: "새로운 파도",
    ultimate: "미래는 가까이에",
    portraits: [
      { level: 1, description: "[미래는 가까이에] 팽 파트너 반격으로 주는 현실 피해가 110%까지 증가, 고정 피해가 현실 방어×110%까지 증가" },
      { level: 2, description: "[오랜 관념] 주문 1/2/3단계 시 추가로 부여되는 고정 피해가 자신의 현실 방어×100/150/250%까지 증가" },
      { level: 3, description: "[미래는 가까이에] 팽 파트너 반격으로 주는 현실 피해가 120%까지 증가, 고정 피해가 현실 방어×120%까지 증가" },
      { level: 4, description: "[미래는 가까이에] 팽 파트너 반격으로 주는 현실 피해가 130%까지 증가, 고정 피해가 현실 방어×130%까지 증가" },
      { level: 5, description: "[새로운 파도] 주문 1/2/3단계 시 아군에 주는 [보호막] 효과가 뉴바벨 현실 방어×170/250/410%까지 증가" },
    ],
  },
  {
    character_id: 3053, // 투스 페어리
    name: "투스 페어리",
    passive: "유치 수집가",
    skill1: "빈 잇몸",
    skill2: "자장가",
    ultimate: "악치 댄스",
    portraits: [
      { level: 1, description: "[악치 댄스] 주는 정신 피해가 600%까지 증가" },
      { level: 2, description: "[유치 수집가] 치명타 저항률, 치명타 방어 감소 효과 1턴 연장" },
      { level: 3, description: "[빈 잇몸] 주문 1/2/3단계 시 주는 정신 피해가 170/280/500%까지 증가" },
      { level: 4, description: "[자장가] 주문 1/2/3단계 시 모든 아군의 회복 HP가 사용자 공격×90/135/225%까지 증가" },
      { level: 5, description: "[유치 수집가] 치명타 저항률, 치명타 방어 감소 효과 25%로 변경" },
    ],
  },
  {
    character_id: 3054, // 어니언
    name: "어니언",
    passive: "깨어난 자",
    skill1: "허상이 아닌 사실",
    skill2: "그저 연출일 뿐",
    ultimate: "자주 발생하는 괴현상",
    portraits: [
      { level: 1, description: "[자주 발생하는 괴현상] 주는 현실 피해가 300%까지 증가" },
      { level: 2, description: "[허상이 아닌 사실] 주문 1/2/3단계 시 목표가 [속성 감소] [상태 이상] [제어] 중인 경우, 추가 현실 피해가 65/95/160%까지 증가" },
      { level: 3, description: "[자주 발생하는 괴현상] 주는 현실 피해가 350%까지 증가" },
      { level: 4, description: "[그저 연출일 뿐] 추가 현실 피해를 주는 조건이 목표의 HP가 60%보다 낮을 경우로 변경" },
      { level: 5, description: "[자주 발생하는 괴현상] 주는 현실 피해가 400%까지 증가" },
    ],
  },
  {
    character_id: 3055, // 스푸트니크
    name: "스푸트니크",
    passive: "다시 제자리로",
    skill1: "공전관성",
    skill2: null,
    ultimate: "비밀유지 서약의 수호자",
    portraits: [
      { level: 1, description: "[비밀유지 서약의 수호자] 주는 정신 피해가 400%까지 증가" },
      { level: 2, description: "[공전관성] 추가 정신 피해 발동 조건이 자신의 HP가 40%보다 높을 경우로 변경" },
      { level: 3, description: "[비밀유지 서약의 수호자] 주는 정신 피해가 450%까지 증가" },
      { level: 4, description: "[공전관성] 추가 정신 피해 발동 조건이 자신의 HP가 30%보다 높을 경우로 변경" },
      { level: 5, description: "[비밀유지 서약의 수호자] 주는 정신 피해가 500%까지 증가" },
    ],
  },
  {
    character_id: 3056, // 제시카
    name: "제시카",
    passive: "체인질링",
    skill1: "하얀 벨벳 담요",
    skill2: "좋은 친구",
    ultimate: "깊은 숲속의 응시",
    portraits: [
      { level: 1, description: "[깊은 숲속의 응시] 주는 현실 피해가 425%까지 증가" },
      { level: 2, description: "[체인질링] 전투 진입 및 3턴마다 부여한 중독 1턴 연장" },
      { level: 3, description: "[하얀 벨벳 담요] 주문 1/2/3단계 시 주는 현실 피해가 200/300/500%까지 증가" },
      { level: 4, description: "[좋은 친구] 주문 1/2/3단계 시 목표가 [속성 감소] [상태 이상] [제어] 중인 경우, 주는 현실 피해가 50/75/125%까지 증가" },
      { level: 5, description: "[깊은 숲속의 응시] 주는 현실 피해가 500%까지 증가" },
    ],
  },
  {
    character_id: 3057, // 메스머 주니어
    name: "메스머 주니어",
    passive: "차단제",
    skill1: "자기장 투과",
    skill2: null,
    ultimate: "가상 몽유 치료법",
    portraits: [
      { level: 1, description: "[가상 몽유 치료법] 주는 정신 피해가 225%까지 증가" },
      { level: 2, description: "[자기장 투과] 주문 1/2/3단계 시 주는 정신 피해가 220/280/500%까지 증가" },
      { level: 3, description: "[가상 몽유 치료법] 주는 정신 피해가 250%까지 증가" },
      { level: 4, description: "[가상 몽유 치료법] 주는 정신 피해가 275%까지 증가" },
      { level: 5, description: "[가상 몽유 치료법] 주는 정신 피해가 325%까지 증가" },
    ],
  },
  {
    character_id: 3058, // 에릭
    name: "에릭",
    passive: "개선곡",
    skill1: "무거운 도끼",
    skill2: "목제 용선",
    ultimate: "바이킹의 영광",
    portraits: [
      { level: 1, description: "[바이킹의 영광] 주는 현실 피해가 500%까지 증가" },
      { level: 2, description: "[무거운 도끼] 주문 1/2/3단계 시 주는 현실 피해가 220/230/350%까지 증가" },
      { level: 3, description: "[바이킹의 영광] 주는 현실 피해가 550%까지 증가" },
      { level: 4, description: "[목제 용선] 방어 무시율 증가 효과가 40%로 변경" },
      { level: 5, description: "[바이킹의 영광] 주는 현실 피해가 600%까지 증가" },
    ],
  },
  {
    character_id: 3059, // 문
    name: "문",
    passive: "겸손한 성품",
    skill1: "깊은 소용돌이",
    skill2: "집광 렌즈",
    ultimate: "파편 속 우주",
    portraits: [
      { level: 1, description: "[파편 속 우주] 아군에 주는 [보호막] 효과가 사용자 공격×150%까지 증가" },
      { level: 2, description: "[깊은 소용돌이] 주문 1/2/3단계 시 주는 현실 피해가 220/330/550%까지 증가" },
      { level: 3, description: "[파편 속 우주] 아군에 주는 [보호막] 효과가 사용자 공격×200%까지 증가" },
      { level: 4, description: "[집광 렌즈] 주문 1/2/3단계 시 주는 현실 피해가 165/245/400%까지 증가" },
      { level: 5, description: "[파편 속 우주] 아군에 주는 [보호막] 효과가 사용자 공격×250%까지 증가" },
    ],
  },
  {
    character_id: 3060, // 블로니
    name: "블로니",
    passive: "몬스터 설계사",
    skill1: "광기 어린 토끼",
    skill2: "패닉 전기톱",
    ultimate: "슬러리 무비",
    portraits: [
      { level: 1, description: "[슬러리 무비] 치명타율 증가 효과가 30%로 변경" },
      { level: 2, description: "[광기 어린 토끼] 주문 1/2/3단계 시 이번 공격의 치명타율, 치명타 피해 증가 효과가 30%로 변경" },
      { level: 3, description: "[슬러리 무비] 주는 현실 피해가 300%까지 증가" },
      { level: 4, description: "[패닉 전기톱] 주문 1/2/3단계 시 주는 현실 피해가 220/280/500%까지 증가" },
      { level: 5, description: "[슬러리 무비] 치명타율 증가 효과가 40%로 변경" },
    ],
  },
  {
    character_id: 3061, // 호러피디아
    name: "호러피디아",
    passive: "점프 스케어",
    skill1: "논리적 지침",
    skill2: "저글링",
    ultimate: "쌍둥이 계략",
    portraits: [
      { level: 1, description: "[쌍둥이 계략] 주는 정신 피해가 350%까지 증가" },
      { level: 2, description: "[논리적 지침] 주문 1/2/3단계 시 주는 정신 피해가 220/280/500%까지 증가" },
      { level: 3, description: "[쌍둥이 계략] 주는 정신 피해가 400%까지 증가" },
      { level: 4, description: "[저글링] 주문 1/2/3단계 시 주는 정신 피해가 180/270/450%까지 증가" },
      { level: 5, description: "[쌍둥이 계략] 목표에게 [불안] 1스택 추가 부여" },
    ],
  },
  {
    character_id: 3062, // 멜라니아
    name: "멜라니아",
    passive: "우등생",
    skill1: "빈틈 급습",
    skill2: "생쥐 폭탄",
    ultimate: "황당한 목격 증언",
    portraits: [
      { level: 1, description: "[황당한 목격 증언] 주는 정신 피해가 725%까지 증가" },
      { level: 2, description: "[황당한 목격 증언] [신의 솜씨] 1스택 추가 획득" },
      { level: 3, description: "[빈틈 급습] 주문 1/2/3단계 시 주는 정신 피해가 220/280/450%까지 증가" },
      { level: 4, description: "[생쥐 폭탄] 주문 1/2/3단계 시 주는 정신 피해가 135/200/325%까지 증가" },
      { level: 5, description: "[황당한 목격 증언] 주는 정신 피해가 800%까지 증가" },
    ],
  },
  {
    character_id: 3063, // 피클즈
    name: "피클즈",
    passive: "명제 서술",
    skill1: "허무맹랑한 모함",
    skill2: "고무공의 관찰",
    ultimate: "피클즈는 이렇게 말했다",
    portraits: [
      { level: 1, description: "[피클즈는 이렇게 말했다] 주는 정신 피해가 575%까지 증가" },
      { level: 2, description: "[피클즈는 이렇게 말했다] 모든 아군의 주는 피해 증가 효과가 40%로 변경" },
      { level: 3, description: "[허무맹랑한 모함] 주문 1/2/3단계 시, [명확한 출제] 상태일 경우, 추가 정신 피해가 80/120/200%까지 증가" },
      { level: 4, description: "[고무공의 관찰] 주문 1/2/3단계 시, 주는 정신 피해가 160/170/325%까지 증가" },
      { level: 5, description: "[피클즈는 이렇게 말했다] 주는 정신 피해가 650%까지 증가" },
    ],
  },
  {
    character_id: 3064, // 디거스
    name: "디거스",
    passive: "아름다운 퍼레이드",
    skill1: "평화 제일",
    skill2: null,
    ultimate: "눈을 감으면 찾아오는 단꿈",
    portraits: [
      { level: 1, description: "[눈을 감으면 찾아오는 단꿈] 주는 정신 피해가 500%까지 증가" },
      { level: 2, description: "[평화 제일] 주문 1/2/3단계 시, 주는 정신 피해가 220%/230%/450%까지 증가" },
      { level: 3, description: "[눈을 감으면 찾아오는 단꿈] 주는 정신 피해가 550%까지 증가" },
      { level: 4, description: "[평화 제일] 주문 2/3단계 시, [쇠약] 1스택 추가 부여." },
      { level: 5, description: "[눈을 감으면 찾아오는 단꿈] 주는 정신 피해가 600%까지 증가" },
    ],
  },
  {
    character_id: 3065, // 마커스
    name: "마커스",
    passive: "페이지 열람",
    skill1: "정독 수업",
    skill2: "불빛 사이",
    ultimate: "더 멀리 닿는 시선",
    portraits: [
      { level: 1, description: "[페이지 열람]전투 시작 시 획득하는 신기한 빛 3으로 증가" },
      { level: 2, description: "[페이지 열람]주문을 2단계에서 3단계로 높일 때 소모되는 신기한 빛 2로 감소" },
      { level: 3, description: "[불빛 사이]주문 1/2/3단계 시 주는 정신 피해가 160/270/420%까지 증가" },
      { level: 4, description: "[페이지 열람]턴 시작 시 획득하는 신기한 빛 2로 증가" },
      { level: 5, description: "[정독 수업]주문 1/2/3단계 시 주는 정신 피해가 230/380/520%까지 증가" },
    ],
  },
  {
    character_id: 3066, // 37
    name: "37",
    passive: "기원의 연산",
    skill1: null,
    skill2: null,
    ultimate: "숫자와 기하학의 왕국",
    portraits: [
      { level: 1, description: "[기원의 연산] 전투 진입 시 치명타율 증가 효과 40%로 변경." },
      { level: 2, description: "[기원의 연산] [추가 산식]의 주는 정신 피해가 180%까지 증가. 추가 고정 피해 증가가 자신의 공격x60%까지 증가." },
      { level: 3, description: "[숫자와 기하학의 왕국] 부여하는 [깨우침]이 3스택까지 증가, 자신이 획득하는 신기한 빛이 3까지 증가." },
      { level: 4, description: "[기원의 연산] [추가 산식]의 주는 정신 피해가 240%까지 증가. 추가 고정 피해 증가가 자신의 공격x80%까지 증가." },
      { level: 5, description: "[숫자와 기하학의 왕국] 부여하는 [수차원의 감각]이 3스택까지 증가, 자신이 획득하는 신기한 빛이 4까지 증가." },
    ],
  },
  {
    character_id: 3070, // 갈라보나
    name: "갈라보나",
    passive: "별자리 이동학",
    skill1: "체술 낭송",
    skill2: "오래된 관측법",
    ultimate: "유일한 완벽함",
    portraits: [
      { level: 1, description: "[별자리 이동학] [행성] 최대치 4까지 증가" },
      { level: 2, description: "[유일한 완벽함] [만월] 획득 수량 3까지 증가. 최종 술식 사용 후 제거한 [만월] 수량이 3개 이상일 시 자신이 3턴간 [주문 강화Ⅱ] 상태 진입" },
      { level: 3, description: "[체술 낭송] [토성] 1개당 부여하는 방어 무시율 9%까지 증가. 주문 1/2/3단계 시 주는 정신 피해 195/295/490%까지 증가" },
      { level: 4, description: "[오래된 관측법] [화성] 1개당 부여하는 흡혈률 9%까지 증가. 주문 1/2/3단계 시 주는 정신 피해 145/215/360%까지 증가 " },
      { level: 5, description: "[유일한 완벽함] [만월] 획득 수량 4까지 증가. [만월] 1개당 부여하는 마법 위력 9%까지 증가" },
    ],
  },
  {
    character_id: 3071, // 칸지라
    name: "칸지라",
    passive: "방랑의 학문",
    skill1: "헤이, 푼기!",
    skill2: "오, 점술!",
    ultimate: "방랑의 노래와 춤",
    portraits: [
      { level: 1, description: "[방랑의 학문] [비취빛 운세] 상태에서 [헤이, 푼기!] 시전 시 부여하는 [중독] 지속 시간 +1" },
      { level: 2, description: "[오, 점술!] 주문 1/2/3단계 시 주는 정신 피해가 220/330/550%까지 증가" },
      { level: 3, description: "[방랑의 학문] [마노빛 운세] 상태에서 [방랑의 노래와 춤] 시전 시 술식 위력 추가로 15% 증가" },
      { level: 4, description: "[헤이, 푼기!] 주문 1/2/3단계 시 주는 정신 피해가 170/280/500%까지 증가" },
      { level: 5, description: "[방랑의 노래와 춤] 주는 정신 피해가 350%까지 증가" },
    ],
  },
  {
    character_id: 3072, // 갈기 모래
    name: "갈기 모래",
    passive: "고대의 지혜",
    skill1: "견습 무용술",
    skill2: null,
    ultimate: "인류의 의지",
    portraits: [
      { level: 1, description: "[고대의 지혜] 전투 진입 시 [자연의 비호] 3스택 추가 획득" },
      { level: 2, description: "[인류의 의지] 주 목표에게 주는 치명타율 증가 효과 60%로 변경" },
      { level: 3, description: "[견습 무용술] 주문 1/2/3단계 시 주는 현실 피해가 220/280/500%까지 증가" },
      { level: 4, description: "[인류의 의지] 모든 적군에게 주는 현실 피해 300%까지 증가" },
      { level: 5, description: "[인류의 의지] 주 목표에게 주는 치명타율 증가 효과 100%로 변경" },
    ],
  },
  {
    character_id: 3073, // 스파토데아
    name: "스파토데아",
    passive: "화염의 꽃",
    skill1: "꼬마 복서",
    skill2: "‘발화점’",
    ultimate: "불 속의 불",
    portraits: [
      { level: 1, description: "[꼬마 복서] 치명타 피해 증가 효과가 70%로 변경." },
      { level: 2, description: "[화염의 꽃] 치명타율 증가 효과가 50%로 변경." },
      { level: 3, description: "</nobr>[불 속의 불] 치명타 피해 증가 효과가 70%로 변경, 치명타 피해 추가 증가 효과가 70%로 변경." },
      { level: 4, description: "[꼬마 복서] 주문 1/2/3단계 시 주는 현실 피해가 220/330/550%까지 증가" },
      { level: 5, description: "[불 속의 불] 주는 현실 피해가 750%까지 증가, 치명타 피해 증가 효과가 100%로 변경, 치명타 피해 추가 증가 효과가 100%로 변경." },
    ],
  },
  {
    character_id: 3074, // 에즈라
    name: "에즈라",
    passive: "진균 순환기",
    skill1: "몸 지키기",
    skill2: "정신 격려",
    ultimate: "넘치는 연민",
    portraits: [
      { level: 1, description: "[진균 순환기] 전투 진입 시 신기한 빛 추가 2포인트 증가. 각 버섯 회복량이 자신의 잃은 HP×12%까지 증가" },
      { level: 2, description: "[몸 지키기] 주문 1/2단계 시 잃은 HP 효과가 현재 HPx10%까지 감소. [꿀 버섯]이 부여하는 [델리케이트] 3스택까지 증가" },
      { level: 3, description: "[정신 격려] 주문 1/2/3단계 시 아군에 주는 [보호막] 효과가 자신 HP×20%/25%/35%까지 증가" },
      { level: 4, description: "[몸 지키기] 주문 1/2/3단계 시 주는 고정 피해가 자신 HP×20%/25%/35%까지 증가" },
      { level: 5, description: "[정신 격려] 주문 1/2단계 시 잃은 HP 효과가 현재 HPx10%까지 감소. [유령 버섯]이 부여하는 [판별] 3스택까지 증가" },
    ],
  },
  {
    character_id: 3075, // 데저트 플란넬
    name: "데저트 플란넬",
    passive: "목자의 사람",
    skill1: "혼합복식!",
    skill2: "하나뿐인 가족!",
    ultimate: "삐삐뽀뽀, 플래피!",
    portraits: [
      { level: 1, description: "[삐삐뽀뽀, 플래피!] 모든 아군 회복량이 사용자 공격×120%의 HP까지 증가." },
      { level: 2, description: "[삐삐뽀뽀, 플래피!] 모든 아군 회복량이 사용자 공격×140%의 HP까지 증가." },
      { level: 3, description: "[혼합복식!] 주문 1/2/3단계 시 자신이 [버프 상태] [카운터] 상태일 경우 이번 공격의 치명타율, 치명타 피해 증가 효과가 35%까지 증가." },
      { level: 4, description: "[하나뿐인 가족!] [플래피] 반격 시 치명타율, 치명타 피해 증가 효과가 35%로 변경." },
      { level: 5, description: "[삐삐뽀뽀, 플래피!] 모든 아군 회복량이 사용자 공격×160%의 HP까지 증가, 부여하는 [폭발력] 3스택까지 증가." },
    ],
  },
  {
    character_id: 3076, // 울루
    name: "울루",
    passive: "불꽃 숭배",
    skill1: "개막식",
    skill2: "고동치는 마음",
    ultimate: "꺼지지 않는 불, 뜨거운 가슴",
    portraits: [
      { level: 1, description: "[개막식] 주문 1/2/3단계 시 주는 정신 피해가 180/270/450%까지 증가." },
      { level: 2, description: "[개막식] 주문 1/2/3단계 시 방어 무시율 증가 효과가 30/35/40%로 변경." },
      { level: 3, description: "[고동치는 마음] 주문 1/2/3단계 시 주는 정신 피해가 140/210/350%까지 증가." },
      { level: 4, description: "[불꽃 숭배] 모든 아군의 회복량이 잃은 HP 10%까지 증가." },
      { level: 5, description: "[꺼지지 않는 불, 뜨거운 가슴] 모든 아군의 피해 증가 효과가 20%로 변경." },
    ],
  },
  {
    character_id: 3077, // 윈드송
    name: "윈드송",
    passive: "혼합주의",
    skill1: "증명의 이유",
    skill2: "실용적 논조",
    ultimate: "더욱 기나긴",
    portraits: [
      { level: 1, description: "[증명의 이유]주문 1/2/3단계 시 주는 정신 피해가 200/290/480%까지 증가, 신기한 빛을 소모하여 추가로 주는 정신 피해가 90/130/200%까지 증가" },
      { level: 2, description: "[혼합주의]전투 진입 시 치명타율, 치명타 피해 증가 효과가 25%로 변경" },
      { level: 3, description: "[더욱 기나긴]획득하는 신기한 빛이 5로 증가" },
      { level: 4, description: "[실용적 논조]주문 1/2단계 시 주는 정신 피해가 180/230%까지 증가" },
      { level: 5, description: "[증명의 이유]주문 1/2/3단계 시 주는 정신 피해가 220/320/520%까지 증가, 신기한 빛을 소모하여 추가로 주는 정신 피해가 110/160/240%까지 증가" },
    ],
  },
  {
    character_id: 3078, // 아브구스트
    name: "아브구스트",
    passive: "해바라기씨 호위대",
    skill1: "안녕하세요!",
    skill2: "건강하세요~",
    ultimate: "한 획, 한 그림",
    portraits: [
      { level: 1, description: "[안녕하세요!]주문 1/2/3단계 시 주는 정신 피해가 140/230/350%까지 증가" },
      { level: 2, description: "[건강하세요~]주문 1/2/3단계 시 제공하는 [유합] 턴 수가 2/3/4턴까지 증가" },
      { level: 3, description: "[한 획, 한 그림] 주는 정신 피해가 350%까지 증가" },
      { level: 4, description: "[건강하세요~]자신과 후방 아군의 피해 회복 증가 효과가 15%까지 증가" },
      { level: 5, description: "[안녕하세요!]자신과 전방 아군의 주는 피해 증가 효과가 15%까지 증가" },
    ],
  },
  {
    character_id: 3079, // 6
    name: "6",
    passive: "지식의 숭배",
    skill1: null,
    skill2: "책과 임",
    ultimate: "끊이지 않는 계시",
    portraits: [
      { level: 1, description: "[끊이지 않는 계시] 추가 정신 피해를 발동하는 신기한 빛 수량과 소모가 5로 변경되며 추가로 주는 정신 피해가 100%으로 증가." },
      { level: 2, description: "[지식의 숭배] 획득하는 신기한 빛이 추가로 1 증가, [속성 감소] [상태 이상] [제어] 중인 목표 공격 시 주는 피해 증가 효과가 24%로 변경." },
      { level: 3, description: "[책과 임] 주문 1/2/3단계 시 랜덤으로 아군 단일 대상의 3/5/7종류 [속성 감소] [상태 이상] [제어] 정화로 변경." },
      { level: 4, description: "[끊이지 않는 계시] 추가로 주는 정신 피해가 125%까지 증가." },
      { level: 5, description: "[끊이지 않는 계시] 추가 정신 피해를 발동하는 신기한 빛 수량과 소모가 4로 변경되며 추가로 주는 정신 피해 횟수가 6회로 증가." },
    ],
  },
  {
    character_id: 3080, // 카카니아
    name: "카카니아",
    passive: "정신분석학으로",
    skill1: "잠재의식",
    skill2: "연상법",
    ultimate: "원초아, 자아, 초자아",
    portraits: [
      { level: 1, description: "[연상법] [심리적 위안]이 제공하는 공격 보너스가 400까지 증가. [공감] 수치의 추가로 증가하는 공격이 13%까지 증가" },
      { level: 2, description: "[정신분석학으로] [공감]의 발동하는 치료의 HP 상한이 3%에서 2%로 감소. 치료 받을 시, 주는 고정 피해 증가가 공감*120%까지 증가" },
      { level: 3, description: "[정신분석학으로] [공감] 최대치가 최대 HP 30%로 증가, [공감] 수치로 변환되는 받는 피해 비율이 15%로 변경" },
      { level: 4, description: "[잠재의식] 주문 1/2/3단계 시 주는 고정 피해가 현재 공감×270/310/350%까지 증가" },
      { level: 5, description: "[원초아, 자아, 초자아] 추가 고정 피해가 현재 [공감]×1300% 까지 증가. 턴 종료 시 주는 고정 피해가 기록 값×45%로 증가" },
    ],
  },
  {
    character_id: 3081, // 이졸데
    name: "이졸데",
    passive: "일곱 베일",
    skill1: "맴도는 허밍",
    skill2: null,
    ultimate: "피가 목까지 차오를 때",
    portraits: [
      { level: 1, description: "[일곱 베일][간주곡] 목표의 [연소] 스택당 추가 현실 피해가 13%까지 증가" },
      { level: 2, description: "[일곱 베일] [서곡]의 [막간희극] 랭크 업에 필요한 [열기]가 10까지 감소, [막간희극]의 [피날레] 랭크 업에 필요한 열기가 30까지 감소" },
      { level: 3, description: "[일곱 베일][간주곡] 목표의 [연소] 스택당 추가 현실 피해가 16%까지 증가" },
      { level: 4, description: "[맴도는 허밍]주문 1/2/3단계 시 주는 현실 피해가 200/300/400%까지 증가" },
      { level: 5, description: "[일곱 베일][간주곡] 목표의 [연소] 스택당 추가 현실 피해가 20%까지 증가" },
    ],
  },
  {
    character_id: 3082, // 예니세이
    name: "예니세이",
    passive: "과도한 보호욕",
    skill1: "착실한 자",
    skill2: null,
    ultimate: "물길은 모든 것을 안다",
    portraits: [
      { level: 1, description: "[착실한 자] 주문 1/2/3단계 시 주는 정신 피해가 220/230/400%까지 증가" },
      { level: 2, description: "[과도한 보호욕] 전투 진입 시 [흐름] 1스택 추가 획득" },
      { level: 3, description: "[물길은 모든 것을 안다] 모든 아군에게 주는 [보호막] 효과가 예니세이 최대 HP×30%까지 증가." },
      { level: 4, description: "[과도한 보호욕] 전투 진입 시 치료율 8% 추가 증가." },
      { level: 5, description: "[물길은 모든 것을 안다] 모든 아군에게 주는 [보호막] 효과가 예니세이 최대 HP×35%까지 증가." },
    ],
  },
  {
    character_id: 3083, // 곡랑
    name: "곡랑",
    passive: "생각 품기",
    skill1: "한잔 더",
    skill2: "백주 국자",
    ultimate: "백주와 아수라장",
    portraits: [
      { level: 1, description: "[백주와 아수라장]으로 주는 현실 피해가 400%까지 증가, 1명이 감소할 때마다 추가로 주는 현실 피해가 150%까지 증가, 해당 효과는 최대 300%의 현실 피해까지 증가." },
      { level: 2, description: "[한잔 더]로 [술] 1스택 소모할 때마다, 주는 현실 피해 90%까지 증가." },
      { level: 3, description: "[생각 품기] 랜덤으로 자신에게 부여하는 [버프 집합] 효과 2종류로 증가." },
      { level: 4, description: "[한잔 더]로 소모하는 [술] 최대 스택이 4스택으로 증가. [술]이 1/2/3/4스택을 소모하는 확률이 5%/15%/40%/40%로 변경." },
      { level: 5, description: "[생각 품기] [버프 집합] 중의 효과가 25%까지 증가. 턴 종료 시, 보유한 상태 3종마다 자신에게 [술] 1스택 부여, 획득 최대치 5스택으로 증가." },
    ],
  },
  {
    character_id: 3084, // 갈천
    name: "갈천",
    passive: "골상 학문",
    skill1: "또 다른 뼈",
    skill2: "유일무이한 상",
    ultimate: "행하고 존재하니, 고로 보았다.",
    portraits: [
      { level: 1, description: "[행하고 존재하니, 고로 보았다.] 부여의 [참언의 지역] 지속시간 1턴 연장." },
      { level: 2, description: "[골상 학문] 발동 조건이 아군 중 2명 이상의 현실 피해 유형 캐릭터가 있고 획득한 열정 수가 4까지 증가한 것으로 변경. [참언의 지역]일 경우 갈천이 [계] 공격 시전 시의 치명타율, 치명타 피해 증가 효과가 30%로 변경." },
      { level: 3, description: "[유일무이한 상] [계]가 주는 현실 피해가 150%까지 증가" },
      { level: 4, description: "[또 다른 뼈] 주문 1단계 시 주는 현실 피해가 160%까지 증가" },
      { level: 5, description: "[골상 학문] [참언의 지역]일 경우 갈천이 [계] 공격 시전 시의 치명타율, 치명타 피해 증가 효과가 50%로 변경." },
    ],
  },
  {
    character_id: 3086, // 루시
    name: "루시",
    passive: "최초의 전동",
    skill1: null,
    skill2: null,
    ultimate: "한 걸음 앞으로",
    portraits: [
      { level: 1, description: "[최초의 전동] [에너지 보존]의 주는 현실 피해가 150%까지 증가. 추가 피해 조건이 ‘목표 현재 HP가 75%보다 낮을 경우’로 변경, 추가 피해는 100%까지 증가" },
      { level: 2, description: "[한 걸음 앞으로] [실용주의]와 [리더쉽] 지속 턴이 3까지 증가, 상성 피해 계수 보너스가 20%까지 증가" },
      { level: 3, description: "[최초의 전동] [데이터 반복] 공격 보너스가 6%까지 증가, 적군 퇴장 시 획득하는 [데이터 반복] 2스택까지 증가" },
      { level: 4, description: "[최초의 전동] [에너지 보존]의 주는 현실 피해가 200%까지 증가. 턴마다 적군 퇴장으로 발동하는 [에너지 보존]의 횟수 최대치 4까지 증가" },
      { level: 5, description: "[최초의 전동] [데이터 반복] 공격 보너스가 8%까지 증가, 최대치가 6스택까지 증가. 아군이 열정 또는 신기한 빛 1 획득 시마다 자신이 획득하는 [전력]이 2스택까지 증가" },
    ],
  },
  {
    character_id: 3087, // 빌라
    name: "빌라",
    passive: "‘우리’",
    skill1: "고조된 마음",
    skill2: null,
    ultimate: "아득히 멀고 빛나는",
    portraits: [
      { level: 1, description: "[고조된 마음][관대함의 노래] [열정의 노래] 상태에서 제공하는 치명타율 보너스와 치명타 피해 보너스가 30/30%까지 증가" },
      { level: 2, description: "[고조된 마음][열정의 노래] 상태에서 제공하는 추가 피해가 80/150/230%까지 증가" },
      { level: 3, description: "[고조된 마음][관대함의 노래] [열정의 노래] 상태에서 제공하는 치명타율 보너스와 치명타 피해 보너스가 40/40%까지 증가" },
      { level: 4, description: "[고조된 마음][열정의 노래] 상태에서 제공하는 추가 피해가 110/180/260%까지 증가" },
      { level: 5, description: "[아득히 멀고 빛나는][루살카] 지속 턴 수가 4턴까지 증가" },
    ],
  },
  {
    character_id: 3088, // 제멜바이스
    name: "제멜바이스",
    passive: "흡혈 습성",
    skill1: "철제 명찰",
    skill2: null,
    ultimate: "이렇게 올라가고, 올라가라",
    portraits: [
      { level: 1, description: "[이렇게 올라가고, 올라가라] 설치한 [핏빛 구역] 효과가 아군 캐릭터가 공격할 때 잃은 최대 HP의 10%당 피해 보너스 추가 +7.5%(최대 60%)로 변경" },
      { level: 2, description: "[흡혈 습성] [야성] 상태일 때, 아군이 행동하여 임의의 캐릭터가 HP를 1회 잃을 때마다 이번에 시전한 [드러난 진실]의 현실 피해 45% 증가" },
      { level: 3, description: "[이렇게 올라가고, 올라가라] [야성] 상태일 때, 시전한 [드러난 진실]의 모든 적군에게 주는 현실 피해 120%까지 증가" },
      { level: 4, description: "[철제 명찰]주는 현실 피해가 260/390/630%까지 증가" },
      { level: 5, description: "[흡혈 습성] [야성] 상태일 때, 아군이 행동하여 임의의 캐릭터가 HP를 1회 잃을 때마다 이번에 시전한 [드러난 진실]의 현실 피해 60% 증가" },
    ],
  },
  {
    character_id: 3091, // 로렐라이
    name: "로렐라이",
    passive: "마음의 찬가",
    skill1: null,
    skill2: null,
    ultimate: "흘러가는 노래",
    portraits: [
      { level: 1, description: "[흘러가는 노래] 공격 유형 주문이 추가로 주는 정신 피해가 40%까지 증가" },
      { level: 2, description: "[흘러가는 노래] 버프 유형 주문으로 증가하는 치명타율이 20%까지 증가" },
      { level: 3, description: "[마음의 찬가] 제공하는 피해 증가 효과가 20%까지 증가" },
      { level: 4, description: "[흘러가는 노래] 디버프 유형 주문으로 증가하는 방어 무시율이 30%까지 증가" },
      { level: 5, description: "[마음의 찬가] 제공하는 치명타율 증가 효과가 20%까지 증가" },
    ],
  },
  {
    character_id: 3092, // 이고르
    name: "이고르",
    passive: "language_10106055",
    skill1: "language_10106062",
    skill2: "language_10106066",
    ultimate: "language_10106070",
    portraits: [
      { level: 1, description: "language_10107099" },
      { level: 2, description: "language_10107100" },
      { level: 3, description: "language_10107101" },
      { level: 4, description: "language_10107102" },
      { level: 5, description: "language_10107103" },
    ],
  },
  {
    character_id: 3094, // J
    name: "J",
    passive: "용광로 속에서",
    skill1: null,
    skill2: "열처리",
    ultimate: "헤이트 스트리트 너머로",
    portraits: [
      { level: 1, description: "[열처리] [템퍼링]로 주는 현실 피해가 40%까지 증가, HP를 10% 잃을 때마다 주는 현실 피해 15%까지 증가" },
      { level: 2, description: "[용광로 속에서] 공격력 증가율이 자신의 [연소] 스택 수×1%로 적용" },
      { level: 3, description: "[용광로 속에서] 자신이 보유하는 [연소] 최대치 45스택까지 증가" },
      { level: 4, description: "[헤이트 스트리트 너머로] 주는 현실 피해가 450%로 증가, 초과하는 [연소] 1스택 당 추가로 주는 현실 피해 15%까지 증가" },
      { level: 5, description: "[용광로 속에서] 공격력 증가율이 자신의 [연소] 스택 수×1.5%로 적용" },
    ],
  },
  {
    character_id: 3095, // 머큐리아
    name: "머큐리아",
    passive: "오랜 발자취",
    skill1: null,
    skill2: "자아의 초점",
    ultimate: "밤을 위한 샛별",
    portraits: [
      { level: 1, description: "[오랜 발자취] 턴 종료 시마다 열정 획득 조건이 ‘해당 턴에 아군이 2단계 주문 2장 이상 사용’으로 변경" },
      { level: 2, description: "[오랜 발자취] 획득하는 치명타 피해, 마법 위력 버프 효과가 50%, 30%까지 증가" },
      { level: 3, description: "[오랜 발자취] [우주 에너지] 스택 수 최대치가 30스택까지 증가, 스택당 피해 증가 효과가 2.5%까지 증가" },
      { level: 4, description: "[밤을 위한 샛별] 주는 정신 피해가 475%까지 증가, [진급]의 지속 턴 +1" },
      { level: 5, description: "[오랜 발자취] [우주 에너지] 지속 턴 +1, 스택당 피해 증가 효과가 3%까지 증가" },
    ],
  },
  {
    character_id: 3096, // 파이오니어
    name: "파이오니어",
    passive: "떠돌이 판매원",
    skill1: "차별화 경쟁",
    skill2: "거래 성사 답례",
    ultimate: "창문짝 또는 다리",
    portraits: [
      { level: 1, description: "[차별화 경쟁] 주는 정신 피해가 230/350/570%까지 증가" },
      { level: 2, description: "[거래 성사 답례] 증가하는 현실 방어, 정신 방어가 30/35/40%까지 증가" },
      { level: 3, description: "[창문짝 또는 다리] 획득하는 보호막이 최대 HP×70%까지 증가" },
      { level: 4, description: "[떠돌이 판매원] [판매 방안]의 피해 보너스와 피해 감면 증가 효과가 25%로 증가" },
      { level: 5, description: "[떠돌이 판매원] [열정의 선택]의 치명타율과 치명타 피해 증가효과가 30%로 증가" },
    ],
  },
  {
    character_id: 3097, // 아르고스
    name: "아르고스",
    passive: "백안의 기적",
    skill1: null,
    skill2: "날카로운 눈빛",
    ultimate: "단서의 힘",
    portraits: [
      { level: 1, description: "[백안의 기적][그레이브 디거] 1/2/3단계 시 주는 현실 피해가 150%/250%/400%까지 증가" },
      { level: 2, description: "[날카로운 눈빛][꿰뚫어보기]의 기본 효과가 20%까지 증가, 스택당 추가로 약화되는 피해 감면과 치명타 방어가 2.5%까지 증가" },
      { level: 3, description: "[백안의 기적][그레이브 디거] 1/2/3단계 시 주는 현실 피해가 200%/350%/500%까지 증가" },
      { level: 4, description: "[날카로운 눈빛][꿰뚫어보기]의 기본 효과가 25%까지 증가, 스택당 추가로 약화되는 피해 감면과 치명타 방어가 3%까지 증가" },
      { level: 5, description: "[단서의 힘] 주는 현실 피해가 700%까지 증가" },
    ],
  },
  {
    character_id: 3098, // 튜즈데이
    name: "튜즈데이",
    passive: "당신을 위하여",
    skill1: "공포의 희열",
    skill2: "어머니의 품에서",
    ultimate: "들어오시죠",
    portraits: [
      { level: 1, description: "[들어오시죠] 부여하는 [중독]이 2개로 증가, 추가로 입히는 공격력×목표 [중독] 개수의 고정 피해가 50%까지 증가" },
      { level: 2, description: "[어머니의 품에서] 주문 1/2/3단계 시 받는 고정 피해 증가 효과 30%/40%/50%로 증가, 치명타 저항률 감소 효과 25%로 증가, 목표가 [중독] 상태가 될 경우 치명타 저항률 감소 효과 30%로 증가" },
      { level: 3, description: "[들어오시죠] 부여하는 [중독]이 3개로 증가, 추가로 입히는 공격력×목표 [중독] 개수의 고정 피해가 70%까지 증가" },
      { level: 4, description: "[당신을 위하여] 부여하는 자신의 고정 피해 증가 효과가 35%로 변경" },
      { level: 5, description: "[공포의 희열] 주문 1/2/3단계 시 주는 정신 피해가 210%/310%/535%까지 증가, 또다른 랜덤 적군 목표를 [중독]에 빠트리는 횟수가 3/4/5회로 증가" },
    ],
  },
  {
    character_id: 3099, // 바바라
    name: "바바라",
    passive: "무균 침실",
    skill1: "이루기 힘든 꿈",
    skill2: "잔디밭 대화",
    ultimate: "이쪽으로, 이쪽으로.",
    portraits: [
      { level: 1, description: "[이루기 힘든 꿈] 주는 정신 피해가 180%/270%/450%까지 증가" },
      { level: 2, description: "[잔디밭 대화] 획득하는 보호막이 140%/210%/350%까지 증가" },
      { level: 3, description: "[무균 침실]의 자기 회복이 25%까지 증가, 인접한 아군의 회복이 20%까지 증가" },
      { level: 4, description: "[무균 침실] 증가하는 피해 감면이 15%까지 증가" },
      { level: 5, description: "[이쪽으로, 이쪽으로.] 부여하는 [꿈의 방문] 상태의 지속 턴 +1" },
    ],
  },
  {
    character_id: 3100, // 안조 날라
    name: "안조 날라",
    passive: "계약의 선서",
    skill1: "욕망의 향연",
    skill2: "쌍둥이 유령",
    ultimate: "꿈의 끝자락으로",
    portraits: [
      { level: 1, description: "[계약의 선서] [형태와 그림자]의 턴당 최대 추격 횟수 3까지 증가, [천사의 초대]가 주는 정신 피해 250%까지 증가" },
      { level: 2, description: "[쌍둥이 유령] [천사의 초대] 음송 완료 시 주는 추가 정신 피해 375%로 증가, [유혹]이 감소시키는 공격 15%로 증가" },
      { level: 3, description: "[꿈의 끝자락으로] 주는 정신 피해 600%까지 증가, [상태 이상] 1종마다 추가로 주는 정신 피해 100%까지 증가\n[뼈와 피]가 발동하는 추가 열정 회복 2까지 증가" },
      { level: 4, description: "[계약의 선서] [영혼과 육신]이 주는 속성 보너스 8%까지 증가\n[뼈와 피]가 주는 속성 보너스 18%까지 증가\n[형태와 그림자]가 주는 속성 보너스 18%까지 증가\n[매혹]이 중첩되어 유혹으로 전환되는 스택이 2로 감소" },
      { level: 5, description: "[꿈의 끝자락으로] 부여하는 [디버프 집합]의 종류 4까지 증가, [상태 이상] 1종마다 추가로 주는 정신 피해 140%까지 증가" },
    ],
  },
  {
    character_id: 3101, // 화이트 럼
    name: "화이트 럼",
    passive: "사략 허가증",
    skill1: "좌현 발포",
    skill2: "탑승 준비",
    ultimate: "바다를 향해? 하늘을 향해!",
    portraits: [
      { level: 1, description: "[사략 허가증] 1칸 뒤로 이동 시 [격앙] 2스택 획득, 1칸 앞으로 이동 시 [견고] 2스택 획득" },
      { level: 2, description: "[바다를 향해? 하늘을 향해!] 1칸 전진 시마다 피해 25% 증가" },
      { level: 3, description: "[바다를 향해? 하늘을 향해!] 주는 현실 피해가 300%까지 증가" },
      { level: 4, description: "[바다를 향해? 하늘을 향해!] 3칸 이상 전진 시 이번 공격의 기절 내성 무시가 100%까지 증가" },
      { level: 5, description: "[좌현 발포] 주문 1/2/3단계 시 주는 현실 피해가 100/150/250%까지 증가" },
    ],
  },
  {
    character_id: 3102, // 로페라
    name: "로페라",
    passive: "잡학다식",
    skill1: "이중 카드",
    skill2: "승리의 칩",
    ultimate: "잡학 연금술",
    portraits: [
      { level: 1, description: "[잡학 연금술] [도가니 화약고] 치명타율이 50%까지 증가, 초과한 치명타율은 치명타 피해로 전환 시 기본 전환률 65%까지 증가" },
      { level: 2, description: "[승리의 칩] 부여한 [연소 탄환]이 6/10/15까지 증가, [급소 타격]의 치명타 피해 계수 15%까지 증가" },
      { level: 3, description: "[잡학 연금술] [도가니 화약고] 지속 턴 수가 4턴까지 증가" },
      { level: 4, description: "[승리의 칩] [불스 아이]이 주는 현실 피해가 250%까지 증가" },
      { level: 5, description: "[이중 카드]주는 현실 피해가 230/345/575%까지 증가, [마법 탄환] [술식 탄환]의 마법/술식 위력 35/35%까지 증가" },
    ],
  },
  {
    character_id: 3103, // 던컨
    name: "던컨",
    passive: "군인 정신",
    skill1: "치명적인 멜로디",
    skill2: "허름한 발명품",
    ultimate: "베테랑의 인사",
    portraits: [
      { level: 1, description: "[치명적인 멜로디] 주문 1/2/3단계 시 추가로 부여되는 고정 피해가 100/150/250%까지 증가" },
      { level: 2, description: "[베테랑의 인사] 자신이 보유한 [탄환] 1종류마다 제공하는 치명타율 20%까지 증가" },
      { level: 3, description: "[치명적인 멜로디] 주문 1/2/3단계 시 주는 현실 피해가 120/180/300%까지 증가" },
      { level: 4, description: "[허름한 발명품] [속사 반격]이 주는 현실 피해 300%까지 증가" },
      { level: 5, description: "[군인 정신] 적군 처치 후 모든 아군이 획득하는 [베테랑의 탄약통]의 탄환 수량 2까지 증가" },
    ],
  },
  {
    character_id: 3104, // 윌로우
    name: "윌로우",
    passive: "화려한 스텝",
    skill1: "마귀할멈의 충고",
    skill2: "마녀의 ‘감사’",
    ultimate: "불 속, 그림자 속",
    portraits: [
      { level: 1, description: "[마귀할멈의 충고]윌로우가 부여하는 모든 [독성 저주]의 고정 피해가 사용자 공격*24%까지 증가" },
      { level: 2, description: "[화려한 스텝]추가되는 모든 [중독]의 고정 피해가 사용자 공격*40%까지 증가. 윌로우가 부여하는 모든 [독성 저주]의 매회 결산 피해 증폭이 45%까지 증가" },
      { level: 3, description: "[마귀할멈의 충고]주문 1/2/3단계 시 전환 가능한 중독 개수가 4/5/6까지 증가" },
      { level: 4, description: "[화려한 스텝]다른 아군이 적군에게 직접 주문을 사용해 공격 시 윌로우가 해당 주 목표에게 부여하는 [중독] 개수가 3개까지 증가" },
      { level: 5, description: "[마귀할멈의 충고]윌로우가 부여하는 모든 [독성 저주]의 매회 결산 피해 증폭이 50%까지 증가" },
    ],
  },
  {
    character_id: 3105, // 플러터 페이지
    name: "플러터 페이지",
    passive: "\"날 수 있어\"",
    skill1: null,
    skill2: "목화 연",
    ultimate: "네버랜드의 꿈",
    portraits: [
      { level: 1, description: "[목화 연] 주문 1/2/3단계 시 주는 현실 피해가 150%/225%/375%까지 증가, [연속 행동Ⅰ] 지속 턴 수 2까지 증가" },
      { level: 2, description: "[\"날 수 있어\"] [종이 퍼레이드] [시트 웨이브] [대지와의 작별]이 공격에 부여하는 피해가 18%/18%까지 증가, 추가 행동에 부여하는 피해가 18%/18%까지 증가" },
      { level: 3, description: "[\"날 수 있어\"] 전투 진입 시 자신이 획득하는 열정이 3까지 증가, [풍속] 20스택까지 증가. [시트 웨이브] [대지와의 작별]이 [풍속] 스택당 부여하는 주는 피해 및 고정 피해가 2.5%까지 증가" },
      { level: 4, description: "[\"날 수 있어\"] [종이 퍼레이드] [시트 웨이브] [대지와의 작별]이 공격에 부여하는 피해가 23%/23%까지 증가, 추가 행동에 부여하는 피해가 23%/23%까지 증가" },
      { level: 5, description: "[네버랜드의 꿈] [백조의 인사]가 주는 현실 피해가 60%/60%까지 증가, [네버랜드의 꿈] 음송 종료 시 자신이 획득하는 열정이 2/3/4까지 증가" },
    ],
  },
  {
    character_id: 3106, // 슬라우치 햇
    name: "슬라우치 햇",
    passive: "머리에 쓰고 돌격",
    skill1: "계속 이동!",
    skill2: "말에 오르라!",
    ultimate: "갑시다! 친구!",
    portraits: [
      { level: 1, description: "[계속 이동!] 주문 1/2/3단계 시 주는 정신 피해가 140%/210%/350%까지 증가" },
      { level: 2, description: "[갑시다! 친구!] 주는 정신 피해가 350%까지 증가" },
      { level: 3, description: "[머리에 쓰고 돌격][말에 오르라!] 시전 시 목표의 [속성 감소] [상태 이상] [제어] 추가 해제 종류 수가 3가지까지 증가" },
      { level: 4, description: "[갑시다! 친구!] 주는 정신 피해가 400%까지 증가" },
      { level: 5, description: "[말에 오르라!][동승] 공격 계수가 8%까지 증가" },
    ],
  },
  {
    character_id: 3107, // 울리히
    name: "울리히",
    passive: "원시적 율동",
    skill1: "식별 모드",
    skill2: "브라운 노이즈",
    ultimate: "무한 연산의 총합",
    portraits: [
      { level: 1, description: "[원시적 율동] [빈도 분석] 중 [암호키] 1개당 술식 위력 추가 증가 효과가 5.5%로 변경, [구조 분석] 중 [암호키] 1개당 피해 감면 추가 약화 효과가 5.5%로 변경" },
      { level: 2, description: "[무한 연산의 총합] [하이퍼 분석] 음송 완료 시 모든 적군에게 주는 현실 피해 900%까지 증가" },
      { level: 3, description: "[원시적 율동] [전기장 폭주 Lv.3] 상태일 경우 [하이퍼 분석] 음송 완료 시 [암호키] 수량에 따라 주는 추가 현실 피해 175%로 증가" },
      { level: 4, description: "[원시적 율동] [피크 전위]가 [구조 분석] [빈도 분석] 중의 [암호키] 수량에 따라 주는 추가 현실 피해 25%로 증가" },
      { level: 5, description: "[무한 연산의 총합] [하이퍼 분석] 음송 완료 시 모든 적군에게 주는 현실 피해 1050%로 증가, 암호키 수량에 따라 주는 추가 현실 피해 175%로 증가" },
    ],
  },
  {
    character_id: 3108, // 바르카롤라
    name: "바르카롤라",
    passive: "1인 밴드",
    skill1: "아르페지오 연결",
    skill2: "마음의 음악",
    ultimate: "해풍 교향곡",
    portraits: [
      { level: 1, description: "[아르페지오 연결]의 해당 턴 [즉흥 주문] 공격 횟수 증가 효과가 2로 변경" },
      { level: 2, description: "[1인 밴드] [즉흥 주문] 1턴 동안 1회 공격 후마다, 치명타율 증가 효과가 15%로 변경, 치명타 피해 증가 효과가 15%로 변경" },
      { level: 3, description: "[아르페지오 연결] 아군 [사중주] 상태의 캐릭터가 3 이상일 시 [즉흥 주문] 공격 횟수 추가 증가 효과가 2로 변경" },
      { level: 4, description: "[마음의 음악]의 해당 턴 [즉흥 주문]이 주는 피해 증가 효과가 35%로 변경" },
      { level: 5, description: "[해풍 교향곡] [사중주] 공격 유형 주문 사용 후 [즉흥 주문]에 계시 1포인트 추가 계산" },
    ],
  },
  {
    character_id: 3109, // 파투투
    name: "파투투",
    passive: "조개껍데기 목걸이",
    skill1: "치명적 균열",
    skill2: "껍질 속 바다",
    ultimate: "바닷바람의 경고",
    portraits: [
      { level: 1, description: "[조개껍데기 목걸이] 전투 진입 시 추가로 획득하는 [영혼의 조개껍데기] 8스택으로 증가" },
      { level: 2, description: "[조개껍데기 목걸이] [영혼의 조개껍데기] 설치 또는 회수 시 [치명적 균열] 발동 횟수 5회로 감소" },
      { level: 3, description: "[치명적 균열] 주문1/2/3단계 시 주는 정신 피해가 180/270/450%로 증가, [영혼의 조개껍데기] 설치 스택 4로 증가, [영혼의 조개껍데기] 설치 시 열정 획득 확률 25%로 증가" },
      { level: 4, description: "[껍질 속 바다] 모든 아군이 획득하는 [운명을 공유하는 조개] 4/6/10스택으로 증가. [영혼의 조개껍데기] 회수의 치료 계수 40%로 증가" },
      { level: 5, description: "[조개껍데기 목걸이] [영혼의 조개껍데기]가 추가 행동 공격을 받을 시 이번 공격이 주는 피해 6%로 증가, 치명타 피해 6%로 증가" },
    ],
  },
  {
    character_id: 3110, // 양월
    name: "양월",
    passive: "방상의 계승자",
    skill1: "악귀 퇴치",
    skill2: "축복 흡수",
    ultimate: "천둥의 전화call-0305",
    portraits: [
      { level: 1, description: "[천둥의 전화call-0305] [강량 등장] 지속 턴 수 4로 증가, 주문 구역 강화 범위 4로 증가" },
      { level: 2, description: "[방상의 계승자] 전투 진입 시 자신의 열정 증가 5로 증가. [여덟 혼의 공포] 발동에 필요한 [선위]와 [안중] 수량 5로 감소" },
      { level: 3, description: "[천둥의 전화call-0305] [면역] 부여 턴 수 2로 증가, [구여] 부여 스택 12로 증가" },
      { level: 4, description: "[악귀 퇴치] 주문 1/2/3단계 시 주는 현실 피해 240/360/600%로 증가, 방어 무시율 0/40/100%로 증가. [구여] 스택 최대치 40으로 증가, 스택당 받는 피해 감소 1%로 증가" },
      { level: 5, description: "[방상의 계승자] [여덟 혼의 공포·범]이 주는 현실 피해 600%로 증가, [선위] 1개를 소모할 때마다 치명타 피해 30%로 증가\n[여덟 혼의 공포·그림자]가 주는 현실 피해 600%로 증가, 목표가 [중독] 1개를 보유할 때마다 주는 피해 20%로 증가.\n[여덟 혼의 공포·역병]이 주는 현실 피해 300%로 증가, [신행] 스택 최대치 3으로 증가, [신행] 스택당 [여덟 혼의 공포·역병]이 추가 부여하는 현실 피해 80%로 증가" },
    ],
  },
  {
    character_id: 3111, // 누아르
    name: "누아르",
    passive: "축소 촬영장",
    skill1: null,
    skill2: null,
    ultimate: "극적인 순간",
    portraits: [
      { level: 1, description: "[극적인 순간] [귀재의 영감] 1스택당의 술식 중복 시전 확률 10%까지 증가" },
      { level: 2, description: "[극적인 순간] 술식 중복 시전 시 소모하는 [귀재의 영감] 4스택으로 감소" },
      { level: 3, description: "[축소 촬영장] [귀재의 영감]의 스택 최대치가 12스택까지 증가" },
      { level: 4, description: "[극적인 순간] 목표가 보유한 [상태 이상] 1가지/스택당 정신 피해 120%/방어 무시율 4% 증가, 최대 정신 피해 600%/방어 무시율 40% 증가" },
      { level: 5, description: "[극적인 순간] 주는 정신 피해가 550%까지 증가" },
    ],
  },
  {
    character_id: 3112, // 로거헤드
    name: "로거헤드",
    passive: "보관실의 주인",
    skill1: "함께 보자!",
    skill2: "당신도 맛보라!",
    ultimate: "무차별 감상회",
    portraits: [
      { level: 1, description: "[무차별 감상회] 주는 정신 피해가 450%까지 증가" },
      { level: 2, description: "[함께 보자!] 주문 1/2/3단계 시 주는 정신 피해 220/260/450%로 증가" },
      { level: 3, description: "[보관실의 주인] [기억 회상] 상태인 모든 아군의 회복 HP가 최대 HPx1.7%로 증가" },
      { level: 4, description: "[함께 보자!] 주문 1/2/3단계 시 명중 후 목표에게 부여하는 [상태 이상 집합] 중의 효과 종류 수량 3/3/3으로 증가" },
      { level: 5, description: "[당신도 맛보라!] [기억 회상]이 제공하는 피해 감면 25%로 증가" },
    ],
  },
  {
    character_id: 3113, // 알레프
    name: "알레프",
    passive: "물음에 반드시 답하는 자문가",
    skill1: "권력의 규율",
    skill2: "이상의 선언",
    ultimate: "전지전능한 사상",
    portraits: [
      { level: 1, description: "[권력의 규율] [연속 행동Ⅰ]의 지속 턴 수 2까지 증가. 신기한 빛 회복 확률 50%까지 증가" },
      { level: 2, description: "[전지전능한 사상] 기억의 주문 수 3장으로 변경. [해석] 이후 스택당 정신 방어 및 피해 감면 감소 효과 3%까지 증가" },
      { level: 3, description: "[전지전능한 사상]의 [해석] 수에 따라 주는 추가 정신 피해 160%까지 증가. 음송 종료 시 [즉흥 주문] 공격 횟수 증가 효과 4로 변경" },
      { level: 4, description: "[이상의 선언] [답안]의 마법 위력 증가 효과 15%로 변경" },
      { level: 5, description: "[전지전능한 사상]의 [해석] 수에 따라 주는 추가 정신 피해 240%까지 증가. [해석] 이후 스택당 정신 방어 및 피해 감면 감소 효과 5%까지 증가" },
    ],
  },
  {
    character_id: 3114, // 레콜레타
    name: "레콜레타",
    passive: "자동 작문법",
    skill1: null,
    skill2: "단어의 표상",
    ultimate: "내장사실주의의 미로",
    portraits: [
      { level: 1, description: "[자동 작문법] 최종 술식 시전 시 획득하는 [사전준비·레콜레타] 스택 최대치 2까지 증가" },
      { level: 2, description: "[내장사실주의의 미로] [혼잣말]/[군상]을 소모해 추가로 주는 현실 피해 70/35%까지 증가" },
      { level: 3, description: "[내장사실주의의 미로] 주는 현실 피해 550/550%까지 증가" },
      { level: 4, description: "[단어의 표상] 주문 1/2/3단계 시 주는 현실 피해 150/225/375%까지 증가, 부여하는 [혼잣말]/[군상] 스택 10까지 증가" },
      { level: 5, description: "[내장사실주의의 미로] 주는 현실 피해 650/650%까지 증가, 추가로 열정 1 소모할 때마다 증가하는 술식 위력 6%까지 증가" },
    ],
  },
  {
    character_id: 3115, // 버디 페어차일드
    name: "버디 페어차일드",
    passive: "큰꼬리 중사",
    skill1: null,
    skill2: null,
    ultimate: "극지의 잣 선발대",
    portraits: [
      { level: 1, description: "[극지의 잣 선발대] [우정 배지]를 1스택 소모할 때마다 주는 추가 현실 피해 75%까지 증가" },
      { level: 2, description: "[극지의 잣 선발대] 주는 현실 피해가 400%까지 증가" },
      { level: 3, description: "[극지의 잣 선발대] 모든 아군의 피해 증가 효과가 45%로 증가" },
      { level: 4, description: "[극지의 잣 선발대] 주는 현실 피해가 500%까지 증가" },
      { level: 5, description: "[극지의 잣 선발대] [우정 배지]를 1스택 소모할 때마다 주는 추가 현실 피해 100%까지 증가" },
    ],
  },
  {
    character_id: 3116, // 히사베스
    name: "히사베스",
    passive: "문제의 뱀",
    skill1: null,
    skill2: "무한 재귀",
    ultimate: "0차원 폭발 실험",
    portraits: [
      { level: 1, description: "[문제의 뱀] 턴 시작 시 자신이 [뱀굴]을 1스택 이상 보유한 경우 [쉬익!] 1단계 1장을 생성하고 [뱀굴] 1스택 차감, 턴마다 최대 2회 발동으로 증가. [쉬익!]이 주는 정신 피해가 75%/150%/375%까지 증가" },
      { level: 2, description: "[문제의 뱀] 히사베스가 [석면 비늘] 상태의 적 공격 시 [경직]을 부여하고 추가로 열정 1포인트 회복, 턴마다 최대 2회까지 증가" },
      { level: 3, description: "[0차원 폭발 실험] 시전 후 해당 턴 종료 시 결산되는 [석면 비늘] 스택당 고정 피해가 100%까지 증가" },
      { level: 4, description: "[0차원 폭발 실험] 주는 정신 피해가 750%까지 증가" },
      { level: 5, description: "[0차원 폭발 실험] 시전 후 해당 턴 종료 시 결산되는 [석면 비늘] 스택당 고정 피해가 130%까지 증가" },
    ],
  },
  {
    character_id: 3117, // 키페리나
    name: "키페리나",
    passive: "여명의 아이",
    skill1: null,
    skill2: "주변 모든 것",
    ultimate: null,
    portraits: [
      { level: 1, description: "[여명의 아이] [오로라 관]이 1스택 이상일 경우 모든 아군의 피해 보너스 증가가 15%로 증가, 20스택 이상일 경우 이번 라운드 [즉흥 주문]의 초과 치명타율이 치명타 피해로 전환 시 전환율 75%로 증가" },
      { level: 2, description: "[주변 모든 것] 해당 보호막을 보유한 아군 캐릭터 600 보호막당 치명타율 2%, 피해 보너스 1.5% 증가" },
      { level: 3, description: "[주변 모든 것] 주문 1/2/3단계 시 아군에 주는 [보호막] 효과가 키페리나 공격×180%/270%/450%까지 증가 " },
      { level: 4, description: "[주변 모든 것] 직접 시전 시 추가 증가한 보호막 계수 70%/105%/175%로 증가" },
      { level: 5, description: "[여명의 아이] [오로라 관]이 1스택 이상일 경우 모든 아군의 피해 보너스 증가가 20%로 증가, 20스택 이상일 경우 이번 라운드 [즉흥 주문]의 초과 치명타율이 치명타 피해로 전환 시 전환율 100%로 증가" },
    ],
  },
  {
    character_id: 3118, // 네임데이
    name: "네임데이",
    passive: "영원한 기억",
    skill1: "언어 루프",
    skill2: "뜻하는 대로",
    ultimate: "눈 위에 새겨진",
    portraits: [
      { level: 1, description: "[언어 루프] 주문 1/2/3단계 시 주는 정신 피해가 160/240/360%까지 증가" },
      { level: 2, description: "[뜻하는 대로] 주문 1/2/3단계 시 획득한 피해 증가 및 피해 회복이 25/30/40%까지 증가" },
      { level: 3, description: "[영원한 기억] 자신의 전방에 인접한 아군의 획득 [예의]가 3까지 증가" },
      { level: 4, description: "[눈 위에 새겨진] 부여한 [이름] 지속 턴 수가 3턴까지 증가" },
      { level: 5, description: "[눈 위에 새겨진] 모든 아군의 최종 술식 피해 증가 효과가 65%로 변경" },
    ],
  },
  {
    character_id: 3120, // 노티카
    name: "노티카",
    passive: "신의 모방체",
    skill1: "고통의 배회",
    skill2: "상아 혹은 뿔의 문",
    ultimate: "신성한 요이크",
    portraits: [
      { level: 1, description: "[신의 모방체] 전투 진입 시 획득하는 [신혈]/[신혈 최대치] 16으로 증가. [온기]의 최대 HP 보너스 3%로 증가. [대지의 어머니 입] 시전 조건이 [신혈]이 6포인트 증가할 때마다 발동으로 감소" },
      { level: 2, description: "[신성한 요이크] [산 제물] 지속 시간 동안 [산 제물] 포인트의 획득 조건이 [신혈]을 ‘7포인트 소모할 때마다’로 감소. [산 제물] 포인트 획득 최대치 27로 증가. [천만 개의 상흔] 공격할 때마다 공격력을 대체하는 최대 HP 공격 비율이 ×27.5%로 증가. [산 제물] 포인트당 최대 HP 10%로 회복 수치 증가. [천만 개의 봄날] 공격 시 공격력을 대체하는 최대 HP 공격 비율이 ×50%로 증가, 최대 HP 회복 30%로 증가" },
      { level: 3, description: "[신의 모방체] [대지의 어머니 가호] 받는 치료 효과 +20%로 변경. HP를 10% 잃을 때마다 받는 치료 효과 +7.5%로 변경(최대치: 60%). [대지의 어머니 입] HP 상실 효과가 현재 HP×30%로 증가. 자신의 최대 HP로 공격력을 대체하는 추가 피해 계수가 25%로 증가" },
      { level: 4, description: "[상아 혹은 뿔의 문] <1> 주문이 1/2/3단계일 때 공격 시 공격력을 대체하는 최대 HP 공격 비율이 20/30/50%로 증가\n[상아 혹은 뿔의 문]<2> 주문이 1/2/3단계일 때 피해 감면 증가 효과가 20/25/40%로 변경, 지속 턴 4로 증가. [대지의 어머니 가호] 지속 턴 4로 증가" },
      { level: 5, description: "[신성한 요이크] [산 제물] 지속 시간 동안 [산 제물] 포인트의 획득 조건이 [신혈]을 ‘6포인트 소모할 때마다’로 감소. [산 제물] 포인트 획득 최대치가 30으로 증가. [천만 개의 상흔] 공격할 때마다 공격력을 대체하는 최대 HP 공격 비율이 ×35%로 증가" },
    ],
  },
  {
    character_id: 3121, // 몰디르
    name: "몰디르",
    passive: "‘가족’에게",
    skill1: "무너진 과거",
    skill2: "되찾은 내일",
    ultimate: "길을 찾은 귀로자",
    portraits: [
      { level: 1, description: "[무너진 과거] 주문 1/2/3단계 시 주는 현실 피해가 150/225/375%까지 증가, [연속 행동Ⅰ] 지속 턴 수 2까지 증가" },
      { level: 2, description: "[‘가족’에게] [전투 태세 구축] 최종 술식이 주는 피해 2.5% 증가, [무장 정비] 치명타율 40%까지 증가" },
      { level: 3, description: "[‘가족’에게] 반격 후 자신의 열정이 2까지 증가" },
      { level: 4, description: "[길을 찾은 귀로자] 주는 현실 피해가 500%까지 증가, 모든 아군이 획득하는 [예의: 치명타 피해] 스택 8까지 증가" },
      { level: 5, description: "[길을 찾은 귀로자] 직접 시전할 경우 모든 적군에게 주는 추가 현실 피해 600%까지 증가, [교리] 술식 위력 30%까지 증가" },
    ],
  },
  {
    character_id: 3122, // 알렉시오스
    name: "알렉시오스",
    passive: "피, 혹은 비명",
    skill1: "\"아레스보다 강하다.\"",
    skill2: "\"아폴로보다 뛰어나다!\"",
    ultimate: "공포에 타오르는 날",
    portraits: [
      { level: 1, description: "[\"아레스보다 강하다.\"] 주문 1/2/3단계 시 주는 현실 피해 240/360/600%까지 증가" },
      { level: 2, description: "[피, 혹은 비명]턴 시작 시 획득하는 아드레날린 2까지 증가" },
      { level: 3, description: "[\"아폴로보다 뛰어나다!\"] 주문 1/2/3단계 시 주는 현실 피해 150/225/375%까지 증가" },
      { level: 4, description: "[공포에 타오르는 날] [이수의 피]가 주는 추가 현실 피해가 100%까지 증가" },
      { level: 5, description: "[공포에 타오르는 날] 주는 현실 피해가 500%까지 증가" },
    ],
  },
  {
    character_id: 3123, // 에지오 아디토레
    name: "에지오 아디토레",
    passive: "암살자의 3가지 계율",
    skill1: "어둠 속을 걷는다",
    skill2: "빛을 섬긴다",
    ultimate: "믿음의 낙인",
    portraits: [
      { level: 1, description: "[암살자의 3가지 계율] [마스터 어쌔신] [암살] 시 공격 목표와의 치명타 기술 차이 100당 최종 피해 추가 상승 효과가 10%로 변경. [믿음의 낙인] 중 [신념의 화살] 혹은 [신념의 칼날]의 시전 가능 횟수 4로 증가" },
      { level: 2, description: "무기 효과 강화: [베네치아 파르치온 강화][콘도티에로 전쟁망치 강화][선장의 검 강화]" },
      { level: 3, description: "[암살자의 3가지 계율] [마스터 어쌔신] [암살] 시 공격 목표와의 치명타 기술 차이 100당 최종 피해 추가 상승 효과가 11%로 변경. [어둠 속을 걷는다] 주문 1/2/3단계 시 주는 현실 피해가 460/675/1125%까지 증가. [믿음의 낙인] 중 [신념의 화살], [신념의 칼날]의 현실 피해가 140%/140%까지 증가" },
      { level: 4, description: "[암살자의 3가지 계율] [마스터 어쌔신] [암살] 시 공격 목표와의 치명타 기술 차이 100당 최종 피해 추가 상승 효과가 12%로 변경. [빛을 섬긴다] [카운터 처치] 자신이 공격을 받으면 반격으로 주는 현실 피해가 600%까지 증가. 다른 아군만 공격을 받으면 반격으로 주는 현실 피해가 600%까지 증가 [믿음의 낙인] 중 [죽음은 몰인정하지 않다]의 현실 피해가 900%까지 증가" },
      { level: 5, description: "무기와 보조 무기 조합 효과 강화: [베네치아 파르치온 강화] [콘도티에로 전쟁망치 강화] [선장의 검 강화]" },
    ],
  },
  {
    character_id: 3124, // 카산드라
    name: "카산드라",
    passive: "독수리를 거느린 자의 직감",
    skill1: "아레스의 분노",
    skill2: "아르테미스의 강림",
    ultimate: "돌진 암살",
    portraits: [
      { level: 1, description: "[독수리를 거느린 자의 직감] 턴 시작 시 자신이 획득하는 아드레날린 2로 증가\n[아레스의 분노] 주문 1/2/3단계 시 주는 현실 피해 150/225/375%까지 증가\n[아르테미스의 강림] 주문 1/2/3단계 시 주는 현실 피해 240/360/600%까지 증가" },
      { level: 2, description: "[아르테미스의 길] [세 신의 인도] 스택당 치명타 피해 9.3% 증가. [암살] 캐릭터는 추가로 9.3% 증가\n[아레스의 길] [세 신의 인도] 스택당 피해 보너스 4.8% 증가. [암살] 캐릭터는 추가로 4.8% 증가\n[닉스의 길] [세 신의 인도] 스택당 공격 2.8% 증가, [암살] 캐릭터는 추가로 2.8% 증가" },
      { level: 3, description: "[스파르타 킥]이 주는 현실 피해 300%까지 증가\n[파멸의 비]가 주는 현실 피해 700%까지 증가\n[돌진 암살]이 주는 현실 피해 1250%까지 증가\n[돌진 암살·연속 타격]이 주는 현실 피해 1250%까지 증가" },
      { level: 4, description: "[아르테미스의 길] 치명타율 24% 증가, [암살] 캐릭터는 추가로 16% 증가\n[아레스의 길] 마법 위력 30% 증가. [암살] 캐릭터는 추가로 20% 증가\n[닉스의 길] 방어 무시율 42% 증가. [암살] 캐릭터는 추가로 28% 증가" },
      { level: 5, description: "[6번째 감각] 아군이 [암살] 발동 시 추가로 주는 피해 125% 증가\n[무기 대가]: [킥 상처], [화살 상처], [암살 상처] 배율 20% 증가\n[섀도우 어쌔신]: [암살] 시 카산드라와 공격 목표의 기술 차이 100당 이번 공격의 최종 피해 추가로 4% 증가" },
    ],
  },
  {
    character_id: 3125, // 루부스카
    name: "루부스카",
    passive: "즐거운 피리 연주자",
    skill1: "한밤중의 장난",
    skill2: "그림자 호위대",
    ultimate: "승리는 ‘루부스카 1세’의 것!",
    portraits: [
      { level: 1, description: "[승리는 ‘루부스카 1세’의 것!]의 [그림자 연회] 지속 턴 수 2까지 증가, [그림자 옷]의 합 초기화 획득 비율 35%까지 증가, [그림자 연회]가 제공하는 추가 [그림자 옷]으로 획득하는 치명타 피해/술식 위력 수익 증가가 정상 수익의 100%까지 증가." },
      { level: 2, description: "[즐거운 피리 연주자]의 [그림자 옷] 최대치가 루부스카 입장 시 최대 HP 18%까지 증가, 루부스카가 [그림자 친구]를 통해 잃은 HP의 [그림자 옷] 전환 비율 100%까지 증가" },
      { level: 3, description: "[한밤중의 장난] 주는 현실 피해가 180/270/450%까지 증가" },
      { level: 4, description: "[즐거운 피리 연주자](은)는 아군이 공격받은 후 루부스카가 회복하는 모든 아군의 HP를 자신의 최대 HPx16%까지 증가" },
      { level: 5, description: "[즐거운 피리 연주자](은)는 [그림자 친구]를 보유한 캐릭터의 치명타 피해/술식 위력을 1% 증가할 때마다 필요한 [그림자 옷] 100/200으로 감소" },
    ],
  },
  {
    character_id: 3126, // 센티널
    name: "센티널",
    passive: "햇빛 아래에서의 기도",
    skill1: "죗값",
    skill2: "밤의 파수꾼",
    ultimate: "동정의 침묵",
    portraits: [
      { level: 1, description: "[햇빛 아래에서의 기도] 모든 아군이 [공포의 탄환] 보유 시의 치명타율 보너스 40%까지 증가, 공격 시 최대 HP에 따른 피해 보너스 계수 0.3%까지 증가, [새로운 상처]로 획득하는 신혈 카운트 추가 비율 100%까지 증가" },
      { level: 2, description: "[밤의 파수꾼] 자신 및 전방에 인접한 아군이 획득하는 [공포의 탄환] 스택 9/12/18까지 증가, [참회하라] 턴 시작 시 획득하는 [감시] 스택 3까지 증가" },
      { level: 3, description: "[죗값] 주는 현실 피해 150/225/375%까지 증가, [참회하라] 발동 시의 추가 [응징] 계수 15%까지 증가" },
      { level: 4, description: "[동정의 침묵] 주는 현실 피해가 450%까지 증가" },
      { level: 5, description: "[햇빛 아래에서의 기도] 모든 아군이 [공포의 탄환] 보유 시의 치명타율 보너스 60%까지 증가, 공격 시 최대 HP에 따른 피해 보너스 계수 0.4%까지 증가, 치명타율이 치명타 피해로 전환하는 비율 100%까지 증가" },
    ],
  },
  {
    character_id: 3127, // 마샤
    name: "마샤",
    passive: "language_10105917",
    skill1: null,
    skill2: "language_10105911",
    ultimate: "language_10105915",
    portraits: [
      { level: 1, description: "language_10107094" },
      { level: 2, description: "language_10107095" },
      { level: 3, description: "language_10107096" },
      { level: 4, description: "language_10107097" },
      { level: 5, description: "language_10107098" },
    ],
  },
  {
    character_id: 3128, // 카론
    name: "카론",
    passive: "전율의 뇌파",
    skill1: "허무로부터",
    skill2: "죽은 자의 간언",
    ultimate: "양귀비가 만개할지라도",
    portraits: [
      { level: 1, description: "[죽은 자의 간언][진혼] [전율] 스택당 치명타율 추가로 7.5%까지 증가(최대 추가로 30% 증가), [전율] 4스택 초과 시의 치명타율 전환 100%까지 증가" },
      { level: 2, description: "[전율의 뇌파] 전투 진입 시 [전력] 획득 30스택까지 증가, [쇼크웨이브] 획득 90스택까지 증가, 열정 획득 3까지 증가" },
      { level: 3, description: "[양귀비가 만개할지라도][후회의 나날] 주는 정신 피해 400%까지 증가, 받는 술식 위력 영향 70%까지 증가" },
      { level: 4, description: "[허무로부터][죽음의 공포] [전율] 스택당 치명타 방어 추가로 7.5%까지 감소(최대 추가로 30% 감소), [전율] 4스택의 받는 피해 40%까지 증가" },
      { level: 5, description: "[양귀비가 만개할지라도][후회의 나날] [전율] 1스택당 추가로 주는 정신 피해 100%까지 증가, 추가로 받는 술식 위력 영향 12%까지 증가" },
    ],
  },
  {
    character_id: 3132, // 코르부스
    name: "코르부스",
    passive: "앞으로",
    skill1: "아크 연선",
    skill2: "장밋빛 균열",
    ultimate: "시간을 영원에 봉합",
    portraits: [
      { level: 1, description: "[시간을 영원에 봉합]의 주는 정신 피해가 1200%까지 증가, 목표에게 부여하는 [균열점] 스택 수 2까지 증가. [고온 용접]의 공격받을 시 정신 방어 감소 2%까지 증가, 총 감소 최대 100%까지 증가" },
      { level: 2, description: "[시간을 영원에 봉합]의 [폭력 봉합] 발동 횟수 2까지 증가" },
      { level: 3, description: "[장밋빛 균열]의 [폭력 봉합]이 주는 정신 피해 500%까지 증가, [전기장 폭주 Lv.2] [전기장 폭주 Lv.3] 상태일 경우 추가로 주는 정신 피해 300/700%까지 증가" },
      { level: 4, description: "[장밋빛 균열](이)가 [폭력 봉합]의 [전기장 폭주 Lv.2] 상태일 경우 [아크 라이트] 스택당 추가로 주는 정신 피해 8%까지 증가, [전기장 폭주 Lv.3] 상태일 경우 [아크 라이트] 또는 [진동 아크] 스택당 추가로 주는 정신 피해 8%까지 증가" },
      { level: 5, description: "[아크 연선] [장밋빛 균열](이)가 주문 1/2/3단계 시 자신이 획득하는 [아크 라이트] 스택 수 4/8/16까지 증가. [아크 라이트] 스택 최대치 80까지 증가. [진동 아크] 스택 최대치 320까지 증가" },
    ],
  },
  {
    character_id: 3134, // 베릴
    name: "베릴",
    passive: "다중 굴절",
    skill1: "결정체의 재앙",
    skill2: "예견된 모든 순간",
    ultimate: "반짝이는 밤",
    portraits: [
      { level: 1, description: "[다중 굴절] [정해진 액운] 시전에 필요한 누적 [여광] 125까지 감소" },
      { level: 2, description: "[다중 굴절] 선택 가능한 오버플로 총 개수가 3개로 증가. [빛무리] 최대 중첩 가능 한도 35스택까지 증가" },
      { level: 3, description: "[다중 굴절] 전투 진입 시 자신이 획득하는 열정 3으로 증가. [정해진 액운] [정해진 액운·블루 오버플로] 기본 정신 피해가 각각 125%, 125%까지 증가. 추가 정신 피해가 각각 150%, 150%까지 증가. [퍼플 오버플로]가 [여광] 1당 0.5%/0.5% 추가. [그린 오버플로]의 1/2/3단계 추가 정신 피해가 100/150/187.5%와 100/150/187.5%까지 증가." },
      { level: 4, description: "[결정체의 재앙] 주문 1/2/3단계 시 주는 정신 피해 300/450/750%까지 증가, 목표에게 부여하는 [빛무리] 스택 6/9/15로 증가. [예견된 모든 순간] 주문 1/2/3단계 시 자신이 획득하는 [예견] 스택 4/6/10으로 증가" },
      { level: 5, description: "[다중 굴절] 선택 가능한 오버플로 총 개수가 4개로 증가. 각 오버플로마다 최대 3개 선택 가능. [빛무리] 최대 중첩 가능 한도 40스택까지 증가" },
    ],
  },
  {
    character_id: 3135, // 브룸
    name: "브룸",
    passive: "영웅 요소",
    skill1: "왼손 조종",
    skill2: "진실의 숨결",
    ultimate: "떠밀려 얻은 영웅의 이름",
    portraits: [
      { level: 1, description: "[왼손 조종]\n[즉흥 여행] [결정체 압전]이 [풍경의 대가] / [종점 결산]이 주는 추가 정신 피해 120%/250%까지증가.\n[장거리 계획] 1/2/3단계 시 획득하는 [열전 효과] 15/20/25로 증가. [풍경의 대가] 정신 피해 240%까지 증가. [보석 차징]이 소모한 [열전 효과] 10스택당 [풍경의 대가]의 추가 정신 피해 120%까지. 한 번의 음송으로 소모 가능한 [열전 효과] 스택 80까지 증가. [풍경의 대가] 추가 공격 횟수 3회로 증가.\n[영웅 요소] [서지 증폭]: [전기장 폭주 Lv.3] 상태일 시 [풍경의 대가]가 추가로 입히는 정신 피해 480%까지 증가." },
      { level: 2, description: "[진실의 숨결] 1/2/3단계 시 획득하는 [열전 효과] 스택 15/20/25로 증가. [진실 단련]의 피해 보너스 30%로 상승, 정신 피해 유형 캐릭터의 추가 최종 술식 위력 50%로 상승" },
      { level: 3, description: "[영웅 요소] [종점 결산]으로 입히는 정신 피해 800%까지 증가, [열전 효과] 소모로 인한 추가 정신 피해 800%까지 증가" },
      { level: 4, description: "[영웅 요소] [종점 결산]으로 입히는 정신 피해 1200%까지 증가, 최종 술식 위력의 영향 계수 125%로 증가. [열전 효과] 소모량 10스택당 [종점 결산] 추가 정신 피해 250%까지 증가. [열전 효과] 소모로 인한 추가 정신 피해 1000%까지 증가" },
      { level: 5, description: "[진실의 숨결] [진실 단련]의 피해 보너스 40%까지 증가, 정신 피해 유형 캐릭터의 추가 최종 술식 위력 60%까지 증가" },
    ],
  },
  {
    character_id: 9998, // ???
    name: "???",
    passive: "진·원 펀치 마틸다 패시브1",
    skill1: "에어 키스",
    skill2: null,
    ultimate: null,
    portraits: [
      { level: 1, description: "" },
      { level: 2, description: "" },
      { level: 3, description: "" },
      { level: 4, description: "" },
      { level: 5, description: "" },
    ],
  },
];
