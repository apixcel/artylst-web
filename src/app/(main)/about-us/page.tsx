import {
  AboutUsBrandSlider,
  AboutUsSteps,
  AboutVideo,
  WhyChooseUs,
  FAQ,
  Security,
} from "@/components";
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
    a: "For technical issues, you can request a revision within 7 days of delivery. Once requested, minor fixes are usually resolved within 24-48 hours. The music selections by an artist are not an appropriate reason for a revision but you are able to leave a review for the artists to share your experience if you are displeased.",
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
          <h1 className="text-3xl md:text-5xl leading-tight">About ARTYLST</h1>
          <p className="text-muted mt-3">
            ARTYLST is a digital platform designed to deepen the connection between music
            artists and their fans through personalized, private listening experiences.
            With ARTYLST, fans and businesses can connect with their favorite artist
            through exclusive, custom playlists made just for them. By merging artistry,
            technology and fan engagement, ARTYLST redefines how music communities connect
            - turning playlist into personalized works of art and strengthening the bond
            between artist and audience.
          </p>
          <div className="mt-5 flex gap-3">
            <Link href="/business" className="btn btn-secondary">
              Browse Artist
            </Link>
            <Link href="/business" className="btn btn-secondary bg-azure">
              For Business
            </Link>
            <Link href="/join-as-artist" className="btn btn-tertiary">
              Join as Artist
            </Link>
          </div>
        </div>

        {/* about video */}
        {/* <AboutVideo /> */}
        <div className="w-full h-full bg-brand-2/10 rounded-xl p-4 flex-center">
          Video Placeholder
        </div>
      </section>

      {/* our mission */}
      <section
        id="mission"
        className="px-4 py-8 card bg-brand-4/5 border-brand-4/20 mb-[40px]"
      >
        <div className="p-5 text-center max-w-[600px] mx-auto">
          <h1>Our mission</h1>
          <p className="text-muted mt-2">
            Make music personal again - by letting audiences experience the musical taste
            of the artists they love while also connecting with them in a manner never
            experienced before. ARTYLST turns playlists into both keepsakes and brand
            assets.
          </p>
        </div>
      </section>

      {/* how it works */}
      <AboutUsSteps />

      {/* what we believe */}
      <section id="values" className="wrapper-inner px-4 pb-10">
        <h2 className=" mb-3 text-center">What we believe</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="card p-4 text-center">
            <h4 className="text-base">Taste over trends</h4>
            <p className="text-muted mt-1">Real artists, real curation.</p>
          </div>
          <div className="card p-4 text-center">
            <h4 className="text-base">Privacy by default</h4>
            <p className="text-muted mt-1">No personal contact shares.</p>
          </div>
          <div className="card p-4 text-center">
            <h4 className="text-base">Fair economics</h4>
            <p className="text-muted mt-1">Transparent pricing set by the artist</p>
          </div>
        </div>
      </section>

      {/* seen in */}
      <AboutUsBrandSlider />

      {/* a note from the founders */}
      <section className="wrapper-inner px-4 pb-16 lg:grid lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Side - Note */}
        <div className="card bg-brand-2/10 p-8 md:col-span-2 rounded-2xl shadow-sm flex flex-col justify-center mb-4 lg:mb-0 h-full">
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
            A note from the founders
          </h3>
          <p className="text-muted leading-relaxed text-base lg:text-lg">
            “One of my favorite feelings growing up was getting a burned CD of new music
            made just for me, by a friend or stranger. There was something really magical
            about receiving music from someone else and knowing they made it thinking of
            you. My hope with <span className="font-bold text-light">ARTYLST</span> was to
            try and capture that same feeling. Not only capture it, but make it even more
            special by connecting you directly with your favorite artist. What was once a
            dream is now a reality with{" "}
            <span className="font-bold text-light">ARTYLST</span>.”
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

      <Security />

      <WhyChooseUs />

      {/* faq */}
      <FAQ items={faqs} columns={2} breakpoint="lg" className="wrapper-inner" />
    </>
  );
};

export default AboutPage;
