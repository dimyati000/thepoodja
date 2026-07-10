"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../../../../components/ThemeAndLayoutProviders";
import { useSettings } from "@/components/SettingsProvider";
import {
  VILLAS_DATA,
  DEFAULT_AMENITIES,
  DEFAULT_RULES,
  DEFAULT_REVIEWS,
} from "@/constants/villas";
import { DEFAULT_AMENITY_DETAILS } from "@/constants/amenityDetails";
import { SectionLabel } from "@/components/SectionLabel";
import { Icon } from "@/components/Icon";
import { RoomGallery } from "@/components/properties/RoomGallery";
import { RoomDescription } from "@/components/properties/RoomDescription";
import { SleepingSlider } from "@/components/properties/SleepingSlider";
import { AmenityGrid } from "@/components/properties/AmenityGrid";
import { AmenityDetailModal } from "@/components/properties/AmenityDetailModal";
import { BookingCalendar } from "@/components/properties/BookingCalendar";
import { DateRangePopup } from "@/components/properties/DateRangePopup";
import { GuestCounterPopup } from "@/components/properties/GuestCounterPopup";
import { ThingsToKnow } from "@/components/properties/ThingsToKnow";
import { ReviewCard } from "@/components/properties/ReviewCard";
import { LocationPanel } from "@/components/properties/LocationPanel";
import { VillaCard } from "@/components/properties/VillaCard";
import { formatPrice } from "@/lib/currency";

