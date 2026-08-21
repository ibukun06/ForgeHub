import type { Metadata } from "next";
import { Inter, Archivo, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "ForgeHub",
  description:
    "A guided, AI-assisted workspace where technical teams build the documentation their project actually needs — as they work, not at the deadline.",
};

// Blocking, inline — runs before first paint so there's no flash of the
// wrong theme. Falls back to 'dark' (ForgeHub's default identity), not
// system preference, matching ThemeProvider's default.
const themeInitScript = `
(function () {
  try {
    var defaultPrefs = {
      themeMode: "system",
      lightTheme: "forge-light",
      darkTheme: "forge-dim",
      accent: "forge-orange",
      density: "comfortable",
      motion: "system"
    };
    
    var prefs = defaultPrefs;
    var stored = localStorage.getItem('forgehub-theme-prefs');
    
    if (stored) {
      try {
        prefs = Object.assign({}, defaultPrefs, JSON.parse(stored));
      } catch (e) {}
    } else {
      var legacy = localStorage.getItem('forgehub-theme');
      if (legacy) {
        prefs.themeMode = legacy;
      }
    }
    
    var effectiveTheme = prefs.darkTheme;
    if (prefs.themeMode === "light") {
      effectiveTheme = prefs.lightTheme;
    } else if (prefs.themeMode === "dark") {
      effectiveTheme = prefs.darkTheme;
    } else if (prefs.themeMode === "system" || prefs.themeMode === "auto") {
      var isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = isSystemDark ? prefs.darkTheme : prefs.lightTheme;
    }
    
    document.documentElement.setAttribute("data-theme", effectiveTheme);
    document.documentElement.setAttribute("data-accent", prefs.accent);
    document.documentElement.setAttribute("data-density", prefs.density);
    document.documentElement.setAttribute("data-motion", prefs.motion);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "forge-dim");
    document.documentElement.setAttribute("data-accent", "forge-orange");
    document.documentElement.setAttribute("data-density", "comfortable");
    document.documentElement.setAttribute("data-motion", "system");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${robotoMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-text-primary" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
