"use client";
import { useState, useRef, useEffect } from "react";
import { useSettings } from "@/components/SettingsProvider";

function Row({
  label,
  sub,
  value,
  onInc,
  onDec,
  disableDec,
  disableInc,
  isDark,
}) {
  const btnBorder = isDark ? "rgba(255,255,255,0.2)" : "rgba(1,20,52,0.2)";
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium">{label}</p>
        <p
          className={`text-[10px] ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
        >
          {sub}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDec}
          disabled={disableDec}
          style={{ borderColor: btnBorder }}
          className="w-6 h-6 rounded-full border flex items-center justify-center text-xs disabled:opacity-30 cursor-pointer"
        >
          −
        </button>
        <span className="font-numbers text-xs w-4 text-center">{value}</span>
        <button
          type="button"
          onClick={onInc}
          disabled={disableInc}
          style={{ borderColor: btnBorder }}
          className="w-6 h-6 rounded-full border flex items-center justify-center text-xs disabled:opacity-30 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function GuestCounterPopup({ isDark, maxGuests = 2 }) {
  const { t, adults, setAdults, childrenCount, setChildrenCount } =
    useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const total = adults + childrenCount;
  const borderColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(1,20,52,0.15)";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ borderColor }}
        className={`w-full text-left border px-3 py-2.5 ${isDark ? "text-white" : "text-[#011434]"}`}
      >
        <span
          className={`block text-[9px] font-bold tracking-widest uppercase mb-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
        >
          {t("common.guests")}
        </span>
        <span className="font-numbers text-xs">
          {total} {t("common.guests")}
        </span>
      </button>

      {open && (
        <div
          style={{ borderColor }}
          className={`absolute z-20 top-full left-0 mt-2 w-full min-w-[220px] border p-4 shadow-lg ${isDark ? "bg-[#00102A]" : "bg-white"}`}
        >
          <Row
            label={t("calendar.adults")}
            sub={t("calendar.adultsAge")}
            value={adults}
            onInc={() => total < maxGuests && setAdults(adults + 1)}
            onDec={() => adults > 1 && setAdults(adults - 1)}
            disableDec={adults <= 1}
            disableInc={total >= maxGuests}
            isDark={isDark}
          />
          <div className="h-px my-3" style={{ backgroundColor: borderColor }} />
          <Row
            label={t("calendar.children")}
            sub={t("calendar.childrenAge")}
            value={childrenCount}
            onInc={() =>
              total < maxGuests && setChildrenCount(childrenCount + 1)
            }
            onDec={() =>
              childrenCount > 0 && setChildrenCount(childrenCount - 1)
            }
            disableDec={childrenCount <= 0}
            disableInc={total >= maxGuests}
            isDark={isDark}
          />
          <p
            className={`text-[10px] italic mt-3 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
          >
            {t("calendar.maxGuests")} {maxGuests}
          </p>
        </div>
      )}
    </div>
  );
}
