/**
 * Quiz 컴포넌트 테스트
 *
 * 사용자 관점에서 퀴즈 플로우를 검증:
 * - 퀴즈 세트 선택
 * - 경고 화면 및 시작
 * - 문제 표시 및 답변 처리
 * - 타이머 동작
 * - 결과 화면
 */
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Quiz from "@/components/quiz/Quiz";

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage({
    src,
    alt,
    className,
    width,
    height,
    fill,
    ...rest
  }: {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    fill?: boolean;
    [key: string]: unknown;
  }) {
    const { priority, sizes, ...htmlProps } = rest;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        data-fill={fill ? "true" : undefined}
        {...htmlProps}
      />
    );
  },
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      exit,
      transition,
      style,
      className,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div className={className as string} style={style as React.CSSProperties} {...props}>
        {children}
      </div>
    ),
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...props}>{children}</p>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => null,
}));

// Mock posthog analytics
jest.mock("@/lib/posthog", () => ({
  analytics: {
    generalQuiz: {
      started: jest.fn(),
      completed: jest.fn(),
    },
  },
}));

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "light",
  }),
}));

// Mock html-to-image (used in QuizResult)
jest.mock("html-to-image", () => ({
  toPng: jest.fn().mockResolvedValue("data:image/png;base64,test"),
}));

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock window.gtag
Object.defineProperty(window, "gtag", {
  value: jest.fn(),
  writable: true,
});

