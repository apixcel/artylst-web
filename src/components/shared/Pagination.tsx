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
}

interface PaginationTextProps {
  currentPage: number;
  limit: number;
  totalDocs: number;
  className?: string;
}

// Text Component
const PaginationText = ({
  currentPage,
  limit,
  totalDocs,
  className,
}: PaginationTextProps) => {
  const start = Math.min((currentPage - 1) * limit + 1, totalDocs);
  const end = Math.min(currentPage * limit, totalDocs);

  return (
    <p className={twMerge("text-sm text-primary", className)}>
      Showing <span className="font-medium">{start}</span> to{" "}
      <span className="font-medium">{end}</span> of{" "}
      <span className="font-medium">{totalDocs}</span> items
    </p>
  );
};

const Pagination = ({
  totalDocs,
  limit = 10,
  onPageChange,
  className,
  showText = true,
  textClassName,
  page,
  setPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalDocs / limit);
  const [curPage, setCurPage] = React.useState(1);

  const currentPage = page || curPage;
  const setCurrentPage = setPage || setCurPage;

  const pages = useMemo(() => {
    const items: (number | string)[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    items.push(1);

    if (currentPage > 3) {
      items.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (currentPage < totalPages - 2) {
      items.push("...");
    }

    items.push(totalPages);

    return items;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  if (totalPages <= 1) return null;

  if (totalPages <= 1) return null;

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
        className={twMerge("flex items-center justify-center space-x-4", className)}
        aria-label="Pagination"
      >
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          className="cursor-pointer hover:text-brand-4 disabled:text-muted border-white/20 "
          aria-label="Previous page"
          disabled={currentPage <= 1}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Fixed-width group */}
        <div className="flex items-center space-x-1 tabular-nums">
          {pages.map((p, index) => {
            if (p === "...") {
              return (
                <button
                  type="button"
                  key={`ellipsis-${index}`}
                  className="h-10 w-10 border-[1px] border-white/20 grid place-items-center rounded-xl cursor-pointer"
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
                  "grid place-items-center h-10 w-10 cursor-pointer border-[1px] border-white/20 rounded-xl",
                  isActive ? "bg-brand-4/10 text-brand-4" : "hover:opacity-90"
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
          className="cursor-pointer hover:text-brand-4 disabled:text-muted"
          aria-label="Next page"
          disabled={currentPage >= totalPages}
        >
          <ArrowRight size={20} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
