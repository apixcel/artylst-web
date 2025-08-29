import React from "react";

const Refundpage = () => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center py-16 px-6">
      <h1 className="text-6xl font-bold mb-8">Refunds & Returns</h1>
      <p className="text-gray-400 mb-8 text-xl">Last Updated: November 27, 2024</p>

      {/* Content */}
      <div className="space-y-8 leading-relaxed text-lg max-w-4xl">
        {/* Intro */}
        <p>
          Here&#39;s the short version: if your video booking request isn&#39;t fulfilled,
          we&#39;ll typically refund the purchase or give you Antylst credits. Completed
          transactions aren&#39;t refundable and can&#39;t be returned or exchanged. This
          page is meant only as a summary and is necessarily imperfect, please see our
          Terms of Service for the most complete and accurate details.
        </p>

        {/* Section 1 */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">1. General Policy</h2>
          <p>
            Antylst videos are personalized products and often require significant time
            and creative effort from the creator. They are accordingly not exchangeable or
            refundable once delivered. Similarly, all other transactions on Antylst,
            including messages sent through Antylst Direct, stickers, gift cards, and
            tips, are non-returnable and non-refundable.
          </p>
          <p>
            Creators on Antylst have the sole discretion to determine how to fulfill your
            booking request and the content of the resulting video. They may not follow
            your request word-for-word, but they will strive to honor the spirit of your
            request.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">2. Fulfillment Window</h2>
          <p>
            A creator typically has up to seven (7) days or longer, at Antylst&#39;s sole
            discretion, to fulfill or decline your request. Some creators may offer a
            shorter timeframe, such as 24 hours. If a booking request is not fulfilled
            within the described timeframe:
          </p>
          <ul className="space-y-3 ps-6 list-disc">
            <li>
              Antylst may issue a refund or credits for the booking subject to the rules
              below; or
            </li>
            <li>
              Antylst may convert the booking to a standard fulfillment request and issue
              a refund or credit for any difference in cost between the original booking
              and the standard request price.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">3. Refund Eligibility</h2>
          <p>
            If your video request is not fulfilled, you will typically be provided with a
            refund or credits to your Antylst account, depending on how you placed your
            order. However, refunds are not available in the following cases:
          </p>
          <ul className="space-y-3 ps-6 list-disc">
            <li>Improper or fraudulent bookings.</li>
            <li>
              Requests that violate our Terms of Service or Community Guidelines (e.g.,
              offensive, illegal, or harmful content).
            </li>
            <li>
              Orders placed through third-party marketplaces not authorized by Antylst.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">4. Platform-Specific Refunds</h2>
          <ul className="space-y-4 ps-6">
            <li>
              <strong>iOS (Apple):</strong> If you ordered via the Antylst App for iOS,
              you will be issued a credit in USD. If you prefer a refund, you must request
              it directly through Apple’s App Store system.
            </li>
            <li>
              <strong>Android (Google Play):</strong> If you ordered via the Antylst App
              for Android, and your booking is not fulfilled, your payment method will be
              refunded automatically.
            </li>
            <li>
              <strong>Website:</strong> If you booked on our website, we may either charge
              you in full at the time of booking or place a pre-authorization hold. If
              your request is not fulfilled, the hold will be released, or a refund will
              be issued.
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">5. Processing Timeline</h2>
          <p>
            Refunds are typically processed within 5–10 business days, depending on your
            payment provider. Credits issued to your Antylst account will be available
            instantly upon approval. Please note that bank or credit card processing times
            may delay when funds appear in your account.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">6. Non-Refundable Items</h2>
          <p>
            Certain products and services are final sale and not eligible for refunds or
            exchanges, including:
          </p>
          <ul className="space-y-3 ps-6 list-disc">
            <li>Completed personalized videos.</li>
            <li>Digital gifts, tips, and donations.</li>
            <li>Promotional discounts or coupon redemptions.</li>
            <li>Gift cards (unless required by law).</li>
          </ul>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">7. Gift Cards and Credits</h2>
          <p>
            Gift cards and credits issued by Antylst cannot be refunded, transferred, or
            redeemed for cash, except where required by applicable law. Credits may expire
            after a defined period if not used; please check your account for details.
          </p>
        </div>

        {/* Section 8 */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">8. Chargebacks</h2>
          <p>
            Initiating a chargeback with your bank or credit card issuer without first
            contacting Antylst support may result in suspension or termination of your
            account. We encourage you to resolve disputes directly with us for faster
            resolutions.
          </p>
        </div>

        {/* Section 9 */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">9. Contact Us</h2>
          <p>
            If you have questions about our Refund and Returns Policy or need to request a
            refund, please contact our support team at:
          </p>
          <ul className="space-y-3 ps-6 list-disc">
            <li>Email: support@antylst.com</li>
            <li>Help Center: help.antylst.com</li>
            <li>In-App Chat: Available 24/7 within the Antylst App</li>
          </ul>
          <p>
            We will respond to all refund-related inquiries within a reasonable timeframe,
            typically 48 hours or less.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Refundpage;
