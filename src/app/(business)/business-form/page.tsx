"use client";

import { BusinessFormArrow, BusinessFormCouldBeBrand } from "@/icons";
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
      <div className="border-b border-white/10 px-6 py-2">
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
      </div>

      {/* wrapper */}
      <div className="flex-1 flex h-full">
        {/* left side */}
        <div className="w-1/2 bg-brand-5/10 flex items-center justify-center">
          <div className="max-w-[300px] flex flex-col items-center justify-center gap-[20px] mx-auto relative">
            <Image
              src="/images/business/business-form-phone-frame.png"
              alt="business-form-left"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-30 -left-40">
              <BusinessFormCouldBeBrand />
            </span>
            <span className="absolute bottom-6 -left-26">
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
        <div className="w-1/2 py-8 pl-14 bg-black/50 flex items-center">
          <div>
            <h1 className="font-bricolage-grotesque text-[44px] mb-[20px]">
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
                className="text-[16px] font-[500] bg-light text-black px-[32px] py-[16px] rounded-[100px] hover:bg-light/80 transition-all duration-300"
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
