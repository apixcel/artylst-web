"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const JoinAsArtistLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      {/* header */}
      <div className="border-b border-white/10 px-6 py-2">
        {/* desktop logo */}
        <Link className="lg:inline-flex flex-col hidden gap-[2px]" href="/">
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
        <Link className="lg:hidden font-[700] text-white text-2xl inline-block" href="/">
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
      <div className="flex-1 flex">
        {/* left side */}
        <div className="lg:flex hidden w-1/2 bg-brand-5/10 flex-col relative">
          <div className="absolute top-8 left-4">
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
                You&apos;re <span className="gradient-text">famous enough</span> to join
                Artylst
              </h1>
              <p className="text-muted text-[16px]">
                We&apos;re looking for artists who are passionate about their music and
                have a strong following.
              </p>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="lg:w-1/2 w-full py-8 sm:px-14 px-6 bg-black/50">
          <div className="py-4 max-w-[530px] mx-auto lg:hidden">
            <button
              onClick={() => router.back()}
              className="text-light hover:text-muted inline-flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          </div>

          <div className="flex lg:justify-start justify-center items-center">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAsArtistLayout;
