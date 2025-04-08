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
          className="fixed top-4 right-4 lg:bottom-4 lg:top-auto bg-gray-200 dark:bg-gray-700 text-sm px-3 py-2 rounded shadow hover:scale-105 transition-transform z-50"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {children}
      </div>
    </DarkModeContext.Provider>
  );
}