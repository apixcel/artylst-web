"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";

// --- Types ---
export type DropdownOption<TValue = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

export type MultiDropdownProps<TValue = string> = {
  values: DropdownOption<TValue>[]; // controlled selection
  options: DropdownOption<TValue>[];
  onChange: (values: DropdownOption<TValue>[]) => void; // returns array
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  panelClassName?: string;
  optionClassName?: string;
  matchButtonWidth?: boolean; // match panel width to button
  renderOption?: (option: DropdownOption<TValue>, isSelected: boolean) => React.ReactNode;
  renderTag?: (option: DropdownOption<TValue>) => React.ReactNode; // chip renderer
  maxTagCount?: number; // how many chips to show on the button before "+N"
  showControls?: boolean; // show Select all / Clear
};

// --- Utility ---
function cn(...args: Array<string | undefined | false | null>) {
  return args.filter(Boolean).join(" ");
}

function uniqByValue<T>(arr: DropdownOption<T>[]) {
  const map = new Map<DropdownOption<T>["value"], DropdownOption<T>>();
  for (const item of arr) if (!map.has(item.value)) map.set(item.value, item);
  return Array.from(map.values());
}

export default function MultiDropdown<TValue = string>({
  values,
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
  renderTag,
  maxTagCount = 2,
  showControls = true,
}: MultiDropdownProps<TValue>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const valueSet = useMemo(() => new Set(values.map((v) => v.value)), [values]);

  const selectedIndices = useMemo(
    () =>
      values
        .map((v) => options.findIndex((o) => o.value === v.value))
        .filter((i) => i >= 0),
    [values, options]
  );

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
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

  // Button label content
  const btnContent = useMemo(() => {
    if (!values.length) return <span className="text-lighter">{placeholder}</span>;
    const tags = values.slice(0, maxTagCount);
    const extra = values.length - tags.length;
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {tags.map((opt) => (
          <span
            key={String(opt.value)}
            className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs"
          >
            {renderTag ? renderTag(opt) : opt.label}
            <button
              type="button"
              aria-label={`Remove ${opt.label}`}
              className="focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                deselect(opt);
              }}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {extra > 0 && <span className="text-xs text-lighter">+{extra} more</span>}
      </div>
    );
  }, [values, placeholder, maxTagCount, renderTag]);

  // Keyboard interactions on the button
  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    switch (e.key) {
      case " ":
      case "Enter":
      case "ArrowDown": {
        e.preventDefault();
        setOpen(true);
        setActiveIndex(
          selectedIndices.length ? selectedIndices[0] : nextEnabledIndex(options, -1)
        );
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        setOpen(true);
        setActiveIndex(
          selectedIndices.length
            ? selectedIndices[selectedIndices.length - 1]
            : prevEnabledIndex(options, options.length)
        );
        break;
      }
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
          if (!opt.disabled) toggleSelect(opt);
        }
        break;
      case "Escape":
        e.preventDefault();
        close();
        buttonRef.current?.focus();
        break;
    }
  };

  function toggleSelect(opt: DropdownOption<TValue>) {
    if (valueSet.has(opt.value)) {
      onChange(values.filter((v) => v.value !== opt.value));
    } else {
      const next = uniqByValue([...values, opt]);
      // Maintain option order based on options list
      next.sort(
        (a, b) =>
          options.findIndex((o) => o.value === a.value) -
          options.findIndex((o) => o.value === b.value)
      );
      onChange(next);
    }
  }

  function deselect(opt: DropdownOption<TValue>) {
    if (!valueSet.has(opt.value)) return;
    onChange(values.filter((v) => v.value !== opt.value));
  }

  function clearAll() {
    onChange([]);
  }

  function selectAll() {
    const enabled = options.filter((o) => !o.disabled);
    onChange(enabled);
  }

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <div
        ref={buttonRef as unknown as React.RefObject<HTMLDivElement>}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={!!disabled}
        className={cn(
          "flex items-center justify-between gap-2 rounded-[8px] border border-white/10 bg-white/10 px-4 py-[7px] text-sm text-light outline-0 placeholder:text-lighter focus:border-neutral data-[disabled=true]:opacity-50 min-w-50",
          buttonClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="multiselect-listbox"
        onClick={toggle}
        onKeyDown={onButtonKeyDown}
        data-disabled={!!disabled}
      >
        <span className={cn(!values.length && "text-lighter", "truncate max-w-[220px]")}>
          {btnContent}
        </span>
        <ChevronDown className="h-4 w-4" />
      </div>

      {open && (
        <div
          ref={listRef}
          id="multiselect-listbox"
          role="listbox"
          aria-multiselectable
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className={cn(
            "absolute z-30 mt-2 max-h-56 overflow-auto rounded-[8px] p-2 text-light shadow-lg focus:outline-none bg-base-900 border border-white/10",
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
          {showControls && (
            <div className="flex items-center justify-between gap-2 px-2 py-1 mb-1 text-xs text-lighter">
              <button
                type="button"
                className="rounded px-2 py-1 hover:bg-white/10"
                onClick={selectAll}
              >
                Select all
              </button>
              <button
                type="button"
                className="rounded px-2 py-1 hover:bg-white/10"
                onClick={clearAll}
              >
                Clear
              </button>
            </div>
          )}

          <div className="flex flex-col gap-1">
            {options.map((opt, i) => {
              const isSelected = valueSet.has(opt.value);
              return (
                <button
                  key={(opt.value as unknown as string) ?? i}
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
                  onClick={() => !opt.disabled && toggleSelect(opt)}
                >
                  <span className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="h-3.5 w-3.5 rounded accent-brand-4"
                    />
                    <span className="truncate">
                      {renderOption ? renderOption(opt, isSelected) : opt.label}
                    </span>
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
