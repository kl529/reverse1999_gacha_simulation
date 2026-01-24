import {
  Question,
  MultipleChoiceQuestion,
  ImageTextInputQuestion,
  TextInputQuestion,
  QuizSetId,
  QuizSetInfo,
  QuizThemeTexts,
} from "@/lib/types/quizTypes";

// 멜라니아 금고털기 테마 텍스트
const melaniaThemeTexts: QuizThemeTexts = {
  // 설정 화면
  startButton: "잠입 준비",
  // 경고 화면
  warningTitle: "WARNING",
  warningCharacterName: "멜라니아",
  warningCharacterImage: "/characters/6stars/Melania.webp",
  warningMessage: "이 금고의 보안은 상당히 까다로워.",
  cancelButton: "철수",
  confirmButton: "잠입 개시",
  // 플레이 화면
  progressLabel: "LOCK",
  successLabel: "해제",
  timerWarning: "경보 시스템 가동 중...",
  nextButton: "다음 잠금장치",
  finishButton: "금고 확인",
  // 결과 화면
  resultTitle: "작전 결과",
  scoreUnit: "잠금장치 해제",
  retryButton: "다시 잠입",
  // 토스트 메시지
  correctToast: "잠금 해제!",
  wrongToast: "잘못된 비밀번호!",
  timeoutToast: "경보 발동! 시간 초과!",
  failToast: "경보 3회 발동! 강제 철수!",
};

// 기본 퀴즈 테마 텍스트
const defaultThemeTexts: QuizThemeTexts = {
  // 설정 화면
  startButton: "시작하기",
  // 경고 화면
  warningTitle: "안내",
  warningMessage: "퀴즈를 시작합니다. 준비되셨나요?",
  cancelButton: "취소",
  confirmButton: "시작",
  // 플레이 화면
  progressLabel: "문제",
  successLabel: "정답",
  timerWarning: "남은 시간",
  nextButton: "다음 문제",
  finishButton: "결과 확인",
  // 결과 화면
  resultTitle: "퀴즈 결과",
  scoreUnit: "정답률",
  retryButton: "다시 도전",
  // 토스트 메시지
  correctToast: "정답입니다!",
  wrongToast: "오답입니다!",
  timeoutToast: "시간 초과!",
  failToast: "퀴즈가 종료되었습니다.",
};

// 퀴즈 세트 정보
export const QUIZ_SETS: QuizSetInfo[] = [
  {
    id: "quiz_set_1",
    name: "멜라니아의 금고 털기",
    description: "20개의 지식 퀴즈로 보안 시스템을 뚫어라!",
    icon: "🔐",
    questionCount: 20,
    maxAttempts: 3,
    timePerQuestion: 10,
    theme: "melania",
    themeTexts: melaniaThemeTexts,
    themeColors: {
      primary: "purple",
      secondary: "gold",
      accent: "red",
    },
  },
  {
    id: "quiz_set_2",
    name: "준비중...",
    description: "새로운 퀴즈가 곧 추가됩니다.",
    icon: "🔒",
    questionCount: 0,
    maxAttempts: 0,
    timePerQuestion: 0,
    isLocked: true,
    themeTexts: defaultThemeTexts,
  },
  {
    id: "quiz_set_3",
    name: "준비중...",
    description: "새로운 퀴즈가 곧 추가됩니다.",
    icon: "🔒",
    questionCount: 0,
    maxAttempts: 0,
    timePerQuestion: 0,
    isLocked: true,
    themeTexts: defaultThemeTexts,
  },
];

// 테마 텍스트 가져오기 헬퍼 함수
export function getThemeTexts(quizSetId: QuizSetId): QuizThemeTexts {
  const quizSet = QUIZ_SETS.find((v) => v.id === quizSetId);
  return quizSet?.themeTexts || defaultThemeTexts;
}

