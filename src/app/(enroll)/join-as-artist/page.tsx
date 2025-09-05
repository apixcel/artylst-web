"use client";

import { DropdownOption } from "@/interface";
import { Dropdown } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const genderOptions = [
  { label: "He/him", value: "he-him" },
  { label: "She/her", value: "she-her" },
  { label: "They/them", value: "they-them" },
];

const EnrollFormPage = () => {
  const [gender, setGender] = useState<DropdownOption<string> | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/dashboard/artist");
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
            <div>
              <h1 className="text-[32px] text-center sm:text-left sm:text-[44px] mb-[20px]">
                Start earning today
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  {/* full name */}
                  <div>
                    <label className="text-[16px] font-[500] block mb-[8px]">
                      Full name
                    </label>
                    <input className="enroll-input" type="text" />
                  </div>

                  {/* gender */}
                  <div className="w-full">
                    <label className="text-[16px] font-[500] block mb-[8px]">
                      Gender
                    </label>
                    <Dropdown
                      value={gender}
                      options={genderOptions}
                      onChange={setGender}
                      placeholder="Choose gender"
                      className="w-full"
                      buttonClassName="w-full bg-brand-2/10 py-4 rounded-2xl px-4 py-3"
                      panelClassName="w-full "
                      optionClassName="w-full "
                      matchButtonWidth={false}
                    />
                  </div>

                  {/* display name */}
                  <div>
                    <div className="mb-[8px]">
                      <label className="text-[16px] font-[500] block mb-[2px]">
                        Display name
                      </label>
                      <p className="text-muted">This appears on your profile</p>
                    </div>
                    <input className="enroll-input" type="text" />
                  </div>

                  {/* user name */}
                  <div>
                    <div className="mb-[8px]">
                      <label className="text-[16px] font-[500] block mb-[2px]">
                        Username
                      </label>
                      <p className="text-muted">
                        Use only letters, numbers, underscores, hyphens, and periods
                      </p>
                    </div>
                    <input className="enroll-input" type="text" />
                  </div>

                  {/* date of birth */}
                  <div>
                    <div className="mb-[8px]">
                      <label className="text-[16px] font-[500] block mb-[2px]">
                        Date of birth
                      </label>
                    </div>
                    <input
                      className="enroll-input"
                      type="text"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>

                  {/* email */}
                  <div>
                    <div className="mb-[8px]">
                      <label className="text-[16px] font-[500] block mb-[2px]">
                        Email
                      </label>
                    </div>
                    <input className="enroll-input" type="email" />
                  </div>

                  {/* password */}
                  <div>
                    <div className="mb-[8px]">
                      <label className="text-[16px] font-[500] block mb-[2px]">
                        Password
                      </label>
                    </div>
                    <input className="enroll-input" type="password" />
                  </div>

                  {/* confirm password */}
                  <div>
                    <div className="mb-[8px]">
                      <label className="text-[16px] font-[500] block mb-[2px]">
                        Confirm password
                      </label>
                    </div>
                    <input className="enroll-input" type="password" />
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
                <button type="submit" className="btn btn-primary">
                  Create account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollFormPage;
