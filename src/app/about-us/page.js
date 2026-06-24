"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeAndLayoutProviders";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { VILLAS_DATA } from "@/constants/villas";

const features = [
    {
        id: 1,
        num: "01",
        title: "OUTSTANDING SELECTION OF VILLAS",
        subtitle: "Handpicked premium properties",
        desc: "Every property in our portfolio is personally handpicked, inspected, and verified by our team of luxury hospitality experts to ensure it meets the highest standards.",
        img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
        id: 2,
        num: "02",
        title: "BEST RATES GUARANTEED",
        subtitle: "Unmatched value, directly managed",
        desc: "By managing our properties directly, we guarantee the best available rates. If you find a lower price for the same villa and dates, we will match it.",
        img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
        id: 3,
        num: "03",
        title: "PROFESSIONAL SERVICE",
        subtitle: "Dedicated on-site hospitality",
        desc: "From daily housekeeping to private chefs and butler service, our professional team is committed to delivering intuitive and seamless hospitality.",
        img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
        id: 4,
        num: "04",
        title: "CUSTOMIZED EXPERIENCES",
        subtitle: "Tailored to your desires",
        desc: "Whether organizing a private yacht excursion, in-villa spa therapies, or custom cultural day tours, our concierge shapes the perfect itinerary for you.",
        img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
        id: 5,
        num: "05",
        title: "TRUSTED LOCAL EXPERTS",
        subtitle: "Deep roots in Indonesian hospitality",
        desc: "With years of local operations in Bali, we understand the island's nuances and offer authentic local recommendations for dining, leisure, and activities.",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
        id: 6,
        num: "06",
        title: "UNIQUE HOLIDAY BENEFITS",
        subtitle: "Exclusive rewards for direct guests",
        desc: "Enjoy exclusive benefits when booking directly with Poodja, including complimentary airport transfers, welcome massage credits, and early check-in.",
        img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
];

const faqs = [
    {
        q: "What makes Poodja properties unique?",
        a: "All properties in our portfolio are exclusively managed and fully serviced. We combine the privacy of a private residence with the premium service standards of a luxury hotel, ensuring a consistent and flawless guest experience.",
    },
    {
        q: "Do the villas have private swimming pools?",
        a: "Yes, every single villa listed in our properties features its own private swimming pool, complete with comfortable sun loungers, outdoor dining spaces, and lush tropical gardens.",
    },
    {
        q: "Is daily housekeeping and staff included?",
        a: "Yes, daily housekeeping is included in all stays. Depending on the villa class, you will also have access to a dedicated villa manager, chef, and private butler to cater to your needs.",
    },
    {
        q: "Can you arrange airport transfers and local tours?",
        a: "Absolutely. Our concierge team is happy to arrange airport pickups, VIP fast-track services, private chauffeurs, car rentals, and custom island tours with professional local guides.",
    },
    {
        q: "Are the properties child-friendly?",
        a: "Yes, our villas are excellent for families. We can set up pool fences, baby cots, high chairs, and coordinate professional babysitting services upon request.",
    },
    {
        q: "What is the cancellation and refund policy?",
        a: "Our standard policy offers free cancellation up to 30 days prior to arrival. Policies can vary slightly during peak seasons (such as Christmas and New Year). Please check your specific booking details for exact terms.",
    },
];

const TOTAL_SLIDES = 3;

export default function AboutUs() {
    const { isDark, heroSide } = useTheme();
    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(true);

    const handleSlideChange = useCallback(
        (index) => {
            if (index === current) return;
            setFade(false);
            setTimeout(() => {
                setCurrent(index);
                setFade(true);
            }, 400);
        },
        [current],
    );

    const handleHeroClick = () => {
        if (heroSide === "right") {
            const nextIndex = (current + 1) % TOTAL_SLIDES;
            handleSlideChange(nextIndex);
        } else if (heroSide === "left") {
            const prevIndex = (current - 1 + TOTAL_SLIDES) % TOTAL_SLIDES;
            handleSlideChange(prevIndex);
        }
    };

    const accentText = isDark ? "#FCD57B" : "#8B6B2E";
    const descText = isDark ? "rgba(255,255,255,0.65)" : "rgba(1,20,52,0.7)";
    const mainText = isDark ? "#ffffff" : "#011434";
    const sectionBg = isDark ? "#011434" : "#ffffff";
    const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

    const [activeIdx, setActiveIdx] = useState(0);
    const [openFaqIdx, setOpenFaqIdx] = useState(null);

    const activeFeature = features[activeIdx];
    const otherFeatures = features.filter((_, i) => i !== activeIdx);

    return (
        <div
            style={{
                overflowX: "clip",
                minHeight: "100vh",
                position: "relative",
            }}
            className="transition-colors duration-500"
        >
            {/* 1. MAIN PORTFOLIO INTRO */}
            <section
                className="max-w-[1380px] mx-auto px-6 pt-24 md:pt-32 pb-16"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    <div className="lg:col-span-7 flex flex-col justify-between h-full">
                        <div>
                            <p
                                style={{ color: accentText }}
                                className="text-xs font-bold uppercase tracking-[0.35em] mb-4"
                            >
                                The Collection
                            </p>
                            <h1
                                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                                className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-wide leading-tight uppercase"
                            >
                                Villa & Properties
                            </h1>
                            <p
                                style={{ color: descText }}
                                className="text-sm md:text-base font-light leading-relaxed max-w-2xl mb-8 lg:mb-12"
                            >
                                Poodja presents an exclusive collection of luxury villas and
                                premier residences in Bali&apos;s most coveted destinations.
                                Each property in our portfolio is meticulously selected and
                                managed to ensure an unparalleled experience for our guests.
                                Immerse yourself in authentic Balinese charm combined with
                                modern design elements, five-star amenities, and flawless
                                personalized service.
                            </p>
                        </div>

                        <div className="relative h-[240px] sm:h-[320px] md:h-[400px] lg:h-[450px] w-full rounded-sm overflow-hidden group shadow-md mt-auto">
                            <Image
                                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
                                alt="Tropical Villa Wide Portfolio"
                                fill
                                priority
                                style={{ objectFit: "cover" }}
                                className="transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500" />
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
                        <div className="relative h-[240px] sm:h-[300px] lg:h-[320px] w-full rounded-sm overflow-hidden group shadow-md">
                            <Image
                                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"
                                alt="Villa Pool and Deck"
                                fill
                                style={{ objectFit: "cover" }}
                                className="transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500" />
                        </div>

                        <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] w-full rounded-sm overflow-hidden group shadow-md">
                            <Image
                                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D"
                                alt="Villa Pool at Sunset"
                                fill
                                style={{ objectFit: "cover" }}
                                className="transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-all duration-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. EXPLORE BY LOCATIONS */}
            <section
                className="max-w-[1380px] mx-auto px-6 py-12 md:py-20 border-t"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="relative h-[250px] sm:h-[350px] lg:h-[450px] w-full rounded-sm overflow-hidden group shadow-md">
                        <Image
                            src="https://images.unsplash.com/photo-1623298317883-6b70254edf31?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Balinese Rice Terrace Fields"
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500" />
                    </div>

                    <div className="flex flex-col justify-center">
                        <p
                            style={{ color: accentText }}
                            className="text-xs font-bold uppercase tracking-[0.35em] mb-4"
                        >
                            Curated Escapes
                        </p>
                        <h2
                            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                            className="text-3xl md:text-4xl font-semibold mb-6 tracking-wide leading-tight uppercase"
                        >
                            Explore By Locations
                        </h2>
                        <p
                            style={{ color: descText }}
                            className="text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl"
                        >
                            Discover our premier villas scattered across Bali&apos;s most
                            beautiful locales. Whether you wish to experience the vibrant
                            atmosphere and beachfront bars of Seminyak, the creative culture
                            and surf break vibes of Canggu, or the peaceful river ravines and
                            lush rice fields of Ubud, we have the perfect sanctuary tailored
                            for your stay.
                        </p>
                        <button
                            style={{
                                borderColor: accentText,
                                color: accentText,
                            }}
                            className="self-start inline-flex items-center gap-3 text-xs font-bold uppercase bg-transparent border px-6 py-3.5 tracking-[0.25em] transition-all duration-300 hover:bg-[#8B6B2E] hover:text-white hover:border-[#8B6B2E] active:scale-95 cursor-pointer"
                        >
                            Explore Locations
                            <svg width="14" height="7" viewBox="0 0 18 7" fill="none">
                                <line
                                    x1="0"
                                    y1="3.5"
                                    x2="14"
                                    y2="3.5"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                />
                                <polyline
                                    points="10,1 14,3.5 10,6"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    fill="none"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. EXPLORE BY CATEGORIES */}
            <section
                className="max-w-[1380px] mx-auto px-6 py-12 md:py-20 border-t"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="order-2 lg:order-1 flex flex-col justify-center">
                        <p
                            style={{ color: accentText }}
                            className="text-xs font-bold uppercase tracking-[0.35em] mb-4"
                        >
                            Custom Accommodations
                        </p>
                        <h2
                            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                            className="text-3xl md:text-4xl font-semibold mb-6 tracking-wide leading-tight uppercase"
                        >
                            Explore By Categories
                        </h2>
                        <p
                            style={{ color: descText }}
                            className="text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl"
                        >
                            We categorize our properties to simplify your search for the ideal
                            escape. Find luxury beachfront estates designed for large family
                            reunions, intimate cliffside hideaways with private infinity pools
                            perfect for honeymoons, or modern architectural gems that offer
                            sleek, high-end living in the middle of nature.
                        </p>
                        <button
                            style={{
                                borderColor: accentText,
                                color: accentText,
                            }}
                            className="self-start inline-flex items-center gap-3 text-xs font-bold uppercase bg-transparent border px-6 py-3.5 tracking-[0.25em] transition-all duration-300 hover:bg-[#8B6B2E] hover:text-white hover:border-[#8B6B2E] active:scale-95 cursor-pointer"
                        >
                            Explore Categories
                            <svg width="14" height="7" viewBox="0 0 18 7" fill="none">
                                <line
                                    x1="0"
                                    y1="3.5"
                                    x2="14"
                                    y2="3.5"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                />
                                <polyline
                                    points="10,1 14,3.5 10,6"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    fill="none"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="order-1 lg:order-2 relative h-[250px] sm:h-[350px] lg:h-[450px] w-full rounded-sm overflow-hidden group shadow-md">
                        <Image
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                            alt="Modern White Luxury Villa"
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500" />
                    </div>
                </div>
            </section>

            {/* 4. WHY BOOK WITH US (FEATURES) */}
            <section
                style={{
                    backgroundColor: sectionBg,
                    borderTop: `1px solid ${borderColor}`,
                    borderBottom: `1px solid ${borderColor}`,
                }}
                className="py-16 md:py-24"
            >
                <div className="max-w-[1380px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <p
                            style={{ color: accentText }}
                            className="text-xs font-bold uppercase tracking-[0.45em] mb-4"
                        >
                            Our Promise
                        </p>
                        <h2
                            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                            className="text-3xl md:text-4xl font-semibold tracking-widest leading-none uppercase"
                        >
                            Why Book With Us?
                        </h2>
                        <div
                            style={{ backgroundColor: accentText }}
                            className="w-10 h-[1px] mx-auto mt-6 opacity-60"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
                        <div
                            style={{ borderColor: borderColor }}
                            className="col-span-1 lg:col-span-4 lg:border-r lg:pr-8 flex flex-col gap-1"
                        >
                            {features.map((f, i) => {
                                const isActive = i === activeIdx;
                                return (
                                    <div
                                        key={f.id}
                                        onClick={() => setActiveIdx(i)}
                                        onMouseEnter={() => setActiveIdx(i)}
                                        style={{
                                            borderBottom: `1px solid ${borderColor}`,
                                            cursor: "pointer",
                                            opacity: isActive ? 1 : 0.45,
                                        }}
                                        className="py-3 flex flex-col transition-all duration-300 relative group"
                                    >
                                        <span
                                            style={{ color: accentText }}
                                            className="text-[10px] font-bold tracking-[0.3em] mb-1.5"
                                        >
                                            {f.num}
                                        </span>
                                        <h3
                                            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                                            className="text-lg font-medium tracking-wide uppercase transition-colors"
                                        >
                                            {f.title}
                                        </h3>
                                        <span
                                            style={{ color: accentText }}
                                            className="text-[9px] uppercase tracking-widest mt-1 opacity-70"
                                        >
                                            {f.subtitle}
                                        </span>

                                        {isActive && (
                                            <div
                                                style={{
                                                    backgroundColor: accentText,
                                                    animation:
                                                        "wbLineIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
                                                }}
                                                className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-8 z-10"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="col-span-1 lg:col-span-5 px-0 lg:px-8 flex flex-col gap-6">
                            <div
                                key={`details-${activeIdx}`}
                                className="flex flex-col animate-[fadeIn_0.5s_ease]"
                            >
                                <span
                                    style={{ color: accentText }}
                                    className="text-[10px] uppercase font-bold tracking-[0.25em] mb-2"
                                >
                                    {activeFeature.subtitle}
                                </span>
                                <h2
                                    style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                                    className="text-2xl md:text-3xl font-semibold tracking-wide uppercase mb-4"
                                >
                                    {activeFeature.title}
                                </h2>
                                <div
                                    style={{ backgroundColor: accentText }}
                                    className="w-8 h-[1px] mb-4 opacity-50"
                                />
                                <p
                                    style={{ color: descText }}
                                    className="text-sm font-light leading-relaxed"
                                >
                                    {activeFeature.desc}
                                </p>
                            </div>

                            <div
                                key={`main-img-${activeIdx}`}
                                className="relative h-[250px] sm:h-[320px] w-full rounded-sm overflow-hidden shadow-md animate-[fadeIn_0.5s_ease]"
                            >
                                <Image
                                    src={activeFeature.img}
                                    alt={activeFeature.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </div>
                        </div>

                        <div
                            style={{ borderColor: borderColor }}
                            className="col-span-1 lg:col-span-3 lg:border-l lg:pl-8 flex flex-row lg:flex-col gap-3 h-full lg:h-[480px] w-full"
                        >
                            {otherFeatures.map((f) => {
                                const globalIdx = features.findIndex(
                                    (feat) => feat.id === f.id,
                                );
                                return (
                                    <div
                                        key={f.id}
                                        onClick={() => setActiveIdx(globalIdx)}
                                        className="relative rounded-sm overflow-hidden flex-1 lg:flex-none lg:h-[calc(20%-8px)] cursor-pointer group shadow-sm min-h-[64px] lg:min-h-0"
                                    >
                                        <Image
                                            src={f.img}
                                            alt={f.title}
                                            fill
                                            style={{
                                                objectFit: "cover",
                                                filter: "brightness(0.35)",
                                            }}
                                            className="transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.45]"
                                        />
                                        <div className="absolute inset-0 bg-black/10" />
                                        <div className="absolute bottom-2 left-3 z-10 pr-2">
                                            <span className="text-[8px] font-bold text-[#FCD57B] tracking-widest block mb-0.5">
                                                {f.num}
                                            </span>
                                            <span className="text-[10px] text-white font-light tracking-wide uppercase truncate block max-w-[150px] lg:max-w-none">
                                                {f.title.split(" ").slice(0, 2).join(" ")}...
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FAQ SECTION */}
            <section
                className="max-w-[840px] mx-auto px-6 py-16 md:py-24"
            >
                <div className="text-center mb-16">
                    <p
                        style={{ color: accentText }}
                        className="text-xs font-bold uppercase tracking-[0.45em] mb-4"
                    >
                        Faq
                    </p>
                    <h2
                        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                        className="text-3xl md:text-4xl font-semibold tracking-widest leading-none uppercase"
                    >
                        Why Stay In Poodja?
                    </h2>
                    <div
                        style={{ backgroundColor: accentText }}
                        className="w-10 h-[1px] mx-auto mt-6 opacity-60"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openFaqIdx === i;
                        return (
                            <div
                                key={i}
                                style={{ borderColor: borderColor }}
                                className="border-b pb-4 last:border-none"
                            >
                                <button
                                    onClick={() => setOpenFaqIdx(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between text-left py-3 cursor-pointer select-none focus:outline-none"
                                >
                                    <span
                                        style={{
                                            fontFamily: "var(--font-cormorant-garamond)",
                                            color: isOpen ? accentText : mainText,
                                        }}
                                        className="text-base sm:text-lg font-medium tracking-wide uppercase transition-colors duration-300"
                                    >
                                        {faq.q}
                                    </span>
                                    <span
                                        style={{ color: accentText }}
                                        className="text-lg leading-none select-none transition-transform duration-300"
                                    >
                                        {isOpen ? "－" : "＋"}
                                    </span>
                                </button>
                                <div
                                    style={{
                                        maxHeight: isOpen ? "200px" : "0",
                                        transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                    }}
                                    className="overflow-hidden"
                                >
                                    <p
                                        style={{ color: descText }}
                                        className="text-xs sm:text-sm font-light leading-relaxed pt-2 pb-4 pr-6"
                                    >
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 7. ABOUT SECTION */}
            <section
                className="max-w-[1380px] mx-auto px-6 py-16 md:py-24 border-t"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    <div className="lg:col-span-5 flex items-center gap-4">
                        <h2
                            style={{
                                fontFamily: "var(--font-cormorant-garamond)",
                                color: accentText,
                            }}
                            className="text-2xl sm:text-3xl font-light tracking-wide uppercase leading-tight"
                        >
                            About Poodja Properties
                        </h2>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ color: accentText }}
                        >
                            <path
                                d="M5 12h14M12 5l7 7-7 7"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <h3
                            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                            className="text-xl sm:text-2xl font-medium tracking-wide uppercase leading-tight"
                        >
                            Bali Villas With Private Pools For Unforgettable Stays
                        </h3>
                        <p
                            style={{ color: descText }}
                            className="text-sm font-light leading-relaxed"
                        >
                            Our property management approach is built on custom hospitality,
                            combining local authenticity with international resort standards.
                            Each villa is designed as a standalone sanctuary, complete with
                            private pools, state-of-the-art facilities, and tropical
                            landscaping. We cater to families, couples, and groups seeking
                            safe, high-end, and private accommodations that allow them to
                            discover the true spirit of Indonesia.
                        </p>
                        <p
                            style={{ color: descText }}
                            className="text-sm font-light leading-relaxed"
                        >
                            From seminyak beachfront luxury to cliffside views in Uluwatu or
                            the calm ricefields of Ubud, Poodja ensures that every booking
                            comes with a best-rate guarantee, professional guest relations
                            managers, complimentary amenities, and memories that will last a
                            lifetime. Book directly with us for exclusive deals and
                            personalized concierge itineraries.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 8. QUICK ACCESS GATEWAY (RESOLVED & INTEGRATED FROM STASH) ── */}
            {/* <section
                className={`w-full max-w-[1380px] mx-auto px-6 py-12 border-t ${isDark ? "border-white/5" : "border-black/5"}`}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <span
                            className={`text-[9px] font-bold tracking-[0.25em] uppercase block mb-1 ${isDark ? "text-[#FCD57B]" : "text-[#8B6B2E]"}`}
                        >
                            Quick Access
                        </span>
                        <p className="text-xs font-light opacity-50">
                            Quick access to dynamic estate sub-portfolios:
                        </p>
                    </div> */}

            {/* List Teks Navigasi Villa */}
            {/* <div className="flex flex-wrap gap-x-8 gap-y-3">
                        {VILLAS_DATA.map((villa) => (
                            <Link
                                key={villa.id}
                                href={`/properties/${villa.id}`}
                                className={`group text-[10px] font-bold tracking-widest uppercase relative py-1 transition-opacity duration-300 hover:opacity-100 ${isDark
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
            </section> */}

            {/* Keyframe Styles */}
            <style>{`
        @keyframes wbLineIn {
          from { width: 0; opacity: 0; }
          to { width: 28px; opacity: 0.8; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}

function revealStyle(inView) {
    return {
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(40px)",
        transition:
            "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
    };
}
