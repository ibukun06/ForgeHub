"use client"; // CRITICAL: Mark as a client component to use theme hooks

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes"; // Import the hook

interface LogoProps {
  className?: string;
  // We remove the old 'variant' prop because the component itself 
  // now calculates the 'variant' (image source) dynamically.
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  // 1. next-themes provides the current theme and the resolved system theme.
  const { theme, resolvedTheme } = useTheme();

  // 2. State to manage hydration mismatch. On the server (first render),
  // we don't know the client's preferred theme.
  const [mounted, setMounted] = useState(false);

  // 3. Set mounted to true once we are safe on the client.
  useEffect(() => {
    setMounted(true);
  }, []);

  // 4. While on the server, render a "skeleton" placeholder. This
  // prevents the layout from shifting once the logo loads.
  // The aspect ratio should match your image: 406 / 267.
  if (!mounted) {
    return <div className={cn("h-8 w-auto aspect-[406/267]", className)} />;
  }

  // 5. Determine the actual theme: use resolvedTheme if the theme is 'system'.
  // This gives you the final light/dark value.
  const currentTheme = resolvedTheme || theme;

  // 6. Map the final currentTheme to the correct image source you just uploaded.
  const logoSrc = currentTheme === "dark" ? "/logo-dark.png" : "/logo-light.png";
  const logoAlt = currentTheme === "dark" ? "ForgeHub Logo (Dark Theme)" : "ForgeHub Logo (Light Theme)";

  // 7. Render the final Next.js intelligent image.
  return (
    <Image
      src={logoSrc}
      alt={logoAlt}
      width={406}
      height={267}
      className={cn("h-8 w-auto object-contain", className)}
      priority // Critical for core web vitals, this image is above the fold.
    />
  );
};
