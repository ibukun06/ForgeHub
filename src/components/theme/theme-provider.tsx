"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "forgehub-theme";

/**
 * Pairs with the inline script in layout.tsx, which sets the `.dark`
 * class on <html> before first paint (no flash of the wrong theme).
 * This provider just keeps React state in sync with that class and
 * exposes a way to change it.
 *
 * Default is 'dark' — ForgeHub's primary identity is the dark "Digital
 * Forge" app shell; light is an available mode, not the fallback.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

  // Moved applyTheme up to fix "accessed before it is declared"
  const applyTheme = (next: Theme) => {
    const isDark = next === 'system' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches 
      : next === 'dark';
    
    document.documentElement.classList.toggle("dark", isDark);
    setResolvedTheme(isDark ? "dark" : "light");
  };

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme) || "system";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(stored);
    applyTheme(stored);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (localStorage.getItem(STORAGE_KEY) === 'system' || !localStorage.getItem(STORAGE_KEY)) {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
