"use client";
import { useEffect, useMemo } from "react";

export function useObjectUrl(file: File | null | undefined, fallback?: string) {
  const url = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    return fallback || "";
  }, [file, fallback]);

  useEffect(() => {
    return () => {
      if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
    };
  }, [url]);

  return url;
}
