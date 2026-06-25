"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useTheme } from "../../../components/ThemeAndLayoutProviders";
import { VillaAccordionSlider } from "@/components/VillaAccordionSlider";
import { SectionLabel } from "@/components/SectionLabel";
import { RoomCard } from "@/components/properties/RoomCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { VILLAS_DATA } from "@/constants/villas";

const AREA_INSIGHTS = {
  Sanur: {
    tagline: "SANUR, BALI — A CALM COASTAL SANCTUARY FOR FAMILIES",
    aboutText:
      "Sanur crafts an exceptional balance of cultural timelessness and gentle coastal charm. Renowned for its pristine sunrise lagoons, shallow coral waters, and a relaxed shoreline path, this historic enclave offers an elite rhythm of living tailored for families and individuals pursuing profound peace away from the island's high-traffic corridors.",
    whyStay: [
      {
        q: "What makes Sanur ideal for long-term residencies?",
        a: "Sanur features paved beachfront boardwalks, top-tier international schools, medical centers, and sophisticated boutique dining.",
      },
      {
        q: "How far is the beach from the premium villas?",
        a: "Most premium estates in our Sanur portfolio sit directly on the beachfront or within a secure 3 to 7-minute walking corridor.",
      },
    ],
  },
  Ubud: {
    tagline: "UBUD, BALI — A TRANQUIL RETREAT AMONG THE RICE TERRACES",
    aboutText:
      "Ubud unfolds across river gorges and emerald rice terraces, holding fast to its identity as Bali's cultural and spiritual heart. Our portfolio here favors privacy and stillness — estates positioned along ridgelines and riverbanks, built for guests seeking immersion over itinerary.",
    whyStay: [
      {
        q: "What makes Ubud different from coastal Bali?",
        a: "Ubud trades beach access for jungle privacy, wellness culture, and proximity to art villages, temples, and rice terrace walks.",
      },
      {
        q: "Is Ubud suitable for a quieter, longer stay?",
        a: "Yes — our Ubud estates are favored by guests booking extended stays for the stillness and elevated air away from the coast.",
      },
    ],
  },
};

