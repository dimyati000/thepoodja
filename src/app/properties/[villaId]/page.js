"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../components/ThemeAndLayoutProviders";
import { VILLAS_DATA } from "../data";

export default function VillaDetailPage() {
  const { isDark } = useTheme();
  const { villaId } = useParams();
  const router = useRouter();

  const villa = VILLAS_DATA.find((v) => v.id === villaId);

  if (!villa) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <p className="font-serif text-xl italic tracking-widest opacity-40">
          Portfolio Estate Empty.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen select-none pb-32">
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-32 lg:pt-40">
        <div className="mb-12">
          <button
            onClick={() => router.push("/properties")}
            className={`group flex items-center bg-transparent border-none outline-none cursor-pointer p-0 text-[10px] font-medium tracking-[0.3em] uppercase transition-colors duration-300 ${
              isDark
                ? "text-neutral-400 hover:text-white"
                : "text-neutral-500 hover:text-[#011434]"
            }`}
          >
            <span className="relative py-1">
              Back to Properties
              <span
                className={`absolute bottom-0 left-0 w-full h-[1px] transition-transform duration-500 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left ${isDark ? "bg-[#FCD57B]" : "bg-[#8B6B2E]"}`}
              />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1 lg:sticky lg:top-36">
            <span
              className={`block text-[10px] font-bold tracking-[0.4em] uppercase mb-4 ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
            >
              {villa.location} • BALI RESIDENCE
            </span>
            <h1
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-wide leading-[1.05] mb-8"
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            >
              {villa.name.includes(" — ") ? (
                <>
                  {villa.name.split(" — ")[0]}
                  <span className="block italic font-extralight opacity-80 mt-1">
                    {villa.name.split(" — ")[1]}
                  </span>
                </>
              ) : (
                villa.name
              )}
            </h1>

            <p
              className={`text-sm font-light leading-relaxed max-w-md mb-12 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
            >
              An architectural masterpiece framed by Bali&apos;s natural poetry.
              Seamlessly melding raw luxury with spatial intelligence, this
              sanctuary crafts an extraordinary living narrative tailored for
              refined sensibilities.
            </p>

            <div
              className={`grid grid-cols-3 gap-4 border-t py-6 font-sans text-[10px] tracking-[0.25em] ${isDark ? "border-white/10 text-neutral-400" : "border-black/10 text-neutral-500"}`}
            >
              <div>
                <span
                  className={`block text-sm font-light font-serif mb-1 ${isDark ? "text-white" : "text-[#011434]"}`}
                >
                  {villa.beds}
                </span>{" "}
                BEDS
              </div>
              <div className="border-x border-neutral-500/10 px-4">
                <span
                  className={`block text-sm font-light font-serif mb-1 ${isDark ? "text-white" : "text-[#011434]"}`}
                >
                  {villa.baths}
                </span>{" "}
                BATHS
              </div>
              <div className="pl-4">
                <span
                  className={`block text-sm font-light font-serif mb-1 ${isDark ? "text-white" : "text-[#011434]"}`}
                >
                  {villa.size}
                </span>{" "}
                SPACE
              </div>
            </div>
          </div>

          {/* SISI KANAN: Cinematic Asymmetrical Frame */}
          <div className="lg:col-span-7 order-1 lg:order-2 w-full aspect-[16/11] relative overflow-hidden bg-neutral-900 rounded-[2px] shadow-[0_30px_70px_rgba(0,0,0,0.06)]">
            <Image
              src={villa.image}
              alt={villa.name}
              fill
              priority
              className="object-cover object-center brightness-[0.98] dark:brightness-[0.85] scale-100 hover:scale-[1.03] transition-transform duration-[1500ms] ease-out"
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 mt-36 lg:mt-48">
        <div
          className={`pb-6 mb-16 border-b flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${isDark ? "border-white/10" : "border-black/10"}`}
        >
          <div>
            <span className="text-[9px] font-bold tracking-[0.3em] text-neutral-400 uppercase block mb-2">
              THE SUITE COLLECTION
            </span>
            <h2
              className="text-3xl font-light font-serif tracking-wide"
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            >
              Curated Private Rooms
            </h2>
          </div>
          <span className="text-[10px] tracking-widest font-light opacity-50 font-mono">
            PORTFOLIO COUNT:{" "}
            {villa.rooms?.length?.toString().padStart(2, "0") || "00"}
          </span>
        </div>

        {/* Curated Room Architectural Grid */}
        {villa.rooms && villa.rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {villa.rooms.map((room) => (
              <div
                key={room.id}
                className="group relative w-full flex flex-col justify-between"
              >
                {/* Image Showcase Frame */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[1px] bg-neutral-800 shadow-sm">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center grayscale-[20%] group-hover:grayscale-0 brightness-[0.95] dark:brightness-[0.85] transition-all duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Content Details */}
                <div className="pt-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span
                      className={`text-[8px] font-bold tracking-[0.3em] uppercase block mb-2 ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
                    >
                      EXCLUSIVE SANCTUARY
                    </span>
                    <h3
                      className={`text-2xl font-light tracking-wide mb-6 leading-snug transition-colors duration-300 ${
                        isDark
                          ? "text-white group-hover:text-[#FCD57B]"
                          : "text-[#011434] group-hover:text-[#8B6B2E]"
                      }`}
                      style={{
                        fontFamily: "var(--font-cormorant-garamond), serif",
                      }}
                    >
                      {room.name}
                    </h3>
                  </div>

                  {/* Pricing Info & Premium Trigger Link */}
                  <div
                    className={`flex items-center justify-between pt-4 border-t ${isDark ? "border-white/5" : "border-black/5"}`}
                  >
                    <div>
                      <span className="block text-[8px] uppercase tracking-[0.25em] text-neutral-400 mb-0.5">
                        ESTIMATED RATE
                      </span>
                      <p className="text-sm font-medium tracking-wide">
                        {room.price}{" "}
                        <span className="text-[10px] font-light opacity-50">
                          / night
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/properties/${villaId}/${room.id}`}
                      className={`text-[9px] font-bold uppercase tracking-[0.25em] relative py-1 transition-opacity duration-300 hover:opacity-80 ${
                        isDark ? "text-white" : "text-[#011434]"
                      }`}
                    >
                      VIEW DESIGN
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[1px] ${isDark ? "bg-white" : "bg-[#011434]"}`}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-24 text-center">
            <p
              className="font-serif text-xl italic text-neutral-400 font-light"
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            >
              No luxury suites registered under this estate yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
