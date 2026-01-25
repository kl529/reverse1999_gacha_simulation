/**
 * GrowthCalculatorPage 컴포넌트 테스트
 *
 * 육성 계산기 페이지의 렌더링 및 상호작용 테스트
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GrowthCalculatorPage from "@/components/growth_calculator/GrowthCalculatorPage";
import { CharacterPlan, UserMaterials } from "@/lib/types/growthCalculatorTypes";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock uuid
jest.mock("uuid", () => ({
  v4: () => "mocked-uuid-" + Math.random().toString(36).substr(2, 9),
}));

// Mock child components to simplify testing
jest.mock("@/components/growth_calculator/MaterialInputModal_Growth", () => ({
  __esModule: true,
  default: ({
    open,
    onOpenChange,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => (open ? <div data-testid="material-modal">MaterialInputModal</div> : null),
}));

jest.mock("@/components/growth_calculator/CharacterSelectionModal_Growth", () => ({
  __esModule: true,
  default: ({
    open,
    onOpenChange,
    onConfirm,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (ids: number[]) => void;
  }) =>
    open ? (
      <div data-testid="character-selection-modal">
        CharacterSelectionModal
        <button onClick={() => onConfirm([1])}>Select Character</button>
      </div>
    ) : null,
}));

jest.mock("@/components/growth_calculator/GrowthPlanModal_Growth", () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="growth-plan-modal">GrowthPlanModal</div> : null,
}));

jest.mock("@/components/growth_calculator/CharacterPlanCard_Growth", () => ({
  __esModule: true,
  default: ({
    plan,
    onEdit,
    onDelete,
    onToggleActive,
  }: {
    plan: CharacterPlan;
    onEdit: () => void;
    onDelete: () => void;
    onToggleActive: () => void;
  }) => (
    <div data-testid="character-plan-card">
      <span>Character Plan: {plan.characterId}</span>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onToggleActive}>Toggle</button>
    </div>
  ),
}));

jest.mock("@/components/growth_calculator/MaterialSummary_Growth", () => ({
  __esModule: true,
  default: () => <div data-testid="material-summary">MaterialSummary</div>,
}));

jest.mock("@/components/growth_calculator/FarmingGuide_Growth", () => ({
  __esModule: true,
  default: () => <div data-testid="farming-guide">FarmingGuide</div>,
}));

jest.mock("@/components/growth_calculator/SingleMaterialEditModal_Growth", () => ({
  __esModule: true,
  default: () => null,
}));

// Mock growthCalculatorCalculations
jest.mock("@/lib/utils/growthCalculatorCalculations", () => ({
  aggregateMaterials: jest.fn(() => ({})),
  calculateDeficit: jest.fn(() => ({})),
}));

// Mock localStorage
const localStorageMock = (() => {
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
  value: localStorageMock,
});

// Mock growthCalculatorStorage
const mockLoadUserMaterials = jest.fn();
const mockLoadCharacterPlans = jest.fn();
const mockSaveUserMaterials = jest.fn();
const mockSaveCharacterPlans = jest.fn();

jest.mock("@/lib/utils/growthCalculatorStorage", () => ({
  loadUserMaterials: () => mockLoadUserMaterials(),
  loadCharacterPlans: () => mockLoadCharacterPlans(),
  saveUserMaterials: (materials: UserMaterials) => mockSaveUserMaterials(materials),
  saveCharacterPlans: (plans: CharacterPlan[]) => mockSaveCharacterPlans(plans),
}));

describe("GrowthCalculatorPage 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadUserMaterials.mockReturnValue({});
    mockLoadCharacterPlans.mockReturnValue([]);
  });

  describe("기본 렌더링", () => {
    it("페이지 제목이 표시되어야 한다", () => {
      render(<GrowthCalculatorPage />);

      expect(screen.getByText("육성 계산기")).toBeInTheDocument();
    });

    it("재료 입력 버튼이 표시되어야 한다", () => {
      render(<GrowthCalculatorPage />);

      expect(
        screen.getByRole("button", { name: /재료 입력/ })
      ).toBeInTheDocument();
    });

    it("캐릭터 추가 버튼이 표시되어야 한다", () => {
      render(<GrowthCalculatorPage />);

      expect(
        screen.getByRole("button", { name: /캐릭터 추가/ })
      ).toBeInTheDocument();
    });

    it("설명 문구가 표시되어야 한다", () => {
      render(<GrowthCalculatorPage />);

      expect(
        screen.getByText(/보유 재료를 입력하고/)
      ).toBeInTheDocument();
    });

    it("재료 요약 섹션이 표시되어야 한다", () => {
      render(<GrowthCalculatorPage />);

      expect(screen.getByTestId("material-summary")).toBeInTheDocument();
    });
  });

  describe("모달 열기", () => {
    it("재료 입력 버튼 클릭 시 모달이 열려야 한다", async () => {
      render(<GrowthCalculatorPage />);

      const materialButton = screen.getByRole("button", { name: /재료 입력/ });
      fireEvent.click(materialButton);

      await waitFor(() => {
        expect(screen.getByTestId("material-modal")).toBeInTheDocument();
      });
    });

    it("캐릭터 추가 버튼 클릭 시 선택 모달이 열려야 한다", async () => {
      render(<GrowthCalculatorPage />);

      const addButton = screen.getByRole("button", { name: /캐릭터 추가/ });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByTestId("character-selection-modal")).toBeInTheDocument();
      });
    });

    it("캐릭터 선택 후 육성 계획 모달이 열려야 한다", async () => {
      render(<GrowthCalculatorPage />);

      const addButton = screen.getByRole("button", { name: /캐릭터 추가/ });
      fireEvent.click(addButton);

      await waitFor(() => {
        const selectButton = screen.getByText("Select Character");
        fireEvent.click(selectButton);
      });

      await waitFor(() => {
        expect(screen.getByTestId("growth-plan-modal")).toBeInTheDocument();
      });
    });
  });

  describe("localStorage 연동", () => {
    it("초기 로드 시 저장된 재료 데이터를 불러와야 한다", () => {
      const savedMaterials = { 601: 10, 602: 5 };
      mockLoadUserMaterials.mockReturnValue(savedMaterials);

      render(<GrowthCalculatorPage />);

      expect(mockLoadUserMaterials).toHaveBeenCalled();
    });

    it("초기 로드 시 저장된 계획 데이터를 불러와야 한다", () => {
      const savedPlans: CharacterPlan[] = [
        {
          id: "plan-1",
          characterId: 1,
          isActive: true,
          current: {
            insight: 0,
            level: 1,
            resonance: 1,
            euphoriaLevels: [],
            zoneLevel: 0,
          },
          target: {
            insight: 3,
            level: 60,
            resonance: 15,
            euphoriaLevels: [],
            zoneLevel: 4,
            resonancePatterns: [],
          },
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];
      mockLoadCharacterPlans.mockReturnValue(savedPlans);

      render(<GrowthCalculatorPage />);

      expect(mockLoadCharacterPlans).toHaveBeenCalled();
    });
  });

  describe("계획이 없을 때", () => {
    it("안내 메시지가 표시되어야 한다", () => {
      render(<GrowthCalculatorPage />);

      expect(screen.getByText(/육성 계획이 없습니다/)).toBeInTheDocument();
    });

    it("캐릭터 추가 안내 문구가 표시되어야 한다", () => {
      render(<GrowthCalculatorPage />);

      // Use getAllByText since there might be text broken up or ldquo characters
      expect(
        screen.getByText(/캐릭터 추가.*버튼을 클릭하여/)
      ).toBeInTheDocument();
    });
  });

  describe("계획이 있을 때", () => {
    const createValidPlan = (): CharacterPlan => ({
      id: "plan-1",
      characterId: 1,
      isActive: true,
      current: {
        insight: 0,
        level: 1,
        resonance: 1,
        euphoriaLevels: [],
        zoneLevel: 0,
      },
      target: {
        insight: 3,
        level: 60,
        resonance: 15,
        euphoriaLevels: [],
        zoneLevel: 4,
        resonancePatterns: [],
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    it("육성 목록 섹션이 표시되어야 한다", () => {
      mockLoadCharacterPlans.mockReturnValue([createValidPlan()]);

      render(<GrowthCalculatorPage />);

      expect(screen.getByText(/육성 목록/)).toBeInTheDocument();
    });

    it("캐릭터 수가 표시되어야 한다", () => {
      mockLoadCharacterPlans.mockReturnValue([createValidPlan()]);

      render(<GrowthCalculatorPage />);

      expect(screen.getByText(/\(1명\)/)).toBeInTheDocument();
    });

    it("파밍 가이드가 표시되어야 한다", () => {
      mockLoadCharacterPlans.mockReturnValue([createValidPlan()]);

      render(<GrowthCalculatorPage />);

      expect(screen.getByTestId("farming-guide")).toBeInTheDocument();
    });
  });
});
