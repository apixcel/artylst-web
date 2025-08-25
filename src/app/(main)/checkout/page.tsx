import React from "react";
import { CheckoutAddOnns, CheckoutBrief, CheckoutTier } from "@/components";

const CheckoutPage: React.FC = () => {
  return (
    <>
      {/* Progress */}
      <section className="py-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="chip">1. Choose tier</span>
          <span className="chip">2. Brief</span>
          <span className="chip">3. Add‑ons</span>
          <span className="chip">4. Pay</span>
        </div>
      </section>

      {/* Main */}
      <main className="pb-16 grid lg:grid-cols-[1fr_380px] gap-6">
        {/* LEFT: form */}
        <section className="space-y-6">
          {/* Artist summary */}
          <div className="card p-4 flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-[10px]">
              IMG
            </div>
            <div className="flex-1">
              <div className="font-heading">Artist Name</div>
              <div className="text-xs text-white/60">
                Singer • Indie • ★ 4.9 • ~48h ETA
              </div>
            </div>
            <a className="text-sm text-white/70 underline" href="artist.html">
              View profile
            </a>
          </div>

          {/* tier select */}
          <CheckoutTier />

          {/* brief */}
          <CheckoutBrief />

          {/* add-ons */}
          <CheckoutAddOnns />

          {/* Buyer info (minimal for demo) */}
          <div className="card p-5">
            <h2 className="font-heading text-lg">Your info</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="label">Your name</label>
                <input className="input mt-1" placeholder="Full name" />
              </div>
              <div>
                <label className="label">Email (delivery)</label>
                <input className="input mt-1" placeholder="you@email.com" />
              </div>
            </div>
            <p className="text-xs text-white/60 mt-2">
              ARTYLST will email your private playlist link and 30s authentication video.
              We never share personal contact info.
            </p>
          </div>
        </section>

        {/* RIGHT: summary */}
        <aside className="space-y-3">
          <div className="card p-5">
            <div className="font-heading">Order summary</div>
            <div className="mt-3 space-y-2 text-sm" id="summary">
              <div className="flex justify-between">
                <span>Selected tier</span>
                <span id="tier-price">$39</span>
              </div>
              <div className="flex justify-between">
                <span>Add‑ons</span>
                <span id="addons-price">$0</span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between text-white/80">
                <span>Subtotal</span>
                <span id="subtotal">$39</span>
              </div>
              <div className="flex justify-between text-xs text-white/60">
                <span>ARTYLST service fee (20%)</span>
                <span id="fee">$7.80</span>
              </div>
              <div className="flex justify-between text-lg font-heading pt-1">
                <span>Total</span>
                <span id="total">$46.80</span>
              </div>
            </div>
            <a href="#" className="btn btn-primary w-full mt-4">
              Continue to payment
            </a>
            <p className="text-[11px] text-white/60 mt-2">
              Payment is held in escrow and released to the artist upon delivery.
            </p>
          </div>

          <div className="card p-4">
            <div className="font-heading text-sm">What you’ll receive</div>
            <ul className="mt-2 text-sm text-white/75 space-y-1">
              <li>• Private playlist link (Spotify/Apple/YTM)</li>
              <li>• 30s authentication video (saying your name)</li>
              <li>• Privacy‑first delivery via ARTYLST</li>
            </ul>
          </div>
        </aside>
      </main>
    </>
  );
};

export default CheckoutPage;
