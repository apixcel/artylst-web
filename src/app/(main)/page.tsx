import {
  HomeHero,
  PrivacyStrip,
  Categories,
  GiftsForEveryBudget,
  PersonalizedPlaylists,
  TopArtists,
  HowItWorks,
  RecentReviews,
  ThisIsArtylist,
  InstantPlaylists,
  FAQ,
} from "@/components";

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <PrivacyStrip />
      <PersonalizedPlaylists />
      <TopArtists />
      <InstantPlaylists />
      <HowItWorks />
      <GiftsForEveryBudget />
      <RecentReviews />
      <Categories />
      <ThisIsArtylist />
      <FAQ />
    </div>
  );
};

export default HomePage;
