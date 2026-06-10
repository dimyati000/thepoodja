"use client";
import { useState } from "react";
import Image from "next/image";
import { useScrollReveal, revealStyle } from "@/hooks/useScrollReveal";

const features = [
  {
    id: 1,
    num: "01",
    title: "Curated Properties",
    subtitle: "Hand-selected villas",
    desc: "Every property in our portfolio is personally visited and verified by our team. Only the finest 5% of listings make the cut — so you never have to compromise on quality.",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  {
    id: 2,
    num: "02",
    title: "Verified & Trusted",
    subtitle: "Complete peace of mind",
    desc: "All our listings undergo rigorous in-person verification. Every amenity, every detail — confirmed. Book with complete confidence, every single time.",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  {
    id: 3,
    num: "03",
    title: "Best Price Guarantee",
    subtitle: "Always the best rate",
    desc: "We guarantee the best available rates across all our properties. Find a lower price elsewhere, and we'll match it — no questions asked.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  {
    id: 4,
    num: "04",
    title: "24/7 Concierge",
    subtitle: "Always by your side",
    desc: "Our dedicated concierge team is available around the clock — from airport transfers to private dining reservations, every request handled with elegance.",
    img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
];

const featureIcons = {
  1: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  2: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  3: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  4: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.68 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.88a16 16 0 0 0 6.21 6.21l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
};

export function WhyBookWithUs({ isDark }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const { ref: hRef, inView: hInView } = useScrollReveal(0.2);
  const { ref: bodyRef, inView: bodyInView } = useScrollReveal(0.06);

  const active = features[activeIdx];
  const others = features.filter((_, i) => i !== activeIdx);

  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  return (
    <section
      id="why-book-with-us"
      style={{
        backgroundColor: isDark ? "#011434" : "#ffffff",
        paddingBottom: "100px",
      }}
      className="transition-colors duration-500 select-none"
    >
      {/* Header */}
      <div
        ref={hRef}
        style={{
          textAlign: "center",
          padding: "100px 24px 72px",
          ...revealStyle(hInView),
        }}
      >
        <p
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            color: isDark ? "#FCD57B" : "#000000",
            fontSize: "10px",
            letterSpacing: "0.45em",
            fontWeight: 700,
            marginBottom: "18px",
            textTransform: "uppercase",
          }}
        >
          Our Promise
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: isDark ? "#ffffff" : "#000000",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 300,
            letterSpacing: "0.08em",
          }}
        >
          WHY BOOK WITH US?
        </h2>
        <div
          style={{
            width: "40px",
            height: "1px",
            background: isDark ? "#FCD57B" : "#000000",
            margin: "22px auto 0",
            opacity: 0.75,
          }}
        />
      </div>

      {/* 3-column Layout (Responsive Grid Tailwind) */}
      <div
        ref={bodyRef}
        style={revealStyle(bodyInView, 0.08)}
        className="max-w-300 w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start transition-all duration-500"
      >
        {/* Left: Numbered List */}
        <div
          style={{ borderColor: borderColor }}
          className="col-span-1 lg:col-span-3 lg:border-r"
        >
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0">
            {features.map((f, i) => {
              const isActive = i === activeIdx;
              return (
                <div
                  key={f.id}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    borderBottom: `1px solid ${borderColor}`,
                    cursor: "pointer",
                    position: "relative",
                    transition: "opacity 0.35s ease",
                    opacity: isActive ? 1 : 0.46,
                  }}
                  className="pb-6 pt-2 lg:py-7 lg:pr-9"
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = "0.72";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = "0.46";
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: isDark ? "#FCD57B" : "#000000",
                      fontSize: "9px",
                      letterSpacing: "0.4em",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      marginBottom: "9px",
                    }}
                  >
                    {f.num}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: isDark ? "#ffffff" : "#000000",
                      fontSize: "1.15rem",
                      fontWeight: isActive ? 400 : 300,
                      letterSpacing: "0.03em",
                      lineHeight: 1.25,
                      marginBottom: "5px",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: isDark
                        ? "rgba(255,255,255,0.38)"
                        : "rgba(0,0,0,0.4)",
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {f.subtitle}
                  </p>
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        height: "1px",
                        background: isDark
                          ? "linear-gradient(to right, #FCD57B, rgba(252,213,123,0.3))"
                          : "linear-gradient(to right, #000000, rgba(0,0,0,0.1))",
                        animation:
                          "wbConnectorIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
                      }}
                      className="hidden lg:block right-0 w-9 z-10"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Main Image (Menggunakan Next.js Image fill) */}
        <div className="col-span-1 lg:col-span-6 px-0 lg:px-9">
          <div
            key={`wb-img-${activeIdx}`}
            style={{
              height: "clamp(320px, 43vw, 480px)",
              overflow: "hidden",
              position: "relative",
              animation: "wbFadeIn 0.55s cubic-bezier(0.16,1,0.3,1) both",
            }}
            className="rounded-sm shadow-lg"
          >
            <Image
              src={active.img}
              alt={active.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isDark
                  ? "linear-gradient(to bottom, rgba(1,20,52,0) 55%, rgba(1,20,52,0.38) 100%)"
                  : "linear-gradient(to bottom, rgba(255,255,255,0) 55%, rgba(0,0,0,0.2) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "22px",
                left: "22px",
                color: isDark ? "#FCD57B" : "#ffffff",
                opacity: 0.9,
                zIndex: 10,
              }}
            >
              {featureIcons[active.id]}
            </div>
          </div>

          <div
            key={`wb-detail-${activeIdx}`}
            style={{
              padding: "28px 0 0",
              animation: "wbFadeIn 0.5s 0.08s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.45)",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "7px",
              }}
            >
              {active.subtitle}
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: isDark ? "#ffffff" : "#000000",
                fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                fontWeight: 300,
                letterSpacing: "0.05em",
                lineHeight: 1.2,
                marginBottom: "14px",
              }}
            >
              {active.title.toUpperCase()}
            </h2>
            <div
              style={{
                background: isDark ? "#FCD57B" : "#000000",
                opacity: 0.7,
              }}
              className="w-9 h-px mb-4"
            />
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                color: isDark ? "rgba(255,255,255,0.48)" : "rgba(0,0,0,0.6)",
                fontSize: "0.82rem",
                lineHeight: 1.9,
                fontWeight: 300,
              }}
              className="max-w-xl lg:max-w-md"
            >
              {active.desc}
            </p>
          </div>
        </div>

        {/* Right: Other Feature Thumbnails (Menggunakan Next.js Image fill) */}
        <div
          style={{
            borderColor: borderColor,
            height: "clamp(320px, 43vw, 480px)",
          }}
          className="col-span-1 lg:col-span-3 lg:border-l grid grid-cols-3 lg:flex lg:flex-col lg:pl-6 gap-3 overflow-hidden self-start w-full"
        >
          {others.map((f) => {
            const idx = features.findIndex((feat) => feat.id === f.id);
            return (
              <div
                key={f.id}
                onClick={() => setActiveIdx(idx)}
                className="group relative overflow-hidden cursor-pointer rounded-sm flex-1 lg:flex-none lg:h-[calc(33.33%-8px)]"
              >
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  sizes="(max-width: 1024px) 33vw, 25vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "brightness(0.45)",
                    transition: "transform 0.6s ease, filter 0.4s ease",
                  }}
                  className="group-hover:scale-[1.05] group-hover:brightness-[0.6]"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isDark
                      ? "rgba(1,20,52,0.25)"
                      : "rgba(0,0,0,0.15)",
                    transition: "background 0.3s ease",
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "12px 14px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                    zIndex: 2,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "#FCD57B",
                      fontSize: "7px",
                      letterSpacing: "0.3em",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      marginBottom: "2px",
                    }}
                  >
                    {f.num}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "#ffffff",
                      fontSize: "0.82rem",
                      fontWeight: 300,
                    }}
                    className="truncate"
                  >
                    {f.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes wbConnectorIn {
          from { width: 0; opacity: 0; }
          to { width: 36px; opacity: 1; }
        }
        @keyframes wbFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
