"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "@/components/ThemeAndLayoutProviders";
import { useSettings } from "@/components/SettingsProvider";
import { VILLAS_DATA, LOCATIONS } from "@/constants/villas";
import { getMonthlyGallery } from "@/constants/monthlyProperties";
import { SectionLabel } from "@/components/SectionLabel";
import { VillaCard } from "@/components/properties/VillaCard";
import { MonthlyHeroBanner } from "@/components/properties/MonthlyHeroBanner";
import { PropertySearchBar } from "@/components/PropertySearchBar";
import { StickySearchBar } from "@/components/StickySearchBar";
import { WhyBookWithUs } from "@/components/WhyBookWithUs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Icon } from "@/components/Icon";

const COPY = {
  id: {
    eyebrow: "THE COLLECTION",
    title: "VILLA & PROPERTI",
    heroDesc:
      "Koleksi eksklusif villa mewah di destinasi paling dicari di Bali.",
    listLabel: "PROPERTI UNGGULAN",
    listTitle: "JELAJAHI VILLA KAMI",
    showing: "MENAMPILKAN",
    villaCount: "VILLA",
    empty: "Belum ada villa yang sesuai dengan pencarian Anda.",
    promise: "JANJI KAMI",
    why: "KENAPA PESAN BERSAMA KAMI?",
    faq: "FAQ",
    faqTitle: "KENAPA MENGINAP DI POODJA?",
    about: "TENTANG POODJA PROPERTIES",
    aboutTitle:
      "VILLA BALI DENGAN KOLAM PRIBADI UNTUK MENGINAP TAK TERLUPAKAN",
    about1:
      "Pendekatan manajemen properti kami dibangun di atas hospitality yang personal, memadukan keaslian lokal dengan standar resor internasional. Setiap villa dirancang sebagai sanctuary tersendiri, lengkap dengan kolam pribadi, fasilitas modern, dan lanskap tropis.",
    about2:
      "Dari kemewahan tepi pantai Seminyak hingga ketenangan Ubud, Poodja memastikan setiap pengalaman disertai jaminan harga terbaik, reservasi langsung, dan layanan yang benar-benar sesuai kebutuhan Anda.",
  },
  en: {
    eyebrow: "THE COLLECTION",
    title: "VILLAS & PROPERTIES",
    heroDesc:
      "An exclusive collection of luxury villas in Bali's most sought-after destinations.",
    listLabel: "FEATURED PROPERTIES",
    listTitle: "EXPLORE OUR VILLAS",
    showing: "SHOWING",
    villaCount: "VILLAS",
    empty: "No villas match your current search.",
    promise: "OUR PROMISE",
    why: "WHY BOOK WITH US?",
    faq: "FAQ",
    faqTitle: "WHY STAY WITH POODJA?",
    about: "ABOUT POODJA PROPERTIES",
    aboutTitle:
      "PRIVATE-POOL BALI VILLAS FOR AN UNFORGETTABLE STAY",
    about1:
      "Our property-management approach is built around personal hospitality, combining authentic local character with international resort standards. Every villa is designed as its own sanctuary with a private pool, modern comforts, and tropical surroundings.",
    about2:
      "From Seminyak's beachfront luxury to Ubud's calm landscapes, Poodja pairs every stay with a best-rate promise, direct reservations, and service tailored to each guest.",
  },
};

const MONTHLY_COPY = {
  id: {
    ...COPY.id,
    eyebrow: "KOLEKSI LONG STAY",
    title: "VILLA BULANAN",
    heroDesc:
      "Koleksi villa pilihan untuk hunian bulanan yang nyaman dan fleksibel di Bali.",
    listLabel: "HUNIAN BULANAN",
    listTitle: "TEMUKAN VILLA LONG STAY ANDA",
  },
  en: {
    ...COPY.en,
    eyebrow: "THE LONG-STAY COLLECTION",
    title: "MONTHLY VILLAS",
    heroDesc:
      "A curated collection of comfortable, flexible monthly residences across Bali.",
    listLabel: "MONTHLY RESIDENCES",
    listTitle: "FIND YOUR LONG-STAY VILLA",
  },
};

