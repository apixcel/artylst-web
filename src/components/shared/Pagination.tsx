"use client";
import React, { useMemo } from "react";
import { MoreHorizontal } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

// Types
export interface PaginationProps {
  totalDocs: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  showText?: boolean;
  textClassName?: string;
  page?: number;
  setPage?: (page: number) => void;
  // Optional tuning knobs (defaults mimic your reference)
  siblingCount?: number; // how many pages on each side of current
  boundaryCount?: number; // pages always shown at the edges
}

interface PaginationTextProps {
  currentPage: number;
  limit: number;
  totalDocs: number;
  className?: string;
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// Build pages with consistent slot count (<=7 total when small sets; 6 slots when large sets)
function buildPages(
  current: number,
  total: number,
  siblingCount: number,
  boundaryCount: number
): (number | "...")[] {
  // Small totals: show all
  if (total <= boundaryCount * 2 + siblingCount * 2 + 3) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const startPages = Array.from({ length: boundaryCount }, (_, i) => i + 1); // e.g., [1]
  const endPages = Array.from(
    { length: boundaryCount },
    (_, i) => total - boundaryCount + 1 + i
  ); // e.g., [total]

  const left = clamp(current - siblingCount, 1, total);
  const right = clamp(current + siblingCount, 1, total);

  const middleStart = Math.max(left, startPages[startPages.length - 1] + 1);
  const middleEnd = Math.min(right, endPages[0] - 1);

  const pages: (number | "...")[] = [...startPages];

  if (middleStart > startPages[startPages.length - 1] + 1) pages.push("...");

  for (let i = middleStart; i <= middleEnd; i++) pages.push(i);

  if (endPages[0] > middleEnd + 1) pages.push("...");

  for (const p of endPages) if (!pages.includes(p)) pages.push(p);

  // Guarantee a consistent number of center slots (when total is large) so width doesn’t change.
  // Target layout (when total > small cutoff): [1, '…', X, Y, Z, '…', total] => 6 slots max.
  // If we ended up with only 5 (near edges), pad by pulling one more neighbor to keep 6.
  if (total > boundaryCount * 2 + siblingCount * 2 + 3) {
    // Count how many slots we have excluding prev/next; we want 6 when big
    const targetSlots = 6;
    // Ellipses positions
    const hasLeftDots = pages[1] === "...";
    const hasRightDots = pages[pages.length - 2] === "...";

    const work = [...pages];

    const count = work.length;
    if (count < targetSlots) {
      // Pad from the closest edge (start if no left dots; else end)
      if (!hasLeftDots) {
        // near the start, extend middle forward
        const lastNum = (work[work.length - 1] as number) - 1; // number before 'total'
        const beforeEnd = hasRightDots
          ? (work[work.length - 3] as number)
          : (work[work.length - 2] as number);
        const next = clamp(beforeEnd + 1, 2, total - 1);
        if (!Number.isNaN(next) && !work.includes(next)) {
          if (hasRightDots) {
            // insert before right dots
            work.splice(work.length - 2, 0, next);
          } else {
            // insert before endPages
            work.splice(work.length - 1, 0, next > lastNum ? lastNum : next);
          }
        }
      } else if (!hasRightDots) {
        // near the end, extend middle backward
        const firstNum = (work[0] as number) + 1; // number after '1'
        const afterStart = hasLeftDots ? (work[2] as number) : (work[1] as number);
        const prev = clamp(afterStart - 1, 2, total - 1);
        if (!Number.isNaN(prev) && !work.includes(prev)) {
          if (hasLeftDots) {
            // insert after left dots
            work.splice(2, 0, prev < firstNum ? firstNum : prev);
          } else {
            // insert after startPages
            work.splice(1, 0, prev);
          }
        }
      }
    }

    return work;
  }

  return pages;
}

// Text Component
function PaginationText({
  currentPage,
  limit,
  totalDocs,
  className,
}: PaginationTextProps) {
  const start = Math.min((currentPage - 1) * limit + 1, totalDocs);
  const end = Math.min(currentPage * limit, totalDocs);

  return (
    <p className={twMerge("text-sm text-primary", className)}>
      Showing <span className="font-medium">{start}</span> to{" "}
      <span className="font-medium">{end}</span> of{" "}
      <span className="font-medium">{totalDocs}</span> items
    </p>
  );
}

// Main Pagination Component
function Pagination({
  totalDocs,
  limit = 10,
  onPageChange,
  className,
  showText = true,
  textClassName,
  page,
  setPage,
  siblingCount = 1,
  boundaryCount = 1,
}: PaginationProps) {
  const totalPages = Math.ceil(totalDocs / limit);
  const [curPage, setCurPage] = React.useState(1);

  const currentPage = page ?? curPage;
  const setCurrentPage = setPage ?? setCurPage;

  const pages = useMemo(() => {
    return buildPages(currentPage, totalPages, siblingCount, boundaryCount);
  }, [currentPage, totalPages, siblingCount, boundaryCount]);

  const handlePageChange = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    onPageChange?.(p);
  };

  if (totalPages <= 1) return null;

  // ===== Fixed width handling =====
  // When totalPages > 7-ish, our layout uses 6 slots: [1, …, mid, mid, mid, …, total]
  // Otherwise slots = totalPages (all numbers, no dots)
  const maxSlots = totalPages > boundaryCount * 2 + siblingCount * 2 + 3 ? 6 : totalPages;

  // Button geometry: keep widths IDENTICAL for numbers and ellipses
  // (Use same size on all breakpoints to avoid jumps.)
  const BTN = 40; // px
  const GAP = 4; // px (space-x-1)
  const minGroupWidth = maxSlots * BTN + (maxSlots - 1) * GAP;

  return (
    <div className="space-y-4">
      {showText && (
        <PaginationText
          currentPage={currentPage}
          limit={limit}
          totalDocs={totalDocs}
          className={textClassName}
        />
      )}
      <nav
        className={twMerge("flex items-center justify-center space-x-2", className)}
        aria-label="Pagination"
      >
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          className="cursor-pointer"
          aria-label="Previous page"
          disabled={currentPage <= 1}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Fixed-width group */}
        <div
          className="flex items-center space-x-1 tabular-nums"
          style={{ minWidth: `${minGroupWidth}px` }}
        >
          {pages.map((p, index) => {
            if (p === "...") {
              // Ellipsis takes the SAME width as a number button
              return (
                <button
                  type="button"
                  key={`ellipsis-${index}`}
                  className="h-10 w-10 cursor-default border-[1px] border-border-muted grid place-items-center rounded-xl"
                  aria-hidden
                  tabIndex={-1}
                  disabled
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              );
            }

            const pageNumber = p as number;
            const isActive = currentPage === pageNumber;

            return (
              <button
                type="button"
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                aria-current={isActive ? "page" : undefined}
                className={twMerge(
                  "grid place-items-center h-10 w-10 cursor-pointer border-[1px] border-border-muted rounded-xl",
                  isActive ? "bg-primary text-white" : "hover:opacity-90"
                )}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          className="cursor-pointer"
          aria-label="Next page"
          disabled={currentPage >= totalPages}
        >
          <ArrowRight size={20} />
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
