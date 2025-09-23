"use client";
import { useId, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useObjectUrl } from "@/hooks";

export type VideoUploadProps = {
  label?: string;
  file: File | null;
  onChange: (file: File | null) => void;
  defaultUrl?: string;
  maxMB?: number;
  maxDurationSec?: number;
  disabled?: boolean;
  busy?: boolean;
  helperText?: string;
  accept?: string;
  className?: string;
  onError?: (msg: string) => void;
};

export default function VideoUpload({
  label = "Video",
  file,
  onChange,
  defaultUrl,
  maxMB = 200,
  maxDurationSec,
  disabled,
  busy,
  helperText,
  accept = "video/*",
  className = "rounded-xl bg-white/5 border border-white/10 p-4 h-full",
  onError,
}: VideoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const [localError, setLocalError] = useState<string>("");
  const preview = useObjectUrl(file, defaultUrl);

  const reportError = (msg: string) => {
    setLocalError(msg);
    onError?.(msg);
  };

  const validateFile = async (f: File) => {
    if (!f.type.startsWith("video/")) {
      reportError("Please select a video file.");
      return false;
    }
    const isSmall = f.size / (1024 * 1024) <= maxMB;
    if (!isSmall) {
      reportError(`Video must be less than ${maxMB}MB.`);
      return false;
    }
    if (typeof maxDurationSec === "number") {
      const ok = await validateDuration(f, maxDurationSec).catch(() => false);
      if (!ok) {
        reportError(`Video must be ≤ ${maxDurationSec}s.`);
        return false;
      }
    }
    setLocalError("");
    return true;
  };

  const handlePick = async (f: File | null) => {
    if (!f) return;
    if (await validateFile(f)) onChange(f);
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm text-muted">
        {label}
      </label>

      {/* Preview area (no click handler) */}
      <div
        className={`mt-3 h-40 md:h-48 rounded-lg bg-black/30 border border-white/10 relative overflow-hidden`}
      >
        {preview ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video src={preview} className="w-full h-full object-cover" controls />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/60">
            No video selected
          </div>
        )}

        {(busy || disabled) && (
          <div className="absolute inset-0 bg-black/40 grid place-items-center">
            <span className="text-xs text-white/90">
              {busy ? "Uploading…" : "Disabled"}
            </span>
          </div>
        )}
      </div>

      <input
        id={id}
        type="file"
        ref={inputRef}
        accept={accept}
        className="hidden"
        disabled={disabled || busy}
        onChange={async (e) => {
          const f = e.target.files?.[0] ?? null;
          await handlePick(f);
        }}
      />

      {/* Only bottom button triggers picker */}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (!disabled && !busy) inputRef.current?.click();
          }}
          className={`text-sm inline-flex justify-center items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60 ${
            disabled || busy ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={disabled || busy}
        >
          <Upload className="h-4 w-4" /> Upload Video
        </button>
        {file ? (
          <button
            type="button"
            className="btn btn-sm hover:text-muted disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => {
              if (disabled || busy) return;
              onChange(null);
            }}
            disabled={disabled || busy}
          >
            Remove Video
          </button>
        ) : null}
      </div>

      {(helperText || maxMB || typeof maxDurationSec === "number") && (
        <p className="mt-2 text-xs text-white/50">
          {helperText || ""}
          {helperText ? " • " : ""}
          {`Max size ${maxMB}MB`}
          {typeof maxDurationSec === "number" ? ` • ≤ ${maxDurationSec}s` : ""}
        </p>
      )}

      {localError ? <p className="mt-1 text-xs text-red-400">{localError}</p> : null}
    </div>
  );
}

async function validateDuration(file: File, maxDurationSec: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const url = URL.createObjectURL(file);
      const v = document.createElement("video");
      v.preload = "metadata";
      v.src = url;
      v.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        const d = Number(v.duration);
        resolve(!Number.isNaN(d) && d <= maxDurationSec);
      };
      v.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(false);
      };
    } catch (e) {
      reject(e);
    }
  });
}
