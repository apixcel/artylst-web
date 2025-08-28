import React from 'react'

const page = () => {
    return (
        <section className="p-6 space-y-6">
            <div className="flex items-end justify-between">
                <div><h1 className="text-2xl md:text-3xl font-heading">Orders</h1><p className="text-white/60 text-sm mt-1">Accept, work, deliver</p></div>
                <div className="flex gap-2"><select className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm"><option>All</option><option>New</option><option>In progress</option><option>Delivered</option><option>Revision</option></select></div>
            </div>
            <div className="rounded-2xl p-6 border border-white/10 bg-white/5 overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="text-white/60 border-b border-white/10"><tr><th className="text-left py-2 pr-6">Order</th><th className="text-left py-2 pr-6">Buyer</th><th className="text-left py-2 pr-6">Tier</th><th className="text-left py-2 pr-6">Platform</th><th className="text-left py-2 pr-6">Status</th><th className="text-left py-2">Actions</th></tr></thead>
                    <tbody>
                        <tr className="border-b border-white/5"><td className="py-3 pr-6">#2341</td><td className="py-3 pr-6">Arif</td><td className="py-3 pr-6">Standard</td><td className="py-3 pr-6">Spotify</td><td className="py-3 pr-6"><span className="chip">In progress</span></td><td className="py-3"><a className="px-2 py-1 rounded bg-white/10 text-xs" href="deliver.html">Open</a></td></tr>
                        <tr><td className="py-3 pr-6">#2339</td><td className="py-3 pr-6">Nadia</td><td className="py-3 pr-6">Mini</td><td className="py-3 pr-6">Apple</td><td className="py-3 pr-6"><span className="chip">Delivered</span></td><td className="py-3"><a className="px-2 py-1 rounded bg-white/10 text-xs" href="deliver.html">Open</a></td></tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default page