"use client";

import { useState } from "react";

export default function ErrorTestPage() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("테스트 에러 발생! ErrorBoundary가 이것을 캐치해야 합니다.");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="mb-4 text-3xl font-bold">🧪 에러 처리 테스트 페이지</h1>

      <div className="max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">ErrorBoundary 테스트</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          아래 버튼을 클릭하면 의도적으로 에러가 발생합니다.
          <br />
          ErrorBoundary가 이것을 캐치하고 폴백 UI를 표시해야 합니다.
        </p>
        <button
          onClick={() => setShouldError(true)}
          className="w-full rounded bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
        >
          🔥 에러 발생시키기
        </button>
      </div>

      <div className="max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">네트워크 상태 테스트</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          F12 → Network 탭 → Offline 체크박스를 토글하세요.
          <br />
          화면 상단에 토스트 메시지가 표시됩니다.
        </p>
      </div>

      <div className="max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">404 페이지 테스트</h2>
        <a
          href="/nonexistent-page"
          className="block w-full rounded bg-blue-600 px-4 py-3 text-center font-medium text-white transition hover:bg-blue-700"
        >
          존재하지 않는 페이지로 이동
        </a>
      </div>
    </div>
  );
}
