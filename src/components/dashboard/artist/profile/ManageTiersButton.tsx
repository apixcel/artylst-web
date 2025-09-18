"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Layers } from "lucide-react";
import Link from "next/link";

/**
 * Improvements
 * - Click-outside to close (pointerdown for better mobile support)
 * - Escape key to close
 * - Arrow Up/Down + Home/End keyboard navigation
 * - Focus management: returns focus to trigger on close, focuses first item on open
 * - ARIA roles/props (menu, menuitem, aria-expanded, aria-controls)
 * - Lightweight animation with Tailwind
 */

const MENU_ID = "manage-tiers-menu";

const ManageTiersButton = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const items = [
    { href: "/dashboard/tiers/personal", label: "Personal Playlists" },
    { href: "/dashboard/tiers/business", label: "Business Playlists" },
  ];

  const closeMenu = useCallback(() => {
    setOpen(false);
    // return focus to the trigger on close
    requestAnimationFrame(() => buttonRef.current?.focus());
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
    // focus first item after open
    requestAnimationFrame(() => itemRefs.current[0]?.focus());
  }, []);

  // Toggle handler ensures correct focus behavior
  const handleToggle = () => (open ? closeMenu() : openMenu());

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, closeMenu]);

  // Keyboard handling: Escape to close; Arrow nav within menu
  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const focusables = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const currentIndex = focusables.findIndex((el) => el === document.activeElement);

    switch (e.key) {
      case "Escape": {
        e.preventDefault();
        closeMenu();
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        const next = (currentIndex + 1) % focusables.length;
        focusables[next]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prev = (currentIndex - 1 + focusables.length) % focusables.length;
        focusables[prev]?.focus();
        break;
      }
      case "Home": {
        e.preventDefault();
        focusables[0]?.focus();
        break;
      }
      case "End": {
        e.preventDefault();
        focusables[focusables.length - 1]?.focus();
        break;
      }
      default:
        break;
    }
  };

  // Close on resize or route change flashes (optional: resize)
  useEffect(() => {
    if (!open) return;
    const onResize = () => closeMenu();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, closeMenu]);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        className="btn-tertiary btn gap-2 items-center flex"
        aria-haspopup="menu"
        aria-controls={MENU_ID}
        aria-expanded={open}
        onClick={handleToggle}
      >
        <Layers className="h-4 w-4" /> Manage tiers
      </button>

      {/* Menu */}
      <div
        ref={menuRef}
        id={MENU_ID}
        role="menu"
        aria-label="Manage tiers"
        className={`absolute flex flex-col gap-1 top-full right-0 z-30 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-black/90 backdrop-blur p-2 shadow-xl ring-1 ring-white/10 transition-all duration-150 origin-top-right
        ${open ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"}`}
        onKeyDown={onMenuKeyDown}
      >
        {items.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            tabIndex={open ? 0 : -1}
            className="btn-tertiary btn w-full justify-start gap-2 rounded-lg"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ManageTiersButton;
