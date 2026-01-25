/**
 * RankingBoard 컴포넌트 테스트
 *
 * 퀴즈 랭킹 표시 및 닉네임 등록 테스트
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RankingBoard from "@/components/quiz/RankingBoard";
import { QuizResult, RankingEntry } from "@/lib/types/quizTypes";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Firebase firestore
const mockSaveRanking = jest.fn();
const mockGetRankingsByQuizSet = jest.fn();

jest.mock("@/lib/firebase/firestore", () => ({
  saveRanking: (...args: unknown[]) => mockSaveRanking(...args),
  getRankingsByQuizSet: (...args: unknown[]) => mockGetRankingsByQuizSet(...args),
}));

// Mock posthog analytics
jest.mock("@/lib/posthog", () => ({
  analytics: {
    generalQuiz: {
      rankingRegistered: jest.fn(),
    },
  },
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock window.gtag
Object.defineProperty(window, "gtag", {
  value: jest.fn(),
  writable: true,
});

describe("RankingBoard 컴포넌트", () => {
  const mockResult: QuizResult = {
    totalQuestions: 10,
    correctCount: 8,
    totalTime: 120000, // 2 minutes
    answers: [],
    completedAt: new Date("2026-01-25T00:00:00Z"),
    quizSetId: "quiz_set_1",
  };

  const mockOnClose = jest.fn();

  const mockRankings: RankingEntry[] = [
    {
      id: "1",
      nickname: "Player1",
      score: 10,
      totalQuestions: 10,
      timeInSeconds: 60,
      percentage: 100,
      quizSetId: "quiz_set_1",
      createdAt: new Date("2026-01-24T00:00:00Z"),
    },
    {
      id: "2",
      nickname: "Player2",
      score: 9,
      totalQuestions: 10,
      timeInSeconds: 90,
      percentage: 90,
      quizSetId: "quiz_set_1",
      createdAt: new Date("2026-01-24T00:00:00Z"),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetRankingsByQuizSet.mockResolvedValue(mockRankings);
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe("기본 렌더링", () => {
    it("결과 점수와 정답률이 표시되어야 한다", async () => {
      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      // 점수 표시 (8/10)
      await waitFor(() => {
        expect(screen.getByText(/8\/10/)).toBeInTheDocument();
      });

      // 정답률 표시 (80%)
      expect(screen.getByText(/80%/)).toBeInTheDocument();
    });

    it("시간이 올바르게 포맷되어 표시되어야 한다", async () => {
      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      await waitFor(() => {
        // 2:00 형식으로 표시
        expect(screen.getByText(/2:00/)).toBeInTheDocument();
      });
    });

    it("닫기 버튼이 표시되어야 한다", () => {
      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      const closeButton = screen.getByRole("button", { name: /×/ });
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe("랭킹 목록 표시", () => {
    it("Firebase에서 불러온 랭킹 목록이 표시되어야 한다", async () => {
      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      await waitFor(() => {
        expect(screen.getByText("Player1")).toBeInTheDocument();
        expect(screen.getByText("Player2")).toBeInTheDocument();
      });
    });

    it("랭킹이 없을 때 안내 메시지가 표시되어야 한다", async () => {
      mockGetRankingsByQuizSet.mockResolvedValue([]);

      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      await waitFor(() => {
        expect(screen.getByText(/아직 등록된 기록이 없습니다/)).toBeInTheDocument();
      });
    });

    it("로딩 중 상태가 표시되어야 한다", () => {
      // 로딩 상태를 유지하도록 promise를 지연
      mockGetRankingsByQuizSet.mockImplementation(
        () => new Promise(() => {})
      );

      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      expect(screen.getByText("로딩 중...")).toBeInTheDocument();
    });
  });

  describe("닉네임 등록", () => {
    it("내 기록 등록하기 버튼이 표시되어야 한다", async () => {
      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /내 기록 등록하기/ })
        ).toBeInTheDocument();
      });
    });

    it("등록 버튼 클릭 시 닉네임 입력 화면으로 전환되어야 한다", async () => {
      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      await waitFor(() => {
        const registerButton = screen.getByRole("button", {
          name: /내 기록 등록하기/,
        });
        fireEvent.click(registerButton);
      });

      expect(screen.getByText("닉네임을 입력하세요")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/닉네임/)
      ).toBeInTheDocument();
    });

    it("닉네임 입력 필드가 동작해야 한다", async () => {
      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      await waitFor(() => {
        const registerButton = screen.getByRole("button", {
          name: /내 기록 등록하기/,
        });
        fireEvent.click(registerButton);
      });

      const input = screen.getByPlaceholderText(/닉네임/);
      fireEvent.change(input, { target: { value: "TestPlayer" } });

      expect(input).toHaveValue("TestPlayer");
    });

    it("닉네임 입력 후 등록 버튼 클릭 시 Firebase 저장이 호출되어야 한다", async () => {
      mockSaveRanking.mockResolvedValue("new-ranking-id");

      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      await waitFor(() => {
        const registerButton = screen.getByRole("button", {
          name: /내 기록 등록하기/,
        });
        fireEvent.click(registerButton);
      });

      const input = screen.getByPlaceholderText(/닉네임/);
      fireEvent.change(input, { target: { value: "TestPlayer" } });

      const submitButton = screen.getByRole("button", { name: "등록하기" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSaveRanking).toHaveBeenCalledWith(
          expect.objectContaining({
            nickname: "TestPlayer",
            score: 8,
            totalQuestions: 10,
            percentage: 80,
          })
        );
      });
    });
  });

  describe("뷰 모드 전환", () => {
    it("취소 버튼 클릭 시 랭킹 목록으로 돌아가야 한다", async () => {
      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      await waitFor(() => {
        const registerButton = screen.getByRole("button", {
          name: /내 기록 등록하기/,
        });
        fireEvent.click(registerButton);
      });

      expect(screen.getByText("닉네임을 입력하세요")).toBeInTheDocument();

      const cancelButton = screen.getByRole("button", { name: "취소" });
      fireEvent.click(cancelButton);

      // 다시 랭킹 목록이 보여야 함
      await waitFor(() => {
        expect(screen.getByText("Player1")).toBeInTheDocument();
      });
    });

    it("예상 순위가 표시되어야 한다", async () => {
      render(<RankingBoard result={mockResult} onClose={mockOnClose} />);

      await waitFor(() => {
        expect(screen.getByText(/예상 순위:/)).toBeInTheDocument();
      });
    });
  });
});
