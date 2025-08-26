import { BusinessHeader, BusinessFooter } from "@/components";

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <BusinessHeader />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-brand-2/30 via-base-900 to-brand-5/30">{children}</div>
      </main>
      <BusinessFooter />
    </div>
  );
};

export default BusinessLayout;
