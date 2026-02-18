"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useTranslations } from "next-intl";
import CardInfoModal from "@/components/modals/CardInfoModal";

type ModalType = "material" | null;

interface ModalContextProps {
  activeModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const t = useTranslations("modal");

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}

      {activeModal === "material" && (
        <CardInfoModal
          isOpen={true}
          onClose={closeModal}
          title={t("materialFarming")}
          image="/infos/modal_img/material_sheet.webp"
          source="https://bbs.nga.cn/read.php?tid=41840172&rand=968"
        />
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider.");
  }
  return context;
}
