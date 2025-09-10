"use client";

import { DropdownOption, DropdownProps } from "@/interface";
import { cn } from "@/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Dropdown<TValue = string>({
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled,
  className,
  buttonClassName,
  panelClassName,
  optionClassName,
  matchButtonWidth = true,
  renderOption,
}: DropdownProps<TValue>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const selectedIndex = useMemo(
    () => (value ? options.findIndex((o) => o.value === value.value) : -1),
    [value, options]
  );

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Move active item into view when navigating with arrows
  useEffect(() => {
    if (!listRef.current || activeIndex < 0) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-index='${activeIndex}']`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const toggle = () => !disabled && setOpen((p) => !p);
  const close = () => setOpen(false);

  const visibleLabel = value?.label ?? placeholder;

  // Keyboard interactions on the button
  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    switch (e.key) {
      case " ":
      case "Enter":
      case "ArrowDown":
        e.preventDefault();
        setOpen(true);
        setActiveIndex(
          selectedIndex >= 0 ? selectedIndex : nextEnabledIndex(options, -1)
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setOpen(true);
        setActiveIndex(
          selectedIndex >= 0 ? selectedIndex : prevEnabledIndex(options, options.length)
        );
        break;
    }
  };

  // Keyboard interactions on the listbox
  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((idx) => nextEnabledIndex(options, idx));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((idx) => prevEnabledIndex(options, idx));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(nextEnabledIndex(options, -1));
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(prevEnabledIndex(options, options.length));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0) {
          const opt = options[activeIndex];
          if (!opt.disabled) select(opt);
        }
        break;
      case "Escape":
        e.preventDefault();
        close();
        buttonRef.current?.focus();
        break;
    }
  };

  function select(opt: DropdownOption<TValue>) {
    onChange(opt);
    close();
    buttonRef.current?.focus();
  }

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          "flex items-center justify-between gap-2 rounded-[8px] border border-white/10 bg-white/10 px-4 py-[7px] text-sm text-light outline-0 placeholder:text-lighter focus:border-neutral disabled:opacity-50 w-50 cursor-pointer",
          buttonClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="dropdown-listbox"
        onClick={toggle}
        onKeyDown={onButtonKeyDown}
        disabled={!!disabled}
      >
        <span className={cn(!value && "text-lighter")}>{visibleLabel}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div
          ref={listRef}
          id="dropdown-listbox"
          role="listbox"
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className={cn(
            "absolute z-30 mt-2 max-h-56 custom-scrollbar overflow-auto rounded-[8px] p-2 text-light shadow-lg focus:outline-none bg-base-900 border border-white/10",
            matchButtonWidth && "min-w-[var(--btn-w)] custom-scrollbar",
            panelClassName
          )}
          style={{
            // Use CSS var to match button width when enabled
            // @ts-expect-error -- non-standard custom property type
            "--btn-w": matchButtonWidth
              ? `${buttonRef.current?.offsetWidth ?? 0}px`
              : undefined,
          }}
        >
          <div className="flex flex-col gap-1">
            {options.map((opt, i) => {
              const isSelected = value?.value === opt.value;
              return (
                <button
                  key={/* (opt.value as unknown as string) ?? */ i}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-index={i}
                  disabled={opt.disabled}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-1 text-left text-sm hover:bg-white/10 focus:bg-white/10 focus:outline-none",
                    isSelected && "bg-white/10",
                    opt.disabled && "opacity-50 cursor-not-allowed",
                    optionClassName
                  )}
                  onClick={() => !opt.disabled && select(opt)}
                >
                  <span className="truncate">
                    {renderOption ? renderOption(opt, isSelected) : opt.label}
                  </span>
                  {isSelected && <Check className="h-4 w-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helpers ---
function nextEnabledIndex<T>(opts: DropdownOption<T>[], from: number) {
  for (let i = from + 1; i < opts.length; i++) if (!opts[i].disabled) return i;
  // wrap
  for (let i = 0; i <= from && i < opts.length; i++) if (!opts[i].disabled) return i;
  return from;
}
function prevEnabledIndex<T>(opts: DropdownOption<T>[], from: number) {
  for (let i = from - 1; i >= 0; i--) if (!opts[i].disabled) return i;
  // wrap
  for (let i = opts.length - 1; i >= from && i >= 0; i--) if (!opts[i].disabled) return i;
  return from;
}
