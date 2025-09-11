"use client";

import { useState, useMemo, useCallback } from "react";
import {
  useGetUnavailableDatesQuery,
  useCreateUnavailableDatesMutation,
} from "@/redux/features/artist/availability.api";
import { IQueryMutationErrorResponse, IUnavailableDates } from "@/interface";
import { toast } from "sonner";
import { cn } from "@/utils";

import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DeleteUnavailableDateById from "./DeleteUnavailableDateById";

const keepTimeOnlyIfMidnight = (
  next: DateObject | Date | string | null,
  prev: DateObject | null
) => {
  if (!next) return prev;

  const n =
    next instanceof DateObject
      ? typeof (next as DateObject & { clone?: () => DateObject }).clone === "function"
        ? (next as DateObject & { clone: () => DateObject }).clone()
        : new DateObject((next as DateObject).toDate())
      : new DateObject(next);

  if (!prev) return n;

  const isMidnight =
    (n.hour ?? 0) === 0 &&
    (n.minute ?? 0) === 0 &&
    (n.second ?? 0) === 0 &&
    (n.millisecond ?? 0) === 0;

  if (!isMidnight) {
    return n;
  }

  const withPrevTime = new DateObject(n.toDate()).set({
    hour: prev.hour ?? 0,
    minute: prev.minute ?? 0,
    second: prev.second ?? 0,
    millisecond: prev.millisecond ?? 0,
  });

  return withPrevTime;
};

// helper: JS Date → UTC ISO string (Z)
const toUTCISOString = (d?: Date) => (d ? new Date(d).toISOString() : "");

// Today 00:00
const startOfTodayDO = () =>
  new DateObject(new Date()).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

const dateOnly = (d: DateObject | null) =>
  d
    ? new DateObject(d.toDate()).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      })
    : null;

const formatYYYYMMDD_HHmm = (iso: string) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${y}-${m}-${day} ${hh}:${mm}`;
};

const UnavailableDates = () => {
  const { data, isLoading, isFetching } = useGetUnavailableDatesQuery();
  const unavailableDates = data?.data || [];

  const [createUnavailableDates, { isLoading: isCreating }] =
    useCreateUnavailableDatesMutation();

  // Default: today 09:00–12:00
  const [startDO, setStartDO] = useState<DateObject | null>(
    new DateObject(new Date()).set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
  );
  const [endDO, setEndDO] = useState<DateObject | null>(
    new DateObject(new Date()).set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
  );

  const [allowAllBuyersContact, setAllowAllBuyersContact] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isBusy = isCreating || isFetching || isLoading;

  // Strict validation: start < end
  const canSubmit = useMemo(() => {
    if (!startDO || !endDO) return false;
    return startDO.toDate().getTime() < endDO.toDate().getTime();
  }, [startDO, endDO]);

  const onAdd = useCallback(async () => {
    setError(null);
    if (!canSubmit || !startDO || !endDO) {
      setError("Start time must be strictly before end time.");
      return;
    }

    const payload = {
      startTime: toUTCISOString(startDO.toDate()),
      endTime: toUTCISOString(endDO.toDate()),
    };

    const res = await createUnavailableDates(payload);
    const err = res?.error as IQueryMutationErrorResponse;
    if (err) {
      toast.error(err?.data?.message || "Something went wrong");
      return;
    }

    // Reset to TODAY 09:00–12:00
    const today = new Date();
    setStartDO(
      new DateObject(today).set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
    );
    setEndDO(
      new DateObject(today).set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
    );
    toast.success("Unavailable dates added");
  }, [canSubmit, startDO, endDO, createUnavailableDates]);

  const minDO = startOfTodayDO();

  const endMinDate = dateOnly(startDO) || minDO;

  return (
    <section className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-4/8 to-brand-1/10 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">Schedule Unavailable Dates</h3>
      </div>

      <div className="card p-5 grid sm:grid-cols-4 gap-3 mt-3">
        {/* Start */}
        <div className="flex gap-2 items-center">
          <label className="text-sm text-white/60">Start</label>
          <DatePicker
            value={startDO}
            onChange={(val) =>
              setStartDO((prev) => keepTimeOnlyIfMidnight(val as DateObject, prev))
            }
            inputClass="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            className="w-full"
            disabled={isBusy}
            minDate={minDO}
            plugins={[<TimePicker position="bottom" hideSeconds key="tp1" />]}
            format="YYYY-MM-DD HH:mm"
            aria-label="Start date and time"
          />
        </div>

        {/* End */}
        <div className="flex gap-2 items-center">
          <label className="text-sm text-white/60">End</label>
          <DatePicker
            value={endDO}
            onChange={(val) =>
              setEndDO((prev) => keepTimeOnlyIfMidnight(val as DateObject, prev))
            }
            inputClass="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            className="w-full"
            disabled={isBusy}
            minDate={endMinDate}
            plugins={[<TimePicker position="bottom" hideSeconds key="tp2" />]}
            format="YYYY-MM-DD HH:mm"
            aria-label="End date and time"
          />
        </div>

        {/* Toggle: All buyers can contact me */}
        <div className="flex items-end gap-2">
          <label className="text-muted mb-1">All buyers can contact me</label>
          <button
            type="button"
            onClick={() => setAllowAllBuyersContact((v) => !v)}
            disabled={isBusy}
            aria-pressed={allowAllBuyersContact}
            aria-label="Toggle allow all buyers to contact"
            className={cn(
              "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 outline-none",
              allowAllBuyersContact
                ? "bg-brand-4/80 border-brand-4/40"
                : "bg-white/10 border-white/20",
              isBusy ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            )}
          >
            <span
              className={cn(
                "inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300",
                allowAllBuyersContact ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>

        {/* Submit */}
        <div className="flex items-end">
          <button
            onClick={onAdd}
            disabled={!canSubmit || isBusy}
            className={cn(
              "w-full btn-secondary",
              (!canSubmit || isBusy) && "opacity-60 cursor-not-allowed"
            )}
          >
            {isCreating ? "Adding…" : "Add Unavailable Dates"}
          </button>
        </div>

        {/* Inline error */}
        {(!canSubmit || error) && (
          <div className="sm:col-span-4 text-red-300 text-sm mt-1">
            {error || "Start time must be strictly before end time."}
          </div>
        )}
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
            {unavailableDates.map((item: IUnavailableDates) => (
              <li
                key={item._id}
                className="flex items-center justify-between border border-white/10 rounded-xl p-4 bg-white/5"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {formatYYYYMMDD_HHmm(item.startTime)} →{" "}
                    {formatYYYYMMDD_HHmm(item.endTime)}
                  </span>
                </div>

                <DeleteUnavailableDateById _id={item._id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default UnavailableDates;
