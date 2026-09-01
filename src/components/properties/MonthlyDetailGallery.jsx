"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { useSettings } from "@/components/SettingsProvider";

function getImageSource(image) {
  if (typeof image === "string") return image;
  return image?.src || image?.url || image?.imageUrl || image?.image_url || "";
}

export function MonthlyDetailGallery({ images = [], alt, isDark }) {
  const { language } = useSettings();
  const slides = images.map(getImageSource).filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const viewportRef = useRef(null);
  const slideRefs = useRef([]);
  const scrollFrameRef = useRef(null);

  const scrollToIndex = useCallback(
    (index) => {
      if (!slides.length) return;

      const nextIndex = Math.min(Math.max(index, 0), slides.length - 1);
      const viewport = viewportRef.current;
      const slide = slideRefs.current[nextIndex];
      if (!viewport || !slide) return;

      const viewportRect = viewport.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const target =
        viewport.scrollLeft +
        slideRect.left -
        viewportRect.left -
        (viewport.clientWidth - slideRect.width) / 2;

      setActiveIndex(nextIndex);
      viewport.scrollTo({ left: target, behavior: "smooth" });
    },
    [slides.length],
  );

  useEffect(
    () => () => {
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    },
    [],
  );

  const handleScroll = () => {
    if (scrollFrameRef.current) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewportRect.left + viewportRect.width / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    });
  };

  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    event.currentTarget.scrollLeft += event.deltaY;
  };

  if (!slides.length) return null;

  const previousLabel = language === "ID" ? "Sebelumnya" : "Previous";
  const nextLabel = language === "ID" ? "Berikutnya" : "Next";

  return (
    <div
      className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-8 md:py-12 ${
        isDark ? "bg-[#010e22]" : "bg-[#e9edf4]"
      }`}
    >
      <div
        ref={viewportRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        className="hide-scrollbar flex snap-x snap-mandatory items-center gap-3 overflow-x-auto px-[7vw] sm:gap-6 sm:px-[16vw] lg:px-[19vw]"
        aria-label={`${alt} monthly gallery`}
      >
        {slides.map((src, index) => {
          const isActive = activeIndex === index;

          return (
            <figure
              key={`${src}-${index}`}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              onClick={() => {
                if (!isActive) scrollToIndex(index);
              }}
              className={`w-[86vw] max-w-[920px] shrink-0 snap-center transition-all duration-700 ease-out sm:w-[68vw] lg:w-[62vw] ${
                isActive
                  ? "scale-100 opacity-100"
                  : "cursor-pointer scale-[0.92] opacity-55 hover:opacity-75"
              }`}
            >
              <div className="relative h-[300px] overflow-hidden bg-neutral-900 sm:h-[430px] lg:h-[540px]">
                <Image
                  src={src}
                  alt={`${alt} - ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 86vw, (max-width: 1024px) 68vw, 62vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.025]"
                />
              </div>

              <figcaption
                className={`flex items-center justify-between border-x border-b px-4 py-3 text-[9px] uppercase tracking-[0.2em] ${
                  isDark
                    ? "border-white/10 bg-[#010e22] text-white/65"
                    : "border-[#011434]/10 bg-[#f8f9fb] text-[#011434]/65"
                }`}
              >
                <span className="truncate">{alt}</span>
                <span className="font-numbers">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="mx-auto mt-7 flex w-full max-w-xl items-center justify-center gap-4 px-6 sm:mt-9">
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label={previousLabel}
          className="flex items-center gap-2 text-[8px] uppercase tracking-[0.16em] transition-opacity disabled:cursor-not-allowed disabled:opacity-25"
        >
          <Icon name="chevronLeft" size={12} />
          <span className="hidden sm:inline">{previousLabel}</span>
        </button>

        <div
          className={`relative h-px flex-1 overflow-hidden ${
            isDark ? "bg-white/20" : "bg-[#011434]/20"
          }`}
        >
          <span
            className={`absolute inset-y-0 left-0 transition-[width] duration-500 ${
              isDark ? "bg-[#FCD57B]" : "bg-[#8B6B2E]"
            }`}
            style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
          />
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === slides.length - 1}
          aria-label={nextLabel}
          className="flex items-center gap-2 text-[8px] uppercase tracking-[0.16em] transition-opacity disabled:cursor-not-allowed disabled:opacity-25"
        >
          <span className="hidden sm:inline">{nextLabel}</span>
          <Icon name="chevronRight" size={12} />
        </button>
      </div>

      <p className="mt-3 text-center font-numbers text-[9px] tracking-[0.28em] opacity-55">
        {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </p>
    </div>
  );
}
