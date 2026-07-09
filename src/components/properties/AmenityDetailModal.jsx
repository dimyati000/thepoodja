"use client";
import { useEffect } from "react";
import { Icon } from "@/components/Icon";
import { useSettings } from "@/components/SettingsProvider";
import { localize } from "@/lib/i18n";

export function AmenityDetailModal({ isOpen, onClose, details, isDark }) {
  const { t, language } = useSettings();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(1,20,52,0.08)";
  const accent = isDark ? "#FCD57B" : "#8B6B2E";
  const cardBg = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  const renderItem = (item, i) => (
    <div
      key={i}
      className={`flex items-start gap-3 p-3.5 rounded-sm ${cardBg}`}
    >
      <span
        style={{
          color: accent,
          backgroundColor: isDark
            ? "rgba(252,213,123,0.1)"
            : "rgba(139,107,46,0.08)",
        }}
        className="mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
      >
        <Icon name={item.icon} size={16} />
      </span>
      <div className="min-w-0">
        <p
          className={`text-sm font-medium leading-snug ${isDark ? "text-neutral-100" : "text-neutral-800"}`}
        >
          {localize(item.label, language)}
        </p>
        {item.note && (
          <p
            className={`text-xs font-light mt-0.5 leading-relaxed ${isDark ? "text-neutral-500" : "text-neutral-500"}`}
          >
            {localize(item.note, language)}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-10 animate-[fadeIn_0.2s_ease-out]"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: isDark ? "#010e22" : "#ffffff" }}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-md shadow-2xl animate-[slideUp_0.25s_ease-out]"
      >
        <div
          style={{
            borderColor,
            backgroundColor: isDark ? "#010e22" : "#ffffff",
          }}
          className="sticky top-0 flex items-center justify-between px-6 sm:px-8 py-5 border-b z-10"
        >
          <h3
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className="text-xl sm:text-2xl font-light tracking-wide uppercase"
          >
            {t("amenityModal.title")}
          </h3>
          <button
            onClick={onClose}
            aria-label={t("amenityModal.close")}
            className={`w-9 h-9 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer transition-colors duration-200 ${isDark ? "text-white/70 hover:text-white hover:bg-white/10" : "text-neutral-500 hover:text-black hover:bg-black/5"}`}
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="px-6 sm:px-8 py-7 space-y-9">
          {details.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-3 mb-4">
                <h4
                  style={{ color: accent }}
                  className="text-[11px] font-bold tracking-[0.25em] uppercase whitespace-nowrap"
                >
                  {localize(section.category, language)}
                </h4>
                <span
                  className="h-px flex-1"
                  style={{ backgroundColor: borderColor }}
                />
              </div>

              {section.items && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {section.items.map(renderItem)}
                </div>
              )}

              {section.subgroups && (
                <div className="space-y-6">
                  {section.subgroups.map((sub, sIdx) => (
                    <div key={sIdx}>
                      <p
                        className={`text-xs font-semibold uppercase tracking-widest mb-2.5 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                      >
                        {localize(sub.title, language)}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {sub.items.map(renderItem)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
