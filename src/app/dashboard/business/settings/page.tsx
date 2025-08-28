import { LoginAndSecurity, PaymentMethods, ProfileSettings } from "@/components";

const page = () => {
  return (
    <section className="p-6 space-y-6">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-heading mb-4">Settings</h1>
        {/* profile settings */}
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <ProfileSettings />
          <PaymentMethods />
          <LoginAndSecurity />
        </div>
      </div>
    </section>
  );
};

export default page;
