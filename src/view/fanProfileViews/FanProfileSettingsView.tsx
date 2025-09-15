import ChangePassword from "@/components/shared/AuthSession/ChangePassword";
import DeviceAuthSession from "@/components/shared/AuthSession/DeviceAuthSession";
import FanProfileManagementView from "./FanProfileManagementView";

const FanProfileSettingsView = () => {
  return (
    <div className="p-4 flex flex-col gap-5">
      <h4 className="text-lg font-semibold">Settings</h4>

      <FanProfileManagementView />
      <ChangePassword />
      <span className="border-b border-white/10" />
      <DeviceAuthSession />
    </div>
  );
};

export default FanProfileSettingsView;
