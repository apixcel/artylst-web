import { ArtistDetailsView } from "@/view";

export async function generateMetadata({ params }: { params: { userName: string } }) {
  const { userName } = await params;
  return {
    title: `Artist Details - ${userName}`,
  };
}

const ArtistDetailsPage = async ({ params }: { params: { userName: string } }) => {
  const { userName } = await params;
  return <ArtistDetailsView userName={userName} />;
};

export default ArtistDetailsPage;
