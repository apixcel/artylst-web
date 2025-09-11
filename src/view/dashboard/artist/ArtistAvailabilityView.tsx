"use client";
import { UnauthorizedMsgBox, UnavailableDates, WeeklySchedule } from "@/components";
import AutoAccept from "@/components/dashboard/business/artists/AutoAccept";
import { useAppSelector } from "@/hooks";
import { IQueryMutationErrorResponse } from "@/interface";
import {
  useGetMyDeliveryWindowQuery,
  useUpdateDeliveryWindowMutation,
} from "@/redux/features/artist/availability.api";
import { Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const ArtistAvailabilityView = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  const { data } = useGetMyDeliveryWindowQuery(undefined);
  const [updateWindow, { isLoading: isUpdating }] = useUpdateDeliveryWindowMutation();

  const [maxQueue, setMaxQueue] = useState<number | undefined>(10);
  const [turnaround, setTurnaround] = useState<number[]>([]);

  // ----- change tracking (turnaround + maxQueue) -----
  const initialHours = useMemo(() => data?.data?.hours ?? [], [data]);
  const initialMaxQueue = useMemo(() => data?.data?.maxQueue ?? 10, [data]);

  const isDirty =
    JSON.stringify(initialHours) !== JSON.stringify(turnaround) ||
    initialMaxQueue !== maxQueue;

  useEffect(() => {
    if (data?.data) {
      setMaxQueue(data.data.maxQueue);
      setTurnaround(data.data.hours);
    }
  }, [data]);

  if (role !== "artist") return <UnauthorizedMsgBox />;

  const hanldeUpdateDeliveryWindow = async () => {
    const res = await updateWindow({ hours: turnaround, maxQueue });
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error.data.message || "Something went wrong");
      return;
    }

    toast.success("Delivery window updated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex sm:flex-row flex-col gap-4 sm:items-end justify-between">
        <div>
          <h1 className="dashboard-page-title">Availability</h1>
          <p className="text-muted text-sm mt-1">
            Set your turnaround, queue limits and time off
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Turnaround & queue */}
        <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 space-y-4 backdrop-blur-xl">
          <h3>Turnaround</h3>

          {/* Turnaround pills (includes None) */}
          <div className="mt-1 grid grid-cols-4 gap-2 text-sm">
            {/* None option */}
            <button
              className={`px-3 py-2 rounded-lg border border-white/10 text-center cursor-pointer ${
                turnaround.length === 0 ? "bg-white/25" : "bg-white/5"
              }`}
              onClick={() => setTurnaround([])}
            >
              None
            </button>

            {[
              { label: "3d", value: 72 },
              { label: "5d", value: 120 },
              { label: "7d", value: 168 },
            ].map((opt) => {
              const selected = turnaround.includes(opt.value);

              return (
                <button
                  key={opt.value}
                  className={`px-3 py-2 rounded-lg border border-white/10 text-center cursor-pointer ${
                    selected ? "bg-white/25" : "bg-white/5"
                  }`}
                  onClick={() => {
                    const newData = selected
                      ? turnaround.filter((v) => v !== opt.value)
                      : [...turnaround, opt.value];
                    setTurnaround(newData);
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div>
            <label className="text-sm text-white/60">Max queue size</label>
            <input
              type="number"
              value={maxQueue}
              placeholder="0"
              onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : undefined;
                setMaxQueue(value);
              }}
              className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
              defaultValue="10"
            />
          </div>
          {/* show save if turnaround or maxQueue changed */}
          {isDirty && (
            <div className="mt-2">
              <button
                onClick={hanldeUpdateDeliveryWindow}
                className="px-3 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 cursor-pointer"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}

          <div className="rounded-xl p-4 border border-white/10 bg-brand-1/5 text-xs text-muted flex gap-2">
            <Clock className="h-3 w-3 mt-[2px]" />
            <span className="text-muted">
              Your SLA will show as <span className="text-light">{turnaround}</span> on
              your public profile.
            </span>
          </div>
        </div>

        {/* Auto-accept & pause rules */}
        <AutoAccept />
      </div>

      {/* Weekly schedule */}
      <WeeklySchedule />

      {/* unavailable dates */}
      <UnavailableDates />
    </div>
  );
};

export default ArtistAvailabilityView;
