"use client";

import { IQueryMutationErrorResponse, IUnavailableDates } from "@/interface";
import {
  useCreateUnavailableDatesMutation,
  useGetUnavailableDatesQuery,
} from "@/redux/features/artist/availability.api";
import { cn } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { format } from "date-fns";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DeleteUnavailableDateById from "./DeleteUnavailableDateById";
import UnavailableDateItemSkeleton from "./UnavailableDateItemSkeleton";

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

const UnavailableDates = () => {
  const { data, isLoading, isFetching } = useGetUnavailableDatesQuery();

  const unavailableDates: IUnavailableDates[] = useMemo(
    () => data?.data ?? [],
    [data?.data]
  );

  const [createUnavailableDates, { isLoading: isCreating }] =
    useCreateUnavailableDatesMutation();

  // Default: today 09:00–12:00
  const [startDO, setStartDO] = useState<DateObject | null>(
    new DateObject(new Date()).set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
  );
  const [endDO, setEndDO] = useState<DateObject | null>(
    new DateObject(new Date()).set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
  );

  const latestCanBuyersContact =
    Array.isArray(unavailableDates) && unavailableDates.length
      ? Boolean(unavailableDates[0]?.canBuyersContact)
      : true;

  const [allowAllBuyersContact, setAllowAllBuyersContact] =
    useState<boolean>(latestCanBuyersContact);
  const [error, setError] = useState<string | null>(null);
  const isBusy = isCreating || isFetching || isLoading;

  useEffect(() => {
    if (Array.isArray(unavailableDates) && unavailableDates.length) {
      setAllowAllBuyersContact(Boolean(unavailableDates[0]?.canBuyersContact));
    }
  }, [unavailableDates]);

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
      canBuyersContact: allowAllBuyersContact, // <-- SEND IT
    };

    const res = await createUnavailableDates(payload);
    const err = res?.error as IQueryMutationErrorResponse;
    if (err) {
      toast.error(err?.data?.message || "Something went wrong");
      return;
    }

    // Reset times only; keep current toggle choice
    const today = new Date();
    setStartDO(
      new DateObject(today).set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
    );
    setEndDO(
      new DateObject(today).set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
    );
    toast.success("Unavailable dates added");
  }, [canSubmit, startDO, endDO, allowAllBuyersContact, createUnavailableDates]);

  const minDO = startOfTodayDO();

  const endMinDate = dateOnly(startDO) || minDO;

  return (
    <section className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-4/8 to-brand-1/10 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">Schedule Unavailable Dates</h3>
      </div>

      <div className="card p-5 grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-3">
        {/* Start */}
        <div className="flex gap-2 items-center">
          <label className="text-sm text-white/60">Start</label>
          <DatePicker
            value={startDO}
            onChange={(val) =>
              setStartDO((prev: DateObject | null) =>
                keepTimeOnlyIfMidnight(val as DateObject, prev)
              )
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
              setEndDO((prev: DateObject | null) =>
                keepTimeOnlyIfMidnight(val as DateObject, prev)
              )
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
        <div className="flex items-center gap-2">
          <label className="text-muted mb-1">All buyers can contact me</label>
          <button
            type="button"
            onClick={() => setAllowAllBuyersContact((v) => !v)}
            disabled={isBusy}
            aria-pressed={allowAllBuyersContact}
            aria-label="Toggle allow all buyers to contact"
            className={cn(
              "relative inline-flex h-4.5 sm:h-7 w-8 sm:w-12 items-center rounded-full transition-colors duration-300 outline-none",
              allowAllBuyersContact
                ? "bg-brand-4/80 border-brand-4/40"
                : "bg-white/10 border-white/20",
              isBusy ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            )}
          >
            <span
              className={cn(
                "inline-block h-3 sm:h-5 w-3 sm:w-5 transform rounded-full bg-white shadow-md transition-transform duration-300",
                allowAllBuyersContact ? "translate-x-4 sm:translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>

        {/* Submit */}
        <div className="flex items-end xl:col-span-1 sm:col-span-2">
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
      </div>

      {/* Inline error */}
      {(!canSubmit || error) && (
        <div className="sm:col-span-4 text-red-300 text-sm mt-1">
          {error || "Start time must be strictly before end time."}
        </div>
      )}

      {/* Existing Unavailable Dates */}
      <div className="mt-6">
        <h4 className="text-base font-medium mb-2">Existing</h4>

        {isLoading ? (
          <ul className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <UnavailableDateItemSkeleton key={i} />
            ))}
          </ul>
        ) : unavailableDates.length === 0 ? (
          <div className="text-muted text-sm">No unavailable dates yet.</div>
        ) : (
          <ul className="space-y-3">
            {unavailableDates.map((item: IUnavailableDates) => (
              <li
                key={item._id}
                className="flex items-center justify-between border border-white/10 rounded-xl p-4 bg-white/5 sm:flex-row flex-col sm:gap-0 gap-3"
              >
                <div className="flex items-center sm:gap-2 gap-1 sm:flex-row flex-col">
                  <span className="font-medium">
                    {format(item.startTime, "MMM dd, yyyy h:mm a")} →{" "}
                    {format(item.endTime, "MMM dd, yyyy h:mm a")}
                  </span>

                  {typeof item.canBuyersContact !== "undefined" && (
                    <span
                      className={cn(
                        "mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                        item.canBuyersContact
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-rose-500/15 text-rose-300"
                      )}
                    >
                      {item.canBuyersContact
                        ? "Buyers can contact"
                        : "Buyers cannot contact"}
                    </span>
                  )}
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
