"use client";

import { useState, useMemo, useCallback } from "react";
import {
  useGetUnavailableDatesQuery,
  useCreateUnavailableDatesMutation,
  useDeleteUnavailableDatesMutation,
} from "@/redux/features/artist/availability.api";
import { IQueryMutationErrorResponse, IUnavailableDates } from "@/interface";
import { toast } from "sonner";

const formatDisplayDate = (iso: string) => new Date(iso).toLocaleDateString();
const todayISO = () => new Date().toISOString().slice(0, 10);

export default function UnavailableDates() {
  const { data, isLoading, isFetching } = useGetUnavailableDatesQuery();
  const unavailableDates = data?.data || [];
  const [createUnavailableDates, { isLoading: isCreating }] =
    useCreateUnavailableDatesMutation();
  const [deleteUnavailableDates, { isLoading: isDeleting }] =
    useDeleteUnavailableDatesMutation();

  const [start, setStart] = useState<string>(todayISO());
  const [end, setEnd] = useState<string>(todayISO());
  const [allowAllBuyersContact, setAllowAllBuyersContact] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isBusy = isCreating || isDeleting || isFetching || isLoading;

  const canSubmit = useMemo(() => {
    if (!start || !end) return false;
    return new Date(start) <= new Date(end);
  }, [start, end]);

  const onAdd = useCallback(async () => {
    setError(null);
    if (!canSubmit) {
      setError("Start date must be before or equal to end date.");
      return;
    }

    const res = await createUnavailableDates({
      startTime: start,
      endTime: end,
    });
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error(error.data.message || "Something went wrong");
      return;
    }

    // Reset form to a sensible default
    setStart(todayISO());
    setEnd(todayISO());
  }, [canSubmit, start, end, createUnavailableDates]);

  const handleDelete = async (_id: IUnavailableDates["_id"]) => {
    const res = await deleteUnavailableDates(_id);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error(error.data.message || "Something went wrong");
      return;
    }

    toast.success("Unavailable date deleted successfully");
  };

  return (
    <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-4/8 to-brand-1/10 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">Schedule Unavailable Dates</h3>
        {isBusy && (
          <span className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10">
            Updating…
          </span>
        )}
      </div>

      <div className="card p-5 grid sm:grid-cols-4 gap-3 mt-3">
        <div>
          <label className="text-sm text-white/60">Start</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            min={todayISO()}
            className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            disabled={isBusy}
          />
        </div>
        <div>
          <label className="text-sm text-white/60">End</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            min={start || todayISO()}
            className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            disabled={isBusy}
          />
        </div>

        {/* Toggle: All buyers can contact me */}
        <div className="flex flex-col justify-end">
          <label className="text-sm text-white/60 mb-1">All buyers can contact me</label>
          <button
            type="button"
            onClick={() => setAllowAllBuyersContact((v) => !v)}
            className={`relative inline-flex h-9 w-16 items-center rounded-full transition outline-none border border-white/10 ${
              allowAllBuyersContact ? "bg-green-500/60" : "bg-white/10"
            }`}
            disabled={isBusy}
            aria-pressed={allowAllBuyersContact}
            aria-label="Toggle allow all buyers to contact"
          >
            <span
              className={`inline-block h-7 w-7 transform rounded-full bg-white shadow transition ${
                allowAllBuyersContact ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-end">
          <button
            onClick={onAdd}
            disabled={!canSubmit || isBusy}
            className={`w-full btn-secondary ${(!canSubmit || isBusy) && "opacity-60 cursor-not-allowed"}`}
          >
            {isCreating ? "Adding…" : "Add Unavailable Dates"}
          </button>
        </div>

        {error && <div className="sm:col-span-4 text-red-300 text-sm mt-1">{error}</div>}
      </div>

      {/* Existing Unavailable Dates */}
      <div className="mt-6">
        <h4 className="text-base font-medium mb-2">Existing</h4>

        {isLoading ? (
          <div className="text-white/70 text-sm">Loading…</div>
        ) : unavailableDates.length === 0 ? (
          <div className="text-white/60 text-sm">No unavailable dates yet.</div>
        ) : (
          <ul className="space-y-3">
            {unavailableDates.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between border border-white/10 rounded-xl p-4 bg-white/5"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {formatDisplayDate(item.startTime)} →{" "}
                    {formatDisplayDate(item.endTime)}
                  </span>
                  {allowAllBuyersContact && (
                    <span className="text-xs text-white/60 mt-0.5">
                      All buyers can contact during this period
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className={`btn-outline px-3 py-1.5 rounded-lg border border-white/20 ${
                    isDeleting && "opacity-60 cursor-wait"
                  }`}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting…" : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
