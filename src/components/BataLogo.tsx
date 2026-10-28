"use client";

import React from "react";

interface BataLogoProps {
  className?: string;
  variant?: "black" | "white" | "red";
  height?: number;
}

export const BataLogo: React.FC<BataLogoProps> = ({
  className = "",
  variant = "black",
  height = 28,
}) => {
  const fill =
    variant === "white"
      ? "#FFFFFF"
      : variant === "red"
      ? "#E2001A"
      : "#111111";

  return (
    <svg
      height={height}
      viewBox="0 0 120 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
      aria-label="Bata Logo"
    >
      <text
        x="4"
        y="31"
        fontFamily="'Brush Script MT', 'Bickham Script Pro', 'Segoe Script', cursive"
        fontSize="36"
        fontStyle="italic"
        fontWeight="bold"
        letterSpacing="-0.5px"
        fill={fill}
      >
        Bata
      </text>
    </svg>
  );
};
