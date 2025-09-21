"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useId, useCallback } from "react";
import { Bell, CheckCheck, X } from "lucide-react";
import { cn } from "@/utils";

/**
 * ===== Types
 */
export type ButtonItem = {
  type: "button";
  label: string;
  onClick: () => void | Promise<void>;
  icon?: React.ReactNode;
  danger?: boolean;
};

export type SeparatorItem = { type: "separator" };
export type FooterEntry = ButtonItem | SeparatorItem;

export type NotificationUser = {
  name: string;
  avatar?: string | null;
};

export type NotificationItem = {
  _id: string;
  user: NotificationUser;
  /**
   * If provided, we show `title`; otherwise we render a sentence using
   * `user.name`, `action`, and `metaLinkText`.
   */
  title?: string;
  /** Optional short verb like "commented on" */
  action?: string;
  /** CTA hyperlink and label (both optional) */
  metaHref?: string;
  metaLinkText?: string;
  /**
   * We normalize unread from the `read` boolean to avoid confusion.
   * If your data has `read`, pass it and we will invert it.
   */
  read?: boolean; // true => read, false/undefined => unread
  /** "9 hours ago", "Just now", etc. */
  timeAgo?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NotificationDropdownProps = {
  items: NotificationItem[];
  align?: "left" | "right";
  className?: string;
  buttonClassName?: string;
  open?: boolean; // controlled open
  onOpenChange?: (open: boolean) => void;
  onMarkAllRead?: () => void | Promise<void>;
  footer?: FooterEntry[];
  /** "All Notifications" link */
  allHref?: string;
  autoFocusFirstItem?: boolean;
  /** override badge count (defaults to unread derived from items) */
  badgeCount?: number;
};

/**
 * ===== Helpers
 */
const getInitials = (name?: string) =>
  (name || "")
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "⦿";

/**
 * ===== Component
 */
export default function NotificationDropdown({
  items,
  align = "right",
  className,
  buttonClassName,
  open,
  onOpenChange,
  onMarkAllRead,
  footer = [],
  allHref = "#",
  autoFocusFirstItem = false,
  badgeCount,
}: NotificationDropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? (open as boolean) : internalOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (!isControlled) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange]
  );

  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | HTMLButtonElement | null>>([]);

  // Derive unread from the data's `read` field (true => read).
  const computedUnread = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const unreadCount = typeof badgeCount === "number" ? badgeCount : computedUnread;

  // Close on outside click + keyboard handling
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
        if (idx === -1) idx = e.key === "ArrowDown" ? -1 : 0;
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
  }, [isOpen, setOpen]);

  // Autofocus first item when opening
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
      {/* Trigger */}
      <button
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setOpen(!isOpen)}
        className={cn(
          "relative h-10 w-10 rounded-full flex items-center justify-center bg-white/10 text-white/80 hover:bg-white/15 focus:ring-2 focus:ring-white/30 outline-none",
          buttonClassName
        )}
      >
        <Bell className="h-5 w-5" />
        {!!unreadCount && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-brand-4/80 text-[10px] leading-[18px] px-1 text-white text-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label="Notifications"
          className={cn(
            "absolute z-50 mt-2 w-80 bg-base-900 rounded-2xl border border-white/10 backdrop-blur-xl p-3 shadow-xl",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-white">Notifications</p>
            <div className="flex items-center gap-2">
              {onMarkAllRead && (
                <button
                  className="text-xs text-white/70 hover:text-white/90 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/10 focus:ring-2 focus:ring-white/30 outline-none"
                  onClick={async () => {
                    await onMarkAllRead();
                  }}
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all as read
                </button>
              )}

              <button
                aria-label="Close"
                className="p-1 rounded-md hover:bg-white/10 text-white/70 hover:text-white/90 focus:ring-2 focus:ring-white/30 outline-none"
                onClick={() => setOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col divide-y divide-white/10 max-h-96 overflow-auto">
            {items.length === 0 && (
              <div className="text-sm text-white/60 px-2 py-6 text-center">
                No notifications
              </div>
            )}

            {items.map((n, i) => {
              const key = `n-${n._id}-${i}`;
              const unread = !n.read;

              const content = (
                <div className="flex items-start gap-3">
                  {/* Avatar / Icon */}
                  <div className="relative shrink-0">
                    {n.user?.avatar ? (
                      <Image
                        src={n.user.avatar}
                        alt={n.user.name}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 text-sm">
                        {getInitials(n.user?.name)}
                      </div>
                    )}
                    {unread && (
                      <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-brand-4/80 ring-2 ring-base-900" />
                    )}
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p className="text-sm text-white/90 truncate">{n.title}</p>
                    {!!n.timeAgo && (
                      <p className="text-xs text-white/60 mt-0.5">{n.timeAgo}</p>
                    )}
                  </div>
                </div>
              );

              // Make entire row focusable for keyboard nav
              return n.metaHref ? (
                <Link
                  key={key}
                  href={n.metaHref}
                  role="menuitem"
                  className={cn(
                    "px-2 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 hover:bg-white/10",
                    unread && "bg-white/[0.02]"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={key}
                  role="menuitem"
                  className={cn(
                    "text-left w-full px-2 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 hover:bg-white/10",
                    unread && "bg-white/[0.02]"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {content}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          {(footer.length > 0 || allHref) && (
            <div className="mt-2">
              {footer.map((f, i) =>
                f.type === "separator" ? (
                  <div key={`sep-${i}`} className="my-2 h-px bg-white/10" />
                ) : (
                  <button
                    key={f.label + i}
                    role="menuitem"
                    className={cn(
                      "w-full flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-white/90 hover:bg-white/10 focus:ring-2 focus:ring-white/30 outline-none",
                      f.danger && "text-red-300 hover:bg-red-500/10"
                    )}
                    onClick={async () => {
                      await f.onClick();
                      setOpen(false);
                    }}
                  >
                    {f.icon}
                    <span>{f.label}</span>
                  </button>
                )
              )}

              {allHref && (
                <Link
                  href={allHref}
                  role="menuitem"
                  className="block text-center text-sm text-brand-4 hover:underline mt-1 px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                  onClick={() => setOpen(false)}
                >
                  All Notifications
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
