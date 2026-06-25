"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export function RoomGallery({ images = [], alt = "", isDark }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const isOpen = lightboxIdx !== null;

  const close = useCallback(() => setLightboxIdx(null), []);
  const next = useCallback(
    () => setLightboxIdx((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setLightboxIdx((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  if (!images.length) return null;

  const [main, ...rest] = images;
  const sideImages = rest.slice(0, 2);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 h-[340px] sm:h-[420px] md:h-[520px]">
        <button
          onClick={() => setLightboxIdx(0)}
          className="relative md:col-span-7 h-full w-full overflow-hidden group cursor-pointer border-none p-0 bg-neutral-900"
        >
          <Image
            src={main}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </button>

        {sideImages.length > 0 && (
          <div className="hidden md:grid md:col-span-5 grid-rows-2 gap-3 h-full">
            {sideImages.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setLightboxIdx(i + 1)}
                className="relative w-full h-full overflow-hidden group cursor-pointer border-none p-0 bg-neutral-900"
              >
                <Image
                  src={src}
                  alt={`${alt} detail ${i + 1}`}
                  fill
                  sizes="40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {i === sideImages.length - 1 && images.length > 3 && (
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-[0.3em] uppercase">
                      +{images.length - 3} More
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* View all photos pill — mobile + desktop */}
      <button
        onClick={() => setLightboxIdx(0)}
        className={`mt-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 border transition-colors duration-300 ${
          isDark
            ? "border-white/20 text-white hover:border-white/50"
            : "border-[#011434]/20 text-[#011434] hover:border-[#011434]/50"
        }`}
      >
        View All {images.length} Photos
      </button>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 text-white/70 hover:text-white text-2xl bg-transparent border-none cursor-pointer p-2"
          >
            ✕
          </button>

          <div className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-[16/9]">
            <Image
              src={images[lightboxIdx]}
              alt={`${alt} ${lightboxIdx + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="text-white/70 hover:text-white text-xl bg-transparent border border-white/20 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              ←
            </button>
            <span className="text-white/60 text-xs tracking-[0.3em] font-mono">
              {String(lightboxIdx + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              aria-label="Next photo"
              className="text-white/70 hover:text-white text-xl bg-transparent border border-white/20 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
