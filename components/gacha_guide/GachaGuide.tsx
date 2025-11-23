"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { version, isIncludedInGachaPool } from "@/data/version";
import { charactersByRarity } from "@/data/characters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { percentRankTable } from "@/data/percent_rank_table";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function GachaGuide() {
  const [pullCount, setPullCount] = useState<string>("");
  const [sixStarCount, setSixStarCount] = useState<string>("");
  const [calculatedRate, setCalculatedRate] = useState<number | null>(null);

  const calculateRate = () => {
    const pulls = parseInt(pullCount);
    const shape = sixStarCount === "0" ? "명함" : `${sixStarCount}형`;

    if (!isNaN(pulls) && shape) {
      if (percentRankTable[pulls] && percentRankTable[pulls][shape] !== undefined) {
        setCalculatedRate(percentRankTable[pulls][shape]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 mt-8 text-center text-2xl font-bold text-black dark:text-white lg:text-3xl">
          가챠 가이드
        </h1>

        <p className="mb-4 whitespace-pre-line text-center text-black dark:text-gray-300">
          리버스의 가챠 시스템과 관련 정보를 정리
        </p>

        {/* 가챠 시스템 설명 섹션 */}
        <Accordion type="single" collapsible className="mb-4 space-y-4">
          <AccordionItem value={`system`} className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <AccordionTrigger className="text-left text-lg font-semibold text-black dark:text-white">
              쉽게 이해하는 가챠 천장 시스템
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 flex flex-col items-center gap-4">
                <p className="whitespace-pre-line text-center text-black dark:text-gray-300">
                  리버스의 가챠는 크게 3개의 종류가 있습니다.
                  <br /> 단독 픽업, 이중 픽업, 한정 픽업
                  <br />각 픽업마다 시스템을 이해해봅시다.
                  <br />
                  이미지 클릭시 크게 볼 수 있습니다.
                </p>
                <p className="whitespace-pre-line text-center text-black dark:text-gray-300">
                  1. 단독 픽업
                </p>
                <Image
                  src="/infos/banner_img/hissabeth_pick_up.webp"
                  alt="단독 픽업"
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <Image
                  src="/infos/gacha_system/single_pick_up_info.webp"
                  alt="단독 픽업"
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <p className="whitespace-pre-line text-black dark:text-gray-300">
                  가장 자주 볼 수 있는 단독 픽업. 필요한 캐릭터가 있으면 뽑기를 추천
                </p>
                <Separator className="my-4 bg-gray-300 dark:bg-gray-700" />
                <p className="whitespace-pre-line text-center text-black dark:text-gray-300">
                  2. 이중 픽업
                </p>
                <Image
                  src="/infos/banner_img/doublepick_flutter_page_barcarola.webp"
                  alt="이중 픽업"
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <Image
                  src="/infos/gacha_system/double_pick_up_info.webp"
                  alt="이중 픽업"
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <p className="whitespace-pre-line text-center text-black dark:text-gray-300">
                  2명의 픽업 캐릭터가 나옴. 두 캐릭터를 모두 필요하고, 둘중 한명을 뽑으면 멈추는
                  것을 추천. <br />
                  운이 없으면, 한명의 픽업 캐릭터는 1000뽑을 해도 못얻을 수도 있음. <br />
                  스택을 공유하지도 않아서, 대부분 상황에서 비추 💸
                </p>
                <Separator className="my-4 bg-gray-300 dark:bg-gray-700" />
                <p className="whitespace-pre-line text-center text-black dark:text-gray-300">
                  3. 한정 픽업
                </p>
                <Image
                  src="/infos/banner_img/lucy_pick_up.webp"
                  alt="한정 픽업"
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <Image
                  src="/infos/gacha_system/limit_pick_up_info.webp"
                  alt="단독 픽업"
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <p className="whitespace-pre-line text-black dark:text-gray-300">
                  한정 버젼에서만 볼 수 있는 한정 픽업. 스택을 공유하지 않지만, 200뽑기를 하면 픽업
                  캐릭터 1명을 보장함
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* 상시 뽑기 캐릭터 섹션 */}
        <Accordion type="single" collapsible className="mb-4 space-y-4">
          <AccordionItem value={`system`} className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <AccordionTrigger className="text-left text-lg font-semibold text-black dark:text-white">
              {version} 버전 상시 6성 캐릭터 목록
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex max-h-[400px] flex-col overflow-y-auto pt-2">
                <p className="mb-2 whitespace-pre-line text-center text-black dark:text-gray-300">
                  클릭시, 세팅으로 이동
                </p>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {charactersByRarity[6]
                    .filter(
                      (char) =>
                        !char.exclude_gacha && isIncludedInGachaPool(char.version, char.immediate_standard)
                    )
                    .map((char) => (
                      <Link
                        key={char.engName}
                        href={`/character_setting/${char.id}`}
                        className="flex items-center justify-between gap-2 rounded border border-gray-300 p-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={`/characters/6stars_small/${char.engName}.webp`}
                            alt={char.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />

                          <p className="text-sm text-gray-800 dark:text-gray-300">{char.name}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* 기댓값 정리 섹션 */}
        <Accordion type="single" collapsible className="mb-4 space-y-4">
          <AccordionItem value={`system`} className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <AccordionTrigger className="text-left text-lg font-semibold text-black dark:text-white">
              6성 기댓값 정리
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div>
                    <p className="font-semibold text-black dark:text-white">6성 캐릭터 1명</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">단일 픽업 기준</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 dark:text-blue-400">기댓값 : 42.4 연차</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">천장값 : 70 연차</p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div>
                    <p className="font-semibold text-black dark:text-white">픽업 6성 캐릭터 명함</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">단일 픽업 기준</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 dark:text-blue-400">기댓값 : 63.6 연차</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">천장값 : 140 연차</p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div>
                    <p className="font-semibold text-black dark:text-white">픽업 6성 캐릭터 풀형</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">단일 픽업 기준</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      기댓값 : 444.9 연차
                    </p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">천장값 : 980 연차</p>
                  </div>
                </div>
                <p className="text-sm text-black dark:text-white">
                  정리 (단독 픽업 기준 & 기댓값) :
                  <br />
                  아무 6성 1명을 뽑는데 필요한 뽑기 갯수는{" "}
                  <span className="font-bold text-blue-600">42.4개</span>
                  가 필요하고, <br />
                  픽업 6성 캐릭터 1명을 뽑는데 필요한 뽑기 갯수는{" "}
                  <span className="font-bold text-blue-600">63.6개</span>가 필요하고, <br />
                  픽업 6성 캐릭터 풀형을 뽑는데 필요한 뽑기 갯수는{" "}
                  <span className="font-bold text-blue-600">444.9개</span>가 필요하다.
                </p>
                <Image
                  src="/infos/gacha_system/gacha_percent_info.webp"
                  alt="6성 기댓값 정리"
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  단독 픽업 확률 기준
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* 확률 계산기 섹션 */}
        <Card className="mb-4 p-6">
          <h2 className="mb-2 text-xl font-bold text-black dark:text-white">백분위 계산기 </h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            본인의 운은 상위 몇%인지 확인해보세요. (단독 픽업 기준)
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Input
                type="number"
                min="1"
                placeholder="뽑기 횟수"
                value={pullCount}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  setPullCount(value.toString());
                }}
                className="flex-1"
              />
              <Select value={sixStarCount} onValueChange={setSixStarCount}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="형상" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 6 }, (_, i) => i).map((number) => (
                    <SelectItem key={number} value={number.toString()}>
                      {number === 0 ? "명함" : `${number}형`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={calculateRate}>계산</Button>
            </div>
            {calculatedRate !== null && (
              <p className="text-center text-lg font-semibold text-black dark:text-white">
                당신의 운은 상위{" "}
                <span className="font-bold text-blue-600">{calculatedRate.toFixed(2)}%</span>
                입니다. 🎉
              </p>
            )}
          </div>
        </Card>

        <Card className="mb-4 p-6">
          <h2 className="mb-2 text-center text-xl font-bold text-black dark:text-white">
            뽑기를 미리 해볼 수 있는, 가챠 시뮬레이터
          </h2>
          <Link href="/gacha_simulator">
            <Button variant="outline" className="w-full">
              가챠 시뮬레이터로 이동
            </Button>
          </Link>
        </Card>

        {/* 이미지 모달 */}
        {/* <div className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full max-w-md">
                가챠 확률표 보기
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <Image
                src="/infos/modal_img/gacha_rates.webp"
                alt="가챠 확률표"
                width={800}
                height={600}
                className="rounded-lg"
              />
            </DialogContent>
          </Dialog>
        </div> */}
      </div>
    </div>
  );
}
