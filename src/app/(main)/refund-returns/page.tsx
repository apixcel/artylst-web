import React from "react";

const Refundpage = () => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center py-16 px-6">
      <h1 className="text-6xl font-bold mb-8">Refunds & Returns</h1>
      <p className="text-gray-400 mb-8 text-xl">Last Updated: November 27, 2024</p>

      {/* Content */}
      <div className="space-y-6 leading-relaxed text-lg">
        <p>
          Here&#39;s the short version: if your video booking request isn&#39;t fulfilled,
          we&#39;ll typically refund the purchase or give you Antylst credits. Completed
          transactions aren&#39;t refundable and can&#39;t be returned or exchanged. This
          page is meant only as a summary and is necessarily imperfect, please see our
          Terms of Service for the most complete and accurate details.
        </p>

        <p>
          Antylst videos are personalized products, and often require significant time and
          effort of the creator to complete. They are accordingly not exchangeable or
          refundable. Similarly, all other transactions on Antylst, including messages
          sent through Antylst Direct, stickers, gift cards, and tips, are not returnable,
          exchangeable, or refundable.
        </p>

        <p>
          Creators on Antylst have the sole discretion to determine how to fulfill your
          booking request and the content of the resulting video. They may not follow your
          request exactly. A creator typically has up to seven days or longer, at
          Antylst&#39;s sole discretion, to fulfill or decline your request, although some
          creators may offer the option of a shorter timeframe such as 24 hours. If a
          booking request is not fulfilled within the described timeframe, Antylst may in
          its sole discretion either (i) issue a refund or credit for the booking subject
          to the rules below or (ii) convert the booking to a standard fulfillment request
          and issue a refund or credit for any difference in cost between the original
          booking and the corresponding cost of a standard fulfillment request for the
          creator.
        </p>

        <p>
          If your video request is not fulfilled, you will typically be provided with a
          refund or credits to your Antylst account, depending on how you placed your
          order. No refunds or credits will be provided for improper bookings (for
          example, ones that violate our Terms or Community Guidelines or are booked
          against Apple or Google policies). For all other bookings:
        </p>

        <ul className="space-y-3  ps-6">
          <li className="flex gap-2">
            <span className="text-lg">•</span>
            <span>
              If you placed your order through the Antylst App for iOS, you will be issued
              a credit (in USD only) for the cost of your purchase. If you prefer a refund
              instead, you can request one via Apple by going to your orders in the app
              and clicking “request refund” on the Antylst video order; you must have a
              credit balance at least equal to the refund amount, and credits in that
              amount will be deducted from your account immediately.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-lg">•</span>
            <span>
              If you placed your order through the Antylst App for Android, you will be
              charged at the time of booking or purchase for all amounts associated with
              your transaction, and if your request is canceled or not fulfilled, your
              payment instrument will be refunded.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-lg">•</span>
            <span>
              If you placed your order through our website, we may charge you in full at
              the time of booking, in which case if your request is not fulfilled your
              payment instrument will be refunded. Or we may place a pre-authorization
              hold on your payment instrument and then immediately charge you when your
              video is fulfilled; if it&#39;s not fulfilled, then the hold will be
              released.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Refundpage;
