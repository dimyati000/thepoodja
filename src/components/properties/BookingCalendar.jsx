"use client";
import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function sameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function BookingCalendar({
  isDark,
  onRangeChange,
  initialCheckIn,
  initialCheckOut,
}) {
  const params = useParams();
  const router = useRouter();

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [checkIn, setCheckIn] = useState(initialCheckIn || null);
  const [checkOut, setCheckOut] = useState(initialCheckOut || null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [promo, setPromo] = useState("");

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
    let newCheckIn = checkIn;
    let newCheckOut = checkOut;

    if (!checkIn || (checkIn && checkOut)) {
      newCheckIn = date;
      newCheckOut = null;
    } else if (date > checkIn) {
      newCheckOut = date;
    } else {
      newCheckIn = date;
      newCheckOut = null;
    }

    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
    onRangeChange?.({ checkIn: newCheckIn, checkOut: newCheckOut });
  };

  const handleBookingRedirect = () => {
    if (!checkIn || !checkOut) return;
    const checkInStr = checkIn.toISOString().split("T")[0];
    const checkOutStr = checkOut.toISOString().split("T")[0];
    router.push(
      `/properties/${params.villaId}/${params.roomId}/booking?checkIn=${checkInStr}&checkOut=${checkOutStr}`,
    );
  };

  const renderMonth = (year, month) => {
    const cells = getMonthMatrix(year, month);
    return (
      <div className="flex-1 min-w-0">
        <p
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="text-center text-sm font-semibold tracking-[0.25em] uppercase mb-5"
        >
          {MONTH_NAMES[month]} {year}
        </p>
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {DAY_LABELS.map((d) => (
            <span
              key={d}
              className={`text-[10px] font-bold tracking-widest uppercase pb-2 ${mutedText}`}
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
              "relative text-xs font-light h-9 flex items-center justify-center transition-colors duration-200 ";

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
                    className="absolute bottom-1 w-1 h-1 rounded-full"
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
      className={`border p-6 sm:p-10 ${isDark ? "bg-[#00102A]/40" : "bg-white"}`}
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 pb-8 border-b"
        style={{ borderColor }}
      >
        <label className="block">
          <span
            className={`text-[10px] font-bold tracking-[0.3em] uppercase block mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            Number of Adults
          </span>
          <input
            type="number"
            min={1}
            value={adults}
            onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
            style={{ borderColor }}
            className={`w-full border px-3 py-2.5 text-sm bg-transparent outline-none ${isDark ? "text-white" : "text-[#011434]"}`}
          />
        </label>
        <label className="block">
          <span
            className={`text-[10px] font-bold tracking-[0.3em] uppercase block mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            Number of Children
          </span>
          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
            style={{ borderColor }}
            className={`w-full border px-3 py-2.5 text-sm bg-transparent outline-none ${isDark ? "text-white" : "text-[#011434]"}`}
          />
        </label>
        <label className="block">
          <span
            className={`text-[10px] font-bold tracking-[0.3em] uppercase block mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            Promo Code
          </span>
          <input
            type="text"
            placeholder="Optional"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            style={{ borderColor }}
            className={`w-full border px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-neutral-500 ${isDark ? "text-white" : "text-[#011434]"}`}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-10 gap-y-3 mb-8">
        <div>
          <span
            className={`text-[10px] font-bold tracking-[0.3em] uppercase block mb-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            Arrival Date
          </span>
          <span style={{ color: accent }} className="text-sm font-medium">
            {checkIn
              ? checkIn.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Select date"}
          </span>
        </div>
        <div>
          <span
            className={`text-[10px] font-bold tracking-[0.3em] uppercase block mb-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            Departure Date
          </span>
          <span style={{ color: accent }} className="text-sm font-medium">
            {checkOut
              ? checkOut.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Select date"}
          </span>
        </div>
        {nightCount > 0 && (
          <span
            className={`text-xs font-light italic ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            {nightCount} {nightCount === 1 ? "night" : "nights"}
          </span>
        )}
      </div>

      <div className="flex items-start gap-3 mb-2">
        <button
          onClick={goPrev}
          aria-label="Previous month"
          className={`shrink-0 w-9 h-9 flex items-center justify-center border bg-transparent cursor-pointer ${isDark ? "border-white/15 text-white hover:bg-white/5" : "border-black/10 text-[#011434] hover:bg-black/5"}`}
        >
          ‹
        </button>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10">
          {renderMonth(viewYear, viewMonth)}
          {renderMonth(nextMonthDate.getFullYear(), nextMonthDate.getMonth())}
        </div>

        <button
          onClick={goNext}
          aria-label="Next month"
          className={`shrink-0 w-9 h-9 flex items-center justify-center border bg-transparent cursor-pointer ${isDark ? "border-white/15 text-white hover:bg-white/5" : "border-black/10 text-[#011434] hover:bg-black/5"}`}
        >
          ›
        </button>
      </div>

      <div
        className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-6 border-t"
        style={{ borderColor }}
      >
        <div className="flex items-center gap-5 text-[10px] tracking-widest uppercase">
          <span className="flex items-center gap-1.5">
            <span
              style={{ backgroundColor: accent }}
              className="w-2 h-2 rounded-full inline-block"
            />
            <span className={mutedText}>Selected</span>
          </span>
        </div>
        <button
          disabled={!checkIn || !checkOut}
          onClick={handleBookingRedirect}
          style={{
            backgroundColor: checkIn && checkOut ? accent : undefined,
            color:
              checkIn && checkOut
                ? isDark
                  ? "#011434"
                  : "#ffffff"
                : undefined,
          }}
          className={`px-10 py-3.5 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 ${
            checkIn && checkOut
              ? "cursor-pointer hover:opacity-90"
              : `cursor-not-allowed ${isDark ? "bg-white/5 text-neutral-500" : "bg-black/5 text-neutral-400"}`
          }`}
        >
          Book
        </button>
      </div>
    </div>
  );
}
