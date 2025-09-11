"use client";

import { Input } from "@/components";
import { IQueryMutationErrorResponse } from "@/interface";
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";
import { cn } from "@/utils";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
});

const ForgotPasswordPage = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [mailSent, setMailSent] = useState(false);

  const handleSubmit = async (
    values: { email: string },
    { resetForm }: FormikHelpers<{ email: string }>
  ) => {
    if (isLoading) return;

    const response = await forgotPassword(values);

    const error = response.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error(error.data.message || "Something went wrong");
      return;
    }

    toast.success("Password reset link sent to your email");
    setMailSent(true);
    resetForm();
  };

  return (
    <div className="flex-center text-white">
      <div
        className={cn(
          "rounded-2xl bg-white/5 border border-white/10 p-6 shadow-lg max-w-md w-full",
          mailSent && "bg-brand-4/10 border-brand-4/30"
        )}
      >
        {mailSent ? (
          <>
            <h1 className="text-2xl text-center">Password Reset Link Sent!</h1>
            <p className="text-sm text-muted text-center mt-1">
              A password reset link has been sent to your email.
            </p>
            <div className="flex items-center justify-center gap-2 mt-5">
              <p>Didn&apos;t receive the email?</p>
              <button
                onClick={() => setMailSent(false)}
                className="text-brand-4 cursor-pointer"
              >
                Try again
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl text-center">Forgot Password</h1>
            <p className="text-sm text-muted text-center mt-1">
              Enter your registered email to reset your password.
            </p>

            <Formik<{ email: string }>
              validationSchema={validationSchema}
              initialValues={{ email: "" }}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, isSubmitting, errors, touched }) => (
                <Form className="mt-5 space-y-4">
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-4/80 hover:bg-brand-4/70 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
