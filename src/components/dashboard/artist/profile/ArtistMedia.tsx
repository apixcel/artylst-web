"use client";
import { businessAvatarFallback } from "@/constants/fallBack";
import { IArtist } from "@/interface";
import { useGetMyArtistProfileQuery } from "@/redux/features/artist/artist.api";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { Upload, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const ArtistMedia = () => {
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useGetMyArtistProfileQuery(undefined);
  const profile = data?.data as IArtist | undefined;

  const [uploadFile, { isLoading: isUploading }] = useUploadSingleFileMutation();

  return (
    <div className="flex gap-4 border-b border-white/10 pb-4">
      {/* avatar */}
      <div>
        <label className="text-sm text-muted text-center">Avatar</label>
        <div className="flex items-center justify-between gap-4 mt-4 flex-col">
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
              className="btn btn-sm btn-primary cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              Change Photo
            </button>
          </div>
        </div>
      </div>

      {/* cover photo */}
      <div className="flex-1">
        <label className="text-sm text-muted">Cover image</label>
        <div className="mt-1 h-28 rounded-lg bg-black/30 border border-white/10 grid place-items-center text-white/60 mb-4"></div>
        <button className="text-sm inline-flex justify-center w-full items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15">
          <Upload className="h-4 w-4" /> Upload
        </button>
      </div>
    </div>
  );
};

export default ArtistMedia;
