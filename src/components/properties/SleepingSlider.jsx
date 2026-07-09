"use client";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { SectionLabel } from "@/components/SectionLabel";

export function SleepingSlider({ label, title, items = [], isDark }) {
  const perPage = 2;
  const pageCount = Math.max(1, Math.ceil(items.length / perPage));
  const pages = Array.from({ length: pageCount }, (_, i) =>
    items.slice(i * perPage, i * perPage + perPage),
  );

  const [pageIdx, setPageIdx] = useState(0);
  const canSlide = pageCount > 1;
  const isAtStart = pageIdx === 0;
  const isAtEnd = pageIdx === pageCount - 1;

  const goPrev = () => setPageIdx((i) => Math.max(0, i - 1));
  const goNext = () => setPageIdx((i) => Math.min(pageCount - 1, i + 1));

  const accent = isDark ? "#FCD57B" : "#8B6B2E";
  const arrowBorder = isDark ? "rgba(252,213,123,0.4)" : "rgba(139,107,46,0.4)";
  const arrowBorderDisabled = isDark
    ? "rgba(255,255,255,0.1)"
    : "rgba(0,0,0,0.1)";

  return (
    <div>
      <SectionLabel isDark={isDark} className="mb-3">
        {label}
      </SectionLabel>
      <div className="flex items-center justify-between gap-4 mb-10">
        <h2
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="text-2xl sm:text-3xl font-light tracking-wide uppercase"
        >
          {title}
        </h2>
        {canSlide && (
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={goPrev}
              disabled={isAtStart}
              aria-label="Previous rooms"
              style={{
                borderColor: isAtStart ? arrowBorderDisabled : arrowBorder,
              }}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 hover:bg-black/5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <Icon
                name="chevronLeft"
                size={16}
                style={{
                  color: isAtStart ? (isDark ? "#666" : "#999") : accent,
                }}
              />
            </button>
            <button
              onClick={goNext}
              disabled={isAtEnd}
              aria-label="Next rooms"
              style={{
                borderColor: isAtEnd ? arrowBorderDisabled : arrowBorder,
              }}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 hover:bg-black/5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <Icon
                name="chevronRight"
                size={16}
                style={{ color: isAtEnd ? (isDark ? "#666" : "#999") : accent }}
              />
            </button>
          </div>
        )}
      </div>

      {/* Viewport slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${pageCount * 100}%`,
            transform: `translateX(-${pageIdx * (100 / pageCount)}%)`,
          }}
        >
          {pages.map((page, pi) => (
            <div
              key={pi}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
              style={{ width: `${100 / pageCount}%` }}
            >
              {page.map((bed, i) => (
                <div key={`${bed.name}-${pi}-${i}`}>
                  <div
                    className="mb-4"
                    // style={{
                    //   filter: isDark
                    //     ? "drop-shadow(0 18px 30px rgba(0,0,0,0.45))"
                    //     : "drop-shadow(0 14px 28px rgba(0,0,0,0.18))",
                    // }}
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
                      <Image
                        src={bed.image}
                        alt={bed.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  <h4 className="font-serif text-base font-medium tracking-wide mb-1">
                    {bed.name}
                  </h4>
                  <p
                    className={`text-[12px] font-light ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {bed.bedConfig} / {bed.bathConfig}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
