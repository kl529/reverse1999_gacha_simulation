"use client";

import { psycube_list } from "@/data/psycube_data";
import Image from "next/image";
import Link from "next/link";
import { version } from "@/data/version";
import { Separator } from "@/components/ui/separator";

const priorityDescriptions: { [key: number]: string } = {
  1: "메인딜러의 의지이거나, 증폭 효율이 매우 좋음.",
  2: "범용적으로 사용되거나, 증폭 효율이 나쁘지 않음.",
  3: "특정 캐릭터만 사용하거나, 증폭효율이 애매함.",
  4: "대부분 상황에서 안하는 것을 추천",
  5: "증폭 비추천",
  6: "5성 증폭 추천",
  99: "데이터가 부족하고, 평가가 적음.",
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

// priority가 없는 데이터만 따로 추출
const noPriorityList = psycube_list.filter((item) => !item.priority);

export default function PsycubeGuide() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white p-4 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="mb-4 mt-8 p-3 text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
        의지 육성 가이드
      </h1>
      <p className="mb-3 text-center text-sm text-gray-500 dark:text-gray-400">
        의지 증폭 추천도는 무조건적인 정답이 아니며, 버전에 따라 변동될 수 있습니다. <br />
        순위내의, 의지 증폭 순서는 추천도 순이 아니라 임의로 지정한 것입니다. 추천도와 전혀 관련
        없습니다. <br />
        {version} 이후의 정보는 모두 번역본이며, 오역이 있을 수 있습니다.
        <br />
        <span className="text-red-500">
          반송파 여행가방은 &quot;호기심쟁이&quot; or 아무거나 해도 무방합니다.
        </span>
      </p>

      <div className="w-full space-y-6 px-4">
        {Object.entries(groupedByPriority).map(([priority, list]) => (
          <div key={priority} className="space-y-2">
            <h2 className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {priority === "99"
                ? "데이터 부족"
                : priority === "6"
                  ? "🐧 5성 증폭 추천"
                  : `⭐ ${priority}순위`}
            </h2>
            {priorityDescriptions[Number(priority)] && (
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                {priorityDescriptions[Number(priority)]}
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
                        v{item.version}
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
              5성 의지 목록 (추천 X)
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
                        v{item.version}
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
