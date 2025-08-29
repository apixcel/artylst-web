import React from 'react'

const page = () => {
    return (
        <section className="p-6 space-y-6">
            <h1 className="text-2xl md:text-3xl font-heading">Public Profile</h1>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 rounded-2xl p-6 border border-white/10 bg-white/5 space-y-4">
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2"><label className="text-sm text-white/60">Display name</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" value="Sloane Rivers" /></div>
                        <div><label className="text-sm text-white/60">Handle</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" value="@sloane" /></div>
                    </div>
                    <div><label className="text-sm text-white/60">Bio</label><textarea rows={4} className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2">Grammy‑winning producer...</textarea></div>
                    <div><label className="text-sm text-white/60">Genres &amp; tags</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="Hip‑hop, R&amp;B, soulful, clean" /></div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div><label className="text-sm text-white/60">Languages</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="English, বাংলা" /></div>
                        <div><label className="text-sm text-white/60">Timezone</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" value="GMT+6 (Dhaka)" /></div>
                        <div><label className="text-sm text-white/60">Location</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="City, Country" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="text-sm text-white/60">Intro video URL</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="https://stream.mux.com/..." /></div>
                        <div><label className="text-sm text-white/60">Sample playlist URL</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="https://open.spotify.com/playlist/..." /></div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div><label className="text-sm text-white/60">Revision policy</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="1 free revision within 7 days" /></div>
                        <div><label className="text-sm text-white/60">Delivery window</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="3‑5 days" /></div>
                        <div><label className="text-sm text-white/60">Content restrictions</label><input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="No explicit" /></div>
                    </div>
                </div>
                <aside className="rounded-2xl p-6 border border-white/10 bg-white/5 space-y-3">
                    <div className="font-heading">Preview</div>
                    <div className="rounded-xl p-4 border border-white/10 bg-white/5">
                        <div className="h-24 rounded-lg bg-black/30 grid place-items-center text-white/60">Intro video</div>
                        <div className="mt-3 text-sm text-white/70">Public card &amp; profile preview</div>
                    </div>
                </aside>
            </div>
        </section>
    )
}

export default page