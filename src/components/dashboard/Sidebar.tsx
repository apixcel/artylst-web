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
        <Link
          href="/"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 active"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-brand-300 group-hover:text-brand-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-9Z"
            />
          </svg>
          <span className="font-heading">Dashboard</span>
        </Link>
        <Link
          href="/artists"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white/60 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM6 21a6 6 0 1 1 12 0"
            />
          </svg>
          <span className="font-heading">Artists</span>
        </Link>
        <Link
          href="/users"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white/60 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M20 7v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7m16 0V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2m16 0H4"
            />
          </svg>
          <span className="font-heading">Users</span>
        </Link>
        <Link
          href="/orders"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white/60 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          <span className="font-heading">Orders</span>
        </Link>
        <Link
          href="/disputes"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white/60 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M12 9v3l2 2m7-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="font-heading">Flags & Disputes</span>
        </Link>
        <Link
          href="/finance"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white/60 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M12 8c-3.866 0-7 1.79-7 4v4h14v-4c0-2.21-3.134-4-7-4Zm0 0V6m0 10v2"
            />
          </svg>
          <span className="font-heading">Finance</span>
        </Link>
        <Link
          href="/promotions"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white/60 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M12 3v3m0 12v3m9-9h-3M6 12H3m12.5-6.5 3 3m-9 9-3 3m0-15 3 3m9 9 3 3"
            />
          </svg>
          <span className="font-heading">Promotions</span>
        </Link>
        <Link
          href="/notifications"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white/60 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V4a2 2 0 1 0-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 1 1-6 0m6 0H9"
            />
          </svg>
          <span className="font-heading">Notifications</span>
        </Link>
        <Link
          href="/settings"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white/60 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M11.983 4.5 13 3h-2l1 1.5m8.5 7.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Zm-6 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            />
          </svg>
          <span className="font-heading">Settings</span>
        </Link>
        <Link
          href="/system"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white/60 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M2.25 12 21.75 12M12 2.25 12 21.75"
            />
          </svg>
          <span className="font-heading">System</span>
        </Link>
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
