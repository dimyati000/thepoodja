"use client";
import { useState, useMemo } from "react";
import { useSettings } from "@/components/SettingsProvider";
import {
  MONTH_NAMES_ID,
  MONTH_NAMES_EN,
  DAY_LABELS_ID,
  DAY_LABELS_EN,
  getMonthMatrix,
  sameDay,
} from "@/lib/dateUtils";

export function BookingCalendar({ isDark }) {
  const { t, language, checkIn, setCheckIn, checkOut, setCheckOut } =
    useSettings();
  const monthNames = language === "ID" ? MONTH_NAMES_ID : MONTH_NAMES_EN;
  const dayLabels = language === "ID" ? DAY_LABELS_ID : DAY_LABELS_EN;

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const nextMonthDate = new Date(viewYear, viewMonth + 1, 1);
  const accent = isDark ? "#FCD57B" : "#8B6B2E";
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(1,20,52,0.1)";
  const mutedText = isDark ? "text-neutral-500" : "text-neutral-400";

  const goPrev = () => {
    const d = new Date(viewYear, viewMonth - 1, 1);
    if (
      d.getFullYear() < today.getFullYear() ||
      (d.getFullYear() === today.getFullYear() &&
        d.getMonth() < today.getMonth())
    )
      return;
    setViewMonth(d.getMonth());
    setViewYear(d.getFullYear());
  };

  const goNext = () => {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewMonth(d.getMonth());
    setViewYear(d.getFullYear());
  };

  const handleSelect = (date) => {
    if (date < today) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date > checkIn) {
      setCheckOut(date);
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

  const renderMonth = (year, month) => {
    const cells = getMonthMatrix(year, month);
    return (
      <div className="flex-1 min-w-0">
        <p
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="text-center text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          {monthNames[month]} {year}
        </p>
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {dayLabels.map((d) => (
            <span
              key={d}
              className={`text-[9px] font-bold tracking-widest uppercase pb-1.5 ${mutedText}`}
            >
              {d}
            </span>
          ))}
          {cells.map((day, i) => {
            if (!day) return <span key={`empty-${i}`} />;
            const date = new Date(year, month, day);
            const isPast = date < today;
            const isCheckIn = sameDay(date, checkIn);
            const isCheckOut = sameDay(date, checkOut);
            const isInRange =
              checkIn && checkOut && date > checkIn && date < checkOut;
            const isToday = sameDay(date, today);

            let style = {};
            let cls =
              "relative font-numbers text-[11px] font-light h-8 flex items-center justify-center transition-colors duration-200 ";

            if (isPast) {
              cls += `cursor-not-allowed ${mutedText} opacity-40`;
            } else {
              cls += "cursor-pointer ";
              if (isCheckIn || isCheckOut) {
                style = {
                  backgroundColor: accent,
                  color: isDark ? "#011434" : "#ffffff",
                };
                cls += "font-bold";
              } else if (isInRange) {
                style = {
                  backgroundColor: isDark
                    ? "rgba(252,213,123,0.15)"
                    : "rgba(139,107,46,0.1)",
                };
              } else {
                cls += isDark
                  ? "text-neutral-200 hover:bg-white/10"
                  : "text-neutral-700 hover:bg-black/5";
              }
            }

            return (
              <button
                key={day}
                disabled={isPast}
                onClick={() => handleSelect(date)}
                style={style}
                className={cls}
              >
                {day}
                {isToday && !isCheckIn && !isCheckOut && (
                  <span
                    style={{ backgroundColor: accent }}
                    className="absolute bottom-0.5 w-1 h-1 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nightCount =
    checkIn && checkOut
      ? Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      : 0;

  return (
    <div
      style={{ borderColor }}
      className={`border p-5 sm:p-7 ${isDark ? "bg-[#00102A]/40" : "bg-white"}`}
    >
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mb-6">
        <div>
          <span
            className={`text-[9px] font-bold tracking-[0.25em] uppercase block mb-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            {t("calendar.arrival")}
          </span>
          <span
            style={{ color: accent }}
            className="font-numbers text-xs font-medium"
          >
            {checkIn
              ? checkIn.toLocaleDateString(
                  language === "ID" ? "id-ID" : "en-GB",
                  { day: "2-digit", month: "short", year: "numeric" },
                )
              : t("calendar.selectDate")}
          </span>
        </div>
        <div>
          <span
            className={`text-[9px] font-bold tracking-[0.25em] uppercase block mb-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            {t("calendar.departure")}
          </span>
          <span
            style={{ color: accent }}
            className="font-numbers text-xs font-medium"
          >
            {checkOut
              ? checkOut.toLocaleDateString(
                  language === "ID" ? "id-ID" : "en-GB",
                  { day: "2-digit", month: "short", year: "numeric" },
                )
              : t("calendar.selectDate")}
          </span>
        </div>
        {nightCount > 0 && (
          <span
            className={`font-numbers text-[11px] font-light italic ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            {nightCount}{" "}
            {nightCount === 1 ? t("calendar.night") : t("calendar.nights")}
          </span>
        )}
      </div>

      <div className="flex items-start gap-2.5">
        <button
          onClick={goPrev}
          aria-label="Previous month"
          className={`shrink-0 w-7 h-7 flex items-center justify-center border bg-transparent cursor-pointer text-sm ${isDark ? "border-white/15 text-white hover:bg-white/5" : "border-black/10 text-[#011434] hover:bg-black/5"}`}
        >
          ‹
        </button>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderMonth(viewYear, viewMonth)}
          {renderMonth(nextMonthDate.getFullYear(), nextMonthDate.getMonth())}
        </div>

        <button
          onClick={goNext}
          aria-label="Next month"
          className={`shrink-0 w-7 h-7 flex items-center justify-center border bg-transparent cursor-pointer text-sm ${isDark ? "border-white/15 text-white hover:bg-white/5" : "border-black/10 text-[#011434] hover:bg-black/5"}`}
        >
          ›
        </button>
      </div>

      {/* minimum stay */}
      <div
        className="flex items-center gap-4 mt-6 pt-5 border-t text-[9px] tracking-widest uppercase"
        style={{ borderColor }}
      >
        <span className="flex items-center gap-1.5">
          <span
            style={{ backgroundColor: accent }}
            className="w-1.5 h-1.5 rounded-full inline-block"
          />
          <span className={mutedText}>{t("calendar.selected")}</span>
        </span>
        {checkIn && (
          <span
            className={`italic lowercase ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
          >
            * {t("calendar.minStay")}
          </span>
        )}
      </div>
    </div>
  );
}
