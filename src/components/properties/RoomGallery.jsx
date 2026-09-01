"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { useSettings } from "@/components/SettingsProvider";

const DEFAULT_CATEGORY_LABELS = {
  indoor: { id: "Indoor", en: "Indoor" },
  kitchen: { id: "Dapur & Ruang Makan", en: "Kitchen & Dining" },
  dining: { id: "Dapur & Ruang Makan", en: "Kitchen & Dining" },
  facilities: { id: "Fasilitas", en: "Facilities" },
  spa: { id: "Spa & Wellness", en: "Spa & Wellness" },
  outdoor: { id: "Outdoor", en: "Outdoor" },
  recreation: { id: "Outdoor & Rekreasi", en: "Outdoor & Recreation" },
  weddings: { id: "Acara", en: "Events" },
};

const toNumber = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const titleFromSlug = (slug) =>
  slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

export function RoomGallery({ images = [], alt = "", isDark }) {
  const { language } = useSettings();
  const galleryImages = images.map((image, index) => {
    if (typeof image === "string") {
      const categoryKey = index === 0 ? "indoor" : "outdoor";
      return {
        src: image,
        categoryKey,
        categoryLabel: DEFAULT_CATEGORY_LABELS[categoryKey][language],
        categoryOrder: index === 0 ? 10 : 40,
        sortOrder: index,
        originalIndex: index,
      };
    }

    const category =
      (typeof image.category === "object" && image.category) ||
      image.galleryCategory ||
      image.gallery_category ||
      image.gallery_categories ||
      null;
    const categoryKey =
      category?.slug ||
      category?.key ||
      (typeof image.category === "string" ? image.category : null) ||
      image.categoryKey ||
      image.category_key ||
      image.type ||
      image.area ||
      "facilities";
    const providedLabel =
      category?.name?.[language] ||
      category?.label?.[language] ||
      category?.[`name_${language}`] ||
      image.categoryLabel?.[language] ||
      image.category_label?.[language] ||
      image.categoryLabel ||
      image.category_label;

    return {
      src: image.src || image.url || image.imageUrl || image.image_url,
      categoryKey,
      categoryLabel:
        providedLabel ||
        DEFAULT_CATEGORY_LABELS[categoryKey]?.[language] ||
        titleFromSlug(categoryKey),
      categoryOrder: toNumber(
        category?.sortOrder ??
          category?.sort_order ??
          image.categoryOrder ??
          image.category_order,
        100,
      ),
      sortOrder: toNumber(
        image.sortOrder ?? image.sort_order ?? image.order,
        index,
      ),
      originalIndex: index,
      alt: image.alt || image.altText || image.alt_text,
    };
  }).sort(
    (first, second) =>
      first.categoryOrder - second.categoryOrder ||
      first.sortOrder - second.sortOrder ||
      first.originalIndex - second.originalIndex,
  );
  const imageCount = galleryImages.length;
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const thumbnailStripRef = useRef(null);
  const thumbnailRefs = useRef(new Map());
  const isOpen = lightboxIdx !== null;

  const close = useCallback(() => setLightboxIdx(null), []);
  const next = useCallback(
    () => setLightboxIdx((i) => (i + 1) % imageCount),
    [imageCount],
  );
  const prev = useCallback(
    () => setLightboxIdx((i) => (i - 1 + imageCount) % imageCount),
    [imageCount],
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

  useEffect(() => {
    if (!isOpen || lightboxIdx === null) return;

    const animationFrame = window.requestAnimationFrame(() => {
      const strip = thumbnailStripRef.current;
      const activeThumbnail = thumbnailRefs.current.get(lightboxIdx);
      if (!strip || !activeThumbnail) return;

      const stripRect = strip.getBoundingClientRect();
      const thumbnailRect = activeThumbnail.getBoundingClientRect();
      const centeredPosition =
        strip.scrollLeft +
        thumbnailRect.left -
        stripRect.left -
        (strip.clientWidth - thumbnailRect.width) / 2;

      strip.scrollTo({
        left: Math.max(0, centeredPosition),
        behavior: "smooth",
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isOpen, lightboxIdx]);

  const handleThumbnailWheel = useCallback((event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    event.currentTarget.scrollLeft += event.deltaY;
  }, []);

  if (!galleryImages.length) return null;

  const mainImage = galleryImages[0];
  const hasSideImages = galleryImages.length >= 3;
  const sideImages = hasSideImages ? galleryImages.slice(1, 3) : [];
  const hasMore = galleryImages.length > 3;
  const imageGroups = galleryImages.reduce((groups, image, index) => {
    let group = groups.find((item) => item.key === image.categoryKey);

    if (!group) {
      group = {
        key: image.categoryKey,
        label: image.categoryLabel,
        images: [],
      };
      groups.push(group);
    }

    group.images.push({ ...image, index });
    return groups;
  }, []);

  return (
    <>
      <div
        className={`relative grid gap-1.5 sm:gap-2 h-[380px] sm:h-[480px] md:h-[600px] w-full overflow-hidden rounded-sm ${
          hasSideImages ? "grid-cols-1 md:grid-cols-12" : "grid-cols-1"
        }`}
      >
        {/* Gambar Utama */}
        <button
          onClick={() => setLightboxIdx(0)}
          className={`relative h-full w-full overflow-hidden group cursor-pointer border-none p-0 bg-neutral-950 transition-all duration-500 ${
            hasSideImages ? "md:col-span-8" : "md:col-span-12"
          }`}
        >
          <Image
            src={mainImage.src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover transition-transform duration-[1800ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011434]/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
        </button>

        {/* Gambar Samping */}
        {hasSideImages && (
          <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-1.5 sm:gap-2 h-full">
            {sideImages.map((image, i) => (
              <button
                key={image.src + i}
                onClick={() => setLightboxIdx(i + 1)}
                className="relative w-full h-full overflow-hidden group cursor-pointer border-none p-0 bg-neutral-950"
              >
                <Image
                  src={image.src}
                  alt={`${alt} detail ${i + 1}`}
                  fill
                  sizes="30vw"
                  className="object-cover transition-transform duration-[1800ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011434]/15 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                {i === 1 && hasMore && (
                  // <div className="absolute inset-0 bg-[#011434]/40 backdrop-blur-[3px] flex flex-col items-center justify-center gap-1 transition-colors duration-300 group-hover:bg-[#011434]/50">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 transition-colors duration-300 group-hover:opacity-40">
                    {/* <span className="text-white text-base font-light tracking-[0.2em] font-serif">
                      +{galleryImages.length - 3}
                    </span>
                    <span className="text-white/70 text-[9px] uppercase tracking-[0.25em] font-medium">
                      Sanctuaries
                    </span> */}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Floating Pill Counter Button */}
        <button
          onClick={() => setLightboxIdx(0)}
          className={`absolute bottom-5 right-5 inline-flex items-center gap-2.5 text-[9px] font-bold tracking-[0.3em] uppercase px-5 py-3 rounded-full backdrop-blur-lg transition-all duration-300 border shadow-sm cursor-pointer ${
            isDark
              ? "bg-[#011434]/60 border-white/15 text-white hover:bg-[#011434]/80 hover:border-white/30"
              : "bg-white/80 border-[#011434]/10 text-[#011434] hover:bg-white hover:shadow-md"
          }`}
        >
          <Icon name="default" size={10} className="opacity-80" />
          <span>View All {images.length} Photos</span>
        </button>
      </div>

      {/* ── CINEMATIC FULLSCREEN LIGHTBOX ── */}
      {isOpen && (
        <div
          onClick={close}
          className={`fixed inset-0 z-[100] backdrop-blur-xl flex flex-col items-center justify-between py-6 px-4 sm:px-8 animate-[fadeIn_0.2s_ease-out] ${
            isDark ? "bg-black/30 text-white" : "bg-white/30 text-neutral-900"
          }`}
          style={{ backdropFilter: "blur(24px) saturate(120%)" }}
          role="dialog"
          aria-modal="true"
        >
          {/* Header Lightbox */}
          <div className="w-full max-w-7xl flex justify-between items-center z-10">
            <span
              className={`font-serif italic text-sm tracking-widest hidden sm:inline-block ${
                isDark ? "text-white/60" : "text-neutral-700"
              }`}
            >
              {alt} — Sanctuary Gallery
            </span>
            <button
              onClick={close}
              aria-label="Close gallery"
              className={`ml-auto w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                isDark
                  ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                  : "border-black/10 bg-black/5 text-neutral-800 hover:bg-black/10"
              }`}
            >
              <Icon name="close" size={16} />
            </button>
          </div>

          {/* Area Utama Gambar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[55vh] sm:h-[65vh] my-auto flex items-center justify-center"
          >
            {/* Navigasi Kiri */}
            <button
              onClick={prev}
              aria-label="Previous photo"
              className={`absolute left-2 sm:left-4 z-10 w-12 h-12 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                isDark
                  ? "border-white/20 bg-black/40 text-white/80 hover:bg-black/60"
                  : "border-black/10 bg-white/40 text-neutral-800 hover:bg-white/70 shadow-sm"
              }`}
            >
              <Icon name="chevronLeft" size={20} />
            </button>

            {/* Gambar Tengah + Efek Shadow Agar Tetap Pop Out */}
            <div className="relative w-full h-full select-none">
              <Image
                src={galleryImages[lightboxIdx].src}
                alt={
                  galleryImages[lightboxIdx].alt ||
                  `${alt} ${lightboxIdx + 1}`
                }
                fill
                priority
                sizes="95vw"
                className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
              />
              <span
                className={`absolute top-3 left-3 sm:top-4 sm:left-4 rounded-full px-3 py-1.5 text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase backdrop-blur-md border ${
                  isDark
                    ? "bg-black/35 border-white/15 text-white"
                    : "bg-white/60 border-black/10 text-[#011434]"
                }`}
              >
                {
                  imageGroups.find(
                    (group) =>
                      group.key === galleryImages[lightboxIdx].categoryKey,
                  )?.label
                }
              </span>
            </div>

            {/* Navigasi Kanan */}
            <button
              onClick={next}
              aria-label="Next photo"
              className={`absolute right-2 sm:right-4 z-10 w-12 h-12 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                isDark
                  ? "border-white/20 bg-black/40 text-white/80 hover:bg-black/60"
                  : "border-black/10 bg-white/40 text-neutral-800 hover:bg-white/70 shadow-sm"
              }`}
            >
              <Icon name="chevronRight" size={20} />
            </button>
          </div>

          {/* Footer Lightbox */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full flex flex-col items-center gap-5 z-10"
          >
            <span
              className={`text-[10px] tracking-[0.4em] font-sans ${
                isDark ? "text-white/70" : "text-neutral-600"
              }`}
            >
              {String(lightboxIdx + 1).padStart(2, "0")}{" "}
              <span className="opacity-20">/</span>{" "}
              {String(galleryImages.length).padStart(2, "0")}
            </span>

            {galleryImages.length > 1 && (
              <div
                ref={thumbnailStripRef}
                onWheel={handleThumbnailWheel}
                className={`hide-scrollbar w-full max-w-6xl overflow-x-auto scroll-smooth overscroll-x-contain px-4 pb-2 border-t pt-4 ${
                  isDark ? "border-white/10" : "border-black/10"
                }`}
              >
                <div className="flex items-start justify-start sm:justify-center gap-6 min-w-max mx-auto">
                  {imageGroups.map((group) => (
                    <div key={group.key} className="shrink-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          style={{ color: isDark ? "#FCD57B" : "#8B6B2E" }}
                          className="text-[9px] font-bold tracking-[0.22em] uppercase"
                        >
                          {group.label}
                        </span>
                        <span
                          className={`text-[9px] font-numbers ${
                            isDark ? "text-white/35" : "text-black/35"
                          }`}
                        >
                          {group.images.length}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {group.images.map((image) => (
                          <button
                            key={image.src + image.index}
                            ref={(node) => {
                              if (node) {
                                thumbnailRefs.current.set(image.index, node);
                              } else {
                                thumbnailRefs.current.delete(image.index);
                              }
                            }}
                            onClick={() => setLightboxIdx(image.index)}
                            aria-label={`View ${group.label.toLowerCase()} photo ${image.index + 1}`}
                            aria-current={
                              image.index === lightboxIdx ? "true" : undefined
                            }
                            className={`relative snap-center shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 border ${
                              image.index === lightboxIdx
                                ? isDark
                                  ? "border-white opacity-100 scale-[1.03] shadow-md"
                                  : "border-neutral-900 opacity-100 scale-[1.03] shadow-md"
                                : "border-transparent opacity-50 hover:opacity-80"
                            }`}
                          >
                            <Image
                              src={image.src}
                              alt=""
                              fill
                              sizes="(max-width: 640px) 80px, 96px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
