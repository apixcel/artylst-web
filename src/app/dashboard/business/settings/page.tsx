import { LoginAndSecurity, PaymentMethods, ProfileSettings } from "@/components";

const SettingsPage = () => {
  return (
    <section className="space-y-6">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="dashboard-title mb-4">Settings</h1>
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-2xl">
          <ProfileSettings />
          <PaymentMethods />
          <LoginAndSecurity />
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
