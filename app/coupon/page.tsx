import CouponsPage from "@/components/coupon/CouponsPage";

export default function Coupons() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <CouponsPage />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 쿠폰 목록",
  description: "리버스 1999의 사용 가능한 모든 쿠폰 코드를 확인하세요",
  icons: {
    icon: "/pwa_icon.webp",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "리버스 1999 쿠폰 목록",
    description: "리버스 1999의 사용 가능한 모든 쿠폰 코드를 확인하세요",
    url: "https://www.reverse1999-simulator.com/coupon",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/pwa_icon.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 쿠폰 목록 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 쿠폰 목록",
    description: "리버스 1999의 사용 가능한 모든 쿠폰 코드를 확인하세요",
    images: [`/pwa_icon.webp`],
  },
};
