"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollReveal, revealStyle } from "@/hooks/useScrollReveal";

const destinations = [
  {
    id: 1,
    num: "01",
    label: "Seminyak",
    sub: "Beachfront Estates",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    desc: "A curation of ultra-luxury beachfront villas and premier lifestyle investments nestled along Bali's most sophisticated and vibrant coastline.",
  },
  {
    id: 2,
    num: "02",
    label: "Canggu",
    sub: "Chic Modern Living",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    desc: "Where contemporary architecture meets bohemian soul. Discover high-yielding architectural masterpieces surrounded by thriving creative enclaves.",
  },
  {
    id: 3,
    num: "03",
    label: "Ubud",
    sub: "Sanctuary & Culture",
    img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
    desc: "Immerse in private tropical sanctuaries overlooking deep river ravines and emerald rice terraces, crafted for ultimate inner peace and prestige.",
  },
  {
    id: 4,
    num: "04",
    label: "Sanur",
    sub: "Heritage & Serene",
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    desc: "Timeless coastal charm paired with elite residential estates, offering a gentle pace of refined living next to pristine sunrise lagoons.",
  },
  {
    id: 5,
    num: "05",
    label: "Nusa Dua",
    sub: "Exclusive Enclaves",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    desc: "The pinnacle of master-planned luxury. Secure private investments inside safe, high-end gated communities flanked by world-class golf courses.",
  },
];

