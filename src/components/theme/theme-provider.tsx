"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeMode = "system" | "light" | "dark" | "auto";

export type ThemePreferences = {
  themeMode: ThemeMode;
  lightTheme: string;
  darkTheme: string;
  accent: string;
  density: string;
  motion: string;
};

export const defaultPreferences: ThemePreferences = {
  themeMode: "system",
  lightTheme: "forge-light",
  darkTheme: "forge-dim",
  accent: "forge-orange",
  density: "comfortable",
  motion: "system",
};

type ThemeContextValue = {
  preferences: ThemePreferences;
  setPreferences: (prefs: Partial<ThemePreferences>) => void;
  resolvedTheme: string;
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const STORAGE_KEY = "forgehub-theme-prefs";
const LEGACY_STORAGE_KEY = "forgehub-theme";

/**
 * Handles real-time resolution of complex theme preferences.
 * Pairs with the inline script in layout.tsx which runs before first paint.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferencesState] = useState<ThemePreferences>(defaultPreferences);
  const [resolvedTheme, setResolvedTheme] = useState<string>("forge-dim");

  const applyPreferences = (prefs: ThemePreferences) => {
    // 1. Resolve Effective Theme
    let effectiveTheme = prefs.darkTheme;

    if (prefs.themeMode === "light") {
      effectiveTheme = prefs.lightTheme;
    } else if (prefs.themeMode === "dark") {
      effectiveTheme = prefs.darkTheme;
    } else if (prefs.themeMode === "system" || prefs.themeMode === "auto") {
      // In a real browser environment, we check the media query
      const isSystemDark = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : true;
      effectiveTheme = isSystemDark ? prefs.darkTheme : prefs.lightTheme;
    }

    setResolvedTheme(effectiveTheme);

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute("data-theme", effectiveTheme);
      document.documentElement.setAttribute("data-accent", prefs.accent);
      document.documentElement.setAttribute("data-density", prefs.density);
      document.documentElement.setAttribute("data-motion", prefs.motion);

      // Cleanup legacy class if present
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // 1. Initial Load & Legacy Migration
    let loadedPrefs = { ...defaultPreferences };
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        loadedPrefs = { ...defaultPreferences, ...JSON.parse(stored) };
      } else {
        const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacy) {
          loadedPrefs.themeMode = legacy as ThemeMode;
          localStorage.removeItem(LEGACY_STORAGE_KEY);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedPrefs));
        }
      }
    } catch {
      console.warn("Failed to parse theme preferences");
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreferencesState(loadedPrefs);
    applyPreferences(loadedPrefs);

    // 2. Listen for OS Preference Changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const currentPrefs = stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
        
        if (currentPrefs.themeMode === 'system' || currentPrefs.themeMode === 'auto') {
          applyPreferences(currentPrefs);
          setPreferencesState(currentPrefs);
        }
      } catch {}
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // 3. Listen for changes from other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newPrefs = { ...defaultPreferences, ...JSON.parse(e.newValue) };
          applyPreferences(newPrefs);
          setPreferencesState(newPrefs);
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  function setPreferences(newPrefs: Partial<ThemePreferences>) {
    setPreferencesState(current => {
      const updated = { ...current, ...newPrefs };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      applyPreferences(updated);
      return updated;
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        preferences,
        setPreferences,
        resolvedTheme,
        theme: preferences.themeMode,
        setTheme: (mode: ThemeMode) => setPreferences({ themeMode: mode }),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
