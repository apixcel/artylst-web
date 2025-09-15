"use client";

import { Input, UnauthorizedMsgBox } from "@/components";
import Loader from "@/components/ui/Loader";
import { artistAvatarFallback } from "@/constants/fallBack";
import { useAppSelector } from "@/hooks";
import { IQueryMutationErrorResponse } from "@/interface";
import {
  useAmIFeaturedQuery,
  useBecomeFeaturedMutation,
} from "@/redux/features/artist/artist.api";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const FEATURES = [
  {
    title: "Top Homepage Slot",
    desc: "Your profile gets priority in the Featured Artists section at the top of the site.",
  },
  {
    title: "Search Priority",
    desc: "Your profile will appear higher in search results.",
  },
  {
    title: "Featured Badge",
    desc: "A visible badge on your profile that builds trust with fans/customers.",
  },
  {
    title: "Boosted Reach",
    desc: "Extra exposure in relevant listings and carousels.",
  },
  {
    title: "Insights",
    desc: "Access to view and engagement metrics (basic analytics).",
  },
  {
    title: "Promo Slots",
    desc: "Opportunity to be featured in selected campaigns.",
  },
];

const PRICE = 29; // USD per month
const YEARLY_PRICE = 299; // Discounted yearly price

const PlanOption = ({
  id,
  title,
  subtitle,
  price,
  checked,
  onChange,
}: {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label
    htmlFor={id}
    className={`block w-full cursor-pointer rounded-2xl border p-4 transition hover:shadow-md card ${
      checked ? "border-brand-4/80" : "border-white/10"
    }`}
  >
    <div className="flex items-start gap-3">
      <input
        id={id}
        name="plan"
        type="radio"
        className="mt-1 h-4 w-4 accent-brand-4/80"
        checked={checked}
        onChange={onChange}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-base">{title}</p>
          {price != null && (
            <p className="text-sm font-medium text-brand-4/80">${price}/month</p>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
    </div>
  </label>
);

const PaymentFields = ({ disabled }: { disabled: boolean }) => {
  return (
    <div className={`grid gap-4 ${disabled ? "opacity-50" : ""}`}>
      <div className="grid gap-2">
        <label htmlFor="cardNumber" className="text-sm">
          Card number
        </label>
        <Input
          id="cardNumber"
          name="cardNumber"
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 5678 9012 3456"
          disabled={disabled}
          required={!disabled}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label htmlFor="exp" className="text-sm">
            Expiry (MM/YY)
          </label>
          <Input
            id="exp"
            name="exp"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="08/27"
            disabled={disabled}
            required={!disabled}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="cvc" className="text-sm">
            CVC
          </label>
          <Input
            id="cvc"
            name="cvc"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            disabled={disabled}
            required={!disabled}
          />
        </div>
      </div>
      <p className="text-xs text-muted">
        * Demo inputs only. Integrate with backend/payment gateway for real transactions.
      </p>
    </div>
  );
};

const FeatureList = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {FEATURES.map((f) => (
      <div
        key={f.title}
        className="rounded-2xl border border-white/10 p-4 hover:shadow-sm"
      >
        <p className="text-base">{f.title}</p>
        <p className="mt-1 text-sm text-muted">{f.desc}</p>
      </div>
    ))}
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2 text-sm">
    <span className="text-muted">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const JoinAsFeaturedPage = () => {
  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useAmIFeaturedQuery(undefined);
  const [becomeFeatured, { isLoading: isSubmitting }] = useBecomeFeaturedMutation();

  const role = user?.role;

  const [plan, setPlan] = useState("standard");
  const [agree, setAgree] = useState(false);
  const isFeatured = plan === "featured";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    if (!agree) {
      alert("Please accept the terms to continue.");
      return;
    }

    const response = await becomeFeatured(undefined);
    const error = response?.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error(error.data?.message || "Something went wrong");
      return;
    }
  }

  if (role !== "artist") return <UnauthorizedMsgBox />;

  if (isLoading) return <Loader />;

  const featredSats = data?.data;
  if (featredSats?.isFeatured) {
    return (
      <div className="px-4">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/10">
            <Image
              src={user?.avatar || artistAvatarFallback}
              className="object-cover w-full h-full"
              width={100}
              height={100}
              alt="avatar"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
            <p className="text-sm text-muted">Featured Artist</p>
            <p className="mt-1 text-sm font-medium">Rank #{featredSats?.rank}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 p-4 text-center">
            <p className="text-lg font-semibold">{featredSats?.stats?.ordersCount}</p>
            <p className="text-sm text-muted">Orders</p>
          </div>
          <div className="rounded-xl border border-white/10 p-4 text-center">
            <p className="text-lg font-semibold">${featredSats?.stats?.totalIncome}</p>
            <p className="text-sm text-muted">Total Income</p>
          </div>
          <div className="rounded-xl border border-white/10 p-4 text-center">
            <p className="text-lg font-semibold">
              {featredSats?.stats?.avgRating
                ? featredSats?.stats?.avgRating.toFixed(1)
                : "—"}
            </p>
            <p className="text-sm text-muted">Avg Rating</p>
          </div>
          <div className="rounded-xl border border-white/10 p-4 text-center">
            <p className="text-lg font-semibold">{featredSats?.stats?.reviewCount}</p>
            <p className="text-sm text-muted">Reviews</p>
          </div>
          <div className="rounded-xl border border-white/10 p-4 text-center">
            <p className="text-lg font-semibold">
              {featredSats?.stats?.minStartingPrice
                ? `$${featredSats?.stats.minStartingPrice}`
                : "—"}
            </p>
            <p className="text-sm text-muted">Starting Price</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl">Join as Featured Artist</h1>
        <p className="mt-1 text-sm text-muted">
          You can choose to become Featured for $29/month. Select a plan below.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 p-6 lg:col-span-2"
        >
          <div className="grid gap-6">
            {/* Plan selection */}
            <div className="grid gap-3">
              <h2 className="text-sm">Choose your plan</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <PlanOption
                  id="plan-standard"
                  title="Standard Profile"
                  subtitle="Free — Create a profile, public visibility."
                  checked={plan === "standard"}
                  onChange={() => setPlan("standard")}
                  price={0}
                />
                <PlanOption
                  id="plan-featured"
                  title="Featured Profile"
                  subtitle="$29/month — Top placement, badge, search priority, etc."
                  price={PRICE}
                  checked={plan === "featured"}
                  onChange={() => setPlan("featured")}
                />
              </div>
            </div>

            {/* Benefits preview */}
            <div className="grid gap-3">
              <h2 className="text-sm">Benefits of Featured</h2>
              <FeatureList />
            </div>

            {/* Payment section */}
            <div className="grid gap-3">
              <h2 className="text-base">Payment</h2>
              <PaymentFields disabled={!isFeatured} />
            </div>

            {/* Terms */}

            {/* Submit */}
            {isFeatured ? (
              <>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-brand-4/80"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    I confirm that I accept the terms for{" "}
                    {isFeatured ? "Featured subscription" : "the selected plan"}.
                    Subscription will renew monthly and can be cancelled anytime.
                  </span>
                </label>{" "}
                <button
                  type="submit"
                  className="text-[16px] font-[500] bg-light text-black sm:px-[32px] px-6 sm:py-[16px] py-3 rounded-[100px] hover:bg-light/80 transition-all duration-300 cursor-pointer"
                  disabled={!agree}
                >
                  {isLoading ? "Loading..." : "Confirm & Pay $29/month"}
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </form>

        {/* Order Summary */}
        <aside className="rounded-3xl border border-white/10 p-6">
          <h2 className="text-base">Summary</h2>
          <div className="mt-4 divide-y">
            <SummaryRow
              label="Selected plan"
              value={isFeatured ? "Featured" : "Standard"}
            />
            <SummaryRow label="Billing" value={isFeatured ? "Monthly" : "—"} />
            <SummaryRow label="Monthly Price" value={isFeatured ? `$${PRICE}` : "$0"} />
            {isFeatured && (
              <SummaryRow label="Yearly Price" value={`$${YEARLY_PRICE} (save $49)`} />
            )}
          </div>
          <div className="mt-4 rounded-xl bg-white/10 p-4 text-sm">
            <p className="font-medium">Note</p>
            <p className="mt-1 text-muted">
              This is a demo submission. Replace with your backend endpoint and secure
              payment gateway (e.g. Stripe/SSLCommerz).
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JoinAsFeaturedPage;
