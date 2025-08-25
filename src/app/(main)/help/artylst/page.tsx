import { FileText, Folder } from 'lucide-react';
import React from 'react';

const Artylstpage = () => {
    return (
      <div className=" rounded-lg shadow p-6  mx-auto">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-semibold text-white">
            I&#39;m a Artylst customer <span>(5)</span>
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
              How do I use Artylst? <span>(11)</span>
            </h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm ">
                  How can I check the status of my Artylst video?
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  Can I edit the instructions after I send my Artylst video request?
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  How do I cancel my Artylst video request?
                </a>
              </li>
            </ul>
            <a href="#" className="text-purple-500 hover:underline text-md">
              View all 11
            </a>
          </div>

          {/* Paying for a Artylst */}
          <div className="p-6 space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <span>
                <Folder />
              </span>{" "}
              Paying for a Artylst <span>(4)</span>
            </h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  When will I be charged for my Artylst video?
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  Which payment methods are accepted?
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  Where&apos;s my refund?
                </a>
              </li>
            </ul>
            <a href="#" className="text-purple-500 hover:underline text-md">
              View all 4
            </a>
          </div>

          {/* Business Artylsts */}
          <div className="p-6 space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <span>
                <Folder />
              </span>{" "}
              Business Artylsts <span>(9)</span>
            </h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  I’m not happy with my business video. Is there anything you can do?
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  What celebrities are available for business videos?
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  Can I edit my business video or remove the watermark?
                </a>
              </li>
            </ul>
            <a href="#" className="text-purple-500 hover:underline text-md">
              View all 9
            </a>
          </div>

          {/* Artylst Direct Messages */}
          <div className="p-6 space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <span>
                <Folder />
              </span>{" "}
              Artylst Direct Messages <span>(3)</span>
            </h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  I sent a Artylst DM to a celebrity, but they didn&#39;t respond. What
                  gives?
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  How do I send a Artylst DM?
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  What&apos;s a Artylst Direct Message?
                </a>
              </li>
            </ul>
            <a href="#" className="text-purple-500 hover:underline text-md">
              View all 3
            </a>
          </div>

          {/* Artylst Collage & Cards */}
          <div className="p-6 space-y-3 md:col-span-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold ">
              <span>
                <Folder />
              </span>{" "}
              Artylst Collage & Physical/Digital Cards <span>(12)</span>
            </h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  When is the physical card sent?
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  What happens if the Artylst expires?
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FileText />
                </span>
                <a href="#" className="hover:underline text-sm">
                  How do I purchase a physical card?
                </a>
              </li>
            </ul>
            <a href="#" className="text-purple-500 hover:underline text-md">
              View all 12
            </a>
          </div>
        </div>
      </div>
    );
};

export default Artylstpage;