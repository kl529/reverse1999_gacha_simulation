import HomePage from "@/components/home/HomePage";

// 정적 생성 강제 - Edge 요청 줄이기
export const dynamic = 'force-static';
export const revalidate = false; // 완전 정적

export default function Home() {
  return <HomePage />;
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "버틴의 여행가방",
  description: "리버스 1999의 모든 정보를 한눈에 찾아보세요.",
  icons: {
    icon: "/pwa_icon.webp", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "버틴의 여행가방",
    description: "리버스 1999의 모든 정보를 한눈에 찾아보세요.",
    url: "https://www.reverse1999-simulator.com",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/home_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "버틴의 여행가방 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "버틴의 여행가방",
    description: "리버스 1999의 모든 정보를 한눈에 찾아보세요.",
    images: [`/infos/link_img/home_link_img.webp`],
  },
};
