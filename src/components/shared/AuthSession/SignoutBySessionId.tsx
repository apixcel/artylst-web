"use client";

import DialogProvider from "@/components/ui/DialogProvider";
import { ISession } from "@/interface/session.interface";
import { useRevokeSessionBySessionIdMutation } from "@/redux/features/auth/auth.api";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

type Props = { session: ISession };

const SignoutBySessionId = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [revokeSession, { isLoading }] = useRevokeSessionBySessionIdMutation();

  const handleConfirm = async () => {
    const res = await revokeSession(session._id);
    const err = res?.error;

    if (err) {
      toast.error("Something went wrong");
      return;
    }
    setIsOpen(false);
  };

  const isThisDevice = Boolean(session.isThisDevice);

  return (
    <>
      <button
        className={`btn cursor-pointer ${isThisDevice ? "btn-disabled opacity-60" : ""}`}
        onClick={() => !isThisDevice && setIsOpen(true)}
        disabled={isThisDevice}
        title={
          isThisDevice
            ? "You can't revoke the current device here"
            : "Sign out this device"
        }
      >
        {isThisDevice ? "This device" : "Sign out"}
      </button>

      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="max-w-[450px] w-full"
      >
        <div className="p-4 space-y-4 bg-white/10 backdrop-blur-2xl rounded-[8px] w-full">
          <h3 className="text-lg font-semibold">Sign out this device?</h3>

          <div className="rounded-md border border-red-600 bg-red-500/10 p-3 text-sm">
            <p className="font-bold text-red-500">
              {session.userAgent || "Unknown device"}
            </p>
            <p className="text-muted">IP: {session.ip || "N/A"}</p>
            <p className="text-muted">
              Last seen:{" "}
              {session.lastSeenAt
                ? formatDistanceToNow(new Date(session.lastSeenAt), { addSuffix: true })
                : "N/A"}
            </p>
            <div className="text-muted">
              Expires:{" "}
              {session.expiresAt
                ? formatDistanceToNow(new Date(session.expiresAt), { addSuffix: true })
                : "N/A"}
            </div>
          </div>

          <p className="text-sm text-muted">
            This will end the session on that specific device/browser. You’ll remain
            signed in on other devices.
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="btn btn-sm btn-danger cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Signing out..." : "Confirm"}
            </button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default SignoutBySessionId;
