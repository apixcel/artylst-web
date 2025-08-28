import React from "react";

const page = () => {
  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-heading">Availability</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">Turnaround</div>
          <div className="mt-3 text-sm">
            <label className="mr-2">
              <input type="radio" name="ta" /> 48‑72h
            </label>{" "}
            <label className="ml-4">
              <input type="radio" name="ta" /> 3‑5d
            </label>{" "}
            <label className="ml-4">
              <input type="radio" name="ta" checked /> 5‑7d
            </label>
          </div>
          <div className="mt-3">
            <label className="text-sm text-white/60">Max queue size</label>
            <input
              className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
              value="10"
            />
          </div>
        </div>
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">Auto‑accept</div>
          <div className="mt-3 text-sm text-white/70">
            Auto accept new orders until queue limit, then pause.
          </div>
          <div className="mt-2">
            <label>
              <input type="checkbox" checked /> Enable
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
