"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useDarkMode } from "@/components/etc/DarkModeContext";
import UpdateModal from "@/components/modals/UpdateModal"; // 업데이트 모달
import CardInfoModal from "@/components/modals/CardInfoModal";

const bgImages = [
  "/infos/home/poster1.png",
  "/infos/home/poster2.png",
  "/infos/home/poster3.png",
  "/infos/home/poster4.png",
  "/infos/home/poster5.png",
  "/infos/home/poster6.png",
  "/infos/home/poster7.png",
  "/infos/home/poster8.png",
  "/infos/home/poster9.png",
  "/infos/home/poster10.png",
  "/infos/home/poster11.png",
  "/infos/home/poster12.png",
  "/infos/home/poster13.png",
  "/infos/home/poster14.png",
  "/infos/home/poster15.png",
  "/infos/home/poster16.png",
  "/infos/home/poster17.png",
  "/infos/home/poster18.png",
  "/infos/home/poster19.png",
  "/infos/home/poster20.png",
  "/infos/home/poster21.png",
  "/infos/home/poster22.png",
  "/infos/home/poster23.png",
  "/infos/home/poster24.png",
  "/infos/home/poster25.png",
  "/infos/home/poster26.png",
  "/infos/home/poster27.png",
  "/infos/home/poster28.png",
  "/infos/home/poster29.png",
  "/infos/home/poster30.png",
  "/infos/home/poster31.png",
  "/infos/home/poster32.png"
];

export default function HomePage() {
  
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<{ title: string; description?: string; image: string; source?: string } | null>(null);
  
  const handleItemClick = (item: { title: string; image: string; description: string; source?: string }) => {
    setSelectedInfo(item);
    setInfoModalOpen(true);
  };

  const { darkMode } = useDarkMode();

  useEffect(() => {
    const random = Math.floor(Math.random() * bgImages.length);
    setBgImage(bgImages[random]);
  }, []);

  if (!bgImage) return null; // bgImage가 정해지기 전에는 아무것도 안 보여줌
  
  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-gray-200/40 dark:bg-black/60 pointer-events-none z-10" />

      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* 실제 콘텐츠 */}
      <div className="relative z-20 flex flex-col min-h-screen">
        <main className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-black mt-20 lg:mt-0">버틴의 여행가방 🧳 (Beta)</h2>
          <p className="mb-8 dark:text-white text-black">당신이 폭풍우를 이겨낼 수 있도록..</p>

          {/* 카드 컨테이너 */}
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-10
              max-w-7xl
              w-full
              px-10 md:px-20 lg:px-6 // 여긴 전체 컨테이너 padding
            "
          >
            <CardBox
              title="놀이터"
              subTitle="Just for Fun"
              items={[
                { icon: "/infos/menu/gacha_simulator_menu.png", label: "가챠\n시뮬레이터", href: "/gacha_simulator" },
                { icon: "/infos/menu/character_quiz_menu.png", label: "캐릭터\n퀴즈", href: "/character_quiz" },
                { icon: "/infos/menu/bingo_menu.png", label: "빙고\n(준비중)", href: "#" },
              ]}
            />

            <CardBox
              title="도서관"
              subTitle="찾고 싶은 게 있나요?"
              items={[
                { 
                  icon: "/infos/menu/material_menu.png", 
                  label: "재료 파밍", 
                  href: "#",
                  image: "/infos/modal_img/material_sheet.png",
                  source: "https://bbs.nga.cn/read.php?tid=41840172&rand=968"
                },
                {
                  icon: "/infos/menu/resonance_menu.png",
                  label: "의지 & 공명",
                  href: "/character_setting"
                },
                {
                  icon: "/infos/menu/skin_menu.png",
                  label: "스킨 갤러리",
                  href: "/skin",
                },
                // {
                //   icon: "/infos/menu/path_quiz_menu.png",
                //   label: "오솔길 정답",
                //   href: "/path_quiz",
                // },
                // {
                //   icon: "/infos/menu/future_insight.png",
                //   label: "(준비중)", // 미래시
                //   href: "#",
                // },
                // {
                //   icon: "/infos/menu/goal_menu.png",
                //   label: "파티 조합\n가이드",
                //   href: "",
                // },
              ]}
              onItemClick={handleItemClick}
            />

            <CardBox
              title="기록 & 계산"
              subTitle="손쉽게 기록하고 계산해보세요"
              items={[
                { icon: "/infos/menu/gacha_calculator_menu.png", label: "가챠 관련\n계산기\n(준비중)", href: "#" },
                // { icon: "/infos/menu/gacha_planner_menu.png", label: "가챠\n계획 계산기\n(준비중)", href: "#" },
                { icon: "/infos/menu/my_character_menu.png", label: "내 마도학자\n모아보기\n(준비중)", href: "#" },
                // { icon: "/infos/menu/psychube_calculator_menu.png", label: "의지\n육성 계산기\n(준비중)", href: "#" },
              ]}
            />
          </div>
        </main>

        {/* 하단 푸터 */}
        <footer className="bg-black/30 p-2 text-sm flex flex-col items-center mt-5 gap-2">
          <div className="flex gap-4 text-gray-200 items-center min-h-[2rem]">
            <a
              href="mailto:jiwon803@gmail.com"
              className="inline-flex items-center hover:underline hover:text-blue-400"
            >
              문의
            </a>
            <button
              onClick={() => setShowPolicy(true)}
              className="inline-flex items-center hover:underline hover:text-blue-400"
            >
              Policy
            </button>
            <Link
              href="https://buymeacoffee.com/vertin_suitcase"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:underline hover:text-blue-400"
            >
              커피 사주기 ☕️
            </Link>
            <button onClick={() => setUpdateModalOpen(true)} className="inline-flex items-center hover:underline hover:text-blue-400">
              업데이트
            </button>
            <a
              href="https://github.com/kl529/reverse1999_gacha_simulation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 transition-transform transform hover:scale-110"
            >
              <Image
                src={darkMode ? "/infos/button/github_light.png" : "/infos/button/github_dark.png"}
                alt="GitHub"
                width={20}
                height={20}
                className="rounded-full"
              />
            </a>
          </div>
        </footer>

        {showPolicy && (
          <ConfirmModal
            isOpen={showPolicy}
            onClose={() => setShowPolicy(false)}
            modalClassName="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg max-w-xl w-full relative"
          >
            <button
                onClick={() => setShowPolicy(false)}
                className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <h2 className="text-lg font-bold mb-4">개인정보 처리방침</h2>
              <p className="text-sm whitespace-pre-line leading-relaxed">
                본 사이트는 사용자의 개인정보를 수집하지 않습니다.
                이름, 이메일, 연락처 등 어떠한 개인정보도 저장하지 않으며,
                로그인 없이 자유롭게 이용 가능합니다.
              </p>
              <br />
              <p className="text-sm whitespace-pre-line leading-relaxed">
                일부 설정 정보(예: 퀴즈 진행 현황)는 사용자의 브라우저 로컬 스토리지(Local Storage)에 저장됩니다.

                이 사이트는 Google Analytics를 사용하여 방문자 트래픽을 익명으로 수집하고 있으며, 광고 ID 등 개인을 식별할 수 있는 정보는 수집되지 않습니다.

                외부 링크(예: Google Sites, Github Pages)는 각각의 개인정보 처리방침을 따릅니다.
                본 사이트는 외부 사이트의 데이터 수집에 대해 책임지지 않습니다.
              </p>
              <br />
              <p className="text-sm whitespace-pre-line leading-relaxed">

                기타 문의 사항은 jiwon803@gmail.com 으로 연락해 주세요.
              </p>
          </ConfirmModal>
        )}

        {infoModalOpen && selectedInfo && (
          <CardInfoModal
            isOpen={infoModalOpen}
            onClose={() => setInfoModalOpen(false)}
            title={selectedInfo.title}
            image={selectedInfo.image}
            description={selectedInfo.description || ""}
            source={selectedInfo.source || ""}
          />
        )}

        <UpdateModal isOpen={isUpdateModalOpen} onClose={() => setUpdateModalOpen(false)} />

      </div>
    </div>
  );
}

