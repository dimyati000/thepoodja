"use client";
import { useState, useCallback } from "react";
import { useTheme } from "@/app/components/ThemeAndLayoutProviders";
import { HeroSection } from "./components/HeroSection";
import { WhyBookWithUs } from "./components/WhyBookWithUs";
import { Destinations } from "./components/Destinations";
import { Testimonials } from "./components/Testimonial";
import { ExclusiveDeals } from "./components/ExclusiveDeals";

const TOTAL_SLIDES = 3;

export default function App() {
  const { isDark, heroSide } = useTheme(); // Tarik heroSide dari provider
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

  // Fungsi navigasi klik area gambar
  const handleHeroClick = () => {
    if (heroSide === "right") {
      const nextIndex = (current + 1) % TOTAL_SLIDES;
      handleSlideChange(nextIndex);
    } else if (heroSide === "left") {
      const prevIndex = (current - 1 + TOTAL_SLIDES) % TOTAL_SLIDES;
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
      />
      <WhyBookWithUs isDark={isDark} />
      <Destinations isDark={isDark} />
      <Testimonials isDark={isDark} />
      <ExclusiveDeals isDark={isDark} />
    </div>
  );
}
