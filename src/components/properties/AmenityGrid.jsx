"use client";
import { Icon } from "@/components/Icon";
import { useSettings } from "@/components/SettingsProvider";
import { localize } from "@/lib/i18n";

export function AmenityGrid({ amenities = [], isDark, columns = 4, limit }) {
  const { language } = useSettings();
  if (!amenities.length) return null;
  const displayed = limit ? amenities.slice(0, limit) : amenities;

  const colClass =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 ${colClass} gap-x-6 gap-y-7`}>
      {displayed.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span style={{ color: isDark ? "#FCD57B" : "#8B6B2E" }}>
            <Icon name={item.icon} size={22} />
          </span>
          <span
            className={`text-xs sm:text-sm font-light tracking-wide ${isDark ? "text-neutral-200" : "text-neutral-700"}`}
          >
            {localize(item.label, language)}
          </span>
        </div>
      ))}
    </div>
  );
}
