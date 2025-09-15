import {
  HomeHero,
  PrivacyStrip,
  HomeGenres,
  PricingForEveryBudget,
  TopArtists,
  RecentReviews,
  ThisIsArtylist,
  HomeHowItWorks,
  HomeRecentlyViewed,
  FeaturedArtists,
} from "@/components";

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <TopArtists />
      <FeaturedArtists />
      <HomeHowItWorks />
      <ThisIsArtylist />
      <PrivacyStrip />
      <PricingForEveryBudget />
      <HomeRecentlyViewed />
      <RecentReviews />
      <HomeGenres />
    </div>
  );
};

export default HomePage;
