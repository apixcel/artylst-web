import LoginAndSecurity from "@/components/dashboard/artist/LoginAndSecurity";
import ProfileSettings from "@/components/dashboard/artist/ProfileSettings";

const page = () => {
  return (
    <section className="space-y-6">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-heading mb-4">Settings</h1>
        <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-5/10 backdrop-blur-xl">
          <ProfileSettings />
          <LoginAndSecurity />
        </div>
      </div>
    </section>
  );
};

export default page;
