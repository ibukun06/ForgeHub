"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const getIcon = () => {
    if (theme === 'light') return <Sun className="h-4 w-4" aria-hidden />;
    if (theme === 'dark') return <Moon className="h-4 w-4" aria-hidden />;
    return <Monitor className="h-4 w-4" aria-hidden />;
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Current theme is ${theme}. Click to switch.`}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition-colors hover:text-text-primary hover:border-primary ${className}`}
    >
      {getIcon()}
    </button>
  );
}
