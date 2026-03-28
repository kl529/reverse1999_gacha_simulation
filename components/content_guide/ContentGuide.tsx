"use client";

import { useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { contentGuideData, CONTENT_CATEGORIES, ContentGuideItem } from "@/data/content_guide";
import { useTranslations } from "next-intl";

const COLOR_MAP: Record<string, { badge: string; text: string }> = {
  purple: {
    badge: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-300",
  },
  orange: {
    badge: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-300",
  },
  blue: {
    badge: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
  },
  green: {
    badge: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
  },
};

function EpisodeList({ items, t }: { items: ContentGuideItem[]; t: ReturnType<typeof useTranslations> }) {
  const [toast, setToast] = useState(false);

  const handleClick = useCallback(() => {
    setToast(true);
    setTimeout(() => setToast(false), 1500);
  }, []);

  const versionMap = new Map<string, ContentGuideItem[]>();
  items.forEach((item) => {
    const arr = versionMap.get(item.versionAdded) || [];
    arr.push(item);
    versionMap.set(item.versionAdded, arr);
  });

  const versions = Array.from(versionMap.entries()).sort(
    (a, b) => parseFloat(a[0]) - parseFloat(b[0])
  );

  return (
    <div className="relative">
      {toast && (
        <div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 rounded-lg bg-gray-800 px-4 py-2 text-sm text-white shadow-lg dark:bg-gray-200 dark:text-gray-900">
          {t("preparingMsg")}
        </div>
      )}
      <Card className="overflow-hidden border border-gray-300">
        <table className="hidden w-full sm:table">
          <thead>
            <tr className="border-b border-gray-200 bg-muted/50 dark:border-gray-700">
              <th className="px-4 py-2.5 text-left text-sm font-semibold">{t("version")}</th>
              <th className="px-4 py-2.5 text-left text-sm font-semibold">{t("episode")}</th>
            </tr>
          </thead>
          <tbody>
            {versions.map(([version, versionItems]) =>
              versionItems.map((item, i) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 last:border-b-0 dark:border-gray-800"
                >
                  {i === 0 && (
                    <td
                      rowSpan={versionItems.length}
                      className="border-r border-gray-100 px-4 py-2.5 align-middle dark:border-gray-800"
                    >
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        v{version}
                      </span>
                    </td>
                  )}
                  <td className="px-4 py-2.5">
                    <button
                      onClick={handleClick}
                      className="group flex w-full items-center justify-between text-left"
                    >
                      <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="divide-y divide-gray-100 dark:divide-gray-800 sm:hidden">
          {versions.map(([version, versionItems]) => (
            <div key={version}>
              <div className="bg-muted/50 px-3 py-2">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  v{version}
                </span>
              </div>
              {versionItems.map((item) => (
                <button
                  key={item.id}
                  onClick={handleClick}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left active:bg-accent"
                >
                  <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function ContentGuide() {
  const t = useTranslations("contentGuide");

  const groupedContent = CONTENT_CATEGORIES.map((category) => ({
    ...category,
    items: Object.values(contentGuideData).filter((item) => item.category === category.id),
  }));

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white p-3 dark:bg-gray-900 dark:text-gray-200 sm:p-4">
      <h1 className="mb-1 mt-6 p-2 text-center text-xl font-bold text-black dark:text-gray-100 sm:mb-2 sm:mt-8 sm:p-3 sm:text-2xl lg:text-3xl">
        {t("title")}
      </h1>
      <p className="mb-5 text-center text-sm text-muted-foreground sm:mb-7 sm:text-base">
        {t("subtitle")}
      </p>

      <section className="w-full max-w-4xl">
        {groupedContent.map((group, index) => {
          const colors = COLOR_MAP[group.color] || COLOR_MAP.blue;
          return (
            <div key={group.id} className="mb-6 sm:mb-8">
              {index > 0 && <Separator className="my-6 sm:my-8" />}
              <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-3">
                <span className="text-xl sm:text-2xl">{group.icon}</span>
                <h2 className="text-lg font-semibold sm:text-xl">{group.name}</h2>
                <span
                  className={`hidden rounded-full px-2 py-0.5 text-xs sm:inline ${colors.badge} ${colors.text}`}
                >
                  {group.description}
                </span>
                {group.id === "episode" && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {t("preparing")}
                  </span>
                )}
              </div>
              {group.id === "episode" ? (
                <EpisodeList items={group.items} t={t} />
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item, itemIndex) => (
                    <Link href={`/content_guide/${item.id}`} key={item.id}>
                      <Card className="h-full transition-colors duration-200 hover:bg-accent active:bg-accent">
                        <div className="flex flex-col gap-1.5 rounded-lg border border-gray-300 p-3 sm:gap-2 sm:p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-muted-foreground">
                              {itemIndex + 1}.
                            </span>
                            <h3 className="text-base font-medium sm:text-lg">{item.name}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                              {item.contentType}
                            </span>
                            {item.subContent && item.subContent.length > 0 && (
                              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                                {t("expansion", { count: item.subContent.length })}
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
