import React from "react";

const page = () => {
  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-heading">Settings</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">Notifications</div>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center justify-between">
              New orders <input type="checkbox" className="accent-brand-500" />
            </label>
            <label className="flex items-center justify-between">
              Messages <input type="checkbox" className="accent-brand-500" />
            </label>
            <label className="flex items-center justify-between">
              Payouts <input type="checkbox" className="accent-brand-500" />
            </label>
          </div>
        </div>
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">Security</div>
          <div className="mt-3 text-sm">
            <a className="px-3 py-2 rounded-lg bg-white/10" href="#">
              Change password
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
