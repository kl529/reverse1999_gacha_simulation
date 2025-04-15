"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type MenuItem = {
  icon?: string;
  label?: string;
  href?: string;
  divider?: boolean; // ← 구분선?
};

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { icon: "🎰", label: "가챠 시뮬레이터", href: "/gacha_simulator" },
    { icon: "🧩", label: "캐릭터 퀴즈", href: "/character_quiz" },
    { divider: true }, 
    { icon: "🔗", label: "외부 링크", href: "https://example.com" },
  ];

  // 바깥 영역 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Esc 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div ref={menuRef} className="fixed top-4 left-4 z-50 flex flex-row items-center gap-2">
      <Link
        href="/"
        title="홈으로"
        className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white rounded-md border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:scale-105 transition-transform"
      >
        🏠
      </Link>

      {/* 햄버거 버튼 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : "false"}
        className="
          w-10 h-10
          bg-white dark:bg-black 
          text-black dark:text-white 
          rounded-md 
          border border-gray-300 dark:border-gray-700 
          flex items-center justify-center 
          hover:scale-105 transition-transform 
          hover:bg-gray-100 dark:hover:bg-gray-800
        "
      >
        ☰
      </button>

      {/* 메뉴 드롭다운 */}
      {isOpen && (
        <div
          className="
            absolute mt-2 w-64 
            bg-white dark:bg-gray-900 text-black dark:text-white 
            rounded-md 
            border border-gray-300 dark:border-gray-700 
            origin-top-left 
            animate-dropdown  /* 커스텀 애니메이션 클래스 예시 */
          "
        >
          <ul className="py-2">
            {menuItems.map((item, index) => {
              if (item.divider) {
                return (
                  <hr
                    key={index}
                    className="
                      my-2 
                      border-0
                      h-px 
                      bg-black 
                      dark:bg-gray-500
                      mx-3
                    "
                  />
                );
              }
              const isExternal = item.href?.startsWith("http");

              return (
                <li key={index}>
                  <Link
                    href={item.href ?? ""}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 px-3 py-2 
                              hover:bg-gray-200 dark:hover:bg-gray-700 transition-transform inline-block"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}