"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");

  const nextLocale = locale === "ko" ? "en" : "ko";

  const handleSwitch = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={handleSwitch}
      aria-label={t("switchTo")}
      title={t("switchTo")}
      className="fixed right-16 top-4 z-50 rounded bg-gray-200 px-3 py-2 text-sm font-medium shadow transition-all duration-300 hover:scale-105 dark:bg-gray-700 lg:bottom-4 lg:top-auto"
    >
      {t("current")}
    </button>
  );
}