// 첫번째 퀴즈 세트 문제 (20문제)
const quizSet1Questions: Question[] = [
  // 1. 알레프 스킨 이미지 주고 이름 맞추기 - 5지선다
  {
    id: "v1_001",
    type: "multiple_choice",
    question: "이 스킨의 이름은 무엇인가요?",
    image: "/quiz/set1/1.webp",
    options: ["클럽에서 만나", "맹세와 가치", "낙원의 소리", "표상의 만찬", "악몽과 밤"],
    correctAnswer: 3,
    explanation: "알레프의 3.1버젼 스킨입니다.",
  } as MultipleChoiceQuestion,

  // 2. 지능 메아리 보스 이미지 주고 이름 맞추기 - 입력
  {
    id: "v1_002",
    type: "image_text_input",
    question: "이 메아리 보스의 이름은?",
    image: "/quiz/set1/2.webp",
    correctAnswers: ["새 시대 선언자"],
    explanation: "지능 영감의 메아리 보스입니다.",
  } as ImageTextInputQuestion,

  // 3. 1.1 부터 세번째로 나온 암석 캐릭터 고르기 - 5지선다
  {
    id: "v1_003",
    type: "multiple_choice",
    question: "1.1 버전부터 세 번째로 출시된 6성 암석 캐릭터는?",
    options: ["제멜바이스", "갈라보나", "곡랑", "갈천", "뉴바벨"],
    correctAnswer: 2,
    explanation: "1.1 버전 이후 6성 암석 캐릭터 출시 순서 : 피클즈-갈라보나-곡랑",
  } as MultipleChoiceQuestion,

  // 4. 호프만 매듭 이미지 주고 이름 맞추기 - 입력
  {
    id: "v1_004",
    type: "image_text_input",
    question: "이 아이템의 이름은?",
    image: "/quiz/set1/4.webp",
    correctAnswers: ["호프만 매듭", "호프만매듭"],
    explanation: "1.9에서 이니그마가 그녀의 희생을 잊지 않기 위해 지은 이름입니다.",
  } as ImageTextInputQuestion,

  // 5. 버틴이 나오지 않는 스토리 버전은? - 5지선다 ㅁㄴㅇㅎㄴㅇ
  {
    id: "v1_005",
    type: "multiple_choice",
    question: "버틴이 스토리에서 등장하지 않는 버전은?",
    options: ["1.4", "2.8", "2.2", "3.0", "모두 나옴"],
    correctAnswer: 4,
    explanation: "위 목록의 모든 버젼에 버틴이 등장합니다.",
  } as MultipleChoiceQuestion,

  // 6. 메인 스토리가 아닌 이벤트 스토리가 아닌 버전은? - 5지선다
  {
    id: "v1_006",
    type: "multiple_choice",
    question: "메인 스토리가 아닌 이벤트 스토리인 버전은?",
    options: ["1.9", "2.6", "2.4", "1.7", "2.8"],
    correctAnswer: 2,
    explanation: "2.4는 지구에서의 마지막 밤으로 이벤트 스토리입니다.",
  } as MultipleChoiceQuestion,

  // 7. 이졸데 버전 이미지 주고 몇 버전인지 맞추기 - 입력
  {
    id: "v1_007",
    type: "image_text_input",
    question: "해당 배너가 처음등장한 버젼은?",
    image: "/quiz/set1/7.webp",
    correctAnswers: ["1.4", "1.4버전"],
    explanation: "37 픽업은 1.4 버전에서 처음 등장했습니다.",
  } as ImageTextInputQuestion,

  // 8. 스토리 장 이름 주고 몇 버전인지 맞추기 - 입력
  {
    id: "v1_008",
    type: "text_input",
    question: "'울루루 연대기: 런던의 여명' 스토리는 몇 버전인가요?",
    correctAnswers: ["2.3", "2.3버전"],
    explanation: "해당 스토리는 2.3 버전에서 진행됩니다.",
  } as TextInputQuestion,

  // 9. 파투투가 나온 버전 이름 맞추기 - 입력
  {
    id: "v1_009",
    type: "text_input",
    question: "파이오니어가 상시 픽업라인에 편입된 버젼은?",
    correctAnswers: ["2.0", "2.0버전"],
    explanation: "파이오니어는 2.0버젼 출시 된 후 바로 상시 픽업라인에 편입됐습니다.",
  } as TextInputQuestion,

  // 10. 뽑기에서 얻을 수 있는 캐릭터 - 5지선다
  {
    id: "v1_010",
    type: "multiple_choice",
    question: "다음 중 상시 픽업 뽑기에서 얻을 수 있는 캐릭터는?",
    options: ["루시", "마틸다", "화이트 럼", "버디 페어차일드", "슬라우치 햇"],
    correctAnswer: 4,
    explanation: "슬라우치 햇만 상시 픽업라인에 있습니다.",
  } as MultipleChoiceQuestion,

  // 11. 6성 중복 획득 시 고음카운터 갯수 - 입력
  {
    id: "v1_011",
    type: "text_input",
    question:
      "이미 보유 중인 6성 캐릭터를 뽑기에서 중복 획득하면 받는 고음카운터 개수는? (풀형이 아닐때)",
    correctAnswers: ["12", "12개"],
    explanation: "6성 캐릭터 중복 시 12개의 고음카운터를 받습니다.",
  } as TextInputQuestion,

  // 12. 갈라보나 우디모 주고 누구인지 맞추기 - 입력
  {
    id: "v1_012",
    type: "image_text_input",
    question: "이 우디모의 캐릭터 이름은 무엇인가요?",
    image: "/quiz/set1/12.webp",
    correctAnswers: ["아브구스트"],
    explanation: "5성 아브구스트의 우디모입니다.",
  } as ImageTextInputQuestion,

  // 13. 처음 광상 시스템이 나온 버전 - 5지선다
  {
    id: "v1_013",
    type: "multiple_choice",
    question: "광상 시스템이 처음 도입된 버전은?",
    options: ["2.1", "2.3", "2.4", "2.5", "2.6"],
    correctAnswer: 1,
    explanation: "광상 시스템은 2.3 버전에서 처음 도입되었습니다.",
  } as MultipleChoiceQuestion,

  // 14. 픽포커스가 있던 마지막 버전 - 5지선다
  {
    id: "v1_014",
    type: "multiple_choice",
    question: "픽포커스 시스템이 있던 마지막 버전은?",
    options: ["1.9", "2.0", "2.1", "2.2", "2.3"],
    correctAnswer: 3,
    explanation: "2.1, 2.2 버전이 픽포커스가 있던 버전입니다.",
  } as MultipleChoiceQuestion,

  // 15. 의지 이름 맞추기 - 5지선다
  {
    id: "v1_015",
    type: "image_text_input",
    question: "이 의지의 이름은?",
    image: "/quiz/set1/15.webp",
    correctAnswers: ["샘물처럼 천천히", "샘물처럼천천히"],
    explanation: "2.0 버젼에 나온 6성 의지입니다.",
  } as ImageTextInputQuestion,

  // 16. 갈라보나 운동 스킨 가격 현금/빗방울 - 5지선다
  {
    id: "v1_016",
    type: "multiple_choice",
    question: "갈라보나의 '준비, 도약, 착지' 스킨의 가격은? (현금/빗방울)",
    options: [
      "12,000원 / 880",
      "12,000원 / 1080",
      "12,000원 / 1200",
      "14,000원 / 880",
      "14,000원 / 1080",
    ],
    correctAnswer: 4,
    explanation: "해당 스킨은 14,000₩ / 1,080빗방울에 팔렸습니다.",
  } as MultipleChoiceQuestion,

  // 17. 마법 위력 관련 버프를 주지 않는 캐릭터는 - 5지선다
  {
    id: "v1_017",
    type: "multiple_choice",
    question: "다음 중 마법 위력 관련 버프를 제공하지 않는 캐릭터는? (노광상 기준)",
    options: ["로페라", "머큐리아", "이졸데", "빌라", "6"],
    correctAnswer: 3,
    explanation: "빌라는 마법 위력 버프를 제공하지 않습니다.",
  } as MultipleChoiceQuestion,

  // 18. 공명 변조 주고 이름 맞추기 - 5지선다
  {
    id: "v1_018",
    type: "multiple_choice",
    question: "이 공명 변조의 이름은?",
    image: "/quiz/set1/18.webp",
    options: ["불시의 의아함", "희망", "제한 없는 상상", "순식간의 광증", "격려"],
    correctAnswer: 0,
    explanation: "해당 공명 변조는 공격형의 '불시의 의아함'입니다.",
  } as MultipleChoiceQuestion,

  // 19. 배너 이름 보고 픽업 캐릭터 맞추기 - 입력
  {
    id: "v1_019",
    type: "text_input",
    question: "'허영의 실제 모습'이라는 배너 이름에 해당하는 픽업 캐릭터는?",
    correctAnswers: ["카카니아"],
    explanation: "해당 배너의 픽업 캐릭터는 카카니아입니다.",
  } as TextInputQuestion,

  // 20. 재료 이미지 주고 이름 맞추기 - 입력
  {
    id: "v1_020",
    type: "image_text_input",
    question: "이 재료의 이름은?",
    image: "/quiz/set1/20.webp",
    correctAnswers: ["미치광이 헛소리"],
    explanation: "5성 재료의 '미치광이 헛소리'입니다.",
  } as ImageTextInputQuestion,
];

