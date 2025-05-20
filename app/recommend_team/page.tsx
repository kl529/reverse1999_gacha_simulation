import RecommendTeam from "@/components/recommend_team/RecommendTeam";

export default function PathQuizPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <RecommendTeam />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 추천 조합 정리",
  description: "리버스 1999 모든 추천 조합를 확인해보세요.",
  icons: {
    icon: "/pwa_icon.png", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "리버스 1999 추천 조합 정리",
    description: "리버스 1999 모든 추천 조합를 확인해보세요!!",
    url: "https://www.reverse1999-simulator.com/recommend_team",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/recommend_team_link_img.png`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 추천 조합 정리 페이지 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 추천 조합 정리",
    description: "리버스 1999 모든 추천 조합를 확인해보세요!!",
    images: [`/infos/link_img/recommend_team_link_img.png`],
  },
};
