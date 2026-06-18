import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CACHE_KEYS } from "../utils/constants";
import { safeJsonParse } from "../utils/helpers";

const AppSettingsContext = createContext(null);

const defaultSettings = {
  grade: "8",
  language: "Hinglish",
  theme: "light",
};

export function AppSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    if (typeof window === "undefined") {
      return defaultSettings;
    }

    const stored = safeJsonParse(
      window.localStorage.getItem(CACHE_KEYS.settings),
      defaultSettings,
    );

    return { ...defaultSettings, ...stored };
  });

  useEffect(() => {
    window.localStorage.setItem(CACHE_KEYS.settings, JSON.stringify(settings));
    document.documentElement.classList.toggle("theme-dark", settings.theme === "dark");
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      setGrade: (grade) => setSettings((prev) => ({ ...prev, grade })),
      setLanguage: (language) => setSettings((prev) => ({ ...prev, language })),
      toggleTheme: () =>
        setSettings((prev) => ({
          ...prev,
          theme: prev.theme === "dark" ? "light" : "dark",
        })),
    }),
    [settings],
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);

  if (!context) {
    throw new Error("useAppSettings must be used within AppSettingsProvider");
  }

  return context;
}
