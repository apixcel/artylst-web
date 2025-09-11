"use client";

import { cn } from "@/utils";
import { forwardRef } from "react";
const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-md border border-white/10 px-4 py-2 focus:ring-1 focus:ring-light focus:border-brand-4 bg-transparent",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