// 두번째 퀴즈 세트 문제 (심화)
const quizSet2Questions: Question[] = [
  // 5지선다
  {
    id: "v2_mc_001",
    type: "multiple_choice",
    question: "다음 중 6성 캐릭터가 아닌 것은?",
    options: ["레굴루스", "리리아", "소더비", "에테르나", "마르쿠스"],
    correctAnswer: 4,
    explanation: "마르쿠스는 5성 캐릭터입니다.",
  } as MultipleChoiceQuestion,
  {
    id: "v2_mc_002",
    type: "multiple_choice",
    question: "다음 중 천체(Star) 속성 캐릭터가 아닌 것은?",
    options: ["세넬", "레굴루스", "소더비", "피클즈", "케이크"],
    correctAnswer: 3,
    explanation: "피클즈는 지능(Intellect) 속성 캐릭터입니다.",
  } as MultipleChoiceQuestion,
  {
    id: "v2_mc_003",
    type: "multiple_choice",
    question: "다음 중 '감정 행동(Ultimate)'을 사용하기 위해 필요한 자원은?",
    options: ["마나", "에너지", "모시", "감정", "영감"],
    correctAnswer: 3,
    explanation: "감정 행동은 감정(Emotion) 자원을 소모하여 사용합니다.",
  } as MultipleChoiceQuestion,
  // 이미지 퀴즈
  {
    id: "v2_it_001",
    type: "image_text_input",
    question: "이 캐릭터의 이름은?",
    image: "/characters/6stars/37.webp",
    correctAnswers: ["37", "서티세븐", "써티세븐"],
    explanation: "37은 6성 지능 속성의 딜러 캐릭터입니다.",
  } as ImageTextInputQuestion,
  {
    id: "v2_it_002",
    type: "image_text_input",
    question: "이 캐릭터의 이름은?",
    image: "/characters/6stars/Melania.webp",
    correctAnswers: ["멜라니아", "Melania"],
    explanation: "멜라니아는 6성 영혼 속성의 딜러 캐릭터입니다.",
  } as ImageTextInputQuestion,
  // 주관식
  {
    id: "v2_ti_001",
    type: "text_input",
    question: "리버스 1999의 개발사 이름은?",
    correctAnswers: ["Bluepoch", "블루포크", "블루포치"],
    explanation: "리버스 1999는 중국의 Bluepoch에서 개발했습니다.",
  } as TextInputQuestion,
  {
    id: "v2_ti_002",
    type: "text_input",
    question: "베리타스가 소속된 재단의 이름은?",
    correctAnswers: ["세인트 파블로니아", "St. Pavlov", "파블로니아", "세인트파블로니아"],
    explanation: "베리타스는 세인트 파블로니아 재단의 타임키퍼입니다.",
  } as TextInputQuestion,
  // OX 퀴즈 (TrueFalse 제거 - 사용하지 않으므로)
  {
    id: "v2_mc_004",
    type: "multiple_choice",
    question: "의지(Psycube)는 모든 캐릭터가 공유하여 사용할 수 있다. 맞으면 O, 틀리면 X",
    options: ["O", "X"],
    correctAnswer: 1,
    explanation: "의지는 한 번에 한 캐릭터만 장착할 수 있습니다.",
  } as MultipleChoiceQuestion,
  {
    id: "v2_mc_005",
    type: "multiple_choice",
    question: "게임 내 모든 속성은 상성 관계가 있다. 맞으면 O, 틀리면 X",
    options: ["O", "X"],
    correctAnswer: 1,
    explanation: "리버스 1999에는 속성 상성이 존재하지 않습니다.",
  } as MultipleChoiceQuestion,
  {
    id: "v2_mc_006",
    type: "multiple_choice",
    question: "공명(Resonance)은 같은 캐릭터의 복제본으로만 올릴 수 있다. 맞으면 O, 틀리면 X",
    options: ["O", "X"],
    correctAnswer: 1,
    explanation: "공명은 같은 캐릭터 복제본 또는 범용 공명 아이템으로 올릴 수 있습니다.",
  } as MultipleChoiceQuestion,
];

