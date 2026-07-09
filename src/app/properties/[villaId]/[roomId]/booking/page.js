"use client";
import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/ThemeAndLayoutProviders";
import { useSettings } from "@/components/SettingsProvider";
import { BookingSuccessModal } from "@/components/BookingSuccessModal";
import { VILLAS_DATA } from "@/constants/villas";
import { COUNTRIES } from "@/lib/countries";
import { formatPrice } from "@/lib/currency";
import { localize } from "@/lib/i18n";

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const { t, language, currency } = useSettings();

  const accentColor = isDark ? "#FCD57B" : "#8B6B2E";
  const bgCard = isDark ? "bg-[#00102A]/60" : "bg-neutral-50";
  const borderStyle = isDark ? "border-white/10" : "border-neutral-200";

  const villa = VILLAS_DATA.find((v) => v.id === params.villaId);
  const room = villa?.rooms?.find((r) => r.id === params.roomId);

  const inputStyle = `w-full border px-4 py-3 text-sm bg-transparent outline-none transition-all duration-300 ${
    isDark
      ? "border-white/10 text-neutral-200 focus:border-[#FCD57B] placeholder:text-neutral-500"
      : "border-neutral-300 text-[#011434] focus:border-[#8B6B2E] placeholder:text-neutral-400"
  }`;

  const queryCheckIn = searchParams.get("checkIn");
  const queryCheckOut = searchParams.get("checkOut");
  const queryAdults = Number(searchParams.get("adults")) || 1;
  const queryChildren = Number(searchParams.get("children")) || 0;

  const [bookingRange] = useState(() => ({
    checkIn: queryCheckIn ? new Date(queryCheckIn) : new Date(),
    checkOut: queryCheckOut
      ? new Date(queryCheckOut)
      : new Date(Date.now() + 86400000),
  }));

  const [formData, setFormData] = useState({
    email: "",
    title: "Mr.",
    firstName: "",
    lastName: "",
    phone: "",
    arrivalTime: "14:00",
    nationality: "Indonesia",
    specialRequests: "",
    paymentMethod: "credit_card",
  });
  const [promoCode, setPromoCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!villa || !room) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <p className="font-serif text-xl italic tracking-widest opacity-40">
          Sanctuary Portfolio Empty.
        </p>
      </main>
    );
  }

  const nightCount =
    Math.round(
      (bookingRange.checkOut - bookingRange.checkIn) / (1000 * 60 * 60 * 24),
    ) || 1;
  const totalGuests = queryAdults + queryChildren;
  const rawSubtotal = nightCount * room.price;
  const taxAndServices = rawSubtotal * 0.11;
  const finalTotal = rawSubtotal + taxAndServices;

  const editUrl = `/properties/${villa.id}/${room.id}#book-a-room`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(true);
    }, 1500);
  };

  const dateLocale = language === "ID" ? "id-ID" : "en-GB";
  const formatDate = (d) =>
    d.toLocaleDateString(dateLocale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const titles = ["Mr.", "Ms.", "Mrs.", "Dr."];

  return (
    <main
      className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${isDark ? "bg-[#011434] text-neutral-300" : "bg-white text-[#011434]"}`}
    >
      <div className="max-w-6xl mx-auto mt-6 md:mt-12 lg:mt-18">
        <div className={`mb-10 border-b pb-6 ${borderStyle}`}>
          <p
            className={`text-xs font-bold tracking-[0.4em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            {t("booking.secureCheckout")}
          </p>
          <h1
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className={`text-3xl sm:text-4xl md:text-5xl font-light tracking-wide ${isDark ? "text-neutral-100" : "text-[#011434]"}`}
          >
            {t("booking.completeReservation")}
          </h1>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start"
        >
          {/* ── FORM KIRI ── */}
          <div className="lg:col-span-2 space-y-8">
            <div className={`border p-6 sm:p-8 ${borderStyle} ${bgCard}`}>
              <h3
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                className={`text-xl sm:text-2xl font-medium tracking-wide mb-6 border-b pb-4 ${borderStyle} ${isDark ? "text-neutral-100" : "text-[#011434]"}`}
              >
                {t("booking.guestInformation")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("booking.emailAddress")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="johndoe@example.com"
                    className={inputStyle}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("booking.title")}
                  </label>
                  <div className="flex gap-2">
                    {titles.map((tt) => (
                      <button
                        key={tt}
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({ ...p, title: tt }))
                        }
                        style={{
                          borderColor:
                            formData.title === tt ? accentColor : undefined,
                          backgroundColor:
                            formData.title === tt
                              ? `${accentColor}15`
                              : "transparent",
                        }}
                        className={`px-4 py-2 text-xs border cursor-pointer transition-colors duration-200 ${
                          formData.title === tt
                            ? isDark
                              ? "text-neutral-100"
                              : "text-[#011434]"
                            : borderStyle
                        }`}
                      >
                        {tt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("booking.firstName")} *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("booking.lastName")} *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("booking.phoneNumber")} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+62 812 3456 7890"
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("booking.arrivalTime")}
                  </label>
                  <input
                    type="time"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleInputChange}
                    className={inputStyle}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("booking.nationality")}
                  </label>
                  <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className={inputStyle}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("booking.specialRequest")}
                  </label>
                  <textarea
                    name="specialRequests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder={t("booking.specialRequestPlaceholder")}
                    className={`${inputStyle} resize-none`}
                  />
                </div>
              </div>
            </div>

            <div className={`border p-6 sm:p-8 ${borderStyle} ${bgCard}`}>
              <h3
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                className={`text-xl sm:text-2xl font-medium tracking-wide mb-6 border-b pb-4 ${borderStyle} ${isDark ? "text-neutral-100" : "text-[#011434]"}`}
              >
                {t("booking.paymentMethod")}
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: "credit_card",
                    title: t("booking.paymentCard"),
                    desc: t("booking.paymentCardDesc"),
                  },
                  {
                    id: "bank_transfer",
                    title: t("booking.paymentTransfer"),
                    desc: t("booking.paymentTransferDesc"),
                  },
                  {
                    id: "e_wallet",
                    title: t("booking.paymentWallet"),
                    desc: t("booking.paymentWalletDesc"),
                  },
                ].map((method) => (
                  <label
                    key={method.id}
                    className="flex items-start p-4 border cursor-pointer transition-all duration-200"
                    style={{
                      borderColor:
                        formData.paymentMethod === method.id
                          ? accentColor
                          : isDark
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)",
                      backgroundColor:
                        formData.paymentMethod === method.id
                          ? `${accentColor}10`
                          : "transparent",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleInputChange}
                      className="mt-1 mr-4 accent-current"
                      style={{ color: accentColor }}
                    />
                    <div>
                      <span
                        className={`text-sm font-semibold tracking-wide block ${isDark && formData.paymentMethod === method.id ? "text-neutral-100" : ""}`}
                      >
                        {method.title}
                      </span>
                      <span
                        className={`text-xs font-light block mt-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                      >
                        {method.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR KANAN ── */}
          <div
            className={`border p-6 sm:p-8 sticky top-28 ${borderStyle} ${bgCard}`}
          >
            <div
              className="flex items-center gap-3 mb-6 pb-6 border-b"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)",
              }}
            >
              <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p
                  className={`text-[10px] tracking-widest uppercase ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
                >
                  {villa.name} · {villa.location}
                </p>
                <p className="text-sm font-semibold tracking-wide">
                  {room.name}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm font-light">
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase block ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("booking.stayPeriod")}
                  </span>
                  <span
                    className={`font-numbers text-xs font-medium block mt-1 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                  >
                    {formatDate(bookingRange.checkIn)} —{" "}
                    {formatDate(bookingRange.checkOut)}
                  </span>
                </div>
                <Link
                  href={editUrl}
                  style={{ color: accentColor }}
                  className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 shrink-0"
                >
                  {t("booking.edit")}
                </Link>
              </div>

              <div
                className="flex items-start justify-between pb-4 border-b"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                }}
              >
                <div>
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase block ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {t("booking.guestsLabel")}
                  </span>
                  <span
                    className={`font-numbers text-xs font-medium block mt-1 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                  >
                    {queryAdults}{" "}
                    {queryAdults === 1
                      ? t("booking.adult")
                      : t("booking.adults")}
                    {queryChildren > 0 &&
                      `, ${queryChildren} ${queryChildren === 1 ? t("booking.child") : t("booking.children")}`}
                  </span>
                </div>
                <Link
                  href={editUrl}
                  style={{ color: accentColor }}
                  className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 shrink-0"
                >
                  {t("booking.edit")}
                </Link>
              </div>

              <div
                className="flex items-center gap-2 pb-4 border-b"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                }}
              >
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={t("booking.promoCode")}
                  className={`flex-1 border px-3 py-2 text-xs bg-transparent outline-none ${isDark ? "border-white/10 text-neutral-200" : "border-neutral-300 text-[#011434]"}`}
                />
                <button
                  type="button"
                  style={{ color: accentColor }}
                  className="text-[10px] font-bold uppercase tracking-widest shrink-0 cursor-pointer"
                >
                  {t("booking.apply")}
                </button>
              </div>

              <p
                className={`text-[10px] font-bold tracking-widest uppercase pt-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
              >
                {t("booking.priceDetails")}
              </p>

              <div className="flex justify-between">
                <span
                  className={isDark ? "text-neutral-400" : "text-neutral-500"}
                >
                  {t("booking.baseRoomCost")}
                </span>
                <span
                  className={`font-numbers ${isDark ? "text-neutral-300" : ""}`}
                >
                  {formatPrice(room.price, currency, language)}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className={isDark ? "text-neutral-400" : "text-neutral-500"}
                >
                  {t("booking.duration")}
                </span>
                <span
                  className={`font-numbers ${isDark ? "text-neutral-300" : ""}`}
                >
                  {nightCount}{" "}
                  {nightCount === 1
                    ? t("calendar.night")
                    : t("calendar.nights")}
                </span>
              </div>
              <div
                className={`flex justify-between pb-4 border-b ${isDark ? "border-white/5" : "border-neutral-200"}`}
              >
                <span
                  className={isDark ? "text-neutral-400" : "text-neutral-500"}
                >
                  {t("booking.totalRoomPrice")}
                </span>
                <span
                  className={`font-numbers ${isDark ? "text-neutral-200 font-medium" : ""}`}
                >
                  {formatPrice(rawSubtotal, currency, language)}
                </span>
              </div>
              <div className="flex justify-between text-xs opacity-80">
                <span>{t("booking.taxesServices")}</span>
                <span className="font-numbers">
                  {formatPrice(taxAndServices, currency, language)}
                </span>
              </div>
              <div
                className={`flex justify-between items-baseline pt-4 border-t ${borderStyle}`}
              >
                <span className="text-xs font-bold tracking-wider uppercase">
                  {t("booking.grandTotal")}
                </span>
                <span
                  style={{ color: accentColor }}
                  className="font-numbers text-xl sm:text-2xl font-bold"
                >
                  {formatPrice(finalTotal, currency, language)}
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: accentColor,
                  color: isDark ? "#011434" : "#ffffff",
                }}
                className="w-full text-xs font-bold tracking-[0.25em] uppercase py-4 mt-6 hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-pulse">
                    {t("booking.processing")}
                  </span>
                ) : (
                  t("booking.bookNow")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <BookingSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDark={isDark}
        accentColor={accentColor}
        customerName={`${formData.firstName} ${formData.lastName}`}
        customerEmail={formData.email}
        customerPhone={formData.phone}
        roomName={room.name}
        checkInDate={bookingRange.checkIn}
        checkOutDate={bookingRange.checkOut}
        nightCount={nightCount}
        paymentMethod={formData.paymentMethod}
        totalAmount={finalTotal}
        redirectPath={`/properties/${villa.id}`}
      />
    </main>
  );
}
