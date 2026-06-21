"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../../sections/ThemeAndLayoutProviders";
import { VILLAS_DATA } from "../../../../constants/villas";

export default function RoomDetailPage() {
  const { isDark } = useTheme();
  const { villaId, roomId } = useParams();
  const router = useRouter();

  // Mengambil data villa & mencari kamar spesifik
  const villa = VILLAS_DATA.find((v) => v.id === villaId);
  const room = villa?.rooms?.find((r) => r.id === roomId);

  if (!room) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <p className="font-serif text-xl italic tracking-widest opacity-40">
          Sanctuary Portfolio Empty.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen select-none pb-32">
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-32 lg:pt-40">
        <div className="mb-12">
          <button
            onClick={() => router.back()}
            className={`group flex items-center bg-transparent border-none outline-none cursor-pointer p-0 text-[10px] font-medium tracking-[0.3em] uppercase transition-colors duration-300 ${
              isDark
                ? "text-neutral-400 hover:text-white"
                : "text-neutral-500 hover:text-[#011434]"
            }`}
          >
            <span className="relative py-1">
              Back to{" "}
              {villa.name.includes(" — ")
                ? villa.name.split(" — ")[1]
                : villa.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-[1px] transition-transform duration-500 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left ${
                  isDark ? "bg-[#FCD57B]" : "bg-[#8B6B2E]"
                }`}
              />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* SISI KIRI: Immersive Interior Showcase Landscape Frame */}
          <div className="lg:col-span-7 w-full aspect-[4/3] relative overflow-hidden bg-neutral-900 rounded-[1px] shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
            <Image
              src={room.image}
              alt={room.name}
              fill
              priority
              className="object-cover object-center brightness-[0.98] dark:brightness-[0.88]"
            />
          </div>

          {/* SISI KANAN: Ultra-Clean High Editorial Typography */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase opacity-50 block mb-3">
              {villa.name.replace(" — ", " / ")}
            </span>

            <h1
              className="text-4xl sm:text-5xl font-light tracking-wide leading-tight mb-6"
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            >
              {room.name}
            </h1>

            <div
              className={`w-12 h-[1.5px] mb-8 ${isDark ? "bg-[#FCD57B]" : "bg-[#8B6B2E]"}`}
            />

            <p
              className={`text-sm font-light leading-relaxed mb-8 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
            >
              A masterclass in interior poetry. Specifically engineered to
              capture native Balinese natural lighting, this sanctuary features
              custom handcrafted timber appointments, premium travertine tile
              finishings, and deep spatial ventilation.
            </p>

            <div
              className={`pt-6 border-t font-sans text-[9px] tracking-widest font-medium grid grid-cols-2 gap-y-3 mb-12 ${isDark ? "border-white/10 text-neutral-400" : "border-black/10 text-neutral-500"}`}
            >
              <div className="flex items-center gap-2">• KING-SIZE BEDDING</div>
              <div className="flex items-center gap-2">• MARBLE BATHTUB</div>
              <div className="flex items-center gap-2">
                • INTEGRATED SMART LIGHT
              </div>
              <div className="flex items-center gap-2">
                • PRIVATE TERRACE ACCESS
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-8 dark:border-white/10 border-black/10">
              <div>
                <span className="block text-[8px] uppercase tracking-[0.2em] text-neutral-400 mb-0.5">
                  RESERVATION FEE
                </span>
                <p
                  className={`text-xl font-medium tracking-wide ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
                >
                  {room.price}{" "}
                  <span className="text-xs font-light text-neutral-400">
                    / night
                  </span>
                </p>
              </div>

              <Link
                href={`/properties/${villaId}/${roomId}/booking`}
                className={`px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.25em] border rounded-[2px] transition-all duration-300 active:scale-95 shadow-sm ${
                  isDark
                    ? "border-white text-white hover:bg-white hover:text-[#011434]"
                    : "border-[#011434] text-[#011434] hover:bg-[#011434] hover:text-white"
                }`}
              >
                Book This Suite
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
