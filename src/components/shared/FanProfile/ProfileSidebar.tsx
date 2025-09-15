"use client";
import { fanAvatarFallback } from "@/constants/fallBack";
import { fanProfileLinks } from "@/constants/fanProfileLinks";
import { useAppSelector } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const ProfileSidebar = () => {
  const { user } = useAppSelector((state) => state.user);
  const pathname = usePathname();
  return (
    <div className="w-full xl:w-[300px] shrink-0 xl:sticky top-[125px] flex flex-col gap-5">
      <div className="card rounded-[8px] p-4">
        <div className="flex items-center justify-start gap-3">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden shrink-0">
            <Image
              src={user?.avatar || fanAvatarFallback}
              alt="user"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-semibold leading-[100%]">{user?.fullName}</h2>
            <p className="text-[12px] text-white/60 leading-[100%]">@{user?.userName}</p>
            <p className="text-[12px] text-white/60 leading-[100%]">{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="card p-4 flex-col gap-2 w-full hidden xl:flex">
        {fanProfileLinks.map((link, index) => (
          <Link
            key={index + link.label}
            href={link.route}
            className={`group flex  gap-2 items-center rounded-[8px] px-4 py-2 w-full hover:bg-white/10 ${pathname === link.route ? "bg-white/10" : ""}`}
          >
            <link.icon className={"text-muted group-hover:light h-5 w-5"} />
            <span className="font-heading">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* mobile */}
      <div className="xl:hidden flex items-center sm:gap-2 gap-1 flex-wrap justify-start">
        {fanProfileLinks.map((link, index) => (
          <Link
            key={index + link.label}
            href={link.route}
            className={`group flex w-fit  gap-2 items-center rounded-[8px] px-4 py-2 hover:bg-white/10 ${pathname === link.route ? "bg-white/10" : ""}`}
          >
            <link.icon className={"text-muted group-hover:light h-5 w-5"} /> {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
