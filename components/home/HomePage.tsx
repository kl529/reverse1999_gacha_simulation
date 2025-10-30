// HomePage.tsx (Refactored with separated components)

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Carousel from "@/components/etc/Carousel";
import HomePageSkeleton from "@/components/home/HomePageSkeleton";
import CardBox from "@/components/home/CardBox";
import HomeFooter from "@/components/home/HomeFooter";
import { CardItem, isModalCardItem } from "@/lib/types/menuTypes";
import { PLAYGROUND_ITEMS, LIBRARY_ITEMS, GUIDE_ITEMS } from "@/lib/constants/menuItems";
import { checkNewCouponsQuietly } from "@/lib/utils/checkNewCoupons";

// Dynamic imports로 코드 스플리팅
const ConfirmModal = dynamic(() => import("@/components/modals/ConfirmModal"));
const UpdateModal = dynamic(() => import("@/components/modals/UpdateModal"));
const CardInfoModal = dynamic(() => import("@/components/modals/CardInfoModal"));
const ColourfulText = dynamic(() => import("@/components/ui/ColourfulText"));

const bgImages = Array.from({ length: 35 }, (_, i) => `/infos/home/poster${i + 1}.webp`);

export default function HomePage() {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [showContributors, setShowContributors] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<CardItem | null>(null);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  const handleItemClick = (item: CardItem) => {
    setSelectedInfo(item);
    setInfoModalOpen(true);
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * bgImages.length);
    setBgImage(bgImages[random]);

    // 새 쿠폰 체크 (조용하게, 서버에서 간격 제어)
    checkNewCouponsQuietly();

    // // 서비스 점검 공지 표시 (localStorage로 하루에 한 번만 표시)
    // const today = new Date().toDateString();
    // const lastShown = localStorage.getItem("noticeShownDate");

    // if (lastShown !== today) {
    //   setShowNoticeModal(true);
    //   localStorage.setItem("noticeShownDate", today);
    // }
  }, []);

  if (!bgImage) return <HomePageSkeleton />;

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* 배경 이미지 */}
      <Image src={bgImage} alt="Background" fill priority quality={85} className="object-cover" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gray-200/40 dark:bg-black/60" />

      <div className="relative z-20 flex min-h-screen flex-col">
        <main className="flex flex-grow flex-col items-center justify-center">
          <h2 className="mb-4 mt-20 text-4xl font-bold text-black dark:text-white lg:mt-0">
            버틴의 여행가방 🧳
          </h2>
          <p className="mb-8 text-black dark:text-white">당신이 폭풍우를 이겨낼 수 있도록..</p>

          <div className="grid w-full max-w-7xl grid-cols-1 gap-7 px-10 md:px-20 lg:grid-cols-3 lg:px-6">
            <CardBox title="놀이터" subTitle="Just for Fun" items={PLAYGROUND_ITEMS} />

            <CardBox
              title="도서관"
              subTitle="찾고 싶은 게 있나요?"
              onItemClick={handleItemClick}
              items={LIBRARY_ITEMS}
            />

            <CardBox title="가이드" subTitle="당신을 위한 친절한 가이드" items={GUIDE_ITEMS} />
          </div>

          {/* 캐러셀 - 모든 화면 크기에서 하단에 표시 */}
          <div className="mt-6 w-full max-w-7xl px-10 md:px-20 lg:px-6">
            <Carousel />
          </div>
        </main>

        <HomeFooter
          onPolicyClick={() => setShowPolicy(true)}
          onSourceClick={() => setShowSource(true)}
          onContributorsClick={() => setShowContributors(true)}
          onUpdateClick={() => setUpdateModalOpen(true)}
        />

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
                href="https://cafe.naver.com/reverse1999?iframe_url_utf8=%2FArticleRead.nhn%253Farticleid%3D122878%2526where%3Dmain%2526clubid%3D30989886"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                미래시 정보 및 많은 캐릭터 검수 (내이름은김융털)
              </Link>
              <br />-{" "}
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
            <ColourfulText text={`- 개발자: Lyva\n- 데이터 정리: 잠쿨`} />
          </ConfirmModal>
        )}
        {infoModalOpen && selectedInfo && isModalCardItem(selectedInfo) && (
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
        {showNoticeModal && (
          <ConfirmModal isOpen={showNoticeModal} onClose={() => setShowNoticeModal(false)}>
            <h2 className="mb-4 text-lg font-bold text-black dark:text-white">📢 공지사항</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-black dark:text-white">
              현재 서비스 점검 중으로 인해 일부 기능 이용에 불편이 있을 수 있습니다.
              <br />
              <br />
              접속이 원활하지 않거나 페이지 로딩이 느린 경우, 잠시 후 다시 시도해 주세요.
              <br />
              <br />
              빠른 시일 내에 정상화될 예정이니 양해 부탁드립니다. 항상 서비스 이용에 감사드립니다.
            </p>
          </ConfirmModal>
        )}
      </div>
    </div>
  );
}
