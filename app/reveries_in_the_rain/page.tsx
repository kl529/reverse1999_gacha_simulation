import ReveriesInTheRain from "@/components/reveries_in_the_rain/ReveriesInTheRain";

export default function ReveriesInTheRainPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <ReveriesInTheRain />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 빗속의 공상",
  description: "리버스 1999 빗속의 공상 클리어 가이드",
  icons: {
    icon: "/pwa_icon.webp", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 빗속의 공상",
    description: "리버스 1999 빗속의 공상 클리어 가이드",
    url: "https://www.reverse1999-simulator.com/reveries_in_the_rain",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/reveries_in_the_rain_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 빗속의 공상 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 빗속의 공상",
    description: "리버스 1999 빗속의 공상 클리어 가이드",
    images: [`/infos/link_img/reveries_in_the_rain_link_img.webp`],
  },
};
