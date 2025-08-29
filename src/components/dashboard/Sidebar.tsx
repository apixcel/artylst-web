"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { businessDashboardLink } from "@/constants";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden lg:flex shrink-0 flex-col border-r border-white/10 bg-gradient-to-b from-brand-3/10 to-base-900/10 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto transition-all duration-300",
        isOpen ? "w-72" : "w-20"
      )}
    >
      {/* toggle */}
      <div
        className={cn(
          "px-3 py-6 flex items-center gap-3",
          isOpen ? "justify-end" : "justify-center"
        )}
      >
        {/* Toggle button — always visible */}
        <button
          className="text-white/60 hover:text-white rounded-lg p-2 mb-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Nav */}
      <ul className="px-3 space-y-1">
        {businessDashboardLink.map((link, index) => (
          <li key={index}>
            <Link
              href={link.route}
              className={cn(
                "group flex items-center rounded-xl hover:bg-white/10",
                isOpen ? "gap-3 px-4 py-3" : "justify-center px-0 py-3",
                pathname === link.route ? "bg-white/10" : ""
              )}
            >
              <link.icon
                className={cn(
                  "text-muted group-hover:light",
                  isOpen ? "h-5 w-5" : "h-6 w-6"
                )}
              />
              {isOpen && <span className="font-heading">{link.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto p-3">
        <div
          className={cn(
            "rounded-xl border border-white/10 bg-gradient-to-tr from-brand-1/15 to-brand-5/10",
            isOpen ? "p-4" : "p-2"
          )}
        >
          {isOpen ? (
            <>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[url('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp')] bg-cover"></div>
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-white/60">Business</div>
                  <div className="text-sm font-heading">aida@gmail.com</div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-10 w-10 rounded-xl bg-[url('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp')] bg-cover"></div>
          )}
        </div>

        <div className={cn("text-[11px] text-white/50 mt-3", !isOpen && "text-center")}>
          {isOpen ? "© 2025 ARTYLST" : "© 2025"}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