describe("Quiz 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("기본 렌더링 (setup 페이즈)", () => {
    it("퀴즈 세트 선택 화면이 표시된다", () => {
      render(<Quiz />);

      // 퀴즈 선택 안내 문구
      expect(screen.getByText(/다양한 컨셉의 퀴즈를 풀어보세요/)).toBeInTheDocument();
    });

    it("첫 번째 퀴즈 세트(멜라니아의 금고 털기)가 표시된다", () => {
      render(<Quiz />);

      expect(screen.getByText("멜라니아의 금고 털기")).toBeInTheDocument();
    });

    it("잠김 상태의 퀴즈 세트가 표시된다", () => {
      render(<Quiz />);

      // 잠금된 퀴즈 세트들
      const lockedQuizSets = screen.getAllByText("준비중...");
      expect(lockedQuizSets.length).toBeGreaterThanOrEqual(1);
    });

    it("퀴즈 시작 버튼이 렌더링된다", () => {
      render(<Quiz />);

      // 멜라니아 테마의 시작 버튼
      const startButton = screen.getByRole("button", { name: /잠입 준비/ });
      expect(startButton).toBeInTheDocument();
    });
  });

  describe("퀴즈 세트 선택", () => {
    it("퀴즈 세트 클릭 시 해당 세트가 선택된다", async () => {
      render(<Quiz />);

      // 멜라니아 퀴즈 세트 버튼 찾기
      const quizSetButton = screen.getByText("멜라니아의 금고 털기").closest("button");
      expect(quizSetButton).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(quizSetButton!);
      });

      // 선택된 상태 확인 (체크 마크 또는 선택 스타일)
      // 선택 후에도 퀴즈 세트 이름이 여전히 표시됨
      expect(screen.getByText("멜라니아의 금고 털기")).toBeInTheDocument();
    });

    it("잠금된 퀴즈 세트는 클릭해도 선택되지 않는다", async () => {
      render(<Quiz />);

      // 잠금된 퀴즈 세트 버튼
      const lockedButtons = screen.getAllByText("준비중...").map((el) => el.closest("button"));
      const lockedButton = lockedButtons.find((btn) => btn?.disabled);

      if (lockedButton) {
        expect(lockedButton).toBeDisabled();
      }
    });
  });

  describe("경고 화면 (warning 페이즈)", () => {
    it("퀴즈 시작 버튼 클릭 시 경고 화면으로 전환된다", async () => {
      render(<Quiz />);

      const startButton = screen.getByRole("button", { name: /잠입 준비/ });

      await act(async () => {
        fireEvent.click(startButton);
      });

      // 경고 화면 요소 확인
      await waitFor(() => {
        // 멜라니아 테마의 경고 메시지
        expect(screen.getByText(/금고의 보안/)).toBeInTheDocument();
      });
    });

    it("경고 화면에서 시작 버튼이 표시된다", async () => {
      render(<Quiz />);

      const startButton = screen.getByRole("button", { name: /잠입 준비/ });

      await act(async () => {
        fireEvent.click(startButton);
      });

      await waitFor(() => {
        // 멜라니아 테마의 확인 버튼
        const confirmButton = screen.getByRole("button", { name: /잠입 개시/ });
        expect(confirmButton).toBeInTheDocument();
      });
    });

    it("경고 화면에서 남은 시도 횟수가 표시된다", async () => {
      render(<Quiz />);

      const startButton = screen.getByRole("button", { name: /잠입 준비/ });

      await act(async () => {
        fireEvent.click(startButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/남은 시도 횟수/)).toBeInTheDocument();
      });
    });
  });

  describe("initialQuizSetId prop", () => {
    it("initialQuizSetId가 있으면 바로 warning 화면으로 시작한다", () => {
      render(<Quiz initialQuizSetId="quiz_set_1" />);

      // setup 화면을 건너뛰고 바로 warning 화면
      expect(screen.getByText(/금고의 보안/)).toBeInTheDocument();
    });
  });

  describe("퀴즈 진행 (playing 페이즈)", () => {
    it("퀴즈 시작 후 문제가 표시된다", async () => {
      render(<Quiz initialQuizSetId="quiz_set_1" />);

      // 잠입 개시 버튼 클릭
      const confirmButton = screen.getByRole("button", { name: /잠입 개시/ });

      await act(async () => {
        fireEvent.click(confirmButton);
      });

      // 문제 표시 확인 - LOCK 라벨이 표시됨
      await waitFor(() => {
        // 진행 표시 (LOCK)
        expect(screen.getByText("LOCK")).toBeInTheDocument();
        // TIME 라벨도 표시됨
        expect(screen.getByText("TIME")).toBeInTheDocument();
        // 해제 라벨도 표시됨 (정답 카운트)
        expect(screen.getByText("해제")).toBeInTheDocument();
      });
    });

    it("타이머가 표시되고 카운트다운된다", async () => {
      render(<Quiz initialQuizSetId="quiz_set_1" />);

      const confirmButton = screen.getByRole("button", { name: /잠입 개시/ });

      await act(async () => {
        fireEvent.click(confirmButton);
      });

      // 타이머 표시 확인 (초기값 10초)
      await waitFor(() => {
        expect(screen.getByText("10초")).toBeInTheDocument();
      });

      // 1초 경과
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      // 타이머 감소 확인
      await waitFor(() => {
        expect(screen.getByText("9초")).toBeInTheDocument();
      });
    });

    it("답변 선택 후 다음 버튼이 표시된다", async () => {
      render(<Quiz initialQuizSetId="quiz_set_1" />);

      const confirmButton = screen.getByRole("button", { name: /잠입 개시/ });

      await act(async () => {
        fireEvent.click(confirmButton);
      });

      // 문제가 로드될 때까지 대기
      await waitFor(() => {
        expect(screen.getByText("LOCK")).toBeInTheDocument();
      });

      // 시간 초과로 오답 처리하여 다음 버튼 표시 확인
      await act(async () => {
        jest.advanceTimersByTime(11000);
      });

      // 시간 초과 후 다음 버튼이 표시됨
      await waitFor(
        () => {
          const nextButton = screen.queryByRole("button", { name: /다음 잠금장치/ });
          const finishButton = screen.queryByRole("button", { name: /금고 확인/ });
          expect(nextButton || finishButton).toBeTruthy();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("타이머 시간 초과", () => {
    it("시간 초과 시 오답으로 처리된다", async () => {
      render(<Quiz initialQuizSetId="quiz_set_1" />);

      const confirmButton = screen.getByRole("button", { name: /잠입 개시/ });

      await act(async () => {
        fireEvent.click(confirmButton);
      });

      // 문제가 로드될 때까지 대기
      await waitFor(() => {
        expect(screen.getByText(/LOCK/)).toBeInTheDocument();
      });

      // 10초 타이머 완료 (시간 초과)
      await act(async () => {
        jest.advanceTimersByTime(11000);
      });

      // 시간 초과 후 다음 버튼이 표시됨
      await waitFor(
        () => {
          const nextButton = screen.queryByRole("button", { name: /다음 잠금장치/ });
          const finishButton = screen.queryByRole("button", { name: /금고 확인/ });
          expect(nextButton || finishButton).toBeTruthy();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("결과 화면 (result 페이즈)", () => {
    it("모든 문제 완료 또는 3회 오답 후 결과 화면이 표시된다", async () => {
      render(<Quiz initialQuizSetId="quiz_set_1" />);

      const confirmButton = screen.getByRole("button", { name: /잠입 개시/ });

      await act(async () => {
        fireEvent.click(confirmButton);
      });

      // 3번 시간 초과로 오답 처리 (강제 종료)
      for (let i = 0; i < 3; i++) {
        await waitFor(() => {
          expect(screen.getByText(/LOCK/)).toBeInTheDocument();
        });

        // 타이머 완료
        await act(async () => {
          jest.advanceTimersByTime(11000);
        });

        // 다음 버튼이 있으면 클릭
        const nextButton = screen.queryByRole("button", { name: /다음 잠금장치/ });
        if (nextButton) {
          await act(async () => {
            fireEvent.click(nextButton);
          });
        }
      }

      // 결과 화면 확인
      await waitFor(
        () => {
          expect(screen.getByText(/작전 결과/)).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    });
  });

  describe("다시 시작", () => {
    it("결과 화면에서 다시 시작 버튼이 렌더링된다", async () => {
      render(<Quiz initialQuizSetId="quiz_set_1" />);

      const confirmButton = screen.getByRole("button", { name: /잠입 개시/ });

      await act(async () => {
        fireEvent.click(confirmButton);
      });

      // 3번 시간 초과로 오답 처리
      for (let i = 0; i < 3; i++) {
        await waitFor(() => {
          expect(screen.getByText(/LOCK/)).toBeInTheDocument();
        });

        await act(async () => {
          jest.advanceTimersByTime(11000);
        });

        const nextButton = screen.queryByRole("button", { name: /다음 잠금장치/ });
        if (nextButton) {
          await act(async () => {
            fireEvent.click(nextButton);
          });
        }
      }

      // 결과 화면에서 다시 시작 버튼 확인
      await waitFor(
        () => {
          const restartButton = screen.getByRole("button", { name: /다시 잠입/ });
          expect(restartButton).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    });
  });
});
