"use client";

import { useGetMyNotificationStatsQuery } from "@/redux/features/notification/notification.api";
import { cn } from "@/utils";
import { Bell } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import NotificationDropdownList from "./NotificationDropdownList";

export type ButtonItem = {
  type: "button";
  label: string;
  onClick: () => void | Promise<void>;
  icon?: React.ReactNode;
  danger?: boolean;
};

export type SeparatorItem = { type: "separator" };
export type FooterEntry = ButtonItem | SeparatorItem;

export type NotificationDropdownProps = {
  align?: "left" | "right";
  className?: string;
  buttonClassName?: string;
  open?: boolean; // controlled open
  onOpenChange?: (open: boolean) => void;
};

export default function NotificationDropdown({
  align = "right",
  className,
  buttonClassName,
  open,
  onOpenChange,
}: NotificationDropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? (open as boolean) : internalOpen;

  const { data, refetch } = useGetMyNotificationStatsQuery(undefined);

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

  const unreadCount = data?.data?.unreadCount;

  useEffect(() => {
    if (!isOpen) return;

    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [isOpen, setOpen]);

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
          "relative h-10 w-10 rounded-full flex items-center justify-center bg-white/10 text-white/80 hover:bg-white/15 focus:ring-2 focus:ring-white/30 outline-none cursor-pointer",
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

      <NotificationDropdownList
        onNewNotification={() => refetch()}
        align={align}
        menuId={menuId}
        isOpen={isOpen}
        setIsOpen={setOpen}
      />
    </div>
  );
}
