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
      <div className="flex-1 -mt-[170px] pt-[85px] customer-stories">
        <div className="">
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
