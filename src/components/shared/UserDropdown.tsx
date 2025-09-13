"use client";

import { IUser } from "@/interface";
import { cn } from "@/utils";
import { LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type LinkItem = {
  type: "link";
  label: string;
  href: string;
  icon?: React.ReactNode;
  danger?: boolean;
};

type ButtonItem = {
  type: "button";
  label: string;
  onClick: () => void | Promise<void>;
  icon?: React.ReactNode;
  danger?: boolean;
};

type SeparatorItem = {
  type: "separator";
};

type MenuEntry = LinkItem | ButtonItem | SeparatorItem;

type UserDropdownProps = {
  user?: IUser;
  onLogout?: () => void | Promise<void>;
  items?: Exclude<MenuEntry, SeparatorItem>[];
  align?: "left" | "right";
  className?: string;
  buttonClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  autoFocusFirstItem?: boolean;
  showEmail?: boolean;
};

export default function UserDropdown({
  user,
  onLogout,
  items = [],
  align = "right",
  className,
  buttonClassName,
  open,
  onOpenChange,
  showEmail = true,
  autoFocusFirstItem = false,
}: UserDropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? (open as boolean) : internalOpen;
  const pathname = usePathname();
  console.log(user);

  const setOpen = (v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | HTMLAnchorElement | null>>([]);

  const menuItems: MenuEntry[] = useMemo(() => {
    const out: MenuEntry[] = [...items];
    if (onLogout) {
      if (out.length) out.push({ type: "separator" });
      out.push({
        type: "button",
        label: "Log out",
        onClick: onLogout,
        icon: <LogOut className="w-4 h-4" />,
        danger: true,
      } as ButtonItem);
    }
    return out;
  }, [items, onLogout]);

  useEffect(() => {
    if (!isOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const focusables = itemRefs.current.filter(Boolean);
        if (!focusables.length) return;
        const active = document.activeElement as HTMLElement | null;
        let idx = focusables.findIndex((el) => el === active);
        if (idx === -1) idx = 0;
        idx =
          e.key === "ArrowDown"
            ? (idx + 1) % focusables.length
            : (idx - 1 + focusables.length) % focusables.length;
        focusables[idx]?.focus();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && autoFocusFirstItem) {
      const t = setTimeout(() => {
        const first = itemRefs.current.find(Boolean);
        first?.focus();
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isOpen, autoFocusFirstItem]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
        className={cn(
          "h-10 w-10 rounded-full ml-auto overflow-hidden cursor-pointer ring-0 outline-none focus:ring-2 focus:ring-white/30",
          buttonClassName
        )}
      >
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt={user?.displayName ? `${user.displayName}'s avatar` : "User avatar"}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-white/70" />
          </div>
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="User menu"
          className={cn(
            "absolute z-50 mt-2 w-56 bg-base-900 rounded-xl border border-white/10  backdrop-blur-xl p-3 shadow-lg",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {(user?.displayName || (showEmail && user?.email)) && (
            <div className="px-2 py-2 mb-1 rounded-lg bg-white/5">
              {user?.displayName && (
                <p className="text-sm font-medium text-white">{user.displayName}</p>
              )}
              {showEmail && user?.email && (
                <p className="text-xs text-white/70">{user.email}</p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1">
            {menuItems.map((item, i) => {
              if (item.type === "separator") {
                return <div key={`sep-${i}`} className="my-1 h-px bg-white/10" />;
              }

              if (item.type === "link") {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.label + i}
                    href={item.href}
                    role="menuitem"
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30",
                      isActive && "bg-white/10",
                      item.danger && "text-red-300 hover:bg-red-500/10"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              }

              // button
              return (
                <button
                  key={item.label + i}
                  role="menuitem"
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-white/90 hover:bg-white/10 focus:bg-white/10 outline-none",
                    item.danger && "text-red-300 hover:bg-red-500/10 focus:bg-red-500/10"
                  )}
                  onClick={async () => {
                    await item.onClick();
                    setOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
