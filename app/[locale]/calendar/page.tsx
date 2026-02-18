import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import React from "react";
import CustomCalendar from "@/components/calendar/Calendar";
import { calendarEvents } from "@/data/calendar_events";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "calendar", {
    path: "/calendar",
    imageUrl: "/infos/link_img/calendar_link_img.webp",
  });
}

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <CustomCalendar events={calendarEvents} />
    </div>
  );
}
