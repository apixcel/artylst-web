import { AboutUsBrandSlider, AboutUsSteps, AboutVideo, FAQ } from "@/components";
import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    q: "Which platforms do you support?",
    a: "Spotify, Apple Music, YouTube Music — the artist will deliver a private link.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders are delivered within 2–5 business days depending on scope. You'll see an ETA at checkout and get updates by email.",
  },
  {
    q: "Do you share personal contact info?",
    a: "No. We keep communication inside the platform for safety and privacy.",
  },
  {
    q: "What if I need a revision?",
    a: "You can request revisions within 7 days of delivery. Minor fixes are usually turned around in 24–48 hours.",
  },
  {
    q: "Can I cancel an order?",
    a: "Yes, you can cancel before the artist has started working. Once work has begun, cancellations may be subject to partial refunds depending on progress.",
  },
  {
    q: "How do payments work?",
    a: "All payments are handled securely through our platform. Funds are held in escrow and only released to the artist once the order is completed and approved.",
  },
  {
    q: "Do artists retain rights to the music?",
    a: "Yes. Unless you’ve purchased a business or exclusive license, artists retain copyright ownership. You’re buying usage rights as outlined in the tier you select.",
  },
  {
    q: "Can I request a specific genre or vibe?",
    a: "Definitely. At checkout, you can specify mood, tempo, and inspirations to help the artist tailor the playlist or track to your preferences.",
  },
  {
    q: "What happens if the artist misses the deadline?",
    a: "If an artist fails to deliver on time, you’ll receive an updated ETA. If they cannot complete the order, you’ll be fully refunded.",
  },
  {
    q: "Is there support if I have an issue?",
    a: "Yes. Our support team is available by email or chat for order issues, disputes, or general questions.",
  },
];

const AboutPage = () => {
  return (
    <>
      {/* hero */}
      <section className="px-4 py-8 lg:py-12 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bricolage-grotesque leading-tight">
            About ARTYLST
          </h1>
          <p className="text-muted mt-3">
            We connect fans and brands with real artists through{" "}
            <b>private, personalized playlists</b> delivered with a{" "}
            <b>30-second authentication video</b>. Unlike video-shout marketplaces,
            ARTYLST is <i>music-first</i>, privacy-first, and built on secure escrow.
          </p>
          <div className="mt-5 flex gap-3">
            <Link href="/business" className="btn btn-secondary">
              For Business
            </Link>
            <Link href="/join-as-artist" className="btn btn-tertiary">
              Join as Artist
            </Link>
          </div>
        </div>

        {/* about video */}
        <AboutVideo />
      </section>

      {/* our mission */}
      <section id="mission" className=" px-4 py-8 grid md:grid-cols-2 gap-4">
        <div className="card bg-brand-4/5 border-brand-4/20 p-5">
          <h1 className="font-bricolage-grotesque">Our mission</h1>
          <p className="text-muted mt-2">
            Make music <i>personal</i> again—by letting audiences experience the taste of
            artists they love, without sacrificing privacy. ARTYLST turns playlists into
            keepsakes and brand assets.
          </p>
        </div>

        <div className="card bg-brand-4/5 border-brand-4/20 p-5">
          <h3 className="font-bricolage-grotesque text-base">
            How we’re different (vs Cameo-style)
          </h3>
          <ul className="text-muted mt-2 space-y-2">
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

      {/* how it works */}
      <AboutUsSteps />

      {/* what we believe */}
      <section id="values" className="wrapper-inner px-4 pb-10">
        <h2 className="font-bricolage-grotesque mb-3">What we believe</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="card p-4">
            <h4 className="text-base">Taste over trends</h4>
            <p className="text-muted mt-1">Real artists, real curation.</p>
          </div>
          <div className="card p-4">
            <h4 className="text-base">Privacy by default</h4>
            <p className="text-muted mt-1">No personal contact shares.</p>
          </div>
          <div className="card p-4">
            <h4 className="text-base">Fair economics</h4>
            <p className="text-muted mt-1">Transparent 20% fee; artists set prices.</p>
          </div>
        </div>
      </section>

      {/* from idea to marketplace */}
      <section className="wrapper-inner border border-white/10 rounded-xl bg-gradient-to-br from-brand-2/20 via-brand-3/15 to-brand-5/20  p-6 flex flex-col justify-between transition-colors mb-[40px]">
        <h2 className="font-heading text-xl mb-3">From idea to marketplace</h2>
        <div className="px-6 py-4">
          <ol className="relative border-l border-brand-4/20 my-2 pl-6 space-y-6 text-sm">
            <li>
              <span className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-brand-4 shadow-glow"></span>
              <b>Concept</b> — Personalized, private playlists with authentication.
            </li>
            <li>
              <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-brand-4 shadow-glow"></span>
              <b>Pilot</b> — Early artists, coffee shops & yoga studios.
            </li>
            <li>
              <span className="absolute -left-1.5 h-3 bottom-0 w-3 rounded-full bg-brand-4 shadow-glow"></span>
              <b>Launch</b> — Web app (mobile-friendly), escrow & payouts.
            </li>
          </ol>
        </div>
      </section>

      {/* seen in */}
      <AboutUsBrandSlider />

      {/* a note from the founders */}
      <section className="wrapper-inner px-4 pb-16 lg:grid lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Side - Note */}
        <div className="card bg-brand-2/10 p-8 md:col-span-2 rounded-2xl shadow-sm flex flex-col justify-center mb-4 lg:mb-0 h-full">
          <h3 className="font-bricolage-grotesque text-2xl lg:text-3xl font-semibold mb-4">
            A note from the founders
          </h3>
          <p className="text-muted leading-relaxed text-base lg:text-lg">
            Playlists are how artists think in stories.
            <span className="text-white/90 font-medium"> ARTYLST </span>
            lets that storytelling reach fans & spaces, privately and meaningfully.
          </p>
        </div>

        {/* Right Side - Founder Card */}
        <div className="card overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition lg:max-w-full sm:max-w-[300px] lg:mx-0 mx-auto h-full flex flex-col">
          <div className="lg:h-[260px] h-[220px] overflow-hidden">
            <Image
              src="/images/team/team-4.png"
              alt="Team"
              width={1000}
              height={1000}
              className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
            />
          </div>
          <div className="p-5 bg-white/5 backdrop-blur">
            <h4 className="text-white font-medium">
              Founder Name <span className="text-muted px-1">•</span> Co-founder of
              ARTYLST
            </h4>
          </div>
        </div>
      </section>

      {/* faq */}
      <FAQ items={faqs} columns={2} breakpoint="lg" className="wrapper-inner" />
    </>
  );
};

export default AboutPage;
