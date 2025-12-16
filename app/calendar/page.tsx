import React from "react";
import CustomCalendar from "@/components/calendar/Calendar";
import { calendarEvents } from "@/data/calendar_events";

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <CustomCalendar events={calendarEvents} />
    </div>
  );
}
export const metadata = {
  metadataBase: new URL("https://www.reverse1999-simulator.com"),
  title: "리버스 1999 캘린더",
  description: "리버스 1999의 월별 이벤트 및 픽업 일정을 한눈에 확인하세요.",
  icons: {
    icon: "/pwa_icon.webp",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "리버스 1999 캘린더",
    description: "리버스 1999의 월별 이벤트 및 픽업 일정을 한눈에 확인하세요.",
    url: "https://www.reverse1999-simulator.com/calendar",
    siteName: "버틴의 여행가방",
    images: [
      {
        url: `/infos/link_img/calendar_link_img.webp`,
        width: 1200,
        height: 630,
        alt: "리버스 1999 캘린더 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리버스 1999 캘린더",
    description: "리버스 1999의 월별 이벤트 및 픽업 일정을 한눈에 확인하세요.",
    images: [`/infos/link_img/blueprint_link_img.webp`],
  },
};
