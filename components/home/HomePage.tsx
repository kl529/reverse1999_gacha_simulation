// HomePage.tsx (Refactored with separated components)

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import HomePageSkeleton from "@/components/home/HomePageSkeleton";
import HomeCouponList from "@/components/home/HomeCouponList";
import HomeCurrentPickup from "@/components/home/HomeCurrentPickup";
import CardBox from "@/components/home/CardBox";
import HomeFooter from "@/components/home/HomeFooter";
import { CardItem, isModalCardItem } from "@/lib/types/menuTypes";
import { PLAYGROUND_ITEMS, LIBRARY_ITEMS, GUIDE_ITEMS } from "@/lib/constants/menuItems";
import { checkNewCouponsQuietly } from "@/lib/utils/checkNewCoupons";
import { useModal } from "@/components/etc/ModalProvider";
import { analytics } from "@/lib/posthog";
import { getHomeUrl } from "@/lib/cdn";

// Dynamic imports로 코드 스플리팅
const ConfirmModal = dynamic(() => import("@/components/modals/ConfirmModal"));
const UpdateModal = dynamic(() => import("@/components/modals/UpdateModal"));
const CardInfoModal = dynamic(() => import("@/components/modals/CardInfoModal"));
const ColourfulText = dynamic(() => import("@/components/ui/ColourfulText"));

const bgImages = Array.from({ length: 35 }, (_, i) => getHomeUrl(`poster${i + 1}.webp`));

export default function HomePage() {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [showContributors, setShowContributors] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<CardItem | null>(null);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const { openModal } = useModal();
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const tItems = useTranslations("nav.items");

  const handleItemClick = (item: CardItem) => {
    if (item.modalType) {
      openModal(item.modalType);
    } else {
      setSelectedInfo(item);
      setInfoModalOpen(true);
    }
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * bgImages.length);
    setBgImage(bgImages[random]);

    // 새 쿠폰 체크 (조용하게, 서버에서 간격 제어)
    checkNewCouponsQuietly();

    // 퍼널 분석: 홈페이지 방문 추적
    analytics.funnel.homeVisited();
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
            {t("title")}
          </h2>
          <p className="mb-8 text-black dark:text-white">{t("subtitle")}</p>

          <div className="grid w-full max-w-7xl grid-cols-1 gap-7 px-6 md:px-12 lg:grid-cols-3 lg:px-4">
            <CardBox
              title={tNav("categories.playground")}
              subTitle={t("playgroundSubtitle")}
              items={PLAYGROUND_ITEMS}
            />

            <CardBox
              title={tNav("categories.library")}
              subTitle={t("librarySubtitle")}
              onItemClick={handleItemClick}
              items={LIBRARY_ITEMS}
            />

            <CardBox
              title={tNav("categories.guide")}
              subTitle={t("guideSubtitle")}
              onItemClick={handleItemClick}
              items={GUIDE_ITEMS}
            />
          </div>

          {/* 쿠폰 & 현재 픽업 정보 */}
          <div className="mt-6 grid w-full max-w-7xl grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-4">
            <HomeCouponList />
            <HomeCurrentPickup />
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
            <h2 className="mb-4 text-lg font-bold">{t("policy.title")}</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {t("policy.content1")}
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {t("policy.content2")}
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {t("policy.content3")}
            </p>
          </ConfirmModal>
        )}
        {showSource && (
          <ConfirmModal isOpen={showSource} onClose={() => setShowSource(false)}>
            <h2 className="text-lg font-bold">{t("source.title")}</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              -{" "}
              <Link
                href="https://cafe.naver.com/reverse1999?iframe_url_utf8=%2FArticleRead.nhn%253Farticleid%3D122878%2526where%3Dmain%2526clubid%3D30989886"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.futureInsight")}
              </Link>
              <br />-{" "}
              <Link
                href="https://res1999.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.dataSource")}
              </Link>
              <br />-{" "}
              <Link
                href="https://www.kdocs.cn/l/cd5MWeCl5bKw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.detailInfo")}
              </Link>
              <br />-{" "}
              <Link
                href="https://docs.google.com/spreadsheets/d/1f40thIQMIDUJZj9-HZDVlbr0aZ9GMXvwOirMzhqwLNU/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.krInfoSummary")}
              </Link>
              <br />-{" "}
              <Link
                href="https://sites.google.com/view/apeironcave/home"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.euphoriaInfo")}
              </Link>
              <br />-{" "}
              <Link
                href="https://www.taptap.cn/user/8268254"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.taptapAnalysis")}
              </Link>
              <br />-{" "}
              <Link
                href="https://www.biligame.com/detail/?id=107530&sourceFrom=2000280011"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.bilibiliVideo")}
              </Link>
              <br />-{" "}
              <Link
                href="https://wiki.biligame.com/reverse1999/%E9%A6%96%E9%A1%B5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.bilibiliWiki")}
              </Link>
              <br />-{" "}
              <Link
                href="https://docs.google.com/spreadsheets/d/1e46cecjsIb1LO3Ybb6urlVUZKUk8R7yrgG9yXZS8-Ho/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.tierList")}
              </Link>
              <br />-{" "}
              <Link
                href="https://nga.178.com/thread.php?fid=510389"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.ngaInfo")}
              </Link>
              <br />-{" "}
              <Link
                href="https://docs.google.com/spreadsheets/u/1/d/1Xpd7HKO2CAnsPa40Ho-scMfubGXGKKYaefs0bHkpDpc/htmlview#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.resonanceInfo")}
              </Link>
              <br />-{" "}
              <Link
                href="https://tenor.com/ko/view/vila-r99-reverse-1999-gacha-thumbs-up-gif-2265939147565929775"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.loadingImage")}
              </Link>
              <br />-{" "}
              <Link
                href="https://ko-fi.com/s/84d0588da5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.cursor")}
              </Link>
              <br />-{" "}
              <Link
                href="https://www.reddit.com/user/Jvaevictis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.infographic")}
              </Link>
              <br />-{" "}
              <Link
                href="https://kdocs.cn/l/cd5MWeCl5bKw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("source.dropRate")}
              </Link>
            </p>
          </ConfirmModal>
        )}
        {showContributors && (
          <ConfirmModal isOpen={showContributors} onClose={() => setShowContributors(false)}>
            <h2 className="text-lg font-bold">{t("contributors.title")}</h2>
            <ColourfulText text={t("contributors.content")} />
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
            <h2 className="mb-4 text-lg font-bold text-black dark:text-white">{t("notice.title")}</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-black dark:text-white">
              {t("notice.content")}
            </p>
          </ConfirmModal>
        )}
      </div>
    </div>
  );
}
