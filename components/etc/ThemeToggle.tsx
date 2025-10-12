"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="fixed right-4 top-4 z-50 rounded bg-gray-200 px-3 py-2 text-sm shadow transition-all duration-300 hover:scale-105 dark:bg-gray-700 lg:bottom-4 lg:top-auto"
      style={{ transform: theme === "dark" ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