const FEATURES = {
  id: [
    [
      "01",
      "Seleksi Villa Terbaik",
      "Properti premium pilihan",
      "Setiap villa dipilih, diperiksa, dan diverifikasi langsung untuk memastikan standar kenyamanan dan kualitas tertinggi.",
    ],
    [
      "02",
      "Harga Terbaik Dijamin",
      "Nilai terbaik, dikelola langsung",
      "Reservasi langsung memberi Anda harga terbaik yang tersedia dengan informasi jelas dan tanpa biaya tersembunyi.",
    ],
    [
      "03",
      "Layanan Profesional",
      "Hospitality khusus",
      "Tim profesional kami siap membantu mulai dari housekeeping hingga kebutuhan khusus selama Anda menginap.",
    ],
    [
      "04",
      "Pengalaman Sesuai Keinginan",
      "Disesuaikan untuk Anda",
      "Setiap detail perjalanan dapat disesuaikan agar pengalaman menginap terasa personal dan tak terlupakan.",
    ],
  ],
  en: [
    [
      "01",
      "Outstanding Villa Selection",
      "Handpicked premium properties",
      "Every villa is personally selected, inspected, and verified to meet our highest standards of comfort and quality.",
    ],
    [
      "02",
      "Best Rates Guaranteed",
      "Exceptional direct-booking value",
      "Booking directly gives you our best available rate with clear information and no hidden charges.",
    ],
    [
      "03",
      "Professional Service",
      "Dedicated hospitality",
      "Our professional team is ready to help with everything from housekeeping to special arrangements throughout your stay.",
    ],
    [
      "04",
      "Tailored Experiences",
      "Designed around you",
      "Every part of your journey can be tailored so your stay feels personal, seamless, and memorable.",
    ],
  ],
};

const FEATURE_IMAGES = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85",
];

const FAQS = {
  id: [
    [
      "Apa yang membuat properti Poodja unik?",
      "Setiap properti dipilih secara ketat, memiliki karakter tersendiri, dan didukung standar layanan hospitality Poodja.",
    ],
    [
      "Apakah villa memiliki kolam renang pribadi?",
      "Sebagian besar villa memiliki kolam renang pribadi. Detail fasilitas lengkap tersedia pada masing-masing villa.",
    ],
    [
      "Apakah housekeeping harian dan staf sudah termasuk?",
      "Layanan yang termasuk berbeda pada setiap villa. Tim kami akan mengonfirmasi semuanya sebelum pemesanan.",
    ],
    [
      "Bisakah mengatur antar-jemput bandara dan tur lokal?",
      "Ya. Tim concierge dapat membantu mengatur transportasi, tur, pengalaman kuliner, dan kebutuhan khusus lainnya.",
    ],
    [
      "Apakah properti ramah anak?",
      "Banyak properti cocok untuk keluarga. Tim kami dapat merekomendasikan villa paling sesuai untuk kebutuhan anak.",
    ],
    [
      "Bagaimana kebijakan pembatalan dan refund?",
      "Kebijakan mengikuti villa dan tarif yang dipilih. Rincian lengkap ditampilkan sebelum reservasi dikonfirmasi.",
    ],
  ],
  en: [
    [
      "What makes Poodja properties unique?",
      "Each property is carefully selected for its character, quality, and Poodja hospitality standards.",
    ],
    [
      "Do the villas have private swimming pools?",
      "Most villas offer a private pool. Full amenity details are shown for each villa.",
    ],
    [
      "Are daily housekeeping and staff included?",
      "Included services vary by villa. Our team will confirm every service before you book.",
    ],
    [
      "Can airport transfers and local tours be arranged?",
      "Yes. Our concierge can arrange transport, tours, dining experiences, and other special requests.",
    ],
    [
      "Are the properties child-friendly?",
      "Many properties welcome families. Our team can recommend the best villa for your children's needs.",
    ],
    [
      "What is the cancellation and refund policy?",
      "Policies depend on the selected villa and rate. Full terms are shown before confirmation.",
    ],
  ],
};

function dateFromParam(value) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  return year && month && day
    ? new Date(year, month - 1, day)
    : null;
}

