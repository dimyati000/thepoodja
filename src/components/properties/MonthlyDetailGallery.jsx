"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { useSettings } from "@/components/SettingsProvider";

function getImageSource(image) {
  if (typeof image === "string") return image;
  return image?.src || image?.url || image?.imageUrl || image?.image_url || "";
}

function modulo(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

export function MonthlyDetailGallery({ images = [], alt, isDark }) {
  const { language } = useSettings();
  const slides = useMemo(
    () => images.map(getImageSource).filter(Boolean),
    [images],
  );
  const initialIndex = slides.length > 1 ? 1 : 0;
  const [activeVirtualIndex, setActiveVirtualIndex] = useState(
    slides.length + initialIndex,
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const activeVirtualRef = useRef(slides.length + initialIndex);
  const metricsRef = useRef({ viewportWidth: 0, slideWidth: 0, gap: 0 });
  const dragRef = useRef({
    pointerId: null,
    startX: 0,
    lastX: 0,
    startTime: 0,
  });
  const didDragRef = useRef(false);

  const loopedSlides = useMemo(
    () =>
      slides.length > 1
        ? Array.from({ length: slides.length * 3 }, (_, virtualIndex) => ({
            src: slides[virtualIndex % slides.length],
            realIndex: virtualIndex % slides.length,
            virtualIndex,
          }))
        : slides.map((src, virtualIndex) => ({
            src,
            realIndex: virtualIndex,
            virtualIndex,
          })),
    [slides],
  );

  const activeIndex = slides.length
    ? modulo(activeVirtualIndex, slides.length)
    : 0;
  const isLightboxOpen = lightboxIndex !== null;

  const applyTrackPosition = useCallback(
    (virtualIndex, dragOffset = 0, animate = true) => {
      const track = trackRef.current;
      const { viewportWidth, slideWidth, gap } = metricsRef.current;
      if (!track || !viewportWidth || !slideWidth) return;

      const translateX =
        viewportWidth / 2 -
        slideWidth / 2 -
        virtualIndex * (slideWidth + gap) +
        dragOffset;

      track.style.transition = animate
        ? "transform 680ms cubic-bezier(0.22, 0.61, 0.36, 1)"
        : "none";
      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
    },
    [],
  );

  const moveToVirtual = useCallback(
    (requestedIndex, animate = true) => {
      const lastIndex = loopedSlides.length - 1;
      const nextIndex = Math.max(0, Math.min(requestedIndex, lastIndex));

      activeVirtualRef.current = nextIndex;
      setActiveVirtualIndex(nextIndex);
      applyTrackPosition(nextIndex, 0, animate);
    },
    [applyTrackPosition, loopedSlides.length],
  );

  useEffect(() => {
    if (!slides.length) return undefined;

    const viewport = viewportRef.current;
    const track = trackRef.current;
    const startIndex = slides.length > 1 ? slides.length + 1 : 0;
    if (!viewport || !track) return undefined;

    const measure = () => {
      const slide = slideRefs.current[startIndex] || slideRefs.current[0];
      if (!slide) return;

      const trackStyles = window.getComputedStyle(track);
      metricsRef.current = {
        viewportWidth: viewport.clientWidth,
        slideWidth: slide.offsetWidth,
        gap: Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0,
      };
      activeVirtualRef.current = startIndex;
      setActiveVirtualIndex(startIndex);
      applyTrackPosition(startIndex, 0, false);
      setIsReady(true);
    };

    const frame = window.requestAnimationFrame(measure);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [applyTrackPosition, slides.length]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPreviousImage = useCallback(() => {
    setLightboxIndex((current) => modulo(current - 1, slides.length));
  }, [slides.length]);
  const showNextImage = useCallback(() => {
    setLightboxIndex((current) => modulo(current + 1, slides.length));
  }, [slides.length]);

  useEffect(() => {
    if (!isLightboxOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, isLightboxOpen, showNextImage, showPreviousImage]);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.target.closest("button")) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      startTime: window.performance.now(),
    };
    didDragRef.current = false;
    setIsDragging(true);
    applyTrackPosition(activeVirtualRef.current, 0, false);
    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (dragRef.current.pointerId !== event.pointerId) return;

    const distance = event.clientX - dragRef.current.startX;
    dragRef.current.lastX = event.clientX;
    if (Math.abs(distance) > 4) didDragRef.current = true;
    applyTrackPosition(activeVirtualRef.current, distance, false);
  };

  const finishDrag = (event) => {
    if (dragRef.current.pointerId !== event.pointerId) return;

    const dragDistance = event.clientX - dragRef.current.startX;
    const elapsed = Math.max(
      window.performance.now() - dragRef.current.startTime,
      1,
    );
    const velocity = dragDistance / elapsed;
    const { slideWidth, gap } = metricsRef.current;
    const step = slideWidth + gap;
    const passedThreshold = Math.abs(dragDistance) > Math.min(step * 0.16, 90);
    const hasMomentum = Math.abs(velocity) > 0.35;
    let slideShift = 0;

    if (passedThreshold || hasMomentum) {
      slideShift = dragDistance < 0 ? 1 : -1;
      if (step && Math.abs(dragDistance) > step * 0.85) {
        slideShift = Math.round(-dragDistance / step);
      }
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current.pointerId = null;
    setIsDragging(false);
    moveToVirtual(activeVirtualRef.current + slideShift);
    window.setTimeout(() => {
      didDragRef.current = false;
    }, 0);
  };

  const handleTrackTransitionEnd = (event) => {
    if (event.target !== trackRef.current || !slides.length) return;

    const currentIndex = activeVirtualRef.current;
    if (
      slides.length > 1 &&
      (currentIndex < slides.length || currentIndex >= slides.length * 2)
    ) {
      const middleIndex = slides.length + modulo(currentIndex, slides.length);
      activeVirtualRef.current = middleIndex;
      setActiveVirtualIndex(middleIndex);
      window.requestAnimationFrame(() => {
        applyTrackPosition(middleIndex, 0, false);
      });
    }
  };

  if (!slides.length) return null;

  const previousLabel = language === "ID" ? "Sebelumnya" : "Previous";
  const nextLabel = language === "ID" ? "Berikutnya" : "Next";
  const openLabel = language === "ID" ? "Perbesar foto" : "Enlarge photo";
  const closeLabel = language === "ID" ? "Tutup galeri" : "Close gallery";
  const galleryLabel = language === "ID" ? "Galeri fasilitas" : "Facilities gallery";

  return (
    <>
      <div
        className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-8 md:py-12 ${
          isDark ? "bg-[#010e22]" : "bg-[#e9edf4]"
        }`}
      >
        <div
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          className={`overflow-hidden select-none touch-pan-y ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } ${isReady ? "opacity-100" : "opacity-0"}`}
          style={{ transition: "opacity 180ms ease" }}
          aria-label={`${alt} ${galleryLabel}`}
        >
          <div
            ref={trackRef}
            onTransitionEnd={handleTrackTransitionEnd}
            className="flex items-center gap-3 will-change-transform sm:gap-6"
          >
            {loopedSlides.map(({ src, realIndex, virtualIndex }) => {
              const isActive = activeIndex === realIndex;

              return (
                <figure
                  key={`${virtualIndex}-${src}`}
                  ref={(node) => {
                    slideRefs.current[virtualIndex] = node;
                  }}
                  onClick={() => {
                    if (didDragRef.current) return;
                    if (isActive) {
                      setLightboxIndex(realIndex);
                    } else {
                      moveToVirtual(virtualIndex);
                    }
                  }}
                  className={`group w-[86vw] max-w-[920px] shrink-0 transform-gpu opacity-100 transition-transform duration-[680ms] ease-[cubic-bezier(.22,.61,.36,1)] sm:w-[68vw] lg:w-[62vw] ${
                    isActive
                      ? "z-10 scale-100"
                      : "z-0 scale-[0.92] lg:scale-[0.88]"
                  }`}
                >
                  <div className="relative h-[300px] overflow-hidden bg-neutral-900 sm:h-[430px] lg:h-[540px]">
                    <Image
                      src={src}
                      alt={`${alt} - ${realIndex + 1}`}
                      fill
                      priority={realIndex === initialIndex}
                      draggable={false}
                      sizes="(max-width: 640px) 86vw, (max-width: 1024px) 68vw, 62vw"
                      className="object-cover"
                    />

                    {isActive && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setLightboxIndex(realIndex);
                        }}
                        aria-label={openLabel}
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/55"
                      >
                        <Icon name="size" size={16} />
                      </button>
                    )}
                  </div>

                  <figcaption
                    className={`flex items-center justify-between border-x border-b px-4 py-3 text-[9px] uppercase tracking-[0.2em] ${
                      isDark
                        ? "border-white/10 bg-[#010e22] text-white/65"
                        : "border-[#011434]/10 bg-[#f8f9fb] text-[#011434]/65"
                    }`}
                  >
                    <span className="truncate">{galleryLabel} · {alt}</span>
                    <span className="font-numbers">
                      {String(realIndex + 1).padStart(2, "0")}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-7 flex w-full max-w-xl items-center justify-center gap-4 px-6 sm:mt-9">
          <button
            type="button"
            onClick={() => moveToVirtual(activeVirtualRef.current - 1)}
            aria-label={previousLabel}
            className="flex items-center gap-2 text-[8px] uppercase tracking-[0.16em] transition-opacity hover:opacity-60"
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
            onClick={() => moveToVirtual(activeVirtualRef.current + 1)}
            aria-label={nextLabel}
            className="flex items-center gap-2 text-[8px] uppercase tracking-[0.16em] transition-opacity hover:opacity-60"
          >
            <span className="hidden sm:inline">{nextLabel}</span>
            <Icon name="chevronRight" size={12} />
          </button>
        </div>

        <p className="mt-3 text-center font-numbers text-[9px] tracking-[0.28em] opacity-55">
          {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </p>
      </div>

      {isLightboxOpen && (
        <div
          onClick={closeLightbox}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-between px-4 py-5 backdrop-blur-xl animate-[fadeIn_0.2s_ease-out] sm:px-8 ${
            isDark ? "bg-black/80 text-white" : "bg-white/85 text-[#011434]"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} ${galleryLabel}`}
        >
          <div className="z-10 flex w-full max-w-7xl items-center justify-between">
            <span className="hidden font-serif text-sm italic tracking-widest opacity-60 sm:inline-block">
              {alt} — {galleryLabel}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label={closeLabel}
              className={`ml-auto flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                isDark
                  ? "border-white/20 bg-white/10 hover:bg-white/20"
                  : "border-black/10 bg-black/5 hover:bg-black/10"
              }`}
            >
              <Icon name="close" size={16} />
            </button>
          </div>

          <div
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto flex h-[62vh] w-full max-w-6xl items-center justify-center"
          >
            {slides.length > 1 && (
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label={previousLabel}
                className="absolute left-1 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/65 sm:left-4 sm:h-12 sm:w-12"
              >
                <Icon name="chevronLeft" size={20} />
              </button>
            )}

            <div className="relative h-full w-full select-none" key={lightboxIndex}>
              <Image
                src={slides[lightboxIndex]}
                alt={`${alt} - ${lightboxIndex + 1}`}
                fill
                priority
                sizes="95vw"
                draggable={false}
                className="object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,.28)]"
              />
            </div>

            {slides.length > 1 && (
              <button
                type="button"
                onClick={showNextImage}
                aria-label={nextLabel}
                className="absolute right-1 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/65 sm:right-4 sm:h-12 sm:w-12"
              >
                <Icon name="chevronRight" size={20} />
              </button>
            )}
          </div>

          <div
            onClick={(event) => event.stopPropagation()}
            className="z-10 flex w-full max-w-4xl flex-col items-center gap-4"
          >
            <span className="font-numbers text-[10px] tracking-[0.4em] opacity-65">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <div className="hide-scrollbar flex w-full snap-x gap-2 overflow-x-auto px-[calc(50%_-_2.5rem)] sm:justify-center sm:px-0">
              {slides.map((src, index) => (
                <button
                  type="button"
                  key={`${src}-thumbnail-${index}`}
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`${openLabel} ${index + 1}`}
                  aria-current={index === lightboxIndex ? "true" : undefined}
                  className={`relative h-14 w-20 shrink-0 snap-center overflow-hidden border transition-all sm:h-16 sm:w-24 ${
                    index === lightboxIndex
                      ? isDark
                        ? "border-white opacity-100"
                        : "border-[#011434] opacity-100"
                      : "border-transparent opacity-45 hover:opacity-75"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </>
  );
}
