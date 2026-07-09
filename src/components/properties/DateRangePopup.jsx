"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useSettings } from "@/components/SettingsProvider";
import {
  MONTH_NAMES_ID,
  MONTH_NAMES_EN,
  DAY_LABELS_ID,
  DAY_LABELS_EN,
  getMonthMatrix,
  sameDay,
  formatDateLabel,
} from "@/lib/dateUtils";
import { Icon } from "@/components/Icon";

export function DateRangePopup({ isDark }) {
  const { t, language, checkIn, setCheckIn, checkOut, setCheckOut } =
    useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const monthNames = language === "ID" ? MONTH_NAMES_ID : MONTH_NAMES_EN;
  const dayLabels = language === "ID" ? DAY_LABELS_ID : DAY_LABELS_EN;
  const accent = isDark ? "#FCD57B" : "#8B6B2E";
  const borderColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(1,20,52,0.15)";

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (date) => {
    if (date < today) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date > checkIn) {
      setCheckOut(date);
      setOpen(false);
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

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

  const cells = getMonthMatrix(viewYear, viewMonth);

  return (
    <div ref={ref} className="relative grid grid-cols-2 gap-3 w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ borderColor }}
        className={`text-left border px-3 py-2.5 ${isDark ? "text-white" : "text-[#011434]"}`}
      >
        <span
          className={`block text-[9px] font-bold tracking-widest uppercase mb-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
        >
          {t("calendar.checkInLabel")}
        </span>
        <span className="flex items-center justify-between text-xs gap-1 font-numbers">
          {checkIn
            ? formatDateLabel(checkIn, language)
            : t("calendar.selectDate")}
          <Icon
            name="chevronRight"
            size={12}
            className={
              isDark
                ? "text-neutral-500 rotate-90"
                : "text-neutral-400 rotate-90"
            }
          />
        </span>
      </button>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ borderColor }}
        className={`text-left border px-3 py-2.5 ${isDark ? "text-white" : "text-[#011434]"}`}
      >
        <span
          className={`block text-[9px] font-bold tracking-widest uppercase mb-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
        >
          {t("calendar.checkOutLabel")}
        </span>
        <span className="flex items-center justify-between text-xs gap-1 font-numbers">
          {checkOut
            ? formatDateLabel(checkOut, language)
            : t("calendar.selectDate")}
          <Icon
            name="chevronRight"
            size={12}
            className={
              isDark
                ? "text-neutral-500 rotate-90"
                : "text-neutral-400 rotate-90"
            }
          />
        </span>
      </button>

      {open && (
        <div
          style={{ borderColor }}
          className={`absolute z-20 top-full left-0 mt-2 w-full border p-4 shadow-lg ${isDark ? "bg-[#00102A]" : "bg-white"}`}
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={goPrev}
              className="w-6 h-6 text-sm cursor-pointer"
            >
              ‹
            </button>
            <p
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              className="text-xs font-semibold tracking-[0.2em] uppercase"
            >
              {monthNames[viewMonth]} {viewYear}
            </p>
            <button
              type="button"
              onClick={goNext}
              className="w-6 h-6 text-sm cursor-pointer"
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {dayLabels.map((d, i) => (
              <span
                key={i}
                className={`text-[9px] font-bold uppercase pb-1 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
              >
                {d}
              </span>
            ))}
            {cells.map((day, i) => {
              if (!day) return <span key={`e-${i}`} />;
              const date = new Date(viewYear, viewMonth, day);
              const isPast = date < today;
              const isCheckIn = sameDay(date, checkIn);
              const isCheckOut = sameDay(date, checkOut);
              const isInRange =
                checkIn && checkOut && date > checkIn && date < checkOut;

              let style = {};
              let cls =
                "font-numbers text-[11px] h-7 flex items-center justify-center ";
              if (isPast) {
                cls += `cursor-not-allowed opacity-30 ${isDark ? "text-neutral-500" : "text-neutral-400"}`;
              } else {
                cls += "cursor-pointer ";
                if (isCheckIn || isCheckOut) {
                  style = {
                    backgroundColor: accent,
                    color: isDark ? "#011434" : "#fff",
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
                  type="button"
                  key={day}
                  disabled={isPast}
                  onClick={() => handleSelect(date)}
                  style={style}
                  className={cls}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <p
            className={`text-[10px] italic mt-3 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
          >
            * {t("calendar.minStay")}
          </p>
        </div>
      )}
    </div>
  );
}
