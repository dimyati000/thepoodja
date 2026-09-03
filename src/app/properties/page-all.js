"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useTheme } from "@/components/ThemeAndLayoutProviders";
import { useSettings } from "@/components/SettingsProvider";
import { VILLAS_DATA, LOCATIONS } from "@/constants/villas";
import { SectionLabel } from "@/components/SectionLabel";
import { VillaCard } from "@/components/properties/VillaCard";
import { PropertySearchBar } from "@/components/PropertySearchBar";
import { StickySearchBar } from "@/components/StickySearchBar";
import { formatDateLabel } from "@/lib/dateUtils";

function parseDateParam(value) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

function PropertiesContent() {
  const { isDark } = useTheme();
  const {
    t,
    language,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
  } = useSettings();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const inlineSearchRef = useRef(null);

  const [stickySearchVisible, setStickySearchVisible] = useState(false);
  const [activeLocationFilter, setActiveLocationFilter] =
    useState("All Locations");
  const [activeBedroomFilter, setActiveBedroomFilter] = useState("");

  const searchParamsString = searchParams.toString();

  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);
    const locationParam = params.get("location");
    const bedroomParam = params.get("bedroom");
    const checkinParam = params.get("checkin");
    const checkoutParam = params.get("checkout");

    const matchedLocation = locationParam
      ? LOCATIONS.find(
        (location) =>
          location.toLowerCase() === locationParam.toLowerCase(),
      )
      : null;

    setActiveLocationFilter(matchedLocation || "All Locations");
    setActiveBedroomFilter(bedroomParam || "");
    setCheckIn(parseDateParam(checkinParam));
    setCheckOut(parseDateParam(checkoutParam));
  }, [searchParamsString, setCheckIn, setCheckOut]);

  const updateUrl = (nextLocation, nextBedroom, keepDates = true) => {
    const currentParams = new URLSearchParams(searchParamsString);
    const params = new URLSearchParams();

    if (nextLocation && nextLocation !== "All Locations") {
      params.set("location", nextLocation);
    }

    if (nextBedroom) {
      params.set("bedroom", nextBedroom);
    }

    if (keepDates) {
      const checkin = currentParams.get("checkin");
      const checkout = currentParams.get("checkout");

      if (checkin) params.set("checkin", checkin);
      if (checkout) params.set("checkout", checkout);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleLocationClick = (location) => {
    setActiveLocationFilter(location);
    updateUrl(location, activeBedroomFilter);
  };

  const handleClearBedroom = () => {
    setActiveBedroomFilter("");
    updateUrl(activeLocationFilter, "");
  };

  const handleClearDates = () => {
    setCheckIn(null);
    setCheckOut(null);

    const params = new URLSearchParams(searchParamsString);
    params.delete("checkin");
    params.delete("checkout");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const allVillas = useMemo(() => {
    return VILLAS_DATA.flatMap((group) =>
      (group.rooms || []).map((room) => ({
        ...room,
        groupId: group.id,
        groupName: group.name,
        groupLocation: group.location,
      })),
    );
  }, []);

  const filteredVillas = useMemo(() => {
    let result = allVillas;

    if (activeLocationFilter !== "All Locations") {
      result = result.filter(
        (villa) =>
          villa.groupLocation?.toUpperCase() ===
          activeLocationFilter.toUpperCase(),
      );
    }

    if (activeBedroomFilter) {
      result = result.filter(
        (villa) =>
          String(villa.beds) === String(activeBedroomFilter),
      );
    }

    return result;
  }, [activeLocationFilter, activeBedroomFilter, allVillas]);

  const descriptionColor = isDark
    ? "rgba(255,255,255,0.65)"
    : "rgba(1,20,52,0.7)";
  const hasDateFilter = checkIn || checkOut;

  return (
    <div
      style={{
        overflowX: "clip",
        minHeight: "100vh",
        position: "relative",
      }}
      className="pb-20 pt-28 transition-colors duration-500"
    >
      <StickySearchBar
        isDark={isDark}
        triggerRef={inlineSearchRef}
        onVisibilityChange={setStickySearchVisible}
      />

      <section className="mx-auto w-full max-w-[1380px] px-6">
        <header className="mb-10">
          <SectionLabel isDark={isDark} className="mb-2">
            {t("allVillas.collection")}
          </SectionLabel>
          <h1
            style={{
              fontFamily: "var(--font-cormorant-garamond)",
            }}
            className="mb-6 text-4xl font-semibold uppercase leading-tight tracking-wide md:text-5xl lg:text-6xl"
          >
            {t("allVillas.title")}
          </h1>
          <p
            style={{ color: descriptionColor }}
            className="max-w-2xl text-sm font-light leading-relaxed md:text-base"
          >
            {t("allVillas.desc")}
          </p>
        </header>

        {/* Inline form disappears when the fixed bottom form is active. */}
        <div
          ref={inlineSearchRef}
          aria-hidden={stickySearchVisible}
          className={`mb-10 transition-opacity duration-300 ${stickySearchVisible
              ? "invisible pointer-events-none opacity-0"
              : "visible opacity-100"
            }`}
        >
          <PropertySearchBar isDark={isDark} />
        </div>

        <div
          className={`mb-10 flex flex-col justify-between gap-6 border-b pb-6 md:flex-row md:items-end ${isDark
              ? "border-white/10"
              : "border-[#011434]/10"
            }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            {LOCATIONS.map((location) => (
              <button
                type="button"
                key={location}
                onClick={() => handleLocationClick(location)}
                className={`border px-4 py-2 font-mono text-[9px] tracking-widest transition-all duration-300 ${activeLocationFilter === location
                    ? isDark
                      ? "border-[#FCD57B] bg-[#FCD57B] font-bold text-[#011434]"
                      : "border-[#8B6B2E] bg-[#8B6B2E] font-bold text-white"
                    : isDark
                      ? "border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/30"
                      : "border-[#011434]/10 bg-white text-neutral-600 hover:border-[#011434]/40"
                  }`}
              >
                {location.toUpperCase()}
              </button>
            ))}

            {activeBedroomFilter && (
              <button
                type="button"
                onClick={handleClearBedroom}
                className={`border px-4 py-2 font-mono text-[9px] tracking-widest transition-all duration-300 ${isDark
                    ? "border-[#FCD57B]/40 text-[#FCD57B] hover:border-[#FCD57B]"
                    : "border-[#8B6B2E]/40 text-[#8B6B2E] hover:border-[#8B6B2E]"
                  }`}
              >
                {activeBedroomFilter}{" "}
                {t("common.bedroom").toUpperCase()} ✕
              </button>
            )}

            {hasDateFilter && (
              <button
                type="button"
                onClick={handleClearDates}
                className={`border px-4 py-2 font-mono text-[9px] tracking-widest transition-all duration-300 ${isDark
                    ? "border-[#FCD57B]/40 text-[#FCD57B] hover:border-[#FCD57B]"
                    : "border-[#8B6B2E]/40 text-[#8B6B2E] hover:border-[#8B6B2E]"
                  }`}
              >
                {checkIn
                  ? formatDateLabel(checkIn, language)
                  : "—"}
                {" - "}
                {checkOut
                  ? formatDateLabel(checkOut, language)
                  : "—"}{" "}
                ✕
              </button>
            )}
          </div>

          <p
            className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
          >
            {t("allVillas.showing")} {filteredVillas.length}{" "}
            {t("allVillas.villas")}
          </p>
        </div>

        {filteredVillas.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {filteredVillas.map((villa) => (
              <VillaCard
                key={`${villa.groupId}-${villa.id}`}
                villa={villa}
                groupId={villa.groupId}
                groupName={villa.groupName}
                isDark={isDark}
              />
            ))}
          </div>
        ) : (
          <div
            className={`w-full border border-dashed py-20 text-center ${isDark
                ? "border-white/10"
                : "border-[#011434]/20"
              }`}
          >
            <p className="font-serif text-base italic text-neutral-400">
              {t("allVillas.noResults")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={null}>
      <PropertiesContent />
    </Suspense>
  );
}
