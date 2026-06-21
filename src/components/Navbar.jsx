"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/properties" },
  // { name: "Management Enquiry", path: "/management-enquiry" },
  // { name: "Yearly Offers", path: "/yearly-offers" },
  // { name: "Contact Us", path: "/contact-us" },
];

export function Navbar({ isDark, onThemeToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileClick = () => {
    setIsOpen(false);
  };

  const navBg = isDark
    ? scrolled
      ? "rgba(1, 14, 34, 0.75)"
      : "transparent"
    : scrolled
      ? "rgba(255, 255, 255, 0.85)"
      : "transparent";

  const linkColor = (isActive) => {
    if (isDark) return isActive ? "#FCD57B" : "rgba(255, 255, 255, 0.75)";
    return isActive ? "#000000" : "rgba(0, 0, 0, 0.55)";
  };

  const borderColor = scrolled
    ? isDark
      ? "rgba(252, 213, 123, 0.18)"
      : "rgba(1, 20, 52, 0.15)"
    : isDark
      ? "rgba(252, 213, 123, 0.08)"
      : "rgba(1, 20, 52, 0.06)";
  const mobileBg = isDark ? "#010e22" : "#ffffff";
  const hamColor = isDark ? "#FCD57B" : "#000000";

  // helper function to check active state including child paths
  const checkIsActive = (itemPath) => {
    if (itemPath === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(itemPath);
  };

  return (
    <nav
      style={{
        backgroundColor: navBg,
        backdropFilter: "blur(16px)",
        transition: "background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        borderBottom: `1px solid ${borderColor}`,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{ maxWidth: "1400px" }}
        className="mx-auto px-6 flex items-center justify-between h-14 md:h-16 lg:h-[80px]"
      >
        <Link href="/">
          <Image
            src={isDark ? "/logo-gold2.png" : "/logo-black2.png"}
            alt="The Poodja"
            width={400}
            height={152}
            priority
            style={{ cursor: "pointer", height: "auto", width: "190px" }}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((item) => {
            // Memanggil fungsi cerdas checkIsActive untuk mencakup nested child pages
            const isActive = checkIsActive(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                style={{
                  color: linkColor(isActive),
                  letterSpacing: "0.15em",
                  fontWeight: isActive ? 700 : 500,
                  textTransform: "uppercase",
                  position: "relative",
                }}
                className="text-[10px] md:text-xs py-1 group transition-colors duration-300 focus:outline-none"
              >
                {item.name}
                <span
                  style={{ backgroundColor: isDark ? "#FCD57B" : "#000000" }}
                  className={`absolute bottom-0 left-0 h-px transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : "w-0"}`}
                />
              </Link>
            );
          })}

          {/* Theme toggle */}
          <button
            onClick={onThemeToggle}
            className="flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
            style={{
              width: "32px",
              height: "32px",
              border: `1px solid ${isDark ? "rgba(251,212,123,0.35)" : "rgba(0, 0, 0, 0.15)"}`,
              borderRadius: "50%",
              background: "transparent",
              color: isDark ? "#FCD57B" : "#000000",
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

        {/* Mobile hamburger button */}
        <div className="flex items-center lg:hidden gap-3">
          <button
            onClick={onThemeToggle}
            style={{
              width: "28px",
              height: "28px",
              border: `1px solid ${isDark ? "rgba(251,212,123,0.3)" : "rgba(0, 0, 0, 0.12)"}`,
              borderRadius: "50%",
              background: "transparent",
              color: isDark ? "#FCD57B" : "#000000",
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
            }}
            className="p-1"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1">
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
          {navLinks.map((item) => {
            // Samakan logika active untuk versi mobile menu
            const isActive = checkIsActive(item.path);
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={handleMobileClick}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  color: linkColor(isActive),
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  borderBottom: `1px solid ${borderColor}`,
                }}
                className="py-3.5 px-6 text-xs font-medium"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
