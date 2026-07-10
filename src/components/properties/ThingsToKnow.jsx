"use client";
import { useSettings } from "@/components/SettingsProvider";

export function ThingsToKnow({ rules, isDark }) {
  const { t, language } = useSettings();
  if (!rules) return null;

  const lang = language.toLowerCase();
  const villaRules = rules.villaRules?.[lang] || rules.villaRules?.en || [];
  const safety = rules.safety?.[lang] || rules.safety?.en || [];
  const cancellation =
    rules.cancellation?.[lang] || rules.cancellation?.en || [];

  const accent = isDark ? "#FCD57B" : "#8B6B2E";

  const columns = [
    { title: t("thingsToKnow.villaRules"), items: villaRules },
    { title: t("thingsToKnow.safetyProperty"), items: safety },
    { title: t("thingsToKnow.cancellationPolicy"), items: cancellation },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
      {columns.map((col) => (
        <div key={col.title}>
          <h4
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className="text-base font-semibold tracking-wide uppercase mb-4"
          >
            {col.title}
          </h4>
          <ul className="space-y-2.5 mb-4">
            {col.items.map((item, i) => (
              <li
                key={i}
                className={`text-xs font-light leading-relaxed flex gap-2.5 ${
                  isDark ? "text-neutral-300" : "text-neutral-600"
                }`}
              >
                <span style={{ color: accent }} className="mt-[2px]">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
