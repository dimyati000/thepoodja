"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useTheme } from "../../sections/ThemeAndLayoutProviders";
import { VillaAccordionSlider } from "@/components/VillaAccordionSlider";
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
};

export default function VillaDetailPage() {
  const { isDark } = useTheme();
  const { villaId } = useParams();
  const router = useRouter();

  const [openAccordion, setOpenAccordion] = useState(0);
  const [activeRoomFilter, setActiveRoomFilter] = useState("ALL");

  const villa = VILLAS_DATA.find((v) => v.id === villaId);

  // Penanganan filter kamar
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
      <div
        className={`w-full min-h-screen flex items-center justify-center ${isDark ? "bg-[#011434]" : "bg-[#FBF9F6]"}`}
      >
        <p
          className={`font-serif text-lg italic tracking-widest opacity-60 ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
        >
          Portfolio Estate Empty.
        </p>
      </div>
    );
  }

  const areaData = AREA_INSIGHTS[villa.location] || AREA_INSIGHTS["Sanur"];

  return (
    <main
      className={`w-full pb-24 md:pb-40 font-sans tracking-wide antialiased transition-colors duration-500 ${
        isDark ? "bg-[#011434] text-white" : "bg-[#FBF9F6] text-[#011434]"
      }`}
    >
      {/* ── SECTION 1: HERO SPLIT-BLOCK MODERN & LUWES ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 pt-32 md:pt-40">
        {/* Tombol Back Minimalis */}
        <div className="mb-10 md:mb-14">
          <button
            onClick={() => router.back()}
            className={`group text-xs font-semibold tracking-widest uppercase flex items-center gap-2 transition-all duration-300 pb-1 border-b border-transparent ${
              isDark
                ? "text-neutral-400 hover:text-[#FCD57B] hover:border-[#FCD57B]"
                : "text-neutral-600 hover:text-[#8B6B2E] hover:border-[#8B6B2E]"
            }`}
          >
            <span className="inline-block transform transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to Portfolio
          </button>
        </div>

        {/* Grid Asimetris (Lefthanded Focus): Konten Lebih Banyak Whitespace, Gambar Proporsional */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* SISI KIRI (lg:col-span-7) — Tipografi Utama */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 pr-0 lg:pr-6">
            <div>
              <span
                className={`text-xs font-bold tracking-[0.5em] uppercase block mb-4 md:mb-5 ${
                  isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
                }`}
              >
                {villa.location} • CURATED PORTFOLIO
              </span>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide uppercase leading-[1.12]">
                {villa.name.split(" — ")[0]}
              </h1>

              <p
                className={`font-serif italic font-light text-xl sm:text-2xl mt-4 normal-case tracking-wide ${
                  isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
                }`}
              >
                An Exclusive Architectural Sanctuary
              </p>
            </div>

            {/* Deskripsi: Teks dikembalikan murni, hilangkan text-justify kaku agar alignment natural */}
            <p
              className={`text-sm sm:text-base font-light leading-relaxed max-w-2xl text-left ${
                isDark ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              Seamlessly melding raw luxury with spatial intelligence, this
              estate crafts an extraordinary living narrative tailored for
              refined sensibilities. Integrated beautifully into the pristine
              environments of {villa.location}.
            </p>
          </div>

          {/* SISI KANAN (lg:col-span-5) — Media Showcase */}
          <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
            <div
              className={`relative w-full aspect-[4/3] lg:aspect-[5/6] overflow-hidden border transition-all duration-700 shadow-sm hover:shadow-md ${
                isDark ? "border-white/10" : "border-[#011434]/10"
              }`}
            >
              <Image
                src={villa.image}
                alt={villa.name}
                fill
                priority
                sizes="(max-w: 1024px) 100vw, 40vw"
                className="object-cover object-center brightness-[0.97] transition-transform duration-[1.2s] hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: CURATED QUARTERS (Kamar & Filter) ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-28">
        <div
          className={`mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6 ${
            isDark ? "border-white/10" : "border-[#011434]/10"
          }`}
        >
          <div>
            <span
              className={`text-[9px] font-bold tracking-[0.4em] uppercase block mb-2 ${
                isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
              }`}
            >
              THE SUITE COLLECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-light font-serif tracking-tight uppercase">
              CURATED QUARTERS
            </h2>
          </div>

          {/* Tabs Filter */}
          {roomCategories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {roomCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveRoomFilter(cat)}
                  className={`text-[9px] font-mono tracking-widest px-4 py-2 border transition-all duration-300 rounded-none ${
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

        {/* Grid Kamar */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className={`group flex flex-col justify-between overflow-hidden border rounded-none transition-all duration-500 min-h-[580px] ${
                  isDark
                    ? "bg-[#00102A]/40 border-white/10 hover:border-white/20"
                    : "bg-white border-[#011434]/10 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="relative w-full h-[260px] overflow-hidden bg-neutral-900">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(max-w: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div>
                      <span
                        className={`text-xs font-semibold tracking-widest uppercase block mb-2 ${
                          isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
                        }`}
                      >
                        Exclusive Quarter
                      </span>
                      <h3 className="font-serif text-2xl font-light tracking-wide leading-snug">
                        {room.name}
                      </h3>
                    </div>

                    <div
                      className={`flex items-center gap-4 text-xs font-light tracking-wide ${
                        isDark ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Kapasitas:</span>
                        <span className="font-medium">
                          {room.guests || 2} Orang
                        </span>
                      </div>
                      <span className="opacity-30">|</span>
                      <div className="flex items-center gap-1.5">
                        <span>Luas:</span>
                        <span className="font-medium">
                          {room.size || "75 m²"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {room.tags?.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[11px] font-sans px-3 py-1 rounded-full border tracking-wide transition-colors ${
                            isDark
                              ? "border-white/10 text-neutral-300 bg-white/[0.03]"
                              : "border-[#011434]/10 text-neutral-600 bg-[#011434]/5"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`pt-5 mt-6 border-t flex items-center justify-between ${
                      isDark ? "border-white/10" : "border-[#011434]/10"
                    }`}
                  >
                    <div>
                      <span
                        className={`block text-[10px] tracking-widest uppercase mb-1 ${
                          isDark ? "text-neutral-400" : "text-neutral-500"
                        }`}
                      >
                        ESTIMATION RATE
                      </span>
                      <p className="text-xl font-serif font-normal">
                        {room.price}{" "}
                        <span
                          className={`text-xs font-sans font-light ${
                            isDark ? "text-neutral-400" : "text-neutral-500"
                          }`}
                        >
                          / night
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/properties/${villaId}/${room.id}`}
                      className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 pb-0.5 border-b border-transparent ${
                        isDark
                          ? "text-[#FCD57B] hover:text-white hover:border-white"
                          : "text-[#8B6B2E] hover:text-[#011434] hover:border-[#011434]"
                      }`}
                    >
                      EXPLORE{" "}
                      <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
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

      {/* ── SECTION 5: SPLIT REGIONAL INSIGHT BENTO ── */}
      <section
        className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-28 md:mt-40 pt-20 border-t ${
          isDark ? "border-white/10" : "border-[#011434]/10"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          <div
            className={`lg:col-span-8 p-8 sm:p-10 md:p-12 border space-y-6 rounded-none ${
              isDark
                ? "bg-[#00102A]/40 border-white/10"
                : "bg-white border-[#011434]/10 shadow-sm"
            }`}
          >
            <span
              className={`text-[10px] font-bold tracking-[0.4em] uppercase block ${
                isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
              }`}
            >
              DESTINATION INSIGHT
            </span>
            <h2 className="text-2xl sm:text-3xl font-light font-serif tracking-wide uppercase leading-tight">
              {areaData.tagline}
            </h2>
            <p
              className={`text-xs sm:text-sm font-light leading-relaxed text-justify ${
                isDark ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              {areaData.aboutText}
            </p>
          </div>

          <div
            className={`lg:col-span-4 p-8 sm:p-10 border flex flex-col justify-between rounded-none ${
              isDark
                ? "bg-[#FCD57B]/5 border-[#FCD57B]/20"
                : "bg-[#EFEBE4] border-[#011434]/10"
            }`}
          >
            <div>
              <h3
                className={`text-xs font-bold tracking-[0.3em] uppercase mb-6 ${
                  isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
                }`}
              >
                ESTATE SUMMARY
              </h3>
              <div className="space-y-4 text-xs font-light">
                <div
                  className={`flex justify-between pb-3 border-b ${
                    isDark ? "border-white/10" : "border-[#011434]/10"
                  }`}
                >
                  <span
                    className={isDark ? "text-neutral-400" : "text-neutral-500"}
                  >
                    Property Type
                  </span>
                  <span className="font-medium">Private Luxury Villa</span>
                </div>
                <div
                  className={`flex justify-between pb-3 border-b ${
                    isDark ? "border-white/10" : "border-[#011434]/10"
                  }`}
                >
                  <span
                    className={isDark ? "text-neutral-400" : "text-neutral-500"}
                  >
                    Location Corridor
                  </span>
                  <span className="font-medium">{villa.location}, Bali</span>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-8 lg:mt-0">
              <p
                className={`text-sm font-serif italic tracking-wide leading-snug ${
                  isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
                }`}
              >
                &ldquo;Invest in moments that endure through architectural
                perfection.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: OTHER DESTINATIONS ACCORDION SLIDER ── */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 mt-28 md:mt-40">
        <div
          className={`mb-12 md:mb-16 border-b pb-4 ${isDark ? "border-white/10" : "border-[#011434]/10"}`}
        >
          <span
            className={`text-[9px] font-bold tracking-[0.4em] uppercase block mb-2 ${
              isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"
            }`}
          >
            CURATED DESTINATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-light font-serif tracking-widest uppercase">
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

      {/* ── SECTION 7: FAQ ACCORDION BLOCK ── */}
      <section className="w-full max-w-[900px] mx-auto px-4 sm:px-8 mt-28 md:mt-40">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-xl font-light font-serif tracking-widest uppercase">
            CONTEXT & ENVIRONMENT
          </h2>
          <div
            className={`w-12 h-[1px] mx-auto mt-4 ${isDark ? "bg-[#FCD57B]" : "bg-[#8B6B2E]"}`}
          />
        </div>

        <div className="space-y-2">
          {areaData.whyStay.map((item, idx) => {
            const isOpen = openAccordion === idx;
            return (
              <div
                key={idx}
                className={`border transition-all duration-500 px-6 mb-4 rounded-none ${
                  isDark
                    ? "bg-[#00102A]/40 border-white/10"
                    : "bg-white border-[#011434]/10 shadow-sm"
                } ${isOpen ? (isDark ? "border-[#FCD57B]/40" : "border-[#8B6B2E]/40") : ""}`}
              >
                <button
                  onClick={() => setOpenAccordion(isOpen ? -1 : idx)}
                  className="w-full py-5 flex justify-between items-center bg-transparent border-none outline-none cursor-pointer text-left font-serif text-base tracking-wide text-inherit"
                >
                  <span className="pr-4 font-normal opacity-90">{item.q}</span>
                  <span
                    className={`text-[10px] font-mono ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
                  >
                    {isOpen ? "[ - ]" : "[ + ]"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "max-h-[200px] opacity-100 pb-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p
                    className={`text-xs sm:text-sm font-light leading-relaxed max-w-3xl border-t pt-4 ${
                      isDark
                        ? "text-neutral-400 border-white/10"
                        : "text-neutral-600 border-[#011434]/5"
                    }`}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