// 퀴즈 세트별 문제 매핑
const quizSetQuestionsMap: Record<QuizSetId, Question[]> = {
  quiz_set_1: quizSet1Questions,
  quiz_set_2: quizSet2Questions,
  quiz_set_3: [],
};

// 모든 문제 통합
export const ALL_QUESTIONS: Question[] = [...quizSet1Questions, ...quizSet2Questions];

// 퀴즈 세트 정보 가져오기
export function getQuizSetInfo(quizSetId: QuizSetId): QuizSetInfo | undefined {
  return QUIZ_SETS.find((v) => v.id === quizSetId);
}

// 퀴즈 세트별 문제 가져오기
export function getQuestionsByQuizSet(quizSetId: QuizSetId): Question[] {
  return [...(quizSetQuestionsMap[quizSetId] || [])];
}

// 랜덤 셔플 함수
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 퀴즈 세트별 랜덤 문제 가져오기
export function getRandomQuestionsByQuizSet(quizSetId: QuizSetId): Question[] {
  const questions = getQuestionsByQuizSet(quizSetId);
  const quizSetInfo = getQuizSetInfo(quizSetId);
  const count = quizSetInfo?.questionCount || questions.length;
  return shuffleArray(questions).slice(0, count);
}

// localStorage 키
const QUIZ_SET_ATTEMPTS_KEY = "quiz_set_attempts";

