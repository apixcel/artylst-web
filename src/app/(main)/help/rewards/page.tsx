import { FileText, Folder } from "lucide-react";
import React from "react";

const RewardsPage = () => {
  return (
    <div className=" rounded-lg shadow p-6  mx-auto">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-white">
          Red Carpet Rewards <span>(7)</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* How do I use Artylst */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <span>
              <Folder />
            </span>{" "}
            Red Carpet Rewards <span>(7)</span>
          </h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm ">
                How do I check my balance?
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm">
                How do I earn points?
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm">
                How do I join Red Carpet Rewards?
              </a>
            </li>
          </ul>
          <a href="#" className="text-brand-4 hover:underline text-md">
            View all 7
          </a>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
