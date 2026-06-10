"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1692736933760-8a8a9b8c1b6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    tag: "CONDOMINIUM",
    title: "A dramatic feature modern barn house",
    desc: "Experience the pinnacle of high-end living in our meticulously crafted modern spaces.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80",
    tag: "LUXURY VILLA",
    title: "The sanctuary of tropical paradise",
    desc: "Unwind within private luxury pools surrounded by Bali's breathtaking nature landscapes.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
    tag: "EXCLUSIVE RESIDENCE",
    title: "Timeless aesthetics meet nature",
    desc: "Every architectural detail is curated to build a legacy of comfort and absolute peace.",
  },
];

const PROP_TYPES = ["Villa", "House", "Apartment", "Resort"];

export function HeroSection({ isDark }) {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [propType, setPropType] = useState("");

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const handleSlideChange = useCallback(
    (index) => {
      if (index === current) return;
      setFade(false);
      setTimeout(() => {
        setCurrent(index);
        setFade(true);
      }, 400);
    },
    [current],
  );

  useEffect(() => {
    const handleNext = () => {
      const nextIdx = (current + 1) % SLIDES.length;
      handleSlideChange(nextIdx);
    };

    const handlePrev = () => {
      const prevIdx = (current - 1 + SLIDES.length) % SLIDES.length;
      handleSlideChange(prevIdx);
    };

    window.addEventListener("nextHeroSlide", handleNext);
    window.addEventListener("prevHeroSlide", handlePrev);

    return () => {
      window.removeEventListener("nextHeroSlide", handleNext);
      window.removeEventListener("prevHeroSlide", handlePrev);
    };
  }, [current, handleSlideChange]);

  // 🏛️ Kontras Latar Belakang Gradasi Adaptif
  const overlayBg = isDark
    ? "linear-gradient(180deg, rgba(1,20,52,0.85) 0%, rgba(1,20,52,0.5) 50%, rgba(1,20,52,0.95) 100%)"
    : "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.9) 100%)";

  return (
    <section
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 750,
        overflow: "hidden",
      }}
      className="flex flex-col justify-between pt-28 pb-8 select-none"
    >
      {/* Background Image Slider */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${fade ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <Image
            className="animate-zoom-bg"
            src={SLIDES[current].image}
            alt="Luxury Villa"
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div
          style={{ position: "absolute", inset: 0, background: overlayBg }}
          className="transition-colors duration-500"
        />
      </div>

      {/* 🏛️ Logo Tengah Adaptif dengan Kontras Tema Absolut */}
      <div className="relative z-20 w-full flex flex-col items-center px-6 mt-14 md:mt-20 lg:mt-24 pointer-events-none">
        <Image
          src={isDark ? "/logo-gold2.png" : "/logo-black2.png"}
          alt="The Poodja"
          width={1200}
          height={600}
          priority
          style={{
            height: "auto",
            animation: "heroFadeIn 1.4s cubic-bezier(0.16,1,0.3,1) both",
          }}
          className="w-48 sm:w-60 md:w-80 lg:w-96"
        />
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            height: "32px",
            background: isDark ? "rgba(251,212,123,0.38)" : "rgba(0,0,0,0.25)",
            marginTop: "16px",
            animation: "heroFadeIn 1.4s 0.1s cubic-bezier(0.16,1,0.3,1) both",
          }}
        />
      </div>

      {/* Judul Konten & Info Card Adaptif */}
      <div className="relative z-30 max-w-300 w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto pointer-events-none">
        <div className="lg:col-span-7 space-y-2 text-center lg:text-left pt-12">
          <span
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: isDark ? "#FCD57B" : "#000000",
            }}
            className={`block text-[9px] tracking-[0.4em] font-bold uppercase transition-all duration-500 ${fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
          >
            {SLIDES[current].tag}
          </span>
          <h1
            style={{ lineHeight: "1.25" }}
            className={`text-3xl md:text-5xl font-light tracking-wide max-w-xl transition-all duration-500 delay-75 ${isDark ? "text-white" : "text-black"} ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {SLIDES[current].title}
          </h1>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end pointer-events-auto pt-12">
          <div
            style={{
              backgroundColor: isDark
                ? "rgba(1,20,52,0.8)"
                : "rgba(255,255,255,0.9)",
              borderColor: isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.08)",
            }}
            className="p-6 backdrop-blur-md border rounded-sm max-w-sm space-y-4 shadow-xl transition-all duration-500"
          >
            <p
              className={`text-xs font-light leading-relaxed ${isDark ? "text-white/60" : "text-black/70"}`}
            >
              {SLIDES[current].desc}
            </p>
            <button
              style={{ color: isDark ? "#FCD57B" : "#000000" }}
              className="group flex items-center gap-3 text-[9px] font-bold tracking-[0.3em] uppercase bg-transparent border-none outline-none"
            >
              <span>VIEW DETAILS</span>
              <div
                style={{ backgroundColor: isDark ? "#FCD57B" : "#000000" }}
                className="w-6 h-px transition-all duration-300 group-hover:w-12"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar & Indikator Manual Adaptif */}
      <div className="relative z-30 w-full max-w-300 mx-auto px-6 space-y-6">
        <div
          style={{
            width: "100%",
            background: isDark
              ? "rgba(1,20,52,0.82)"
              : "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.08)",
            animation: "heroSlideUp 1.4s 0.25s cubic-bezier(0.16,1,0.3,1) both",
          }}
          className={`grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x ${isDark ? "divide-white/10" : "divide-black/10"} rounded-sm shadow-2xl overflow-hidden`}
        >
          {/* Destination */}
          <div
            className={`padding-wrapper p-4 transition-all duration-300 ${isDark ? "focus-within:bg-white/5" : "focus-within:bg-black/5"}`}
          >
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                color: isDark ? "#FCD57B" : "#000000",
                fontSize: "7.5px",
                letterSpacing: "0.35em",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "5px",
              }}
            >
              Destination
            </p>
            <input
              type="text"
              placeholder="Enter location or villa name"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "12.5px",
                fontWeight: 300,
                color: isDark ? "#ffffff" : "#000000",
                width: "100%",
              }}
              className={`focus:outline-none ${isDark ? "placeholder:text-white/30" : "placeholder:text-black/30"}`}
            />
          </div>

          {/* Date Picker */}
          <div
            className={`padding-wrapper p-4 transition-all duration-300 ${isDark ? "focus-within:bg-white/5" : "focus-within:bg-black/5"}`}
          >
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                color: isDark ? "#FCD57B" : "#000000",
                fontSize: "7.5px",
                letterSpacing: "0.35em",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "5px",
              }}
            >
              Check In — Check Out
            </p>
            <input
              type="text"
              placeholder="Select dates"
              value={dates}
              onFocus={(e) => {
                e.target.type = "date";
              }}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              onChange={(e) => setDates(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "12.5px",
                fontWeight: 300,
                color: isDark ? "#ffffff" : "#000000",
                width: "100%",
                colorScheme: isDark ? "dark" : "light",
              }}
              className={`focus:outline-none ${isDark ? "placeholder:text-white/30" : "placeholder:text-black/30"}`}
            />
          </div>

          {/* Property Type */}
          <div
            className={`padding-wrapper p-4 transition-all duration-300 ${isDark ? "focus-within:bg-white/5" : "focus-within:bg-black/5"}`}
          >
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                color: isDark ? "#FCD57B" : "#000000",
                fontSize: "7.5px",
                letterSpacing: "0.35em",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "5px",
              }}
            >
              Property Type
            </p>
            <select
              value={propType}
              onChange={(e) => setPropType(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "12.5px",
                fontWeight: 300,
                color: propType
                  ? isDark
                    ? "#ffffff"
                    : "#000000"
                  : isDark
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(0,0,0,0.3)",
                width: "100%",
                cursor: "pointer",
                appearance: "none",
              }}
              className="focus:outline-none"
            >
              <option
                value=""
                style={{
                  background: isDark ? "#011434" : "#ffffff",
                  color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                }}
              >
                Select type
              </option>
              {PROP_TYPES.map((t) => (
                <option
                  key={t}
                  value={t}
                  style={{
                    background: isDark ? "#011434" : "#ffffff",
                    color: isDark ? "#ffffff" : "#000000",
                  }}
                >
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            style={{
              background: isDark ? "#FCD57B" : "#000000",
              color: isDark ? "#011434" : "#ffffff",
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              border: "none",
            }}
            className={`w-full h-full py-4 md:py-0 transition-all duration-300 ${isDark ? "hover:bg-[#fcdfa2] focus:ring-[#FCD57B]" : "hover:bg-neutral-800 focus:ring-black"} hover:letter-spacing-[0.35em] active:scale-[0.98] focus:outline-none focus:ring-2`}
          >
            Search
          </button>
        </div>

        {/* Garis Indikator Bawah Adaptif */}
        <div
          className={`flex justify-between items-center ${isDark ? "opacity-60" : "opacity-80"}`}
        >
          <div className="flex gap-3">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSlideChange(idx);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "8px 0",
                }}
                className="group focus:outline-none"
              >
                <div
                  style={{
                    backgroundColor:
                      current === idx ? (isDark ? "#FCD57B" : "#000000") : "",
                  }}
                  className={`h-0.5 transition-all duration-500 ${current === idx ? "w-12" : `w-4 ${isDark ? "bg-white/30 group-hover:bg-white/60" : "bg-black/20 group-hover:bg-black/50"}`}`}
                />
              </button>
            ))}
          </div>
          <span
            className={`text-[9px] tracking-[0.2em] font-medium ${isDark ? "text-white/40" : "text-black/50"}`}
          >
            0{current + 1} / 0{SLIDES.length}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-zoom-bg { animation: slowZoom 25s infinite alternate ease-in-out; }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
      `}</style>
    </section>
  );
}
