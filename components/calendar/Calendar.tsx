"use client";

import React, { useRef, useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { EventInput, DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { CalendarEvent } from "@/data/calendar_events";
import { getCharacterById } from "@/data/characters";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

interface Props {
  events: CalendarEvent[];
}

const CustomCalendar: React.FC<Props> = ({ events }) => {
  const t = useTranslations("calendar");
  const locale = useLocale();
  const calendarRef = useRef<FullCalendar>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<null | EventInput>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calendarEventInputs: EventInput[] = useMemo(
    () =>
      events.map((ev) => {
        if (ev.type === "birthday") {
          const [month, day] = ev.date.split("-").map(Number);
          const currentYear = new Date().getFullYear();

          const characterName = ev.character_id
            ? getCharacterById(ev.character_id)?.name || ev.title || "Unknown"
            : ev.title || "Unknown";

          return {
            title: t("birthday", { name: characterName }),
            start: `${currentYear}-${ev.date}`,
            backgroundColor: "#43a047",
            borderColor: "#43a047",
            textColor: "#fff",
            display: "block",
            rrule: {
              freq: "yearly",
              dtstart: `${currentYear}-${ev.date}`,
              bymonth: month,
              bymonthday: day,
            },
          };
        } else if (ev.type === "version") {
          const versionTitle = ev.title || "";
          return {
            title: `v${versionTitle.match(/\d+\.\d+/)?.[0] || versionTitle}`,
            start: ev.date,
            end: ev.end,
            display: isMobile ? "block" : "background",
            backgroundColor: isMobile ? "#9c27b0" : "transparent",
            borderColor: isMobile ? "#9c27b0" : "transparent",
            textColor: "#fff",
            classNames: "version-event",
            extendedProps: {
              version: versionTitle.match(/\d+\.\d+/)?.[0] || versionTitle,
              isVersion: true,
            },
          };
        } else {
          const endDate = ev.end ? new Date(ev.end) : null;
          if (endDate) {
            endDate.setDate(endDate.getDate() + 1);
          }

          return {
            title: ev.title || "",
            start: ev.date,
            end: endDate?.toISOString().split("T")[0] || ev.end,
            url: ev.type === "pickup" ? "/gacha_simulator" : ev.link,
            backgroundColor: ev.type === "pickup" ? "#1976d2" : "#43a047",
            borderColor: ev.type === "pickup" ? "#1976d2" : "#43a047",
            textColor: "#fff",
            display: "block",
            extendedProps: {
              img: ev.img,
            },
          };
        }
      }),
    [events, isMobile, t]
  );

  const handleDatesSet = (arg: DatesSetArg) => {
    const viewStart = new Date(arg.start);
    const viewEnd = new Date(arg.end);
    const middleDate = new Date((viewStart.getTime() + viewEnd.getTime()) / 2);
    setCurrentDate(middleDate);
  };

  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
  };
  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
  };
  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.today();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const buttonStyle: React.CSSProperties = {
    padding: "6px 12px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "none",
    background: "#1976d2",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    minWidth: 30,
    whiteSpace: "nowrap",
  };

  const mobileButtonStyle: React.CSSProperties = {
    padding: "4px 8px",
    fontSize: "0.9rem",
    minWidth: 40,
  };

  function formatDate(
    val: Date | string | number | string[] | number[] | null | undefined
  ): string {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (val instanceof Date) return val.toLocaleDateString();
    if (Array.isArray(val)) return val.map((v) => String(v)).join(", ");
    if (typeof val === "number") return new Date(val).toLocaleDateString();
    return String(val);
  }

  const renderDayCell = (info: {
    dayNumberText: string;
    date: Date;
    view: { calendar: { getEvents: () => EventInput[] } };
  }) => {
    if (isMobile) {
      return <div>{info.dayNumberText}</div>;
    }
    const versionEvents = info.view.calendar.getEvents().filter((event: EventInput) => {
      if (!event.start || event.display !== "background") return false;
      const eventStart = event.start instanceof Date ? event.start : new Date(String(event.start));
      const eventEnd = event.end
        ? event.end instanceof Date
          ? event.end
          : new Date(String(event.end))
        : null;
      return eventStart <= info.date && (!eventEnd || eventEnd > info.date);
    });

    return (
      <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
        {versionEvents.map(
          (event: EventInput & { extendedProps?: { version?: string } }, index: number) => (
            <div
              key={index}
              className="version-tag"
              style={{
                position: "absolute",
                left: "-2px",
                fontSize: "0.7rem",
                padding: "1px 4px",
                borderRadius: "4px",
                backgroundColor: "#9c27b0",
                color: "white",
                transform: "translateX(-100%)",
                whiteSpace: "nowrap",
                zIndex: 1,
              }}
            >
              v{event.extendedProps?.version}
            </div>
          )
        )}
        <div>{info.dayNumberText}</div>
      </div>
    );
  };

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
    setSelectedEvent({
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      url: info.event.url,
      img: info.event.extendedProps?.img,
      description: info.event.extendedProps?.description,
    });
  };

  const eventContent = (eventInfo: { event: EventInput & { display?: string; title: string } }) => {
    if (eventInfo.event.display === "chip") {
      const versionNumber = eventInfo.event.title.match(/\d+\.\d+/)?.[0];
      return (
        <div className="version-chip-container">
          <div className="version-number">v{versionNumber}</div>
        </div>
      );
    }
    return <div className="fc-event-main-inner">{eventInfo.event.title}</div>;
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white p-4 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="top-0 z-20 mt-8 p-3 text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
        {t("title")}
      </h1>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          marginBottom: "16px",
          minHeight: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleToday}
          style={isMobile ? { ...buttonStyle, ...mobileButtonStyle } : buttonStyle}
        >
          {t("today")}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 auto" }}>
          <button onClick={handlePrev} style={buttonStyle}>
            &lt;
          </button>
          <div
            style={{
              minWidth: 120,
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: "0 8px",
              whiteSpace: "nowrap",
            }}
          >
            {t("yearMonth", { year, month })}
          </div>
          <button onClick={handleNext} style={buttonStyle}>
            &gt;
          </button>
        </div>

        <div style={{ width: isMobile ? 40 : 30, visibility: "hidden" }} />
      </div>

      <div className="calendar-wrapper" style={{ width: "100%", maxWidth: 900 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
          initialView="dayGridMonth"
          locale={locale}
          events={calendarEventInputs}
          dayCellContent={renderDayCell}
          eventContent={eventContent}
          eventClick={handleEventClick}
          height={isMobile ? "auto" : "calc(100vh - 200px)"}
          headerToolbar={false}
          datesSet={handleDatesSet}
        />
      </div>
      <style jsx global>{`
        .calendar-wrapper :global(.fc) {
          font-size: 1.1rem;
        }

        /* 버전 이벤트의 fc-event-main-inner 숨기기 (데스크톱에서만) */
        @media (min-width: 601px) {
          .version-event .fc-event-main-inner {
            display: none;
          }
        }

        /* 버전 chip 스타일링 */
        .version-chip-container {
          position: absolute;
          right: 2px;
          top: 2px;
        }

        .version-number {
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: 12px;
          background-color: #9c27b0;
          color: white;
          white-space: nowrap;
          display: inline-block;
          line-height: 1;
        }

        /* 버전 이벤트의 기본 스타일 제거 */
        .version-chip {
          background: none !important;
          border: none !important;
        }

        /* 버전 이벤트 스타일 수정 */
        .version-event {
          pointer-events: none;
        }

        @media (max-width: 600px) {
          .calendar-wrapper {
            max-width: 100vw;
            overflow-x: auto;
          }
          .calendar-wrapper :global(.fc) {
            font-size: 0.9rem;
          }
          .version-number {
            font-size: 0.7rem;
            padding: 1px 4px;
          }
          .version-tag {
            font-size: 0.6rem !important;
            padding: 0px 2px !important;
          }
          /* 모바일에서 이벤트 높이 조정 */
          .calendar-wrapper :global(.fc-daygrid-event) {
            min-height: 1.5em;
            padding: 2px 4px;
          }
          /* 모바일에서 날짜 셀 높이 조정 */
          .calendar-wrapper :global(.fc-daygrid-day-frame) {
            min-height: 5em;
          }
        }
      `}</style>

      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            style={{
              borderRadius: 12,
              padding: 24,
              minWidth: 280,
              maxWidth: 340,
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              position: "relative",
            }}
            className="bg-white dark:bg-gray-800 dark:text-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: 8 }}>
              {selectedEvent.title}
            </div>
            {selectedEvent.img && (
              <Image
                src={selectedEvent.img}
                alt={selectedEvent.title || ""}
                width={300}
                height={200}
                style={{ width: "100%", height: "auto", borderRadius: 8, marginBottom: 12 }}
              />
            )}
            <div className="text-gray-500 dark:text-gray-400" style={{ marginBottom: 8 }}>
              {selectedEvent.start && selectedEvent.end
                ? `${formatDate(selectedEvent.start)} ~ ${formatDate(
                    new Date(new Date(selectedEvent.end as string).getTime() - 24 * 60 * 60 * 1000)
                  )}`
                : selectedEvent.start
                  ? formatDate(selectedEvent.start)
                  : ""}
            </div>
            {selectedEvent.description && (
              <div style={{ marginBottom: 12 }}>{selectedEvent.description}</div>
            )}
            {selectedEvent.url ? (
              <button
                style={{
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={() => {
                  window.open(selectedEvent.url, "_blank");
                  setSelectedEvent(null);
                }}
              >
                {t("goToGacha")}
              </button>
            ) : (
              <button
                style={{
                  background: "#aaa",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 20px",
                  fontWeight: "bold",
                  width: "100%",
                  cursor: "not-allowed",
                  opacity: 0.7,
                }}
                disabled
              >
                {t("noLink")}
              </button>
            )}
            <button
              style={{
                position: "absolute",
                top: 8,
                right: 12,
                background: "none",
                border: "none",
                fontSize: 20,
                cursor: "pointer",
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setSelectedEvent(null)}
              aria-label={t("close")}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
