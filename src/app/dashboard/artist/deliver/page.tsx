import React from 'react'

const page = () => {
    return (
        <section className="p-6 space-y-6">
            <h1 className="text-2xl md:text-3xl font-heading">Deliver • Order #2341</h1>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 rounded-2xl p-6 border border-white/10 bg-white/5 space-y-4">
                    <div className="text-sm text-white/60">Buyer brief</div>
                    <div className="text-sm">Occasion: Workout • Vibe: High energy • Don’t: explicit</div>
                    <div>
                        <label className="text-sm text-white/60">Playlist URL</label>
                        <input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="https://open.spotify.com/playlist/..."/>
                    </div>
                    <div>
                        <label className="text-sm text-white/60">Upload 30s video (link)</label>
                        <input className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="https://stream.mux.com/..."/>
                            <div className="text-xs text-white/50 mt-1">Tip: upload to Mux/Drive and paste link (placeholder).</div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-lg bg-white/10">Save draft</button>
                        <button className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600">Deliver now</button>
                    </div>
                </div>
                <aside className="rounded-2xl p-6 border border-white/10 bg-white/5 space-y-3">
                    <div className="font-heading">Quality checklist</div>
                    <ul className="list-disc list-inside text-sm text-white/70">
                        <li>No explicit (per brief)</li><li>Flow/energy consistent</li><li>Private link set</li><li>Video says buyer name</li>
                    </ul>
                    <a className="block text-center px-4 py-2 rounded-lg bg-white/10" href="messages.html">Message buyer</a>
                </aside>
            </div>
        </section>
    )
}

export default page