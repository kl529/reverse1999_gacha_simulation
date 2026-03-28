"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export interface HomeFooterProps {
  onPolicyClick: () => void;
  onSourceClick: () => void;
  onContributorsClick: () => void;
  onUpdateClick: () => void;
}

export default function HomeFooter({
  onPolicyClick,
  onSourceClick,
  onContributorsClick,
  onUpdateClick,
}: HomeFooterProps) {
  const t = useTranslations("footer");

  return (
    <footer className="mt-5 flex flex-col items-center gap-2 bg-black/30 p-0 text-sm">
      <div className="flex min-h-[2rem] items-center gap-4 text-gray-200">
        <a href="mailto:jiwon803@gmail.com" className="hover:text-blue-400 hover:underline">
          {t("contact")}
        </a>
        <button onClick={onPolicyClick} className="hover:text-blue-400 hover:underline">
          {t("policy")}
        </button>
        <button onClick={onSourceClick} className="hover:text-blue-400 hover:underline">
          {t("source")}
        </button>
        <button onClick={onContributorsClick} className="hover:text-blue-400 hover:underline">
          {t("contributors")}
        </button>
        <Link
          href="https://buymeacoffee.com/vertin_suitcase"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 hover:underline"
        >
          {t("buyCoffee")}
        </Link>
        <button onClick={onUpdateClick} className="hover:text-blue-400 hover:underline">
          {t("update")}
        </button>
      </div>
    </footer>
  );
}
