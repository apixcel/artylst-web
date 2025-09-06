"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

/* -------------------------------------------------------
 * Types
 * -----------------------------------------------------*/
export type FAQItem = { q: string; a: string };

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

interface FAQProps {
  items: FAQItem[];

  /**
   * Columns to render.
   * - 1: always one column
   * - 2: two columns (optionally responsive)
   */
  columns?: 1 | 2;

  /**
   * If columns=2, use one column below this breakpoint (e.g. `md` -> 1 col on mobile, 2 cols >= md).
   * Ignored when columns=1.
   */
  breakpoint?: Breakpoint;

  /**
   * Single item open at a time (accordion) vs. multiple items can be open.
   */
  singleOpen?: boolean;

  /**
   * Uncontrolled defaults
   */
  defaultOpenIndex?: number | null; // for singleOpen mode
  defaultOpenSet?: number[]; // for multi-open mode

  /**
   * Controlled props (optional)
   */
  openIndex?: number | null; // singleOpen mode
  onOpenIndexChange?: (index: number | null) => void;

  openSet?: Set<number>; // multi-open mode
  onOpenSetChange?: (set: Set<number>) => void;

  className?: string;
  heading?: React.ReactNode; // Optional heading node
}

/* -------------------------------------------------------
 * Component
 * -----------------------------------------------------*/
export default function FAQ({
  items,
  columns = 2,
  breakpoint = "md",
  singleOpen = true,
  defaultOpenIndex = null,
  defaultOpenSet = [],
  openIndex: controlledOpenIndex,
  onOpenIndexChange,
  openSet: controlledOpenSet,
  onOpenSetChange,
  className,
  heading = <h2 className="text-2xl font-semibold tracking-tight mb-4">FAQs</h2>,
}: FAQProps) {
  // ----- state (controlled/uncontrolled) -----
  const isControlledSingle = singleOpen && controlledOpenIndex !== undefined;
  const isControlledMulti = !singleOpen && controlledOpenSet !== undefined;

  const [uncontrolledOpenIndex, setUncontrolledOpenIndex] = React.useState<number | null>(
    defaultOpenIndex ?? null
  );

  const [uncontrolledOpenSet, setUncontrolledOpenSet] = React.useState<Set<number>>(
    new Set(defaultOpenSet)
  );

  const openIndex = isControlledSingle ? controlledOpenIndex! : uncontrolledOpenIndex;
  const openSet = isControlledMulti ? controlledOpenSet! : uncontrolledOpenSet;

  const setOpenIndex = (idx: number | null) => {
    if (isControlledSingle) onOpenIndexChange?.(idx);
    else setUncontrolledOpenIndex(idx);
  };

  const setOpenSet = (next: Set<number>) => {
    if (isControlledMulti) onOpenSetChange?.(next);
    else setUncontrolledOpenSet(new Set(next));
  };

  // ----- layout helpers -----
  const gridClass =
    columns === 1
      ? "grid grid-cols-1"
      : clsx(
          "grid",
          // one column by default, 2 columns at breakpoint and up
          `grid-cols-1`,
          `${breakpoint}:grid-cols-2`
        );

  const [left, right] = React.useMemo(() => {
    if (columns === 1) return [items, [] as FAQItem[]];
    const mid = Math.ceil(items.length / 2);
    return [items.slice(0, mid), items.slice(mid)];
  }, [items, columns]);

  // ----- toggle handlers -----
  const handleToggleSingle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleToggleMulti = (idx: number) => {
    const next = new Set(openSet);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setOpenSet(next);
  };

  const isOpen = (idx: number) => (singleOpen ? openIndex === idx : openSet.has(idx));

  // ----- render -----
  return (
    <section className={clsx("w-full max-w-5xl mx-auto mb-[60px]", className)}>
      {heading}

      <div className={clsx(gridClass, "gap-2", `${breakpoint}:gap-6`)}>
        {/* Column 1 */}
        <div className="flex flex-col gap-2">
          {left.map((item, idx) => (
            <AccordionItem
              key={idx}
              open={isOpen(idx)}
              onToggle={() =>
                singleOpen ? handleToggleSingle(idx) : handleToggleMulti(idx)
              }
              question={item.q}
              answer={item.a}
              index={idx}
            />
          ))}
        </div>

        {/* Column 2 (only if columns === 2) */}
        {columns === 2 && (
          <div className="flex flex-col gap-2">
            {right.map((item, rIdx) => {
              const idx = rIdx + left.length; // unique index across both columns
              return (
                <AccordionItem
                  key={idx}
                  open={isOpen(idx)}
                  onToggle={() =>
                    singleOpen ? handleToggleSingle(idx) : handleToggleMulti(idx)
                  }
                  question={item.q}
                  answer={item.a}
                  index={idx}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------
 * Item
 * -----------------------------------------------------*/
function AccordionItem({
  question,
  answer,
  open,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const id = slugify(`${index}-${question}`);

  return (
    <div className="bg-white/10 rounded-lg">
      <button
        onClick={onToggle}
        className="font-logam w-full text-base flex gap-3 px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
        aria-expanded={open}
        aria-controls={id}
      >
        <ChevronRight
          className={clsx(
            "h-4 w-4 shrink-0 mt-[4px] transition-transform duration-300",
            open ? "rotate-90" : "rotate-0"
          )}
          aria-hidden="true"
        />
        <span className="font-medium text-[16px]">{question}</span>
      </button>

      <div
        id={id}
        role="region"
        aria-hidden={!open}
        className={clsx(
          "grid overflow-hidden px-11 transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr] pb-0"
        )}
      >
        <div className="min-h-0">
          <p
            className={clsx(
              "leading-relaxed text-muted text-base transition-opacity duration-300",
              open ? "opacity-100" : "opacity-0"
            )}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
 * Utils
 * -----------------------------------------------------*/
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* -------------------------------------------------------
 * Example usage
 * -----------------------------------------------------*/
// const faqs: FAQItem[] = [
//   { q: "Which platforms do you support?", a: "Spotify, Apple Music..." },
//   // ...
// ];

// 1) Responsive two-column (1 col < md, 2 cols ≥ md)
// <FAQ items={faqs} columns={2} breakpoint="md" />

// 2) Force one column everywhere
// <FAQ items={faqs} columns={1} />

// 3) Multi-open behavior (allow multiple items open)
// <FAQ items={faqs} columns={2} singleOpen={false} defaultOpenSet={[0, 2]} />

// 4) Controlled single-open
// const [open, setOpen] = useState<number | null>(0);
// <FAQ items={faqs} columns={2} openIndex={open} onOpenIndexChange={setOpen} />
