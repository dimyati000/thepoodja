"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeAndLayoutProviders";
import { useSettings } from "@/components/SettingsProvider";
import { SectionLabel } from "@/components/SectionLabel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { WhyBookWithUs } from "@/components/WhyBookWithUs";
import { Icon } from "@/components/Icon";
import { GALLERY_CATEGORIES, GALLERY_IMAGES } from "@/constants/galleryData";

const whyBookFeatures = {
  id: [
    {
      id: 1,
      num: "01",
      title: "Seleksi Villa Terbaik",
      subtitle: "Properti premium pilihan",
      desc: "Setiap properti dalam portofolio kami dipilih, diperiksa, dan diverifikasi langsung oleh tim ahli hospitality kami untuk memastikan standar tertinggi.",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 2,
      num: "02",
      title: "Harga Terbaik Dijamin",
      subtitle: "Nilai terbaik, dikelola langsung",
      desc: "Dengan mengelola properti secara langsung, kami menjamin harga terbaik yang tersedia. Temukan harga lebih rendah untuk villa & tanggal yang sama, dan kami akan menyamakannya.",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 3,
      num: "03",
      title: "Layanan Profesional",
      subtitle: "Hospitality on-site khusus",
      desc: "Mulai dari housekeeping harian hingga private chef dan butler, tim profesional kami berkomitmen memberikan hospitality yang intuitif dan mulus.",
      img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 4,
      num: "04",
      title: "Pengalaman Sesuai Keinginan",
      subtitle: "Disesuaikan untuk Anda",
      desc: "Baik itu mengatur private yacht, spa dalam villa, atau tur budaya khusus, konsierge kami merancang itinerary sempurna untuk Anda.",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
  ],
  en: [
    {
      id: 1,
      num: "01",
      title: "Outstanding Villa Selection",
      subtitle: "Handpicked premium properties",
      desc: "Every property in our portfolio is personally handpicked, inspected, and verified by our team of luxury hospitality experts to ensure it meets the highest standards.",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 2,
      num: "02",
      title: "Best Rates Guaranteed",
      subtitle: "Unmatched value, directly managed",
      desc: "By managing our properties directly, we guarantee the best available rates. If you find a lower price for the same villa and dates, we will match it.",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 3,
      num: "03",
      title: "Professional Service",
      subtitle: "Dedicated on-site hospitality",
      desc: "From daily housekeeping to private chefs and butler service, our professional team is committed to delivering intuitive and seamless hospitality.",
      img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 4,
      num: "04",
      title: "Customized Experiences",
      subtitle: "Tailored to your desires",
      desc: "Whether organizing a private yacht excursion, in-villa spa therapies, or custom cultural day tours, our concierge shapes the perfect itinerary for you.",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
  ],
};

const faqs = {
  id: [
    {
      q: "Apakah foto-foto di galeri ini menampilkan lokasi asli?",
      a: "Ya, seluruh foto di galeri diambil langsung dari properti, villa, restoran, spa, dan venue acara eksklusif kami di Bali untuk memberikan gambaran yang akurat dan transparan.",
    },
    {
      q: "Bisakah saya memesan venue untuk acara pernikahan atau sesi foto pribadi?",
      a: "Tentu saja. Kami menyediakan paket lokasi eksklusif untuk sesi foto pre-wedding, pernikahan di kapel/pantai, serta acara privat. Tim konsierge kami siap membantu seluruh persiapannya.",
    },
    {
      q: "Apakah fasilitas spa dan restoran dapat diakses oleh tamu luar?",
      a: "Fasilitas restoran dan spa kami terbuka untuk tamu umum dengan reservasi terlebih dahulu. Tamu yang menginap di villa kami mendapatkan prioritas reservasi dan penawaran istimewa.",
    },
    {
      q: "Bagaimana cara melakukan konfirmasi reservasi villa yang ada di galeri?",
      a: "Anda dapat menekan tombol 'Pesan Sekarang' atau menuju halaman Properti untuk memilih tipe villa dan tanggal menginap sesuai keinginan Anda.",
    },
  ],
  en: [
    {
      q: "Are the photos in this gallery authentic to the property?",
      a: "Yes, all photos in our gallery are captured directly from our exclusive properties, villas, dining venues, spas, and event sites in Bali to offer you an authentic preview.",
    },
    {
      q: "Can I book these venues for private photoshoots or weddings?",
      a: "Absolutely. We offer dedicated venue packages for pre-wedding photoshoots, chapel and beachfront weddings, as well as private events. Our concierge team is at your service.",
    },
    {
      q: "Are the spa and dining facilities available for non-staying guests?",
      a: "Our dining and spa sanctuaries are open to outside guests by prior reservation. In-house villa guests enjoy priority reservations and exclusive privileges.",
    },
    {
      q: "How can I book the specific villa shown in the photos?",
      a: "You can click on 'Properties' in the top navigation or use our booking buttons to choose your dates and preferred villa category.",
    },
  ],
};

const aboutText = {
  id: {
    subtitle: "Mengabadikan Keindahan & Kemewahan Sanctuary Bali",
    p1: "Galeri foto Poodja menyajikan keanggunan visual portofolio villa, restoran berkelas internasional, fasilitas spa holistik, dan tempat pernikahan dramatis di tepi tebing Nusa Dua, Bali. Setiap sudut dirancang untuk menciptakan sanctuary yang tenang dan berkesan.",
    p2: "Setiap jepretan mencerminkan dedikasi kami pada standar hospitality mewah—mulai dari kolam laguna pribadi, pemandangan laut yang spektakuler, hingga layanan hangat khas Indonesia. Biarkan visual ini menginspirasi liburan impian Anda berikutnya.",
  },
  en: {
    subtitle: "Capturing the Beauty & Splendor of Bali Sanctuaries",
    p1: "Poodja's photo gallery showcases the visual elegance of our luxury villa portfolio, world-class dining venues, holistic spa sanctuaries, and dramatic oceanfront wedding settings in Nusa Dua, Bali.",
    p2: "Every image reflects our unwavering commitment to luxury hospitality—from private lagoon pools and breathtaking ocean views to genuine Indonesian warmth. Let these visuals inspire your next dream getaway.",
  },
};

export default function GalleryPage() {
  const { isDark } = useTheme();
  const { t, language } = useSettings();
  const lang = language === "ID" ? "id" : "en";

  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const accentText = isDark ? "#FCD57B" : "#8B6B2E";
  const descText = isDark ? "rgba(255,255,255,0.65)" : "rgba(1,20,52,0.7)";

  // Filter images based on active category
  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts = { all: GALLERY_IMAGES.length };
    GALLERY_IMAGES.forEach((img) => {
      counts[img.category] = (counts[img.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Lightbox Navigation
  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [lightboxIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  const currentLightboxImage =
    lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <div
      style={{ overflowX: "clip", minHeight: "100vh", position: "relative" }}
      className="transition-colors duration-500"
    >
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] md:h-[75vh] flex items-end pb-24 md:pb-28">
        <Image
          src="https://cache.marriott.com/is/image/marriotts7prod/rz-dpssw-aerial-view-resort--43406:Wide-Hor?wid=1600&fit=constrain"
          alt="Poodja Gallery"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        {isDark && (
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none transition-opacity duration-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6">
          <p
            style={{ color: "#FCD57B" }}
            className="text-xs font-bold uppercase tracking-[0.35em] mb-4"
          >
            {t("galleryPage.collection")}
          </p>
          <h1
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className="text-white text-4xl md:text-6xl font-semibold mb-4 tracking-wide leading-tight uppercase max-w-2xl"
          >
            {t("galleryPage.title")}
          </h1>
          <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-xl">
            {t("galleryPage.heroDesc")}
          </p>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <section className="max-w-[1380px] mx-auto px-6 -mt-8 relative z-20 mb-16">
        <div
          className={`p-3 rounded-2xl md:rounded-full border backdrop-blur-xl transition-all duration-300 shadow-xl flex flex-wrap items-center justify-center gap-2 md:gap-3 ${isDark
            ? "bg-[#011434]/80 border-[#FCD57B]/20"
            : "bg-white/90 border-[#8B6B2E]/20"
            }`}
        >
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            const count = categoryCounts[cat.key] || 0;

            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${isActive
                  ? isDark
                    ? "bg-[#FCD57B] text-[#011434] shadow-md shadow-[#FCD57B]/20"
                    : "bg-[#8B6B2E] text-white shadow-md shadow-[#8B6B2E]/20"
                  : isDark
                    ? "text-white/70 hover:text-white hover:bg-white/5"
                    : "text-[#011434]/70 hover:text-[#011434] hover:bg-black/5"
                  }`}
              >
                <span>{cat.label[lang]}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${isActive
                    ? isDark
                      ? "bg-[#011434]/20 text-[#011434]"
                      : "bg-white/30 text-white"
                    : isDark
                      ? "bg-white/10 text-white/60"
                      : "bg-black/10 text-[#011434]/60"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. GALLERY PHOTO GRID */}
      <section className="mx-auto mb-28 w-full max-w-[1380px] px-6">
        {/* Gallery heading */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <SectionLabel isDark={isDark} className="mb-2">
              {t("galleryPage.collection")}
            </SectionLabel>

            <h2 className="font-serif text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
              {t("galleryPage.exploreTitle")}
            </h2>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
            {filteredImages.length} {t("galleryPage.photosCount")}
          </p>
        </div>

        {/* Gallery cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {filteredImages.map((img, idx) => {
            const category = GALLERY_CATEGORIES.find(
              (item) => item.key === img.category
            );

            const categoryName = category ? category.label[lang] : "";

            return (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className={`group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border shadow-lg transition-all duration-500 hover:-translate-y-1.5 ${isDark
                    ? "border-[#FCD57B]/15 bg-[#010e22] hover:border-[#FCD57B]/40 hover:shadow-2xl hover:shadow-[#FCD57B]/10"
                    : "border-black/10 bg-white hover:border-[#8B6B2E]/40 hover:shadow-2xl hover:shadow-[#8B6B2E]/10"
                  }`}
              >
                {/* Gallery image */}
                <Image
                  src={img.url}
                  alt={img.title[lang]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Image gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Category tag */}
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-full border border-[#FCD57B]/30 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FCD57B] backdrop-blur-md">
                    {categoryName}
                  </span>
                </div>

                {/* Expand icon */}
                <div className="absolute right-4 top-4 z-10 flex h-9 w-9 scale-75 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Icon name="chevronRight" size={16} />
                </div>

                {/* Image information */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant-garamond)",
                    }}
                    className="mb-1 text-lg font-semibold leading-snug tracking-wide transition-colors group-hover:text-[#FCD57B] md:text-xl"
                  >
                    {img.title[lang]}
                  </h3>

                  <p className="line-clamp-2 text-xs font-light leading-relaxed text-white/70">
                    {img.desc[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. LIGHTBOX MODAL */}
      {currentLightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md transition-all duration-300 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300 border border-white/20"
            aria-label="Close"
          >
            <Icon name="close" size={20} />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-50 p-3.5 rounded-full bg-black/50 hover:bg-[#FCD57B] text-white hover:text-[#011434] transition-all duration-300 border border-white/20 hover:border-[#FCD57B]"
            aria-label="Previous image"
          >
            <Icon name="chevronLeft" size={22} />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-50 p-3.5 rounded-full bg-black/50 hover:bg-[#FCD57B] text-white hover:text-[#011434] transition-all duration-300 border border-white/20 hover:border-[#FCD57B]"
            aria-label="Next image"
          >
            <Icon name="chevronRight" size={22} />
          </button>

          {/* Modal Content */}
          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center">
            <div className="relative w-full h-[55vh] md:h-[68vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={currentLightboxImage.url}
                alt={currentLightboxImage.title[lang]}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Lightbox Caption & Info */}
            <div className="mt-4 text-center max-w-2xl mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FCD57B] px-3 py-0.5 rounded-full bg-[#FCD57B]/10 border border-[#FCD57B]/30">
                  {
                    GALLERY_CATEGORIES.find(
                      (c) => c.key === currentLightboxImage.category
                    )?.label[lang]
                  }
                </span>
                <span className="text-xs text-white/50 font-mono">
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
              </div>
              <h3
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                className="text-xl md:text-2xl text-white font-medium tracking-wide uppercase mb-1"
              >
                {currentLightboxImage.title[lang]}
              </h3>
              <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
                {currentLightboxImage.desc[lang]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. WHY BOOK WITH US */}
      <WhyBookWithUs
        isDark={isDark}
        features={whyBookFeatures[lang]}
        labelText={t("galleryPage.ourPromise")}
        headingText={t("galleryPage.whyBook").toUpperCase()}
        sectionId="why-book-with-us-gallery"
      />

      {/* 6. FAQ SECTION */}
      <section className="max-w-[840px] mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <p
            style={{ color: accentText }}
            className="text-xs font-bold uppercase tracking-[0.45em] mb-4"
          >
            {t("galleryPage.faq")}
          </p>
          <h2
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className="text-3xl md:text-4xl font-semibold tracking-widest leading-none uppercase"
          >
            {t("galleryPage.whyStay")}
          </h2>
          <div
            style={{ backgroundColor: accentText }}
            className="w-10 h-[1px] mx-auto mt-6 opacity-60"
          />
        </div>

        <FAQAccordion items={faqs[lang]} isDark={isDark} />
      </section>

      {/* 7. ABOUT SECTION */}
      <section className="max-w-[1380px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex items-center gap-4">
            <h2
              style={{
                fontFamily: "var(--font-cormorant-garamond)",
                color: accentText,
              }}
              className="text-2xl sm:text-3xl font-light tracking-wide uppercase leading-tight"
            >
              {t("galleryPage.aboutTitle")}
            </h2>
            <Icon name="chevronRight" size={26} style={{ color: accentText }} />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              className="text-xl sm:text-2xl font-medium tracking-wide uppercase leading-tight"
            >
              {aboutText[lang].subtitle}
            </h3>
            <p
              style={{ color: descText }}
              className="text-sm font-light leading-relaxed"
            >
              {aboutText[lang].p1}
            </p>
            <p
              style={{ color: descText }}
              className="text-sm font-light leading-relaxed"
            >
              {aboutText[lang].p2}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
