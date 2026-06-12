"use client";
import { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WhyBookWithUs } from "./components/WhyBookWithUs";
import { Destinations } from "./components/Destinations";
import { Testimonials } from "./components/Testimonial";
import { ExclusiveDeals } from "./components/ExclusiveDeals";
import { Footer } from "./components/Footer";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isInHero, setIsInHero] = useState(false);

  const [heroSide, setHeroSide] = useState(""); // "left" atau "right"
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });

      if (isInHero) {
        const halfWidth = window.innerWidth / 2;
        if (e.clientX < halfWidth) {
          setHeroSide("left");
        } else {
          setHeroSide("right");
        }
      }
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.tagName === "INPUT" ||
        e.target.tagName === "SELECT" ||
        e.target.closest("button") ||
        e.target.closest("a")
      ) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isInHero]);

  const triggerHeroSlide = () => {
    if (!isInHero || cursorHovered) return;
    const eventName = heroSide === "left" ? "prevHeroSlide" : "nextHeroSlide";
    window.dispatchEvent(new Event(eventName));
  };

  return (
    <div
      style={{
        fontFamily: "'Nunito Sans', sans-serif",
        overflowX: "hidden",
        backgroundColor: isDark ? "#011434" : "#ffffff",
        color: isDark ? "#ffffff" : "#011434",
        position: "relative",
        minHeight: "100vh",
      }}
      className="transition-colors duration-500"
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        
        /* 🎯 SOLUSI KURSOR RIGID: Menyembunyikan kursor asli laptop secara global hanya saat berada di dalam Hero */
        ${
          isInHero
            ? `
          body, button, a, input, select, pointer {
            cursor: none !important;
          }
        `
            : ""
        }
      `}</style>

      {/* Aesthetic Circle Cursor (Hanya Aktif & Muncul di Dalam Area Hero) */}
      <div
        className="hidden lg:block fixed pointer-events-none rounded-full"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: isInHero && !cursorHovered ? "65px" : "30px",
          height: isInHero && !cursorHovered ? "65px" : "30px",
          border: `1px solid ${isDark ? "#FCD57B" : "#000000"}`,
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          transition:
            "width 0.3s ease, height 0.3s ease, background-color 0.3s ease, opacity 0.3s ease, border-color 0.3s ease",
          backgroundColor: cursorHovered
            ? "rgba(251,212,123,0.15)"
            : isInHero
              ? "rgba(255,255,255,0.03)"
              : "transparent",
          opacity: isInHero ? 1 : 0,
        }}
      >
        {/* Indikator Teks Panah di Dalam Kursor Lingkaran */}
        {isInHero && !cursorHovered && (
          <div
            style={{ color: isDark ? "#FCD57B" : "#000000" }}
            className="w-full h-full flex items-center justify-center text-[8px] font-bold tracking-widest text-center"
          >
            {heroSide === "left" ? "‹ PREV" : "NEXT ›"}
          </div>
        )}
      </div>

      {/* Center Dot Cursor */}
      <div
        className="hidden lg:block fixed pointer-events-none w-1 h-1 rounded-full"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          backgroundColor: isDark ? "#FCD57B" : "#000000",
          opacity: isInHero ? 1 : 0,
        }}
      />

      {/* Background Grid Lines Minimalis */}
      <div
        style={{ pointerEvents: "none" }}
        className={`absolute inset-0 flex justify-between z-0 px-6 max-w-300 mx-auto transition-opacity duration-500 ${isDark ? "opacity-[0.04]" : "opacity-[0.07]"}`}
      >
        <div className={`w-px h-full ${isDark ? "bg-white" : "bg-black"}`} />
        <div
          className={`w-px h-full hidden md:block ${isDark ? "bg-white" : "bg-black"}`}
        />
        <div
          className={`w-px h-full hidden md:block ${isDark ? "bg-white" : "bg-black"}`}
        />
        <div className={`w-px h-full ${isDark ? "bg-white" : "bg-black"}`} />
      </div>

      {/* Konten Utama Aplikasi */}
      <div className="relative z-20">
        <Navbar isDark={isDark} onThemeToggle={() => setIsDark((v) => !v)} />

        <div
          ref={heroRef}
          onMouseEnter={() => setIsInHero(true)}
          onMouseLeave={() => setIsInHero(false)}
          onClick={triggerHeroSlide}
          className="w-full"
        >
          <HeroSection isDark={isDark} />
        </div>
        <WhyBookWithUs isDark={isDark} />
        <Destinations isDark={isDark} />
        <Testimonials isDark={isDark} />
        <ExclusiveDeals isDark={isDark} />
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
