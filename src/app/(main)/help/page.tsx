"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ProfileIcon, LampIcon, TalentIcon, RedCarpetRewardsIcon, CustomerIcon} from "@/icons";
const HelpPage = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="min-h-screen text-white flex flex-col items-center py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Hi, how can we help you?</h1>

      {/* Search Bar */}
      <div className="w-full max-w-2xl flex items-center bg-white rounded-lg overflow-hidden shadow-md">
        <input
          type="text"
          placeholder="Enter the search term here...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 text-black focus:outline-none"
        />
        <div className="p-3 bg-gray-200">
          <Search className="text-gray-600" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-3xl w-full">
        <div className=" border border-gray-600 hover:border-purple-500 transition cursor-pointer rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <LampIcon size={64} />
            <h2 className="font-semibold mb-2">
              Browse articles</h2>
            <p className="text-gray-400 text-sm">
              Explore How-To&apos;s and learn best practices from our knowledge base
            </p>
          </div>
        </div>

        <div className=" border border-gray-600 hover:border-purple-500 transition cursor-pointer rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
              <ProfileIcon size={64} />
            <h2 className="font-semibold mb-2">
              Submit a ticket</h2>
            <p className="text-gray-400 text-sm">
              Describe your issue by filling out the support ticket form
            </p>
          </div>
        </div>
      </div>

      {/* View All Articles */}
      <button className="text-purple-500 mt-16 text-base hover:underline">
        View all articles
      </button>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-5xl w-full">
        <div className=" border border-gray-600 hover:border-purple-500 transition cursor-pointer rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
           <span><CustomerIcon size={54} /></span>
            <h2 className="font-medium mt-2">I&apos;m a Antylst customer</h2>
          </div>
        </div>

        <div className=" border border-gray-600 hover:border-purple-500 transition cursor-pointer rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
           <span> <TalentIcon size={54} /></span>
            <h2 className="font-medium mt-2">I&apos;m a Talent on Antylst</h2>
          </div>
        </div>

        <div className="border border-gray-600 hover:border-purple-500 transition cursor-pointer rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
           <span> <RedCarpetRewardsIcon size={54} /></span>
            <h2 className="font-medium mt-2">Red Carpet Rewards</h2>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Most popular articles</h2>
          <button className="text-purple-500 text-sm hover:underline">
            View all articles
          </button>
        </div>

  <div className="grid grid-cols-1 md:grid-cols-2">

          <div className="p-6">
            <a
              href="#"
              className="flex items-start gap-2 text-purple-400 hover:underline"
            >
              <span>📄</span>
              <span>Can I download my Antylst video?</span>
            </a>
            <p className="text-gray-400 text-sm mt-1">
              Modified on Tue, 20 Aug, 2024 at 1:46 PM
            </p>
          </div>

          <div className="p-6 ">
            <a
              href="#"
              className="flex items-start gap-2 text-purple-400 hover:underline"
            >
              <span>📄</span>
              <span>How can I check the status of my Antylst video?</span>
            </a>
            <p className="text-gray-400 text-sm mt-1">
              Modified on Wed, 11 Jun at 9:59 PM
            </p>
          </div>

          <div className="p-6 " >
            <a
              href="#"
              className="flex items-start gap-2 text-purple-400 hover:underline"
            >
              <span>📄</span>
              <span>When will I be charged for my Antylst video?</span>
            </a>
            <p className="text-gray-400 text-sm mt-1">
              Modified on Wed, 19 Oct, 2022 at 1:06 PM
            </p>
          </div>

          <div className="p-6 ">
            <a
              href="#"
              className="flex items-start gap-2 text-purple-400 hover:underline"
            >
              <span>📄</span>
              <span>How do I share my Antylst video?</span>
            </a>
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
