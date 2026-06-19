"use client";
<<<<<<< HEAD
import { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
=======
import { useState, useCallback } from "react";
import { useTheme } from "@/app/components/ThemeAndLayoutProviders";
>>>>>>> 9df2d365d20331e6d19070be251ea4ba57a46947
import { HeroSection } from "./components/HeroSection";
import { WhyBookWithUs } from "./components/WhyBookWithUs";
import { Destinations } from "./components/Destinations";
import { Testimonials } from "./components/Testimonial";
import { ExclusiveDeals } from "./components/ExclusiveDeals";
<<<<<<< HEAD
import { Footer } from "./components/Footer";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [cursorHovered, setCursorHovered] = useState(false);
  const [heroSide, setHeroSide] = useState(""); // "left", "right", atau ""

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

=======

const TOTAL_SLIDES = 3;

export default function App() {
  const { isDark, heroSide } = useTheme(); // Tarik heroSide dari provider
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

>>>>>>> 9df2d365d20331e6d19070be251ea4ba57a46947
  const handleSlideChange = useCallback(
    (index) => {
      if (index === current) return;
      setFade(false);
      setTimeout(() => {
        setCurrent(index);
        setFade(true);
      }, 400);
    },
    [current],
  );

<<<<<<< HEAD
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${e.clientX}px`,
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        `${e.clientY}px`,
      );

      const sliderEl = document.getElementById("main-slider-frame");
      if (sliderEl) {
        const rect = sliderEl.getBoundingClientRect();
        const isInSliderX = e.clientX >= rect.left && e.clientX <= rect.right;
        const isInSliderY = e.clientY >= rect.top && e.clientY <= rect.bottom;

        if (isInSliderX && isInSliderY) {
          const width = rect.width;
          const relativeX = e.clientX - rect.left;

          if (relativeX < width * 0.2) {
            setHeroSide("left");
          } else if (relativeX > width * 0.8) {
            setHeroSide("right");
          } else {
            setHeroSide("");
          }
        } else {
          setHeroSide("");
        }
      } else {
        setHeroSide("");
      }
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.tagName === "INPUT" ||
        e.target.tagName === "SELECT" ||
        e.target.closest("button") ||
        e.target.closest("a") ||
        e.target.closest(".info-card-container")
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
  }, []);

  const triggerHeroSlide = () => {
    if (cursorHovered || !heroSide) return;
    if (heroSide === "left") {
      handleSlideChange((current - 1 + 3) % 3);
    } else if (heroSide === "right") {
      handleSlideChange((current + 1) % 3);
    }
  };

  const showCustomCursor = heroSide !== "" && !cursorHovered;

  return (
    <div
      style={{
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
        
        /* Sembunyikan kursor bawaan saat custom kursor aktif */
        ${showCustomCursor ? `body { cursor: none !important; }` : ""}
        
        .smooth-cursor {
          position: fixed;
          left: 0;
          top: 0;
          transform: translate3d(var(--cursor-x), var(--cursor-y), 0) translate(-50%, -50%);
          will-change: transform;
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>

      {showCustomCursor && (
        <div className="hidden lg:flex smooth-cursor items-center justify-center pointer-events-none select-none">
          <div
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "50%",
              border: "1.5px solid rgba(230, 213, 184, 0.75)",
              backgroundColor: "rgba(230, 213, 184, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* SVG Chevron Arrow */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(230, 213, 184, 0.95)"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform:
                  heroSide === "left" ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.15s ease-in-out",
                marginLeft: heroSide === "left" ? "0px" : "2px",
                marginRight: heroSide === "left" ? "2px" : "0px",
              }}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      )}

      <div className="relative z-20">
        <Navbar isDark={isDark} onThemeToggle={toggleTheme} />

        <div onClick={triggerHeroSlide} className="w-full">
          <HeroSection
            isDark={isDark}
            current={current}
            fade={fade}
            handleSlideChange={handleSlideChange}
          />
        </div>

        <WhyBookWithUs isDark={isDark} />
        <Destinations isDark={isDark} />
        <Testimonials isDark={isDark} />
        <ExclusiveDeals isDark={isDark} />
        <Footer isDark={isDark} />
      </div>
=======
  // Fungsi navigasi klik area gambar
  const handleHeroClick = () => {
    if (heroSide === "right") {
      const nextIndex = (current + 1) % TOTAL_SLIDES;
      handleSlideChange(nextIndex);
    } else if (heroSide === "left") {
      const prevIndex = (current - 1 + TOTAL_SLIDES) % TOTAL_SLIDES;
      handleSlideChange(prevIndex);
    }
  };

  return (
    <div className="relative w-full">
      <HeroSection
        isDark={isDark}
        current={current}
        fade={fade}
        handleSlideChange={handleSlideChange}
        handleHeroClick={handleHeroClick}
      />
      <WhyBookWithUs isDark={isDark} />
      <Destinations isDark={isDark} />
      <Testimonials isDark={isDark} />
      <ExclusiveDeals isDark={isDark} />
>>>>>>> 9df2d365d20331e6d19070be251ea4ba57a46947
    </div>
  );
}
