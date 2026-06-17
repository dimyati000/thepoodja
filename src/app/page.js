"use client";
import { useState, useCallback } from "react";
import { useTheme } from "@/app/components/ThemeAndLayoutProviders";
import { HeroSection } from "./components/HeroSection";
import { WhyBookWithUs } from "./components/WhyBookWithUs";
import { Destinations } from "./components/Destinations";
import { Testimonials } from "./components/Testimonial";
import { ExclusiveDeals } from "./components/ExclusiveDeals";

export default function App() {
  const { isDark } = useTheme();
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

  return (
    <div className="relative w-full">
      <HeroSection
        isDark={isDark}
        current={current}
        fade={fade}
        handleSlideChange={handleSlideChange}
      />
      <WhyBookWithUs isDark={isDark} />
      <Destinations isDark={isDark} />
      <Testimonials isDark={isDark} />
      <ExclusiveDeals isDark={isDark} />
    </div>
  );
}
