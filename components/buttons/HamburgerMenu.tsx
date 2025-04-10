"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { icon: "🎰", label: "가챠 시뮬레이터", href: "/gacha_simulator" },
    { icon: "🧩", label: "캐릭터 퀴즈", href: "/character_quiz" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef}  className="fixed top-4 left-4 z-50">
      {/* 햄버거 버튼 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white rounded-md border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:scale-105 transition-transform"
      >
        ☰
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute mt-2 w-64 bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg rounded-md border border-gray-300 dark:border-gray-700">
          <ul className="py-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  onClick={() => setIsOpen(false)} // 메뉴 클릭 시 닫기
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}