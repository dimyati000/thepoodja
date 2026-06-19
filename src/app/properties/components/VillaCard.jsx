"use client";
import Image from "next/image";

export function VillaCard({ villa, isDark }) {
  return (
    <div
      style={{
        backgroundColor: isDark ? "#011434" : "#ffffff",
        border: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(0,0,0,0.05)",
      }}
      className="group relative w-full flex flex-col justify-between overflow-hidden rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1"
    >
      {/* FRAME IMAGE WRAPPER */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={villa.image}
          alt={villa.name}
          fill
          sizes="(max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
        />
        {/* Fitur / Badge Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10 max-w-[85%]">
          {villa.features.slice(0, 2).map((feat, i) => (
            <span
              key={i}
              className="bg-[#011434]/70 dark:bg-[#ffffff]/10 backdrop-blur-md text-[8px] text-white font-bold tracking-widest uppercase px-3 py-1 rounded-[1px]"
            >
              {feat}
            </span>
          ))}
        </div>
      </div>

      {/* RINCIAN KONTEN KARTU */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <p
            style={{ color: isDark ? "#FCD57B" : "#8B6B2E" }}
            className="text-[9px] font-bold tracking-[0.25em] uppercase mb-2"
          >
            {villa.location} • BALI
          </p>

          <h3
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className={`text-xl sm:text-2xl font-normal leading-tight tracking-wide mb-5 min-h-[56px] transition-colors duration-300 ${
              isDark
                ? "text-white group-hover:text-[#FCD57B]"
                : "text-[#011434] group-hover:text-[#8B6B2E]"
            }`}
          >
            {villa.name}
          </h3>

          {/* Bar Spesifikasi Arsitektur */}
          <div
            className={`grid grid-cols-3 gap-2 py-3.5 border-y text-center text-[10px] tracking-widest font-mono ${
              isDark
                ? "border-white/10 text-white/40"
                : "border-black/5 text-black/40"
            }`}
          >
            <div className="border-r border-neutral-500/10 dark:border-white/5">
              <span
                className={`font-semibold ${isDark ? "text-white" : "text-black"}`}
              >
                {villa.beds}
              </span>{" "}
              BEDS
            </div>
            <div className="border-r border-neutral-500/10 dark:border-white/5">
              <span
                className={`font-semibold ${isDark ? "text-white" : "text-black"}`}
              >
                {villa.baths}
              </span>{" "}
              BATHS
            </div>
            <div>
              <span
                className={`font-semibold ${isDark ? "text-white" : "text-black"}`}
              >
                {villa.size}
              </span>
            </div>
          </div>
        </div>

        {/* Harga & CTA Explore */}
        <div className="flex items-center justify-between mt-6 pt-1">
          <div>
            <span className="block text-[8px] uppercase tracking-widest text-neutral-400 mb-0.5">
              STARTS FROM
            </span>
            <p
              className={`text-sm sm:text-base font-semibold tracking-wide ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
            >
              {villa.price}{" "}
              <span className="text-[10px] font-light text-neutral-400">
                / {villa.period}
              </span>
            </p>
          </div>

          <button
            style={{
              color: isDark ? "#ffffff" : "#8B6B2E",
              borderColor: isDark
                ? "rgba(255,255,255,0.25)"
                : "rgba(139,107,46,0.3)",
            }}
            className="text-[9px] font-bold uppercase tracking-widest border-b pb-0.5 bg-transparent outline-none cursor-pointer transition-all duration-300 hover:border-current hover:opacity-80"
          >
            EXPLORE
          </button>
        </div>
      </div>
    </div>
  );
}
