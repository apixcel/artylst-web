const BusinessLoginAndSecurity = () => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bricolage-grotesque">Login & Security</h2>
      {/* password */}
      <div className="flex flex-col gap-8 pb-4 mb-4">
        {/* password */}
        <div className="flex sm:justify-between items-start sm:gap-10 gap-4 flex-col sm:flex-row">
          <div className="flex flex-col gap-2 sm:flex-1 sm:w-auto w-full">
            <h3 className="font-bricolage-grotesque">Password</h3>
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
          </div>

          <button className="btn btn-primary w-full sm:w-auto">Change Password</button>
        </div>

        {/* security */}
        <div className="flex justify-between items-start sm:gap-10 gap-4 flex-col sm:flex-row">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bricolage-grotesque">Security</h3>
            <div className="flex flex-col gap-2">
              <h3 className="font-bricolage-grotesque">Sign out from all devices</h3>
              <p className="text-sm text-muted">
                Logged in ona a shared device but forgot to sign out? End all sessions by
                signing out from all devices
              </p>
            </div>
          </div>

          <button className="btn btn-primary">Sign out from all devices</button>
        </div>

        {/* delete account */}
        <div className="flex sm:justify-between items-start sm:gap-10 gap-4 flex-col sm:flex-row">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bricolage-grotesque">Delete your account</h3>
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

export default BusinessLoginAndSecurity;
