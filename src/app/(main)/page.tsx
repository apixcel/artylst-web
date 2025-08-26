import {
  HomeHero,
  PrivacyStrip,
  Categories,
  GiftsForEveryBudget,
  PersonalizedPlaylists,
  TopArtists,
  RecentReviews,
  ThisIsArtylist,
  InstantPlaylists,
  FAQ,
  HomeHowItWorks,
} from "@/components";

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <PrivacyStrip />
      <PersonalizedPlaylists />
      <TopArtists />
      <InstantPlaylists />
      <HomeHowItWorks />
      <GiftsForEveryBudget />
      <RecentReviews />
      <Categories />
      <ThisIsArtylist />
      <FAQ />
    </div>
  );
};

export default HomePage;
