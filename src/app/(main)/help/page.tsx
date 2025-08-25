import {
  CustomerIcon,
  ProfileIcon,
  RedCarpetRewardsIcon,
  TalentIcon,
  LampIcon,
} from "@/icons";
import { Search } from "lucide-react";

import React from "react";

const HelpPage = () => {
  return (
    <div className="min-h-screen  text-white flex flex-col items-center py-16 px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Hi, how can we help you?</h1>

      {/* Search Bar */}
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute w-4.5 h-4.5 left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search artists, genres…"
            className="w-full bg-white/10 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-3xl w-full">
        <div className="bg-white/10 border border-white/10 hover:border-purple-500 transition cursor-pointer rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <span className="text-green-400 text-2xl mb-3">
              {" "}
              <LampIcon size={64} />
            </span>
            <h2 className="font-semibold mb-2">Browse articles</h2>
            <p className="text-gray-400 text-sm">
              Explore How-To's and learn best practices from our knowledge base
            </p>
          </div>
        </div>

        <div className="bg-white/10 border border-white/10 hover:border-purple-500 transition cursor-pointer rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <span className="text-green-400 text-2xl mb-3">
              <ProfileIcon size={64} />
            </span>
            <h2 className="font-semibold mb-2">Submit a ticket</h2>
            <p className="text-gray-400 text-sm">
              Describe your issue by filling out the support ticket form
            </p>
          </div>
        </div>
      </div>

      {/* View All Articles */}
      <button className="text-purple-500 mt-6 text-base hover:underline">
        View all articles
      </button>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-5xl w-full">
        <div className="bg-white/10 border border-white/10 hover:border-purple-500 transition cursor-pointer rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <span className="text-gray-400 text-2xl mb-3">
              <CustomerIcon size={44} />
            </span>
            <h2 className="font-medium">I'm a Cameo customer</h2>
          </div>
        </div>

        <div className="bg-white/10 border border-white/10 hover:border-purple-500 transition cursor-pointer rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <span className="text-gray-400 text-2xl mb-3">
              <TalentIcon size={44} />
            </span>
            <h2 className="font-medium">I'm a Talent on Cameo</h2>
          </div>
        </div>

        <div className="bg-white/10 border border-white/10 hover:border-purple-500 transition cursor-pointer rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <span className="text-gray-400 text-2xl mb-3">
              <RedCarpetRewardsIcon size={44} />
            </span>
            <h2 className="font-medium">Red Carpet Rewards</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
