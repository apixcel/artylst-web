import { MasterCardIcon } from "@/icons";

const PaymentMethods = () => {
  return (
    <div>
      {/* payment methods */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4 mb-4">
        {/* payment info */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-2xl font-bricolage-grotesque">Payment method</h2>

            <div className="flex gap-2 items-center">
              <MasterCardIcon className="w-[40px] h-[40px]" />
              <p className="text-base">**** **** **** 1234</p>
            </div>
            <p className="text-sm text-muted">
              Your next billing date in December 1, 2025
            </p>
          </div>

          <button className="btn btn-primary">Manage Payment Info</button>
        </div>

        {/* active subscription */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bricolage-grotesque">Active Subscription</h3>
            <p className="text-sm text-muted">Premium</p>
          </div>

          <button className="btn btn-primary">Change Plan</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
