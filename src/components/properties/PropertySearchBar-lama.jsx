"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { LOCATIONS, VILLAS_DATA } from "@/constants/villas";
import {
  MONTH_NAMES_ID,
  DAY_LABELS_ID,
  getMonthMatrix,
  sameDay,
} from "@/lib/dateUtils";

const BEDROOM_OPTIONS = Array.from(
  new Set(VILLAS_DATA.flatMap((group) => group.rooms.map((room) => room.beds))),
).sort((a, b) => a - b);

const SELECTABLE_LOCATIONS = LOCATIONS.filter((loc) => loc !== "All Locations");

/* ── helpers ── */
function formatShort(date) {
  if (!date) return null;
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function nightsBetween(a, b) {
  if (!a || !b) return 0;
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

/* ── Single month calendar panel ── */
function CalendarMonth({ year, month, checkIn, checkOut, today, accent, isDark, onSelect, dayLabels, monthName }) {
  const cells = getMonthMatrix(year, month);
  return (
    <div className="flex-1 min-w-0">
      <p
        style={{ fontFamily: "var(--font-cormorant-garamond)", letterSpacing: "0.2em" }}
        className="text-center text-sm font-semibold uppercase mb-4"
      >
        {monthName} {year}
      </p>
      <div className="grid grid-cols-7 mb-2">
        {dayLabels.map((d, i) => (
          <span key={i} className={`text-center text-[9px] font-bold uppercase pb-1 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <span key={`e-${i}`} />;
          const date = new Date(year, month, day);
          const isPast = date < today;
          const isIn = sameDay(date, checkIn);
          const isOut = sameDay(date, checkOut);
          const isRange = checkIn && checkOut && date > checkIn && date < checkOut;
          let style = {};
          let cls = "font-numbers text-xs h-8 w-full flex items-center justify-center transition-colors duration-150 ";
          if (isPast) {
            cls += `opacity-25 cursor-not-allowed ${isDark ? "text-neutral-500" : "text-neutral-400"}`;
          } else if (isIn || isOut) {
            style = { backgroundColor: accent, color: isDark ? "#011434" : "#fff" };
            cls += "font-bold cursor-pointer";
          } else if (isRange) {
            style = { backgroundColor: isDark ? "rgba(252,213,123,0.13)" : "rgba(139,107,46,0.09)" };
            cls += "cursor-pointer";
          } else {
            cls += isDark ? "text-neutral-200 hover:bg-white/10 cursor-pointer" : "text-neutral-700 hover:bg-black/5 cursor-pointer";
          }
          return (
            <button type="button" key={day} disabled={isPast} onClick={() => onSelect(date)} style={style} className={cls}>
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Combined date range field with popup ── */
function DateRangeField({ isDark, compact, checkIn, checkOut, onSelect, onClear, popupDirection = "down" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const nextMonthDate = new Date(viewYear, viewMonth + 1, 1);
  const nextMonth = nextMonthDate.getMonth();
  const nextYear = nextMonthDate.getFullYear();

  const accent = isDark ? "#FCD57B" : "#8B6B2E";
  const borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(1,20,52,0.12)";
  const popupBg = isDark ? "#00102A" : "#ffffff";

  useEffect(() => {
    function outside(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  const goPrev = () => {
    const d = new Date(viewYear, viewMonth - 1, 1);
    if (d.getFullYear() < today.getFullYear() || (d.getFullYear() === today.getFullYear() && d.getMonth() < today.getMonth())) return;
    setViewMonth(d.getMonth()); setViewYear(d.getFullYear());
  };
  const goNext = () => { const d = new Date(viewYear, viewMonth + 1, 1); setViewMonth(d.getMonth()); setViewYear(d.getFullYear()); };

  const nights = nightsBetween(checkIn, checkOut);
  const labelColor = isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]";
  const textColor = isDark ? "#ffffff" : "#011434";
  let displayText = "Pilih tanggal";
  if (checkIn && checkOut) displayText = `${formatShort(checkIn)} → ${formatShort(checkOut)}`;
  else if (checkIn) displayText = `${formatShort(checkIn)} → ...`;

  return (
    <div ref={ref} className="relative h-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full h-full text-left ${compact ? "p-3" : "p-4"}`}
        style={{ background: "transparent", border: "none" }}
      >
        <p style={{ letterSpacing: "0.2em" }} className={`text-[10px] font-bold uppercase mb-1.5 ${labelColor}`}>
          Check In — Check Out
        </p>
        <span style={{ color: checkIn ? textColor : "rgba(128,128,128,0.6)" }} className="text-xs font-light truncate block pr-2">
          {displayText}
          {nights > 0 && <span style={{ color: accent }} className="ml-2 font-medium text-[11px]">{nights} malam</span>}
        </span>
      </button>

      {/* Popup — direction controlled by prop */}
      {open && (
        <div
          style={{
            background: popupBg,
            border: `1px solid ${borderColor}`,
            boxShadow: popupDirection === "up"
              ? (isDark ? "0 -24px 60px rgba(0,0,0,0.7)" : "0 -24px 60px rgba(0,0,0,0.15)")
              : (isDark ? "0 24px 60px rgba(0,0,0,0.7)" : "0 24px 60px rgba(0,0,0,0.15)"),
          }}
          className={`absolute z-50 ${
            popupDirection === "up"
              ? "bottom-full mb-3"
              : "top-full mt-3"
          } left-1/2 -translate-x-1/2 w-[min(700px,94vw)] p-5 sm:p-7`}
        >
          {/* Header: selected dates */}
          <div className="flex items-start gap-6 sm:gap-10 mb-6 pb-5 border-b" style={{ borderColor }}>
            <div>
              <p style={{ letterSpacing: "0.18em", color: isDark ? "rgba(255,255,255,0.4)" : "rgba(1,20,52,0.4)" }} className="text-[9px] font-bold uppercase mb-1">
                Tanggal Kedatangan
              </p>
              <p style={{ color: accent, fontFamily: "var(--font-cormorant-garamond)" }} className="text-lg sm:text-xl font-semibold tracking-wide">
                {checkIn ? formatShort(checkIn) : "—"}
              </p>
            </div>
            <div>
              <p style={{ letterSpacing: "0.18em", color: isDark ? "rgba(255,255,255,0.4)" : "rgba(1,20,52,0.4)" }} className="text-[9px] font-bold uppercase mb-1">
                Tanggal Kepulangan
              </p>
              <p style={{ color: accent, fontFamily: "var(--font-cormorant-garamond)" }} className="text-lg sm:text-xl font-semibold tracking-wide">
                {checkOut ? formatShort(checkOut) : "—"}
              </p>
            </div>
            {nights > 0 && (
              <p className={`self-end ml-auto text-xs font-light ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                {nights} malam
              </p>
            )}
          </div>

          {/* Nav arrows */}
          <div className="flex items-center justify-between mb-5">
            <button type="button" onClick={goPrev} style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(1,20,52,0.55)" }}
              className="w-8 h-8 text-2xl flex items-center justify-center hover:opacity-100 opacity-60 transition-opacity cursor-pointer">‹</button>
            <button type="button" onClick={goNext} style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(1,20,52,0.55)" }}
              className="w-8 h-8 text-2xl flex items-center justify-center hover:opacity-100 opacity-60 transition-opacity cursor-pointer">›</button>
          </div>

          {/* Dual month */}
          <div className="flex gap-6 sm:gap-10">
            <CalendarMonth year={viewYear} month={viewMonth} checkIn={checkIn} checkOut={checkOut} today={today} accent={accent} isDark={isDark} onSelect={onSelect} dayLabels={DAY_LABELS_ID} monthName={MONTH_NAMES_ID[viewMonth]} />
            <div style={{ borderColor }} className="hidden sm:block w-px self-stretch border-l opacity-20" />
            <CalendarMonth year={nextYear} month={nextMonth} checkIn={checkIn} checkOut={checkOut} today={today} accent={accent} isDark={isDark} onSelect={onSelect} dayLabels={DAY_LABELS_ID} monthName={MONTH_NAMES_ID[nextMonth]} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t" style={{ borderColor }}>
            <span style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(1,20,52,0.35)" }} className="flex items-center gap-2 text-[10px]">
              <span style={{ background: accent }} className="inline-block w-2 h-2 rounded-full" />
              Terpilih &nbsp;·&nbsp; <span className="italic">* minimum menginap: 1 malam</span>
            </span>
            <button type="button" onClick={() => { onClear(); setOpen(false); }}
              style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(1,20,52,0.45)" }}
              className="text-[10px] uppercase tracking-widest hover:opacity-100 opacity-70 transition-opacity cursor-pointer">
              Hapus
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main export
══════════════════════════════════════════════ */
export function PropertySearchBar({ isDark, compact = false, popupDirection = "down" }) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [bedroom, setBedroom] = useState("");

  const handleSelect = (date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date); setCheckOut(null);
    } else if (date > checkIn) {
      setCheckOut(date);
    } else {
      setCheckIn(date); setCheckOut(null);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("location", destination);
    if (checkIn) params.set("checkin", checkIn.toISOString().split("T")[0]);
    if (checkOut) params.set("checkout", checkOut.toISOString().split("T")[0]);
    if (bedroom) params.set("bedroom", bedroom);
    router.push(`/properties/all?${params.toString()}`);
  };

  const labelColor = isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]";
  const textColor = isDark ? "#ffffff" : "#011434";
  const dividerClass = isDark ? "divide-white/10" : "divide-black/10";
  const wrapperBg = isDark ? "rgba(1,20,52,0.92)" : "rgba(255,255,255,0.97)";
  const wrapperBorder = isDark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(0,0,0,0.06)";

  return (
    <div
      style={{
        background: wrapperBg,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: wrapperBorder,
      }}
      className={`grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x ${dividerClass} rounded-sm shadow-lg overflow-visible`}
    >
      {/* Destination */}
      <div className={compact ? "p-3" : "p-4"}>
        <p style={{ letterSpacing: "0.2em" }} className={`text-[10px] font-bold uppercase mb-1.5 ${labelColor}`}>
          Destination
        </p>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ color: destination ? textColor : "rgba(128,128,128,0.6)" }}
          className="bg-transparent border-none outline-none text-xs font-light w-full cursor-pointer appearance-none"
        >
          <option value="" className={isDark ? "bg-[#011434]" : "bg-white"}>Select location</option>
          {SELECTABLE_LOCATIONS.map((loc) => (
            <option key={loc} value={loc} className={isDark ? "bg-[#011434]" : "bg-white"}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Combined Check In – Check Out (takes 2 cols on md+) */}
      <div className="md:col-span-2 relative overflow-visible">
        <DateRangeField
          isDark={isDark}
          compact={compact}
          checkIn={checkIn}
          checkOut={checkOut}
          onSelect={handleSelect}
          onClear={() => { setCheckIn(null); setCheckOut(null); }}
          popupDirection={popupDirection}
        />
      </div>

      {/* Property Type */}
      <div className={compact ? "p-3" : "p-4"}>
        <p style={{ letterSpacing: "0.2em" }} className={`text-[10px] font-bold uppercase mb-1.5 ${labelColor}`}>
          Property Type
        </p>
        <select
          value={bedroom}
          onChange={(e) => setBedroom(e.target.value)}
          style={{ color: bedroom ? textColor : "rgba(128,128,128,0.6)" }}
          className="bg-transparent border-none outline-none text-xs font-light w-full cursor-pointer appearance-none"
        >
          <option value="" className={isDark ? "bg-[#011434]" : "bg-white"}>Select type</option>
          {BEDROOM_OPTIONS.map((b) => (
            <option key={b} value={b} className={isDark ? "bg-[#011434]" : "bg-white"}>{b} Bedroom{b > 1 ? "s" : ""}</option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        style={{
          background: isDark ? "#FCD57B" : "#8B6B2E",
          color: isDark ? "#011434" : "#ffffff",
          letterSpacing: "0.25em",
        }}
        className={`w-full h-full ${compact ? "py-3 md:py-0" : "py-4 md:py-0"} text-xs sm:text-sm font-bold uppercase transition-all duration-300 hover:brightness-95 active:scale-[0.99] cursor-pointer`}
      >
        Search
      </button>
    </div>
  );
}
