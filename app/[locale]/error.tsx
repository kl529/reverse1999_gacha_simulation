"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

/**
 * Next.js App Router 에러 페이지
 * 서버/클라이언트 컴포넌트에서 발생하는 에러를 캐치합니다.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    // 에러 로깅 (프로덕션에서는 외부 서비스로 전송 가능)
    console.error("Error page caught an error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
        <div className="mb-6 text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("description")}
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              {t("devDetail")}
            </h3>
            <pre className="overflow-x-auto text-xs text-red-700 dark:text-red-300">
              {error.message || error.toString()}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                Error Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="rounded-md bg-gray-200 px-4 py-2 text-center font-medium text-gray-900 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            {t("goHome")}
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t("refresh")}
          </button>
        </div>
      </div>
    </div>
  );
}
