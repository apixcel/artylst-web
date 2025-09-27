import Link from "next/link";

const OnboardingReturnPage = () => {
  return (
    <section className="max-w-[400px] mx-auto h-[calc(100vh-700px)] flex items-center justify-center">
      <div className="border border-brand-4/30 rounded-2xl p-6 text-center">
        <h3 className="text-brand-4 mb-2">Successfully Connected Stripe</h3>
        <p className="text-muted">You can now start receiving payouts from ARTYLST.</p>
        <Link href="/dashboard/kyc" className="btn-secondary inline-block mt-3">
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
};

export default OnboardingReturnPage;
