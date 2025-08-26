import { FileText, Folder } from "lucide-react";
import React from "react";

const Artylstpage = () => {
  return (
    <div className=" rounded-lg shadow p-6  mx-auto">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-white">
          I&#39;m aTalent on Cameo <span>(2)</span>
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
            Payments <span>(4)</span>
          </h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm ">
                What percentage do I earn from each completed Cameo Video?
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm">
                How do I donate to a charity?
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm">
                Can I arrange for a fan to get a refund?
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm">
                How do I get paid?
              </a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-md">
            View all 4
          </a>
        </div>

        {/* Paying for a Artylst */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>
              <Folder />
            </span>{" "}
            Using the App <span>(9)</span>
          </h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm">
                How do I complete a Cameo Video?
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm">
                How do I decline a Cameo Video?
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm">
                How do I send a fan a Direct Message?
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FileText />
              </span>
              <a href="#" className="hover:underline text-sm">
                How do I complete a Cameo Video request that has expired?
              </a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-md">
            View all 9
          </a>
        </div>
      </div>
    </div>
  );
};

export default Artylstpage;
