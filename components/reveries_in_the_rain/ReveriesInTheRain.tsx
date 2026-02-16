"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { reveriesInTheRain } from "@/data/reveries_in_the_rain";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ReveriesInTheRain() {
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  // floor_type별로 데이터 그룹화
  const groupedFloors = Object.values(reveriesInTheRain).reduce(
    (acc, floor) => {
      const type = floor.floor_type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(floor);
      return acc;
    },
    {} as Record<string, (typeof reveriesInTheRain)[keyof typeof reveriesInTheRain][]>
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white p-4 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="mb-4 mt-8 p-3 text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
        빗속의 공상 공략
      </h1>
      <Card className="mb-8 w-full max-w-4xl rounded-lg border border-gray-300 p-6">
        <Collapsible open={isIntroOpen} onOpenChange={setIsIntroOpen}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">빗속의 공상 소개</h2>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isIntroOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="mt-4 space-y-4">
              <p className="text-lg">
                빗속의 공상은 리버스 1999의 최종 컨텐츠이며, 상시컨텐츠로 언제든지 즐길 수 있습니다.
                <br />
                매주 재화를 얻을 수 있는 &ldquo;생각 탐색&rdquo;은 200m 클리어하면 최대보상을 얻을
                수 있기에, 첫 목표는 200m가 적당합니다.
                <br />
                빗속의 공상을 통해 광상 재료를 얻을 수 있고,{" "}
                <span className="text-red-500">기믹을 이해하고 클리어하는게 중요합니다.</span>
              </p>
              <Image
                src="/infos/reveries_in_the_rain/explanation.webp"
                alt="빗속의 공상"
                width={1000}
                height={1000}
              />
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-semibold">메아리의 섬</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>빗속의 공상 전용, &lsquo;생각의 원형&rsquo;을 강화하는 컨텐츠</li>
                  <li>보스별로 10개의 스테이지 존재하고, 클리어할때마다 1단계씩 강화</li>
                  <li>보스별로 효과가 다르고, 매우 강력하므로 꼭 해야함</li>
                  <li>
                    보스별 메아리 섬 찍는 공략 →{" "}
                    <Link href="/blueprint_setting" className="text-blue-500">
                      메아리 섬 공략 링크
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-semibold">전복된 배</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>2주 마다 초기화</li>
                  <li>3개의 덱 필요 + 난이도 조절 가능</li>
                  <li>최대 보상을 위해서는 80,000점만 있으면 됨.</li>
                </ul>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-semibold">생각의 바다</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>메인 컨텐츠이며, 잠수하는 설정으로, 깊어질수록 난이도가 올라감</li>
                  <li>층별로 기믹을 이해하고, 파훼하는 것이 중요하고, 공략은 아래 컨텐츠를 참고</li>
                  <li>100m ~ 350m는 3개의 덱이 필요 + 400m 부터는 4개의 덱이 필요 + 500m 부터는 4개의 덱이 필요</li>
                </ul>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <section className="w-full">
        <h2 className="mb-3 text-center text-2xl font-semibold">층별 상세 공략</h2>
        <p className="mb-4 text-center text-lg">
          여러분의 클리어 정보를 공유해주세요. 클리어 기록을 사이트에 등록하고, 여러 사람들과
          공유하세요. ➡️{" "}
          <Link href="https://forms.gle/dCW1YmEfv4NYAPqk7" className="text-blue-500">
            클리어 기록 등록 링크
          </Link>
        </p>
        {Object.entries(groupedFloors).map(([type, floors], index: number) => (
          <div key={type} className="mb-8">
            {index > 0 && <Separator className="my-8" />}
            <h3 className="mb-4 text-xl font-semibold">{type}</h3>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {floors.map((floor) => {
                const floorNum = parseInt(floor.id.replace(/[^0-9]/g, ""));
                const isComingSoon = floorNum > 400;

                if (isComingSoon) {
                  return (
                    <Card
                      key={floor.id}
                      className="cursor-not-allowed opacity-60"
                      onClick={() => alert("준비중입니다.")}
                    >
                      <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-gray-300">
                        <h3 className="text-lg font-medium">{floor.id}</h3>
                        <span className="text-xs text-muted-foreground">준비중</span>
                      </div>
                    </Card>
                  );
                }

                return (
                  <Link href={`/reveries_in_the_rain/${floor.id}`} key={floor.id}>
                    <Card className="transition-colors duration-200 hover:bg-accent">
                      <div className="flex h-24 items-center justify-center rounded-lg border border-gray-300">
                        <h3 className="text-lg font-medium">{floor.id}</h3>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
