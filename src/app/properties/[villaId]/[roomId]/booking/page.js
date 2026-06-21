"use client";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTheme } from "@/components/ThemeAndLayoutProviders";
import { BookingSuccessModal } from "@/components/BookingSuccessModal";

const MOCK_ROOMS = {
  "canopy-canvas-studio": {
    name: "Canopy Canvas Studio",
    pricePerNight: 2450000,
    villaName: "Villa Asana",
  },
};

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { isDark } = useTheme();

  const accentColor = isDark ? "#FCD57B" : "#8B6B2E";
  const bgCard = isDark ? "bg-[#00102A]/60" : "bg-neutral-50";
  const borderStyle = isDark ? "border-white/10" : "border-neutral-200";

  const inputStyle = `w-full border px-4 py-3 text-sm bg-transparent outline-none transition-all duration-300 ${
    isDark
      ? "border-white/10 text-neutral-200 focus:border-[#FCD57B] placeholder:text-neutral-500"
      : "border-neutral-300 text-[#011434] focus:border-[#8B6B2E] placeholder:text-neutral-400"
  }`;

  const [roomDetails] = useState(() => {
    if (params?.roomId && MOCK_ROOMS[params.roomId]) {
      return MOCK_ROOMS[params.roomId];
    }
    return {
      name: "Luxury Suite Room",
      pricePerNight: 2500000,
      villaName: "Premium Villa",
    };
  });

  const [bookingRange] = useState(() => {
    const queryCheckIn = searchParams.get("checkIn");
    const queryCheckOut = searchParams.get("checkOut");
    return {
      checkIn: queryCheckIn ? new Date(queryCheckIn) : new Date(),
      checkOut: queryCheckOut
        ? new Date(queryCheckOut)
        : new Date(Date.now() + 86400000),
    };
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit_card",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nightCount =
    Math.round(
      (bookingRange.checkOut - bookingRange.checkIn) / (1000 * 60 * 60 * 24),
    ) || 1;
  const rawSubtotal = nightCount * roomDetails.pricePerNight;
  const taxAndServices = rawSubtotal * 0.11;
  const finalTotal = rawSubtotal + taxAndServices;

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

  return (
    <main
      className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${isDark ? "bg-[#011434] text-neutral-300" : "bg-white text-[#011434]"}`}
    >
      <div className="max-w-6xl mx-auto mt-6 md:mt-12 lg:mt-18">
        <div className={`mb-10 border-b pb-6 ${borderStyle}`}>
          <p
            className={`text-xs font-bold tracking-[0.4em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            Secure Checkout
          </p>
          <h1
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className={`text-3xl sm:text-4xl md:text-5xl font-light tracking-wide ${isDark ? "text-neutral-100" : "text-[#011434]"}`}
          >
            Complete Your Reservation
          </h1>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start"
        >
          <div className="lg:col-span-2 space-y-8">
            <div className={`border p-6 sm:p-8 ${borderStyle} ${bgCard}`}>
              <h3
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                className={`text-xl sm:text-2xl font-medium tracking-wide mb-6 border-b pb-4 ${borderStyle} ${isDark ? "text-neutral-100" : "text-[#011434]"}`}
              >
                1. Guest Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    First Name *
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
                    Last Name *
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
                <div className="sm:col-span-2">
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    Email Address *
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
                    Phone Number *
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
                <div className="sm:col-span-2">
                  <label
                    className={`block text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Dietary restrictions, early check-in..."
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
                2. Payment Method
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: "credit_card",
                    title: "Credit Card / Visa / Mastercard",
                    desc: "Pay securely via global standard credit card gateways.",
                  },
                  {
                    id: "bank_transfer",
                    title: "Virtual Account / Bank Transfer",
                    desc: "Instant verification via BCA, Mandiri, BNI, or Permata.",
                  },
                  {
                    id: "e_wallet",
                    title: "Digital E-Wallet (QRIS / Dana)",
                    desc: "Scan seamless dynamic QR code for fluid instant processing.",
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

          <div
            className={`border p-6 sm:p-8 sticky top-28 ${borderStyle} ${bgCard}`}
          >
            <h3
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              className={`text-xl sm:text-2xl font-medium tracking-wide mb-6 border-b pb-4 ${borderStyle} ${isDark ? "text-neutral-100" : "text-[#011434]"}`}
            >
              Reservation Details
            </h3>
            <div className="space-y-4 text-sm font-light">
              <div>
                <span
                  className={`text-[10px] font-bold tracking-widest uppercase block ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  Accommodation
                </span>
                <span
                  className={`text-base font-medium block mt-0.5 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}
                >
                  {roomDetails.name}
                </span>
                <span
                  className={`text-xs italic ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  {roomDetails.villaName}
                </span>
              </div>
              <div
                className="grid grid-cols-2 gap-4 py-4 border-y"
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
                    Check-In
                  </span>
                  <span
                    className={`text-xs font-medium block mt-1 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                  >
                    {bookingRange.checkIn.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase block ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    Check-Out
                  </span>
                  <span
                    className={`text-xs font-medium block mt-1 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                  >
                    {bookingRange.checkOut.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <span
                  className={isDark ? "text-neutral-400" : "text-neutral-500"}
                >
                  Base Room Cost
                </span>
                <span className={isDark ? "text-neutral-300" : ""}>
                  IDR {roomDetails.pricePerNight.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className={isDark ? "text-neutral-400" : "text-neutral-500"}
                >
                  Duration
                </span>
                <span className={isDark ? "text-neutral-300" : ""}>
                  {nightCount} {nightCount === 1 ? "Night" : "Nights"}
                </span>
              </div>
              <div
                className={`flex justify-between pb-4 border-b ${isDark ? "border-white/5" : "border-neutral-200"}`}
              >
                <span
                  className={isDark ? "text-neutral-400" : "text-neutral-500"}
                >
                  Total Room Price
                </span>
                <span className={isDark ? "text-neutral-200 font-medium" : ""}>
                  IDR {rawSubtotal.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-xs opacity-80">
                <span>Taxes & Luxury Services (11%)</span>
                <span>IDR {taxAndServices.toLocaleString("id-ID")}</span>
              </div>
              <div
                className={`flex justify-between items-baseline pt-4 border-t ${borderStyle}`}
              >
                <span className="text-xs font-bold tracking-wider uppercase">
                  Grand Total
                </span>
                <span
                  style={{ color: accentColor }}
                  className="text-xl sm:text-2xl font-bold"
                >
                  IDR {finalTotal.toLocaleString("id-ID")}
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: accentColor,
                  color: isDark ? "#011434" : "#ffffff",
                }}
                className="w-full text-xs font-bold tracking-[0.25em] uppercase py-4 mt-6 hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-pulse">
                    Processing Order...
                  </span>
                ) : (
                  "Confirm Order"
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
        roomName={roomDetails.name}
        checkInDate={bookingRange.checkIn}
        checkOutDate={bookingRange.checkOut}
        nightCount={nightCount}
        paymentMethod={formData.paymentMethod}
        totalAmount={finalTotal}
        redirectPath={`/properties/${params?.villaId}`}
      />
    </main>
  );
}
