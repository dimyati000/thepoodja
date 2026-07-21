"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useScrollReveal, revealStyle } from "@/hooks/useScrollReveal";
import { Icon } from "@/components/Icon";

export function VillaAccordionSlider({
  data = [],
  excludeId = null,
  title = "EXPLORE PROPERTIES",
  subtitle = "Curated Collections",
  isDark = true,
  variant = "property",
  hideHeader = false, // Properti baru untuk menyembunyikan judul
  minimal = false, // Properti baru untuk melepas background section bawaan
}) {
  const router = useRouter();

  const { ref: hRef, inView: hInView } = useScrollReveal(0.15);
  const { ref: cardsRef, inView: cardsInView } = useScrollReveal(0.05);

  const displayedItems = excludeId
    ? data.filter((item) => item.id !== excludeId)
    : data;

  const finalItems = displayedItems.slice(0, 5);

  const middleIndex = Math.floor(finalItems.length / 2);
  const defaultId = finalItems[middleIndex]?.id || finalItems[0]?.id || null;

  const [selectedId, setSelectedId] = useState(defaultId);

  // Jika minimal = true, hilangkan background bawaan (jadikan bg-transparent)
  const bgColor = minimal
    ? "bg-transparent"
    : isDark
      ? "bg-[#011434]"
      : "bg-[#f0ede7]";
  const borderColor = isDark ? "border-white/10" : "border-[#011434]/10";
  const isDest = variant === "destination";

  if (finalItems.length === 0) return null;

  return (
    <section
      className={`${bgColor} ${minimal ? "p-0" : "pb-10 md:pt-10 md:pb-18"} transition-colors duration-500 overflow-hidden`}
    >
      <style>{`
        @keyframes destFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header — Hanya muncul jika hideHeader bernilai false */}
      {!hideHeader && (
        <div
          ref={hRef}
          style={{ textAlign: "center", ...revealStyle(hInView) }}
          className="pt-8 pb-8 md:pb-12 px-6"
        >
          <p
            style={{ color: isDark ? "#FCD57B" : "#8B6B2E" }}
            className="text-xs md:text-sm font-bold uppercase mb-[18px] tracking-[0.45em]"
          >
            {subtitle}
          </p>
          <h2
            style={{ color: isDark ? "#FFFFFF" : "#111111" }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold transition-colors duration-500 tracking-[0.08em]"
          >
            {title}
          </h2>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: isDark ? "#FCD57B" : "#8B6B2E",
              opacity: 0.75,
            }}
            className="mt-6 mx-auto"
          />
        </div>
      )}

      {/* Cards Container */}
      <div
        ref={cardsRef}
        style={revealStyle(cardsInView, 0.08)}
        className={`w-full max-w-[1440px] mx-auto ${minimal ? "px-0" : "px-4 md:px-10"}`}
      >
        <div className="flex flex-col md:flex-row h-[650px] md:h-[600px] lg:h-[660px] gap-2 md:gap-0">
          {finalItems.map((item, i) => {
            const isSelected = item.id === selectedId;

            // Mapping property data dinamis
            const imageSrc = isDest ? item.img : item.image;
            const number = isDest ? item.num : String(i + 1).padStart(2, "0");
            const itemTitle = isDest ? item.label : item.name;
            const itemSub = isDest ? item.sub : `${item.location} • BALI`;
            const verticalTitle = isDest
              ? item.label
              : item.name.split(" — ")[1] || item.name;
            const itemDesc = isDest
              ? item.desc
              : `${item.beds} BEDS • ${item.baths} BATHS • ${item.size}`;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`relative overflow-hidden cursor-pointer group transition-all duration-700 ease-in-out will-change-[flex-grow]
                  ${isSelected ? "flex-[5] md:flex-[4]" : "flex-[1] md:flex-[1]"}
                  ${i < finalItems.length - 1 ? `md:border-r ${borderColor}` : ""}
                `}
              >
                {/* Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={imageSrc}
                    alt={itemTitle}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className={`object-cover object-center transition-all duration-1000 ease-in-out ${isSelected ? "scale-100 grayscale-0 brightness-100" : "scale-105 grayscale-[20%] brightness-[0.35] group-hover:brightness-[0.45]"}`}
                  />
                </div>

                {/* Overlay Gradient */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isSelected ? "bg-gradient-to-t from-[#011434]/95 via-[#011434]/50 to-transparent" : "bg-[#011434]/40"}`}
                />

                {/* ── 1. KONTEN AKTIF ── */}
                <div
                  style={{
                    animation: isSelected
                      ? "destFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                      : "none",
                  }}
                  className={`absolute inset-0 flex flex-col justify-end p-6 md:p-10 transition-all duration-500 ${isSelected ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                >
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <span className="text-xs text-[#FBD47B] font-bold tracking-[0.4em]">
                      {number}
                    </span>
                    <div className="flex-1 h-[1px] bg-[#FBD47B]/30" />
                    <span className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.25em]">
                      {itemSub}
                    </span>
                  </div>

                  <h3 className="font-serif text-white text-2xl md:text-4xl font-light uppercase mb-2 md:mb-3 leading-tight tracking-[0.06em]">
                    {itemTitle}
                  </h3>

                  <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed mb-5 md:mb-6 max-w-sm md:max-w-md">
                    {itemDesc}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isDest) {
                        router.push(`/properties`);
                      } else {
                        router.push(`/properties/${item.id}`);
                      }
                    }}
                    className="self-start inline-flex items-center gap-3 text-[10px] md:text-xs text-[#FBD47B] font-bold uppercase bg-transparent border border-[#FBD47B]/40 px-5 py-3 transition-all duration-300 hover:bg-[#FBD47B] hover:text-[#011434] hover:border-[#FBD47B] tracking-[0.3em]"
                  >
                    {isDest ? "View Properties" : "Explore Estate"}
                    <Icon name="chevronRight" size={16} />
                  </button>

                  {/* Desktop Progress Line */}
                  <div className="hidden md:flex gap-1.5 mt-8">
                    {finalItems.map((dd) => (
                      <div
                        key={dd.id}
                        className={`h-[2px] transition-all duration-500 ${dd.id === selectedId ? "w-8 bg-[#FBD47B]" : "w-4 bg-white/20"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* ── 2. KONTEN NON-AKTIF ── */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${!isSelected ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                >
                  {/* Desktop View */}
                  <div className="hidden md:flex absolute inset-0 flex-col items-center justify-end pb-8">
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-[10px] md:text-xs text-[#FBD47B] font-bold opacity-80 tracking-[0.3em]">
                        {number}
                      </span>
                      <div className="w-[1px] h-6 bg-white/20" />
                      <h3 className="font-serif text-white/80 text-sm font-light uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 whitespace-nowrap">
                        {verticalTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden absolute inset-0 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-[#FBD47B] font-bold tracking-wider">
                        {number}
                      </span>
                      <h3 className="font-serif text-white/80 text-base font-light uppercase tracking-[0.05em]">
                        {verticalTitle}
                      </h3>
                    </div>
                    <span className="text-xs text-[#FBD47B]/60 font-light">
                      ＋
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
