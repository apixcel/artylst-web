import { MainHeader, MainFooter } from "@/components";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1">{children}</main>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
