"use client";

import { psycube_list } from "@/data/psycube_data";
import Image from "next/image";
import Link from "next/link";
import { version } from "@/data/version";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const PRIORITY_KEYS: { [key: number]: string } = {
  1: "priority1",
  2: "priority2",
  3: "priority3",
  4: "priority4",
  5: "priority5",
  6: "priority6",
  99: "priority99",
};

const groupedByPriority = psycube_list
  .filter((item) => item.priority)
  .sort((a, b) => (b.priority || 0) - (a.priority || 0))
  .reduce((acc: { [priority: number]: typeof psycube_list }, item) => {
    if (item.priority) {
      acc[item.priority] = acc[item.priority] || [];
      acc[item.priority].push(item);
    }
    return acc;
  }, {});

const noPriorityList = psycube_list.filter((item) => !item.priority);

export default function PsycubeGuide() {
  const t = useTranslations("psycubeGuide");

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white p-4 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="mb-4 mt-8 p-3 text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
        {t("title")}
      </h1>
      <p className="mb-3 text-center text-sm text-gray-500 dark:text-gray-400">
        {t("disclaimer")} <br />
        {t("orderNote")} <br />
        {t("translationNote", { version })}
        <br />
        <span className="text-red-500">
          {t("suitcaseNote")} <br />
          {t("personalNote")}
        </span>
      </p>

      <div className="w-full space-y-6 px-4">
        {Object.entries(groupedByPriority).map(([priority, list]) => (
          <div key={priority} className="space-y-2">
            <h2 className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {priority === "99"
                ? t("dataLack")
                : priority === "6"
                  ? t("star5Recommend")
                  : t("rank", { n: priority })}
            </h2>
            {PRIORITY_KEYS[Number(priority)] && (
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                {t(PRIORITY_KEYS[Number(priority)])}
              </p>
            )}
            <Separator className="mb-4" />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(92px,1fr))] gap-1">
              {list.map((item) => (
                <Link
                  href={`/psycube_guide/${item.id}`}
                  key={item.id}
                  className="transition hover:shadow-lg"
                >
                  <div className="flex cursor-pointer flex-col items-center rounded border border-gray-400 p-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="relative h-16 w-16">
                      <Image
                        src={`/infos/psycube_img/${item.engName}.webp`}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full rounded object-contain"
                      />
                      <div className="absolute bottom-0 left-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white shadow">
                        {item.type}
                      </div>
                      <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white shadow">
                        v{item.version === "2.75" ? t("collab") : item.version}
                      </div>
                    </div>
                    <div className="w-full truncate text-center text-sm font-bold text-black dark:text-gray-100">
                      {item.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {noPriorityList.length > 0 && (
          <div className="mt-8 space-y-2">
            <h2 className="text-xl font-bold text-gray-600 dark:text-gray-400">
              {t("noPriorityList")}
            </h2>
            <Separator className="mb-4" />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(92px,1fr))] gap-1">
              {noPriorityList.map((item) => (
                <Link
                  href={`/psycube_guide/${item.id}`}
                  key={item.id}
                  className="transition hover:shadow-lg"
                >
                  <div className="flex cursor-pointer flex-col items-center rounded border border-gray-400 p-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="relative h-16 w-16">
                      <Image
                        src={`/infos/psycube_img/${item.engName}.webp`}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full rounded object-contain"
                      />
                      <div className="absolute bottom-0 left-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white shadow">
                        {item.type}
                      </div>
                      <div className="absolute bottom-0 right-0 rounded-sm bg-blue-600 px-1 py-[1px] text-[10px] text-white shadow">
                        v{item.version === "2.75" ? t("collab") : item.version}
                      </div>
                    </div>
                    <div className="w-full truncate text-center text-sm font-bold text-black dark:text-gray-100">
                      {item.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
