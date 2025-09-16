"use client";
import { useAppSelector } from "@/hooks";
import { IUser } from "@/interface";
import { ArtistCheckoutView } from "@/view";
import { useRouter } from "next/navigation";

const ArtistCheckoutPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;
  const router = useRouter();

  if (role === "artist") return router.push("/");
  return <ArtistCheckoutView user={user as IUser} />;
};

export default ArtistCheckoutPage;
