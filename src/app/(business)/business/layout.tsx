import { BusinessHeader, BusinessFooter } from "@/components";

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <BusinessHeader />
      <main className="flex-1">
        <div className="wrapper my-[32px]">{children}</div>
      </main>
      <BusinessFooter />
    </div>
  );
};

export default BusinessLayout;
