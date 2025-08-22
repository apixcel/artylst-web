import { MainFooter, MainHeader } from "@/components";

const NotFound = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <MainHeader />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
      <MainFooter />
    </main>
  );
};

export default NotFound;
