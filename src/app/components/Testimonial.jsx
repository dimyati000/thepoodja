"use client";

import { useState, useRef, useEffect } from "react";
import { useScrollReveal, revealStyle } from "../../hooks/useScrollReveal";

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

  // PERBAIKAN STRUKTUR LEBAR KARTU & GAP
  const gap = isMobile ? 16 : 24;
  // Di desktop, kita kurangi total gap dari container utama agar 3 kartu muat presisi
  const cardWidth = isMobile ? "100%" : "calc((100% - 48px) / 3)";

  return (
    <section
      id="testimonials"
      className={`${bgColor} pt-12 pb-16 md:pt-20 md:pb-24 transition-colors duration-500 overflow-hidden`}
    >
      {/* Header */}
      <div
        ref={sRef}
        style={{
          padding: "30px 24px 10px",
          textAlign: "center",
          ...revealStyle(sInView),
        }}
        className="mb-12 md:mb-16 flex flex-col items-center"
      >
        <p
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            color: isDark ? "#FCD57B" : "#8B6B2E",
            fontSize: "10px",
            letterSpacing: "0.45em",
            fontWeight: 700,
            marginBottom: "18px",
            textTransform: "uppercase",
          }}
        >
          Voices of Our Guests
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: isDark ? "#FFFFFF" : "#111111",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 300,
            letterSpacing: "0.08em",
          }}
          className="transition-colors duration-500"
        >
          WHAT OUR GUESTS SAY
        </h2>
        <div
          style={{
            width: "40px",
            height: "1px",
            background: isDark ? "#FCD57B" : "#8B6B2E",
            marginTop: "22px",
            opacity: 0.75,
          }}
        />
      </div>

      {/* Slider Container */}
      <div className="w-full max-w-[1200px] mx-auto relative px-4 md:px-12">
        {/* Nav Buttons */}
        <button
          onClick={handlePrev}
          className={`absolute left-2 lg:left-[-10px] top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full border ${border} ${navBg} hover:border-[#FBD47B] hover:text-[#FBD47B] transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer`}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className={`absolute right-2 lg:right-[-10px] top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full border ${border} ${navBg} hover:border-[#FBD47B] hover:text-[#FBD47B] transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer`}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        <div className="w-full overflow-hidden py-6">
          <div
            className="flex"
            onTransitionEnd={handleTransitionEnd}
            style={{
              gap: `${gap}px`,
              /* KUNCI POROS TENGAH: 
                 Rumus di bawah menghitung pergeseran koordinat X berdasarkan lebar kartu asli (`${cardWidth}`) secara dinamis ditambah kompensasi gap, 
                 lalu di-offset menggunakan penambahan lebar satu kartu agar kartu ke-idx selalu jatuh tepat di tengah container.
              */
              transform: isMobile
                ? `translateX(calc(-${idx} * 100% - ${idx} * ${gap}px))`
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
                        : `scale-[0.98] md:scale-95 ${cardInactive} ${border} opacity-25 hover:opacity-50`
                    }`}
                >
                  <div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <svg
                          key={j}
                          width="11"
                          height="11"
                          viewBox="0 0 13 13"
                          className="fill-[#FBD47B]"
                        >
                          <path d="M6.5 1l1.46 2.96 3.27.47-2.36 2.3.56 3.27L6.5 9.5 4.07 10l.56-3.27L2.27 4.43l3.27-.47L6.5 1z" />
                        </svg>
                      ))}
                    </div>
                    <div
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      className={`text-5xl h-4 select-none pointer-events-none font-light -ml-1 mb-2 ease-in-out ${isTransitioning ? "duration-500" : "duration-0"} ${focused ? "text-[#FBD47B]" : "text-[#FBD47B]/30"}`}
                    >
                      &ldquo;
                    </div>
                    <p
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      className={`${textColor} text-base md:text-lg font-light italic leading-relaxed mb-6 ease-in-out ${isTransitioning ? "duration-500" : "duration-0"}`}
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
                          style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                          className={`${textColor} text-xs md:text-sm font-semibold tracking-wide truncate ease-in-out ${isTransitioning ? "duration-500" : "duration-0"}`}
                        >
                          {t.name}
                        </h4>
                        <p
                          style={{
                            fontFamily: "'Nunito Sans', sans-serif",
                            letterSpacing: "0.12em",
                          }}
                          className={`${textMuted} text-[8.5px] uppercase font-medium truncate ease-in-out ${isTransitioning ? "duration-500" : "duration-0"}`}
                        >
                          {t.origin}
                        </p>
                      </div>
                    </div>
                    <p
                      style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                      className="text-[8px] tracking-wider text-[#FBD47B] font-semibold uppercase mt-3 block text-right opacity-80"
                    >
                      {t.property.split(", ")[1] || t.property}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 items-center justify-center mt-10">
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
