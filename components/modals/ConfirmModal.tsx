// components/Modal.tsx
"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalClassName?: string;
}

export default function ConfirmModal({ isOpen, onClose, children, modalClassName }: ModalProps) {
  if (!isOpen) return null; // 표시 안함

  const overlayStyle = "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50";
  const modalStyle = `
    relative bg-white p-4 rounded max-w-md w-full
    ${modalClassName}
  `;

  // 오버레이 클릭 -> 모달 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  // 모달 내부 클릭 -> 닫힘 방지
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={overlayStyle} onClick={handleOverlayClick}>
      <div className={modalStyle} onClick={handleModalClick}>
        {children}
      </div>
    </div>
  );
}
