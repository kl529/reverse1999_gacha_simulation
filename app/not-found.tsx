import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - 페이지를 찾을 수 없습니다 | 버틴의 여행가방",
  description: "요청하신 페이지를 찾을 수 없습니다.",
};

/**
 * 404 Not Found 페이지
 * 존재하지 않는 페이지에 접근할 때 표시됩니다.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl dark:bg-gray-800">
        <div className="mb-6">
          <div className="mb-4 text-8xl font-bold text-gray-300 dark:text-gray-600">404</div>
          <div className="mb-4 text-4xl">🔍</div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            홈으로 돌아가기
          </Link>
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>자주 찾는 페이지:</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <Link
              href="/gacha_simulator"
              className="rounded-md bg-purple-100 px-3 py-1 text-purple-700 transition hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300"
            >
              가챠 시뮬레이터
            </Link>
            <Link
              href="/character_quiz"
              className="rounded-md bg-blue-100 px-3 py-1 text-blue-700 transition hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
            >
              캐릭터 퀴즈
            </Link>
            <Link
              href="/recommend_team"
              className="rounded-md bg-green-100 px-3 py-1 text-green-700 transition hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
            >
              추천 조합
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
