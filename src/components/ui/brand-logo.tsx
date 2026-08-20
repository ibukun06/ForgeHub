import React from "react";

interface BrandLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  showText?: boolean;
}

export function BrandLogo({ size = 32, showText = true, className = "", ...props }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary flex-shrink-0"
        {...props}
      >
        {/* Industrial precision rings */}
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" strokeDasharray="10 4" opacity="0.3" />
        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="4" />
        {/* Core node structure (Technical connection) */}
        <path
          d="M50 25 L75 65 L25 65 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="25" r="5" fill="currentColor" />
        <circle cx="25" cy="65" r="5" fill="currentColor" />
        <circle cx="75" cy="65" r="5" fill="currentColor" />
        <circle cx="50" cy="50" r="8" fill="currentColor" />
        {/* Connecting links */}
        <line x1="50" y1="25" x2="50" y2="50" stroke="currentColor" strokeWidth="4" />
        <line x1="25" y1="65" x2="50" y2="50" stroke="currentColor" strokeWidth="4" />
        <line x1="75" y1="65" x2="50" y2="50" stroke="currentColor" strokeWidth="4" />
      </svg>
      {showText && (
        <span className="font-heading font-bold text-xl tracking-tight text-text-primary">
          Forge<span className="text-primary opacity-90">Hub</span>
        </span>
      )}
    </div>
  );
}
