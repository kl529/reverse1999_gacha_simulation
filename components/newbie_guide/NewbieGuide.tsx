"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { newbieGuideSteps } from "@/data/newbie_guide";
import { storage, STORAGE_KEYS } from "@/lib/storage";

export default function NewbieGuide() {
  const t = useTranslations("newbieGuide");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [collapsedSteps, setCollapsedSteps] = useState<number[]>([]);

  useEffect(() => {
    const saved = storage.get<number[]>(STORAGE_KEYS.NEWBIE_GUIDE_PROGRESS);
    if (saved) {
      setCompletedSteps(saved);
    }
  }, []);

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
        {t("title")}
      </h1>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("progress", { percent: progress })}
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("completed", { done: completedSteps.length, total: newbieGuideSteps.length })}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {t("tip")}
          </p>
        </div>

        <div className="space-y-4">
          {newbieGuideSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCollapsed = collapsedSteps.includes(step.id);
            const isLastStep = index === newbieGuideSteps.length - 1;

            return (
              <div key={step.id} className="relative">
                {!isLastStep && (
                  <div
                    className={`absolute left-6 top-16 h-full w-0.5 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                )}

                <div
                  className={`relative rounded-lg border-2 bg-white shadow-md transition-all dark:bg-gray-800 ${
                    isCompleted ? "border-green-500" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div
                    className="flex cursor-pointer items-start gap-4 p-4"
                    onClick={() => toggleCollapse(step.id)}
                  >
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

                  {!isCollapsed && (step.tips || step.goals) && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                      <div className="grid w-full gap-4 md:grid-cols-2">
                        {step.tips && step.tips.length > 0 && (
                          <div>
                            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                              {t("tipsLabel")}
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

                        {step.goals && step.goals.length > 0 && (
                          <div>
                            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                              {t("goalsLabel")}
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

        {completedSteps.length === newbieGuideSteps.length && (
          <div className="mt-8 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-6 text-center text-white shadow-lg">
            <h3 className="mb-2 text-2xl font-bold">{t("congratsTitle")}</h3>
            <p className="text-lg">{t("congratsMsg")}</p>
            <p className="mt-2 text-sm">{t("congratsSub")}</p>
          </div>
        )}

        <div className="mt-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("additionalResources")}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/character"
              className="rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-white">{t("characterGuide")}</span>
            </Link>
            <Link
              href="/character_setting"
              className="rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {t("resonanceGuide")}
              </span>
            </Link>
            <Link
              href="/psycube_guide"
              className="rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-white">{t("psycubeGuide")}</span>
            </Link>
            <Link
              href="/euphoria_guide"
              className="rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-white">{t("euphoriaGuideLink")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
