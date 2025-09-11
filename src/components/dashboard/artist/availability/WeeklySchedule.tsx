"use client";

import { CalendarDays } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import * as yup from "yup";

// ---- Types (from your snippet) ----
export interface IWeeklyAvailabilitySchedule {
  day: number;
  acceptOrders: boolean;
  startTime: string; // "HH:mm" or ""
  endTime: string; // "HH:mm" or ""
}
export interface IWeeklyAvailability {
  _id: string;
  artist: string;
  schedule: IWeeklyAvailabilitySchedule[];
  createdAt?: string;
  updatedAt?: string;
}

// ---- API hook (from your snippet) ----
import { IQueryMutationErrorResponse } from "@/interface";
import {
  useGetWeeklyAvailabilityQuery,
  useUpdateWeeklyAvailabilityMutation,
} from "@/redux/features/artist/availability.api";
import { toast } from "sonner";

// ---- Utils ----
const daysLbl = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeOnHourRegex = /^([01]\d|2[0-3]):00$/; // 00:00 - 23:00 on the hour only
const HOURS = Array.from({ length: 24 }, (_, h) => h.toString().padStart(2, "0"));

// Per-row Yup schema
const rowSchema: yup.ObjectSchema<IWeeklyAvailabilitySchedule> = yup
  .object({
    day: yup.number().required(),
    acceptOrders: yup.boolean().required(),
    startTime: yup
      .string()
      .default("")
      .test(
        "time-format-start",
        "Time must be on the hour (e.g., 09:00)",
        (v) => !v || v === "" || timeOnHourRegex.test(v)
      ),
    endTime: yup
      .string()
      .default("")
      .test(
        "time-format-end",
        "Time must be on the hour (e.g., 18:00)",
        (v) => !v || v === "" || timeOnHourRegex.test(v)
      ),
  })
  .test("start-before-end", "Start time must be earlier than end time", (values) => {
    const { startTime, endTime } = values as IWeeklyAvailabilitySchedule;
    if (!startTime || !endTime) return true;
    return startTime < endTime;
  });

type RowErrors = Partial<Record<"startTime" | "endTime" | "order", string>>;

interface DayRowProps {
  availability: IWeeklyAvailabilitySchedule;
  onChange: (day: number, patch: Partial<IWeeklyAvailabilitySchedule>) => void;
  errors?: RowErrors;
}

const DayRow = ({ availability, onChange, errors }: DayRowProps) => {
  const { day, acceptOrders, startTime, endTime } = availability;

  return (
    <div className="flex items-center sm:flex-row flex-col gap-3 sm:gap-0 justify-between p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
      <div className="w-24 text-white/80 text-center sm:text-left">{daysLbl[day]}</div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="accent-white"
          checked={!!acceptOrders}
          onChange={(e) => onChange(day, { acceptOrders: e.target.checked })}
        />
        Accept orders
      </label>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <select
            className="w-28 bg-white/10 border border-white/10 rounded-md px-2 py-1"
            value={startTime ? startTime.slice(0, 2) : ""}
            onChange={(e) =>
              onChange(day, { startTime: e.target.value ? `${e.target.value}:00` : "" })
            }
          >
            <option value="" className="text-black">
              Start
            </option>
            {HOURS.map((h) => (
              <option key={h} value={h} className="text-black">
                {h}:00
              </option>
            ))}
          </select>
          <span>–</span>
          <select
            className="w-28 bg-white/10 border border-white/10 rounded-md px-2 py-1"
            value={endTime ? endTime.slice(0, 2) : ""}
            onChange={(e) =>
              onChange(day, { endTime: e.target.value ? `${e.target.value}:00` : "" })
            }
          >
            <option value="" className="text-black">
              End
            </option>
            {HOURS.map((h) => (
              <option key={h} value={h} className="text-black">
                {h}:00
              </option>
            ))}
          </select>
        </div>
        <div className="text-xs text-red-300">
          {errors?.startTime && <span>{errors.startTime}</span>}
          {errors?.endTime && <span>{errors.endTime}</span>}
          {errors?.order && <span>{errors.order}</span>}
        </div>
      </div>
    </div>
  );
};

const WeeklySchedule = () => {
  const { data, isLoading } = useGetWeeklyAvailabilityQuery();

  const [update, { isLoading: isUpdating }] = useUpdateWeeklyAvailabilityMutation();

  const initialSchedule: IWeeklyAvailabilitySchedule[] = useMemo(
    () => data?.data?.schedule ?? [],
    [data]
  );

  const [updatedSchedule, setUpdatedSchedule] = useState<IWeeklyAvailabilitySchedule[]>(
    []
  );
  const [errors, setErrors] = useState<Record<number, RowErrors>>({});

  useEffect(() => {
    if (initialSchedule?.length) {
      setUpdatedSchedule(initialSchedule);
      setErrors({});
    }
  }, [initialSchedule]);

  const validateRow = async (row: IWeeklyAvailabilitySchedule) => {
    try {
      await rowSchema.validate(row, { abortEarly: false });
      setErrors((prev) => ({ ...prev, [row.day]: {} }));
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const rowErr: RowErrors = {};
      if (e?.inner?.length) {
        for (const err of e.inner) {
          if (err.path === "startTime") rowErr.startTime = err.message;
          if (err.path === "endTime") rowErr.endTime = err.message;
        }
      } else if (e?.message) {
        rowErr.order = e.message;
      }
      if (row.startTime && row.endTime && row.startTime >= row.endTime) {
        rowErr.order = "Start time must be earlier than end time";
      }
      setErrors((prev) => ({ ...prev, [row.day]: rowErr }));
      return false;
    }
  };

  const onRowChange = async (
    day: number,
    patch: Partial<IWeeklyAvailabilitySchedule>
  ) => {
    setUpdatedSchedule((prev) => {
      const next = prev.map((r) => (r.day === day ? { ...r, ...patch } : r));
      const changed = next.find((r) => r.day === day)!;
      validateRow(changed);
      return next;
    });
  };

  const isDirty = useMemo(() => {
    if (initialSchedule.length !== updatedSchedule.length) return true;
    const a = JSON.stringify(initialSchedule);
    const b = JSON.stringify(updatedSchedule);
    return a !== b;
  }, [initialSchedule, updatedSchedule]);

  const hasErrors = useMemo(() => {
    return Object.values(errors).some((bag) => Object.keys(bag || {}).length > 0);
  }, [errors]);

  const handleSave = async () => {
    if (hasErrors || isUpdating) return;
    const res = await update({ schedule: updatedSchedule });
    const err = res?.error as IQueryMutationErrorResponse;
    if (err) {
      toast.error(err.data?.message || "Something went wrong");
      return;
    }
    toast.success("Weekly schedule updated successfully");
  };

  return (
    <section className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-1/10 to-brand-4/8 space-y-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" /> Weekly schedule
        </h3>
      </div>

      {isLoading ? (
        <div className="text-sm text-white/70">Loading…</div>
      ) : (
        <div className="mt-3 grid xl:grid-cols-2 gap-2">
          {updatedSchedule?.map((row) => (
            <DayRow
              key={row.day}
              availability={row}
              onChange={onRowChange}
              errors={errors[row.day]}
            />
          ))}
        </div>
      )}

      {isDirty && (
        <button
          onClick={handleSave}
          disabled={hasErrors || isUpdating}
          className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/15 border cursor-pointer border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          title={hasErrors ? "Fix validation errors to save" : "Save changes"}
        >
          {isUpdating ? "Updating..." : "Save Changes"}
        </button>
      )}
    </section>
  );
};

export default WeeklySchedule;
