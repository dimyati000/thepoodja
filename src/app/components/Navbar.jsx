"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  "Home",
  "Properties",
  "Management Enquiry",
  "Yearly Offers",
  "Contact Us",
];

export function Navbar({ isDark, onThemeToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (link) => {
    setActive(link);
    setIsOpen(false);
    const id = link.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navBg = isDark
    ? scrolled
      ? "rgba(1, 14, 34, 0.98)"
      : "rgba(1, 14, 34, 0.75)"
    : scrolled
      ? "rgba(255, 255, 255, 0.98)"
      : "rgba(255, 255, 255, 0.85)";

  // 🎨 SINKRONISASI WARNA LINK (Hitam Pekat vs Putih Bersih)
  const linkColor = (isActive) => {
    if (isDark) return isActive ? "#FBD47B" : "rgba(255, 255, 255, 0.75)";
    return isActive ? "#000000" : "rgba(0, 0, 0, 0.55)";
  };

  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.06)"
    : "rgba(0, 0, 0, 0.08)";
  const mobileBg = isDark ? "#010e22" : "#ffffff";
  const hamColor = isDark ? "#FBD47B" : "#000000";

  return (
    <nav
      style={{
        backgroundColor: navBg,
        backdropFilter: "blur(16px)",
        transition: "background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        fontFamily: "'Nunito Sans', sans-serif",
        borderBottom: `1px solid ${borderColor}`,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "76px",
        }}
        className="flex items-center justify-between"
      >
        <Image
          src={isDark ? "/logo-gold1.png" : "/logo-black1.png"}
          alt="The Poodja"
          width={400}
          height={152}
          priority
          style={{ cursor: "pointer", height: "auto", width: "130px" }}
          onClick={() => handleNav("Home")}
        />

        {/* Desktop nav */}
        <div style={{ gap: "36px" }} className="hidden lg:flex items-center">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => handleNav(l)}
              style={{
                color: linkColor(active === l),
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "0.15em",
                fontWeight: active === l ? 700 : 500,
                fontSize: "11px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textTransform: "uppercase",
                padding: "4px 0",
                position: "relative",
              }}
              className="group transition-colors duration-300 focus:outline-none"
            >
              {l}
              <span
                style={{ backgroundColor: isDark ? "#FBD47B" : "#000000" }}
                className={`absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${active === l ? "w-full" : "w-0"}`}
              />
            </button>
          ))}

          {/* Theme toggle bulat elegan */}
          <button
            onClick={onThemeToggle}
            className="flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
            style={{
              width: "32px",
              height: "32px",
              border: `1px solid ${isDark ? "rgba(251,212,123,0.35)" : "rgba(0, 0, 0, 0.15)"}`,
              borderRadius: "50%",
              background: "transparent",
              color: isDark ? "#FBD47B" : "#000000",
              cursor: "pointer",
            }}
          >
            {isDark ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div style={{ gap: "12px" }} className="flex items-center lg:hidden">
          <button
            onClick={onThemeToggle}
            style={{
              width: "28px",
              height: "28px",
              border: `1px solid ${isDark ? "rgba(251,212,123,0.3)" : "rgba(0, 0, 0, 0.12)"}`,
              borderRadius: "50%",
              background: "transparent",
              color: isDark ? "#FBD47B" : "#000000",
              cursor: "pointer",
            }}
            className="flex items-center justify-center"
          >
            {isDark ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.25">
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: hamColor,
                  transform: isOpen
                    ? "rotate(45deg) translate(4px, 4px)"
                    : "none",
                  transition: "transform 0.25s",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "16px",
                  height: "1px",
                  background: hamColor,
                  opacity: isOpen ? 0 : 1,
                  transition: "opacity 0.25s",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: hamColor,
                  transform: isOpen
                    ? "rotate(-45deg) translate(4px, -4px)"
                    : "none",
                  transition: "transform 0.25s",
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          style={{
            background: mobileBg,
            borderTop: `1px solid ${borderColor}`,
          }}
          className="lg:hidden"
        >
          {links.map((l) => (
            <button
              key={l}
              onClick={() => handleNav(l)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "14px 24px",
                color: linkColor(active === l),
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                background: "transparent",
                border: "none",
                borderBottom: `1px solid ${borderColor}`,
                cursor: "pointer",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
