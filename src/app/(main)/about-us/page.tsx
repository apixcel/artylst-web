import React from "react";

const AboutPage = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-heading leading-tight">
            About ARTYLST
          </h1>
          <p className="text-white/70 mt-3">
            We connect fans and brands with real artists through{" "}
            <b>private, personalized playlists</b>—delivered with a{" "}
            <b>30-second authentication video</b>. Unlike video-shout marketplaces,
            ARTYLST is <i>music-first</i>, privacy-first, and built on secure escrow.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="for-business.html" className="btn btn-primary">
              For Business
            </a>
            <a href="join-talent.html" className="btn bg-white/10 hover:bg-white/15">
              Join as Talent
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">Playlist-centric</span>
            <span className="chip">30s Auth Video</span>
            <span className="chip">Escrow & Privacy</span>
            <span className="chip">Monthly Refresh</span>
          </div>
        </div>
        <div className="card p-4">
          <div className="h-56 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
            IMAGE PLACEHOLDER (brand montage)
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4 text-xs text-white/80">
            <div className="card p-3">
              Avg delivery <b>48–72h</b>
            </div>
            <div className="card p-3">
              Artists onboard <b>Growing</b>
            </div>
            <div className="card p-3">
              Platform fee <b>20%</b>
            </div>
          </div>
        </div>
      </section>

      <section
        id="mission"
        className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-4"
      >
        <div className="card p-5 md:col-span-2">
          <h2 className="font-heading text-xl">Our mission</h2>
          <p className="text-white/70 mt-2">
            Make music <i>personal</i> again—by letting audiences experience the taste of
            artists they love, without sacrificing privacy. ARTYLST turns playlists into
            keepsakes and brand assets.
          </p>
        </div>
        <div className="card p-5">
          <h3 className="font-heading text-sm">How we’re different (vs Cameo-style)</h3>
          <ul className="text-sm text-white/80 mt-2 space-y-2">
            <li>
              • <b>Playlist-first</b>, not video-first
            </li>
            <li>
              • <b>Auth video</b> only to certify the playlist
            </li>
            <li>
              • <b>Escrow</b> & verified delivery before payout
            </li>
            <li>
              • <b>Business refresh</b> & daypart options
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="font-heading text-xl mb-3">How ARTYLST works</h2>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="card p-4">
            <div className="text-white/60">①</div>
            <h4 className="font-heading mt-1">Brief</h4>
            <p className="text-white/70 mt-1">Occasion, vibe, platform.</p>
          </div>
          <div className="card p-4">
            <div className="text-white/60">②</div>
            <h4 className="font-heading mt-1">Curation</h4>
            <p className="text-white/70 mt-1">Artist-crafted playlist.</p>
          </div>
          <div className="card p-4">
            <div className="text-white/60">③</div>
            <h4 className="font-heading mt-1">Delivery</h4>
            <p className="text-white/70 mt-1">Private link + 30s video.</p>
          </div>
          <div className="card p-4">
            <div className="text-white/60">④</div>
            <h4 className="font-heading mt-1">Payout</h4>
            <p className="text-white/70 mt-1">After verification.</p>
          </div>
        </div>
      </section>

      <section id="values" className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="font-heading text-xl mb-3">What we believe</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="card p-4">
            <h4 className="font-heading">Taste over trends</h4>
            <p className="text-white/70 mt-1">Real artists, real curation.</p>
          </div>
          <div className="card p-4">
            <h4 className="font-heading">Privacy by default</h4>
            <p className="text-white/70 mt-1">No personal contact shares.</p>
          </div>
          <div className="card p-4">
            <h4 className="font-heading">Fair economics</h4>
            <p className="text-white/70 mt-1">Transparent 20% fee; artists set prices.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="font-heading text-xl mb-3">From idea to marketplace</h2>
        <div className="card p-6">
          <ol className="relative border-l border-white/10 pl-6 space-y-6 text-sm">
            <li>
              <span className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-brand shadow-glow"></span>
              <b>Concept</b> — Personalized, private playlists with authentication.
            </li>
            <li>
              <span className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-brand shadow-glow"></span>
              <b>Pilot</b> — Early artists, coffee shops & yoga studios.
            </li>
            <li>
              <span className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-brand shadow-glow"></span>
              <b>Launch</b> — Web app (mobile-friendly), escrow & payouts.
            </li>
          </ol>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="font-heading text-xl mb-3">Seen in</h2>
        <div className="card p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs text-white/60">
          <div className="h-10 rounded bg-white/5 grid place-items-center">LOGO</div>
          <div className="h-10 rounded bg-white/5 grid place-items-center">LOGO</div>
          <div className="h-10 rounded bg-white/5 grid place-items-center">LOGO</div>
          <div className="h-10 rounded bg-white/5 grid place-items-center">LOGO</div>
          <div className="h-10 rounded bg-white/5 grid place-items-center">LOGO</div>
          <div className="h-10 rounded bg-white/5 grid place-items-center">LOGO</div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12 grid md:grid-cols-3 gap-4">
        <div className="card p-5 md:col-span-2">
          <h3 className="font-heading text-xl">A note from the founders</h3>
          <p className="text-white/70 mt-2">
            Playlists are how artists think in stories. ARTYLST lets that storytelling
            reach fans & spaces, privately and meaningfully.
          </p>
        </div>
        <div className="card p-5">
          <div className="h-24 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
            FOUNDER PHOTO
          </div>
          <p className="text-sm text-white/70 mt-2">Founder Name • Co-founder Name</p>
        </div>
      </section>

      <section id="faq" className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="font-heading text-xl mb-3">FAQ</h2>
        <div className="space-y-2 text-sm">
          <details className="card p-4">
            <summary className="cursor-pointer">Is ARTYLST like Cameo?</summary>
            <p className="text-white/70 mt-2">
              We’re playlist-centric. Videos certify the playlist; music is the product.
            </p>
          </details>
          <details className="card p-4">
            <summary className="cursor-pointer">Which platforms do you support?</summary>
            <p className="text-white/70 mt-2">Spotify, Apple Music, YouTube Music.</p>
          </details>
          <details className="card p-4">
            <summary className="cursor-pointer">How does privacy work?</summary>
            <p className="text-white/70 mt-2">
              We act as an intermediary; no personal contact exchange.
            </p>
          </details>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
