import React from "react";

const ProfileIcon = ({
  size = 64,
  primaryColor = "#475867",
  secondaryColor = "#a434e5",
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
    <rect fill="#fff" opacity="0.01" width="64" height="64" />

    <circle
      cx="20.96"
      cy="22.89"
      r="7.95"
      fill="none"
      stroke={primaryColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.05,51A15.91,15.91,0,0,1,22,35.12c8.45.55,14.84,8,14.84,16.42V55.8A3.18,3.18,0,0,1,33.68,59H8.23A3.18,3.18,0,0,1,5.05,55.8Z"
      fill="none"
      stroke={primaryColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M37.86,23.4A11.63,11.63,0,1,1,40.38,26l-4,1.49Z"
      fill="none"
      stroke={secondaryColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="47.43"
      y1="11.11"
      x2="47.43"
      y2="17.11"
      fill="none"
      stroke={secondaryColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="47.43"
      y1="20.75"
      x2="47.43"
      y2="21.75"
      fill="none"
      stroke={secondaryColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ProfileIcon;
