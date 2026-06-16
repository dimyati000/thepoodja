"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollReveal, revealStyle } from "@/hooks/useScrollReveal";

const BG_IMG =
  "https://images.unsplash.com/photo-1721222204632-bf9abe6f023f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

const deals = [
  { label: "Early Bird Rates", icon: "✦" },
  { label: "Long Stay Packages", icon: "✦" },
  { label: "Seasonal Specials", icon: "✦" },
];

export function ExclusiveDeals({ isDark = true }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { ref, inView } = useScrollReveal(0.1);

  const tagColor = isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]";
  const headingColor = isDark ? "text-white" : "text-[#011434]";
  const dividerBg = isDark ? "bg-[#FCD57B]/30" : "bg-[#8B6B2E]/30";
  const descColor = isDark ? "text-white/70" : "text-[#011434]/65";
  const inputBg = isDark ? "bg-white/[0.03]" : "bg-[#011434]/[0.02]";
  const inputBorder = isDark ? "border-white/10" : "border-[#011434]/15";
  const inputTextColor = isDark ? "text-white" : "text-[#011434]";
  const placeholderClass = isDark
    ? "placeholder:text-white/50"
    : "placeholder:text-[#011434]/35";

  const buttonBg = isDark ? "bg-[#FCD57B]" : "bg-[#8B6B2E]";
  const buttonTextColor = isDark ? "text-[#011434]" : "text-white";
  const categoryTextColor = isDark ? "text-white/60" : "text-[#011434]/50";

  return (
    <section
      id="exclusive-deals"
      className="relative overflow-hidden w-full select-none"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BG_IMG}
          alt="Exclusive Deals Background"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(1,20,52,0.98) 0%, rgba(1,20,52,0.88) 60%, rgba(1,20,52,0.80) 100%)"
              : "linear-gradient(135deg, rgba(247,244,239,0.99) 0%, rgba(247,244,239,0.92) 60%, rgba(247,244,239,0.85) 100%)",
          }}
        />
      </div>

      {/* Content Container */}
      <div
        ref={ref}
        style={{
          maxWidth: "680px",
          ...revealStyle(inView),
        }}
        className="relative z-10 mx-auto text-center px-6 pt-10 pb-10 md:pt-16 md:pb-16 transition-all duration-500"
      >
        {/* Tag */}
        <p
          className={`${tagColor} text-xs md:text-sm font-bold uppercase mb-4 transition-colors duration-500 tracking-[0.4em]`}
        >
          Members Only
        </p>

        {/* Heading */}
        <h2
          className={`font-serif ${headingColor} text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-1 transition-colors duration-500 tracking-[0.04em]`}
        >
          Get Exclusive
        </h2>
        <h2
          className={`font-serif ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"} text-3xl md:text-4xl lg:text-5xl font-semibold italic leading-none mb-5 transition-colors duration-500 tracking-[0.04em]`}
        >
          Deals
        </h2>

        {/* Divider */}
        <div
          className={`w-10 h-px mx-auto mb-6 transition-colors duration-500 ${dividerBg}`}
        />

        {/* Description */}
        <p
          className={`${descColor} text-sm md:text-base font-light leading-relaxed tracking-wide max-w-md mx-auto mb-10 transition-colors duration-500`}
        >
          Be the first to discover our limited-time offers, early bird rates,
          and seasonal packages — curated exclusively for our members.
        </p>

        {/* Email Form */}
        <div className="max-w-[460px] mx-auto md:mb-12">
          {submitted ? (
            <div
              style={{
                animation: "fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
              className="w-full p-6 md:p-8 border border-[#FCD57B]/20 rounded-sm bg-white/[0.01] backdrop-blur-sm"
            >
              <p className="font-serif text-[#FCD57B] text-lg md:text-xl font-normal mb-1">
                You&apos;re on the list.
              </p>
              <p
                className={`${categoryTextColor} text-[10px] md:text-xs tracking-wide`}
              >
                Exclusive offers will arrive in your inbox shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubmitted(true);
              }}
              className={`flex flex-col sm:flex-row w-full gap-2 sm:gap-0 sm:border rounded-sm transition-all duration-500 ${inputBorder} sm:${inputBg} overflow-hidden`}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`bg-transparent outline-none px-4 py-3.5 text-xs md:text-sm font-light w-full border sm:border-none rounded-sm sm:rounded-none transition-colors duration-500 ${inputBorder} ${inputBg} ${inputTextColor} ${placeholderClass}`}
              />
              <button
                type="submit"
                className={`text-xs font-bold uppercase px-6 py-3.5 whitespace-nowrap cursor-pointer rounded-sm sm:rounded-none transition-all duration-300 hover:brightness-95 active:scale-[0.99] flex-shrink-0 tracking-[0.2em] ${buttonBg} ${buttonTextColor}`}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Deal Categories */}
        <div
          className={`flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-0 border-t ${isDark ? "border-white/5" : "border-[#011434]/5"} pt-8`}
        >
          {deals.map((d, i) => (
            <div
              key={d.label}
              className={`w-full sm:w-1/3 text-center px-2 py-1 sm:py-0 sm:border-r last:border-r-0 ${
                isDark ? "sm:border-white/10" : "sm:border-[#011434]/10"
              }`}
            >
              <p
                className={`${tagColor} text-xs font-bold mb-1 opacity-60 hidden sm:block`}
              >
                {d.icon}
              </p>
              <p
                className={`${categoryTextColor} text-[10px] md:text-xs uppercase font-semibold transition-colors duration-500 tracking-[0.15em]`}
              >
                <span className={`${tagColor} mr-1.5 sm:hidden`}>✦</span>
                {d.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.99); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
