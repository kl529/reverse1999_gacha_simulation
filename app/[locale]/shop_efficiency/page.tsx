import ShopEfficiencyPage from "@/components/shop_efficiency/ShopEfficiencyPage";

export default function ShopEfficiency() {
  return <ShopEfficiencyPage />;
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 상점 효율 정리",
  description: "리버스 1999 상점 효율 정리",
  icons: {
    icon: "/pwa_icon.webp", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 상점 효율 정리",
    description: "리버스 1999 상점 효율 정리",
    url: "https://www.reverse1999-simulator.com/shop_efficiency",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/shop_efficiency_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 상점 효율 정리 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 상점 효율 정리",
    description: "리버스 1999 상점 효율 정리",
    images: [`/infos/link_img/reveries_in_the_rain_link_img.webp`],
  },
};
