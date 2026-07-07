"use client";
import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState("ID");
  const [currency, setCurrency] = useState("IDR");

  useEffect(() => {
    const savedLang = localStorage.getItem("poodja_lang");
    const savedCurr = localStorage.getItem("poodja_curr");
    if (savedLang) setLanguage(savedLang);
    if (savedCurr) setCurrency(savedCurr);
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("poodja_lang", lang);
  };

  const handleSetCurrency = (curr) => {
    setCurrency(curr);
    localStorage.setItem("poodja_curr", curr);
  };

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        currency,
        setCurrency: handleSetCurrency,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
