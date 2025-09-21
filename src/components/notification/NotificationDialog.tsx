"use client";
import { INotification } from "@/interface/notification";
import { useMarkNotificationAsReadByIdMutation } from "@/redux/features/notification/notification.api";
import { formatDate } from "date-fns";
import { Bell, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import DialogProvider from "../ui/DialogProvider";
interface IProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  notification: INotification;
}

const NotificationDialog: React.FC<IProps> = ({ isOpen, setIsOpen, notification }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [markAsRead] = useMarkNotificationAsReadByIdMutation();

  const setState = setIsOpen || setIsDialogOpen;
  const state = isOpen || isDialogOpen;

  useEffect(() => {
    const handleRead = async () => {
      if (!notification.isReaded && state) {
        await markAsRead(notification._id);
      }
    };

    handleRead();
  }, [state, notification]);

  return (
    <>
      <DialogProvider state={state} setState={setState} className="w-full max-w-lg">
        {notification && (
          <div
            role="dialog"
            aria-modal="true"
            className="rounded-2xl border border-white/10 bg-white/10 p-5 md:p-6 shadow-2xl backdrop-saturate-150"
          >
            {/* Header */}
            <div className="flex items-start gap-3">
              {notification.avatar ? (
                <Image
                  src={notification.avatar as string}
                  alt={notification.title}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full grid place-items-center bg-white/10">
                  <Bell className="h-5 w-5" />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h2 id="notif-title" className="text-base md:text-lg font-semibold">
                    {notification.title}
                  </h2>
                  <button
                    onClick={() => setState(false)}
                    className="p-1 rounded-lg border border-white/10 hover:bg-white/10"
                    aria-label="Close dialog"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span>{formatDate(notification.createdAt, "MMM dd yyyy")}</span>
                </div>
              </div>
            </div>

            {/* Body */}
            {notification.description && (
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {notification.description}
              </p>
            )}

            {/* Meta (optional) */}
            <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-white/60">
              <div className="flex items-center justify-between">
                <span>Type</span>
                <span className="text-white/80 capitalize">
                  {!notification.audienceType ? "General" : "Admin Announcement"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Updated</span>
                <span className="text-white/80">
                  {formatDate(notification.updatedAt, "MMM dd yyyy")}
                </span>
              </div>
            </div>

            {/* Footer actions */}
            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={() => setState(false)}
                className="px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </DialogProvider>
    </>
  );
};

export default NotificationDialog;
