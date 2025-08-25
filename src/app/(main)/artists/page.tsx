import CategoryChips from '@/components/artists/CategoryChips'
import Link from 'next/link'
import React from 'react'

const ArtistsPage = () => {

  //ARTYLST • Browse Artists
  return (
    <>
      <CategoryChips />
      <div className="pb-16 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* <!-- Filters sidebar --> */}
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-90px)] lg:overflow-auto card p-4">
          <div className="flex items-center justify-between">
            <div className="font-heading">Filters</div>
            <button className="text-xs text-white/60 hover:text-white">Clear all</button>
          </div>

          {/* <!-- Category --> */}
          <div className="mt-4">
            <div className="filter-title">Category</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <label className="chip justify-between"><span>Singers</span><input type="checkbox" /></label>
              <label className="chip justify-between"><span>Producers</span><input type="checkbox" /></label>
              <label className="chip justify-between"><span>DJs</span><input type="checkbox" /></label>
              <label className="chip justify-between"><span>Rappers</span><input type="checkbox" /></label>
            </div>
          </div>

          {/* <!-- Vibes --> */}
          <div className="mt-5">
            <div className="filter-title">Vibes</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <label className="chip"><input type="checkbox" className="mr-2" />Workout</label>
              <label className="chip"><input type="checkbox" className="mr-2" />Study/Focus</label>
              <label className="chip"><input type="checkbox" className="mr-2" />Chill</label>
              <label className="chip"><input type="checkbox" className="mr-2" />Wedding</label>
              <label className="chip"><input type="checkbox" className="mr-2" />Party</label>
            </div>
          </div>

          {/* <!-- Platforms --> */}
          <div className="mt-5">
            <div className="filter-title">Platform</div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <label className="chip justify-center"><input type="checkbox" className="mr-2" />Spotify</label>
              <label className="chip justify-center"><input type="checkbox" className="mr-2" />Apple</label>
              <label className="chip justify-center"><input type="checkbox" className="mr-2" />YTM</label>
            </div>
          </div>

          {/* <!-- Delivery --> */}
          <div className="mt-5">
            <div className="filter-title">Delivery ETA</div>
            <div className="mt-2 space-y-2 text-sm">
              <label className="flex items-center gap-2"><input type="radio" name="eta" /><span>Under 24h</span></label>
              <label className="flex items-center gap-2"><input type="radio" name="eta" /><span>Under 48h</span></label>
              <label className="flex items-center gap-2"><input type="radio" name="eta" /><span>Under 72h</span></label>
            </div>
          </div>

          {/* <!-- Price --> */}
          <div className="mt-5">
            <div className="filter-title">Price</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input className="input" placeholder="Min" />
              <input className="input" placeholder="Max" />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <button className="btn btn-ghost">Under $25</button>
              <button className="btn btn-ghost">$25–$50</button>
              <button className="btn btn-ghost">$50–$100</button>
              <button className="btn btn-ghost">$100+</button>
            </div>
          </div>

          {/* <!-- Language --> */}
          <div className="mt-5">
            <div className="filter-title">Language</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <label className="chip justify-between"><span>English</span><input type="checkbox" /></label>
              <label className="chip justify-between"><span>Bangla</span><input type="checkbox" /></label>
              <label className="chip justify-between"><span>Spanish</span><input type="checkbox" /></label>
              <label className="chip justify-between"><span>Hindi</span><input type="checkbox" /></label>
            </div>
          </div>

          {/* <!-- Business --> */}
          <div className="mt-5">
            <div className="filter-title">Business friendly</div>
            <div className="mt-2 text-sm space-y-2">
              <label className="flex items-center gap-2"><input type="checkbox" /><span>Commercial license option</span></label>
              <label className="flex items-center gap-2"><input type="checkbox" /><span>Monthly refresh available</span></label>
            </div>
          </div>

          <div className="mt-6">
            <button className="btn btn-primary w-full">Apply filters</button>
          </div>
        </aside>
        {/* <!-- Results --> */}
        <section>
          {/* <!-- Top bar --> */}
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="text-sm text-white/80">4,725 results</div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-white/60">Sort</label>
              <select className="input w-44">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Delivery time</option>
                <option>Rating</option>
                <option>Most orders</option>
              </select>
              <button className="btn btn-ghost" title="Grid view">▦</button>
              <button className="btn btn-ghost" title="List view">☰</button>
            </div>
          </div>

          {/* <!-- Grid --> */}
          <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {/* <!-- Card component (repeat) --> */}
            <article className="card hover:bg-white/10 transition">
              <div className="relative">
                <div className="h-44 rounded-t-2xl bg-white/5 border-b border-white/10 grid place-items-center text-white/60">
                  IMAGE PLACEHOLDER
                </div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="px-2 py-0.5 text-[11px] rounded bg-emerald-500/20 border border-emerald-400/30">~48h</span>
                  <span className="px-2 py-0.5 text-[11px] rounded bg-white/10 border border-white/15">2 slots left</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-heading">ARTIST NAME</h3>
                    <p className="text-xs text-white/60">Singer • Curator</p>
                  </div>
                  <div className="text-xs text-white/70">★ 4.9 (1.2k)</div>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="chip text-[11px]">Lo‑fi</span>
                  <span className="chip text-[11px]">Chill</span>
                  <span className="chip text-[11px]">Focus</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="px-2 py-1 rounded bg-white/10 border border-white/10">from $39</span>
                  <div className="flex items-center gap-2 opacity-80">
                    <span className="i-badge" title="Spotify">🎧</span>
                    <span className="i-badge" title="Apple Music"></span>
                    <span className="i-badge" title="YouTube Music">▶︎</span>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link href="/artists/122323" className="btn btn-primary flex-1">Request playlist</Link>
                  <Link href="/artists/122323" className="btn btn-ghost">Profile</Link>
                </div>
              </div>
            </article>

            {/* <!-- Duplicate 7 more placeholders quickly --> */}
            <article className="card hover:bg-white/10 transition">
              <div className="relative">
                <div className="h-44 rounded-t-2xl bg-white/5 border-b border-white/10 grid place-items-center text-white/60">IMAGE PLACEHOLDER</div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="px-2 py-0.5 text-[11px] rounded bg-emerald-500/20 border border-emerald-400/30">~24h</span>
                  <span className="px-2 py-0.5 text-[11px] rounded bg-white/10 border border-white/15">5 slots left</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div><h3 className="text-sm font-heading">SOFTYET</h3><p className="text-xs text-white/60">Singer • Pop</p></div>
                  <div className="text-xs text-white/70">★ 4.8 (980)</div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2"><span className="chip text-[11px]">Pop</span><span className="chip text-[11px]">Feel‑good</span></div>
                <div className="mt-3 flex items-center justify-between text-xs"><span className="px-2 py-1 rounded bg-white/10 border border-white/10">from $45</span><div className="flex items-center gap-2 opacity-80"><span className="i-badge">🎧</span><span className="i-badge"></span><span className="i-badge">▶︎</span></div></div>
                <div className="mt-3 flex gap-2"><Link href="/artists/122323" className="btn btn-primary flex-1">Request playlist</Link><Link href="/artists/122323" className="btn btn-ghost">Profile</Link></div>
              </div>
            </article>

            <article className="card hover:bg-white/10 transition">
              <div className="relative">
                <div className="h-44 rounded-t-2xl bg-white/5 border-b border-white/10 grid place-items-center text-white/60">IMAGE PLACEHOLDER</div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="px-2 py-0.5 text-[11px] rounded bg-emerald-500/20 border border-emerald-400/30">~72h</span>
                  <span className="px-2 py-0.5 text-[11px] rounded bg-white/10 border border-white/15">1 slot left</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div><h3 className="text-sm font-heading">SMOOTH PAPI</h3><p className="text-xs text-white/60">Creator • Hip‑hop</p></div>
                  <div className="text-xs text-white/70">★ 4.7 (640)</div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2"><span className="chip text-[11px]">Hype</span><span className="chip text-[11px]">Workout</span></div>
                <div className="mt-3 flex items-center justify-between text-xs"><span className="px-2 py-1 rounded bg-white/10 border border-white/10">from $32</span><div className="flex items-center gap-2 opacity-80"><span className="i-badge">🎧</span><span className="i-badge"></span><span className="i-badge">▶︎</span></div></div>
                <div className="mt-3 flex gap-2"><Link href="/artists/122323" className="btn btn-primary flex-1">Request playlist</Link><Link href="/artists/122323" className="btn btn-ghost">Profile</Link></div>
              </div>
            </article>

            <article className="card hover:bg-white/10 transition">
              <div className="relative">
                <div className="h-44 rounded-t-2xl bg-white/5 border-b border-white/10 grid place-items-center text-white/60">IMAGE PLACEHOLDER</div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="px-2 py-0.5 text-[11px] rounded bg-emerald-500/20 border border-emerald-400/30">~48h</span>
                  <span className="px-2 py-0.5 text-[11px] rounded bg-white/10 border border-white/15">3 slots left</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div><h3 className="text-sm font-heading">CASS BOWMAN</h3><p className="text-xs text-white/60">Curator • Pop</p></div>
                  <div className="text-xs text-white/70">★ 4.8 (1.1k)</div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2"><span className="chip text-[11px]">Pop</span><span className="chip text-[11px]">Feel‑good</span></div>
                <div className="mt-3 flex items-center justify-between text-xs"><span className="px-2 py-1 rounded bg-white/10 border border-white/10">from $39</span><div className="flex items-center gap-2 opacity-80"><span className="i-badge">🎧</span><span className="i-badge"></span><span className="i-badge">▶︎</span></div></div>
                <div className="mt-3 flex gap-2"><Link href="/artists/122323" className="btn btn-primary flex-1">Request playlist</Link><Link href="/artists/122323" className="btn btn-ghost">Profile</Link></div>
              </div>
            </article>

            {/* <!-- 4 more fast copies --> */}
            <article className="card hover:bg-white/10 transition"><div className="relative"><div className="h-44 rounded-t-2xl bg-white/5 border-b border-white/10 grid place-items-center text-white/60">IMAGE PLACEHOLDER</div><div className="absolute top-2 left-2 flex gap-1"><span className="px-2 py-0.5 text-[11px] rounded bg-emerald-500/20 border border-emerald-400/30">~48h</span></div></div><div className="p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="text-sm font-heading">DJ LUMA</h3><p className="text-xs text-white/60">DJ • Electronic</p></div><div className="text-xs text-white/70">★ 4.9</div></div><div className="mt-2 flex flex-wrap gap-2"><span className="chip text-[11px]">EDM</span><span className="chip text-[11px]">Party</span></div><div className="mt-3 flex items-center justify-between text-xs"><span className="px-2 py-1 rounded bg-white/10 border border-white/10">from $55</span><div className="flex items-center gap-2 opacity-80"><span className="i-badge">🎧</span><span className="i-badge"></span><span className="i-badge">▶︎</span></div></div><div className="mt-3 flex gap-2"><Link href="/artists/122323" className="btn btn-primary flex-1">Request playlist</Link><Link href="/artists/122323" className="btn btn-ghost">Profile</Link></div></div></article>

            <article className="card hover:bg-white/10 transition"><div className="relative"><div className="h-44 rounded-t-2xl bg-white/5 border-b border-white/10 grid place-items-center text-white/60">IMAGE PLACEHOLDER</div><div className="absolute top-2 left-2 flex gap-1"><span className="px-2 py-0.5 text-[11px] rounded bg-emerald-500/20 border border-emerald-400/30">~24h</span></div></div><div className="p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="text-sm font-heading">AFRO VIBES</h3><p className="text-xs text-white/60">Producer • Afrobeats</p></div><div className="text-xs text-white/70">★ 4.8</div></div><div className="mt-2 flex flex-wrap gap-2"><span className="chip text-[11px]">Afrobeats</span><span className="chip text-[11px]">Dance</span></div><div className="mt-3 flex items-center justify-between text-xs"><span className="px-2 py-1 rounded bg-white/10 border border-white/10">from $49</span><div className="flex items-center gap-2 opacity-80"><span className="i-badge">🎧</span><span className="i-badge"></span><span className="i-badge">▶︎</span></div></div><div className="mt-3 flex gap-2"><Link href="/artists/122323" className="btn btn-primary flex-1">Request playlist</Link><Link href="/artists/122323" className="btn btn-ghost">Profile</Link></div></div></article>

            <article className="card hover:bg-white/10 transition"><div className="relative"><div className="h-44 rounded-t-2xl bg-white/5 border-b border-white/10 grid place-items-center text-white/60">IMAGE PLACEHOLDER</div><div className="absolute top-2 left-2 flex gap-1"><span className="px-2 py-0.5 text-[11px] rounded bg-emerald-500/20 border border-emerald-400/30">~72h</span></div></div><div className="p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="text-sm font-heading">GUITAR SAGE</h3><p className="text-xs text-white/60">Guitarist • Indie</p></div><div className="text-xs text-white/70">★ 4.6</div></div><div className="mt-2 flex flex-wrap gap-2"><span className="chip text-[11px]">Indie</span><span className="chip text-[11px]">Acoustic</span></div><div className="mt-3 flex items-center justify-between text-xs"><span className="px-2 py-1 rounded bg-white/10 border border-white/10">from $29</span><div className="flex items-center gap-2 opacity-80"><span className="i-badge">🎧</span><span className="i-badge"></span><span className="i-badge">▶︎</span></div></div><div className="mt-3 flex gap-2"><Link href="/artists/122323" className="btn btn-primary flex-1">Request playlist</Link><Link href="/artists/122323" className="btn btn-ghost">Profile</Link></div></div></article>

            <article className="card hover:bg-white/10 transition"><div className="relative"><div className="h-44 rounded-t-2xl bg-white/5 border-b border-white/10 grid place-items-center text-white/60">IMAGE PLACEHOLDER</div><div className="absolute top-2 left-2 flex gap-1"><span className="px-2 py-0.5 text-[11px] rounded bg-emerald-500/20 border border-emerald-400/30">~48h</span></div></div><div className="p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="text-sm font-heading">LO‑FI LAB</h3><p className="text-xs text-white/60">Producer • Lo‑fi</p></div><div className="text-xs text-white/70">★ 5.0</div></div><div className="mt-2 flex flex-wrap gap-2"><span className="chip text-[11px]">Lo‑fi</span><span className="chip text-[11px]">Study</span></div><div className="mt-3 flex items-center justify-between text-xs"><span className="px-2 py-1 rounded bg-white/10 border border-white/10">from $22</span><div className="flex items-center gap-2 opacity-80"><span className="i-badge">🎧</span><span className="i-badge"></span><span className="i-badge">▶︎</span></div></div><div className="mt-3 flex gap-2"><Link href="/artists/122323" className="btn btn-primary flex-1">Request playlist</Link><Link href="/artists/122323" className="btn btn-ghost">Profile</Link></div></div></article>
          </div>

          {/* <!-- Pagination --> */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button className="btn btn-ghost">« Prev</button>
            <div className="chip">1</div>
            <div className="chip">2</div>
            <div className="chip">3</div>
            <span className="text-white/50 text-sm">…</span>
            <div className="chip">9</div>
            <button className="btn btn-ghost">Next »</button>
          </div>
        </section>
      </div>
    </>
  )
}

export default ArtistsPage