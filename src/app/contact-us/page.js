"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeAndLayoutProviders";

/* ── Simple scroll-reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function ContactUs() {
  const { isDark } = useTheme();

  /* form state */
  const [fullName, setFullName]     = useState("");
  const [email, setEmail]           = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [topic, setTopic]           = useState("Reservation");
  const [message, setMessage]       = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /* scroll-reveal refs */
  const [touchRef, touchVis]   = useReveal();
  const [visitRef, visitVis]   = useReveal();
  const [socialRef, socialVis] = useReveal();

  /* theme tokens */
  const accentText  = isDark ? "#FCD57B"                      : "#8B6B2E";
  const descText    = isDark ? "rgba(255,255,255,0.65)"        : "rgba(1,20,52,0.7)";
  const mainText    = isDark ? "#ffffff"                       : "#011434";
  const borderColor = isDark ? "rgba(255,255,255,0.10)"        : "rgba(0,0,0,0.10)";

  /* glassmorphism card */
  const glassBg     = isDark
    ? "rgba(1, 14, 34, 0.55)"
    : "rgba(255, 255, 255, 0.55)";
  const glassBorder = isDark
    ? "rgba(252, 213, 123, 0.15)"
    : "rgba(139, 107, 46, 0.18)";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      setFullName(""); setEmail(""); setPhoneNumber("");
      setTopic("Reservation"); setMessage("");
    }, 1200);
  };

  return (
    <div style={{ overflowX: "hidden", minHeight: "100vh", position: "relative" }}
      className="transition-colors duration-500">

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO BACKGROUND + GLASS FORM CARD
          Photo is now a full-width background.
          Form floats on top inside a glassmorphism card.
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Full-bleed background photo */}
        <Image
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85"
          alt="Tropical Balinese Villa"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="scale-[1.04] animate-[heroZoom_18s_ease-in-out_infinite_alternate]"
        />

        {/* Dark/warm gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(1,14,34,0.72) 0%, rgba(1,20,52,0.45) 60%, rgba(0,0,0,0.25) 100%)"
              : "linear-gradient(135deg, rgba(255,248,235,0.68) 0%, rgba(255,255,255,0.35) 60%, rgba(0,0,0,0.08) 100%)",
            transition: "background 0.5s ease",
          }}
        />

        {/* Decorative floating accent blobs */}
        <div className="absolute top-1/4 right-[8%] w-64 h-64 rounded-full opacity-10 blur-3xl animate-[blobFloat_8s_ease-in-out_infinite_alternate]"
          style={{ backgroundColor: accentText }} />
        <div className="absolute bottom-1/4 left-[6%] w-48 h-48 rounded-full opacity-10 blur-3xl animate-[blobFloat_11s_ease-in-out_infinite_alternate-reverse]"
          style={{ backgroundColor: accentText }} />

        {/* Breadcrumb (inside hero, top-left) */}
        <div className="absolute top-24 md:top-28 left-0 right-0 max-w-[1380px] mx-auto px-6">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-white/60">
            <Link href="/" className="hover:text-white/90 transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: accentText }}>Contact Us</span>
          </div>
        </div>

        {/* Glass card container */}
        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 pt-24 pb-16 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center min-h-[80vh]">

            {/* Left: title + tagline */}
            <div className="lg:col-span-5 flex flex-col gap-4 animate-[slideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
              <p style={{ color: accentText }}
                className="text-[10px] font-bold uppercase tracking-[0.4em]">
                Poodja — Bali
              </p>
              <h1
                style={{ fontFamily: "var(--font-cormorant-garamond)", color: "#ffffff", textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-widest uppercase leading-tight">
                Send a<br />Message
              </h1>
              <div style={{ backgroundColor: accentText }} className="w-14 h-[1.5px] opacity-70" />
              <p style={{ color: "rgba(255,255,255,0.75)" }}
                className="text-sm font-light leading-relaxed max-w-sm">
                Our multilingual reservations team is always ready to assist you with planning your perfect stay in Bali.
              </p>
            </div>

            {/* Right: glassmorphism form card */}
            <div className="lg:col-span-7 animate-[slideUp_0.9s_0.15s_cubic-bezier(0.16,1,0.3,1)_both]">
              <div
                style={{
                  background: glassBg,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `1px solid ${glassBorder}`,
                  boxShadow: isDark
                    ? "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(252,213,123,0.06)"
                    : "0 24px 64px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
                className="rounded-lg p-6 sm:p-8 lg:p-10"
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Full Name" accentText={accentText} mainText={mainText} borderColor={borderColor}>
                      <input type="text" required placeholder="Your full name"
                        value={fullName} onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-transparent border-b py-2 text-sm focus:outline-none transition-all duration-300 placeholder:opacity-40"
                        style={{ borderColor, color: mainText }} />
                    </InputField>
                    <InputField label="Email" accentText={accentText} mainText={mainText} borderColor={borderColor}>
                      <input type="email" required placeholder="Your email address"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b py-2 text-sm focus:outline-none transition-all duration-300 placeholder:opacity-40"
                        style={{ borderColor, color: mainText }} />
                    </InputField>
                  </div>

                  {/* Row 2: Phone & Topic */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Phone Number" accentText={accentText} mainText={mainText} borderColor={borderColor}>
                      <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor }}>
                        <div className="flex items-center gap-1.5 select-none pr-1 shrink-0">
                          <div className="w-[18px] h-[12px] flex flex-col rounded-[1px] overflow-hidden border border-black/10 shadow-sm">
                            <div className="h-1/2 bg-[#CE1126]" />
                            <div className="h-1/2 bg-white" />
                          </div>
                          <span className="text-sm font-light" style={{ color: mainText }}>+62</span>
                        </div>
                        <div className="w-px h-4" style={{ backgroundColor: borderColor }} />
                        <input type="tel" required placeholder="812 3456 7890"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                          className="flex-1 bg-transparent py-1 text-sm focus:outline-none placeholder:opacity-40"
                          style={{ color: mainText }} />
                      </div>
                    </InputField>

                    <InputField label="Topic" accentText={accentText} mainText={mainText} borderColor={borderColor}>
                      <div className="relative">
                        <select value={topic} onChange={(e) => setTopic(e.target.value)}
                          className="w-full bg-transparent border-b py-2 text-sm appearance-none focus:outline-none cursor-pointer"
                          style={{ borderColor, color: mainText }}>
                          {["Reservation","Management Enquiry","Feedback","Other"].map(v => (
                            <option key={v} value={v}
                              className={isDark ? "bg-[#010e22] text-white" : "bg-white text-[#011434]"}>{v}</option>
                          ))}
                        </select>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke={accentText} strokeWidth="1.2">
                            <path d="M1 1l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </InputField>
                  </div>

                  {/* Row 3: Message */}
                  <InputField label="Message" accentText={accentText} mainText={mainText} borderColor={borderColor}>
                    <textarea required rows={4} placeholder="Write down your message or inquiries"
                      value={message} onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-transparent border-b py-2 text-sm focus:outline-none resize-none placeholder:opacity-40"
                      style={{ borderColor, color: mainText }} />
                  </InputField>

                  {/* Submit */}
                  <div className="flex justify-end pt-2">
                    <button type="submit" disabled={isSubmitting}
                      className="group relative overflow-hidden px-10 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:shadow-xl active:scale-95 disabled:opacity-50 cursor-pointer rounded-full"
                      style={{ backgroundColor: "#8B6B2E" }}>
                      <span className="relative z-10">
                        {isSubmitting ? "Sending…" : "Submit"}
                      </span>
                      {/* shine sweep on hover */}
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom fade-out for smooth section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, transparent, #011434)"
              : "linear-gradient(to bottom, transparent, #ffffff)",
          }} />
      </section>


      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — GET IN TOUCH
          Image swapped to LEFT, text on RIGHT
      ═══════════════════════════════════════════════════════ */}
      <section ref={touchRef}
        className="max-w-[1380px] mx-auto px-6 py-16 md:py-24"
        style={{
          opacity: touchVis ? 1 : 0,
          transform: touchVis ? "none" : "translateY(40px)",
          transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          borderTop: `1px solid ${borderColor}`,
        }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* LEFT: Photo (swapped from previous right position) */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative h-[280px] sm:h-[380px] lg:h-[500px] rounded-sm overflow-hidden group shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Pool Lounge View"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500" />
            {/* decorative label on photo */}
            <div className="absolute bottom-5 left-5 z-10 px-3 py-1.5 rounded-sm"
              style={{
                background: isDark ? "rgba(1,14,34,0.7)" : "rgba(255,255,255,0.75)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${glassBorder}`,
              }}>
              <span style={{ color: accentText }} className="text-[9px] font-bold uppercase tracking-[0.25em]">
                Poodja — Bali
              </span>
            </div>
          </div>

          {/* RIGHT: Contact details (swapped from previous left position) */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
            <div className="mb-6">
              <p style={{ color: accentText }} className="text-[10px] font-bold uppercase tracking-[0.35em] mb-2">
                Reach Out
              </p>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                className="text-2xl md:text-3xl font-semibold tracking-wider uppercase mb-4">
                Get In Touch
              </h2>
              <div style={{ backgroundColor: accentText }} className="w-12 h-[1px] opacity-60" />
            </div>

            <p style={{ color: descText }} className="text-sm font-light leading-relaxed mb-6">
              Poodja&apos;s multilingual Reservations team are always available to help you with your travel planning.
            </p>

            <div className="flex flex-col gap-6">
              <div>
                <h4 style={{ color: accentText }} className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">
                  Call or Text Us
                </h4>
                <div className="flex flex-col gap-1 text-sm font-light">
                  <a href="tel:+62361738000" className="hover:opacity-80 transition-opacity" style={{ color: mainText }}>
                    Tel: +62 361 738 000
                  </a>
                  <a href="https://wa.me/6282145811275" target="_blank" rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity" style={{ color: mainText }}>
                    WhatsApp: +62 821 4581 1275&nbsp;
                    <span className="text-[11px] opacity-60">(Text Only)</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 style={{ color: accentText }} className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                  Email Us
                </h4>
                <div className="flex flex-col gap-2.5 text-sm font-light">
                  {[
                    { sub: "Villas, Hotels & Villa Complex Management Enquiry", mail: "hello@thepoodja.com" },
                    { sub: "Agent Contracting", mail: "sales@thepoodja.com" },
                    { sub: "General Reservation", mail: "reservation@thepoodja.com" },
                    { sub: "Event Reservation", mail: "events@thepoodja.com" },
                    { sub: "Guest Service Assistance", mail: "concierge@thepoodja.com" },
                  ].map(({ sub, mail }) => (
                    <div key={mail} className="flex flex-col">
                      <span style={{ color: descText }} className="text-xs opacity-75 mb-0.5">{sub}</span>
                      <a href={`mailto:${mail}`} className="hover:underline self-start font-medium transition-opacity hover:opacity-80"
                        style={{ color: mainText }}>{mail}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — VISIT US
      ═══════════════════════════════════════════════════════ */}
      <section ref={visitRef}
        className="max-w-[1380px] mx-auto px-6 py-16 md:py-24"
        style={{
          opacity: visitVis ? 1 : 0,
          transform: visitVis ? "none" : "translateY(40px)",
          transition: "opacity 0.9s 0.1s cubic-bezier(0.16,1,0.3,1), transform 0.9s 0.1s cubic-bezier(0.16,1,0.3,1)",
          borderTop: `1px solid ${borderColor}`,
        }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Left: Visit details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-6">
              <p style={{ color: accentText }} className="text-[10px] font-bold uppercase tracking-[0.35em] mb-2">
                Our Office
              </p>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                className="text-2xl md:text-3xl font-semibold tracking-wider uppercase mb-4">
                Visit Us
              </h2>
              <div style={{ backgroundColor: accentText }} className="w-12 h-[1px] opacity-60" />
            </div>

            <p style={{ color: descText }} className="text-sm font-light leading-relaxed mb-8">
              If you prefer to enquire or consult a property offline, we are available to meet at our office.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 style={{ color: accentText }} className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Address</h4>
                <p style={{ color: mainText }} className="text-sm font-light leading-relaxed">
                  Jalan Raya Seminyak No. 88, Legian,<br />Kuta, Bali, 80361 — Indonesia
                </p>
              </div>
              <div>
                <h4 style={{ color: accentText }} className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Hours</h4>
                <p style={{ color: mainText }} className="text-sm font-light leading-relaxed">
                  09:00 – 18:00 (GMT+8)<br />Monday – Friday
                </p>
              </div>
            </div>
          </div>

          {/* Right: Themed map */}
          <div className="lg:col-span-7 relative h-[320px] md:h-[420px] rounded-sm overflow-hidden shadow-md">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=115.1500%2C-8.7050%2C115.1800%2C-8.6800&amp;layer=mapnik&amp;marker=-8.6925%2C115.1650"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: isDark ? "grayscale(1) invert(0.88) hue-rotate(180deg)" : "none",
                transition: "filter 0.5s ease",
              }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — OUR SOCIALS
      ═══════════════════════════════════════════════════════ */}
      <section ref={socialRef}
        className="py-16 md:py-24"
        style={{
          opacity: socialVis ? 1 : 0,
          transform: socialVis ? "none" : "translateY(40px)",
          transition: "opacity 0.9s 0.15s cubic-bezier(0.16,1,0.3,1), transform 0.9s 0.15s cubic-bezier(0.16,1,0.3,1)",
          borderTop: `1px solid ${borderColor}`,
          backgroundColor: isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)",
        }}>
        <div className="max-w-[1380px] mx-auto px-6 text-center">
          <p style={{ color: accentText }} className="text-[10px] font-bold uppercase tracking-[0.45em] mb-2">
            Social Networks
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className="text-2xl md:text-3xl font-semibold tracking-widest uppercase mb-4">
            Our Socials
          </h2>
          <div style={{ backgroundColor: accentText }} className="w-8 h-[1px] mx-auto opacity-60 mb-10" />

          <div className="flex justify-center gap-5">
            {[
              { label: "Facebook", icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
              { label: "Instagram", icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></> },
            ].map(({ label, icon }) => (
              <a key={label} href={`https://${label.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                style={{
                  borderColor: isDark ? "rgba(251,212,123,0.3)" : "rgba(139,107,46,0.3)",
                  color: accentText,
                  backdropFilter: "blur(8px)",
                  backgroundColor: isDark ? "rgba(252,213,123,0.04)" : "rgba(139,107,46,0.04)",
                }}
                className="w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-opacity-70 active:scale-95">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          SUCCESS MODAL
      ═══════════════════════════════════════════════════════ */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease]">
          <div
            style={{
              background: glassBg,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: `1px solid ${glassBorder}`,
              boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
            }}
            className="w-full max-w-md p-8 rounded-lg text-center flex flex-col items-center animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">

            <div style={{ borderColor: accentText, backgroundColor: isDark ? "rgba(252,213,123,0.08)" : "rgba(139,107,46,0.06)" }}
              className="w-16 h-16 rounded-full border flex items-center justify-center mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accentText} strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 style={{ fontFamily: "var(--font-cormorant-garamond)", color: mainText }}
              className="text-2xl font-semibold uppercase tracking-wider mb-3">
              Thank You
            </h3>
            <p style={{ color: descText }} className="text-sm font-light leading-relaxed mb-6">
              Your message has been sent successfully. Our multilingual reservations team will review it and get back to you shortly.
            </p>
            <button onClick={() => setShowSuccessModal(false)}
              style={{ backgroundColor: "#8B6B2E", color: "#FFFFFF" }}
              className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#725725] active:scale-95 cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.00); }
          to   { transform: scale(1.07); }
        }
        @keyframes blobFloat {
          from { transform: translateY(0px) scale(1); }
          to   { transform: translateY(-28px) scale(1.08); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        input::placeholder, textarea::placeholder { opacity: 0.4; }
      `}</style>
    </div>
  );
}

/* ── Tiny helper: labeled field wrapper ── */
function InputField({ label, accentText, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ color: accentText }} className="text-[10px] font-bold uppercase tracking-[0.2em]">
        {label}
      </label>
      {children}
    </div>
  );
}
