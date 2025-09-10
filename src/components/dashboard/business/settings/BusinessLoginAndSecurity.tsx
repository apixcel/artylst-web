import ChangePassword from "@/components/shared/AuthSession/ChangePassword";
import DeviceAuthSession from "@/components/shared/AuthSession/DeviceAuthSession";

const BusinessLoginAndSecurity = () => {
  return (
    <div>
      <h2 className="mb-4 text-2xl">Login & Security</h2>
      {/* password */}
      <div className="flex flex-col gap-8 pb-4 mb-4">
        {/* password */}
        <ChangePassword />

        {/* security */}
        <DeviceAuthSession />

        {/* delete account */}
        <div className="flex sm:justify-between items-start sm:gap-10 gap-4 flex-col sm:flex-row">
          <div className="flex flex-col gap-2 flex-1">
            <h3>Delete your account</h3>
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
