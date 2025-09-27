import Link from "next/link";
import { CheckCircle2, ExternalLink, XCircle } from "lucide-react";

const FieldItem = ({ ok, label }: { ok: boolean; label: string }) => (
  <li className="flex items-center gap-1.5">
    {ok ? (
      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
    ) : (
      <XCircle className="h-4 w-4 text-muted" />
    )}
    {label}
  </li>
);

const ArtistIdentity = () => {
  // ✅ Dummy data for UI preview
  const govIdUploaded = true;
  const selfieCheck = false;
  const addressProof = false;
  const needsAction = true;
  const onboardingLink = "https://kyc.example.com";

  return (
    <div className="rounded-2xl p-6 border border-white/10 space-y-3 bg-gradient-to-b from-brand-2/10 to-brand-5/10 backdrop-blur-xl">
      <h3>Identity verification</h3>

      <ul className="text-muted space-y-2 mb-5">
        <FieldItem ok={govIdUploaded} label="Government ID uploaded" />
        <FieldItem ok={selfieCheck} label="Selfie check" />
        <FieldItem ok={addressProof} label="Address proof" />
      </ul>

      {needsAction ? (
        <Link
          className="btn-secondary inline-flex items-center gap-1.5"
          href={onboardingLink || "#"}
          target={onboardingLink ? "_blank" : undefined}
          aria-disabled={!onboardingLink}
        >
          {onboardingLink ? "Continue KYC" : "Complete requirements"}
          {onboardingLink && <ExternalLink className="h-4 w-4" />}
        </Link>
      ) : (
        <button className="btn-secondary !cursor-default opacity-60" disabled>
          KYC complete
        </button>
      )}
    </div>
  );
};

export default ArtistIdentity;
