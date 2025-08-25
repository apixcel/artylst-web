import React from "react";

const CustomerIcon = ({ size = 100, secondaryColor = "#a434e5" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
    >
      {/* Green Circle */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="6"
      />

      {/* User Icon (customer) */}
      <circle cx="50" cy="40" r="12" fill="#475867" />
      <path
        d="M30 75c0-10 9-18 20-18h0c11 0 20 8 20 18"
        fill="#475867"
      />
    </svg>
  );
};

export default CustomerIcon;