export function PropertiesContent() {
  const { isDark } = useTheme();
  const { language, setCheckIn, setCheckOut } = useSettings();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isMonthly = pathname === "/monthly";

  const inlineSearchRef = useRef(null);
  const [stickyVisible, setStickyVisible] = useState(false);

  const lang = language === "ID" ? "id" : "en";
  const text = isMonthly ? MONTHLY_COPY[lang] : COPY[lang];
  const paramsString = searchParams.toString();

  const activeLocationFilter = useMemo(() => {
    const locationParam = new URLSearchParams(paramsString).get(
      "location",
    );

    if (!locationParam) return "All Locations";

    return (
      LOCATIONS.find(
        (location) =>
          location.toLowerCase() === locationParam.toLowerCase(),
      ) || "All Locations"
    );
  }, [paramsString]);

  const handleLocationClick = (location) => {
    const params = new URLSearchParams(paramsString);

    if (location === "All Locations") {
      params.delete("location");
    } else {
      params.set("location", location);
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(paramsString);

    setCheckIn(dateFromParam(params.get("checkin")));
    setCheckOut(dateFromParam(params.get("checkout")));
  }, [paramsString, setCheckIn, setCheckOut]);

  const allVillas = useMemo(
    () =>
      VILLAS_DATA.flatMap((group) =>
        (group.rooms || []).map((room) => ({
          ...room,
          gallery: isMonthly
            ? getMonthlyGallery(group.id, room.id)
            : room.gallery,
          groupId: group.id,
          groupName: group.name,
          groupLocation: group.location,
        })),
      ),
    [isMonthly],
  );

  const villas = useMemo(() => {
    const params = new URLSearchParams(paramsString);
    const location = params.get("location");
    const bedroom = params.get("bedroom");

    const knownLocation =
      location &&
      LOCATIONS.some(
        (item) => item.toLowerCase() === location.toLowerCase(),
      );

    return allVillas.filter((villa) => {
      const locationMatches =
        !knownLocation ||
        villa.groupLocation?.toLowerCase() ===
          location.toLowerCase();

      const bedroomMatches =
        !bedroom || String(villa.beds) === String(bedroom);

      return locationMatches && bedroomMatches;
    });
  }, [allVillas, paramsString]);

  const features = FEATURES[lang].map(
    ([num, title, subtitle, desc], index) => ({
      id: index + 1,
      num,
      title,
      subtitle,
      desc,
      img: FEATURE_IMAGES[index],
    }),
  );

  const faqs = FAQS[lang].map(([q, a]) => ({ q, a }));

  const accent = isDark ? "#FCD57B" : "#8B6B2E";
  const muted = isDark
    ? "rgba(255,255,255,.62)"
    : "rgba(1,20,52,.68)";

  return (
    <main className="w-full overflow-x-clip pb-16 transition-colors duration-500">
      <StickySearchBar
        isDark={isDark}
        triggerRef={inlineSearchRef}
        onVisibilityChange={setStickyVisible}
      />

      {/* Hero section */}
      {isMonthly ? (
        <MonthlyHeroBanner
          villas={allVillas}
          text={text}
        />
      ) : (
        <section className="relative flex min-h-[520px] w-full items-end pb-20 pt-28 md:min-h-[610px] md:pb-28">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90"
            alt="Poodja luxury villa"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

          <div className="relative z-10 mx-auto w-full max-w-[1380px] px-6">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.38em] text-[#FCD57B] md:text-xs">
              {text.eyebrow}
            </p>

            <h1
              style={{
                fontFamily: "var(--font-cormorant-garamond)",
              }}
              className="mb-4 max-w-3xl text-4xl font-semibold uppercase leading-none tracking-wide text-white md:text-6xl"
            >
              {text.title}
            </h1>

            <p className="max-w-xl text-sm font-light leading-relaxed text-white/80 md:text-base">
              {text.heroDesc}
            </p>
          </div>
        </section>
      )}

      {/* Search form */}
      <div className="relative z-30 mx-auto w-full max-w-[1380px] px-4 sm:px-6">
        <div
          ref={inlineSearchRef}
          aria-hidden={stickyVisible}
          className={`-mt-8 transition-opacity duration-300 md:-mt-10 ${
            stickyVisible
              ? "pointer-events-none invisible opacity-0"
              : "visible opacity-100"
          }`}
        >
          <PropertySearchBar isDark={isDark} />
        </div>
      </div>

      {/* Daftar villa */}
      <section className="mx-auto w-full max-w-[1380px] px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mb-10 md:mb-12">
          <SectionLabel isDark={isDark} className="mb-3">
            {text.listLabel}
          </SectionLabel>

          <h2
            style={{
              fontFamily: "var(--font-cormorant-garamond)",
            }}
            className="text-3xl font-semibold uppercase tracking-wide md:text-4xl"
          >
            {text.listTitle}
          </h2>
        </div>

        {/* Filter lokasi */}
        <div
          className={`mb-10 flex flex-col justify-between gap-5 border-b pb-6 sm:flex-row sm:items-end ${
            isDark
              ? "border-white/10"
              : "border-[#011434]/10"
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            {LOCATIONS.map((location) => {
              const isActive =
                activeLocationFilter === location;

              return (
                <button
                  type="button"
                  key={location}
                  onClick={() =>
                    handleLocationClick(location)
                  }
                  aria-pressed={isActive}
                  className={`min-h-9 border px-4 py-2 font-mono text-[9px] font-medium uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? "border-[#FCD57B] bg-[#FCD57B] font-bold text-[#011434] shadow-[0_0_0_1px_#011434,0_0_0_2px_#FCD57B]"
                        : "border-[#8B6B2E] bg-[#8B6B2E] font-bold text-white shadow-[0_0_0_1px_white,0_0_0_2px_#8B6B2E]"
                      : isDark
                        ? "border-white/15 bg-white/[0.02] text-white/60 hover:border-[#FCD57B]/60 hover:text-[#FCD57B]"
                        : "border-[#011434]/15 bg-transparent text-[#011434]/65 hover:border-[#8B6B2E]/60 hover:text-[#8B6B2E]"
                  }`}
                >
                  {location}
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className={`shrink-0 font-mono text-[9px] font-medium uppercase tracking-[0.18em] sm:pb-2 ${
              isDark
                ? "text-white/60"
                : "text-[#011434]/60"
            }`}
          >
            {text.showing} {villas.length}{" "}
            {text.villaCount}
          </p>
        </div>

        {villas.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {villas.map((villa) => (
              <VillaCard
                key={`${villa.groupId}-${villa.id}`}
                villa={villa}
                groupId={villa.groupId}
                groupName={villa.groupName}
                isDark={isDark}
                billingPeriod={isMonthly ? "month" : "night"}
                basePath={isMonthly ? "/monthly" : "/properties"}
              />
            ))}
          </div>
        ) : (
          <div
            className={`border border-dashed py-20 text-center ${
              isDark
                ? "border-white/10"
                : "border-[#011434]/15"
            }`}
          >
            <p className="font-serif text-base italic opacity-55">
              {text.empty}
            </p>
          </div>
        )}
      </section>

      {/* Why Book With Us */}
      <WhyBookWithUs
        isDark={isDark}
        features={features}
        labelText={text.promise}
        headingText={text.why}
        sectionId={
          isMonthly
            ? "why-book-with-us-monthly"
            : "why-book-with-us-properties"
        }
      />

      {/* FAQ */}
      <section className="mx-auto max-w-[840px] px-6 py-16 md:py-24">
        <div className="mb-14 text-center md:mb-16">
          <p
            style={{ color: accent }}
            className="mb-4 text-xs font-bold uppercase tracking-[0.45em]"
          >
            {text.faq}
          </p>

          <h2
            style={{
              fontFamily: "var(--font-cormorant-garamond)",
            }}
            className="text-3xl font-semibold uppercase tracking-widest md:text-4xl"
          >
            {text.faqTitle}
          </h2>

          <div
            style={{ backgroundColor: accent }}
            className="mx-auto mt-6 h-px w-10 opacity-60"
          />
        </div>

        <FAQAccordion items={faqs} isDark={isDark} />
      </section>

      {/* About */}
      <section className="mx-auto w-full max-w-[1380px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="flex items-center gap-4 lg:col-span-5">
            <h2
              style={{
                color: accent,
                fontFamily:
                  "var(--font-cormorant-garamond)",
              }}
              className="text-2xl font-light uppercase leading-tight tracking-wide sm:text-3xl"
            >
              {text.about}
            </h2>

            <Icon
              name="chevronRight"
              size={25}
              style={{ color: accent }}
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <h3
              style={{
                fontFamily:
                  "var(--font-cormorant-garamond)",
              }}
              className="text-xl font-medium uppercase leading-tight tracking-wide sm:text-2xl"
            >
              {text.aboutTitle}
            </h3>

            <p
              style={{ color: muted }}
              className="text-sm font-light leading-relaxed"
            >
              {text.about1}
            </p>

            <p
              style={{ color: muted }}
              className="text-sm font-light leading-relaxed"
            >
              {text.about2}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={null}>
      <PropertiesContent />
    </Suspense>
  );
}
