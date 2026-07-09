"use client";
import { useState } from "react";
import { localize } from "@/lib/i18n";
import { useSettings } from "@/components/SettingsProvider";

export function RoomDescription({ description, sections, isDark }) {
  const { language, t } = useSettings();
  const [expanded, setExpanded] = useState(false);
  const descText = isDark ? "#a3a3a3" : "#4b5563";
  const localizedSections =
    sections?.[language.toLowerCase()] || sections?.en || [];

  return (
    <div>
      <p
        style={{ color: descText }}
        className="text-sm font-light leading-relaxed max-w-2xl"
      >
        {localize(description, language)}
      </p>

      {expanded && localizedSections.length > 0 && (
        <div className="mt-6 space-y-6 max-w-2xl">
          {localizedSections.map((sec, i) => (
            <div key={i}>
              <h4 className="font-serif text-lg font-medium tracking-wide mb-2">
                {sec.title}
              </h4>
              <p
                style={{ color: descText }}
                className="text-sm font-light leading-relaxed whitespace-pre-line"
              >
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      )}

      {localizedSections.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className={`mt-4 inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.2em] uppercase underline underline-offset-4 cursor-pointer ${
            isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
          }`}
        >
          {expanded ? t("common.readLess") : t("common.readMore")}
        </button>
      )}
    </div>
  );
}
