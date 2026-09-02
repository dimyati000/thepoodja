"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useSettings } from "@/components/SettingsProvider";

function getImageSource(image) {
  if (typeof image === "string") return image;
  return image?.src || image?.url || image?.imageUrl || image?.image_url || "";
}

export function MonthlyHeroBanner({ villas = [], text }) {
  const { language } = useSettings();
  const slides = useMemo(
    () =>
      villas
        .map((villa) => ({
          id: `${villa.groupId}-${villa.id}`,
          src: getImageSource(villa.gallery?.[0]),
          name: villa.name,
          location: villa.groupLocation,
          href: `/monthly/${villa.groupId}/${villa.id}`,
        }))
        .filter((slide) => slide.src)
        .slice(0, 8),
    [villas],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const normalizedActiveIndex = activeIndex % slides.length;
  const activeSlide = slides[normalizedActiveIndex];
  const previousLabel = language === "ID" ? "Sebelumnya" : "Previous";
  const nextLabel = language === "ID" ? "Berikutnya" : "Next";
  const viewLabel = language === "ID" ? "Lihat villa" : "View villa";

  const move = (direction) => {
    setActiveIndex(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };

  return (
    <section
      className="relative min-h-[620px] overflow-hidden bg-[#06101d] pt-20 md:min-h-[760px]"
      aria-roledescription="carousel"
      aria-label="Monthly villa highlights"
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <Image
            key={slide.id}
            src={slide.src}
            alt={`${slide.name} - ${slide.location}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-out ${
              index === normalizedActiveIndex
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-[1.025] opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

      <div className="relative z-10 mx-auto flex min-h-[540px] w-full max-w-[1380px] flex-col justify-end px-6 pb-24 pt-24 md:min-h-[680px] md:pb-28">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.38em] text-[#FCD57B] md:text-xs">
          {text.eyebrow}
        </p>
        <h1
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="max-w-3xl text-4xl font-semibold uppercase leading-none tracking-wide text-white md:text-6xl"
        >
          {text.title}
        </h1>
        <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-white/75 md:text-base">
          {text.heroDesc}
        </p>

        <div className="mt-9 flex flex-wrap items-end justify-between gap-6 border-t border-white/25 pt-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FCD57B]">
              {activeSlide.location}, Bali
            </p>
            <p
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              className="mt-1 text-2xl tracking-wide text-white md:text-3xl"
            >
              {activeSlide.name}
            </p>
          </div>

          <Link
            href={activeSlide.href}
            className="flex items-center gap-3 border-b border-[#FCD57B] pb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#FCD57B]"
          >
            {viewLabel}
            <Icon name="chevronRight" size={12} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 z-20 flex w-[calc(100%-3rem)] max-w-xl -translate-x-1/2 items-center gap-4 text-white md:bottom-24">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={previousLabel}
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/35 transition-colors hover:border-[#FCD57B] hover:text-[#FCD57B]"
        >
          <Icon name="chevronLeft" size={14} />
        </button>

        <div className="flex flex-1 items-center gap-2">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Slide ${index + 1}`}
              aria-current={index === normalizedActiveIndex}
              className="h-5 flex-1 py-[9px]"
            >
              <span
                className={`block h-px transition-colors ${
                  index === normalizedActiveIndex ? "bg-[#FCD57B]" : "bg-white/35"
                }`}
              />
            </button>
          ))}
        </div>

        <span className="font-numbers text-[9px] tracking-[0.2em] text-white/70">
          {String(normalizedActiveIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={() => move(1)}
          aria-label={nextLabel}
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/35 transition-colors hover:border-[#FCD57B] hover:text-[#FCD57B]"
        >
          <Icon name="chevronRight" size={14} />
        </button>
      </div>
    </section>
  );
}
