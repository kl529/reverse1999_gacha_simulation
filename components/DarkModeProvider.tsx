"use client";

import { useState } from "react";

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
        className="fixed bottom-4 right-4 bg-gray-200 dark:bg-gray-700 text-sm px-3 py-2 rounded shadow hover:scale-105 transition-transform z-50"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {children}
    </div>
  );
}