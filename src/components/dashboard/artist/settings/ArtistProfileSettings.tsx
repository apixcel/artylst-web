"use client";
import { businessAvatarFallback } from "@/constants/fallBack";
import { IArtist } from "@/interface/artist/artist.interface";
import {
  useGetMyArtistProfileQuery,
  useUpdateMyArtistProfileMutation,
} from "@/redux/features/artist/artist.api";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import { FormikHelpers, useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { IQueryMutationErrorResponse, IUpdateArtistProfile } from "@/interface";
import ArtistProfileSettingsSkeleton from "./ArtistProfileSettingsSkeleton";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateUser } from "@/redux/features/auth/user.slice";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(2, "Too short")
    .max(80, "Too long")
    .required("Required"),
});

const ArtistProfileSettings = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data, isLoading, refetch } = useGetMyArtistProfileQuery(undefined);
  const profile = data?.data as IArtist | undefined;
  const { user } = useAppSelector((state) => state.user);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

  const [uploadFile, { isLoading: isUploading }] = useUploadSingleFileMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyArtistProfileMutation();

  const dispatch = useAppDispatch();

  const initialValues = useMemo(
    () => ({
      fullName: profile?.fullName || "",
    }),
    [profile?.fullName]
  );

  const handleUpdateProfile = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    if (isUpdating || isUploading) return;

    const payload: Partial<IArtist> = {};

    // only include changed text fields
    if (values.fullName !== profile?.fullName) payload.fullName = values.fullName.trim();

    // avatar change allowed even if not in edit mode
    if (profilePhotoFile) {
      const formData = new FormData();
      formData.append("file", profilePhotoFile);
      const res = await uploadFile(formData);
      if (res?.data?.data) {
        payload.avatar = res.data.data;
      }
    }

    // nothing changed?
    if (!("fullName" in payload) && !("avatar" in payload)) {
      toast.error("Nothing changed");
      setIsEditMode(false);
      setSubmitting(false);
      return;
    }

    const res = await updateProfile(payload as IUpdateArtistProfile);
    const err = res.error as IQueryMutationErrorResponse;

    if (err) {
      toast.error(err.data.message || "Something went wrong");
      setSubmitting(false);
      return;
    }
    toast.success("Profile updated successfully");
    await refetch();
    dispatch(
      updateUser({
        ...user,
        fullName: values.fullName,
        avatar: payload.avatar || user?.avatar || "",
      })
    );
    setIsEditMode(false);
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

  // Enable save if either form is dirty OR a new photo is selected
  const nothingChanged = !formik.dirty && !profilePhotoFile;

  const saveDisabled =
    nothingChanged || !formik.isValid || formik.isSubmitting || isUploading || isUpdating;

  if (isLoading) return <ArtistProfileSettingsSkeleton />;

  return (
    <div>
      {/* profile photo */}
      <div className="border-b border-white/10 pb-4 mb-4">
        <h3>Profile Photo</h3>

        <div className="flex items-center justify-between gap-4 mt-4 flex-col sm:flex-row">
          {/* avatar */}
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/10 overflow-hidden group/avatar relative">
            <Image
              src={
                profilePhotoFile
                  ? URL.createObjectURL(profilePhotoFile)
                  : profile?.avatar || businessAvatarFallback
              }
              alt="avatar"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-0 h-0 overflow-hidden absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black/50 flex items-center justify-center group-hover/avatar:w-full group-hover/avatar:h-full duration-[0.1s] cursor-pointer rounded-full"
              aria-label="Change Photo"
            >
              <UploadIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              setProfilePhotoFile(e.target.files?.[0] || null);
            }}
          />

          {/* remove and change photo */}
          <div className="flex gap-2 items-center">
            {profilePhotoFile ? (
              <button
                type="button"
                className="btn hover:text-muted"
                onClick={() => {
                  setProfilePhotoFile(null);
                }}
              >
                Remove Photo
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn-sm btn-ghost cursor-pointer lg:hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              Change Photo
            </button>
          </div>
        </div>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 border-b border-white/10 pb-4 mb-4"
      >
        {/* name */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h3>Name</h3>
            <div className="flex items-center gap-4 justify-between">
              <input
                className="w-full bg-white/10 rounded-lg px-3 py-2"
                placeholder="Full name"
                id="fullName"
                readOnly={!isEditMode}
                {...formik.getFieldProps("fullName")}
              />
              {!isEditMode ? (
                <button
                  type="button"
                  className="btn btn-primary cursor-pointer"
                  onClick={() => {
                    setIsEditMode(true);
                    setTimeout(() => document.getElementById("fullName")?.focus(), 0);
                  }}
                >
                  Edit
                </button>
              ) : null}
            </div>
            {formik.touched.fullName && formik.errors.fullName ? (
              <p className="text-red-400 text-sm">{formik.errors.fullName}</p>
            ) : null}
          </div>
        </div>

        {/* email (read-only) */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h3>Email</h3>
            <div className="flex items-center gap-4 justify-between w-full">
              <input
                className="w-full bg-white/10 rounded-lg px-3 py-2 disabled:opacity-60"
                placeholder="Email"
                value={user?.email || ""}
                readOnly
                disabled
              />
            </div>
          </div>
        </div>

        {/* show action row if user is editing OR they picked a photo */}
        {isEditMode || profilePhotoFile ? (
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setIsEditMode(false);
                formik.resetForm();
                setProfilePhotoFile(null);
              }}
            >
              Cancel Changes
            </button>
            <button
              type="submit"
              className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={saveDisabled}
            >
              {isUploading || isUpdating || formik.isSubmitting
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default ArtistProfileSettings;
