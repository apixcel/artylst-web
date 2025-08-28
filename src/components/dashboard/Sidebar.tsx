import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex lg:w-72 shrink-0 flex-col border-r border-white/10 bg-gradient-to-b from-brand-3/10 to-base-900/10 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto">
      <div className="px-6 py-6 flex items-center gap-3">
        <Link href="/">
          <Image
            src="/images/logo/logo-white.png"
            alt="logo"
            width={100}
            height={100}
            className="w-[80px] h-full"
          />
        </Link>
        <Link className="hidden md:hidden" href="/">
          <Image
            src="/images/logo/logo-no-text-large.png"
            alt="logo"
            width={100}
            height={100}
            className="w-[100px] h-full"
          />
        </Link>
      </div>
      <nav className="px-3 space-y-1">
        <Link href="/dashboard/artist" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 active"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-9Z"></path></svg><span className="font-heading">Dashboard</span></Link>
        <Link href="/dashboard/artist/orders" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 7h18M3 12h18M3 17h18"></path></svg><span className="font-heading">Orders</span></Link>
        <Link href="/dashboard/artist/deliver" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="m4 12 6 6L20 6"></path></svg><span className="font-heading">Deliver</span></Link>
        <Link href="/dashboard/artist/messages" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M8 10h8M8 14h5m9 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg><span className="font-heading">Messages</span></Link>
        <Link href="/dashboard/artist/earnings" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 8c-3.866 0-7 1.79-7 4v4h14v-4c0-2.21-3.134-4-7-4Zm0 0V6m0 10v2"></path></svg><span className="font-heading">Earnings</span></Link>
        <Link href="/dashboard/artist/profile" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM6 21a6 6 0 1 1 12 0"></path></svg><span className="font-heading">Profile</span></Link>
        <Link href="/dashboard/artist/tiers" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 7h18M3 12h12M3 17h6"></path></svg><span className="font-heading">Tiers</span></Link>
        <Link href="/dashboard/artist/availability" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 6v6l4 2"></path></svg><span className="font-heading">Availability</span></Link>
        <Link href="/dashboard/artist/streaming" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 10h16M4 14h16M4 18h7"></path></svg><span className="font-heading">Streaming</span></Link>
        <Link href="/dashboard/artist/kyc" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-12 0v3.2c0 .54-.21 1.05-.6 1.44L4 17h5"></path></svg><span className="font-heading">KYC &amp; Payout</span></Link>
        <Link href="/dashboard/artist/settings" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11.983 4.5 13 3h-2l1 1.5m8.5 7.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0"></path></svg><span className="font-heading">Settings</span></Link>
      </nav>
      <div className="mt-auto p-4">
        <div className="rounded-xl p-4 bg-gradient-to-tr from-brand-1/15 to-brand-5/10 border border-white/10">
          <div className="text-sm font-heading">Status</div>
          <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span> All systems
            operational
          </div>
        </div>

        <div className="text-[11px] text-white/50 mt-3">© 2025 ARTYLST</div>
      </div>
    </aside>
  );
};

export default Sidebar;
