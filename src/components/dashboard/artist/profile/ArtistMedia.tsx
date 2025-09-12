"use client";
import { businessAvatarFallback } from "@/constants/fallBack";
import { IArtist, IQueryMutationErrorResponse } from "@/interface";
import {
  useGetMyArtistProfileQuery,
  useUpdateMyArtistProfileMutation,
} from "@/redux/features/artist/artist.api";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { Upload, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const MAX_MB = 5;

const ArtistMedia = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [avatarBusy, setAvatarBusy] = useState(false);
  const [coverBusy, setCoverBusy] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, refetch } = useGetMyArtistProfileQuery(undefined);
  const profile = data?.data as IArtist | undefined;

  const [uploadFile] = useUploadSingleFileMutation();
  const [updateProfile] = useUpdateMyArtistProfileMutation();

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
      toast.error(`Image must be ≤ ${MAX_MB}MB.`);
      return false;
    }
    return true;
  };

  const uploadAndGetUrl = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadFile(formData);
    return res?.data?.data;
  };

  const saveAvatar = async () => {
    if (!avatarFile) {
      toast.message("Nothing to upload", { description: "Choose a new avatar first." });
      return;
    }
    try {
      setAvatarBusy(true);
      const avatarUrl = await uploadAndGetUrl(avatarFile);
      await updateProfile({ avatar: avatarUrl });
      await refetch();
      setAvatarFile(null);
      toast.success("Avatar updated!");
    } catch (e) {
      const msg =
        (e as IQueryMutationErrorResponse)?.data?.message ||
        "Failed to update avatar. Please try again.";
      toast.error(msg);
    } finally {
      setAvatarBusy(false);
    }
  };

  const saveCover = async () => {
    if (!coverFile) {
      toast.message("Nothing to upload", {
        description: "Choose a new cover image first.",
      });
      return;
    }
    try {
      setCoverBusy(true);
      const coverUrl = await uploadAndGetUrl(coverFile);
      await updateProfile({ coverPhoto: coverUrl });
      await refetch();
      setCoverFile(null);
      toast.success("Cover image updated!");
    } catch (e) {
      const msg =
        (e as IQueryMutationErrorResponse)?.data?.message ||
        "Failed to update cover image. Please try again.";
      toast.error(msg);
    } finally {
      setCoverBusy(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex gap-4 border-b border-white/10 pb-4">
      {/* avatar */}
      <div className="w-[40%]">
        <label className="text-sm text-muted text-center">Avatar</label>
        <div className="flex items-center justify-between gap-4 mt-4 flex-col">
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/10 overflow-hidden group/avatar relative">
            <Image
              src={avatarPreview}
              alt="avatar"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="w-0 h-0 overflow-hidden absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black/50 flex items-center justify-center group-hover/avatar:w-full group-hover/avatar:h-full duration-[0.1s] cursor-pointer rounded-full"
              aria-label="Change Photo"
            >
              <UploadIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          <input
            type="file"
            ref={avatarInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0] || null;
              if (validateImage(f)) setAvatarFile(f);
            }}
          />

          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="text-sm inline-flex justify-center items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 cursor-pointer"
              onClick={() => avatarInputRef.current?.click()}
              disabled={avatarBusy}
            >
              Change Avatar
            </button>
            {avatarFile ? (
              <>
                <button
                  type="button"
                  className="btn hover:text-muted"
                  onClick={() => setAvatarFile(null)}
                  disabled={avatarBusy}
                >
                  Remove Photo
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveAvatar}
                  disabled={avatarBusy}
                >
                  {avatarBusy ? "Saving..." : "Save Avatar"}
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* cover photo */}
      <div className="w-[60%]">
        <label className="text-sm text-muted">Cover image</label>

        <div
          className="mt-1 h-28 rounded-lg bg-black/30 border border-white/10 mb-4 relative overflow-hidden group/cover cursor-pointer"
          onClick={() => coverInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") coverInputRef.current?.click();
          }}
          aria-label="Change cover image"
        >
          {coverPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverPreview} alt="cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center text-white/60">
              No cover image
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              coverInputRef.current?.click();
            }}
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 transition-transform duration-150 ease-out origin-center scale-0 group-hover/cover:scale-100 focus-visible:scale-100 cursor-pointer"
            aria-label="Change cover image"
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
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            if (validateImage(f)) setCoverFile(f);
          }}
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="text-sm inline-flex justify-center items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 cursor-pointer"
            disabled={coverBusy}
          >
            <Upload className="h-4 w-4" /> Upload Cover
          </button>
          {coverFile ? (
            <>
              <button
                type="button"
                className="btn btn-sm hover:text-muted"
                onClick={() => setCoverFile(null)}
                disabled={coverBusy}
              >
                Remove Cover
              </button>
              <button
                type="button"
                onClick={saveCover}
                className="btn btn-primary btn-sm"
                disabled={coverBusy}
              >
                {coverBusy ? "Saving..." : "Save Cover"}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ArtistMedia;
