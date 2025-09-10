"use client";
import DialogProvider from "@/components/ui/DialogProvider";
import { useAppDispatch } from "@/hooks";
import { IQueryMutationErrorResponse } from "@/interface";
import { useRevokeAllSessionMutation } from "@/redux/features/auth/auth.api";
import { logout } from "@/redux/features/auth/user.slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SignOutFromAllDevice = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [revokeAllSession, { isLoading }] = useRevokeAllSessionMutation();
  const dispatch = useAppDispatch();
  const route = useRouter();

  const handleSignOut = async () => {
    if (isLoading) return;
    const res = await revokeAllSession(undefined);
    const err = res?.error as IQueryMutationErrorResponse;

    if (err) {
      toast.error("Something went wrong");
      return;
    }

    dispatch(logout(undefined));
    route.push("/");
  };

  return (
    <>
      {/* Trigger button */}
      <button onClick={() => setIsOpen(true)} className="btn btn-danger cursor-pointer">
        Sign out from all devices
      </button>

      {/* Dialog */}
      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="max-w-[450px] w-full"
      >
        <div className="p-4 space-y-4 bg-white/10 backdrop-blur-2xl rounded-[8px] w-full">
          <h3 className="text-lg font-semibold">Sign out from all devices</h3>
          <p className="text-sm text-muted">
            Are you sure you want to end all sessions? You’ll be signed out on every
            device, including phones, tablets, browsers and your curent device.
          </p>

          <div className="flex justify-end gap-2">
            <button onClick={() => setIsOpen(false)} className="btn cursor-pointer">
              Cancel
            </button>
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="btn btn-sm btn-danger cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default SignOutFromAllDevice;
