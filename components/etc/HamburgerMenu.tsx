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

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal(); // 🔥 모달 열기 함수 가져옴

  const menuItems: MenuItem[] = [
    { iconImg: "/infos/menu/gacha_simulator_menu.png", label: "가챠 시뮬레이터", href: "/gacha_simulator" },
    { iconImg: "/infos/menu/character_quiz_menu.png", label: "캐릭터 퀴즈", href: "/character_quiz" },
    { divider: true },
    { iconImg: "/infos/menu/material_menu.png", label: "재료 파밍", modalType: "material" },
    { iconImg: "/infos/menu/resonance_menu.png", label: "공명 & 의지", href: "/character_setting" },
    { iconImg: "/infos/menu/skin_menu.png", label: "스킨 갤러리", href: "/skin" },
    { iconImg: "/infos/menu/path_quiz_menu.png", label: "오솔길 정답", href: "/path_quiz" },
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
    <div ref={menuRef} className="fixed top-4 left-4 z-50 flex gap-2">
      {/* 홈으로 가기 버튼 */}
      <Link
        href="/"
        title="홈으로"
        className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white rounded-md border flex items-center justify-center"
      >
        🏠
      </Link>

      {/* 햄버거 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white rounded-md border flex items-center justify-center"
      >
        ☰
      </button>

      {/* 메뉴 오픈 */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 text-black dark:text-white rounded-md border shadow-lg">
          <ul className="py-2">
            {menuItems.map((item, index) => {
              if (item.divider) {
                return <hr key={index} className="my-2 h-px bg-black dark:bg-gray-500 mx-3 border-0" />;
              }

              const handleClick = () => {
                setIsOpen(false);
                if (item.modalType) {
                  openModal(item.modalType); // 🔥 모달 열기
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
                    className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
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