"use client";
import Loader from "@/components/ui/Loader";
import { useAppSelector } from "@/hooks/redux";
import { TUserRole } from "@/interface";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
  role: TUserRole | "*";
}

const ProtectedRoute = ({ children, role }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login");
      }

      if (user && user.role !== role && role !== "*") {
        router.replace("/");
      }
    }
  }, [isLoading, user, router, role]);

  if (isLoading) {
    return <Loader className="h-[100dvh]" />;
  }

  if (!user || (user.role !== role && role !== "*")) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
