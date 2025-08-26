import React from "react";

const TalentIcon = ({
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

      {/* Star */}
      <path
        d="M50 30 L56 44 H72 L60 54 L65 70 L50 61 L35 70 L40 54 L28 44 H44 Z"
        fill={primaryColor}
        stroke={primaryColor}
        strokeWidth="2"
      />
    </svg>
  );
};

export default TalentIcon;
