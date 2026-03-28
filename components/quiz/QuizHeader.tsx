"use client";

import { useTranslations } from "next-intl";

export default function QuizHeader() {
  const t = useTranslations("quiz");
  return (
    <h1 className="sticky top-0 z-20 mb-4 mt-8 p-3 text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
      {t("title")}
    </h1>
  );
}
