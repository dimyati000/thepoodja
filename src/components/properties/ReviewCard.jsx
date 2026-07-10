"use client";
import { useSettings } from "@/components/SettingsProvider";
import { localize } from "@/lib/i18n";

export function ReviewCard({ review, isDark }) {
  const { language } = useSettings();
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(1,20,52,0.1)";
  const accent = isDark ? "#FCD57B" : "#8B6B2E";

  return (
    <div
      style={{ borderColor }}
      className={`border p-6 sm:p-7 h-full flex flex-col ${
        isDark ? "bg-[#00102A]/30" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold tracking-wide">{review.name}</p>
          <p
            className={`text-[10px] tracking-[0.2em] uppercase ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
          >
            {review.origin}
          </p>
        </div>
        <span
          style={{ color: accent }}
          className="font-numbers text-xs font-bold flex items-center gap-1"
        >
          ★ {review.rating.toFixed(1)}
        </span>
      </div>
      <p
        className={`text-xs sm:text-sm font-light leading-relaxed ${
          isDark ? "text-neutral-300" : "text-neutral-600"
        }`}
      >
        {localize(review.text, language)}
      </p>
    </div>
  );
}
