"use client";

import { Dropdown, Pagination } from "@/components";
import { NotificationListSkeleton } from "@/components/notification/NotificationDropdownList";
import NotificationRow from "@/components/notification/NotificationRow";
import { DropdownOption } from "@/interface";
import { useSocket } from "@/provider/SocketProvider";
import { useGetMyNotificationsQuery } from "@/redux/features/notification/notification.api";
import { Bell, CheckCheck, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

// --- Filters ---
const notificationsOptions: DropdownOption<string>[] = [
  { label: "All", value: "" },
  { label: "Read", value: "read" },
  { label: "Unread", value: "unread" },
];

const NotificationsView = ({
  notificationSound,
  className,
}: {
  notificationSound?: boolean;
  className?: string;
}) => {
  const [readFilter, setReadFilter] = useState<DropdownOption<string>>(
    notificationsOptions[0]
  );

  const [query, setQuery] = useState({ limit: 10, page: 1 });
  const { data, isLoading, refetch } = useGetMyNotificationsQuery({
    ...query,
    readType: readFilter.value,
  });

  const rows = data?.data || [];
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) return;

    function newNotification(msg: string) {
      if (notificationSound) {
        const audio = new Audio("/audio/notification.mp3");
        audio.play();
      }
      toast.message("New notification: " + msg, {
        position: "bottom-right",
        closeButton: true,
      });
      refetch();
    }
    socket.on("new_notification", newNotification);

    return () => {
      socket.off("ping", newNotification);
    };
  }, [socket]);

  return (
    <section className={twMerge("space-y-6", className)}>
      <div>
        <h1 className="text-2xl md:text-3xl font-heading">My Notifications</h1>
        <p className="text-white/60 text-sm mt-1">
          Track, manage, and view your notifications.
        </p>
      </div>

      {/* Filter / Actions bar */}
      <div className="rounded-2xl p-4 border border-white/10 bg-white/5 gap-4 flex items-end sm:justify-start md:justify-between flex-wrap">
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/10 hover:bg-white/20 flex items-center">
            <span className="inline-flex items-center gap-2">
              <CheckCheck className="h-4 w-4" /> Mark All as Read
            </span>
          </button>
        </div>

        <div className="flex gap-1">
          <label className="text-muted mr-2 inline-flex items-center gap-1 text-sm">
            <Filter className="h-4 w-4" /> Notifications
          </label>
          <Dropdown
            value={readFilter}
            options={notificationsOptions}
            onChange={(v) => setReadFilter(v)}
            buttonClassName="md:w-50 w-44"
          />
        </div>
      </div>

      {/* LIST */}
      <div className=" overflow-hidden">
        {isLoading ? (
          <div className="p-4 flex flex-col gap-2">
            <NotificationListSkeleton />
            <NotificationListSkeleton />
            <NotificationListSkeleton />
            <NotificationListSkeleton />
            <NotificationListSkeleton />
            <NotificationListSkeleton />
            <NotificationListSkeleton />
          </div>
        ) : rows.length > 0 ? (
          <div role="list" className="flex flex-col gap-2">
            {rows.map((row) => (
              <NotificationRow key={row._id} notification={row} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto h-12 w-12 rounded-full grid place-items-center bg-white/10 mb-3">
              <Bell className="h-6 w-6" />
            </div>
            <div className="text-lg">No notifications found</div>
            <p className="text-white/60 text-sm mt-1 max-w-md mx-auto">
              Try changing your filters.
            </p>
          </div>
        )}

        <div className="border-t border-white/10">
          <Pagination totalDocs={rows.length} page={1} />
        </div>
      </div>

      {/* -------- MODAL (Details) -------- */}
    </section>
  );
};

export default NotificationsView;
