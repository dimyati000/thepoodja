"use client";
import { useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    tag: "CONDOMINIUM",
    title: "Find your own self in vintage lake house",
    price: "Rp 11.250.000.000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
    tag: "LUXURY VILLA",
    title: "The sanctuary of tropical paradise",
    price: "Rp 14.500.000.000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
    tag: "EXCLUSIVE RESIDENCE",
    title: "Timeless aesthetics meet nature",
    price: "Rp 18.200.000.000",
  },
];

const PROP_TYPES = ["Villa", "House", "Apartment", "Resort"];

export function HeroSection({
  isDark,
  current,
  fade,
  handleSlideChange,
  handleHeroClick,
}) {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [propType, setPropType] = useState("");

  return (
    <section
      id="home"
      className="relative w-full min-h-[100vh] flex flex-col justify-start select-none pt-18 md:pt-30 pb-10"
    >
      <div className="relative w-full lg:max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 z-10 flex flex-col">
        {/* FRAME UTAMA IMAGE SLIDER */}
        <div
          id="main-slider-frame"
          onClick={handleHeroClick}
          className="relative w-full h-[58vh] sm:h-[60vh] md:h-[65vh] lg:h-[78vh] rounded-sm"
        >
          <div className="absolute inset-0 rounded-sm overflow-hidden z-0">
            <div
              className={`absolute inset-0 transition-all duration-750 ease-in-out ${fade ? "opacity-100 scale-100" : "opacity-0 scale-[0.99]"}`}
            >
              <Image
                src={SLIDES[current].image}
                alt="Luxury Estate"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>

          <div
            style={{
              backgroundColor: isDark ? "#011434" : "#ffffff",
              borderLeft: isDark ? "2px solid #FCD57B" : "2px solid #8B6B2E",
            }}
            className="info-card-container absolute bottom-4 left-4 right-4 md:bottom-[45px] md:right-[-35px] md:left-auto z-30 max-w-[calc(100%-32px)] sm:max-w-[420px] md:max-w-[360px] lg:max-w-[380px] py-8 px-6 md:py-10 md:px-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] text-left pointer-events-auto transition-all duration-500"
          >
            <span
              style={{
                letterSpacing: "0.25em",
                color: isDark ? "#FCD57B" : "#8B6B2E",
              }}
              className="block text-[10px] md:text-xs font-normal uppercase mb-2.5 sm:mb-3"
            >
              {SLIDES[current].tag}
            </span>

            {/* Judul Utama */}
            <h1
              style={{
                color: isDark ? "#ffffff" : "#8B6B2E",
              }}
              className="font-serif text-2xl font-bold md:text-3xl leading-[1.35] tracking-wide mb-3 sm:mb-4 transition-colors duration-500"
            >
              {SLIDES[current].title}
            </h1>

            {/* Harga */}
            <p
              style={{
                color: isDark ? "#FCD57B" : "#8B6B2E",
              }}
              className="text-xs md:text-sm font-semibold tracking-wide mb-6 sm:mb-8"
            >
              {SLIDES[current].price}
            </p>

            {/* Tombol Aksi */}
            <button
              style={{
                color: isDark ? "#ffffff" : "#8B6B2E",
                letterSpacing: "0.2em",
              }}
              className="group flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase bg-transparent border-none outline-none cursor-pointer transition-colors duration-500"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                VIEW DETAILS
              </span>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110
      ${isDark ? "border-white/30 text-white" : "border-[#8B6B2E]/30 text-[#8B6B2E]"}`}
              >
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="w-full flex items-center gap-6 mt-4 md:mt-4 px-1 z-20">
          <div className="flex gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSlideChange(idx)}
                className="py-2 focus:outline-none pointer-events-auto cursor-pointer"
              >
                <div
                  className={`h-[2px] transition-all duration-500 ${current === idx ? `w-8 ${isDark ? "bg-[#FCD57B]" : "bg-[#8B6B2E]"}` : `w-3 ${isDark ? "bg-white/20" : "bg-black/20"}`}`}
                />
              </button>
            ))}
          </div>
          <span
            className={`text-xs tracking-widest font-mono font-medium ${isDark ? "text-white/40" : "text-black/40"}`}
          >
            0{current + 1} / 0{SLIDES.length}
          </span>
        </div>

        {/* Search Bar Panel */}
        <div className="w-full mt-6 md:mt-10 pointer-events-auto">
          <div
            style={{
              background: isDark
                ? "rgba(1,20,52,0.85)"
                : "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.06)",
            }}
            className={`grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x ${isDark ? "divide-white/10" : "divide-black/10"} rounded-sm shadow-sm overflow-hidden`}
          >
            {/* Destination */}
            <div className="p-4">
              <p
                style={{ letterSpacing: "0.2em" }}
                className={`text-xs font-bold uppercase mb-1.5 ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
              >
                Destination
              </p>
              <input
                type="text"
                placeholder="Enter location or villa name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ color: isDark ? "#ffffff" : "#011434" }}
                className="bg-transparent border-none outline-none text-xs font-light w-full placeholder:text-neutral-400"
              />
            </div>

            {/* Check In / Out */}
            <div className="p-4">
              <p
                style={{ letterSpacing: "0.2em" }}
                className={`text-xs font-bold uppercase mb-1.5 ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
              >
                Check In — Check Out
              </p>
              <input
                type="text"
                placeholder="Select dates"
                value={dates}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => !e.target.value && (e.target.type = "text")}
                onChange={(e) => setDates(e.target.value)}
                style={{
                  color: isDark ? "#ffffff" : "#011434",
                  colorScheme: isDark ? "dark" : "light",
                }}
                className="bg-transparent border-none outline-none text-xs font-light w-full placeholder:text-neutral-400"
              />
            </div>

            {/* Property Type */}
            <div className="p-4">
              <p
                style={{ letterSpacing: "0.2em" }}
                className={`text-xs font-bold uppercase mb-1.5 ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
              >
                Property Type
              </p>
              <select
                value={propType}
                onChange={(e) => setPropType(e.target.value)}
                style={{
                  color: propType
                    ? isDark
                      ? "#ffffff"
                      : "#011434"
                    : "rgba(128,128,128,0.5)",
                }}
                className="bg-transparent border-none outline-none text-xs font-light w-full cursor-pointer appearance-none"
              >
                <option
                  value=""
                  className={isDark ? "bg-[#011434]" : "bg-white"}
                >
                  Select type
                </option>
                {PROP_TYPES.map((t) => (
                  <option
                    key={t}
                    value={t}
                    className={isDark ? "bg-[#011434]" : "bg-white"}
                  >
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              style={{
                background: isDark ? "#FCD57B" : "#8B6B2E",
                color: isDark ? "#011434" : "#ffffff",
                letterSpacing: "0.25em",
              }}
              className="w-full h-full py-4 md:py-0 text-xs sm:text-sm font-bold uppercase transition-all duration-300 hover:brightness-95 active:scale-[0.99] cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
