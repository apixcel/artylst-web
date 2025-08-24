import React from "react";

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

          {/* Tier select */}
          <div className="card p-5">
            <h2 className="font-heading text-lg">Choose a tier</h2>
            <div className="grid md:grid-cols-3 gap-4 mt-3">
              <label className="card p-4 cursor-pointer">
                <input
                  type="radio"
                  name="tier"
                  value="39"
                  className="peer sr-only"
                  defaultChecked
                />
                <div className="text-sm text-white/70">Mini • 10–12 tracks</div>
                <div className="text-2xl font-heading mt-1">$39</div>
                <ul className="mt-2 text-xs text-white/70 space-y-1">
                  <li>Private playlist link</li>
                  <li>30s auth video</li>
                </ul>
                <div className="mt-3 text-[11px] text-emerald-300/90">~48h</div>
              </label>

              <label className="card p-4 cursor-pointer ring-1 ring-brand/40">
                <input
                  type="radio"
                  name="tier"
                  value="59"
                  className="peer sr-only"
                />
                <div className="text-sm text-white/70">
                  Standard • 20–24 tracks
                </div>
                <div className="text-2xl font-heading mt-1">$59</div>
                <ul className="mt-2 text-xs text-white/70 space-y-1">
                  <li>Deeper curation</li>
                  <li>30s auth video</li>
                </ul>
                <div className="mt-3 text-[11px] text-emerald-300/90">~48h</div>
              </label>

              <label className="card p-4 cursor-pointer">
                <input
                  type="radio"
                  name="tier"
                  value="99"
                  className="peer sr-only"
                />
                <div className="text-sm text-white/70">
                  Deep Dive • 35+ tracks
                </div>
                <div className="text-2xl font-heading mt-1">$99</div>
                <ul className="mt-2 text-xs text-white/70 space-y-1">
                  <li>1 revision within 7 days</li>
                  <li>30s auth video</li>
                </ul>
                <div className="mt-3 text-[11px] text-emerald-300/90">~72h</div>
              </label>
            </div>
          </div>

          {/* Brief */}
          <div className="card p-5">
            <h2 className="font-heading text-lg">Your brief</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="label">Occasion / use</label>
                <select className="input mt-1">
                  <option>Workout</option>
                  <option>Study / Focus</option>
                  <option>Chill</option>
                  <option>Wedding</option>
                  <option>Business ambiance</option>
                </select>
              </div>
              <div>
                <label className="label">Preferred platform</label>
                <select className="input mt-1">
                  <option>Spotify</option>
                  <option>Apple Music</option>
                  <option>YouTube Music</option>
                </select>
              </div>
              <div>
                <label className="label">Languages</label>
                <select className="input mt-1">
                  <option>English</option>
                  <option>Bangla</option>
                  <option>Both</option>
                </select>
              </div>
              <div>
                <label className="label">Delivery window</label>
                <select className="input mt-1">
                  <option>~48h</option>
                  <option>~72h</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label">Personal note to artist</label>
                <textarea
                  className="input mt-1 h-28"
                  placeholder="Tell the artist about your vibe, artists you like, songs to include/avoid..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="card p-5">
            <h2 className="font-heading text-lg">Add‑ons (optional)</h2>
            <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
              <label className="card p-4 flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 addon" data-price="12" />
                <div>
                  <div className="font-heading">Rush delivery</div>
                  <div className="text-white/70 text-xs">
                    Move to front of queue (where possible).
                  </div>
                </div>
                <div className="ml-auto">$12</div>
              </label>

              <label className="card p-4 flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 addon" data-price="10" />
                <div>
                  <div className="font-heading">Extra length</div>
                  <div className="text-white/70 text-xs">
                    +8–10 tracks on top of selected tier.
                  </div>
                </div>
                <div className="ml-auto">$10</div>
              </label>

              <label className="card p-4 flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 addon" data-price="25" />
                <div>
                  <div className="font-heading">Business license</div>
                  <div className="text-white/70 text-xs">
                    For cafés/salons/gyms. Non‑exclusive use.
                  </div>
                </div>
                <div className="ml-auto">$25</div>
              </label>

              <label className="card p-4 flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 addon" data-price="5" />
                <div>
                  <div className="font-heading">High‑level mix notes</div>
                  <div className="text-white/70 text-xs">
                    Short rationale about sequencing.
                  </div>
                </div>
                <div className="ml-auto">$5</div>
              </label>
            </div>
          </div>

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
              ARTYLST will email your private playlist link and 30s authentication
              video. We never share personal contact info.
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
