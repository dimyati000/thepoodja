"use client";

import { useRef, useState } from "react";
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
    imageUrl:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    title: "Poodja Sanctuary - Ubud",
    tag: "Tropical Haven",
    price: "From IDR 3,800,000 / night",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title: "Poodja Oasis - Canggu",
    tag: "Chic Modern Living",
    price: "From IDR 5,200,000 / night",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
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
  const inlineSearchRef = useRef(null);
  const [stickySearchVisible, setStickySearchVisible] = useState(false);
  const activeSlides =
    slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const safeCurrent = current % activeSlides.length;

  return (
    <section
      id="home"
      className="relative flex min-h-[100vh] w-full select-none flex-col justify-start pb-10 pt-18 md:pt-30"
    >
      <StickySearchBar
        isDark={isDark}
        triggerRef={inlineSearchRef}
        onVisibilityChange={setStickySearchVisible}
      />

      <div className="relative z-10 mx-auto flex w-full flex-col px-4 sm:px-6 md:px-12 lg:max-w-[1440px]">
        {/* Main image slider */}
        <div
          id="main-slider-frame"
          onClick={handleHeroClick}
          className="relative h-[58vh] w-full cursor-pointer rounded-sm sm:h-[60vh] md:h-[65vh] lg:h-[78vh]"
        >
          <div className="absolute inset-0 z-0 overflow-hidden rounded-sm">
            <div
              className={`absolute inset-0 transition-all duration-750 ease-in-out ${
                fade
                  ? "scale-100 opacity-100"
                  : "scale-[0.99] opacity-0"
              }`}
            >
              <Image
                src={
                  activeSlides[safeCurrent]?.imageUrl ||
                  activeSlides[safeCurrent]?.image ||
                  DEFAULT_SLIDES[0].imageUrl
                }
                alt={
                  activeSlides[safeCurrent]?.title || "Luxury Estate"
                }
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>

          <div
            style={{
              backgroundColor: isDark ? "#011434" : "#ffffff",
              borderLeft: isDark
                ? "2px solid #FCD57B"
                : "2px solid #8B6B2E",
            }}
            className="info-card-container pointer-events-auto absolute bottom-4 left-4 right-4 z-30 max-w-[calc(100%-32px)] px-6 py-8 text-left shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] transition-all duration-500 sm:max-w-[420px] md:bottom-[45px] md:left-auto md:right-[-35px] md:max-w-[360px] md:px-8 md:py-10 lg:max-w-[380px]"
          >
            <span
              style={{
                letterSpacing: "0.25em",
                color: isDark ? "#FCD57B" : "#8B6B2E",
              }}
              className="mb-2.5 block text-[10px] font-normal uppercase sm:mb-3 md:text-xs"
            >
              {activeSlides[safeCurrent]?.tag}
            </span>

            <h1
              style={{ color: isDark ? "#ffffff" : "#8B6B2E" }}
              className="mb-3 font-serif text-2xl font-bold leading-[1.35] tracking-wide transition-colors duration-500 sm:mb-4 md:text-3xl"
            >
              {activeSlides[safeCurrent]?.title}
            </h1>

            <p
              style={{ color: isDark ? "#FCD57B" : "#8B6B2E" }}
              className="mb-6 text-xs font-semibold tracking-wide sm:mb-8 md:text-sm"
            >
              {activeSlides[safeCurrent]?.price}
            </p>

            <button
              type="button"
              style={{
                color: isDark ? "#ffffff" : "#8B6B2E",
                letterSpacing: "0.2em",
              }}
              className="group flex cursor-pointer items-center gap-3 border-none bg-transparent text-[10px] font-bold uppercase outline-none transition-colors duration-500 md:text-xs"
            >
              <span className="opacity-90 transition-opacity group-hover:opacity-100">
                View Details
              </span>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110 ${
                  isDark
                    ? "border-white/30 text-white"
                    : "border-[#8B6B2E]/30 text-[#8B6B2E]"
                }`}
              >
                <Icon name="chevronRight" size={12} />
              </div>
            </button>
          </div>
        </div>

        {/* Slider indicators */}
        <div className="z-20 mt-4 flex w-full items-center gap-6 px-1 md:mt-4">
          <div className="flex gap-2">
            {activeSlides.map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => handleSlideChange(idx)}
                className="pointer-events-auto cursor-pointer py-2 focus:outline-none"
              >
                <div
                  className={`h-[2px] transition-all duration-500 ${
                    safeCurrent === idx
                      ? `w-8 ${
                          isDark ? "bg-[#FCD57B]" : "bg-[#8B6B2E]"
                        }`
                      : `w-3 ${
                          isDark ? "bg-white/20" : "bg-black/20"
                        }`
                  }`}
                />
              </button>
            ))}
          </div>
          <span
            className={`font-mono text-xs font-medium tracking-widest ${
              isDark ? "text-white/40" : "text-black/40"
            }`}
          >
            0{safeCurrent + 1} / 0{activeSlides.length}
          </span>
        </div>

        {/* Inline search: hidden while the bottom popup is active */}
        <div
          ref={inlineSearchRef}
          aria-hidden={stickySearchVisible}
          className={`pointer-events-auto mt-6 w-full transition-opacity duration-300 md:mt-10 ${
            stickySearchVisible
              ? "invisible pointer-events-none opacity-0"
              : "visible opacity-100"
          }`}
        >
          <PropertySearchBar isDark={isDark} />
        </div>
      </div>
    </section>
  );
}