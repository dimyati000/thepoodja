"use client";
import { useState, useEffect } from "react";
import { PropertySearchBar } from "./PropertySearchBar";

export function StickySearchBar({ isDark, triggerRef }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setVisible(false);
        return;
      }
      const threshold = triggerRef?.current
        ? triggerRef.current.offsetTop + triggerRef.current.offsetHeight - 100
        : window.innerHeight * 0.7;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [triggerRef]);

  return (
    <div
      className={`hidden md:block fixed top-16 lg:top-[80px] left-0 right-0 z-40 px-4 md:px-12 transition-all duration-400 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
    >
      <div className="max-w-[1200px] mx-auto py-2">
        <PropertySearchBar isDark={isDark} compact />
      </div>
    </div>
  );
}
