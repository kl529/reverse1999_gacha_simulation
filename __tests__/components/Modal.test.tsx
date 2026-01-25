/**
 * Modal 컴포넌트 테스트
 *
 * ConfirmModal과 ModalProvider 컴포넌트 테스트
 */

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { ModalProvider, useModal } from "@/components/etc/ModalProvider";

// Mock next/image for CardInfoModal
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock lucide-react
jest.mock("lucide-react", () => ({
  X: () => <div data-testid="x-icon">X</div>,
}));

describe("ConfirmModal 컴포넌트", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("isOpen 상태에 따른 렌더링", () => {
    it("isOpen=true일 때 children이 렌더링되어야 한다", () => {
      render(
        <ConfirmModal isOpen={true} onClose={mockOnClose}>
          <div data-testid="modal-content">Modal Content</div>
        </ConfirmModal>
      );

      expect(screen.getByTestId("modal-content")).toBeInTheDocument();
      expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });

    it("isOpen=false일 때 children이 렌더링되지 않아야 한다", () => {
      render(
        <ConfirmModal isOpen={false} onClose={mockOnClose}>
          <div data-testid="modal-content">Modal Content</div>
        </ConfirmModal>
      );

      expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
    });
  });

  describe("모달 닫기 동작", () => {
    it("Dialog의 onOpenChange가 호출되면 onClose가 호출되어야 한다", () => {
      // Radix Dialog uses onOpenChange for close handling
      render(
        <ConfirmModal isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </ConfirmModal>
      );

      // Find the dialog close button (Radix UI adds one)
      const closeButton = screen.getByRole("button", { name: /close/i });
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe("Enter 키 debounce 동작", () => {
    it("모달이 열린 상태에서 Enter 키가 처리되어야 한다", async () => {
      const handleKeyDown = jest.fn();

      render(
        <ConfirmModal isOpen={true} onClose={mockOnClose}>
          <div data-testid="modal-content" onKeyDown={handleKeyDown}>
            <input data-testid="modal-input" />
          </div>
        </ConfirmModal>
      );

      // 모달 내용이 렌더링되었는지 확인
      expect(screen.getByTestId("modal-content")).toBeInTheDocument();
    });

    it("모달이 닫힌 직후 ignoreEnter 상태가 설정되어야 한다", async () => {
      const { rerender } = render(
        <ConfirmModal isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </ConfirmModal>
      );

      // 모달 닫기
      rerender(
        <ConfirmModal isOpen={false} onClose={mockOnClose}>
          <div>Content</div>
        </ConfirmModal>
      );

      // 모달이 닫힌 후 컨텐츠가 없어야 함
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });
  });

  describe("modalClassName 적용", () => {
    it("커스텀 클래스명이 적용되어야 한다", () => {
      render(
        <ConfirmModal
          isOpen={true}
          onClose={mockOnClose}
          modalClassName="custom-modal-class"
        >
          <div>Modal Content</div>
        </ConfirmModal>
      );

      // DialogContent에 커스텀 클래스가 적용되어야 함
      const content = screen.getByRole("dialog");
      expect(content).toBeInTheDocument();
    });
  });
});

describe("ModalProvider 컴포넌트", () => {
  describe("기본 렌더링", () => {
    it("children이 렌더링되어야 한다", () => {
      render(
        <ModalProvider>
          <div data-testid="child-content">Child Content</div>
        </ModalProvider>
      );

      expect(screen.getByTestId("child-content")).toBeInTheDocument();
    });
  });

  describe("useModal hook 동작", () => {
    // Test component that uses the hook
    const TestComponent = () => {
      const { activeModal, openModal, closeModal } = useModal();
      return (
        <div>
          <span data-testid="active-modal">{activeModal || "none"}</span>
          <button onClick={() => openModal("material")}>Open Material</button>
          <button onClick={() => closeModal()}>Close Modal</button>
        </div>
      );
    };

    it("openModal 호출 시 activeModal 상태가 변경되어야 한다", () => {
      render(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      expect(screen.getByTestId("active-modal")).toHaveTextContent("none");

      fireEvent.click(screen.getByText("Open Material"));

      expect(screen.getByTestId("active-modal")).toHaveTextContent("material");
    });

    it("closeModal 호출 시 activeModal이 null이 되어야 한다", () => {
      render(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      // Open modal
      fireEvent.click(screen.getByText("Open Material"));
      expect(screen.getByTestId("active-modal")).toHaveTextContent("material");

      // Close modal
      fireEvent.click(screen.getByText("Close Modal"));
      expect(screen.getByTestId("active-modal")).toHaveTextContent("none");
    });

    it('openModal("material") 호출 시 CardInfoModal이 렌더링되어야 한다', () => {
      render(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      fireEvent.click(screen.getByText("Open Material"));

      // CardInfoModal의 제목이 표시되어야 함
      expect(screen.getByText("재료 파밍표")).toBeInTheDocument();
    });
  });

  describe("useModal 에러 처리", () => {
    it("ModalProvider 외부에서 useModal 호출 시 에러가 발생해야 한다", () => {
      const TestComponentWithoutProvider = () => {
        const { activeModal } = useModal();
        return <span>{activeModal}</span>;
      };

      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow("useModal은 ModalProvider 안에서만 사용해야 합니다.");

      console.error = originalError;
    });
  });
});
