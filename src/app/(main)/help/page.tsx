"use client";

import {
  ProfileIcon,
  LampIcon,
  TalentIcon,
  RedCarpetRewardsIcon,
  CustomerIcon,
} from "@/icons";
import { FileText, Search } from "lucide-react";
import Link from "next/link";
const HelpPage = () => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center py-16 px-6">
      <h1 className="text-[36px] xl:text-[40px] font-[500] mb-[20px]">
        Hi, how can we help you?
      </h1>

      {/* Search Bar */}
      <div className="max-w-[480px] w-full">
        <div className="relative">
          <Search className="absolute w-4.5 h-4.5 left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search artists, genres…"
            className="w-full bg-white/10 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-light"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-3xl w-full">
        <div className=" bg-white/5 border border-white/10 hover:border-brand-4 transition cursor-pointer rounded-lg">
          <Link href="/help/knowledge-base">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <LampIcon size={64} />
              <h2 className="font-[500]mb-2">Browse articles</h2>
              <p className="text-gray-400 ">
                Explore How-To&apos;s and learn best practices from our knowledge base
              </p>
            </div>
          </Link>
        </div>

        <div className=" bg-white/5 border border-white/10 hover:border-brand-4 transition cursor-pointer rounded-lg">
          <Link href="/help/submit-ticket">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <ProfileIcon size={64} />
              <h2 className="font-[500]mb-2">Submit a ticket</h2>
              <p className="text-gray-400">
                Describe your issue by filling out the support ticket form
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* View All Articles */}
      <Link
        href="/help/knowledge-base"
        className="text-brand-4 mt-16 text-base hover:underline"
      >
        View all articles
      </Link>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-5xl w-full">
        <div className=" bg-white/5 border border-white/10 hover:border-brand-4 transition cursor-pointer rounded-lg">
          <Link href="/help/customer">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <span>
                <CustomerIcon size={54} />
              </span>
              <h2 className="font-medium mt-2">I&apos;m a Artylst customer</h2>
            </div>
          </Link>
        </div>

        <div className=" bg-white/5 border border-white/10 hover:border-brand-4 transition cursor-pointer rounded-lg">
          <Link href="/help/artylst">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <span>
                <TalentIcon size={54} />
              </span>
              <h2 className="font-medium mt-2">I&apos;m a Artist on Artylst</h2>
            </div>
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 hover:border-brand-4 transition cursor-pointer rounded-lg">
          <Link href="/help/rewards">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <span>
                {" "}
                <RedCarpetRewardsIcon size={54} />
              </span>
              <h2 className="font-medium mt-2">Red Carpet Rewards</h2>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Most popular articles</h2>
          <Link
            href="/help/knowledge-base"
            className="text-brand-4 mt-16 text-base hover:underline"
          >
            View all articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6">
            <Link
              href="/help/articleDetails"
              className="flex items-start gap-2 text-brand-4 hover:underline"
            >
              <span>
                <FileText className="w-5 h-5" />
              </span>
              <span>Can I download my Artylst video?</span>
            </Link>
            <p className="text-gray-400 text-sm mt-1">
              Modified on Tue, 20 Aug, 2024 at 1:46 PM
            </p>
          </div>

          <div className="p-6 ">
            <Link
              href="/help/articleDetails"
              className="flex items-start gap-2 text-brand-4 hover:underline"
            >
              <span>
                <FileText className="w-5 h-5" />
              </span>
              <span>How can I check the status of my Artylst video?</span>
            </Link>
            <p className="text-gray-400 text-sm mt-1">
              Modified on Wed, 11 Jun at 9:59 PM
            </p>
          </div>

          <div className="p-6 ">
            <Link
              href="/help/articleDetails"
              className="flex items-start gap-2 text-brand-4 hover:underline"
            >
              <span>
                <FileText className="w-5 h-5" />
              </span>
              <span>When will I be charged for my Artylst video?</span>
            </Link>
            <p className="text-gray-400 text-sm mt-1">
              Modified on Wed, 19 Oct, 2022 at 1:06 PM
            </p>
          </div>

          <div className="p-6 ">
            <Link
              href="/help/articleDetails"
              className="flex items-start gap-2 text-brand-4 hover:underline"
            >
              <span>
                <FileText className="w-5 h-5" />
              </span>
              <span>How do I share my Artylst video?</span>
            </Link>
            <p className="text-gray-400 text-sm mt-1">
              Modified on Thu, 10 Apr at 12:53 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
