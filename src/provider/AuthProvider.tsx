import Loader from "@/components/ui/Loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetAuthorQuery } from "@/redux/features/auth/auth.api";
import { logout, updateAuthState } from "@/redux/features/auth/user.slice";
import { useLayoutEffect, useRef } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.user);
  const isMounted = useRef(false);
  const { data, isSuccess, isError, isFetching } = useGetAuthorQuery(undefined, {
    skip: !token,
  });

  useLayoutEffect(() => {
    dispatch(updateAuthState({ isLoading: isFetching }));

    if (isSuccess) {
      isMounted.current = true;
      dispatch(updateAuthState({ user: data.data, isLoading: false }));
    }

    if (isError) {
      dispatch(logout(undefined));
    }
  }, [isSuccess, isError, isFetching, dispatch, data]);

  if (isFetching && !isMounted.current) {
    return <Loader className="h-[100dvh]" />;
  }

  return <>{children}</>;
};

export default AuthProvider;
