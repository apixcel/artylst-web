import React from "react";
import {
  CheckoutAddOnns,
  CheckoutBrief,
  CheckoutTier,
  ArtistCheckoutProgress,
} from "@/components";
import { Star } from "lucide-react";
import Link from "next/link";

const CheckoutPage: React.FC = () => {
  return (
    <>
      {/* Progress */}
      <section className="py-8">
        <ArtistCheckoutProgress
          current={3}
          steps={["1. Choose tier", "2. Brief", "3. Add‑ons", "4. Pay"]}
          className="mx-auto"
        />
      </section>

      {/* Main */}
      <main className="pb-16 grid lg:grid-cols-[1fr_380px] gap-6">
        {/* LEFT: form */}
        <section className="space-y-6">
          {/* Artist summary */}
          <div className="card p-4 flex items-center gap-4 bg-gradient-to-b from-brand-2/10 to-brand-1/10">
            <div className="h-14 w-14 rounded-full bg-white/10 border border-white/10 grid place-items-center text-[10px]">
              IMG
            </div>
            <div className="flex-1">
              <span className="font-heading text-base mb-1 inline-block">
                Artist Name
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip flex items-center gap-1 text-[11px] bg-mario-coin/15 border border-mario-coin/40">
                  <Star className="w-3 h-3 text-gold" /> <span>4.9</span> (1.2k)
                </span>
                <span className="chip bg-brand-4/10 border border-brand-4/40 text-[11px]">
                  48h ETA
                </span>
              </div>
            </div>
            <Link
              className="text-sm text-muted hover:text-light underline"
              href="/artists/1"
            >
              View profile
            </Link>
          </div>

          {/* tier select */}
          <CheckoutTier />

          {/* brief */}
          <CheckoutBrief />

          {/* add-ons */}
          <CheckoutAddOnns />

          {/* Buyer info (minimal for demo) */}
          <div className="card p-5 bg-gradient-to-b from-brand-4/8 to-brand-1/10 backdrop-blur-2xl">
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
          <div className="card p-5 bg-gradient-to-b from-brand-2/10 to-brand-1/10">
            <h2 className="font-bricolage-grotesque">Order summary</h2>
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

          <div className="card p-4 bg-gradient-to-b from-brand-1/10 to-brand-1/10">
            <div className="font-heading text-sm">What you’ll receive</div>
            <ul className="mt-2 text-sm text-muted space-y-1">
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
