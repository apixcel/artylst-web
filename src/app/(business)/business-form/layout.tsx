"use client";

import { BusinessFormArrow, BusinessFormCouldBeBrand } from "@/icons";
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
        <div className="hidden lg:block w-1/2 bg-brand-5/10">
          <div className="py-4 pl-4">
            <button
              onClick={() => router.back()}
              className="text-light hover:text-muted inline-flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          </div>

          <div className="flex-center">
            <div className="max-w-[300px] flex flex-col items-center justify-center gap-[20px] mx-auto relative">
              <Image
                src="/images/business/business-form-phone-frame.png"
                alt="business-form-left"
                width={500}
                height={500}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable={false}
              />
              <span className="absolute bottom-30 -left-26 xl:-left-40">
                <BusinessFormCouldBeBrand />
              </span>
              <span className="absolute bottom-6 xl:-left-26 -left-16">
                <BusinessFormArrow />
              </span>

              <div className="flex flex-col items-center gap-[8px]">
                <Image
                  src="/images/brands/brand-4.png"
                  alt="business-form-logo"
                  width={200}
                  height={100}
                  className="w-[150px] h-full object-cover"
                />
                <span className="text-business-use-case text-[16px]">
                  Carson Kressley x GYMSHARK
                </span>
              </div>
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

export default BusinessFormLayout;
