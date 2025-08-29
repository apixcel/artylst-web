import React from 'react'

const page = () => {
    return (
        <section className="p-6 space-y-6">
            <h1 className="text-2xl md:text-3xl font-heading">Pricing Tiers</h1>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl p-6 border border-white/10 bg-white/5 space-y-2">
                    <div className="font-heading">Mini</div>
                    <input className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2" value="10 songs" />
                    <input className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2" value="$49" />
                </div>
                <div className="rounded-2xl p-6 border border-white/10 bg-white/5 space-y-2">
                    <div className="font-heading">Standard</div>
                    <input className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2" value="20 songs" />
                    <input className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2" value="$89" />
                </div>
                <div className="rounded-2xl p-6 border border-white/10 bg-white/5 space-y-2">
                    <div className="font-heading">Deep Dive</div>
                    <input className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2" value="40 songs" />
                    <input className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2" value="$159" />
                </div>
            </div>
        </section>
    )
}

export default page