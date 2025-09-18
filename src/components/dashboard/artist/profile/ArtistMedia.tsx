"use client";
import { businessAvatarFallback } from "@/constants/fallBack";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { IArtist, IQueryMutationErrorResponse, IUpdateArtistProfile } from "@/interface";
import {
  useGetMyArtistProfileQuery,
  useUpdateMyArtistProfileMutation,
} from "@/redux/features/artist/artist.api";
import { updateUser } from "@/redux/features/auth/user.slice";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { Upload, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import ArtistMediaSkeleton from "./ArtistMediaSkeleton";

const MAX_MB = 5;

const ArtistMedia = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [avatarBusy, setAvatarBusy] = useState(false);
  const [coverBusy, setCoverBusy] = useState(false);
  const [saving, setSaving] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, refetch } = useGetMyArtistProfileQuery(undefined);
  const profile = data?.data as IArtist | undefined;

  const [uploadFile] = useUploadSingleFileMutation();
  const [updateProfile] = useUpdateMyArtistProfileMutation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const avatarPreview = useMemo(
    () =>
      avatarFile
        ? URL.createObjectURL(avatarFile)
        : profile?.avatar || businessAvatarFallback,
    [avatarFile, profile?.avatar]
  );

  const coverPreview = useMemo(
    () => (coverFile ? URL.createObjectURL(coverFile) : profile?.coverPhoto || ""),
    [coverFile, profile?.coverPhoto]
  );

  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
      if (coverPreview?.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
    };
  }, [avatarPreview, coverPreview]);

  const validateImage = (file: File | null) => {
    if (!file) return false;
    const isImage = file.type.startsWith("image/");
    const isSmall = file.size / (1024 * 1024) <= MAX_MB;
    if (!isImage) {
      toast.error("Please select an image file.");
      return false;
    }
    if (!isSmall) {
      toast.error(`Image must be less than ${MAX_MB}MB.`);
      return false;
    }
    return true;
  };

  const uploadAndGetUrl = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadFile(formData);
    return res?.data?.data as string | undefined;
  };

  const saveChanges = async () => {
    if (!avatarFile && !coverFile) {
      toast.message("Nothing to upload", {
        description: "Choose a new avatar or cover first.",
      });
      return;
    }

    try {
      setSaving(true);
      setAvatarBusy(!!avatarFile);
      setCoverBusy(!!coverFile);

      let avatarUrl: string | undefined;
      let coverUrl: string | undefined;

      if (avatarFile) avatarUrl = await uploadAndGetUrl(avatarFile);
      if (coverFile) coverUrl = await uploadAndGetUrl(coverFile);

      const payload: Partial<IArtist> = {};
      if (avatarUrl) payload.avatar = avatarUrl;
      if (coverUrl) payload.coverPhoto = coverUrl;

      if (Object.keys(payload).length) {
        await updateProfile(payload as IUpdateArtistProfile);
        await refetch();
        dispatch(
          updateUser({
            ...user,
            avatar: payload.avatar || user?.avatar || "",
          })
        );
      }

      setAvatarFile(null);
      setCoverFile(null);
      toast.success("Changes saved!");
    } catch (e) {
      const msg =
        (e as IQueryMutationErrorResponse)?.data?.message ||
        "Failed to save changes. Please try again.";
      toast.error(msg);
    } finally {
      setSaving(false);
      setAvatarBusy(false);
      setCoverBusy(false);
    }
  };

  if (isLoading) return <ArtistMediaSkeleton />;

  const anythingSelected = !!avatarFile || !!coverFile;
  const isBusy = saving || avatarBusy || coverBusy;

  return (
    <div className="border-b border-white/10 pb-4 space-y-4">
      {/* heading */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/70">Profile media</div>
        <div className="text-xs text-white/50">Max size {MAX_MB}MB • JPG, PNG, GIF</div>
      </div>

      {/* content grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* avatar card */}
        <div className="md:col-span-2">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4 h-full">
            <label className="text-sm text-muted">Avatar</label>
            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-white/10 border border-white/10 overflow-hidden group/avatar relative">
                <Image
                  src={avatarPreview}
                  alt="avatar"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />

                {/* lock overlay while avatar busy or global busy */}
                {(avatarBusy || isBusy) && (
                  <div className="absolute inset-0 bg-black/40 grid place-items-center rounded-full pointer-events-none">
                    <span className="text-[10px] text-white/90">Uploading…</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (!isBusy) avatarInputRef.current?.click();
                  }}
                  className={`w-0 h-0 overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 flex items-center justify-center group-hover/avatar:w-full group-hover/avatar:h-full duration-100 rounded-full ${
                    isBusy ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  aria-label="Change Photo"
                  aria-disabled={isBusy}
                >
                  <UploadIcon className="w-6 h-6 text-white" />
                </button>
              </div>

              <input
                type="file"
                ref={avatarInputRef}
                accept="image/*"
                className="hidden"
                disabled={isBusy}
                onChange={(e) => {
                  if (isBusy) return;
                  const f = e.target.files?.[0] || null;
                  if (validateImage(f)) setAvatarFile(f);
                }}
              />

              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  className="text-sm inline-flex justify-center items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => {
                    if (!isBusy) avatarInputRef.current?.click();
                  }}
                  disabled={isBusy}
                >
                  Change Avatar
                </button>
                {avatarFile ? (
                  <button
                    type="button"
                    className="btn hover:text-muted disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => {
                      if (isBusy) return;
                      setAvatarFile(null);
                    }}
                    disabled={isBusy}
                  >
                    Remove Photo
                  </button>
                ) : null}
              </div>

              <p className="text-xs text-white/50">Recommended: square image</p>
            </div>
          </div>
        </div>

        {/* cover card */}
        <div className="md:col-span-3">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4 h-full">
            <label className="text-sm text-muted">Cover image</label>

            <div
              className={`mt-3 h-32 md:h-36 rounded-lg bg-black/30 border border-white/10 relative overflow-hidden group/cover ${
                isBusy ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              }`}
              onClick={() => {
                if (!isBusy) coverInputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (isBusy) return;
                if (e.key === "Enter" || e.key === " ") coverInputRef.current?.click();
              }}
              aria-label="Change cover image"
              aria-disabled={isBusy}
            >
              {coverPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverPreview}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-white/60">
                  No cover image
                </div>
              )}

              {/* lock overlay while cover busy or global busy */}
              {(coverBusy || isBusy) && (
                <div className="absolute inset-0 bg-black/40 grid place-items-center">
                  <span className="text-xs text-white/90">Uploading…</span>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  if (isBusy) return;
                  e.stopPropagation();
                  coverInputRef.current?.click();
                }}
                className={`absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 transition-transform duration-150 ease-out origin-center scale-0 group-hover/cover:scale-100 focus-visible:scale-100 ${isBusy ? "cursor-not-allowed" : "cursor-pointer"}`}
                aria-label="Change cover image"
                aria-disabled={isBusy}
              >
                <Upload className="w-6 h-6 text-white" />
                <span className="sr-only">Change cover</span>
              </button>
            </div>

            <input
              type="file"
              ref={coverInputRef}
              accept="image/*"
              className="hidden"
              disabled={isBusy}
              onChange={(e) => {
                if (isBusy) return;
                const f = e.target.files?.[0] || null;
                if (validateImage(f)) setCoverFile(f);
              }}
            />

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!isBusy) coverInputRef.current?.click();
                }}
                className={`text-sm inline-flex justify-center items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${isBusy ? "cursor-not-allowed" : "cursor-pointer"}`}
                disabled={isBusy}
              >
                <Upload className="h-4 w-4" /> Upload Cover
              </button>
              {coverFile ? (
                <button
                  type="button"
                  className="btn btn-sm hover:text-muted disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => {
                    if (isBusy) return;
                    setCoverFile(null);
                  }}
                  disabled={isBusy}
                >
                  Remove Cover
                </button>
              ) : null}
            </div>

            <p className="mt-2 text-xs text-white/50">Recommended: wide image</p>
          </div>
        </div>
      </div>

      {/* unified action bar */}
      <div className="border-white/10 flex items-center justify-between">
        <div className="text-xs text-white/50">
          {anythingSelected ? "You have unsaved changes" : "No changes yet"}
        </div>
        <button
          type="button"
          onClick={saveChanges}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!anythingSelected || isBusy}
        >
          {isBusy ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ArtistMedia;
