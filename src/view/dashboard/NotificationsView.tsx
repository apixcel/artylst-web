"use client";

import { Dropdown, Pagination } from "@/components";
import { businessAvatarFallback } from "@/constants/fallBack";
import { DropdownOption, Notification } from "@/interface";
import dateUtils from "@/utils/date";
import { Bell, Filter, CheckCheck, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { DialogProvider } from "@/components";

const notificationsData = [
  {
    _id: "1",
    title: "Jonathan Smith place order #123456",
    description: "Jonathan Smith placed an order for a new song.",
    read: false,
    notificationType: "read",
    createdAt: "2025-09-15T09:00:00Z",
    updatedAt: "2025-09-15T09:00:00Z",
    avatar: businessAvatarFallback,
  },
  {
    _id: "11",
    title: "Welcome to the app",
    description: "You’ve successfully created an account.",
    read: true,
    notificationType: "read",
    createdAt: "2025-09-15T09:00:00Z",
    updatedAt: "2025-09-15T09:00:00Z",
    avatar: "",
  },
  {
    _id: "2",
    title: "Billing updated",
    description: "Your payment method was updated.",
    read: false,
    notificationType: "unread",
    createdAt: "2025-09-20T13:10:00Z",
    updatedAt: "2025-09-20T13:10:00Z",
    avatar: "",
  },
  {
    _id: "3",
    title: "New comment on your post",
    description: "Arif replied: ‘Great work!’",
    read: false,
    notificationType: "unread",
    createdAt: "2025-09-21T01:35:00Z",
    updatedAt: "2025-09-21T01:35:00Z",
    avatar: "",
  },
];

// --- Filters ---
const notificationsOptions: DropdownOption<string>[] = [
  { label: "All Notifications", value: "" },
  { label: "Read", value: "read" },
  { label: "Unread", value: "unread" },
];

const badgeClass = (read: boolean) =>
  `chip min-w-22 inline-block rounded-full px-2.5 py-1 text-xs text-center border ${
    read
      ? "border-brand-4/30 bg-brand-4/10 text-brand-4"
      : "border-gold/30 bg-gold/10 text-gold"
  }`;

const dotClass = (read: boolean) =>
  `inline-block h-2.5 w-2.5 rounded-full mr-2 ${read ? "bg-brand-4/70" : "bg-gold"}`;

const NotificationsView = () => {
  const [filter, setFilter] = useState<DropdownOption<string>>({
    label: "All Notifications",
    value: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [active, setActive] = useState<Notification | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const rows = useMemo(() => {
    const type = filter.value;
    let base = [...notificationsData];

    if (type === "read") base = base.filter((n) => n.read);
    if (type === "unread") base = base.filter((n) => !n.read);

    // sort newest first
    base.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return base;
  }, [filter.value]);

  const openDetails = (n: Notification) => {
    setActive(n);
    setIsDialogOpen(true);
  };

  const markOneAsRead = (n: Notification) => {
    alert(`Marking ${n._id} as read`);
    setActive({ ...n, read: true });
  };

  const formatDate = (iso: string) =>
    dateUtils?.formatDate ? dateUtils.formatDate(iso) : new Date(iso).toLocaleString();

  return (
    <section className="space-y-6">
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
            value={filter}
            options={notificationsOptions}
            onChange={(v) => setFilter(v)}
            buttonClassName="md:w-50 w-44"
          />
        </div>
      </div>

      {/* LIST */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        {isLoading ? (
          <div className="p-4">Loading...</div>
        ) : rows.length > 0 ? (
          <ul role="list" className="flex flex-col gap-2">
            {rows.map((row) => (
              <li
                key={row._id}
                className={`p-4 md:p-5 hover:bg-white/5 transition-colors ${row.read ? "" : "bg-white/5"}`}
              >
                <div className="flex items-start gap-3">
                  {row?.avatar ? (
                    <Image
                      src={row.avatar as string}
                      alt={row.title}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full grid place-items-center bg-white/10">
                      <Bell className="h-4 w-4" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-medium flex items-center">
                          <span className={dotClass(row.read)} aria-hidden />
                          <span className="truncate text-[15px]">{row.title}</span>
                        </div>
                        {row.description && (
                          <p className="text-white/60 text-xs mt-0.5 line-clamp-2 max-w-prose">
                            {row.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => openDetails(row as Notification)}
                        className="px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 text-xs"
                        aria-haspopup="dialog"
                        aria-expanded={isDialogOpen}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
      <DialogProvider
        state={isDialogOpen}
        setState={setIsDialogOpen}
        className="w-full max-w-lg"
      >
        {active && (
          <div
            role="dialog"
            aria-modal="true"
            className="rounded-2xl border border-white/10 bg-white/10 p-5 md:p-6 shadow-2xl backdrop-saturate-150"
          >
            {/* Header */}
            <div className="flex items-start gap-3">
              {active.avatar ? (
                <Image
                  src={active.avatar as string}
                  alt={active.title}
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
                    {active.title}
                  </h2>
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="p-1 rounded-lg border border-white/10 hover:bg-white/10"
                    aria-label="Close dialog"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span>{formatDate(active.createdAt)}</span>
                  <span>•</span>
                  <span className={badgeClass(active.read)}>
                    {active.read ? "Read" : "Unread"}
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            {active.description && (
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {active.description}
              </p>
            )}

            {/* Meta (optional) */}
            <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-white/60">
              <div className="flex items-center justify-between">
                <span>Type</span>
                <span className="text-white/80 capitalize">
                  {active.notificationType || "general"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Updated</span>
                <span className="text-white/80">{formatDate(active.updatedAt)}</span>
              </div>
            </div>

            {/* Footer actions */}
            <div className="mt-6 flex items-center justify-end gap-2">
              {!active.read && (
                <button
                  onClick={() => markOneAsRead(active)}
                  className="px-3 py-2 rounded-lg border border-brand-4/30 bg-brand-4/10 hover:bg-brand-4/20 text-xs"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </DialogProvider>
    </section>
  );
};

export default NotificationsView;
