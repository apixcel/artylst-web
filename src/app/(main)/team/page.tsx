import { LinkedinIcon, TwitterIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";

const TeamPage = () => {
  return (
    <div>
      {/* team hero */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bricolage-grotesque">
            <span className="gradient-text-secondary">Meet the team</span> curating the
            curators.
          </h1>
          <p className="text-muted mt-3">
            We’re builders, A&Rs, touring musicians, and product folks united by a belief
            that playlists are artworks, not algorithms.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip bg-brand-4/10 border-brand-4/20">Music-first</span>
            <span className="chip bg-brand-4/10 border-brand-4/20">Privacy-first</span>
            <span className="chip bg-brand-4/10 border-brand-4/20">Remote-friendly</span>
          </div>
        </div>
        <div className="card overflow-hidden lg:block hidden">
          <Image
            src="/images/team/team-together.jpg"
            alt="Team"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* leadership */}
      <section id="leadership" className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="mb-3 font-bricolage-grotesque text-2xl">Leadership</h2>
        <div className="grid sm:grid-cols-4 lg:grid-cols-3 gap-4">
          {/* founder */}
          <div className="lg:col-span-1 col-span-2">
            <div className="mb-3 lg:h-[230px] h-[200px] overflow-hidden rounded-xl">
              <Image
                src="/images/team/team-1.jpg"
                alt="Team"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-lg">Founder Name</div>
              <div className="text-muted">Co-founder & CEO</div>
              <p className="text-light mt-2">
                Built artist tools at XYZ. Former touring guitarist. Loves longform
                playlists.
              </p>
              <div className="mt-2 flex gap-2">
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.linkedin.com"
                >
                  <LinkedinIcon />
                </Link>
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.twitter.com"
                >
                  <TwitterIcon />
                </Link>
              </div>
            </div>
          </div>
          {/* co-founder */}
          <div className="lg:col-span-1 col-span-2">
            <div className="mb-3 lg:h-[230px] h-[200px] overflow-hidden rounded-xl">
              <Image
                src="/images/team/team-2.jpeg"
                alt="Team"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-lg">Co-founder Name</div>
              <div className="text-muted">COO</div>
              <p className="text-light mt-2">
                Payments & marketplace ops at ABC. Escrow & compliance nerd.
              </p>
              <div className="mt-2 flex gap-2">
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.linkedin.com"
                >
                  <LinkedinIcon />
                </Link>
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.twitter.com"
                >
                  <TwitterIcon />
                </Link>
              </div>
            </div>
          </div>
          {/* head of music */}
          <div className="lg:col-span-1 col-span-2 sm:col-start-2">
            <div className="mb-3 h-[230px] overflow-hidden rounded-xl">
              <Image
                src="/images/team/team-3.jpeg"
                alt="Team"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-lg">Head of Music</div>
              <div className="text-muted">Curation & A&R</div>
              <p className="text-light mt-2">
                Ex-label A&R, built tastemaker networks across indie & R&B.
              </p>
              <div className="mt-2 flex gap-2">
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.linkedin.com"
                >
                  <LinkedinIcon />
                </Link>
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  href="#"
                >
                  <TwitterIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* advisors */}
      <section id="advisors" className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="mb-3 font-bricolage-grotesque text-2xl">Advisors</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* advisor one */}
          <div className="card overflow-hidden">
            <div className="mb-3 lg:h-[230px] h-[200px] overflow-hidden rounded-t-xl">
              <Image
                src="/images/team/team-4.png"
                alt="Team"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-lg">Advisor One</div>
              <p className="mt-1 text-muted">Ex-DSP Partnerships</p>
              <div className="mt-2 flex gap-2">
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.linkedin.com"
                >
                  <LinkedinIcon />
                </Link>
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.twitter.com"
                >
                  <TwitterIcon />
                </Link>
              </div>
            </div>
          </div>
          {/* advisor two */}
          <div className="card overflow-hidden">
            <div className="mb-3 lg:h-[230px] h-[200px] overflow-hidden rounded-t-xl">
              <Image
                src="/images/team/team-5.png"
                alt="Team"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-lg">Advisor Two</div>
              <p className="mt-1 text-muted">Payments & Risk</p>
              <div className="mt-2 flex gap-2">
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.linkedin.com"
                >
                  <LinkedinIcon />
                </Link>
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.twitter.com"
                >
                  <TwitterIcon />
                </Link>
              </div>
            </div>
          </div>
          {/* advisor three */}
          <div className="card overflow-hidden">
            <div className="mb-3 lg:h-[230px] h-[200px] overflow-hidden rounded-t-xl">
              <Image
                src="/images/team/team-6.png"
                alt="Team"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-lg">Advisor Three</div>
              <p className="mt-1 text-muted">Brand Strategy</p>
              <div className="mt-2 flex gap-2">
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.linkedin.com"
                >
                  <LinkedinIcon />
                </Link>
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.twitter.com"
                >
                  <TwitterIcon />
                </Link>
              </div>
            </div>
          </div>
          {/* advisor four */}
          <div className="card overflow-hidden">
            <div className="mb-3 lg:h-[230px] h-[200px] overflow-hidden rounded-t-xl">
              <Image
                src="/images/team/team-7.png"
                alt="Team"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-lg">Advisor Four</div>
              <p className="mt-1 text-muted">Creator Economy</p>
              <div className="mt-2 flex gap-2">
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.linkedin.com"
                >
                  <LinkedinIcon />
                </Link>
                <Link
                  className="w-[32px] h-[32px] flex-center bg-white/5 rounded-full hover:bg-brand-4/10"
                  target="_blank"
                  href="https://www.twitter.com"
                >
                  <TwitterIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* culture & perks */}
      <section id="culture" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="font-heading text-xl mb-3">Culture & perks</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="card p-4">
            <h4 className="font-heading">Remote first</h4>
            <p className="text-white/70 mt-1">Flexible hours across time zones.</p>
          </div>
          <div className="card p-4">
            <h4 className="font-heading">Creator-friendly</h4>
            <p className="text-white/70 mt-1">
              Monthly stipend for music gear & subscriptions.
            </p>
          </div>
          <div className="card p-4">
            <h4 className="font-heading">Learning budget</h4>
            <p className="text-white/70 mt-1">Conferences, courses, mentorship.</p>
          </div>
        </div>
      </section>

      {/* open roles */}
      <section id="roles" className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="font-heading text-xl mb-3">Open roles</h2>
        <div className="card divide-y divide-white/10">
          <div className="p-4 flex items-center justify-between">
            <div>
              <div className="font-heading">Founding Engineer (Full-stack)</div>
              <div className="text-xs text-muted">
                Remote • TypeScript • Next.js • Payments
              </div>
            </div>
            <a className="btn btn-primary" href="#">
              View role
            </a>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <div className="font-heading">Artist Partnerships Lead</div>
              <div className="text-xs text-muted">Remote • A&R • Creator ops</div>
            </div>
            <a className="btn btn-primary" href="#">
              View role
            </a>
          </div>
        </div>
        <p className="text-xs text-muted mt-3">
          Don’t see your role?{" "}
          <a className="underline hover:text-white" href="#">
            Pitch us
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TeamPage;
