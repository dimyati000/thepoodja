"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeAndLayoutProviders";
import { useSettings } from "@/components/SettingsProvider";
import { VILLAS_DATA } from "@/constants/villas";
import { SectionLabel } from "@/components/SectionLabel";
import { VillaCard } from "../../components/properties/VillaCard";
import { PropertySearchBar } from "@/components/properties/PropertySearchBar";
import { FAQAccordion } from "@/components/FAQAccordion";
import { WhyBookWithUs } from "@/components/WhyBookWithUs";
import { Icon } from "@/components/Icon";

const whyBookFeatures = {
  id: [
    {
      id: 1,
      num: "01",
      title: "Seleksi Villa Terbaik",
      subtitle: "Properti premium pilihan",
      desc: "Setiap properti dalam portofolio kami dipilih, diperiksa, dan diverifikasi langsung oleh tim ahli hospitality kami untuk memastikan standar tertinggi.",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 2,
      num: "02",
      title: "Harga Terbaik Dijamin",
      subtitle: "Nilai terbaik, dikelola langsung",
      desc: "Dengan mengelola properti secara langsung, kami menjamin harga terbaik yang tersedia. Temukan harga lebih rendah untuk villa & tanggal yang sama, dan kami akan menyamakannya.",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 3,
      num: "03",
      title: "Layanan Profesional",
      subtitle: "Hospitality on-site khusus",
      desc: "Mulai dari housekeeping harian hingga private chef dan butler, tim profesional kami berkomitmen memberikan hospitality yang intuitif dan mulus.",
      img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 4,
      num: "04",
      title: "Pengalaman Sesuai Keinginan",
      subtitle: "Disesuaikan untuk Anda",
      desc: "Baik itu mengatur private yacht, spa dalam villa, atau tur budaya khusus, konsierge kami merancang itinerary sempurna untuk Anda.",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
  ],
  en: [
    {
      id: 1,
      num: "01",
      title: "Outstanding Villa Selection",
      subtitle: "Handpicked premium properties",
      desc: "Every property in our portfolio is personally handpicked, inspected, and verified by our team of luxury hospitality experts to ensure it meets the highest standards.",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 2,
      num: "02",
      title: "Best Rates Guaranteed",
      subtitle: "Unmatched value, directly managed",
      desc: "By managing our properties directly, we guarantee the best available rates. If you find a lower price for the same villa and dates, we will match it.",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 3,
      num: "03",
      title: "Professional Service",
      subtitle: "Dedicated on-site hospitality",
      desc: "From daily housekeeping to private chefs and butler service, our professional team is committed to delivering intuitive and seamless hospitality.",
      img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    {
      id: 4,
      num: "04",
      title: "Customized Experiences",
      subtitle: "Tailored to your desires",
      desc: "Whether organizing a private yacht excursion, in-villa spa therapies, or custom cultural day tours, our concierge shapes the perfect itinerary for you.",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
  ],
};

const faqs = {
  id: [
    {
      q: "Apa yang membuat properti Poodja unik?",
      a: "Semua properti dalam portofolio kami dikelola dan dilayani secara eksklusif. Kami menggabungkan privasi hunian pribadi dengan standar layanan hotel mewah, memastikan pengalaman tamu yang konsisten dan sempurna.",
    },
    {
      q: "Apakah villa memiliki kolam renang pribadi?",
      a: "Ya, setiap villa dalam daftar properti kami memiliki kolam renang pribadi, lengkap dengan sun lounger, area makan outdoor, dan taman tropis yang rimbun.",
    },
    {
      q: "Apakah housekeeping harian dan staf sudah termasuk?",
      a: "Ya, housekeeping harian sudah termasuk dalam setiap menginap. Tergantung kelas villa, Anda juga akan mendapat akses ke villa manager, chef, dan butler pribadi.",
    },
    {
      q: "Bisakah mengatur antar-jemput bandara dan tur lokal?",
      a: "Tentu. Tim konsierge kami siap mengatur penjemputan bandara, layanan VIP fast-track, chauffeur pribadi, sewa mobil, dan tur pulau kustom dengan pemandu lokal profesional.",
    },
    {
      q: "Apakah properti ramah anak?",
      a: "Ya, villa kami sangat cocok untuk keluarga. Kami dapat menyiapkan pagar kolam, baby cot, kursi tinggi, dan mengatur layanan pengasuh profesional sesuai permintaan.",
    },
    {
      q: "Bagaimana kebijakan pembatalan dan refund?",
      a: "Kebijakan standar kami menawarkan pembatalan gratis hingga 30 hari sebelum kedatangan. Kebijakan dapat sedikit berbeda pada musim puncak (seperti Natal dan Tahun Baru). Silakan cek detail booking Anda untuk syarat pasti.",
    },
  ],
  en: [
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
  ],
};

const aboutText = {
  id: {
    subtitle: "Villa Bali Dengan Kolam Pribadi Untuk Menginap Tak Terlupakan",
    p1: "Pendekatan manajemen properti kami dibangun di atas hospitality yang personal, memadukan keaslian lokal dengan standar resor internasional. Setiap villa dirancang sebagai sanctuary tersendiri, lengkap dengan kolam pribadi, fasilitas modern, dan lanskap tropis. Kami melayani keluarga, pasangan, dan grup yang mencari akomodasi aman, premium, dan privat untuk menemukan jiwa sejati Indonesia.",
    p2: "Dari kemewahan tepi pantai Seminyak hingga pemandangan tebing di Uluwatu atau ketenangan sawah di Ubud, Poodja memastikan setiap pemesanan disertai jaminan harga terbaik, guest relations manager profesional, fasilitas gratis, dan kenangan yang bertahan seumur hidup. Pesan langsung dengan kami untuk penawaran eksklusif dan itinerary konsierge personal.",
  },
  en: {
    subtitle: "Bali Villas With Private Pools For Unforgettable Stays",
    p1: "Our property management approach is built on custom hospitality, combining local authenticity with international resort standards. Each villa is designed as a standalone sanctuary, complete with private pools, state-of-the-art facilities, and tropical landscaping. We cater to families, couples, and groups seeking safe, high-end, and private accommodations that allow them to discover the true spirit of Indonesia.",
    p2: "From seminyak beachfront luxury to cliffside views in Uluwatu or the calm ricefields of Ubud, Poodja ensures that every booking comes with a best-rate guarantee, professional guest relations managers, complimentary amenities, and memories that will last a lifetime. Book directly with us for exclusive deals and personalized concierge itineraries.",
  },
};

export default function PropertiesPage() {
  const { isDark } = useTheme();
  const { t, language } = useSettings();
  const lang = language === "ID" ? "id" : "en";

  const featuredVillas = useMemo(() => {
    const flat = [];
    VILLAS_DATA.forEach((group) => {
      group.rooms?.forEach((room) => {
        flat.push({
          ...room,
          groupId: group.id,
          groupName: group.name,
          groupLocation: group.location,
        });
      });
    });
    return flat.slice(0, 3);
  }, []);

  const accentText = isDark ? "#FCD57B" : "#8B6B2E";
  const descText = isDark ? "rgba(255,255,255,0.65)" : "rgba(1,20,52,0.7)";
  const mainText = isDark ? "#ffffff" : "#011434";

  return (
    <div
      style={{ overflowX: "clip", minHeight: "100vh", position: "relative" }}
      className="transition-colors duration-500"
    >
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] md:h-[75vh] flex items-end pb-24 md:pb-28">
        <Image
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=80"
          alt="Poodja Villas"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        {isDark && (
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none transition-opacity duration-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6">
          <p
            style={{ color: "#FCD57B" }}
            className="text-xs font-bold uppercase tracking-[0.35em] mb-4"
          >
            {t("propertiesPage.collection")}
          </p>
          <h1
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className="text-white text-4xl md:text-6xl font-semibold mb-4 tracking-wide leading-tight uppercase max-w-2xl"
          >
            {t("propertiesPage.title")}
          </h1>
          <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-xl">
            {t("propertiesPage.heroDesc")}
          </p>
        </div>
      </section>

      <section className="max-w-[1380px] mx-auto px-6 -mt-12 md:-mt-16 relative z-20 mb-20 md:mb-28">
        <PropertySearchBar isDark={isDark} />
      </section>

      {/* 2. FEATURED PROPERTIES */}
      <section className="w-full max-w-[1380px] mx-auto px-6 mb-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SectionLabel isDark={isDark} className="mb-2">
              {t("propertiesPage.featured")}
            </SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-semibold font-serif tracking-tight uppercase">
              {t("propertiesPage.exploreVillas")}
            </h2>
          </div>
          <Link
            href="/properties/all"
            className={`flex items-center gap-2.5 px-6 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full border transition-all duration-300 ${
              isDark
                ? "text-[#FCD57B] border-[#FCD57B]/40 hover:bg-[#FCD57B] hover:text-[#011434] hover:border-[#FCD57B]"
                : "text-[#8B6B2E] border-[#8B6B2E]/40 hover:bg-[#8B6B2E] hover:text-white hover:border-[#8B6B2E]"
            }`}
          >
            {t("common.viewAllProperties")}
            <Icon name="chevronRight" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVillas.map((villa) => (
            <VillaCard
              key={`${villa.groupId}-${villa.id}`}
              villa={villa}
              groupId={villa.groupId}
              groupName={villa.groupName}
              isDark={isDark}
            />
          ))}
        </div>
      </section>

      {/* 3. WHY BOOK WITH US — komponen sama persis dengan homepage */}
      <WhyBookWithUs
        isDark={isDark}
        features={whyBookFeatures[lang]}
        labelText={t("propertiesPage.ourPromise")}
        headingText={t("propertiesPage.whyBook").toUpperCase()}
        sectionId="why-book-with-us-properties"
      />

      {/* 4. FAQ SECTION */}
      <section className="max-w-[840px] mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <p
            style={{ color: accentText }}
            className="text-xs font-bold uppercase tracking-[0.45em] mb-4"
          >
            {t("propertiesPage.faq")}
          </p>
          <h2
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className="text-3xl md:text-4xl font-semibold tracking-widest leading-none uppercase"
          >
            {t("propertiesPage.whyStay")}
          </h2>
          <div
            style={{ backgroundColor: accentText }}
            className="w-10 h-[1px] mx-auto mt-6 opacity-60"
          />
        </div>

        <FAQAccordion items={faqs[lang]} isDark={isDark} />
      </section>

      {/* 5. ABOUT SECTION */}
      <section className="max-w-[1380px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex items-center gap-4">
            <h2
              style={{
                fontFamily: "var(--font-cormorant-garamond)",
                color: accentText,
              }}
              className="text-2xl sm:text-3xl font-light tracking-wide uppercase leading-tight"
            >
              {t("propertiesPage.aboutTitle")}
            </h2>
            <Icon name="chevronRight" size={26} style={{ color: accentText }} />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              className="text-xl sm:text-2xl font-medium tracking-wide uppercase leading-tight"
            >
              {aboutText[lang].subtitle}
            </h3>
            <p
              style={{ color: descText }}
              className="text-sm font-light leading-relaxed"
            >
              {aboutText[lang].p1}
            </p>
            <p
              style={{ color: descText }}
              className="text-sm font-light leading-relaxed"
            >
              {aboutText[lang].p2}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
