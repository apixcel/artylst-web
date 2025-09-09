import { TopArtistView } from "@/view";

export async function generateMetadata() {
  return {
    title: "ARTYLST Leaderboard | Top Artists",
  };
}

const TopArtistPage = async (props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return <TopArtistView {...props} />;
};

export default TopArtistPage;
