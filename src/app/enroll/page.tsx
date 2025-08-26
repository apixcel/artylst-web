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
    <div className="flex flex-col min-h-screen">
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
  );
};

export default EnrollPage;
