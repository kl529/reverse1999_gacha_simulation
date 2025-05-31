"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export default function CashGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="mb-4 mt-8 text-center text-3xl font-bold">현질 가이드 💸</h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        2025.05.26 기준으로 작성되었습니다. <br /> 무조건적인 정답이 아닐수 있으니, 참고만 하시길
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
          이번에 소개해드릴 방식이자, 좀 더 효율적인 방식은 2번째(HAOPLAY 결제)입니다.
        </p>
        <p className="mb-4 leading-relaxed">
          ※ 이 방법은 한국 서버기준으로 작성됐습니다. 글로벌 서버 & 중국서버는 안될 수 도 있으니
          주의해주세요. <br />※ 구글플레이에, 많은 포인트를 쌓아두거나 등급이 높으면 상황이
          달라질수도 있습니다. <br />
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">1. 리버스 1999 홈페이지 충전 할인</h2>
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
          여기서 우리는 추가 할인을 받으려면,{" "}
          <b className="text-red-500">{`충전 방식에서 'Eggmoney'`}</b>를 선택하면 됩니다.
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">2. 에그머니 할인</h2>
        <Image
          src="/infos/cash_guide/cash_guide3.webp"
          alt="에그머니 구매"
          width={800}
          height={400}
          className="mb-2 rounded"
        />
        <p className="mb-2 text-center text-sm text-muted-foreground">에그머니 판매 사이트들</p>
        <p className="mb-4 leading-relaxed">
          에그머니 할인 받는 방법은 간단합니다. <br />
          구글이나 네이버에, <b className="text-red-500">{`'에그머니 할인'`}</b>을 검색해서 나오는
          사이트들에서 할인받아 구매하면 됩니다.
          <br />
          주로 평소에는 <b className="text-red-500">7 ~ 9% 정도 할인</b>하고, 가끔 지마켓이나
          11번가에서 <b className="text-red-500">10%할인</b>이 나오니 참고하세요.
          <br />
          에그머니가 불법적인 것은 전혀 아니며, 문화상품권과 비슷하다고 생각하시면 됩니다.
          <br />
          계좌이체를 통해 할인을 받는 방식이며, 핀번호를 받는 형식으로 진행됩니다.
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">💸 할인금액 계산</h2>
        <p className="mb-4 leading-relaxed">
          - 119,000원 충전을 HAOPLAY 10% 할인 = 107,100원 에그머니 결제 <br />- 107,100원을 에그머니
          9% 할인 = 약 97,461원 지출
        </p>
        <p>
          119,000원 어치 게임머니를 97,461원으로 구매 =
          <b className="text-red-500"> 약 22,000원 할인!</b>
        </p>
        <p className="mb-4 font-bold leading-relaxed">
          가격별로 할인율은 조금씩 다르지만, 약 15% 이상의 할인율을 매달 챙길 수 있습니다. ⭐️⭐️
        </p>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">👾 이 방법의 단점</h2>
        <p className="mb-4 leading-relaxed">
          장점은 꽤나 높은 할인율로 현질 할 수 있다는 것이지만, 단점도 존재합니다. <br />
          아래 단점을 꼭 인지하고, 본인의 상황에 맞게 현질해주세요.
        </p>
        <ul className="mb-4 list-disc pl-5">
          <li>
            우리가 에그머니를 107,100원을 충전하고 싶으면, 5만원 2개에 1만원 1개까지 3개의 상품권을
            결제해야하고, 딱 맞아 떨어지지 않는다는 단점이 있습니다. (물론 남은 잔액은 다음번에
            사용가능)
          </li>
          <li>HAOPLAY 홈페이지에 충전을 해둔 금액은 환불이 되지 않습니다.</li>
        </ul>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="mb-2 text-2xl font-semibold">🪷 가성비 패키지 정리 (모노로그 기준)</h2>
        <ul className="mb-4 list-disc pl-5">
          <li className="font-bold">1순위 : 월정액</li>
          <li className="font-bold">
            2순위 : 골든 클래식(1,500원, 매주 구매 가능), 버전 한정 3,000원, 6,000원 패키지 (버젼별
            전반기, 후반기 1번씩 구매 가능)
          </li>
          <li className="font-bold">
            3순위 : 월간 모집세일(32,000원, 모노로그 10개 + 빗방울 1800개)
          </li>
        </ul>
        <p className="mb-4 text-center">
          <b className="text-red-500">PS. 스킨은 현금으로 사는게 가장 좋습니다.</b>
        </p>
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
