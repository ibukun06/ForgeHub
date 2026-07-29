"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface LogoProps {
  className?: string;
  variant?: string; 
  tone?: string;
  [key: string]: any; 
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant, tone, ...rest }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`h-8 w-8 ${className}`} />;
  }

  // Strict boolean check ensures it defaults properly
  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark ? "/logo-dark.png" : "/logo-light.png";

  return (
    <Image
      src={logoSrc}
      alt="ForgeHub Logo"
      width={128}
      height={128}
      className={`h-8 w-8 object-contain ${className}`}
      priority
      unoptimized // Bypasses Vercel's image cache to fix the stuck logo
    />
  );
};
