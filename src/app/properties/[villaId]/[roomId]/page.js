"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../../../components/ThemeAndLayoutProviders";
import {
  VILLAS_DATA,
  DEFAULT_AMENITIES,
  DEFAULT_RULES,
  DEFAULT_REVIEWS,
} from "@/constants/villas";
import { SectionLabel } from "@/components/SectionLabel";
import { RoomGallery } from "@/components/properties/RoomGallery";
import { AmenityGrid } from "@/components/properties/AmenityGrid";
import { BookingCalendar } from "@/components/properties/BookingCalendar";
import { ThingsToKnow } from "@/components/properties/ThingsToKnow";
import { ReviewCard } from "@/components/properties/ReviewCard";
import { LocationPanel } from "@/components/properties/LocationPanel";
import { RoomCard } from "@/components/properties/RoomCard";

export default function RoomDetailPage() {
  const { isDark } = useTheme();
  const { villaId, roomId } = useParams();
  const router = useRouter();

  const villa = VILLAS_DATA.find((v) => v.id === villaId);
  const room = villa?.rooms?.find((r) => r.id === roomId);

  if (!villa || !room) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <p className="font-serif text-xl italic tracking-widest opacity-40">
          Sanctuary Portfolio Empty.
        </p>
      </main>
    );
  }

  const mainText = isDark ? "#ffffff" : "#011434";
  const descText = isDark ? "#a3a3a3" : "#4b5563";
  const accentText = isDark ? "#FCD57B" : "#8B6B2E";
  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(1, 20, 52, 0.1)";

  const gallery = room.gallery?.length ? room.gallery : [room.image];
  const amenities = room.amenities?.length ? room.amenities : DEFAULT_AMENITIES;
  const rules = room.rules || DEFAULT_RULES;
  const reviews = room.reviews?.length ? room.reviews : DEFAULT_REVIEWS;
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const sleepingConfig = room.sleepConfig?.length
    ? room.sleepConfig
    : [
        {
          name: room.beds > 1 ? "Master Bedroom" : "Bedroom",
          bedConfig: room.bedConfig || "1 King Bed",
          bathConfig: "1 Indoor Bathroom",
          image: gallery[0],
        },
        ...(room.beds > 1
          ? [
              {
                name: "Bedroom 2",
                bedConfig: "1 King Bed",
                bathConfig: "1 Indoor Bathroom",
                image: gallery[1] || gallery[0],
              },
            ]
          : []),
      ];

  const otherRooms = villa.rooms.filter((r) => r.id !== room.id).slice(0, 2);

  return (
    <main className="w-full pb-24 md:pb-32 font-sans tracking-wide antialiased">
      {/* ── GALLERY ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 pt-24 md:pt-32">
        <RoomGallery images={gallery} alt={room.name} isDark={isDark} />
      </section>

      {/* ── BREADCRUMB + TITLE ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-10 md:mt-14">
        <nav
          className={`text-[10px] font-medium tracking-[0.25em] uppercase mb-6 flex items-center gap-2 ${
            isDark ? "text-neutral-500" : "text-neutral-400"
          }`}
        >
          <Link
            href="/properties"
            className={isDark ? "hover:text-white" : "hover:text-[#011434]"}
          >
            Home
          </Link>
          <span>/</span>
          <button
            onClick={() => router.push(`/properties/${villaId}`)}
            className="bg-transparent border-none p-0 cursor-pointer uppercase tracking-[0.25em] text-[10px] font-medium"
            style={{ color: "inherit" }}
          >
            {villa.name.includes(" — ")
              ? villa.name.split(" — ")[1]
              : villa.name}
          </button>
          <span>/</span>
          <span style={{ color: accentText }}>{room.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <SectionLabel isDark={isDark} className="mb-3">
              {villa.location}, Bali
            </SectionLabel>
            <h1
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide leading-tight mb-5"
            >
              {room.name}
            </h1>

            <div
              className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-light mb-6 ${
                isDark ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              <span>{room.guests || 2} Guests</span>
              <span className="opacity-30">|</span>
              <span>
                {room.beds || 1} Bedroom{room.beds > 1 ? "s" : ""}
              </span>
              <span className="opacity-30">|</span>
              <span>
                {room.baths || 1} Bathroom{room.baths > 1 ? "s" : ""}
              </span>
              <span className="opacity-30">|</span>
              <span>{room.size}</span>
            </div>

            <p
              style={{ color: descText }}
              className="text-sm font-light leading-relaxed max-w-2xl"
            >
              {room.description ||
                `A masterclass in interior poetry, specifically engineered to capture native Balinese natural lighting. This sanctuary at ${villa.name} features custom handcrafted timber appointments and deep spatial ventilation.`}
            </p>

            {room.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {room.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-[11px] font-sans px-3 py-1.5 rounded-full border tracking-wide ${
                      isDark
                        ? "border-white/10 text-neutral-300 bg-white/[0.03]"
                        : "border-[#011434]/10 text-neutral-600 bg-[#011434]/5"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price summary card */}
          <div className="lg:col-span-4">
            <div
              style={{ borderColor }}
              className={`border p-7 sm:p-8 ${isDark ? "bg-[#00102A]/40" : "bg-[#fcfcfc] shadow-sm"}`}
            >
              <span
                className={`block text-[10px] tracking-widest uppercase mb-1 ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                Estimation Rate
              </span>
              <p
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                className="text-3xl font-light mb-1"
              >
                {room.price}{" "}
                <span
                  className={`text-sm font-sans font-light ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  / night
                </span>
              </p>
              <p
                className={`text-xs font-light mb-6 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
              >
                ★ {avgRating.toFixed(1)} · {reviews.length} reviews
              </p>
              <a
                href="#book-a-room"
                style={{
                  backgroundColor: accentText,
                  color: isDark ? "#011434" : "#ffffff",
                }}
                className="block text-center px-6 py-3.5 text-xs font-bold tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-90"
              >
                Check Availability
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-20 md:mt-28">
        <SectionLabel isDark={isDark} className="mb-3">
          In-Room Comfort
        </SectionLabel>
        <h2
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="text-2xl sm:text-3xl font-light tracking-wide uppercase mb-10"
        >
          Amenities
        </h2>
        <AmenityGrid amenities={amenities} isDark={isDark} />
      </section>

      {/* ── WHERE YOU'LL SLEEP ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-20 md:mt-28">
        <SectionLabel isDark={isDark} className="mb-3">
          Sleeping Arrangement
        </SectionLabel>
        <h2
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="text-2xl sm:text-3xl font-light tracking-wide uppercase mb-10"
        >
          Where You&rsquo;ll Sleep
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sleepingConfig.map((bed, i) => (
            <div key={i} className="group">
              <div
                className={`relative w-full aspect-[4/3] overflow-hidden border mb-4 ${
                  isDark ? "border-white/10" : "border-[#011434]/10"
                }`}
              >
                <Image
                  src={bed.image}
                  alt={bed.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <h4 className="font-serif text-lg font-light tracking-wide mb-1">
                {bed.name}
              </h4>
              <p
                className={`text-xs font-light ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
              >
                {bed.bedConfig} / {bed.bathConfig}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOOK A ROOM (CALENDAR) ── */}
      <section
        id="book-a-room"
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-20 md:mt-28 scroll-mt-24"
      >
        <div className="text-center mb-10">
          <SectionLabel isDark={isDark} align="center" className="mb-3">
            Reserve Your Stay
          </SectionLabel>
          <h2
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className="text-2xl sm:text-3xl font-light tracking-wide uppercase"
          >
            Book A Room
          </h2>
        </div>
        <BookingCalendar isDark={isDark} />
      </section>

      {/* ── THINGS TO KNOW ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-20 md:mt-28">
        <SectionLabel isDark={isDark} className="mb-3">
          Before You Arrive
        </SectionLabel>
        <h2
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="text-2xl sm:text-3xl font-light tracking-wide uppercase mb-10"
        >
          Things To Know
        </h2>
        <ThingsToKnow rules={rules} isDark={isDark} />
      </section>

      {/* ── REVIEWS ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-20 md:mt-28">
        <div className="flex items-center gap-3 mb-10">
          <span style={{ color: accentText }} className="text-sm font-bold">
            ★ {avgRating.toFixed(1)}
          </span>
          <span
            className={`text-xs font-light ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            {reviews.length} Reviews
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} isDark={isDark} />
          ))}
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-20 md:mt-28">
        <SectionLabel isDark={isDark} className="mb-3">
          Find Your Way
        </SectionLabel>
        <h2
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="text-2xl sm:text-3xl font-light tracking-wide uppercase mb-10"
        >
          Location
        </h2>
        <LocationPanel villa={villa} isDark={isDark} />
      </section>

      {/* ── NEARBY / OTHER ROOMS ── */}
      {otherRooms.length > 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-20 md:mt-28">
          <div
            className={`mb-10 border-b pb-4 ${isDark ? "border-white/10" : "border-[#011434]/10"}`}
          >
            <SectionLabel isDark={isDark} className="mb-2">
              More In This Estate
            </SectionLabel>
            <h2
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              className="text-2xl sm:text-3xl font-light tracking-wide uppercase"
            >
              Other Quarters
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {otherRooms.map((r) => (
              <RoomCard key={r.id} room={r} villaId={villaId} isDark={isDark} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
