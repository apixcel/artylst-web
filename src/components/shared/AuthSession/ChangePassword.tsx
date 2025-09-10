"use client";

import { IQueryMutationErrorResponse } from "@/interface";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { logout } from "@/redux/features/auth/user.slice";
import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = () => {
  const [changePass, { isLoading }] = useChangePasswordMutation();

  const dispatch = useDispatch();
  const route = useRouter();

  const handleSubmit = async (
    values: typeof initialValues,
    helpers: FormikHelpers<typeof initialValues>
  ) => {
    if (isLoading) return;

    const res = await changePass({
      oldPassword: values.oldPassword,
      password: values.newPassword,
    });

    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error.data?.message || "Something went wrong");
      return;
    }

    toast.success("Password changed successfully");
    helpers.resetForm();
    dispatch(logout(undefined));
    route.push("/login");
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-start gap-4 w-full"
    >
      <div className="flex flex-col gap-2 w-full">
        <h3>Password</h3>
        <div className="flex flex-col gap-3">
          {/* Old password */}
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full bg-white/10 rounded-lg px-3 py-2"
          />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <p className="text-sm text-red-500">{formik.errors.oldPassword}</p>
          )}

          {/* New password */}
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full bg-white/10 rounded-lg px-3 py-2"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-sm text-red-500">{formik.errors.newPassword}</p>
          )}

          {/* Confirm password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full bg-white/10 rounded-lg px-3 py-2"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-fit cursor-pointer">
        Change Password
      </button>
    </form>
  );
};

export default ChangePassword;
