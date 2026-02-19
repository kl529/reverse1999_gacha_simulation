"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { newbieGuideSteps, newbieFAQ } from "@/data/newbie_guide";
import { storage, STORAGE_KEYS } from "@/lib/storage";

export default function NewbieGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [collapsedSteps, setCollapsedSteps] = useState<number[]>([]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [faqCollapsed, setFaqCollapsed] = useState(false);

  // localStorage에서 완료된 단계 불러오기
  useEffect(() => {
    const saved = storage.get<number[]>(STORAGE_KEYS.NEWBIE_GUIDE_PROGRESS);
    if (saved) {
      setCompletedSteps(saved);
    }
  }, []);

  // 완료된 단계 저장
  const toggleStep = (stepId: number) => {
    const newCompleted = completedSteps.includes(stepId)
      ? completedSteps.filter((id) => id !== stepId)
      : [...completedSteps, stepId];

    setCompletedSteps(newCompleted);
    storage.set(STORAGE_KEYS.NEWBIE_GUIDE_PROGRESS, newCompleted);
  };

  const toggleCollapse = (stepId: number) => {
    setCollapsedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const progress = Math.round((completedSteps.length / newbieGuideSteps.length) * 100);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="top-0 z-20 mb-4 mt-8 p-3 text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
        뉴비 가이드
      </h1>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 진행률 표시 */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              진행률: {progress}%
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {completedSteps.length} / {newbieGuideSteps.length} 완료
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="mb-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            💡 아래 가이드는 추천 순서일뿐 정답이 아닙니다. 본인만의 게임을 하며 즐기면서 게임을
            하시길 바랍니다. (3.2v 기준으로 작성되었으며, 내용이 바뀔 수도 있습니다.)
          </p>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mb-8 rounded-lg bg-white shadow-md dark:bg-gray-800">
          <button
            onClick={() => setFaqCollapsed(!faqCollapsed)}
            className="flex w-full items-center justify-between p-6 text-left"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              ❓ 자주 묻는 질문
            </h3>
            <svg
              className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
                faqCollapsed ? "" : "rotate-180"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {!faqCollapsed && <div className="space-y-2 px-6 pb-6">
            {(() => {
              const categories = [...new Set(newbieFAQ.map((faq) => faq.category))];
              return categories.map((category) => (
                <div key={category}>
                  <h4 className="mb-2 mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {category}
                  </h4>
                  {newbieFAQ
                    .filter((faq) => faq.category === category)
                    .map((faq) => (
                      <div
                        key={faq.id}
                        className="mb-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <button
                          onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                          className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Q. {faq.question}
                          </span>
                          <svg
                            className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform ${
                              openFAQ === faq.id ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {openFAQ === faq.id && (
                          <div className="border-t border-gray-200 bg-gray-50 px-3 py-3 dark:border-gray-700 dark:bg-gray-900/50">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {faq.answer}
                            </p>
                            {faq.links && faq.links.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {faq.links.map((link, idx) => (
                                  <Link
                                    key={idx}
                                    href={link.href}
                                    className="inline-block rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                                  >
                                    {link.text}
                                  </Link>
                                ))}
                              </div>
                            )}
                            {faq.image && (
                              <div className="mt-3">
                                <Image
                                  src={faq.image}
                                  alt="참고 이미지"
                                  width={400}
                                  height={300}
                                  className="rounded-md"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ));
            })()}
          </div>}
        </div>

        {/* 로드맵 */}
        <div className="space-y-4">
          {newbieGuideSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCollapsed = collapsedSteps.includes(step.id);
            const isLastStep = index === newbieGuideSteps.length - 1;

            return (
              <div key={step.id} className="relative">
                {/* 연결선 */}
                {!isLastStep && (
                  <div
                    className={`absolute left-6 top-16 h-full w-0.5 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                )}

                {/* 단계 카드 */}
                <div
                  className={`relative rounded-lg border-2 bg-white shadow-md transition-all dark:bg-gray-800 ${
                    isCompleted ? "border-green-500" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {/* 헤더 */}
                  <div
                    className="flex cursor-pointer items-start gap-4 p-4"
                    onClick={() => toggleCollapse(step.id)}
                  >
                    {/* 체크박스 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStep(step.id);
                      }}
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        isCompleted
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6 text-white" />
                      ) : (
                        <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                          {step.id}
                        </span>
                      )}
                    </button>

                    {/* 제목과 설명 */}
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold ${
                          isCompleted
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>

                    {/* 펼치기/닫기 아이콘 */}
                    <div className="flex-shrink-0">
                      <svg
                        className={`h-6 w-6 text-gray-400 transition-transform ${
                          isCollapsed ? "" : "rotate-180"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* 상세 정보 (기본 열림, 클릭하면 닫힘) */}
                  {!isCollapsed && (step.tips || step.goals) && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                      <div className="grid w-full gap-4 md:grid-cols-2">
                        {/* 팁 영역 */}
                        {step.tips && step.tips.length > 0 && (
                          <div>
                            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                              💡 팁
                            </h4>
                            <ul className="space-y-1">
                              {step.tips.map((tip, idx) => (
                                <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                                  • {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* 목표 영역 */}
                        {step.goals && step.goals.length > 0 && (
                          <div>
                            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                              🎯 목표
                            </h4>
                            <ul className="space-y-1">
                              {step.goals.map((goal, idx) => (
                                <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                                  ✓ {goal}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 완료 메시지 */}
        {completedSteps.length === newbieGuideSteps.length && (
          <div className="mt-8 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-6 text-center text-white shadow-lg">
            <h3 className="mb-2 text-2xl font-bold">🎉 축하합니다!</h3>
            <p className="text-lg">모든 뉴비 가이드를 완료했습니다!</p>
            <p className="mt-2 text-sm">이제 본격적으로 게임을 즐겨보세요!</p>
          </div>
        )}

        {/* 추가 도움말 */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            📚 추가 리소스
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/character"
              className="rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-white">캐릭터 가이드 →</span>
            </Link>
            <Link
              href="/character_setting"
              className="rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                의지 & 공명 가이드 →
              </span>
            </Link>
            <Link
              href="/psycube_guide"
              className="rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-white">의지 육성 →</span>
            </Link>
            <Link
              href="/euphoria_guide"
              className="rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-white">광상 가이드 →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
