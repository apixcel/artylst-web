import Link from "next/link";
import { mainNavLinks } from "@/constants";
import { Menu } from "lucide-react";
import { NavSearch } from "@/components";
import Image from "next/image";

const MainHeader = () => {
  return (
    <header className="sticky bg-transparent top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-[1280px] mx-auto w-full desktop:px-0 px-[20px] py-[12px]">
        <nav className="flex items-center justify-between lg:mb-0 mb-4">
          {/* menu toggle button */}
          <button className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>

          <div className="lg:flex items-center gap-4">
            {/* desktop logo */}
            <Link className="lg:block hidden font-[700] text-white text-2xl" href="/">
              <Image
                src="/images/logo/logo-white.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[60px] h-[60px]"
              />
            </Link>

            {/* mobile logo */}
            <Link className="lg:hidden font-[700] text-white text-2xl" href="/">
              <Image
                src="/images/logo/logo-no-text-large.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[40px] h-[40px]"
              />
            </Link>

            {/* nav links */}
            <div>
              <div>
                <ul className="lg:flex hidden items-center">
                  {mainNavLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="text-light rounded-[20px] hover:bg-level-2 text-[16px] flex-1 py-[8px] px-[12px]"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 lg:flex-1">
            {/* search */}
            <div className="lg:block hidden max-w-[480px] w-full">
              <NavSearch />
            </div>

            {/* login */}
            <Link
              className="text-light hover:bg-level-1 hover:underline py-[6px] px-[12px] rounded-[20px] text-[14px] font-[500]"
              href="/login"
            >
              Login
            </Link>
          </div>
        </nav>

        {/* search bottom mobile */}
        <div className="lg:hidden">
          <NavSearch />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
