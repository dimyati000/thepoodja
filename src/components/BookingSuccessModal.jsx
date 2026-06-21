"use client";
import { useRouter } from "next/navigation";

export function BookingSuccessModal({
  isOpen,
  onClose,
  isDark,
  accentColor,
  customerName,
  customerEmail,
  customerPhone,
  roomName,
  checkInDate,
  checkOutDate,
  nightCount,
  paymentMethod,
  totalAmount,
  redirectPath,
}) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose?.();
    if (redirectPath) router.push(redirectPath);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div
        className={`border max-w-lg w-full p-6 sm:p-10 relative shadow-2xl text-center ${isDark ? "bg-[#011434] border-[#FCD57B]/30 text-neutral-100" : "bg-white border-neutral-300 text-[#011434]"}`}
      >
        {/* BUTTON X DI POJOK KANAN ATAS */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 text-sm font-light w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 outline-none ${
            isDark
              ? "text-neutral-400 hover:text-neutral-100 hover:bg-white/5"
              : "text-neutral-500 hover:text-[#011434] hover:bg-neutral-100"
          }`}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div
          className="w-16 h-16 border rounded-full mx-auto flex items-center justify-center mb-6"
          style={{ borderColor: accentColor }}
        >
          <span style={{ color: accentColor }} className="text-2xl">
            ✓
          </span>
        </div>

        <h2
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className={`text-2xl sm:text-3xl font-normal tracking-wide mb-3 ${isDark ? "text-neutral-100" : "text-[#011434]"}`}
        >
          Booking Complete!
        </h2>

        <p
          className={`text-xs font-light leading-relaxed mb-6 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
        >
          Pleasure doing business,{" "}
          <span
            className={`font-semibold ${isDark ? "text-neutral-200" : "text-neutral-800"}`}
          >
            {customerName}
          </span>
          . Your reservation at{" "}
          <span
            className={`font-semibold ${isDark ? "text-neutral-200" : "text-neutral-800"}`}
          >
            {roomName}
          </span>{" "}
          has been confirmed. Secure invoice receipts and access credentials
          have been dispatched to{" "}
          <span className="underline opacity-90">{customerEmail}</span>.
        </p>

        <div
          className={`p-4 text-left rounded mb-6 text-xs space-y-2 border ${isDark ? "bg-[#00102A] border-white/5" : "bg-neutral-50 border-neutral-200"}`}
        >
          <div className="flex justify-between">
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>
              Guest:
            </span>
            <span
              className={`font-medium ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
            >
              {customerName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>
              Phone:
            </span>
            <span
              className={`font-medium ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
            >
              {customerPhone}
            </span>
          </div>
          <div
            className="flex justify-between border-t pt-2 mt-2"
            style={{
              borderColor: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)",
            }}
          >
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>
              Schedule:
            </span>
            <span
              className={`font-medium ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
            >
              {checkInDate?.toLocaleDateString("en-GB")} -{" "}
              {checkOutDate?.toLocaleDateString("en-GB")} ({nightCount} nites)
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>
              Method:
            </span>
            <span
              className={`font-medium uppercase text-[10px] tracking-wider ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
            >
              {paymentMethod?.replace("_", " ")}
            </span>
          </div>
          <div
            className="flex justify-between border-t pt-2 mt-2"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            }}
          >
            <span
              className={`font-bold uppercase text-[10px] ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
            >
              Settled Amount:
            </span>
            <span style={{ color: accentColor }} className="font-bold">
              IDR {totalAmount?.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <button
          onClick={handleClose}
          className={`w-full text-[10px] font-bold tracking-[0.3em] uppercase py-3.5 transition-colors duration-200 ${
            isDark
              ? "bg-neutral-100 text-[#011434] hover:bg-neutral-200"
              : "bg-[#011434] text-white hover:opacity-90"
          }`}
        >
          Return to Properties
        </button>
      </div>
    </div>
  );
}
