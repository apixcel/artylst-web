import { useAppSelector } from "@/hooks";
import { INotification } from "@/interface/notification";
import { useSocket } from "@/provider/SocketProvider";
import {
  useGetMyNotificationsQuery,
  useMarkAllNotificationAsReadMutation,
} from "@/redux/features/notification/notification.api";
import { cn } from "@/utils";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Skeleton from "../ui/Skeleton";
import NotificationDialog from "./NotificationDialog";

export const NotificationListSkeleton = () => {
  return (
    <Skeleton className="w-full flex items-center justify-between p-3 gap-2">
      <Skeleton className="h-8 w-8 rounded-md" />
      <div className="flex items-start gap-1 flex-col w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </Skeleton>
  );
};

const NotificationList = ({ notification }: { notification: INotification }) => {
  const [showDetails, setShowDetails] = useState(false);

  const unread = !notification.isReaded;
  return (
    <>
      <div
        onClick={() => setShowDetails(!showDetails)}
        className={cn(
          "px-2 py-3 rounded-lg hover:bg-white/10 cursor-pointer",
          unread && "g-white/[0.02]"
        )}
      >
        <div className="flex items-center gap-3 w-full">
          {/* Avatar / Icon */}
          <div className="shrink-0 w-[36px] h-[36px]">
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
                  className={`w-5 h-5 ${unread ? "text-white/90" : "text-white/50"}`}
                />
              </div>
            )}
          </div>

          {/* Text */}
          <div className="w-full">
            <div className="flex items-center gap-1 w-full justify-between">
              <h6
                className={`text-sm ${unread ? "text-white/90" : "text-white/50"} relative line-clamp-1 w-fit`}
              >
                {notification.title}
              </h6>
              {unread && (
                <span className="h-2.5 w-2.5 rounded-full bg-brand-4/80 shrink-0" />
              )}
            </div>
            <p
              className={`text-xs ${unread ? "text-white/90" : "text-white/40"} mt-0.5 line-clamp-1`}
            >
              {notification.description}
            </p>
            {!!notification.createdAt && (
              <p
                className={`text-xs ${unread ? "text-white/90" : "text-white/30"} mt-0.5`}
              >
                {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
              </p>
            )}
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

const NotificationDropdownList = ({
  isOpen,
  menuId,
  align,
  onNewNotification,
  setIsOpen,
}: {
  isOpen: boolean;
  menuId: string;
  align: "left" | "right";
  onNewNotification?: (msg: string) => void;
  setIsOpen?: (isOpen: boolean) => void;
}) => {
  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading, refetch } = useGetMyNotificationsQuery({
    limit: 5,
  });
  const items = data?.data || [];

  const [markAllAsRead] = useMarkAllNotificationAsReadMutation();

  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    function newNotification(msg: string) {
      const audio = new Audio("/audio/notificationotification.mp3");
      audio.play();

      toast.message("New notification: " + msg, {
        position: "bottom-right",
        closeButton: true,
      });
      onNewNotification?.(msg);
      refetch();
    }
    socket.on("new_notification", newNotification);

    return () => {
      socket.off("ping", newNotification);
    };
  }, [socket]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        id={menuId}
        role="menu"
        aria-label="Notifications"
        className={cn(
          "absolute z-50 mt-2 w-80 bg-base-900 rounded-2xl border border-white/10 backdrop-blur-xl p-3 shadow-xl",
          align === "right" ? "right-0" : "left-0"
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-white">Notifications</p>
          <button
            onClick={() => markAllAsRead(undefined)}
            className="text-xs text-white/70 hover:text-white/90 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/10 focus:ring-2 focus:ring-white/30 outline-none cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all as read
          </button>
        </div>
        <div className="flex flex-col max-h-96 overflow-auto smoothBar gap-1">
          {isLoading ? (
            <>
              <NotificationListSkeleton />
              <NotificationListSkeleton />
              <NotificationListSkeleton />
              <NotificationListSkeleton />
            </>
          ) : !items.length ? (
            <div className="text-sm text-white/60 px-2 py-6 text-center">
              No notifications
            </div>
          ) : (
            items.map((notification) => {
              // Make entire row focusable for keyboard nav
              return (
                <NotificationList key={notification._id} notification={notification} />
              );
            })
          )}
        </div>

        <Link
          onClick={() => setIsOpen?.(false)}
          href={
            user?.role == "fan" ? "/profile/notifications" : "/dashboard/notifications"
          }
          className="text-xs text-white/70 flex items-center gap-1 px-2 py-1 rounded-md hover:underlineoutline-none cursor-pointer"
        >
          View all notifications
        </Link>
      </div>
    </>
  );
};

export default NotificationDropdownList;
