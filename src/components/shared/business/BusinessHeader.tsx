"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";
import { businessNavLinks } from "@/constants";
import { useState } from "react";
import { MobileNav } from "@/components";

const BusinessHeader = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <header className="sticky bg-transparent top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-[1280px] mx-auto w-full desktop:px-0 px-[20px] py-[8px]">
        <nav className="flex items-center justify-between lg:mb-0">
          {/* menu toggle button */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setIsMobileNavOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>

            {/* mobile logo */}
            <Link className="sm:hidden" href="/">
              <Image
                src="/images/logo/logo-no-text.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[30px] h-[30px]"
              />
            </Link>
          </div>

          <div className="lg:flex items-center gap-4">
            {/* desktop logo */}
            <Link className="lg:block hidden" href="/">
              <Image
                src="/images/logo/logo-white.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[70px] h-[75px]"
              />
            </Link>

            {/* mobile logo */}
            <Link className="lg:hidden sm:block hidden" href="/">
              <Image
                src="/images/logo/logo-no-text.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[45px] h-[45px]"
              />
            </Link>

            {/* nav links */}
            <ul className="lg:flex hidden items-center">
              {businessNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-light rounded-[20px] hover:bg-brand-2/10 text-[16px] flex-1 py-[8px] px-[12px]"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end gap-4 lg:flex-1">
            {/* start a request */}
            <Link
              className="text-light hover:bg-brand-2/10 hover:underline py-[6px] px-[12px] rounded-[20px] text-[14px] font-[500]"
              href="/business-form"
            >
              Start a request
            </Link>
          </div>
        </nav>
      </div>

      <MobileNav
        isOpen={isMobileNavOpen}
        setIsOpen={setIsMobileNavOpen}
        navLinks={businessNavLinks}
      />
    </header>
  );
};

export default BusinessHeader;
