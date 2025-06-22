// HomePage.tsx (shadcn 적용 + 배경색 수정 및 footer 링크 형태 적용)

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useTheme } from "next-themes";
import UpdateModal from "@/components/modals/UpdateModal";
import CardInfoModal from "@/components/modals/CardInfoModal";
import Carousel from "@/components/etc/Carousel";

const bgImages = Array.from({ length: 32 }, (_, i) => `/infos/home/poster${i + 1}.webp`);

export default function HomePage() {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [showContributors, setShowContributors] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<CardItem | null>(null);

  const handleItemClick = (item: CardItem) => {
    setSelectedInfo(item);
    setInfoModalOpen(true);
  };

  const { theme } = useTheme();

  useEffect(() => {
    const random = Math.floor(Math.random() * bgImages.length);
    setBgImage(bgImages[random]);
  }, []);

  if (!bgImage) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 z-10 bg-gray-200/40 dark:bg-black/60" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      <div className="relative z-20 flex min-h-screen flex-col">
        <main className="flex flex-grow flex-col items-center justify-center">
          <h2 className="mb-4 mt-20 text-4xl font-bold text-black dark:text-white lg:mt-0">
            버틴의 여행가방 🧳
          </h2>
          <p className="mb-8 text-black dark:text-white">당신이 폭풍우를 이겨낼 수 있도록..</p>

          <div className="mb-6 block w-full px-10 md:hidden">
            <Carousel />
          </div>

          <div className="grid w-full max-w-7xl grid-cols-1 gap-10 px-10 md:px-20 lg:grid-cols-3 lg:px-6">
            <CardBox
              title="놀이터"
              subTitle="Just for Fun"
              items={[
                {
                  icon: "/infos/menu/gacha_simulator_menu.webp",
                  label: "가챠\n시뮬레이터",
                  href: "/gacha_simulator",
                },
                {
                  icon: "/infos/menu/character_quiz_menu.webp",
                  label: "캐릭터\n퀴즈",
                  href: "/character_quiz",
                },
                { icon: "/infos/menu/bingo_menu.webp", label: "빙고", href: "/bingo" },
              ]}
            />

            <CardBox
              title="도서관"
              subTitle="찾고 싶은 게 있나요?"
              onItemClick={handleItemClick}
              items={[
                {
                  icon: "/infos/menu/material_menu.webp",
                  label: "재료 파밍",
                  title: "재료 파밍표",
                  href: "#",
                  image: "/infos/modal_img/material_sheet.webp",
                  source: "https://bbs.nga.cn/read.php?tid=41840172&rand=968",
                },
                {
                  icon: "/infos/menu/resonance_menu.webp",
                  label: "공명 & 의지",
                  href: "/character_setting",
                },
                { icon: "/infos/menu/skin_menu.webp", label: "스킨 갤러리", href: "/skin" },
                {
                  icon: "/infos/menu/future_insight_menu.webp",
                  label: "미래시 정리",
                  href: "/future_insight",
                },
                {
                  icon: "/infos/menu/recommend_team_menu.webp",
                  label: "추천 조합",
                  href: "/recommend_team",
                },
                {
                  icon: "/infos/menu/blueprint_menu.webp",
                  label: "청사진 모음",
                  href: "/blueprint_setting",
                },
              ]}
            />

            <CardBox
              title="가이드"
              subTitle="당신을 위한 친절한 가이드"
              items={[
                {
                  icon: "/infos/menu/character_menu.webp",
                  label: "캐릭터 가이드",
                  href: "/character",
                },
                {
                  icon: "/infos/menu/path_quiz_menu.webp",
                  label: "오솔길 정답",
                  href: "/path_quiz",
                },
                {
                  icon: "/infos/menu/euphoria_guide_menu.webp",
                  label: "광상 가이드",
                  href: "/euphoria_guide",
                },
                {
                  icon: "/infos/menu/psycube_guide_menu.webp",
                  label: "의지 육성",
                  href: "/psycube_guide",
                },
                {
                  icon: "/infos/menu/cash_guide_menu.webp",
                  label: "현질 가이드",
                  href: "/cash_guide",
                },
              ]}
            />
          </div>

          <div className="mt-6 hidden w-full max-w-7xl px-10 md:block md:px-20 lg:px-6">
            <Carousel />
          </div>
        </main>

        <footer className="mt-5 flex flex-col items-center gap-2 bg-black/30 p-0 text-sm">
          <div className="flex min-h-[2rem] items-center gap-4 text-gray-200">
            <a href="mailto:jiwon803@gmail.com" className="hover:text-blue-400 hover:underline">
              문의
            </a>
            <button
              onClick={() => setShowPolicy(true)}
              className="hover:text-blue-400 hover:underline"
            >
              Policy
            </button>
            <button
              onClick={() => setShowSource(true)}
              className="hover:text-blue-400 hover:underline"
            >
              출처
            </button>
            <button
              onClick={() => setShowContributors(true)}
              className="hover:text-blue-400 hover:underline"
            >
              기여자
            </button>
            <Link
              href="https://buymeacoffee.com/vertin_suitcase"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 hover:underline"
            >
              커피 사주기 ☕️
            </Link>
            <button
              onClick={() => setUpdateModalOpen(true)}
              className="hover:text-blue-400 hover:underline"
            >
              업데이트
            </button>
            <Link
              href="https://github.com/kl529/reverse1999_gacha_simulation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={
                  theme === "dark"
                    ? "/infos/button/github_light.webp"
                    : "/infos/button/github_dark.webp"
                }
                alt="GitHub"
                width={20}
                height={20}
                className="rounded-full"
              />
            </Link>
          </div>
        </footer>

        {showPolicy && (
          <ConfirmModal isOpen={showPolicy} onClose={() => setShowPolicy(false)}>
            <h2 className="mb-4 text-lg font-bold">개인정보 처리방침</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              본 사이트는 사용자의 개인정보를 수집하지 않습니다. 이름, 이메일, 연락처 등 어떠한
              개인정보도 저장하지 않으며, 로그인 없이 자유롭게 이용 가능합니다.
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              일부 설정 정보(예: 퀴즈 진행 현황)는 사용자의 브라우저 로컬 스토리지(Local Storage)에
              저장됩니다. 이 사이트는 Google Analytics를 사용하여 방문자 트래픽을 익명으로 수집하고
              있으며, 광고 ID 등 개인을 식별할 수 있는 정보는 수집되지 않습니다. 외부 링크(예:
              Google Sites, Github Pages)는 각각의 개인정보 처리방침을 따릅니다. 본 사이트는 외부
              사이트의 데이터 수집에 대해 책임지지 않습니다.
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              기타 문의 사항은 jiwon803@gmail.com 으로 연락해 주세요.
            </p>
          </ConfirmModal>
        )}
        {showSource && (
          <ConfirmModal isOpen={showSource} onClose={() => setShowSource(false)}>
            <h2 className="text-lg font-bold">출처</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              -{" "}
              <Link
                href="https://res1999.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                다양한 데이터 출처
              </Link>
              <br />-{" "}
              <Link
                href="https://www.kdocs.cn/l/cd5MWeCl5bKw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                다른 상세 정보
              </Link>
              <br />-{" "}
              <Link
                href="https://docs.google.com/spreadsheets/d/1f40thIQMIDUJZj9-HZDVlbr0aZ9GMXvwOirMzhqwLNU/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                한국 정보 정리
              </Link>
              <br />-{" "}
              <Link
                href="https://sites.google.com/view/apeironcave/home"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                광상 정보
              </Link>
              <br />-{" "}
              <Link
                href="https://www.taptap.cn/user/8268254"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                taptap 분석글(小丸犊几)
              </Link>
              <br />-{" "}
              <Link
                href="https://www.biligame.com/detail/?id=107530&sourceFrom=2000280011"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                동영상 정보(bilibili)
              </Link>
              <br />-{" "}
              <Link
                href="https://wiki.biligame.com/reverse1999/%E9%A6%96%E9%A1%B5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                캐릭터 정보 및 여러 정보 (bilibili wiki)
              </Link>
              <br />-{" "}
              <Link
                href="https://docs.google.com/spreadsheets/d/1e46cecjsIb1LO3Ybb6urlVUZKUk8R7yrgG9yXZS8-Ho/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                티어리스트 및 추천 조합 등 여러 정보 (Reverse: 1999 Tier List)
              </Link>
              <br />-{" "}
              <Link
                href="https://nga.178.com/thread.php?fid=510389"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                중섭정보 (nga)
              </Link>
              <br />-{" "}
              <Link
                href="https://docs.google.com/spreadsheets/u/1/d/1Xpd7HKO2CAnsPa40Ho-scMfubGXGKKYaefs0bHkpDpc/htmlview#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                공명 정보 (An Incredibly Scuffed Page of Recommended Character Resonance Layouts and
                their Corresponding Codes)
              </Link>
              <br />-{" "}
              <Link
                href="https://tenor.com/ko/view/vila-r99-reverse-1999-gacha-thumbs-up-gif-2265939147565929775"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                로딩 이미지
              </Link>
              <br />-{" "}
              <Link
                href="https://ko-fi.com/s/84d0588da5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                마우스 커서
              </Link>
              <br />-{" "}
              <Link
                href="https://www.reddit.com/user/Jvaevictis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                인포그래픽 출처 (reddit)
              </Link>
            </p>
          </ConfirmModal>
        )}
        {showContributors && (
          <ConfirmModal isOpen={showContributors} onClose={() => setShowContributors(false)}>
            <h2 className="text-lg font-bold">도움을 주신 분들</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              - 개발자: Lyva
              <br />- 데이터 정리: 잠쿨
            </p>
          </ConfirmModal>
        )}
        {infoModalOpen && selectedInfo && (
          <CardInfoModal
            isOpen={infoModalOpen}
            onClose={() => setInfoModalOpen(false)}
            title={selectedInfo.title || ""}
            image={selectedInfo.image || ""}
            description={selectedInfo.description || ""}
            source={selectedInfo.source || ""}
          />
        )}
        <UpdateModal isOpen={isUpdateModalOpen} onClose={() => setUpdateModalOpen(false)} />
      </div>
    </div>
  );
}