export default function RoomDetailPage() {
  const { isDark } = useTheme();
  const {
    t,
    language,
    currency,
    checkIn,
    checkOut,
    adults,
    childrenCount,
    resetBooking,
  } = useSettings();
  const { villaId, roomId } = useParams();
  const router = useRouter();
  const [amenityModalOpen, setAmenityModalOpen] = useState(false);

  const villa = VILLAS_DATA.find((v) => v.id === villaId);
  const room = villa?.rooms?.find((r) => r.id === roomId);

  useEffect(() => {
    resetBooking();
  }, [villaId, roomId]);

  if (!villa || !room) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <p className="font-serif text-xl italic tracking-widest opacity-40">
          Sanctuary Portfolio Empty.
        </p>
      </main>
    );
  }

  const accentText = isDark ? "#FCD57B" : "#8B6B2E";
  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(1, 20, 52, 0.1)";
  const cardBg = isDark ? "bg-[#00102A]/40" : "bg-[#fcfcfc] shadow-sm";
  const iconColor = isDark ? "text-neutral-400" : "text-neutral-500";

  const gallery =
    Array.isArray(room.gallery) && room.gallery.length > 0 ? room.gallery : [];
  const amenities = room.facilities?.length
    ? room.facilities
    : DEFAULT_AMENITIES;
  const amenityDetails = room.amenityDetails || DEFAULT_AMENITY_DETAILS;
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

  const nightCount =
    checkIn && checkOut
      ? Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      : 0;

  const canBook = Boolean(checkIn && checkOut);

  const handleBookNow = () => {
    if (!canBook) return;
    const checkInStr = checkIn.toISOString().split("T")[0];
    const checkOutStr = checkOut.toISOString().split("T")[0];
    const params = new URLSearchParams({
      checkIn: checkInStr,
      checkOut: checkOutStr,
      adults: String(adults),
      children: String(childrenCount),
    });
    router.push(
      `/properties/${villaId}/${roomId}/booking?${params.toString()}`,
    );
  };

  return (
    <main className="w-full pb-24 md:pb-32 font-sans tracking-wide antialiased">
      {/* ── GALLERY ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 pt-24 md:pt-32">
        <RoomGallery images={gallery} alt={room.name} isDark={isDark} />
      </section>

      {/* ── BREADCRUMB: Home / Properties / [Nama Room] ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-10 md:mt-14">
        <nav
          className={`text-[10px] font-medium tracking-[0.25em] uppercase mb-6 flex items-center gap-2 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
        >
          <Link
            href="/properties"
            className={isDark ? "hover:text-white" : "hover:text-[#011434]"}
          >
            {t("nav.home")}
          </Link>
          <span>/</span>
          <Link
            href="/properties"
            className={isDark ? "hover:text-white" : "hover:text-[#011434]"}
          >
            {t("nav.properties")}
          </Link>
          <span>/</span>
          <span style={{ color: accentText }}>{room.name}</span>
        </nav>
      </section>

      {/* ── TITLE + AMENITIES + SLEEPING (kiri) & PRICE CARD STICKY (kanan) ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* KOLOM KIRI */}
          <div className="lg:col-span-8 flex flex-col gap-16 md:gap-20">
            {/* Title block */}
            <div>
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
                className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-light mb-6 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
              >
                <span className="flex items-center gap-1.5">
                  <Icon name="guests" size={15} className={iconColor} />
                  <span className="font-numbers">{room.guests || 2}</span>{" "}
                  {t("common.guests")}
                </span>
                <span className="opacity-30">|</span>
                <span className="flex items-center gap-1.5">
                  <Icon name="beds" size={15} className={iconColor} />
                  <span className="font-numbers">{room.beds || 1}</span>{" "}
                  {room.beds > 1 ? t("common.bedrooms") : t("common.bedroom")}
                </span>
                <span className="opacity-30">|</span>
                <span className="flex items-center gap-1.5">
                  <Icon name="baths" size={15} className={iconColor} />
                  <span className="font-numbers">{room.baths || 1}</span>{" "}
                  {room.baths > 1
                    ? t("common.bathrooms")
                    : t("common.bathroom")}
                </span>
                <span className="opacity-30">|</span>
                <span className="flex items-center gap-1.5">
                  <Icon name="size" size={15} className={iconColor} />
                  <span className="font-numbers">{room.size}</span> m²
                </span>
              </div>

              <RoomDescription
                description={room.description}
                sections={room.descriptionSections}
                isDark={isDark}
              />
            </div>

            {/* Amenities */}
            <div>
              <SectionLabel isDark={isDark} className="mb-3">
                {t("roomDetail.inRoomComfort")}
              </SectionLabel>
              <h2
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                className="text-2xl sm:text-3xl font-light tracking-wide uppercase mb-10"
              >
                {t("roomDetail.amenities")}
              </h2>
              <AmenityGrid amenities={amenities} isDark={isDark} limit={8} />

              <button
                onClick={() => setAmenityModalOpen(true)}
                className={`mt-8 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase px-5 py-2.5 border transition-colors duration-300 ${
                  isDark
                    ? "border-white/20 text-white hover:border-white/50"
                    : "border-[#011434]/20 text-[#011434] hover:border-[#011434]/50"
                }`}
              >
                {t("roomDetail.viewAllAmenities")}
              </button>

              <AmenityDetailModal
                isOpen={amenityModalOpen}
                onClose={() => setAmenityModalOpen(false)}
                details={amenityDetails}
                isDark={isDark}
              />
            </div>

            {/* Sleeping Arrangement — slider */}
            <SleepingSlider
              label={t("roomDetail.sleepingArrangement")}
              title={t("roomDetail.whereSleep")}
              items={sleepingConfig}
              isDark={isDark}
            />

            {/* ── BOOK A ROOM (CALENDAR) ── */}
            <div id="book-a-room">
              <SectionLabel isDark={isDark} className="mb-3">
                {t("roomDetail.reserveStay")}
              </SectionLabel>
              <h2
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                className="text-2xl sm:text-3xl font-light tracking-wide uppercase mb-10"
              >
                {t("roomDetail.bookARoom")}
              </h2>
              <BookingCalendar isDark={isDark} />
            </div>
          </div>

          {/* KOLOM KANAN — price card sticky */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div
                style={{ borderColor }}
                className={`border p-6 sm:p-7 ${cardBg}`}
              >
                {/* Harga */}
                <span
                  className={`block text-[9px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  {t("roomDetail.estimationRate")}
                </span>
                <p className="flex items-baseline gap-1.5 mb-1">
                  <span className="font-numbers text-3xl font-semibold leading-none">
                    {formatPrice(room.price, currency, language)}
                  </span>
                  <span
                    className={`text-[11px] font-sans font-light ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("common.perNight")}
                  </span>
                </p>
                <p
                  className={`text-[11px] font-light mb-6 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
                >
                  ★ <span className="font-numbers">{avgRating.toFixed(1)}</span>{" "}
                  · <span className="font-numbers">{reviews.length}</span>{" "}
                  {t("roomDetail.reviews")}
                </p>

                {/* Badge info singkat */}
                <div
                  className={`mb-6 px-4 py-3 text-[11px] font-light rounded-sm ${isDark ? "bg-white/[0.04] text-neutral-300" : "bg-[#8B6B2E]/[0.06] text-neutral-600"}`}
                >
                  {t("roomDetail.limitedAvailability")}
                </div>

                {/* Tanggal */}
                <div className="mb-5">
                  <DateRangePopup isDark={isDark} />
                </div>

                {/* Guests */}
                <div className="mb-5">
                  <GuestCounterPopup
                    isDark={isDark}
                    maxGuests={room.guests || 2}
                  />
                </div>

                {/* Breakdown harga */}
                <div
                  className="pt-5 mb-6 border-t space-y-2"
                  style={{ borderColor }}
                >
                  {canBook ? (
                    <>
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={
                            isDark ? "text-neutral-400" : "text-neutral-500"
                          }
                        >
                          <span className="font-numbers">
                            {formatPrice(room.price, currency, language)}
                          </span>{" "}
                          × <span className="font-numbers">{nightCount}</span>{" "}
                          {nightCount === 1
                            ? t("calendar.night")
                            : t("calendar.nights")}
                        </span>
                        <span
                          className={`font-numbers ${isDark ? "text-neutral-200" : "text-neutral-800"}`}
                        >
                          {formatPrice(
                            room.price * nightCount,
                            currency,
                            language,
                          )}
                        </span>
                      </div>
                      <div
                        className="flex items-center justify-between text-sm font-semibold pt-3 border-t"
                        style={{ borderColor }}
                      >
                        <span>{t("roomDetail.total")}</span>
                        <span
                          className="font-numbers"
                          style={{ color: accentText }}
                        >
                          {formatPrice(
                            room.price * nightCount,
                            currency,
                            language,
                          )}
                        </span>
                      </div>
                    </>
                  ) : (
                    <p
                      className={`text-[11px] italic ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
                    >
                      {t("calendar.selectDate")}
                    </p>
                  )}
                </div>

                {/* Tombol Book */}
                <button
                  type="button"
                  disabled={!canBook}
                  onClick={handleBookNow}
                  style={{
                    backgroundColor: canBook ? accentText : undefined,
                    color: canBook
                      ? isDark
                        ? "#011434"
                        : "#ffffff"
                      : undefined,
                  }}
                  className={`w-full text-center px-4 py-3.5 text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 mb-5 ${
                    canBook
                      ? "cursor-pointer hover:opacity-90"
                      : `cursor-not-allowed ${isDark ? "bg-white/5 text-neutral-500" : "bg-black/5 text-neutral-400"}`
                  }`}
                >
                  {t("calendar.book")}
                </button>

                {/* Info tambahan */}
                <div
                  className={`space-y-2 text-[11px] font-light border-t pt-5 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  style={{ borderColor }}
                >
                  <p className="flex items-center gap-2">
                    <Icon name="close" size={0} className="hidden" />✓{" "}
                    {t("roomDetail.bestRate")}
                  </p>
                  <p className="flex items-center gap-2">
                    ✓ {t("roomDetail.freeCancellation")}
                  </p>
                  <p className="flex items-center gap-2">
                    ✓ {t("roomDetail.instantConfirmation")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THINGS TO KNOW ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-20 md:mt-28">
        <SectionLabel isDark={isDark} className="mb-3">
          {t("roomDetail.beforeArrive")}
        </SectionLabel>
        <h2
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="text-2xl sm:text-3xl font-light tracking-wide uppercase mb-10"
        >
          {t("roomDetail.thingsToKnow")}
        </h2>
        <ThingsToKnow rules={rules} isDark={isDark} />
      </section>

      {/* ── REVIEWS ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-20 md:mt-28">
        <div className="flex items-center gap-3 mb-10">
          <span style={{ color: accentText }} className="text-sm font-bold">
            ★ <span className="font-numbers">{avgRating.toFixed(1)}</span>
          </span>
          <span
            className={`text-xs font-light ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            <span className="font-numbers">{reviews.length}</span>{" "}
            {t("roomDetail.reviews")}
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
          {t("roomDetail.findYourWay")}
        </SectionLabel>
        <h2
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="text-2xl sm:text-3xl font-light tracking-wide uppercase mb-10"
        >
          {t("roomDetail.location")}
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
              {t("roomDetail.moreInEstate")}
            </SectionLabel>
            <h2
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              className="text-2xl sm:text-3xl font-light tracking-wide uppercase"
            >
              {t("roomDetail.otherQuarters")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {otherRooms.map((r) => (
              <VillaCard
                key={r.id}
                villa={r}
                groupId={villaId}
                groupName={villa.name}
                isDark={isDark}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
