"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Globe,
  Instagram,
  Link2,
  Music4,
  Pencil,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Tally5,
  Trash2,
  Upload,
  User,
  Youtube,
} from "lucide-react";
import { TiktokIcon } from "@/icons";
import { ArtistMedia, MultiDropdown, UnauthorizedMsgBox } from "@/components";
import { DropdownOption } from "@/interface";
import { useAppSelector } from "@/hooks";

const genresOptions: DropdownOption<string>[] = [
  { label: "Hip‑hop", value: "hip-hop" },
  { label: "R&B", value: "r&b" },
  { label: "Soulful", value: "soulful" },
  { label: "Clean", value: "clean" },
];

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 border border-white/10 text-xs">
    {children}
  </span>
);

const ArtistProfileView = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  const [displayName, setDisplayName] = useState("Sloane Rivers");
  const [handle, setHandle] = useState("@sloane");
  const [bio, setBio] = useState("Grammy‑winning producer...");
  const publicUrl = `https://lystn.app/${handle.replace("@", "")}`;

  const [genres, setGenres] = useState<DropdownOption<string>[]>([]);

  if (role !== "artist") return <UnauthorizedMsgBox />;

  return (
    <section className="space-y-6">
      <div className="flex md:items-end flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="dashboard-page-title">Public Profile</h1>
          <p className="text-muted text-sm mt-1">
            What fans and businesses see on your public page
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/artist/tiers" className="btn-tertiary btn gap-1">
            <Tally5 className="h-4 w-4" /> Manage tiers
          </Link>
          <button className="btn-secondary">Save changes</button>
        </div>
      </div>

      {/* Completeness meter */}
      <div className="rounded-2xl p-5 border border-white/10 bg-brand-2/10 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" /> Profile completeness
          </div>
          <div className="text-base text-muted">72%</div>
        </div>
        <div className="h-2 mt-3 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-white/70 rounded-full" style={{ width: "72%" }} />
        </div>
        <ul className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
          <li className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Display name
          </li>
          <li className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Bio
          </li>
          <li className="flex items-center gap-1 opacity-60">
            <CheckCircle2 className="h-3 w-3" /> Intro video
          </li>
          <li className="flex items-center gap-1 opacity-60">
            <CheckCircle2 className="h-3 w-3" /> Streaming connected
          </li>
        </ul>
      </div>

      <div className="grid xl:grid-cols-3 gap-4">
        {/* Left: Form */}
        <div className="xl:col-span-2 rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 backdrop-blur-2xl space-y-6">
          {/* Media */}
          <ArtistMedia />

          {/* Basics */}
          <div className="flex flex-col gap-4 border-b border-white/10 pb-4">
            {/* display name */}
            <div>
              <label className="text-sm text-muted">Display name</label>
              <div className="flex gap-2 items-center">
                <input
                  className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-3"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />

                <button className="bg-brand-4/60 px-3 rounded-lg flex gap-2 py-3 items-center hover:bg-brand-4/70">
                  <Pencil className="h-4 w-4" /> Edit
                </button>
              </div>
            </div>

            {/* handle */}
            <div>
              <label className="text-sm text-muted">Handle</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-3"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />

                <button className="bg-brand-4/60 px-3 rounded-lg flex gap-2 py-3 items-center hover:bg-brand-4/70">
                  <Pencil className="h-4 w-4" /> Edit
                </button>
              </div>
              <div className=" mt-2 flex items-center gap-1">
                <p className="text-xs text-muted">Unique URL for your public profile.</p>
                <Chip>
                  <Globe className="h-3 w-3" /> {publicUrl}
                </Chip>
              </div>
            </div>

            {/* bio */}
            <div>
              <label className="text-sm text-muted">
                Bio <span className="text-muted">(max 300)</span>
              </label>

              <div className="flex sm:flex-row flex-col gap-2 items-end mt-1">
                <textarea
                  rows={4}
                  className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-3"
                  value={bio}
                  readOnly
                  onChange={(e) => setBio(e.target.value)}
                />

                <button className="bg-brand-4/60 px-3 rounded-lg flex gap-2 py-3 items-center hover:bg-brand-4/70 w-full sm:w-auto sm:justify-start justify-center">
                  <Pencil className="h-4 w-4" /> Edit
                </button>
              </div>

              <div className="text-xs text-muted mt-1">
                Tip: mention notable credits, moods you excel at, and turnaround time.
              </div>
            </div>
          </div>

          {/* Genres & tags */}
          <div className="border-b border-white/10 pb-4">
            <label className="text-sm text-muted block mb-1">Genres & tags</label>

            <MultiDropdown
              options={genresOptions}
              values={genres}
              onChange={setGenres}
              className="w-full"
            />
          </div>

          {/* Locale */}
          <div className="grid sm:grid-cols-3 gap-4 border-b border-white/10 pb-4">
            <div>
              <label className="text-sm text-white/60">Languages</label>
              <input
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                placeholder="English"
              />
            </div>
            <div>
              <label className="text-sm text-white/60">Timezone</label>
              <input
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                value="GMT+6 (Dhaka)"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-white/60">Location</label>
              <input
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                placeholder="City, Country"
              />
            </div>

            <button className="bg-brand-4/60 px-3 rounded-lg flex gap-2 py-3 items-center w-full sm:col-span-3 justify-center hover:bg-brand-4/70">
              <Pencil className="h-4 w-4" /> Edit
            </button>
          </div>

          {/* Links */}
          <div className="border-b border-white/10 pb-4">
            <label className="text-sm text-white/60">Social & links</label>
            <div className="grid sm:grid-cols-2 gap-3 mt-1 mb-3">
              <div className="flex items-center gap-2">
                <Music4 className="h-4 w-4" />
                <input
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                  placeholder="Spotify artist / playlist URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                <input
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                  placeholder="YouTube channel / video URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <input
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                  placeholder="Instagram profile"
                />
              </div>
              <div className="flex items-center gap-2">
                <TiktokIcon className="h-4 w-4" />
                <input
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                  placeholder="TikTok profile"
                />
              </div>
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                <input
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                  placeholder="Website / Linktree"
                />
              </div>
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                <input
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                  placeholder="Sample playlist URL"
                />
              </div>
            </div>
            <button className="bg-brand-4/60 px-3 rounded-lg flex gap-2 py-3 items-center w-full col-span-3 justify-center hover:bg-brand-4/70">
              <Pencil className="h-4 w-4" /> Edit
            </button>
          </div>

          {/* Policy */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-white/60">Revision policy</label>
              <input
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                placeholder="1 free revision within 7 days"
              />
            </div>
            <div>
              <label className="text-sm text-white/60">Delivery window</label>
              <input
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                placeholder="3‑5 days"
              />
            </div>
            <div>
              <label className="text-sm text-white/60">Content restrictions</label>
              <input
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                placeholder="No explicit"
              />
            </div>

            <button className="bg-brand-4/60 px-3 rounded-lg flex gap-2 py-3 items-center w-full sm:col-span-3 justify-center hover:bg-brand-4/70">
              <Pencil className="h-4 w-4" /> Edit
            </button>
          </div>

          {/* Connections & availability */}
          <div className="rounded-xl p-4 border border-white/10 bg-white/5">
            <div className="font-heading mb-2">Connections</div>
            <div className="flex flex-wrap gap-2 text-sm">
              <Chip>
                <Music4 className="h-3 w-3" /> Spotify{" "}
                <span className="opacity-70">• Not connected</span>
              </Chip>
              <Chip>
                <Music4 className="h-3 w-3" /> Apple Music{" "}
                <span className="opacity-70">• Connected</span>
              </Chip>
              <Chip>
                <ShieldCheck className="h-3 w-3" /> KYC{" "}
                <span className="opacity-70">• Pending</span>
              </Chip>
              <Chip>
                <User className="h-3 w-3" /> Availability{" "}
                <span className="opacity-70">• Open</span>
              </Chip>
            </div>
            <div className="mt-3 text-xs text-white/60">
              Manage at{" "}
              <Link href="/streaming" className="underline">
                /streaming
              </Link>{" "}
              •{" "}
              <Link href="/kyc" className="underline">
                /kyc
              </Link>{" "}
              •{" "}
              <Link href="/availability" className="underline">
                /availability
              </Link>
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-xl p-4 border border-rose-500/30 bg-rose-500/10">
            <div className="font-heading mb-2">Danger zone</div>
            <div className="flex flex-wrap gap-2 text-sm">
              <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 inline-flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Deactivate profile
              </button>
              <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Make profile private
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <aside className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 space-y-3">
          <div className="font-heading">Preview</div>
          <div className="rounded-xl p-4 border border-white/10 bg-white/5">
            <div className="h-24 rounded-lg bg-black/30 grid place-items-center text-white/60">
              Intro video
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-black/30 grid place-items-center text-white/60">
                <User className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium leading-tight">{displayName}</div>
                <div className="text-xs text-white/60">{handle}</div>
              </div>
            </div>
            <p className="text-sm text-white/70 mt-3">{bio}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <Chip>Indie</Chip>
              <Chip>Dream Pop</Chip>
              <Chip>Clean</Chip>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <Link
                href="/tiers"
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 inline-flex items-center gap-1"
              >
                View tiers <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={publicUrl}
                target="_blank"
                className="text-white/80 hover:text-white inline-flex items-center gap-1"
              >
                Open public <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Publishing tips */}
          <div className="rounded-xl p-4 border border-white/10 bg-white/5 text-xs text-white/70 space-y-2">
            <div className="font-heading text-sm mb-1">Publishing tips</div>
            <div className="flex items-center gap-1">
              <PlayCircle className="h-3 w-3" /> Add a 30s intro video to boost trust
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Respect privacy—LYSTN intermediates all
              contact
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Show a sample playlist that reflects your
              vibe
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ArtistProfileView;
