import PsycubeGuide from "@/components/psycube_guide/PsycubeGuide";

export default function PsycubeGuidePage() {
  return <PsycubeGuide />;
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 의지 육성 가이드",
  description: "리버스 1999 모든 의지 육성 추천 순위를 확인하세요!",
  icons: {
    icon: "/pwa_icon.webp", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 의지 육성 가이드",
    description: "리버스 1999 모든 의지 육성 추천 순위를 확인하세요!",
    url: "https://www.reverse1999-simulator.com/psycube_guide",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/psycube_guide_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 의지 육성 가이드 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 의지 육성 가이드",
    description: "리버스 1999 모든 의지 육성 추천 순위를 확인하세요!",
    images: [`/infos/link_img/psycube_guide_link_img.webp`],
  },
};
