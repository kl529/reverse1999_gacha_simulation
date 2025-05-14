"use client";

import { useEffect, useState } from "react";

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null); // 초기 상태는 null

  // 1) 첫 로딩 시 localStorage 또는 시스템 설정에서 초기값 결정
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setDarkMode(saved === "true");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // 2) darkMode가 변경될 때만 class 및 localStorage 갱신
  useEffect(() => {
    if (darkMode === null) return; // 초기 상태일 땐 무시
    localStorage.setItem("darkMode", darkMode.toString());
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  if (darkMode === null) return null; // 초기 로딩 중에는 렌더링 지연

  return (
    <>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="fixed right-4 top-4 z-50 rounded bg-gray-200 px-3 py-2 text-sm shadow transition-transform hover:scale-105 dark:bg-gray-700 lg:bottom-4 lg:top-auto"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
      {children}
    </>
  );
}
