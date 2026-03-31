"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "april_hint_shown";

export default function AprilPage() {
  const router = useRouter();
  const [step, setStep] = useState<null | "warn" | "hint">(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(
    () => typeof window !== "undefined" && !!localStorage.getItem(STORAGE_KEY)
  );

  const handleSubmitClick = () => {
    const alreadyShown = localStorage.getItem(STORAGE_KEY);
    if (alreadyShown) {
      router.push("/");
    } else {
      setStep("warn");
    }
  };

  const handleNext = () => setStep("hint");

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setAlreadySubmitted(true);
    setStep(null);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-100 px-4 py-16 dark:bg-stone-900">
      <div className="w-full max-w-xl">
        {/* 봉투 상단 */}
        <div className="flex items-center justify-between rounded-t-lg border-x border-t border-stone-300 bg-stone-200 px-6 py-2 text-xs text-stone-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
          <span>✉ FROM. 아르카나</span>
          <span>2026. 4. 1</span>
        </div>

        {/* 편지지 본문 */}
        <div className="relative rounded-b-lg border border-stone-300 bg-amber-50 px-8 py-8 shadow-md dark:border-stone-600 dark:bg-stone-800">
          {/* 편지지 줄 */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden px-8">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="border-b border-stone-200 dark:border-stone-700"
                style={{ height: "2rem" }}
              />
            ))}
          </div>

          <div className="relative space-y-6">
            {/* 인사말 */}
            <div className="space-y-2">
              <p className="text-lg font-semibold text-stone-700 dark:text-stone-200">
                버틴소대에게 남기는 편지..
              </p>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                지금 버틴의 여행가방이 아르카나에게 넘어갔어.
                <br />
                비밀을 풀어서, 다시 여행가방을 되찾아야해.
              </p>
            </div>

            <hr className="border-stone-300 dark:border-stone-600" />

            {/* 단서 목록 */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-stone-600 dark:text-stone-300">
                🔍 단서는 4곳에 숨겨두었어 —
              </p>
              <ol className="space-y-3 text-sm text-stone-600 dark:text-stone-300">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-bold text-stone-400">①</span>
                  <span>
                    캐릭터 가이드에서 이름이 이상한 마도학자가 있네요. 스스로의 &apos;의지&apos;로
                    변한걸까요?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-bold text-stone-400">②</span>
                  <span>오랜만에 추천 조합을 가봤더니 뭔가 바뀐게 있는 것 같은데?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-bold text-stone-400">③</span>
                  <span>오늘의 날짜만큼 뽑기를 해보면 무슨 좋은 일이 생길지도?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-bold text-stone-400">④</span>
                  <span>
                    &apos;침묵 속의 숨결&apos;을 가진 마도학자가 있는 사이트에서 &apos;버틴의
                    여행가방&apos;을 검색해봐. 해당 정답의 두번째 글자가 뭔가 수상해.
                  </span>
                </li>
              </ol>
            </div>

            <hr className="border-stone-300 dark:border-stone-600" />

            {/* 서명 */}
            <p className="text-right text-sm italic text-stone-400 dark:text-stone-500">
              — 아르카나
            </p>

            {/* 정답 제출 */}
            {!alreadySubmitted && (
              <div className="text-center">
                <button
                  onClick={handleSubmitClick}
                  className="rounded-lg bg-stone-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-600 dark:hover:bg-stone-500"
                >
                  정답 제출하기 →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step 1: 경고 */}
      {step === "warn" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-8">
          <div className="absolute inset-0 bg-black/30" onClick={() => setStep(null)} />
          <div className="relative w-full max-w-md rounded-xl border border-stone-300 bg-amber-50 p-6 shadow-xl dark:border-stone-600 dark:bg-stone-800">
            <p className="text-sm font-semibold text-stone-700 dark:text-stone-200">
              단서를 모두 찾았나요?
            </p>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
              다음을 누르면 최종 힌트가 표시됩니다.
            </p>
            <p className="mt-3 text-xs font-semibold text-red-500">
              ⚠ 최종 힌트는 한번만 볼 수 있어.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setStep(null)}
                className="rounded-lg px-4 py-2 text-sm text-stone-500 transition hover:bg-stone-200 dark:hover:bg-stone-700"
              >
                아직 안 풀었어
              </button>
              <button
                onClick={handleNext}
                className="rounded-lg bg-stone-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-600 dark:hover:bg-stone-500"
              >
                다음 →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: 최종 힌트 */}
      {step === "hint" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-8">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-md rounded-xl border border-stone-300 bg-amber-50 p-6 shadow-xl dark:border-stone-600 dark:bg-stone-800">
            <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-200">
              단서를 조합하면, 두명의 마도학자를 알 수 있을거야. 해당 마도학자의 공통점인 두글자를
              캐릭터 퀴즈 정답칸에 입력해줘.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleConfirm}
                className="rounded-lg bg-stone-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-600 dark:hover:bg-stone-500"
              >
                제출하러 가기 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
