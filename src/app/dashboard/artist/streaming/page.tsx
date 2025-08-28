import React from "react";

const page = () => {
  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-heading">Streaming Connections</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">Spotify</div>
          <div className="text-sm text-white/70 mt-1">Create private playlists</div>
          <a className="mt-3 inline-block px-4 py-2 rounded-lg bg-brand-500">Connect</a>
        </div>
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">Apple Music</div>
          <div className="text-sm text-white/70 mt-1">Paste playlist links</div>
          <a className="mt-3 inline-block px-4 py-2 rounded-lg bg-white/10">Learn more</a>
        </div>
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">YouTube Music</div>
          <div className="text-sm text-white/70 mt-1">Unlisted playlist links</div>
          <a className="mt-3 inline-block px-4 py-2 rounded-lg bg-white/10">Learn more</a>
        </div>
      </div>
    </section>
  );
};

export default page;
