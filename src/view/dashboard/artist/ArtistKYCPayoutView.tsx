"use client";

import {
  ShieldCheck,
  Wallet,
  CreditCard,
  Calendar,
  Loader2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/hooks";
import { ArtistIdentity, UnauthorizedMsgBox } from "@/components";
import { useGetStripeAccountStatsQuery } from "@/redux/features/stripe/stripe.api";
import { useMemo } from "react";

// --- helpers (NO hooks here)
const humanizeField = (raw: string) => {
  const map: Record<string, string> = {
    external_account: "Payout account (bank / debit)",
    "individual.first_name": "Individual → First name",
    "individual.last_name": "Individual → Last name",
    "individual.dob.day": "Individual → DOB day",
    "individual.dob.month": "Individual → DOB month",
    "individual.dob.year": "Individual → DOB year",
    "individual.ssn_last_4": "Individual → SSN last 4",
    "tos_acceptance.date": "Terms of Service → Acceptance date",
    "tos_acceptance.ip": "Terms of Service → Acceptance IP",
  };
  return map[raw] ?? raw.replace(/\./g, " → ");
};
const dedup = (arr?: string[]) => Array.from(new Set(arr ?? []));
const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2">
    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
    <span className="text-sm text-muted">{text}</span>
  </li>
);

export default function ArtistKYCPayoutView() {
  // ✅ Call hooks in a fixed order, at the very top
  const { user } = useAppSelector((s) => s.user);
  const role = user?.role;

  // Keep the query signature consistent (no sometimes-undefined/sometimes-empty)
  const {
    data: apiData,
    isLoading,
    isError,
    refetch,
  } = useGetStripeAccountStatsQuery(undefined);

  // Safely pick fields (works even while loading)
  const payload = apiData?.data;
  const payoutsEnabled = payload?.payoutsEnabled ?? false;
  const transfersActive = payload?.transfersActive ?? false;
  const onboardingLink = payload?.onboardingLink ?? null;

  const rawMissing = payload?.missingFields ?? [];
  const rawUpcoming = payload?.upcomingFields ?? [];

  // ✅ Always compute memos (even if we'll return early later)
  const missing = useMemo(
    () => dedup(rawMissing).map(humanizeField),
    // Depend on the arrays directly; they’re stable enough for RTK Query
    [rawMissing]
  );
  const upcoming = useMemo(() => dedup(rawUpcoming).map(humanizeField), [rawUpcoming]);

  // From here on, you can early-return safely — hooks already ran in the same order.
  if (role !== "artist") return <UnauthorizedMsgBox />;

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-muted">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading Stripe status…
        </div>
      </section>
    );
  }

  if (isError || !payload) {
    return (
      <section className="space-y-6">
        <div className="rounded-2xl p-5 border border-white/10 bg-red-500/10">
          <h3 className="text-red-300">Couldn’t load Stripe status</h3>
          <p className="text-muted">Please try again.</p>
          <button onClick={() => refetch()} className="btn-secondary mt-3">
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="dashboard-page-title">KYC &amp; Payout</h1>

      {(missing.length > 0 || upcoming.length > 0) && (
        <div className="rounded-2xl p-6 border border-white/10 bg-brand-5/5">
          <h3>Next steps</h3>
          <p className="text-muted">Finish these to enable payouts.</p>

          <div className="flex gap-4">
            {missing.length > 0 && (
              <div className="mt-3">
                <div className="text-sm font-medium text-light/90">Missing now</div>
                <ul className="mt-2 space-y-1">
                  {missing.map((m) => (
                    <ListItem key={m} text={m} />
                  ))}
                </ul>
              </div>
            )}

            {upcoming.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-medium text-light/90">May be requested</div>
                <p className="text-muted">
                  These items may be requested when you cross the $1,000 threshold.
                </p>
                <ul className="mt-2 space-y-1">
                  {upcoming.map((u) => (
                    <ListItem key={u} text={u} />
                  ))}
                </ul>
              </div>
            )}
          </div>

          {onboardingLink && (
            <div className="mt-4">
              <Link
                href={onboardingLink}
                className="btn-secondary inline-flex items-center gap-1.5"
              >
                Continue in Stripe <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Identity */}
        <ArtistIdentity />

        {/* Payouts */}
        <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-5/10 space-y-3 backdrop-blur-xl">
          <h3>Payouts</h3>
          <div className="text-muted">
            Connect Stripe to receive payouts. Artylst never stores bank details.
          </div>

          <div className="mt-2 flex gap-2">
            {payoutsEnabled ? (
              <button className="btn-secondary !cursor-default opacity-60" disabled>
                Payouts enabled
              </button>
            ) : (
              <Link
                className={`btn-secondary inline-flex items-center gap-1.5 ${!onboardingLink ? "!cursor-not-allowed opacity-60" : ""}`}
                href={onboardingLink || "#"}
                aria-disabled={!onboardingLink}
              >
                Connect Stripe {onboardingLink && <ExternalLink className="h-4 w-4" />}
              </Link>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-muted">
              <Wallet className="h-4 w-4 text-light" />{" "}
              <span className="font-medium text-light">Transfers:</span>{" "}
              {transfersActive ? "Active" : "Inactive"}
            </div>
            <div className="flex items-center gap-2 text-muted">
              <CreditCard className="h-4 w-4 text-light" />{" "}
              <span className="font-medium text-light">Next payout:</span>{" "}
              {payoutsEnabled ? "Scheduled by Stripe" : "—"}
            </div>
            <div className="flex items-center gap-2 text-muted">
              <Calendar className="h-4 w-4 text-light" />{" "}
              <span className="font-medium text-light">Last payout:</span> —
            </div>
          </div>
        </div>
      </div>

      {/* Security tips */}
      <div className="rounded-2xl p-6 border border-white/10 bg-brand-2/15 text-sm space-y-2">
        <div className="flex items-center gap-2 text-base">
          <ShieldCheck className="h-5 w-5" /> Security & Privacy
        </div>
        <p className="text-muted">
          Artylst never shares your personal banking info with fans. All payments handled
          securely by Stripe.
        </p>
        <p className="text-muted">
          Make sure your ID matches your legal name on your payout account to avoid
          delays.
        </p>
      </div>
    </section>
  );
}