// 퀴즈 세트 시도 정보 가져오기
export function getQuizSetAttempts(): Record<QuizSetId, number> {
  if (typeof window === "undefined") return { quiz_set_1: 0, quiz_set_2: 0, quiz_set_3: 0 };

  try {
    const stored = localStorage.getItem(QUIZ_SET_ATTEMPTS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse quiz set attempts:", e);
  }
  return { quiz_set_1: 0, quiz_set_2: 0, quiz_set_3: 0 };
}

// 퀴즈 세트 시도 횟수 증가
export function incrementQuizSetAttempt(quizSetId: QuizSetId): number {
  if (typeof window === "undefined") return 0;

  const attempts = getQuizSetAttempts();
  attempts[quizSetId] = (attempts[quizSetId] || 0) + 1;
  localStorage.setItem(QUIZ_SET_ATTEMPTS_KEY, JSON.stringify(attempts));
  return attempts[quizSetId];
}

// 퀴즈 세트 시도 가능 여부 확인
export function canAttemptQuizSet(quizSetId: QuizSetId): boolean {
  const quizSetInfo = getQuizSetInfo(quizSetId);
  if (!quizSetInfo) return false;

  const attempts = getQuizSetAttempts();
  return (attempts[quizSetId] || 0) < quizSetInfo.maxAttempts;
}

// 남은 시도 횟수 가져오기
export function getRemainingAttempts(quizSetId: QuizSetId): number {
  const quizSetInfo = getQuizSetInfo(quizSetId);
  if (!quizSetInfo) return 0;

  const attempts = getQuizSetAttempts();
  return Math.max(0, quizSetInfo.maxAttempts - (attempts[quizSetId] || 0));
}

// 기존 호환성을 위한 함수들 (deprecated)
export function getRandomQuestions(count: number): Question[] {
  const shuffled = shuffleArray(ALL_QUESTIONS);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
