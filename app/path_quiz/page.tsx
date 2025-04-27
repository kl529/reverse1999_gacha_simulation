import PathQuiz from "@/components/path_quiz/PathQuiz";
import { version } from "@/data/version";


export default function PathQuizPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <PathQuiz />
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "Reverse:1999 오솔길 정답",
  description: "Reverse:1999 오솔길 정답을 확인해보세요.",
  icons: {
    icon: "/pwa_icon.png", // PWA 아이콘
  },
  manifest: "/manifest.json", // PWA manifest 파일
  openGraph: {
    title: "Reverse:1999 오솔길 정답",
    description: "Reverse:1999 오솔길 정답을 확인해보세요!!",
    url: "https://www.reverse1999-simulator.com/path_quiz",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/path_quiz_link_img.png`,
        width: 1200,
        height: 630,
        alt: "Reverse:1999 오솔길 정답 페이지 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverse:1999 오솔길 정답",
    description: "Reverse:1999 오솔길 정답을 확인해보세요!!",
    images: [`/infos/link_img/path_quiz_link_img.png`],
  },
};