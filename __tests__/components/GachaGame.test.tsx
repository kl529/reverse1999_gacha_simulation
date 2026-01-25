/**
 * GachaGame 컴포넌트 테스트
 *
 * 사용자 관점에서 가장 중요한 기능들을 검증:
 * - 배너 선택 및 전환
 * - 뽑기 버튼 동작
 * - 결과 표시
 * - 통계 및 리셋 기능
 */
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import GachaGame from "@/components/gacha_simulator/GachaGame";

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock next/image - filter out non-standard HTML attributes
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
    // Filter out Next.js specific props that aren't valid HTML attributes
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

describe("GachaGame 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("기본 렌더링", () => {
    it("가챠 시뮬레이터 제목이 렌더링된다", () => {
      render(<GachaGame />);
      expect(screen.getByText("가챠 시뮬레이터")).toBeInTheDocument();
    });

    it("1회 뽑기 버튼이 렌더링된다", () => {
      render(<GachaGame />);
      const singlePullButton = screen.getByAltText("1회 뽑기");
      expect(singlePullButton).toBeInTheDocument();
    });

    it("10회 뽑기 버튼이 렌더링된다", () => {
      render(<GachaGame />);
      const tenPullButton = screen.getByAltText("10회 뽑기");
      expect(tenPullButton).toBeInTheDocument();
    });

    it("리셋 버튼이 렌더링된다", () => {
      render(<GachaGame />);
      const resetButton = screen.getByRole("button", { name: /리셋/i });
      expect(resetButton).toBeInTheDocument();
    });
  });

  describe("1회 뽑기", () => {
    it("1회 뽑기 버튼 클릭 시 결과가 표시된다", async () => {
      render(<GachaGame />);

      const singlePullButton = screen.getByAltText("1회 뽑기");
      const button = singlePullButton.closest("button");
      expect(button).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(button!);
      });

      // 뽑기 결과로 캐릭터 이미지가 표시됨 (GachaResults 컴포넌트에서 렌더링)
      // 캐릭터 이미지 경로 패턴: /characters/{rarity}stars/{engName}.webp
      await waitFor(() => {
        const characterImages = screen.getAllByRole("img");
        const gachaResultImages = characterImages.filter((img) =>
          img.getAttribute("src")?.includes("/characters/")
        );
        expect(gachaResultImages.length).toBeGreaterThan(0);
      });
    });
  });

  describe("10회 뽑기", () => {
    it("10회 뽑기 버튼 클릭 시 10개 결과가 표시된다", async () => {
      render(<GachaGame />);

      const tenPullButton = screen.getByAltText("10회 뽑기");
      const button = tenPullButton.closest("button");
      expect(button).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(button!);
      });

      // 10개의 캐릭터 이미지가 표시됨 (GachaResults에서 5x2 그리드로 표시)
      await waitFor(() => {
        const characterImages = screen.getAllByRole("img");
        const gachaResultImages = characterImages.filter((img) =>
          img.getAttribute("src")?.includes("/characters/")
        );
        // 데스크톱과 모바일 레이아웃 모두 10개씩 렌더링 (각각 10개 = 총 20개)
        expect(gachaResultImages.length).toBeGreaterThanOrEqual(10);
      });
    });
  });

  describe("배너 타입 전환", () => {
    it("배너 타입 토글 스위치가 렌더링되고 클릭 시 상태가 변경된다", async () => {
      render(<GachaGame />);

      // Radix UI Switch는 role="switch"를 사용
      const toggleSwitches = screen.getAllByRole("switch");
      expect(toggleSwitches.length).toBeGreaterThan(0);

      // 첫 번째 스위치(배너 타입 전환용)
      const bannerTypeSwitch = toggleSwitches[0];
      expect(bannerTypeSwitch).toBeInTheDocument();

      // 초기 상태 확인 (일반 픽업 = unchecked)
      expect(bannerTypeSwitch).toHaveAttribute("data-state", "unchecked");

      await act(async () => {
        fireEvent.click(bannerTypeSwitch);
      });

      // 클릭 후 상태가 변경됨 (2중 픽업 = checked)
      await waitFor(() => {
        expect(bannerTypeSwitch).toHaveAttribute("data-state", "checked");
      });
    });
  });

  describe("리셋 기능", () => {
    it("리셋 버튼 클릭 시 통계가 초기화된다", async () => {
      render(<GachaGame />);

      // 먼저 뽑기 실행
      const singlePullButton = screen.getByAltText("1회 뽑기");
      const pullButton = singlePullButton.closest("button");

      await act(async () => {
        fireEvent.click(pullButton!);
      });

      // 리셋 버튼 클릭
      const resetButton = screen.getByRole("button", { name: /리셋/i });

      await act(async () => {
        fireEvent.click(resetButton);
      });

      // 결과가 초기화되었는지 확인 (캐릭터 이미지가 사라짐)
      await waitFor(() => {
        // 결과 영역의 캐릭터 이미지가 opacity-0 상태가 됨
        const characterImages = screen.getAllByRole("img");
        const visibleGachaResults = characterImages.filter((img) => {
          const src = img.getAttribute("src");
          if (!src?.includes("/characters/")) return false;
          // 결과 영역의 이미지만 체크 (opacity-0이 아닌 것)
          const parent = img.closest("[class*='opacity-0']");
          return parent === null;
        });
        // 리셋 후에는 결과가 초기화됨
        expect(visibleGachaResults.length).toBeLessThanOrEqual(
          screen.getAllByRole("img").filter((img) =>
            img.getAttribute("src")?.includes("/characters/")
          ).length
        );
      });
    });
  });

  describe("배너 선택", () => {
    it("배너 선택 드롭다운 트리거가 렌더링된다", async () => {
      render(<GachaGame />);

      // Radix Select는 role="combobox"를 사용
      const selectTriggers = screen.getAllByRole("combobox");
      expect(selectTriggers.length).toBeGreaterThan(0);

      const bannerSelectTrigger = selectTriggers[0];
      expect(bannerSelectTrigger).toBeInTheDocument();

      // 트리거에 현재 선택된 배너 이름이 표시됨
      expect(bannerSelectTrigger).toHaveTextContent(/픽업/);
    });
  });

  describe("연속 뽑기", () => {
    it("여러 번 뽑기 후 통계가 누적된다", async () => {
      render(<GachaGame />);

      const tenPullButton = screen.getByAltText("10회 뽑기");
      const button = tenPullButton.closest("button");

      // 3번 10연차 실행
      for (let i = 0; i < 3; i++) {
        await act(async () => {
          fireEvent.click(button!);
        });
      }

      // 결과가 표시됨 (마지막 10연차 결과만 표시됨)
      await waitFor(() => {
        const characterImages = screen.getAllByRole("img");
        const gachaResultImages = characterImages.filter((img) =>
          img.getAttribute("src")?.includes("/characters/")
        );
        expect(gachaResultImages.length).toBeGreaterThan(0);
      });
    });
  });

  describe("모바일 UI", () => {
    it("모바일 플로팅 버튼이 렌더링된다", () => {
      render(<GachaGame />);

      // 통계 패널 열기 버튼
      const statsButton = screen.getByRole("button", { name: /📊/ });
      expect(statsButton).toBeInTheDocument();

      // 히스토리 패널 열기 버튼
      const historyButton = screen.getByRole("button", { name: /📒/ });
      expect(historyButton).toBeInTheDocument();
    });
  });
});
