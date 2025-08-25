import Link from 'next/link'
import React from 'react'

const SingleArtistPage = () => {
    return (
        <>
            <section className="px-4 py-6">
                <div className="card overflow-hidden">
                    <div className="h-48 md:h-64 w-full grid place-items-center bg-white/5 border-b border-white/10 text-white/60">
                        COVER IMAGE PLACEHOLDER
                    </div>

                    <div className="p-4 md:p-6 grid md:grid-cols-[180px_1fr_280px] gap-6 items-start">
                        {/* Avatar */}
                        <div className="flex md:block gap-4">
                            <div className="h-40 w-40 -mt-20 md:mt-0 md:h-44 md:w-44 rounded-2xl bg-white/10 border border-white/15 grid place-items-center text-xs">
                                AVATAR
                            </div>
                        </div>

                        {/* Bio + badges */}
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-2xl font-heading">Artist Name</h1>
                                <span className="chip text-[11px]">★ 4.9 (1.2k)</span>
                                <span className="chip text-[11px]">~48h ETA</span>
                                <span className="chip text-[11px]">2 slots left</span>
                            </div>

                            <p className="mt-2 text-white/75 text-sm">
                                Singer • Curator • Indie / Pop. Crafting mood‑based sets for
                                workout, study, and feel‑good moments.
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="chip">Lo‑fi</span>
                                <span className="chip">Pop</span>
                                <span className="chip">Chill</span>
                                <span className="chip">Focus</span>
                                <span className="chip">Workout</span>
                            </div>

                            {/* Platforms */}
                            <div className="mt-3 flex items-center gap-2 text-xs opacity-80">
                                <span className="chip">Spotify</span>
                                <span className="chip">Apple Music</span>
                                <span className="chip">YouTube Music</span>
                                <span className="chip">EN</span>
                                <span className="chip">BN</span>
                            </div>

                            {/* Intro video */}
                            <div className="mt-5 card p-3">
                                <div className="h-40 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
                                    INTRO VIDEO PLACEHOLDER
                                </div>
                                <p className="text-xs text-white/60 mt-2">
                                    Intro: who I am &amp; how I curate your playlist.
                                </p>
                            </div>
                        </div>

                        {/* Quick actions */}
                        <aside className="space-y-3">
                            <div className="card p-4">
                                <div className="text-sm text-white/70">Starting from</div>
                                <div className="text-2xl font-heading mt-1">$39</div>
                                <Link href="checkout.html" className="btn btn-primary w-full mt-3">
                                    Request playlist
                                </Link>
                                <div className="text-xs text-white/60 mt-2">
                                    Private link + 30s auth video. Privacy-first escrow.
                                </div>
                            </div>

                            <div className="card p-4">
                                <div className="font-heading text-sm">Delivery window</div>
                                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                                    <div className="chip justify-center">24h</div>
                                    <div className="chip justify-center">48h</div>
                                    <div className="chip justify-center">72h</div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            {/* Pricing tiers */}
            <section className="px-4 py-4">
                <h2 className="font-heading text-xl mb-3">Pricing</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="card p-5">
                        <div className="text-sm text-white/70">Mini • 10–12 tracks</div>
                        <div className="text-2xl font-heading mt-1">$39</div>
                        <ul className="mt-3 text-sm text-white/75 space-y-1">
                            <li>• Vibe match from your brief</li>
                            <li>• Private playlist link</li>
                            <li>• 30s authentication video</li>
                        </ul>
                        <Link href="/checkout" className="btn btn-ghost w-full mt-4">
                            Choose Mini
                        </Link>
                    </div>

                    <div className="card p-5 border-brand/40">
                        <div className="text-sm text-white/70">
                            Standard • 20–24 tracks
                        </div>
                        <div className="text-2xl font-heading mt-1">$59</div>
                        <ul className="mt-3 text-sm text-white/75 space-y-1">
                            <li>• Deeper curation &amp; transitions</li>
                            <li>• Private playlist link</li>
                            <li>• 30s authentication video</li>
                        </ul>
                        <Link href="/checkout" className="btn btn-primary w-full mt-4">
                            Choose Standard
                        </Link>
                    </div>

                    <div className="card p-5">
                        <div className="text-sm text-white/70">Deep Dive • 35+ tracks</div>
                        <div className="text-2xl font-heading mt-1">$99</div>
                        <ul className="mt-3 text-sm text-white/75 space-y-1">
                            <li>• Multi‑mood sections</li>
                            <li>• 1 revision within 7 days</li>
                            <li>• 30s authentication video</li>
                        </ul>
                        <Link href="/checkout" className="btn btn-ghost w-full mt-4">
                            Choose Deep Dive
                        </Link>
                    </div>
                </div>
            </section>
            {/* Sample/Notes */}
            <section className="px-4 py-6 grid md:grid-cols-2 gap-4">
                <div className="card p-5">
                    <h3 className="font-heading">Sample vibes I love</h3>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                        <div className="h-24 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
                            IMAGE PLACEHOLDER
                        </div>
                        <div className="h-24 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
                            IMAGE PLACEHOLDER
                        </div>
                        <div className="h-24 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
                            IMAGE PLACEHOLDER
                        </div>
                        <div className="h-24 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
                            IMAGE PLACEHOLDER
                        </div>
                    </div>
                </div>

                <div className="card p-5">
                    <h3 className="font-heading">About me</h3>
                    <p className="text-sm text-white/75 mt-2">
                        Touring vocalist &amp; curator. I build sequences that flow
                        naturally—no hard jumps. Expect tasteful discoveries alongside your
                        must‑haves.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="chip">Los Angeles</span>
                        <span className="chip">GMT‑7</span>
                        <span className="chip">English</span>
                        <span className="chip">Bangla</span>
                    </div>
                </div>
            </section>
            {/* Reviews */}
            <section className="px-4 pb-12">
                <h2 className="font-heading text-xl mb-3">Recent reviews</h2>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="card p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/10 border border-white/10 grid place-items-center text-xs">
                                IMG
                            </div>
                            <div>
                                <div className="text-sm">
                                    Nabila{" "}
                                    <span className="chip text-[10px] ml-1">Verified</span>
                                </div>
                                <div className="text-xs text-white/60">★ ★ ★ ★ ★</div>
                            </div>
                        </div>
                        <p className="text-white/80 font-heading mt-3">
                            “Perfect for my workout!”
                        </p>
                        <p className="text-white/70 text-sm mt-1">
                            Seamless flow; the video shout felt personal.
                        </p>
                    </div>

                    <div className="card p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/10 border border-white/10 grid place-items-center text-xs">
                                IMG
                            </div>
                            <div>
                                <div className="text-sm">
                                    David <span className="chip text-[10px] ml-1">Verified</span>
                                </div>
                                <div className="text-xs text-white/60">★ ★ ★ ★ ☆</div>
                            </div>
                        </div>
                        <p className="text-white/80 font-heading mt-3">
                            “Exactly our café vibe”
                        </p>
                        <p className="text-white/70 text-sm mt-1">
                            Subscribed for monthly refresh.
                        </p>
                    </div>

                    <div className="card p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/10 border border-white/10 grid place-items-center text-xs">
                                IMG
                            </div>
                            <div>
                                <div className="text-sm">
                                    Rhea <span className="chip text-[10px] ml-1">Verified</span>
                                </div>
                                <div className="text-xs text-white/60">★ ★ ★ ★ ★</div>
                            </div>
                        </div>
                        <p className="text-white/80 font-heading mt-3">
                            “Focus flow achieved”
                        </p>
                        <p className="text-white/70 text-sm mt-1">
                            Kept me in deep work for hours.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleArtistPage