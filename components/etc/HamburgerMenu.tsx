"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
type MenuItem = {
  icon?: string;
  iconImg?: string;
  label?: string;
  href?: string;
  divider?: boolean;
  modalType?: string; // 🔁 어떤 모달을 열지 식별
};

export default function HamburgerMenu({
  onModalOpen,
}: {
  onModalOpen?: (type: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { iconImg: "/infos/menu/gacha_simulator_menu.png", label: "가챠 시뮬레이터", href: "/gacha_simulator" },
    { iconImg: "/infos/menu/character_quiz_menu.png", label: "캐릭터 퀴즈", href: "/character_quiz" },
    { divider: true },
    { iconImg: "/infos/menu/material_menu.png", label: "재료 파밍표", modalType: "material" },
    { iconImg: "/infos/menu/resonance_menu.png", label: "공명 정리", href: "https://sites.google.com/view/reverse1999resonance/%ED%99%88" },
    { iconImg: "/infos/menu/goal_menu.png", label: "육성 재화", href: "https://windbow27.github.io/kornblume/planner" },
    { iconImg: "/infos/menu/psycube_menu.png", label: "의지 추천", modalType: "psychube" },
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
      <Link href="/" title="홈으로" className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white rounded-md border flex items-center justify-center">🏠</Link>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white rounded-md border flex items-center justify-center"
      >
        ☰
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 text-black dark:text-white rounded-md border shadow-lg">
          <ul className="py-2">
            {menuItems.map((item, index) => {
              if (item.divider) {
                return <hr key={index} className="my-2 h-px bg-black dark:bg-gray-500 mx-3 border-0" />;
              }

              const isExternal = item.href?.startsWith("http");
              const handleClick = () => {
                setIsOpen(false);
                if (item.modalType && onModalOpen) {
                  onModalOpen(item.modalType); // 🔁 모달 타입 전달
                }
              };

              if (item.href && !item.modalType) {
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={handleClick}
                    >
                      {item.iconImg ? <Image src={item.iconImg} alt="" width={30} height={30} /> : <span className="text-lg">{item.icon}</span>}
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
                    {item.iconImg ? <Image src={item.iconImg} alt="" width={30} height={30} /> : <span className="text-lg">{item.icon}</span>}
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