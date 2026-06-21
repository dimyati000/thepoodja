"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const ThemeContext = createContext();

export function ThemeAndLayoutProviders({ children }) {
  const [isDark, setIsDark] = useState(true);
  const [cursorHovered, setCursorHovered] = useState(false);
  const [heroSide, setHeroSide] = useState("");

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
          if (relativeX < width * 0.2) setHeroSide("left");
          else if (relativeX > width * 0.8) setHeroSide("right");
          else setHeroSide("");
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
  }, []);

  const showCustomCursor = heroSide !== "" && !cursorHovered;

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, heroSide }}>
      <div
        style={{
          backgroundColor: isDark ? "#011434" : "#ffffff",
          color: isDark ? "#ffffff" : "#011434",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
        className="transition-colors duration-500"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          ${showCustomCursor ? `body { cursor: none !important; }` : ""}
          .smooth-cursor {
            position: fixed; left: 0; top: 0;
            transform: translate3d(var(--cursor-x), var(--cursor-y), 0) translate(-50%, -50%);
            will-change: transform; pointer-events: none; z-index: 9999;
          }
        `}</style>

        {/* Custom Cursor */}
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
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(230, 213, 184, 0.95)"
                strokeWidth="1.25"
                style={{
                  transform:
                    heroSide === "left" ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.15s",
                }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        )}

        <Navbar isDark={isDark} onThemeToggle={() => setIsDark((v) => !v)} />

        <div className="flex-1">{children}</div>

        <Footer isDark={isDark} />
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
