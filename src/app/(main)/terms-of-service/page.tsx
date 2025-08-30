import Link from "next/link";
import React from "react";

const TermsOfServicePage = () => {
  return (
    <div className="wrapper-inner text-white flex flex-col md:flex-row" id="top">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 md:min-h-screen mb-8 md:mb-0">
        <nav className="sticky top-20 p-6 space-y-3 text-[14px]">
          <h3 className="uppercase text-gray-400 text-[12px] mb-3">Skip to Section</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#site-terms"
                className="block text-brand-4 font-semibold hover:underline"
              >
                Site Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#marketplace" className="block hover:underline">
                Artylst Marketplace
              </Link>
            </li>
            <li>
              <Link href="#videos" className="block hover:underline">
                Artylst Videos
              </Link>
            </li>
            <li>
              <Link href="#business" className="block hover:underline">
                Business Artylsts
              </Link>
            </li>
            <li>
              <Link href="#additional" className="block hover:underline">
                Additional Site Terms
              </Link>
            </li>
            <li>
              <Link href="#acceptable" className="block hover:underline">
                Acceptable Use Policy
              </Link>
            </li>
            <li>
              <Link href="#talent" className="block hover:underline">
                Talent Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#additional-talent" className="block hover:underline">
                Additional Talent Terms
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-16">
        {/* Section 1 */}
        <section id="site-terms">
          <h1 className="text-[28px] font-[600] mb-2">Site Terms of Service</h1>
          <p className="italic text-gray-300 text-[14px]">
            Last Updated: <span className="not-italic">May 7, 2025</span>
          </p>
          <p className="italic text-gray-300 text-[14px] mb-6">
            Effective Date: <span className="not-italic">June 7, 2025</span>
          </p>
          <p className="text-[14px] leading-[20px] mb-4 text-gray-200">
            These Terms govern your use of our website, mobile applications, and all
            related services. By using our site, you agree to comply with these Terms and
            all applicable laws.
          </p>
          <ul className="list-disc list-inside text-[14px] text-gray-200 space-y-2">
            <li>You must be at least 13 years old to use our services.</li>
            <li>
              You are responsible for maintaining the confidentiality of your account
              credentials.
            </li>
            <li>
              We may modify or discontinue services at any time, with or without notice.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section id="marketplace">
          <h2 className="text-[22px] font-[600] mb-4">Artylst Marketplace</h2>
          <p className="text-[14px] text-gray-200 leading-[20px] mb-4">
            The Marketplace allows users to request and purchase personalized content. All
            transactions are subject to these Terms and any additional conditions provided
            at checkout.
          </p>
          <h3 className="font-semibold text-white mb-2">Key Marketplace Rules:</h3>
          <ol className="list-decimal list-inside text-[14px] space-y-2 text-gray-200">
            <li>All payments must be completed through the official platform.</li>
            <li>
              Refunds are only available in cases where Talent fails to deliver content.
            </li>
            <li>Reselling or redistributing Marketplace purchases is prohibited.</li>
          </ol>
        </section>

        {/* Section 3 */}
        <section id="videos">
          <h2 className="text-[22px] font-[600] mb-4">Artylst Videos</h2>
          <p className="text-[14px] text-gray-200 leading-[20px] mb-4">
            Artylst Videos are for personal, non-commercial use only. Redistribution,
            resale, or public broadcast is prohibited without express permission.
          </p>
          <ul className="list-disc list-inside text-[14px] text-gray-200 space-y-2">
            <li>You may share your Artylst Video on social media for personal use.</li>
            <li>
              You may not use Artylst Videos in advertisements or promotions without prior
              written consent.
            </li>
            <li>
              We reserve the right to remove or disable content that violates these rules.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="business">
          <h2 className="text-[22px] font-[600] mb-4">Business Artylsts</h2>
          <p className="text-[14px] text-gray-200 leading-[20px] mb-4">
            Business Artylsts may be used for promotional or commercial purposes under
            separate agreements. Unauthorized commercial use of personal Artylsts is
            strictly prohibited.
          </p>
          <h3 className="font-semibold text-white mb-2">Examples of Permitted Uses:</h3>
          <ul className="list-disc list-inside text-[14px] space-y-2 text-gray-200">
            <li>Brand shoutouts or endorsements (with Talent approval).</li>
            <li>Internal company events or training sessions.</li>
            <li>Marketing campaigns explicitly approved by our team.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="additional">
          <h2 className="text-[22px] font-[600] mb-4">Additional Site Terms</h2>
          <p className="text-[14px] text-gray-200 leading-[20px]">
            Additional terms may apply to specific services, promotions, or features. In
            case of conflict, the additional terms will prevail over these general Terms.
          </p>
        </section>

        {/* Section 6 */}
        <section id="acceptable">
          <h2 className="text-[22px] font-[600] mb-4">Acceptable Use Policy</h2>
          <p className="text-[14px] text-gray-200 leading-[20px] mb-4">
            You agree not to misuse the Site or engage in harmful, fraudulent, or illegal
            activity. Violations may result in suspension or termination of your account.
          </p>
          <h3 className="font-semibold text-white mb-2">Prohibited Activities:</h3>
          <ol className="list-decimal list-inside text-[14px] space-y-2 text-gray-200">
            <li>Posting hateful, threatening, or discriminatory content.</li>
            <li>Attempting to hack, disrupt, or overload the platform.</li>
            <li>Engaging in fraudulent transactions or identity theft.</li>
          </ol>
        </section>

        {/* Section 7 */}
        <section id="talent">
          <h2 className="text-[22px] font-[600] mb-4">Talent Terms of Service</h2>
          <p className="text-[14px] text-gray-200 leading-[20px] mb-4">
            Talent users (creators providing Artylsts) must comply with specific
            guidelines regarding content delivery, intellectual property, and user
            interactions.
          </p>
          <ul className="list-disc list-inside text-[14px] space-y-2 text-gray-200">
            <li>Talent must deliver content within the agreed timeframe.</li>
            <li>Talent must not share user requests publicly without permission.</li>
            <li>
              Payments to Talent will be processed in accordance with our payout schedule.
            </li>
          </ul>
        </section>

        {/* Section 8 */}
        <section id="additional-talent">
          <h2 className="text-[22px] font-[600] mb-4">Additional Talent Terms</h2>
          <p className="text-[14px] text-gray-200 leading-[20px] mb-4">
            Additional obligations for Talent may be communicated separately, including
            brand partnership rules, promotional requirements, and exclusivity
            arrangements.
          </p>
          <p className="text-[14px] text-gray-200">
            Violation of Additional Talent Terms may result in account suspension or
            termination.
          </p>
        </section>
      </main>
    </div>
  );
};

export default TermsOfServicePage;
