"use client";

import Link from "next/link";
import { DollarSign, MessageSquare, ShieldCheck, Video } from "lucide-react";
import { DashboardArtistDeliverStepProgress, UnauthorizedMsgBox } from "@/components";
import { useAppSelector } from "@/hooks";

const ArtistDeliverPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  if (role !== "artist") return <UnauthorizedMsgBox />;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl">Deliver • Order #2341</h1>

      {/* Order overview */}
      <div className="grid xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 backdrop-blur-2xl space-y-6">
          <div>
            <div className="text-sm text-muted">Buyer brief</div>
            <div className="text-sm">
              Occasion: Workout • Vibe: High energy • Don’t: explicit
            </div>
          </div>

          {/* Order details */}
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-muted mb-1">Buyer</h4>
              <p className="text-base">Arif</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-muted mb-1">Platform</h4>
              <p className="text-base">Spotify</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-muted mb-1">Due</h4>
              <p className="text-base">in 3 days</p>
            </div>
          </div>

          {/* Progress steps */}
          <DashboardArtistDeliverStepProgress
            current={2}
            steps={["Brief", "Build playlist", "Deliver"]}
            className="mx-auto"
          />

          {/* Playlist url */}
          <div>
            <label className="text-sm text-muted">Playlist URL</label>
            <input
              className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
              placeholder="https://open.spotify.com/playlist/..."
            />
          </div>
          <div>
            <label className="text-sm text-muted">Upload 30s video (link)</label>
            <input
              className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
              placeholder="https://stream.mux.com/..."
            />
            <div className="text-xs text-muted mt-1">
              Tip: upload to Mux/Drive and paste link (placeholder).
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            <div className="text-muted mb-2">Preview (stub)</div>
            <div className="h-40 flex items-center justify-center text-muted">
              Playlist + Video embed will appear here
            </div>
          </div>

          <div className="flex gap-2">
            <button className="btn-tertiary">Save draft</button>
            <button className="btn-secondary">Deliver now</button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 backdrop-blur-2xl space-y-4">
          <h3>Quality checklist</h3>
          <ul className="list-disc list-inside text-sm text-muted space-y-1">
            <li>No explicit (per brief)</li>
            <li>Flow/energy consistent</li>
            <li>Private link set</li>
            <li>Video says buyer name</li>
          </ul>

          <Link href="/messages/2341" className="block text-center btn-tertiary">
            <MessageSquare className="inline h-4 w-4 mr-1" /> Message buyer
          </Link>

          {/* Tips */}
          <div className="text-xs text-muted space-y-2">
            <div className="flex gap-1">
              <Video className="mt-[2px] h-3 w-3" /> Add personal video to authenticate
              playlist
            </div>
            <div className="flex gap-1">
              <ShieldCheck className="mt-[2px] h-3 w-3" /> Never share personal contact
              info
            </div>
            <div className="flex gap-1">
              <DollarSign className="mt-[2px] h-3 w-3" /> Payout released after submission
            </div>
          </div>

          {/* Revision log stub */}
          <div className="mt-4">
            <h3 className="text-sm mb-2">History</h3>
            <div className="text-xs text-muted space-y-1">
              <div>08/20 — Buyer requested: “No explicit lyrics”</div>
              <div>08/22 — You saved draft</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ArtistDeliverPage;
