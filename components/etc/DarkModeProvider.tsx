"use client";

import { useEffect, useState } from "react";

export default function DarkModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  // 브라우저 설정 or localStorage에서 초기값 결정
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      const isDark = saved === "true";
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      // 시스템 설정 따르기
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // 변경 시 localStorage 저장 + class 적용
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="fixed top-4 right-4 lg:bottom-4 lg:top-auto bg-gray-200 dark:bg-gray-700 text-sm px-3 py-2 rounded shadow hover:scale-105 transition-transform z-50"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
      {children}
    </>
  );
}