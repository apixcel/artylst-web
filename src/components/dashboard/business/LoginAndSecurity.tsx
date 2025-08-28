"use client";

import { useState } from "react";

const LoginAndSecurity = () => {
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  return (
    <div>
      <h2 className="mb-4">Login & Security</h2>
      {/* name and company name */}
      <div className="flex flex-col gap-8 pb-4 mb-4">
        {/* name */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bricolage-grotesque">Password</h3>
            {isPasswordEditing ? (
              <div className="flex flex-col gap-3">
                <input
                  className="w-full bg-white/10 rounded-lg px-3 py-2"
                  placeholder="Old Password"
                />
                <input
                  className="w-full bg-white/10 rounded-lg px-3 py-2"
                  placeholder="New Password"
                />
                <input
                  className="w-full bg-white/10 rounded-lg px-3 py-2"
                  placeholder="Confirm New Password"
                />
              </div>
            ) : (
              <p className="text-sm text-muted">Password</p>
            )}
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setIsPasswordEditing(!isPasswordEditing)}
          >
            {isPasswordEditing ? "Save" : "Change Password"}
          </button>
        </div>

        {/* security */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bricolage-grotesque">Security</h3>
            <div>
              <h4>Sign out from all devices</h4>
              <p className="text-sm text-muted">
                Logged in ona a shared device but forgot to sign out? End all sessions by
                signing out from all devices
              </p>
            </div>
          </div>

          <button className="btn btn-primary">Sign out from all devices</button>
        </div>

        {/* delete account */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h4>Delete your account</h4>
            <p className="text-sm text-muted">
              By deleting your account, you&apos;ll no longer be able to access your
              account or any of your data.
            </p>
          </div>

          <button className="btn border border-red-500 text-red-500">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSecurity;
