"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BusinessFormLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      {/* header */}
      <div className="border-b border-white/10 px-6 py-2">
        {/* desktop logo */}
        <Link className="lg:flex flex-col hidden gap-[2px]" href="/">
          <Image
            src="/images/logo/logo-no-text.png"
            alt="logo"
            width={100}
            height={100}
            className="w-[50px] h-[55px] ml-2"
          />
          <span className="font-logam">ARTYLST</span>
        </Link>

        {/* mobile logo */}
        <Link className="lg:hidden font-[700] text-white text-2xl" href="/">
          <Image
            src="/images/logo/logo-no-text.png"
            alt="logo"
            width={100}
            height={100}
            className="w-[40px] h-[40px]"
          />
        </Link>
      </div>

      {/* wrapper */}
      <div className="flex-1 flex h-full">
        {/* left side */}
        <div className="hidden lg:block w-[40%] bg-brand-5/10 pl-6">
          <div className="py-4 pl-4">
            <button
              onClick={() => router.back()}
              className="text-light hover:text-muted inline-flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          </div>

          <div className="flex-center h-[50%] xl:h-[80%]">
            <div className="xl:max-w-[500px] max-w-[470px]">
              <h1 className="text-[44px] leading-[50px] mb-[20px]">
                Grow your <span className="gradient-text">business with ARTYLST</span>
              </h1>
              <p className="text-muted text-[16px]">
                Partner with top artists to create the perfect vibe for your café, salon,
                gym, or retail space. Curated music, made simple.
              </p>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="lg:w-[60%] w-full py-8 sm:pl-14 px-6 bg-brand-5/10 sm:pr-12 lg:pr-6 xl:pr-10 2xl:pr-[145px]">
          <div className="py-4 max-w-[530px] lg:hidden">
            <button
              onClick={() => router.back()}
              className="text-light hover:text-muted inline-flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          </div>

          <div className="flex flex-col md:justify-center h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BusinessFormLayout;
