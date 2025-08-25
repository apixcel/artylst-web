import React from 'react';

const KnowledgeBase = () => {
  return (
    <section>
        <div className=" rounded-lg shadow p-6  mx-auto">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
       
        <h2 className="text-xl font-semibold text-white">
          I&#39;m a Cameo customer <span >(5)</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* How do I use Cameo */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <span>📂</span> How do I use Cameo? <span>(11)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg ">How can I check the status of my Cameo video?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Can I edit the instructions after I send my Cameo video request?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">How do I cancel my Cameo video request?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 11</a>
        </div>

        {/* Paying for a Cameo */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>📂</span> Paying for a Cameo <span>(4)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">When will I be charged for my Cameo video?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Which payment methods are accepted?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Where&apos;s my refund?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 4</a>
        </div>

        {/* Business Cameos */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>📂</span> Business Cameos <span>(9)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">I’m not happy with my business video. Is there anything you can do?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">What celebrities are available for business videos?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Can I edit my business video or remove the watermark?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 9</a>
        </div>

        {/* Cameo Direct Messages */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>📂</span> Cameo Direct Messages <span>(3)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">I sent a Cameo DM to a celebrity, but they didn&#39;t respond. What gives?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">How do I send a Cameo DM?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">What&apos;s a Cameo Direct Message?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 3</a>
        </div>

        {/* Cameo Collage & Cards */}
        <div className="p-6 space-y-3 md:col-span-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold ">
            <span>📂</span> Cameo Collage & Physical/Digital Cards <span>(12)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">When is the physical card sent?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">What happens if the Cameo expires?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">How do I purchase a physical card?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 12</a>
        </div>
      </div>
    </div>
    <div className=" rounded-lg shadow p-6  mx-auto">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
       
        <h2 className="text-xl font-semibold text-white">
          I&#39;m a Talent on Cameo <span >(2)</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* How do I use Cameo */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <span>📂</span> Payment <span>(4)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg ">How can I check the status of my Cameo video?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Can I edit the instructions after I send my Cameo video request?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">How do I cancel my Cameo video request?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 11</a>
        </div>

        {/* Paying for a Cameo */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>📂</span> Paying for a Cameo <span>(4)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">When will I be charged for my Cameo video?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Which payment methods are accepted?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Where&apos;s my refund?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 4</a>
        </div>

        {/* Business Cameos */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>📂</span> Business Cameos <span>(9)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">I’m not happy with my business video. Is there anything you can do?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">What celebrities are available for business videos?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Can I edit my business video or remove the watermark?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 9</a>
        </div>

        {/* Cameo Direct Messages */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>📂</span> Cameo Direct Messages <span>(3)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">I sent a Cameo DM to a celebrity, but they didn&#39;t respond. What gives?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">How do I send a Cameo DM?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">What&apos;s a Cameo Direct Message?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 3</a>
        </div>

        {/* Cameo Collage & Cards */}
        <div className="p-6 space-y-3 md:col-span-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold ">
            <span>📂</span> Cameo Collage & Physical/Digital Cards <span>(12)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">When is the physical card sent?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">What happens if the Cameo expires?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">How do I purchase a physical card?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 12</a>
        </div>
      </div>
    </div>
    <div className=" rounded-lg shadow p-6  mx-auto">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
       
        <h2 className="text-xl font-semibold text-white">
          I&#39;m a Cameo customer <span >(5)</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* How do I use Cameo */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <span>📂</span> How do I use Cameo? <span>(11)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg ">How can I check the status of my Cameo video?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Can I edit the instructions after I send my Cameo video request?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">How do I cancel my Cameo video request?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 11</a>
        </div>

        {/* Paying for a Cameo */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>📂</span> Paying for a Cameo <span>(4)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">When will I be charged for my Cameo video?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Which payment methods are accepted?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Where&apos;s my refund?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 4</a>
        </div>

        {/* Business Cameos */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>📂</span> Business Cameos <span>(9)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">I’m not happy with my business video. Is there anything you can do?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">What celebrities are available for business videos?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">Can I edit my business video or remove the watermark?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 9</a>
        </div>

        {/* Cameo Direct Messages */}
        <div className="p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>📂</span> Cameo Direct Messages <span>(3)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">I sent a Cameo DM to a celebrity, but they didn&#39;t respond. What gives?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">How do I send a Cameo DM?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">What&apos;s a Cameo Direct Message?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 3</a>
        </div>

        {/* Cameo Collage & Cards */}
        <div className="p-6 space-y-3 md:col-span-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold ">
            <span>📂</span> Cameo Collage & Physical/Digital Cards <span>(12)</span>
          </h3>
          <ul className="space-y-2 text-purple-500">
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">When is the physical card sent?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">What happens if the Cameo expires?</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📄</span>
              <a href="#" className="hover:underline text-lg">How do I purchase a physical card?</a>
            </li>
          </ul>
          <a href="#" className="text-purple-500 hover:underline text-lg">View all 12</a>
        </div>
      </div>
    </div>
    </section>
  );
}

export default KnowledgeBase;