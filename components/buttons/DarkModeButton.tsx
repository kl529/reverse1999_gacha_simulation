"use client";

import { useState } from "react";

// 다크모드 버튼 세팅
export default function DarkModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="
          fixed top-4 right-4  /* 모바일: 우측 상단 */
          lg:bottom-4 lg:top-auto  /* 데스크탑: 우측 하단 */
          bg-gray-200 dark:bg-gray-700 text-sm px-3 py-2 rounded shadow
          hover:scale-105 transition-transform z-50
        "
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {children}
    </div>
  );
}