"use client";
import { useSetSearchParams } from "@/hooks";
import { Pagination } from "@/components";

const QueryPagination = ({ totalDoc }: { totalDoc: number }) => {
  const { updateSearchParams } = useSetSearchParams();
  return (
    <div className="mt-[20px] pb-[20px]">
      <Pagination
        totalDocs={totalDoc}
        limit={10}
        onPageChange={(page) => updateSearchParams({ page: String(page) })}
      />
    </div>
  );
};

export default QueryPagination;
