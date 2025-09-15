"use client";

import { Input } from "@/components";
import { fanAvatarFallback } from "@/constants/fallBack";
import { useAppSelector } from "@/hooks";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

// formik + yup
import { IQueryMutationErrorResponse } from "@/interface";
import { IFan } from "@/interface/fan.interface";
import { useUpdateFanProfileMutation } from "@/redux/features/fan/fan.api";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { FormikHelpers, useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(2, "Too short")
    .max(80, "Too long")
    .required("Required"),
  // username stays read-only, so no validation needed here
});

const FanProfileManagementView = () => {
  const { user } = useAppSelector((state) => state.user);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadFile, { isLoading: isUploading }] = useUploadSingleFileMutation();
  const [updateProfile, { isLoading }] = useUpdateFanProfileMutation();

  const initialValues = useMemo(
    () => ({
      fullName: user?.fullName || "",
    }),
    [user?.fullName]
  );
  const handleUpdateProfile = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    if (isLoading || isUploading) return;
    console.log(values);

    const payload: Partial<IFan> = {
      ...values,
    };

    if (profilePhotoFile) {
      const formData = new FormData();
      formData.append("file", profilePhotoFile);
      const res = await uploadFile(formData);
      if (res?.data?.data) {
        payload.avatar = res.data.data;
      }
    }

    const res = await updateProfile(payload);
    const err = res.error as IQueryMutationErrorResponse;

    if (err) {
      toast.error(err.data.message || "Something went wrong");
      setSubmitting(false);
      return;
    }
    toast.success("Profile updated successfully");
    setProfilePhotoFile(null);
    resetForm({ values: { ...values } });
    setSubmitting(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: handleUpdateProfile,
  });

  // Enable Save if either form is dirty OR a new photo is selected
  const nothingChanged = !formik.dirty && !profilePhotoFile;
  const saveDisabled = nothingChanged || !formik.isValid || formik.isSubmitting;

  return (
    <div>
      <h3>Account Information</h3>

      <form onSubmit={formik.handleSubmit}>
        <div
          className="w-[100px] h-[100px] rounded-full overflow-hidden mt-3 relative group/upload cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <Image
            src={
              profilePhotoFile
                ? URL.createObjectURL(profilePhotoFile)
                : user?.avatar || fanAvatarFallback
            }
            alt="user"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />

          <span className="absolute right-0 bottom-0 flex h-full w-full scale-0 items-center justify-center rounded-full !bg-black/40 duration-[0.1s] group-hover/upload:scale-[1]">
            <Upload />
          </span>
        </div>

        {profilePhotoFile ? (
          <button
            type="button"
            className="btn btn-ghost mt-3"
            onClick={() => setProfilePhotoFile(null)}
          >
            Cancel Photo
          </button>
        ) : null}

        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName">Full Name</label>
            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              {...formik.getFieldProps("fullName")}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <p className="text-red-400 text-sm">{formik.errors.fullName}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="userName">Username</label>
            <Input id="userName" type="text" disabled value={`@${user?.userName}`} />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={saveDisabled}
        >
          {formik.isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <input
        ref={inputRef}
        type="file"
        onChange={(e) => setProfilePhotoFile(e.target.files?.[0] || null)}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default FanProfileManagementView;
