import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "solid" | "inverse" | "mesh" | string; 
  tone?: "brand" | "mono" | "inverse" | string;
  [key: string]: any; 
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant, tone, ...rest }) => {
  return (
    <>
      {/* Light Theme Image: Visible by default, hidden when 'dark' class is active */}
      <Image
        src="/logo-light.png"
        alt="ForgeHub Logo"
        width={406}
        height={267}
        className={`block dark:hidden h-8 w-auto object-contain ${className}`}
        priority
      />

      {/* Dark Theme Image: Hidden by default, visible when 'dark' class is active */}
      <Image
        src="/logo-dark.png"
        alt="ForgeHub Logo"
        width={406}
        height={267}
        className={`hidden dark:block h-8 w-auto object-contain ${className}`}
        priority
      />
    </>
  );
};
