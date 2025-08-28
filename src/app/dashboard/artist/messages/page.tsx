import React from 'react'

const page = () => {
    return (
        <section className="p-6 space-y-6">
            <h1 className="text-2xl md:text-3xl font-heading">Messages</h1>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl p-4 border border-white/10 bg-white/5">
                    <div className="text-sm text-white/60 mb-2">Threads</div>
                    <div className="space-y-2"><a className="block rounded-lg p-3 bg-white/5 border border-white/10" href="#"><div className="font-heading">#2341 • Arif</div><div className="text-xs text-white/60">“High energy pls”</div></a></div>
                </div>
                <div className="md:col-span-2 rounded-2xl p-4 border border-white/10 bg-white/5">
                    <div className="text-sm text-white/60">#2341 • Arif</div>
                    <div className="mt-3 h-64 overflow-auto space-y-3 text-sm">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 w-max">Got it! 👌</div>
                        <div className="p-3 rounded-lg bg-brand-500/20 border border-white/10 w-max ml-auto">Thanks!</div>
                    </div>
                    <div className="mt-3 flex gap-2"><input className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2" placeholder="Type a message…" /><button className="px-3 py-2 rounded-lg bg-brand-500">Send</button></div>
                </div>
            </div>
        </section>
    )
}

export default page