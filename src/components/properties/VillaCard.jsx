"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../components/ThemeAndLayoutProviders";
import { useSettings } from "../SettingsProvider";
import { localize } from "@/lib/i18n";
import { formatPrice } from "@/lib/currency";
import { Icon } from "@/components/Icon";

export function VillaCard({ villa, groupId, groupName }) {
  const { isDark } = useTheme();
  const [currentImg, setCurrentImg] = useState(0);
  const { currency, language } = useSettings();

  const accentText = isDark ? "#FCD57B" : "#8B6B2E";
  const textColor = isDark ? "text-neutral-300" : "text-neutral-600";
  const iconColor = isDark ? "text-neutral-400" : "text-neutral-500";

  const images = Array.isArray(villa.gallery) ? villa.gallery.slice(0, 4) : [];

  const nextImg = (e) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  };

  const labels = {
    night: language === "ID" ? "malam" : "night",
  };

  return (
    <Link
      href={`/properties/${groupId}/${villa.id}`}
      className={`flex flex-col justify-between overflow-hidden border transition-all duration-500 h-full ${
        isDark
          ? "bg-[#00102A]/40 border-white/10 hover:border-white/20"
          : "bg-white border-[#011434]/10 shadow-sm hover:shadow-md"
      }`}
    >
      <div className="relative w-full h-[280px] overflow-hidden bg-neutral-900 group">
        {images.length > 0 ? (
          images.map((imgUrl, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === currentImg ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${villa.name} - ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              />
            </div>
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-500 text-sm">
            No Image
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

        <div className="absolute bottom-4 left-4 z-20 text-white">
          <p className="text-xl font-serif font-semibold tracking-wide flex items-end gap-1 font-numbers drop-shadow-sm">
            {formatPrice(villa.price, currency, language)}
            <span className="text-xs font-sans font-light opacity-90 pb-0.5">
              / {labels.night}
            </span>
          </p>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60 z-20"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60 z-20"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Detail Konten Villa */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div>
            <span
              style={{ color: accentText }}
              className="text-[9px] font-bold uppercase tracking-[0.25em]"
            >
              {groupName} • BALI
            </span>
          </div>
          <h3 className="font-serif text-2xl font-light tracking-wide leading-snug">
            {villa.name}
          </h3>

          {/* Specifications Flex Wrap */}
          <div
            className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-light ${textColor}`}
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Icon name="guests" size={15} className={iconColor} />

              <p>
                <span className="font-numbers font-medium">{villa.guests}</span>{" "}
                {language === "ID" ? "Tamu" : "Guests"}
              </p>
            </div>

            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Icon name="beds" size={15} className={iconColor} />
              <p>
                <span className="font-numbers font-medium">{villa.beds}</span>{" "}
                {language === "ID" ? "Kamar" : "Bedrooms"}
              </p>
            </div>

            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Icon name="baths" size={15} className={iconColor} />
              <p>
                <span className="font-numbers font-medium">{villa.baths}</span>{" "}
                {language === "ID" ? "K. Mandi" : "Bathrooms"}
              </p>
            </div>

            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Icon name="size" size={15} className={iconColor} />
              <p>
                <span className="font-numbers font-medium">{villa.size}</span>{" "}
                m²
              </p>
            </div>
          </div>

          {/* Facilities Preview */}
          <div className="flex flex-wrap gap-x-2 gap-y-2 pt-3">
            {(villa.facilities || []).slice(0, 6).map((fac, i) => (
              <div
                key={i}
                className={`px-3 py-1.5 rounded-full border text-[11px] font-normal transition-colors duration-300 ${
                  isDark
                    ? "border-white/10 text-white/60 bg-transparent"
                    : "border-gray-300 text-gray-600 bg-transparent"
                }`}
              >
                <span className="capitalize-first">
                  {localize(fac.label, language)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