export default function VillaDetailPage() {
  const { isDark } = useTheme();
  const { villaId } = useParams();

  const [activeRoomFilter, setActiveRoomFilter] = useState("ALL");

  const villa = VILLAS_DATA.find((v) => v.id === villaId);

  const { roomCategories, filteredRooms } = useMemo(() => {
    if (!villa || !villa.rooms)
      return { roomCategories: ["ALL"], filteredRooms: [] };

    const categories = ["ALL"];
    villa.rooms.forEach((room) => {
      const name = room.name.toUpperCase();
      if (name.includes("SUITE") && !categories.includes("SUITES"))
        categories.push("SUITES");
      else if (name.includes("MASTER") && !categories.includes("MASTER"))
        categories.push("MASTER");
      else if (
        (name.includes("PAVILION") || name.includes("CABANA")) &&
        !categories.includes("PAVILIONS")
      )
        categories.push("PAVILIONS");
    });

    const filtered =
      activeRoomFilter === "ALL"
        ? villa.rooms
        : villa.rooms.filter((room) =>
            room.name
              .toUpperCase()
              .includes(
                activeRoomFilter
                  .replace("SUITES", "SUITE")
                  .replace("PAVILIONS", "PAVILION"),
              ),
          );

    return { roomCategories: categories, filteredRooms: filtered };
  }, [villa, activeRoomFilter]);

  if (!villa) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p
          className={`font-serif text-lg italic tracking-widest opacity-60 ${
            isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
          }`}
        >
          Portfolio Estate Empty.
        </p>
      </div>
    );
  }

  const areaData = AREA_INSIGHTS[villa.location] || AREA_INSIGHTS["Sanur"];
  const mainText = isDark ? "#ffffff" : "#011434";
  const descText = isDark ? "#a3a3a3" : "#4b5563";
  const accentText = isDark ? "#FCD57B" : "#8B6B2E";
  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(1, 20, 52, 0.1)";

  return (
    <main className="w-full font-sans tracking-wide antialiased">
      {/* ── SECTION 1: HERO COMBINED BENTO ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 pt-24 md:pt-32 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 pr-0 lg:pr-6 flex flex-col h-full">
            <div>
              <SectionLabel
                isDark={isDark}
                className="tracking-[0.45em] mb-4 md:mb-5"
              >
                {villa.location} • CURATED PORTFOLIO
              </SectionLabel>
              <h1
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide uppercase leading-[1.12]"
              >
                {villa.name.split(" — ")[0]}
              </h1>
              <p
                style={{ color: accentText }}
                className="font-serif italic font-light text-xl sm:text-2xl mt-4 normal-case tracking-wide"
              >
                An Exclusive Architectural Sanctuary
              </p>
            </div>

            <p
              style={{ color: descText }}
              className="text-sm sm:text-base font-light leading-relaxed max-w-2xl text-left mt-6 md:mt-8"
            >
              Seamlessly melding raw luxury with spatial intelligence, this
              estate crafts an extraordinary living narrative tailored for
              refined sensibilities. Integrated beautifully into the pristine
              environments of {villa.location}.
            </p>

            {/* Stat Strip — fills the column with scannable facts instead of empty air */}
            <div
              className={`grid grid-cols-3 gap-4 sm:gap-6 mt-10 md:mt-12 pt-8 border-t ${
                isDark ? "border-white/10" : "border-[#011434]/10"
              }`}
            >
              {[
                { label: "Bedrooms", value: villa.beds },
                { label: "Bathrooms", value: villa.baths },
                { label: "Estate Size", value: villa.size },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                    className="text-3xl sm:text-4xl font-light leading-none"
                  >
                    {stat.value}
                  </p>
                  <p
                    className={`text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase mt-2 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Feature tags — gives the column a natural bottom edge that lines up with the image */}
            {villa.features?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 md:mt-auto md:pt-8">
                {villa.features.map((feature, i) => (
                  <span
                    key={i}
                    className={`text-[11px] font-sans px-3.5 py-2 border tracking-wide ${
                      isDark
                        ? "border-white/10 text-neutral-300 bg-white/[0.03]"
                        : "border-[#011434]/10 text-neutral-600 bg-[#011434]/[0.03]"
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 w-full">
            <div
              className={`relative w-full aspect-[4/3] lg:aspect-[4/5] overflow-hidden border transition-all duration-700 ${
                isDark ? "border-white/10" : "border-[#011434]/10"
              }`}
            >
              <Image
                src={villa.image}
                alt={villa.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center brightness-[0.97] transition-transform duration-[1.2s] hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Bento Box Bawah Gambar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch pt-6">
          <div
            className={`lg:col-span-8 p-8 sm:p-10 md:p-12 border space-y-6 ${
              isDark
                ? "bg-[#00102A]/40 border-white/10"
                : "bg-[#fcfcfc] border-[#011434]/10 shadow-sm"
            }`}
          >
            <SectionLabel isDark={isDark}>DESTINATION INSIGHT</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-medium font-serif tracking-wide uppercase leading-tight">
              {areaData.tagline}
            </h2>
            <p
              style={{ color: descText }}
              className="text-xs sm:text-sm font-light leading-relaxed text-justify"
            >
              {areaData.aboutText}
            </p>
          </div>

          <div
            className={`lg:col-span-4 p-8 sm:p-10 border flex flex-col justify-between ${
              isDark
                ? "bg-[#FCD57B]/5 border-[#FCD57B]/20"
                : "bg-[#f4f1eb] border-[#011434]/10"
            }`}
          >
            <div>
              <h3
                style={{ color: accentText }}
                className="text-xs font-bold tracking-[0.3em] uppercase mb-6"
              >
                ESTATE SUMMARY
              </h3>
              <div className="space-y-4 text-xs font-light">
                <div
                  className={`flex justify-between pb-3 border-b ${isDark ? "border-white/10" : "border-[#011434]/10"}`}
                >
                  <span
                    className={isDark ? "text-neutral-400" : "text-neutral-500"}
                  >
                    Check-in / Check-out
                  </span>
                  <span className="font-medium">14:00 / 12:00</span>
                </div>
                <div
                  className={`flex justify-between pb-3 border-b ${isDark ? "border-white/10" : "border-[#011434]/10"}`}
                >
                  <span
                    className={isDark ? "text-neutral-400" : "text-neutral-500"}
                  >
                    Staff
                  </span>
                  <span className="font-medium">Fully Staffed</span>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-8 lg:mt-0">
              <p
                style={{ color: accentText }}
                className="text-sm font-serif italic tracking-wide leading-snug"
              >
                &ldquo;Invest in moments that endure through architectural
                perfection.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: CURATED QUARTERS ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-28">
        <div
          className={`mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6 ${
            isDark ? "border-white/10" : "border-[#011434]/10"
          }`}
        >
          <div>
            <SectionLabel isDark={isDark} className="mb-2">
              THE SUITE COLLECTION
            </SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-semibold font-serif tracking-tight uppercase">
              CURATED QUARTERS
            </h2>
          </div>

          {roomCategories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {roomCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveRoomFilter(cat)}
                  className={`text-[9px] font-mono tracking-widest px-4 py-2 border transition-all duration-300 ${
                    activeRoomFilter === cat
                      ? isDark
                        ? "bg-[#FCD57B] text-[#011434] border-[#FCD57B] font-bold"
                        : "bg-[#8B6B2E] text-white border-[#8B6B2E] font-bold"
                      : isDark
                        ? "text-neutral-400 border-white/10 bg-white/[0.02] hover:border-white/30"
                        : "text-neutral-600 border-[#011434]/10 bg-white hover:border-[#011434]/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                villaId={villaId}
                isDark={isDark}
              />
            ))}
          </div>
        ) : (
          <div
            className={`w-full py-20 text-center border border-dashed ${
              isDark ? "border-white/10" : "border-[#011434]/20"
            }`}
          >
            <p className="font-serif text-base italic text-neutral-400">
              No suites found matching this criteria.
            </p>
          </div>
        )}
      </section>

      {/* ── SECTION 3: OTHER DESTINATIONS ACCORDION SLIDER ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-28 md:mt-40">
        <div
          className={`mb-12 md:mb-16 border-b pb-4 ${isDark ? "border-white/10" : "border-[#011434]/10"}`}
        >
          <SectionLabel isDark={isDark} className="mb-2">
            CURATED DESTINATIONS
          </SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-semibold font-serif tracking-widest uppercase">
            EXPLORE OTHER LOCATIONS
          </h2>
        </div>

        <VillaAccordionSlider
          data={VILLAS_DATA}
          excludeId={villaId}
          isDark={isDark}
          hideHeader={true}
          minimal={true}
        />
      </section>

      {/* ── SECTION 4: FAQ SECTION ── */}
      <section className="max-w-[840px] mx-auto px-6 py-10 md:py-24 mt-12">
        <div className="text-center mb-10">
          <p
            style={{ color: accentText }}
            className="text-xs font-bold uppercase tracking-[0.45em] mb-4"
          >
            Faq
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant-garamond)",
              color: mainText,
            }}
            className="text-3xl md:text-4xl font-semibold tracking-widest leading-none uppercase"
          >
            Why Stay In {villa.location}?
          </h2>
          <div
            style={{ backgroundColor: accentText }}
            className="w-10 h-[1px] mx-auto mt-6 opacity-60"
          />
        </div>

        <FAQAccordion items={areaData.whyStay} isDark={isDark} />
      </section>
    </main>
  );
}
