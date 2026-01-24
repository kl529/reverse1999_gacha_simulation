import posthog from 'posthog-js';

export const analytics = {
  // 퍼널 분석: 사용자 여정 추적
  funnel: {
    homeVisited: () => {
      posthog.capture('funnel_home_visited');
    },
    featureClicked: (featureName: string) => {
      posthog.capture('funnel_feature_clicked', {
        feature_name: featureName,
      });
    },
    featureUsed: (featureName: string, additionalData?: Record<string, unknown>) => {
      posthog.capture('funnel_feature_used', {
        feature_name: featureName,
        ...additionalData,
      });
    },
  },

  // 컨텐츠 인기도
  content: {
    characterViewed: (characterName: string, rarity: number) => {
      posthog.capture('content_character_viewed', {
        character_name: characterName,
        character_rarity: rarity,
      });
    },
    guideViewed: (guideType: string, guideTitle?: string) => {
      posthog.capture('content_guide_viewed', {
        guide_type: guideType,
        guide_title: guideTitle,
      });
    },
    skinViewed: (characterName: string, skinName: string) => {
      posthog.capture('content_skin_viewed', {
        character_name: characterName,
        skin_name: skinName,
      });
    },
  },

  // 사용자 행동
  userBehavior: {
    pwaInstalled: () => {
      posthog.capture('user_pwa_installed');
    },
    pwaPromptShown: () => {
      posthog.capture('user_pwa_prompt_shown');
    },
    themeToggled: (theme: 'light' | 'dark') => {
      posthog.capture('user_theme_toggled', {
        theme,
      });
    },
    sessionStart: () => {
      posthog.capture('user_session_start');
    },
    menuOpened: () => {
      posthog.capture('user_menu_opened');
    },
  },

  // 빙고 게임
  bingo: {
    gameStarted: () => {
      posthog.capture('bingo_game_started');
    },
    cellClicked: (row: number, col: number, characterName: string) => {
      posthog.capture('bingo_cell_clicked', {
        row,
        col,
        character_name: characterName,
        cell_position: `${row}-${col}`,
      });
    },
    bingoCompleted: (lineCount: number) => {
      posthog.capture('bingo_completed', {
        line_count: lineCount,
      });
    },
    gameReset: () => {
      posthog.capture('bingo_game_reset');
    },
  },

  // 가챠 시뮬레이터
  gacha: {
    started: (bannerType: string, pullCount: number) => {
      posthog.capture('gacha_started', {
        banner_type: bannerType,
        pull_count: pullCount,
      });
    },
    completed: (
      bannerType: string,
      pullCount: number,
      results: { sixStarCount: number; fiveStarCount: number }
    ) => {
      posthog.capture('gacha_completed', {
        banner_type: bannerType,
        pull_count: pullCount,
        six_star_count: results.sixStarCount,
        five_star_count: results.fiveStarCount,
      });
    },
    historyViewed: () => {
      posthog.capture('gacha_history_viewed');
    },
  },

  // 기타 유틸리티
  calculator: {
    used: (calculatorType: string, data?: Record<string, unknown>) => {
      posthog.capture('calculator_used', {
        calculator_type: calculatorType,
        ...data,
      });
    },
  },

  quiz: {
    started: () => {
      posthog.capture('quiz_started');
    },
    answered: (isCorrect: boolean, characterName: string) => {
      posthog.capture('quiz_answered', {
        is_correct: isCorrect,
        character_name: characterName,
      });
    },
    completed: (score: number, totalQuestions: number) => {
      posthog.capture('quiz_completed', {
        score,
        total_questions: totalQuestions,
        accuracy: (score / totalQuestions) * 100,
      });
    },
  },

  // 종합 퀴즈
  generalQuiz: {
    started: (quizSetId: string, quizSetName: string) => {
      posthog.capture('general_quiz_started', {
        quiz_set_id: quizSetId,
        quiz_set_name: quizSetName,
      });
    },
    completed: (quizSetId: string, score: number, totalQuestions: number, timeInSeconds: number) => {
      posthog.capture('general_quiz_completed', {
        quiz_set_id: quizSetId,
        score,
        total_questions: totalQuestions,
        accuracy: Math.round((score / totalQuestions) * 100),
        time_in_seconds: timeInSeconds,
      });
    },
    rankingRegistered: (quizSetId: string, score: number, totalQuestions: number, timeInSeconds: number) => {
      posthog.capture('general_quiz_ranking_registered', {
        quiz_set_id: quizSetId,
        score,
        total_questions: totalQuestions,
        accuracy: Math.round((score / totalQuestions) * 100),
        time_in_seconds: timeInSeconds,
      });
    },
  },

  // 문제 발견
  errors: {
    errorOccurred: (
      errorMessage: string,
      errorStack?: string,
      additionalInfo?: Record<string, unknown>
    ) => {
      posthog.capture('error_occurred', {
        error_message: errorMessage,
        error_stack: errorStack,
        page: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
        ...additionalInfo,
      });
    },
    networkError: (url: string, statusCode?: number) => {
      posthog.capture('network_error', {
        url,
        status_code: statusCode,
      });
    },
  },
};
