"use client";
import { useAppSelector } from "@/hooks";
import { ArtistBookView } from "@/view";
import { useRouter } from "next/navigation";

const ArtistBookPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;
  const router = useRouter();

  if (role === "artist") return router.push("/");

  return <ArtistBookView />;
};

export default ArtistBookPage;
