"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState("ID");
  const [currency, setCurrency] = useState("IDR");
  const [isHydrated, setIsHydrated] = useState(false);

  // State untuk menyimpan tanggal check-in, check-out, jumlah dewasa, jumlah anak, dan promo code
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [promo, setPromo] = useState("");

  useEffect(() => {
    const savedLang = localStorage.getItem("poodja_lang");
    const savedCurr = localStorage.getItem("poodja_curr");
    const timer = setTimeout(() => {
      if (savedLang) setLanguage(savedLang);
      if (savedCurr) setCurrency(savedCurr);
      setIsHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("poodja_lang", lang);
  };

  const handleSetCurrency = (curr) => {
    setCurrency(curr);
    localStorage.setItem("poodja_curr", curr);
  };

  const t = (path) => {
    const dict = translations[language.toLowerCase()] || translations.en;
    const value = path.split(".").reduce((acc, key) => acc?.[key], dict);
    return value ?? path;
  };

  // Reset tanggal booking — dipanggil tiap kali pindah room/villa
  const resetBooking = () => {
    setCheckIn(null);
    setCheckOut(null);
  };

  if (!isHydrated) return null;

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        currency,
        setCurrency: handleSetCurrency,
        t,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        adults,
        setAdults,
        childrenCount,
        setChildrenCount,
        promo,
        setPromo,
        resetBooking,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};
