"use client";

import { useGetWeeklyAvailabilityQuery } from "@/redux/features/artist/availability.api";
import { CalendarDays } from "lucide-react";

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

const WeeklySchedule = () => {
  const { data, isLoading, isFetching } = useGetWeeklyAvailabilityQuery();
  return (
    <section className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-1/10 to-brand-4/8 space-y-4 backdrop-blur-xl">
      <h3 className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4" /> Weekly schedule
      </h3>
      <div className="mt-3 grid xl:grid-cols-2 gap-2">
        {"Mon Tue Wed Thu Fri Sat Sun".split(" ").map((d) => (
          <DayRow key={d} day={d} />
        ))}
      </div>
    </section>
  );
};

export default WeeklySchedule;
