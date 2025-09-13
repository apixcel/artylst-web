"use client";
import { useAppSelector } from "@/hooks";
import { IArtist } from "@/interface";
import {
  useAddOrRemoveFavArtistMutation,
  useGetFavArtistQuery,
} from "@/redux/features/artist/artist.api";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
interface IProps {
  artist: IArtist;
  className?: string;
}
const AddOrRemoveArtistToFav: React.FC<IProps> = ({ artist, className }) => {
  const { user } = useAppSelector((state) => state.user);

  const { data: myFav } = useGetFavArtistQuery(
    {},
    { skip: !user || user.role === "artist" }
  );
  const [isFav, setIsFav] = useState(Boolean(artist?.isFavorite));
  const [addRemove] = useAddOrRemoveFavArtistMutation();

  const addOrRemove = async () => {
    setIsFav(!isFav);
    await addRemove(artist._id);
  };

  useEffect(() => {
    const isFav = myFav?.data?.find((item) => item._id === artist._id);
    setIsFav(Boolean(isFav));
  }, [myFav]);

  return (
    <>
      {!user || user.role === "artist" ? null : (
        <button
          className={twMerge(
            `flex items-center justify-center border-[1px] border-red-campaign-red w-[40px] h-[40px] rounded-full cursor-pointer ${isFav ? "bg-red-campaign-red" : ""}`,
            className
          )}
          onClick={() => addOrRemove()}
        >
          <Heart size={20} className={`${isFav ? "text-white" : "fill-white"}`} />
        </button>
      )}
    </>
  );
};

export default AddOrRemoveArtistToFav;
