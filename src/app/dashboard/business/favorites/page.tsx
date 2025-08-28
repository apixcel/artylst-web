import React from "react";

const page = () => {
  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-heading">Favorites</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10"
          href="../artist/artist-public.html"
        >
          <div className="h-40 rounded-xl bg-[url(https://i.pravatar.cc/300?img=60)] bg-cover"></div>
          <div className="mt-3 font-heading">Artist 60</div>
          <div className="text-xs text-white/60">@handle60</div>
        </a>
        <a
          className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10"
          href="../artist/artist-public.html"
        >
          <div className="h-40 rounded-xl bg-[url(https://i.pravatar.cc/300?img=61)] bg-cover"></div>
          <div className="mt-3 font-heading">Artist 61</div>
          <div className="text-xs text-white/60">@handle61</div>
        </a>
        <a
          className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10"
          href="../artist/artist-public.html"
        >
          <div className="h-40 rounded-xl bg-[url(https://i.pravatar.cc/300?img=62)] bg-cover"></div>
          <div className="mt-3 font-heading">Artist 62</div>
          <div className="text-xs text-white/60">@handle62</div>
        </a>
        <a
          className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10"
          href="../artist/artist-public.html"
        >
          <div className="h-40 rounded-xl bg-[url(https://i.pravatar.cc/300?img=63)] bg-cover"></div>
          <div className="mt-3 font-heading">Artist 63</div>
          <div className="text-xs text-white/60">@handle63</div>
        </a>
      </div>
    </section>
  );
};

export default page;
