"use client";
import { useRef } from "react";
import Image from "next/image";
import { PropertySearchBar } from "../properties/PropertySearchBar";
import { StickySearchBar } from "../properties/StickySearchBar";
import { Icon } from "@/components/Icon";

const DEFAULT_SLIDES = [
  {
    id: 1,
    title: "Poodja Master Villa - Seminyak",
    tag: "Beachfront Sanctuaries",
    price: "From IDR 4,500,000 / night",
    imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    title: "Poodja Sanctuary - Ubud",
    tag: "Tropical Haven",
    price: "From IDR 3,800,000 / night",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title: "Poodja Oasis - Canggu",
    tag: "Chic Modern Living",
    price: "From IDR 5,200,000 / night",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  },
];

export function HeroSection({
  isDark,
  current,
  fade,
  handleSlideChange,
  handleHeroClick,
  slides,
}) {
  const frameRef = useRef(null);
  const activeSlides = (slides && slides.length > 0) ? slides : DEFAULT_SLIDES;
  const safeCurrent = current % activeSlides.length;

  return (
    <section
      id="home"
      className="relative w-full min-h-[100vh] flex flex-col justify-start select-none pt-18 md:pt-30 pb-10"
    >
      <StickySearchBar isDark={isDark} triggerRef={frameRef} />

      <div className="relative w-full lg:max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 z-10 flex flex-col">
        {/* FRAME UTAMA IMAGE SLIDER */}
        <div
          id="main-slider-frame"
          ref={frameRef}
          onClick={handleHeroClick}
          className="relative w-full h-[58vh] sm:h-[60vh] md:h-[65vh] lg:h-[78vh] rounded-sm cursor-pointer"
        >
          <div className="absolute inset-0 rounded-sm overflow-hidden z-0">
            <div
              className={`absolute inset-0 transition-all duration-750 ease-in-out ${fade ? "opacity-100 scale-100" : "opacity-0 scale-[0.99]"}`}
            >
              <Image
                src={activeSlides[safeCurrent]?.imageUrl || activeSlides[safeCurrent]?.image || DEFAULT_SLIDES[0].imageUrl}
                alt={activeSlides[safeCurrent]?.title || "Luxury Estate"}
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
              {activeSlides[safeCurrent]?.tag}
            </span>

            {/* Judul Utama */}
            <h1
              style={{
                color: isDark ? "#ffffff" : "#8B6B2E",
              }}
              className="font-serif text-2xl font-bold md:text-3xl leading-[1.35] tracking-wide mb-3 sm:mb-4 transition-colors duration-500"
            >
              {activeSlides[safeCurrent]?.title}
            </h1>

            {/* Harga */}
            <p
              style={{
                color: isDark ? "#FCD57B" : "#8B6B2E",
              }}
              className="text-xs md:text-sm font-semibold tracking-wide mb-6 sm:mb-8"
            >
              {activeSlides[safeCurrent]?.price}
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
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isDark ? "border-white/30 text-white" : "border-[#8B6B2E]/30 text-[#8B6B2E]"}`}
              >
                <Icon name="chevronRight" size={12} />
              </div>
            </button>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="w-full flex items-center gap-6 mt-4 md:mt-4 px-1 z-20">
          <div className="flex gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSlideChange(idx)}
                className="py-2 focus:outline-none pointer-events-auto cursor-pointer"
              >
                <div
                  className={`h-[2px] transition-all duration-500 ${safeCurrent === idx ? `w-8 ${isDark ? "bg-[#FCD57B]" : "bg-[#8B6B2E]"}` : `w-3 ${isDark ? "bg-white/20" : "bg-black/20"}`}`}
                />
              </button>
            ))}
          </div>
          <span
            className={`text-xs tracking-widest font-mono font-medium ${isDark ? "text-white/40" : "text-black/40"}`}
          >
            0{safeCurrent + 1} / 0{activeSlides.length}
          </span>
        </div>

        {/* Search Bar Panel */}
        <div className="w-full mt-6 md:mt-10 pointer-events-auto">
          <PropertySearchBar isDark={isDark} />
        </div>
      </div>
    </section>
  );
}
