"use client";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@/components/ThemeAndLayoutProviders";
import { HeroSection } from "../components/home/HeroSection";
import { WhyBookWithUs } from "../components/WhyBookWithUs";
import { Testimonials } from "../components/home/Testimonial";
import { ExclusiveDeals } from "../components/home/ExclusiveDeals";
import { VillaAccordionSlider } from "@/components/VillaAccordionSlider";

const DEFAULT_SLIDES = [
  {
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    tag: "CONDOMINIUM",
    title: "Find your own self in vintage lake house",
    price: "Rp 11.250.000.000",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
    tag: "LUXURY VILLA",
    title: "The sanctuary of tropical paradise",
    price: "Rp 14.500.000.000",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
    tag: "EXCLUSIVE RESIDENCE",
    title: "Timeless aesthetics meet nature",
    price: "Rp 18.200.000.000",
  },
];

const DESTINATIONS_DATA = [
  {
    id: 1,
    num: "01",
    label: "Seminyak",
    sub: "Beachfront Estates",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    desc: "A curation of ultra-luxury beachfront villas and premier lifestyle investments nestled along Bali's most sophisticated and vibrant coastline.",
  },
  {
    id: 2,
    num: "02",
    label: "Canggu",
    sub: "Chic Modern Living",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    desc: "Where contemporary architecture meets bohemian soul. Discover high-yielding architectural masterpieces surrounded by thriving creative enclaves.",
  },
  {
    id: 3,
    num: "03",
    label: "Ubud",
    sub: "Sanctuary & Culture",
    img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
    desc: "Immerse in private tropical sanctuaries overlooking deep river ravines and emerald rice terraces, crafted for ultimate inner peace and prestige.",
  },
  {
    id: 4,
    num: "04",
    label: "Sanur",
    sub: "Heritage & Serene",
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    desc: "Timeless coastal charm paired with elite residential estates, offering a gentle pace of refined living next to pristine sunrise lagoons.",
  },
  {
    id: 5,
    num: "05",
    label: "Nusa Dua",
    sub: "Exclusive Enclaves",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    desc: "The pinnacle of master-planned luxury. Secure private investments inside safe, high-end gated communities flanked by world-class golf courses.",
  },
];

export default function App() {
  const { isDark, heroSide } = useTheme();
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [slides, setSlides] = useState(DEFAULT_SLIDES);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/sliders");
        if (res.data && res.data.length > 0) {
          setSlides(res.data);
        }
      } catch (err) {
        console.log("Could not fetch dynamic sliders, using defaults.");
      }
    };
    fetchSlides();
  }, []);

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
    if (slides.length === 0) return;
    if (heroSide === "right") {
      const nextIndex = (current + 1) % slides.length;
      handleSlideChange(nextIndex);
    } else if (heroSide === "left") {
      const prevIndex = (current - 1 + slides.length) % slides.length;
      handleSlideChange(prevIndex);
    }
  };

  return (
    <div className="relative w-full">
      <HeroSection
        isDark={isDark}
        current={current}
        fade={fade}
        handleSlideChange={handleSlideChange}
        handleHeroClick={handleHeroClick}
        slides={slides}
      />
      <WhyBookWithUs isDark={isDark} />

      <VillaAccordionSlider
        data={DESTINATIONS_DATA}
        variant="destination"
        isDark={isDark}
        title="DESTINATIONS"
        subtitle="Explore Indonesia"
      />

      <Testimonials isDark={isDark} />
      <ExclusiveDeals isDark={isDark} />
    </div>
  );
}
