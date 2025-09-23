import { cn } from "@/utils";
import { User } from "lucide-react";
import Image from "next/image";
import { IUser } from "@/interface/user.interface";
import { businessAvatarFallback } from "@/constants/fallBack";

const SidebarUserCard = ({ isOpen, user }: { isOpen: boolean; user: IUser }) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-gradient-to-tr from-brand-1/15 to-brand-5/10",
        isOpen ? "p-4" : "p-2"
      )}
    >
      {isOpen ? (
        <>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              {user?.avatar ? (
                <Image
                  src={user?.avatar || businessAvatarFallback}
                  alt="user"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-xl bg-white/10 flex-center">
                  <User className="w-5 h-5 text-white/50" />
                </div>
              )}

              <div className="h-10 max-w-10 w-full rounded-xl bg-white/10 flex-center">
                <User className="w-5 h-5 text-white/50" />
              </div>
            </div>
            <div className="flex flex-col gap-1 truncate">
              <div className="text-sm">{user?.fullName}</div>
              <div className="text-xs text-white/60">@{user?.userName}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-10 w-10 rounded-xl overflow-hidden">
          {user?.avatar ? (
            <Image
              src={user?.avatar}
              alt="user"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-xl bg-white/10 flex-center">
              <User className="w-5 h-5 text-white/50" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarUserCard;