interface CardItem {
  icon: string;
  label: string;
  href: string;
  title?: string;
  description?: string;
  image?: string;
  source?: string;
}

interface CardBoxProps {
  title: string;
  subTitle: string;
  items: CardItem[];
  onItemClick?: (item: CardItem) => void;
}

interface LinkBoxProps {
  icon: string;
  label: string;
  href: string;
  onClick?: () => void;
}

function CardBox({ title, subTitle, items, onItemClick }: CardBoxProps) {
  const gridColsClass =
    items.length === 2
      ? "grid-cols-2"
      : items.length === 3
        ? "grid-cols-3"
        : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4";

  return (
    <div className="flex w-full flex-col items-center rounded-lg bg-gray-900/60 px-4 py-5 sm:px-6 lg:px-0">
      <h3 className="mb-1 text-center text-xl font-bold">{title}</h3>
      <p className="mb-4 text-center text-sm">{subTitle}</p>
      <div className={`grid ${gridColsClass} h-full w-full items-center justify-center gap-1`}>
        {items.map((item: CardItem, idx: number) => (
          <LinkBox
            key={idx}
            icon={item.icon}
            label={item.label}
            href={item.href}
            onClick={() => item.image && onItemClick?.(item)}
          />
        ))}
      </div>
    </div>
  );
}

function LinkBox({ icon, label, href, onClick }: LinkBoxProps) {
  const isExternal = href.startsWith("http");
  const content = (
    <div className="flex flex-col items-center p-2 transition-transform hover:scale-105">
      <Image src={icon} alt={label} width={48} height={48} className="h-auto w-auto" />
      <span className="whitespace-pre-wrap break-words pt-1 text-center text-sm text-white dark:text-gray-100">
        {label}
      </span>
    </div>
  );

  if (isExternal)
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </Link>
    );
  if (href !== "#")
    return (
      <Link href={href} onClick={onClick}>
        {content}
      </Link>
    );
  return <button onClick={onClick}>{content}</button>;
}
