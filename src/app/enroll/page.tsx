import {
  EnrollHeader,
  EnrollHero,
  EnrollWhyChooseUs,
  EnrollHowItWorks,
  EnrollTiers,
  EnrollEarningEstimatior,
  MainFooter,
  EnrollTools,
  EnrollCTA,
} from "@/components";
const EnrollPage = () => {
  return (
    <div className="flex flex-col min-h-screen -top-[170px] relative pt-[85px]">
      <div className="flex-1 relative brand-surface-strong pt-[85px]">
        {/* grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-[.18] pointer-events-none" />
        <EnrollHeader />
        <div className="flex-1">
          <div className="wrapper my-[32px]">
            <EnrollHero />
            <EnrollWhyChooseUs />
            <EnrollHowItWorks />
            <EnrollEarningEstimatior />
            <EnrollTiers />
            <EnrollTools />
            <EnrollCTA />
          </div>
        </div>
        <MainFooter />
      </div>
    </div>
  );
};

export default EnrollPage;
