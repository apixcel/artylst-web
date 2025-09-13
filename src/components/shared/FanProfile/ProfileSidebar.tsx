"use client";
import { artistAvatarFallback, fanAvatarFallback } from "@/constants/fallBack";
import { useAppSelector } from "@/hooks";
import Image from "next/image";
const ProfileSidebar = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="w-[300px] shrink-0  min-h-[400px] sticky top-[125px]">
      <div className="bg-white/10 backdrop-blur-2xl">
        <Image
          src={user?.avatar || fanAvatarFallback}
          alt="user"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProfileSidebar;
