import Link from "next/link";
import Image from "next/image";

const DeskTopBar = () => {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl  border-b border-white/10 bg-gradient-to-r from-brand-3/10 to-base-900/10">
      <div className="px-6 py-4 flex items-center gap-4">
        <Link href="/">
          <Image
            src="/images/logo/logo-white.png"
            alt="logo"
            width={100}
            height={24}
            className="w-[60px] h-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <input
              className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-1 focus:ring-white rounded-xl pl-10 pr-4 py-2.5 placeholder-white/40"
              placeholder="Search orders, artists, users…"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 h-5 w-5 text-white/50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm7 1.5-3.25-3.25"
              />
            </svg>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-white/60">Admin</div>
            <div className="text-sm font-heading">you@artylst</div>
          </div>
          <div className="h-10 w-10 rounded-xl bg-[url('https://i.pravatar.cc/100?img=16')] bg-cover"></div>
        </div>
      </div>
    </header>
  );
};

export default DeskTopBar;
