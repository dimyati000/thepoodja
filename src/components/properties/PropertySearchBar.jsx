"use client";
import { useState, useRef, useEffect, useId, useMemo } from "react";
import { useRouter } from "next/navigation";
import { LOCATIONS, VILLAS_DATA } from "@/constants/villas";
import { Icon } from "@/components/Icon";
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

/* Custom select so the dropdown follows the search bar theme on every OS. */
function SearchSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  isDark,
  compact,
  popupDirection = "down",
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const listboxId = useId();

  const items = useMemo(
    () => [{ value: "", label: placeholder }, ...options],
    [options, placeholder],
  );
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => String(item.value) === String(value)),
  );
  const selectedItem = items[selectedIndex];
  const accent = isDark ? "#FCD57B" : "#8B6B2E";
  const textColor = isDark ? "#ffffff" : "#011434";
  const mutedColor = isDark
    ? "rgba(255,255,255,0.42)"
    : "rgba(1,20,52,0.42)";
  const popupBg = isDark ? "#061831" : "#ffffff";
  const borderColor = isDark
    ? "rgba(252,213,123,0.28)"
    : "rgba(139,107,46,0.22)";

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (open) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, open]);

  const openList = () => {
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const chooseItem = (index) => {
    onChange(items[index].value);
    setActiveIndex(index);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (!open) {
        openList();
        return;
      }

      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) =>
        Math.min(items.length - 1, Math.max(0, current + direction)),
      );
      return;
    }

    if (open && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : items.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) chooseItem(activeIndex);
      else openList();
    }
  };

  return (
    <div
      ref={rootRef}
      className={`relative md:col-span-3 ${open ? "z-[160]" : "z-[121]"} ${
        compact ? "p-2.5" : "p-3"
      }`}
    >
      <p
        style={{ letterSpacing: "0.2em" }}
        className={`mb-1.5 text-[10px] font-bold uppercase ${
          isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
        }`}
      >
        {label}
      </p>

      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-activedescendant={
          open ? `${listboxId}-option-${activeIndex}` : undefined
        }
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className="group flex w-full cursor-pointer items-center justify-between gap-3 border-none bg-transparent text-left text-xs font-light outline-none"
        style={{ color: value ? textColor : mutedColor }}
      >
        <span className="min-w-0 truncate">{selectedItem.label}</span>
        <Icon
          name="chevronDown"
          size={14}
          strokeWidth={1.5}
          className={`shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: value ? accent : mutedColor }}
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          style={{
            background: popupBg,
            border: `1px solid ${borderColor}`,
            boxShadow: isDark
              ? "0 18px 45px rgba(0,0,0,0.46)"
              : "0 18px 45px rgba(1,20,52,0.16)",
          }}
          className={`absolute left-2 right-2 max-h-60 overflow-y-auto rounded-sm py-1.5 ${
            popupDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {items.map((item, index) => {
            const selected = index === selectedIndex;
            const active = index === activeIndex;

            return (
              <li
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                id={`${listboxId}-option-${index}`}
                key={String(item.value) || "placeholder"}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => chooseItem(index)}
                className="flex min-h-9 cursor-pointer items-center justify-between gap-3 px-3 py-2 text-xs transition-colors duration-150"
                style={{
                  color: index === 0 ? mutedColor : selected ? accent : textColor,
                  background: active
                    ? isDark
                      ? "rgba(252,213,123,0.10)"
                      : "rgba(139,107,46,0.09)"
                    : "transparent",
                }}
              >
                <span className="truncate">{item.label}</span>
                {selected && (
                  <Icon
                    name="check"
                    size={13}
                    strokeWidth={2}
                    className="shrink-0"
                    style={{ color: accent }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ── Single month calendar panel ── */
function CalendarMonth({ year, month, checkIn, checkOut, today, accent, isDark, onSelect, dayLabels, monthName }) {
  const cells = getMonthMatrix(year, month);
  return (
    <div className="min-w-0 flex-1">
      <p
        style={{ fontFamily: "var(--font-cormorant-garamond)", letterSpacing: "0.2em" }}
        className="mb-3 text-center text-xs font-semibold uppercase sm:text-sm"
      >
        {monthName} {year}
      </p>
      <div className="grid grid-cols-7 mb-2">
        {dayLabels.map((d, i) => (
          <span key={i} className={`pb-1 text-center text-[8px] font-bold uppercase sm:text-[9px] ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
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
          let cls = "font-numbers text-[11px] h-7 w-full flex items-center justify-center transition-colors duration-150 ";
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
    <div ref={ref} className="relative z-[130] h-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`h-full w-full text-left ${compact ? "p-2.5" : "p-3"}`}
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
          className={`absolute z-[9999] ${
            popupDirection === "up"
              ? "bottom-full mb-2"
              : "top-full mt-2"
          } left-1/2 w-[94vw] max-w-[620px] -translate-x-1/2 p-4 sm:p-5`}
        >
          {/* Header: selected dates */}
          <div className="mb-4 flex items-start gap-5 border-b pb-4 sm:gap-8" style={{ borderColor }}>
            <div>
              <p style={{ letterSpacing: "0.18em", color: isDark ? "rgba(255,255,255,0.4)" : "rgba(1,20,52,0.4)" }} className="text-[9px] font-bold uppercase mb-1">
                Tanggal Kedatangan
              </p>
              <p style={{ color: accent, fontFamily: "var(--font-cormorant-garamond)" }} className="text-base font-semibold tracking-wide sm:text-lg">
                {checkIn ? formatShort(checkIn) : "—"}
              </p>
            </div>
            <div>
              <p style={{ letterSpacing: "0.18em", color: isDark ? "rgba(255,255,255,0.4)" : "rgba(1,20,52,0.4)" }} className="text-[9px] font-bold uppercase mb-1">
                Tanggal Kepulangan
              </p>
              <p style={{ color: accent, fontFamily: "var(--font-cormorant-garamond)" }} className="text-base font-semibold tracking-wide sm:text-lg">
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
          <div className="mb-3 flex items-center justify-between">
            <button type="button" onClick={goPrev} style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(1,20,52,0.55)" }}
              className="w-8 h-8 text-2xl flex items-center justify-center hover:opacity-100 opacity-60 transition-opacity cursor-pointer">‹</button>
            <button type="button" onClick={goNext} style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(1,20,52,0.55)" }}
              className="w-8 h-8 text-2xl flex items-center justify-center hover:opacity-100 opacity-60 transition-opacity cursor-pointer">›</button>
          </div>

          {/* Dual month */}
          <div className="flex gap-5 sm:gap-7">
            <CalendarMonth year={viewYear} month={viewMonth} checkIn={checkIn} checkOut={checkOut} today={today} accent={accent} isDark={isDark} onSelect={onSelect} dayLabels={DAY_LABELS_ID} monthName={MONTH_NAMES_ID[viewMonth]} />
            <div style={{ borderColor }} className="hidden sm:block w-px self-stretch border-l opacity-20" />
            <div className="hidden min-w-0 flex-1 sm:block">
              <CalendarMonth year={nextYear} month={nextMonth} checkIn={checkIn} checkOut={checkOut} today={today} accent={accent} isDark={isDark} onSelect={onSelect} dayLabels={DAY_LABELS_ID} monthName={MONTH_NAMES_ID[nextMonth]} />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t pt-3" style={{ borderColor }}>
            <span style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(1,20,52,0.35)" }} className="flex items-center gap-2 text-[9px] sm:text-[10px]">
              <span style={{ background: accent }} className="inline-block w-2 h-2 rounded-full" />
              Terpilih
              <span className="hidden sm:inline">
                &nbsp;·&nbsp;
                <span className="italic">* minimum menginap: 1 malam</span>
              </span>
            </span>
            <div className="ml-3 flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClear();
                  setOpen(false);
                }}
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(1,20,52,0.55)",
                }}
                className="cursor-pointer px-2 py-1.5 text-[9px] uppercase tracking-widest opacity-75 transition-opacity hover:opacity-100 sm:text-[10px]"
              >
                Hapus
              </button>
              <button
                type="button"
                disabled={!checkIn || !checkOut}
                onClick={() => setOpen(false)}
                style={{
                  background: accent,
                  color: isDark ? "#011434" : "#ffffff",
                }}
                className="cursor-pointer px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-35 sm:px-4 sm:text-[10px]"
              >
                Simpan
              </button>
            </div>
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
    const query = params.toString();
    router.push(query ? `/properties?${query}` : "/properties");
  };

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
      className={`relative z-[120] mx-auto grid w-full max-w-[1040px] grid-cols-1 divide-y overflow-visible rounded-sm shadow-lg md:grid-cols-12 md:divide-x md:divide-y-0 ${dividerClass}`}
    >
      {/* Destination */}
      <SearchSelect
        label="Destination"
        value={destination}
        onChange={setDestination}
        options={SELECTABLE_LOCATIONS.map((location) => ({
          value: location,
          label: location,
        }))}
        placeholder="Select location"
        isDark={isDark}
        compact={compact}
        popupDirection={popupDirection}
      />

      {/* Combined Check In – Check Out */}
      <div className="relative overflow-visible md:col-span-4">
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
      <SearchSelect
        label="Property Type"
        value={bedroom}
        onChange={setBedroom}
        options={BEDROOM_OPTIONS.map((beds) => ({
          value: beds,
          label: `${beds} Bedroom${beds > 1 ? "s" : ""}`,
        }))}
        placeholder="Select type"
        isDark={isDark}
        compact={compact}
        popupDirection={popupDirection}
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        style={{
          background: isDark ? "#FCD57B" : "#8B6B2E",
          color: isDark ? "#011434" : "#ffffff",
          letterSpacing: "0.25em",
        }}
        className={`min-h-[48px] w-full cursor-pointer text-[11px] font-bold uppercase transition-all duration-300 hover:brightness-95 active:scale-[0.99] md:col-span-2 md:min-h-0 md:px-4 ${compact ? "py-2.5 md:py-0" : "py-3 md:py-0"}`}
      >
        Search
      </button>
    </div>
  );
}
