import Link from "next/link";
import React from "react";

const Privacypage = () => {
  return (
    <div className="wrapper-inner" id="top">
      <section className="py-16 text-white">
        {/* Title */}
        <h1 className="text-[36px] xl:text-[40px] font-[500] mb-[10px]">
          Privacy Policy
        </h1>

        {/* Last Updated */}
        <p className="italic text-[14px] font-[400] leading-[20px] text-gray-300">
          Last Updated: <span className="not-italic">July 2, 2025</span>
        </p>

        {/* Effective Date */}
        <p className="italic text-gray-300 text-[14px] font-[400] leading-[20px] mb-[20px]">
          Effective Date: <span className="not-italic">July 2, 2025</span> (see Section 1
          for further details on when this Privacy Policy takes effect).
        </p>

        {/* Intro */}
        <p className=" mx-auto text-gray-200 text-[14px] font-[400] leading-[20px] mb-[20px]">
          We value your trust and take your privacy seriously. This Privacy Policy
          describes the types of information we collect, how we use it, with whom we may
          share it, and the choices available to you regarding our use of your personal
          data. By accessing or using our Site, you acknowledge that you have read,
          understood, and agreed to the terms of this Privacy Policy. Please review it
          carefully, as it contains important information about your rights and
          responsibilities as a user of our services.
        </p>

        {/* Table of Contents */}
        <div className="mx-auto">
          <h2 className="text-[20px] font-[700] leading-[28px] mb-4">
            Table of Contents
          </h2>
          <ol className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 list-decimal list-inside">
            <li>
              <Link href="#scope" className="text-brand-4 hover:underline">
                Scope of Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#information" className="text-brand-4 hover:underline">
                Information We Collect
              </Link>
            </li>
            <li>
              <Link href="#cookies" className="text-brand-4 hover:underline">
                Cookies and Tracking Technologies
              </Link>
            </li>
            <li>
              <Link href="#use" className="text-brand-4 hover:underline">
                How We Use Information
              </Link>
            </li>
            <li>
              <Link href="#share" className="text-brand-4 hover:underline">
                How We Share Information
              </Link>
            </li>
            <li>
              <Link href="#children" className="text-brand-4 hover:underline">
                Children and Parents
              </Link>
            </li>
            <li>
              <Link href="#choices" className="text-brand-4 hover:underline">
                Your Choices
              </Link>
            </li>
            <li>
              <Link href="#access" className="text-brand-4 hover:underline">
                Accessing & Correcting Information
              </Link>
            </li>
            <li>
              <Link href="#retention" className="text-brand-4 hover:underline">
                Data Retention & Deletion
              </Link>
            </li>
            <li>
              <Link href="#security" className="text-brand-4 hover:underline">
                Data Security
              </Link>
            </li>
            <li>
              <Link href="#international" className="text-brand-4 hover:underline">
                International Data Transfers
              </Link>
            </li>
            <li>
              <Link href="#thirdparties" className="text-brand-4 hover:underline">
                Third-Party Services
              </Link>
            </li>
            <li>
              <Link href="#ads" className="text-brand-4 hover:underline">
                Advertising & Analytics
              </Link>
            </li>
            <li>
              <Link href="#do-not-track" className="text-brand-4 hover:underline">
                Do Not Track Signals
              </Link>
            </li>
            <li>
              <Link href="#updates" className="text-brand-4 hover:underline">
                Updates to This Policy
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-brand-4 hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#jurisdiction" className="text-brand-4 hover:underline">
                Jurisdiction & Governing Law
              </Link>
            </li>
          </ol>
        </div>
      </section>

      {/* Section 1 */}
      <section id="scope" className="py-12 border-t border-white/10">
        <h2 className="text-[20px] font-[700] leading-[28px] mb-4">
          1. Scope of Privacy Policy; Changes to Policy
        </h2>
        <div className="space-y-6 text-gray-200 leading-relaxed">
          <p className="text-[14px] font-[400] leading-[20px]">
            This Privacy Policy applies to all products, services, and digital platforms
            offered by Artylst, whether accessed through a computer, mobile device, or any
            other technology. It covers all users worldwide, except where we explicitly
            state otherwise.
          </p>
          <p className="text-[14px] font-[400] leading-[20px]">
            Please note that our Site may link to or integrate with third-party websites,
            services, or platforms (such as social media, advertising partners, or
            analytics providers). Each of these third parties has its own privacy
            practices and policies, which may differ from ours. We encourage you to review
            those policies, as Artylst is not responsible for their practices.
          </p>
          <p className="text-[14px] font-[400] leading-[20px]">
            We may update this Privacy Policy periodically to reflect changes in the law,
            technology, or our business practices. When we do, we will update the “Last
            Updated” date at the top of this page. If changes are significant, we may also
            notify you directly by email or via prominent notice on our Site.
          </p>
        </div>
        <div className="mt-8">
          <a href="#top" className="text-brand-4 font-semibold hover:underline">
            ↑ RETURN TO TOP
          </a>
        </div>
      </section>

      {/* Section 2 */}
      <section id="information" className="py-12 border-t border-white/10">
        <h2 className="text-[20px] font-[700] leading-[28px] mb-4">
          2. Information We Collect
        </h2>
        <div className="space-y-6 text-gray-200 leading-relaxed">
          <p className="text-[14px] font-[400] leading-[20px]">
            We collect different types of information from and about users of our Site,
            including both personal information and non-personal information. This helps
            us provide better services, improve our offerings, and maintain the security
            of our platform.
          </p>
          <h3 className="font-semibold text-white">
            a. Information You Provide Directly
          </h3>
          <ul className="space-y-1 text-[14px] ps-6 list-disc">
            <li>Account creation: name, email, phone number, and password.</li>
            <li>
              Payment information: billing address, credit card details (processed
              securely).
            </li>
            <li>Profile data: photos, preferences, and uploaded content.</li>
            <li>Communications: messages, reviews, or feedback you send to us.</li>
          </ul>
          <h3 className="font-semibold text-white">
            b. Information We Collect Automatically
          </h3>
          <p className="text-[14px] font-[400] leading-[20px]">
            We automatically gather technical information when you use our Site, such as:
            device type, operating system, IP address, browser type, referring/exit pages,
            time spent on pages, and general usage patterns. This data helps us optimize
            performance and user experience.
          </p>
          <h3 className="font-semibold text-white">c. Information from Third Parties</h3>
          <p className="">
            We may receive additional data from advertising networks, social platforms, or
            business partners. For example, if you log in with Google or Facebook, we may
            access your name, email, and profile photo from those services (with your
            consent).
          </p>
        </div>
        <div className="mt-8">
          <a href="#top" className="text-brand-4 font-semibold hover:underline">
            ↑ RETURN TO TOP
          </a>
        </div>
      </section>

      {/* Section 3 */}
      <section id="cookies" className="py-12 border-t border-white/10">
        <h2 className="text-[20px] font-[700] leading-[28px] mb-4">
          3. Cookies and Tracking Technologies
        </h2>
        <div className="space-y-6 text-gray-200 leading-relaxed">
          <p className="text-[14px] font-[400] leading-[20px]">
            We use cookies, tracking pixels, beacons, and similar technologies to collect
            and store information about your usage of our Site. Cookies are small files
            stored on your device that help us recognize you and remember your
            preferences.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Essential Cookies:</strong> Enable core functionality like login
              sessions.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand traffic patterns and
              improve features.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> Used to deliver personalized ads based
              on your interests.
            </li>
            <li>
              <strong>Preference Cookies:</strong> Save your language, theme, and region
              choices.
            </li>
          </ul>
          <p className="text-[14px] font-[400] leading-[20px]">
            You can manage or disable cookies in your browser settings, but note that some
            features of our Site may not function properly if cookies are disabled.
          </p>
        </div>
        <div className="mt-8">
          <a href="#top" className="text-brand-4 font-semibold hover:underline">
            ↑ RETURN TO TOP
          </a>
        </div>
      </section>

      {/* Section 4 */}
      <section id="use" className="py-12 border-t border-white/10">
        <h2 className="text-[20px] font-[700] leading-[28px] mb-4">
          4. How We Use Information
        </h2>
        <div className="space-y-6 text-gray-200 leading-relaxed">
          <p className="">
            We use the information we collect in a variety of ways to provide, improve,
            and protect our services. Examples include:
          </p>
          <ul className="space-y-1 text-[14px] ps-6 list-disc">
            <li>Processing your transactions and delivering services you request.</li>
            <li>
              Improving user experience by personalizing content and recommendations.
            </li>
            <li>Communicating with you about promotions, offers, and product updates.</li>
            <li>Monitoring and analyzing trends to develop new features.</li>
            <li>
              Detecting, investigating, and preventing fraudulent or illegal activity.
            </li>
            <li>Complying with legal obligations and enforcing our Terms of Service.</li>
          </ul>
        </div>
        <div className="mt-8">
          <a href="#top" className="text-brand-4 font-semibold hover:underline">
            ↑ RETURN TO TOP
          </a>
        </div>
      </section>

      {/* Section 5 */}
      <section id="share" className="py-12 border-t border-white/10">
        <h2 className="text-[20px] font-[700] leading-[28px] mb-4">
          5. How We Share Information
        </h2>
        <div className="space-y-6 text-gray-200 leading-relaxed">
          <p>
            We may share information collected about you in the following circumstances:
          </p>
          <ul className="space-y-1 text-[14px] ps-6 list-disc">
            <li>
              With service providers (payment processors, hosting providers, customer
              support).
            </li>
            <li>
              With advertising and analytics partners who help us deliver relevant ads.
            </li>
            <li>
              With legal authorities, if required to comply with laws, regulations, or
              court orders.
            </li>
            <li>
              In the event of a corporate transaction, such as a merger or acquisition.
            </li>
          </ul>
          <p>
            We do not sell your personal data to third parties. Any data sharing is done
            under strict contractual obligations and only for legitimate purposes.
          </p>
        </div>
        <div className="mt-8">
          <a href="#top" className="text-brand-4 font-semibold hover:underline">
            ↑ RETURN TO TOP
          </a>
        </div>
      </section>

      {/* Section 6 */}
      <section id="children" className="py-12 border-t border-white/10">
        <h2 className="text-[20px] font-[700] leading-[28px] mb-4">
          6. Children and Parents
        </h2>
        <div className="space-y-6 text-gray-200 leading-relaxed">
          <p>
            Our Site is not directed to children under the age of 13 (or the minimum age
            required in your jurisdiction). We do not knowingly collect personal
            information from children. If we become aware that we have collected
            information from a child without parental consent, we will delete it promptly.
          </p>
          <p>
            Parents or guardians who believe their child has provided personal data should
            contact us immediately so we can take appropriate action.
          </p>
        </div>
        <div className="mt-8">
          <a href="#top" className="text-brand-4 font-semibold hover:underline">
            ↑ RETURN TO TOP
          </a>
        </div>
      </section>

      {/* Section 7 */}
      <section id="choices" className="py-12 border-t border-white/10">
        <h2 className="text-[20px] font-[700] leading-[28px] mb-4">7. Your Choices</h2>
        <div className="space-y-6 text-gray-200 leading-relaxed">
          <p>You have several choices regarding your personal data:</p>
          <ul className="space-y-1 text-[14px] ps-6 list-disc">
            <li>Opt-out of marketing emails by using the unsubscribe link.</li>
            <li>Manage cookies through your browser or our cookie consent tool.</li>
            <li>Access, correct, or delete your account information at any time.</li>
            <li>Request a copy of the personal data we hold about you.</li>
          </ul>
          <p>
            To exercise these rights, please contact our support team. We will respond
            within the timeframe required by applicable law.
          </p>
        </div>
        <div className="mt-8">
          <a href="#top" className="text-brand-4 font-semibold hover:underline">
            ↑ RETURN TO TOP
          </a>
        </div>
      </section>
    </div>
  );
};

export default Privacypage;