// -------------------------------------------
// 카드 박스 컴포넌트
// -------------------------------------------
function CardBox({
  title,
  subTitle,
  items,
  onItemClick,
}: {
  title: string;
  subTitle: string;
  items: {
    icon: string;
    label: string;
    href: string;
    image?: string;
    description?: string;
    source?: string;
  }[];
  onItemClick?: (item: { title: string; description: string; image: string; source?: string }) => void;
}) {
  // grid-cols-2 또는 grid-cols-3 결정
  const gridColsClass =
    items.length === 2 ? "grid-cols-2" : items.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4";

  return (
    <div
      className="
        flex flex-col items-center 
        bg-gray-900/60 dark:bg-gray-700/50 
        rounded-lg py-5 w-full
        px-4 sm:px-6 lg:px-0
      "
    >
      <h3 className="text-xl font-bold mb-1 text-center">{title}</h3>
      <p className="text-sm mb-4 text-center">{subTitle}</p>

      <div
        className={`
          grid 
          ${gridColsClass}
          gap-3 w-full justify-center items-center h-full
        `}
      >
        {items.map((item, idx) => (
          <LinkBox
            key={idx}
            icon={item.icon}
            label={item.label}
            href={item.href}
            onClick={() => {
              if (onItemClick && item.image) {
                onItemClick({
                  title: item.label,
                  description: item.description || "",
                  image: item.image,
                  source: item.source || "",
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------
// 개별 LinkBox
// -------------------------------------------
function LinkBox({
  icon,
  label,
  href,
  onClick,
}: {
  icon: string;
  label: string;
  href: string;
  onClick?: () => void;
}) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick} // 있어도 외부 링크 이동됨
        className="
          flex flex-col items-center gap-2 
          min-w-[80px]
          hover:scale-105 transition-transform
          text-center
        "
      >
        <Image src={icon} alt={label} width={48} height={48} />
        <span className="text-sm whitespace-pre-wrap break-words pt-1">{label}</span>
      </Link>
    );
  }

  if (!isExternal && href !== "#") {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="
          flex flex-col items-center gap-2 
          min-w-[80px]
          hover:scale-105 transition-transform
          text-center
        "
      >
        <Image src={icon} alt={label} width={48} height={48} />
        <span className="text-sm whitespace-pre-wrap break-words pt-1">{label}</span>
      </Link>
    );
  }

  // ✅ href === "#"이거나 아무 이동 없는 경우: 설명 모달
  return (
    <button
      onClick={onClick}
      className="
        flex flex-col items-center gap-2 
        min-w-[80px]
        hover:scale-105 transition-transform
        text-center
      "
    >
      <Image src={icon} alt={label} width={48} height={48} />
      <span className="text-sm whitespace-pre-wrap break-words pt-1">{label}</span>
    </button>
  );
}