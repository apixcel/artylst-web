import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Wallet,
  CreditCard,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const ArtistKycPage = () => {
  return (
    <section className="p-6 space-y-6">
      <h1 className="dashboard-page-title">KYC &amp; Payout</h1>

      {/* Status */}
      <div className="rounded-2xl p-5 border border-white/10 bg-brand-1/20 flex items-center justify-between">
        <div>
          <h3 className="font-bricolage-grotesque">Verification status</h3>
          <p className="text-muted">Complete all steps to enable payouts.</p>
        </div>
        <span className="flex items-center gap-1 text-amber-400 text-sm">
          <AlertTriangle className="h-4 w-4" /> Pending
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Identity */}
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5 space-y-3">
          <h3 className="font-bricolage-grotesque">Identity verification</h3>
          <ul className="text-muted space-y-2 mb-5">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Government ID uploaded
            </li>
            <li className="flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-muted" /> Selfie check
            </li>
            <li className="flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-muted" /> Address proof
            </li>
          </ul>

          <Link className="btn-secondary" href="#">
            Continue KYC
          </Link>
        </div>

        {/* Payouts */}
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5 space-y-3">
          <h3 className="font-bricolage-grotesque">Payouts</h3>
          <div className="text-muted">
            Connect Stripe to receive payouts. Artylst never stores bank details.
          </div>
          <div className="mt-2 flex gap-2">
            <Link className="btn-secondary" href="#">
              Connect Stripe
            </Link>
            <Link className="btn-tertiary" href="#">
              Disconnect
            </Link>
          </div>

          {/* Stubbed info */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-muted">
              <Wallet className="h-4 w-4 text-light" />{" "}
              <span className="font-medium text-light">Bank:</span> Bank of America
              ••••4321
            </div>
            <div className="flex items-center gap-2 text-muted">
              <CreditCard className="h-4 w-4 text-light" />{" "}
              <span className="font-medium text-light">Next payout:</span> Sep 5, 2025
            </div>
            <div className="flex items-center gap-2 text-muted">
              <Calendar className="h-4 w-4 text-light" />{" "}
              <span className="font-medium text-light">Last payout:</span> Aug 10, 2025
              ($890)
            </div>
          </div>
        </div>
      </div>

      {/* Security tips */}
      <div className="rounded-2xl p-6 border border-white/10 bg-brand-2/15 text-sm space-y-2">
        <div className="font-bricolage-grotesque flex items-center gap-2 text-base">
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
};

export default ArtistKycPage;
