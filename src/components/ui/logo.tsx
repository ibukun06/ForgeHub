"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface LogoProps {
  className?: string;
  variant?: "solid" | "inverse" | string; 
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`h-8 w-auto aspect-[406/267] ${className}`} />;
  }

  const currentTheme = resolvedTheme || theme;
  const logoSrc = currentTheme === "dark" ? "/logo-dark.png" : "/logo-light.png";
  const logoAlt = currentTheme === "dark" ? "ForgeHub Logo (Dark Theme)" : "ForgeHub Logo (Light Theme)";

  return (
    <Image
      src={logoSrc}
      alt={logoAlt}
      width={406}
      height={267}
      className={`h-8 w-auto object-contain ${className}`}
      priority
    />
  );
};
