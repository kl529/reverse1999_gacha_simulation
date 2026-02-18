import DamageCalculator from "@/components/damage_calculation/DamageCalculator";

export default function DamageCalculationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <DamageCalculator />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 데미지 계산기",
  description: "리버스 1999의 데미지를 정확하게 계산해보세요.",
  icons: {
    icon: "/pwa_icon.webp",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "리버스 1999 데미지 계산기",
    description: "리버스 1999의 데미지를 정확하게 계산해보세요.",
    url: "https://www.reverse1999-simulator.com/damage_calculation",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/home_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 데미지 계산기 페이지 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 데미지 계산기",
    description: "리버스 1999의 데미지를 정확하게 계산해보세요.",
    images: [`/infos/link_img/home_link_img.webp`],
  },
};