export function Destinations({ isDark = true }) {
  const [selectedId, setSelectedId] = useState(3);
  const { ref: hRef, inView: hInView } = useScrollReveal(0.15);
  const { ref: cardsRef, inView: cardsInView } = useScrollReveal(0.05);

  const bgColor = isDark ? "bg-[#011434]" : "bg-[#f0ede7]";
  const textColor = isDark ? "text-white" : "text-[#011434]";
  const borderColor = isDark ? "border-white/10" : "border-[#011434]/10";

  return (
    <section
      id="destinations"
      className={`${bgColor} pt-12 pb-16 md:pt-20 md:pb-24 transition-colors duration-500 overflow-hidden`}
    >
      {/* ── HEADER TITLE (Jarak di atas dikurangi) ── */}
      <div
        ref={hRef}
        style={revealStyle(hInView)}
        className="text-center px-6 mb-10 md:mb-16"
      >
        <p
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            letterSpacing: "0.45em",
          }}
          className="text-[10px] text-[#FBD47B] font-bold uppercase mb-3"
        >
          Explore Indonesia
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.08em",
          }}
          className={`${textColor} text-3xl md:text-5xl font-light`}
        >
          DESTINATIONS
        </h2>
        <div className="w-10 h-[1px] bg-[#FBD47B] mx-auto mt-5 opacity-75" />
      </div>

      {/* ── CARDS CONTAINER ── */}
      <div
        ref={cardsRef}
        style={revealStyle(cardsInView, 0.08)}
        className="w-full px-4 md:px-10 max-w-[1440px] mx-auto"
      >
        {/* Menggunakan fixed height di mobile dan desktop agar transisi flex-grow berjalan mulus */}
        <div className="flex flex-col md:flex-row h-[650px] md:h-[600px] lg:h-[660px] gap-2 md:gap-0">
          {destinations.map((d, i) => {
            const isSelected = d.id === selectedId;

            return (
              <div
                key={d.id}
                onClick={() => setSelectedId(d.id)}
                className={`relative overflow-hidden cursor-pointer group transition-all duration-700 ease-in-out will-change-[flex-grow]
                  ${isSelected ? "flex-[5] md:flex-[4]" : "flex-[1] md:flex-[1]"}
                  ${i < destinations.length - 1 ? `md:border-r ${borderColor}` : ""}
                `}
              >
                {/* Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={d.img}
                    alt={d.label}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    priority={d.id === 3}
                    className={`object-cover object-center transition-all duration-1000 ease-in-out
                      ${isSelected ? "scale-100 grayscale-0 brightness-100" : "scale-105 grayscale-[20%] brightness-[0.35] group-hover:brightness-[0.45]"}
                    `}
                  />
                </div>

                {/* Overlay Gradient */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none
                    ${
                      isSelected
                        ? "bg-gradient-to-t from-[#011434]/95 via-[#011434]/50 to-transparent"
                        : "bg-[#011434]/40"
                    }
                  `}
                />

                {/* ── 1. KONTEN AKTIF (Selected State) ── */}
                <div
                  style={{
                    animation: isSelected
                      ? "destFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                      : "none",
                  }}
                  className={`absolute inset-0 flex flex-col justify-end p-6 md:p-10 transition-all duration-500
                    ${isSelected ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                  `}
                >
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <span
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "0.4em",
                      }}
                      className="text-[10px] text-[#FBD47B] font-bold"
                    >
                      {d.num}
                    </span>
                    <div className="flex-1 h-[1px] bg-[#FBD47B]/30" />
                    <span
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "0.25em",
                      }}
                      className="text-[9px] text-white/60 uppercase"
                    >
                      {d.sub}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      letterSpacing: "0.06em",
                    }}
                    className="text-white text-2xl md:text-4xl font-light uppercase mb-2 md:mb-3 leading-tight"
                  >
                    {d.label}
                  </h3>

                  <p
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                    className="text-white/70 text-xs md:text-sm font-light leading-relaxed mb-5 md:mb-6 max-w-sm md:max-w-md"
                  >
                    {d.desc}
                  </p>

                  <button
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "0.3em",
                    }}
                    className="self-start inline-flex items-center gap-3 text-[9px] text-[#FBD47B] font-bold uppercase bg-transparent border border-[#FBD47B]/40 px-5 py-3 transition-all duration-300 hover:bg-[#FBD47B] hover:text-[#011434] hover:border-[#FBD47B]"
                  >
                    View Properties
                    <svg width="14" height="7" viewBox="0 0 18 7" fill="none">
                      <line
                        x1="0"
                        y1="3.5"
                        x2="14"
                        y2="3.5"
                        stroke="currentColor"
                        strokeWidth="0.8"
                      />
                      <polyline
                        points="10,1 14,3.5 10,6"
                        stroke="currentColor"
                        strokeWidth="0.8"
                        fill="none"
                      />
                    </svg>
                  </button>

                  {/* Desktop Progress Line */}
                  <div className="hidden md:flex gap-1.5 mt-8">
                    {destinations.map((dd) => (
                      <div
                        key={dd.id}
                        className={`h-[2px] transition-all duration-500 ${dd.id === selectedId ? "w-8 bg-[#FBD47B]" : "w-4 bg-white/20"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* ── 2. KONTEN NON-AKTIF (Unselected State) ── */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500
                    ${!isSelected ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                  `}
                >
                  {/* Desktop View */}
                  <div className="hidden md:flex absolute inset-0 flex-col items-center justify-end pb-8">
                    <div className="flex flex-col items-center gap-4">
                      <span
                        style={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          letterSpacing: "0.3em",
                        }}
                        className="text-[8px] text-[#FBD47B] font-bold opacity-80"
                      >
                        {d.num}
                      </span>
                      <div className="w-[1px] h-6 bg-white/20" />
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          letterSpacing: "0.12em",
                        }}
                        className="text-white/80 text-sm font-light uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 whitespace-nowrap"
                      >
                        {d.label}
                      </h3>
                    </div>
                  </div>

                  {/* Mobile View (Dibuat jauh lebih bersih dan tipis) */}
                  <div className="md:hidden absolute inset-0 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-[#FBD47B] font-bold tracking-wider">
                        {d.num}
                      </span>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          letterSpacing: "0.05em",
                        }}
                        className="text-white/80 text-base font-light uppercase"
                      >
                        {d.label}
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
