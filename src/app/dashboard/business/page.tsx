const DashboardBusinessPage = () => {
  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-heading">Welcome back, Arif</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-white/70 text-sm">Active orders</div>
          <div className="text-2xl font-heading mt-1">2</div>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-white/70 text-sm">Delivered</div>
          <div className="text-2xl font-heading mt-1">8</div>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-white/70 text-sm">Revisions</div>
          <div className="text-2xl font-heading mt-1">1</div>
        </div>
      </div>
      <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
        <div className="flex items-center justify-between">
          <div className="font-heading">In progress</div>
          <a href="orders.html" className="text-sm text-white/70 hover:underline">
            View all
          </a>
        </div>
        <div className="mt-3 space-y-3">
          <div className="rounded-xl p-4 border border-white/10 bg-white/5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[url('https://i.pravatar.cc/100?img=44')] bg-cover"></div>
            <div className="flex-1">
              <div className="font-heading">Order #2341 • Sloane Rivers</div>
              <div className="text-xs text-white/60">
                ETA: Aug 28 • Status: <span className="chip">In progress</span>
              </div>
            </div>
            <a href="order-detail.html" className="px-3 py-2 rounded-lg bg-white/10">
              Open
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardBusinessPage;
