import React from 'react'

const TeamPage = () => {
  return (
    <div>

      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-heading leading-tight">Meet the team curating the curators.</h1>
          <p className="text-white/70 mt-3">We’re builders, A&Rs, touring musicians, and product folks—united by a belief that playlists are artworks, not algorithms.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">Music-first</span><span className="chip">Privacy-first</span><span className="chip">Remote-friendly</span>
          </div>
        </div>
        <div className="card p-4">
          <div className="h-56 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">TEAM COLLAGE PLACEHOLDER</div>
        </div>
      </section>


      <section id="leadership" className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-heading text-xl mb-3">Leadership</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="card p-4">
            <div className="h-40 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">PHOTO</div>
            <div className="mt-3">
              <div className="font-heading">Founder Name</div>
              <div className="text-xs text-white/60">Co-founder & CEO</div>
              <p className="text-sm text-white/70 mt-2">Built artist tools at XYZ. Former touring guitarist. Loves longform playlists.</p>
              <div className="mt-2 flex gap-2 text-xs">
                <a className="chip" href="#">LinkedIn</a><a className="chip" href="#">X</a>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="h-40 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">PHOTO</div>
            <div className="mt-3">
              <div className="font-heading">Co-founder Name</div>
              <div className="text-xs text-white/60">COO</div>
              <p className="text-sm text-white/70 mt-2">Payments & marketplace ops at ABC. Escrow & compliance nerd.</p>
              <div className="mt-2 flex gap-2 text-xs">
                <a className="chip" href="#">LinkedIn</a><a className="chip" href="#">X</a>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="h-40 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">PHOTO</div>
            <div className="mt-3">
              <div className="font-heading">Head of Music</div>
              <div className="text-xs text-white/60">Curation & A&R</div>
              <p className="text-sm text-white/70 mt-2">Ex-label A&R, built tastemaker networks across indie & R&B.</p>
              <div className="mt-2 flex gap-2 text-xs">
                <a className="chip" href="#">LinkedIn</a><a className="chip" href="#">X</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="advisors" className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-heading text-xl mb-3">Advisors</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="h-28 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">PHOTO</div>
            <div className="mt-3 text-sm">
              <div className="font-heading">Advisor One</div>
              <div className="text-white/60 text-xs">Ex-DSP Partnerships</div>
            </div>
          </div>
          <div className="card p-4">
            <div className="h-28 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">PHOTO</div>
            <div className="mt-3 text-sm">
              <div className="font-heading">Advisor Two</div>
              <div className="text-white/60 text-xs">Payments & Risk</div>
            </div>
          </div>
          <div className="card p-4">
            <div className="h-28 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">PHOTO</div>
            <div className="mt-3 text-sm">
              <div className="font-heading">Advisor Three</div>
              <div className="text-white/60 text-xs">Brand Strategy</div>
            </div>
          </div>
          <div className="card p-4">
            <div className="h-28 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">PHOTO</div>
            <div className="mt-3 text-sm">
              <div className="font-heading">Advisor Four</div>
              <div className="text-white/60 text-xs">Creator Economy</div>
            </div>
          </div>
        </div>
      </section>

      <section id="culture" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="font-heading text-xl mb-3">Culture & perks</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="card p-4"><h4 className="font-heading">Remote first</h4><p className="text-white/70 mt-1">Flexible hours across time zones.</p></div>
          <div className="card p-4"><h4 className="font-heading">Creator-friendly</h4><p className="text-white/70 mt-1">Monthly stipend for music gear & subscriptions.</p></div>
          <div className="card p-4"><h4 className="font-heading">Learning budget</h4><p className="text-white/70 mt-1">Conferences, courses, mentorship.</p></div>
        </div>
      </section>

      <section id="roles" className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="font-heading text-xl mb-3">Open roles</h2>
        <div className="card divide-y divide-white/10">
          <div className="p-4 flex items-center justify-between">
            <div>
              <div className="font-heading">Founding Engineer (Full-stack)</div>
              <div className="text-xs text-white/60">Remote • TypeScript • Next.js • Payments</div>
            </div>
            <a className="btn btn-primary" href="#">View role</a>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <div className="font-heading">Artist Partnerships Lead</div>
              <div className="text-xs text-white/60">Remote • A&R • Creator ops</div>
            </div>
            <a className="btn btn-primary" href="#">View role</a>
          </div>
        </div>
        <p className="text-xs text-white/60 mt-3">Don’t see your role? <a className="underline hover:text-white" href="#">Pitch us</a>.</p>
      </section>
    </div>
  )
}

export default TeamPage