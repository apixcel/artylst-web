"use client";

import { createPortal } from "react-dom";
import { cn } from "@/utils";
import { X } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export type NavLink = { label: string; href: string };

type MobileNavProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navLinks: NavLink[];
  brand?: React.ReactNode;
  portal?: boolean;
};

const Overlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <div
      onClick={onClose}
      className={cn(
        "fixed lg:hidden inset-0 z-[9998] bg-black/60 backdrop-blur-[2px] transition-opacity duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    />
  );
};

const Drawer = forwardRef<HTMLDivElement, MobileNavProps>(
  (
    {
      isOpen,
      setIsOpen,
      navLinks,
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
        "fixed lg:hidden top-0 left-0 h-dvh w-[375px] max-w-[86vw] z-[9999]",
        "bg-level-0 text-white shadow-2xl ring-1 ring-black/10",
        "transition-transform duration-300 will-change-transform",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="sticky top-0 flex items-center justify-between px-5 py-4 bg-level-0/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center gap-2">{brand}</div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-xl hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto pb-8">
        <ul>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-6 py-4 text-sm font-medium hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="truncate">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
);
Drawer.displayName = "Drawer";

const MobileNav = ({
  isOpen,
  setIsOpen,
  navLinks,
  brand,
  portal = true,
}: MobileNavProps) => {
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
      />
    </>
  );

  return portal ? createPortal(content, document.body) : content;
};

export default MobileNav;
