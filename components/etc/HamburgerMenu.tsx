"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useModal } from "@/components/etc/ModalProvider";

type MenuItem = {
  icon?: string;
  iconImg?: string;
  label?: string;
  href?: string;
  divider?: boolean;
  modalType?: "material"; // 🔥 타입 명확하게 지정
};

type HamburgerMenuProps = {
  onModalOpen?: (type: string) => void;
};

export default function HamburgerMenu({ onModalOpen }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal(); // 🔥 모달 열기 함수 가져옴

  const menuItems: MenuItem[] = [
    {
      iconImg: "/infos/menu/gacha_simulator_menu.png",
      label: "가챠 시뮬레이터",
      href: "/gacha_simulator",
    },
    {
      iconImg: "/infos/menu/character_quiz_menu.png",
      label: "캐릭터 퀴즈",
      href: "/character_quiz",
    },
    { divider: true },
    {
      iconImg: "/infos/menu/material_menu.png",
      label: "재료 파밍",
      modalType: "material",
    },
    {
      iconImg: "/infos/menu/resonance_menu.png",
      label: "공명 & 의지",
      href: "/character_setting",
    },
    {
      iconImg: "/infos/menu/skin_menu.png",
      label: "스킨 갤러리",
      href: "/skin",
    },
    {
      iconImg: "/infos/menu/future_insight_menu.png",
      label: "미래시 정리",
      href: "/future_insight",
    },
    { divider: true },
    {
      iconImg: "/infos/menu/path_quiz_menu.png",
      label: "오솔길 정답",
      href: "/path_quiz",
    },
    {
      iconImg: "/infos/menu/euphoria_guide_menu.png",
      label: "광상 가이드",
      href: "/euphoria_guide",
    },
    {
      iconImg: "/infos/menu/blueprint_menu.png",
      label: "청사진 모음",
      href: "/blueprint_setting",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div ref={menuRef} className="fixed left-4 top-4 z-50 flex gap-2">
      {/* 홈으로 가기 버튼 */}
      <Link
        href="/"
        title="홈으로"
        className="flex h-10 w-10 items-center justify-center rounded-md border bg-white text-black dark:bg-black dark:text-white"
      >
        🏠
      </Link>

      {/* 햄버거 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-md border bg-white text-black dark:bg-black dark:text-white"
      >
        ☰
      </button>

      {/* 메뉴 오픈 */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 rounded-md border bg-white text-black shadow-lg dark:bg-gray-900 dark:text-white">
          <ul className="py-2">
            {menuItems.map((item, index) => {
              if (item.divider) {
                return (
                  <hr key={index} className="mx-3 my-2 h-px border-0 bg-black dark:bg-gray-500" />
                );
              }

              const handleClick = () => {
                setIsOpen(false);
                if (item.modalType) {
                  openModal(item.modalType); // 🔥 모달 열기
                  if (item.modalType && onModalOpen) {
                    onModalOpen(item.modalType); // 🔥 여기!
                  }
                }
              };

              if (item.href && !item.modalType) {
                const isExternal = item.href.startsWith("http");
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.iconImg ? (
                        <Image src={item.iconImg} alt="" width={30} height={30} />
                      ) : (
                        <span className="text-lg">{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              }

              return (
                <li key={index}>
                  <button
                    onClick={handleClick}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {item.iconImg ? (
                      <Image src={item.iconImg} alt="" width={30} height={30} />
                    ) : (
                      <span className="text-lg">{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
