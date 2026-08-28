"use client";
import { useState, useEffect } from "react";
import { PropertySearchBar } from "./PropertySearchBar";

export function StickySearchBar({ isDark, triggerRef }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = triggerRef?.current
        ? triggerRef.current.offsetTop + triggerRef.current.offsetHeight - 100
        : window.innerHeight * 0.6;
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
      className={`fixed bottom-0 left-0 right-0 z-40 px-4 md:px-12 pb-4 md:pb-6 transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <PropertySearchBar isDark={isDark} compact popupDirection="up" />
      </div>
    </div>
  );
}

