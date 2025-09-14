const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col gap-6 px-4 sm:px-6 py-8">{children}</div>
    </div>
  );
};

export default AuthLayout;
