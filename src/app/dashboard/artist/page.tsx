const DashboardEnrollPage = () => {
  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-heading">Welcome back, Sloane</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5"><div className="text-white/70 text-sm">Open orders</div><div className="text-2xl font-heading mt-1">3</div></div>
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5"><div className="text-white/70 text-sm">Avg. delivery</div><div className="text-2xl font-heading mt-1">2.9d</div></div>
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5"><div className="text-white/70 text-sm">On‑time</div><div className="text-2xl font-heading mt-1">94%</div></div>
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5"><div className="text-white/70 text-sm">Earnings (30d)</div><div className="text-2xl font-heading mt-1">$2,340</div></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">Your queue</div>
          <div className="mt-3 space-y-3 text-sm">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[url('https://i.pravatar.cc/100?img=11')] bg-cover"></div>
              <div className="flex-1"><div>#2341 • Arif</div><div className="text-white/60 text-xs">Due in 3 days</div></div>
              <a className="px-3 py-2 rounded-lg bg-white/10" href="deliver.html">Deliver</a>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">Recent ratings</div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">★★★★★ — “Perfect vibe!” — Nadia</div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">★★★★☆ — “Loved it.” — Sam</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardEnrollPage;
