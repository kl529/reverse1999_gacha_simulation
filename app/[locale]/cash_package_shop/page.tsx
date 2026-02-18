import CashPackageShop from "@/components/cash_package_shop/CashPackageShop";

export default function CashPackageShopPage() {
  return <CashPackageShop />;
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 현질 패키지 정리",
  description: "리버스 1999 현질 패키지 정보를 모두 확인해보세요.",
  icons: {
    icon: "/pwa_icon.webp", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 현질 패키지 정리",
    description: "리버스 1999 현질 패키지 정보를 모두 확인해보세요!!",
    url: "https://www.reverse1999-simulator.com/cash_package_shop",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/cash_package_shop_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 현질 패키지 정리 페이지 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 현질 패키지 정리",
    description: "리버스 1999 현질 패키지 정보를 모두 확인해보세요!!",
    images: [`/infos/link_img/cash_package_shop_link_img.webp`],
  },
};
