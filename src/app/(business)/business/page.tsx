import {
  BusinessBrandHelped,
  BusinessBrandSlider,
  BusinessCTA,
  BusinessHero,
  BusinessMetrics,
  BusinessPlan,
  BusinessSecurity,
  BusinessSteps,
  BusinessUseCase,
  BusinessWhyChooseUs,
} from "@/components";

const BusinessHomePage = () => {
  return (
    <>
      <BusinessHero />
      <BusinessMetrics />
      <BusinessBrandSlider />
      <BusinessUseCase />
      <BusinessSteps />
      <BusinessBrandHelped />
      <BusinessPlan />
      <BusinessWhyChooseUs />
      <BusinessSecurity />
      <BusinessCTA />
    </>
  );
};

export default BusinessHomePage;
