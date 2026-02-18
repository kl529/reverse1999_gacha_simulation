"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { analytics } from "@/lib/posthog";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("theme");

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // 테마 변경 추적
    analytics.userBehavior.themeToggled(newTheme as 'light' | 'dark');
  };

  return (
    <button
      onClick={handleThemeToggle}
      aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")}
      title={theme === "dark" ? t("switchToLight") : t("switchToDark")}
      className="fixed right-4 top-4 z-50 rounded bg-gray-200 px-3 py-2 text-sm shadow transition-all duration-300 hover:scale-105 dark:bg-gray-700 lg:bottom-4 lg:top-auto"
      style={{ transform: theme === "dark" ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
