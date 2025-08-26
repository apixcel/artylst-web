import { BusinessHeader, BusinessFooter } from "@/components";

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen -top-[170px] relative pt-[85px]">
      <BusinessHeader />
      <main className="flex-1 relative brand-surface">
        {/* grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-[.18] pointer-events-none" />
        <div className="pt-[85px] relative z-10">{children}</div>
      </main>

      <BusinessFooter />
    </div>
  );
};

export default BusinessLayout;
