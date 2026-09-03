"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PropertySearchBar } from "./PropertySearchBar";

export function StickySearchBar({
  isDark,
  triggerRef,
  onVisibilityChange,
}) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (triggerRef?.current) {
        const triggerBottom =
          triggerRef.current.getBoundingClientRect().bottom;
        const navbarClearance = window.innerWidth >= 1024 ? 96 : 72;
        setVisible(triggerBottom <= navbarClearance);
        return;
      }

      setVisible(
        window.scrollY > Math.max(320, window.innerHeight * 0.55),
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [triggerRef]);

  useEffect(() => {
    onVisibilityChange?.(visible);
  }, [visible, onVisibilityChange]);

  if (!mounted) return null;

  return createPortal(
    <div
      aria-hidden={!visible}
      className={`fixed bottom-0 left-0 right-0 z-[9990] px-3 pb-3 transition-all duration-500 ease-out sm:px-5 sm:pb-5 md:px-8 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[980px]">
        <PropertySearchBar isDark={isDark} compact popupDirection="up" />
      </div>
    </div>,
    document.body,
  );
}
