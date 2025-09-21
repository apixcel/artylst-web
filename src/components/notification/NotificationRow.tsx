import { INotification } from "@/interface/notification";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import NotificationDialog from "./NotificationDialog";
const NotificationRow = ({ notification }: { notification: INotification }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        key={notification._id}
        className={`p-4 md:p-5 hover:bg-white/5 transition-colors flex items-start gap-3 ${notification.isReaded ? "" : "bg-white/5"}`}
      >
        <div className="h-9 w-9">
          {notification?.avatar ? (
            <Image
              src={notification.avatar}
              alt={""}
              width={36}
              height={36}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="h-full w-full rounded-xl bg-white/10 flex-center">
              <Bell
                className={`w-5 h-5 ${notification.isReaded ? "text-white/90" : "text-white/50"}`}
              />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="min-w-0">
              <div className="font-medium flex items-center">
                {!notification.isReaded ? (
                  <span
                    className={"inline-block h-2.5 w-2.5 rounded-full mr-2 bg-gold"}
                    aria-hidden
                  />
                ) : (
                  ""
                )}
                <span className="truncate text-[15px]">{notification.title}</span>
              </div>
              {notification.description && (
                <p className="text-white/60 text-xs mt-0.5 line-clamp-2 max-w-prose">
                  {notification.description}
                </p>
              )}
            </div>
            <button
              onClick={() => setShowDetails(true)}
              className="px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 text-xs cursor-pointer"
            >
              Details
            </button>
          </div>
        </div>
      </div>

      <NotificationDialog
        isOpen={showDetails}
        setIsOpen={setShowDetails}
        notification={notification}
      />
    </>
  );
};

export default NotificationRow;
