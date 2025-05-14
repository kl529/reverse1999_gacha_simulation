"use client";

import { motion, AnimatePresence } from "framer-motion";

interface OffCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right";
  children: React.ReactNode;
}

export function OffCanvas({
  isOpen,
  onClose,
  position = "left",
  children,
}: OffCanvasProps) {
  const isLeft = position === "left";

  const variants = {
    hidden: { x: isLeft ? "-100%" : "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: isLeft ? "-100%" : "100%", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 (모달 백드롭) */}
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ✅ 실제 패널 - position에 따라 left 또는 right 설정 */}
          <motion.aside
            className={`fixed top-0 ${isLeft ? "left-0" : "right-0"} z-50 h-full w-1/2 overflow-y-auto bg-white p-4 shadow-lg dark:bg-gray-800 lg:w-1/4`}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute right-2 top-2 text-2xl font-bold text-gray-700 dark:text-gray-200"
            >
              ✕
            </button>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
