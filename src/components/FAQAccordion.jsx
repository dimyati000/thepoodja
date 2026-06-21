"use client";
import { useState } from "react";

export function FAQAccordion({ items = [], isDark }) {
  const [openIdx, setOpenIdx] = useState(null);
  const mainText = isDark ? "#ffffff" : "#011434";
  const descText = isDark ? "#a3a3a3" : "#4b5563";
  const accentText = isDark ? "#FCD57B" : "#8B6B2E";
  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(1, 20, 52, 0.1)";

  return (
    <div className="flex flex-col gap-4">
      {items.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            style={{ borderColor }}
            className="border-b pb-4 last:border-none"
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full flex items-center justify-between text-left py-3 cursor-pointer select-none focus:outline-none bg-transparent border-none"
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant-garamond)",
                  color: isOpen ? accentText : mainText,
                }}
                className="text-base sm:text-lg font-medium tracking-wide uppercase transition-colors duration-300"
              >
                {faq.q}
              </span>
              <span
                style={{ color: accentText }}
                className="text-lg leading-none select-none transition-transform duration-300"
              >
                {isOpen ? "－" : "＋"}
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? "200px" : "0",
                transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="overflow-hidden"
            >
              <p
                style={{ color: descText }}
                className="text-xs sm:text-sm font-light leading-relaxed pt-2 pb-4 pr-6"
              >
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
