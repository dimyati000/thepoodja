"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LOCATIONS, VILLAS_DATA } from "@/constants/villas";

// Ambil semua jumlah kamar unik dari data villa, urut ascending -> [1, 2, 3]
const BEDROOM_OPTIONS = Array.from(
  new Set(VILLAS_DATA.flatMap((group) => group.rooms.map((room) => room.beds))),
).sort((a, b) => a - b);

const SELECTABLE_LOCATIONS = LOCATIONS.filter((loc) => loc !== "All Locations");

export function PropertySearchBar({ isDark, compact = false }) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bedroom, setBedroom] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("location", destination);
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    if (bedroom) params.set("bedroom", bedroom);
    router.push(`/properties/all?${params.toString()}`);
  };

  const labelColor = isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]";
  const textColor = isDark ? "#ffffff" : "#011434";
  const dividerClass = isDark ? "divide-white/10" : "divide-black/10";
  const wrapperBg = isDark ? "rgba(1,20,52,0.85)" : "rgba(255,255,255,0.95)";
  const wrapperBorder = isDark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(0,0,0,0.06)";

  return (
    <div
      style={{
        background: wrapperBg,
        backdropFilter: "blur(20px)",
        border: wrapperBorder,
      }}
      className={`grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x ${dividerClass} rounded-sm shadow-sm overflow-hidden`}
    >
      {/* Destination */}
      <div className={compact ? "p-3" : "p-4"}>
        <p
          style={{ letterSpacing: "0.2em" }}
          className={`text-[10px] font-bold uppercase mb-1.5 ${labelColor}`}
        >
          Destination
        </p>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ color: destination ? textColor : "rgba(128,128,128,0.6)" }}
          className="bg-transparent border-none outline-none text-xs font-light w-full cursor-pointer appearance-none"
        >
          <option value="" className={isDark ? "bg-[#011434]" : "bg-white"}>
            Select location
          </option>
          {SELECTABLE_LOCATIONS.map((loc) => (
            <option
              key={loc}
              value={loc}
              className={isDark ? "bg-[#011434]" : "bg-white"}
            >
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Check In */}
      <div className={compact ? "p-3" : "p-4"}>
        <p
          style={{ letterSpacing: "0.2em" }}
          className={`text-[10px] font-bold uppercase mb-1.5 ${labelColor}`}
        >
          Check In
        </p>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          style={{ color: textColor, colorScheme: isDark ? "dark" : "light" }}
          className="bg-transparent border-none outline-none text-xs font-light w-full"
        />
      </div>

      {/* Check Out */}
      <div className={compact ? "p-3" : "p-4"}>
        <p
          style={{ letterSpacing: "0.2em" }}
          className={`text-[10px] font-bold uppercase mb-1.5 ${labelColor}`}
        >
          Check Out
        </p>
        <input
          type="date"
          value={checkOut}
          min={checkIn || undefined}
          onChange={(e) => setCheckOut(e.target.value)}
          style={{ color: textColor, colorScheme: isDark ? "dark" : "light" }}
          className="bg-transparent border-none outline-none text-xs font-light w-full"
        />
      </div>

      {/* Property Type -> jumlah kamar */}
      <div className={compact ? "p-3" : "p-4"}>
        <p
          style={{ letterSpacing: "0.2em" }}
          className={`text-[10px] font-bold uppercase mb-1.5 ${labelColor}`}
        >
          Property Type
        </p>
        <select
          value={bedroom}
          onChange={(e) => setBedroom(e.target.value)}
          style={{ color: bedroom ? textColor : "rgba(128,128,128,0.6)" }}
          className="bg-transparent border-none outline-none text-xs font-light w-full cursor-pointer appearance-none"
        >
          <option value="" className={isDark ? "bg-[#011434]" : "bg-white"}>
            Select type
          </option>
          {BEDROOM_OPTIONS.map((b) => (
            <option
              key={b}
              value={b}
              className={isDark ? "bg-[#011434]" : "bg-white"}
            >
              {b} Bedroom{b > 1 ? "s" : ""}
            </option>
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
