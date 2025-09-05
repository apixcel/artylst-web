"use client";

import { createPortal } from "react-dom";
import { cn } from "@/utils";
import { forwardRef, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { SidebarUserCard } from "..";

export type NavLink = { label: string; route: string; icon: React.ElementType };
export type User = { name: string; email: string; image: string };

type DashboardMobileNavProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navLinks: NavLink[];
  brand?: React.ReactNode;
  portal?: boolean;
  user: User;
};

const Overlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <div
      onClick={onClose}
      className={cn(
        "fixed lg:hidden inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    />
  );
};

const Drawer = forwardRef<HTMLDivElement, DashboardMobileNavProps>(
  (
    {
      isOpen,
      setIsOpen,
      navLinks,
      user,
      brand = (
        <Link href="/" aria-label="Home">
          <Image
            src="/images/logo/logo-no-text.png"
            alt="logo"
            width={100}
            height={100}
            className="w-[40px] h-[40px]"
            priority
          />
        </Link>
      ),
    },
    ref
  ) => (
    <aside
      ref={ref}
      className={cn(
        "fixed lg:hidden top-0 left-0 h-dvh w-[375px] max-w-[86vw] z-40 overflow-y-auto",
        "bg-gradient-to-b from-brand-3/10 to-base-900/10 backdrop-blur-2xl text-white shadow-2xl ring-1 ring-black/10",
        "transition-transform duration-300 will-change-transform",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="sticky !z-[9999] top-0 flex items-center justify-between px-5 py-4 bg-gradient-to-r from-brand-3/10 to-base-900/10 backdrop-blur-2xl border-b border-white/10 bg-base-900">
        <div className="flex items-center gap-2">{brand}</div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-xl hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto pb-8 z-30 relative">
        <ul className="p-4 flex flex-col gap-2">
          {navLinks.map((l) => (
            <li key={l.route} onClick={() => setIsOpen(false)}>
              <Link
                href={l.route}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10",
                  window.location.pathname === l.route ? "bg-white/10" : ""
                )}
              >
                <l.icon className={cn("text-muted group-hover:light h-5 w-5")} />
                <span className="font-heading">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto p-3">
        <SidebarUserCard isOpen={isOpen} user={user} />

        <div
          className={cn(
            "text-[11px] text-center text-white/50 mt-3",
            !isOpen && "text-center"
          )}
        >
          {isOpen ? "© 2025 ARTYLST" : "© 2025"}
        </div>
      </div>
    </aside>
  )
);
Drawer.displayName = "Drawer";

const DashboardMobileNav = ({
  isOpen,
  setIsOpen,
  portal = true,
  navLinks,
  brand,
  user,
}: DashboardMobileNavProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setIsOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isOpen, setIsOpen]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const content = (
    <>
      <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Drawer
        ref={drawerRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLinks={navLinks}
        brand={brand}
        portal={portal}
        user={user}
      />
    </>
  );

  return portal ? createPortal(content, document.body) : content;
};

export default DashboardMobileNav;
