"use client";
import Image from "next/image";
import { useSettings } from "@/components/SettingsProvider";
import { localize } from "@/lib/i18n";

export function ReviewCard({ review, isDark }) {
  const { language } = useSettings();
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(1,20,52,0.1)";
  const accent = isDark ? "#FCD57B" : "#8B6B2E";
  const initials = review.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{ borderColor }}
      className={`border p-6 sm:p-7 h-full flex flex-col ${
        isDark ? "bg-[#00102A]/30" : "bg-white"
      }`}
    >
      <div
        style={{ borderColor }}
        className="flex items-center justify-between gap-4 pb-4 mb-4 border-b"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`relative w-11 h-11 shrink-0 overflow-hidden rounded-full ${
              isDark ? "bg-white/10" : "bg-[#011434]/10"
            }`}
          >
            {review.avatar ? (
              <Image
                src={review.avatar}
                alt={review.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <span
                style={{ color: accent }}
                className="absolute inset-0 flex items-center justify-center text-xs font-semibold"
              >
                {initials}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-wide truncate">
              {review.name}
            </p>
            <p
              className={`text-[10px] tracking-[0.2em] uppercase truncate ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
            >
              {review.origin}
            </p>
          </div>
        </div>
        <span
          style={{ color: accent }}
          className="font-numbers text-xs font-bold flex items-center gap-1 shrink-0"
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
