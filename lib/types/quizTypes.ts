// Quiz types

// 문제 유형
export type QuestionType = "multiple_choice" | "image_text_input" | "text_input" | "true_false";

// 퀴즈 세트 ID
export type QuizSetId = "quiz_set_1" | "quiz_set_2" | "quiz_set_3";

// 퀴즈 테마별 텍스트 설정
export interface QuizThemeTexts {
  // 설정 화면
  startButton: string;
  // 경고 화면
  warningTitle: string;
  warningCharacterName?: string;
  warningCharacterImage?: string;
  warningMessage: string;
  cancelButton: string;
  confirmButton: string;
  // 플레이 화면
  progressLabel: string;
  successLabel: string;
  timerWarning: string;
  nextButton: string;
  finishButton: string;
  // 결과 화면
  resultTitle: string;
  scoreUnit: string;
  retryButton: string;
  // 토스트 메시지
  correctToast: string;
  wrongToast: string;
  timeoutToast: string;
  failToast: string;
}

// 퀴즈 세트 정보
export interface QuizSetInfo {
  id: QuizSetId;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
  maxAttempts: number;
  timePerQuestion: number; // seconds
  theme?: string; // Optional theme property
  isLocked?: boolean; // Optional locked property
  themeTexts?: QuizThemeTexts; // 테마별 텍스트
  themeColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// 퀴즈 세트 시도 정보 (localStorage용)
export interface QuizSetAttemptInfo {
  quizSetId: QuizSetId;
  attempts: number;
  lastAttemptDate: string;
  bestScore?: number;
  bestTime?: number;
}

// 5지선다 문제
export interface MultipleChoiceQuestion {
  id: string;
  type: "multiple_choice";
  question: string;
  options: string[]; // 5개 선택지
  correctAnswer: number; // 정답 인덱스 (0-4)
  image?: string;
  explanation?: string; // 해설
}

// 이미지 + 텍스트 입력 문제
export interface ImageTextInputQuestion {
  id: string;
  type: "image_text_input";
  question: string;
  image: string;
  correctAnswers: string[]; // 복수 정답 허용 (띄어쓰기, 다른 표현 등)
  explanation?: string;
}

// 텍스트 입력 문제 (이미지 없음)
export interface TextInputQuestion {
  id: string;
  type: "text_input";
  question: string;
  hint?: string; // 힌트 (선택)
  correctAnswers: string[]; // 복수 정답 허용
  explanation?: string;
}

// OX 퀴즈 문제
export interface TrueFalseQuestion {
  id: string;
  type: "true_false";
  question: string;
  correctAnswer: boolean;
  image?: string;
  explanation?: string;
}

// 문제 통합 타입
export type Question =
  | MultipleChoiceQuestion
  | ImageTextInputQuestion
  | TextInputQuestion
  | TrueFalseQuestion;

// 사용자 답변
export interface UserAnswer {
  questionId: string;
  userAnswer: number | string | boolean | null; // 문제 유형에 따라 다름
  isCorrect: boolean;
  timeSpent: number; // ms
}

// 퀴즈 결과
export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  totalTime: number; // ms
  answers: UserAnswer[];
  completedAt: Date;
  quizSetId: QuizSetId; // 퀴즈 세트 ID
}

// 랭킹 엔트리
export interface RankingEntry {
  id?: string;
  nickname: string;
  score: number;
  totalQuestions: number;
  timeInSeconds: number;
  percentage: number; // 정답률
  quizSetId: QuizSetId; // 퀴즈 세트 ID
  createdAt: Date;
}

// 퀴즈 상태
export type QuizPhase = "setup" | "warning" | "playing" | "result";

// Type guards
export function isMultipleChoiceQuestion(q: Question): q is MultipleChoiceQuestion {
  return q.type === "multiple_choice";
}

export function isImageTextInputQuestion(q: Question): q is ImageTextInputQuestion {
  return q.type === "image_text_input";
}

export function isTextInputQuestion(q: Question): q is TextInputQuestion {
  return q.type === "text_input";
}

export function isTrueFalseQuestion(q: Question): q is TrueFalseQuestion {
  return q.type === "true_false";
}
