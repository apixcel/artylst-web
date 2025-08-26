import React from "react";

const RedCarpetRewardsIcon = ({
  size = 100,
  primaryColor = "#475867",
  secondaryColor = "#a434e5",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
    >
      {/* Outer Circle */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="6"
      />

      {/* Carpet (triangle shape) */}
      <path d="M20 80 L50 30 L80 80 Z" fill={primaryColor} />

      {/* Star for rewards */}
      <path
        d="M50 42 L54 50 H63 L56 56 L59 65 L50 60 L41 65 L44 56 L37 50 H46 Z"
        fill="#FFD84D"
        stroke="#c99828"
        strokeWidth="1"
      />
    </svg>
  );
};

export default RedCarpetRewardsIcon;
