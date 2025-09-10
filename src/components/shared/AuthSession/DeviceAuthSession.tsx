"use client";

import { useGetLoggedInSessionsQuery } from "@/redux/features/auth/auth.api";
import SessionRow from "./SessionRow";
import SignOutFromAllDevice from "./SignOutFromAllDevice";

const DeviceAuthSession = () => {
  const { data } = useGetLoggedInSessionsQuery(undefined);
  const sessions = data?.data || [];

  return (
    <div className="space-y-8">
      {/* Top section */}
      <div className="flex justify-between items-center sm:gap-10 gap-4 flex-col sm:flex-row">
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-lg font-semibold">Security</h3>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Sign out from all devices</h3>
            <p className="text-sm text-muted">
              Logged in on a shared device but forgot to sign out? End all sessions by
              signing out from all devices.
            </p>
          </div>
        </div>

        <SignOutFromAllDevice />
      </div>

      {/* Sessions list */}
      <div className="space-y-4">
        <h4 className="font-medium">Active Sessions</h4>
        <div className="border border-white/10 rounded-lg divide-y divide-white/10">
          {sessions.length === 0 ? (
            <p className="text-sm text-muted p-4">No active sessions found.</p>
          ) : (
            sessions.map((session) => <SessionRow session={session} key={session._id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceAuthSession;
