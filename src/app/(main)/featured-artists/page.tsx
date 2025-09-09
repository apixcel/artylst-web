import { FeaturedArtistView } from "@/view";

export async function generateMetadata() {
  return {
    title: "Featured Artists | ARTYLST",
  };
}

const FeaturedArtistPage = async (props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return <FeaturedArtistView {...props} />;
};

export default FeaturedArtistPage;
