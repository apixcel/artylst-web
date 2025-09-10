import React from "react";

const Chip = ({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border border-white/10 bg-white/5 ${className}`}
  >
    {children}
  </span>
);
export default Chip;
