export const generateQueryParams = (params: Record<string, unknown>) => {
  let queryString = "";
  const entries = Object.entries(params);

  entries.forEach(([key, value], i) => {
    const isLast = i === entries.length - 1;
    if (value) {
      if (isLast) {
        queryString += `${key}=${value}`;
      } else {
        queryString += `${key}=${value}&`;
      }
    }
  });

  return queryString;
};

export const isImageUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);

    // Only allow http/https
    if (!["http:", "https:"].includes(parsed.protocol)) return false;

    // Valid image extensions
    const imageExts = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".tiff", ".svg"];
    const pathname = parsed.pathname.toLowerCase();

    return imageExts.some((ext) => pathname.endsWith(ext));
  } catch {
    return false; // invalid URL
  }
};

export const isVideoUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);

    // Only allow http/https
    if (!["http:", "https:"].includes(parsed.protocol)) return false;

    // Common video extensions
    const videoExts = [
      ".mp4",
      ".webm",
      ".ogg",
      ".mov",
      ".avi",
      ".wmv",
      ".flv",
      ".mkv",
      ".m4v",
    ];
    const pathname = parsed.pathname.toLowerCase();

    return videoExts.some((ext) => pathname.endsWith(ext));
  } catch {
    return false; // invalid URL
  }
};
