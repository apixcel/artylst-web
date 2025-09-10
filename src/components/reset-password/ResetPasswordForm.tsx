"use client";

import { Input } from "@/components";
import { IQueryMutationErrorResponse } from "@/interface";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain a number")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[@$!%*?&^#_\-]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPasswordForm = ({ slug }: { slug: string }) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (values: typeof initialValues) => {
    if (isLoading) return;
    const res = await resetPassword({ password: values.password, token: slug || "" });
    console.log(res);

    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error.data.message || "Something went wrong");
      return;
    }

    toast.success("Password reset successfully");
    router.push("/login");
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors, values, handleChange, handleBlur }) => (
          <Form className="space-y-4">
            {/* password */}
            <div>
              <label className="text-[14px] mb-[4px] block">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!(touched.password && errors.password)}
                className={`bg-brand-2/10 border ${touched.password && errors.password ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
              />
              {touched.password && errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* confirm password */}
            <div>
              <label className="text-[14px] mb-[4px] block">Confirm Password</label>
              <Input
                name="confirmPassword"
                type="password"
                className={`bg-brand-2/10 border ${touched.confirmPassword && errors.confirmPassword ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-4/80 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-4/60 transition-all duration-300"
            >
              {isSubmitting || isLoading ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
