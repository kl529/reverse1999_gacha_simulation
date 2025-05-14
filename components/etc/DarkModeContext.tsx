"use client";
import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext<{
  darkMode: boolean;
  toggleDarkMode: () => void;
}>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? "dark" : ""}>
        {/* 다크모드 토글 버튼 */}
        <button
          onClick={toggleDarkMode}
          className="fixed right-4 top-4 z-50 rounded bg-gray-200 px-3 py-2 text-sm shadow transition-transform hover:scale-105 dark:bg-gray-700 lg:bottom-4 lg:top-auto"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {children}
      </div>
    </DarkModeContext.Provider>
  );
}
