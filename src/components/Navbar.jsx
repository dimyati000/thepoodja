"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSettings } from "./SettingsProvider";
import { Icon } from "./Icon";

const navLinks = [
  { key: "home", path: "/" },
  { key: "about", path: "/about-us" },
  {
    key: "properties",
    path: "/properties",
    hasDropdown: true,
    dropdownItems: [
      { label: "Canggu", path: "/properties/all?location=Canggu" },
      { label: "Ubud", path: "/properties/all?location=Ubud" },
      // { label: "Seminyak", path: "/properties/all?location=Seminyak" },
    ],
  },
  { key: "contact", path: "/contact-us" },
];

export function Navbar({ isDark, onThemeToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [propertiesHovered, setPropertiesHovered] = useState(false);

  const { language, setLanguage, currency, setCurrency, t } = useSettings();

  const pathname = usePathname();
  // const router = useRouter();

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
            const isActive = checkIsActive(item.path);

            if (item.hasDropdown) {
              return (
                <div
                  key={item.key}
                  className="relative group"
                  onMouseEnter={() => setPropertiesHovered(true)}
                  onMouseLeave={() => setPropertiesHovered(false)}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.path}
                      style={{
                        color: linkColor(isActive),
                        letterSpacing: "0.15em",
                        fontWeight: isActive ? 700 : 500,
                        textTransform: "uppercase",
                      }}
                      className="text-[10px] md:text-xs py-1 transition-colors duration-300 focus:outline-none"
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                    <button
                      className="focus:outline-none py-1 transition-transform duration-300"
                      style={{
                        color: linkColor(isActive),
                        transform: propertiesHovered
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      <Icon name="chevronDown" size={16} />
                    </button>
                  </div>
                  <span
                    style={{ backgroundColor: isDark ? "#FCD57B" : "#000000" }}
                    className={`absolute bottom-0 left-0 h-px transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : "w-0"}`}
                  />

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 pt-4 w-48 transition-all duration-300 transform origin-top-left ${propertiesHovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
                  >
                    <div
                      className="py-2 rounded-sm shadow-lg"
                      style={{
                        backgroundColor: isDark ? "#010e22" : "#ffffff",
                        border: `1px solid ${borderColor}`,
                      }}
                    >
                      {item.dropdownItems.map((dropItem) => (
                        <Link
                          key={dropItem.label}
                          href={dropItem.path}
                          className={`block px-4 py-2 text-[10px] tracking-widest uppercase transition-colors ${
                            isDark
                              ? "text-white hover:bg-white/5 hover:text-[#FCD57B]"
                              : "text-black hover:bg-black/5 hover:text-[#8B6B2E]"
                          }`}
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.key}
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
                {t(`nav.${item.key}`)}
                <span
                  style={{ backgroundColor: isDark ? "#FCD57B" : "#000000" }}
                  className={`absolute bottom-0 left-0 h-px transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : "w-0"}`}
                />
              </Link>
            );
          })}

          <div
            className="flex items-center gap-4 ml-4 pl-4"
            style={{ borderLeft: `1px solid ${borderColor}` }}
          >
            {/* Currency Toggle */}
            <button
              onClick={() => setCurrency(currency === "IDR" ? "USD" : "IDR")}
              style={{
                color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
              }}
              className="text-[10px] font-bold tracking-widest uppercase hover:text-[#FCD57B] transition-colors"
            >
              {currency}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "ID" ? "EN" : "ID")}
              style={{
                color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
              }}
              className="text-[10px] font-bold tracking-widest uppercase hover:text-[#FCD57B] transition-colors"
            >
              {language}
            </button>

            {/* Theme toggle */}
            <button
              onClick={onThemeToggle}
              className="flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none ml-2"
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
                <Icon name="sun" size={14} />
              ) : (
                <Icon name="moon" size={14} />
              )}
            </button>
          </div>
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
              <Icon name="sun" size={12} />
            ) : (
              <Icon name="moon" size={12} />
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
          {/* Currency & Language row */}
          <div
            className="flex items-center justify-center gap-6 py-4 border-b"
            style={{ borderColor }}
          >
            <button
              onClick={() => setCurrency(currency === "IDR" ? "USD" : "IDR")}
              style={{ color: linkColor(false), letterSpacing: "0.15em" }}
              className="text-xs font-bold uppercase"
            >
              Currency: {currency}
            </button>
            <span style={{ color: borderColor }}>|</span>
            <button
              onClick={() => setLanguage(language === "ID" ? "EN" : "ID")}
              style={{ color: linkColor(false), letterSpacing: "0.15em" }}
              className="text-xs font-bold uppercase"
            >
              Language: {language}
            </button>
          </div>
          {navLinks.map((item) => {
            const isActive = checkIsActive(item.path);

            return (
              <div key={item.key}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.path}
                    onClick={handleMobileClick}
                    style={{
                      color: linkColor(isActive),
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                    className="py-3.5 px-6 text-xs font-medium block w-full"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </div>
                {item.hasDropdown && (
                  <div
                    className="bg-black/5 pl-10 border-t border-b"
                    style={{ borderColor }}
                  >
                    {item.dropdownItems.map((drop) => (
                      <Link
                        key={drop.label}
                        href={drop.path}
                        onClick={handleMobileClick}
                        style={{
                          color: linkColor(false),
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                        }}
                        className="py-3 px-6 text-[10px] font-medium block"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
}
