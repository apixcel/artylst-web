"use client";

import DialogProvider from "@/components/ui/DialogProvider";
import { IQueryMutationErrorResponse, IUnavailableDates } from "@/interface";
import { useDeleteUnavailableDatesMutation } from "@/redux/features/artist/availability.api";
import { cn } from "@/utils";
import { useState } from "react";
import { toast } from "sonner";

const DeleteUnavailableDateById = ({ _id }: { _id: IUnavailableDates["_id"] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [deleteUnavailableDates, { isLoading: isDeleting }] =
    useDeleteUnavailableDatesMutation();

  const handleDelete = async (_id: IUnavailableDates["_id"]) => {
    const res = await deleteUnavailableDates(_id);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
      return;
    }
    toast.success("Unavailable date deleted successfully");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "btn-outline bg-error px-3 cursor-pointer py-1.5 rounded-lg border border-white/20"
        )}
        disabled={isDeleting}
      >
        Delete
      </button>

      {/* Delete Dialog */}
      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="max-w-[450px] w-full"
      >
        <div className="p-4 space-y-4 bg-white/10 backdrop-blur-2xl rounded-[8px] w-full">
          <h3 className="text-lg font-semibold">Delete Unavailable Date</h3>
          <p className="text-sm text-muted">
            Are you sure you want to delete this unavailable date?
          </p>

          <div className="flex justify-end gap-2">
            <button onClick={() => setIsOpen(false)} className="btn cursor-pointer">
              Cancel
            </button>
            <button
              onClick={() => handleDelete(_id)}
              disabled={isDeleting}
              className={cn(
                "btn btn-sm btn-danger cursor-pointer disabled:cursor-wait disabled:opacity-50"
              )}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default DeleteUnavailableDateById;
