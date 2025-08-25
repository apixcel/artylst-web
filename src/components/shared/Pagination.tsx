export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  className?: string;
  labels?: {
    prev?: string;
    next?: string;
    page?: (n: number) => string;
    pagination?: string;
  };
  disablePrevNext?: boolean;
};

// Utility: clamp
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// Build page items with ellipses. Returns array of numbers and the string '…'.
function buildPages(
  current: number,
  total: number,
  siblingCount: number,
  boundaryCount: number
): (number | "…")[] {
  const pages: (number | "…")[] = [];

  const startPages = Array.from(
    { length: Math.min(boundaryCount, total) },
    (_, i) => i + 1
  );
  const endPages = Array.from(
    { length: Math.min(boundaryCount, total) },
    (_, i) => total - Math.min(boundaryCount, total) + 1 + i
  );

  const leftSiblingStart = clamp(current - siblingCount, 1, total);
  const rightSiblingEnd = clamp(current + siblingCount, 1, total);

  const middleStart = Math.max(leftSiblingStart, Math.max(...startPages, 0) + 1);
  const middleEnd = Math.min(rightSiblingEnd, Math.min(...endPages, Infinity) - 1);

  // Merge start pages
  pages.push(...startPages);

  // Insert left ellipsis if needed
  if (middleStart > (startPages[startPages.length - 1] ?? 0) + 1) pages.push("…");

  // Insert middle pages
  for (let i = middleStart; i <= middleEnd; i++) pages.push(i);

  // Insert right ellipsis if needed
  if ((endPages[0] ?? Infinity) > middleEnd + 1) pages.push("…");

  // Merge end pages
  for (const p of endPages) if (!pages.includes(p)) pages.push(p);

  // Deduplicate & sort while preserving ellipses order
  const dedup: (number | "…")[] = [];
  let lastAdded: number | "…" | null = null;
  for (const item of pages) {
    if (item === "…") {
      if (lastAdded !== "…") {
        dedup.push("…");
        lastAdded = "…";
      }
    } else {
      if (!dedup.includes(item)) dedup.push(item);
      lastAdded = item;
    }
  }
  return dedup;
}

const srOnly = "sr-only"; // assumes Tailwind's sr-only utility

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  className = "",
  labels = {
    prev: "« Prev",
    next: "Next »",
    page: (n: number) => `Page ${n}`,
    pagination: "Pagination",
  },
  disablePrevNext = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const page = clamp(currentPage, 1, totalPages);
  const items = buildPages(page, totalPages, siblingCount, boundaryCount);

  const goTo = (n: number) => {
    const next = clamp(n, 1, totalPages);
    if (next !== page) onPageChange(next);
  };

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav
      aria-label={labels.pagination}
      className={`mt-6 flex items-center justify-center gap-2 ${className}`}
    >
      {!disablePrevNext && (
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => goTo(page - 1)}
          disabled={!canPrev}
          aria-disabled={!canPrev}
          aria-label="Go to previous page"
        >
          {labels.prev}
        </button>
      )}

      {items.map((item, idx) =>
        item === "…" ? (
          <span
            key={`dots-${idx}`}
            className="text-white/50 text-sm select-none"
            aria-hidden
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => goTo(item)}
            aria-current={item === page ? "page" : undefined}
            aria-label={`${labels.page?.(item)}`}
            className={
              item === page ? "chip ring-2 ring-white/40" : "chip hover:opacity-90"
            }
          >
            <span className={srOnly}>
              {item === page ? "Current page" : "Go to page"}
            </span>
            {item}
          </button>
        )
      )}

      {!disablePrevNext && (
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => goTo(page + 1)}
          disabled={!canNext}
          aria-disabled={!canNext}
          aria-label="Go to next page"
        >
          {labels.next}
        </button>
      )}
    </nav>
  );
}
