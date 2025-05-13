"use client";

import { euphoriaList } from "@/data/euphoria";
import { charactersByRarity } from "@/data/characters";
import Image from "next/image";
import Link from "next/link";
import { version } from "@/data/version";

const priorityDescriptions: { [key: number]: string } = {
  1: "대부분 상황에서 좋은 모습을 보이며, 매우 추천됨",
  2: "특정 덱에서 주로 사용되고, 해두면 잘쓰임",
  3: "특정 상황에서 쓰이고, 덱에 따라 채용 가능",
  4: "대부분 상황에서 안하는 것을 추천"
};

function getCharacterById(id: number) {
  for (const rarity in charactersByRarity) {
    const found = charactersByRarity[Number(rarity)].find((c) => c.id === id);
    if (found) return found;
  }
  return null;
}

const groupedByPriority = euphoriaList
  .sort((a, b) => b.priority - a.priority)
  .reduce((acc: { [priority: number]: typeof euphoriaList }, item) => {
    acc[item.priority] = acc[item.priority] || [];
    acc[item.priority].push(item);
    return acc;
  }, {});

export default function EuphoriaGuide() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center mt-8 dark:text-white text-black">
        광상 가이드
      </h1>
      <p className="text-sm text-center text-gray-500 mb-6 dark:text-gray-400">
        광상 추천도는 무조건적인 정답이 아니며, 출시 상황이나 패치에 따라 변동될 수 있습니다. <br />
        v{version} 이후의 정보는 모두 번역본이며, 오역이 있을 수 있습니다.
        순위내의, 캐릭터 순서는 추천도 순이 아니라 임의로 지정한 것입니다. 추천도와 전혀 관련 없습니다.
      </p>

      {Object.entries(groupedByPriority).map(([priority, list]) => (
        <div key={priority} className="mb-10">
          <h2 className="text-2xl font-bold mb-1 text-left text-yellow-600 dark:text-yellow-400">
            ⭐ {priority}순위
          </h2>
          {priorityDescriptions[Number(priority)] && (
            <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">
              {priorityDescriptions[Number(priority)]}
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((item) => {
              const char = getCharacterById(item.character_id);
              if (!char) return null;

              return (
                <Link
                  href={`/euphoria_guide/${item.id}`}
                  key={item.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center gap-1 border dark:border-gray-700 relative hover:shadow-lg transition"
                >
                  <div className="flex flex-col sm:flex-row gap-1 items-center w-full">
                    <div className="flex w-full h-[120px] sm:h-[140px] items-stretch gap-1 overflow-hidden">
                      {/* 캐릭터 이미지 (너비 고정) */}
                      <div className="relative w-[30%] aspect-[2/3] h-full overflow-hidden rounded-lg">
                        <Image
                          src={`/characters/${char.rarity}stars/${char.engName}.png`}
                          alt={char.name}
                          fill
                          className="object-contain object-left"
                        />
                      </div>

                      {/* 광상 이미지 (남은 공간 차지) */}
                      <div className="relative flex-1 aspect-square h-full overflow-hidden rounded-lg">
                        <Image
                          src={`/infos/euphoria/${char.engName.replace(/-/g, "_")}_${item.number}.png`}
                          alt={`${char.name} 광상`}
                          fill
                          className="object-contain object-right"
                        />
                        <div className="absolute bottom-1 right-1 bg-gray-200 dark:bg-gray-700 text-[10px] px-1 py-0.5 rounded shadow text-gray-800 dark:text-gray-100 z-10">
                          v{item.version}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center w-full">
                    <h3 className="text-xl font-semibold mb-1 dark:text-white text-black">{char.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      특징: {item.note}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}