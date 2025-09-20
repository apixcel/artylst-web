"use client";
import { Input } from "@/components";
import { useAppDispatch } from "@/hooks";
import { IQueryMutationErrorResponse } from "@/interface/queryMutationErrorResponse";
import {
  useLoginMutation,
  useRevokeAllSessionsByAccountPasswordMutation,
} from "@/redux/features/auth/auth.api";
import { updateAuthState } from "@/redux/features/auth/user.slice";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useState } from "react";
import DialogProvider from "@/components/ui/DialogProvider";
import { Loader2 } from "lucide-react";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [sessionMaxReached, setSessionMaxReached] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [revokeAllSessionsByAccountPassword, { isLoading: isRevokingAllSessions }] =
    useRevokeAllSessionsByAccountPasswordMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // avoid open-redirects: only allow same-origin relative paths
  const safeRedirect = (url: string | undefined | null) => {
    if (!url) return null;
    try {
      if (url.startsWith("/") && !url.startsWith("//")) return url;
      return null;
    } catch {
      return null;
    }
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (isLoading) return;

        const response = await login(values as FormValues);
        const error = response.error as IQueryMutationErrorResponse;

        if (error) {
          if (error.data?.message === "SESSION_MAX_OUT") {
            setSessionMaxReached(true);
            return;
          }
          if (error.data?.message)
            toast.error(error.data.message || "Something went wrong");
          return;
        }

        const result = response.data?.data;
        const user = result?.profile;
        const token = result?.accessToken;

        if (user && token) {
          dispatch(updateAuthState({ user, token, isLoading: false }));
          toast.success("Login successful");

          const cookieRedirect = Cookies.get("redirect_after_login");
          const redirectUrl = safeRedirect(cookieRedirect);

          if (redirectUrl) {
            Cookies.remove("redirect_after_login");
            router.push(redirectUrl);
            return;
          }

          router.push(user.role === "fan" ? "/profile" : "/dashboard");
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const handleLogOutFromAllDevices = async () => {
          if (isLoading || isRevokingAllSessions) return;
          const res = await revokeAllSessionsByAccountPassword({
            email: values.email,
            password: values.password,
          });

          const err = res.error as IQueryMutationErrorResponse;
          if (err?.data?.message) {
            toast.error(err.data.message);
            return;
          }

          toast.success("Logged out from all devices", {
            description: "Please login again!",
          });
          setSessionMaxReached(false);
        };

        const handleCancel = () => setSessionMaxReached(false);

        return (
          <div>
            {/* Session limit modal (overlay) */}
            {sessionMaxReached && (
              <DialogProvider state={sessionMaxReached} setState={setSessionMaxReached}>
                <div className="rounded-2xl bg-gradient-to-b from-brand-2/10 to-brand-1/10 border border-white/10 p-4 sm:p-6 max-w-md w-full backdrop-blur-2xl">
                  <h1 className="text-2xl text-center">Session limit reached</h1>
                  <p className="text-sm text-muted text-center">
                    You have reached the maximum number of sessions.
                  </p>
                  <div className="mt-3 flex justify-center gap-4">
                    <button
                      onClick={handleCancel}
                      className="btn btn-sm btn-ghost"
                      disabled={isRevokingAllSessions}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogOutFromAllDevices}
                      className="btn btn-sm btn-danger"
                      disabled={isRevokingAllSessions}
                    >
                      {isRevokingAllSessions ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Logging out...
                        </span>
                      ) : (
                        "Log out from all devices"
                      )}
                    </button>
                  </div>
                </div>
              </DialogProvider>
            )}

            <div className="rounded-2xl bg-gradient-to-b from-brand-2/10 to-brand-1/10 border border-white/10 p-4 sm:p-6 max-w-md w-full">
              <h1 className="text-2xl text-center">Log in</h1>
              <p className="text-sm text-muted text-center">
                Use your account email and password
              </p>

              <Form className="mt-5 space-y-4">
                {/* Email */}
                <label className="block">
                  <span className="text-sm text-muted">Email</span>
                  <div className="relative mt-1">
                    <input
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                      className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-1 focus:ring-light rounded-xl pl-10 pr-4 py-2.5 placeholder-white/40"
                      type="text"
                      inputMode="email"
                      autoComplete="username"
                      placeholder="Enter your email or username"
                    />
                    {/* mail icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-3 top-2.5 h-5 w-5 text-white/50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5v10.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V6.75Zm0 0L12 12l8.25-5.25"
                      />
                    </svg>
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </label>

                {/* Password */}
                <label className="block">
                  <span className="text-sm text-white/70">Password</span>
                  <div className="relative mt-1">
                    <Input
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      type="password"
                      className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-1 focus:ring-light rounded-xl pl-10 pr-12 py-2.5 placeholder-white/40"
                      autoComplete="current-password"
                      placeholder="••••••••"
                    />
                    {/* lock icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-3 top-2.5 h-5 w-5 text-white/50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 10V8a5 5 0 1 1 10 0v2m-9 0h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
                      />
                    </svg>
                  </div>
                  {touched.password && errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </label>

                <div className="flex items-center justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-muted hover:text-white underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit button */}
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-4/80 hover:bg-brand-4/70 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </Form>

              <p className="flex items-center justify-center gap-1 my-3 text-muted">
                Don&apos;t have an account?
                <Link
                  className="text-sm text-light hover:text-white/70 underline underline-offset-4"
                  href="/choose-role"
                >
                  Create an account
                </Link>
              </p>

              {/* tiny policy line */}
              <p className="text-[11px] text-muted text-center">
                ARTYLST protects your privacy. We never share personal contact info.
              </p>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
