"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CashGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="mb-4 mt-8 text-center text-3xl font-bold">현질 가이드 💸</h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        2026.02.10 기준으로 작성되었습니다. <br /> 무조건적인 정답이 아닐수 있으니, 참고만 하시길
        바랍니다.
      </p>

      <Card className="mb-4 p-4">
        <p className="mb-5 leading-relaxed">
          이 글은 과금을 유도하려는 글이 아닙니다. + 어떠한 광고도 받지 않았습니다. ⭐️
          <br />
          적당한 양의 과금은 게임의 재미를 더해주기 때문에, 효율적인 과금에 관심있는 분들을 위한
          글입니다.
        </p>
        <Separator />
        <h2 className="mt-3 text-xl font-semibold">🧸 글을 보면 좋은 분들</h2>
        <ul className="list-disc pl-5">
          <li>리버스 1999 과금을 하려는데, 어떤 방식으로 하면 가장 좋은지 모르는 분들</li>
          <li>과금을 구글 플레이로만 하는 분들</li>
          <li>가성비 있게, 현질하고 게임을 즐기고 싶은 분들</li>
        </ul>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">🧩 리버스 과금 똑똑하게 하기</h2>
        <p className="mb-4 leading-relaxed">
          리버스는 과금 방식이 2가지가 있습니다. <br />
          첫번째는 스토어(구글플레이 / 애플 앱스토어), 두번째는 홈페이지(HAOPLAY)입니다.
        </p>
        <p className="text-red-500 underline">
          최근에는 HAOPLAY 결제와 스토어 결제 둘다 효율이 비슷해져서, 큰 차이가 없습니다. <br />
          그래도 관련 내용을 정리해보려고 합니다.
        </p>
        <p className="mb-4 leading-relaxed">
          ※ 이 방법은 한국 서버기준으로 작성됐습니다. 글로벌 서버 & 중국서버는 안될 수 도 있으니
          주의해주세요. <br />※ 구글플레이에, 많은 포인트를 쌓아두거나 등급이 높으면 상황이
          달라질수도 있습니다. <br />
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">
          1. 리버스 1999 홈페이지 충전 할인 (무조건 10%){" "}
        </h2>
        <p className="mb-4 leading-relaxed">
          정확히는 HAOPLAY 충전입니다. 매달 초 10% 할인 혜택을 1회 제공합니다.
          <br />
          아래 사진과 같이, 매달 공식계정에서, 관련 내용을 공지해줍니다. (매달 리필)
        </p>

        <Image
          src="/infos/cash_guide/cash_guide1.webp"
          alt="HAOPLAY 할인"
          width={800}
          height={400}
          className="mb-4 rounded"
        />
        <p className="mb-2 text-blue-500 underline">
          <Link href="https://i2.haoplay.com/new/index.html?appid=2072023&l=ko" target="_blank">
            충전 사이트 바로가기
          </Link>
        </p>
        <Image
          src="/infos/cash_guide/cash_guide2.webp"
          alt="HAOPLAY 할인 페이지"
          width={800}
          height={400}
          className="mb-2 rounded"
        />
        <p className="mb-2 text-center text-sm text-muted-foreground">할인 여부를 꼭 확인하세요.</p>
        <p className="mb-4 leading-relaxed">
          사이트에 들어갔을때, 할인 기간이라면 위 사진처럼 나오고,{" "}
          <b className="text-red-500">10% 할인</b>을 받을 수 있습니다.
          <br />
          (Eggmoney, Culture Land는 충전 혜택이 사라짐)
        </p>
        <Image
          src="/infos/cash_guide/cash_guide4.webp"
          alt="에그머니 할인"
          width={800}
          height={400}
          className="mb-2 rounded"
        />
        <p className="mb-2 text-center text-sm text-muted-foreground">
          충전을 하면, 패키지 구매시에, 잔액으로 결제 해야 충전 하신 금액이 사용됩니다.
        </p>
        <p className="mb-4 leading-relaxed">
          단점도 존재합니다. <br />
          <b className="text-red-500">
            HAOPLAY 홈페이지에 충전을 해둔 금액은 환불이 되지 않습니다.{" "}
          </b>
          <br />
          그래서 딱맞게 과금을 하는게 아니면 조금씩 남더군요.
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">2. 스토어 기프트카드 할인 (6 ~ ??%)</h2>
        <p className="mb-4 leading-relaxed">
          가끔 구글 스토어에는 기프트 카드 할인 판매를 합니다. <br />
          지x켓, 네x버 등에서{" "}
          <b className="text-red-500">{`'구글 기프트 카드 할인이 비정기적으로 진행'`} 합니다.</b>
          <br />
          일정도 언제할지 모르고, 할인율도 매번 다르니 참고해주세요.
          <br />
          가끔 <b className="text-red-500">6 ~ 9% 정도 할인</b>하고, 특별할때는{" "}
          <b className="text-red-500">10% 이상 할인</b>이 나오니 참고하세요.
          <br />
          타이밍만 잘잡아서 구매하면, 스토어 자체 적립까지 해서 10%를 넘는 효율을 보여주기도 합니다.
          ( 다른 게임도 하시는 분들은 이 방법 추천 )
        </p>
        <Image
          src="/infos/cash_guide/cash_guide7.webp"
          alt="구글 플레이 스토어 결제 화면"
          width={800}
          height={400}
          className="mb-2 rounded"
        />
        <p className="mb-2 text-center text-sm text-muted-foreground">
          스토어에서 패키지를 구매하면, 기프트 카드 잔액으로 결제됩니다.
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">💸 비교</h2>
        <p className="mb-4 leading-relaxed">장단점을 간단히 정리해보자면</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="px-3 py-2 text-left font-semibold"></th>
                <th className="px-3 py-2 text-left font-semibold text-green-600 dark:text-green-400">
                  장점
                </th>
                <th className="px-3 py-2 text-left font-semibold text-red-500">단점</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2 font-semibold">하오플레이 결제</td>
                <td className="px-3 py-2">매달 정기적으로 확정 할인이 가능</td>
                <td className="px-3 py-2">남은 금액 처리가 애매함</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-semibold">스토어 결제</td>
                <td className="px-3 py-2">
                  시기만 맞는다면, 10% 이상의 할인율 + 다른 게임에도 쓸 수 있음
                </td>
                <td className="px-3 py-2">비정기적임</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">🪷 가성비 패키지 정리 (모노로그 기준)</h2>
        <ul className="mb-4 list-disc pl-5">
          <li className="font-bold">1순위 : 월정액 (포효의 달)</li>
          <li className="font-bold">
            2순위 : 골든 클래식(1,500원, 매주 구매 가능), 버전 한정 3,000원, 6,000원 패키지 (버젼별
            전반기, 후반기 1번씩 구매 가능)
          </li>
          <li className="font-bold">
            3순위 : 월간 모집세일(32,000원, 모노로그 10개 + 빗방울 1800개)
          </li>
        </ul>
        <p className="mb-4 text-center">
          <b className="text-red-500">
            PS. 스킨은 현금으로 사는 것을 추천합니다. (80레벨 지원 패키지까지 모두 구매했다면,
            순결의 빗방울 추천)
          </b>
        </p>
        <div className="flex w-full flex-row items-center gap-2">
          <Image
            src="/infos/cash_guide/cash_guide5.webp"
            alt="월정액 패키지"
            width={400}
            height={200}
            className="mb-2 w-1/2 rounded object-contain"
          />
          <Image
            src="/infos/cash_guide/cash_guide6.webp"
            alt="월정액 패키지"
            width={400}
            height={200}
            className="mb-2 w-1/2 rounded object-contain"
          />
        </div>
        <p className="mb-2 text-center text-sm text-muted-foreground">
          3000원, 6000원 패키지는 위와 같은 구성입니다. (이름은 다를 수 있음.)
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">🔗 현질 패키지 보러가기</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          어떤 패키지가 있는지 바로 확인해보세요.
        </p>
        <Button asChild className="w-full">
          <Link href="/cash_package_shop">💰 현질 패키지 상점 바로가기</Link>
        </Button>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">🐌 마무리 하며</h2>
        <p className="mb-4 leading-relaxed">
          이 방법은 많은 유저들이 사용 중이며, 적절한 과금을 통해 게임을 더 재미있게 즐기고 싶으신
          분들께 추천드립니다.
          <br />이 글로 저는 금전적 지원 및 이득을 취하지 않습니다. 순수하게 유저들이 적당한 과금을
          하며 게임을 즐겁게하고, 게임사는 돈을 더 벌면서 더 좋은 게임을 만들 수 있는 환경을 만들고
          싶은 마음입니다.
        </p>
        <p className="mb-4 text-sm italic text-muted-foreground">
          ※ 법적인 문제가 있다면 즉시 삭제하겠습니다. + 궁금한 점이나, 틀린 정보가있다면, 문의
          남겨주세요.
        </p>
      </Card>
    </div>
  );
}
