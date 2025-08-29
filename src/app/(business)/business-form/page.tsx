"use client";

import { BusinessFormArrow, BusinessFormCouldBeBrand } from "@/icons";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BusinessFormPage = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/dashboard/business");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* header */}
      <div className="border-b border-white/10 px-6 py-2 flex items-center gap-4 lg:justify-between">
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

        <div className="w-1/2">
          <button
            onClick={() => router.back()}
            className="text-light hover:text-muted inline-flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>

      {/* wrapper */}
      <div className="flex-1 flex h-full">
        {/* left side */}
        <div className="hidden lg:flex w-1/2 bg-brand-5/10 items-center justify-center">
          <div className="max-w-[300px] flex flex-col items-center justify-center gap-[20px] mx-auto relative">
            <Image
              src="/images/business/business-form-phone-frame.png"
              alt="business-form-left"
              width={500}
              height={500}
              className="w-full h-full object-cover"
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

        {/* right side */}
        <div className="lg:w-1/2 w-full py-8 sm:px-14 px-6 bg-black/50 flex lg:justify-start justify-center items-center">
          <div>
            <h1 className="font-bricolage-grotesque text-[32px] text-center sm:text-left sm:text-[44px] mb-[20px]">
              Get started
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                {/* full name */}
                <div>
                  <input className="enroll-input" type="text" placeholder="Full name" />
                </div>

                {/* work email */}
                <div>
                  <input className="enroll-input" type="email" placeholder="Work email" />
                </div>

                {/* terms and conditions */}
                <div>
                  <p className="text-muted">
                    By clicking &quot;Create account&quot;, you agree to our{" "}
                    <Link href="/terms-and-conditions" className="text-white">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-white">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* submit button */}
              <button
                type="submit"
                className="text-[16px] font-[500] bg-light text-black sm:px-[32px] px-6 sm:py-[16px] py-3 rounded-[100px] hover:bg-light/80 transition-all duration-300"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-[20px]">
              <Link className="text-muted text-[16px] font-[500] underline" href="#">
                Sign into an existing account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessFormPage;
