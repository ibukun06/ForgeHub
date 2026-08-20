"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { Monitor, Moon, Sun } from "lucide-react";

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Appearance</h2>
      <p className="text-sm text-text-muted mb-6">Customize the look and feel of your ForgeHub experience.</p>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Theme</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <button
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                theme === "light" 
                  ? "border-primary bg-primary/5" 
                  : "border-border bg-surface hover:border-primary/50"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm border border-slate-200">
                <Sun className="h-5 w-5" />
              </div>
              <span className={`text-sm font-medium ${theme === "light" ? "text-primary" : "text-text-primary"}`}>
                Light
              </span>
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                theme === "dark" 
                  ? "border-primary bg-primary/5" 
                  : "border-border bg-surface hover:border-primary/50"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-amber-500 shadow-sm border border-slate-800">
                <Moon className="h-5 w-5" />
              </div>
              <span className={`text-sm font-medium ${theme === "dark" ? "text-primary" : "text-text-primary"}`}>
                Dark
              </span>
            </button>

            <button
              onClick={() => setTheme("system")}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                theme === "system" 
                  ? "border-primary bg-primary/5" 
                  : "border-border bg-surface hover:border-primary/50"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated text-text-muted shadow-sm border border-border">
                <Monitor className="h-5 w-5" />
              </div>
              <span className={`text-sm font-medium ${theme === "system" ? "text-primary" : "text-text-primary"}`}>
                System
              </span>
            </button>

          </div>
          <p className="mt-3 text-xs text-text-muted">
            System mode will automatically switch between light and dark based on your operating system preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
