"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/components/theme/theme-provider";

interface LogoProps {
  className?: string;
  /** Accepted for call-site compatibility; not yet used to vary rendering. */
  variant?: string;
  tone?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`h-8 w-8 ${className}`} />;
  }

  const isDark = theme === "dark";
  const logoSrc = isDark ? "/logo-dark.png" : "/logo-light.png";

  return (
    <Image
      src={logoSrc}
      alt="ForgeHub Logo"
      width={128}
      height={128}
      className={`h-8 w-8 object-contain ${className}`}
      priority
      unoptimized
    />
  );
};
