"use client";

import { useState, useRef, useEffect } from "react";
import { useScrollReveal, revealStyle } from "../../hooks/useScrollReveal";
import { Icon } from "@/components/Icon";

const BASE = [
  {
    id: 1,
    quote:
      "Every detail was considered — from the architecture to the service. The Poodja made our anniversary trip truly unforgettable.",
    name: "Sophia R.",
    origin: "Sydney, Australia",
    property: "The Modery Home, Seminyak",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    quote:
      "We've stayed in luxury villas across Southeast Asia, but nothing has matched this level of curation. Pure, effortless elegance.",
    name: "James & Olivia T.",
    origin: "London, United Kingdom",
    property: "Classic Mansion, Ubud",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    quote:
      "The concierge team went above and beyond for every experience we dreamed of. Bali has never felt so personal, so intimate.",
    name: "Marcus L.",
    origin: "New York, USA",
    property: "Minimalist Retreat, Canggu",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 4,
    quote:
      "An absolute masterclass in tropical luxury hospitality. The architecture seamlessly blends privacy with beautiful nature.",
    name: "Elena K.",
    origin: "Berlin, Germany",
    property: "Serene Sunrise, Sanur",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 5,
    quote:
      "Stunning investment asset and a breathtaking getaway. The premium management team handles everything flawlessly.",
    name: "David W.",
    origin: "Singapore",
    property: "The Elite Enclave, Nusa Dua",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
];

const N = BASE.length;
const slides = [
  ...BASE.map((t) => ({ ...t, id: `prev-${t.id}` })),
  ...BASE,
  ...BASE.map((t) => ({ ...t, id: `next-${t.id}` })),
];

export function Testimonials({ isDark = true }) {
  const [idx, setIdx] = useState(N);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const lockedRef = useRef(false);
  const { ref: sRef, inView: sInView } = useScrollReveal(0.1);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bgColor = isDark ? "bg-[#011434]" : "bg-[#f7f4ef]";
  const textColor = isDark ? "text-white" : "text-[#011434]";
  const textMuted = isDark ? "text-white/40" : "text-[#011434]/50";
  const border = isDark ? "border-white/10" : "border-[#011434]/15";
  const navBg = isDark
    ? "bg-[#011434]/80 text-white"
    : "bg-white/80 text-[#011434]";
  const cardActive = isDark
    ? "bg-white/[0.05] shadow-2xl shadow-black/40"
    : "bg-white shadow-xl shadow-[#011434]/8";
  const cardInactive = isDark ? "bg-white/[0.01]" : "bg-[#f0ede8]/60";

  const handleNext = () => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setIsTransitioning(true);
    setIdx((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setIsTransitioning(true);
    setIdx((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    lockedRef.current = false;
    if (idx >= N * 2) {
      setIsTransitioning(false);
      setIdx(N);
    } else if (idx < N) {
      setIsTransitioning(false);
      setIdx(N * 2 - 1);
    }
  };

  const dotIdx = idx % N;

  // Di mobile, beri ruang sisa (85%) agar kartu kiri/kanan sedikit mengintip
  const gap = isMobile ? 16 : 24;
  const cardWidth = isMobile ? "85vw" : "calc((100% - 48px) / 3)";

  return (
    <section
      id="testimonials"
      className={`${bgColor} pb-10 md:pt-10 md:pb-18 transition-colors duration-500 overflow-hidden`}
    >
      {/* Header */}
      <div
        ref={sRef}
        style={{
          textAlign: "center",
          ...revealStyle(sInView),
        }}
        className="pt-8 md:pb-4 px-6"
      >
        <p
          style={{ color: isDark ? "#FCD57B" : "#8B6B2E" }}
          className="text-xs md:text-sm font-bold uppercase mb-[18px] tracking-[0.45em]"
        >
          Voices of Our Guests
        </p>
        <h2
          style={{ color: isDark ? "#FFFFFF" : "#111111" }}
          className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold transition-colors duration-500 tracking-[0.08em]"
        >
          WHAT OUR GUESTS SAY
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

      {/* Slider Container */}
      <div className="w-full max-w-[1300px] mx-auto relative px-0 md:px-10">
        {/* Nav Buttons (Desktop Only) */}
        <button
          onClick={handlePrev}
          className={`absolute left-2 lg:left-[-10px] top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full border ${border} ${navBg} hover:border-[#FBD47B] hover:text-[#FBD47B] transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer`}
        >
          <Icon name="chevronLeft" size={24} />
        </button>
        <button
          onClick={handleNext}
          className={`absolute right-2 lg:right-[-10px] top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full border ${border} ${navBg} hover:border-[#FBD47B] hover:text-[#FBD47B] transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer`}
        >
          <Icon name="chevronRight" size={24} />
        </button>

        {/* Ditambahkan padding vertikal h-full/py agar shadow tidak terpotong */}
        <div className="w-full overflow-hidden py-10">
          <div
            className="flex"
            onTransitionEnd={handleTransitionEnd}
            style={{
              gap: `${gap}px`,
              /* RUMUS ALIGN CENTER HP & DESKTOP */
              transform: isMobile
                ? `translateX(calc(50vw - (${cardWidth} / 2) - ${idx} * ${cardWidth} - ${idx} * ${gap}px))`
                : `translateX(calc(-${idx} * ${cardWidth} - ${idx} * ${gap}px + ${cardWidth} + ${gap}px))`,
              transition: isTransitioning
                ? "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
              willChange: "transform",
            }}
          >
            {slides.map((t, i) => {
              const focused = i === idx;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    if (!lockedRef.current) {
                      setIsTransitioning(true);
                      setIdx(i);
                    }
                  }}
                  style={{ width: cardWidth }}
                  className={`flex-shrink-0 flex flex-col justify-between p-6 md:p-8 rounded-sm border cursor-pointer select-none
                    transition-[transform,opacity,background-color,border-color,box-shadow] ease-in-out
                    ${isTransitioning ? "duration-500" : "duration-0"}
                    ${
                      focused
                        ? `scale-[1.02] md:scale-105 ${cardActive} border-[#FBD47B] opacity-100 z-10`
                        : `scale-[0.98] md:scale-95 ${cardInactive} ${border} opacity-30 md:opacity-25 hover:opacity-50`
                    }`}
                >
                  <div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Icon key={j} name="star" size={11} />
                      ))}
                    </div>
                    <div
                      className={`font-serif text-5xl h-4 select-none pointer-events-none font-light -ml-1 mb-2 ease-in-out ${isTransitioning ? "duration-500" : "duration-0"} ${focused ? "text-[#FBD47B]" : "text-[#FBD47B]/30"}`}
                    >
                      &ldquo;
                    </div>
                    <p
                      className={`font-serif ${textColor} text-sm md:text-lg font-light italic leading-relaxed mb-6 ease-in-out ${isTransitioning ? "duration-500" : "duration-0"}`}
                    >
                      {t.quote}
                    </p>
                  </div>
                  <div>
                    <div
                      className={`w-full h-[1px] ease-in-out ${isTransitioning ? "duration-500" : "duration-0"} ${focused ? "bg-[#FBD47B]/20" : isDark ? "bg-white/10" : "bg-[#011434]/10"} mb-4`}
                    />
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border ease-in-out ${isTransitioning ? "duration-500" : "duration-0"} ${focused ? "border-[#FBD47B]" : "border-transparent"}`}
                      >
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4
                          className={`${textColor} text-xs md:text-sm font-semibold tracking-wide truncate ease-in-out ${isTransitioning ? "duration-500" : "duration-0"}`}
                        >
                          {t.name}
                        </h4>
                        <p
                          className={`${textMuted} text-[10px] md:text-xs uppercase font-medium truncate ease-in-out tracking-[0.12em] ${isTransitioning ? "duration-500" : "duration-0"}`}
                        >
                          {t.origin}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] md:text-xs tracking-wider text-[#FBD47B] font-semibold uppercase mt-3 block text-right opacity-80">
                      {t.property.split(", ")[1] || t.property}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 items-center justify-center md:mt-4">
          {BASE.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!lockedRef.current) {
                  setIsTransitioning(true);
                  setIdx(N + i);
                }
              }}
              aria-label={`Slide ${i + 1}`}
              className={`h-[3px] rounded-full transition-all duration-500 ease-out border-none p-0 cursor-pointer ${i === dotIdx ? "w-8 bg-[#FBD47B]" : `w-2 ${isDark ? "bg-white/20 hover:bg-white/40" : "bg-[#011434]/25 hover:bg-[#011434]/40"}`}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
