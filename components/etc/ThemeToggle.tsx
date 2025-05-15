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
      className="fixed right-4 top-4 z-50 rounded bg-gray-200 px-3 py-2 text-sm shadow transition-transform hover:scale-105 dark:bg-gray-700 lg:bottom-4 lg:top-auto"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
