"use client";
import { useState } from "react";
import {
  CalendarDays,
  Check,
  Clock,
  PauseCircle,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useAppSelector } from "@/hooks";
import { UnauthorizedMsgBox } from "@/components";

const DayRow = ({ day }: { day: string }) => (
  <div className="flex items-center sm:flex-row flex-col gap-3 sm:gap-0 justify-between p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
    <div className="w-24 text-white/80 text-center sm:text-left">{day}</div>
    <label className="flex items-center gap-2">
      <input type="checkbox" defaultChecked className="accent-white" />
      Accept orders
    </label>
    <div className="flex items-center gap-2">
      <input
        className="w-28 bg-white/10 border border-white/10 rounded-md px-2 py-1"
        placeholder="09:00"
      />
      <span>–</span>
      <input
        className="w-28 bg-white/10 border border-white/10 rounded-md px-2 py-1"
        placeholder="18:00"
      />
    </div>
  </div>
);

const ArtistAvailabilityView = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  const [open, setOpen] = useState(true);
  const [turnaround, setTurnaround] = useState("5-7d");

  if (role !== "artist") return <UnauthorizedMsgBox />;

  return (
    <section className="space-y-6">
      <div className="flex sm:flex-row flex-col gap-4 sm:items-end justify-between">
        <div>
          <h1 className="dashboard-page-title">Availability</h1>
          <p className="text-muted text-sm mt-1">
            Set your turnaround, queue limits and time off
          </p>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className={`px-3 py-2 rounded-lg border border-white/10 inline-flex justify-center sm:justify-start items-center gap-2 ${open ? "bg-brand-4/80 hover:bg-brand-4/90" : "bg-white/10 hover:bg-white/15"}`}
        >
          {open ? (
            <PlayCircle className="h-4 w-4" />
          ) : (
            <PauseCircle className="h-4 w-4" />
          )}
          {open ? "Open for commissions" : "Paused"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Turnaround & queue */}
        <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 space-y-4 backdrop-blur-xl">
          <h3>Turnaround</h3>
          <div className="mt-1 grid grid-cols-3 gap-2 text-sm">
            {[
              { label: "48‑72h", value: "48-72h" },
              { label: "3‑5d", value: "3-5d" },
              { label: "5‑7d", value: "5-7d" },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`px-3 py-2 rounded-lg border border-white/10 text-center cursor-pointer ${turnaround === opt.value ? "bg-white/15" : "bg-white/5"}`}
              >
                <input
                  type="radio"
                  name="ta"
                  className="hidden"
                  checked={turnaround === opt.value}
                  onChange={() => setTurnaround(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
          <div>
            <label className="text-sm text-white/60">Max queue size</label>
            <input
              className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
              defaultValue="10"
            />
          </div>

          <div className="rounded-xl p-4 border border-white/10 bg-brand-1/5 text-xs text-muted flex gap-2">
            <Clock className="h-3 w-3 mt-[2px]" />
            <span className="text-muted">
              Your SLA will show as <span className="text-light">{turnaround}</span> on
              your public profile.
            </span>
          </div>
        </div>

        {/* Auto-accept & pause rules */}
        <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 space-y-4 backdrop-blur-xl">
          <h3>Auto‑accept</h3>
          <div className="text-sm text-muted">
            Auto accept new orders until queue limit, then pause.
          </div>
          <label className="mt-2 inline-flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked className="accent-brand-4" /> Enable
          </label>

          <div>
            <label className="text-sm text-white/60">Auto‑pause at queue size</label>
            <input
              className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
              defaultValue="10"
            />
          </div>

          <div className="rounded-xl p-4 border border-white/10 bg-white/5 text-xs text-white/70 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3 w-3" /> Fans never see your email or phone;
              LYSTN intermediates all contact.
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3" /> Faster replies improve your queue ranking.
            </div>
          </div>
        </div>
      </div>

      {/* Weekly schedule */}
      <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-1/10 to-brand-4/8 space-y-4 backdrop-blur-xl">
        <h3 className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" /> Weekly schedule
        </h3>
        <div className="mt-3 grid xl:grid-cols-2 gap-2">
          {"Mon Tue Wed Thu Fri Sat Sun".split(" ").map((d) => (
            <DayRow key={d} day={d} />
          ))}
        </div>
      </div>

      {/* Time off / blackout dates */}
      <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-4/8 to-brand-1/10 backdrop-blur-xl">
        <h3>Time off</h3>
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          <div>
            <label className="text-sm text-white/60">Start</label>
            <input
              type="date"
              className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm text-white/60">End</label>
            <input
              type="date"
              className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15">
              Add time off
            </button>
          </div>
        </div>
        <div className="mt-3 text-xs text-white/60">
          Orders with deadlines inside time‑off will be auto‑paused or given extended
          delivery windows.
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 inline-flex items-center gap-2">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <button className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 inline-flex items-center gap-2">
          <Check className="h-4 w-4" /> Save changes
        </button>
      </div>
    </section>
  );
};

export default ArtistAvailabilityView;
