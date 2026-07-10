"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeAndLayoutProviders";
import { VILLAS_DATA, LOCATIONS } from "@/constants/villas";
import { SectionLabel } from "@/components/SectionLabel";
import { VillaCard } from "@/components/properties/VillaCard";

function AllVillasContent() {
  const { isDark } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeLocationFilter, setActiveLocationFilter] =
    useState("All Locations");
  const [activeBedroomFilter, setActiveBedroomFilter] = useState("");

  const searchParamsString = searchParams.toString();
  const [prevParamsString, setPrevParamsString] = useState(null);

  if (searchParamsString !== prevParamsString) {
    setPrevParamsString(searchParamsString);

    const locationParam = searchParams.get("location");
    const bedroomParam = searchParams.get("bedroom");
    const matched = locationParam
      ? LOCATIONS.find(
          (loc) => loc.toLowerCase() === locationParam.toLowerCase(),
        )
      : null;

    setActiveLocationFilter(matched || "All Locations");
    setActiveBedroomFilter(bedroomParam || "");
  }

  const updateUrl = (nextLocation, nextBedroom) => {
    const params = new URLSearchParams();
    if (nextLocation && nextLocation !== "All Locations") {
      params.set("location", nextLocation);
    }
    if (nextBedroom) {
      params.set("bedroom", nextBedroom);
    }
    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    setPrevParamsString(query);
    router.replace(nextUrl, { scroll: false });
  };

  const handleLocationClick = (cat) => {
    setActiveLocationFilter(cat);
    updateUrl(cat, activeBedroomFilter);
  };

  const handleClearBedroom = () => {
    setActiveBedroomFilter("");
    updateUrl(activeLocationFilter, "");
  };

  const allVillas = useMemo(() => {
    const flatList = [];
    VILLAS_DATA.forEach((group) => {
      if (group.rooms) {
        group.rooms.forEach((room) => {
          flatList.push({
            ...room,
            groupId: group.id,
            groupName: group.name,
            groupLocation: group.location,
          });
        });
      }
    });
    return flatList;
  }, []);

  const filteredVillas = useMemo(() => {
    let result = allVillas;
    if (activeLocationFilter !== "All Locations") {
      result = result.filter(
        (v) =>
          v.groupLocation?.toUpperCase() === activeLocationFilter.toUpperCase(),
      );
    }
    if (activeBedroomFilter) {
      result = result.filter(
        (v) => String(v.beds) === String(activeBedroomFilter),
      );
    }
    return result;
  }, [activeLocationFilter, activeBedroomFilter, allVillas]);

  const descText = isDark ? "rgba(255,255,255,0.65)" : "rgba(1,20,52,0.7)";

  return (
    <div
      style={{ overflowX: "clip", minHeight: "100vh", position: "relative" }}
      className="transition-colors duration-500 pt-28 pb-20"
    >
      <section className="w-full max-w-[1380px] mx-auto px-6">
        <div className="mb-12">
          <SectionLabel isDark={isDark} className="mb-2">
            COMPLETE COLLECTION
          </SectionLabel>
          <h1
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-wide leading-tight uppercase"
          >
            All Villas
          </h1>
          <p
            style={{ color: descText }}
            className="text-sm md:text-base font-light leading-relaxed max-w-2xl mb-8"
          >
            Browse our complete portfolio of luxury villas. Use the filters
            below to find the perfect location for your next Balinese retreat.
          </p>
        </div>

        <div
          className={`mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6 ${isDark ? "border-white/10" : "border-[#011434]/10"}`}
        >
          <div className="flex flex-wrap gap-2 items-center">
            {LOCATIONS.map((cat) => (
              <button
                key={cat}
                onClick={() => handleLocationClick(cat)}
                className={`text-[9px] font-mono tracking-widest px-4 py-2 border transition-all duration-300 ${
                  activeLocationFilter === cat
                    ? isDark
                      ? "bg-[#FCD57B] text-[#011434] border-[#FCD57B] font-bold"
                      : "bg-[#8B6B2E] text-white border-[#8B6B2E] font-bold"
                    : isDark
                      ? "text-neutral-400 border-white/10 bg-white/[0.02] hover:border-white/30"
                      : "text-neutral-600 border-[#011434]/10 bg-white hover:border-[#011434]/40"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}

            {activeBedroomFilter && (
              <button
                onClick={handleClearBedroom}
                className={`text-[9px] font-mono tracking-widest px-4 py-2 border transition-all duration-300 ${isDark ? "text-[#FCD57B] border-[#FCD57B]/40 hover:border-[#FCD57B]" : "text-[#8B6B2E] border-[#8B6B2E]/40 hover:border-[#8B6B2E]"}`}
              >
                {activeBedroomFilter} BEDROOM ✕
              </button>
            )}
          </div>
          <div
            className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            Showing {filteredVillas.length} Villas
          </div>
        </div>

        {filteredVillas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
            className={`w-full py-20 text-center border border-dashed ${isDark ? "border-white/10" : "border-[#011434]/20"}`}
          >
            <p className="font-serif text-base italic text-neutral-400">
              No villas found matching this criteria.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function AllVillasPage() {
  return (
    <Suspense fallback={null}>
      <AllVillasContent />
    </Suspense>
  );
}
