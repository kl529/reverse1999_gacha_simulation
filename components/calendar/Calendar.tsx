"use client";

import React, { useRef, useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { EventInput, DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { CalendarEvent } from "@/data/calendar_events";
import Image from "next/image";

interface Props {
  events: CalendarEvent[];
}

const CustomCalendar: React.FC<Props> = ({ events }) => {
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

  // 이벤트 변환
  const calendarEventInputs: EventInput[] = useMemo(
    () =>
      events.map((ev) => {
        if (ev.type === "birthday") {
          // 생일 이벤트의 경우
          const [month, day] = ev.date.split("-").map(Number);
          const currentYear = new Date().getFullYear();

          return {
            title: `🎂 ${ev.title}`,
            start: `${currentYear}-${ev.date}`, // 현재 년도로 시작
            backgroundColor: "#43a047",
            borderColor: "#43a047",
            textColor: "#fff",
            display: "block",
            rrule: {
              freq: "yearly",
              dtstart: `${currentYear}-${ev.date}`, // 현재 년도부터 시작
              bymonth: month,
              bymonthday: day,
            },
          };
        } else if (ev.type === "version") {
          // 버전 이벤트의 경우 - 모바일과 데스크톱에서 다르게 표시
          return {
            title: `v${ev.title.match(/\d+\.\d+/)?.[0] || ev.title}`,
            start: ev.date,
            end: ev.end,
            display: isMobile ? "block" : "background",
            backgroundColor: isMobile ? "#9c27b0" : "transparent",
            borderColor: isMobile ? "#9c27b0" : "transparent",
            textColor: "#fff",
            classNames: "version-event",
            extendedProps: {
              version: ev.title.match(/\d+\.\d+/)?.[0] || ev.title,
              isVersion: true,
            },
          };
        } else {
          // 일반 이벤트의 경우 (기존 로직)
          const endDate = ev.end ? new Date(ev.end) : null;
          if (endDate) {
            endDate.setDate(endDate.getDate() + 1);
          }

          return {
            title: ev.title,
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
    [events, isMobile]
  );

  // FullCalendar의 날짜 변경 시 호출
  const handleDatesSet = (arg: DatesSetArg) => {
    // 현재 보여지는 달력의 중간 날짜를 사용
    const viewStart = new Date(arg.start);
    const viewEnd = new Date(arg.end);
    const middleDate = new Date((viewStart.getTime() + viewEnd.getTime()) / 2);
    setCurrentDate(middleDate);
  };

  // 월 이동 함수
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

  // 년월 포맷
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

  function formatDate(val: any): string {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (val instanceof Date) return val.toLocaleDateString();
    if (Array.isArray(val)) return val.join(", ");
    if (typeof val === "number") return new Date(val).toLocaleDateString();
    return String(val);
  }

  // 날짜 셀 렌더링 수정
  const renderDayCell = (info: {
    dayNumberText: string;
    date: Date;
    view: { calendar: { getEvents: () => EventInput[] } };
  }) => {
    if (isMobile) {
      return <div>{info.dayNumberText}</div>;
    }
    // 해당 날짜의 버전 이벤트 찾기
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

  // 이벤트 클릭 시 새 탭 이동
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

  // 이벤트 렌더링 커스터마이즈
  const eventContent = (eventInfo: { event: EventInput & { display?: string; title: string } }) => {
    if (eventInfo.event.display === "chip") {
      // 버전 이벤트의 경우 chip 스타일로 렌더링
      const versionNumber = eventInfo.event.title.match(/\d+\.\d+/)?.[0];
      return (
        <div className="version-chip-container">
          <div className="version-number">v{versionNumber}</div>
        </div>
      );
    }
    // 다른 이벤트는 기본 렌더링 사용
    return <div className="fc-event-main-inner">{eventInfo.event.title}</div>;
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white p-4 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="top-0 z-20 mt-8 p-3 text-center text-2xl font-bold text-black dark:text-gray-100 lg:text-3xl">
        리버스 이벤트 캘린더
      </h1>
      {/* 상단 컨트롤 바 */}
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
        {/* 오늘 버튼 */}
        <button
          onClick={handleToday}
          style={isMobile ? { ...buttonStyle, ...mobileButtonStyle } : buttonStyle}
        >
          오늘
        </button>

        {/* 중앙 년월 컨트롤 */}
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
            {year}년 {month}월
          </div>
          <button onClick={handleNext} style={buttonStyle}>
            &gt;
          </button>
        </div>

        {/* 오늘 버튼의 공간을 맞추기 위한 더미 div */}
        <div style={{ width: isMobile ? 40 : 30, visibility: "hidden" }} />
      </div>

      {/* 캘린더 */}
      <div className="calendar-wrapper" style={{ width: "100%", maxWidth: 900 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
          initialView="dayGridMonth"
          locale="ko"
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
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              minWidth: 280,
              maxWidth: 340,
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: 8 }}>
              {selectedEvent.title}
            </div>
            {/* 이미지 (있으면) */}
            {selectedEvent.img && (
              <Image
                src={selectedEvent.img}
                alt={selectedEvent.title || ""}
                width={300}
                height={200}
                style={{ width: "100%", height: "auto", borderRadius: 8, marginBottom: 12 }}
              />
            )}
            <div style={{ color: "#666", marginBottom: 8 }}>
              {selectedEvent.start && selectedEvent.end
                ? `${formatDate(selectedEvent.start)} ~ ${formatDate(selectedEvent.end)}`
                : selectedEvent.start
                  ? formatDate(selectedEvent.start)
                  : ""}
            </div>
            {/* 설명 (있으면) */}
            {selectedEvent.description && (
              <div style={{ marginBottom: 12 }}>{selectedEvent.description}</div>
            )}
            {/* 이동 버튼 */}
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
                가챠 시뮬레이터로 이동
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
                이동할 링크가 없습니다
              </button>
            )}
            {/* 닫기 버튼 */}
            <button
              style={{
                position: "absolute",
                top: 8,
                right: 12,
                background: "none",
                border: "none",
                fontSize: 20,
                cursor: "pointer",
                color: "#888",
              }}
              onClick={() => setSelectedEvent(null)}
              aria-label="닫기"
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
