export default function HomePageSkeleton() {
  return (
    <div className="relative flex min-h-screen w-full animate-pulse flex-col items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-900">
      {/* 배경 스켈레톤 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-900" />

      <div className="relative z-20 flex min-h-screen w-full flex-col">
        {/* 이벤트 배너 스켈레톤 */}
        <div className="h-12 w-full bg-gray-400 dark:bg-gray-700" />

        <main className="flex flex-grow flex-col items-center justify-center gap-8 px-10">
          {/* 제목 스켈레톤 */}
          <div className="h-12 w-64 rounded-lg bg-gray-300 dark:bg-gray-700" />
          <div className="h-6 w-48 rounded-lg bg-gray-300 dark:bg-gray-700" />

          {/* 카드 그리드 스켈레톤 */}
          <div className="grid w-full max-w-7xl grid-cols-1 gap-10 md:px-20 lg:grid-cols-3 lg:px-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex w-full flex-col items-center gap-4 rounded-lg bg-gray-300/60 p-6 dark:bg-gray-800/60"
              >
                {/* 카드 제목 */}
                <div className="h-8 w-32 rounded bg-gray-400 dark:bg-gray-700" />
                <div className="h-4 w-40 rounded bg-gray-400 dark:bg-gray-700" />

                {/* 카드 아이템 그리드 */}
                <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-5">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 rounded bg-gray-400 dark:bg-gray-700" />
                      <div className="h-3 w-16 rounded bg-gray-400 dark:bg-gray-700" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 풋터 스켈레톤 */}
        <footer className="mt-5 flex items-center justify-center gap-4 bg-gray-400/30 p-4 dark:bg-gray-800/30">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-16 rounded bg-gray-400 dark:bg-gray-700" />
          ))}
        </footer>
      </div>
    </div>
  );
}
