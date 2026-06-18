"use client";
import Link from "next/link";
import { useTheme } from "../components/ThemeAndLayoutProviders";
import { VILLAS_DATA } from "./data";

export default function PropertiesPage() {
  const { isDark } = useTheme();

  return (
    <main className="w-full min-h-screen select-none flex flex-col justify-between pt-32 pb-16">
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 flex-1 flex flex-col justify-center items-center text-center my-auto">
        <span
          className={`block text-[10px] font-bold tracking-[0.4em] uppercase mb-4 ${isDark ? "text-white/30" : "text-black/30"}`}
        >
          Section In Progress
        </span>
        <h1
          className="font-serif text-4xl md:text-5xl font-light tracking-wide opacity-25 max-w-2xl leading-snug mb-6"
          style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
        >
          This main layout is currently being curated by the assigned team
          member.
        </h1>
        <div
          className={`w-8 h-[1px] ${isDark ? "bg-white/20" : "bg-black/20"}`}
        />
      </section>

      {/* 2. QUICK ACCESS GATEWAY (List Villa untuk menyambung villaId) */}
      <section
        className={`w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-8 border-t ${isDark ? "border-white/5" : "border-black/5"}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span
              className={`text-[9px] font-bold tracking-[0.25em] uppercase block mb-1 ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
            >
              Development Gate
            </span>
            <p className="text-xs font-light opacity-50">
              Quick access to dynamic estate sub-portfolios ([villaId]):
            </p>
          </div>

          {/* List Teks Navigasi */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {VILLAS_DATA.map((villa) => (
              <Link
                key={villa.id}
                href={`/properties/${villa.id}`}
                className={`group text-[10px] font-bold tracking-widest uppercase relative py-1 transition-opacity duration-300 hover:opacity-100 ${
                  isDark
                    ? "text-white/70 hover:text-[#FCD57B]"
                    : "text-[#011434]/70 hover:text-[#8B6B2E]"
                }`}
              >
                {villa.name.includes(" — ")
                  ? villa.name.split(" — ")[1]
                  : villa.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1px] transition-transform duration-500 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left ${isDark ? "bg-[#FCD57B]" : "bg-[#8B6B2E]"}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
