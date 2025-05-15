"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalClassName?: string;
}

export default function ConfirmModal({ isOpen, onClose, children, modalClassName }: ModalProps) {
  const [ignoreEnter, setIgnoreEnter] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIgnoreEnter(true);
      const timer = setTimeout(() => setIgnoreEnter(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (ignoreEnter && e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onKeyDown={handleKeyDown} className={modalClassName}>
        <DialogHeader>
          <DialogTitle className="sr-only">확인 모달</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
