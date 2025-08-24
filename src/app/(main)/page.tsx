import {
  BrowseCategories,
  BrowseFavoriteStars,
  GiftsForEveryBudget,
  PersonalizedVideos,
  Top10,
  HowItWorks,
  RecentReviews,
  ThisIsArtylist,
  InstantVideos,
} from "@/components";

const HomePage = () => {
  return (
    <div>
      <BrowseFavoriteStars />
      <PersonalizedVideos />
      <Top10 />
      <InstantVideos />
      <HowItWorks />
      <GiftsForEveryBudget />
      <RecentReviews />
      <BrowseCategories />
      <ThisIsArtylist />
    </div>
  );
};

export default HomePage;
