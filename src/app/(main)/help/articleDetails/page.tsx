import { FileText, Frown, Smile } from 'lucide-react';
import React from 'react';

const ArticleDetailsPage = () => {
    return (
       <div className="bg-white/5 border border-white/10 rounded-lg shadow max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3">
      {/* Left Content */}
      <div className="col-span-2 p-6 ">
        <h1 className="font-semibold text-lg mb-4">
          Can I download my Artylst video?
        </h1>
        <p className=" mb-4">
          Yes. It’s super easy! You can download it straight from the Artylst app,
          site, or from the completed Artylst video link and share to your social
          media profiles, too.
        </p>

        <p className=" mb-4">
          <span className="font-semibold">Artylst app:</span> First, log into your
          Artylst account with the same email address used to book the Artylst
          video. Once you&apos;re logged in, tap on the DMs icon and then click on
          the thread with your Artylst video. Next, tap on your Artylst video, and
          click on the three dots at the bottom right corner of the screen. From
          there, you should see the option to download your Artylst video.
        </p>

        <p className="mb-6">
          <span className="font-semibold">Artylst.com:</span> You can go to your
          orders page from the Artylst site,{" "}
          <a href="#" className="text-purple-500 hover:underline">
            Artylst.com/orders
          </a>
          , and tap the “view” button on your completed Artylst video. From there,
          you&apos;ll be brought to your Artylst video link and you&apos;ll see the option
          to download your Artylst video after selecting “share”.
        </p>

        <hr className="my-6 border-white/10" />

        {/* Helpful Section */}
        <div className="text-center">
          <p className="font-medium mb-3">Was this article helpful?</p>
          <div className="flex justify-center gap-4">
            <button className="px-4 py-2 border border-white/10 rounded-md flex items-center gap-2 hover:bg-purple-500">
              <span><Frown /></span> No
            </button>
            <button className="px-4 py-2 border border-white/10 rounded-md flex items-center gap-2 hover:bg-purple-500">
              <span><Smile/></span> Yes
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="p-6 bg-white/6 rounded-r-lg">
        <button className="flex items-center gap-2 text-sm text-white mb-6">
          🖨 Print
        </button>

        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">
            Articles in this folder -
          </h3>
          <ul className="space-y-2  text-sm">
            <li className="flex items-center gap-2">
              <FileText/> <a href="#" className="hover:underline text-purple-500">How can I check the status of my Artylst video?</a>
            </li>
            <li className="flex items-center gap-2">
              <FileText/> <a href="#" className="hover:underline text-purple-500">Can I edit the instructions after I send my Artylst video request?</a>
            </li>
            <li className="flex items-center gap-2">
              <FileText/> <a href="#" className="hover:underline text-purple-500">How do I cancel my Artylst video request?</a>
            </li>
            <li className="flex items-center gap-2">
              <FileText/> <a href="#" className="hover:underline text-purple-500">My Artylst video expired! What do I do?</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">
            You may like to read -
          </h3>
          <ul className="space-y-2  text-sm">
            <li className="flex items-center gap-2">
              <FileText/> <a href="#" className="hover:underline text-purple-500">How do I share my Artylst video?</a>
            </li>
            <li className="flex items-center gap-2">
              <FileText/> <a href="#" className="hover:underline text-purple-500">Is there a limit to how long I can use my business video?</a>
            </li>
            <li className="flex items-center gap-2">
              <FileText/> <a href="#" className="hover:underline text-purple-500">How will I receive my Artylst video?</a>
            </li>
            <li className="flex items-center gap-2">
              <FileText/> <a href="#" className="hover:underline text-purple-500">When will I be charged for my Artylst video?</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    );
};

export default ArticleDetailsPage;
