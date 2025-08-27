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
    <div className="flex flex-col min-h-screen ">
      <EnrollHeader />
      <div className="flex-1 pt-[85px] -mt-[170px] customer-stories">
        <div className="lg:pt-0 pt-[85px]">
          <EnrollHero />
          <EnrollWhyChooseUs />
          <EnrollHowItWorks />
          <EnrollEarningEstimatior />
          <EnrollTiers />
          <EnrollTools />
          <EnrollCTA />
        </div>
      </div>
      <div className="bg-black">
        <MainFooter />
      </div>
    </div>
  );
};

export default EnrollPage;
